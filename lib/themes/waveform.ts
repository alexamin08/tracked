import type { ThemeConfig } from "./types";

export const waveform: ThemeConfig = {
  id: "waveform",
  name: "Waveform",
  description: "Manrope + Space Grotesk. Rounded, neon accents.",
  fonts: {
    display: "'Manrope', sans-serif",
    body: "'Space Grotesk', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
  },
  radius: {
    sm: "6px",
    md: "12px",
    lg: "16px",
    pill: "9999px",
  },
  colors: {
    dark: {
      bg: "#111318",
      surfaceLowest: "#0C0E12",
      surfaceLow: "#1A1C20",
      surface: "#1E2024",
      surfaceHigh: "#282A2E",
      surfaceHighest: "#333539",
      surfaceBright: "#37393E",
      primary: "#00F0FF",
      secondary: "#DDB7FF",
      tertiary: "#7DF4FF",
      text: "#E2E2E8",
      textMuted: "#B9CACB",
      accent: "#00F0FF",
      border: "rgba(255,255,255,0.06)",
      error: "#FFB4AB",
      onPrimary: "#111318",
    },
    light: {
      bg: "#F4F6F8",
      surfaceLowest: "#EFF1F4",
      surfaceLow: "#E9EDF0",
      surface: "#FFFFFF",
      surfaceHigh: "#E3E7EB",
      surfaceHighest: "#DDE1E5",
      surfaceBright: "#D5D9DE",
      primary: "#006970",
      secondary: "#6900B3",
      tertiary: "#004F54",
      text: "#111318",
      textMuted: "#5A6264",
      accent: "#006970",
      border: "rgba(0,0,0,0.06)",
      error: "#d7383b",
      onPrimary: "#FFFFFF",
    },
  },
  shadows: {
    dark: {
      ambient: "0 24px 48px rgba(0,0,0,0.35)",
      player: "0 -8px 32px rgba(0,0,0,0.35)",
    },
    light: {
      ambient: "0 24px 48px rgba(17,19,24,0.04)",
      player: "0 -8px 32px rgba(17,19,24,0.06)",
    },
  },
  glow: {
    dark: { opacity: 0.1 },
    light: { opacity: 0.04 },
  },
  variants: {
    buttonCase: "uppercase",
    navUnderline: false,
    logoFont: "body",
    logoStyle: "normal",
  },
};
