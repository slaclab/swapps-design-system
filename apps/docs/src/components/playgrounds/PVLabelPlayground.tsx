import React, { useState } from "react";
import { PVLabel } from "@swapps/controls";
import type { AlarmSeverity } from "@swapps/controls";
import ComponentPreview from "../preview/ComponentPreview";
import PreviewConfigIndicator from "../preview/PreviewConfigIndicator";
import SectionHeader from "./shared/SectionHeader";
import AlarmControls from "./shared/AlarmControls";

type DisplayFormat =
  | "default"
  | "exponential"
  | "engineering"
  | "hex"
  | "binary"
  | "string";

export default function PVLabelPlayground() {
  const [value, setValue] = useState(13.602);
  const [units, setUnits] = useState("GeV");
  const [precision, setPrecision] = useState(3);
  const [format, setFormat] = useState<DisplayFormat>("default");
  const [showUnits, setShowUnits] = useState(true);
  const [alarmSeverity, setAlarmSeverity] = useState<AlarmSeverity>("none");
  const [connected, setConnected] = useState(true);

  return (
    <div>
      <PreviewConfigIndicator />

      <ComponentPreview label="Interactive Preview" category="controls">
        <div
          style={{
            padding: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PVLabel
            value={value}
            units={units}
            precision={precision}
            format={format}
            showUnits={showUnits}
            alarmSeverity={alarmSeverity}
            connected={connected}
          />
        </div>
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
        <SectionHeader first>Value &amp; Format</SectionHeader>
        <div className="swapps-preview__control-group">
          <label htmlFor="pvlabel-value">Value</label>
          <input
            id="pvlabel-value"
            type="number"
            step="any"
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="pvlabel-units">Units</label>
          <input
            id="pvlabel-units"
            type="text"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
          />
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="pvlabel-precision">Precision</label>
          <input
            id="pvlabel-precision"
            type="number"
            min={0}
            max={10}
            value={precision}
            onChange={(e) => setPrecision(parseInt(e.target.value, 10) || 0)}
          />
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="pvlabel-format">Format</label>
          <select
            id="pvlabel-format"
            value={format}
            onChange={(e) => setFormat(e.target.value as DisplayFormat)}
          >
            <option value="default">Default</option>
            <option value="exponential">Exponential</option>
            <option value="engineering">Engineering</option>
            <option value="hex">Hex</option>
            <option value="binary">Binary</option>
            <option value="string">String</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="pvlabel-showunits">Show units</label>
          <select
            id="pvlabel-showunits"
            value={showUnits ? "yes" : "no"}
            onChange={(e) => setShowUnits(e.target.value === "yes")}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <AlarmControls
          idPrefix="pvlabel"
          alarmSeverity={alarmSeverity}
          onAlarmSeverityChange={setAlarmSeverity}
          connected={connected}
          onConnectedChange={setConnected}
        />
      </div>
    </div>
  );
}
