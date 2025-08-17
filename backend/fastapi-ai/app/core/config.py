from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache
from pathlib import Path



class Settings(BaseSettings):
    GEMINI_API_KEY: str

    model_config = SettingsConfigDict(
        extra = "ignore",
        env_file = Path.cwd().parent.parent / "docker" / ".env.local",
        env_file_encoding = "utf-8"
    )

@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()