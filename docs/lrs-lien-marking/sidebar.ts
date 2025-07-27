import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "LRS Lien Marking",
      link: {
        type: "doc",
        id: "lrs-lien-marking/lrs-lien-marking",
      },
      items: [
        {
          type: "doc",
          id: "lrs-lien-marking/create-lien-marking",
          label: "Create Lien Marking on Land Property",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "lrs-lien-marking/get-lien-marking-status",
          label: "Get Lien Marking Status",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
