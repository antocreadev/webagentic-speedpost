import React, { useEffect, useState } from "react";
import BookmarkIcon from "./icons/BookmarkIcon";

export default function Bookmark() {
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onMq = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onMq);

    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener?.("change", onMq);
    };
  }, []);

  if (reduced) return null;

  const height = 80 + progress * 80;

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // ripple ping
    const ping = document.createElement("span");
    ping.className = "bm-ping";
    ping.style.left = `${e.clientX}px`;
    ping.style.top = `${e.clientY}px`;
    document.body.appendChild(ping);
    window.setTimeout(() => ping.remove(), 700);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Revenir en haut de la page"
      className="lci-bookmark fixed top-0 right-8 z-40 transition-[height] duration-300 ease-out hover:scale-105"
      style={{ height: `${height}px`, width: "24px" }}
    >
      <BookmarkIcon width={24} height={height} />
    </button>
  );
}
