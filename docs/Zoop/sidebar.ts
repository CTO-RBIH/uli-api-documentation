import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Zoop",
      items: [
        {
          type: "doc",
          id: "Zoop/dl",
          label: "DL",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "Zoop/voter",
          label: "Voter",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "Zoop/vehicle-rc",
          label: "Vehicle_RC",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "Zoop/vehicle-rc-challan",
          label: "Vehicle_RC_Challan",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "Zoop/rc-reverse",
          label: "RC_Reverse",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
