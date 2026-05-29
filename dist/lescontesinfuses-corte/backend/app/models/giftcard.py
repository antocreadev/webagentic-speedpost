from __future__ import annotations
from datetime import datetime, timezone
from typing import Optional
from sqlalchemy import String, Integer, DateTime, JSON, Text
from sqlalchemy.orm import Mapped, mapped_column
from ..database import Base


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


class GiftCard(Base):
    __tablename__ = "gift_cards"
    id: Mapped[int] = mapped_column(primary_key=True)
    code: Mapped[str] = mapped_column(String(32), unique=True, index=True)
    value_cents: Mapped[int] = mapped_column(Integer)
    balance_cents: Mapped[int] = mapped_column(Integer)
    message: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    recipient_email: Mapped[str] = mapped_column(String(255))
    recipient_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    sender_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    sender_email: Mapped[str] = mapped_column(String(255))
    status: Mapped[str] = mapped_column(String(24), default="pending_payment")
    payment_intent_id: Mapped[Optional[str]] = mapped_column(String(128), nullable=True)
    expires_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)
    redeemed_orders: Mapped[list] = mapped_column(JSON, default=list)
