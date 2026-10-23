import React, { useState, useMemo } from "react";
import { PVTable } from "@swapps/controls";
import type { PVTableRow } from "@swapps/controls";
import ComponentPreview from "../preview/ComponentPreview";
import PreviewConfigIndicator from "../preview/PreviewConfigIndicator";
import SectionHeader from "./shared/SectionHeader";

const DEMO_ROWS: PVTableRow[] = [
  { id: "bpm-1", label: "BPM 1", value: 0.342, units: "mm", alarmSeverity: "none", connected: true },
  { id: "bpm-2", label: "BPM 2", value: -1.205, units: "mm", alarmSeverity: "minor", connected: true },
  { id: "bpm-3", label: "BPM 3", value: 2.876, units: "mm", alarmSeverity: "none", connected: true },
  { id: "bpm-4", label: "BPM 4", value: 0.001, units: "mm", alarmSeverity: "major", connected: true },
  { id: "bpm-5", label: "BPM 5", value: undefined, units: "mm", alarmSeverity: "disconnected", connected: false },
  { id: "temp-1", label: "Cryo Temp", value: 4.215, units: "K", alarmSeverity: "none", connected: true },
  { id: "vac-1", label: "Vac Gauge", value: 2.1e-8, units: "Torr", alarmSeverity: "none", connected: true },
];

export default function PVTablePlayground() {
  const [sortable, setSortable] = useState(true);
  const [filterable, setFilterable] = useState(false);
  const [precision, setPrecision] = useState(3);
  const [showValue, setShowValue] = useState(true);
  const [showUnits, setShowUnits] = useState(true);
  const [showSeverity, setShowSeverity] = useState(true);
  const [showStatus, setShowStatus] = useState(false);

  const columns = useMemo(() => {
    const cols: string[] = ["label"];
    if (showValue) cols.push("value");
    if (showUnits) cols.push("units");
    if (showSeverity) cols.push("severity");
    if (showStatus) cols.push("status");
    return cols;
  }, [showValue, showUnits, showSeverity, showStatus]);

  return (
    <div>
      <PreviewConfigIndicator />

      <ComponentPreview label="Interactive Preview" category="controls">
        <div style={{ padding: "1rem" }}>
          <PVTable
            rows={DEMO_ROWS}
            columns={columns}
            sortable={sortable}
            filterable={filterable}
            precision={precision}
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
        <SectionHeader first>Table Options</SectionHeader>
        <div className="swapps-preview__control-group">
          <label htmlFor="table-sortable">Sortable</label>
          <select
            id="table-sortable"
            value={sortable ? "yes" : "no"}
            onChange={(e) => setSortable(e.target.value === "yes")}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="table-filterable">Filterable</label>
          <select
            id="table-filterable"
            value={filterable ? "yes" : "no"}
            onChange={(e) => setFilterable(e.target.value === "yes")}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="table-precision">Precision</label>
          <input
            id="table-precision"
            type="number"
            min={0}
            max={8}
            value={precision}
            onChange={(e) => setPrecision(parseInt(e.target.value, 10) || 0)}
          />
        </div>

        <SectionHeader>Visible Columns</SectionHeader>
        <div className="swapps-preview__control-group">
          <label htmlFor="table-showvalue">Value</label>
          <select
            id="table-showvalue"
            value={showValue ? "yes" : "no"}
            onChange={(e) => setShowValue(e.target.value === "yes")}
          >
            <option value="yes">Visible</option>
            <option value="no">Hidden</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="table-showunits">Units</label>
          <select
            id="table-showunits"
            value={showUnits ? "yes" : "no"}
            onChange={(e) => setShowUnits(e.target.value === "yes")}
          >
            <option value="yes">Visible</option>
            <option value="no">Hidden</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="table-showseverity">Severity</label>
          <select
            id="table-showseverity"
            value={showSeverity ? "yes" : "no"}
            onChange={(e) => setShowSeverity(e.target.value === "yes")}
          >
            <option value="yes">Visible</option>
            <option value="no">Hidden</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="table-showstatus">Status</label>
          <select
            id="table-showstatus"
            value={showStatus ? "yes" : "no"}
            onChange={(e) => setShowStatus(e.target.value === "yes")}
          >
            <option value="no">Hidden</option>
            <option value="yes">Visible</option>
          </select>
        </div>
      </div>
    </div>
  );
}
