from typing import List, Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel, ConfigDict


class ScoreComponentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    competency_code: str
    competency_name: str
    raw_score: float
    normalized_score: float
    confidence_weight: float
    evidence_source: str


class ScoreRecordResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    attempt_id: str
    candidate_id: str
    cci: float  # Consulting Capability Index
    cpi: float  # Consulting Potential Index
    cri: float  # Client Readiness Index
    evidence_confidence: float
    development_gap: float
    role_match_score: float
    is_client_ready: bool
    strengths: List[str] = []
    development_areas: List[str] = []
    radar_data: List[Dict[str, Any]] = []
    components: List[ScoreComponentResponse] = []
    computed_at: datetime


class RoadmapModule(BaseModel):
    id: str
    title: str
    hours: int
    competency_code: str
    status: str = "PENDING"  # PENDING, IN_PROGRESS, COMPLETED


class RoadmapPhase(BaseModel):
    phase_number: int
    title: str
    target_competency: str
    duration_weeks: int
    modules: List[RoadmapModule] = []


class RoadmapResponse(BaseModel):
    id: str
    candidate_id: str
    target_role: str
    phases: List[RoadmapPhase] = []
