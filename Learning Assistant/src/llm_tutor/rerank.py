from typing import List
from sentence_transformers import CrossEncoder
from langchain_core.documents import Document

from .config import settings


class CrossEncoderReranker:
    def __init__(self) -> None:
        self.model = CrossEncoder(settings.rerank_model)

    def rerank(self, query: str, docs: List[Document], top_n: int) -> List[Document]:
        if not docs:
            return []
        pairs = [[query, d.page_content] for d in docs]
        scores = self.model.predict(pairs)
        ranked = sorted(zip(docs, scores), key=lambda x: x[1], reverse=True)
        return [d for d, _ in ranked[:top_n]]
