import React from "react";
import type { AlarmSeverity } from "../../types/alarm";
import { ALARM_COLORS } from "../../types/alarm";

export interface PVTableRow {
  id: string;
  label: string;
  value?: number | string;
  units?: string;
  precision?: number;
  alarmSeverity?: AlarmSeverity;
  connected?: boolean;
  [key: string]: unknown;
}

export type PVTableColumn = "label" | "value" | "units" | "severity" | "status" | string;

export interface PVTableProps {
  rows: PVTableRow[];
  columns?: PVTableColumn[];
  precision?: number;
  sortable?: boolean;
  filterable?: boolean;
  className?: string;
}

function formatValue(value: unknown, precision: number): string {
  if (value === undefined || value === null) return "---";
  if (typeof value === "number") {
    return Number.isInteger(value) ? String(value) : value.toFixed(precision);
  }
  return String(value);
}

function SeverityBadge({ severity }: { severity?: AlarmSeverity }) {
  if (!severity || severity === "none") return null;
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: "10px",
        fontSize: "0.75rem",
        fontWeight: 500,
        backgroundColor: ALARM_COLORS[severity],
        color: severity === "minor" ? "#161616" : "#fff",
      }}
    >
      {severity}
    </span>
  );
}

const COLUMN_HEADERS: Record<string, string> = {
  label: "Name",
  value: "Value",
  units: "Units",
  severity: "Severity",
  status: "Status",
};

export function PVTable({
  rows,
  columns = ["label", "value", "units"],
  precision = 3,
  sortable = true,
  filterable = false,
  className,
}: PVTableProps) {
  const [filter, setFilter] = React.useState("");
  const [sortCol, setSortCol] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc");

  const handleSort = (col: string) => {
    if (!sortable) return;
    if (sortCol === col) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortCol(col);
      setSortDir("asc");
    }
  };

  let displayRows = rows;

  if (filterable && filter) {
    const lower = filter.toLowerCase();
    displayRows = displayRows.filter((r) =>
      r.label.toLowerCase().includes(lower)
    );
  }

  if (sortCol) {
    displayRows = [...displayRows].sort((a, b) => {
      const av = a[sortCol] ?? "";
      const bv = b[sortCol] ?? "";
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }

  function renderCell(row: PVTableRow, col: string) {
    const disconnected = !row.connected && row.connected !== undefined;
    switch (col) {
      case "label":
        return row.label;
      case "value":
        return (
          <span
            style={{
              fontFamily: "var(--cds-code-01, monospace)",
              color: row.alarmSeverity && row.alarmSeverity !== "none"
                ? ALARM_COLORS[row.alarmSeverity]
                : undefined,
              opacity: disconnected ? 0.5 : 1,
            }}
          >
            {formatValue(row.value, row.precision ?? precision)}
          </span>
        );
      case "units":
        return (
          <span style={{ opacity: 0.7 }}>{row.units ?? ""}</span>
        );
      case "severity":
        return <SeverityBadge severity={row.alarmSeverity} />;
      case "status":
        return disconnected ? "Disconnected" : "Connected";
      default:
        return row[col] !== undefined ? String(row[col]) : "";
    }
  }

  return (
    <div className={`swapps-pv-table ${className ?? ""}`}>
      {filterable && (
        <input
          type="text"
          placeholder="Filter by name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          aria-label="Filter table rows"
          style={{
            width: "100%",
            padding: "8px 12px",
            marginBottom: "8px",
            fontSize: "0.875rem",
            border: "1px solid #e0e0e0",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
        />
      )}
      <table
        role="table"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.875rem",
        }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                onClick={() => handleSort(col)}
                style={{
                  textAlign: "left",
                  padding: "8px 12px",
                  borderBottom: "2px solid #e0e0e0",
                  cursor: sortable ? "pointer" : undefined,
                  userSelect: "none",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
                aria-sort={
                  sortCol === col
                    ? sortDir === "asc"
                      ? "ascending"
                      : "descending"
                    : undefined
                }
              >
                {COLUMN_HEADERS[col] ?? col}
                {sortCol === col && (sortDir === "asc" ? " ↑" : " ↓")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayRows.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td
                  key={col}
                  style={{
                    padding: "8px 12px",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  {renderCell(row, col)}
                </td>
              ))}
            </tr>
          ))}
          {displayRows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  padding: "24px 12px",
                  textAlign: "center",
                  opacity: 0.5,
                }}
              >
                {filterable && filter ? "No matching rows." : "No data."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
