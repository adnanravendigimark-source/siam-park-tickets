import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Siam Park Tickets — Lagoon Turquoise/Sunset Gold tropical palette.
        // Class names below (stone/gold/emerald/maya/chichen/navy) are
        // unchanged from the Chichen Itza repo this project was cloned
        // from — renaming those identifiers is a purely cosmetic,
        // zero-visual-effect change across 50+ files, so only the color
        // VALUES were updated.
        stone: {
          50: "#F5FAF9",   // Sea Foam Ivory
          100: "#EAF4F3",
          200: "#D6E9E6",  // Pale Aqua
          800: "#123A3F",
          900: "#0A3D42",  // Deep Ocean Teal
        },
        gold: {
          400: "#F2653C",
          500: "#F0A93A",  // Sun Gold ⭐
          600: "#C9862A",
        },
        emerald: {
          900: "#0A3D42",  // Deep Ocean Teal ⭐
          800: "#0E7C86",  // Lagoon Turquoise
          700: "#12878F",  // Lagoon Green
        },
        maya: {
          forest: "rgb(var(--color-maya-forest) / <alpha-value>)",
          jungle: "rgb(var(--color-maya-jungle) / <alpha-value>)",
          ivory: "rgb(var(--color-maya-ivory) / <alpha-value>)",
          gold: "rgb(var(--color-maya-gold) / <alpha-value>)",
          sand: "#D6E9E6",
          sage: "#E3F3F1",
          charcoal: "rgb(var(--color-maya-charcoal) / <alpha-value>)",
          white: "#FFFFFF",
          emerald: "rgb(var(--color-maya-emerald) / <alpha-value>)",
          dark: "#0A3D42",
        },
        // Compatibility aliases for site components
        chichen: {
          navy: "rgb(var(--color-maya-forest) / <alpha-value>)",
          ottoman: "#12878F",
          gold: "rgb(var(--color-maya-gold) / <alpha-value>)",
          charcoal: "rgb(var(--color-maya-charcoal) / <alpha-value>)",
          ivory: "#F5FAF9",
          sky: "#E3F3F1",
          sand: "#D6E9E6",
        },
        navy: {
          900: "#0A3D42",
          800: "#12878F",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "Georgia", "ui-serif", "serif"],
        script: ["var(--font-script)", "Alex Brush", "cursive"],
        body: ["system-ui", "-apple-system", "sans-serif"],
      },
      backgroundImage: {
        mosaic:
          "radial-gradient(circle at 20% 20%, rgba(197,138,43,0.15) 0, transparent 40%), radial-gradient(circle at 80% 0%, rgba(7,59,42,0.25) 0, transparent 40%), radial-gradient(circle at 50% 80%, rgba(20,90,67,0.25) 0, transparent 45%)",
      },
    },
  },
  plugins: [],
};
export default config;
