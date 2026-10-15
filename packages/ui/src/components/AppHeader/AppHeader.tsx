import React from "react";
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
} from "@carbon/react";

export interface NavItem {
  label: string;
  href: string;
}

export interface AppHeaderProps {
  /** Name of the organization or laboratory (e.g., "SLAC") */
  orgName?: string;
  /** Application title displayed in the header */
  appTitle: string;
  /** Navigation items rendered in the header bar */
  navItems?: NavItem[];
  /** URL for the header title link */
  homeHref?: string;
  /** Accessible label for the skip-to-content link */
  skipToContentLabel?: string;
  /** Optional logo element rendered before the header name */
  logo?: React.ReactNode;
  /** Optional elements rendered in the global action area (right side) */
  globalActions?: React.ReactNode;
  /** Accessible label for the overall header landmark */
  "aria-label"?: string;
}

export function AppHeader({
  orgName,
  appTitle,
  navItems = [],
  homeHref = "/",
  skipToContentLabel = "Skip to main content",
  logo,
  globalActions,
  "aria-label": ariaLabel,
}: AppHeaderProps) {
  const prefix = orgName ? `[${orgName}]` : undefined;
  const headerLabel = ariaLabel ?? `${orgName ? orgName + " " : ""}${appTitle}`;

  return (
    <Header aria-label={headerLabel}>
      <SkipToContent>{skipToContentLabel}</SkipToContent>

      {logo && <div className="swapps-header__logo">{logo}</div>}

      <HeaderName href={homeHref} prefix={prefix ?? ""}>
        {appTitle}
      </HeaderName>

      {navItems.length > 0 && (
        <HeaderNavigation aria-label="Main navigation">
          {navItems.map((item) => (
            <HeaderMenuItem key={item.href} href={item.href}>
              {item.label}
            </HeaderMenuItem>
          ))}
        </HeaderNavigation>
      )}

      {globalActions && <HeaderGlobalBar>{globalActions}</HeaderGlobalBar>}
    </Header>
  );
}
