import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "PAN Protean",
      link: {
        type: "doc",
        id: "pan-protean/pan-protean",
      },
      items: [
        {
          type: "doc",
          id: "pan-protean/pan-verification",
          label: "PAN Verification",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
