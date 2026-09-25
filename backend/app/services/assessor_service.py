import datetime
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.models.attempt import Attempt
from app.models.score import ScoreRecord
from app.models.audit import AssessorReview, AuditEvent
from app.core.errors import EntityNotFoundException, ValidationRuleException


class AssessorService:
    @staticmethod
    def get_review_queue(db: Session) -> List[Dict[str, Any]]:
        """Retrieves list of submitted attempts requiring or available for human review."""
        submitted_attempts = db.query(Attempt).filter(Attempt.status == "SUBMITTED").all()
        queue = []
        for att in submitted_attempts:
            score = db.query(ScoreRecord).filter(ScoreRecord.attempt_id == att.id).first()
            candidate = att.candidate
            queue.append({
                "attempt_id": att.id,
                "candidate_id": att.candidate_id,
                "candidate_name": candidate.display_name if candidate else "Candidate",
                "submitted_at": att.submitted_at or att.locked_at or att.started_at,
                "cci": score.cci if score else 0.0,
                "cpi": score.cpi if score else 0.0,
                "cri": score.cri if score else 0.0,
                "is_client_ready": score.is_client_ready if score else False,
                "status": att.status
            })
        return queue

    @staticmethod
    def apply_override(db: Session, attempt_id: str, final_cci: float, final_cri: float, reason: str, reviewer_id: str = "assessor_senior") -> AssessorReview:
        """
        Applies a calibrated human assessor override to candidate scores.
        Enforces TDD v1.1 rule: No silent changes. Rationale is mandatory and audited.
        """
        if not reason or len(reason.strip()) < 10:
            raise ValidationRuleException("Assessor override requires a detailed written justification (minimum 10 characters).")

        score_record = db.query(ScoreRecord).filter(ScoreRecord.attempt_id == attempt_id).first()
        if not score_record:
            raise EntityNotFoundException("ScoreRecord for Attempt", attempt_id)

        original_cci = score_record.cci
        original_cri = score_record.cri

        # Update authoritative score record
        score_record.cci = final_cci
        score_record.cri = final_cri
        score_record.is_client_ready = final_cri >= 65.0
        score_record.development_gap = round(max(0.0, 85.0 - final_cci), 1)
        score_record.role_match_score = round(max(0.0, min(100.0, 100.0 - (score_record.development_gap * 0.75))), 1)

        # Record AssessorReview
        review = AssessorReview(
            attempt_id=attempt_id,
            reviewer_id=reviewer_id,
            original_cci=original_cci,
            original_cri=original_cri,
            final_cci=final_cci,
            final_cri=final_cri,
            override_applied=True,
            reason=reason.strip(),
            status="FINAL"
        )
        db.add(review)

        # Record AuditEvent
        audit = AuditEvent(
            actor_id=reviewer_id,
            action="ASSESSOR_SCORE_OVERRIDE",
            resource_type="ScoreRecord",
            resource_id=score_record.id,
            payload_before={"cci": original_cci, "cri": original_cri},
            payload_after={"cci": final_cci, "cri": final_cri, "reason": reason.strip()}
        )
        db.add(audit)

        db.commit()
        db.refresh(review)
        return review
