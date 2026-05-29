import { useEffect, useState } from "react";
import { Printer, X } from "lucide-react";
import { adminGetOrder, adminUpdateOrderStatus, adminGenerateLabel, adminGetLabelPdfUrl } from "@/lib/api";
import { Loader, Empty, handleApi, formatPrice, formatDate } from "./_shared";
import { toast } from "@/lib/toast";

interface Props { id: string }

export default function AdminOrderDetail({ id }: Props) {
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [labelOpen, setLabelOpen] = useState(false);
  const [labelInfo, setLabelInfo] = useState<any | null>(null);
  const [generating, setGenerating] = useState(false);

  async function load() {
    setLoading(true);
    const r = await handleApi(adminGetOrder(id));
    if (r) setOrder(r);
    setLoading(false);
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [id]);

  async function changeStatus(status: string) {
    const r = await handleApi(adminUpdateOrderStatus(id, { status }));
    if (r) {
      toast.success("Statut mis à jour", `Commande ${id} : ${status}`);
      load();
    }
  }

  async function generateLabel() {
    setGenerating(true);
    const r = await handleApi(adminGenerateLabel(id), "Étiquette indisponible");
    setGenerating(false);
    if (r) {
      setLabelInfo(r);
      setLabelOpen(true);
      toast.success("Étiquette générée", "PDF prêt");
    }
  }

  if (loading) return <Loader />;
  if (!order) return <Empty title="Commande introuvable" hint={`ID ${id}`} />;

  const items = order.items || [];
  const events = order.events || order.timeline || [];
  const ship = order.shipping || order.shipping_address || {};

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6">
      <div className="space-y-5">
        <div className="bg-cream-50 border border-line rounded-xl p-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="eyebrow !text-[10px]">Commande</p>
              <h1 className="font-display italic text-3xl text-cocoa-700 mt-1 font-mono">{order.id}</h1>
              <p className="text-sm text-cocoa-400">Créée le {formatDate(order.created_at)}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3 py-1 text-sm">
              {order.status}
            </span>
          </div>
        </div>

        <div className="bg-cream-50 border border-line rounded-xl p-5">
          <h2 className="font-display italic text-xl text-cocoa-700 mb-3">Articles</h2>
          {items.length === 0 ? <Empty title="Aucun article" /> : (
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-widest text-cocoa-400 border-b border-line">
                  <th className="py-2 pr-4 font-medium">Produit</th>
                  <th className="py-2 pr-4 font-medium text-right">Qté</th>
                  <th className="py-2 pr-4 font-medium text-right">PU</th>
                  <th className="py-2 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {items.map((it: any, i: number) => (
                  <tr key={i}>
                    <td className="py-2 pr-4">{it.title || it.name || it.slug}</td>
                    <td className="py-2 pr-4 text-right tabular-nums">{it.quantity ?? it.qty ?? 1}</td>
                    <td className="py-2 pr-4 text-right tabular-nums">{formatPrice(it.unit_price_cents ?? it.price_cents)}</td>
                    <td className="py-2 text-right tabular-nums">{formatPrice((it.unit_price_cents ?? it.price_cents ?? 0) * (it.quantity ?? it.qty ?? 1))}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-line">
                  <td colSpan={3} className="py-3 pr-4 text-right text-cocoa-400">Total</td>
                  <td className="py-3 text-right tabular-nums font-medium text-cocoa-700">{formatPrice(order.total_cents)}</td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>

        {events.length > 0 && (
          <div className="bg-cream-50 border border-line rounded-xl p-5">
            <h2 className="font-display italic text-xl text-cocoa-700 mb-3">Activité</h2>
            <ul className="space-y-3">
              {events.map((e: any, i: number) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="inline-block w-2 h-2 rounded-full bg-terracotta-400 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-cocoa-700">{e.event || e.type || e.message}</p>
                    <p className="text-[11px] text-cocoa-400">{formatDate(e.created_at || e.at)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <aside className="space-y-5">
        <div className="bg-cream-50 border border-line rounded-xl p-5">
          <p className="eyebrow !text-[10px]">Client</p>
          <p className="font-display italic text-lg text-cocoa-700 mt-1">{order.customer_name || "Invité"}</p>
          <p className="text-sm text-cocoa-400 break-all">{order.customer_email || order.email}</p>
          {order.customer_phone && <p className="text-sm text-cocoa-400">{order.customer_phone}</p>}
        </div>

        {(ship.street || ship.line1 || order.shipping_method) && (
          <div className="bg-cream-50 border border-line rounded-xl p-5">
            <p className="eyebrow !text-[10px]">Livraison</p>
            <p className="text-sm text-cocoa-700 mt-1">{order.shipping_method || "Mondial Relay"}</p>
            <p className="text-sm text-cocoa-400 leading-tight mt-1">
              {ship.street || ship.line1}<br />
              {ship.zip || ship.postal_code} {ship.city}
            </p>
          </div>
        )}

        <div className="bg-cream-50 border border-line rounded-xl p-5 space-y-2">
          <p className="eyebrow !text-[10px] mb-1">Actions</p>
          <button
            type="button"
            onClick={generateLabel}
            disabled={generating}
            className="btn-terracotta w-full !justify-center disabled:opacity-60"
          >
            <Printer size={14} /> {generating ? "Génération..." : "Générer étiquette Mondial Relay"}
          </button>
          <select
            onChange={(e) => { if (e.target.value) { changeStatus(e.target.value); e.target.value = ""; } }}
            defaultValue=""
            className="w-full bg-cream-100 border border-line rounded-md px-3 py-2 text-sm"
          >
            <option value="" disabled>Changer statut...</option>
            <option value="paid">Marquer payée</option>
            <option value="preparing">En préparation</option>
            <option value="shipped">Expédiée</option>
            <option value="delivered">Livrée</option>
            <option value="cancelled">Annulée</option>
          </select>
        </div>
      </aside>

      {labelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-cocoa-800/55 backdrop-blur-sm overflow-y-auto">
          <div className="bg-cream-50 border border-line rounded-2xl max-w-2xl w-full p-6 relative shadow-page my-auto">
            <button type="button" aria-label="Fermer" onClick={() => setLabelOpen(false)} className="absolute top-4 right-4 p-1 text-cocoa-400 hover:text-cocoa-700">
              <X size={18} />
            </button>
            <p className="eyebrow">Étiquette Mondial Relay</p>
            <h3 className="font-display italic text-xl text-cocoa-700 mt-1">
              Suivi : {labelInfo?.tracking_number || labelInfo?.tracking || "..."}
            </h3>
            <iframe
              src={adminGetLabelPdfUrl(id)}
              className="mt-4 w-full h-[60vh] border border-line rounded-md bg-white"
              title="PDF étiquette"
            />
            <div className="mt-4 flex justify-end gap-3">
              <a href={adminGetLabelPdfUrl(id)} target="_blank" rel="noreferrer" className="btn-terracotta">
                <Printer size={14} /> Ouvrir le PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
