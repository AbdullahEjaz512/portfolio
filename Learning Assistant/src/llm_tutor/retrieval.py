import os
import pickle
from typing import List, Tuple

from rank_bm25 import BM25Okapi
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_core.documents import Document

from .config import settings


def tokenize(text: str) -> List[str]:
    return text.lower().split()


def load_bm25() -> Tuple[BM25Okapi, List[str], List[dict]]:
    if not os.path.exists(settings.bm25_index_path):
        raise FileNotFoundError("BM25 index not found. Run ingestion first.")
    with open(settings.bm25_index_path, "rb") as f:
        data = pickle.load(f)
    texts = data["texts"]
    metadatas = data["metadatas"]
    tokenized = [tokenize(t) for t in texts]
    return BM25Okapi(tokenized), texts, metadatas


def load_vectorstore() -> Chroma:
    embedding_fn = HuggingFaceEmbeddings(model_name=settings.embedding_model)
    return Chroma(
        embedding_function=embedding_fn,
        persist_directory=settings.chroma_dir,
    )


def rrf_fusion(
    dense: List[Tuple[Document, float]],
    sparse: List[Tuple[int, float]],
    sparse_texts: List[str],
    sparse_metas: List[dict],
    k: int = 60,
) -> List[Document]:
    scores = {}

    for rank, (doc, _) in enumerate(dense, start=1):
        key = doc.page_content + str(doc.metadata)
        scores[key] = scores.get(key, 0) + 1 / (k + rank)

    for rank, (idx, _) in enumerate(sparse, start=1):
        key = sparse_texts[idx] + str(sparse_metas[idx])
        scores[key] = scores.get(key, 0) + 1 / (k + rank)

    def score_key(item):
        return item[1]

    ranked = sorted(scores.items(), key=score_key, reverse=True)

    docs = []
    for key, _ in ranked:
        if "source" in key:
            # best-effort recovery
            pass
        # reconstruct Document from key
        # key format: text + metadata string
        # We will recover via lookup in sparse for exact match.
        found = False
        for i, text in enumerate(sparse_texts):
            if text + str(sparse_metas[i]) == key:
                docs.append(Document(page_content=text, metadata=sparse_metas[i]))
                found = True
                break
        if not found:
            # fallback to dense doc
            for doc, _ in dense:
                if doc.page_content + str(doc.metadata) == key:
                    docs.append(doc)
                    break

    return docs


def hybrid_retrieve(query: str, top_k: int) -> List[Document]:
    vectorstore = load_vectorstore()
    bm25, sparse_texts, sparse_metas = load_bm25()

    dense = vectorstore.similarity_search_with_score(query, k=top_k)
    sparse_scores = bm25.get_scores(tokenize(query))
    sparse_ranked = sorted(enumerate(sparse_scores), key=lambda x: x[1], reverse=True)[:top_k]

    fused = rrf_fusion(dense, sparse_ranked, sparse_texts, sparse_metas, k=settings.rrf_k)
    return fused[:top_k]
