export const CATEGORICAL_PALETTE: Readonly<
  Record<"light" | "dark", readonly string[]>
> = Object.freeze({
  light: [
    "#6929c4", // Purple 70
    "#1192e8", // Cyan 50
    "#005d5d", // Teal 70
    "#9f1853", // Magenta 70
    "#fa4d56", // Red 50
    "#570408", // Red 90
    "#198038", // Green 60
    "#002d9c", // Blue 80
    "#ee538b", // Magenta 50
    "#b28600", // Yellow 50
    "#009d9a", // Teal 50
    "#012749", // Cyan 90
    "#8a3800", // Orange 70
    "#a56eff", // Purple 50
  ],
  dark: [
    "#8a3ffc", // Purple 60
    "#33b1ff", // Cyan 40
    "#007d79", // Teal 60
    "#ff7eb6", // Magenta 40
    "#fa4d56", // Red 50
    "#fff1f1", // Red 10
    "#6fdc8c", // Green 30
    "#4589ff", // Blue 50
    "#d12771", // Magenta 60
    "#d2a106", // Yellow 40
    "#08bdba", // Teal 40
    "#bae6ff", // Cyan 20
    "#ba4e00", // Orange 60
    "#be95ff", // Purple 40
  ],
});

export function seriesColor(
  index: number,
  mode: "light" | "dark" = "light"
): string {
  const palette = CATEGORICAL_PALETTE[mode];
  return palette[index % palette.length];
}
