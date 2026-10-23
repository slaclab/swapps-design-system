import React from "react";

export interface TemplateRepeaterProps<T = unknown> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  layout?: "list" | "grid" | "horizontal";
  columns?: number;
  gap?: number | string;
  loading?: boolean;
  emptyMessage?: string | React.ReactNode;
  keyExtractor?: (item: T, index: number) => string;
  className?: string;
}

function resolveKey<T>(
  item: T,
  index: number,
  keyExtractor?: (item: T, index: number) => string
): string {
  if (keyExtractor) return keyExtractor(item, index);
  if (item != null && typeof item === "object" && "id" in item) {
    return String((item as Record<string, unknown>).id);
  }
  return String(index);
}

function SkeletonPlaceholder() {
  return (
    <div
      role="listitem"
      aria-hidden="true"
      style={{
        height: "40px",
        borderRadius: "4px",
        backgroundColor: "#e0e0e0",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    />
  );
}

export function TemplateRepeater<T = unknown>({
  data,
  renderItem,
  layout = "list",
  columns = 3,
  gap = "1rem",
  loading = false,
  emptyMessage,
  keyExtractor,
  className,
}: TemplateRepeaterProps<T>) {
  const layoutStyle: React.CSSProperties =
    layout === "grid"
      ? {
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap,
        }
      : layout === "horizontal"
        ? {
            display: "flex",
            flexWrap: "wrap",
            gap,
          }
        : {
            display: "flex",
            flexDirection: "column",
            gap,
          };

  if (loading) {
    return (
      <div
        className={`swapps-template-repeater ${className ?? ""}`}
        role="list"
        aria-busy="true"
        aria-label="Loading items"
        style={layoutStyle}
      >
        {Array.from({ length: columns }, (_, i) => (
          <SkeletonPlaceholder key={i} />
        ))}
      </div>
    );
  }

  if (data.length === 0 && emptyMessage) {
    return (
      <div
        className={`swapps-template-repeater ${className ?? ""}`}
        role="list"
        aria-label="No items"
        style={layoutStyle}
      >
        <div role="listitem" style={{ color: "#8d8d8d", fontStyle: "italic" }}>
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`swapps-template-repeater ${className ?? ""}`}
      role="list"
      style={layoutStyle}
    >
      {data.map((item, index) => (
        <div key={resolveKey(item, index, keyExtractor)} role="listitem">
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}
