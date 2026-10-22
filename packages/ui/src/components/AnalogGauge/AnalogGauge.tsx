import React from "react";
import type { AlarmSeverity } from "../../types/alarm";
import { ALARM_COLORS } from "../../types/alarm";

export interface ThresholdConfig {
  lolo?: number;
  low?: number;
  high?: number;
  hihi?: number;
}

export interface AnalogGaugeProps {
  value: number;
  min?: number;
  max?: number;
  units?: string;
  arcSpan?: number;
  showValue?: boolean;
  showTicks?: boolean;
  tickCount?: number;
  thresholds?: ThresholdConfig;
  animateNeedle?: boolean;
  alarmSeverity?: AlarmSeverity;
  connected?: boolean;
  className?: string;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

export function AnalogGauge({
  value,
  min = 0,
  max = 100,
  units,
  arcSpan = 270,
  showValue = true,
  showTicks = true,
  tickCount = 5,
  thresholds,
  animateNeedle = true,
  alarmSeverity = "none",
  connected = true,
  className,
}: AnalogGaugeProps) {
  const disconnected = !connected || alarmSeverity === "disconnected";
  const cx = 100;
  const cy = 100;
  const radius = 80;
  const startAngle = (360 - arcSpan) / 2 + 90;
  const endAngle = startAngle + arcSpan;

  const clampedValue = Math.max(min, Math.min(max, value));
  const fraction = (clampedValue - min) / (max - min);
  const needleAngle = startAngle + fraction * arcSpan;

  const needleEnd = polarToCartesian(cx, cy, radius - 8, needleAngle);

  const alarmColor =
    alarmSeverity !== "none" ? ALARM_COLORS[alarmSeverity] : undefined;

  function thresholdArc(
    fromVal: number,
    toVal: number,
    color: string,
    key: string
  ) {
    const f1 = Math.max(0, (fromVal - min) / (max - min));
    const f2 = Math.min(1, (toVal - min) / (max - min));
    if (f2 <= f1) return null;
    const a1 = startAngle + f1 * arcSpan;
    const a2 = startAngle + f2 * arcSpan;
    return (
      <path
        key={key}
        d={describeArc(cx, cy, radius, a1, a2)}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.4"
      />
    );
  }

  const thresholdArcs: React.ReactNode[] = [];
  if (thresholds) {
    const { lolo, low, high, hihi } = thresholds;
    if (lolo !== undefined)
      thresholdArcs.push(thresholdArc(min, lolo, "#da1e28", "lolo"));
    if (lolo !== undefined && low !== undefined)
      thresholdArcs.push(thresholdArc(lolo, low, "#f1c21b", "low"));
    if (low !== undefined && high !== undefined)
      thresholdArcs.push(thresholdArc(low, high, "#24a148", "normal"));
    if (high !== undefined && hihi !== undefined)
      thresholdArcs.push(thresholdArc(high, hihi, "#f1c21b", "high"));
    if (hihi !== undefined)
      thresholdArcs.push(thresholdArc(hihi, max, "#da1e28", "hihi"));
  }

  const ticks: React.ReactNode[] = [];
  if (showTicks && tickCount > 1) {
    for (let i = 0; i < tickCount; i++) {
      const f = i / (tickCount - 1);
      const angle = startAngle + f * arcSpan;
      const outer = polarToCartesian(cx, cy, radius + 2, angle);
      const inner = polarToCartesian(cx, cy, radius - 6, angle);
      const labelPos = polarToCartesian(cx, cy, radius + 14, angle);
      const tickValue = min + f * (max - min);
      ticks.push(
        <g key={`tick-${i}`}>
          <line
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.4"
          />
          <text
            x={labelPos.x}
            y={labelPos.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="9"
            fill="currentColor"
            opacity="0.6"
          >
            {Number.isInteger(tickValue)
              ? tickValue
              : tickValue.toPrecision(3)}
          </text>
        </g>
      );
    }
  }

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      className={`swapps-analog-gauge ${className ?? ""}`}
      role="meter"
      aria-valuenow={clampedValue}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-label={
        units ? `${clampedValue} ${units}` : String(clampedValue)
      }
      data-alarm={alarmSeverity}
      data-connected={connected}
      style={{ display: "inline-block", opacity: disconnected ? 0.4 : 1 }}
    >
      <svg viewBox="0 0 200 200" width="200" height="200">
        {/* Background arc */}
        <path
          d={describeArc(cx, cy, radius, startAngle, endAngle)}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          opacity="0.12"
          strokeLinecap="round"
        />

        {/* Threshold arcs */}
        {thresholdArcs}

        {/* Tick marks */}
        {ticks}

        {/* Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={needleEnd.x}
          y2={needleEnd.y}
          stroke={alarmColor ?? "currentColor"}
          strokeWidth="2.5"
          strokeLinecap="round"
          style={
            animateNeedle && !reducedMotion
              ? { transition: "all 0.3s ease-out" }
              : undefined
          }
        />

        {/* Center dot */}
        <circle cx={cx} cy={cy} r="4" fill="currentColor" opacity="0.6" />

        {/* Value label */}
        {showValue && (
          <>
            <text
              x={cx}
              y={cy + 24}
              textAnchor="middle"
              fontSize="16"
              fontFamily="var(--cds-code-01, monospace)"
              fill={alarmColor ?? "currentColor"}
              fontWeight="600"
            >
              {precision(clampedValue, max)}
            </text>
            {units && (
              <text
                x={cx}
                y={cy + 38}
                textAnchor="middle"
                fontSize="10"
                fill="currentColor"
                opacity="0.6"
              >
                {units}
              </text>
            )}
          </>
        )}
      </svg>
    </div>
  );
}

function precision(value: number, max: number): string {
  if (Math.abs(value) >= 1000 || Math.abs(max) >= 10000) {
    return value.toPrecision(4);
  }
  if (Number.isInteger(value)) return String(value);
  return value.toFixed(1);
}
