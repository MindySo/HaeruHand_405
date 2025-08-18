import base64
import httpx
import logging
import asyncio
import json
import google.generativeai as genai
from app.core.config import settings
from fastapi import HTTPException
from app.utils.circuitbreaker import gemini_circuit_breaker, is_circuit_breaker_error
from app.prompts.fish_detection_prompt import FEATURE_PROMPT, FEATURE_SCHEMA, NAME_ONLY_PROMPT, NAME_ONLY_SCHEMA
from typing import Dict, Any, List
from app.utils.json_parse import extract_json_block    



GEMINI_LOG_MAX_CHARS = 2000
logger = logging.getLogger(__name__)

genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel(settings.MODEL_NAME)
gemini_semaphore = asyncio.Semaphore(settings.LLM_CONCURRENCY)

@gemini_circuit_breaker
def _call_gemini_api(prompt: str, image_part: dict) -> str:
    logger.info("Gemini API 호출 시작")
    try:
        response = model.generate_content([prompt, image_part], stream=False)
        
        if not response or not response.text:
            logger.error("Gemini API에서 빈 응답 수신")
            raise ValueError("Gemini API에서 빈 응답을 받았습니다")
        
        raw = response.text
        if GEMINI_LOG_MAX_CHARS and len(raw) > GEMINI_LOG_MAX_CHARS:
            logger.info("Gemini 원본 응답(%d chars, truncated): %s… [truncated]",
                        len(raw), raw[:GEMINI_LOG_MAX_CHARS])
        else:
            logger.info("Gemini 원본 응답(%d chars): %s", len(raw), raw)

        logger.info("Gemini API 호출 성공")
        return raw
    except Exception as e:
        logger.error(f"Gemini API 호출 실패: {e}")
        raise Exception(f"Gemini API 오류: {e}")


@gemini_circuit_breaker
def extract_features(image_part: dict) -> Dict[str, Any]:
    logger.info("Gemini 1차(특징/후보) 호출 시작")
    try:
        resp = model.generate_content(
            [FEATURE_PROMPT, image_part],
            generation_config={
                "response_mime_type": "application/json",
                "response_schema": FEATURE_SCHEMA,
            },
            stream=False,
        )

        text = getattr(resp, "text", None)
        if not text:
            raise ValueError("빈 응답")

        try:
            data = json.loads(text)  
        except json.JSONDecodeError:
            data = extract_json_block(text)

        if not isinstance(data, dict) or not data:
            raise ValueError("JSON 파싱 실패")

        vf = data.get("visual_features") or []
        if not isinstance(vf, list):
            vf = []
        data["visual_features"] = vf[:12]

        cands = data.get("candidates") or []
        if not isinstance(cands, list):
            cands = []
        data["candidates"] = cands

        logger.info("Gemini 1차 호출 성공: features=%d, candidates=%d",
                    len(data["visual_features"]), len(data["candidates"]))
        return data

    except Exception as e:
        logger.error(f"Gemini 1차 호출 실패: {e}")
        raise Exception(f"Gemini 특징 추출 오류: {e}")
    

@gemini_circuit_breaker
def final_decision_name_only(
        visual_features: List[str],
        candidates: List[Dict[str, Any]],
        reference_block: str,
    ) -> str:
        vf = "\n".join(f"- {x}" for x in (visual_features or []))
        cands = "\n".join(f"- {c.get('name','?')} ({c.get('confidence',0)})" for c in (candidates or []))
        user_block = f"""[VISUAL_FEATURES]
    {vf}

    [CANDIDATES]
    {cands}

    {reference_block}
    """
        resp = model.generate_content(
            [NAME_ONLY_PROMPT, user_block],
            generation_config={
                "response_mime_type": "application/json",
                "response_schema": NAME_ONLY_SCHEMA,
            },
            stream=False,
        )
        text = getattr(resp, "text", "") or ""
        try:
            data = json.loads(text)
        except json.JSONDecodeError:
            data = extract_json_block(text)
        name = (data or {}).get("name")
        if not name or not isinstance(name, str):
            raise Exception("최종 이름 파싱 실패")
        return name.strip()