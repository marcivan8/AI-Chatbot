import sys
import os
import requests
import json
import time

# Add parent directory to path to import app modules if needed
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Configuration
MODELS_TO_TEST = ["mistral", "llama3", "qwen2.5:7b", "gemma2"]
BASE_URL = "http://localhost:11434"

def check_ollama_status():
    try:
        requests.get(BASE_URL)
        return True
    except:
        return False

def pull_model(model_name):
    print(f"Checking/Pulling model: {model_name}...")
    url = f"{BASE_URL}/api/pull"
    try:
        # Stream=False to wait for completion
        response = requests.post(url, json={"name": model_name, "stream": False})
        if response.status_code == 200:
            print(f"Model {model_name} ready.")
            return True
        else:
            print(f"Failed to pull {model_name}: {response.text}")
            return False
    except Exception as e:
        print(f"Error pulling {model_name}: {e}")
        return False

def run_test(model_name, prompt, expected_keyword=None, is_tool_test=False):
    url = f"{BASE_URL}/api/generate"
    
    # Simulating the System Prompt from Agent.py
    system_prompt = """You are Eddy, an AI educational orientation assistant.
    You have access to a database of schools via tools.
    If the user asks about schools, YOU MUST use the 'search_schools' tool to find real data.
    Do not make up information.
    Always answer in French.
    
    Available Tools:
    - search_schools(query: str, city: str = None): Search for schools.
    
    DECISION PROCESS:
    1. Analyze if you need to search for schools.
    2. If YES, output exactly: TOOL: search_schools | query="...", city="..."
    3. If NO, output exactly: ANSWER: [your response]
    """
    
    full_prompt = f"""{system_prompt}
    
    User Query: "{prompt}"
    
    Respond only with your decision.
    """
    
    start_time = time.time()
    try:
        response = requests.post(url, json={
            "model": model_name,
            "prompt": full_prompt,
            "stream": False,
            "options": {"temperature": 0} # Zero temperature for deterministic results
        })
        duration = time.time() - start_time
        
        if response.status_code != 200:
            return {"status": "error", "error": response.text, "duration": duration}
            
        result_text = response.json().get("response", "").strip()
        
        passed = False
        if is_tool_test:
            # Check for correct tool syntax
            if result_text.startswith("TOOL: search_schools"):
                passed = True
        elif expected_keyword:
             if expected_keyword.lower() in result_text.lower():
                 passed = True
        else:
            # Simple chat test, just pass if it answers
            if result_text.startswith("ANSWER:") or len(result_text) > 5:
                passed = True
                
        return {
            "status": "success",
            "response": result_text,
            "duration": round(duration, 2),
            "passed": passed
        }
        
    except Exception as e:
         return {"status": "error", "error": str(e), "duration": 0}

def main():
    if not check_ollama_status():
        print("Error: Ollama is not running at http://localhost:11434")
        return

    print("=== STARTING AI MODEL BENCHMARK ===\n")
    
    results = {}
    
    # Filter available models first? 
    # For now, we try to pull/run all in the list.
    
    for model in MODELS_TO_TEST:
        print(f"\n--- Testing Model: {model} ---")
        if not pull_model(model):
            results[model] = {"status": "failed_load"}
            continue
            
        model_results = []
        
        # Test 1: Identity/General Chat
        print("Running Test 1: Identity")
        res1 = run_test(model, "Bonjour, qui es-tu ?", expected_keyword="Eddy")
        model_results.append({"test": "Identity", "result": res1})
        print(f"Result: {'PASS' if res1['passed'] else 'FAIL'} ({res1['duration']}s)")
        
        # Test 2: Tool Usage (Simple)
        print("Running Test 2: Tool Usage (School Search)")
        res2 = run_test(model, "Cherche une école d'ingénieur à Lyon", is_tool_test=True)
        model_results.append({"test": "Tool_Search", "result": res2})
        print(f"Result: {'PASS' if res2['passed'] else 'FAIL'} ({res2['duration']}s)")
        
        # Test 3: Tool Usage (Complex/Specific)
        print("Running Test 3: Specific Entity Search")
        res3 = run_test(model, "Parle moi de 42 Paris", is_tool_test=True)
        model_results.append({"test": "Tool_Specific", "result": res3})
        print(f"Result: {'PASS' if res3['passed'] else 'FAIL'} ({res3['duration']}s)")

        results[model] = model_results

    print("\n\n=== BENCHMARK SUMMARY ===")
    best_model = None
    best_score = -1
    
    for model, tests in results.items():
        if tests == {"status": "failed_load"}:
            print(f"Model: {model} - FAILED TO LOAD")
            continue
            
        passed_count = sum(1 for t in tests if t['result'].get('passed'))
        total_time = sum(t['result'].get('duration', 0) for t in tests)
        avg_time = total_time / len(tests)
        
        score = passed_count * 10 - avg_time # Simple scoring: prioritize accuracy, then speed
        
        if score > best_score:
            best_score = score
            best_model = model
            
        print(f"Model: {model} | Passed: {passed_count}/{len(tests)} | Avg Time: {avg_time:.2f}s")
        
    print(f"\n🏆 RECOMMENDED MODEL: {best_model}")

if __name__ == "__main__":
    main()
