import { useEffect, useState } from "react";
import { listEvents } from "@/lib/api";
import { Loader, Empty, handleApi, formatDate, asArray } from "./_shared";

export default function AdminEventsCalendar() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const r = await handleApi(listEvents({ limit: 50 }));
      setEvents(asArray<any>(r));
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loader />;
  if (events.length === 0) return <Empty title="Aucun événement" hint="Créez votre premier événement." />;

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6">
      <div className="bg-cream-50 border border-line rounded-xl p-5">
        <p className="eyebrow !text-[10px]">Tous les événements</p>
        <h2 className="font-display italic text-2xl text-cocoa-700 mt-1 mb-4">{events.length} événements</h2>
        <ul className="divide-y divide-line">
          {events.map((e: any) => {
            const ratio = (e.registered ?? 0) / Math.max(e.capacity ?? 1, 1);
            return (
              <li key={e.id || e.slug} className="py-3 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-cream-100 border border-line flex items-center justify-center shrink-0">
                  <span className="font-display italic text-lg text-cocoa-700 tabular-nums">
                    {new Date(e.starts_at).getDate()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display italic text-base text-cocoa-700 truncate">{e.title}</p>
                  <p className="text-[11px] text-cocoa-400 tabular-nums">{formatDate(e.starts_at)} · {e.location}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex-1 h-1 rounded-full bg-cream-100 overflow-hidden">
                      <span className="block h-full bg-terracotta-400 rounded-full" style={{ width: `${Math.min(ratio * 100, 100)}%` }} />
                    </div>
                    <span className="text-[11px] tabular-nums text-cocoa-400">{e.registered ?? 0}/{e.capacity}</span>
                  </div>
                </div>
                <a href={`/admin/inscriptions/${e.slug}`} className="text-xs uppercase tracking-widest text-terracotta-400 font-smallcap hover:text-cocoa-700">Inscrits</a>
              </li>
            );
          })}
        </ul>
      </div>

      <aside className="bg-cream-50 border border-line rounded-xl p-5">
        <p className="eyebrow !text-[10px]">À venir</p>
        <ul className="space-y-3 mt-3">
          {events.slice(0, 4).map((e: any) => (
            <li key={e.id || e.slug} className="text-sm">
              <p className="text-cocoa-700 font-medium truncate">{e.title}</p>
              <p className="text-[11px] text-cocoa-400">{formatDate(e.starts_at)}</p>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
