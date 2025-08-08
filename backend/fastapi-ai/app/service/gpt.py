import base64
import httpx
import google.generativeai as genai
from app.core.config import settings
from fastapi import HTTPException

genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash-latest")

async def download_and_encode_image(signed_url: str) -> str:
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(signed_url)
            response.raise_for_status()
    except httpx.RequestError as e:
        raise HTTPException(status_code=400, detail=f"이미지 다운로드 실패: {e}")
    return base64.b64encode(response.content).decode("utf-8")

async def detect_fish(signed_url: str, prompt: str, mime_subtype: str) -> str:
    base64_image = await download_and_encode_image(str(signed_url))
    mime_type = f"image/{mime_subtype.lower()}"
    image_part = {
        "mime_type": mime_type,
        "data": base64_image
    }
    
    try:
        response = model.generate_content(
            [prompt, image_part],
            stream=False
        )
        result_text = response.text  
        cleaned_result = result_text.strip().replace('\n', '').replace('\r', '')
        return cleaned_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini 분석 실패: {e}")