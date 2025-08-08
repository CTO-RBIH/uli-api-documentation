import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Lender Loan Journey",
      link: {
        type: "doc",
        id: "LenderLoanJourney/intro",
      },
      items: [
        {
          type: "doc",
          id: "LenderLoanJourney/accept-loan",
          label: "Accept Loan",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "LenderLoanJourney/disburse-loan",
          label: "Disburse Loan",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "LenderLoanJourney/reject-loan",
          label: "Reject Loan",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "LenderLoanJourney/withdraw-loan",
          label: "Withdraw Loan",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
