import { useEffect, useState } from "react";
import { adminGetDashboardStats, adminListOrders, adminGetStocks } from "@/lib/api";
import { Loader, Empty, handleApi, formatPrice, formatDate, statusTone, asArray } from "./_shared";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [stocks, setStocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [s, o, st] = await Promise.all([
        handleApi(adminGetDashboardStats(), "Stats indisponibles"),
        handleApi(adminListOrders({ limit: 5 }), "Commandes indisponibles"),
        handleApi(adminGetStocks(), "Stocks indisponibles"),
      ]);
      if (s) setStats(s);
      if (o) setOrders(asArray<any>(o));
      if (st) setStocks(asArray<any>(st).filter((x: any) => (x.stock ?? 0) <= 3));
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loader />;

  const tile = (eyebrow: string, value: string, hint?: string) => (
    <div className="rounded-xl border border-line bg-cream-50 p-5">
      <p className="eyebrow !text-[10px]">{eyebrow}</p>
      <p className="font-display italic text-3xl text-cocoa-700 mt-1 tabular-nums">{value}</p>
      {hint && <p className="text-xs text-cocoa-400 mt-1">{hint}</p>}
    </div>
  );

  const ordersToday = stats?.orders_today ?? stats?.ordersToday ?? "0";
  const revenue = stats?.revenue_month_cents ?? stats?.revenueMonth ?? 0;
  const registrations = stats?.event_registrations ?? stats?.registrations ?? 0;
  const lowStock = stats?.low_stock_count ?? stocks.length;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {tile("Commandes du jour", String(ordersToday))}
        {tile("CA du mois", typeof revenue === "number" ? formatPrice(revenue) : String(revenue))}
        {tile("Inscriptions événements", String(registrations))}
        {tile("Stock alerte", String(lowStock), "livres sous le seuil")}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 rounded-xl border border-line bg-cream-50 p-5">
          <header className="flex items-center justify-between mb-4">
            <div>
              <p className="eyebrow !text-[10px]">Activité récente</p>
              <h2 className="font-display italic text-2xl text-cocoa-700 mt-0.5">Dernières commandes</h2>
            </div>
            <a href="/admin/commandes" className="text-xs uppercase tracking-widest text-terracotta-400 hover:text-cocoa-700 font-smallcap">Voir tout</a>
          </header>
          {orders.length === 0 ? (
            <Empty title="Aucune commande" hint="Les nouvelles commandes apparaîtront ici." />
          ) : (
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-widest text-cocoa-400 border-b border-line">
                  <th className="py-2 pr-4 font-medium">N°</th>
                  <th className="py-2 pr-4 font-medium">Client</th>
                  <th className="py-2 pr-4 font-medium">Total</th>
                  <th className="py-2 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {orders.map((o: any) => (
                  <tr key={o.id} className="text-cocoa-700 hover:bg-cream-100/40">
                    <td className="py-3 pr-4 font-mono text-xs">
                      <a href={`/admin/commandes/${o.id}`} className="hover:text-terracotta-400">{o.id}</a>
                    </td>
                    <td className="py-3 pr-4">{o.customer_name || o.customer_email || o.email || "Invité"}</td>
                    <td className="py-3 pr-4 tabular-nums">{formatPrice(o.total_cents)}</td>
                    <td className="py-3"><StatusChip status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="rounded-xl border border-line bg-cocoa-700 text-cream-100 p-5">
          <p className="eyebrow !text-cream-100/60 !text-[10px]">À faire aujourd'hui</p>
          <h2 className="font-display italic text-2xl text-cream-50 mt-0.5">Priorités</h2>
          <ul className="space-y-3 mt-4">
            {stocks.slice(0, 4).map((s: any, i: number) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-terracotta-400 mt-1.5 shrink-0" />
                <span className="text-cream-50">Stock bas : {s.title || s.name || s.slug} ({s.stock ?? 0} restant)</span>
              </li>
            ))}
            {stocks.length === 0 && (
              <li className="text-sm text-cream-100/70">Aucune alerte stock pour le moment.</li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}

function StatusChip({ status }: { status?: string }) {
  const tone = statusTone(status);
  const cls: Record<string, string> = {
    success: "bg-sage-100 text-sage-600",
    warning: "bg-terracotta-50 text-terracotta-600",
    info: "bg-plum-100 text-plum-600",
    neutral: "bg-cream-100 text-cocoa-700",
    danger: "bg-terracotta-100 text-terracotta-700",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-sans ${cls[tone]}`}>
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
      {status || "–"}
    </span>
  );
}
