export { AppHeader } from "./components/AppHeader";
export type {
  AppHeaderProps,
  NavigationItem,
  NavItem,
  AdminConfig,
  ActionItem,
  UtilityConfig,
} from "./components/AppHeader";

export { AppShell } from "./components/AppShell";
export type { AppShellProps } from "./components/AppShell";

export {
  SWAPPSThemeProvider,
  SWAPPSThemeContext,
  useSWAPPSTheme,
  useSWAPPSAppearance,
  useSWAPPSBranding,
  DEFAULT_BRANDING,
  DEFAULT_THEME_CONFIG,
  appearanceToCarbonTheme,
  contrastRatio,
  meetsWCAG_AA,
  isValidHexColor,
} from "./theme";
export type {
  CarbonTheme,
  Appearance,
  BrandingConfig,
  SWAPPSThemeConfig,
  SWAPPSThemeProviderProps,
  SWAPPSThemeContextValue,
} from "./theme";
