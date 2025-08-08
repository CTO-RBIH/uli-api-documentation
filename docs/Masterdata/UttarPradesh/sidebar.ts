import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Masterdata Uttar Pradesh",
      items: [
        {
          type: "doc",
          id: "Masterdata/UttarPradesh/get-districts",
          label: "Get Districts",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Masterdata/UttarPradesh/get-khasra",
          label: "Get Khasra",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Masterdata/UttarPradesh/get-subdistrict",
          label: "Get Subdistrict",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "Masterdata/UttarPradesh/get-village",
          label: "Get Village",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
