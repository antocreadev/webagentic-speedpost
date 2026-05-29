import { useEffect, useState } from "react";
import { api, type UnitItem } from "@/lib/api";
import { formatEur } from "@/lib/format";
import { FLOWER_SVGS, SPRITE_VIEWBOX, type FlowerSvgId } from "@/lib/flower-svgs";

const SVG_IDS = Object.keys(FLOWER_SVGS) as FlowerSvgId[];

const EMPTY: Partial<UnitItem> = {
  slug: "",
  name: "",
  kind: "flower",
  color: "peche",
  hex: "#E89B7B",
  description: "",
  price_cents: 500,
  svg_id: "rose-open",
  sort: 0,
  status: "active",
};

function FlowerInline({ svgId, hex, size = 60 }: { svgId: string; hex?: string; size?: number }) {
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

export default function AdminUnitItems() {
  const [items, setItems] = useState<UnitItem[]>([]);
  const [editing, setEditing] = useState<Partial<UnitItem> | null>(null);
  const [filter, setFilter] = useState<"all" | "flower" | "decoration">("all");

  async function load() {
    const r = await api.admin.unitItems();
    setItems(r.items);
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing) return;
    if (editing.id) await api.admin.updateUnitItem(editing.id, editing);
    else await api.admin.createUnitItem(editing);
    setEditing(null);
    load();
  }

  async function remove(it: UnitItem) {
    if (!confirm(`Supprimer "${it.name}" ?`)) return;
    await api.admin.deleteUnitItem(it.id);
    load();
  }

  const filtered = items.filter((i) => filter === "all" || i.kind === filter);

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-ink">Fleurs <span className="cursive text-accent not-italic">à l'unité.</span></h1>
          <p className="text-sm text-ink-2 mt-1">Tout ce qui rentre dans le configurateur "Compose ton bouquet"</p>
        </div>
        <button onClick={() => setEditing({ ...EMPTY })} className="btn-primary">+ Ajouter une fleur</button>
      </header>

      <div className="flex gap-2">
        {[
          { v: "all", label: "Tout" },
          { v: "flower", label: "Fleurs" },
          { v: "decoration", label: "Décorations" },
        ].map((b) => (
          <button
            key={b.v}
            onClick={() => setFilter(b.v as any)}
            className={`chip ${filter === b.v ? "border-accent bg-accent text-ink" : "border-line bg-white text-ink-2"}`}
          >
            {b.label}
          </button>
        ))}
      </div>

      {editing && (
        <div className="rounded-3xl border border-line bg-white/60 p-6 space-y-4">
          <h2 className="font-display text-2xl text-ink">{editing.id ? "Modifier" : "Nouvelle fleur unitaire"}</h2>

          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="field-label">Nom</label>
                  <input value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="field-input" />
                </div>
                <div>
                  <label className="field-label">Slug</label>
                  <input value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="field-input font-mono text-sm" />
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="field-label">Type</label>
                  <select value={editing.kind} onChange={(e) => setEditing({ ...editing, kind: e.target.value as any })} className="field-input">
                    <option value="flower">Fleur</option>
                    <option value="decoration">Décoration</option>
                  </select>
                </div>
                <div>
                  <label className="field-label">Couleur (clé)</label>
                  <input value={editing.color || ""} onChange={(e) => setEditing({ ...editing, color: e.target.value })} className="field-input" placeholder="peche, blush, ivoire…" />
                </div>
                <div>
                  <label className="field-label">Couleur hex</label>
                  <input type="color" value={editing.hex || "#E89B7B"} onChange={(e) => setEditing({ ...editing, hex: e.target.value })} className="field-input h-12" />
                </div>
              </div>
              <div>
                <label className="field-label">Description</label>
                <textarea rows={2} value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="field-input" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="field-label">Prix (€)</label>
                  <input type="number" min="0" step="1" value={(editing.price_cents || 0) / 100} onChange={(e) => setEditing({ ...editing, price_cents: Math.round(parseFloat(e.target.value || "0") * 100) })} className="field-input" />
                </div>
                <div>
                  <label className="field-label">Ordre</label>
                  <input type="number" value={editing.sort ?? 0} onChange={(e) => setEditing({ ...editing, sort: Number(e.target.value) })} className="field-input" />
                </div>
              </div>
              <div>
                <label className="field-label">Visuel SVG (sprite ID)</label>
                <select value={editing.svg_id || "rose-open"} onChange={(e) => setEditing({ ...editing, svg_id: e.target.value })} className="field-input">
                  {SVG_IDS.map((id) => <option key={id} value={id}>{id}</option>)}
                </select>
              </div>
            </div>

            <aside className="rounded-2xl border border-line bg-bg-240 p-6 flex flex-col items-center gap-3 text-center">
              <span className="text-xs uppercase tracking-widest text-ink-2">Aperçu</span>
              <div className="rounded-xl bg-white p-4">
                <FlowerInline svgId={editing.svg_id || "rose-open"} hex={editing.hex || undefined} size={120} />
              </div>
              <div>
                <div className="font-medium text-ink">{editing.name || "Sans nom"}</div>
                <div className="text-sm text-ink-2">{formatEur(editing.price_cents || 0)}</div>
              </div>
            </aside>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-line">
            <button onClick={() => setEditing(null)} className="btn-secondary">Annuler</button>
            <button onClick={save} className="btn-primary">Enregistrer</button>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filtered.map((it) => (
          <article key={it.id} className="rounded-2xl border border-line bg-white/60 p-4">
            <div className="aspect-square rounded-xl flex items-center justify-center mb-3" style={{ background: `${it.hex || "#E89B7B"}22` }}>
              <FlowerInline svgId={it.svg_id} hex={it.hex || undefined} size={80} />
            </div>
            <h3 className="font-medium text-ink text-sm leading-tight">{it.name}</h3>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-ink-2">{it.kind} · {it.color}</span>
              <span className="text-sm font-medium text-ink">{formatEur(it.price_cents)}</span>
            </div>
            <div className="mt-3 flex gap-2 text-xs">
              <button onClick={() => setEditing(it)} className="text-ink-2 hover:text-rose-deep">Modifier</button>
              <button onClick={() => remove(it)} className="text-rose-700 hover:text-rose-900">Supprimer</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
