from pydantic import BaseModel, Field
from typing import List, Optional

class DetectionResponse(BaseModel):
    fish_name: str = Field(..., description="GPT가 판단한 물고기의 이름")

class DetectionCandidate(BaseModel):
    name: str
    confidence: float
    why: Optional[str] = None

class DetectionFirstPassResponse(BaseModel):
    visual_features: List[str] = []
    candidates: List[DetectionCandidate] = []