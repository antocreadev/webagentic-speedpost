import { useEffect, useState } from "react";
import { api, type Category, type Product } from "@/lib/api";
import { formatEur } from "@/lib/format";

type Mode = "create" | "edit";

const COLOR_OPTIONS = ["peche", "blush", "ivoire", "butter", "sage", "rose-poudre", "rouge", "pastel", "mixte"];

const EMPTY = {
  category_id: 0,
  slug: "",
  name: "",
  short_description: "",
  description: "",
  story: "",
  price_cents: 0,
  compare_at_cents: null as number | null,
  stock: 1,
  is_unique: 1,
  is_made_to_order: 0,
  prep_days_min: 5,
  prep_days_max: 7,
  dimensions: "",
  materials: "",
  care_instructions: "",
  primary_color: "peche",
  badge: "",
  status: "active",
  featured: 0,
  sort: 0,
};

export default function AdminProductForm({ mode, productId }: { mode: Mode; productId?: number }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<typeof EMPTY>(EMPTY);
  const [images, setImages] = useState<{ id: number; url: string; alt: string | null }[]>([]);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    api.admin.categories().then((r) => {
      setCategories(r.categories);
      if (mode === "create" && r.categories[0]) {
        setForm((f) => ({ ...f, category_id: r.categories[0]!.id }));
      }
    });
    if (mode === "edit" && productId) {
      api.admin.product(productId).then((r) => {
        const p = r.product as any;
        setForm({
          category_id: p.category_id,
          slug: p.slug,
          name: p.name,
          short_description: p.short_description || "",
          description: p.description || "",
          story: p.story || "",
          price_cents: p.price_cents,
          compare_at_cents: p.compare_at_cents,
          stock: p.stock,
          is_unique: p.is_unique,
          is_made_to_order: p.is_made_to_order,
          prep_days_min: p.prep_days_min,
          prep_days_max: p.prep_days_max,
          dimensions: p.dimensions || "",
          materials: p.materials || "",
          care_instructions: p.care_instructions || "",
          primary_color: p.primary_color || "peche",
          badge: p.badge || "",
          status: p.status || "active",
          featured: p.featured || 0,
          sort: p.sort || 0,
        });
        setImages(p.images || []);
      });
    }
  }, [mode, productId]);

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  function autoSlug() {
    const slug = form.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    set("slug", slug);
  }

  async function save() {
    setSaving(true);
    setErr(null);
    try {
      if (mode === "create") {
        const r = await api.admin.createProduct(form);
        window.location.href = `/admin/produits/${r.id}`;
      } else if (productId) {
        await api.admin.updateProduct(productId, form);
        setSavedAt(Date.now());
      }
    } catch (e: any) {
      setErr(e?.message || "Erreur");
    } finally {
      setSaving(false);
    }
  }

  async function uploadImage(file: File) {
    if (!productId) {
      alert("Enregistrez le produit d'abord pour ajouter des images.");
      return;
    }
    const r = await api.admin.upload(file);
    await api.admin.addImage(productId, { url: r.url, alt: form.name });
    const refreshed = await api.admin.product(productId);
    setImages((refreshed.product as any).images || []);
  }

  async function removeImage(imageId: number) {
    if (!productId) return;
    if (!confirm("Supprimer cette image ?")) return;
    await api.admin.deleteImage(productId, imageId);
    setImages((imgs) => imgs.filter((i) => i.id !== imageId));
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <a href="/admin/produits" className="text-xs uppercase tracking-widest text-ink-2 hover:text-rose-deep">← Tous les produits</a>
          <h1 className="font-display text-4xl text-ink mt-2">
            {mode === "create" ? "Nouveau produit" : `Modifier — ${form.name}`}
          </h1>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary disabled:opacity-50">
          {saving ? "Enregistrement..." : mode === "create" ? "Créer le produit" : "Enregistrer"}
        </button>
      </header>

      {err && <div className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-900">{err}</div>}
      {savedAt && <div className="rounded-xl border border-accent bg-accent/10 px-4 py-3 text-sm text-ink">✓ Enregistré</div>}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <fieldset className="rounded-3xl border border-line bg-white/60 p-6 space-y-4">
            <legend className="font-display text-xl text-ink px-2">Informations</legend>
            <div>
              <label className="field-label">Nom</label>
              <input value={form.name} onBlur={() => !form.slug && autoSlug()} onChange={(e) => set("name", e.target.value)} className="field-input" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="field-label">Slug (URL)</label>
                <input value={form.slug} onChange={(e) => set("slug", e.target.value)} className="field-input font-mono text-sm" />
              </div>
              <div>
                <label className="field-label">Catégorie</label>
                <select value={form.category_id} onChange={(e) => set("category_id", Number(e.target.value))} className="field-input">
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="field-label">Description courte (1-2 phrases, affichée sur les cartes)</label>
              <input value={form.short_description} onChange={(e) => set("short_description", e.target.value)} className="field-input" />
            </div>
            <div>
              <label className="field-label">Composition / contenu (paragraphe)</label>
              <textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} className="field-input" />
            </div>
            <div>
              <label className="field-label">Histoire / story-telling (la voix de Jenny)</label>
              <textarea rows={4} value={form.story} onChange={(e) => set("story", e.target.value)} className="field-input" />
            </div>
          </fieldset>

          <fieldset className="rounded-3xl border border-line bg-white/60 p-6 space-y-4">
            <legend className="font-display text-xl text-ink px-2">Prix & stock</legend>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="field-label">Prix (€)</label>
                <input type="number" min="0" step="1" value={form.price_cents / 100} onChange={(e) => set("price_cents", Math.round(parseFloat(e.target.value || "0") * 100))} className="field-input" />
              </div>
              <div>
                <label className="field-label">Prix barré (€) — promo</label>
                <input type="number" min="0" step="1" value={form.compare_at_cents ? form.compare_at_cents / 100 : ""} onChange={(e) => set("compare_at_cents", e.target.value ? Math.round(parseFloat(e.target.value) * 100) : null)} className="field-input" />
              </div>
              <div>
                <label className="field-label">Stock</label>
                <input type="number" min="0" value={form.stock} onChange={(e) => set("stock", parseInt(e.target.value || "0", 10))} className="field-input" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 cursor-pointer">
                <input type="checkbox" checked={form.is_unique === 1} onChange={(e) => set("is_unique", e.target.checked ? 1 : 0)} />
                <span className="text-sm">Pièce unique</span>
              </label>
              <label className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 cursor-pointer">
                <input type="checkbox" checked={form.featured === 1} onChange={(e) => set("featured", e.target.checked ? 1 : 0)} />
                <span className="text-sm">Mise en avant (home page)</span>
              </label>
            </div>
          </fieldset>

          <fieldset className="rounded-3xl border border-line bg-white/60 p-6 space-y-4">
            <legend className="font-display text-xl text-ink px-2">Détails fabrication</legend>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="field-label">Préparation min. (jours)</label>
                <input type="number" min="0" value={form.prep_days_min} onChange={(e) => set("prep_days_min", parseInt(e.target.value || "0", 10))} className="field-input" />
              </div>
              <div>
                <label className="field-label">Préparation max. (jours)</label>
                <input type="number" min="0" value={form.prep_days_max} onChange={(e) => set("prep_days_max", parseInt(e.target.value || "0", 10))} className="field-input" />
              </div>
            </div>
            <div>
              <label className="field-label">Dimensions</label>
              <input value={form.dimensions} onChange={(e) => set("dimensions", e.target.value)} className="field-input" placeholder="Ø 20 cm, hauteur 25 cm" />
            </div>
            <div>
              <label className="field-label">Matériaux</label>
              <input value={form.materials} onChange={(e) => set("materials", e.target.value)} className="field-input" placeholder="Coton mercerisé, fil de fer gainé" />
            </div>
            <div>
              <label className="field-label">Entretien</label>
              <input value={form.care_instructions} onChange={(e) => set("care_instructions", e.target.value)} className="field-input" />
            </div>
          </fieldset>
        </div>

        <aside className="space-y-6">
          <fieldset className="rounded-3xl border border-line bg-white/60 p-6 space-y-4">
            <legend className="font-display text-xl text-ink px-2">Visuel</legend>
            <div>
              <label className="field-label">Couleur dominante (fallback SVG)</label>
              <select value={form.primary_color} onChange={(e) => set("primary_color", e.target.value)} className="field-input">
                {COLOR_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label">Badge (ex: "Pièce unique")</label>
              <input value={form.badge} onChange={(e) => set("badge", e.target.value)} className="field-input" />
            </div>
            <div>
              <label className="field-label">Statut</label>
              <select value={form.status} onChange={(e) => set("status", e.target.value)} className="field-input">
                <option value="active">Actif</option>
                <option value="draft">Brouillon</option>
                <option value="archived">Archivé</option>
              </select>
            </div>
          </fieldset>

          <fieldset className="rounded-3xl border border-line bg-white/60 p-6 space-y-4">
            <legend className="font-display text-xl text-ink px-2">Photos</legend>
            {mode === "edit" ? (
              <>
                <div className="grid grid-cols-2 gap-2">
                  {images.map((img) => (
                    <div key={img.id} className="relative group aspect-square rounded-xl overflow-hidden border border-line">
                      <img src={img.url} alt={img.alt || ""} className="h-full w-full object-cover" />
                      <button
                        onClick={() => removeImage(img.id)}
                        className="absolute top-1 right-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/90 opacity-0 group-hover:opacity-100 transition text-rose-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <label className="block">
                  <span className="btn-light text-xs cursor-pointer">+ Ajouter une photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])}
                  />
                </label>
              </>
            ) : (
              <p className="text-xs text-ink-2">Enregistrez d'abord le produit, vous pourrez ensuite ajouter des photos.</p>
            )}
          </fieldset>

          <div className="rounded-3xl border border-line bg-bg-240 p-6 text-xs text-ink-2 leading-relaxed">
            <p className="font-medium text-ink mb-2">Aperçu prix</p>
            <div className="font-display text-2xl text-ink">{formatEur(form.price_cents)}</div>
            {form.compare_at_cents && form.compare_at_cents > form.price_cents && (
              <div className="line-through text-ink-2">{formatEur(form.compare_at_cents)}</div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
