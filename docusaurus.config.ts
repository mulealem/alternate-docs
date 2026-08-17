import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// Site config for PyGate alternate docs (Docusaurus 3).
// Deployed as a Coolify Static Site resource at https://alt-docs.payment.et
// (or whichever domain is configured at deploy time).
const config: Config = {
  // No `baseUrl` prefix needed — site is served from the domain root.
  // If you ever serve from a sub-path, set baseUrl to "/<sub-path>/"
  // and `url` to the parent host before building.
  title: "PyGate Docs",
  tagline: "Payment infrastructure for the Ethiopian market.",
  favicon: "img/favicon.svg",

  // Static URL — Docusaurus generates absolute URLs from this at build time.
  // Override at deploy time via DOCS_URL build argument (or hardcode here).
  url: "https://alt-docs.payment.et",
  baseUrl: "/",

  organizationName: "pygate",
  projectName: "alternate-docs",

  onBrokenLinks: "throw",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  // i18n disabled — single locale for v1.
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          // Single docs instance — sidebar generated from category metadata.
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/",
        },
        blog: false, // No blog for v1.
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/social-card.png",
    colorMode: {
      defaultMode: "light",
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "PyGate Docs",
      logo: {
        alt: "PyGate",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "mainSidebar",
          position: "left",
          label: "Docs",
        },
        {
          href: "https://dashboard.payment.et",
          label: "Dashboard",
          position: "right",
        },
        {
          href: "https://github.com/mulealem",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            { label: "Introduction", to: "/" },
            { label: "Quickstart", to: "/quickstart" },
            { label: "API Reference", to: "/api-reference" },
          ],
        },
        {
          title: "PyGate",
          items: [
            { label: "Dashboard", href: "https://dashboard.payment.et" },
            { label: "Checkout", href: "https://checkout.payment.et" },
          ],
        },
        {
          title: "More",
          items: [
            { label: "GitHub", href: "https://github.com/mulealem" },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} PyGate. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
