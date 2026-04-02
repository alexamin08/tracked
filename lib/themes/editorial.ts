import type { ThemeConfig } from "./types";

export const editorial: ThemeConfig = {
  id: "editorial",
  name: "Editorial",
  description: "Playfair Display + Space Grotesk. Sharp corners, warm tones.",
  fonts: {
    display: "'Playfair Display', serif",
    body: "'Space Grotesk', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
  },
  radius: {
    sm: "0px",
    md: "0px",
    lg: "0px",
    pill: "0px",
  },
  colors: {
    dark: {
      bg: "#151311",
      surfaceLowest: "#121010",
      surfaceLow: "#1D1B19",
      surface: "#211F1D",
      surfaceHigh: "#2B2926",
      surfaceHighest: "#373432",
      surfaceBright: "#433F3C",
      primary: "#D4503A",
      secondary: "#C47A2E",
      tertiary: "#9B8B7A",
      text: "#F5F0E8",
      textMuted: "#9B9488",
      accent: "#D4503A",
      border: "rgba(255,255,255,0.06)",
      error: "#ffb4ab",
      onPrimary: "#F5F0E8",
    },
    light: {
      bg: "#F7F5F0",
      surfaceLowest: "#F3F0EA",
      surfaceLow: "#EFECE5",
      surface: "#FFFFFF",
      surfaceHigh: "#EAE7E0",
      surfaceHighest: "#E4E1DA",
      surfaceBright: "#DDD9D2",
      primary: "#8B261D",
      secondary: "#A05A2C",
      tertiary: "#7A7873",
      text: "#1C1B1A",
      textMuted: "#7A7873",
      accent: "#8B261D",
      border: "rgba(0,0,0,0.06)",
      error: "#d7383b",
      onPrimary: "#F7F5F0",
    },
  },
  shadows: {
    dark: {
      ambient: "0 24px 48px rgba(16,14,12,0.4)",
      player: "0 -8px 32px rgba(16,14,12,0.4)",
    },
    light: {
      ambient: "0 24px 48px rgba(28,27,26,0.04)",
      player: "0 -8px 32px rgba(28,27,26,0.06)",
    },
  },
  glow: {
    dark: { opacity: 0.06 },
    light: { opacity: 0.03 },
  },
  variants: {
    buttonCase: "uppercase",
    navUnderline: true,
    logoFont: "display",
    logoStyle: "normal",
  },
};
