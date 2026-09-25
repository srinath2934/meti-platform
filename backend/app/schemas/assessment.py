from typing import List, Optional, Any, Dict
from pydantic import BaseModel, ConfigDict


class QuestionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    code: str
    order_index: int
    type: str  # QT01 - QT15
    prompt: str
    options: List[Any] = []
    competency_codes: List[str] = []
    is_required: bool = True


class SectionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    order_index: int
    title: str
    instructions: Optional[str] = None
    time_allocation_seconds: int
    questions: List[QuestionResponse] = []


class AssessmentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    code: str
    version: str
    status: str
    title: str
    description: Optional[str] = None
    product_code: str
    time_limit_seconds: int
    sections: List[SectionResponse] = []
