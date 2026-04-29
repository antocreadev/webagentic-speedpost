import React from "react";

interface Props {
  width?: number;
  height?: number;
  className?: string;
}

export default function BookmarkIcon({ width = 24, height = 80, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 24 80"
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bm-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#C77A4F" />
          <stop offset="100%" stopColor="#9A4F2A" />
        </linearGradient>
      </defs>
      <path
        d="M0 0 L24 0 L24 80 L12 70 L0 80 Z"
        fill="url(#bm-grad)"
        stroke="#9A4F2A"
        strokeWidth="0.5"
      />
      <line x1="12" y1="6" x2="12" y2="60" stroke="#FBF6E9" strokeOpacity="0.35" strokeWidth="0.6" strokeDasharray="2 3" />
    </svg>
  );
}
