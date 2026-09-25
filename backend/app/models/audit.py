import uuid
import datetime
from sqlalchemy import Column, String, Float, Boolean, DateTime, ForeignKey, JSON, Text
from sqlalchemy.orm import relationship
from app.db.base import Base, TimestampMixin, TenantMixin


class AssessorReview(Base, TimestampMixin, TenantMixin):
    __tablename__ = "assessor_reviews"

    id = Column(String(64), primary_key=True, default=lambda: f"rev_{uuid.uuid4().hex[:12]}")
    attempt_id = Column(String(64), ForeignKey("attempts.id"), nullable=False)
    reviewer_id = Column(String(64), default="assessor_lead", nullable=False)
    
    # Original vs Final Calibrated Indices
    original_cci = Column(Float, nullable=False)
    original_cri = Column(Float, nullable=False)
    final_cci = Column(Float, nullable=False)
    final_cri = Column(Float, nullable=False)
    
    # Mandatory Rationale for Human Calibration
    override_applied = Column(Boolean, default=False, nullable=False)
    reason = Column(Text, nullable=True)
    status = Column(String(50), default="FINAL", nullable=False)
    reviewed_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)

    attempt = relationship("Attempt", back_populates="assessor_reviews")


class AuditEvent(Base, TimestampMixin, TenantMixin):
    __tablename__ = "audit_events"

    id = Column(String(64), primary_key=True, default=lambda: f"aud_{uuid.uuid4().hex[:12]}")
    actor_id = Column(String(64), nullable=False)
    action = Column(String(100), nullable=False)  # e.g., SCORE_OVERRIDE, ATTEMPT_SUBMITTED
    resource_type = Column(String(100), nullable=False)
    resource_id = Column(String(64), nullable=False)
    payload_before = Column(JSON, default=dict, nullable=False)
    payload_after = Column(JSON, default=dict, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
