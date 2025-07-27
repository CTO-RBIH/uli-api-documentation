import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Account Aggregator",
      link: {
        type: "doc",
        id: "account-aggregator/account-aggregator",
      },
      items: [
        {
          type: "doc",
          id: "account-aggregator/process-consent-requests-through-account-aggregator",
          label: "Process consent requests through Account Aggregator",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
