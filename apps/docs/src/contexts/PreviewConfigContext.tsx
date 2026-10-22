import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";
import type { SWAPPSThemeConfig, BrandingConfig, Appearance } from "@swapps/ui";
import { DEFAULT_THEME_CONFIG, DEFAULT_BRANDING } from "@swapps/ui";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

const STORAGE_KEY = "swapps-preview-config";

function isValidAppearance(value: unknown): value is Appearance {
  return value === "light" || value === "dark";
}

function isValidBranding(value: unknown): value is BrandingConfig {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  if (typeof obj.organizationName !== "string") return false;
  if (obj.logoUrl !== undefined && typeof obj.logoUrl !== "string") return false;
  if (obj.primaryColor !== undefined && typeof obj.primaryColor !== "string") return false;
  if (obj.accentColor !== undefined && typeof obj.accentColor !== "string") return false;
  return true;
}

function loadPersistedConfig(): SWAPPSThemeConfig | null {
  if (!ExecutionEnvironment.canUseDOM) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      isValidAppearance(parsed.appearance) &&
      isValidBranding(parsed.branding)
    ) {
      return {
        appearance: parsed.appearance,
        branding: {
          organizationName: parsed.branding.organizationName,
          logoUrl: parsed.branding.logoUrl,
          primaryColor: parsed.branding.primaryColor,
          accentColor: parsed.branding.accentColor,
        },
      };
    }
  } catch {
    // invalid or unavailable storage
  }
  return null;
}

function persistConfig(config: SWAPPSThemeConfig): void {
  if (!ExecutionEnvironment.canUseDOM) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // storage full or unavailable
  }
}

export interface PreviewConfigContextValue {
  previewConfig: SWAPPSThemeConfig;
  setPreviewConfig: (config: SWAPPSThemeConfig) => void;
  updateAppearance: (appearance: Appearance) => void;
  updateBranding: (branding: Partial<BrandingConfig>) => void;
  resetToDefaults: () => void;
}

const PreviewConfigContext = createContext<PreviewConfigContextValue>({
  previewConfig: DEFAULT_THEME_CONFIG,
  setPreviewConfig: () => {},
  updateAppearance: () => {},
  updateBranding: () => {},
  resetToDefaults: () => {},
});

export function usePreviewConfig(): PreviewConfigContextValue {
  return useContext(PreviewConfigContext);
}

export function PreviewConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfigState] = useState<SWAPPSThemeConfig>(() => {
    return loadPersistedConfig() ?? DEFAULT_THEME_CONFIG;
  });

  const setPreviewConfig = useCallback((newConfig: SWAPPSThemeConfig) => {
    setConfigState(newConfig);
    persistConfig(newConfig);
  }, []);

  const updateAppearance = useCallback((appearance: Appearance) => {
    setConfigState((prev) => {
      const next = { ...prev, appearance };
      persistConfig(next);
      return next;
    });
  }, []);

  const updateBranding = useCallback((partial: Partial<BrandingConfig>) => {
    setConfigState((prev) => {
      const next = {
        ...prev,
        branding: { ...prev.branding, ...partial },
      };
      persistConfig(next);
      return next;
    });
  }, []);

  const resetToDefaults = useCallback(() => {
    setPreviewConfig(DEFAULT_THEME_CONFIG);
  }, [setPreviewConfig]);

  const value = useMemo(
    () => ({
      previewConfig: config,
      setPreviewConfig,
      updateAppearance,
      updateBranding,
      resetToDefaults,
    }),
    [config, setPreviewConfig, updateAppearance, updateBranding, resetToDefaults]
  );

  return (
    <PreviewConfigContext.Provider value={value}>
      {children}
    </PreviewConfigContext.Provider>
  );
}
