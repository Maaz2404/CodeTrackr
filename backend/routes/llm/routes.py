
from fastapi import APIRouter
from ..llm.models import Prompt,IncomingTechStack
from ..llm.services import get_tech_stack,create_timeline


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
