import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Probe 42",
      items: [
        {
          type: "doc",
          id: "Probe42/cin-for-company",
          label: "CIN for company",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Probe42/pan-for-company",
          label: "PAN for company",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
