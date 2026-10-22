import React from "react";
import ComponentCardThumbnail from "./ComponentCardThumbnail";

type PackageId = "general-ui" | "controls" | "charts";

const PACKAGE_CONTENTS: Record<
  PackageId,
  { id: React.ComponentProps<typeof ComponentCardThumbnail>["id"]; label: string }[]
> = {
  "general-ui": [
    { id: "app-shell", label: "App Shell" },
  ],
  controls: [
    { id: "controls", label: "Controls" },
  ],
  charts: [
    { id: "charts", label: "Charts" },
  ],
};

export default function PackageCardThumbnail({ id }: { id: PackageId }) {
  const items = PACKAGE_CONTENTS[id];
  if (!items) return null;

  return (
    <div className="swapps-package-card__grid">
      {items.map((item) => (
        <div key={item.id} className="swapps-package-card__grid-item">
          <ComponentCardThumbnail id={item.id} />
          <span className="swapps-package-card__grid-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
