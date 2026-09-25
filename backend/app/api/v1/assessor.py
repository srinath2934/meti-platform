from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.assessor import AssessorOverrideRequest, AssessorReviewResponse, AssessorQueueItem
from app.services.assessor_service import AssessorService

router = APIRouter(prefix="/assessor", tags=["Assessor Calibration"])


@router.get("/reviews", response_model=List[AssessorQueueItem])
def get_assessor_review_queue(db: Session = Depends(get_db)):
    """Retrieves queue of submitted candidate assessments ready for human calibration review."""
    return AssessorService.get_review_queue(db)


@router.post("/reviews/{attempt_id}/override", response_model=AssessorReviewResponse)
def submit_score_override(
    attempt_id: str,
    payload: AssessorOverrideRequest,
    db: Session = Depends(get_db)
):
    """
    Submits calibrated human assessor override with mandatory rationale.
    Enforces audit logging and updates authoritative candidate scores.
    """
    return AssessorService.apply_override(
        db=db,
        attempt_id=attempt_id,
        final_cci=payload.final_cci,
        final_cri=payload.final_cri,
        reason=payload.reason,
        reviewer_id=payload.reviewer_id
    )
