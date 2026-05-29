import { useEffect, useState } from "react";
import { api, type Product } from "@/lib/api";
import { formatEur } from "@/lib/format";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "draft">("all");

  async function load() {
    const r = await api.admin.products();
    setProducts(r.products);
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleStatus(p: Product) {
    const newStatus = p.status === "active" ? "draft" : "active";
    await api.admin.updateProduct(p.id, { ...p, status: newStatus });
    load();
  }

  async function remove(p: Product) {
    if (!confirm(`Supprimer "${p.name}" ? Les commandes existantes ne sont pas affectées.`)) return;
    await api.admin.deleteProduct(p.id);
    load();
  }

  const filtered = products.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.slug.includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-ink">Produits <span className="cursive text-accent not-italic">de la boutique.</span></h1>
          <p className="text-sm text-ink-2 mt-1">{products.length} pièce{products.length > 1 ? "s" : ""} au total</p>
        </div>
        <a href="/admin/produits/nouveau" className="btn-primary">+ Ajouter un produit</a>
      </header>

      <div className="flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="field-input flex-1 min-w-64"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="field-input w-40"
        >
          <option value="all">Tous les statuts</option>
          <option value="active">Actifs</option>
          <option value="draft">Brouillons</option>
        </select>
      </div>

      <div className="rounded-2xl border border-line bg-white/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table w-full min-w-[800px]">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Catégorie</th>
                <th>Prix</th>
                <th>Stock</th>
                <th>Statut</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-surface/40">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg overflow-hidden bg-surface flex items-center justify-center flex-shrink-0">
                        {p.image_url ? (
                          <img src={p.image_url} alt={p.name} className="h-full w-full object-cover" />
                        ) : (
                          <span className="cursive text-xl text-accent">J</span>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-ink">{p.name}</div>
                        <div className="text-xs text-ink-2 font-mono">{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-sm text-ink-2">{(p as any).category_name || (p as any).category_slug}</td>
                  <td className="font-medium text-ink">{formatEur(p.price_cents)}</td>
                  <td>
                    {p.is_unique ? (
                      <span className="chip border-line bg-white text-ink-2">Unique</span>
                    ) : (
                      <span className={`chip ${p.stock === 0 ? "border-rose-300 bg-rose-50 text-rose-900" : "border-line bg-white text-ink"}`}>
                        {p.stock}
                      </span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => toggleStatus(p)}
                      className={`chip ${p.status === "active" ? "border-accent bg-accent/10 text-accent" : "border-line bg-white text-ink-2"}`}
                    >
                      {p.status}
                    </button>
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <a href={`/admin/produits/${p.id}`} className="text-xs text-ink-2 hover:text-rose-deep">Modifier</a>
                      <button onClick={() => remove(p)} className="text-xs text-rose-700 hover:text-rose-900">
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-ink-2 py-8">
                    Aucun produit ne correspond à ces filtres.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
