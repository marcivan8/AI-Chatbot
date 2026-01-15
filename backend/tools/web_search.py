from duckduckgo_search import DDGS

def search_web(query: str, max_results: int = 5) -> str:
    """
    Search the web using DuckDuckGo.
    Returns a formatted string of results (Title - URL - Snippet).
    """
    try:
        results = DDGS().text(query, max_results=max_results)
        if not results:
            return "No results found on the web."
        
        formatted = []
        for r in results:
            formatted.append(f"Title: {r['title']}\nURL: {r['href']}\nSnippet: {r['body']}\n")
        
        return "\n".join(formatted)
    except Exception as e:
        return f"Error searching web: {str(e)}"
