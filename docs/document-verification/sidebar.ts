import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "document-verification/document-verification-service-driving-license-api",
    },
    {
      type: "category",
      label: "Driving License Verification",
      link: {
        type: "doc",
        id: "document-verification/driving-license",
      },
      items: [
        {
          type: "doc",
          id: "document-verification/verify-driving-license",
          label: "Verify driving license details",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
