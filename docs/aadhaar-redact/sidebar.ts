import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "aadhaar-redact/think-360-aadhaar-redact-service-api",
    },
    {
      type: "category",
      label: "Aadhaar Redact",
      link: {
        type: "doc",
        id: "aadhaar-redact/aadhaar-redact",
      },
      items: [
        {
          type: "doc",
          id: "aadhaar-redact/redact-aadhaar",
          label: "Redact Aadhaar Number from Document Image",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
