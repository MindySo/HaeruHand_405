from pydantic import BaseModel, Field

class DetectionResponse(BaseModel):
    fish_name: str = Field(..., description="GPT가 판단한 물고기의 이름")