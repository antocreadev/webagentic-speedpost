import { useEffect, useMemo, useState } from "react";
import { adminListCustomers, adminGetCustomer } from "@/lib/api";
import { Loader, Empty, handleApi, formatPrice, formatDate, asArray } from "./_shared";
import { X, Mail, Download } from "lucide-react";

export default function AdminCustomersTable() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [active, setActive] = useState<any | null>(null);
  const [detail, setDetail] = useState<any | null>(null);

  async function load() {
    setLoading(true);
    const r = await handleApi(adminListCustomers({ q: q || undefined, limit: 50 }));
    setItems(asArray<any>(r));
    setLoading(false);
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  async function openDetail(c: any) {
    setActive(c);
    setDetail(null);
    if (c.email) {
      const r = await handleApi(adminGetCustomer(c.email));
      if (r) setDetail(r);
    }
  }

  function exportCsv() {
    const lines = ["name,email,orders,total_cents"];
    for (const c of items) {
      lines.push([
        JSON.stringify(c.name || `${c.first_name || ""} ${c.last_name || ""}`.trim()),
        c.email || "",
        c.orders_count ?? c.orders ?? 0,
        c.total_cents ?? 0,
      ].join(","));
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "clients.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 flex-wrap">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") load(); }}
          placeholder="Rechercher par nom, email..."
          className="px-3 h-9 bg-cream-100 border border-line rounded-full text-sm font-sans flex-1 max-w-md outline-none"
        />
        <button onClick={load} className="btn-ghost !py-2 !px-4 !text-[11px]">Filtrer</button>
        <button onClick={exportCsv} className="ml-auto btn-ghost !py-2 !px-4 !text-[11px]">Exporter CSV</button>
      </div>

      {loading ? <Loader /> : items.length === 0 ? (
        <Empty title="Aucun client" hint="Aucun résultat pour cette recherche." />
      ) : (
        <div className="bg-cream-50 border border-line rounded-xl overflow-hidden">
          <table className="w-full text-sm font-sans">
            <thead className="bg-cream-100/60 border-b border-line">
              <tr className="text-left text-[10px] uppercase tracking-widest text-cocoa-400">
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium text-right">Commandes</th>
                <th className="px-4 py-3 font-medium text-right">Total</th>
                <th className="px-4 py-3 font-medium">Dernière</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {items.map((c: any) => {
                const name = c.name || `${c.first_name || ""} ${c.last_name || ""}`.trim() || c.email;
                return (
                  <tr key={c.email || c.id} className="hover:bg-cream-100/40 cursor-pointer" onClick={() => openDetail(c)}>
                    <td className="px-4 py-3 text-cocoa-700">{name}</td>
                    <td className="px-4 py-3 text-xs text-cocoa-400">{c.email}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{c.orders_count ?? c.orders ?? 0}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{formatPrice(c.total_cents)}</td>
                    <td className="px-4 py-3 text-xs text-cocoa-400">{formatDate(c.last_order_at || c.last)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {active && (
        <div className="fixed inset-0 z-[85]" role="dialog" aria-modal="true">
          <button aria-label="Fermer" onClick={() => setActive(null)} className="absolute inset-0 bg-cocoa-900/40" />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream-50 shadow-page">
            <header className="flex items-center justify-between border-b border-line px-6 py-4">
              <p className="font-smallcap text-[10px] uppercase tracking-windier text-cocoa-400">Fiche client</p>
              <button onClick={() => setActive(null)} className="rounded p-1.5 text-cocoa-400 hover:text-cocoa-700"><X size={18} /></button>
            </header>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <h2 className="font-display italic text-2xl text-cocoa-700">
                {active.name || `${active.first_name || ""} ${active.last_name || ""}`.trim() || active.email}
              </h2>
              <a href={`mailto:${active.email}`} className="text-sm text-cocoa-400 hover:text-terracotta-400 break-all">{active.email}</a>

              {!detail ? <Loader label="Chargement détail..." /> : (
                <>
                  <dl className="mt-6 grid grid-cols-3 gap-3">
                    <Stat label="Commandes" value={String(detail.orders_count ?? (detail.orders?.length ?? 0))} />
                    <Stat label="Total" value={formatPrice(detail.total_cents ?? 0)} />
                    <Stat label="Dernière" value={formatDate(detail.last_order_at)} />
                  </dl>
                  <section className="mt-6">
                    <h3 className="font-smallcap text-[10px] uppercase tracking-windier text-cocoa-400">Historique</h3>
                    <ul className="mt-3 divide-y divide-line rounded-lg border border-line bg-cream-100/40">
                      {(detail.orders || []).slice(0, 10).map((o: any) => (
                        <li key={o.id} className="flex items-center justify-between px-4 py-3">
                          <div>
                            <a href={`/admin/commandes/${o.id}`} className="font-mono text-xs text-cocoa-700 hover:text-terracotta-400">{o.id}</a>
                            <p className="text-[11px] text-cocoa-400">{formatDate(o.created_at)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm tabular-nums">{formatPrice(o.total_cents)}</p>
                            <p className="text-[10px] uppercase tracking-widest text-cocoa-400">{o.status}</p>
                          </div>
                        </li>
                      ))}
                      {(detail.orders || []).length === 0 && <li className="px-4 py-3 text-sm text-cocoa-400">Aucune commande.</li>}
                    </ul>
                  </section>
                </>
              )}
            </div>
            <footer className="flex items-center gap-2 border-t border-line bg-cream-100/40 px-6 py-3">
              <a href={`mailto:${active.email}`} className="btn-ghost !py-2 !px-4 !text-[11px]"><Mail size={14} /> Email</a>
              <button type="button" className="btn-ghost !py-2 !px-4 !text-[11px]"><Download size={14} /> Export</button>
            </footer>
          </aside>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-cream-100/40 px-3 py-2.5">
      <div className="font-smallcap text-[9px] uppercase tracking-windier text-cocoa-400">{label}</div>
      <p className="mt-1 font-display italic text-lg text-cocoa-700 tabular-nums">{value}</p>
    </div>
  );
}
