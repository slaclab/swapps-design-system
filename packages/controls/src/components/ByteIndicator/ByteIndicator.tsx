import React from "react";
import type { AlarmSeverity } from "../../types/alarm";
import { ALARM_BORDER_COLORS } from "../../types/alarm";

export interface ByteIndicatorProps {
  value?: number;
  numBits?: number;
  labels?: string[];
  orientation?: "horizontal" | "vertical";
  bitOrder?: "msb" | "lsb";
  onColor?: string;
  offColor?: string;
  alarmSeverity?: AlarmSeverity;
  connected?: boolean;
  className?: string;
}

export function ByteIndicator({
  value = 0,
  numBits = 8,
  labels,
  orientation = "horizontal",
  bitOrder = "msb",
  onColor = "#24a148",
  offColor = "#525252",
  alarmSeverity = "none",
  connected = true,
  className,
}: ByteIndicatorProps) {
  const disconnected = !connected || alarmSeverity === "disconnected";
  const borderColor =
    alarmSeverity !== "none"
      ? ALARM_BORDER_COLORS[alarmSeverity]
      : "transparent";

  const bits: number[] = [];
  for (let i = 0; i < numBits; i++) {
    bits.push((value >>> i) & 1);
  }

  const ordered = bitOrder === "msb" ? [...bits].reverse() : bits;
  const orderedIndices =
    bitOrder === "msb"
      ? Array.from({ length: numBits }, (_, i) => numBits - 1 - i)
      : Array.from({ length: numBits }, (_, i) => i);

  return (
    <div
      className={`swapps-byte-indicator ${className ?? ""}`}
      role="group"
      aria-label={`Byte indicator: ${value}`}
      data-alarm={alarmSeverity}
      data-connected={connected}
      style={{
        display: "inline-flex",
        flexDirection: orientation === "vertical" ? "column" : "row",
        gap: "2px",
        border: `2px solid ${borderColor}`,
        borderRadius: "2px",
        padding: "2px",
        opacity: disconnected ? 0.4 : 1,
      }}
    >
      {ordered.map((bit, displayIndex) => {
        const bitIndex = orderedIndices[displayIndex];
        const isOn = bit === 1;
        const label = labels?.[bitIndex];
        const ariaLabel = `Bit ${bitIndex}: ${isOn ? "on" : "off"}${label ? ` – ${label}` : ""}`;
        const color = disconnected ? "#8d8d8d" : isOn ? onColor : offColor;

        return (
          <div
            key={bitIndex}
            role="img"
            aria-label={ariaLabel}
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "2px",
              backgroundColor: color,
              transition: "background-color 150ms",
            }}
          />
        );
      })}
    </div>
  );
}
