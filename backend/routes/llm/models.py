from sqlmodel import SQLModel,Field
from typing import List,Optional
from pydantic import BaseModel

class Prompt(SQLModel):
    prompt:str
    
class StructuredLLMOutput(BaseModel):
        frontend: Optional[List[str]] = Field("The list of all frontend tools and skills, if required")
        backend: Optional[List[str]] = Field("The list of all backend tools and skills, if required")
        database: Optional[List[str]] = Field("The list of  database tools and skills, if required")
        infra: Optional[List[str]] = Field("The list of all infrastructure tools and skills, if required")
        
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
    title: str = Field("A concise project title")
    days: List[SingleTimelineDay] = Field("A list of all the days in the timeline")
    
class SingleTimelineResponse(SQLModel):
    id: str = Field("The unique id of the project from database")
    name: str = Field("The name of the project")
    days: List[CompleteTimeline] = Field("A list of all the days in a single timeline")
    
class AllUserTimelineResponse(SQLModel):
    timelines: List[SingleTimelineResponse] = Field("A list of all timelines for the user")        
    