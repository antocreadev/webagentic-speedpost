import React, { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import BookCard from "@/components/cards/BookCard";
import type { Book } from "@/data/books";
import type { Genre } from "@/data/genres";

interface Props {
  books: Book[];
  genres: Genre[];
}

type Sort = "title" | "price-asc" | "price-desc" | "new";

export default function BookCatalog({ books, genres }: Props) {
  const [q, setQ] = useState("");
  const [activeGenres, setActiveGenres] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("title");
  const [maxPrice, setMaxPrice] = useState(40);
  const [stockOnly, setStockOnly] = useState(false);

  const toggleGenre = (slug: string) =>
    setActiveGenres((g) => (g.includes(slug) ? g.filter((x) => x !== slug) : [...g, slug]));

  const filtered = useMemo(() => {
    let arr = books.slice();
    if (q.trim()) {
      const k = q.toLowerCase();
      arr = arr.filter(
        (b) =>
          b.title.toLowerCase().includes(k) ||
          b.author.toLowerCase().includes(k) ||
          b.publisher.toLowerCase().includes(k),
      );
    }
    if (activeGenres.length) arr = arr.filter((b) => activeGenres.includes(b.genre));
    arr = arr.filter((b) => b.price <= maxPrice);
    if (stockOnly) arr = arr.filter((b) => b.stock > 0);
    if (sort === "title") arr.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "price-asc") arr.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") arr.sort((a, b) => b.price - a.price);
    if (sort === "new")
      arr.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
    return arr;
  }, [books, q, activeGenres, sort, maxPrice, stockOnly]);

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-10">
      <aside className="lg:sticky lg:top-28 lg:self-start space-y-8">
        <div>
          <p className="eyebrow">Trier par</p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="mt-2 w-full px-4 py-2.5 rounded-full border border-line bg-paper text-cocoa-700 font-sans text-sm focus:outline-none focus:border-terracotta-400"
          >
            <option value="title">Titre, A à Z</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="new">Nouveautés</option>
          </select>
        </div>
        <div>
          <p className="eyebrow">Prix maximum</p>
          <div className="mt-3 flex items-center gap-3">
            <input
              type="range"
              min={5}
              max={40}
              step={1}
              value={maxPrice}
              onChange={(e) => setMaxPrice(+e.target.value)}
              className="flex-1 accent-terracotta-400"
            />
            <span className="price-tab text-sm w-16 text-right">{maxPrice},00 €</span>
          </div>
        </div>
        <div>
          <p className="eyebrow">Disponibilité</p>
          <label className="mt-2 flex items-center gap-2 text-sm font-sans text-cocoa-700">
            <input
              type="checkbox"
              checked={stockOnly}
              onChange={(e) => setStockOnly(e.target.checked)}
              className="accent-terracotta-400"
            />
            En stock uniquement
          </label>
        </div>
        <div>
          <p className="eyebrow">Genres</p>
          <ul className="mt-3 space-y-2 text-sm font-body">
            {genres.map((g) => (
              <li key={g.slug}>
                <a
                  href={`/livres/${g.slug}`}
                  className="text-cocoa-700 hover:text-terracotta-400 transition"
                >
                  {g.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div>
        <div className="relative">
          <Search
            size={18}
            strokeWidth={1.5}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-cocoa-400"
          />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Chercher un titre, un auteur, un éditeur"
            className="w-full pl-12 pr-12 py-4 rounded-full border border-line bg-paper text-cocoa-700 placeholder:text-cocoa-200 focus:outline-none focus:border-terracotta-400 font-body text-base"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              aria-label="Effacer"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-cocoa-400 hover:text-terracotta-400"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {genres.map((g) => {
            const on = activeGenres.includes(g.slug);
            return (
              <button
                key={g.slug}
                onClick={() => toggleGenre(g.slug)}
                className="chip transition-all"
                style={{
                  borderColor: on ? g.color : "#D9C8A8",
                  color: on ? "#FBF6E9" : g.color,
                  background: on ? g.color : "#FBF6E9",
                }}
              >
                {g.label}
              </button>
            );
          })}
          {activeGenres.length > 0 && (
            <button
              onClick={() => setActiveGenres([])}
              className="chip border-cocoa-400 text-cocoa-400"
            >
              Effacer
            </button>
          )}
        </div>

        <p className="mt-6 eyebrow">
          {filtered.length} {filtered.length > 1 ? "ouvrages" : "ouvrage"} sur {books.length}
        </p>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {filtered.map((b) => (
            <BookCard key={b.slug} book={b} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center">
            <p className="font-display italic text-2xl text-cocoa-400">
              Rien à infuser pour cette requête.
            </p>
            <p className="mt-2 text-sm text-cocoa-400">Essayez un autre titre ou un autre genre.</p>
          </div>
        )}
      </div>
    </div>
  );
}
