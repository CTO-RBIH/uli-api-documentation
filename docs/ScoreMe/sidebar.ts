import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "ScoreMe",
      items: [
        {
          type: "doc",
          id: "ScoreMe/individual-legal-verifier",
          label: "Individual Legal Verifier",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "ScoreMe/individual-verifier-callback",
          label: "Individual Verifier callback",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "ScoreMe/entity-legal-verifier",
          label: "Entity Legal Verifier",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "ScoreMe/entity-verifier-callback",
          label: "Entity Verifier callback",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
