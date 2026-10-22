import React from "react";

type ThumbnailId =
  | "general-ui"
  | "carbon"
  | "controls"
  | "charts"
  | "app-header"
  | "navigation"
  | "app-shell"
  | "buttons"
  | "forms"
  | "data-tables"
  | "dialogs"
  | "notifications";

function GeneralUI() {
  return (
    <svg viewBox="0 0 240 120" aria-hidden="true">
      {/* Header bar */}
      <rect x="0" y="0" width="240" height="24" rx="2" fill="var(--thumb-accent)" />
      <rect x="8" y="7" width="40" height="10" rx="2" fill="var(--thumb-fg)" opacity="0.9" />
      <rect x="56" y="9" width="24" height="6" rx="1" fill="var(--thumb-fg)" opacity="0.5" />
      <rect x="84" y="9" width="24" height="6" rx="1" fill="var(--thumb-fg)" opacity="0.5" />
      {/* Sidebar */}
      <rect x="0" y="26" width="56" height="94" fill="var(--thumb-muted)" />
      <rect x="8" y="34" width="40" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.3" />
      <rect x="8" y="44" width="36" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.3" />
      <rect x="8" y="54" width="38" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.3" />
      {/* Content area */}
      <rect x="64" y="34" width="100" height="8" rx="2" fill="var(--thumb-fg)" opacity="0.25" />
      <rect x="64" y="50" width="168" height="4" rx="1" fill="var(--thumb-fg)" opacity="0.12" />
      <rect x="64" y="58" width="150" height="4" rx="1" fill="var(--thumb-fg)" opacity="0.12" />
      <rect x="64" y="72" width="72" height="28" rx="3" fill="var(--thumb-muted)" />
      <rect x="144" y="72" width="72" height="28" rx="3" fill="var(--thumb-muted)" />
    </svg>
  );
}

function Carbon() {
  return (
    <svg viewBox="0 0 240 120" aria-hidden="true">
      {/* Buttons row */}
      <rect x="16" y="12" width="64" height="24" rx="2" fill="var(--thumb-accent)" />
      <rect x="24" y="20" width="48" height="8" rx="1" fill="var(--thumb-fg)" opacity="0.9" />
      <rect x="88" y="12" width="64" height="24" rx="2" fill="var(--thumb-muted)" />
      <rect x="96" y="20" width="48" height="8" rx="1" fill="var(--thumb-fg)" opacity="0.4" />
      {/* Input */}
      <rect x="16" y="48" width="208" height="28" rx="2" fill="var(--thumb-bg)" stroke="var(--thumb-fg)" strokeOpacity="0.2" strokeWidth="1" />
      <rect x="24" y="42" width="36" height="6" rx="1" fill="var(--thumb-fg)" opacity="0.4" />
      <rect x="24" y="58" width="80" height="6" rx="1" fill="var(--thumb-fg)" opacity="0.2" />
      {/* Toggle */}
      <rect x="16" y="88" width="32" height="16" rx="8" fill="var(--thumb-accent)" />
      <circle cx="40" cy="96" r="6" fill="var(--thumb-fg)" opacity="0.9" />
      <rect x="56" y="92" width="48" height="6" rx="1" fill="var(--thumb-fg)" opacity="0.3" />
    </svg>
  );
}

function Controls() {
  return (
    <svg viewBox="0 0 240 120" aria-hidden="true">
      {/* Status indicators */}
      <circle cx="28" cy="24" r="8" fill="#24a148" />
      <rect x="44" y="19" width="48" height="6" rx="1" fill="var(--thumb-fg)" opacity="0.4" />
      <rect x="44" y="28" width="32" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.2" />
      <circle cx="28" cy="52" r="8" fill="#f1c21b" />
      <rect x="44" y="47" width="48" height="6" rx="1" fill="var(--thumb-fg)" opacity="0.4" />
      <rect x="44" y="56" width="32" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.2" />
      <circle cx="28" cy="80" r="8" fill="#da1e28" />
      <rect x="44" y="75" width="48" height="6" rx="1" fill="var(--thumb-fg)" opacity="0.4" />
      <rect x="44" y="84" width="32" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.2" />
      {/* Readback display */}
      <rect x="120" y="12" width="104" height="48" rx="4" fill="var(--thumb-muted)" />
      <rect x="128" y="18" width="48" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.3" />
      <rect x="128" y="30" width="72" height="14" rx="2" fill="var(--thumb-fg)" opacity="0.15" />
      <rect x="132" y="34" width="40" height="8" rx="1" fill="var(--thumb-accent)" opacity="0.8" />
      {/* Slider */}
      <rect x="120" y="76" width="104" height="4" rx="2" fill="var(--thumb-fg)" opacity="0.15" />
      <rect x="120" y="76" width="56" height="4" rx="2" fill="var(--thumb-accent)" />
      <circle cx="176" cy="78" r="7" fill="var(--thumb-accent)" />
      <circle cx="176" cy="78" r="4" fill="var(--thumb-fg)" opacity="0.9" />
    </svg>
  );
}

function Charts() {
  return (
    <svg viewBox="0 0 240 120" aria-hidden="true">
      {/* Axes */}
      <line x1="32" y1="8" x2="32" y2="100" stroke="var(--thumb-fg)" strokeOpacity="0.2" strokeWidth="1" />
      <line x1="32" y1="100" x2="228" y2="100" stroke="var(--thumb-fg)" strokeOpacity="0.2" strokeWidth="1" />
      {/* Grid lines */}
      <line x1="32" y1="32" x2="228" y2="32" stroke="var(--thumb-fg)" strokeOpacity="0.06" strokeWidth="1" />
      <line x1="32" y1="56" x2="228" y2="56" stroke="var(--thumb-fg)" strokeOpacity="0.06" strokeWidth="1" />
      <line x1="32" y1="78" x2="228" y2="78" stroke="var(--thumb-fg)" strokeOpacity="0.06" strokeWidth="1" />
      {/* Line series 1 */}
      <polyline points="32,72 64,60 96,64 128,40 160,44 192,24 224,32" fill="none" stroke="#6929c4" strokeWidth="2" />
      {/* Line series 2 */}
      <polyline points="32,88 64,80 96,76 128,68 160,72 192,56 224,48" fill="none" stroke="#1192e8" strokeWidth="2" />
      {/* Legend */}
      <rect x="64" y="108" width="12" height="4" rx="1" fill="#6929c4" />
      <rect x="80" y="108" width="24" height="4" rx="1" fill="var(--thumb-fg)" opacity="0.3" />
      <rect x="116" y="108" width="12" height="4" rx="1" fill="#1192e8" />
      <rect x="132" y="108" width="24" height="4" rx="1" fill="var(--thumb-fg)" opacity="0.3" />
    </svg>
  );
}

function AppHeaderThumb() {
  return (
    <svg viewBox="0 0 240 120" aria-hidden="true">
      {/* Header bar */}
      <rect x="0" y="24" width="240" height="32" rx="2" fill="var(--thumb-accent)" />
      {/* Logo placeholder */}
      <rect x="10" y="32" width="16" height="16" rx="3" fill="var(--thumb-fg)" opacity="0.7" />
      {/* Org prefix + title */}
      <rect x="32" y="33" width="24" height="7" rx="1" fill="var(--thumb-fg)" opacity="0.6" />
      <rect x="60" y="33" width="56" height="7" rx="1" fill="var(--thumb-fg)" opacity="0.9" />
      {/* Nav items */}
      <rect x="130" y="35" width="28" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.45" />
      <rect x="164" y="35" width="20" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.45" />
      <rect x="190" y="35" width="24" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.45" />
      {/* Global action icon */}
      <circle cx="228" cy="40" r="6" fill="var(--thumb-fg)" opacity="0.35" />
      {/* Content below */}
      <rect x="16" y="68" width="120" height="8" rx="2" fill="var(--thumb-fg)" opacity="0.15" />
      <rect x="16" y="82" width="208" height="4" rx="1" fill="var(--thumb-fg)" opacity="0.08" />
      <rect x="16" y="90" width="180" height="4" rx="1" fill="var(--thumb-fg)" opacity="0.08" />
    </svg>
  );
}

function NavigationThumb() {
  return (
    <svg viewBox="0 0 240 120" aria-hidden="true">
      {/* Side panel */}
      <rect x="0" y="0" width="64" height="120" fill="var(--thumb-muted)" />
      {/* Nav items */}
      <rect x="12" y="12" width="40" height="6" rx="1" fill="var(--thumb-fg)" opacity="0.4" />
      <rect x="8" y="26" width="48" height="8" rx="2" fill="var(--thumb-accent)" opacity="0.6" />
      <rect x="14" y="29" width="36" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.8" />
      <rect x="12" y="42" width="40" height="6" rx="1" fill="var(--thumb-fg)" opacity="0.3" />
      <rect x="12" y="56" width="36" height="6" rx="1" fill="var(--thumb-fg)" opacity="0.3" />
      <rect x="12" y="70" width="42" height="6" rx="1" fill="var(--thumb-fg)" opacity="0.3" />
      {/* Divider */}
      <line x1="12" y1="84" x2="52" y2="84" stroke="var(--thumb-fg)" strokeOpacity="0.12" strokeWidth="1" />
      <rect x="12" y="92" width="34" height="6" rx="1" fill="var(--thumb-fg)" opacity="0.2" />
      {/* Content area */}
      <rect x="80" y="16" width="120" height="8" rx="2" fill="var(--thumb-fg)" opacity="0.15" />
      <rect x="80" y="32" width="148" height="4" rx="1" fill="var(--thumb-fg)" opacity="0.08" />
      <rect x="80" y="40" width="140" height="4" rx="1" fill="var(--thumb-fg)" opacity="0.08" />
    </svg>
  );
}

function AppShellThumb() {
  return (
    <svg viewBox="0 0 240 120" aria-hidden="true">
      {/* Header */}
      <rect x="0" y="0" width="240" height="20" rx="2" fill="var(--thumb-accent)" />
      <rect x="8" y="6" width="48" height="8" rx="1" fill="var(--thumb-fg)" opacity="0.8" />
      {/* Sidebar */}
      <rect x="0" y="22" width="52" height="98" fill="var(--thumb-muted)" />
      <rect x="8" y="30" width="36" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.3" />
      <rect x="8" y="40" width="36" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.3" />
      <rect x="8" y="50" width="32" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.3" />
      {/* Content */}
      <rect x="60" y="28" width="88" height="7" rx="2" fill="var(--thumb-fg)" opacity="0.18" />
      <rect x="60" y="42" width="170" height="4" rx="1" fill="var(--thumb-fg)" opacity="0.08" />
      <rect x="60" y="50" width="156" height="4" rx="1" fill="var(--thumb-fg)" opacity="0.08" />
      {/* Cards */}
      <rect x="60" y="62" width="80" height="48" rx="3" fill="var(--thumb-muted)" />
      <rect x="148" y="62" width="80" height="48" rx="3" fill="var(--thumb-muted)" />
    </svg>
  );
}

function ButtonsThumb() {
  return (
    <svg viewBox="0 0 240 120" aria-hidden="true">
      {/* Primary */}
      <rect x="24" y="16" width="80" height="28" rx="2" fill="var(--thumb-accent)" />
      <rect x="40" y="26" width="48" height="8" rx="1" fill="var(--thumb-fg)" opacity="0.9" />
      {/* Secondary */}
      <rect x="116" y="16" width="80" height="28" rx="2" fill="var(--thumb-muted)" />
      <rect x="132" y="26" width="48" height="8" rx="1" fill="var(--thumb-fg)" opacity="0.5" />
      {/* Danger */}
      <rect x="24" y="56" width="80" height="28" rx="2" fill="#da1e28" opacity="0.85" />
      <rect x="44" y="66" width="40" height="8" rx="1" fill="#fff" opacity="0.9" />
      {/* Ghost */}
      <rect x="116" y="56" width="80" height="28" rx="2" fill="none" stroke="var(--thumb-fg)" strokeOpacity="0.2" strokeWidth="1" />
      <rect x="136" y="66" width="40" height="8" rx="1" fill="var(--thumb-fg)" opacity="0.3" />
      {/* Icon button */}
      <rect x="24" y="96" width="28" height="16" rx="2" fill="var(--thumb-accent)" opacity="0.5" />
      <circle cx="38" cy="104" r="4" fill="var(--thumb-fg)" opacity="0.6" />
    </svg>
  );
}

function FormsThumb() {
  return (
    <svg viewBox="0 0 240 120" aria-hidden="true">
      {/* Label + text input */}
      <rect x="20" y="8" width="40" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.4" />
      <rect x="20" y="16" width="200" height="24" rx="2" fill="var(--thumb-bg)" stroke="var(--thumb-fg)" strokeOpacity="0.2" strokeWidth="1" />
      <rect x="28" y="25" width="80" height="6" rx="1" fill="var(--thumb-fg)" opacity="0.15" />
      {/* Label + dropdown */}
      <rect x="20" y="50" width="48" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.4" />
      <rect x="20" y="58" width="200" height="24" rx="2" fill="var(--thumb-bg)" stroke="var(--thumb-fg)" strokeOpacity="0.2" strokeWidth="1" />
      <rect x="28" y="67" width="60" height="6" rx="1" fill="var(--thumb-fg)" opacity="0.25" />
      <polygon points="208,67 214,67 211,73" fill="var(--thumb-fg)" opacity="0.3" />
      {/* Checkbox row */}
      <rect x="20" y="92" width="12" height="12" rx="2" fill="var(--thumb-accent)" />
      <polyline points="23,98 26,101 32,95" fill="none" stroke="var(--thumb-fg)" strokeWidth="1.5" opacity="0.9" />
      <rect x="38" y="95" width="56" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.3" />
    </svg>
  );
}

function DataTablesThumb() {
  return (
    <svg viewBox="0 0 240 120" aria-hidden="true">
      {/* Header row */}
      <rect x="12" y="10" width="216" height="20" rx="2" fill="var(--thumb-muted)" />
      <rect x="20" y="17" width="40" height="6" rx="1" fill="var(--thumb-fg)" opacity="0.5" />
      <rect x="90" y="17" width="36" height="6" rx="1" fill="var(--thumb-fg)" opacity="0.5" />
      <rect x="160" y="17" width="44" height="6" rx="1" fill="var(--thumb-fg)" opacity="0.5" />
      {/* Row 1 */}
      <line x1="12" y1="36" x2="228" y2="36" stroke="var(--thumb-fg)" strokeOpacity="0.08" strokeWidth="1" />
      <rect x="20" y="38" width="48" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.25" />
      <rect x="90" y="38" width="32" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.2" />
      <rect x="160" y="38" width="40" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.2" />
      {/* Row 2 */}
      <line x1="12" y1="50" x2="228" y2="50" stroke="var(--thumb-fg)" strokeOpacity="0.08" strokeWidth="1" />
      <rect x="20" y="54" width="44" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.25" />
      <rect x="90" y="54" width="28" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.2" />
      <rect x="160" y="54" width="48" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.2" />
      {/* Row 3 */}
      <line x1="12" y1="66" x2="228" y2="66" stroke="var(--thumb-fg)" strokeOpacity="0.08" strokeWidth="1" />
      <rect x="20" y="70" width="52" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.25" />
      <rect x="90" y="70" width="36" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.2" />
      <rect x="160" y="70" width="36" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.2" />
      {/* Row 4 */}
      <line x1="12" y1="82" x2="228" y2="82" stroke="var(--thumb-fg)" strokeOpacity="0.08" strokeWidth="1" />
      <rect x="20" y="86" width="40" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.25" />
      <rect x="90" y="86" width="32" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.2" />
      <rect x="160" y="86" width="44" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.2" />
      {/* Border */}
      <rect x="12" y="10" width="216" height="86" rx="2" fill="none" stroke="var(--thumb-fg)" strokeOpacity="0.1" strokeWidth="1" />
    </svg>
  );
}

function DialogsThumb() {
  return (
    <svg viewBox="0 0 240 120" aria-hidden="true">
      {/* Backdrop */}
      <rect x="0" y="0" width="240" height="120" fill="var(--thumb-fg)" opacity="0.06" />
      {/* Modal */}
      <rect x="36" y="16" width="168" height="88" rx="4" fill="var(--thumb-bg)" stroke="var(--thumb-fg)" strokeOpacity="0.15" strokeWidth="1" />
      {/* Title */}
      <rect x="48" y="28" width="96" height="8" rx="2" fill="var(--thumb-fg)" opacity="0.35" />
      {/* Close icon */}
      <line x1="188" y1="24" x2="194" y2="30" stroke="var(--thumb-fg)" strokeOpacity="0.3" strokeWidth="1.5" />
      <line x1="194" y1="24" x2="188" y2="30" stroke="var(--thumb-fg)" strokeOpacity="0.3" strokeWidth="1.5" />
      {/* Body text */}
      <rect x="48" y="46" width="144" height="4" rx="1" fill="var(--thumb-fg)" opacity="0.12" />
      <rect x="48" y="54" width="120" height="4" rx="1" fill="var(--thumb-fg)" opacity="0.12" />
      {/* Buttons */}
      <rect x="108" y="72" width="44" height="20" rx="2" fill="var(--thumb-muted)" />
      <rect x="114" y="79" width="32" height="6" rx="1" fill="var(--thumb-fg)" opacity="0.35" />
      <rect x="156" y="72" width="44" height="20" rx="2" fill="var(--thumb-accent)" />
      <rect x="164" y="79" width="28" height="6" rx="1" fill="var(--thumb-fg)" opacity="0.8" />
    </svg>
  );
}

function NotificationsThumb() {
  return (
    <svg viewBox="0 0 240 120" aria-hidden="true">
      {/* Success notification */}
      <rect x="16" y="8" width="208" height="32" rx="2" fill="var(--thumb-bg)" stroke="#24a148" strokeWidth="1.5" />
      <rect x="16" y="8" width="3" height="32" rx="1" fill="#24a148" />
      <circle cx="32" cy="24" r="5" fill="#24a148" opacity="0.8" />
      <rect x="44" y="19" width="56" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.4" />
      <rect x="44" y="27" width="120" height="4" rx="1" fill="var(--thumb-fg)" opacity="0.15" />
      {/* Warning notification */}
      <rect x="16" y="48" width="208" height="32" rx="2" fill="var(--thumb-bg)" stroke="#f1c21b" strokeWidth="1.5" />
      <rect x="16" y="48" width="3" height="32" rx="1" fill="#f1c21b" />
      <polygon points="32,56 27,66 37,66" fill="#f1c21b" opacity="0.8" />
      <rect x="44" y="59" width="48" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.4" />
      <rect x="44" y="67" width="136" height="4" rx="1" fill="var(--thumb-fg)" opacity="0.15" />
      {/* Error notification */}
      <rect x="16" y="88" width="208" height="28" rx="2" fill="var(--thumb-bg)" stroke="#da1e28" strokeWidth="1.5" />
      <rect x="16" y="88" width="3" height="28" rx="1" fill="#da1e28" />
      <circle cx="32" cy="102" r="5" fill="#da1e28" opacity="0.8" />
      <rect x="44" y="98" width="40" height="5" rx="1" fill="var(--thumb-fg)" opacity="0.4" />
      <rect x="44" y="106" width="100" height="4" rx="1" fill="var(--thumb-fg)" opacity="0.15" />
    </svg>
  );
}

const THUMBNAILS: Record<ThumbnailId, React.FC> = {
  "general-ui": GeneralUI,
  carbon: Carbon,
  controls: Controls,
  charts: Charts,
  "app-header": AppHeaderThumb,
  navigation: NavigationThumb,
  "app-shell": AppShellThumb,
  buttons: ButtonsThumb,
  forms: FormsThumb,
  "data-tables": DataTablesThumb,
  dialogs: DialogsThumb,
  notifications: NotificationsThumb,
};

export default function ComponentCardThumbnail({ id }: { id: ThumbnailId }) {
  const Thumb = THUMBNAILS[id];
  if (!Thumb) return null;
  return (
    <div className="swapps-component-card__thumb">
      <Thumb />
    </div>
  );
}
