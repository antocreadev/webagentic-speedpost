from __future__ import annotations
from datetime import datetime
from typing import List, Optional, Literal
from pydantic import BaseModel, ConfigDict, EmailStr, Field


class CartItem(BaseModel):
    kind: Literal["book", "product", "boisson"]
    item_id: int
    qty: int = Field(ge=1, le=50)


class CustomerInfo(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: Optional[str] = None


class ShippingInfo(BaseModel):
    method: Literal["mondial_relay", "domicile", "click_collect"]
    address: Optional[dict] = None
    mondial_relay_point_id: Optional[str] = None
    pickup_slot_at: Optional[datetime] = None


class PaymentInfo(BaseModel):
    method: Literal["cb", "paypal"]
    payment_intent_id: Optional[str] = None


class OrderCreate(BaseModel):
    items: List[CartItem]
    customer: CustomerInfo
    shipping: ShippingInfo
    payment: PaymentInfo
    terms_accepted: bool = True
    notes: Optional[str] = None


class OrderItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    kind: str
    item_id: int
    name: str
    unit_price_cents: int
    qty: int
    line_total_cents: int
    tax_rate: float


class OrderOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    public_token: str
    reference: Optional[str] = None
    status: str
    customer_email: str
    customer_phone: Optional[str] = None
    customer_first_name: Optional[str] = None
    customer_last_name: Optional[str] = None
    shipping_method: str
    shipping_address: Optional[dict] = None
    mondial_relay_point_id: Optional[str] = None
    payment_method: str
    payment_status: str
    subtotal_cents: int
    shipping_cents: int
    tax_cents: int
    total_cents: int
    currency: str
    tracking_number: Optional[str] = None
    created_at: datetime
    items: List[OrderItemOut] = []


class OrderCreateResponse(BaseModel):
    order_id: str
    public_token: str
    reference: Optional[str]
    total_cents: int
    payment_action: dict


class ConfirmPaymentIn(BaseModel):
    payment_intent_id: str
    status: Literal["succeeded", "failed"]


class OrderLookupIn(BaseModel):
    email: Optional[EmailStr] = None
    phone: Optional[str] = None


class OtpVerifyIn(BaseModel):
    otp_id: str
    code: str


class CafeOrderItemIn(BaseModel):
    boisson_slug: str
    qty: int = Field(ge=1, le=20)


class CafeOrderCreate(BaseModel):
    items: List[CafeOrderItemIn]
    first_name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    pickup_time: datetime
    payment: PaymentInfo


class CafeOrderOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    public_token: str
    customer_first_name: str
    pickup_time: datetime
    status: str
    items: list
    total_cents: int
    payment_status: str


class EventRegistrationIn(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    seats: int = Field(default=1, ge=1, le=10)
    payment: dict = Field(default_factory=lambda: {"method": "free"})
    consent_terms: bool = True
    consent_marketing: bool = False


class EventRegistrationOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    public_token: str
    name: str
    email: str
    seats: int
    total_cents: int
    payment_status: str
