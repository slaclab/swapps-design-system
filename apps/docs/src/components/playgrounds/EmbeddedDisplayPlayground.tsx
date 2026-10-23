import React, { useState } from "react";
import { EmbeddedDisplay } from "@swapps/controls";
import ComponentPreview from "../preview/ComponentPreview";
import PreviewConfigIndicator from "../preview/PreviewConfigIndicator";
import SectionHeader from "./shared/SectionHeader";

type DemoState = "manual" | "error" | "loading";

function LoadingMock() {
  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        color: "var(--ifm-color-emphasis-500)",
        fontSize: "0.875rem",
      }}
    >
      <div
        style={{
          width: 24,
          height: 24,
          border: "3px solid var(--ifm-color-emphasis-200)",
          borderTopColor: "var(--ifm-color-primary)",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
          margin: "0 auto 0.75rem",
        }}
      />
      Loading display...
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function EmbeddedDisplayPlayground() {
  const [demoState, setDemoState] = useState<DemoState>("manual");

  return (
    <div>
      <PreviewConfigIndicator />

      <ComponentPreview label="Interactive Preview" category="controls">
        <div style={{ padding: "1rem" }}>
          {demoState === "loading" && <LoadingMock />}
          {demoState === "manual" && (
            <EmbeddedDisplay src="./displays/ExamplePanel" loading="manual" />
          )}
          {demoState === "error" && (
            <EmbeddedDisplay
              src="./displays/DoesNotExist"
              loading="eager"
            />
          )}
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
        <SectionHeader first>Loading State</SectionHeader>
        <div className="swapps-preview__control-group">
          <label htmlFor="embed-state">Display state</label>
          <select
            id="embed-state"
            value={demoState}
            onChange={(e) => setDemoState(e.target.value as DemoState)}
          >
            <option value="manual">Manual (idle)</option>
            <option value="loading">Loading</option>
            <option value="error">Error</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="embed-src">Source path</label>
          <input
            id="embed-src"
            type="text"
            readOnly
            value={
              demoState === "error"
                ? "./displays/DoesNotExist"
                : "./displays/ExamplePanel"
            }
            style={{ opacity: 0.6 }}
          />
        </div>
      </div>
    </div>
  );
}
