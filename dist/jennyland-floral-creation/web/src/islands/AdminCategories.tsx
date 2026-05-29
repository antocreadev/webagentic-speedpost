import { useEffect, useState } from "react";
import { api, type Category } from "@/lib/api";

const EMPTY: Partial<Category> = { slug: "", name: "", tagline: "", description: "", emoji: "", sort: 0 };

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Partial<Category> | null>(null);

  async function load() {
    const r = await api.admin.categories();
    setCategories(r.categories);
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing) return;
    if (editing.id) await api.admin.updateCategory(editing.id, editing);
    else await api.admin.createCategory(editing);
    setEditing(null);
    load();
  }

  async function remove(c: Category) {
    if (!confirm(`Supprimer "${c.name}" ? Les produits dans cette catégorie devront être réassignés.`)) return;
    try {
      await api.admin.deleteCategory(c.id);
      load();
    } catch (e: any) {
      alert("Impossible de supprimer : il reste des produits dans cette catégorie.");
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-ink">Catégories</h1>
          <p className="text-sm text-ink-2 mt-1">{categories.length} catégorie{categories.length > 1 ? "s" : ""}</p>
        </div>
        <button onClick={() => setEditing({ ...EMPTY })} className="btn-primary">+ Nouvelle catégorie</button>
      </header>

      {editing && (
        <div className="rounded-3xl border border-line bg-white/60 p-6 space-y-4">
          <h2 className="font-display text-2xl text-ink">{editing.id ? "Modifier" : "Nouvelle catégorie"}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="field-label">Slug (URL)</label>
              <input value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="field-input font-mono text-sm" />
            </div>
            <div>
              <label className="field-label">Nom</label>
              <input value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="field-input" />
            </div>
          </div>
          <div>
            <label className="field-label">Accroche (1 ligne)</label>
            <input value={editing.tagline || ""} onChange={(e) => setEditing({ ...editing, tagline: e.target.value })} className="field-input" />
          </div>
          <div>
            <label className="field-label">Description (paragraphe)</label>
            <textarea rows={3} value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="field-input" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="field-label">Emoji / icône (optionnel)</label>
              <input value={editing.emoji || ""} onChange={(e) => setEditing({ ...editing, emoji: e.target.value })} className="field-input" />
            </div>
            <div>
              <label className="field-label">Ordre d'affichage</label>
              <input type="number" value={editing.sort ?? 0} onChange={(e) => setEditing({ ...editing, sort: Number(e.target.value) })} className="field-input" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setEditing(null)} className="btn-secondary">Annuler</button>
            <button onClick={save} className="btn-primary">Enregistrer</button>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-line bg-white/60 overflow-hidden">
        <table className="admin-table w-full">
          <thead>
            <tr>
              <th>Catégorie</th>
              <th>Slug</th>
              <th>Ordre</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-surface/40">
                <td>
                  <div className="font-medium text-ink">{c.name}</div>
                  {c.tagline && <div className="text-xs text-ink-2">{c.tagline}</div>}
                </td>
                <td className="font-mono text-xs text-ink-2">{c.slug}</td>
                <td className="text-sm">{c.sort}</td>
                <td>
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setEditing(c)} className="text-xs text-ink-2 hover:text-rose-deep">Modifier</button>
                    <button onClick={() => remove(c)} className="text-xs text-rose-700 hover:text-rose-900">Supprimer</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
