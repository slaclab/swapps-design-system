import React from "react";
import { AppHeader } from "../AppHeader";
import type { AppHeaderProps, NavigationItem } from "../AppHeader";
import "./AppShell.css";

export interface AppShellProps {
  /** Name of the organization or laboratory (e.g., "SLAC") */
  orgName?: string;
  /** Application title displayed in the header */
  appTitle: string;
  /** Navigation links rendered in the header bar */
  navigation?: NavigationItem[];
  /** Additional AppHeader configuration (logo, search, utilities, etc.) */
  headerProps?: Omit<AppHeaderProps, "orgName" | "appTitle" | "navigation">;

  /** Content rendered in the left side panel */
  leftPanel?: React.ReactNode;
  /** Width of the left panel in pixels */
  leftPanelWidth?: number;
  /** Content rendered in the right side panel */
  rightPanel?: React.ReactNode;
  /** Width of the right panel in pixels */
  rightPanelWidth?: number;
  /** Content rendered in the bottom panel */
  bottomPanel?: React.ReactNode;
  /** Height of the bottom panel in pixels */
  bottomPanelHeight?: number;

  /** Main content area */
  children: React.ReactNode;
  /** Additional CSS class applied to the root element */
  className?: string;
}

const DEFAULT_SIDE_PANEL_WIDTH = 256;
const DEFAULT_BOTTOM_PANEL_HEIGHT = 200;

export function AppShell({
  orgName,
  appTitle,
  navigation,
  headerProps,
  leftPanel,
  leftPanelWidth = DEFAULT_SIDE_PANEL_WIDTH,
  rightPanel,
  rightPanelWidth = DEFAULT_SIDE_PANEL_WIDTH,
  bottomPanel,
  bottomPanelHeight = DEFAULT_BOTTOM_PANEL_HEIGHT,
  children,
  className,
}: AppShellProps) {
  const rootClassName = ["swapps-app-shell", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClassName}>
      <AppHeader
        orgName={orgName}
        appTitle={appTitle}
        navigation={navigation}
        {...headerProps}
      />
      <div className="swapps-app-shell__body">
        {leftPanel && (
          <aside
            className="swapps-app-shell__left-panel"
            style={{ width: leftPanelWidth }}
          >
            {leftPanel}
          </aside>
        )}
        <div className="swapps-app-shell__main">
          <div className="swapps-app-shell__content">{children}</div>
          {bottomPanel && (
            <div
              className="swapps-app-shell__bottom-panel"
              style={{ height: bottomPanelHeight }}
            >
              {bottomPanel}
            </div>
          )}
        </div>
        {rightPanel && (
          <aside
            className="swapps-app-shell__right-panel"
            style={{ width: rightPanelWidth }}
          >
            {rightPanel}
          </aside>
        )}
      </div>
    </div>
  );
}
