import os
import socket
from fastapi import APIRouter

router = APIRouter(prefix="/health", tags=["health"])

def _instance_id() -> str:
    return os.getenv("INSTANCE_ID") or socket.gethostname()

@router.get("/liveness")
@router.head("/liveness")
async def liveness():
    return {
        "status": "ok",
        "service": "haeruhand-ai",
        "instance": _instance_id(),
    }

@router.get("/readiness")
@router.head("/readiness")
async def readiness():
    return {
        "status": "ready",
        "service": "haeruhand-ai",
        "instance": _instance_id(),
    }

