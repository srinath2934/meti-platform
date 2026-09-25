import uuid
import datetime
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.db.base import Base, TimestampMixin, TenantMixin


class Candidate(Base, TimestampMixin, TenantMixin):
    __tablename__ = "candidates"

    id = Column(String(64), primary_key=True, default=lambda: f"cand_{uuid.uuid4().hex[:12]}")
    email = Column(String(255), unique=True, index=True, nullable=False)
    display_name = Column(String(255), nullable=False)
    status = Column(String(50), default="ACTIVE", nullable=False)  # ACTIVE, PENDING, COMPLETED
    target_role = Column(String(255), default="Enterprise Transformation Consultant", nullable=False)

    # Relationships
    profile = relationship("CandidateProfile", back_populates="candidate", uselist=False, cascade="all, delete-orphan")
    consents = relationship("Consent", back_populates="candidate", cascade="all, delete-orphan")
    attempts = relationship("Attempt", back_populates="candidate")
    case_attempts = relationship("CaseAttempt", back_populates="candidate")
    score_records = relationship("ScoreRecord", back_populates="candidate")


class CandidateProfile(Base, TimestampMixin):
    __tablename__ = "candidate_profiles"

    id = Column(String(64), primary_key=True, default=lambda: f"prof_{uuid.uuid4().hex[:12]}")
    candidate_id = Column(String(64), ForeignKey("candidates.id"), unique=True, nullable=False)
    education = Column(String(255), nullable=True)
    experience_years = Column(Integer, default=5, nullable=False)
    current_role = Column(String(255), default="Senior Consultant", nullable=False)
    target_level = Column(String(100), default="Manager / Principal", nullable=False)
    location = Column(String(255), default="London, UK", nullable=True)
    linkedin_url = Column(String(512), nullable=True)
    skills = Column(JSON, default=list, nullable=False)

    candidate = relationship("Candidate", back_populates="profile")


class Consent(Base, TimestampMixin):
    __tablename__ = "consents"

    id = Column(String(64), primary_key=True, default=lambda: f"cns_{uuid.uuid4().hex[:12]}")
    candidate_id = Column(String(64), ForeignKey("candidates.id"), nullable=False)
    consent_type = Column(String(100), nullable=False)  # DATA_PROCESSING, AI_EVALUATION, VIDEO_RECORDING
    version = Column(String(20), default="1.0", nullable=False)
    status = Column(String(50), default="GRANTED", nullable=False)
    granted_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)

    candidate = relationship("Candidate", back_populates="consents")
