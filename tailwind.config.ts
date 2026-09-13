import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        page: "#0a0b14",
        surface: "#10111e",
        card: "#171827",
        gold: {
          DEFAULT: "#e9b65a",
          hover: "#f3c777",
          subtle: "rgba(233, 182, 90, 0.14)",
          border: "rgba(233, 182, 90, 0.4)",
        },
        lavender: {
          DEFAULT: "#9b91e8",
          subtle: "rgba(155, 145, 232, 0.15)",
        },
      },
      fontFamily: {
        sans: ["'DM Sans'", "-apple-system", "sans-serif"],
        heading: ["'Manrope'", "-apple-system", "sans-serif"],
        serif: ["'Playfair Display'", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
