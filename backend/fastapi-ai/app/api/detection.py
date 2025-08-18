from fastapi import APIRouter, HTTPException
from app.schemas.request import DetectionRequest
from app.schemas.response import DetectionResponse
from app.service.fish_detection import detect_fish_name

router = APIRouter(prefix="/detection", tags=["detection"])

@router.post("/", response_model=DetectionResponse)
async def detect(request: DetectionRequest):
    try:
        name = await detect_fish_name(
            signed_url=request.image_url,
            mime_subtype=request.mime_type,
        )
        return DetectionResponse(fish_name=name)

    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=503, detail="AI서비스를 이용할 수 없습니다.")
