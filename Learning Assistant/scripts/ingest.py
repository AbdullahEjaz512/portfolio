import argparse

from src.llm_tutor.ingestion import ingest


def main() -> None:
    parser = argparse.ArgumentParser(description="Ingest documents for the Local LLM Tutor")
    parser.add_argument("--source", default="./data/source", help="Directory with PDF/MD/TXT/PNG/JPG files")
    args = parser.parse_args()

    total = ingest(args.source)
    print(f"Ingested {total} chunks.")


if __name__ == "__main__":
    main()
