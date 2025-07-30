from sqlmodel import SQLModel,Field
from typing import Optional,List
from pydantic import BaseModel

class Prompt(SQLModel):
    prompt:str
    
class StructuredLLMOutput(BaseModel):
        frontend: List[str] = Field("The list of all frontend tools and skills required")
        backend: List[str] = Field("The list of all backend tools and skills required")
        database: List[str] = Field("The list of  database tools and skills required")
        infra: List[str] = Field("The list of all infrastructure tools and skills required")