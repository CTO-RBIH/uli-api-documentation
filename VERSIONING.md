# Documentation Versioning Guide

This guide explains how to manage versions in the RBIH Developer Portal documentation.

## Overview

The documentation supports versioning for both regular docs and OpenAPI specifications. This allows users to access documentation for different versions of the RBIH APIs.

## Current Setup

- **Current Version**: Development version (labeled as "Next")
- **Latest Stable**: 1.0.0
- **Version Dropdown**: Available in the navbar

## Directory Structure

```
rbih-docs/
├── docs/                          # Current version (Next)
│   ├── authentication/            # Authentication guides
│   ├── error-handling/            # Error handling guides
│   ├── performance/               # Performance optimization
│   ├── aadhaar-redact/            # API: Aadhaar Redact Service
│   ├── account-aggregator/        # API: Account Aggregator
│   ├── bank-account-verification/ # API: Bank Account Verification
│   ├── document-verification/     # API: Document Verification
│   ├── facematch/                 # API: Facematch Service
│   ├── farm-yield-multiland/      # API: Farm Yield Service
│   ├── gstn-service/              # API: GSTN Service
│   ├── identity-verification/     # API: Identity Verification
│   ├── legal-verification/        # API: Legal Verification
│   ├── lrs-lien-marking/          # API: LRS Lien Marking
│   ├── lrs-owner-details/         # API: LRS Owner Details
│   ├── pan-verification/          # API: PAN Verification
│   ├── translation-transliteration/# API: Translation Service
│   └── voter-verification/        # API: Voter Verification
├── versioned_docs/                # Versioned documentation
│   └── version-1.0.0/
│       ├── authentication/        # Versioned auth guides
│       ├── error-handling/        # Versioned error guides
│       └── ...                    # Other versioned docs
├── specs/                         # Current OpenAPI specs
│   ├── aadhaar-redact-v1.0.yaml
│   ├── account-aggregator-v1.3.yaml
│   ├── bank-account-verification-v1.0.yaml
│   ├── document-verification-dl-v1.0.yaml
│   ├── facematch-v1.0.yaml
│   ├── farm-yield-multiland-v1.7.yaml
│   ├── gstn-service-v1.0.yaml
│   ├── identity-verification-v1.1.yaml
│   ├── legal-verification-v1.1.yaml
│   ├── lrs-lien-marking-v1.5.yaml
│   ├── lrs-owner-details-v1.5.yaml
│   ├── pan-verification-v1.3.yaml
│   ├── translation-transliteration-v1.3.yaml
│   └── voter-verification-v1.0.yaml
├── versioned_specs/               # Versioned OpenAPI specs
│   └── version-1.0.0/
│       └── document-verification-dl-v1.0.yaml
├── versions.json                  # List of versions
├── versioned_sidebars/            # Versioned sidebar configs
│   └── version-1.0.0-sidebars.json
└── sidebars.ts                    # Current sidebar config
```

## Creating a New Version

To create a new version (e.g., 1.1.0):

```bash
# 1. Create the documentation version
yarn docusaurus docs:version 1.1.0

# 2. Copy all OpenAPI specs to versioned specs
mkdir -p versioned_specs/version-1.1.0
cp specs/*.yaml versioned_specs/version-1.1.0/

# 3. Update the versions.json file (automatically done by step 1)

# 4. Regenerate API docs for all services
yarn docusaurus gen-api-docs all
```

## Working with Versions

### Editing Current Version (Next)
- Edit files in `docs/` directory
- Update OpenAPI specs in `specs/`
- Changes appear under "Next" version
- Run `yarn docusaurus gen-api-docs all` after spec changes

### Editing Released Versions
- Edit files in `versioned_docs/version-X.X.X/`
- Update OpenAPI specs in `versioned_specs/version-X.X.X/`
- Regenerate API docs after spec changes

### Version Labels
- **Next**: Current development version
- **1.0.0**: Latest stable release

## API Categories

The RBIH APIs are organized into the following categories:

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

## Best Practices

1. **Version Naming**: Use semantic versioning (MAJOR.MINOR.PATCH)
   - MAJOR: Breaking API changes
   - MINOR: New features, backward compatible
   - PATCH: Bug fixes, backward compatible

2. **Keep Versions Limited**: Maintain only actively supported versions
   - Archive older versions that are no longer supported
   - Clearly communicate deprecation timelines

3. **Update OpenAPI Specs**: When creating a new version:
   - Copy ALL OpenAPI specs to the versioned folder
   - Update version numbers in the spec files
   - Test all API documentation generation

4. **Test Thoroughly**: After versioning:
   - Verify all API documentation renders correctly
   - Check that authentication guides are accessible
   - Ensure cross-references between docs work
   - Test the version dropdown functionality

5. **Documentation Updates**: When updating docs:
   - Update both the guide documentation and API specs
   - Ensure consistency across all related documents
   - Update examples to reflect any API changes

## Accessing Different Versions

Users can:
- Use the version dropdown in the navbar
- Visit `/versions` page to see all available versions
- Access specific versions via URLs:
  - Current: `/docs/next/rbih-apis`
  - Version 1.0.0: `/docs/rbih-apis` or `/docs/1.0.0/rbih-apis`

## Troubleshooting

### Common Issues

1. **Missing API Documentation**
   - Run `yarn docusaurus gen-api-docs all`
   - Check that specs exist in the correct folder

2. **Broken Links After Versioning**
   - Update internal links to use relative paths
   - Check navbar configuration in `docusaurus.config.ts`

3. **Sidebar Not Showing**
   - Verify sidebar configuration in `sidebars.ts`
   - Check versioned sidebar JSON files

## Support

For assistance with versioning or documentation:
- Email: support@rbihub.io
- Developer Portal: https://am.api.rbihub.io/devportal