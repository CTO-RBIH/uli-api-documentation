import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Voter Verification",
      link: {
        type: "doc",
        id: "voter-verification/voter-verification",
      },
      items: [
        {
          type: "doc",
          id: "voter-verification/verify-voter-id",
          label: "Verify Voter ID Details",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
