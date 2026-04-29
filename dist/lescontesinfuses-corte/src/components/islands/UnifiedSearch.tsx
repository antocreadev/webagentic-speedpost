import React, { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { Book } from "@/data/books";
import type { Event } from "@/data/events";
import type { ArtisanProduct } from "@/data/artisans";
import { formatPrice, formatDate } from "@/lib/format";

interface Props {
  books: Book[];
  events: Event[];
  products: ArtisanProduct[];
  initialQuery?: string;
}

type Tab = "livres" | "evenements" | "artisans";

export default function UnifiedSearch({ books, events, products, initialQuery = "" }: Props) {
  const [q, setQ] = useState(initialQuery);
  const [tab, setTab] = useState<Tab>("livres");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const qp = url.searchParams.get("q");
      if (qp) setQ(qp);
    }
  }, []);

  const k = q.trim().toLowerCase();
  const fb = useMemo(
    () =>
      !k
        ? books
        : books.filter(
            (b) =>
              b.title.toLowerCase().includes(k) ||
              b.author.toLowerCase().includes(k) ||
              b.publisher.toLowerCase().includes(k),
          ),
    [books, k],
  );
  const fe = useMemo(
    () =>
      !k
        ? events
        : events.filter(
            (e) =>
              e.title.toLowerCase().includes(k) ||
              e.description.toLowerCase().includes(k) ||
              e.location.toLowerCase().includes(k),
          ),
    [events, k],
  );
  const fp = useMemo(
    () =>
      !k
        ? products
        : products.filter(
            (p) =>
              p.name.toLowerCase().includes(k) ||
              p.artisan.toLowerCase().includes(k) ||
              p.city.toLowerCase().includes(k),
          ),
    [products, k],
  );

  const counts = { livres: fb.length, evenements: fe.length, artisans: fp.length };

  return (
    <div>
      <div className="relative max-w-3xl mx-auto">
        <Search
          size={26}
          strokeWidth={1.4}
          className="absolute left-7 top-1/2 -translate-y-1/2 text-cocoa-400"
        />
        <input
          autoFocus
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Que cherchez-vous ?"
          className="w-full pl-16 pr-16 py-6 rounded-full border-2 border-line bg-paper font-display italic text-2xl md:text-3xl text-cocoa-600 placeholder:text-cocoa-200 focus:outline-none focus:border-terracotta-400"
        />
        {q && (
          <button
            onClick={() => setQ("")}
            aria-label="Effacer"
            className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-cocoa-400 hover:text-terracotta-400"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="mt-12 flex justify-center gap-2 flex-wrap">
        {(["livres", "evenements", "artisans"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`btn-ghost ${tab === t ? "border-terracotta-400 text-terracotta-400" : ""}`}
          >
            {t === "livres" ? "Livres" : t === "evenements" ? "Événements" : "Artisans"}
            <span className="ml-2 text-cocoa-400">({counts[t]})</span>
          </button>
        ))}
      </div>

      <div className="mt-10 max-w-4xl mx-auto">
        {tab === "livres" && (
          <ul className="divide-y divide-line">
            {fb.map((b) => (
              <li key={b.slug}>
                <a href={`/livres/${b.slug}`} className="flex items-center gap-5 py-5 group">
                  <div
                    className="w-12 h-16 rounded-sm shrink-0 shadow-book"
                    style={{
                      background: `linear-gradient(155deg, ${b.coverGradient[0]}, ${b.coverGradient[1]})`,
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="eyebrow">{b.publisher}</p>
                    <p className="font-display italic text-xl text-cocoa-600 group-hover:text-terracotta-400 transition">
                      {b.title}
                    </p>
                    <p className="text-sm text-cocoa-400">{b.author}</p>
                  </div>
                  <span className="price-tab">{formatPrice(b.price)}</span>
                </a>
              </li>
            ))}
            {fb.length === 0 && (
              <p className="py-10 text-center font-display italic text-cocoa-400 text-xl">
                Aucun livre.
              </p>
            )}
          </ul>
        )}
        {tab === "evenements" && (
          <ul className="space-y-3">
            {fe.map((e) => (
              <li key={e.slug}>
                <a
                  href={`/evenements/${e.slug}`}
                  className="block bg-cream-50 border border-line rounded-2xl p-5 hover:border-terracotta-400 group"
                >
                  <p className="eyebrow">{formatDate(e.date, "long")}</p>
                  <p className="font-display italic text-xl text-cocoa-600 mt-1 group-hover:text-terracotta-400">
                    {e.title}
                  </p>
                  <p className="text-sm text-cocoa-400 mt-1">{e.location}</p>
                </a>
              </li>
            ))}
            {fe.length === 0 && (
              <p className="py-10 text-center font-display italic text-cocoa-400 text-xl">
                Aucun événement.
              </p>
            )}
          </ul>
        )}
        {tab === "artisans" && (
          <ul className="grid sm:grid-cols-2 gap-4">
            {fp.map((p) => (
              <li key={p.slug}>
                <a
                  href={`/artisans/${p.slug}`}
                  className="block bg-cream-50 border border-line rounded-2xl p-5 hover:border-terracotta-400 group"
                >
                  <p className="eyebrow">
                    {p.artisan}, {p.city}
                  </p>
                  <p className="font-display italic text-xl text-cocoa-600 mt-1 group-hover:text-terracotta-400">
                    {p.name}
                  </p>
                  <p className="price-tab text-sm mt-1">{formatPrice(p.price)}</p>
                </a>
              </li>
            ))}
            {fp.length === 0 && (
              <p className="py-10 text-center font-display italic text-cocoa-400 text-xl">
                Aucun produit.
              </p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
