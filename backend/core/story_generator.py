from langchain_core.output_parsers import format_instructions
from backend.core.models import StoryLLMRResponse
from backend.core.models import StoryNodeLLM
from sqlalchemy.orm import Session
from core.config import settings

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser

from core.prompts import STORY_PROMPT
from models.story import Story

class StoryGenerator:
    @classmethod
    def _get_llm(cls):
        return ChatOpenAI(model="gpt-4-turbo")
    @classmethod
    def generate_story(cls.db:Session,session_id:str,theme:str="fantasy")->Story:
        llm=cls._get_llm()
        story_parser=PydanticOutputParser(pydantic_object=StoryLLMRResponse)

        prompt=ChatPromptTemplate.from_messages([(
            "system",
            STORY_PROMPT
        ),
        (
            "human",
            f"Create the story with this theme: {theme}"
        )
        ]).partial(format_instructions=story_parser.get_format_instructions())

        raw_response=llm.invoke(prompt.invoke({}))

        response_text=raw_response
        if hasattr(raw_response,"content"):
            response_text=raw_response.content

        story_structure=story_parser.parse(response_text)
        story_db=Story(title=story_structure.title,session_id=session_id)
        db.add(story_db)
        db.flush()

        root_node_data=story_structure.rootNode
        
        

