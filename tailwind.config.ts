import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        t: {
          bg: "var(--t-color-bg)",
          "surface-lowest": "var(--t-color-surface-lowest)",
          "surface-low": "var(--t-color-surface-low)",
          surface: "var(--t-color-surface)",
          "surface-high": "var(--t-color-surface-high)",
          "surface-highest": "var(--t-color-surface-highest)",
          "surface-bright": "var(--t-color-surface-bright)",
          primary: "var(--t-color-primary)",
          secondary: "var(--t-color-secondary)",
          tertiary: "var(--t-color-tertiary)",
          text: "var(--t-color-text)",
          "text-muted": "var(--t-color-text-muted)",
          accent: "var(--t-color-accent)",
          border: "var(--t-color-border)",
          error: "var(--t-color-error)",
          "on-primary": "var(--t-color-on-primary)",
        },
      },
      borderRadius: {
        "t-sm": "var(--t-radius-sm)",
        "t-md": "var(--t-radius-md)",
        "t-lg": "var(--t-radius-lg)",
        "t-pill": "var(--t-radius-pill)",
      },
      boxShadow: {
        "t-ambient": "var(--t-shadow-ambient)",
        "t-player": "var(--t-shadow-player)",
      },
      fontFamily: {
        display: ["var(--t-font-display)"],
        body: ["var(--t-font-body)"],
      },
    },
  },
  plugins: [],
};

export default config;
