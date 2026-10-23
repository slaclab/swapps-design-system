import React, { useState } from "react";
import { PVSymbol } from "@swapps/controls";
import type { AlarmSeverity, SymbolDefinition } from "@swapps/controls";
import ComponentPreview from "../preview/ComponentPreview";
import PreviewConfigIndicator from "../preview/PreviewConfigIndicator";
import SectionHeader from "./shared/SectionHeader";
import AlarmControls from "./shared/AlarmControls";

const DEMO_SYMBOLS: SymbolDefinition[] = [
  { value: 0, label: "Off", fill: "#8d8d8d" },
  { value: 1, label: "Running", fill: "#24a148" },
  { value: 2, label: "Fault", fill: "#da1e28" },
];

function PumpIcon() {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="18" fill="currentColor" opacity="0.2" />
      <circle cx="24" cy="24" r="12" fill="currentColor" />
      <path
        d="M18 24 L30 24 M24 18 L24 30"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function PVSymbolPlayground() {
  const [value, setValue] = useState<number>(1);
  const [rotation, setRotation] = useState(0);
  const [width, setWidth] = useState(64);
  const [height, setHeight] = useState(64);
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
          <PVSymbol
            value={value}
            symbols={DEMO_SYMBOLS}
            width={width}
            height={height}
            rotation={rotation}
            alarmSeverity={alarmSeverity}
            connected={connected}
          >
            <PumpIcon />
          </PVSymbol>
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
        <SectionHeader first>State &amp; Transform</SectionHeader>
        <div className="swapps-preview__control-group">
          <label htmlFor="symbol-state">Current state</label>
          <select
            id="symbol-state"
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value, 10))}
          >
            {DEMO_SYMBOLS.map((s) => (
              <option key={s.value as number} value={s.value as number}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="symbol-rotation">Rotation: {rotation}°</label>
          <input
            id="symbol-rotation"
            type="range"
            min={0}
            max={360}
            step={15}
            value={rotation}
            onChange={(e) => setRotation(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="symbol-width">Width</label>
          <input
            id="symbol-width"
            type="number"
            min={24}
            max={128}
            step={8}
            value={width}
            onChange={(e) => setWidth(parseInt(e.target.value, 10) || 48)}
          />
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="symbol-height">Height</label>
          <input
            id="symbol-height"
            type="number"
            min={24}
            max={128}
            step={8}
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value, 10) || 48)}
          />
        </div>

        <AlarmControls
          idPrefix="symbol"
          alarmSeverity={alarmSeverity}
          onAlarmSeverityChange={setAlarmSeverity}
          connected={connected}
          onConnectedChange={setConnected}
        />
      </div>
    </div>
  );
}
