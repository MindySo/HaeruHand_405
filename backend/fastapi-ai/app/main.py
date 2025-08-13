from app.config import create_app
from app.core.config import settings

app = create_app()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, workers=settings.UVICORN_WORKERS)
