#!/bin/bash

# Kill any existing processes on ports 8000 and 5173
echo "Cleaning up ports..."
lsof -ti:8000 | xargs kill -9 2>/dev/null
lsof -ti:5173 | xargs kill -9 2>/dev/null

# Start Backend
echo "Starting Backend on Port 8000..."
python3 -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

# Wait for Backend to initialize
sleep 3

# Start Frontend
echo "Starting Frontend..."
npm run dev

# Cleanup on exit
kill $BACKEND_PID
