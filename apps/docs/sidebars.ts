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
        {
          type: "category",
          label: "General UI",
          link: { type: "doc", id: "components/general-ui/index" },
          items: [
            "components/general-ui/app-header",
            "components/general-ui/app-shell",
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
        "development/carbon-integration",
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
