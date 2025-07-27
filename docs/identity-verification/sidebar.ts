import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Identity Verification",
      link: {
        type: "doc",
        id: "identity-verification/identity-verification",
      },
      items: [
        {
          type: "doc",
          id: "identity-verification/compare-two-names-and-return-similarity-score",
          label: "Compare two names and return similarity score",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "identity-verification/compare-two-addresses-and-return-similarity-score",
          label: "Compare two addresses and return similarity score",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "identity-verification/compare-two-facial-images-and-return-match-confidence",
          label: "Compare two facial images and return match confidence",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "identity-verification/detect-if-face-is-live-to-prevent-spoofing",
          label: "Detect if face is live to prevent spoofing",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "identity-verification/convert-address-to-geographic-coordinates",
          label: "Convert address to geographic coordinates",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "identity-verification/convert-coordinates-to-human-readable-address",
          label: "Convert coordinates to human-readable address",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
