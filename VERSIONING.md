# Documentation Versioning Guide

This guide explains how to manage versions in the RBIH documentation.

## Overview

The documentation supports versioning for both regular docs and OpenAPI specifications. This allows users to access documentation for different versions of the API.

## Current Setup

- **Current Version**: Development version (labeled as "Next")
- **Latest Stable**: 1.0.0
- **Version Dropdown**: Available in the navbar

## Creating a New Version

To create a new version (e.g., 1.1.0):

```bash
# 1. Create the documentation version
yarn docusaurus docs:version 1.1.0

# 2. Copy the OpenAPI spec to versioned examples
mkdir -p versioned_examples/version-1.1.0
cp examples/petstore.yaml versioned_examples/version-1.1.0/

# 3. Update the versions array in docusaurus.config.ts
# Add "1.1.0" to the versions array in the createConfig function

# 4. Regenerate API docs
yarn docusaurus gen-api-docs all
```

## Directory Structure

```
rbih-docs/
├── docs/                          # Current version (Next)
│   └── petstore/                  # Current API docs
├── versioned_docs/                # Versioned documentation
│   └── version-1.0.0/
│       └── petstore/              # Version 1.0.0 API docs
├── examples/                      # Current OpenAPI specs
│   └── petstore.yaml
├── versioned_examples/            # Versioned OpenAPI specs
│   └── version-1.0.0/
│       └── petstore.yaml
├── versions.json                  # List of versions
└── versioned_sidebars/            # Versioned sidebar configs
```

## Working with Versions

### Editing Current Version
- Edit files in `docs/` directory
- Update OpenAPI spec in `examples/`
- Changes appear under "Next" version

### Editing Released Versions
- Edit files in `versioned_docs/version-X.X.X/`
- Update OpenAPI spec in `versioned_examples/version-X.X.X/`
- Regenerate API docs after spec changes

### Version Labels
- **Next**: Current development version
- **1.0.0** (and others): Released versions

## Best Practices

1. **Version Naming**: Use semantic versioning (MAJOR.MINOR.PATCH)
2. **Keep Versions Limited**: Maintain only actively supported versions
3. **Update OpenAPI Specs**: Always update the versioned OpenAPI spec when creating a new version
4. **Test Thoroughly**: Verify all links and API docs work correctly after versioning

## Accessing Different Versions

Users can:
- Use the version dropdown in the navbar
- Visit `/versions` page to see all available versions
- Access specific versions via URLs like `/docs/1.0.0/intro`