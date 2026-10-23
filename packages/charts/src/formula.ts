export interface FormulaSeriesConfig {
  name: string;
  data: [number, number][];
  dashStyle?: "dashed" | "dotted" | "solid";
}

export function formulaSeriesConfig(config: FormulaSeriesConfig): {
  name: string;
  type: "line";
  data: [number, number][];
  showSymbol: boolean;
  lineStyle: { type: string };
} {
  return {
    name: config.name,
    type: "line",
    data: config.data,
    showSymbol: false,
    lineStyle: {
      type: config.dashStyle ?? "dashed",
    },
  };
}
