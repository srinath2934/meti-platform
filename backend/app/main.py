import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.core.errors import METIException
from app.db.session import init_db, SessionLocal
from app.db.seed import seed_database
from app.api.v1 import api_v1_router
from app.api.v1.health import router as health_router

# Configure structured logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("meti.main")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initializes tables and seeds initial deterministic data on startup."""
    logger.info("Initializing METI backend application...")
    try:
        init_db()
        db = SessionLocal()
        try:
            seed_database(db)
        finally:
            db.close()
        logger.info("METI database initialized and ready.")
    except Exception as e:
        logger.error(f"Startup database initialization error: {e}")
    yield
    logger.info("Shutting down METI backend application.")


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Enterprise Management Consulting Assessment, Evidence, Reporting & Development API",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.exception_handler(METIException)
async def meti_exception_handler(request: Request, exc: METIException):
    return JSONResponse(
        status_code=exc.status_code,
        content=exc.detail
    )


# Mount routers
app.include_router(health_router)
app.include_router(api_v1_router, prefix=settings.API_V1_STR)


@app.get("/")
def root():
    return {
        "message": "Welcome to METI - Modus Enterprise Talent Intelligence API",
        "documentation": "/docs",
        "health": "/health",
        "api_v1": settings.API_V1_STR
    }
