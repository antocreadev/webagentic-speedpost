from __future__ import annotations
from datetime import datetime, timezone
from typing import Optional
from sqlalchemy import String, Integer, Boolean, DateTime, ForeignKey, JSON, Text, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..database import Base


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


class Genre(Base):
    __tablename__ = "genres"
    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(64), unique=True, index=True)
    label: Mapped[str] = mapped_column(String(128))
    description: Mapped[str] = mapped_column(Text, default="")
    color: Mapped[str] = mapped_column(String(16), default="#000000")
    icon_key: Mapped[str] = mapped_column(String(64), default="")
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    books: Mapped[list["Book"]] = relationship(back_populates="genre")


class Book(Base):
    __tablename__ = "books"
    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(128), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(255))
    author: Mapped[str] = mapped_column(String(255))
    isbn: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    publisher: Mapped[Optional[str]] = mapped_column(String(128), nullable=True)
    year_published: Mapped[Optional[str]] = mapped_column(String(32), nullable=True)
    pages: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    summary: Mapped[str] = mapped_column(Text, default="")
    genre_id: Mapped[Optional[int]] = mapped_column(ForeignKey("genres.id"), nullable=True)
    price_cents: Mapped[int] = mapped_column(Integer, default=0)
    stock: Mapped[int] = mapped_column(Integer, default=0)
    coup_de_coeur: Mapped[bool] = mapped_column(Boolean, default=False)
    cover_gradient: Mapped[Optional[list]] = mapped_column(JSON, default=list)
    spine_color: Mapped[Optional[str]] = mapped_column(String(16), nullable=True)
    image_key: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    image_url: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)
    genre: Mapped[Optional[Genre]] = relationship(back_populates="books")


class Event(Base):
    __tablename__ = "events"
    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(128), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(Text, default="")
    starts_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    duration_min: Mapped[int] = mapped_column(Integer, default=60)
    location: Mapped[str] = mapped_column(String(255), default="")
    capacity: Mapped[int] = mapped_column(Integer, default=0)
    registered: Mapped[int] = mapped_column(Integer, default=0)
    price_cents: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    image_key: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    image_url: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    status: Mapped[str] = mapped_column(String(20), default="published")  # draft|published|cancelled
    hosted_at: Mapped[str] = mapped_column(String(20), default="boutique")


class Boisson(Base):
    __tablename__ = "boissons"
    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(128), unique=True, index=True)
    category: Mapped[str] = mapped_column(String(32))
    name: Mapped[str] = mapped_column(String(255))
    ingredients: Mapped[list] = mapped_column(JSON, default=list)
    allergens: Mapped[list] = mapped_column(JSON, default=list)
    price_cents: Mapped[int] = mapped_column(Integer, default=0)
    image_key: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    image_url: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    hot: Mapped[bool] = mapped_column(Boolean, default=False)
    signature: Mapped[bool] = mapped_column(Boolean, default=False)


class Artisan(Base):
    __tablename__ = "artisans"
    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(128), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(255))
    city: Mapped[str] = mapped_column(String(128), default="")
    bio: Mapped[str] = mapped_column(Text, default="")
    image_url: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    products: Mapped[list["Product"]] = relationship(back_populates="artisan")


class Product(Base):
    __tablename__ = "products"
    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(128), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(255))
    artisan_id: Mapped[Optional[int]] = mapped_column(ForeignKey("artisans.id"), nullable=True)
    category: Mapped[str] = mapped_column(String(32), default="")
    price_cents: Mapped[int] = mapped_column(Integer, default=0)
    stock: Mapped[int] = mapped_column(Integer, default=0)
    description: Mapped[str] = mapped_column(Text, default="")
    image_key: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    image_url: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    artisan: Mapped[Optional[Artisan]] = relationship(back_populates="products")
