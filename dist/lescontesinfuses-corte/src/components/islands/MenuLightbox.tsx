import React, { useEffect, useState } from "react";
import { X, Maximize2 } from "lucide-react";

export default function MenuLightbox() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative block w-full max-w-md mx-auto rounded-2xl overflow-hidden border border-line shadow-page bg-cream-50 aspect-[3/4]"
        aria-label="Voir la carte café en grand"
      >
        <FlatMenuPreview />
        <div className="absolute inset-0 bg-cocoa-900/0 group-hover:bg-cocoa-900/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="btn-terracotta">
            <Maximize2 size={14} /> Voir en grand
          </span>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-cocoa-900/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <button
            onClick={() => setOpen(false)}
            aria-label="Fermer"
            className="absolute top-6 right-6 p-3 rounded-full bg-paper text-cocoa-600 hover:text-terracotta-400 transition"
          >
            <X size={22} />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-cream-50 rounded-2xl overflow-hidden shadow-page"
          >
            <div className="aspect-[3/4]">
              <FlatMenuPreview large />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FlatMenuPreview({ large = false }: { large?: boolean }) {
  return (
    <svg viewBox="0 0 300 400" className="w-full h-full">
      <rect width="300" height="400" fill="#F7EFD8" />
      <rect x="20" y="20" width="260" height="360" fill="none" stroke="#C9A37D" strokeWidth="0.6" />
      <rect x="24" y="24" width="252" height="352" fill="none" stroke="#C9A37D" strokeWidth="0.4" strokeDasharray="2 3" />
      <text x="150" y="68" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="22" fontStyle="italic" fill="#4A2D1F">
        Les Contes Infusés
      </text>
      <text x="150" y="88" textAnchor="middle" fontFamily="Cormorant SC" fontSize="9" letterSpacing="2" fill="#7C4F31">
        CARTE CAFÉ
      </text>
      <line x1="120" y1="100" x2="180" y2="100" stroke="#C77A4F" strokeWidth="0.8" />
      {[
        ["Café", "2,50"],
        ["Machiato", "2,50"],
        ["Cappuccino Catte", "4,00"],
        ["Chocolat", "2,50"],
        ["Chai Catte", "2,50"],
        ["Matcha latte", "4,50"],
        ["Ube Catte", "4,50"],
        ["Thés Damman", "3,50"],
        ["Kombuchas", "3,50"],
        ["Thé glacé maison", "3,50"],
        ["Brownie", "4,00"],
        ["Cake du jour", "3,50"],
        ["Cookies", "3,00"],
      ].map(([n, p], i) => (
        <g key={n} transform={`translate(0, ${130 + i * 18})`}>
          <text x="40" y="0" fontFamily="Lora" fontSize="11" fill="#4A2D1F">{n}</text>
          <text x="260" y="0" textAnchor="end" fontFamily="Inter" fontSize="11" fill="#C77A4F">{p} €</text>
        </g>
      ))}
      <text x="150" y="380" textAnchor="middle" fontFamily="Pinyon Script" fontSize="18" fill="#C77A4F">
        Lire, infuser, recommencer.
      </text>
    </svg>
  );
}
