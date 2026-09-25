import datetime
from sqlalchemy.orm import Session
from app.models.assessment import Assessment
from app.models.attempt import Attempt, Response
from app.core.errors import EntityNotFoundException, AttemptExpiredException, AttemptLockedException


class AssessmentEngine:
    @staticmethod
    def start_attempt(db: Session, candidate_id: str, assessment_id: str = None) -> Attempt:
        """Starts a new attempt bound to the active published assessment version."""
        if assessment_id:
            assessment = db.query(Assessment).filter(Assessment.id == assessment_id).first()
        else:
            assessment = db.query(Assessment).filter(Assessment.status == "PUBLISHED").first()

        if not assessment:
            raise EntityNotFoundException("Assessment", assessment_id or "active")

        now = datetime.datetime.utcnow()
        expires_at = now + datetime.timedelta(seconds=assessment.time_limit_seconds)

        attempt = Attempt(
            candidate_id=candidate_id,
            assessment_id=assessment.id,
            assessment_version=assessment.version,
            status="IN_PROGRESS",
            current_section=1,
            started_at=now,
            expires_at=expires_at,
            duration_seconds=assessment.time_limit_seconds
        )
        db.add(attempt)
        db.commit()
        db.refresh(attempt)
        return attempt

    @staticmethod
    def get_timer_state(attempt: Attempt) -> dict:
        """Computes server-authoritative timer state."""
        now = datetime.datetime.utcnow()
        remaining = max(0, int((attempt.expires_at - now).total_seconds()))
        is_expired = remaining <= 0 and attempt.status != "SUBMITTED"
        return {
            "started_at": attempt.started_at,
            "expires_at": attempt.expires_at,
            "remaining_seconds": remaining,
            "duration_seconds": attempt.duration_seconds,
            "is_expired": is_expired
        }

    @staticmethod
    def save_response(db: Session, attempt_id: str, question_id: str, response_value: any, is_final: bool = False) -> Response:
        """Idempotently saves a candidate's answer after validating server timer and lock state."""
        attempt = db.query(Attempt).filter(Attempt.id == attempt_id).first()
        if not attempt:
            raise EntityNotFoundException("Attempt", attempt_id)

        # Check lock state
        if attempt.locked_at or attempt.status == "SUBMITTED":
            raise AttemptLockedException(attempt_id)

        # Check server timer expiration
        timer_state = AssessmentEngine.get_timer_state(attempt)
        if timer_state["is_expired"]:
            attempt.status = "EXPIRED"
            attempt.locked_at = datetime.datetime.utcnow()
            db.commit()
            raise AttemptExpiredException(attempt_id)

        # Upsert response
        existing_response = db.query(Response).filter(
            Response.attempt_id == attempt_id,
            Response.question_id == question_id
        ).first()

        now = datetime.datetime.utcnow()
        if existing_response:
            existing_response.response_value = response_value
            existing_response.is_final = is_final
            existing_response.saved_at = now
            response_obj = existing_response
        else:
            response_obj = Response(
                attempt_id=attempt_id,
                question_id=question_id,
                response_value=response_value,
                is_final=is_final,
                saved_at=now
            )
            db.add(response_obj)

        db.commit()
        db.refresh(response_obj)
        return response_obj

    @staticmethod
    def submit_attempt(db: Session, attempt_id: str) -> Attempt:
        """Locks the attempt and marks it ready for scoring."""
        attempt = db.query(Attempt).filter(Attempt.id == attempt_id).first()
        if not attempt:
            raise EntityNotFoundException("Attempt", attempt_id)

        if attempt.status == "SUBMITTED":
            return attempt  # Idempotent return

        now = datetime.datetime.utcnow()
        attempt.status = "SUBMITTED"
        attempt.locked_at = now
        attempt.submitted_at = now
        db.commit()
        db.refresh(attempt)
        return attempt
