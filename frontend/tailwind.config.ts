import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#132A2E",       // deep teal-black, primary text (also dark-mode bg)
        paper: "#FBF7EF",     // warm map-paper background (also dark-mode text)
        compass: "#C4622D",   // burnt orange accent (compass needle)
        route: "#4FA08E",     // route-line green (lightened for dark-mode contrast)
        gold: "#D4A24C",      // wax-seal gold for highlights
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-lines": "linear-gradient(to right, rgba(19,42,46,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(19,42,46,0.05) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;
