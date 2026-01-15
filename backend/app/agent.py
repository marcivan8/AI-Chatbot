from backend.models.ollama_client import ollama_client
from backend.core.mcp import mcp_registry
from backend.tools.institutions import institution_service
from backend.tools.scraper import scrape_website
from backend.tools.web_search import search_web

# Register Tools
@mcp_registry.register_tool("search_schools", "Search schools by name, city. Returns a summary list.")
def search_schools(query: str = "", city: str = None):
    filters = {}
    if city:
        filters["city"] = [city]
    results = institution_service.search(query=query, filters=filters)
    # Summary list to help agent choose which one to explore
    summary = []
    for r in results[:5]: 
        summary.append(f"ID: {r['id']} | Name: {r['name']} | City: {r['city']}")
    return "\n".join(summary) if summary else "No schools found."

@mcp_registry.register_tool("get_school_details", "Get full details of a school by ID.")
def get_school_details(school_id: str):
    school = institution_service.get_by_id(school_id)
    if not school: return "School not found."
    return f"Name: {school.get('name')}\nDescription: {school.get('description')}\nAdmissions: {school.get('admissionProcess')}\nCost: {school.get('cost')}\nPrograms: {school.get('programs')}\nURL: {school.get('url')}"

@mcp_registry.register_tool("scrape_website", "Scrape content from a specific URL.")
def tool_scrape_website(url: str):
    return scrape_website(url)

@mcp_registry.register_tool("search_web", "Search the internet for info not in the database.")
def tool_search_web(query: str):
    return search_web(query)

class Agent:
    def __init__(self):
        self.client = ollama_client
        self.registry = mcp_registry
        self.system_prompt = """You are Eddy, an expert and empathetic AI orientation assistant for French students.
        Your goal is to provide curated, insightful, and well-structured advice about schools, careers, and education.

        TONE & STYLE:
        - Warm, encouraging, and professional.
        - Use Markdown for clarity (bold for key names, bullet points for lists).
        - NOT just raw data: Explain *why* a school matches or what a career entails.
        - Conversational: Ask follow-up questions to better understand the student's needs.

        CAPABILITIES:
        1. Access local database via 'search_schools' and 'get_school_details'.
        2. Access the internet via 'search_web' for broader info.
        3. Read specific pages via 'scrape_website'.

        RULES:
        - Always answer in French.
        - If listing schools, provide 2-3 best options with a brief reason for each.
        - If answering a general question, structure your answer clearly.
        """

    def process_message(self, user_message: str, history: list = []):
        # Multi-Step ReAct Loop
        # Input Validation & Sanitization
        if len(user_message) > 1000:
            user_message = user_message[:1000] + "... (truncated)"
        
        # Escape potential XML/Tag injection (basic)
        safe_message = user_message.replace("<", "&lt;").replace(">", "&gt;")

        context = ""
        max_steps = 3
        
        # Format history for the prompt
        history_text = "\n".join([f"{msg['role'].upper()}: {msg['content']}" for msg in history[-5:]]) # Keep last 5 turns
        
        for step in range(max_steps):
            tools_desc = self.registry.get_tools_description()
            
            decision_prompt = f"""{self.system_prompt}
            
            Available Tools:
            {tools_desc}
            
            Conversation History:
            {history_text}
            
            Current Context:
            {context}
            
            User Query: <user_query>{safe_message}</user_query>
            
            DECISION PROCESS (Step {step+1}/{max_steps}):
            1. Analyze History and Context. Do you have the answer? -> ANSWER: ...
            2. If you need info:
               - Is it about a specific school? -> 'search_schools'
               - Did 'search_schools' give an ID? -> 'get_school_details'
               - Did DB fail or is it a general question? -> 'search_web'
               - Do you have a URL to read? -> 'scrape_website'
            
            Respond only with: TOOL: toolname | arg=val OR ANSWER: ...
            """
            
            decision_response = self.client.generate(decision_prompt)
            decision_content = decision_response.get("response", "").strip()
            print(f"[Step {step+1} Decision]: {decision_content}")
            
            if decision_content.startswith("ANSWER:"):
                return decision_content.replace("ANSWER:", "").strip()
                
            if decision_content.startswith("TOOL:"):
                try:
                    # Parse Tool
                    _, tool_part = decision_content.split("TOOL:", 1)
                    tool_info = tool_part.split("|", 1)
                    tool_name = tool_info[0].strip()
                    args_str = tool_info[1].strip() if len(tool_info) > 1 else ""
                    
                    args = {}
                    import re
                    # Robust arg parsing
                    q_match = re.search(r'query="([^"]+)"', args_str)
                    c_match = re.search(r'city="([^"]+)"', args_str)
                    u_match = re.search(r'url="([^"]+)"', args_str)
                    id_match = re.search(r'school_id="([^"]+)"', args_str)

                    if q_match: args["query"] = q_match.group(1)
                    if c_match: args["city"] = c_match.group(1)
                    if u_match: args["url"] = u_match.group(1)
                    if id_match: args["school_id"] = id_match.group(1)
                    
                    # Execute
                    observation = self.registry.execute_tool(tool_name, args)
                    print(f"[Step {step+1} Output]: {observation[:100]}...")
                    
                    # Append to context
                    context += f"\n[Step {step+1} Action]: {decision_content}\n[Step {step+1} Result]: {observation}\n"
                    
                except Exception as e:
                    print(f"Tool error: {e}")
                    context += f"\n[Error]: {str(e)}\n"
            else:
                # Ambiguous response, treat as answer if it looks like one, or retry
                return decision_content

        # Fallback after max steps
        final_prompt = f"""{self.system_prompt}
        HISTORY:
        {history_text}
        
        CONTEXT:
        {context}
        User Query: <user_query>{safe_message}</user_query>
        Instructions:
        - Synthesize the Context to answer the User Query perfectly.
        - Format with Markdown (bold, lists).
        - Be conversational and helpful.
        - Do not mention "internal tools" or "database context" to the user.
        - End with an engaging follow-up question.
        """
        return self.client.generate(final_prompt).get("response", "Désolé, je n'ai pas trouvé l'info complète.")

agent = Agent()
