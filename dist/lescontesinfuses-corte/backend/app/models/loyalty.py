from __future__ import annotations
from datetime import datetime, timezone
from typing import Optional
from sqlalchemy import String, Integer, DateTime, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column
from ..database import Base


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


class LoyaltyAccount(Base):
    __tablename__ = "loyalty_accounts"
    __table_args__ = (
        UniqueConstraint("key_email", name="uq_loyalty_email"),
        UniqueConstraint("key_phone", name="uq_loyalty_phone"),
    )
    id: Mapped[int] = mapped_column(primary_key=True)
    key_email: Mapped[Optional[str]] = mapped_column(String(255), nullable=True, index=True)
    key_phone: Mapped[Optional[str]] = mapped_column(String(32), nullable=True, index=True)
    cafe_stamps: Mapped[int] = mapped_column(Integer, default=0)
    book_stamps: Mapped[int] = mapped_column(Integer, default=0)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow, onupdate=_utcnow)
