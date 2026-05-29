// Adapters mapping API DTOs (cents, slugs, image_url) to the legacy
// shapes used by existing cards/components imported from src/data/*.
// Pages catalog use these so cards (BookCard, EventCard, BoissonCard,
// ProductCard) keep their public API untouched.

import type { Book as ApiBook, Event as ApiEvent, Boisson as ApiBoisson, Genre as ApiGenre, Artisan as ApiArtisan, Product as ApiProduct } from "@/lib/api";
import type { Book as LegacyBook } from "@/data/books";
import type { Event as LegacyEvent } from "@/data/events";
import type { CafeItem as LegacyCafeItem, CafeCategory } from "@/data/cafe";
import type { Genre as LegacyGenre } from "@/data/genres";
import type { ArtisanProduct as LegacyProduct } from "@/data/artisans";

const cents = (n?: number | null) => (typeof n === "number" ? n / 100 : 0);

const FALLBACK_GRADIENT: [string, string] = ["#7C4F31", "#4A2D1F"];

export function toLegacyBook(b: ApiBook): LegacyBook {
  const cg = (b.cover_gradient && b.cover_gradient.length >= 2
    ? [b.cover_gradient[0], b.cover_gradient[1]]
    : FALLBACK_GRADIENT) as [string, string];
  return {
    slug: b.slug,
    title: b.title,
    author: b.author,
    genre: b.genre_slug ?? "roman",
    price: cents(b.price_cents),
    spineColor: b.spine_color ?? cg[0],
    coverGradient: cg,
    summary: b.summary ?? "",
    coupDeCoeur: !!b.coup_de_coeur,
    stock: b.stock ?? 0,
    isbn: b.isbn ?? "",
    publishedAt: b.year_published ? `${b.year_published}-01-01` : new Date().toISOString().slice(0, 10),
    publisher: b.publisher ?? "",
  };
}

export function toLegacyGenre(g: ApiGenre): LegacyGenre {
  return {
    slug: g.slug,
    label: g.label,
    description: g.description ?? "",
    color: g.color ?? "#C77A4F",
    iconKey: g.icon_key ?? "BookOpen",
  };
}

// API events expose starts_at + duration_min + hosted_at; legacy uses
// date + duration + hostedAt ("boutique"|"horsLesMurs").
export function toLegacyEvent(e: ApiEvent): LegacyEvent {
  let hostedAt: LegacyEvent["hostedAt"] = "boutique";
  if (e.hosted_at === "horsLesMurs" || e.hosted_at === "hors-les-murs") hostedAt = "horsLesMurs";
  return {
    slug: e.slug,
    title: e.title,
    date: e.starts_at,
    duration: e.duration_min,
    location: e.location,
    capacity: e.capacity,
    registered: e.registered,
    price: cents(e.price_cents),
    description: e.description ?? "",
    hostedAt,
  };
}

const CAFE_CATEGORIES: CafeCategory[] = ["cafe", "the", "boisson", "kombucha", "the-glace", "dessert"];

function normCategory(c: string): CafeCategory {
  const k = c.toLowerCase().replace(/_/g, "-");
  return (CAFE_CATEGORIES.includes(k as CafeCategory) ? k : "boisson") as CafeCategory;
}

export function toLegacyBoisson(b: ApiBoisson): LegacyCafeItem {
  return {
    slug: b.slug,
    name: b.name,
    category: normCategory(b.category),
    price: cents(b.price_cents),
    ingredients: b.ingredients ?? [],
    allergens: b.allergens ?? [],
    imageKey: b.image_key ?? "espresso",
    signature: b.signature,
  };
}

export function toLegacyProduct(p: ApiProduct, artisan?: { name: string; city?: string }): LegacyProduct {
  const cat = (p.category as LegacyProduct["category"]) || "epicerie";
  return {
    slug: p.slug,
    name: p.name,
    artisan: artisan?.name ?? p.artisan_slug ?? "",
    city: artisan?.city ?? "",
    price: cents(p.price_cents),
    stock: p.stock ?? 0,
    description: p.description ?? "",
    imageKey: p.image_key ?? cat,
    category: cat,
  };
}

// Coerce a paginated or array response to a flat array of items.
export function toItems<T>(r: { items: T[] } | T[] | null | undefined): T[] {
  if (!r) return [];
  if (Array.isArray(r)) return r;
  if (Array.isArray((r as any).items)) return (r as any).items as T[];
  return [];
}

// Pretty error message helper for SSR.
export async function safe<T>(p: Promise<T>, fallback: T): Promise<{ data: T; error: string | null }> {
  try {
    const data = await p;
    return { data, error: null };
  } catch (e) {
    const msg = (e as Error)?.message || "Erreur réseau";
    return { data: fallback, error: msg };
  }
}
