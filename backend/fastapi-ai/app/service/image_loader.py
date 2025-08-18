import base64
import httpx
import logging
from fastapi import HTTPException
from app.core.config import settings

logger = logging.getLogger(__name__)

async def download_and_encode_image(signed_url: str) -> str:
    logger.info(f"이미지 다운로드 시작: {signed_url}")
    max_size = settings.MAX_IMAGE_SIZE_MB * 1024 * 1024

    timeout_config = httpx.Timeout(
        connect=settings.HTTP_CONNECT_TIMEOUT,
        read=settings.HTTP_READ_TIMEOUT,
        write=settings.HTTP_WRITE_TIMEOUT,
        pool=settings.HTTP_POOL_TIMEOUT,
    )

    async with httpx.AsyncClient(timeout=timeout_config) as client:
        try:
            resp = await client.get(signed_url)
            resp.raise_for_status()

            if len(resp.content) > max_size:
                logger.warning(f"이미지 크기 초과: {len(resp.content)} bytes")
                raise HTTPException(
                    status_code=413,
                    detail=f"이미지 크기가 너무 큽니다. 최대 {settings.MAX_IMAGE_SIZE_MB}MB"
                )

            logger.info(f"이미지 다운로드 성공: {len(resp.content)} bytes")
            return base64.b64encode(resp.content).decode("utf-8")

        except httpx.RequestError as e:
            logger.error(f"이미지 다운로드 실패: {e}")
            raise HTTPException(status_code=400, detail=f"이미지 다운로드 실패: {e}")
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"이미지 처리 실패: {e}")
            raise HTTPException(status_code=400, detail=f"이미지 처리 실패: {e}")
