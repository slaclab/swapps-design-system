import React from "react";
import type { AlarmSeverity } from "../../types/alarm";
import { ALARM_BORDER_COLORS } from "../../types/alarm";

export interface SymbolDefinition {
  value: number | string;
  label: string;
  src?: string;
  fill?: string;
}

export interface PVSymbolProps {
  value: number | string;
  symbols: SymbolDefinition[];
  width?: number | string;
  height?: number | string;
  rotation?: number;
  alarmSeverity?: AlarmSeverity;
  connected?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function PVSymbol({
  value,
  symbols,
  width = 48,
  height = 48,
  rotation = 0,
  alarmSeverity = "none",
  connected = true,
  children,
  className,
}: PVSymbolProps) {
  const disconnected = !connected || alarmSeverity === "disconnected";
  const matched = symbols.find((s) => s.value === value);
  const label = matched?.label ?? `State: ${value}`;

  const borderColor =
    alarmSeverity !== "none" ? ALARM_BORDER_COLORS[alarmSeverity] : "transparent";

  return (
    <div
      className={`swapps-pv-symbol ${className ?? ""}`}
      role="img"
      aria-label={label}
      data-alarm={alarmSeverity}
      data-connected={connected}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width,
        height,
        border: `2px solid ${borderColor}`,
        borderRadius: "4px",
        opacity: disconnected ? 0.4 : 1,
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
        overflow: "hidden",
      }}
    >
      {matched?.src ? (
        <img
          src={matched.src}
          alt=""
          aria-hidden="true"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      ) : children ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            color: matched?.fill ?? "currentColor",
            fill: matched?.fill ?? "currentColor",
          }}
        >
          {children}
        </div>
      ) : (
        <div
          style={{
            width: "60%",
            height: "60%",
            borderRadius: "50%",
            backgroundColor: matched?.fill ?? "#8d8d8d",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
