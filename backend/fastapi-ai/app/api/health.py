import os
import socket
from fastapi import APIRouter

router = APIRouter(prefix="/health", tags=["health"])

def _instance_id() -> str:
    return os.getenv("INSTANCE_ID") or socket.gethostname()

@router.get("/liveness")
async def liveness():
    return {
        "status": "ok",
        "service": "haeruhand-ai",
        "instance": _instance_id(),
    }

@router.get("/readiness")
async def readiness():
    # TODO: 추후 Redis/MySQL 연결 점검 로직 추가
    return {
        "status": "ready",
        "service": "haeruhand-ai",
        "instance": _instance_id(),
    }

