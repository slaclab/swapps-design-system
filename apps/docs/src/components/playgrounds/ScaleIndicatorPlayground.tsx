import React, { useState } from "react";
import { ScaleIndicator } from "@swapps/controls";
import type { AlarmSeverity } from "@swapps/controls";
import ComponentPreview from "../preview/ComponentPreview";
import PreviewConfigIndicator from "../preview/PreviewConfigIndicator";
import SectionHeader from "./shared/SectionHeader";
import AlarmControls from "./shared/AlarmControls";

const THRESHOLD_PRESET = { lolo: 10, low: 20, high: 80, hihi: 90 };

export default function ScaleIndicatorPlayground() {
  const [value, setValue] = useState(72.5);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [units, setUnits] = useState("°C");
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal"
  );
  const [showValue, setShowValue] = useState(true);
  const [showTicks, setShowTicks] = useState(true);
  const [showThresholds, setShowThresholds] = useState(false);
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
            minHeight: orientation === "vertical" ? 180 : undefined,
          }}
        >
          <ScaleIndicator
            value={value}
            min={min}
            max={max}
            units={units}
            orientation={orientation}
            showValue={showValue}
            showTicks={showTicks}
            thresholds={showThresholds ? THRESHOLD_PRESET : undefined}
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
        <SectionHeader first>Value &amp; Range</SectionHeader>
        <div className="swapps-preview__control-group">
          <label htmlFor="scale-value">Value: {value.toFixed(1)}</label>
          <input
            id="scale-value"
            type="range"
            min={min}
            max={max}
            step={0.5}
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value))}
          />
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="scale-min">Min</label>
          <input
            id="scale-min"
            type="number"
            value={min}
            onChange={(e) => setMin(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="scale-max">Max</label>
          <input
            id="scale-max"
            type="number"
            value={max}
            onChange={(e) => setMax(parseFloat(e.target.value) || 100)}
          />
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="scale-units">Units</label>
          <input
            id="scale-units"
            type="text"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
          />
        </div>

        <SectionHeader>Display Options</SectionHeader>
        <div className="swapps-preview__control-group">
          <label htmlFor="scale-orientation">Orientation</label>
          <select
            id="scale-orientation"
            value={orientation}
            onChange={(e) =>
              setOrientation(e.target.value as "horizontal" | "vertical")
            }
          >
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="scale-showvalue">Show value</label>
          <select
            id="scale-showvalue"
            value={showValue ? "yes" : "no"}
            onChange={(e) => setShowValue(e.target.value === "yes")}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="scale-showticks">Show ticks</label>
          <select
            id="scale-showticks"
            value={showTicks ? "yes" : "no"}
            onChange={(e) => setShowTicks(e.target.value === "yes")}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="scale-thresholds">Threshold bands</label>
          <select
            id="scale-thresholds"
            value={showThresholds ? "yes" : "no"}
            onChange={(e) => setShowThresholds(e.target.value === "yes")}
          >
            <option value="no">Off</option>
            <option value="yes">On (10/20/80/90)</option>
          </select>
        </div>

        <AlarmControls
          idPrefix="scale"
          alarmSeverity={alarmSeverity}
          onAlarmSeverityChange={setAlarmSeverity}
          connected={connected}
          onConnectedChange={setConnected}
        />
      </div>
    </div>
  );
}
