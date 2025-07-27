import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "PAN Verification",
      link: {
        type: "doc",
        id: "pan-verification/pan-verification",
      },
      items: [
        {
          type: "doc",
          id: "pan-verification/verify-pan-details-and-validity",
          label: "Verify PAN details and validity",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
