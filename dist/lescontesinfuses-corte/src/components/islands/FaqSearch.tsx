import React, { useMemo, useState } from "react";
import { Search, ChevronDown } from "lucide-react";

interface QA { q: string; a: string; }
interface Cat { name: string; slug: string; items: QA[]; }

interface Props { categories: Cat[]; }

export default function FaqSearch({ categories }: Props) {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories
      .map((c) => ({
        ...c,
        items: c.items.filter(
          (it) => it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q)
        ),
      }))
      .filter((c) => c.items.length > 0);
  }, [query, categories]);

  const total = filtered.reduce((n, c) => n + c.items.length, 0);

  return (
    <div>
      <div className="relative max-w-xl mx-auto mb-12">
        <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-cocoa-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Chercher une question, un mot-clé..."
          className="w-full pl-12 pr-5 py-4 bg-cream-50 border border-line rounded-full font-body text-cocoa-700 placeholder:text-cocoa-200 focus:outline-none focus:border-terracotta-400"
        />
        {query && (
          <p className="text-center mt-3 text-xs font-sans text-cocoa-400">
            {total} réponse{total > 1 ? "s" : ""} trouvée{total > 1 ? "s" : ""}
          </p>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center font-display italic text-2xl text-cocoa-400 py-16">
          Pas de réponse pour cette recherche.
        </p>
      ) : (
        <div className="space-y-16">
          {filtered.map((cat) => (
            <section key={cat.slug}>
              <div className="flex items-baseline gap-4 mb-6">
                <h2 className="font-display italic text-3xl text-cocoa-600">{cat.name}</h2>
                <span className="filet flex-1"></span>
                <span className="font-sans text-xs text-cocoa-400">{cat.items.length}</span>
              </div>
              <div className="divide-y divide-line/60 border-y border-line/60">
                {cat.items.map((it, i) => {
                  const id = `${cat.slug}-${i}`;
                  const open = openId === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setOpenId(open ? null : id)}
                      className="w-full text-left py-5 group"
                    >
                      <div className="flex items-start justify-between gap-6">
                        <p className="font-display text-lg sm:text-xl text-cocoa-600 group-hover:text-terracotta-400 transition">
                          {it.q}
                        </p>
                        <ChevronDown
                          size={20}
                          className={`shrink-0 mt-1 text-cocoa-400 transition ${open ? "rotate-180 text-terracotta-400" : ""}`}
                        />
                      </div>
                      <div
                        className={`overflow-hidden transition-[max-height,opacity,margin] duration-500 ${open ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"}`}
                      >
                        <p className="font-body text-cocoa-700 leading-relaxed pr-10">{it.a}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
