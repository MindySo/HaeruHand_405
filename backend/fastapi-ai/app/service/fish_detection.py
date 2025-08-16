import logging
from typing import List, Dict, Any
from fastapi import HTTPException
from app.service.gpt import (
    extract_features,
    final_decision_name_only,   
    gemini_semaphore,
)
from app.service.image_loader import download_and_encode_image
from app.vector.store import retriever              
from app.utils.reference import format_reference_block
from app.utils.circuitbreaker import is_circuit_breaker_error

logger = logging.getLogger(__name__)

def _normalize_mime_subtype(mt: str | None) -> str:
    if not mt:
        return "jpeg"
    mt = mt.lower().strip().lstrip(".")
    alias = {"jpg": "jpeg", "jpeg": "jpeg", "png": "png", "webp": "webp"}
    return alias.get(mt, "jpeg")

def _build_query(features: List[str], candidates: List[Dict[str, Any]]) -> str:
    names = [c.get("name", "") for c in (candidates or []) if c.get("name")]
    return " ; ".join([*(features or []), *names])[:800]

def _fallback_from_candidates(candidates: List[Dict[str, Any]]) -> str:
    if not candidates:
        return "불확실"
    first_name = str(candidates[0].get("name") or "").strip()
    if first_name:
        return first_name
    best = max(candidates, key=lambda c: c.get("confidence", 0.0))
    return str(best.get("name") or "").strip() or "불확실"

async def detect_fish_name(signed_url: str, mime_subtype: str) -> str:
    try:
        logger.info(f"[FINAL] 최종 어종명 판정 시작: {signed_url}")
        
        base64_image = await download_and_encode_image(str(signed_url))
        mime_type = f"image/{_normalize_mime_subtype(mime_subtype)}"
        image_part = {"mime_type": mime_type, "data": base64_image}
        
        async with gemini_semaphore:
            first = extract_features(image_part)
            
        features = (first.get("visual_features") or [])[:8]  
        candidates = (first.get("candidates") or [])[:3]
        logger.info("[FINAL] 1차 OK: features=%d, candidates=%d", len(features), len(candidates))
        
        query = _build_query(features, candidates)
        docs = await retriever.ainvoke(query)
        docs = docs[:3]  
        logger.info("[FINAL] 검색 문서: %d", len(docs))

        if not docs:
            name = _fallback_from_candidates(candidates)
            logger.warning("[FINAL] RAG 0건 → 2차 LLM 생략, 1차 1순위 반환: %s", name)
            return name
        
        ref_block = format_reference_block(docs)
        try:
            async with gemini_semaphore:
                name = final_decision_name_only(features, candidates, ref_block)
        except Exception as e:
            logger.warning("[FINAL] LLM 실패 → 1차 1순위 폴백: %s", e)
            name = _fallback_from_candidates(candidates)

        logger.info("[FINAL] name=%s (docs=%d)", name, len(docs))
        return name
        
    except HTTPException:
        raise
    except Exception as e:
        if is_circuit_breaker_error(e):
            logger.warning("[FINAL] Circuit Breaker 활성화")
            raise HTTPException(
                status_code=503,
                detail="AI 분석 서비스가 일시적으로 중단되었습니다. 잠시 후 다시 시도해주세요.",
            )
        logger.exception("[FINAL] 최종 판정 실패")
        raise HTTPException(status_code=500, detail=f"최종 판정 실패: {e}")