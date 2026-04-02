"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import { getTheme, defaultTheme } from "@/lib/themes";
import type { ThemeConfig, ThemeColors } from "@/lib/themes/types";

type ColorMode = "light" | "dark" | "system";

interface ThemeContextValue {
  config: ThemeConfig;
  colorMode: ColorMode;
  resolvedMode: "light" | "dark";
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const COLOR_MODE_KEY = "tracked-color-mode";

function applyThemeToRoot(config: ThemeConfig, mode: "light" | "dark") {
  const root = document.documentElement;
  const colors: ThemeColors = config.colors[mode];
  const shadows = config.shadows[mode];
  const glow = config.glow[mode];

  // Colors
  root.style.setProperty("--t-color-bg", colors.bg);
  root.style.setProperty("--t-color-surface-lowest", colors.surfaceLowest);
  root.style.setProperty("--t-color-surface-low", colors.surfaceLow);
  root.style.setProperty("--t-color-surface", colors.surface);
  root.style.setProperty("--t-color-surface-high", colors.surfaceHigh);
  root.style.setProperty("--t-color-surface-highest", colors.surfaceHighest);
  root.style.setProperty("--t-color-surface-bright", colors.surfaceBright);
  root.style.setProperty("--t-color-primary", colors.primary);
  root.style.setProperty("--t-color-secondary", colors.secondary);
  root.style.setProperty("--t-color-tertiary", colors.tertiary);
  root.style.setProperty("--t-color-text", colors.text);
  root.style.setProperty("--t-color-text-muted", colors.textMuted);
  root.style.setProperty("--t-color-accent", colors.accent);
  root.style.setProperty("--t-color-border", colors.border);
  root.style.setProperty("--t-color-error", colors.error);
  root.style.setProperty("--t-color-on-primary", colors.onPrimary);

  // Fonts
  root.style.setProperty("--t-font-display", config.fonts.display);
  root.style.setProperty("--t-font-body", config.fonts.body);

  // Radius
  root.style.setProperty("--t-radius-sm", config.radius.sm);
  root.style.setProperty("--t-radius-md", config.radius.md);
  root.style.setProperty("--t-radius-lg", config.radius.lg);
  root.style.setProperty("--t-radius-pill", config.radius.pill);

  // Shadows
  root.style.setProperty("--t-shadow-ambient", shadows.ambient);
  root.style.setProperty("--t-shadow-player", shadows.player);

  // Glow
  root.style.setProperty("--t-glow-opacity", String(glow.opacity));

  // Variants
  root.style.setProperty(
    "--t-button-case",
    config.variants.buttonCase === "uppercase" ? "uppercase" : "none"
  );
  root.style.setProperty(
    "--t-nav-underline",
    config.variants.navUnderline ? "underline" : "none"
  );
  root.style.setProperty(
    "--t-logo-font",
    config.variants.logoFont === "display"
      ? config.fonts.display
      : config.fonts.body
  );
  root.style.setProperty(
    "--t-logo-style",
    config.variants.logoStyle === "italic" ? "italic" : "normal"
  );
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const themeId = searchParams.get("theme");

  const config = useMemo(() => getTheme(themeId), [themeId]);

  const [colorMode, setColorModeState] = useState<ColorMode>("system");
  const [resolvedMode, setResolvedMode] = useState<"light" | "dark">("dark");

  // Load saved color mode
  useEffect(() => {
    const saved = localStorage.getItem(COLOR_MODE_KEY) as ColorMode | null;
    if (saved && ["light", "dark", "system"].includes(saved)) {
      setColorModeState(saved);
    }
  }, []);

  // Inject Google Fonts
  useEffect(() => {
    const existingLink = document.querySelector(
      'link[data-theme-fonts="true"]'
    );
    if (existingLink) existingLink.remove();

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = config.fonts.googleFontsUrl;
    link.dataset.themeFonts = "true";
    document.head.appendChild(link);

    return () => {
      link.remove();
    };
  }, [config.fonts.googleFontsUrl]);

  // Resolve color mode and apply theme
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function resolve() {
      const isDark =
        colorMode === "dark" ||
        (colorMode === "system" && mediaQuery.matches);
      const mode = isDark ? "dark" : "light";
      setResolvedMode(mode);
      applyThemeToRoot(config, mode);
      document.documentElement.classList.toggle("dark", isDark);
    }

    resolve();
    mediaQuery.addEventListener("change", resolve);
    return () => mediaQuery.removeEventListener("change", resolve);
  }, [colorMode, config]);

  const setColorMode = useCallback((mode: ColorMode) => {
    setColorModeState(mode);
    localStorage.setItem(COLOR_MODE_KEY, mode);
  }, []);

  const toggleColorMode = useCallback(() => {
    setColorMode(resolvedMode === "dark" ? "light" : "dark");
  }, [resolvedMode, setColorMode]);

  return (
    <ThemeContext.Provider
      value={{ config, colorMode, resolvedMode, setColorMode, toggleColorMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
