import React, { useState } from "react";
import { X, Plus, Pencil, Trash, Calendar } from "lucide-react";

interface CalEvent {
  slug: string;
  title: string;
  day: number; // day of month
  hour: string;
  registered: number;
  capacity: number;
}

const MONTH_NAME = "Avril 2026";
// April 2026: 1st = Wednesday (index 3 in Mon-Sun grid)
const FIRST_OFFSET = 2; // Mon=0, so April 1 2026 (Wed) -> index 2
const DAYS_IN_MONTH = 30;

const DAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

interface Props {
  events: CalEvent[];
}

export default function EventCalendar({ events }: Props) {
  const [creating, setCreating] = useState<number | null>(null);
  const [editing, setEditing] = useState<CalEvent | null>(null);

  const cells: (number | null)[] = [];
  for (let i = 0; i < FIRST_OFFSET; i++) cells.push(null);
  for (let d = 1; d <= DAYS_IN_MONTH; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const eventsByDay = (d: number) => events.filter(e => e.day === d);

  return (
    <div className="bg-cream-50 border border-line rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-line bg-cream-100/40">
        <div className="flex items-center gap-3">
          <Calendar size={16} className="text-terracotta-400" />
          <h2 className="font-display italic text-2xl text-cocoa-700">{MONTH_NAME}</h2>
        </div>
        <div className="flex gap-2">
          <button type="button" className="px-3 py-1.5 text-xs border border-line rounded-md hover:border-terracotta-400 text-cocoa-700 font-sans">‹ Mars</button>
          <button type="button" className="px-3 py-1.5 text-xs border border-line rounded-md hover:border-terracotta-400 text-cocoa-700 font-sans">Mai ›</button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-line bg-cream-100/40">
        {DAY_LABELS.map(d => (
          <div key={d} className="px-3 py-2 text-[10px] uppercase tracking-widest text-cocoa-400 font-sans text-center">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((d, i) => (
          <div
            key={i}
            className={`min-h-[110px] border-r border-b border-line p-2 relative ${d === null ? "bg-cream-100/30" : "bg-cream-50 hover:bg-cream-100/50 cursor-pointer"} ${(i + 1) % 7 === 0 ? "border-r-0" : ""}`}
            onClick={() => d !== null && setCreating(d)}
          >
            {d !== null && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-cocoa-400 font-sans tabular-nums">{d}</span>
                  <span className="opacity-0 group-hover:opacity-100 text-cocoa-400"><Plus size={12} /></span>
                </div>
                <div className="mt-1 space-y-1">
                  {eventsByDay(d).map(e => (
                    <button
                      key={e.slug}
                      type="button"
                      onClick={(ev) => { ev.stopPropagation(); setEditing(e); }}
                      className="block w-full text-left px-1.5 py-1 rounded bg-terracotta-50 border border-terracotta-200 text-[10px] text-terracotta-600 hover:bg-terracotta-400 hover:text-cream-50 transition-colors leading-tight"
                    >
                      <span className="block font-medium truncate">{e.title}</span>
                      <span className="opacity-75">{e.hour}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {creating !== null && (
        <Modal onClose={() => setCreating(null)} title={`Créer un événement, ${creating} avril 2026`}>
          <Form onSubmit={() => setCreating(null)} />
        </Modal>
      )}

      {editing && (
        <Modal onClose={() => setEditing(null)} title={`Modifier : ${editing.title}`}>
          <Form initial={editing} onSubmit={() => setEditing(null)} />
        </Modal>
      )}
    </div>
  );
}

function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-cocoa-800/55 backdrop-blur-sm">
      <div className="bg-cream-50 border border-line rounded-2xl max-w-md w-full p-6 relative shadow-page">
        <button type="button" aria-label="Fermer" onClick={onClose} className="absolute top-4 right-4 p-1 text-cocoa-400 hover:text-cocoa-700">
          <X size={18} />
        </button>
        <h3 className="font-display italic text-xl text-cocoa-700 mb-4 pr-8">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function Form({ initial, onSubmit }: { initial?: CalEvent; onSubmit: () => void }) {
  const ipt = "w-full px-3 py-2 bg-cream-100 border border-line rounded-md text-sm font-sans focus:outline-none focus:border-terracotta-400";
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-3">
      <label className="block">
        <span className="block text-[10px] uppercase tracking-widest text-cocoa-400 mb-1">Titre</span>
        <input className={ipt} defaultValue={initial?.title ?? ""} />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-[10px] uppercase tracking-widest text-cocoa-400 mb-1">Heure</span>
          <input type="time" className={ipt} defaultValue={initial?.hour ?? "18:00"} />
        </label>
        <label className="block">
          <span className="block text-[10px] uppercase tracking-widest text-cocoa-400 mb-1">Capacité</span>
          <input type="number" className={ipt} defaultValue={initial?.capacity ?? 30} />
        </label>
      </div>
      <label className="block">
        <span className="block text-[10px] uppercase tracking-widest text-cocoa-400 mb-1">Description</span>
        <textarea rows={3} className={ipt} />
      </label>
      <div className="flex justify-end gap-3 pt-2">
        <button type="submit" className="btn-terracotta">Enregistrer</button>
      </div>
    </form>
  );
}
