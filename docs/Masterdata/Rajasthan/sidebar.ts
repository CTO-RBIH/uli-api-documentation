import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Masterdata Rajasthan",
      items: [
        {
          type: "doc",
          id: "Masterdata/Rajasthan/get-districts",
          label: "Get Districts",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Masterdata/Rajasthan/get-khasra-list",
          label: "Get Khasra List",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Masterdata/Rajasthan/get-subdistricts",
          label: "Get Subdistricts",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Masterdata/Rajasthan/get-villages",
          label: "Get Villages",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
