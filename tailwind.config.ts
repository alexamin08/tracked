import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        azure: {
          DEFAULT: "#0058bb",
          50: "#e8f1fb",
          100: "#c5dcf5",
          200: "#8db9eb",
          300: "#5596e0",
          400: "#2d7ad6",
          500: "#0058bb",
          600: "#004a9e",
          700: "#003b7e",
          800: "#002c5f",
          900: "#001d3f",
        },
        surface: {
          dark: "#0a0a1a",
          "dark-mid": "#0d1b3e",
        },
      },
      borderRadius: {
        pill: "9999px",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      backdropBlur: {
        glass: "20px",
      },
    },
  },
  plugins: [],
};

export default config;
