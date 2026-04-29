import React, { useState } from "react";
import { Heart } from "lucide-react";
import type { Book } from "@/data/books";
import { formatPrice } from "@/lib/format";

interface Props {
  book: Book;
}

export default function BookCard({ book }: Props) {
  const [fav, setFav] = useState(false);
  const [g1, g2] = book.coverGradient;

  return (
    <a href={`/livres/${book.slug}`} className="group block focus:outline-none">
      <div className="relative">
        {book.coupDeCoeur && (
          <span className="badge-pulse absolute -top-2 -left-2 z-10 chip bg-terracotta-50 border-terracotta-200 text-terracotta-600 text-[10px]">
            Coup de cœur
          </span>
        )}
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); setFav((v) => !v); }}
          aria-label={fav ? "Retirer des favoris" : "Ajouter aux favoris"}
          className={`absolute top-2 right-2 z-10 p-1.5 rounded-full bg-paper/80 backdrop-blur border border-line hover:border-terracotta-400 transition-all duration-200 ${fav ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"}`}
        >
          <Heart
            size={14}
            strokeWidth={1.5}
            className={fav ? "fill-terracotta-400 stroke-terracotta-400" : "stroke-cocoa-400"}
          />
        </button>

        <div className="relative aspect-[2/3] book-3d rounded-sm overflow-hidden">
          <div
            className="absolute inset-0 flex flex-col justify-between p-4"
            style={{ background: `linear-gradient(155deg, ${g1} 0%, ${g2} 100%)` }}
          >
            <div className="text-cream-50/80 text-[10px] font-smallcap tracking-widest uppercase">
              {book.publisher}
            </div>
            <div className="space-y-1">
              <p className="text-cream-50 font-display italic text-lg leading-tight line-clamp-3">
                {book.title}
              </p>
              <p className="text-cream-50/80 font-body text-xs">{book.author}</p>
            </div>
            <div className="flex justify-between items-end">
              <div className="w-8 h-px bg-cream-50/40" />
              <div className="text-cream-50/60 text-[10px] font-smallcap tracking-widest uppercase">Roman</div>
            </div>
          </div>
          {/* book spine highlight */}
          <div className="absolute top-0 left-0 bottom-0 w-2 bg-black/20" />
          <div className="absolute top-0 left-2 bottom-0 w-px bg-white/10" />
        </div>
      </div>

      <div className="mt-4 px-1">
        <p className="font-display italic text-cocoa-600 text-lg leading-tight group-hover:text-terracotta-400 transition-colors">
          {book.title}
        </p>
        <p className="font-body text-cocoa-400 text-sm mt-0.5">{book.author}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="price-tab text-base">{formatPrice(book.price)}</span>
          {book.stock > 0 ? (
            <span className="text-[10px] text-sage-600 font-sans">en stock</span>
          ) : (
            <span className="text-[10px] text-cocoa-400 font-sans">sur commande</span>
          )}
        </div>
      </div>
    </a>
  );
}
