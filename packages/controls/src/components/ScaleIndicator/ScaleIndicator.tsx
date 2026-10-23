import React from "react";
import type { AlarmSeverity } from "../../types/alarm";
import { ALARM_COLORS } from "../../types/alarm";
import type { ThresholdConfig } from "../AnalogGauge";

export interface ScaleIndicatorProps {
  value: number;
  min?: number;
  max?: number;
  units?: string;
  orientation?: "horizontal" | "vertical";
  showValue?: boolean;
  showTicks?: boolean;
  tickCount?: number;
  thresholds?: ThresholdConfig;
  fillColor?: string;
  alarmSeverity?: AlarmSeverity;
  connected?: boolean;
  className?: string;
}

function clamp(val: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, val));
}

function thresholdBands(
  thresholds: ThresholdConfig,
  min: number,
  max: number
): { start: number; end: number; color: string }[] {
  const range = max - min;
  if (range <= 0) return [];

  const pct = (v: number) => ((clamp(v, min, max) - min) / range) * 100;
  const bands: { start: number; end: number; color: string }[] = [];

  const lolo = thresholds.lolo ?? min;
  const low = thresholds.low ?? min;
  const high = thresholds.high ?? max;
  const hihi = thresholds.hihi ?? max;

  if (thresholds.lolo != null) {
    bands.push({ start: pct(min), end: pct(lolo), color: "#da1e28" });
  }
  if (thresholds.low != null) {
    bands.push({ start: pct(lolo), end: pct(low), color: "#f1c21b" });
  }
  bands.push({ start: pct(low), end: pct(high), color: "#24a148" });
  if (thresholds.high != null) {
    bands.push({ start: pct(high), end: pct(hihi), color: "#f1c21b" });
  }
  if (thresholds.hihi != null) {
    bands.push({ start: pct(hihi), end: pct(max), color: "#da1e28" });
  }

  return bands;
}

export function ScaleIndicator({
  value,
  min = 0,
  max = 100,
  units,
  orientation = "horizontal",
  showValue = true,
  showTicks = true,
  tickCount = 5,
  thresholds,
  fillColor,
  alarmSeverity = "none",
  connected = true,
  className,
}: ScaleIndicatorProps) {
  const disconnected = !connected || alarmSeverity === "disconnected";
  const range = max - min;
  const clamped = clamp(value, min, max);
  const fraction = range > 0 ? ((clamped - min) / range) * 100 : 0;

  const barColor =
    fillColor ??
    (alarmSeverity !== "none" ? ALARM_COLORS[alarmSeverity] : "#0f62fe");

  const isVertical = orientation === "vertical";
  const trackLength = "100%";
  const trackThickness = "16px";

  const ticks: number[] = [];
  if (showTicks && tickCount >= 2) {
    for (let i = 0; i <= tickCount - 1; i++) {
      ticks.push(min + (range * i) / (tickCount - 1));
    }
  }

  const bands = thresholds ? thresholdBands(thresholds, min, max) : [];

  return (
    <div
      className={`swapps-scale-indicator ${className ?? ""}`}
      role="meter"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-label={`Scale indicator: ${value}${units ? ` ${units}` : ""}`}
      data-alarm={alarmSeverity}
      data-connected={connected}
      style={{
        display: "inline-flex",
        flexDirection: isVertical ? "column" : "row",
        alignItems: "center",
        gap: "4px",
        opacity: disconnected ? 0.4 : 1,
      }}
    >
      <div
        style={{
          position: "relative",
          width: isVertical ? trackThickness : trackLength,
          height: isVertical ? "120px" : trackThickness,
          minWidth: isVertical ? undefined : "120px",
          backgroundColor: "#e0e0e0",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        {bands.map((band, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              ...(isVertical
                ? {
                    bottom: `${band.start}%`,
                    height: `${band.end - band.start}%`,
                    left: 0,
                    right: 0,
                  }
                : {
                    left: `${band.start}%`,
                    width: `${band.end - band.start}%`,
                    top: 0,
                    bottom: 0,
                  }),
              backgroundColor: band.color,
              opacity: 0.3,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            ...(isVertical
              ? { bottom: 0, left: 0, right: 0, height: `${fraction}%` }
              : { top: 0, bottom: 0, left: 0, width: `${fraction}%` }),
            backgroundColor: barColor,
            borderRadius: "2px",
            transition: "width 150ms, height 150ms",
          }}
        />
      </div>

      {showTicks && (
        <div
          style={{
            position: "relative",
            width: isVertical ? "auto" : trackLength,
            height: isVertical ? "120px" : "auto",
            minWidth: isVertical ? undefined : "120px",
            display: "flex",
            flexDirection: isVertical ? "column-reverse" : "row",
            justifyContent: "space-between",
            fontFamily: "var(--cds-code-01, monospace)",
            fontSize: "10px",
            color: "#525252",
          }}
        >
          {ticks.map((tick) => (
            <span key={tick}>{Number.isInteger(tick) ? tick : tick.toFixed(1)}</span>
          ))}
        </div>
      )}

      {showValue && (
        <span
          style={{
            fontFamily: "var(--cds-code-01, monospace)",
            fontSize: "14px",
            whiteSpace: "nowrap",
          }}
        >
          {disconnected ? "---" : value.toFixed(1)}
          {units && (
            <span style={{ marginLeft: "0.25em", fontSize: "0.85em" }}>
              {units}
            </span>
          )}
        </span>
      )}
    </div>
  );
}
