import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Legal Verification",
      link: {
        type: "doc",
        id: "legal-verification/legal-verification",
      },
      items: [
        {
          type: "doc",
          id: "legal-verification/verify-individual-legal",
          label: "Individual Legal Verification",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "legal-verification/verify-entity-legal",
          label: "Entity Legal Verification",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
