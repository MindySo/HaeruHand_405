from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache
from pathlib import Path



class Settings(BaseSettings):
    GEMINI_API_KEY: str
    MODEL_NAME: str = "gemini-1.5-flash-latest"
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


    model_config = SettingsConfigDict(
        extra = "ignore",
        env_file = Path.cwd().parent.parent / "docker" / ".env.local",
        env_file_encoding = "utf-8"
    )

@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()