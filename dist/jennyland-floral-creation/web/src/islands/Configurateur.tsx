import { useEffect, useMemo, useRef, useState } from "react";
import { addToCart } from "@/lib/cart";
import { formatEur } from "@/lib/format";
import { FLOWER_SVGS, SPRITE_VIEWBOX, type FlowerSvgId } from "@/lib/flower-svgs";
import type { UnitItem } from "@/lib/api";

type Placed = {
  id: string; // local instance id
  unit: UnitItem;
  x: number; // px from center
  y: number;
  r: number; // rotation deg
  s: number; // scale 0.7-1.1
  z: number;
};

type HistoryAction =
  | { type: "add"; item: Placed }
  | { type: "remove"; item: Placed }
  | { type: "reset"; previous: Placed[] };

const COLOR_LABELS: Record<string, string> = {
  peche: "Pêche",
  blush: "Blush",
  ivoire: "Ivoire",
  butter: "Butter",
  sage: "Sauge",
  "rose-poudre": "Rose poudré",
  gold: "Or",
  mixte: "Mixte",
};

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function FlowerInline({ svgId, hex, size = 80 }: { svgId: string; hex?: string; size?: number }) {
  const inner = FLOWER_SVGS[svgId as FlowerSvgId] ?? FLOWER_SVGS["rose-open"];
  return (
    <svg
      viewBox={SPRITE_VIEWBOX}
      width={size}
      height={size}
      style={hex ? ({ ["--petal" as any]: hex } as React.CSSProperties) : undefined}
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}

export default function Configurateur({
  initialItems,
  initialPalette,
}: {
  initialItems: UnitItem[];
  initialPalette: { color: string; hex: string }[];
}) {
  const [filterKind, setFilterKind] = useState<"all" | "flower" | "decoration">("all");
  const [filterColor, setFilterColor] = useState<string | null>(null);
  const [placed, setPlaced] = useState<Placed[]>([]);
  const [history, setHistory] = useState<HistoryAction[]>([]);
  const [zCounter, setZCounter] = useState(1);
  const vaseRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    return initialItems.filter((it) => {
      if (filterKind !== "all" && it.kind !== filterKind) return false;
      if (filterColor && it.color !== filterColor) return false;
      return true;
    });
  }, [initialItems, filterKind, filterColor]);

  const total = useMemo(() => placed.reduce((sum, p) => sum + p.unit.price_cents, 0), [placed]);

  function addUnit(unit: UnitItem) {
    const id = `${unit.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    // bornée: keep within ±35% of vase radius from center
    const x = randomBetween(-130, 130);
    const y = randomBetween(-130, 130);
    const r = randomBetween(-15, 15);
    const s = randomBetween(0.78, 1.05);
    const next = { id, unit, x, y, r, s, z: zCounter };
    setPlaced((prev) => [...prev, next]);
    setZCounter((z) => z + 1);
    setHistory((h) => [...h, { type: "add", item: next }].slice(-30));
  }

  function removeAt(id: string) {
    const item = placed.find((p) => p.id === id);
    if (!item) return;
    setPlaced((prev) => prev.filter((p) => p.id !== id));
    setHistory((h) => [...h, { type: "remove", item }].slice(-30));
  }

  function undo() {
    const last = history[history.length - 1];
    if (!last) return;
    setHistory((h) => h.slice(0, -1));
    if (last.type === "add") setPlaced((prev) => prev.filter((p) => p.id !== last.item.id));
    else if (last.type === "remove") setPlaced((prev) => [...prev, last.item]);
    else if (last.type === "reset") setPlaced(last.previous);
  }

  function reset() {
    if (placed.length === 0) return;
    if (!confirm("Effacer tout votre bouquet ?")) return;
    setHistory((h) => [...h, { type: "reset", previous: placed }].slice(-30));
    setPlaced([]);
  }

  function aleatoire() {
    if (placed.length > 0 && !confirm("Remplacer le bouquet actuel par une composition aléatoire ?")) return;
    setHistory((h) => [...h, { type: "reset", previous: placed }].slice(-30));
    const flowers = initialItems.filter((i) => i.kind === "flower");
    const decos = initialItems.filter((i) => i.kind === "decoration");
    const next: Placed[] = [];
    let z = 1;
    const pickRandom = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
    for (let i = 0; i < 5; i++) {
      const u = pickRandom(flowers);
      if (!u) continue;
      next.push({
        id: `${u.id}-${Date.now()}-${i}`,
        unit: u,
        x: randomBetween(-130, 130),
        y: randomBetween(-130, 130),
        r: randomBetween(-15, 15),
        s: randomBetween(0.85, 1.05),
        z: z++,
      });
    }
    for (let i = 0; i < 2; i++) {
      const u = pickRandom(decos);
      if (!u) continue;
      next.push({
        id: `${u.id}-${Date.now()}-d${i}`,
        unit: u,
        x: randomBetween(-150, 150),
        y: randomBetween(-100, 150),
        r: randomBetween(-25, 25),
        s: randomBetween(0.75, 1.0),
        z: z++,
      });
    }
    setPlaced(next);
    setZCounter(z);
  }

  function bringToFront(id: string) {
    setPlaced((prev) =>
      prev.map((p) => (p.id === id ? { ...p, z: zCounter } : p))
    );
    setZCounter((z) => z + 1);
  }

  function addBouquetToCart() {
    if (placed.length < 3) {
      alert("Ajoutez au moins 3 fleurs ou décorations pour composer un bouquet.");
      return;
    }
    addToCart({
      kind: "custom_bouquet",
      name: "Bouquet composé",
      description: `${placed.length} éléments — ${[...new Set(placed.map((p) => p.unit.name))].slice(0, 4).join(", ")}…`,
      qty: 1,
      unit_price_cents: total,
      custom_payload: {
        items: placed.map((p) => ({
          ref_id: p.unit.id,
          slug: p.unit.slug,
          name: p.unit.name,
          svg_id: p.unit.svg_id,
          hex: p.unit.hex || undefined,
        })),
      },
    });
    window.dispatchEvent(new CustomEvent("cart:open"));
  }

  function exportPng() {
    const node = vaseRef.current;
    if (!node) return;
    // Serialize the vase HTML+SVG to a foreignObject and rasterize via canvas.
    const rect = node.getBoundingClientRect();
    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="width:${rect.width}px;height:${rect.height}px;">${node.outerHTML}</div>
        </foreignObject>
      </svg>
    `;
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#FAF1E0";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((b) => {
        if (!b) return;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.download = `jennyland-bouquet-${Date.now()}.png`;
        a.click();
      });
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Left panel: catalog */}
      <aside className="lg:col-span-3 lg:order-1 order-2">
        <div className="rounded-3xl border border-line bg-white/60 overflow-hidden">
          <div className="px-5 py-4 border-b border-line">
            <h3 className="font-display text-2xl text-ink">Le catalogue</h3>
            <p className="text-xs text-ink-2 mt-1">Cliquez pour ajouter</p>
          </div>

          <div className="px-5 py-4 border-b border-line space-y-3">
            <div className="flex gap-1.5 flex-wrap">
              {[
                { v: "all" as const, label: "Tout" },
                { v: "flower" as const, label: "Fleurs" },
                { v: "decoration" as const, label: "Déco" },
              ].map((k) => (
                <button
                  key={k.v}
                  onClick={() => setFilterKind(k.v)}
                  className={`chip ${filterKind === k.v ? "border-accent bg-accent text-ink" : "border-line bg-white text-ink-2 hover:border-rose-deep"}`}
                >
                  {k.label}
                </button>
              ))}
            </div>
            <div className="flex gap-1.5 flex-wrap">
              <button
                onClick={() => setFilterColor(null)}
                className={`chip ${!filterColor ? "border-accent bg-accent text-ink" : "border-line bg-white text-ink-2 hover:border-rose-deep"}`}
              >
                Toutes couleurs
              </button>
              {initialPalette.map((c) => (
                <button
                  key={c.color}
                  onClick={() => setFilterColor(filterColor === c.color ? null : c.color)}
                  className={`chip ${filterColor === c.color ? "border-accent bg-accent text-ink" : "border-line bg-white text-ink-2 hover:border-rose-deep"}`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: c.hex }}></span>
                  {COLOR_LABELS[c.color] || c.color}
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-3">
            <ul className="grid grid-cols-2 gap-2">
              {filtered.map((unit) => (
                <li key={unit.id}>
                  <button
                    onClick={() => addUnit(unit)}
                    className="group w-full text-left rounded-2xl border border-line bg-white hover:border-rose-deep hover:shadow-soft transition-all p-2"
                  >
                    <div
                      className="aspect-square rounded-xl flex items-center justify-center"
                      style={{
                        background: `radial-gradient(circle at 50% 45%, ${unit.hex}33 0%, ${unit.hex}08 70%, transparent 100%)`,
                      }}
                    >
                      <FlowerInline svgId={unit.svg_id} hex={unit.hex || undefined} size={70} />
                    </div>
                    <div className="mt-2 flex items-baseline justify-between gap-1">
                      <span className="text-[11px] text-ink leading-tight line-clamp-1">{unit.name}</span>
                      <span className="text-xs font-medium text-ink whitespace-nowrap">{formatEur(unit.price_cents)}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
            {filtered.length === 0 && (
              <p className="text-center text-sm text-ink-2 py-8">Aucune fleur ne correspond à ces filtres.</p>
            )}
          </div>
        </div>
      </aside>

      {/* Center: vase */}
      <div className="lg:col-span-6 order-1 lg:order-2">
        <div className="relative">
          <div className="hoop-canvas relative" ref={vaseRef}>
            {placed.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center max-w-xs px-6">
                  <div className="cursive text-3xl text-ink-2">Votre vase est encore vide.</div>
                  <p className="text-sm text-ink-2 mt-3">
                    Cliquez sur une fleur dans le catalogue à gauche pour commencer.
                  </p>
                </div>
              </div>
            )}
            {placed.map((p) => (
              <div
                key={p.id}
                className="hoop-flower"
                onClick={() => bringToFront(p.id)}
                onDoubleClick={() => removeAt(p.id)}
                style={
                  {
                    top: "50%",
                    left: "50%",
                    transform: `translate(${p.x}px, ${p.y}px) rotate(${p.r}deg) scale(${p.s})`,
                    "--x": `${p.x}px`,
                    "--y": `${p.y}px`,
                    "--r": `${p.r}deg`,
                    "--s": p.s,
                    zIndex: p.z,
                  } as React.CSSProperties
                }
              >
                <FlowerInline svgId={p.unit.svg_id} hex={p.unit.hex || undefined} size={130} />
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button onClick={undo} disabled={history.length === 0} className="btn-light text-xs disabled:opacity-50">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 7v6h6M3 13c2-5 6-7 10-7a8 8 0 0 1 0 16"/></svg>
              Annuler
            </button>
            <button onClick={aleatoire} className="btn-light text-xs">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M14 4h6v6M14 20h6v-6M4 4l16 16M20 4 4 20"/></svg>
              Aléatoire
            </button>
            <button onClick={reset} className="btn-light text-xs">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              Tout effacer
            </button>
            <button onClick={exportPng} className="btn-light text-xs">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
              Télécharger
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-ink-2">
            Astuce : double-cliquez sur une fleur pour la retirer · cliquez pour la mettre au premier plan
          </p>
        </div>
      </div>

      {/* Right: cart panel */}
      <aside className="lg:col-span-3 lg:order-3 order-3">
        <div className="rounded-3xl border border-line bg-white/60 overflow-hidden lg:sticky lg:top-24">
          <div className="px-5 py-4 border-b border-line">
            <h3 className="font-display text-2xl text-ink">Votre bouquet</h3>
            <p className="text-xs text-ink-2 mt-1">{placed.length} élément{placed.length > 1 ? "s" : ""}</p>
          </div>

          <div className="max-h-[40vh] overflow-y-auto px-3 py-3 space-y-2">
            {placed.length === 0 ? (
              <p className="text-center text-sm text-ink-2 py-6">Encore vide. Choisissez une fleur à gauche.</p>
            ) : (
              placed
                .slice()
                .reverse()
                .map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-2"
                  >
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: `${p.unit.hex}22` }}
                    >
                      <FlowerInline svgId={p.unit.svg_id} hex={p.unit.hex || undefined} size={32} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-ink leading-tight truncate">{p.unit.name}</div>
                      <div className="text-xs text-ink-2">{formatEur(p.unit.price_cents)}</div>
                    </div>
                    <button
                      onClick={() => removeAt(p.id)}
                      className="text-ink-2 hover:text-ink"
                      aria-label="Retirer"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="m6 6 12 12M6 18 18 6"/></svg>
                    </button>
                  </div>
                ))
            )}
          </div>

          <div className="px-5 py-4 border-t border-line space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-ink-2">Total</span>
              <span className="font-display text-3xl text-ink">{formatEur(total)}</span>
            </div>
            <button
              onClick={addBouquetToCart}
              disabled={placed.length < 3}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Ajouter au panier
            </button>
            {placed.length < 3 && (
              <p className="text-xs text-ink-2 text-center">
                Encore {3 - placed.length} élément{3 - placed.length > 1 ? "s" : ""} pour composer un bouquet.
              </p>
            )}
            <p className="text-[11px] text-ink-2 leading-relaxed text-center">
              Préparation 7 à 10 jours après commande.<br/>
              Jenny vous contacte avant de commencer pour confirmer.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
