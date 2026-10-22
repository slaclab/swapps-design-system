import React, { useState } from "react";
import { AppHeader } from "@swapps/ui";
import { Search } from "@carbon/react";
import { usePreviewConfig } from "../../contexts/PreviewConfigContext";
import ComponentPreview from "../preview/ComponentPreview";
import PreviewConfigIndicator from "../preview/PreviewConfigIndicator";

const DEFAULT_NAV_ITEMS = [
  { label: "Dashboard", href: "#" },
  { label: "Data", href: "#" },
  { label: "Settings", href: "#" },
];

export default function AppHeaderPlayground() {
  const { previewConfig } = usePreviewConfig();
  const [appTitle, setAppTitle] = useState("E-Log");
  const [overrideOrg, setOverrideOrg] = useState("");
  const [showNav, setShowNav] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [showAdmin, setShowAdmin] = useState(true);
  const [showActions, setShowActions] = useState(true);
  const [showThemeToggle, setShowThemeToggle] = useState(true);
  const [showBugReport, setShowBugReport] = useState(true);
  const [showHelp, setShowHelp] = useState(true);
  const [showAccount, setShowAccount] = useState(true);

  const navigation = showNav ? DEFAULT_NAV_ITEMS : [];

  return (
    <div>
      <PreviewConfigIndicator />

      <ComponentPreview label="Interactive Preview" category="ui">
        <AppHeader
          orgName={overrideOrg || undefined}
          appTitle={appTitle || "Untitled"}
          navigation={navigation}
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
          admin={
            showAdmin
              ? { href: "#admin", label: "Admin" }
              : undefined
          }
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
              ? { onClick: () => alert("Bug report opened") }
              : undefined,
            help: showHelp
              ? { href: "#help" }
              : undefined,
            account: showAccount
              ? { onClick: () => alert("Account menu opened") }
              : undefined,
          }}
        />
      </ComponentPreview>

      <div
        className="swapps-preview__controls"
        style={{
          border: "1px solid var(--ifm-color-emphasis-200)",
          borderRadius: "0 0 8px 8px",
          borderTop: "none",
          marginTop: "-1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <h4 style={{ margin: "0 0 0.75rem", fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--ifm-color-emphasis-600)" }}>
          Application Identity
        </h4>
        <div className="swapps-preview__control-group">
          <label htmlFor="playground-title">Application title</label>
          <input
            id="playground-title"
            type="text"
            value={appTitle}
            onChange={(e) => setAppTitle(e.target.value)}
          />
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="playground-org-override">Organization override</label>
          <input
            id="playground-org-override"
            type="text"
            value={overrideOrg}
            onChange={(e) => setOverrideOrg(e.target.value)}
            placeholder={
              previewConfig.branding.organizationName || "(from global config)"
            }
          />
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="playground-search">Search</label>
          <select
            id="playground-search"
            value={showSearch ? "yes" : "no"}
            onChange={(e) => setShowSearch(e.target.value === "yes")}
          >
            <option value="yes">Visible</option>
            <option value="no">Hidden</option>
          </select>
        </div>

        <h4 style={{ margin: "1rem 0 0.75rem", fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--ifm-color-emphasis-600)" }}>
          Navigation &amp; Actions
        </h4>
        <div className="swapps-preview__control-group">
          <label htmlFor="playground-nav">Navigation links</label>
          <select
            id="playground-nav"
            value={showNav ? "yes" : "no"}
            onChange={(e) => setShowNav(e.target.value === "yes")}
          >
            <option value="no">Hidden</option>
            <option value="yes">Visible (Dashboard, Data, Settings)</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="playground-admin">Admin link</label>
          <select
            id="playground-admin"
            value={showAdmin ? "yes" : "no"}
            onChange={(e) => setShowAdmin(e.target.value === "yes")}
          >
            <option value="yes">Visible</option>
            <option value="no">Hidden</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="playground-actions">Application actions</label>
          <select
            id="playground-actions"
            value={showActions ? "yes" : "no"}
            onChange={(e) => setShowActions(e.target.value === "yes")}
          >
            <option value="yes">Visible (Drafts, New Entry)</option>
            <option value="no">Hidden</option>
          </select>
        </div>

        <h4 style={{ margin: "1rem 0 0.75rem", fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--ifm-color-emphasis-600)" }}>
          Global Utilities
        </h4>
        <div className="swapps-preview__control-group">
          <label htmlFor="playground-theme">Theme toggle</label>
          <select
            id="playground-theme"
            value={showThemeToggle ? "yes" : "no"}
            onChange={(e) => setShowThemeToggle(e.target.value === "yes")}
          >
            <option value="yes">Visible</option>
            <option value="no">Hidden</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="playground-bug">Report bug</label>
          <select
            id="playground-bug"
            value={showBugReport ? "yes" : "no"}
            onChange={(e) => setShowBugReport(e.target.value === "yes")}
          >
            <option value="yes">Visible</option>
            <option value="no">Hidden</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="playground-help">Help / Documentation</label>
          <select
            id="playground-help"
            value={showHelp ? "yes" : "no"}
            onChange={(e) => setShowHelp(e.target.value === "yes")}
          >
            <option value="yes">Visible</option>
            <option value="no">Hidden</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="playground-account">Account</label>
          <select
            id="playground-account"
            value={showAccount ? "yes" : "no"}
            onChange={(e) => setShowAccount(e.target.value === "yes")}
          >
            <option value="yes">Visible</option>
            <option value="no">Hidden</option>
          </select>
        </div>
      </div>
    </div>
  );
}
