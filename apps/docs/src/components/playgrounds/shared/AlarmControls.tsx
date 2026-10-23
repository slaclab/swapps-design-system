import React from "react";
import type { AlarmSeverity } from "@swapps/controls";
import SectionHeader from "./SectionHeader";

interface AlarmControlsProps {
  idPrefix: string;
  alarmSeverity: AlarmSeverity;
  onAlarmSeverityChange: (severity: AlarmSeverity) => void;
  connected: boolean;
  onConnectedChange: (connected: boolean) => void;
}

const SEVERITIES: AlarmSeverity[] = [
  "none",
  "minor",
  "major",
  "invalid",
  "disconnected",
];

export default function AlarmControls({
  idPrefix,
  alarmSeverity,
  onAlarmSeverityChange,
  connected,
  onConnectedChange,
}: AlarmControlsProps) {
  return (
    <>
      <SectionHeader>Alarm &amp; Connection</SectionHeader>
      <div className="swapps-preview__control-group">
        <label htmlFor={`${idPrefix}-alarm`}>Alarm severity</label>
        <select
          id={`${idPrefix}-alarm`}
          value={alarmSeverity}
          onChange={(e) =>
            onAlarmSeverityChange(e.target.value as AlarmSeverity)
          }
        >
          {SEVERITIES.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="swapps-preview__control-group">
        <label htmlFor={`${idPrefix}-connected`}>Connection</label>
        <select
          id={`${idPrefix}-connected`}
          value={connected ? "yes" : "no"}
          onChange={(e) => onConnectedChange(e.target.value === "yes")}
        >
          <option value="yes">Connected</option>
          <option value="no">Disconnected</option>
        </select>
      </div>
    </>
  );
}
