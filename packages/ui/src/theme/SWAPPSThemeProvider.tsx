import React, { useMemo } from "react";
import { Theme } from "@carbon/react";
import { SWAPPSThemeContext } from "./SWAPPSThemeContext";
import type { SWAPPSThemeConfig } from "./types";
import { DEFAULT_THEME_CONFIG, appearanceToCarbonTheme } from "./types";

export interface SWAPPSThemeProviderProps {
  config?: SWAPPSThemeConfig;
  onConfigChange?: (config: SWAPPSThemeConfig) => void;
  children: React.ReactNode;
}

export function SWAPPSThemeProvider({
  config = DEFAULT_THEME_CONFIG,
  onConfigChange,
  children,
}: SWAPPSThemeProviderProps) {
  const carbonTheme = appearanceToCarbonTheme(config.appearance);

  const brandStyles = useMemo(() => {
    const vars: Record<string, string> = {};
    const { branding } = config;
    if (branding.primaryColor) {
      vars["--swapps-brand-primary"] = branding.primaryColor;
    }
    if (branding.accentColor) {
      vars["--swapps-brand-accent"] = branding.accentColor;
    }
    return vars;
  }, [config.branding.primaryColor, config.branding.accentColor]);

  const contextValue = useMemo(
    () => ({
      config,
      setConfig: onConfigChange ?? (() => {}),
    }),
    [config, onConfigChange]
  );

  return (
    <SWAPPSThemeContext.Provider value={contextValue}>
      <Theme theme={carbonTheme} style={brandStyles}>
        {children}
      </Theme>
    </SWAPPSThemeContext.Provider>
  );
}
