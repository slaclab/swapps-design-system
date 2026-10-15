import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  mainSidebar: [
    {
      type: "category",
      label: "Getting Started",
      collapsed: false,
      items: [
        "getting-started/introduction",
        "getting-started/installation",
        "getting-started/usage",
        "getting-started/adoption-guide",
        "getting-started/contributing",
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
      label: "Components",
      items: [
        "components/overview",
        "components/app-header",
        "components/navigation",
        "components/app-shell",
        "components/buttons",
        "components/forms",
        "components/data-tables",
        "components/dialogs",
        "components/notifications",
      ],
    },
    {
      type: "category",
      label: "Patterns",
      items: [
        "patterns/application-layouts",
        "patterns/navigation-patterns",
        "patterns/loading-states",
        "patterns/empty-states",
        "patterns/error-handling",
      ],
    },
    {
      type: "category",
      label: "Themes",
      items: [
        "themes/overview",
        "themes/configuration",
        "themes/custom-themes",
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
