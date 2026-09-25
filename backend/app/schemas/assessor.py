from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict


class AssessorOverrideRequest(BaseModel):
    reviewer_id: str = "assessor_senior_modus"
    final_cci: float = Field(..., ge=0, le=100)
    final_cri: float = Field(..., ge=0, le=100)
    reason: str = Field(..., min_length=10, description="Mandatory rationale for human assessor override")


class AssessorReviewResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    attempt_id: str
    reviewer_id: str
    original_cci: float
    original_cri: float
    final_cci: float
    final_cri: float
    override_applied: bool
    reason: Optional[str] = None
    status: str
    reviewed_at: datetime


class AssessorQueueItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    attempt_id: str
    candidate_id: str
    candidate_name: str
    submitted_at: datetime
    cci: float
    cpi: float
    cri: float
    is_client_ready: bool
    status: str
