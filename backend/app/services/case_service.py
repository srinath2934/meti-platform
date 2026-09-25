import datetime
from typing import Dict, Any
from sqlalchemy.orm import Session
from app.models.case import CaseStudy, CaseAttempt, CaseDeliverable
from app.services.llm_evaluator import LLMEvaluator
from app.core.errors import EntityNotFoundException, AttemptExpiredException, AttemptLockedException


class CaseService:
    @staticmethod
    def start_case_attempt(db: Session, candidate_id: str, case_id: str = None) -> CaseAttempt:
        """Starts a timed work-sample case attempt (45 minutes)."""
        if case_id:
            case = db.query(CaseStudy).filter(CaseStudy.id == case_id).first()
        else:
            case = db.query(CaseStudy).first()

        if not case:
            raise EntityNotFoundException("CaseStudy", case_id or "default")

        now = datetime.datetime.utcnow()
        expires_at = now + datetime.timedelta(minutes=case.time_limit_minutes)

        case_attempt = CaseAttempt(
            candidate_id=candidate_id,
            case_id=case.id,
            status="IN_PROGRESS",
            started_at=now,
            expires_at=expires_at
        )
        db.add(case_attempt)
        db.flush()

        # Initialize blank deliverables container
        deliverable = CaseDeliverable(case_attempt_id=case_attempt.id)
        db.add(deliverable)

        db.commit()
        db.refresh(case_attempt)
        return case_attempt

    @staticmethod
    def autosave_deliverables(db: Session, case_attempt_id: str, payload: Dict[str, Any]) -> CaseDeliverable:
        """Autosaves work-sample deliverables while attempt is in progress."""
        attempt = db.query(CaseAttempt).filter(CaseAttempt.id == case_attempt_id).first()
        if not attempt:
            raise EntityNotFoundException("CaseAttempt", case_attempt_id)

        if attempt.status == "SUBMITTED":
            raise AttemptLockedException(case_attempt_id)

        now = datetime.datetime.utcnow()
        if now > attempt.expires_at:
            attempt.status = "EXPIRED"
            db.commit()
            raise AttemptExpiredException(case_attempt_id)

        deliverable = db.query(CaseDeliverable).filter(CaseDeliverable.case_attempt_id == case_attempt_id).first()
        if not deliverable:
            deliverable = CaseDeliverable(case_attempt_id=case_attempt_id)
            db.add(deliverable)

        for key, val in payload.items():
            if hasattr(deliverable, key) and val is not None:
                setattr(deliverable, key, val)

        db.commit()
        db.refresh(deliverable)
        return deliverable

    @staticmethod
    def submit_case(db: Session, case_attempt_id: str) -> CaseDeliverable:
        """Locks the case attempt and triggers AI evaluation."""
        attempt = db.query(CaseAttempt).filter(CaseAttempt.id == case_attempt_id).first()
        if not attempt:
            raise EntityNotFoundException("CaseAttempt", case_attempt_id)

        deliverable = db.query(CaseDeliverable).filter(CaseDeliverable.case_attempt_id == case_attempt_id).first()
        if not deliverable:
            raise EntityNotFoundException("CaseDeliverable", case_attempt_id)

        # Trigger AI / Rule evaluation
        eval_payload = {
            "problem_statement": deliverable.problem_statement,
            "success_metrics": deliverable.success_metrics,
            "working_assumptions": deliverable.working_assumptions,
            "issue_tree": deliverable.issue_tree,
            "hypotheses": deliverable.hypotheses,
            "quantitative_analysis": deliverable.quantitative_analysis,
            "strategic_options": deliverable.strategic_options,
            "final_recommendation": deliverable.final_recommendation,
            "risks_and_mitigations": deliverable.risks_and_mitigations,
            "first_90_days_roadmap": deliverable.first_90_days_roadmap,
            "missing_data_reflection": deliverable.missing_data_reflection,
        }

        ai_result = LLMEvaluator.evaluate_case_deliverables(eval_payload)
        deliverable.llm_evaluation = ai_result
        deliverable.case_score = ai_result.get("overall_score", 78.0)

        attempt.status = "SUBMITTED"
        attempt.submitted_at = datetime.datetime.utcnow()

        db.commit()
        db.refresh(deliverable)
        return deliverable
