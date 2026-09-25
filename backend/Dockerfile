# Multi-stage Dockerfile utilizing Astral UV for ultra-fast dependency installation
FROM ghcr.io/astral-sh/uv:latest AS uv_bin
FROM python:3.11-slim

# Copy the uv binary from official image
COPY --from=uv_bin /uv /uvx /bin/

# Set working directory and environment variables
WORKDIR /app
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    UV_SYSTEM_PYTHON=1

# Install basic system dependencies (libpq for psycopg2)
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    libpq5 \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy dependency specifications
COPY requirements.txt .
COPY pyproject.toml .

# Install dependencies using UV directly into system environment
RUN uv pip install --system -r requirements.txt

# Copy application source code
COPY . .

# Expose FastAPI default port
EXPOSE 8000

# Health check against the health endpoint
HEALTHCHECK --interval=10s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Launch uvicorn server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
