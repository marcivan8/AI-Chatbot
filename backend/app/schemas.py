from pydantic import BaseModel
from typing import List, Optional

class School(BaseModel):
    id: str
    name: str
    logo: Optional[str] = None
    city: str
    type: str
    domain: List[str]
    level: List[str]
    alternance: bool
    tags: List[str]
    recognition: List[str]
    admissionProcess: str
    cost: str
    description: str
    programs: List[str] = []
    url: Optional[str] = None

class SchoolFilter(BaseModel):
    query: Optional[str] = None
    city: Optional[List[str]] = None
    type: Optional[List[str]] = None
    level: Optional[List[str]] = None
    alternance: Optional[bool] = None

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[dict]] = []

class ChatResponse(BaseModel):
    response: str
    sources: Optional[List[School]] = []
