from sqlalchemy import desc
from typing import List,Dict,Any,Optional
from pydantic import BaseModel,Field

class StoryOptionLLM(BaseModel):
    text: str =Field(description="the text of the option shown to the user")
    nextNode:Dict[str,Any]=Field(description="the next node in the story")

class StoryNodeLLM(BaseModel):
    content:str=Field(description="the main content of the story node")
    isEnding:bool=Field(description="weather this node is ending node")
    isWinningEnding:bool=Field(description="weather this node is a winning ending node")
    options:Optional[List[StoryOptionLLM]]=Field(default=None,description="the options for this node")

class StoryLLMRResponse(BaseModel):
    title:str=Field(description="the title of the story")
    rootNode:StoryNodeLLM=Field(description="the root node of the story")