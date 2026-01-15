from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional
from backend.tools.institutions import institution_service
from .agent import agent
from .schemas import School, SchoolFilter, ChatRequest, ChatResponse

router = APIRouter()

# Simple In-Memory Rate Limiter
import time
from fastapi import Request, HTTPException

class RateLimiter:
    def __init__(self, requests_per_minute: int = 20):
        self.requests_per_minute = requests_per_minute
        self.requests = {}  # ip -> [timestamps]

    def check(self, request: Request):
        client_ip = request.client.host
        now = time.time()
        
        # Clean up old timestamps
        if client_ip in self.requests:
            self.requests[client_ip] = [t for t in self.requests[client_ip] if now - t < 60]
        
        # Check limit
        current_requests = len(self.requests.get(client_ip, []))
        if current_requests >= self.requests_per_minute:
            raise HTTPException(status_code=429, detail="Rate limit exceeded. Try again later.")
            
        # Add new request
        if client_ip not in self.requests:
            self.requests[client_ip] = []
        self.requests[client_ip].append(now)

limiter = RateLimiter(requests_per_minute=20)

async def rate_limit(request: Request):
    limiter.check(request)

@router.get("/schools", response_model=List[School])
async def get_schools(
    q: Optional[str] = None,
    city: Optional[List[str]] = Query(None),
    type: Optional[List[str]] = Query(None),
    level: Optional[List[str]] = Query(None),
    domain: Optional[List[str]] = Query(None),
    alternance: Optional[bool] = None
):
    """
    Search and filter schools.
    """
    filters = {
        "city": city,
        "type": type,
        "level": level,
        "domain": domain,
        "alternance": alternance
    }
    # Remove None values
    filters = {k: v for k, v in filters.items() if v is not None}
    
    results = institution_service.search(query=q, filters=filters)
    return results

@router.get("/facets")
async def get_facets():
    """
    Get available filter options (cities, types, levels, domains).
    """
    return institution_service.get_facets()

@router.get("/schools/{school_id}", response_model=School)
async def get_school(school_id: str):
    """
    Get a single school by ID.
    """
    school = institution_service.get_by_id(school_id)
    if not school:
        raise HTTPException(status_code=404, detail="School not found")
    return school



@router.post("/chat", response_model=ChatResponse, dependencies=[Depends(rate_limit)])
async def chat(request: ChatRequest):
    """
    Chat with Eddy (AI Agent).
    """
    response_text = agent.process_message(request.message, history=request.history)
    # Future: Extract sources from agent
    return ChatResponse(response=response_text, sources=[])

from backend.tools.careers import career_service

@router.get("/careers")
async def get_careers():
    """
    Get all careers for the Stats/Careers tab.
    """
    return career_service.get_all()

@router.get("/stats")
async def get_stats():
    """
    Get aggregated statistics for the Insights view.
    """
    from collections import Counter
    
    # Get all schools
    all_schools = institution_service.search(query=None, filters={})
    
    # Calculate stats
    total_schools = len(all_schools)
    alternance_count = sum(1 for s in all_schools if s.get("alternance"))
    
    # Counters
    domain_counter = Counter()
    type_counter = Counter()
    
    for school in all_schools:
        # Type
        t = school.get("type")
        if t:
            type_counter[t] += 1
            
        # Domains
        d_list = school.get("domain", [])
        if isinstance(d_list, list):
            for d in d_list:
                domain_counter[d] += 1
        elif isinstance(d_list, str):
            domain_counter[d_list] += 1
            
    # Get high demand careers
    high_demand = career_service.get_high_demand()
    all_careers = career_service.get_all()
    
    return {
        "totalSchools": total_schools,
        "alternanceCount": alternance_count,
        "domains": dict(domain_counter.most_common(5)),
        "types": dict(type_counter.most_common(5)),
        "highDemandCareers": high_demand,
        "totalCareers": len(all_careers)
    }
