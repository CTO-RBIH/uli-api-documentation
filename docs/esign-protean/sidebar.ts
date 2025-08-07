import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "eSign Protean",
      link: {
        type: "doc",
        id: "esign-protean/e-sign-protean",
      },
      items: [
        {
          type: "doc",
          id: "esign-protean/e-sign",
          label: "eSign",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
