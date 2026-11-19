export type AlarmSeverity =
  | "none"
  | "minor"
  | "warning"
  | "major"
  | "invalid"
  | "disconnected";

export const ALARM_COLORS: Record<AlarmSeverity, string> = {
  none: "transparent",
  minor: "#f1c21b",
  warning: "#ff832b",
  major: "#da1e28",
  invalid: "#a56eff",
  disconnected: "#8d8d8d",
};

export const ALARM_BORDER_COLORS: Record<AlarmSeverity, string> = {
  none: "#e0e0e0",
  minor: "#f1c21b",
  warning: "#ff832b",
  major: "#da1e28",
  invalid: "#a56eff",
  disconnected: "#8d8d8d",
};

export const ALARM_COLORS_DARK: Record<AlarmSeverity, string> = {
  none: "transparent",
  minor: "#fddc69",
  warning: "#ffb784",
  major: "#fa4d56",
  invalid: "#be95ff",
  disconnected: "#a8a8a8",
};

export const ALARM_BORDER_COLORS_DARK: Record<AlarmSeverity, string> = {
  none: "#393939",
  minor: "#fddc69",
  warning: "#ffb784",
  major: "#fa4d56",
  invalid: "#be95ff",
  disconnected: "#a8a8a8",
};

export interface BaseWidgetProps {
  alarmSeverity?: AlarmSeverity;
  connected?: boolean;
  className?: string;
}
