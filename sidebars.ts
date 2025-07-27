/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";
const documentVerificationSidebar = require("./docs/document-verification/sidebar.ts");
const aadhaarRedactSidebar = require("./docs/aadhaar-redact/sidebar.ts");
const facematchSidebar = require("./docs/facematch/sidebar.ts");
const voterVerificationSidebar = require("./docs/voter-verification/sidebar.ts");

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {type: "doc", id: "intro"},
  ],
  openApiSidebar: [
    {
      type: "category",
      label: "RBIH APIs",
      link: {
        type: "doc",
        id: "rbih-apis",
      },
      items: [
        ...documentVerificationSidebar,
        ...aadhaarRedactSidebar,
        ...facematchSidebar,
        ...voterVerificationSidebar
      ]
    }
  ]
};

export default sidebars;