from __future__ import annotations
from datetime import datetime, timezone
from typing import Optional
from sqlalchemy import String, DateTime, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from ..database import Base


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


class Consent(Base):
    __tablename__ = "consents"
    id: Mapped[int] = mapped_column(primary_key=True)
    key: Mapped[str] = mapped_column(String(255), index=True)
    type: Mapped[str] = mapped_column(String(64))
    version: Mapped[str] = mapped_column(String(16), default="1.0")
    accepted: Mapped[bool] = mapped_column(Boolean, default=True)
    accepted_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)
    ip: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    user_agent: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)


class DataExportRequest(Base):
    __tablename__ = "data_export_requests"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), index=True)
    status: Mapped[str] = mapped_column(String(24), default="pending")
    export_url: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    requested_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)
    expires_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)


class AccountDeletionRequest(Base):
    __tablename__ = "account_deletion_requests"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), index=True)
    reason: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    status: Mapped[str] = mapped_column(String(24), default="pending")
    token: Mapped[str] = mapped_column(String(64), unique=True)
    requested_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)
    processed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
