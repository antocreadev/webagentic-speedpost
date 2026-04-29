import React, { useState } from "react";
import { CalendarDays, List, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import type { Event } from "@/data/events";
import { formatPrice } from "@/lib/format";

interface Props {
  events: Event[];
}

const MOIS = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
const JOURS = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];

export default function EventsView({ events }: Props) {
  const [mode, setMode] = useState<"liste" | "calendrier">("liste");
  // Anchor calendar on the month of the first event so the demo always shows hits.
  const initial = events.length ? new Date(events[0].date) : new Date();
  const [cursor, setCursor] = useState({ y: initial.getFullYear(), m: initial.getMonth() });
  const [picked, setPicked] = useState<string | null>(null);

  const evByDay: Record<string, Event[]> = {};
  events.forEach((e) => {
    const d = new Date(e.date);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    (evByDay[key] ??= []).push(e);
  });

  const firstDay = new Date(cursor.y, cursor.m, 1);
  const startOffset = (firstDay.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate();
  const cells: (number | null)[] = Array.from({ length: startOffset }, () => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1),
  );

  const pickedEvents = picked ? evByDay[picked] ?? [] : [];

  return (
    <div>
      <div className="flex items-center justify-center gap-2 mb-10">
        <button
          onClick={() => setMode("liste")}
          className={`btn-ghost ${mode === "liste" ? "border-terracotta-400 text-terracotta-400" : ""}`}
        >
          <List size={14} /> Liste
        </button>
        <button
          onClick={() => setMode("calendrier")}
          className={`btn-ghost ${mode === "calendrier" ? "border-terracotta-400 text-terracotta-400" : ""}`}
        >
          <CalendarDays size={14} /> Calendrier
        </button>
      </div>

      {mode === "liste" && (
        <ul className="space-y-4 transition-opacity">
          {events.map((e) => {
            const d = new Date(e.date);
            const time = d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
            const remaining = e.capacity - e.registered;
            return (
              <li key={e.slug}>
                <a
                  href={`/evenements/${e.slug}`}
                  className="group block bg-cream-50 border border-line rounded-2xl p-6 hover:border-terracotta-400 hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-start gap-6">
                    <div className="text-center shrink-0 px-3 border-r border-line pr-6">
                      <div className="font-display italic text-5xl text-cocoa-600 leading-none">
                        {String(d.getDate()).padStart(2, "0")}
                      </div>
                      <div className="eyebrow mt-1">{MOIS[d.getMonth()].slice(0, 3)}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="eyebrow">
                        {e.hostedAt === "horsLesMurs" ? "Hors les murs" : "Boutique"}
                      </p>
                      <h3 className="font-display italic text-xl md:text-2xl text-cocoa-600 mt-1 group-hover:text-terracotta-400 transition">
                        {e.title}
                      </h3>
                      <p className="text-sm text-cocoa-400 mt-2 line-clamp-2">{e.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="chip">
                          <MapPin size={12} /> {e.location}
                        </span>
                        <span className="chip">
                          {time}, {e.duration} min
                        </span>
                        <span
                          className={`chip ${
                            e.price === 0
                              ? "border-sage-400 text-sage-600"
                              : "border-terracotta-200 text-terracotta-600"
                          }`}
                        >
                          {e.price === 0 ? "Gratuit" : formatPrice(e.price)}
                        </span>
                        {remaining <= 5 && remaining > 0 && (
                          <span className="chip border-terracotta-400 text-terracotta-600">
                            {remaining} places
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      )}

      {mode === "calendrier" && (
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          <div className="bg-cream-50 border border-line rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => {
                  let m = cursor.m - 1, y = cursor.y;
                  if (m < 0) { m = 11; y--; }
                  setCursor({ y, m }); setPicked(null);
                }}
                className="p-2 rounded-full hover:bg-cream-100 text-cocoa-600"
                aria-label="Mois précédent"
              >
                <ChevronLeft size={18} />
              </button>
              <p className="font-display italic text-2xl text-cocoa-600">
                {MOIS[cursor.m]} {cursor.y}
              </p>
              <button
                onClick={() => {
                  let m = cursor.m + 1, y = cursor.y;
                  if (m > 11) { m = 0; y++; }
                  setCursor({ y, m }); setPicked(null);
                }}
                className="p-2 rounded-full hover:bg-cream-100 text-cocoa-600"
                aria-label="Mois suivant"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {JOURS.map((j) => (
                <div key={j} className="text-center eyebrow py-2">
                  {j}
                </div>
              ))}
              {cells.map((c, i) => {
                if (c === null) return <div key={`e${i}`} />;
                const key = `${cursor.y}-${cursor.m}-${c}`;
                const hits = evByDay[key] ?? [];
                const has = hits.length > 0;
                const sel = picked === key;
                return (
                  <button
                    key={key}
                    onClick={() => has && setPicked(key)}
                    disabled={!has}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition relative
                      ${has ? "hover:bg-terracotta-400 hover:text-cream-50 cursor-pointer" : "text-cocoa-200 cursor-default"}
                      ${sel ? "bg-terracotta-400 text-cream-50" : has ? "bg-cream-100 text-cocoa-700" : ""}`}
                  >
                    <span className="font-sans">{c}</span>
                    {has && (
                      <span
                        className={`mt-0.5 w-1 h-1 rounded-full ${sel ? "bg-cream-50" : "bg-terracotta-400"}`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="bg-cream-50 border border-line rounded-2xl p-6 min-h-[200px]">
            {pickedEvents.length === 0 ? (
              <p className="text-sm text-cocoa-400 italic">
                Cliquez un jour avec un point pour voir l'événement.
              </p>
            ) : (
              <ul className="space-y-4">
                {pickedEvents.map((e) => {
                  const d = new Date(e.date);
                  const time = d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
                  return (
                    <li key={e.slug}>
                      <a href={`/evenements/${e.slug}`} className="block group">
                        <p className="eyebrow">{time}</p>
                        <p className="font-display italic text-lg text-cocoa-600 mt-1 group-hover:text-terracotta-400">
                          {e.title}
                        </p>
                        <p className="text-xs text-cocoa-400 mt-1">{e.location}</p>
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
