import React, { useState, useCallback } from "react";
import { AppHeader, isValidHexColor, meetsWCAG_AA } from "@swapps/ui";
import type { SWAPPSThemeConfig, BrandingConfig, Appearance } from "@swapps/ui";
import { usePreviewConfig } from "../contexts/PreviewConfigContext";
import ComponentPreview from "./preview/ComponentPreview";

interface Preset {
  key: string;
  label: string;
  config: Partial<SWAPPSThemeConfig>;
}

const PRESETS: Preset[] = [
  {
    key: "default",
    label: "Neutral / Default",
    config: {
      branding: { organizationName: "" },
    },
  },
  {
    key: "custom",
    label: "Custom Laboratory",
    config: {
      branding: {
        organizationName: "Example Lab",
        primaryColor: "#0043ce",
        accentColor: "#0072c3",
      },
    },
  },
];

const STATUS_TOKENS = [
  { label: "Normal", color: "#24a148", cssVar: "--swapps-status-normal" },
  { label: "Warning", color: "#f1c21b", cssVar: "--swapps-status-warning" },
  { label: "Error", color: "#da1e28", cssVar: "--swapps-status-error" },
  { label: "Critical", color: "#a2191f", cssVar: "--swapps-status-critical" },
  { label: "Disabled", color: "#c6c6c6", cssVar: "--swapps-status-disabled" },
  { label: "Disconnected", color: "#8d8d8d", cssVar: "--swapps-status-disconnected" },
  { label: "Unknown", color: "#a8a8a8", cssVar: "--swapps-status-unknown" },
];

const VIZ_SERIES = [
  { label: "Series 1", color: "#6929c4" },
  { label: "Series 2", color: "#1192e8" },
  { label: "Series 3", color: "#005d5d" },
  { label: "Series 4", color: "#9f1853" },
  { label: "Series 5", color: "#fa4d56" },
  { label: "Series 6", color: "#570408" },
  { label: "Series 7", color: "#198038" },
  { label: "Series 8", color: "#002d9c" },
];

function ContrastBadge({ fg, bg }: { fg: string; bg: string }) {
  if (!isValidHexColor(fg) || !isValidHexColor(bg)) return null;
  const passes = meetsWCAG_AA(fg, bg, true);
  return (
    <span
      className={`swapps-configurator__contrast-badge swapps-configurator__contrast-badge--${passes ? "pass" : "fail"}`}
    >
      {passes ? "AA ✓" : "Low contrast"}
    </span>
  );
}

function generateExportConfig(config: SWAPPSThemeConfig): string {
  const obj: Record<string, unknown> = {
    appearance: config.appearance,
    branding: {} as Record<string, string>,
  };
  const b = obj.branding as Record<string, string>;
  if (config.branding.organizationName) {
    b.organizationName = config.branding.organizationName;
  }
  if (config.branding.logoUrl) {
    b.logoUrl = config.branding.logoUrl;
  }
  if (config.branding.primaryColor) {
    b.primaryColor = config.branding.primaryColor;
  }
  if (config.branding.accentColor) {
    b.accentColor = config.branding.accentColor;
  }
  return JSON.stringify(obj, null, 2);
}

export default function ThemeConfigurator() {
  const {
    previewConfig,
    setPreviewConfig,
    updateAppearance,
    updateBranding,
    resetToDefaults,
  } = usePreviewConfig();

  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const { appearance, branding } = previewConfig;

  const applyPreset = useCallback(
    (preset: Preset) => {
      setActivePreset(preset.key);
      setPreviewConfig({
        appearance: preset.config.appearance ?? previewConfig.appearance,
        branding: {
          ...previewConfig.branding,
          ...preset.config.branding,
        },
      });
    },
    [previewConfig, setPreviewConfig]
  );

  const handleReset = useCallback(() => {
    setActivePreset("default");
    resetToDefaults();
  }, [resetToDefaults]);

  const handleCopyConfig = useCallback(async () => {
    const text = generateExportConfig(previewConfig);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  }, [previewConfig]);

  const bgColor = appearance === "dark" ? "#262626" : "#ffffff";

  return (
    <div className="swapps-configurator">
      {/* Section A: Appearance */}
      <div className="swapps-configurator__section">
        <h3>Appearance</h3>
        <p>
          Controls the light/dark mode for all component previews across the
          documentation. This does <strong>not</strong> change the documentation
          site itself.
        </p>
        <div className="swapps-appearance-toggle">
          <button
            type="button"
            className={`swapps-appearance-toggle__btn ${appearance === "light" ? "swapps-appearance-toggle__btn--active" : ""}`}
            onClick={() => updateAppearance("light")}
          >
            Light
          </button>
          <button
            type="button"
            className={`swapps-appearance-toggle__btn ${appearance === "dark" ? "swapps-appearance-toggle__btn--active" : ""}`}
            onClick={() => updateAppearance("dark")}
          >
            Dark
          </button>
        </div>
      </div>

      {/* Section B: Laboratory Branding */}
      <div className="swapps-configurator__section">
        <h3>Laboratory Branding</h3>
        <p>
          Configure organization identity for general UI component previews.
          Branding does not affect scientific controls or chart visualizations.
        </p>

        <div style={{ marginBottom: "1rem" }}>
          <strong style={{ fontSize: "0.85rem" }}>Presets</strong>
          <div className="swapps-configurator__presets" style={{ marginTop: "0.5rem" }}>
            {PRESETS.map((preset) => (
              <button
                key={preset.key}
                type="button"
                className={`swapps-configurator__preset-btn ${activePreset === preset.key ? "swapps-configurator__preset-btn--active" : ""}`}
                onClick={() => applyPreset(preset)}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="swapps-configurator__field">
          <label htmlFor="cfg-org-name">Organization name</label>
          <input
            id="cfg-org-name"
            type="text"
            value={branding.organizationName}
            onChange={(e) => {
              setActivePreset(null);
              updateBranding({ organizationName: e.target.value });
            }}
            placeholder="e.g., SLAC, Fermilab, LBNL"
          />
        </div>

        <div className="swapps-configurator__field">
          <label htmlFor="cfg-logo-url">Logo URL (optional)</label>
          <input
            id="cfg-logo-url"
            type="url"
            value={branding.logoUrl ?? ""}
            onChange={(e) => {
              setActivePreset(null);
              updateBranding({ logoUrl: e.target.value || undefined });
            }}
            placeholder="https://example.com/logo.svg"
          />
        </div>

        <div className="swapps-configurator__field">
          <label htmlFor="cfg-primary-color">Primary brand color</label>
          <div className="swapps-configurator__color-field">
            <input
              type="color"
              value={branding.primaryColor ?? "#161616"}
              onChange={(e) => {
                setActivePreset(null);
                updateBranding({ primaryColor: e.target.value });
              }}
            />
            <input
              id="cfg-primary-color"
              type="text"
              value={branding.primaryColor ?? ""}
              onChange={(e) => {
                setActivePreset(null);
                updateBranding({
                  primaryColor: e.target.value || undefined,
                });
              }}
              placeholder="#0043ce"
            />
            {branding.primaryColor && (
              <ContrastBadge fg="#ffffff" bg={branding.primaryColor} />
            )}
          </div>
        </div>

        <div className="swapps-configurator__field">
          <label htmlFor="cfg-accent-color">Accent color (optional)</label>
          <div className="swapps-configurator__color-field">
            <input
              type="color"
              value={branding.accentColor ?? "#0072c3"}
              onChange={(e) => {
                setActivePreset(null);
                updateBranding({ accentColor: e.target.value });
              }}
            />
            <input
              id="cfg-accent-color"
              type="text"
              value={branding.accentColor ?? ""}
              onChange={(e) => {
                setActivePreset(null);
                updateBranding({
                  accentColor: e.target.value || undefined,
                });
              }}
              placeholder="#0072c3"
            />
            {branding.accentColor && (
              <ContrastBadge fg="#ffffff" bg={branding.accentColor} />
            )}
          </div>
        </div>
      </div>

      {/* Section C: Functional & Visualization */}
      <div className="swapps-configurator__section">
        <h3>Functional & Visualization Colors</h3>
        <p>
          Controls and charts use semantic colors that are independent of
          laboratory branding. Changing the organization above does not affect
          these colors — they are fixed by the design system to preserve
          functional meaning.
        </p>

        <h4>Status indicators</h4>
        <p style={{ fontSize: "0.85rem", color: "var(--ifm-color-emphasis-600)" }}>
          Used by scientific controls, alarm indicators, and equipment state
          displays. These colors must remain consistent regardless of the
          selected laboratory.
        </p>
        <div className="swapps-swatch-grid">
          {STATUS_TOKENS.map((t) => (
            <div key={t.label} className="swapps-swatch">
              <div
                className="swapps-swatch__color"
                style={{ backgroundColor: t.color }}
              />
              <span className="swapps-swatch__label">{t.label}</span>
            </div>
          ))}
        </div>

        <h4 style={{ marginTop: "1.5rem" }}>Visualization palette</h4>
        <p style={{ fontSize: "0.85rem", color: "var(--ifm-color-emphasis-600)" }}>
          Chart series colors are selected for data readability, series
          differentiation, and accessibility — not derived from branding.
        </p>
        <div className="swapps-swatch-grid">
          {VIZ_SERIES.map((s) => (
            <div key={s.label} className="swapps-swatch">
              <div
                className="swapps-swatch__color"
                style={{ backgroundColor: s.color }}
              />
              <span className="swapps-swatch__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Preview */}
      <div className="swapps-configurator__section">
        <h3>Live Preview</h3>
        <p>
          This AppHeader uses the configuration above. Navigate to other
          component pages to see the same configuration applied globally.
        </p>
        <ComponentPreview label="AppHeader Preview" category="ui">
          <AppHeader
            appTitle="Example Application"
            navItems={[
              { label: "Dashboard", href: "#" },
              { label: "Data", href: "#" },
              { label: "Settings", href: "#" },
            ]}
          />
        </ComponentPreview>
      </div>

      {/* Actions */}
      <div className="swapps-configurator__actions">
        <button
          type="button"
          className="button button--outline button--sm"
          onClick={handleReset}
        >
          Reset to Defaults
        </button>
        <button
          type="button"
          className="button button--primary button--sm"
          onClick={handleCopyConfig}
        >
          {copied ? "Copied!" : "Copy Configuration"}
        </button>
      </div>

      {/* Export preview */}
      <div className="swapps-configurator__export">
        <h3>Exported Configuration</h3>
        <p style={{ fontSize: "0.85rem", color: "var(--ifm-color-emphasis-600)" }}>
          Use this configuration in your application with{" "}
          <code>SWAPPSThemeProvider</code>:
        </p>
        <pre>
          <code>{generateExportConfig(previewConfig)}</code>
        </pre>
      </div>
    </div>
  );
}
