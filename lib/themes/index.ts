import type { ThemeConfig } from "./types";
import { cinematic } from "./cinematic";
import { editorial } from "./editorial";
import { waveform } from "./waveform";

export const themes: Record<string, ThemeConfig> = {
  cinematic,
  editorial,
  waveform,
};

export const defaultTheme = cinematic;

export function getTheme(id: string | null | undefined): ThemeConfig {
  if (!id) return defaultTheme;
  return themes[id] ?? defaultTheme;
}

export type { ThemeConfig, ThemeColors } from "./types";
