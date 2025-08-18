import logging
from typing import Any, Dict, Iterable, List
from langchain_core.documents import Document


logger = logging.getLogger(__name__)



def _get_metadata(doc: Any) -> Dict[str, Any]:
    if isinstance(doc, Document):
        return doc.metadata or {}
    if isinstance(doc, dict):
        meta = doc.get("metadata") if isinstance(doc.get("metadata"), dict) else {}
        base = {k: v for k, v in doc.items() if k not in ("content", "page_content", "metadata")}
        return {**base, **meta}
    return {}


def _get_content(doc: Any) -> str:
    if isinstance(doc, Document):
        return (doc.page_content or "").strip()
    if isinstance(doc, dict):
        return (doc.get("page_content") or doc.get("content") or "").strip()
    return ""


def _truncate(text: str, max_chars: int) -> str:
    if max_chars and len(text) > max_chars:
        return text[:max_chars].rstrip() + "…"
    return text


def format_reference_block(
    docs: Iterable[Any],
    max_docs: int = 3,
    max_chars: int = 600,
    title: str = "[REFERENCE_DOCS]",
    include_meta: bool = True,
) -> str:
    """
    RAG로 찾은 문서들을 LLM 프롬프트에 붙이기 좋은 짧은 블록으로 변환.

    - docs: List[Document] 또는 List[dict] (page_content/metadata 보유)
    - max_docs: 최대 문서 수
    - max_chars: 각 문서 본문 스니펫 길이
    - title: 블록 헤더
    - include_meta: 메타데이터(어종명/특징/유사 어종) 헤더 포함 여부
    """
    docs = list(docs or [])
    if not docs:
        return f"{title}\n(검색된 문서 없음)"

    lines: List[str] = [title]
    for i, d in enumerate(docs[:max_docs], start=1):
        meta = _get_metadata(d)
        content = _truncate(_get_content(d).replace("\r", " ").replace("\n\n", "\n"), max_chars)

        species = meta.get("species_name") or meta.get("name") or meta.get("title") or ""
        key_features = meta.get("key_features") or ""
        if isinstance(key_features, list):
            key_features = "; ".join(map(str, key_features))
        similar = meta.get("similar_species") or ""
        if isinstance(similar, list):
            similar = ", ".join(map(str, similar))

        header = f"### Doc {i}: {species}".strip() if include_meta else f"### Doc {i}"
        lines.append(header)
        if include_meta and key_features:
            lines.append(f"- 특징: {key_features}")
        if include_meta and similar:
            lines.append(f"- 유사 어종: {similar}")
        lines.append(f"- 본문: {content}")

    block = "\n".join(lines).strip()
    logger.debug("reference block built (docs=%d, chars=%d)", min(len(docs), max_docs), len(block))
    return block


