/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Rose pâle moderne — palette pure rose + 1 aubergine pour contraste profond
        rose: {
          soft: "#FAEEEE",   // very pale pink, the bg principal
          DEFAULT: "#E8B5BB", // rose mid
          deep: "#C7506E",    // rose saturated, accent CTA
          50: "#FCF4F4",
        },
        blush: {
          DEFAULT: "#F5DCDA", // blush mid
          soft: "#FAE6E5",    // blush light
        },
        cream: "#FFFAF8",       // off-white sur lequel les cards posent
        ink: {
          DEFAULT: "#1F1718",  // warm near-black with wine undertone
          80: "#3D2D31",
          60: "#6B5C5E",
          40: "#9B8F8F",
          20: "#D8CFCD",
        },
        aubergine: {
          DEFAULT: "#4A2536",  // deep wine, contraste profond (remplace woad/saffron/sage)
          deep: "#2D1521",
          soft: "#6F3E54",
        },
        line: {
          DEFAULT: "#E8D4D2",   // ligne rose poudré
          deep: "#3D2D31",
        },
      },
      fontFamily: {
        display: ["'Instrument Serif'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        cursive: ["'Pinyon Script'", "cursive"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight2: "-0.025em",
        widest: "0.18em",
        windier: "0.24em",
      },
      fontSize: {
        "display-xl": ["clamp(72px, 11vw, 168px)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
        "display-l": ["clamp(56px, 7vw, 112px)", { lineHeight: "0.94", letterSpacing: "-0.035em" }],
        "display-m": ["clamp(40px, 5vw, 72px)", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floatY: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(.2,.8,.2,1) both",
        marquee: "marquee 32s linear infinite",
        "float-y": "floatY 5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
