import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "GSTN Service",
      link: {
        type: "doc",
        id: "gstn-service/gstn-service",
      },
      items: [
        {
          type: "doc",
          id: "gstn-service/authenticate-and-get-auth-token",
          label: "Authenticate and get auth token",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "gstn-service/discover-gstin-account",
          label: "Discover GSTIN account",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "gstn-service/generate-otp-for-account-linking",
          label: "Generate OTP for account linking",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "gstn-service/verify-otp-and-complete-account-linking",
          label: "Verify OTP and complete account linking",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "gstn-service/submit-consent-artifact",
          label: "Submit consent artifact",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "gstn-service/request-financial-information",
          label: "Request financial information",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "gstn-service/fetch-encrypted-financial-information",
          label: "Fetch encrypted financial information",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
