import React from 'react';

interface PanelConfig {
  width?: number;
  height?: number;
  label: string;
  sublabel?: string;
}

interface LayoutConfig {
  appName: string;
  left?: PanelConfig;
  right?: PanelConfig;
  bottom?: PanelConfig;
  main: { label: string; sublabel?: string };
}

const HEADER_HEIGHT = 44;
const WIDTH = 480;
const HEIGHT = 280;
const TALL_HEIGHT = 310;

const layouts: Record<string, LayoutConfig> = {
  'header-only': {
    appName: 'SLAC · Dashboard',
    main: { label: 'Main Content', sublabel: 'Full-width workspace' },
  },
  'filter-sidebar': {
    appName: 'SLAC · Electronic Logbook',
    left: { width: 140, label: 'Filters', sublabel: 'collapsible' },
    main: { label: 'Main Content', sublabel: 'Filtered log entries' },
  },
  'side-nav': {
    appName: 'SLAC · Save Compare Restore',
    left: { width: 140, label: 'Navigation', sublabel: 'Save · Compare · Restore' },
    main: { label: 'Main Content', sublabel: 'Active section' },
  },
  'dual-sidebar': {
    appName: 'SLAC · Trace',
    left: { width: 120, label: 'Items', sublabel: 'PV list' },
    right: { width: 140, label: 'Properties', sublabel: 'Selected item' },
    main: { label: 'Main Content', sublabel: 'Plot canvas' },
  },
  'dual-sidebar-bottom': {
    appName: 'SLAC · Screen Builder',
    left: { width: 120, label: 'Assets', sublabel: 'Components · Screens' },
    right: { width: 140, label: 'Inspector', sublabel: 'Properties' },
    bottom: { height: 80, label: 'Code Preview', sublabel: 'collapsible' },
    main: { label: 'Canvas', sublabel: 'Visual editor' },
  },
};

interface ZoneRect {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  textFill: string;
  label: string;
  sublabel?: string;
}

function computeZones(config: LayoutConfig, totalHeight: number): ZoneRect[] {
  const leftW = config.left?.width || 0;
  const rightW = config.right?.width || 0;
  const bottomH = config.bottom?.height || 0;
  const contentH = totalHeight - HEADER_HEIGHT;
  const mainW = WIDTH - leftW - rightW;
  const mainH = contentH - bottomH;
  const zones: ZoneRect[] = [];

  if (config.left) {
    zones.push({
      x: 0, y: HEADER_HEIGHT, w: leftW, h: contentH,
      fill: 'var(--zone-left)', textFill: 'var(--zone-left-text)',
      label: config.left.label, sublabel: config.left.sublabel,
    });
  }

  zones.push({
    x: leftW, y: HEADER_HEIGHT, w: mainW, h: mainH,
    fill: 'var(--zone-main)', textFill: 'var(--zone-main-text)',
    label: config.main.label, sublabel: config.main.sublabel,
  });

  if (config.right) {
    zones.push({
      x: WIDTH - rightW, y: HEADER_HEIGHT, w: rightW, h: contentH,
      fill: 'var(--zone-right)', textFill: 'var(--zone-right-text)',
      label: config.right.label, sublabel: config.right.sublabel,
    });
  }

  if (config.bottom) {
    zones.push({
      x: leftW, y: HEADER_HEIGHT + mainH, w: mainW, h: bottomH,
      fill: 'var(--zone-bottom)', textFill: 'var(--zone-bottom-text)',
      label: config.bottom.label, sublabel: config.bottom.sublabel,
    });
  }

  return zones;
}

function computeSeparators(config: LayoutConfig, totalHeight: number) {
  const leftW = config.left?.width || 0;
  const rightW = config.right?.width || 0;
  const bottomH = config.bottom?.height || 0;
  const contentH = totalHeight - HEADER_HEIGHT;
  const mainH = contentH - bottomH;
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];

  lines.push({ x1: 0, y1: HEADER_HEIGHT, x2: WIDTH, y2: HEADER_HEIGHT });

  if (config.left) {
    lines.push({ x1: leftW, y1: HEADER_HEIGHT, x2: leftW, y2: totalHeight });
  }
  if (config.right) {
    lines.push({
      x1: WIDTH - rightW, y1: HEADER_HEIGHT,
      x2: WIDTH - rightW, y2: totalHeight,
    });
  }
  if (config.bottom) {
    lines.push({
      x1: leftW, y1: HEADER_HEIGHT + mainH,
      x2: leftW + (WIDTH - leftW - rightW), y2: HEADER_HEIGHT + mainH,
    });
  }

  return lines;
}

interface TagInfo {
  color: string;
  label: string;
}

function getTags(config: LayoutConfig): TagInfo[] {
  const tags: TagInfo[] = [
    { color: 'var(--zone-header)', label: 'AppHeader' },
  ];
  if (config.left) {
    tags.push({ color: 'var(--zone-left)', label: config.left.label });
  }
  tags.push({ color: 'var(--zone-main)', label: 'Main content' });
  if (config.right) {
    tags.push({ color: 'var(--zone-right)', label: config.right.label });
  }
  if (config.bottom) {
    tags.push({ color: 'var(--zone-bottom)', label: config.bottom.label });
  }
  return tags;
}

export function LayoutDiagram({ variant }: { variant: string }) {
  const config = layouts[variant];
  if (!config) return null;

  const totalHeight = config.bottom ? TALL_HEIGHT : HEIGHT;
  const zones = computeZones(config, totalHeight);
  const separators = computeSeparators(config, totalHeight);
  const tags = getTags(config);

  return (
    <div className="layout-diagram" role="figure" aria-label={`${config.appName} layout diagram`}>
      <svg
        viewBox={`0 0 ${WIDTH} ${totalHeight}`}
        style={{ width: '100%', maxWidth: WIDTH, display: 'block' }}
      >
        <rect width={WIDTH} height={totalHeight} fill="var(--zone-bg)" />

        <rect width={WIDTH} height={HEADER_HEIGHT} fill="var(--zone-header)" />
        <text
          x={16} y={27}
          fill="var(--zone-header-text)"
          fontSize={12} fontWeight={600} fontFamily="system-ui, sans-serif"
        >
          {config.appName}
        </text>
        <circle cx={WIDTH - 44} cy={22} r={3.5} fill="var(--zone-header-text)" opacity={0.4} />
        <circle cx={WIDTH - 28} cy={22} r={3.5} fill="var(--zone-header-text)" opacity={0.4} />
        <circle cx={WIDTH - 12} cy={22} r={3.5} fill="var(--zone-header-text)" opacity={0.4} />

        {zones.map((zone, i) => (
          <g key={i}>
            <rect x={zone.x} y={zone.y} width={zone.w} height={zone.h} fill={zone.fill} />
            <text
              x={zone.x + zone.w / 2}
              y={zone.y + zone.h / 2 - (zone.sublabel ? 6 : 0)}
              fill={zone.textFill}
              fontSize={11} fontWeight={600} textAnchor="middle"
              fontFamily="system-ui, sans-serif"
            >
              {zone.label}
            </text>
            {zone.sublabel && (
              <text
                x={zone.x + zone.w / 2}
                y={zone.y + zone.h / 2 + 12}
                fill={zone.textFill}
                fontSize={9} textAnchor="middle" opacity={0.7}
                fontFamily="system-ui, sans-serif"
              >
                {zone.sublabel}
              </text>
            )}
          </g>
        ))}

        {separators.map((line, i) => (
          <line
            key={i}
            x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
            stroke="var(--zone-stroke)" strokeWidth={1}
          />
        ))}
      </svg>

      <div className="layout-diagram__tags">
        {tags.map((tag, i) => (
          <span key={i} className="layout-diagram__tag">
            <span className="layout-diagram__dot" style={{ background: tag.color }} />
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
}
