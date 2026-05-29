import { useState } from "react";
import { addToCart } from "@/lib/cart";

type ProductLite = {
  id: number;
  slug: string;
  name: string;
  price_cents: number;
  image_url?: string | null;
  short_description?: string | null;
  stock: number;
  is_unique: boolean;
};

export default function AddToCart({ product }: { product: ProductLite }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart({
      kind: "product",
      ref_id: product.id,
      ref_slug: product.slug,
      name: product.name,
      description: product.short_description || undefined,
      qty,
      unit_price_cents: product.price_cents,
      image_url: product.image_url || undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
    window.dispatchEvent(new CustomEvent("cart:open"));
  }

  const max = product.is_unique ? 1 : Math.max(1, product.stock);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="inline-flex items-center gap-1 rounded-full border border-line bg-white">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="h-12 w-12 text-ink-2 hover:text-ink"
            aria-label="Diminuer la quantité"
          >
            −
          </button>
          <span className="px-3 text-base font-medium text-ink">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(max, q + 1))}
            className="h-12 w-12 text-ink-2 hover:text-ink"
            aria-label="Augmenter la quantité"
          >
            +
          </button>
        </div>
        <button onClick={handleAdd} className="btn-primary flex-1 h-12">
          {added ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 6 9 17l-5-5"/></svg>
              Ajouté au panier
            </>
          ) : (
            <>
              Ajouter au panier
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </>
          )}
        </button>
      </div>
      {product.is_unique && (
        <p className="text-xs text-ink-2 italic">
          Pièce unique : une seule cliente l'aura. Une fois commandée, elle disparaît du catalogue.
        </p>
      )}
    </div>
  );
}
