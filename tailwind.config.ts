import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Siam Park Tickets — Tropical Thai Adventure Palette
        brand: {
          teal: "#07575B",      // Deep Teal ⭐ Primary brand, navigation, footer
          turquoise: "#08A6A6", // Ocean Turquoise ⭐ Water sections, secondary buttons
          orange: "#F15A24",    // Siam Orange ⭐ Main CTA, highlights, prices
          green: "#3D8B40",     // Tropical Green Nature, icons, secondary accents
          gold: "#E8B84A",      // Golden Sand Thai-inspired accents
          white: "#FFFFFF",     // Cloud White Main background
          aqua: "#E3F5F3",      // Soft Aqua Light sections/cards
          navy: "#102A43",      // Deep Navy Headings and body text
        },
        stone: {
          50: "#FFFFFF",   // Cloud White
          100: "#E3F5F3",  // Soft Aqua
          200: "#CDEEEA",  // Pale Aqua
          800: "#07575B",  // Deep Teal
          900: "#102A43",  // Deep Navy
        },
        gold: {
          400: "#E8B84A",  // Golden Sand
          500: "#F15A24",  // Siam Orange ⭐
          600: "#D94612",
        },
        emerald: {
          900: "#07575B",  // Deep Teal ⭐
          800: "#08A6A6",  // Ocean Turquoise ⭐
          700: "#3D8B40",  // Tropical Green ⭐
        },
        maya: {
          forest: "rgb(var(--color-maya-forest) / <alpha-value>)",
          jungle: "rgb(var(--color-maya-jungle) / <alpha-value>)",
          ivory: "rgb(var(--color-maya-ivory) / <alpha-value>)",
          gold: "rgb(var(--color-maya-gold) / <alpha-value>)",
          sand: "#E3F5F3",
          sage: "#E3F5F3",
          charcoal: "rgb(var(--color-maya-charcoal) / <alpha-value>)",
          white: "#FFFFFF",
          emerald: "rgb(var(--color-maya-emerald) / <alpha-value>)",
          dark: "#07575B",
        },
        // Compatibility aliases for site components
        chichen: {
          navy: "rgb(var(--color-maya-forest) / <alpha-value>)",
          ottoman: "#08A6A6",
          gold: "rgb(var(--color-maya-gold) / <alpha-value>)",
          charcoal: "rgb(var(--color-maya-charcoal) / <alpha-value>)",
          ivory: "#FFFFFF",
          sky: "#E3F5F3",
          sand: "#E3F5F3",
        },
        navy: {
          900: "#102A43",
          800: "#07575B",
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
