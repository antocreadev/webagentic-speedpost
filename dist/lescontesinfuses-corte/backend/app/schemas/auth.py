from __future__ import annotations
from typing import Optional
from pydantic import BaseModel, ConfigDict, EmailStr


class RegisterIn(BaseModel):
    email: EmailStr
    password: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    marketing_consent: bool = False


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int


class CustomerOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    email: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    marketing_consent: bool


class ProfileUpdateIn(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    marketing_consent: Optional[bool] = None


class ForgotIn(BaseModel):
    email: EmailStr


class ResetIn(BaseModel):
    token: str
    new_password: str
