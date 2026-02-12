import os
from pathlib import Path
import streamlit as st
import requests

from src.llm_tutor.config import settings
from src.llm_tutor.rag import answer_question
from src.llm_tutor.ingestion import ingest


st.set_page_config(page_title="Local LLM Tutor", page_icon="📚", layout="wide")

CUSTOM_CSS = """
<style>
    :root {
        --bg: #0f1117;
        --card: #171a21;
        --muted: #9aa4b2;
        --accent: #6ea8fe;
        --success: #1cc88a;
    }
    .block-container {padding-top: 1.5rem; padding-bottom: 2rem;}
    .hero {
        background: linear-gradient(135deg, rgba(110,168,254,0.25), rgba(28,200,138,0.15));
        border: 1px solid rgba(110,168,254,0.25);
        border-radius: 20px;
        padding: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
    }
    .hero-title {font-size: 2rem; font-weight: 700; margin: 0;}
    .hero-sub {color: var(--muted); margin-top: 6px;}
    .badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: rgba(110,168,254,0.15);
        color: #dbe7ff;
        border: 1px solid rgba(110,168,254,0.25);
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 0.8rem;
    }
    .card {
        background: var(--card);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 16px;
        padding: 16px;
    }
    .stat {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.9rem;
    }
    .stat .label {color: var(--muted);}
    .pill {
        padding: 4px 10px;
        border-radius: 999px;
        border: 1px solid rgba(255,255,255,0.12);
        font-size: 0.8rem;
    }
    .pill.ok {background: rgba(28,200,138,0.15); color: #b9f7dd; border-color: rgba(28,200,138,0.3);} 
    .pill.bad {background: rgba(255,77,79,0.15); color: #ffd7d7; border-color: rgba(255,77,79,0.3);} 
    .chat-bubble-user {
        background: rgba(110,168,254,0.15);
        border: 1px solid rgba(110,168,254,0.25);
        padding: 12px 14px;
        border-radius: 14px;
        margin-bottom: 8px;
    }
    .chat-bubble-ai {
        background: rgba(28,200,138,0.12);
        border: 1px solid rgba(28,200,138,0.25);
        padding: 12px 14px;
        border-radius: 14px;
        margin-bottom: 16px;
    }
    @media (max-width: 900px) {
        .hero {flex-direction: column; align-items: flex-start;}
    }
</style>
"""

st.markdown(CUSTOM_CSS, unsafe_allow_html=True)

def indexes_ready() -> bool:
    return os.path.exists(settings.bm25_index_path) and os.path.exists(settings.chroma_dir)


def ollama_status() -> str:
    try:
        resp = requests.get(f"{settings.ollama_base_url}/api/tags", timeout=5)
        if resp.status_code == 200:
            return "ok"
        return f"http {resp.status_code}"
    except requests.exceptions.RequestException:
        return "unreachable"


index_ready = indexes_ready()
ollama_state = ollama_status()
upload_dir = Path("./data/source/uploads")
upload_dir.mkdir(parents=True, exist_ok=True)

if "history" not in st.session_state:
        st.session_state.history = []

with st.sidebar:
        st.markdown("### ⚙️ Status")
        st.markdown(
                f"<div class='card'>"
                f"<div class='stat'><span class='label'>Vector DB</span>"
                f"<span class='pill {'ok' if os.path.exists(settings.chroma_dir) else 'bad'}'>"
                f"{'Ready' if os.path.exists(settings.chroma_dir) else 'Missing'}</span></div>"
                f"<div class='stat' style='margin-top:8px;'><span class='label'>BM25 Index</span>"
                f"<span class='pill {'ok' if os.path.exists(settings.bm25_index_path) else 'bad'}'>"
                f"{'Ready' if os.path.exists(settings.bm25_index_path) else 'Missing'}</span></div>"
                f"</div>",
                unsafe_allow_html=True,
        )
        st.markdown("### 🧠 Model")
        st.write(settings.ollama_model)
        st.write("Base URL:", settings.ollama_base_url)
        st.write("Ollama:", "✅" if ollama_state == "ok" else f"❌ {ollama_state}")
        if st.button("Clear chat", use_container_width=True):
                st.session_state.history = []

        st.markdown("### 📤 Upload")
        uploaded = st.file_uploader(
            "Drag & drop PDFs, MD/TXT, or screenshots",
            type=["pdf", "md", "txt", "png", "jpg", "jpeg", "bmp", "tiff"],
            accept_multiple_files=True,
        )
        if uploaded:
            for file in uploaded:
                target = upload_dir / file.name
                target.write_bytes(file.getbuffer())
            st.success(f"Saved {len(uploaded)} file(s) to uploads.")
        if st.button("Ingest uploads", use_container_width=True):
            with st.spinner("Indexing uploads..."):
                count = ingest("./data/source")
            st.success(f"Ingested {count} chunks.")
            st.session_state["last_ingest"] = count
            st.rerun()

        st.markdown("### ⚡ Performance")
        fast_mode = st.toggle("Fast mode", value=True)
        use_rerank = st.toggle("Use reranker", value=not fast_mode)
        run_quality = st.toggle("Quality check", value=False if fast_mode else True)
        use_llm_classify = st.toggle("LLM query classification", value=False if fast_mode else True)

st.markdown(
        """
        <div class="hero">
            <div>
                <div class="badge">Local • Private • Offline-ready</div>
                <h1 class="hero-title">📚 Local LLM Tutor</h1>
                <div class="hero-sub">Explain concepts directly from your course material with hybrid RAG.</div>
            </div>
            <div class="card" style="min-width: 240px;">
                <div class="stat"><span class="label">Retriever</span><span class="pill ok">Hybrid + RRF</span></div>
                <div class="stat" style="margin-top:8px;"><span class="label">Reranker</span><span class="pill ok">Cross-Encoder</span></div>
                <div class="stat" style="margin-top:8px;"><span class="label">Memory</span><span class="pill ok">Multi-turn</span></div>
            </div>
        </div>
        """,
        unsafe_allow_html=True,
)

st.markdown("<br/>", unsafe_allow_html=True)

if not index_ready:
        st.warning("Indexes not found. Run the ingestion script before chatting.")

col1, col2 = st.columns([2.2, 1])

with col1:
    st.subheader("Ask your tutor")
    query = st.text_area(
        "Question",
        placeholder="Explain the bias-variance tradeoff with examples...",
        height=90,
        label_visibility="collapsed",
    )
    submit = st.button("Explain", type="primary", use_container_width=True, disabled=not index_ready)

with col2:
    st.subheader("Tips")
    st.markdown(
        """
        <div class="card">
        • Ask conceptual “why” questions<br/>
        • Reference lecture titles<br/>
        • Compare methods or tradeoffs
        </div>
        """,
        unsafe_allow_html=True,
    )

if submit and query:
    if ollama_state != "ok":
        st.error("Ollama is not reachable from the app. Check the base URL and that Ollama is running.")
        st.stop()
    with st.spinner("Thinking..."):
        result = answer_question(
            query,
            st.session_state.history,
            use_llm_classify=use_llm_classify,
            use_rerank=use_rerank,
            run_quality_check=run_quality,
        )
    if "error" in result:
        st.error(result["error"])
    else:
        st.session_state.history.append({"user": query, "assistant": result["answer"]})

        st.subheader("Answer")
        st.markdown(f"<div class='chat-bubble-ai'>{result['answer']}</div>", unsafe_allow_html=True)

        st.subheader("Query Type")
        st.markdown(f"<span class='pill ok'>{result['query_type']}</span>", unsafe_allow_html=True)

        st.subheader("Quality Check")
        st.json(result["quality"])

        st.subheader("Sources")
        for i, doc in enumerate(result["sources"], start=1):
            meta = doc.metadata or {}
            with st.expander(f"[{i}] {meta.get('source', 'unknown')} (Page {meta.get('page', '-')})"):
                st.write(doc.page_content)

if st.session_state.history:
    st.subheader("Conversation")
    for item in st.session_state.history[-6:]:
        st.markdown(f"<div class='chat-bubble-user'>🧑‍🎓 {item['user']}</div>", unsafe_allow_html=True)
        st.markdown(f"<div class='chat-bubble-ai'>🤖 {item['assistant']}</div>", unsafe_allow_html=True)
