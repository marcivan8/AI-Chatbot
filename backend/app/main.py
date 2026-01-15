from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import router as api_router

app = FastAPI(
    title="EduGuide API",
    description="Backend API for EduGuide - AI Chatbot Bootcamp",
    version="1.0.0"
)

# CORS Configuration
# Restrict to frontend only for security
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Router
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "Welcome to EduGuide API", "docs": "/docs"}

if __name__ == "__main__":
    import uvicorn
    # Run from parent directory with: uvicorn backend.app.main:app --reload
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
