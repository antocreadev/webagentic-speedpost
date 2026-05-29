import React, { useEffect, useMemo, useState } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { search as apiSearch } from "@/lib/api";
import { formatPrice } from "@/lib/format";

interface Props {
  initialQuery?: string;
  // legacy props kept optional so existing callers don't break
  books?: any[];
  events?: any[];
  products?: any[];
}

type Tab = "books" | "events" | "products";

interface SearchResult {
  type: string; // "book" | "event" | "product"
  slug: string;
  title: string;
  subtitle?: string;
  price_cents?: number;
  url?: string;
  [k: string]: any;
}

export default function UnifiedSearch({ initialQuery = "" }: Props) {
  const [q, setQ] = useState(initialQuery);
  const [tab, setTab] = useState<Tab>("books");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const qp = url.searchParams.get("q");
      if (qp) setQ(qp);
    }
  }, []);

  useEffect(() => {
    const k = q.trim();
    if (!k) { setResults([]); return; }
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await apiSearch(k, ["books", "events", "products"]);
        setResults((res?.results as SearchResult[]) ?? []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [q]);

  const grouped = useMemo(() => {
    const out: Record<Tab, SearchResult[]> = { books: [], events: [], products: [] };
    for (const r of results) {
      if (r.type === "book") out.books.push(r);
      else if (r.type === "event") out.events.push(r);
      else if (r.type === "product") out.products.push(r);
    }
    return out;
  }, [results]);

  const counts = { books: grouped.books.length, events: grouped.events.length, products: grouped.products.length };
  const items = grouped[tab];

  return (
    <div>
      <div className="relative max-w-3xl mx-auto">
        <Search size={26} strokeWidth={1.4} className="absolute left-7 top-1/2 -translate-y-1/2 text-cocoa-400" />
        <input
          autoFocus type="search" value={q} onChange={(e) => setQ(e.target.value)}
          placeholder="Que cherchez-vous ?"
          className="w-full pl-16 pr-16 py-6 rounded-full border-2 border-line bg-paper font-display italic text-2xl md:text-3xl text-cocoa-600 placeholder:text-cocoa-200 focus:outline-none focus:border-terracotta-400" />
        {loading ? (
          <Loader2 size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-cocoa-400 animate-spin" />
        ) : q && (
          <button onClick={() => setQ("")} aria-label="Effacer"
            className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-cocoa-400 hover:text-terracotta-400">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="mt-12 flex justify-center gap-2 flex-wrap">
        {(["books", "events", "products"] as Tab[]).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`btn-ghost ${tab === t ? "border-terracotta-400 text-terracotta-400" : ""}`}>
            {t === "books" ? "Livres" : t === "events" ? "Événements" : "Artisans"}
            <span className="ml-2 text-cocoa-400">({counts[t]})</span>
          </button>
        ))}
      </div>

      <div className="mt-10 max-w-4xl mx-auto">
        {q.trim() === "" ? (
          <p className="py-10 text-center font-display italic text-cocoa-400 text-xl">
            Tapez un titre, un auteur, un événement ou un artisan.
          </p>
        ) : items.length === 0 ? (
          <p className="py-10 text-center font-display italic text-cocoa-400 text-xl">
            Aucun résultat dans cette catégorie.
          </p>
        ) : (
          <ul className="divide-y divide-line">
            {items.map((r) => {
              const href = r.url
                || (r.type === "book" ? `/livres/${r.slug}`
                  : r.type === "event" ? `/evenements/${r.slug}`
                  : `/artisans/${r.slug}`);
              return (
                <li key={`${r.type}-${r.slug}`}>
                  <a href={href} className="flex items-center gap-5 py-5 group">
                    <div className="flex-1 min-w-0">
                      <p className="eyebrow">{r.type === "book" ? "Livre" : r.type === "event" ? "Événement" : "Artisan"}</p>
                      <p className="font-display italic text-xl text-cocoa-600 group-hover:text-terracotta-400 transition">{r.title}</p>
                      {r.subtitle && <p className="text-sm text-cocoa-400">{r.subtitle}</p>}
                    </div>
                    {typeof r.price_cents === "number" && (
                      <span className="price-tab">{formatPrice(r.price_cents / 100)}</span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
