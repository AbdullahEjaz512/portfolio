# Local LLM Tutor (RAG)

A local, offline study assistant that ingests your course material and explains concepts directly from it using RAG with Ollama, Chroma, and Streamlit.

## Features
- Semantic chunking with metadata enrichment
- Hybrid retrieval (vector + BM25) with Reciprocal Rank Fusion
- Cross-encoder reranking
- Query classification (conceptual, factual, exploratory) for prompt/temperature control
- Multi-turn chat memory
- Hallucination detection and response quality scoring

## Prerequisites
- Python 3.10+
- Ollama installed and running

## Setup (Windows PowerShell)
```powershell
python -m venv .venv
.\.venv\Scripts\Activate
pip install -r requirements.txt
Copy-Item .env.example .env
```

Pull your Ollama model (example):
```powershell
ollama pull llama3.2
```

## Ingest Documents
Place your PDFs/MD/TXT files in `data/source/` and run:
```powershell
python .\scripts\ingest.py --source .\data\source
```

### OCR for screenshots (PNG/JPG)
This project supports OCR on images. Install Tesseract OCR and ensure `tesseract` is available on your PATH, then place PNG/JPG files in `data/source/` and run ingestion.

Windows (winget):
```powershell
winget install --id Tesseract-OCR.Tesseract -e
```

You can also drag-and-drop files directly in the app sidebar and click “Ingest uploads”.

## Run the App
```powershell
streamlit run .\streamlit_app.py
```

## Project Structure
- `scripts/ingest.py` — Ingests documents and builds vector + BM25 indexes
- `streamlit_app.py` — Streamlit UI for chat and explanations
- `src/llm_tutor/` — Core RAG pipeline

## Notes
- This project runs locally and does not send data to external services.
- Replace placeholder models in `.env` if you want different ones.
