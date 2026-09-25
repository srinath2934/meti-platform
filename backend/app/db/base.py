import datetime
from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import DeclarativeBase, declared_attr


class Base(DeclarativeBase):
    pass


class TimestampMixin:
    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow, nullable=False)


class TenantMixin:
    @declared_attr
    def tenant_id(cls):
        return Column(String(64), default="default_tenant", nullable=False, index=True)
