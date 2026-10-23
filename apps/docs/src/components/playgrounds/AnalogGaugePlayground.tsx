import React, { useState } from "react";
import { AnalogGauge } from "@swapps/controls";
import type { AlarmSeverity } from "@swapps/controls";
import ComponentPreview from "../preview/ComponentPreview";
import PreviewConfigIndicator from "../preview/PreviewConfigIndicator";
import SectionHeader from "./shared/SectionHeader";
import AlarmControls from "./shared/AlarmControls";

const THRESHOLD_PRESET = { lolo: 10, low: 20, high: 80, hihi: 90 };

export default function AnalogGaugePlayground() {
  const [value, setValue] = useState(65);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [units, setUnits] = useState("°C");
  const [arcSpan, setArcSpan] = useState(270);
  const [showValue, setShowValue] = useState(true);
  const [showTicks, setShowTicks] = useState(true);
  const [animateNeedle, setAnimateNeedle] = useState(true);
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
          }}
        >
          <AnalogGauge
            value={value}
            min={min}
            max={max}
            units={units}
            arcSpan={arcSpan}
            showValue={showValue}
            showTicks={showTicks}
            animateNeedle={animateNeedle}
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
          <label htmlFor="gauge-value">Value: {value.toFixed(1)}</label>
          <input
            id="gauge-value"
            type="range"
            min={min}
            max={max}
            step={0.5}
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value))}
          />
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="gauge-min">Min</label>
          <input
            id="gauge-min"
            type="number"
            value={min}
            onChange={(e) => setMin(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="gauge-max">Max</label>
          <input
            id="gauge-max"
            type="number"
            value={max}
            onChange={(e) => setMax(parseFloat(e.target.value) || 100)}
          />
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="gauge-units">Units</label>
          <input
            id="gauge-units"
            type="text"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
          />
        </div>

        <SectionHeader>Gauge Options</SectionHeader>
        <div className="swapps-preview__control-group">
          <label htmlFor="gauge-arcspan">Arc span: {arcSpan}°</label>
          <input
            id="gauge-arcspan"
            type="range"
            min={90}
            max={360}
            step={10}
            value={arcSpan}
            onChange={(e) => setArcSpan(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="gauge-showvalue">Show value</label>
          <select
            id="gauge-showvalue"
            value={showValue ? "yes" : "no"}
            onChange={(e) => setShowValue(e.target.value === "yes")}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="gauge-showticks">Show ticks</label>
          <select
            id="gauge-showticks"
            value={showTicks ? "yes" : "no"}
            onChange={(e) => setShowTicks(e.target.value === "yes")}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="gauge-animate">Animate needle</label>
          <select
            id="gauge-animate"
            value={animateNeedle ? "yes" : "no"}
            onChange={(e) => setAnimateNeedle(e.target.value === "yes")}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="gauge-thresholds">Threshold bands</label>
          <select
            id="gauge-thresholds"
            value={showThresholds ? "yes" : "no"}
            onChange={(e) => setShowThresholds(e.target.value === "yes")}
          >
            <option value="no">Off</option>
            <option value="yes">On (10/20/80/90)</option>
          </select>
        </div>

        <AlarmControls
          idPrefix="gauge"
          alarmSeverity={alarmSeverity}
          onAlarmSeverityChange={setAlarmSeverity}
          connected={connected}
          onConnectedChange={setConnected}
        />
      </div>
    </div>
  );
}
