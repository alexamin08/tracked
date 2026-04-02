import type { ThemeConfig } from "./types";

export const cinematic: ThemeConfig = {
  id: "cinematic",
  name: "Cinematic",
  description: "Newsreader + Space Grotesk. The default Tracked experience.",
  fonts: {
    display: "'Newsreader', serif",
    body: "'Space Grotesk', sans-serif",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,500&family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
  },
  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    pill: "9999px",
  },
  colors: {
    dark: {
      bg: "#0e0e13",
      surfaceLowest: "#111118",
      surfaceLow: "#16161d",
      surface: "#1c1c24",
      surfaceHigh: "#24242e",
      surfaceHighest: "#2e2e3a",
      surfaceBright: "#38384a",
      primary: "#6dddff",
      secondary: "#ac89ff",
      tertiary: "#82a3ff",
      text: "#e8e8ed",
      textMuted: "#8b8b9e",
      accent: "#6dddff",
      border: "rgba(255,255,255,0.06)",
      error: "#d7383b",
      onPrimary: "#0e0e13",
    },
    light: {
      bg: "#FBFBFA",
      surfaceLowest: "#F8F8F7",
      surfaceLow: "#F5F5F4",
      surface: "#FFFFFF",
      surfaceHigh: "#F0F0EF",
      surfaceHighest: "#EAEAE9",
      surfaceBright: "#E4E4E3",
      primary: "#007AFF",
      secondary: "#7C4DFF",
      tertiary: "#5B7FD8",
      text: "#1D1D1F",
      textMuted: "#86868B",
      accent: "#00B4D8",
      border: "rgba(0,0,0,0.06)",
      error: "#d7383b",
      onPrimary: "#FFFFFF",
    },
  },
  shadows: {
    dark: {
      ambient: "0 24px 48px rgba(0,0,0,0.3)",
      player: "0 -8px 32px rgba(0,0,0,0.3)",
    },
    light: {
      ambient: "0 24px 48px rgba(29,29,31,0.04)",
      player: "0 -8px 32px rgba(29,29,31,0.06)",
    },
  },
  glow: {
    dark: { opacity: 0.08 },
    light: { opacity: 0.04 },
  },
  variants: {
    buttonCase: "normal",
    navUnderline: false,
    logoFont: "display",
    logoStyle: "italic",
  },
};
