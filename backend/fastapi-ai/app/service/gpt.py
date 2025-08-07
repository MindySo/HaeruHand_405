import base64
import httpx
import google.generativeai as genai
import logging
from app.core.config import settings
from fastapi import HTTPException

# 로거 설정
logger = logging.getLogger(__name__)

genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash-latest")

async def download_and_encode_image(signed_url: str) -> str:
    logger.info(f"=== 이미지 다운로드 시작 ===")
    logger.info(f"Signed URL: {signed_url}")
    
    try:
        async with httpx.AsyncClient() as client:
            logger.info("HTTP 클라이언트로 이미지 요청 시작")
            response = await client.get(signed_url)
            response.raise_for_status()
            
            image_size = len(response.content)
            logger.info(f"이미지 다운로드 성공 - 크기: {image_size} bytes")
            
    except httpx.RequestError as e:
        logger.error(f"이미지 다운로드 실패: {e}")
        raise HTTPException(status_code=400, detail=f"이미지 다운로드 실패: {e}")

    logger.info("이미지 Base64 인코딩 시작")
    encoded_image = base64.b64encode(response.content).decode("utf-8")
    encoded_size = len(encoded_image)
    logger.info(f"Base64 인코딩 완료 - 인코딩된 크기: {encoded_size} 문자")
    
    return encoded_image


async def detect_fish(signed_url: str, prompt: str, mime_subtype: str) -> str:
    logger.info(f"=== Fish Detection 시작 ===")
    logger.info(f"요청 파라미터 - URL: {signed_url}")
    logger.info(f"요청 파라미터 - MIME subtype: {mime_subtype}")
    logger.info(f"요청 파라미터 - Prompt 길이: {len(prompt)} 문자")
    
    # 이미지 다운로드 및 인코딩
    base64_image = await download_and_encode_image(str(signed_url))
    
    # MIME 타입 설정
    mime_type = f"image/{mime_subtype.lower()}"
    logger.info(f"설정된 MIME 타입: {mime_type}")
    
    image_part = {
        "mime_type": mime_type,
        "data": base64_image
    }
    
    logger.info("Gemini API 호출 시작")
    logger.info(f"사용 모델: gemini-1.5-flash-latest")

    try:
        response = model.generate_content(
            [prompt, image_part],
            stream=False
        )
        
        result_text = response.text
        logger.info(f"Gemini API 호출 성공")
        logger.info(f"응답 길이: {len(result_text)} 문자")
        logger.info(f"Gemini 응답 내용: {result_text}")
        logger.info(f"=== Fish Detection 완료 ===")
        
        return result_text
        
    except Exception as e:
        logger.error(f"Gemini 분석 실패: {e}")
        logger.error(f"에러 타입: {type(e).__name__}")
        raise HTTPException(status_code=500, detail=f"Gemini 분석 실패: {e}")