import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  mainSidebar: [
    {
      type: "category",
      label: "Getting Started",
      collapsed: false,
      items: [
        "getting-started/overview",
        "getting-started/quick-start",
        "getting-started/packages",
      ],
    },
    {
      type: "category",
      label: "Themes & Branding",
      collapsed: false,
      items: [
        "themes/overview",
        "themes/configuration",
        "themes/custom-themes",
      ],
    },
    {
      type: "category",
      label: "Components",
      link: { type: "doc", id: "components/overview" },
      items: [
        "components/carbon-primitives",
        {
          type: "category",
          label: "General UI",
          link: { type: "doc", id: "components/general-ui/index" },
          items: [
            "components/general-ui/app-header",
            "components/general-ui/app-shell",
          ],
        },
        {
          type: "category",
          label: "Scientific Controls",
          link: { type: "doc", id: "components/scientific-controls/index" },
          items: [
            "components/scientific-controls/pv-label",
            "components/scientific-controls/byte-indicator",
            "components/scientific-controls/scale-indicator",
            "components/scientific-controls/multi-state-indicator",
            "components/scientific-controls/pv-symbol",
            "components/scientific-controls/analog-gauge",
            "components/scientific-controls/image-viewer",
            "components/scientific-controls/pv-table",
            "components/scientific-controls/embedded-display",
            "components/scientific-controls/template-repeater",
          ],
        },
        {
          type: "category",
          label: "Charts & Visualization",
          link: { type: "doc", id: "components/charts-visualization/index" },
          items: [
            "components/charts-visualization/swapps-chart",
            "components/charts-visualization/theme-and-styling",
            "components/charts-visualization/palettes",
            "components/charts-visualization/utilities",
            "components/charts-visualization/time-series",
            "components/charts-visualization/waveform",
            "components/charts-visualization/scatter-plot",
            "components/charts-visualization/event-plot",
            "components/charts-visualization/archiver-plot",
            "components/charts-visualization/formula-curves",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Foundations",
      items: [
        "foundations/design-principles",
        "foundations/colors",
        "foundations/typography",
        "foundations/spacing",
        "foundations/accessibility",
        "foundations/light-dark-mode",
      ],
    },
    {
      type: "category",
      label: "Patterns",
      items: [
        "patterns/navigation",
        "patterns/loading-states",
        "patterns/empty-states",
        "patterns/error-handling",
      ],
    },
    {
      type: "category",
      label: "Development",
      items: [
        "development/setup",
        "development/component-development",
        "development/styling",
        "development/versioning",
        "development/contributing",
      ],
    },
    {
      type: "category",
      label: "Resources",
      items: [
        "resources/roadmap",
        "resources/changelog",
      ],
    },
  ],
};

export default sidebars;
