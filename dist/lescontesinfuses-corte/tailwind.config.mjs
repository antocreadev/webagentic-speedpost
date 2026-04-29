/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Palette Les Contes Infusés - distillée des images sources
        cream: {
          50: "#FBF6E9",
          100: "#F7EFD8",
          200: "#F2E7C4",
          300: "#EAD9A6",
          400: "#D9C18A",
        },
        cocoa: {
          50: "#F5E9DD",
          100: "#E5CDB1",
          200: "#C9A37D",
          300: "#A87650",
          400: "#7C4F31",
          500: "#5C3820",
          600: "#4A2D1F",
          700: "#3A2014",
          800: "#26150C",
          900: "#150B05",
        },
        terracotta: {
          50: "#F8E8DD",
          200: "#E2B594",
          400: "#C77A4F",
          600: "#9A4F2A",
        },
        sage: {
          200: "#C7CDB7",
          400: "#8A9876",
          600: "#5A6647",
        },
        plum: {
          200: "#C9B0C5",
          400: "#8E6C90",
          600: "#5E456A",
        },
        ink: "#2A1810",
        paper: "#FBF6E9",
        line: "#D9C8A8",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        smallcap: ["Cormorant SC", "serif"],
        body: ["Lora", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        script: ["Pinyon Script", "cursive"],
      },
      letterSpacing: {
        widest: "0.18em",
        windier: "0.24em",
      },
      backgroundImage: {
        "paper-texture":
          "radial-gradient(circle at 30% 20%, rgba(74, 45, 31, 0.04) 0%, transparent 60%), radial-gradient(circle at 70% 80%, rgba(74, 45, 31, 0.05) 0%, transparent 55%)",
        "lace-vignette":
          "radial-gradient(ellipse at center, transparent 60%, rgba(74, 45, 31, 0.08) 100%)",
      },
      boxShadow: {
        book: "0 1px 0 0 rgba(74,45,31,.12), 0 6px 18px -8px rgba(74,45,31,.25), 0 18px 36px -18px rgba(74,45,31,.25)",
        page: "0 30px 60px -30px rgba(74,45,31,.4)",
      },
      keyframes: {
        steam: {
          "0%": { transform: "translateY(0) scale(1)", opacity: ".55" },
          "50%": { opacity: ".25" },
          "100%": {
            transform: "translateY(-30px) scale(1.4)",
            opacity: "0",
          },
        },
        pageTurn: {
          "0%": { transform: "perspective(1500px) rotateY(0)" },
          "100%": { transform: "perspective(1500px) rotateY(-180deg)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        steam: "steam 3.2s ease-out infinite",
        pageTurn: "pageTurn 1.4s cubic-bezier(.4,.1,.2,1) forwards",
        fadeUp: "fadeUp .8s cubic-bezier(.2,.7,.2,1) both",
      },
    },
  },
  plugins: [],
};
