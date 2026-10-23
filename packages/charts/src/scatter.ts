import type { EChartsOption } from "echarts";
import type { ChartTheme } from "./theme";
import { baseChartOption, chartAxisStyle } from "./theme";
import { formatAxisTick } from "./format";

export interface ScatterVisualMap {
  dimension: number;
  min: number;
  max: number;
  colors: string[];
  label?: string;
}

export interface ScatterConfig {
  series: Array<{
    name: string;
    data: number[][];
  }>;
  symbolSize?: number;
  visualMap?: ScatterVisualMap;
  xAxisName?: string;
  yAxisName?: string;
  colors?: string[];
}

export function scatterOption(
  theme: ChartTheme,
  config: ScatterConfig
): EChartsOption {
  const base = baseChartOption(theme, { colors: config.colors });

  const option: EChartsOption = {
    ...base,
    tooltip: {
      ...base.tooltip,
      trigger: "item",
    },
    xAxis: {
      type: "value",
      name: config.xAxisName,
      ...chartAxisStyle(theme),
      axisLabel: {
        ...chartAxisStyle(theme).axisLabel,
        formatter: formatAxisTick,
      },
    },
    yAxis: {
      type: "value",
      name: config.yAxisName,
      ...chartAxisStyle(theme),
      axisLabel: {
        ...chartAxisStyle(theme).axisLabel,
        formatter: formatAxisTick,
      },
    },
    series: config.series.map((s) => ({
      name: s.name,
      type: "scatter" as const,
      data: s.data,
      symbolSize: config.symbolSize ?? 4,
    })),
  };

  if (config.visualMap) {
    const vm = config.visualMap;
    option.visualMap = [
      {
        show: true,
        dimension: vm.dimension,
        min: vm.min,
        max: vm.max,
        inRange: { color: vm.colors },
        text: vm.label ? [vm.label] : undefined,
        textStyle: { color: theme.textSecondary },
      },
    ];
  }

  return option;
}
