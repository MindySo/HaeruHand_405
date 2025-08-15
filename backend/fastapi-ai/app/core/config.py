from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache
from pathlib import Path



class Settings(BaseSettings):
    GEMINI_API_KEY: str
    MODEL_NAME: str = "gemini-2.5-flash-lite"
    UVICORN_WORKERS: int = 1
    LLM_CONCURRENCY: int = 4
    GEMINI_TIMEOUT: float = 15.0
    HTTP_CONNECT_TIMEOUT: float = 2.0
    HTTP_READ_TIMEOUT: float = 8.0
    HTTP_WRITE_TIMEOUT: float = 30.0 
    HTTP_POOL_TIMEOUT: float = 30.0
    HTTP_POOL_MAX: int = 100
    HTTP_POOL_KEEPALIVE: int = 20
    CIRCUIT_BREAKER_FAILURE_THRESHOLD: int = 5
    CIRCUIT_BREAKER_RECOVERY_TIMEOUT: int = 60
    MAX_IMAGE_SIZE_MB: int = 5

    # UPSTAGE_API_KEY: str                       
    # PINECONE_API_KEY: str                      
    # PINECONE_INDEX_NAME: str = "fish-species"  
    # PINECONE_NAMESPACE: str | None = None      
    # PINECONE_CLOUD: str = "aws"                
    # PINECONE_REGION: str = "us-east-1"         

    # RAG_TOP_K: int = 5
    # RAG_SCORE_THRESHOLD: float = 0.75          

    model_config = SettingsConfigDict(
        extra = "ignore",
        env_file = Path.cwd().parent.parent / "docker" / ".env.local",
        env_file_encoding = "utf-8"
    )

@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()