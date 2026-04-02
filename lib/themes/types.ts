export interface ThemeColors {
  bg: string;
  surfaceLowest: string;
  surfaceLow: string;
  surface: string;
  surfaceHigh: string;
  surfaceHighest: string;
  surfaceBright: string;
  primary: string;
  secondary: string;
  tertiary: string;
  text: string;
  textMuted: string;
  accent: string;
  border: string;
  error: string;
  onPrimary: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  fonts: {
    display: string;
    body: string;
    googleFontsUrl: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    pill: string;
  };
  colors: {
    dark: ThemeColors;
    light: ThemeColors;
  };
  shadows: {
    dark: { ambient: string; player: string };
    light: { ambient: string; player: string };
  };
  glow: {
    dark: { opacity: number };
    light: { opacity: number };
  };
  variants: {
    buttonCase: "normal" | "uppercase";
    navUnderline: boolean;
    logoFont: "display" | "body";
    logoStyle: "italic" | "normal";
  };
}
