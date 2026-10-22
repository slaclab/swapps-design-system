import { createContext, useContext } from "react";
import type { SWAPPSThemeConfig, BrandingConfig } from "./types";
import { DEFAULT_THEME_CONFIG, DEFAULT_BRANDING } from "./types";

export interface SWAPPSThemeContextValue {
  config: SWAPPSThemeConfig;
  setConfig: (config: SWAPPSThemeConfig) => void;
}

export const SWAPPSThemeContext = createContext<SWAPPSThemeContextValue>({
  config: DEFAULT_THEME_CONFIG,
  setConfig: () => {},
});

export function useSWAPPSTheme(): SWAPPSThemeContextValue {
  return useContext(SWAPPSThemeContext);
}

export function useSWAPPSAppearance(): SWAPPSThemeConfig["appearance"] {
  return useContext(SWAPPSThemeContext).config.appearance;
}

export function useSWAPPSBranding(): BrandingConfig {
  return useContext(SWAPPSThemeContext).config.branding ?? DEFAULT_BRANDING;
}
