import type { EChartsOption } from "echarts";
import type { ChartTheme } from "./theme";
import { baseChartOption, chartAxisStyle } from "./theme";
import { formatAxisTick } from "./format";

export interface TimeSeriesConfig {
  series: Array<{
    name: string;
    data: [number, number][];
  }>;
  colors?: string[];
  window?: { min: number; max: number };
  dataZoom?: boolean;
  yAxisName?: string;
}

export function timeSeriesOption(
  theme: ChartTheme,
  config: TimeSeriesConfig
): EChartsOption {
  const base = baseChartOption(theme, { colors: config.colors });

  const option: EChartsOption = {
    ...base,
    xAxis: {
      type: "time",
      ...chartAxisStyle(theme),
      ...(config.window && {
        min: config.window.min,
        max: config.window.max,
      }),
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
      data: s.data,
      showSymbol: false,
      sampling: "lttb" as const,
      emphasis: { disabled: true },
    })),
  };

  if (config.dataZoom) {
    option.dataZoom = [
      { type: "inside" },
      { type: "slider", bottom: 10 },
    ];
  }

  return option;
}
