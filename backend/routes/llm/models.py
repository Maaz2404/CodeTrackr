from sqlmodel import SQLModel,Field
from typing import List
from pydantic import BaseModel

class Prompt(SQLModel):
    prompt:str
    
class StructuredLLMOutput(BaseModel):
        frontend: List[str] = Field("The list of all frontend tools and skills required")
        backend: List[str] = Field("The list of all backend tools and skills required")
        database: List[str] = Field("The list of  database tools and skills required")
        infra: List[str] = Field("The list of all infrastructure tools and skills required")
        
class IncomingTechStack(StructuredLLMOutput):
      prompt: str = Field("The original prompt of user")  
      hrs_per_day : int = Field("The hours per day the user is willing to code")
            
class SingleDayTasks(BaseModel):
    title: str = Field("The title of the day's tasks")
    summary: str = Field("A clear, achievable summary of tasks for the day")
    deliverables: List[str] = Field("A list of deliverables for the day")
    
class SingleTimelineDay(SQLModel):
        day: int = Field("The day number in the timeline")
        tasks: SingleDayTasks = Field("The tasks planned for that day")
    
class CompleteTimeline(SQLModel):
    days: List[SingleTimelineDay] = Field("A list of all the days in the timeline")