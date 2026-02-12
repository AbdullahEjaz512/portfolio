import os
import re
import pickle
from dataclasses import dataclass
from typing import Iterable, List, Dict, Tuple

from pypdf import PdfReader
from sentence_transformers import SentenceTransformer
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

try:
    import pytesseract
    from PIL import Image
except Exception:  # pragma: no cover - optional OCR dependency
    pytesseract = None
    Image = None

from .config import settings


SENTENCE_SPLIT_REGEX = re.compile(r"(?<=[.!?])\s+")


@dataclass
class Chunk:
    text: str
    metadata: Dict


def read_text_file(path: str) -> str:
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        return f.read()


def read_pdf(path: str) -> List[Tuple[int, str]]:
    reader = PdfReader(path)
    pages = []
    for i, page in enumerate(reader.pages):
        text = page.extract_text() or ""
        pages.append((i + 1, text))
    return pages


def read_image_text(path: str) -> str:
    if pytesseract is None or Image is None:
        raise RuntimeError("OCR dependencies missing. Install pytesseract and pillow.")
    img = Image.open(path)
    return pytesseract.image_to_string(img)


def split_sentences(text: str) -> List[str]:
    text = text.strip()
    if not text:
        return []
    return SENTENCE_SPLIT_REGEX.split(text)


def semantic_chunk_sentences(
    sentences: List[str],
    embedder: SentenceTransformer,
    max_words: int = 220,
    similarity_threshold: float = 0.72,
) -> List[str]:
    if not sentences:
        return []

    embeddings = embedder.encode(sentences, normalize_embeddings=True)
    chunks = []
    current = []
    current_words = 0

    for i, sent in enumerate(sentences):
        sent_words = len(sent.split())
        if current:
            sim = float((embeddings[i - 1] * embeddings[i]).sum())
            should_break = sim < similarity_threshold or current_words + sent_words > max_words
        else:
            should_break = False

        if should_break:
            chunks.append(" ".join(current).strip())
            current = [sent]
            current_words = sent_words
        else:
            current.append(sent)
            current_words += sent_words

    if current:
        chunks.append(" ".join(current).strip())

    return chunks


def build_chunks_from_text(text: str, metadata: Dict, embedder: SentenceTransformer) -> List[Chunk]:
    sentences = split_sentences(text)
    chunks = semantic_chunk_sentences(sentences, embedder)
    return [Chunk(text=c, metadata={**metadata, "chunk_index": i}) for i, c in enumerate(chunks)]


def load_documents(source_dir: str) -> List[Chunk]:
    embedder = SentenceTransformer(settings.embedding_model)
    all_chunks: List[Chunk] = []

    for root, _, files in os.walk(source_dir):
        for name in files:
            path = os.path.join(root, name)
            ext = os.path.splitext(name)[1].lower()
            if ext in {".txt", ".md"}:
                text = read_text_file(path)
                meta = {"source": path, "page": None}
                all_chunks.extend(build_chunks_from_text(text, meta, embedder))
            elif ext == ".pdf":
                for page_num, page_text in read_pdf(path):
                    meta = {"source": path, "page": page_num}
                    all_chunks.extend(build_chunks_from_text(page_text, meta, embedder))
            elif ext in {".png", ".jpg", ".jpeg", ".bmp", ".tiff"}:
                text = read_image_text(path)
                meta = {"source": path, "page": None, "ocr": True}
                all_chunks.extend(build_chunks_from_text(text, meta, embedder))

    return all_chunks


def persist_indexes(chunks: List[Chunk]) -> None:
    os.makedirs(settings.chroma_dir, exist_ok=True)
    texts = [c.text for c in chunks]
    metadatas = [c.metadata for c in chunks]

    embedding_fn = HuggingFaceEmbeddings(model_name=settings.embedding_model)
    vectorstore = Chroma.from_texts(
        texts=texts,
        embedding=embedding_fn,
        metadatas=metadatas,
        persist_directory=settings.chroma_dir,
    )
    vectorstore.persist()

    bm25_data = {
        "texts": texts,
        "metadatas": metadatas,
    }
    os.makedirs(os.path.dirname(settings.bm25_index_path), exist_ok=True)
    with open(settings.bm25_index_path, "wb") as f:
        pickle.dump(bm25_data, f)


def ingest(source_dir: str) -> int:
    chunks = load_documents(source_dir)
    persist_indexes(chunks)
    return len(chunks)
