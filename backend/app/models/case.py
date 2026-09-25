import uuid
import datetime
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, JSON, Text, Float
from sqlalchemy.orm import relationship
from app.db.base import Base, TimestampMixin, TenantMixin


class CaseStudy(Base, TimestampMixin, TenantMixin):
    __tablename__ = "case_studies"

    id = Column(String(64), primary_key=True, default=lambda: f"cs_{uuid.uuid4().hex[:12]}")
    code = Column(String(50), default="CASE-OMNI", nullable=False)
    title = Column(String(255), default="OmniRetail $1.8B Omnichannel Transformation", nullable=False)
    industry = Column(String(100), default="Retail & Consumer Goods", nullable=False)
    objective = Column(Text, nullable=False)
    constraints = Column(Text, nullable=True)
    brief = Column(Text, nullable=False)
    exhibits = Column(JSON, default=list, nullable=False)  # Financial tables, store network metrics, logistics graphs
    time_limit_minutes = Column(Integer, default=45, nullable=False)

    case_attempts = relationship("CaseAttempt", back_populates="case_study")


class CaseAttempt(Base, TimestampMixin, TenantMixin):
    __tablename__ = "case_attempts"

    id = Column(String(64), primary_key=True, default=lambda: f"catt_{uuid.uuid4().hex[:12]}")
    candidate_id = Column(String(64), ForeignKey("candidates.id"), nullable=False)
    case_id = Column(String(64), ForeignKey("case_studies.id"), nullable=False)
    status = Column(String(50), default="IN_PROGRESS", nullable=False)  # IN_PROGRESS, SUBMITTED, SCORING, SCORED
    
    # Server Authoritative Timer
    started_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    expires_at = Column(DateTime, nullable=False)
    submitted_at = Column(DateTime, nullable=True)

    candidate = relationship("Candidate", back_populates="case_attempts")
    case_study = relationship("CaseStudy", back_populates="case_attempts")
    deliverables = relationship("CaseDeliverable", back_populates="case_attempt", uselist=False, cascade="all, delete-orphan")


class CaseDeliverable(Base, TimestampMixin):
    __tablename__ = "case_deliverables"

    id = Column(String(64), primary_key=True, default=lambda: f"cdel_{uuid.uuid4().hex[:12]}")
    case_attempt_id = Column(String(64), ForeignKey("case_attempts.id"), unique=True, nullable=False)

    # 11 Structured TDD v1.1 Consulting Outputs
    problem_statement = Column(Text, nullable=True)
    success_metrics = Column(Text, nullable=True)
    working_assumptions = Column(Text, nullable=True)
    issue_tree = Column(JSON, default=dict, nullable=True)  # Structured MECE branches
    hypotheses = Column(Text, nullable=True)
    quantitative_analysis = Column(Text, nullable=True)
    strategic_options = Column(Text, nullable=True)
    final_recommendation = Column(Text, nullable=True)
    risks_and_mitigations = Column(Text, nullable=True)
    first_90_days_roadmap = Column(Text, nullable=True)
    missing_data_reflection = Column(Text, nullable=True)

    # Automated Evaluation Feedback (NVIDIA NIM or Rule Evaluator)
    llm_evaluation = Column(JSON, default=dict, nullable=True)
    case_score = Column(Float, default=0.0, nullable=False)  # 0 to 100

    case_attempt = relationship("CaseAttempt", back_populates="deliverables")
