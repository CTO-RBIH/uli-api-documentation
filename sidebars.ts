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
const translationTransliterationSidebar = require("./docs/translation-transliteration/sidebar.ts");
const legalVerificationSidebar = require("./docs/legal-verification/sidebar.ts");
const farmYieldMultilandSidebar = require("./docs/farm-yield-multiland/sidebar.ts");
const panProteanSidebar = require("./docs/pan-protean/sidebar.ts");
const dgvSidebar = require("./docs/dgv/sidebar.ts");
const esignProteanSidebar = require("./docs/esign-protean/sidebar.ts");
// const accountAggregatorSidebar = require("./docs/account-aggregator/sidebar.ts");
const lrsSidebar = require("./docs/LRS/sidebar.ts");
const masterdataRJSidebar = require("./docs/Masterdata/Rajasthan/sidebar.ts");
const masterdataUPSidebar = require("./docs/Masterdata/UttarPradesh/sidebar.ts");
const masterdataTNSidebar = require("./docs/Masterdata/TamilNadu/sidebar.ts");
const ibdicSidebar = require("./docs/IBDIC/sidebar.ts");




const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {type: "doc", id: "intro"},
    {
      type: "category",
      label: "Authentication & Security",
      collapsed: false,
      items: [
        {type: "doc", id: "authentication/authentication-overview"},
        {type: "doc", id: "authentication/jwt-tokens"},
        {type: "doc", id: "authentication/digital-signatures"},
        {type: "doc", id: "authentication/environments"},
        {type: "doc", id: "authentication/best-practices"}
      ]
    },
    {
      type: "category",
      label: "Error Handling",
      collapsed: false,
      items: [
        {type: "doc", id: "error-handling/error-handling-overview"},
        {type: "doc", id: "error-handling/common-errors"}
      ]
    },
    {
      type: "category",
      label: "Performance & Rate Limiting",
      collapsed: false,
      items: [
        {type: "doc", id: "performance/performance-overview"},
        {type: "doc", id: "performance/rate-limiting"}
      ]
    },
    {
      type: "doc", id: "security-compliance", label: "Security & Compliance"
    }
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
          collapsed: true,
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
          collapsed: true,
          items: [
            ...bankAccountVerificationSidebar,
            ...gstnServiceSidebar,
            ...accountAggregatorSidebar
          ]
        },
        {
          type: "category",
          label: "Land Records Services", 
          collapsed: true,
          items: [
            ...lrsOwnerDetailsSidebar,
            ...lrsLienMarkingSidebar
          ]
        },
        {
          type: "category",
          label: "Agricultural Services",
          collapsed: true,
          items: [
            ...farmYieldMultilandSidebar
          ]
        },
        {
          type: "category",
          label: "Other Services",
          collapsed: true,
          items: [
            ...translationTransliterationSidebar,
            ...legalVerificationSidebar
          ]
        },
        {
          type: "category",
          label: "ULI Services",
          collapsed: true,
          items: [
            ...panProteanSidebar,
            ...dgvSidebar,
            ...esignProteanSidebar,
            ...lrsSidebar,
            ...accountAggregatorSidebar,
            ...bankAccountVerificationSidebar,
            ...panVerificationSidebar,
            ...masterdataRJSidebar,
            ...masterdataUPSidebar,
            ...masterdataTNSidebar,
            ...ibdicSidebar
          ]
        }
      ]
    }
  ]
};

export default sidebars;