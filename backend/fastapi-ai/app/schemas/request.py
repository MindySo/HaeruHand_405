from pydantic import BaseModel, HttpUrl, Field

class DetectionRequest(BaseModel):
    image_url: HttpUrl = Field(...,description="S3이미지의 URL",
        example="https://your-bucket.s3.amazonaws.com/fish.jpg")
    mime_type: str = Field(..., description="MIME type of the image (e.g., jpeg, png)")