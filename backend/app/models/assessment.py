import uuid
from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, JSON, Text
from sqlalchemy.orm import relationship
from app.db.base import Base, TimestampMixin, TenantMixin


class Assessment(Base, TimestampMixin, TenantMixin):
    __tablename__ = "assessments"

    id = Column(String(64), primary_key=True, default=lambda: f"asm_{uuid.uuid4().hex[:12]}")
    code = Column(String(50), default="MC-A", index=True, nullable=False)
    version = Column(String(20), default="1.0", nullable=False)
    status = Column(String(50), default="PUBLISHED", nullable=False)  # DRAFT, REVIEW, APPROVED, PUBLISHED, RETIRED
    title = Column(String(255), default="Enterprise Transformation Consultant Assessment", nullable=False)
    description = Column(Text, nullable=True)
    product_code = Column(String(50), default="MC-A", nullable=False)
    time_limit_seconds = Column(Integer, default=3600, nullable=False)  # 60 minutes
    is_active = Column(Boolean, default=True, nullable=False)

    # Relationships
    sections = relationship("Section", back_populates="assessment", order_by="Section.order_index", cascade="all, delete-orphan")
    attempts = relationship("Attempt", back_populates="assessment")


class Section(Base, TimestampMixin):
    __tablename__ = "sections"

    id = Column(String(64), primary_key=True, default=lambda: f"sec_{uuid.uuid4().hex[:12]}")
    assessment_id = Column(String(64), ForeignKey("assessments.id"), nullable=False)
    order_index = Column(Integer, default=1, nullable=False)
    title = Column(String(255), nullable=False)
    instructions = Column(Text, nullable=True)
    time_allocation_seconds = Column(Integer, default=900, nullable=False)  # 15 minutes per section

    assessment = relationship("Assessment", back_populates="sections")
    questions = relationship("Question", back_populates="section", order_by="Question.order_index", cascade="all, delete-orphan")


class Question(Base, TimestampMixin):
    __tablename__ = "questions"

    id = Column(String(64), primary_key=True, default=lambda: f"qst_{uuid.uuid4().hex[:12]}")
    section_id = Column(String(64), ForeignKey("sections.id"), nullable=False)
    code = Column(String(50), nullable=False)  # e.g., Q01, Q02
    order_index = Column(Integer, default=1, nullable=False)
    type = Column(String(20), default="QT01", nullable=False)  # QT01 (single), QT02 (multi), QT03 (ranked), QT04 (likert), QT05 (scenario)
    prompt = Column(Text, nullable=False)
    options = Column(JSON, default=list, nullable=False)  # List of choices/items/rankables
    scoring_rule = Column(JSON, default=dict, nullable=False)  # Answer key, weights, or scoring rubric
    competency_codes = Column(JSON, default=list, nullable=False)  # e.g., ["C01", "C02"]
    is_required = Column(Boolean, default=True, nullable=False)

    section = relationship("Section", back_populates="questions")
    responses = relationship("Response", back_populates="question")
