import React, { useState } from "react";
import { AppHeader } from "@swapps/ui";

const ORG_PRESETS: Record<string, { orgName: string; appTitle: string }> = {
  slac: { orgName: "SLAC", appTitle: "Experiment Tracker" },
  fermilab: { orgName: "Fermilab", appTitle: "Beam Monitor" },
  lbnl: { orgName: "LBNL", appTitle: "Detector Dashboard" },
  custom: { orgName: "", appTitle: "My Application" },
};

const DEFAULT_NAV_ITEMS = [
  { label: "Dashboard", href: "#" },
  { label: "Data", href: "#" },
  { label: "Settings", href: "#" },
];

export default function AppHeaderPlayground() {
  const [preset, setPreset] = useState("slac");
  const [orgName, setOrgName] = useState(ORG_PRESETS.slac.orgName);
  const [appTitle, setAppTitle] = useState(ORG_PRESETS.slac.appTitle);
  const [showNav, setShowNav] = useState(true);

  function handlePresetChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const key = e.target.value;
    setPreset(key);
    if (key !== "custom") {
      setOrgName(ORG_PRESETS[key].orgName);
      setAppTitle(ORG_PRESETS[key].appTitle);
    }
  }

  const navItems = showNav ? DEFAULT_NAV_ITEMS : [];

  return (
    <div className="swapps-preview">
      <div className="swapps-preview__header">Interactive Preview</div>
      <div className="swapps-preview__content">
        <AppHeader
          orgName={orgName || undefined}
          appTitle={appTitle || "Untitled"}
          navItems={navItems}
          homeHref="#"
        />
      </div>
      <div className="swapps-preview__controls">
        <div className="swapps-preview__control-group">
          <label htmlFor="playground-preset">Organization preset</label>
          <select
            id="playground-preset"
            value={preset}
            onChange={handlePresetChange}
          >
            <option value="slac">SLAC</option>
            <option value="fermilab">Fermilab</option>
            <option value="lbnl">LBNL</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="playground-org">Organization name</label>
          <input
            id="playground-org"
            type="text"
            value={orgName}
            onChange={(e) => {
              setOrgName(e.target.value);
              setPreset("custom");
            }}
          />
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="playground-title">Application title</label>
          <input
            id="playground-title"
            type="text"
            value={appTitle}
            onChange={(e) => {
              setAppTitle(e.target.value);
              setPreset("custom");
            }}
          />
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="playground-nav">Show navigation</label>
          <select
            id="playground-nav"
            value={showNav ? "yes" : "no"}
            onChange={(e) => setShowNav(e.target.value === "yes")}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>
    </div>
  );
}
