import requests
import json
from typing import Dict, List, Optional

import os
from dotenv import load_dotenv

load_dotenv()

class OllamaClient:
    def __init__(self, base_url: str = "http://localhost:11434"):
        self.base_url = base_url
        self.model = os.getenv("OLLAMA_MODEL", "mistral")

    def generate(self, prompt: str, context: Optional[List[int]] = None) -> Dict:
        """
        Generate a response from Ollama.
        """
        url = f"{self.base_url}/api/generate"
        data = {
            "model": self.model,
            "prompt": prompt,
            "stream": False,
            "context": context
        }
        
        try:
            response = requests.post(url, json=data)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error communicating with Ollama: {e}")
            return {"response": "Error: Could not connect to AI service."}

    def chat_with_history(self, messages: List[Dict]) -> Dict:
        """
        Chat with Ollama using message history format.
        """
        url = f"{self.base_url}/api/chat"
        data = {
            "model": self.model,
            "messages": messages,
            "stream": False
        }

        try:
            response = requests.post(url, json=data)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error communicating with Ollama: {e}")
            return {"message": {"content": "Error: Could not connect to AI service."}}

# Singleton
ollama_client = OllamaClient()
