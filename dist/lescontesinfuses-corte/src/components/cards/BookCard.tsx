import React, { useState } from "react";
import { Heart } from "lucide-react";
import type { Book } from "@/data/books";
import { genres as allGenres } from "@/data/genres";
import { formatPrice } from "@/lib/format";

export type BookCardVariant = "default" | "magazine" | "compact" | "feature";

interface Props {
  book: Book;
  variant?: BookCardVariant;
  loading?: boolean;
}

function genreOf(slug: string) {
  return allGenres.find((g) => g.slug === slug);
}

function genreLabel(slug: string) {
  return genreOf(slug)?.label ?? slug;
}

function HeartBurst({ trigger }: { trigger: number }) {
  if (!trigger) return null;
  return (
    <span className="pointer-events-none absolute inset-0 z-20" key={trigger}>
      {[0, 1, 2].map((i) => (
        <svg
          key={i}
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="10"
          height="10"
          className="absolute"
          style={{
            top: "10px",
            right: "12px",
            color: "#C77A4F",
            animation: `bk-heart-burst-${i} 700ms cubic-bezier(.2,.7,.2,1) forwards`,
          }}
        >
          <path
            d="M12 21s-7-4.6-7-10.3A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 7 4.7C19 16.4 12 21 12 21z"
            fill="currentColor"
          />
        </svg>
      ))}
      <style>{`
        @keyframes bk-heart-burst-0 { 0%{opacity:1;transform:translate(0,0) scale(.4)} 100%{opacity:0;transform:translate(-14px,-22px) scale(1) rotate(-12deg)} }
        @keyframes bk-heart-burst-1 { 0%{opacity:1;transform:translate(0,0) scale(.4)} 100%{opacity:0;transform:translate(0,-26px) scale(1.1)} }
        @keyframes bk-heart-burst-2 { 0%{opacity:1;transform:translate(0,0) scale(.4)} 100%{opacity:0;transform:translate(14px,-20px) scale(1) rotate(14deg)} }
      `}</style>
    </span>
  );
}

function CoupBadge() {
  return (
    <span
      className="badge-pulse absolute -top-2 -left-2 z-10 inline-flex items-center gap-1 pl-1.5 pr-2.5 py-1 rounded-full bg-cream-50 border border-terracotta-200 shadow-sm"
      aria-label="Coup de cœur"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3l2.6 5.6 6 .7-4.4 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.4 9.3l6-.7L12 3z"
          fill="#C77A4F"
          stroke="#9A4F2A"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-script text-[13px] leading-none text-terracotta-600 pt-0.5">
        Coup de cœur
      </span>
    </span>
  );
}

function BookCover({
  book,
  with3d = true,
}: {
  book: Book;
  with3d?: boolean;
  showSpine?: boolean;
  flip?: boolean;
}) {
  const [g1, g2] = book.coverGradient;
  return (
    <div
      className={`relative aspect-[2/3] rounded-sm overflow-hidden ${with3d ? "book-3d" : "shadow-book"}`}
    >
      {/* Recto only, no flip, no peeking verso */}
      <div
        className="absolute inset-0 flex flex-col justify-between p-4"
        style={{
          background: `linear-gradient(155deg, ${g1} 0%, ${g2} 100%)`,
        }}
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
          <div className="text-cream-50/60 text-[10px] font-smallcap tracking-widest uppercase">
            {genreLabel(book.genre)}
          </div>
        </div>
      </div>

      {/* Spine highlight on the LEFT side (book backbone) */}
      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-black/15 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 left-1.5 bottom-0 w-px bg-white/10 pointer-events-none" aria-hidden="true" />
    </div>
  );
}

function SkeletonShape({ variant }: { variant: BookCardVariant }) {
  const cls = "animate-pulse rounded-sm bg-gradient-to-br from-cream-100 to-cream-200/70";
  if (variant === "magazine") {
    return (
      <div className="flex gap-5 items-stretch">
        <div className={`${cls} aspect-[2/3] w-32 shrink-0`} />
        <div className="flex-1 space-y-3 py-2">
          <div className="h-3 w-1/3 bg-cream-200 rounded" />
          <div className="h-6 w-3/4 bg-cream-200 rounded" />
          <div className="h-4 w-1/2 bg-cream-200 rounded" />
          <div className="h-12 w-full bg-cream-100 rounded" />
          <div className="h-7 w-20 bg-cream-200 rounded" />
        </div>
      </div>
    );
  }
  if (variant === "compact") {
    return (
      <div className="flex gap-3 items-center">
        <div className={`${cls} aspect-[2/3] w-12 shrink-0`} />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-3/4 bg-cream-200 rounded" />
          <div className="h-3 w-1/3 bg-cream-200 rounded" />
        </div>
      </div>
    );
  }
  if (variant === "feature") {
    return <div className={`${cls} w-full aspect-[3/2]`} />;
  }
  return (
    <div className="space-y-3">
      <div className={`${cls} aspect-[2/3] w-full`} />
      <div className="h-4 w-3/4 bg-cream-200 rounded" />
      <div className="h-3 w-1/2 bg-cream-200 rounded" />
      <div className="h-3 w-16 bg-cream-200 rounded" />
    </div>
  );
}

export default function BookCard({ book, variant = "default", loading = false }: Props) {
  const [fav, setFav] = useState(false);
  const [burst, setBurst] = useState(0);

  const onFavClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFav((v) => !v);
    if (!fav) setBurst((n) => n + 1);
  };

  if (loading) {
    return (
      <div className="block" aria-busy="true" aria-label="Chargement">
        <SkeletonShape variant={variant} />
      </div>
    );
  }

  const oos = book.stock <= 0;

  // === COMPACT ===
  if (variant === "compact") {
    return (
      <a
        href={`/livres/${book.slug}`}
        className="group flex items-center gap-3 p-2 rounded-lg hover:bg-cream-100/60 transition-colors"
      >
        <div className="w-12 shrink-0">
          <BookCover book={book} with3d={false} showSpine={false} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display italic text-cocoa-600 text-sm leading-tight line-clamp-2 group-hover:text-terracotta-400 transition-colors">
            {book.title}
          </p>
          <p className="price-tab text-xs mt-0.5">{formatPrice(book.price)}</p>
        </div>
      </a>
    );
  }

  // === MAGAZINE ===
  if (variant === "magazine") {
    return (
      <a
        href={`/livres/${book.slug}`}
        className="group block relative bg-cream-50 border border-line rounded-2xl p-5 md:p-6 transition-all duration-300 hover:border-terracotta-400 hover:shadow-page hover:-translate-y-0.5"
      >
        {book.coupDeCoeur && <CoupBadge />}
        <div className="flex flex-col sm:flex-row gap-5 md:gap-7">
          <div className="w-32 sm:w-40 shrink-0 relative">
            <BookCover book={book} with3d={false} />
            <HeartBurst trigger={burst} />
          </div>
          <div className="flex-1 min-w-0 flex flex-col">
            <p className="eyebrow">{book.publisher} : {genreLabel(book.genre)}</p>
            <h3 className="font-display italic text-2xl md:text-3xl text-cocoa-600 mt-1 leading-tight group-hover:text-terracotta-400 transition-colors">
              {book.title}
            </h3>
            <p className="font-body text-cocoa-400 text-sm mt-1">{book.author}</p>
            <p className="font-body text-cocoa-700 text-sm mt-3 line-clamp-3 leading-relaxed">
              {book.summary}
            </p>
            <div className="mt-auto pt-4 flex items-center justify-between gap-3">
              <span className="price-tab text-2xl md:text-3xl">{formatPrice(book.price)}</span>
              <div className="flex items-center gap-2">
                {oos && <span className="chip border-cocoa-200 text-cocoa-600 bg-cream-100">Épuisé</span>}
                <button
                  type="button"
                  onClick={onFavClick}
                  aria-label={fav ? "Retirer des favoris" : "Ajouter aux favoris"}
                  className="p-2 rounded-full bg-paper border border-line hover:border-terracotta-400 transition"
                >
                  <Heart
                    size={16}
                    strokeWidth={1.5}
                    className={fav ? "fill-terracotta-400 stroke-terracotta-400" : "stroke-cocoa-400"}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </a>
    );
  }

  // === FEATURE ===
  if (variant === "feature") {
    const [g1, g2] = book.coverGradient;
    return (
      <a
        href={`/livres/${book.slug}`}
        className="group block relative overflow-hidden rounded-3xl border border-line shadow-page"
      >
        {book.coupDeCoeur && <CoupBadge />}
        <div
          className="aspect-[16/9] md:aspect-[2/1] relative"
          style={{ background: `linear-gradient(135deg, ${g1} 0%, ${g2} 100%)` }}
        >
          <div className="absolute inset-0 scrim" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-cream-50">
            <p className="font-smallcap tracking-windier uppercase text-xs opacity-80">
              {genreLabel(book.genre)} : {book.publisher}
            </p>
            <h3 className="font-display italic text-4xl md:text-6xl leading-[1.05] mt-2 max-w-3xl group-hover:translate-x-1 transition-transform">
              {book.title}
            </h3>
            <p className="font-body italic mt-3 opacity-90">{book.author}</p>
            <p className="font-body text-sm md:text-base mt-4 max-w-2xl opacity-85 line-clamp-3">
              {book.summary}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <span className="price-tab text-3xl text-cream-50">{formatPrice(book.price)}</span>
              <span className="chip bg-cream-50/10 border-cream-50/30 text-cream-50">
                Découvrir
              </span>
            </div>
          </div>
        </div>
      </a>
    );
  }

  // === DEFAULT (3D) ===
  return (
    <a
      href={`/livres/${book.slug}`}
      className="group block focus:outline-none relative"
    >
      <div className="relative">
        {book.coupDeCoeur && <CoupBadge />}

        <button
          type="button"
          onClick={onFavClick}
          aria-label={fav ? "Retirer des favoris" : "Ajouter aux favoris"}
          className={`absolute top-2 right-2 z-20 p-1.5 rounded-full bg-paper/80 backdrop-blur border border-line hover:border-terracotta-400 transition-all duration-200 ${fav ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"}`}
        >
          <Heart
            size={14}
            strokeWidth={1.5}
            className={`transition-transform duration-200 ${fav ? "fill-terracotta-400 stroke-terracotta-400 scale-110" : "stroke-cocoa-400"}`}
            style={fav ? { animation: "bk-heart-pop 350ms cubic-bezier(.2,.7,.2,1)" } : {}}
          />
        </button>
        <HeartBurst trigger={burst} />

        {oos && (
          <span className="absolute bottom-2 left-2 z-10 chip bg-cocoa-700 border-cocoa-700 text-cream-50 text-[10px]">
            Épuisé
          </span>
        )}

        <BookCover book={book} />
      </div>

      <div className="mt-4 px-1">
        <p className="font-display italic text-cocoa-600 text-lg leading-tight group-hover:text-terracotta-400 transition-colors line-clamp-2">
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

      <style>{`
        @keyframes bk-heart-pop { 0%{transform:scale(.6)} 60%{transform:scale(1.4)} 100%{transform:scale(1.1)} }
        @media (prefers-reduced-motion: reduce) {
          .book-3d, .book-3d * { transition: none !important; }
        }
      `}</style>
    </a>
  );
}
