import React, { useState } from "react";
import { Heart, Save } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { adminCreateProduct, apiError } from "@/lib/api";
import { toast } from "@/lib/toast";

type ProductType = "livre" | "boisson" | "artisan";

export default function ProductForm() {
  const [type, setType] = useState<ProductType>("livre");
  const [title, setTitle] = useState("Murmures du maquis");
  const [author, setAuthor] = useState("Letizia Pieri");
  const [sku, setSku] = useState("9782914628000");
  const [price, setPrice] = useState(18.5);
  const [stock, setStock] = useState(8);
  const [category, setCategory] = useState("roman");
  const [desc, setDesc] = useState("Un premier roman lumineux, qui sent la garrigue et l'encre.");
  const [tags, setTags] = useState("nouveauté, corse, premier roman");
  const [coup, setCoup] = useState(true);
  const [draft, setDraft] = useState<"draft" | "published">("draft");

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-widest text-cocoa-400 font-sans mb-1.5">{label}</span>
      {children}
    </label>
  );

  const ipt = "w-full px-3 py-2 bg-cream-100 border border-line rounded-md text-sm font-sans focus:outline-none focus:border-terracotta-400";

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const body: Record<string, unknown> = {
          type, title, name: title, author, sku, isbn: type === "livre" ? sku : undefined,
          price_cents: Math.round(price * 100), stock, category, description: desc,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          coup_de_coeur: coup, status: draft,
        };
        try {
          await adminCreateProduct(body);
          toast.success("Produit créé", title);
          window.location.href = "/admin/produits";
        } catch (err) {
          const ae = await apiError(err);
          toast.error("Création échouée", ae.message);
        }
      }}
      className="grid lg:grid-cols-[1fr_360px] gap-8"
    >
      <div className="space-y-5">
        <Field label="Type de produit">
          <div className="flex gap-3">
            {(["livre", "boisson", "artisan"] as ProductType[]).map(t => (
              <label key={t} className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer transition-colors ${type === t ? "border-terracotta-400 bg-terracotta-50" : "border-line bg-cream-50 hover:border-cocoa-200"}`}>
                <input type="radio" name="type" value={t} checked={type === t} onChange={() => setType(t)} className="accent-terracotta-400" />
                <span className="text-sm capitalize">{t}</span>
              </label>
            ))}
          </div>
        </Field>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Titre">
            <input className={ipt} value={title} onChange={e => setTitle(e.target.value)} />
          </Field>
          <Field label={type === "artisan" ? "Artisan" : type === "livre" ? "Auteur" : "Recette / source"}>
            <input className={ipt} value={author} onChange={e => setAuthor(e.target.value)} />
          </Field>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <Field label={type === "livre" ? "ISBN" : "SKU"}>
            <input className={`${ipt} font-mono`} value={sku} onChange={e => setSku(e.target.value)} />
          </Field>
          <Field label="Prix (€)">
            <input type="number" step="0.5" className={`${ipt} tabular-nums`} value={price} onChange={e => setPrice(parseFloat(e.target.value) || 0)} />
          </Field>
          <Field label="Stock">
            <input type="number" className={`${ipt} tabular-nums`} value={stock} onChange={e => setStock(parseInt(e.target.value) || 0)} />
          </Field>
        </div>

        <Field label={type === "livre" ? "Genre" : "Catégorie"}>
          <select className={ipt} value={category} onChange={e => setCategory(e.target.value)}>
            {type === "livre" && (<>
              <option value="roman">Roman</option>
              <option value="corse">Littérature corse</option>
              <option value="poesie">Poésie</option>
              <option value="jeunesse">Jeunesse</option>
              <option value="bande-dessinee">Bande dessinée</option>
              <option value="polar">Polar</option>
              <option value="beaux-livres">Beaux-livres</option>
              <option value="essai-histoire">Essai & histoire</option>
              <option value="cuisine">Cuisine</option>
            </>)}
            {type === "boisson" && (<>
              <option value="cafe">Café</option>
              <option value="the">Thé & infusion</option>
              <option value="latte">Latte signature</option>
              <option value="patisserie">Pâtisserie</option>
            </>)}
            {type === "artisan" && (<>
              <option value="bougie">Bougie</option>
              <option value="papeterie">Papeterie</option>
              <option value="ceramique">Céramique</option>
              <option value="textile">Textile</option>
              <option value="soin">Soin</option>
              <option value="epicerie">Épicerie fine</option>
            </>)}
          </select>
        </Field>

        <Field label="Description">
          <textarea rows={4} className={ipt} value={desc} onChange={e => setDesc(e.target.value)} />
        </Field>

        <Field label="Tags (séparés par virgules)">
          <input className={ipt} value={tags} onChange={e => setTags(e.target.value)} />
        </Field>

        <div className="flex items-center gap-3 pt-2">
          <input id="coup" type="checkbox" checked={coup} onChange={e => setCoup(e.target.checked)} className="accent-terracotta-400 w-4 h-4" />
          <label htmlFor="coup" className="text-sm text-cocoa-700">Afficher en coup de cœur du moment</label>
        </div>

        <Field label="Statut">
          <div className="flex gap-3">
            <label className={`flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer ${draft === "draft" ? "border-cocoa-400 bg-cream-100" : "border-line bg-cream-50"}`}>
              <input type="radio" checked={draft === "draft"} onChange={() => setDraft("draft")} className="accent-cocoa-400" />
              <span className="text-sm">Brouillon</span>
            </label>
            <label className={`flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer ${draft === "published" ? "border-terracotta-400 bg-terracotta-50" : "border-line bg-cream-50"}`}>
              <input type="radio" checked={draft === "published"} onChange={() => setDraft("published")} className="accent-terracotta-400" />
              <span className="text-sm">Publié</span>
            </label>
          </div>
        </Field>

        <div className="flex justify-end gap-3 pt-4 border-t border-line">
          <button type="button" onClick={() => setDraft("draft")} className="btn-ghost">
            <Save size={14} /> Enregistrer brouillon
          </button>
          <button type="submit" className="btn-terracotta">
            <Save size={14} /> Publier
          </button>
        </div>
      </div>

      <aside className="lg:sticky lg:top-24 self-start">
        <p className="eyebrow !text-[10px] mb-3">Aperçu en direct</p>
        <div className="bg-cream-50 border border-line rounded-xl p-5">
          {type === "livre" ? (
            <>
              <div className="aspect-[3/4] rounded-md shadow-book relative" style={{ background: "linear-gradient(135deg, #C77A4F, #5C3820)" }}>
                <div className="absolute inset-x-4 top-6 text-cream-50">
                  <p className="font-display italic text-lg leading-tight drop-shadow">{title}</p>
                  <p className="text-[10px] uppercase tracking-widest mt-2 opacity-80">{author}</p>
                </div>
                {coup && <span className="absolute top-2 right-2 chip !bg-cream-50 !text-terracotta-600 !border-terracotta-200">★</span>}
              </div>
              <div className="mt-4">
                <p className="font-display italic text-lg text-cocoa-700">{title}</p>
                <p className="text-xs text-cocoa-400">{author}</p>
                <p className="price-tab mt-2">{formatPrice(price)}</p>
              </div>
            </>
          ) : (
            <>
              <div className="aspect-square rounded-md bg-gradient-to-br from-cream-200 to-cocoa-200 flex items-center justify-center">
                <span className="font-display italic text-3xl text-cocoa-700/60">{title.charAt(0)}</span>
              </div>
              <div className="mt-4">
                <p className="font-display italic text-lg text-cocoa-700">{title}</p>
                <p className="text-xs text-cocoa-400">{author}</p>
                <p className="price-tab mt-2">{formatPrice(price)}</p>
              </div>
            </>
          )}
          <p className="text-xs text-cocoa-400 mt-3 leading-relaxed line-clamp-4">{desc}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.split(",").map(t => t.trim()).filter(Boolean).map((t, i) => (
              <span key={i} className="chip !text-[10px]">{t}</span>
            ))}
          </div>
          <p className="text-[10px] text-cocoa-400 mt-3 font-sans">Statut : {draft === "draft" ? "brouillon (non visible)" : "publié"}</p>
        </div>
      </aside>
    </form>
  );
}
