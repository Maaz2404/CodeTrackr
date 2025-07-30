from dotenv import load_dotenv
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate
from ..llm.models import StructuredLLMOutput
load_dotenv()

from langchain.chat_models import init_chat_model

model = init_chat_model("gemini-2.5-flash", model_provider="google_genai")
structured_model = model.with_structured_output(StructuredLLMOutput)

system_template = """ Provide appropriate tech stack or other tools/skills for the following software project idea.
                      Seperate into frontend,backend and deployment skills."""
prompt_template = ChatPromptTemplate.from_messages(
    [('system',system_template),('human',"{text}")]
)


def get_tech_stack(input:str,model=structured_model):
    prompt = prompt_template.invoke({'text':input})
    result = model.invoke(prompt)
    return result