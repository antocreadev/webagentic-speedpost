import { useEffect, useMemo, useState } from "react";
import { adminListProducts } from "@/lib/api";
import { Loader, Empty, handleApi, formatPrice, asArray } from "./_shared";

const TABS: { id: string; label: string }[] = [
  { id: "book", label: "Livres" },
  { id: "product", label: "Artisans" },
  { id: "boisson", label: "Boissons" },
];

export default function AdminProductsTable() {
  const [tab, setTab] = useState("book");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [view, setView] = useState<"list" | "grid">("list");

  async function load() {
    setLoading(true);
    const r = await handleApi(adminListProducts({ type: tab }));
    setItems(asArray<any>(r));
    setLoading(false);
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [tab]);

  const filtered = useMemo(() => {
    if (!q) return items;
    const s = q.toLowerCase();
    return items.filter((it: any) =>
      (it.title || it.name || "").toLowerCase().includes(s) ||
      (it.author || "").toLowerCase().includes(s) ||
      (it.slug || "").toLowerCase().includes(s)
    );
  }, [items, q]);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 flex-wrap">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-full text-sm font-sans border transition-colors ${tab === t.id ? "bg-terracotta-400 border-terracotta-400 text-cream-50" : "bg-cream-50 border-line text-cocoa-700 hover:border-terracotta-400/50"}`}
          >
            {t.label}
          </button>
        ))}
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher..."
          className="ml-auto px-3 h-9 bg-cream-100 border border-line rounded-full text-sm font-sans outline-none w-60"
        />
        <a href="/admin/produits/nouveau" className="btn-terracotta !py-2 !px-4 !text-[11px]">+ Ajouter</a>
      </div>

      {loading ? <Loader /> : filtered.length === 0 ? (
        <Empty title="Aucun produit" hint="Ajoutez votre premier produit." />
      ) : view === "list" ? (
        <div className="bg-cream-50 border border-line rounded-xl overflow-hidden">
          <table className="w-full text-sm font-sans">
            <thead className="bg-cream-100/60 border-b border-line">
              <tr className="text-left text-[10px] uppercase tracking-widest text-cocoa-400">
                <th className="px-4 py-3 font-medium">Titre</th>
                <th className="px-4 py-3 font-medium">Auteur / Artisan</th>
                <th className="px-4 py-3 font-medium text-right">Prix</th>
                <th className="px-4 py-3 font-medium text-right">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((it: any) => (
                <tr key={it.id || it.slug} className="hover:bg-cream-100/40">
                  <td className="px-4 py-3 text-cocoa-700">{it.title || it.name}</td>
                  <td className="px-4 py-3 text-cocoa-400 text-xs">{it.author || it.artisan_slug || it.category || ""}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatPrice(it.price_cents)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{it.stock ?? "–"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
