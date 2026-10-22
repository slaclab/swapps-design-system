import React from "react";
import Link from "@docusaurus/Link";
import { usePreviewConfig } from "../../contexts/PreviewConfigContext";

export default function PreviewConfigIndicator() {
  const { previewConfig } = usePreviewConfig();
  const { appearance, branding } = previewConfig;

  const orgLabel = branding.organizationName || "Default";
  const modeLabel = appearance === "dark" ? "Dark" : "Light";

  return (
    <div className="swapps-config-indicator">
      <span className="swapps-config-indicator__label">
        Preview: {orgLabel} · {modeLabel}
      </span>
      <Link
        to="/docs/themes/overview"
        className="swapps-config-indicator__link"
      >
        Configure
      </Link>
    </div>
  );
}
