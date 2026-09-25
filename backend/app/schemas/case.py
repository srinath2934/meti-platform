from typing import Optional, Dict, Any, List, Union
from datetime import datetime
from pydantic import BaseModel, ConfigDict


class CaseStudyResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    code: str
    title: str
    industry: str
    objective: str
    constraints: Optional[str] = None
    brief: str
    exhibits: List[Dict[str, Any]] = []
    time_limit_minutes: int


class CaseDeliverablePayload(BaseModel):
    problem_statement: Optional[str] = None
    success_metrics: Optional[str] = None
    working_assumptions: Optional[str] = None
    issue_tree: Optional[Union[Dict[str, Any], str, List[Any]]] = None
    hypotheses: Optional[str] = None
    quantitative_analysis: Optional[str] = None
    strategic_options: Optional[str] = None
    final_recommendation: Optional[str] = None
    risks_and_mitigations: Optional[str] = None
    first_90_days_roadmap: Optional[str] = None
    missing_data_reflection: Optional[str] = None


class CaseAttemptResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    candidate_id: str
    case_id: str
    status: str
    started_at: datetime
    expires_at: datetime
    remaining_seconds: int
    deliverables: Optional[CaseDeliverablePayload] = None


class CaseSubmitResponse(BaseModel):
    status: str = "SUBMITTED"
    case_attempt_id: str
    evaluation_status: str = "SCORED"
    case_score: float
    llm_feedback: Dict[str, Any] = {}
