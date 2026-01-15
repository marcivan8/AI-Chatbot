import json
import os
from typing import List, Dict, Any, Optional

class CareerService:
    def __init__(self):
        # Resolve path relative to this file
        current_dir = os.path.dirname(os.path.abspath(__file__))
        self.data_path = os.path.join(current_dir, "../data/careers.json")
        self.careers = self._load_data()

    def _load_data(self) -> List[Dict[str, Any]]:
        if not os.path.exists(self.data_path):
            print(f"Warning: Data file not found at {self.data_path}")
            return []
        
        try:
            with open(self.data_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading career data: {e}")
            return []

    def get_all(self) -> List[Dict[str, Any]]:
        """Return all careers."""
        return self.careers

    def get_by_id(self, career_id: str) -> Optional[Dict[str, Any]]:
        """Find a career by its ID."""
        for career in self.careers:
            if career.get("id") == career_id:
                return career
        return None

    def get_high_demand(self) -> List[Dict[str, Any]]:
        """Return careers marked as high demand."""
        return [c for c in self.careers if c.get("demand") == "high"]

    def get_by_domain(self, domain: str) -> List[Dict[str, Any]]:
        """Return careers in a specific domain."""
        return [c for c in self.careers if domain.lower() in c.get("domain", "").lower()]

career_service = CareerService()
