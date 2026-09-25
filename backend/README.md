# METI Backend Service

FastAPI-powered backend application for the Modus Enterprise Talent Intelligence (METI) platform.

## Features
- **Assessment Engine:** Server-authoritative countdown timers, question delivery (QT01–QT15), and attempt state progression.
- **Consulting Work Sample:** OmniRetail $1.8B case study with 11 structured deliverable fields.
- **TDD v1.1 Scoring Engine:** Authoritative CCI (Consulting Capability Index), CPI (Potential Index), and CRI (Client Readiness Index).
- **Evidence Confidence Weighting:** $0.25$ self-report to $0.85$ case work-sample.
- **NVIDIA NIM LLM Evaluation:** Qualitative case analysis (`meta/llama-3.1-70b-instruct`) with deterministic fallback.
- **Human Assessor Calibration:** Assessor override review queue with mandatory written rationale and immutable audit events.

## Local Execution (UV)
```bash
# Start PostgreSQL database container
docker compose up -d db

# Run FastAPI backend with live reload
uv run uvicorn app.main:app --reload --port 8000
```

## Docker Containerized Execution
```bash
docker compose up --build
```
OpenAPI documentation available at `http://localhost:8000/docs`.
