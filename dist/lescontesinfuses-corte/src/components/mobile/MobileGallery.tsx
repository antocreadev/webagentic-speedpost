import React, { useEffect, useRef, useState } from "react";

interface Slide {
  src?: string;
  label: string;
  bg?: string;
  caption?: string;
}
interface Props {
  slides: Slide[];
  ariaLabel?: string;
}

export default function MobileGallery({ slides, ariaLabel = "Galerie" }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const slideEls = Array.from(track.querySelectorAll<HTMLElement>("[data-slide]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const idx = slideEls.indexOf(entry.target as HTMLElement);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { root: track, threshold: [0.6] }
    );
    slideEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [slides]);

  return (
    <div className="md:hidden" aria-label={ariaLabel} role="region">
      <div
        ref={trackRef}
        className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory -mx-5 px-5 gap-3"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {slides.map((s, i) => (
          <div
            key={i}
            data-slide
            className="snap-center shrink-0 w-[78%] aspect-[3/4] rounded-2xl overflow-hidden border border-line shadow-md flex items-center justify-center text-cream-50"
            style={{ background: s.bg || "linear-gradient(155deg,#7C4F31,#4A2D1F)" }}
          >
            {s.src ? (
              <img src={s.src} alt={s.label} loading="lazy" decoding="async" className="w-full h-full object-cover" />
            ) : (
              <span className="font-display italic text-3xl px-6 text-center">{s.label}</span>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 mt-4">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`block rounded-full transition-all duration-300 ${i === active ? "w-6 h-1.5 bg-terracotta-400" : "w-1.5 h-1.5 bg-line"}`}
          />
        ))}
      </div>
    </div>
  );
}
