export type CarbonTheme = "white" | "g10" | "g90" | "g100";

export type Appearance = "light" | "dark";

export interface BrandingConfig {
  organizationName: string;
  logoUrl?: string;
  primaryColor?: string;
  accentColor?: string;
}

export interface SWAPPSThemeConfig {
  appearance: Appearance;
  branding: BrandingConfig;
}

export const DEFAULT_BRANDING: BrandingConfig = {
  organizationName: "",
};

export const DEFAULT_THEME_CONFIG: SWAPPSThemeConfig = {
  appearance: "light",
  branding: DEFAULT_BRANDING,
};

export function appearanceToCarbonTheme(
  appearance: Appearance,
  variant: "default" | "raised" = "default"
): CarbonTheme {
  if (appearance === "dark") {
    return variant === "raised" ? "g90" : "g100";
  }
  return variant === "raised" ? "g10" : "white";
}
