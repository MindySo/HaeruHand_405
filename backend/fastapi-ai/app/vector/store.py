# app/vector/store.py
import logging
from pinecone import Pinecone
from langchain_upstage import UpstageEmbeddings
from langchain_pinecone import PineconeVectorStore
from app.core.config import settings



logger = logging.getLogger(__name__)

embeddings = UpstageEmbeddings(
    model="embedding-query",
    upstage_api_key=settings.UPSTAGE_API_KEY,
)

pc = Pinecone(api_key=settings.PINECONE_API_KEY)
index = pc.Index(settings.PINECONE_INDEX_NAME)

vectorstore = PineconeVectorStore(
    index=index,
    embedding=embeddings,
    namespace=getattr(settings, 'PINECONE_NAMESPACE', None),
)

retriever = vectorstore.as_retriever(
    search_type="similarity_score_threshold",
    search_kwargs={
        "k": getattr(settings, 'RAG_TOP_K', 3),
        "score_threshold": getattr(settings, 'RAG_SCORE_THRESHOLD', 0.7),
    },
)