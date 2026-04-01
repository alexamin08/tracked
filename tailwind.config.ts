import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--t-color-primary)",
          hover: "var(--t-color-primary-hover)",
          light: "var(--t-color-primary-light)",
          muted: "var(--t-color-primary-muted)",
          subtle: "var(--t-color-primary-subtle)",
        },
        surface: {
          DEFAULT: "var(--t-color-bg)",
          secondary: "var(--t-color-bg-secondary)",
          tertiary: "var(--t-color-bg-tertiary)",
          card: "var(--t-color-bg-card)",
          input: "var(--t-color-bg-input)",
        },
        content: {
          DEFAULT: "var(--t-color-text)",
          secondary: "var(--t-color-text-secondary)",
          tertiary: "var(--t-color-text-tertiary)",
          muted: "var(--t-color-text-muted)",
          "on-primary": "var(--t-color-text-on-primary)",
          "on-dark": "var(--t-color-text-on-dark)",
          "on-dark-secondary": "var(--t-color-text-on-dark-secondary)",
          "on-dark-muted": "var(--t-color-text-on-dark-muted)",
        },
        border: {
          DEFAULT: "var(--t-color-border)",
          light: "var(--t-color-border-light)",
        },
        ring: {
          focus: "var(--t-color-ring-focus)",
        },
        semantic: {
          success: "var(--t-color-success)",
          error: "var(--t-color-error)",
          warning: "var(--t-color-warning)",
        },
      },
      borderRadius: {
        pill: "var(--t-radius-pill)",
        card: "var(--t-radius-card)",
        icon: "var(--t-radius-icon)",
      },
      boxShadow: {
        card: "var(--t-shadow-card)",
        elevated: "var(--t-shadow-elevated)",
      },
      fontFamily: {
        sans: ["var(--t-font-family)"],
      },
      fontSize: {
        badge: "var(--t-font-size-badge)",
        caption: "var(--t-font-size-caption)",
        "card-title": "var(--t-font-size-card-title)",
      },
      spacing: {
        "player-h": "var(--t-player-height)",
        "header-h": "var(--t-header-height)",
        "icon-sm": "var(--t-icon-sm)",
        "icon-md": "var(--t-icon-md)",
        "icon-lg": "var(--t-icon-lg)",
        "icon-xl": "var(--t-icon-xl)",
      },
      zIndex: {
        header: "var(--t-z-header)",
        player: "var(--t-z-player)",
        modal: "var(--t-z-modal)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "200ms",
        slow: "300ms",
      },
    },
  },
  plugins: [],
};

export default config;
