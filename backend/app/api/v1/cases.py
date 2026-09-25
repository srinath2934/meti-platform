import datetime
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.case import CaseStudy, CaseAttempt, CaseDeliverable
from app.schemas.case import (
    CaseStudyResponse,
    CaseAttemptResponse,
    CaseDeliverablePayload,
    CaseSubmitResponse
)
from app.services.case_service import CaseService
from app.core.errors import EntityNotFoundException

router = APIRouter(tags=["Cases"])


@router.get("/cases/{case_id}", response_model=CaseStudyResponse)
def get_case_study(case_id: str, db: Session = Depends(get_db)):
    """Retrieves case brief, objectives, constraints, and financial exhibits."""
    case = db.query(CaseStudy).filter(CaseStudy.id == case_id).first()
    if not case:
        case = db.query(CaseStudy).first()
    if not case:
        raise EntityNotFoundException("CaseStudy", case_id)
    return case


@router.post("/cases/{case_id}/attempts", response_model=CaseAttemptResponse)
def start_case_attempt(case_id: str, candidate_id: str, db: Session = Depends(get_db)):
    """Starts a timed work-sample case attempt (45 minutes)."""
    attempt = CaseService.start_case_attempt(db, candidate_id=candidate_id, case_id=case_id)
    now = datetime.datetime.utcnow()
    rem = max(0, int((attempt.expires_at - now).total_seconds()))

    return CaseAttemptResponse(
        id=attempt.id,
        candidate_id=attempt.candidate_id,
        case_id=attempt.case_id,
        status=attempt.status,
        started_at=attempt.started_at,
        expires_at=attempt.expires_at,
        remaining_seconds=rem,
        deliverables=None
    )


@router.get("/case-attempts/{attempt_id}", response_model=CaseAttemptResponse)
def get_case_attempt(attempt_id: str, db: Session = Depends(get_db)):
    """Retrieves the current case attempt deliverables and remaining timer."""
    attempt = db.query(CaseAttempt).filter(CaseAttempt.id == attempt_id).first()
    if not attempt:
        raise EntityNotFoundException("CaseAttempt", attempt_id)

    now = datetime.datetime.utcnow()
    rem = max(0, int((attempt.expires_at - now).total_seconds()))

    deliverable_payload = None
    if attempt.deliverables:
        d = attempt.deliverables
        deliverable_payload = CaseDeliverablePayload(
            problem_statement=d.problem_statement,
            success_metrics=d.success_metrics,
            working_assumptions=d.working_assumptions,
            issue_tree=d.issue_tree,
            hypotheses=d.hypotheses,
            quantitative_analysis=d.quantitative_analysis,
            strategic_options=d.strategic_options,
            final_recommendation=d.final_recommendation,
            risks_and_mitigations=d.risks_and_mitigations,
            first_90_days_roadmap=d.first_90_days_roadmap,
            missing_data_reflection=d.missing_data_reflection
        )

    return CaseAttemptResponse(
        id=attempt.id,
        candidate_id=attempt.candidate_id,
        case_id=attempt.case_id,
        status=attempt.status,
        started_at=attempt.started_at,
        expires_at=attempt.expires_at,
        remaining_seconds=rem,
        deliverables=deliverable_payload
    )


@router.put("/case-attempts/{attempt_id}")
def autosave_case_deliverables(
    attempt_id: str,
    payload: CaseDeliverablePayload,
    db: Session = Depends(get_db)
):
    """Autosaves structured consulting deliverables during the timed case."""
    deliverable = CaseService.autosave_deliverables(
        db=db,
        case_attempt_id=attempt_id,
        payload=payload.model_dump(exclude_unset=True)
    )

    return {"status": "SAVED", "case_attempt_id": attempt_id, "updated_at": deliverable.updated_at}


@router.post("/case-attempts/{attempt_id}/submit", response_model=CaseSubmitResponse)
def submit_case_deliverables(attempt_id: str, db: Session = Depends(get_db)):
    """Submits consulting deliverables, locks attempt, and triggers AI/LLM rubric grading."""
    deliverable = CaseService.submit_case(db, attempt_id)
    return CaseSubmitResponse(
        status="SUBMITTED",
        case_attempt_id=attempt_id,
        evaluation_status="SCORED",
        case_score=deliverable.case_score,
        llm_feedback=deliverable.llm_evaluation or {}
    )
