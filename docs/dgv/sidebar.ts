import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "DGV Milk Insights",
      link: {
        type: "doc",
        id: "dgv/dgv-milk-insights",
      },
      items: [
        {
          type: "doc",
          id: "dgv/consent-for-milk-insights",
          label: "Consent for Milk Insights",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "dgv/farmer-milk-insights",
          label: "Farmer Milk Insights",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "dgv/farmer-milk-insights-pdf",
          label: "Farmer Milk Insights PDF",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "dgv/get-federations",
          label: "Get Federations",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dgv/get-unions",
          label: "Get Unions",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "dgv/get-states",
          label: "Get States",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "dgv/get-mcps",
          label: "Get Mcps",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
