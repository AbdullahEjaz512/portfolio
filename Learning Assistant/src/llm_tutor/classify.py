from typing import Literal

from langchain_community.chat_models import ChatOllama
from langchain_community.llms.ollama import OllamaEndpointNotFoundError
from langchain_core.messages import SystemMessage, HumanMessage
import requests

from .config import settings


QueryType = Literal["conceptual", "factual", "exploratory"]


SYSTEM_PROMPT = (
    "Classify the question into one of: conceptual, factual, exploratory. "
    "Return only the label."
)


KEYWORD_HINTS = {
    "conceptual": ["why", "explain", "intuition", "concept", "meaning"],
    "factual": ["what", "when", "define", "list", "formula", "equation"],
    "exploratory": ["compare", "tradeoff", "pros", "cons", "design", "approach"],
}


def heuristic_classify(query: str) -> QueryType:
    q = query.lower()
    for label, keys in KEYWORD_HINTS.items():
        if any(k in q for k in keys):
            return label  # type: ignore[return-value]
    return "conceptual"


def llm_classify(query: str) -> QueryType:
    model = ChatOllama(model=settings.ollama_model, base_url=settings.ollama_base_url, temperature=0)
    msg = [SystemMessage(content=SYSTEM_PROMPT), HumanMessage(content=query)]
    try:
        response = model.invoke(msg).content.strip().lower()
        if response in {"conceptual", "factual", "exploratory"}:
            return response  # type: ignore[return-value]
        return heuristic_classify(query)
    except (OllamaEndpointNotFoundError, requests.exceptions.RequestException):
        return heuristic_classify(query)
