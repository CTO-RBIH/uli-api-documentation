import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "IBDIC",
      items: [
        {
          type: "doc",
          id: "IBDIC/entity-registration",
          label: "entity-registration",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "IBDIC/invoice-registration-with-code",
          label: "Invoice-Registration-With-Code",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "IBDIC/invoice-registration-without-entity-code",
          label: "Invoice-Registration-Without-Entity-Code",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "IBDIC/ledger-status-check",
          label: "Ledger-Status-Check",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "IBDIC/invoice-status-check-with-code",
          label: "Invoice-Status-Check-With-Code",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "IBDIC/invoice-status-check-without-code",
          label: "Invoice-Status-Check-Without-Code",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "IBDIC/finance",
          label: "Finance",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "IBDIC/disbursement",
          label: "Disbursement",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "IBDIC/repayment",
          label: "Repayment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "IBDIC/enquiry",
          label: "Enquiry",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "IBDIC/cancel",
          label: "Cancel",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
