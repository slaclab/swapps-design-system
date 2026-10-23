import React, { useState } from "react";
import { MultiStateIndicator } from "@swapps/controls";
import type { AlarmSeverity, StateDefinition } from "@swapps/controls";
import ComponentPreview from "../preview/ComponentPreview";
import PreviewConfigIndicator from "../preview/PreviewConfigIndicator";
import SectionHeader from "./shared/SectionHeader";
import AlarmControls from "./shared/AlarmControls";

const DEMO_STATES: StateDefinition[] = [
  { value: 0, label: "Off", color: "#8d8d8d" },
  { value: 1, label: "Standby", color: "#f1c21b" },
  { value: 2, label: "Running", color: "#24a148" },
  { value: 3, label: "Fault", color: "#da1e28" },
];

export default function MultiStateIndicatorPlayground() {
  const [value, setValue] = useState<number>(2);
  const [shape, setShape] = useState<"rectangle" | "circle" | "badge">(
    "rectangle"
  );
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [showLabel, setShowLabel] = useState(true);
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
          <MultiStateIndicator
            value={value}
            states={DEMO_STATES}
            shape={shape}
            size={size}
            showLabel={showLabel}
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
        <SectionHeader first>State &amp; Appearance</SectionHeader>
        <div className="swapps-preview__control-group">
          <label htmlFor="msi-state">Current state</label>
          <select
            id="msi-state"
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value, 10))}
          >
            {DEMO_STATES.map((s) => (
              <option key={s.value as number} value={s.value as number}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="msi-shape">Shape</label>
          <select
            id="msi-shape"
            value={shape}
            onChange={(e) =>
              setShape(e.target.value as "rectangle" | "circle" | "badge")
            }
          >
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
            <option value="badge">Badge</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="msi-size">Size</label>
          <select
            id="msi-size"
            value={size}
            onChange={(e) => setSize(e.target.value as "sm" | "md" | "lg")}
          >
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="msi-label">Show label</label>
          <select
            id="msi-label"
            value={showLabel ? "yes" : "no"}
            onChange={(e) => setShowLabel(e.target.value === "yes")}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <AlarmControls
          idPrefix="msi"
          alarmSeverity={alarmSeverity}
          onAlarmSeverityChange={setAlarmSeverity}
          connected={connected}
          onConnectedChange={setConnected}
        />
      </div>
    </div>
  );
}
