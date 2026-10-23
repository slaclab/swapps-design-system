import type { EChartsOption } from "echarts";
import type { ChartTheme } from "./theme";
import { baseChartOption, chartAxisStyle } from "./theme";
import { formatAxisTick } from "./format";

export interface ArchiverSeries {
  name: string;
  data: [number, number][];
  bands?: [number, number, number][];
}

export interface ArchiverConfig {
  series: ArchiverSeries[];
  dataZoom?: boolean;
  yAxisName?: string;
  colors?: string[];
}

export function archiverOption(
  theme: ChartTheme,
  config: ArchiverConfig
): EChartsOption {
  const base = baseChartOption(theme, { colors: config.colors });
  const echartsSeriesList: Record<string, unknown>[] = [];

  for (const s of config.series) {
    echartsSeriesList.push({
      name: s.name,
      type: "line",
      data: s.data,
      showSymbol: false,
      sampling: "lttb",
      emphasis: { disabled: true },
    });

    if (s.bands && s.bands.length > 0) {
      echartsSeriesList.push({
        name: `${s.name} (range)`,
        type: "line",
        data: s.bands.map(([ts, min, max]) => [ts, min, max]),
        showSymbol: false,
        lineStyle: { width: 0 },
        areaStyle: { opacity: 0.15 },
        encode: { x: 0, y: [1, 2] },
        silent: true,
      });
    }
  }

  const option: EChartsOption = {
    ...base,
    xAxis: {
      type: "time",
      ...chartAxisStyle(theme),
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
    series: echartsSeriesList,
    dataZoom:
      config.dataZoom !== false
        ? [{ type: "inside" }, { type: "slider", bottom: 10 }]
        : undefined,
  };

  return option;
}
