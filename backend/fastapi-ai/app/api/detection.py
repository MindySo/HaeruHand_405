from fastapi import APIRouter, HTTPException
from app.schemas.request import DetectionRequest
from app.schemas.response import DetectionResponse
from app.service.gpt import detect_fish
from app.prompts.fish_detection import get_fish_detection_prompt

router = APIRouter()

@router.post("/", response_model=DetectionResponse)
async def detect(request: DetectionRequest):
    base_prompt = get_fish_detection_prompt()

    try:
        result = await detect_fish(
            signed_url=request.image_url,
            prompt=base_prompt,
            mime_subtype=request.mime_type
            )

        return DetectionResponse(fish_name=result)
    
    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(status_code=503, detail="AI서비스를 이용할 수 없습니다.")