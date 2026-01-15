import json
import os
from typing import List, Dict, Optional

class InstitutionService:
    def __init__(self, data_path: str = None):
        if data_path is None:
            # Resolve path relative to this file
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            self.data_path = os.path.join(base_dir, "data", "institutions.json")
        else:
            self.data_path = data_path
        self.institutions = []
        # Whitelist of public fields - Security Enhancement
        self.public_fields = {
            "id", "name", "logo", "city", "type", "domain", 
            "level", "alternance", "tags", "recognition", 
            "admissionProcess", "cost", "description",
            "programs", "url"
        }
        self.load_data()

    def load_data(self):
        """Loads institution data from the JSON file."""
        if os.path.exists(self.data_path):
            with open(self.data_path, 'r', encoding='utf-8') as f:
                self.institutions = json.load(f)
        else:
            print(f"Warning: Data file not found at {self.data_path}")
            self.institutions = []

    def get_all(self) -> List[Dict]:
        """Returns all institutions."""
        return self.institutions

    def _filter_fields(self, school: Dict) -> Dict:
        """Return only whitelisted public fields."""
        if not school:
            return None
        return {k: v for k, v in school.items() if k in self.public_fields}

    def get_by_id(self, school_id: str) -> Optional[Dict]:
        """Returns a single institution by ID."""
        for school in self.institutions:
            if school.get("id") == school_id:
                return self._filter_fields(school)
        return None

    def search(self, query: str = "", filters: Dict = None) -> List[Dict]:
        """
        Search institutions by name/city and apply filters.
        Filters can include: city, type, level, alternance, domain.
        """
        results = self.institutions

        # Text search
        if query:
            query = query.lower()
            results = [
                s for s in results
                if query in s.get("name", "").lower() or 
                   query in s.get("city", "").lower() or
                   any(query in d.lower() for d in s.get("domain", []))
            ]

        # Apply filters
        if filters:
            if "city" in filters and filters["city"]:
                # Allow partial match for city (e.g. "Paris" matches "Paris 19e")
                results = [
                    s for s in results 
                    if s.get("city") and any(fc.lower() in s.get("city").lower() for fc in filters["city"])
                ]
            
            if "type" in filters and filters["type"]:
                results = [s for s in results if s.get("type") in filters["type"]]
                
            if "alternance" in filters and filters["alternance"] is not None:
                results = [s for s in results if s.get("alternance") == filters["alternance"]]
                
            if "level" in filters and filters["level"]:
                # Check if school has ANY of the requested levels
                results = [
                    s for s in results 
                    if any(l in s.get("level", []) for l in filters["level"])
                ]

            if "domain" in filters and filters["domain"]:
                # Check if school has ANY of the requested domains
                # Ensure s.get("domain") is a list before iterating
                results = [
                    s for s in results 
                    if s.get("domain") and any(d in s.get("domain", []) for d in filters["domain"])
                ]

        return [self._filter_fields(s) for s in results]

    def get_facets(self) -> Dict[str, List[str]]:
        """Returns unique values for filters."""
        facets = {
            "cities": set(),
            "types": set(),
            "levels": set(),
            "domains": set()
        }
        
        for school in self.institutions:
            if school.get("city"):
                facets["cities"].add(school["city"])
            
            if school.get("type"):
                facets["types"].add(school["type"])
            
            if school.get("level"):
                for level in school["level"]:
                    facets["levels"].add(level)
            
            if school.get("domain"):
                for domain in school["domain"]:
                    facets["domains"].add(domain)

        return {
            "cities": sorted(list(facets["cities"])),
            "types": sorted(list(facets["types"])),
            "levels": sorted(list(facets["levels"])),
            "domains": sorted(list(facets["domains"]))
        }

# Singleton instance for easy import
institution_service = InstitutionService()
