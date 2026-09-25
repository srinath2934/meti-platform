from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.attempt import Attempt, Response
from app.schemas.attempt import (
    AttemptCreateRequest,
    AttemptResponse,
    ResponseSaveRequest,
    ResponseSaveResult,
    AttemptSubmitResponse,
    TimerState
)
from app.services.assessment_engine import AssessmentEngine
from app.services.scoring_engine import ScoringEngine
from app.core.errors import EntityNotFoundException

router = APIRouter(tags=["Attempts"])


@router.post("/assessments/{assessment_id}/attempts", response_model=AttemptResponse)
def start_assessment_attempt(assessment_id: str, payload: AttemptCreateRequest, db: Session = Depends(get_db)):
    """Initializes a new assessment attempt and starts the server-authoritative countdown timer."""
    attempt = AssessmentEngine.start_attempt(db, candidate_id=payload.candidate_id, assessment_id=assessment_id)
    timer_data = AssessmentEngine.get_timer_state(attempt)
    
    return AttemptResponse(
        id=attempt.id,
        candidate_id=attempt.candidate_id,
        assessment_id=attempt.assessment_id,
        assessment_version=attempt.assessment_version,
        status=attempt.status,
        current_section=attempt.current_section,
        timer=TimerState(**timer_data),
        saved_responses={},
        is_locked=bool(attempt.locked_at)
    )


@router.get("/attempts/{attempt_id}", response_model=AttemptResponse)
def get_attempt_state(attempt_id: str, db: Session = Depends(get_db)):
    """Returns the current attempt state, persisted answers, and remaining server seconds."""
    attempt = db.query(Attempt).filter(Attempt.id == attempt_id).first()
    if not attempt:
        raise EntityNotFoundException("Attempt", attempt_id)

    timer_data = AssessmentEngine.get_timer_state(attempt)
    responses = db.query(Response).filter(Response.attempt_id == attempt_id).all()
    saved = {r.question_id: r.response_value for r in responses}

    return AttemptResponse(
        id=attempt.id,
        candidate_id=attempt.candidate_id,
        assessment_id=attempt.assessment_id,
        assessment_version=attempt.assessment_version,
        status=attempt.status,
        current_section=attempt.current_section,
        timer=TimerState(**timer_data),
        saved_responses=saved,
        is_locked=bool(attempt.locked_at)
    )


@router.put("/attempts/{attempt_id}/responses/{question_id}", response_model=ResponseSaveResult)
def save_question_response(
    attempt_id: str,
    question_id: str,
    payload: ResponseSaveRequest,
    db: Session = Depends(get_db)
):
    """Idempotently autosaves a response for a question while the attempt timer is active."""
    response_obj = AssessmentEngine.save_response(
        db=db,
        attempt_id=attempt_id,
        question_id=question_id,
        response_value=payload.response_value,
        is_final=payload.is_final
    )
    return ResponseSaveResult(
        status="SAVED",
        question_id=response_obj.question_id,
        saved_at=response_obj.saved_at
    )


@router.post("/attempts/{attempt_id}/submit", response_model=AttemptSubmitResponse)
def submit_attempt(attempt_id: str, db: Session = Depends(get_db)):
    """Locks the attempt, computes authoritative CCI, CPI, and CRI scores, and returns results."""
    attempt = AssessmentEngine.submit_attempt(db, attempt_id)
    score_record = ScoringEngine.compute_attempt_scores(db, attempt)

    return AttemptSubmitResponse(
        status=attempt.status,
        attempt_id=attempt.id,
        locked_at=attempt.locked_at,
        scoring_status="COMPLETED",
        scores={
            "cci": score_record.cci,
            "cpi": score_record.cpi,
            "cri": score_record.cri,
            "evidence_confidence": score_record.evidence_confidence,
            "role_match": score_record.role_match_score,
            "is_client_ready": score_record.is_client_ready
        }
    )
