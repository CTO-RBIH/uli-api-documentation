import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Bank Account Verification",
      link: {
        type: "doc",
        id: "bank-account-verification/bank-account-verification",
      },
      items: [
        {
          type: "doc",
          id: "bank-account-verification/verify-bank-account-details-without-initiating-a-transaction",
          label: "Verify bank account details without initiating a transaction",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
