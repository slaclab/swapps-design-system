import type { EChartsOption } from "echarts";
import { useSWAPPSAppearance } from "@swapps/ui";

export interface ChartTheme {
  background: string;
  textPrimary: string;
  textSecondary: string;
  axisLine: string;
  axisTick: string;
  gridLine: string;
  tooltipBg: string;
  tooltipText: string;
  tooltipBorder: string;
  crosshair: string;
  legendText: string;
  danger: string;
  success: string;
  warning: string;
  selection: string;
  highlight: string;
}

export const CHART_THEMES: Readonly<Record<"light" | "dark", ChartTheme>> =
  Object.freeze({
    light: {
      background: "#ffffff",
      textPrimary: "#161616",
      textSecondary: "#525252",
      axisLine: "#8d8d8d",
      axisTick: "#8d8d8d",
      gridLine: "#e0e0e0",
      tooltipBg: "#ffffff",
      tooltipText: "#161616",
      tooltipBorder: "#e0e0e0",
      crosshair: "#8d8d8d",
      legendText: "#525252",
      danger: "#da1e28",
      success: "#24a148",
      warning: "#f1c21b",
      selection: "#0f62fe",
      highlight: "#d0e2ff",
    },
    dark: {
      background: "#161616",
      textPrimary: "#f4f4f4",
      textSecondary: "#c6c6c6",
      axisLine: "#6f6f6f",
      axisTick: "#6f6f6f",
      gridLine: "#393939",
      tooltipBg: "#262626",
      tooltipText: "#f4f4f4",
      tooltipBorder: "#393939",
      crosshair: "#6f6f6f",
      legendText: "#c6c6c6",
      danger: "#fa4d56",
      success: "#42be65",
      warning: "#f1c21b",
      selection: "#78a9ff",
      highlight: "#002d9c",
    },
  });

export function chartThemeFor(mode: "light" | "dark"): ChartTheme {
  return CHART_THEMES[mode];
}

export interface BaseChartConfig {
  colors?: string[];
}

export function baseChartOption(
  theme: ChartTheme,
  config?: BaseChartConfig
): EChartsOption {
  return {
    animation: false,
    backgroundColor: theme.background,
    color: config?.colors,
    textStyle: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      color: theme.textPrimary,
    },
    grid: {
      top: 40,
      bottom: 60,
      left: 70,
      right: 20,
      containLabel: false,
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: theme.tooltipBg,
      borderColor: theme.tooltipBorder,
      textStyle: {
        color: theme.tooltipText,
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: 12,
      },
      axisPointer: {
        type: "cross",
        lineStyle: {
          color: theme.crosshair,
          type: "dashed",
        },
        crossStyle: {
          color: theme.crosshair,
          type: "dashed",
        },
      },
    },
    legend: {
      textStyle: {
        color: theme.legendText,
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: 12,
      },
    },
    xAxis: {
      type: "value",
      ...chartAxisStyle(theme),
    },
    yAxis: {
      type: "value",
      ...chartAxisStyle(theme),
    },
  };
}

export function chartAxisStyle(theme: ChartTheme) {
  return {
    axisLabel: {
      color: theme.textSecondary,
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 11,
    },
    axisLine: {
      lineStyle: { color: theme.axisLine },
    },
    axisTick: {
      lineStyle: { color: theme.axisTick },
    },
    splitLine: {
      lineStyle: { color: theme.gridLine, type: "dashed" as const },
    },
    nameTextStyle: {
      color: theme.textSecondary,
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 12,
    },
  };
}

export function useChartTheme(): ChartTheme {
  const appearance = useSWAPPSAppearance();
  const mode = appearance === "dark" ? "dark" : "light";
  return CHART_THEMES[mode];
}
