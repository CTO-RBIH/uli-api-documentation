// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import type * as Plugin from "@docusaurus/types/src/plugin";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

const config: Config = {
  title: "RBIH Developer Portal",
  tagline: "Frictionless Finance for a Billion Indians™",
  url: "https://rbih.tech",
  baseUrl: "/",
  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.png",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "rbih", // Usually your GitHub org/user name.
  projectName: "rbih-docs", // Usually your repo name.
  deploymentBranch: "gh-pages",
  trailingSlash: false,

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.ts"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/rbih/rbih-docs/tree/main/",
          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
          lastVersion: '1.0.0',
          includeCurrentVersion: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig:
    {
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: "Developer Portal",
        logo: {
          alt: "RBIH Logo",
          src: "img/rbih-logo.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Documentation",
          },
          {
            label: "RBIH API",
            position: "left",
            to: "/docs/next/rbih-apis",
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownItemsAfter: [{to: '/versions', label: 'All versions'}],
            dropdownActiveClassDisabled: true,
          },
          {
            href: "https://github.com/rbih/rbih-docs",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "About Us",
            items: [
              {
                label: "Who We Are",
                href: "https://rbihub.in/who-we-are/",
              },
              {
                label: "Our Team",
                href: "https://rbihub.in/our-team/",
              },
              {
                label: "Careers",
                href: "https://rbihub.in/careers/",
              },
            ],
          },
          {
            title: "Documentation",
            items: [
              {
                label: "Get Started",
                to: "/docs/next/rbih-apis",
              },
              {
                label: "API Reference",
                to: "/docs/next/rbih-apis",
              },
              {
                label: "All Versions",
                to: "/versions",
              },
            ],
          },
          {
            title: "Useful Links",
            items: [
              {
                label: "RBIH Website",
                href: "https://rbihub.in/",
              },
              {
                label: "Reserve Bank of India",
                href: "https://www.rbi.org.in/",
              },
              {
                label: "Resources",
                href: "https://rbihub.in/resources/",
              },
              {
                label: "Contact Us",
                href: "https://rbihub.in/contact-us/",
              },
            ],
          },
          {
            title: "Legal",
            items: [
              {
                label: "Terms of Use",
                href: "https://rbihub.in/terms-of-use/",
              },
              {
                label: "Privacy Policy",
                href: "https://rbihub.in/privacy-policy/",
              },
              {
                label: "Whistleblower Policy",
                href: "https://rbihub.in/whistleblower-policy/",
              },
            ],
          },
          {
            title: "Connect",
            items: [
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/reserve-bank-innovation-hub/",
              },
              {
                label: "Twitter",
                href: "https://x.com/rbihub",
              },
              {
                label: "YouTube",
                href: "https://www.youtube.com/@RBIHub",
              },
              {
                label: "Instagram",
                href: "https://www.instagram.com/rbihub/",
              },
            ],
          },
        ],
        copyright: `
          <div style="margin-bottom: 1rem;">
            <div><strong>Reserve Bank Innovation Hub (RBIH)</strong></div>
            <div>Keonics - K Wing, 4th Floor, 27th Main, 1st Sector, HSR Layout, Bengaluru- 560102</div>
            <div>Email: <a href="mailto:communications@rbihub.in">communications@rbihub.in</a></div>
            <div>CIN: U72900KA2021NPL178293 | GSTN: 29AAKCR9018A1ZB</div>
          </div>
          <div>Copyright © ${new Date().getFullYear()} Reserve Bank Innovation Hub. All Rights Reserved.</div>
        `,
      },
      prism: {
        additionalLanguages: [
          "ruby",
          "csharp",
          "php",
          "java",
          "powershell",
          "json",
          "bash",
          "dart",
          "objectivec",
          "r",
        ],
      },
      languageTabs: [
        {
          highlight: "python",
          language: "python",
          logoClass: "python",
        },
        {
          highlight: "bash",
          language: "curl",
          logoClass: "curl",
        },
        {
          highlight: "csharp",
          language: "csharp",
          logoClass: "csharp",
        },
        {
          highlight: "go",
          language: "go",
          logoClass: "go",
        },
        {
          highlight: "javascript",
          language: "nodejs",
          logoClass: "nodejs",
        },
        {
          highlight: "ruby",
          language: "ruby",
          logoClass: "ruby",
        },
        {
          highlight: "php",
          language: "php",
          logoClass: "php",
        },
        {
          highlight: "java",
          language: "java",
          logoClass: "java",
          variant: "unirest",
        },
        {
          highlight: "powershell",
          language: "powershell",
          logoClass: "powershell",
        },
        {
          highlight: "dart",
          language: "dart",
          logoClass: "dart",
        },
        {
          highlight: "javascript",
          language: "javascript",
          logoClass: "javascript",
        },
        {
          highlight: "c",
          language: "c",
          logoClass: "c",
        },
        {
          highlight: "objective-c",
          language: "objective-c",
          logoClass: "objective-c",
        },
        {
          highlight: "ocaml",
          language: "ocaml",
          logoClass: "ocaml",
        },
        {
          highlight: "r",
          language: "r",
          logoClass: "r",
        },
        {
          highlight: "swift",
          language: "swift",
          logoClass: "swift",
        },
        {
          highlight: "kotlin",
          language: "kotlin",
          logoClass: "kotlin",
        },
        {
          highlight: "rust",
          language: "rust",
          logoClass: "rust",
        },
      ],
    } satisfies Preset.ThemeConfig,

  plugins: [
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "openapi",
        docsPluginId: "classic",
        config: {
          "document-verification": {
            specPath: "specs/document-verification-dl-v1.0.yaml",
            outputDir: "docs/document-verification",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          "aadhaar-redact": {
            specPath: "specs/aadhaar-redact-v1.0.yaml",
            outputDir: "docs/aadhaar-redact",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          "facematch": {
            specPath: "specs/facematch-v1.0.yaml",
            outputDir: "docs/facematch",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          "voter-verification": {
            specPath: "specs/voter-verification-v1.0.yaml",
            outputDir: "docs/voter-verification",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          "identity-verification": {
            specPath: "specs/identity-verification-v1.1.yaml",
            outputDir: "docs/identity-verification",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          "pan-verification": {
            specPath: "specs/pan-verification-v1.3.yaml",
            outputDir: "docs/pan-verification",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          "bank-account-verification": {
            specPath: "specs/bank-account-verification-v1.0.yaml",
            outputDir: "docs/bank-account-verification",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          "gstn-service": {
            specPath: "specs/gstn-service-v1.0.yaml",
            outputDir: "docs/gstn-service",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          "account-aggregator": {
            specPath: "specs/account-aggregator-v1.3.yaml",
            outputDir: "docs/account-aggregator",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          "lrs-owner-details": {
            specPath: "specs/lrs-owner-details-v1.5.yaml",
            outputDir: "docs/lrs-owner-details",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          "lrs-lien-marking": {
            specPath: "specs/lrs-lien-marking-v1.5.yaml",
            outputDir: "docs/lrs-lien-marking",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          "translation-transliteration": {
            specPath: "specs/translation-transliteration-v1.3.yaml",
            outputDir: "docs/translation-transliteration",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          "legal-verification": {
            specPath: "specs/legal-verification-v1.1.yaml",
            outputDir: "docs/legal-verification",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          "farm-yield-multiland": {
            specPath: "specs/farm-yield-multiland-v1.7.yaml",
            outputDir: "docs/farm-yield-multiland",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          "pan-protean": {
            specPath: "specs/pan-protean-v1.0.yaml",
            outputDir: "docs/pan-protean",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          "dgv": {
            specPath: "specs/dgv-v1.0.yaml",
            outputDir: "docs/dgv",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          "esign-protean": {
            specPath: "specs/esign-protean-v1.0.yaml",
            outputDir: "docs/esign-protean",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
        } satisfies Plugin.PluginOptions,
      },
    ],
  ],

  themes: ["docusaurus-theme-openapi-docs"],
};

export default config;
