import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "SatSureBatch",
      items: [
        {
          type: "doc",
          id: "SatsureBatch/upload",
          label: "Upload",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "SatsureBatch/download",
          label: "Download",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "SatsureBatch/status",
          label: "Status",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "SatsureBatch/satsure-call-back",
          label: "satsure-CallBack",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
