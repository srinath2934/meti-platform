from fastapi import APIRouter
from app.api.v1.health import router as health_router
from app.api.v1.candidates import router as candidates_router
from app.api.v1.assessments import router as assessments_router
from app.api.v1.attempts import router as attempts_router
from app.api.v1.cases import router as cases_router
from app.api.v1.scores import router as scores_router
from app.api.v1.assessor import router as assessor_router

api_v1_router = APIRouter()

api_v1_router.include_router(health_router)
api_v1_router.include_router(candidates_router)
api_v1_router.include_router(assessments_router)
api_v1_router.include_router(attempts_router)
api_v1_router.include_router(cases_router)
api_v1_router.include_router(scores_router)
api_v1_router.include_router(assessor_router)
