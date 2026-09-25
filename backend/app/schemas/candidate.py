from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, ConfigDict


class CandidateProfileUpdateRequest(BaseModel):
    display_name: Optional[str] = None
    email: Optional[str] = None
    target_role: Optional[str] = None
    current_role: Optional[str] = None
    target_level: Optional[str] = None
    experience_years: Optional[int] = None
    education: Optional[str] = None
    location: Optional[str] = None
    linkedin_url: Optional[str] = None
    skills: Optional[List[str]] = None
    resume_text: Optional[str] = None


class CandidateProfileResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    education: Optional[str] = None
    experience_years: int = 5
    current_role: str
    target_level: str
    location: Optional[str] = None
    linkedin_url: Optional[str] = None
    skills: List[str] = []


class CandidateResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    email: str
    display_name: str
    status: str
    target_role: str
    profile: Optional[CandidateProfileResponse] = None
    created_at: datetime


class CandidateDashboardResponse(BaseModel):
    candidate: CandidateResponse
    active_attempt_id: Optional[str] = None
    attempt_status: Optional[str] = None
    case_attempt_id: Optional[str] = None
    case_status: Optional[str] = None
    latest_score_summary: Optional[dict] = None
    roadmap_summary: Optional[dict] = None
