import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Facematch",
      link: {
        type: "doc",
        id: "facematch/facematch",
      },
      items: [
        {
          type: "doc",
          id: "facematch/perform-facematch",
          label: "Perform Facial Verification",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
