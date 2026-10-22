export function formatAxisTick(value: number): string {
  if (value === 0) return "0";
  const abs = Math.abs(value);
  if (abs >= 1e6 || abs < 1e-3) {
    return value.toExponential(1);
  }
  if (Number.isInteger(value)) return String(value);
  if (abs >= 100) return value.toFixed(0);
  if (abs >= 1) return value.toFixed(1);
  return value.toFixed(3);
}

export function formatValue(value: number, significantDigits = 4): string {
  if (value === 0) return "0";
  if (!Number.isFinite(value)) return String(value);
  return value.toPrecision(significantDigits);
}
