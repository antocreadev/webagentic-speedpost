import { useEffect, useState } from "react";
import { adminListEventRegistrations } from "@/lib/api";
import { Loader, Empty, handleApi, formatDate, asArray } from "./_shared";
import { toast } from "@/lib/toast";

interface Props { slug: string }

export default function AdminEventRegistrations({ slug }: Props) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [present, setPresent] = useState<Set<string>>(new Set());

  useEffect(() => {
    (async () => {
      const r = await handleApi(adminListEventRegistrations(slug));
      setItems(asArray<any>(r));
      setLoading(false);
    })();
  }, [slug]);

  function exportCsv() {
    const header = ["id", "name", "email", "phone", "guests", "created_at"];
    const lines = [header.join(",")];
    for (const r of items) {
      lines.push([
        r.id,
        JSON.stringify(`${r.first_name || ""} ${r.last_name || r.name || ""}`.trim()),
        r.email || "",
        r.phone || "",
        r.guests ?? r.seats ?? 1,
        r.created_at || "",
      ].join(","));
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `inscriptions-${slug}.csv`; a.click();
    URL.revokeObjectURL(url);
    toast.success("Export CSV", `${items.length} inscriptions`);
  }

  if (loading) return <Loader />;
  if (items.length === 0) return <Empty title="Aucune inscription" hint={`Événement ${slug}`} />;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 flex-wrap">
        <p className="text-sm text-cocoa-400">{items.length} inscriptions, {present.size} confirmées présentes</p>
        <button type="button" className="ml-auto btn-ghost !py-2 !px-4 !text-[11px]" onClick={() => window.print()}>Imprimer</button>
        <button type="button" className="btn-ghost !py-2 !px-4 !text-[11px]" onClick={exportCsv}>Exporter CSV</button>
      </div>

      <div className="bg-cream-50 border border-line rounded-xl overflow-hidden">
        <table className="w-full text-sm font-sans">
          <thead className="bg-cream-100/60 border-b border-line">
            <tr className="text-left text-[10px] uppercase tracking-widest text-cocoa-400">
              <th className="px-4 py-3 w-10">Présent</th>
              <th className="px-4 py-3 font-medium">Nom</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Téléphone</th>
              <th className="px-4 py-3 font-medium text-right">Places</th>
              <th className="px-4 py-3 font-medium">Inscrit le</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {items.map((r: any) => {
              const id = String(r.id);
              return (
                <tr key={id} className="hover:bg-cream-100/40">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={present.has(id)}
                      onChange={() => {
                        const s = new Set(present);
                        if (s.has(id)) s.delete(id); else s.add(id);
                        setPresent(s);
                      }}
                      className="accent-terracotta-400"
                    />
                  </td>
                  <td className="px-4 py-3 text-cocoa-700">{r.first_name} {r.last_name || r.name}</td>
                  <td className="px-4 py-3 text-cocoa-400 text-xs">{r.email}</td>
                  <td className="px-4 py-3 text-cocoa-400 text-xs">{r.phone || "–"}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{r.guests ?? r.seats ?? 1}</td>
                  <td className="px-4 py-3 text-xs text-cocoa-400">{formatDate(r.created_at)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
