"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type ColorMode = "light" | "dark" | "system";

interface ThemeContextValue {
  colorMode: ColorMode;
  resolvedMode: "light" | "dark";
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const COLOR_MODE_KEY = "tracked-color-mode";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colorMode, setColorModeState] = useState<ColorMode>("dark");
  const [resolvedMode, setResolvedMode] = useState<"light" | "dark">("dark");

  // Load saved color mode
  useEffect(() => {
    const saved = localStorage.getItem(COLOR_MODE_KEY) as ColorMode | null;
    if (saved && ["light", "dark", "system"].includes(saved)) {
      setColorModeState(saved);
    }
  }, []);

  // Resolve color mode and apply data attributes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function resolve() {
      const isDark =
        colorMode === "dark" ||
        (colorMode === "system" && mediaQuery.matches);
      const mode = isDark ? "dark" : "light";
      setResolvedMode(mode);
      document.documentElement.setAttribute("data-mode", mode);
    }

    resolve();
    mediaQuery.addEventListener("change", resolve);
    return () => mediaQuery.removeEventListener("change", resolve);
  }, [colorMode]);

  const setColorMode = useCallback((mode: ColorMode) => {
    setColorModeState(mode);
    localStorage.setItem(COLOR_MODE_KEY, mode);
  }, []);

  const toggleColorMode = useCallback(() => {
    setColorMode(resolvedMode === "dark" ? "light" : "dark");
  }, [resolvedMode, setColorMode]);

  return (
    <ThemeContext.Provider
      value={{ colorMode, resolvedMode, setColorMode, toggleColorMode }}
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
