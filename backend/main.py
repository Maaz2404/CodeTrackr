from fastapi import FastAPI
from routes.llm.routes import router
import uvicorn
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.include_router(router,tags=["llm"])
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.get('/')
def root():
 return {"message": "Welcome to the API. Use /docs to see the documentation."}


#if __name__ == 'main':
#   uvicorn.run(app,host='127.0.0.1',port=8000)