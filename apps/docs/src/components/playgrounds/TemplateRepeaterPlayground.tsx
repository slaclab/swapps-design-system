import React, { useState } from "react";
import { TemplateRepeater, PVLabel } from "@swapps/controls";
import ComponentPreview from "../preview/ComponentPreview";
import PreviewConfigIndicator from "../preview/PreviewConfigIndicator";
import SectionHeader from "./shared/SectionHeader";

interface DemoDevice {
  id: string;
  label: string;
  value: number;
  units: string;
}

const DEMO_DATA: DemoDevice[] = [
  { id: "q1", label: "Quad 1", value: 3.42, units: "kG" },
  { id: "q2", label: "Quad 2", value: -1.87, units: "kG" },
  { id: "q3", label: "Quad 3", value: 5.01, units: "kG" },
  { id: "q4", label: "Quad 4", value: 0.55, units: "kG" },
  { id: "q5", label: "Quad 5", value: -2.34, units: "kG" },
  { id: "q6", label: "Quad 6", value: 4.12, units: "kG" },
];

function renderDevice(item: DemoDevice) {
  return (
    <div
      style={{
        padding: "0.75rem 1rem",
        border: "1px solid var(--ifm-color-emphasis-200)",
        borderRadius: "6px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "var(--ifm-background-color)",
      }}
    >
      <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>
        {item.label}
      </span>
      <PVLabel value={item.value} units={item.units} precision={2} />
    </div>
  );
}

export default function TemplateRepeaterPlayground() {
  const [layout, setLayout] = useState<"list" | "grid" | "horizontal">("list");
  const [columns, setColumns] = useState(3);
  const [gap, setGap] = useState("1rem");
  const [loading, setLoading] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);

  return (
    <div>
      <PreviewConfigIndicator />

      <ComponentPreview label="Interactive Preview" category="controls">
        <div style={{ padding: "1rem" }}>
          <TemplateRepeater
            data={showEmpty ? [] : DEMO_DATA}
            renderItem={renderDevice}
            layout={layout}
            columns={columns}
            gap={gap}
            loading={loading}
            emptyMessage="No devices found."
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
        <SectionHeader first>Layout</SectionHeader>
        <div className="swapps-preview__control-group">
          <label htmlFor="repeater-layout">Layout</label>
          <select
            id="repeater-layout"
            value={layout}
            onChange={(e) =>
              setLayout(e.target.value as "list" | "grid" | "horizontal")
            }
          >
            <option value="list">List</option>
            <option value="grid">Grid</option>
            <option value="horizontal">Horizontal</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="repeater-columns">Columns (grid)</label>
          <input
            id="repeater-columns"
            type="number"
            min={1}
            max={6}
            value={columns}
            disabled={layout !== "grid"}
            onChange={(e) => setColumns(parseInt(e.target.value, 10) || 3)}
          />
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="repeater-gap">Gap</label>
          <select
            id="repeater-gap"
            value={gap}
            onChange={(e) => setGap(e.target.value)}
          >
            <option value="0.5rem">0.5rem</option>
            <option value="1rem">1rem</option>
            <option value="1.5rem">1.5rem</option>
            <option value="2rem">2rem</option>
          </select>
        </div>

        <SectionHeader>State</SectionHeader>
        <div className="swapps-preview__control-group">
          <label htmlFor="repeater-loading">Loading</label>
          <select
            id="repeater-loading"
            value={loading ? "yes" : "no"}
            onChange={(e) => setLoading(e.target.value === "yes")}
          >
            <option value="no">Normal</option>
            <option value="yes">Loading</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="repeater-empty">Data</label>
          <select
            id="repeater-empty"
            value={showEmpty ? "empty" : "data"}
            onChange={(e) => setShowEmpty(e.target.value === "empty")}
          >
            <option value="data">Show data</option>
            <option value="empty">Empty state</option>
          </select>
        </div>
      </div>
    </div>
  );
}
