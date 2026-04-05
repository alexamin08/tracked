"use client";

import { useThemeName } from "@/components/theme-name-provider";

/**
 * Returns the active theme name. Uses React context (set by layout.tsx from
 * hostname detection) so that SSR renders the correct theme from the start.
 */
export function useActiveTheme() {
  return useThemeName();
}
