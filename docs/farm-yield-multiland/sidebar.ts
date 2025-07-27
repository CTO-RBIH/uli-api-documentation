import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Farm Yield & MultiLand Parcel",
      link: {
        type: "doc",
        id: "farm-yield-multiland/farm-yield-multi-land-parcel",
      },
      items: [
        {
          type: "doc",
          id: "farm-yield-multiland/get-single-farm-yield-report",
          label: "Get Single Farm Yield Report",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "farm-yield-multiland/get-multi-land-farm-yield-report",
          label: "Get Multi-Land Parcel Farm Yield Report",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
