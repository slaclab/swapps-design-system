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

  const { primaryColor, accentColor } = config.branding;
  const brandStyles = useMemo(() => {
    const vars: Record<string, string> = {};
    if (primaryColor) {
      vars["--swapps-brand-primary"] = primaryColor;
    }
    if (accentColor) {
      vars["--swapps-brand-accent"] = accentColor;
    }
    return vars;
  }, [primaryColor, accentColor]);

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
