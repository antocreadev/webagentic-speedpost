import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { formatEur, formatDateFr } from "@/lib/format";

type Stats = {
  orders: { total_orders: number; paid_orders: number; revenue_cents: number; pending_orders: number };
  products: { total: number; active: number };
  low_stock: { id: number; slug: string; name: string; stock: number }[];
  recent_orders: any[];
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [me, setMe] = useState<any>(null);

  useEffect(() => {
    api.me().then((r) => setMe(r.user));
    api.admin.stats().then(setStats).catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <p className="cursive text-3xl text-ink-2">Bonjour {me?.display_name || me?.email || "Jenny"} ✿</p>
        <h1 className="mt-1 font-display text-4xl text-ink">
          Voici l'atelier <span className="cursive text-accent not-italic">aujourd'hui.</span>
        </h1>
      </header>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Commandes payées", value: stats?.orders?.paid_orders ?? "—", color: "#A4B494" },
          { label: "En attente", value: stats?.orders?.pending_orders ?? "—", color: "#F4C66D" },
          { label: "Chiffre d'affaires", value: stats ? formatEur(stats.orders.revenue_cents || 0) : "—", color: "#E89B7B" },
          { label: "Produits actifs", value: stats ? `${stats.products.active}/${stats.products.total}` : "—", color: "#C9A55C" },
        ].map((card) => (
          <div key={card.label} className="rounded-3xl border border-line bg-white/60 p-5">
            <div className="text-xs uppercase tracking-widest text-ink-2">{card.label}</div>
            <div className="mt-2 font-display text-3xl text-ink" style={{ color: card.color }}>
              {card.value}
            </div>
          </div>
        ))}
      </section>

      <section className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-line bg-white/60 p-6">
          <h2 className="font-display text-2xl text-ink mb-4">Commandes récentes</h2>
          {!stats?.recent_orders?.length ? (
            <p className="text-sm text-ink-2">Aucune commande pour l'instant.</p>
          ) : (
            <ul className="space-y-2">
              {stats.recent_orders.slice(0, 8).map((o: any) => (
                <li key={o.id} className="flex justify-between rounded-xl border border-line/60 bg-white px-4 py-3">
                  <div>
                    <a href={`/admin/commandes/${o.reference}`} className="font-mono text-sm text-ink hover:text-rose-deep">{o.reference}</a>
                    <div className="text-xs text-ink-2 mt-0.5">
                      {o.customer_first_name} {o.customer_last_name} · {formatDateFr(o.created_at)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-ink">{formatEur(o.total_cents)}</div>
                    <div className={`text-[11px] uppercase tracking-widest mt-0.5 ${o.status === "paid" ? "text-accent" : o.status === "shipped" ? "text-accent" : "text-ink-2"}`}>
                      {o.status}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <a href="/admin/commandes" className="text-xs uppercase tracking-widest text-ink-2 hover:text-rose-deep mt-4 inline-block">
            Voir toutes les commandes →
          </a>
        </div>

        <div className="rounded-3xl border border-line bg-white/60 p-6">
          <h2 className="font-display text-2xl text-ink mb-4">Stocks à surveiller</h2>
          {!stats?.low_stock?.length ? (
            <p className="text-sm text-ink-2">Tous les stocks sont confortables.</p>
          ) : (
            <ul className="space-y-2">
              {stats.low_stock.map((p) => (
                <li key={p.id} className="flex justify-between rounded-xl border border-line/60 bg-white px-4 py-3">
                  <a href={`/admin/produits/${p.id}`} className="text-sm text-ink hover:text-rose-deep">{p.name}</a>
                  <span className={`chip ${p.stock === 0 ? "border-rose-300 bg-rose-50 text-rose-900" : "border-accent bg-accent/20 text-ink"}`}>
                    {p.stock === 0 ? "Rupture" : `${p.stock} restant`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="grid sm:grid-cols-3 gap-4">
        <a href="/admin/produits/nouveau" className="rounded-3xl border border-accent/40 bg-accent/5 p-6 hover:bg-accent/10 transition">
          <div className="font-display text-2xl text-ink">+ Ajouter un bouquet</div>
          <p className="text-sm text-ink-2 mt-2">Créer une nouvelle pièce dans le catalogue.</p>
        </a>
        <a href="/admin/unitaires" className="rounded-3xl border border-accent/40 bg-accent/5 p-6 hover:bg-accent/10 transition">
          <div className="font-display text-2xl text-ink">+ Fleur unitaire</div>
          <p className="text-sm text-ink-2 mt-2">Ajouter une fleur ou décoration au configurateur.</p>
        </a>
        <a href="/admin/contenu" className="rounded-3xl border border-accent/40 bg-accent/5 p-6 hover:bg-accent/10 transition">
          <div className="font-display text-2xl text-ink">Modifier le contenu</div>
          <p className="text-sm text-ink-2 mt-2">Hero, à propos, FAQ, livraison.</p>
        </a>
      </section>
    </div>
  );
}
