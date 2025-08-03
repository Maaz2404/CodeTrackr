from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from ..llm.models import StructuredLLMOutput,IncomingTechStack,CompleteTimeline
load_dotenv()

from langchain.chat_models import init_chat_model

model = init_chat_model("gemini-2.5-flash", model_provider="google_genai")
structured_model = model.with_structured_output(StructuredLLMOutput)

system_template = """ Provide appropriate tech stack or other tools/skills for the following software project idea.
                      Seperate into frontend,backend and deployment skills."""
prompt_template = ChatPromptTemplate.from_messages(
    [('system',system_template),('human',"{text}")]
)

def ensure_list(value):
    if isinstance(value, list):
        return value
    if isinstance(value, str):
        return [value]
    return []

def get_tech_stack(input:str,model=structured_model):
    prompt = prompt_template.invoke({'text':input})
    result = model.invoke(prompt)
    result.frontend = ensure_list(result.frontend)
    result.backend = ensure_list(result.backend)
    result.database = ensure_list(result.database)
    result.infra = ensure_list(result.infra)
    return result

def create_timeline(stack: IncomingTechStack,model=model):
    prompt = f"""You are a software project architect. This was the intital user prompt: {stack.prompt}\n
                After refining the original options given this is the stack in user's knowledge \n 
                Frontend: {stack.frontend}\n
                Backend: {stack.backend}\n
                Database: {stack.database}\n
                Infra: {stack.infra}\n
                They are will to code {stack.hrs_per_day} hours every day
                Create a day-by-day timeline in accordance with above knowledge.
                Avoid suggesting unfamiliar tools unless absolutely necessary\n.
                 Each day should have:\n
                - A title\n
                - Clear, achievable summary of tasks\n
                - Deliverables"""
                
    custom_model =   model.with_structured_output(CompleteTimeline)
    response = custom_model.invoke(prompt)
    return response          