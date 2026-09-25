from typing import Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel, ConfigDict


class AttemptCreateRequest(BaseModel):
    candidate_id: str
    assessment_id: Optional[str] = None


class TimerState(BaseModel):
    started_at: datetime
    expires_at: datetime
    remaining_seconds: int
    duration_seconds: int
    is_expired: bool


class AttemptResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    candidate_id: str
    assessment_id: str
    assessment_version: str
    status: str
    current_section: int
    timer: TimerState
    saved_responses: Dict[str, Any] = {}
    is_locked: bool = False


class ResponseSaveRequest(BaseModel):
    response_value: Any
    is_final: bool = False


class ResponseSaveResult(BaseModel):
    status: str = "SAVED"
    question_id: str
    saved_at: datetime


class AttemptSubmitResponse(BaseModel):
    status: str = "SUBMITTED"
    attempt_id: str
    locked_at: datetime
    scoring_status: str = "COMPLETED"
    scores: Optional[Dict[str, Any]] = None
