"use client";

import { createContext, useContext, type ReactNode } from "react";

const ThemeNameContext = createContext<string>("cinematic");

export function ThemeNameProvider({
  theme,
  children,
}: {
  theme: string;
  children: ReactNode;
}) {
  return (
    <ThemeNameContext.Provider value={theme}>
      {children}
    </ThemeNameContext.Provider>
  );
}

export function useThemeName() {
  return useContext(ThemeNameContext);
}
