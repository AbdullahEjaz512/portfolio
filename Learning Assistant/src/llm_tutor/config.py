import os
from dataclasses import dataclass
from dotenv import load_dotenv

load_dotenv()


@dataclass
class Settings:
    ollama_base_url: str = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
    ollama_model: str = os.getenv("OLLAMA_MODEL", "llama3.2")
    ollama_timeout: int = int(os.getenv("OLLAMA_TIMEOUT", "120"))
    embedding_model: str = os.getenv("EMBEDDING_MODEL", "sentence-transformers/all-MiniLM-L6-v2")
    chroma_dir: str = os.getenv("CHROMA_DIR", "./data/chroma")
    bm25_index_path: str = os.getenv("BM25_INDEX_PATH", "./data/bm25_index.pkl")
    rerank_model: str = os.getenv("RERANK_MODEL", "cross-encoder/ms-marco-MiniLM-L-6-v2")
    top_k: int = int(os.getenv("TOP_K", "6"))
    rrf_k: int = int(os.getenv("RRF_K", "60"))
    max_context_chunks: int = int(os.getenv("MAX_CONTEXT_CHUNKS", "5"))


settings = Settings()
