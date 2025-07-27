import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "LRS Owner Details",
      link: {
        type: "doc",
        id: "lrs-owner-details/lrs-owner-details",
      },
      items: [
        {
          type: "doc",
          id: "lrs-owner-details/verify-land-ownership",
          label: "Verify Land Ownership Details",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
