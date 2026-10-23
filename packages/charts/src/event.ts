import type { EChartsOption } from "echarts";
import type { ChartTheme } from "./theme";
import { baseChartOption, chartAxisStyle } from "./theme";

export interface EventEntry {
  time: number | string | Date;
  label?: string;
  category?: string;
}

export interface EventConfig {
  events: EventEntry[];
  categories?: string[];
  symbol?: string;
  symbolSize?: number;
  markLines?: boolean;
  colors?: string[];
}

export function eventOption(
  theme: ChartTheme,
  config: EventConfig
): EChartsOption {
  const base = baseChartOption(theme, { colors: config.colors });
  const symbol = config.symbol ?? "diamond";
  const symbolSize = config.symbolSize ?? 10;

  const categories = config.categories ?? [
    ...new Set(config.events.map((e) => e.category ?? "Events")),
  ];

  const seriesMap = new Map<string, EventEntry[]>();
  for (const cat of categories) {
    seriesMap.set(cat, []);
  }
  for (const evt of config.events) {
    const cat = evt.category ?? "Events";
    seriesMap.get(cat)?.push(evt);
  }

  const series: EChartsOption["series"] = [];
  for (const [cat, events] of seriesMap) {
    const scatterSeries: Record<string, unknown> = {
      name: cat,
      type: "scatter",
      data: events.map((e) => [
        e.time instanceof Date ? e.time.getTime() : e.time,
        0,
      ]),
      symbol,
      symbolSize,
      label: {
        show: true,
        position: "top",
        formatter: (params: { dataIndex: number }) =>
          events[params.dataIndex]?.label ?? "",
        color: theme.textPrimary,
        fontSize: 11,
      },
    };

    if (config.markLines) {
      scatterSeries.markLine = {
        silent: true,
        symbol: "none",
        lineStyle: { color: theme.gridLine, type: "dashed" },
        data: events.map((e) => ({
          xAxis: e.time instanceof Date ? e.time.getTime() : e.time,
        })),
      };
    }

    series.push(scatterSeries);
  }

  return {
    ...base,
    xAxis: {
      type: "time",
      ...chartAxisStyle(theme),
    },
    yAxis: {
      type: "value",
      show: false,
    },
    series,
  };
}
