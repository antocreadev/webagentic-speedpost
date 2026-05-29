import { useEffect, useMemo, useState } from "react";
import { adminListOrders, adminUpdateOrderStatus } from "@/lib/api";
import { Loader, Empty, handleApi, formatPrice, formatDate, asArray, statusTone } from "./_shared";
import { toast } from "@/lib/toast";

const STATUSES = ["", "pending", "paid", "preparing", "shipped", "delivered", "cancelled"];
const STATUS_LABELS: Record<string, string> = {
  "": "Tous statuts",
  pending: "En attente",
  paid: "Payée",
  preparing: "En préparation",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
};

export default function AdminOrdersTable() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const limit = 10;

  async function load() {
    setLoading(true);
    const r = await handleApi(
      adminListOrders({ status: status || undefined, q: q || undefined, limit, offset: page * limit })
    );
    if (r) {
      const items = asArray<any>(r);
      setOrders(items);
      setTotal((r as any).total ?? items.length);
    }
    setLoading(false);
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [status, page]);

  function toggle(id: string) {
    const s = new Set(selected);
    if (s.has(id)) s.delete(id); else s.add(id);
    setSelected(s);
  }

  async function bulkShip() {
    if (selected.size === 0) return;
    let ok = 0;
    for (const id of selected) {
      const r = await handleApi(adminUpdateOrderStatus(id, { status: "shipped" }), `Échec ${id}`);
      if (r) ok++;
    }
    toast.success("Lot mis à jour", `${ok} commandes marquées expédiées`);
    setSelected(new Set());
    load();
  }

  function exportCsv() {
    const header = ["id", "customer", "email", "total_cents", "status", "created_at"];
    const lines = [header.join(",")];
    for (const o of orders) {
      lines.push([
        o.id,
        JSON.stringify(o.customer_name || ""),
        o.customer_email || o.email || "",
        o.total_cents ?? 0,
        o.status ?? "",
        o.created_at ?? "",
      ].join(","));
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "commandes.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-5">
      <div className="bg-cream-50 border border-line rounded-xl p-4 flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { setPage(0); load(); } }}
          placeholder="Rechercher (id, client, email)..."
          className="px-3 h-9 bg-cream-100 border border-line rounded-full flex-1 min-w-[200px] max-w-md text-sm font-sans outline-none focus:border-terracotta-400"
        />
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(0); }}
          className="bg-cream-100 border border-line rounded-md px-3 py-1.5 text-sm font-sans"
        >
          {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
        </select>
        <div className="ml-auto flex items-center gap-2">
          {selected.size > 0 && (
            <button type="button" className="btn-terracotta !py-2 !px-4 !text-[11px]" onClick={bulkShip}>
              Marquer expédiées ({selected.size})
            </button>
          )}
          <button type="button" className="btn-ghost !py-2 !px-4 !text-[11px]" onClick={exportCsv}>Exporter CSV</button>
        </div>
      </div>

      <div className="bg-cream-50 border border-line rounded-xl overflow-hidden">
        {loading ? <Loader /> : orders.length === 0 ? (
          <Empty title="Aucune commande" hint="Ajustez les filtres ou attendez une nouvelle commande." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-sans min-w-[800px]">
              <thead className="bg-cream-100/60 border-b border-line">
                <tr className="text-left text-[10px] uppercase tracking-widest text-cocoa-400">
                  <th className="px-4 py-3 w-8"></th>
                  <th className="px-4 py-3 font-medium">N°</th>
                  <th className="px-4 py-3 font-medium">Client</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium text-right">Total</th>
                  <th className="px-4 py-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {orders.map((o: any) => (
                  <tr key={o.id} className="hover:bg-cream-100/40">
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selected.has(o.id)} onChange={() => toggle(o.id)} className="accent-terracotta-400" />
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">
                      <a href={`/admin/commandes/${o.id}`} className="text-cocoa-700 hover:text-terracotta-400">{o.id}</a>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-cocoa-700">{o.customer_name || "Invité"}</div>
                      <div className="text-[11px] text-cocoa-400">{o.customer_email || o.email || ""}</div>
                    </td>
                    <td className="px-4 py-3 text-xs text-cocoa-400 tabular-nums">{formatDate(o.created_at)}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{formatPrice(o.total_cents)}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-2 py-0.5 text-[11px]">
                        <span className={`inline-block h-1.5 w-1.5 rounded-full bg-${tonecolor(statusTone(o.status))}`} />
                        {o.status || "–"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {total > limit && (
        <div className="flex items-center justify-between text-sm text-cocoa-400">
          <span>Page {page + 1} / {Math.ceil(total / limit)}</span>
          <div className="flex gap-2">
            <button disabled={page === 0} onClick={() => setPage((p) => Math.max(0, p - 1))} className="btn-ghost !py-1 !px-3 !text-[11px] disabled:opacity-40">Précédent</button>
            <button disabled={(page + 1) * limit >= total} onClick={() => setPage((p) => p + 1)} className="btn-ghost !py-1 !px-3 !text-[11px] disabled:opacity-40">Suivant</button>
          </div>
        </div>
      )}
    </div>
  );
}

function tonecolor(t: string) {
  const map: Record<string, string> = { success: "sage-500", warning: "terracotta-400", info: "plum-400", neutral: "cocoa-400", danger: "terracotta-600" };
  return map[t] || "cocoa-400";
}
