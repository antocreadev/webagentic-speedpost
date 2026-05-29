from __future__ import annotations
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field


class GenreOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    slug: str
    label: str
    description: str
    color: str
    icon_key: str


class BookOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    slug: str
    title: str
    author: str
    isbn: Optional[str] = None
    publisher: Optional[str] = None
    summary: str
    price_cents: int
    stock: int
    coup_de_coeur: bool
    cover_gradient: Optional[List[str]] = None
    spine_color: Optional[str] = None
    genre_slug: Optional[str] = None
    image_url: Optional[str] = None


class BookList(BaseModel):
    items: List[BookOut]
    total: int
    limit: int
    offset: int


class EventOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    slug: str
    title: str
    description: str
    starts_at: datetime
    duration_min: int
    location: str
    capacity: int
    registered: int
    price_cents: Optional[int] = None
    seats_remaining: int = 0
    status: str
    hosted_at: str
    image_url: Optional[str] = None


class BoissonOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    slug: str
    name: str
    category: str
    price_cents: int
    ingredients: List[str]
    allergens: List[str]
    image_key: Optional[str] = None
    image_url: Optional[str] = None
    signature: bool = False


class ArtisanOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    slug: str
    name: str
    city: str
    bio: str
    image_url: Optional[str] = None


class ProductOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    slug: str
    name: str
    category: str
    price_cents: int
    stock: int
    description: str
    image_key: Optional[str] = None
    image_url: Optional[str] = None
    artisan_slug: Optional[str] = None


class ArtisanDetailOut(ArtisanOut):
    products: List[ProductOut] = []
