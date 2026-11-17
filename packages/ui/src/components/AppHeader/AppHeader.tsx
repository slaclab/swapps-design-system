import React, { useMemo, useCallback } from "react";
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
} from "@carbon/react";
import {
  Light,
  Asleep,
  Debug,
  Help,
  UserAvatar,
  Settings,
} from "@carbon/icons-react";
import { useSWAPPSBranding, useSWAPPSTheme } from "../../theme";
import "./AppHeader.css";

export interface NavigationItem {
  label: string;
  href: string;
}

/** @deprecated Use NavigationItem instead */
export type NavItem = NavigationItem;

export interface AdminConfig {
  label?: string;
  href: string;
  visible?: boolean;
}

export interface ActionItem {
  label: string;
  href?: string;
  onClick?: () => void;
  primary?: boolean;
}

export interface UtilityConfig {
  themeToggle?: boolean;
  reportBug?: { onClick: () => void; label?: string };
  help?: { href?: string; onClick?: () => void; label?: string };
  account?: { onClick: () => void; label?: string };
}

export interface AppHeaderProps {
  /** Name of the organization or laboratory (e.g., "SLAC") */
  orgName?: string;
  /** Application title displayed in the header */
  appTitle: string;
  /** Navigation links rendered in the header bar */
  navigation?: NavigationItem[];
  /** URL for the header title link */
  homeHref?: string;
  /** Accessible label for the skip-to-content link */
  skipToContentLabel?: string;
  /** Optional logo element rendered before the header name */
  logo?: React.ReactNode;
  /** Optional search element rendered after the application title */
  search?: React.ReactNode;
  /** Optional admin link configuration */
  admin?: AdminConfig;
  /** Application-specific action buttons */
  actions?: ActionItem[];
  /** Standardized utility controls (theme, bug report, help, account) */
  utilities?: UtilityConfig;
  /** Custom elements rendered in the global action area after utilities */
  globalActions?: React.ReactNode;
  /**
   * Component used to render the header's links (`homeHref` and `navigation`) instead of `<a>`,
   * such as a client-side router's link. It receives `href` and `children`, plus Carbon's
   * `className`, `ref`, `tabIndex` and `aria-current`, and must render an `<a>` with them.
   */
  linkAs?: React.ElementType;
  /**
   * Called with the `href` of `admin`, `actions` and `utilities.help` when they're clicked,
   * for example to navigate with a client-side router. Defaults to a full page load.
   */
  onNavigate?: (href: string) => void;
  /** Accessible label for the overall header landmark */
  "aria-label"?: string;
}

function navigateWithPageLoad(href: string) {
  window.location.href = href;
}

export function AppHeader({
  orgName,
  appTitle,
  navigation = [],
  homeHref = "/",
  skipToContentLabel = "Skip to main content",
  logo,
  search,
  admin,
  actions = [],
  utilities,
  globalActions,
  linkAs,
  onNavigate = navigateWithPageLoad,
  "aria-label": ariaLabel,
}: AppHeaderProps) {
  const branding = useSWAPPSBranding();
  const { config, setConfig } = useSWAPPSTheme();

  const resolvedOrgName = orgName ?? (branding.organizationName || undefined);
  const resolvedLogo =
    logo ??
    (branding.logoUrl ? (
      <img
        src={branding.logoUrl}
        alt={resolvedOrgName ?? ""}
        height={20}
        className="swapps-header__logo-img"
      />
    ) : undefined);

  const prefix = resolvedOrgName ? `[${resolvedOrgName}]` : undefined;
  const headerLabel =
    ariaLabel ??
    `${resolvedOrgName ? resolvedOrgName + " " : ""}${appTitle}`;

  const wrapperStyle = useMemo<React.CSSProperties | undefined>(() => {
    if (!branding.primaryColor) return undefined;
    return {
      ["--swapps-brand-primary" as string]: branding.primaryColor,
    };
  }, [branding.primaryColor]);

  const toggleTheme = useCallback(() => {
    setConfig({
      ...config,
      appearance: config.appearance === "light" ? "dark" : "light",
    });
  }, [config, setConfig]);

  const showAdmin = admin && admin.visible !== false;
  const hasGlobalBar =
    showAdmin ||
    actions.length > 0 ||
    utilities?.themeToggle ||
    utilities?.reportBug ||
    utilities?.help ||
    utilities?.account ||
    globalActions;

  return (
    <div className="swapps-header-wrapper" style={wrapperStyle}>
      <Header aria-label={headerLabel} className="swapps-header">
        <SkipToContent>{skipToContentLabel}</SkipToContent>

        {resolvedLogo && (
          <div className="swapps-header__logo">{resolvedLogo}</div>
        )}

        <HeaderName as={linkAs} href={homeHref} prefix={prefix ?? ""}>
          {appTitle}
        </HeaderName>

        {search && (
          <div className="swapps-header__search">{search}</div>
        )}

        {navigation.length > 0 && (
          <HeaderNavigation aria-label="Main navigation">
            {navigation.map((item) => (
              <HeaderMenuItem key={item.href} as={linkAs} href={item.href}>
                {item.label}
              </HeaderMenuItem>
            ))}
          </HeaderNavigation>
        )}

        {hasGlobalBar && (
          <HeaderGlobalBar>
            {showAdmin && (
              <HeaderGlobalAction
                aria-label={admin!.label ?? "Admin"}
                onClick={() => onNavigate(admin!.href)}
                tooltipAlignment="end"
              >
                <Settings size={20} />
              </HeaderGlobalAction>
            )}

            {actions.map((action) => (
              <HeaderGlobalAction
                key={action.label}
                aria-label={action.label}
                className={
                  action.primary ? "swapps-header__action--primary" : undefined
                }
                onClick={
                  action.onClick ??
                  (action.href ? () => onNavigate(action.href!) : undefined)
                }
                tooltipAlignment="end"
              >
                <span className="swapps-header__action-label">
                  {action.label}
                </span>
              </HeaderGlobalAction>
            ))}

            {utilities?.themeToggle && (
              <HeaderGlobalAction
                aria-label={
                  config.appearance === "light"
                    ? "Switch to dark mode"
                    : "Switch to light mode"
                }
                onClick={toggleTheme}
                tooltipAlignment="end"
              >
                {config.appearance === "light" ? (
                  <Asleep size={20} />
                ) : (
                  <Light size={20} />
                )}
              </HeaderGlobalAction>
            )}

            {utilities?.reportBug && (
              <HeaderGlobalAction
                aria-label={utilities.reportBug.label ?? "Report a bug"}
                onClick={utilities.reportBug.onClick}
                tooltipAlignment="end"
              >
                <Debug size={20} />
              </HeaderGlobalAction>
            )}

            {utilities?.help && (
              <HeaderGlobalAction
                aria-label={utilities.help.label ?? "Help"}
                onClick={
                  utilities.help.onClick ??
                  (utilities.help.href
                    ? () => onNavigate(utilities.help!.href!)
                    : undefined)
                }
                tooltipAlignment="end"
              >
                <Help size={20} />
              </HeaderGlobalAction>
            )}

            {utilities?.account && (
              <HeaderGlobalAction
                aria-label={utilities.account.label ?? "Account"}
                onClick={utilities.account.onClick}
                tooltipAlignment="end"
              >
                <UserAvatar size={20} />
              </HeaderGlobalAction>
            )}

            {globalActions}
          </HeaderGlobalBar>
        )}
      </Header>
    </div>
  );
}
