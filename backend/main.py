from fastapi import FastAPI
from routes.llm.routes import router
from routes.auth.routes import auth_router
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

app = FastAPI()

# Include routers
app.include_router(router, tags=["llm"])
app.include_router(auth_router)

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health/root endpoint
@app.get("/")
def root():
    return {"message": "Welcome to the API. Use /docs to see the documentation."}

# Entry point
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))  # Render gives PORT env var
    uvicorn.run(app, host="0.0.0.0", port=port)
