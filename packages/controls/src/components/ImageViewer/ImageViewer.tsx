import React, { useRef, useEffect, useCallback, useState } from "react";
import type { AlarmSeverity } from "../../types/alarm";
import { ALARM_BORDER_COLORS } from "../../types/alarm";

export interface ROI {
  x: number;
  y: number;
  width: number;
  height: number;
}

type ColorMapName = "grey" | "viridis" | "inferno" | "plasma" | "jet";

export interface ImageViewerProps {
  data: number[] | Float32Array | Uint16Array;
  width: number;
  height: number;
  colorMap?: ColorMapName | number[][];
  intensityRange?: [number, number];
  showColorBar?: boolean;
  showCrosshair?: boolean;
  enableZoom?: boolean;
  enableROI?: boolean;
  onROISelect?: (roi: ROI) => void;
  maxFps?: number;
  alarmSeverity?: AlarmSeverity;
  connected?: boolean;
  className?: string;
}

const COLOR_MAPS: Record<ColorMapName, (t: number) => [number, number, number]> = {
  grey: (t) => {
    const v = Math.round(t * 255);
    return [v, v, v];
  },
  viridis: (t) => [
    Math.round((0.267 + t * (0.329 + t * (-1.421 + t * 1.826))) * 255),
    Math.round((0.004 + t * (0.873 + t * (-0.558 + t * 0.295))) * 255),
    Math.round((0.329 + t * (1.015 + t * (-2.571 + t * 1.579))) * 255),
  ],
  inferno: (t) => [
    Math.round(Math.min(1, 0.002 + t * (1.225 + t * (0.816 + t * -1.04))) * 255),
    Math.round(Math.max(0, Math.min(1, -0.017 + t * (-0.368 + t * (2.81 + t * -1.942)))) * 255),
    Math.round(Math.max(0, Math.min(1, 0.014 + t * (2.148 + t * (-5.024 + t * 3.146)))) * 255),
  ],
  plasma: (t) => [
    Math.round(Math.min(1, 0.05 + t * (1.56 + t * (-1.28 + t * 0.64))) * 255),
    Math.round(Math.max(0, Math.min(1, 0.03 + t * (-0.4 + t * (2.14 + t * -1.42)))) * 255),
    Math.round(Math.max(0, Math.min(1, 0.53 + t * (1.06 + t * (-3.6 + t * 2.36)))) * 255),
  ],
  jet: (t) => [
    Math.round(Math.max(0, Math.min(1, 1.5 - Math.abs(4 * t - 3))) * 255),
    Math.round(Math.max(0, Math.min(1, 1.5 - Math.abs(4 * t - 2))) * 255),
    Math.round(Math.max(0, Math.min(1, 1.5 - Math.abs(4 * t - 1))) * 255),
  ],
};

function getColorMapFn(
  colorMap: ColorMapName | number[][]
): (t: number) => [number, number, number] {
  if (typeof colorMap === "string") {
    return COLOR_MAPS[colorMap] ?? COLOR_MAPS.viridis;
  }
  return (t: number) => {
    const idx = Math.min(colorMap.length - 1, Math.max(0, Math.round(t * (colorMap.length - 1))));
    const c = colorMap[idx];
    return [c[0], c[1], c[2]];
  };
}

export function ImageViewer({
  data,
  width,
  height,
  colorMap = "viridis",
  intensityRange,
  showColorBar = false,
  showCrosshair = false,
  enableZoom = false,
  enableROI = false,
  onROISelect,
  maxFps = 30,
  alarmSeverity = "none",
  connected = true,
  className,
}: ImageViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastRenderRef = useRef(0);
  const [crosshairPos, setCrosshairPos] = useState<{ x: number; y: number } | null>(null);

  const disconnected = !connected || alarmSeverity === "disconnected";

  const borderColor =
    alarmSeverity !== "none"
      ? ALARM_BORDER_COLORS[alarmSeverity]
      : "transparent";

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const now = performance.now();
    const minInterval = 1000 / maxFps;
    if (now - lastRenderRef.current < minInterval) return;
    lastRenderRef.current = now;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgData = ctx.createImageData(width, height);
    const mapFn = getColorMapFn(colorMap);

    let lo: number, hi: number;
    if (intensityRange) {
      [lo, hi] = intensityRange;
    } else {
      lo = Infinity;
      hi = -Infinity;
      for (let i = 0; i < data.length; i++) {
        if (data[i] < lo) lo = data[i];
        if (data[i] > hi) hi = data[i];
      }
      if (lo === hi) hi = lo + 1;
    }

    const range = hi - lo;
    const pixels = Math.min(data.length, width * height);
    for (let i = 0; i < pixels; i++) {
      const t = Math.max(0, Math.min(1, (data[i] - lo) / range));
      const [r, g, b] = mapFn(t);
      const idx = i * 4;
      imgData.data[idx] = r;
      imgData.data[idx + 1] = g;
      imgData.data[idx + 2] = b;
      imgData.data[idx + 3] = 255;
    }

    ctx.putImageData(imgData, 0, 0);
  }, [data, width, height, colorMap, intensityRange, maxFps]);

  useEffect(() => {
    render();
  }, [render]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!showCrosshair) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const scaleX = width / rect.width;
      const scaleY = height / rect.height;
      setCrosshairPos({
        x: Math.round((e.clientX - rect.left) * scaleX),
        y: Math.round((e.clientY - rect.top) * scaleY),
      });
    },
    [showCrosshair, width, height]
  );

  return (
    <div
      className={`swapps-image-viewer ${className ?? ""}`}
      data-alarm={alarmSeverity}
      data-connected={connected}
      style={{
        display: "inline-block",
        position: "relative",
        border: `2px solid ${borderColor}`,
        borderRadius: "4px",
        opacity: disconnected ? 0.4 : 1,
      }}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          display: "block",
          maxWidth: "100%",
          height: "auto",
          imageRendering: "pixelated",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setCrosshairPos(null)}
        aria-label={`Image: ${width}×${height} pixels`}
        role="img"
      />
      {showCrosshair && crosshairPos && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: `${(crosshairPos.x / width) * 100}%`,
              top: 0,
              bottom: 0,
              width: "1px",
              backgroundColor: "rgba(255,255,255,0.6)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: `${(crosshairPos.y / height) * 100}%`,
              left: 0,
              right: 0,
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.6)",
            }}
          />
        </div>
      )}
      {showColorBar && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: 4,
            top: 4,
            bottom: 4,
            width: 12,
            borderRadius: 2,
            background: "linear-gradient(to bottom, #fee, #300)",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        />
      )}
    </div>
  );
}
