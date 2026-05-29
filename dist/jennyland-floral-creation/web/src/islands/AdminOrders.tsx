import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { formatEur, formatDateFr } from "@/lib/format";

const STATUS_LABELS: Record<string, string> = {
  pending: "En attente",
  paid: "Payée",
  in_progress: "En atelier",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("");

  async function load() {
    const r = await api.admin.orders(filter || undefined);
    setOrders(r.orders);
  }

  useEffect(() => { load(); }, [filter]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-4xl text-ink">Commandes</h1>
        <p className="text-sm text-ink-2 mt-1">{orders.length} commande{orders.length > 1 ? "s" : ""} {filter && `· ${STATUS_LABELS[filter] || filter}`}</p>
      </header>

      <div className="flex flex-wrap gap-2">
        {["", "pending", "paid", "in_progress", "shipped", "delivered", "cancelled"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`chip ${filter === s ? "border-accent bg-accent text-ink" : "border-line bg-white text-ink-2"}`}
          >
            {s === "" ? "Toutes" : STATUS_LABELS[s] || s}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-line bg-white/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table w-full min-w-[720px]">
            <thead>
              <tr>
                <th>Référence</th>
                <th>Client</th>
                <th>Date</th>
                <th>Total</th>
                <th>Statut</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-surface/40">
                  <td><a href={`/admin/commandes/${o.reference}`} className="font-mono text-sm text-ink hover:text-rose-deep">{o.reference}</a></td>
                  <td>
                    <div className="text-sm text-ink">{o.customer_first_name} {o.customer_last_name}</div>
                    <div className="text-xs text-ink-2">{o.customer_email}</div>
                  </td>
                  <td className="text-sm text-ink-2">{formatDateFr(o.created_at)}</td>
                  <td className="font-medium text-ink">{formatEur(o.total_cents)}</td>
                  <td>
                    <span className={`chip ${
                      o.status === "paid" ? "border-accent bg-accent/10 text-accent" :
                      o.status === "shipped" ? "border-accent bg-accent/10 text-accent" :
                      o.status === "cancelled" ? "border-rose-300 bg-rose-50 text-rose-900" :
                      "border-line bg-white text-ink-2"
                    }`}>
                      {STATUS_LABELS[o.status] || o.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <a href={`/admin/commandes/${o.reference}`} className="text-xs text-ink-2 hover:text-rose-deep">Détail →</a>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-ink-2 py-8">Aucune commande pour ce filtre.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
