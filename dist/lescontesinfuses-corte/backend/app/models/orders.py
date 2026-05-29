from __future__ import annotations
import uuid
from datetime import datetime, timezone
from typing import Optional
from sqlalchemy import String, Integer, Boolean, DateTime, ForeignKey, JSON, Text, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..database import Base
from ..security import random_token


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


def _new_uuid() -> str:
    return str(uuid.uuid4())


class Order(Base):
    __tablename__ = "orders"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_new_uuid)
    public_token: Mapped[str] = mapped_column(String(64), unique=True, index=True, default=random_token)
    reference: Mapped[Optional[str]] = mapped_column(String(32), unique=True, index=True, nullable=True)
    status: Mapped[str] = mapped_column(String(24), default="pending")
    customer_email: Mapped[str] = mapped_column(String(255), index=True)
    customer_phone: Mapped[Optional[str]] = mapped_column(String(32), nullable=True, index=True)
    customer_first_name: Mapped[Optional[str]] = mapped_column(String(128), nullable=True)
    customer_last_name: Mapped[Optional[str]] = mapped_column(String(128), nullable=True)
    customer_id: Mapped[Optional[int]] = mapped_column(ForeignKey("customers.id"), nullable=True)
    shipping_method: Mapped[str] = mapped_column(String(32), default="mondial_relay")
    shipping_address: Mapped[Optional[dict]] = mapped_column(JSON, default=dict)
    mondial_relay_point_id: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    pickup_slot_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    payment_method: Mapped[str] = mapped_column(String(32), default="cb")
    payment_intent_id: Mapped[Optional[str]] = mapped_column(String(128), nullable=True)
    payment_status: Mapped[str] = mapped_column(String(24), default="pending")
    subtotal_cents: Mapped[int] = mapped_column(Integer, default=0)
    shipping_cents: Mapped[int] = mapped_column(Integer, default=0)
    tax_cents: Mapped[int] = mapped_column(Integer, default=0)
    total_cents: Mapped[int] = mapped_column(Integer, default=0)
    currency: Mapped[str] = mapped_column(String(8), default="EUR")
    tracking_number: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)
    paid_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    shipped_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    delivered_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    items: Mapped[list["OrderItem"]] = relationship(back_populates="order", cascade="all, delete-orphan")
    events: Mapped[list["OrderEvent"]] = relationship(back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    __tablename__ = "order_items"
    id: Mapped[int] = mapped_column(primary_key=True)
    order_id: Mapped[str] = mapped_column(ForeignKey("orders.id"))
    kind: Mapped[str] = mapped_column(String(16))  # book|product|boisson
    item_id: Mapped[int] = mapped_column(Integer)
    name: Mapped[str] = mapped_column(String(255))
    unit_price_cents: Mapped[int] = mapped_column(Integer)
    qty: Mapped[int] = mapped_column(Integer, default=1)
    line_total_cents: Mapped[int] = mapped_column(Integer)
    tax_rate: Mapped[float] = mapped_column(Float, default=20.0)
    order: Mapped[Order] = relationship(back_populates="items")


class OrderEvent(Base):
    __tablename__ = "order_events"
    id: Mapped[int] = mapped_column(primary_key=True)
    order_id: Mapped[str] = mapped_column(ForeignKey("orders.id"))
    ts: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)
    type: Mapped[str] = mapped_column(String(64))
    payload: Mapped[Optional[dict]] = mapped_column(JSON, default=dict)
    actor: Mapped[str] = mapped_column(String(128), default="system")
    order: Mapped[Order] = relationship(back_populates="events")


class CafeOrder(Base):
    __tablename__ = "cafe_orders"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_new_uuid)
    public_token: Mapped[str] = mapped_column(String(64), unique=True, index=True, default=random_token)
    customer_first_name: Mapped[str] = mapped_column(String(128))
    customer_email: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    customer_phone: Mapped[Optional[str]] = mapped_column(String(32), nullable=True)
    pickup_time: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    status: Mapped[str] = mapped_column(String(24), default="pending")
    items: Mapped[list] = mapped_column(JSON, default=list)
    total_cents: Mapped[int] = mapped_column(Integer, default=0)
    payment_method: Mapped[str] = mapped_column(String(32), default="onsite")
    payment_status: Mapped[str] = mapped_column(String(24), default="pending")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)


class EventRegistration(Base):
    __tablename__ = "event_registrations"
    id: Mapped[int] = mapped_column(primary_key=True)
    event_id: Mapped[int] = mapped_column(ForeignKey("events.id"))
    public_token: Mapped[str] = mapped_column(String(64), unique=True, index=True, default=random_token)
    name: Mapped[str] = mapped_column(String(255))
    email: Mapped[str] = mapped_column(String(255), index=True)
    phone: Mapped[Optional[str]] = mapped_column(String(32), nullable=True)
    seats: Mapped[int] = mapped_column(Integer, default=1)
    total_cents: Mapped[int] = mapped_column(Integer, default=0)
    payment_method: Mapped[str] = mapped_column(String(16), default="free")
    payment_status: Mapped[str] = mapped_column(String(24), default="pending")
    consent_marketing: Mapped[bool] = mapped_column(Boolean, default=False)
    consent_terms_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)
    attended: Mapped[Optional[bool]] = mapped_column(Boolean, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)
