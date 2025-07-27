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
const identityVerificationSidebar = require("./docs/identity-verification/sidebar.ts");
const panVerificationSidebar = require("./docs/pan-verification/sidebar.ts");
const bankAccountVerificationSidebar = require("./docs/bank-account-verification/sidebar.ts");
const gstnServiceSidebar = require("./docs/gstn-service/sidebar.ts");
const accountAggregatorSidebar = require("./docs/account-aggregator/sidebar.ts");
const lrsOwnerDetailsSidebar = require("./docs/lrs-owner-details/sidebar.ts");
const lrsLienMarkingSidebar = require("./docs/lrs-lien-marking/sidebar.ts");

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
        {
          type: "category",
          label: "Identity & Verification Services",
          collapsed: false,
          items: [
            ...documentVerificationSidebar,
            ...aadhaarRedactSidebar,
            ...facematchSidebar,
            ...voterVerificationSidebar,
            ...identityVerificationSidebar,
            ...panVerificationSidebar
          ]
        },
        {
          type: "category", 
          label: "Financial Services",
          collapsed: false,
          items: [
            ...bankAccountVerificationSidebar,
            ...gstnServiceSidebar,
            ...accountAggregatorSidebar
          ]
        },
        {
          type: "category",
          label: "Land Records Services", 
          collapsed: false,
          items: [
            ...lrsOwnerDetailsSidebar,
            ...lrsLienMarkingSidebar
          ]
        }
      ]
    }
  ]
};

export default sidebars;