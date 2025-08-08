import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Masterdata Tamil Nadu",
      items: [
        {
          type: "doc",
          id: "Masterdata/TamilNadu/get-subdivnumber",
          label: "Get Subdivnumber",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Masterdata/TamilNadu/get-surveynumber",
          label: "Get Surveynumber",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
