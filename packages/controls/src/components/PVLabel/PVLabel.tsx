import React from "react";
import type { AlarmSeverity } from "../../types/alarm";
import { ALARM_COLORS } from "../../types/alarm";

export type DisplayFormat =
  | "default"
  | "exponential"
  | "engineering"
  | "hex"
  | "binary"
  | "string";

export interface PVLabelProps {
  value?: number | string | null;
  units?: string;
  precision?: number;
  format?: DisplayFormat;
  alarmSeverity?: AlarmSeverity;
  connected?: boolean;
  showUnits?: boolean;
  className?: string;
}

const SI_PREFIXES: [number, string][] = [
  [1e15, "P"],
  [1e12, "T"],
  [1e9, "G"],
  [1e6, "M"],
  [1e3, "k"],
  [1, ""],
  [1e-3, "m"],
  [1e-6, "µ"],
  [1e-9, "n"],
  [1e-12, "p"],
  [1e-15, "f"],
];

function formatEngineering(value: number, precision: number): string {
  if (value === 0) return "0";
  const abs = Math.abs(value);
  for (const [threshold, prefix] of SI_PREFIXES) {
    if (abs >= threshold) {
      return (value / threshold).toFixed(precision) + prefix;
    }
  }
  return value.toExponential(precision);
}

function formatDisplayValue(
  value: number | string | null | undefined,
  format: DisplayFormat,
  precision: number
): string {
  if (value == null) return "---";
  if (typeof value === "string") return value;
  if (!Number.isFinite(value)) return String(value);

  switch (format) {
    case "exponential":
      return value.toExponential(precision);
    case "engineering":
      return formatEngineering(value, precision);
    case "hex":
      return "0x" + Math.round(value).toString(16).toUpperCase();
    case "binary":
      return "0b" + (value >>> 0).toString(2);
    case "string":
      return String(value);
    default:
      return value.toFixed(precision);
  }
}

export function PVLabel({
  value,
  units,
  precision = 3,
  format = "default",
  alarmSeverity = "none",
  connected = true,
  showUnits = true,
  className,
}: PVLabelProps) {
  const disconnected = !connected || alarmSeverity === "disconnected";
  const displayValue = disconnected
    ? "---"
    : formatDisplayValue(value, format, precision);

  const color =
    alarmSeverity !== "none" ? ALARM_COLORS[alarmSeverity] : undefined;

  const label = [
    displayValue,
    showUnits && units ? units : null,
    alarmSeverity !== "none" ? `(${alarmSeverity})` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={`swapps-pv-label ${className ?? ""}`}
      role="status"
      aria-label={label}
      aria-live="polite"
      data-alarm={alarmSeverity}
      data-connected={connected}
      style={{
        fontFamily: "var(--cds-code-01, monospace)",
        color,
        opacity: disconnected ? 0.4 : 1,
      }}
    >
      {displayValue}
      {showUnits && units && (
        <span style={{ marginLeft: "0.25em", fontSize: "0.85em" }}>
          {units}
        </span>
      )}
    </span>
  );
}
