import React from "react";
import type { AlarmSeverity } from "../../types/alarm";
import { ALARM_BORDER_COLORS } from "../../types/alarm";

export interface StateDefinition {
  value: number | string;
  label: string;
  color: string;
  icon?: React.ReactNode;
}

export interface MultiStateIndicatorProps {
  value: number | string;
  states: StateDefinition[];
  shape?: "rectangle" | "circle" | "badge";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  alarmSeverity?: AlarmSeverity;
  connected?: boolean;
  className?: string;
}

const SIZE_MAP = {
  sm: { width: 24, height: 24, fontSize: 11, padding: "2px 6px" },
  md: { width: 36, height: 36, fontSize: 13, padding: "4px 10px" },
  lg: { width: 48, height: 48, fontSize: 15, padding: "6px 14px" },
} as const;

export function MultiStateIndicator({
  value,
  states,
  shape = "rectangle",
  size = "md",
  showLabel = true,
  alarmSeverity = "none",
  connected = true,
  className,
}: MultiStateIndicatorProps) {
  const disconnected = !connected || alarmSeverity === "disconnected";
  const matched = states.find((s) => s.value === value);
  const label = matched?.label ?? "Unknown";
  const color = disconnected ? "#8d8d8d" : (matched?.color ?? "#8d8d8d");
  const icon = matched?.icon;

  const borderColor =
    alarmSeverity !== "none"
      ? ALARM_BORDER_COLORS[alarmSeverity]
      : "transparent";

  const dims = SIZE_MAP[size];

  const shapeStyle: React.CSSProperties =
    shape === "circle"
      ? {
          width: dims.width,
          height: dims.height,
          borderRadius: "50%",
        }
      : shape === "badge"
        ? {
            borderRadius: "999px",
            padding: dims.padding,
          }
        : {
            width: dims.width,
            height: dims.height,
            borderRadius: "4px",
          };

  return (
    <div
      className={`swapps-multi-state-indicator ${className ?? ""}`}
      role="status"
      aria-label={`${label}${alarmSeverity !== "none" ? ` (${alarmSeverity})` : ""}`}
      data-alarm={alarmSeverity}
      data-connected={connected}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        opacity: disconnected ? 0.4 : 1,
      }}
    >
      <div
        style={{
          ...shapeStyle,
          backgroundColor: color,
          border: `2px solid ${borderColor}`,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontSize: dims.fontSize,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      {showLabel && (
        <span style={{ fontSize: dims.fontSize, whiteSpace: "nowrap" }}>
          {label}
        </span>
      )}
    </div>
  );
}
