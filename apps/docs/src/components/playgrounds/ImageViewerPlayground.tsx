import React, { useState, useMemo } from "react";
import { ImageViewer } from "@swapps/controls";
import type { AlarmSeverity } from "@swapps/controls";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ComponentPreview from "../preview/ComponentPreview";
import PreviewConfigIndicator from "../preview/PreviewConfigIndicator";
import SectionHeader from "./shared/SectionHeader";
import AlarmControls from "./shared/AlarmControls";

const IMG_SIZE = 64;

type ColorMapName = "grey" | "viridis" | "inferno" | "plasma" | "jet";

function ImageViewerPlaygroundInner() {
  const [colorMap, setColorMap] = useState<ColorMapName>("viridis");
  const [showColorBar, setShowColorBar] = useState(false);
  const [showCrosshair, setShowCrosshair] = useState(false);
  const [alarmSeverity, setAlarmSeverity] = useState<AlarmSeverity>("none");
  const [connected, setConnected] = useState(true);

  const imageData = useMemo(() => {
    const data = new Array(IMG_SIZE * IMG_SIZE);
    const cx = IMG_SIZE / 2;
    const cy = IMG_SIZE / 2;
    for (let y = 0; y < IMG_SIZE; y++) {
      for (let x = 0; x < IMG_SIZE; x++) {
        const dx = x - cx;
        const dy = y - cy;
        data[y * IMG_SIZE + x] =
          Math.exp(-(dx * dx + dy * dy) / 200) * 255;
      }
    }
    return data;
  }, []);

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
          <ImageViewer
            data={imageData}
            width={IMG_SIZE}
            height={IMG_SIZE}
            colorMap={colorMap}
            showColorBar={showColorBar}
            showCrosshair={showCrosshair}
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
        <SectionHeader first>Display Options</SectionHeader>
        <div className="swapps-preview__control-group">
          <label htmlFor="img-colormap">Color map</label>
          <select
            id="img-colormap"
            value={colorMap}
            onChange={(e) => setColorMap(e.target.value as ColorMapName)}
          >
            <option value="grey">Grey</option>
            <option value="viridis">Viridis</option>
            <option value="inferno">Inferno</option>
            <option value="plasma">Plasma</option>
            <option value="jet">Jet</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="img-colorbar">Show color bar</label>
          <select
            id="img-colorbar"
            value={showColorBar ? "yes" : "no"}
            onChange={(e) => setShowColorBar(e.target.value === "yes")}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        <div className="swapps-preview__control-group">
          <label htmlFor="img-crosshair">Show crosshair</label>
          <select
            id="img-crosshair"
            value={showCrosshair ? "yes" : "no"}
            onChange={(e) => setShowCrosshair(e.target.value === "yes")}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        <AlarmControls
          idPrefix="img"
          alarmSeverity={alarmSeverity}
          onAlarmSeverityChange={setAlarmSeverity}
          connected={connected}
          onConnectedChange={setConnected}
        />
      </div>
    </div>
  );
}

export default function ImageViewerPlayground() {
  return (
    <BrowserOnly fallback={<div>Loading preview...</div>}>
      {() => <ImageViewerPlaygroundInner />}
    </BrowserOnly>
  );
}
