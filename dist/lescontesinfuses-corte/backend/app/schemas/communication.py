from __future__ import annotations
from typing import Optional, Dict
from pydantic import BaseModel, EmailStr


class NewsletterSubscribeIn(BaseModel):
    email: EmailStr
    phone: Optional[str] = None
    preferences: Optional[Dict[str, bool]] = None


class NewsletterConfirmIn(BaseModel):
    token: str


class NewsletterUnsubscribeIn(BaseModel):
    email: Optional[EmailStr] = None
    token: Optional[str] = None


class ContactIn(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str
    consent_privacy: bool = True


class GiftCardCreateIn(BaseModel):
    value_cents: int
    message: Optional[str] = None
    recipient_email: EmailStr
    recipient_name: Optional[str] = None
    sender_name: Optional[str] = None
    sender_email: EmailStr
    deliver_at: Optional[str] = None


class ConsentIn(BaseModel):
    key: str
    type: str
    accepted: bool = True
    version: str = "1.0"
    ip: Optional[str] = None
    user_agent: Optional[str] = None
