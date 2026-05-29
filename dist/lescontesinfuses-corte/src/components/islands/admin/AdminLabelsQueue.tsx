import { useEffect, useState } from "react";
import { Printer } from "lucide-react";
import { adminListOrders, adminGenerateLabel, adminGetLabelPdfUrl } from "@/lib/api";
import { Loader, Empty, handleApi, formatDate, asArray } from "./_shared";
import { toast } from "@/lib/toast";

// File d'étiquettes : commandes payées/préparées sans étiquette générée.
export default function AdminLabelsQueue() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [working, setWorking] = useState(false);

  async function load() {
    setLoading(true);
    const [paid, prep] = await Promise.all([
      handleApi(adminListOrders({ status: "paid", limit: 50 })),
      handleApi(adminListOrders({ status: "preparing", limit: 50 })),
    ]);
    const all = [...asArray<any>(paid), ...asArray<any>(prep)];
    setOrders(all);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function toggle(id: string) {
    const s = new Set(selected);
    if (s.has(id)) s.delete(id); else s.add(id);
    setSelected(s);
  }

  async function printSelected() {
    if (selected.size === 0) return;
    setWorking(true);
    let ok = 0;
    for (const id of selected) {
      const r = await handleApi(adminGenerateLabel(id), `Échec ${id}`);
      if (r) {
        ok++;
        window.open(adminGetLabelPdfUrl(id), "_blank");
      }
    }
    setWorking(false);
    toast.success("Lot étiquettes", `${ok} étiquettes générées`);
    setSelected(new Set());
    load();
  }

  if (loading) return <Loader />;
  if (orders.length === 0) return <Empty title="Aucune étiquette en attente" hint="Toutes les commandes sont à jour." />;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <p className="text-sm text-cocoa-400">{orders.length} commandes en file, {selected.size} sélectionnées</p>
        <button
          type="button"
          disabled={selected.size === 0 || working}
          className="ml-auto btn-terracotta !py-2 !px-4 !text-[11px] disabled:opacity-50"
          onClick={printSelected}
        >
          <Printer size={14} /> Imprimer sélection
        </button>
      </div>

      <div className="bg-cream-50 border border-line rounded-xl overflow-hidden">
        <table className="w-full text-sm font-sans">
          <thead className="bg-cream-100/60 border-b border-line">
            <tr className="text-left text-[10px] uppercase tracking-widest text-cocoa-400">
              <th className="px-4 py-3 w-10"></th>
              <th className="px-4 py-3 font-medium">N°</th>
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Statut</th>
              <th className="px-4 py-3 font-medium">Créée</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
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
                <td className="px-4 py-3">{o.customer_name || "Invité"}</td>
                <td className="px-4 py-3 text-xs text-cocoa-400">{o.status}</td>
                <td className="px-4 py-3 text-xs text-cocoa-400">{formatDate(o.created_at)}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={async () => {
                      const r = await handleApi(adminGenerateLabel(o.id), "Échec génération");
                      if (r) {
                        toast.success("Étiquette prête", o.id);
                        window.open(adminGetLabelPdfUrl(o.id), "_blank");
                      }
                    }}
                    className="btn-ghost !py-1 !px-3 !text-[11px]"
                  >
                    <Printer size={12} /> PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
