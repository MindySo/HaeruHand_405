from fastapi import APIRouter
from app.schemas.request import DetectionRequest
from app.schemas.response import DetectionResponse
from app.service.gpt import detect_fish
from app.prompts.fish_detection import get_fish_detection_prompt

router = APIRouter()

@router.post("/", response_model=DetectionResponse)
async def detect(request: DetectionRequest):
    base_prompt = get_fish_detection_prompt()

    result = await detect_fish(signed_url=request.image_url,
        prompt=base_prompt,
        mime_subtype=request.mime_type)

    return DetectionResponse(fish_name=result)