import React from "react";
import { SWAPPSThemeProvider } from "@swapps/ui";
import type { SWAPPSThemeConfig } from "@swapps/ui";
import { usePreviewConfig } from "../../contexts/PreviewConfigContext";

export type PreviewCategory = "ui" | "controls" | "charts";

interface ComponentPreviewProps {
  children: React.ReactNode;
  /** Which component category this preview represents */
  category?: PreviewCategory;
  /** Optional label shown above the preview */
  label?: string;
  /** Override the global preview config for this specific preview */
  configOverride?: Partial<SWAPPSThemeConfig>;
}

export default function ComponentPreview({
  children,
  category = "ui",
  label,
  configOverride,
}: ComponentPreviewProps) {
  const { previewConfig } = usePreviewConfig();

  const effectiveConfig: SWAPPSThemeConfig = {
    ...previewConfig,
    ...configOverride,
    branding: {
      ...previewConfig.branding,
      ...configOverride?.branding,
    },
  };

  const themeConfig: SWAPPSThemeConfig =
    category === "ui"
      ? effectiveConfig
      : {
          ...effectiveConfig,
          branding: {
            organizationName: "",
          },
        };

  return (
    <div className="swapps-preview">
      {label && <div className="swapps-preview__header">{label}</div>}
      <div className="swapps-preview__content">
        <SWAPPSThemeProvider config={themeConfig}>
          {children}
        </SWAPPSThemeProvider>
      </div>
    </div>
  );
}
