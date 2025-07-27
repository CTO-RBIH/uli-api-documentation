# RBIH Developer Portal

Official developer documentation for Reserve Bank Innovation Hub (RBIH) APIs.

🌐 **Live Site**: [https://rbih.tech](https://rbih.tech)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [API Categories](#api-categories)
- [Documentation Structure](#documentation-structure)
- [Contributing Documentation](#contributing-documentation)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Support](#support)

## Overview

This portal provides comprehensive documentation for all RBIH APIs, enabling seamless integration for financial institutions and developers building innovative financial solutions for India.

## Features

- 📚 Complete API documentation for 14+ services
- 🔐 Detailed authentication guides
- 📥 Downloadable OpenAPI specifications
- 🎨 Interactive API explorer
- 🌙 Dark mode support
- 📱 Mobile responsive design

## API Categories

### Identity & Verification Services
- Document Verification (Driving License)
- Aadhaar Redact Service
- Facematch Service
- Voter Verification
- Identity Verification
- PAN Verification

### Financial Services
- Bank Account Verification
- GSTN Service
- Account Aggregator

### Land Records Services
- LRS Owner Details
- LRS Lien Marking

### Agricultural Services
- Farm Yield & Multi-Land Parcel

### Other Services
- Translation & Transliteration
- Legal Verification

## Documentation Structure

```
rbih-docs/
├── docs/                           # All documentation content
│   ├── authentication/             # Authentication guides
│   │   ├── authentication-overview.md
│   │   ├── jwt-tokens.md
│   │   ├── digital-signatures.md
│   │   ├── environments.md
│   │   └── best-practices.md
│   ├── error-handling/             # Error handling guides
│   │   ├── error-handling-overview.md
│   │   └── common-errors.md
│   ├── performance/                # Performance guides
│   │   ├── performance-overview.md
│   │   └── rate-limiting.md
│   ├── [api-name]/                # Individual API docs (auto-generated)
│   │   ├── sidebar.ts             # API-specific sidebar
│   │   ├── [api-name].tag.mdx    # API category page
│   │   ├── [api-name].info.mdx   # API introduction
│   │   └── [endpoint].api.mdx    # Individual endpoints
│   ├── rbih-apis.md              # Main API catalog
│   ├── intro.md                  # Getting started
│   └── security-compliance.md     # Security guidelines
├── specs/                         # OpenAPI specifications
│   ├── document-verification-dl-v1.0.yaml
│   ├── aadhaar-redact-v1.0.yaml
│   └── ... (other API specs)
├── static/                        # Static assets
│   ├── img/                      # Images and icons
│   └── specs/                    # Downloadable API specs
├── src/                          # React components and pages
│   ├── pages/                    # Custom pages
│   └── css/                      # Global styles
├── docusaurus.config.ts          # Main configuration
├── sidebars.ts                   # Global sidebar configuration
└── package.json                  # Dependencies and scripts
```

## Contributing Documentation

### Adding a New API

1. **Create OpenAPI Specification**
   ```yaml
   # specs/your-api-v1.0.yaml
   openapi: 3.0.0
   info:
     title: Your API Name
     version: 1.0.0
     description: |
       Detailed description of your API...
   servers:
     - url: https://extgw.api.rbihub.io/your-api/1.0
       description: Production server
     - url: https://extgw.nonprod.rbihub.io/your-api/1.0
       description: Sandbox server
   ```

2. **Add API Configuration**
   ```typescript
   // docusaurus.config.ts
   plugins: [
     [
       "docusaurus-plugin-openapi-docs",
       {
         config: {
           "your-api": {
             specPath: "specs/your-api-v1.0.yaml",
             outputDir: "docs/your-api",
             sidebarOptions: {
               groupPathsBy: "tag",
               categoryLinkSource: "tag",
             },
           },
         },
       },
     ],
   ],
   ```

3. **Generate API Documentation**
   ```bash
   npm run gen-api-docs your-api
   ```

4. **Add to Sidebar**
   ```typescript
   // sidebars.ts
   const yourApiSidebar = require("./docs/your-api/sidebar.ts");
   
   // Add to appropriate category
   items: [
     ...yourApiSidebar,
   ]
   ```

5. **Create Category Page** (optional customization)
   ```mdx
   // docs/your-api/your-api.tag.mdx
   ---
   id: your-api
   title: "Your API Name"
   description: "Brief description"
   ---
   
   ## Key Features
   - Feature 1
   - Feature 2
   
   ## Download OpenAPI Specification
   <a href="/specs/your-api-v1.0.yaml" download>
     📥 Download OpenAPI Spec (YAML)
   </a>
   ```

### Writing Guide Documentation

Guide documentation should be placed in the appropriate category folder:

#### Authentication Guide Example
```markdown
// docs/authentication/new-auth-method.md
---
id: new-auth-method
title: New Authentication Method
sidebar_label: New Auth Method
sidebar_position: 6
---

# New Authentication Method

## Overview
Brief introduction to the authentication method...

## Prerequisites
- Requirement 1
- Requirement 2

## Implementation

### Step 1: Setup
\```javascript
// Code example
const auth = new AuthMethod();
\```

### Step 2: Configuration
Detailed configuration steps...

## Security Considerations
- Important security notes
- Best practices

## Troubleshooting
Common issues and solutions...
```

#### Error Handling Guide Example
```markdown
// docs/error-handling/api-specific-errors.md
---
id: api-specific-errors
title: API Specific Error Codes
sidebar_position: 3
---

# API Specific Error Codes

## Error Code Reference

| Code | Description | Resolution |
|------|-------------|------------|
| E001 | Invalid request | Check request format |
| E002 | Authentication failed | Verify credentials |

## Handling Errors

### JavaScript Example
\```javascript
try {
  const response = await api.call();
} catch (error) {
  if (error.code === 'E001') {
    // Handle invalid request
  }
}
\```
```

### Best Practices for Documentation

1. **Use Clear Headings**
   - Use H2 (##) for main sections
   - Use H3 (###) for subsections
   - Keep heading hierarchy consistent

2. **Include Code Examples**
   - Provide examples in multiple languages when possible
   - Use syntax highlighting with language identifiers
   - Include both request and response examples

3. **Add Visual Aids**
   - Use diagrams for complex flows
   - Include screenshots for UI-related documentation
   - Store images in `/static/img/docs/`

4. **Write Descriptive Front Matter**
   ```yaml
   ---
   id: unique-doc-id
   title: "Full Page Title"
   description: "SEO-friendly description"
   sidebar_label: "Short Sidebar Label"
   sidebar_position: 1
   tags: [api, authentication, jwt]
   ---
   ```

5. **Use MDX Features**
   - Import React components for interactive elements
   - Use tabs for language-specific examples
   - Add callouts for important information

   ```mdx
   import Tabs from '@theme/Tabs';
   import TabItem from '@theme/TabItem';

   <Tabs>
     <TabItem value="js" label="JavaScript">
       ```javascript
       // JavaScript code
       ```
     </TabItem>
     <TabItem value="python" label="Python">
       ```python
       # Python code
       ```
     </TabItem>
   </Tabs>
   ```

6. **Link Between Documents**
   ```markdown
   See [Authentication Overview](./authentication-overview) for more details.
   
   For API reference, check [Bank Account Verification](/docs/bank-account-verification/bank-account-verification).
   ```

### OpenAPI Specification Guidelines

1. **Complete API Information**
   ```yaml
   info:
     title: API Name
     version: 1.0.0
     description: |
       Comprehensive description including:
       - Purpose
       - Key features
       - Use cases
     contact:
       name: RBIH API Support
       email: support@rbihub.io
   ```

2. **Detailed Operation Descriptions**
   ```yaml
   paths:
     /verify:
       post:
         summary: Verify Resource
         description: |
           Detailed description of what this endpoint does,
           including any important notes or limitations.
         operationId: verifyResource
         tags:
           - Verification
   ```

3. **Comprehensive Schema Definitions**
   ```yaml
   components:
     schemas:
       VerificationRequest:
         type: object
         required:
           - field1
           - field2
         properties:
           field1:
             type: string
             description: Detailed field description
             example: "example-value"
   ```

4. **Security Definitions**
   ```yaml
   security:
     - BearerAuth: []
   
   components:
     securitySchemes:
       BearerAuth:
         type: http
         scheme: bearer
         bearerFormat: JWT
         description: |
           JWT token authentication details...
   ```

### Versioning Documentation

When updating API versions:

1. **Create Version**
   ```bash
   npm run docusaurus docs:version 1.1.0
   ```

2. **Update OpenAPI Specs**
   - Copy specs to `versioned_specs/version-1.1.0/`
   - Update version numbers in the spec files

3. **Regenerate Docs**
   ```bash
   npm run gen-api-docs all
   ```

## Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/rbih/rbih-docs.git
cd rbih-docs

# Install dependencies
npm install

# Start development server
npm start
```

The site will be available at `http://localhost:3000`.

### Building

```bash
# Build for production
npm run build

# Test production build locally
npm run serve
```

### Useful Commands

```bash
# Generate API docs for a specific API
npm run gen-api-docs [api-id]

# Generate all API docs
npm run gen-api-docs all

# Clean generated API docs
npm run clean-api-docs all

# Check for broken links
npm run build -- --no-minify
```

## Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Tech Stack

- [Docusaurus 3](https://docusaurus.io/) - Documentation framework
- [OpenAPI 3.0](https://www.openapis.org/) - API specification
- [React](https://reactjs.org/) - UI components
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [MDX](https://mdxjs.com/) - Enhanced Markdown

## Support

For technical support and assistance:
- Email: support@rbihub.io
- Developer Portal: https://am.api.rbihub.io/devportal
- Response Time: Within 2 hours during business hours (8 AM to 8 PM IST)

## License

Copyright © 2025 Reserve Bank Innovation Hub. All Rights Reserved.

---

Built with ❤️ by RBIH Team