import React from "react";
import { AppHeader } from "@swapps/ui";
import { Search } from "@carbon/react";

const DEFAULT_NAV_ITEMS = [
  { label: "Dashboard", href: "#" },
  { label: "Data", href: "#" },
  { label: "Settings", href: "#" },
];

interface AppHeaderRendererProps {
  appTitle?: string;
  overrideOrg?: string;
  showNav?: boolean;
  showSearch?: boolean;
  showAdmin?: boolean;
  showActions?: boolean;
  showThemeToggle?: boolean;
  showBugReport?: boolean;
  showHelp?: boolean;
  showAccount?: boolean;
}

export default function AppHeaderRenderer({
  appTitle = "E-Log",
  overrideOrg = "",
  showNav = false,
  showSearch = true,
  showAdmin = true,
  showActions = true,
  showThemeToggle = true,
  showBugReport = true,
  showHelp = true,
  showAccount = true,
}: AppHeaderRendererProps) {
  return (
    <AppHeader
      orgName={overrideOrg || undefined}
      appTitle={appTitle || "Untitled"}
      navigation={showNav ? DEFAULT_NAV_ITEMS : []}
      homeHref="#"
      search={
        showSearch ? (
          <Search
            size="lg"
            placeholder="Search application..."
            labelText="Search"
            closeButtonLabelText="Clear search"
            onChange={() => {}}
          />
        ) : undefined
      }
      admin={showAdmin ? { href: "#admin", label: "Admin" } : undefined}
      actions={
        showActions
          ? [
              { label: "Drafts", href: "#drafts" },
              { label: "New Entry", href: "#new", primary: true },
            ]
          : []
      }
      utilities={{
        themeToggle: showThemeToggle,
        reportBug: showBugReport
          ? { onClick: () => {} }
          : undefined,
        help: showHelp ? { href: "#help" } : undefined,
        account: showAccount ? { onClick: () => {} } : undefined,
      }}
    />
  );
}
