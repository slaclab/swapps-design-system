export type AlarmSeverity =
  | "none"
  | "minor"
  | "major"
  | "invalid"
  | "disconnected";

export const ALARM_COLORS: Record<AlarmSeverity, string> = {
  none: "transparent",
  minor: "#f1c21b",
  major: "#da1e28",
  invalid: "#a56eff",
  disconnected: "#8d8d8d",
};

export const ALARM_BORDER_COLORS: Record<AlarmSeverity, string> = {
  none: "#e0e0e0",
  minor: "#f1c21b",
  major: "#da1e28",
  invalid: "#a56eff",
  disconnected: "#8d8d8d",
};

export interface BaseWidgetProps {
  alarmSeverity?: AlarmSeverity;
  connected?: boolean;
  className?: string;
}
