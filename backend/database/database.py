from sqlmodel import SQLModel,create_engine,Session,Field,Relationship,func
from typing import List
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy import Column, String
from dotenv import load_dotenv
import os
from datetime import datetime
import uuid

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

class User(SQLModel,table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()),primary_key=True,index=True)
    username: str = Field(min_length=3,max_length=20,nullable=False,unique=True)
    password: str = Field(nullable=False)
    projects: list["Project"] = Relationship(back_populates="user")
    created_at: datetime = Field(default=func.now())
    
class Project(SQLModel,table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()),primary_key=True,index=True)
    name: str = Field(min_length=3,max_length=50)
    user_id: str = Field(foreign_key="user.id",ondelete="CASCADE")
    days: list["Day"] = Relationship(back_populates="project")
    created_at: datetime = Field(default=func.now()) 
    user: "User" = Relationship(back_populates="projects")
   
       
    
class Day(SQLModel,table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()),primary_key=True,index=True)
    title: str 
    summary: str
    deliverables: List[str] = Field(sa_column=Column(ARRAY(String)), default_factory=list)
    project_id: str = Field(foreign_key="project.id",ondelete="CASCADE")
    project: "Project" = Relationship(back_populates="days")
    
SQLModel.metadata.create_all(engine)    

def get_session():
    with Session(engine) as session:
        yield session