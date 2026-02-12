import json
from typing import List, Dict, Any

from langchain_community.chat_models import ChatOllama
from langchain_community.llms.ollama import OllamaEndpointNotFoundError
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_core.documents import Document
import requests

from .config import settings
from .classify import llm_classify, heuristic_classify
from .retrieval import hybrid_retrieve
from .rerank import CrossEncoderReranker


CONCEPTUAL_PROMPT = (
    "You are a helpful teaching assistant. Explain the concept clearly, "
    "use the provided sources, and keep it tied to the course material."
)

FACTUAL_PROMPT = (
    "You are a precise assistant. Answer factually using only the sources. "
    "If the answer is not in the sources, say you don't know."
)

EXPLORATORY_PROMPT = (
    "You are a tutor. Explore the question using the sources, explain tradeoffs, "
    "and keep it grounded in the course material."
)


def format_context(docs: List[Document]) -> str:
    lines = []
    for i, d in enumerate(docs, start=1):
        meta = d.metadata or {}
        source = meta.get("source", "unknown")
        page = meta.get("page", "")
        lines.append(f"[{i}] {d.page_content}\nSource: {source} Page: {page}")
    return "\n\n".join(lines)


def select_prompt(query_type: str) -> str:
    if query_type == "factual":
        return FACTUAL_PROMPT
    if query_type == "exploratory":
        return EXPLORATORY_PROMPT
    return CONCEPTUAL_PROMPT


def get_temperature(query_type: str) -> float:
    if query_type == "factual":
        return 0.0
    if query_type == "exploratory":
        return 0.5
    return 0.3


_RERANKER = None


def get_reranker() -> CrossEncoderReranker:
    global _RERANKER
    if _RERANKER is None:
        _RERANKER = CrossEncoderReranker()
    return _RERANKER


def answer_question(
    query: str,
    chat_history: List[Dict[str, str]],
    use_llm_classify: bool = True,
    use_rerank: bool = True,
    run_quality_check: bool = True,
) -> Dict[str, Any]:
    query_type = llm_classify(query) if use_llm_classify else heuristic_classify(query)

    retrieved = hybrid_retrieve(query, top_k=settings.top_k)
    reranked = retrieved
    if use_rerank:
        reranker = get_reranker()
        reranked = reranker.rerank(query, retrieved, top_n=settings.max_context_chunks)

    context = format_context(reranked)
    system_prompt = select_prompt(query_type)

    history_text = "\n".join([f"User: {h['user']}\nAssistant: {h['assistant']}" for h in chat_history])
    user_prompt = (
        f"Conversation so far:\n{history_text}\n\n"
        f"Question: {query}\n\n"
        f"Sources:\n{context}\n\n"
        "Answer with citations like [1], [2] when using sources."
    )

    model = ChatOllama(
        model=settings.ollama_model,
        base_url=settings.ollama_base_url,
        temperature=get_temperature(query_type),
        timeout=settings.ollama_timeout,
    )

    try:
        response = model.invoke([SystemMessage(content=system_prompt), HumanMessage(content=user_prompt)])
    except OllamaEndpointNotFoundError:
        return {
            "error": (
                "Ollama model not found. Make sure the model is pulled and the name matches. "
                f"Try: ollama pull {settings.ollama_model}"
            )
        }
    except requests.exceptions.RequestException as e:
        return {"error": f"Ollama connection error: {str(e)}. Check base URL: {settings.ollama_base_url}"}
    except Exception as e:
        return {"error": f"Unexpected error: {type(e).__name__}: {str(e)}"}

    quality = {"supported": "skipped", "score": 0.0, "issues": "Quality check disabled."}
    if run_quality_check:
        quality = check_answer_quality(query, response.content, reranked)

    return {
        "answer": response.content,
        "query_type": query_type,
        "sources": reranked,
        "quality": quality,
    }


def check_answer_quality(query: str, answer: str, docs: List[Document]) -> Dict[str, Any]:
    context = format_context(docs)
    judge_prompt = (
        "Evaluate whether the answer is supported by the sources. "
        "Return JSON with keys: supported (yes/no), score (0-1), issues (string)."
    )

    model = ChatOllama(
        model=settings.ollama_model,
        base_url=settings.ollama_base_url,
        temperature=0,
        timeout=settings.ollama_timeout,
    )

    user_prompt = (
        f"Question: {query}\n\nAnswer: {answer}\n\nSources:\n{context}\n\n"
        "Return JSON only."
    )

    response = model.invoke([SystemMessage(content=judge_prompt), HumanMessage(content=user_prompt)]).content

    try:
        return json.loads(response)
    except json.JSONDecodeError:
        return {"supported": "unknown", "score": 0.0, "issues": "Could not parse quality output."}
