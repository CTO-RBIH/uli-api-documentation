import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Translation & Transliteration",
      link: {
        type: "doc",
        id: "translation-transliteration/translation-transliteration",
      },
      items: [
        {
          type: "doc",
          id: "translation-transliteration/transliterate-text",
          label: "Transliterate Text Between Languages",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "translation-transliteration/translate-text",
          label: "Translate Text Between Languages",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
