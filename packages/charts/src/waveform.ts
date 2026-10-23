import type { EChartsOption } from "echarts";
import type { ChartTheme } from "./theme";
import { baseChartOption, chartAxisStyle } from "./theme";
import { formatAxisTick } from "./format";

export interface WaveformConfig {
  series: Array<{
    name: string;
    data: number[] | [number, number][];
  }>;
  xAxisName?: string;
  yAxisName?: string;
  colors?: string[];
}

function normalizeData(data: number[] | [number, number][]): [number, number][] {
  if (data.length === 0) return [];
  if (Array.isArray(data[0])) return data as [number, number][];
  return (data as number[]).map((v, i) => [i, v]);
}

export function waveformOption(
  theme: ChartTheme,
  config: WaveformConfig
): EChartsOption {
  const base = baseChartOption(theme, { colors: config.colors });

  return {
    ...base,
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
      type: "line" as const,
      data: normalizeData(s.data),
      showSymbol: false,
      sampling: "lttb" as const,
    })),
  };
}
