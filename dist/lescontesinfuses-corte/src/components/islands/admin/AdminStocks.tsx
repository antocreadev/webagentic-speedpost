import { useEffect, useState } from "react";
import { adminGetStocks, adminSyncLibriSoft } from "@/lib/api";
import { Loader, Empty, handleApi, asArray } from "./_shared";
import { toast } from "@/lib/toast";

export default function AdminStocks() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  async function load() {
    setLoading(true);
    const r = await handleApi(adminGetStocks());
    setItems(asArray<any>(r));
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function sync() {
    setSyncing(true);
    const r = await handleApi(adminSyncLibriSoft(), "Sync LibriSoft échouée");
    setSyncing(false);
    if (r) {
      toast.success("Sync LibriSoft", `${(r as any).synced ?? 0} produits synchronisés`);
      load();
    }
  }

  return (
    <div className="space-y-5">
      <div className="bg-cream-50 border border-line rounded-xl p-5 flex items-center gap-4 flex-wrap">
        <div>
          <p className="eyebrow !text-[10px]">Connecteur</p>
          <p className="font-display italic text-lg text-cocoa-700">LibriSoft</p>
          <p className="text-xs text-cocoa-400">Synchronisez votre stock libraire en un clic.</p>
        </div>
        <button type="button" onClick={sync} disabled={syncing} className="ml-auto btn-terracotta !py-2 !px-4 !text-[11px] disabled:opacity-60">
          {syncing ? "Synchronisation..." : "Tester / synchroniser"}
        </button>
      </div>

      {loading ? <Loader /> : items.length === 0 ? (
        <Empty title="Aucun stock" hint="Lancez une synchronisation LibriSoft." />
      ) : (
        <div className="bg-cream-50 border border-line rounded-xl overflow-hidden">
          <table className="w-full text-sm font-sans">
            <thead className="bg-cream-100/60 border-b border-line">
              <tr className="text-left text-[10px] uppercase tracking-widest text-cocoa-400">
                <th className="px-4 py-3 font-medium">Titre</th>
                <th className="px-4 py-3 font-medium">Auteur</th>
                <th className="px-4 py-3 font-medium">ISBN</th>
                <th className="px-4 py-3 font-medium text-right">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {items.map((it: any) => {
                const low = (it.stock ?? 0) <= 3;
                return (
                  <tr key={it.id || it.slug} className={`${low ? "bg-terracotta-50/40" : ""} hover:bg-cream-100/40`}>
                    <td className="px-4 py-3 text-cocoa-700">{it.title || it.name}</td>
                    <td className="px-4 py-3 text-cocoa-400 text-xs">{it.author || "–"}</td>
                    <td className="px-4 py-3 text-cocoa-400 text-xs font-mono">{it.isbn || "–"}</td>
                    <td className={`px-4 py-3 text-right tabular-nums ${low ? "text-terracotta-600 font-medium" : "text-cocoa-700"}`}>{it.stock ?? 0}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
