import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "LRS",
      items: [
        {
          type: "doc",
          id: "LRS/chattisgarh",
          label: "Chattisgarh",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "LRS/maharashtra",
          label: "Maharashtra",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "LRS/odisha",
          label: "Odisha",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "LRS/rajsthan",
          label: "Rajsthan",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "LRS/tamil-nadu",
          label: "Tamil Nadu",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "LRS/tripura",
          label: "Tripura",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "LRS/uttar-pradesh",
          label: "Uttar Pradesh",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "LRS/andhra-pradesh",
          label: "Andhra Pradesh",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "LRS/madhya-pradesh",
          label: "Madhya Pradesh",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
