import React, { useState, useMemo } from "react";
import { X, Printer } from "lucide-react";

interface Props {
  orderId: string;
  tracking: string;
  customer: string;
  street: string;
  zip: string;
  city: string;
}

function QrMock({ seed }: { seed: string }) {
  const cells = useMemo(() => {
    const out: boolean[] = [];
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    for (let i = 0; i < 21 * 21; i++) {
      h = (h * 1103515245 + 12345) >>> 0;
      out.push((h & 1) === 1);
    }
    // finder patterns corners
    const isFinder = (r: number, c: number) => {
      const inBox = (rr: number, cc: number) => rr >= 0 && rr < 7 && cc >= 0 && cc < 7;
      const draw = (rr: number, cc: number) => {
        if (!inBox(rr, cc)) return null;
        const onEdge = rr === 0 || rr === 6 || cc === 0 || cc === 6;
        const inner = rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4;
        return onEdge || inner;
      };
      const tl = draw(r, c); if (tl !== null) return tl;
      const tr = draw(r, c - 14); if (tr !== null) return tr;
      const bl = draw(r - 14, c); if (bl !== null) return bl;
      return undefined;
    };
    return Array.from({ length: 21 }, (_, r) =>
      Array.from({ length: 21 }, (_, c) => {
        const f = isFinder(r, c);
        if (f !== undefined) return f;
        return out[r * 21 + c];
      })
    );
  }, [seed]);

  return (
    <svg viewBox="0 0 21 21" width="120" height="120" shapeRendering="crispEdges" aria-label="QR code">
      <rect width="21" height="21" fill="#fff" />
      {cells.map((row, r) =>
        row.map((on, c) => on ? <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill="#26150C" /> : null)
      )}
    </svg>
  );
}

function Barcode({ seed }: { seed: string }) {
  const bars = useMemo(() => {
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (h * 33 + seed.charCodeAt(i)) >>> 0;
    const out: { x: number; w: number }[] = [];
    let x = 0;
    while (x < 200) {
      h = (h * 1103515245 + 12345) >>> 0;
      const w = 1 + (h & 3);
      h = (h * 1103515245 + 12345) >>> 0;
      const gap = 1 + (h & 2);
      if ((h & 4) === 0) out.push({ x, w });
      x += w + gap;
    }
    return out;
  }, [seed]);

  return (
    <svg viewBox="0 0 200 50" width="100%" height="50" aria-label="Code barre">
      {bars.map((b, i) => <rect key={i} x={b.x} y="0" width={b.w} height="50" fill="#26150C" />)}
    </svg>
  );
}

export default function LabelModal(props: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="btn-terracotta !text-base !px-6 !py-3">
        <Printer size={16} /> Générer étiquette Mondial Relay (PDF)
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-cocoa-800/55 backdrop-blur-sm overflow-y-auto">
          <div className="bg-cream-50 border border-line rounded-2xl max-w-lg w-full p-6 relative shadow-page my-auto">
            <button type="button" aria-label="Fermer" onClick={() => setOpen(false)} className="absolute top-4 right-4 p-1 text-cocoa-400 hover:text-cocoa-700">
              <X size={18} />
            </button>
            <p className="eyebrow">Aperçu étiquette</p>
            <h3 className="font-display italic text-xl text-cocoa-700 mt-1">Bon de transport · {props.orderId}</h3>

            {/* Mock label */}
            <div className="mt-5 bg-white border-2 border-cocoa-700 rounded-md p-4 font-sans text-cocoa-700">
              <div className="flex items-start justify-between gap-3 border-b-2 border-dashed border-cocoa-400 pb-3">
                <div className="flex items-center gap-2">
                  <svg width="42" height="42" viewBox="0 0 42 42" aria-label="Mondial Relay">
                    <rect width="42" height="42" rx="4" fill="#E2001A" />
                    <text x="21" y="27" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="700" fontFamily="Inter">MR</text>
                  </svg>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-cocoa-400">Mondial Relay</p>
                    <p className="text-sm font-semibold">Point Relais ST</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest text-cocoa-400">Poids</p>
                  <p className="text-sm font-semibold tabular-nums">0,840 kg</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-b border-dashed border-cocoa-200">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-cocoa-400">Expéditeur</p>
                  <p className="text-xs mt-1 leading-tight">
                    Les Contes Infusés<br />
                    Place Paoli<br />
                    20250 Corte<br />
                    04 95 XX XX XX
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-cocoa-400">Destinataire</p>
                  <p className="text-xs mt-1 leading-tight font-semibold">
                    {props.customer}<br />
                    {props.street}<br />
                    {props.zip} {props.city}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-3">
                <QrMock seed={props.tracking} />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-widest text-cocoa-400">N° de suivi</p>
                  <p className="text-base font-mono font-semibold tabular-nums">{props.tracking}</p>
                  <div className="mt-2"><Barcode seed={props.tracking} /></div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setOpen(false)} className="btn-ghost">Fermer</button>
              <button type="button" onClick={() => { console.log("print PDF", props.tracking); }} className="btn-terracotta">
                <Printer size={14} /> Télécharger PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
