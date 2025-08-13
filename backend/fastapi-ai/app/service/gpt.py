import base64
import httpx
import logging
import asyncio
import google.generativeai as genai
from app.core.config import settings
from fastapi import HTTPException
from app.utils.circuitbreaker import gemini_circuit_breaker, is_circuit_breaker_error

logger = logging.getLogger(__name__)

genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel(settings.MODEL_NAME)
gemini_semaphore = asyncio.Semaphore(settings.LLM_CONCURRENCY)

async def download_and_encode_image(signed_url: str) -> str:
    logger.info(f"이미지 다운로드 시작: {signed_url}")
    max_size = settings.MAX_IMAGE_SIZE_MB * 1024 * 1024
    
    timeout_config = httpx.Timeout(
        connect=settings.HTTP_CONNECT_TIMEOUT,
        read=settings.HTTP_READ_TIMEOUT,
        write=settings.HTTP_WRITE_TIMEOUT,
        pool=settings.HTTP_POOL_TIMEOUT
    )
    async with httpx.AsyncClient(timeout=timeout_config) as client:
        try:
            response = await client.get(signed_url)
            response.raise_for_status()
            
            if len(response.content) > max_size:
                logger.warning(f"이미지 크기 초과: {len(response.content)} bytes")
                raise HTTPException(
                    status_code=413, 
                    detail=f"이미지 크기가 너무 큽니다. 최대 {settings.MAX_IMAGE_SIZE_MB}MB"
                )
            
            logger.info(f"이미지 다운로드 성공: {len(response.content)} bytes")
                
        except httpx.RequestError as e:
            logger.error(f"이미지 다운로드 실패: {e}")
            raise HTTPException(status_code=400, detail=f"이미지 다운로드 실패: {e}")
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"이미지 처리 실패: {e}")
            raise HTTPException(status_code=400, detail=f"이미지 처리 실패: {e}")
    
    return base64.b64encode(response.content).decode("utf-8")

@gemini_circuit_breaker
def _call_gemini_api(prompt: str, image_part: dict) -> str:
    logger.info("Gemini API 호출 시작")
    try:
        response = model.generate_content([prompt, image_part], stream=False)
        
        if not response or not response.text:
            logger.error("Gemini API에서 빈 응답 수신")
            raise ValueError("Gemini API에서 빈 응답을 받았습니다")
        
        logger.info(f"Gemini API 호출 성공: {len(response.text)} chars")
        return response.text
    except Exception as e:
        logger.error(f"Gemini API 호출 실패: {e}")
        raise Exception(f"Gemini API 오류: {e}")

async def detect_fish(signed_url: str, prompt: str, mime_subtype: str) -> str:
    try:
        logger.info(f"물고기 탐지 시작: {signed_url}")
        
        base64_image = await download_and_encode_image(str(signed_url))
        mime_type = f"image/{mime_subtype.lower()}"
        
        image_part = {
            "mime_type": mime_type,
            "data": base64_image
        }
        async with gemini_semaphore:
            result_text = _call_gemini_api(prompt, image_part)
        
        cleaned_result = result_text.strip().replace('\n', '').replace('\r', '')
        logger.info(f"물고기 탐지 완료: {cleaned_result}")
        return cleaned_result
        
    except HTTPException:
        raise
    except Exception as e:
        if is_circuit_breaker_error(e):
            logger.warning("Circuit Breaker 활성화됨")
            raise HTTPException(
                status_code=503, 
                detail="AI 분석 서비스가 일시적으로 중단되었습니다. 잠시 후 다시 시도해주세요."
            )
        
        logger.error(f"물고기 탐지 실패: {e}")
        raise HTTPException(status_code=500, detail=f"Gemini 분석 실패: {e}")