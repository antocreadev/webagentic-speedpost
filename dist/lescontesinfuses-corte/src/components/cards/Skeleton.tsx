import React from "react";

export type SkeletonVariant = "book" | "event" | "product" | "boisson";

interface Props {
  variant: SkeletonVariant;
  count?: number;
}

const shimmer =
  "relative overflow-hidden bg-gradient-to-br from-cream-100 to-cream-200/70 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-cream-50/60 before:to-transparent before:animate-[sk-shimmer_1.6s_infinite]";

function Book() {
  return (
    <div className="block">
      <div className={`${shimmer} aspect-[2/3] w-full rounded-sm`} />
      <div className="mt-4 px-1 space-y-2">
        <div className="h-4 w-3/4 bg-cream-200 rounded" />
        <div className="h-3 w-1/2 bg-cream-100 rounded" />
        <div className="h-3 w-16 bg-cream-200 rounded" />
      </div>
    </div>
  );
}

function Event() {
  return (
    <div className="bg-cream-50 border border-line rounded-2xl p-6">
      <div className="flex items-start gap-6">
        <div className={`${shimmer} w-16 h-20 rounded`} />
        <div className="flex-1 space-y-3">
          <div className="h-3 w-1/3 bg-cream-200 rounded" />
          <div className="h-5 w-3/4 bg-cream-200 rounded" />
          <div className="h-3 w-2/3 bg-cream-100 rounded" />
          <div className="flex gap-2 pt-1">
            <div className="h-5 w-16 bg-cream-200 rounded-full" />
            <div className="h-5 w-20 bg-cream-200 rounded-full" />
          </div>
          <div className="h-px w-full bg-cream-200 mt-2" />
        </div>
      </div>
    </div>
  );
}

function Product() {
  return (
    <div className="block">
      <div className={`${shimmer} aspect-square w-full rounded-2xl`} />
      <div className="mt-3 px-1 space-y-2">
        <div className="h-4 w-2/3 bg-cream-200 rounded" />
        <div className="h-3 w-1/2 bg-cream-100 rounded" />
        <div className="h-3 w-16 bg-cream-200 rounded" />
      </div>
    </div>
  );
}

function Boisson() {
  return (
    <div className="bg-cream-50 border border-line rounded-2xl p-5">
      <div className="flex items-start gap-4">
        <div className={`${shimmer} w-16 h-16 rounded-full`} />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 bg-cream-200 rounded" />
          <div className="h-3 w-1/2 bg-cream-100 rounded" />
          <div className="h-3 w-20 bg-cream-200 rounded mt-3" />
        </div>
      </div>
    </div>
  );
}

const map = { book: Book, event: Event, product: Product, boisson: Boisson };

export default function Skeleton({ variant, count = 1 }: Props) {
  const Cmp = map[variant];
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} aria-busy="true" aria-label="Chargement">
          <Cmp />
        </div>
      ))}
      <style>{`@keyframes sk-shimmer { 100% { transform: translateX(100%); } }`}</style>
    </>
  );
}
