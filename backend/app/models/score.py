import uuid
import datetime
from sqlalchemy import Column, String, Float, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.db.base import Base, TimestampMixin, TenantMixin


class ScoreRecord(Base, TimestampMixin, TenantMixin):
    __tablename__ = "score_records"

    id = Column(String(64), primary_key=True, default=lambda: f"scr_{uuid.uuid4().hex[:12]}")
    attempt_id = Column(String(64), ForeignKey("attempts.id"), unique=True, nullable=False)
    candidate_id = Column(String(64), ForeignKey("candidates.id"), nullable=False)

    # Core TDD Multi-Index Metrics
    cci = Column(Float, default=0.0, nullable=False)  # Consulting Capability Index (0 - 100)
    cpi = Column(Float, default=0.0, nullable=False)  # Consulting Potential Index (0 - 100)
    cri = Column(Float, default=0.0, nullable=False)  # Client Readiness Index (0 - 100)
    evidence_confidence = Column(Float, default=0.0, nullable=False)  # Aggregated Evidence Confidence (0 - 100)
    development_gap = Column(Float, default=0.0, nullable=False)  # Gap to benchmark (0 - 100)
    role_match_score = Column(Float, default=0.0, nullable=False)  # Target role fit percentage (0 - 100)
    is_client_ready = Column(Boolean, default=False, nullable=False)

    # Qualitative Diagnostic Insights
    strengths = Column(JSON, default=list, nullable=False)
    development_areas = Column(JSON, default=list, nullable=False)
    radar_data = Column(JSON, default=list, nullable=False)  # [{competency: 'C01', score: 78, benchmark: 80}, ...]

    computed_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)

    attempt = relationship("Attempt", back_populates="score_record")
    candidate = relationship("Candidate", back_populates="score_records")
    components = relationship("ScoreComponent", back_populates="score_record", cascade="all, delete-orphan")


class ScoreComponent(Base, TimestampMixin):
    __tablename__ = "score_components"

    id = Column(String(64), primary_key=True, default=lambda: f"cmp_{uuid.uuid4().hex[:12]}")
    score_record_id = Column(String(64), ForeignKey("score_records.id"), nullable=False)
    competency_code = Column(String(20), nullable=False)  # e.g., C01, C05
    competency_name = Column(String(100), nullable=False)
    raw_score = Column(Float, default=0.0, nullable=False)
    normalized_score = Column(Float, default=0.0, nullable=False)
    confidence_weight = Column(Float, default=0.85, nullable=False)
    evidence_source = Column(String(100), default="CASE_WORK_SAMPLE", nullable=False)

    score_record = relationship("ScoreRecord", back_populates="components")


class Roadmap(Base, TimestampMixin, TenantMixin):
    __tablename__ = "roadmaps"

    id = Column(String(64), primary_key=True, default=lambda: f"rdm_{uuid.uuid4().hex[:12]}")
    candidate_id = Column(String(64), ForeignKey("candidates.id"), unique=True, nullable=False)
    target_role = Column(String(255), default="Enterprise Transformation Consultant", nullable=False)
    phases = Column(JSON, default=list, nullable=False)  # 3-Phase structured curriculum
