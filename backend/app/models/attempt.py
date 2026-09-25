import uuid
import datetime
from sqlalchemy import Column, String, Integer, DateTime, Boolean, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.db.base import Base, TimestampMixin, TenantMixin


class Attempt(Base, TimestampMixin, TenantMixin):
    __tablename__ = "attempts"

    id = Column(String(64), primary_key=True, default=lambda: f"att_{uuid.uuid4().hex[:12]}")
    candidate_id = Column(String(64), ForeignKey("candidates.id"), nullable=False)
    assessment_id = Column(String(64), ForeignKey("assessments.id"), nullable=False)
    assessment_version = Column(String(20), default="1.0", nullable=False)
    status = Column(String(50), default="IN_PROGRESS", nullable=False)  # NOT_STARTED, IN_PROGRESS, PAUSED, SUBMITTED, COMPLETED
    current_section = Column(Integer, default=1, nullable=False)
    
    # Server Authoritative Timer Fields
    started_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    expires_at = Column(DateTime, nullable=False)
    duration_seconds = Column(Integer, default=3600, nullable=False)
    locked_at = Column(DateTime, nullable=True)
    submitted_at = Column(DateTime, nullable=True)

    # Relationships
    candidate = relationship("Candidate", back_populates="attempts")
    assessment = relationship("Assessment", back_populates="attempts")
    responses = relationship("Response", back_populates="attempt", cascade="all, delete-orphan")
    score_record = relationship("ScoreRecord", back_populates="attempt", uselist=False, cascade="all, delete-orphan")
    assessor_reviews = relationship("AssessorReview", back_populates="attempt")


class Response(Base, TimestampMixin):
    __tablename__ = "responses"

    id = Column(String(64), primary_key=True, default=lambda: f"rsp_{uuid.uuid4().hex[:12]}")
    attempt_id = Column(String(64), ForeignKey("attempts.id"), nullable=False)
    question_id = Column(String(64), ForeignKey("questions.id"), nullable=False)
    response_value = Column(JSON, nullable=False)  # e.g. {"selected": "A"}, or {"rankings": ["opt_1", "opt_2"]}
    is_final = Column(Boolean, default=False, nullable=False)
    saved_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)

    attempt = relationship("Attempt", back_populates="responses")
    question = relationship("Question", back_populates="responses")
