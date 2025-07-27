# Contributing to RBIH Developer Portal

Thank you for your interest in contributing to the RBIH Developer Portal documentation! This guide will help you understand how to contribute effectively.

## Table of Contents

- [Getting Started](#getting-started)
- [Types of Contributions](#types-of-contributions)
- [Documentation Standards](#documentation-standards)
- [API Documentation](#api-documentation)
- [Style Guide](#style-guide)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)

## Getting Started

1. **Fork the Repository**
   ```bash
   # Fork via GitHub UI, then clone
   git clone https://github.com/YOUR_USERNAME/rbih-docs.git
   cd rbih-docs
   ```

2. **Set Up Development Environment**
   ```bash
   # Install dependencies
   npm install
   
   # Start development server
   npm start
   ```

3. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Types of Contributions

### 1. API Documentation

Adding new API documentation involves:

#### Step 1: Create OpenAPI Specification
```yaml
# specs/new-api-v1.0.yaml
openapi: 3.0.0
info:
  title: New API Service
  version: 1.0.0
  description: |
    # New API Service
    
    Comprehensive description of the API service...
    
    ## Introduction
    This API is documented in **OpenAPI format**...
    
    ## Authentication
    This API uses JWT authentication...
    
    ## Prerequisites
    - IP Whitelisting required
    - Platform credentials needed
    
    ## Support
    For technical support: support@rbihub.io
```

#### Step 2: Configure in Docusaurus
```typescript
// docusaurus.config.ts - Add to plugins config
"new-api": {
  specPath: "specs/new-api-v1.0.yaml",
  outputDir: "docs/new-api",
  sidebarOptions: {
    groupPathsBy: "tag",
    categoryLinkSource: "tag",
  },
}
```

#### Step 3: Generate Documentation
```bash
npm run gen-api-docs new-api
```

#### Step 4: Update Sidebar
```typescript
// sidebars.ts
const newApiSidebar = require("./docs/new-api/sidebar.ts");

// Add to appropriate category
{
  type: "category",
  label: "Your Category",
  items: [
    ...newApiSidebar,
  ]
}
```

#### Step 5: Customize Tag Page
Create `docs/new-api/new-api.tag.mdx` with service-specific information.

### 2. Guide Documentation

#### Authentication Guides
Place in `docs/authentication/`:
```markdown
---
id: oauth-implementation
title: OAuth 2.0 Implementation Guide
sidebar_position: 7
---

# OAuth 2.0 Implementation Guide

## Overview
[Content...]

## Implementation Steps
[Detailed steps with code examples...]
```

#### Error Handling Guides
Place in `docs/error-handling/`:
```markdown
---
id: retry-strategies
title: Retry Strategies and Backoff
sidebar_position: 4
---

# Retry Strategies and Backoff

## When to Retry
[Guidelines...]

## Implementation Examples
[Code samples in multiple languages...]
```

### 3. Performance Documentation

Place in `docs/performance/`:
```markdown
---
id: caching-strategies
title: Caching Strategies
sidebar_position: 3
---

# Caching Strategies for RBIH APIs

## Cache Headers
[Details about cache control...]

## Client-Side Caching
[Implementation examples...]
```

## Documentation Standards

### File Naming Conventions

- **Markdown files**: Use kebab-case (e.g., `jwt-authentication.md`)
- **API specs**: Include version (e.g., `account-verification-v1.2.yaml`)
- **Images**: Descriptive names (e.g., `auth-flow-diagram.png`)

### Front Matter Requirements

Every documentation file must include:

```yaml
---
id: unique-identifier          # Required: Must be unique across docs
title: "Full Page Title"       # Required: Displayed as page title
description: "SEO description" # Optional but recommended
sidebar_label: "Short Label"   # Optional: Defaults to title
sidebar_position: 1            # Optional: Order in sidebar
tags: [api, feature]          # Optional: For categorization
---
```

## API Documentation

### OpenAPI Specification Standards

1. **Required Fields**
   ```yaml
   openapi: 3.0.0
   info:
     title: Required
     version: Required (use semantic versioning)
     description: Required (use Markdown)
     contact:
       name: RBIH API Support
       email: support@rbihub.io
   servers:
     - url: https://extgw.api.rbihub.io/service/version
       description: Production server
     - url: https://extgw.nonprod.rbihub.io/service/version
       description: Sandbox server
   ```

2. **Path Definitions**
   ```yaml
   paths:
     /endpoint:
       post:
         summary: Brief one-line summary
         description: |
           Detailed description using Markdown.
           Include any important notes or limitations.
         operationId: uniqueOperationId
         tags:
           - Tag Name
         requestBody:
           required: true
           content:
             application/json:
               schema:
                 $ref: '#/components/schemas/RequestSchema'
         responses:
           '200':
             description: Success response
             content:
               application/json:
                 schema:
                   $ref: '#/components/schemas/ResponseSchema'
   ```

## Style Guide

### Writing Style

1. **Use Active Voice**
   - ✅ "The API returns a verification status"
   - ❌ "A verification status is returned by the API"

2. **Be Concise**
   - ✅ "Authenticate using JWT tokens"
   - ❌ "You need to perform authentication by using JWT tokens"

3. **Use Present Tense**
   - ✅ "The endpoint accepts JSON payloads"
   - ❌ "The endpoint will accept JSON payloads"

### Formatting Guidelines

1. **Headers**
   - H1 (#): Page title only
   - H2 (##): Major sections
   - H3 (###): Subsections

2. **Code Blocks**
   - Always specify language for syntax highlighting
   - Use inline code for single terms: `apiKey`
   - Use code blocks for multi-line examples

3. **Tables**
   ```markdown
   | Parameter | Type | Required | Description |
   |-----------|------|----------|-------------|
   | apiKey | string | Yes | Your API key |
   | timeout | number | No | Request timeout in seconds |
   ```

## Testing

### Before Submitting

1. **Build Test**
   ```bash
   npm run build
   ```

2. **Visual Review**
   ```bash
   npm run serve
   ```

3. **API Documentation Test**
   - Verify OpenAPI spec is valid
   - Check generated endpoints are correct

## Submitting Changes

### Commit Messages

Follow conventional commit format:

```
type(scope): brief description

Examples:
docs(auth): add OAuth 2.0 implementation guide
feat(api): add new payment verification endpoint
fix(sidebar): correct navigation ordering
```

### Pull Request Process

1. Use descriptive title
2. Fill out PR template
3. Test changes locally
4. Address review feedback

## Questions?

Contact support@rbihub.io for technical questions.

Thank you for contributing to RBIH Developer Portal!