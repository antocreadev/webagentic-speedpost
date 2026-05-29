import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { formatEur, formatDateFr } from "@/lib/format";

const STATUSES = [
  { v: "pending", label: "En attente de paiement" },
  { v: "paid", label: "Payée" },
  { v: "in_progress", label: "En atelier" },
  { v: "shipped", label: "Expédiée" },
  { v: "delivered", label: "Livrée" },
  { v: "cancelled", label: "Annulée" },
];

export default function AdminOrderDetail({ reference }: { reference: string }) {
  const [order, setOrder] = useState<any>(null);
  const [tracking, setTracking] = useState("");
  const [notes, setNotes] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    const r = await api.admin.order(reference);
    setOrder(r.order);
    setTracking(r.order?.tracking_number || "");
    setNotes(r.order?.notes || "");
    setNewStatus(r.order?.status || "");
  }

  useEffect(() => { load(); }, [reference]);

  async function save() {
    setSaving(true);
    try {
      await api.admin.updateOrder(reference, {
        status: newStatus,
        tracking_number: tracking,
        notes,
      });
      await load();
    } finally {
      setSaving(false);
    }
  }

  if (!order) return <div className="text-center py-20 text-ink-2">Chargement...</div>;

  return (
    <div className="space-y-6 max-w-5xl">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <a href="/admin/commandes" className="text-xs uppercase tracking-widest text-ink-2 hover:text-rose-deep">← Toutes les commandes</a>
          <h1 className="font-display text-4xl text-ink mt-2">
            Commande <span className="font-mono text-3xl">{reference}</span>
          </h1>
          <p className="text-sm text-ink-2 mt-1">Reçue le {formatDateFr(order.created_at)}</p>
        </div>
        <a
          href={`https://wa.me/${(order.customer_phone || "").replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noopener"
          className="btn-light text-xs"
        >
          📱 WhatsApp client
        </a>
      </header>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-3xl border border-line bg-white/60 p-6">
            <h2 className="font-display text-2xl text-ink mb-4">Articles</h2>
            <ul className="space-y-3">
              {order.items.map((it: any, i: number) => (
                <li key={i} className="flex justify-between border-b border-line/60 pb-3">
                  <div>
                    <div className="font-medium text-ink">{it.name}</div>
                    {it.description && <div className="text-xs text-ink-2 mt-0.5">{it.description}</div>}
                    {it.custom_payload && (
                      <details className="text-xs mt-2">
                        <summary className="cursor-pointer text-ink-2">Composition du bouquet personnalisé</summary>
                        <pre className="mt-2 whitespace-pre-wrap font-mono text-[10px] bg-surface p-3 rounded-lg">{JSON.stringify(JSON.parse(it.custom_payload), null, 2)}</pre>
                      </details>
                    )}
                    <div className="text-xs text-ink-2 mt-1">× {it.qty}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">{formatEur(it.unit_price_cents)}</div>
                    <div className="font-medium text-ink">{formatEur(it.total_cents)}</div>
                  </div>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-ink-2">Sous-total</dt><dd>{formatEur(order.subtotal_cents)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-2">Livraison ({order.shipping_method})</dt><dd>{order.shipping_cents === 0 ? "Offerte" : formatEur(order.shipping_cents)}</dd></div>
              <div className="flex justify-between border-t border-line pt-2"><dt className="font-medium">Total</dt><dd className="font-display text-2xl">{formatEur(order.total_cents)}</dd></div>
            </dl>
          </section>

          <section className="rounded-3xl border border-line bg-white/60 p-6">
            <h2 className="font-display text-2xl text-ink mb-4">Notes internes</h2>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="field-input"
              placeholder="Notes invisibles pour le client (rappels logistique, demandes spéciales)…"
            />
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-3xl border border-line bg-white/60 p-6 space-y-4">
            <h2 className="font-display text-xl text-ink">Statut</h2>
            <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="field-input">
              {STATUSES.map((s) => <option key={s.v} value={s.v}>{s.label}</option>)}
            </select>
            <div>
              <label className="field-label">Numéro de suivi</label>
              <input value={tracking} onChange={(e) => setTracking(e.target.value)} className="field-input" />
            </div>
            <button onClick={save} disabled={saving} className="btn-primary w-full disabled:opacity-50">
              {saving ? "Enregistrement..." : "Mettre à jour"}
            </button>
          </section>

          <section className="rounded-3xl border border-line bg-white/60 p-6 space-y-3">
            <h2 className="font-display text-xl text-ink">Client</h2>
            <div>
              <div className="font-medium text-ink">{order.customer_first_name} {order.customer_last_name}</div>
              <a href={`mailto:${order.customer_email}`} className="text-sm text-ink-2 hover:text-rose-deep break-all">{order.customer_email}</a>
              {order.customer_phone && <div className="text-sm text-ink-2 mt-1">{order.customer_phone}</div>}
            </div>
            <div className="border-t border-line pt-3">
              <div className="text-xs uppercase tracking-widest text-ink-2 mb-1">Livraison</div>
              <div className="text-sm text-ink leading-snug">
                {order.shipping_address}<br/>
                {order.shipping_postal} {order.shipping_city}<br/>
                {order.shipping_country}
              </div>
            </div>
          </section>

          {order.paypal_capture_id && (
            <section className="rounded-3xl border border-accent/40 bg-accent/5 p-6 text-xs">
              <div className="text-ink-2 uppercase tracking-widest mb-1">PayPal</div>
              <div className="font-mono break-all">{order.paypal_capture_id}</div>
              {order.paid_at && <div className="text-ink-2 mt-2">Payée le {formatDateFr(order.paid_at)}</div>}
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
