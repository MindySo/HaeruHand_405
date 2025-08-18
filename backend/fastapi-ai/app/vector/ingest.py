# app/vector/ingest.py
import json
import sys
import logging
import hashlib
import time
from pathlib import Path
from typing import List, Dict, Any, Optional
from langchain.schema import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from pinecone import Pinecone, ServerlessSpec
from langchain_upstage import UpstageEmbeddings
from langchain_pinecone import PineconeVectorStore
from app.core.config import settings

logging.basicConfig(
    level=logging.INFO, 
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s"
)
logger = logging.getLogger(__name__)

def ensure_index(pc: Pinecone, emb_dim: int):
    """Pinecone 인덱스가 없으면 생성, 있으면 기존 인덱스 반환"""
    name = settings.PINECONE_INDEX_NAME
    
    try:
        existing_indexes = pc.list_indexes()
        existing_names = [idx.name for idx in existing_indexes]
        
        if name not in existing_names:
            logger.info(f"Pinecone 인덱스 생성: {name} (dimension={emb_dim})")
            pc.create_index(
                name=name,
                dimension=emb_dim,
                metric="cosine",
                spec=ServerlessSpec(
                    cloud=settings.PINECONE_CLOUD, 
                    region=settings.PINECONE_REGION
                ),
            )
            time.sleep(10)
        else:
            logger.info(f"기존 Pinecone 인덱스 사용: {name}")
            
        return pc.Index(name)
    
    except Exception as e:
        logger.error(f"인덱스 생성/조회 실패: {e}")
        raise

def build_document(record: Dict[str, Any]) -> Optional[Document]:
    species_name = record.get("species_name", "").strip()
    if not species_name:
        return None
    
    # 주요 정보 추출
    key_features = record.get("key_features", [])
    similar_species = record.get("similar_species", [])
    restriction_start = record.get("restriction_start_date")
    restriction_end = record.get("restriction_end_date")
    restriction_region = record.get("restriction_region")
    min_length = record.get("minimum_length_centimeter")
    min_weight = record.get("minimum_weight_gram")
    measurement_type = record.get("measurement_type")
    jeju_native = record.get("jeju_native")
    abundance_level = record.get("abundance_level")
    note = record.get("note")
    
    # 텍스트 콘텐츠 구성
    content_parts = [f"어종명: {species_name}"]
    
    if key_features:
        content_parts.append("주요 특징: " + "; ".join(key_features))
    
    if similar_species:
        content_parts.append("유사 어종: " + ", ".join(similar_species))
    
    # 규제 정보
    regulation_info = []
    if restriction_region:
        regulation_info.append(f"금어 지역: {restriction_region}")
    if restriction_start and restriction_end:
        regulation_info.append(f"금어 기간: {restriction_start} ~ {restriction_end}")
    if min_length:
        regulation_info.append(f"최소 길이: {min_length}cm")
    if min_weight:
        regulation_info.append(f"최소 무게: {min_weight}g")
    if measurement_type:
        regulation_info.append(f"측정 방법: {measurement_type}")
    
    if regulation_info:
        content_parts.append("규제 정보: " + ", ".join(regulation_info))
    
    if jeju_native:
        content_parts.append(f"제주 특산: {jeju_native}")
    if abundance_level:
        content_parts.append(f"풍부도: {abundance_level}")
    if note:
        content_parts.append(f"참고사항: {note}")
    
    content = "\n".join(content_parts)
    
    metadata = {
        "species_name": species_name,
        "source": "fish_data.json",
    }
    
    # None이 아닌 값만 메타데이터에 추가
    if key_features:
        metadata["key_features"] = "; ".join(key_features)
    
    if similar_species:
        metadata["similar_species"] = similar_species
    
    if restriction_region:
        metadata["restriction_region"] = restriction_region
        
    if restriction_start:
        metadata["restriction_start_date"] = restriction_start
        
    if restriction_end:
        metadata["restriction_end_date"] = restriction_end
        
    if min_length is not None:
        metadata["minimum_length_cm"] = min_length
        
    if min_weight is not None:
        metadata["minimum_weight_g"] = min_weight
        
    if measurement_type:
        metadata["measurement_type"] = measurement_type
        
    if jeju_native:
        metadata["jeju_native"] = jeju_native
        
    if abundance_level:
        metadata["abundance_level"] = abundance_level
    
    return Document(page_content=content, metadata=metadata)

def generate_document_id(doc: Document, index: int) -> str:
    species_name = doc.metadata.get("species_name", "unknown")
    
    import hashlib
    import urllib.parse
        
    name_hash = hashlib.md5(species_name.encode('utf-8')).hexdigest()[:8]
    
    content_hash = hashlib.md5(
        (doc.page_content + species_name).encode("utf-8")
    ).hexdigest()[:8]
    
    return f"fish_{name_hash}_{index}_{content_hash}"

def load_and_validate_data(file_path: str) -> List[Dict[str, Any]]:
    try:
        path = Path(file_path)
        if not path.exists():
            raise FileNotFoundError(f"파일을 찾을 수 없습니다: {file_path}")
        
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        if not isinstance(data, list):
            raise ValueError("JSON 루트는 리스트여야 합니다")
        
        logger.info(f"JSON 파일 로드 완료: {len(data)}개 레코드")
        return data
    
    except Exception as e:
        logger.error(f"파일 로드 실패: {e}")
        raise

def main(json_path: str):
    try:
        logger.info("데이터 로드 시작...")
        data = load_and_validate_data(json_path)
        
        logger.info("Document 변환 시작...")
        documents = []
        for record in data:
            if isinstance(record, dict):
                doc = build_document(record)
                if doc:
                    documents.append(doc)
        
        logger.info(f"변환된 문서 수: {len(documents)}")
        
        if not documents:
            logger.warning("변환된 문서가 없습니다")
            return
        
        splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=100,
            separators=["\n\n", "\n", ". ", ", ", " "]
        )
        chunked_docs = splitter.split_documents(documents)
        logger.info(f"청크 분할 완료: {len(chunked_docs)}개 청크")
        
        logger.info("임베딩 모델 초기화...")
        embeddings = UpstageEmbeddings(
            model="embedding-query",
            upstage_api_key=settings.UPSTAGE_API_KEY
        )
        
        sample_embedding = embeddings.embed_query("테스트")
        emb_dimension = len(sample_embedding)
        logger.info(f"임베딩 차원: {emb_dimension}")
        
        logger.info("Pinecone 설정...")
        pc = Pinecone(api_key=settings.PINECONE_API_KEY)
        index = ensure_index(pc, emb_dimension)
        
        logger.info("벡터스토어에 문서 추가 시작...")
        vector_store = PineconeVectorStore(
            index=index,
            embedding=embeddings,
            namespace=getattr(settings, 'PINECONE_NAMESPACE', None)
        )
        
        doc_ids = [
            generate_document_id(doc, i) 
            for i, doc in enumerate(chunked_docs)
        ]
        
        batch_size = 100
        total_docs = len(chunked_docs)
        
        for i in range(0, total_docs, batch_size):
            batch_docs = chunked_docs[i:i + batch_size]
            batch_ids = doc_ids[i:i + batch_size]
            
            logger.info(f"배치 업로드 {i//batch_size + 1}: {len(batch_docs)}개 문서")
            vector_store.add_documents(
                documents=batch_docs,
                ids=batch_ids
            )
            time.sleep(1)  
        
        logger.info(f"벡터 데이터베이스 구축 완료! 총 {total_docs}개 문서 추가")
        
    except Exception as e:
        logger.error(f"처리 중 오류 발생: {e}")
        raise

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("사용법: python ingest.py <json_file_path>")
        sys.exit(1)
    
    json_file_path = sys.argv[1]
    main(json_file_path)