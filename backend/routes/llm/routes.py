
from fastapi import APIRouter
from ..llm.models import Prompt
from ..llm.services import get_tech_stack

router = APIRouter(
    prefix='/llm',
    tags=['llm']
)


@router.post('/')
def get_llm_output(prompt: Prompt):
    input = prompt
    result = get_tech_stack(input)
    return result


