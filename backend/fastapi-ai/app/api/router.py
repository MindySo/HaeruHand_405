from fastapi import APIRouter
from app.api.detection import router as detection_router

api_router = APIRouter(prefix="/ai")

api_router.include_router(detection_router, prefix="/detection")
