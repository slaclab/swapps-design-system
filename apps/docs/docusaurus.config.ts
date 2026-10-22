import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "SWAPPS Design System",
  tagline: "A shared foundation for consistent software interfaces",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: "https://slaclab.github.io",
  baseUrl: "/swapps-design-system/",

  organizationName: "slaclab",
  projectName: "swapps-design-system",

  onBrokenLinks: "throw",

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
    mdx1Compat: {
      admonitions: true,
    },
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: ["docusaurus-plugin-sass"],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "SWAPPS Design System",
      items: [
        {
          type: "docSidebar",
          sidebarId: "mainSidebar",
          position: "left",
          label: "Documentation",
        },
        {
          href: "https://github.com/slaclab/swapps-design-system",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentation",
          items: [
            { label: "Getting Started", to: "/docs/getting-started/overview" },
            { label: "Foundations", to: "/docs/foundations/design-principles" },
            { label: "Components", to: "/docs/components/overview" },
          ],
        },
        {
          title: "Themes",
          items: [
            { label: "Overview", to: "/docs/themes/overview" },
            { label: "Configuration", to: "/docs/themes/configuration" },
          ],
        },
        {
          title: "Development",
          items: [
            { label: "Setup", to: "/docs/development/setup" },
            { label: "Contributing", to: "/docs/development/contributing" },
          ],
        },
      ],
      copyright: `SWAPPS Design System — Developed and maintained by SWAPPS at SLAC National Accelerator Laboratory.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "json"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
