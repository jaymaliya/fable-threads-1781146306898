import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "rgb(var(--bg-rgb) / <alpha-value>)",
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        muted: "rgb(var(--muted-rgb) / <alpha-value>)",
        line: "rgb(var(--line-rgb) / <alpha-value>)",
        primary: "rgb(var(--primary-rgb) / <alpha-value>)",
        "primary-ink": "rgb(var(--primary-ink-rgb) / <alpha-value>)",
        "primary-soft": "var(--primary-soft)",
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        "accent-soft": "var(--accent-soft)",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'DM Mono'", "sans-serif"],
      },
      borderRadius: { brand: "var(--radius)" },
      transitionDuration: { brand: "var(--motion)" },
    },
  },
  plugins: [],
};
export default config;
