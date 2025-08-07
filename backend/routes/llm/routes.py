
from fastapi import APIRouter
from ..llm.models import Prompt,IncomingTechStack,CompleteTimeline,AllUserTimelineResponse,SingleDayTasks,SingleTimelineDay,SingleTimelineResponse
from ..llm.services import get_tech_stack,create_timeline
from database.database import Project,Day
from ..auth.services import db_dependency,user_dependency
from sqlmodel import select


router = APIRouter(
    prefix='/llm',
    tags=['llm']
)


@router.post('/')
def get_llm_output(prompt: Prompt):
    input = prompt
    result = get_tech_stack(input)
    return result

@router.post('/timeline')
def fetch_timeline(stack: IncomingTechStack):
    response = create_timeline(stack)
    return response

@router.post('/save_timeline')
async def save_timeline(timeline: CompleteTimeline,db:db_dependency,user:user_dependency):
    title = timeline.title
    days = timeline.days
    user_id = user['id']
    new_project = Project(name=title,user_id=user_id)
    project_id = new_project.id
    db.add(new_project)
    #add individual days into Day database table
    for day in days:
        new_day = Day(title=day.tasks.title,summary=day.tasks.summary,deliverables=day.tasks.deliverables,
                      project_id=project_id)
        db.add(new_day)
        
    db.commit()
    return {"message":"Project saved successfully"}
    
@router.get('/timelines', response_model=AllUserTimelineResponse)
async def get_timelines(db: db_dependency, user: user_dependency):
    user_id = user['id']
    
    projects = db.exec(select(Project).where(Project.user_id == user_id)).all()
    timelines = []

    for project in projects:
        # Fetch all days for this project
        days = db.exec(select(Day).where(Day.project_id == project.id)).all()

        timeline_days = []

        for i, day in enumerate(days, start=1):
            task = SingleDayTasks(
                title=day.title,
                summary=day.summary,
                deliverables=day.deliverables
            )
            timeline_day = SingleTimelineDay(
                day=i,
                tasks=task
            )
            timeline_days.append(timeline_day)

        timeline = CompleteTimeline(
            title=project.name,
            days=timeline_days
        )

        response_obj = SingleTimelineResponse(
            name=project.name,
            days=[timeline]
        )

        timelines.append(response_obj)

    return AllUserTimelineResponse(timelines=timelines)   