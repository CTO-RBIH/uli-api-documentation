---
id: rbih-apis
title: RBIH APIs
description: Reserve Bank Innovation Hub (RBIH) API collection for digital banking and financial services
---

# RBIH APIs

Welcome to the Reserve Bank Innovation Hub (RBIH) API documentation. RBIH provides a comprehensive suite of APIs designed to enhance digital banking and financial services across India.

## API Categories

### Identity & Verification Services
- **Document Verification Service** - Comprehensive identity document verification including driving license verification
- **Aadhaar Redact Service** - Secure redaction of Aadhaar numbers from document images
- **Facematch Service** - Biometric identity verification through facial comparison
- **Voter ID Verification** - Electoral identity verification service
- **Identity Verification Service** - Multi-endpoint identity verification including name/address comparison, face matching, and geocoding
- **PAN Verification Service** - Permanent Account Number validation against Income Tax Department records

### Financial Services
- **Bank Account Verification** - Real-time account validation services without initiating transactions
- **GSTN Service** - GST-related financial information access through Account Aggregator framework
- **Account Aggregator Service** - Central hub for financial data aggregation from multiple banks and institutions

### Land Records Services
- **LRS Owner Details Service** - Verify land ownership details from state government land record systems across 9 Indian states
- **LRS Lien Marking Service** - Create and manage liens on land properties upon loan issuance with digitally signed documentation across 4 states

### Agricultural Services
- **Farm Yield & MultiLand Parcel Service** - Comprehensive farm health analysis, crop yield predictions, and weather intelligence powered by satellite imagery and geospatial data across 5 states

### Other Services
- **Translation & Transliteration Service** - Language processing services for transliteration and translation between English and 6 Indian languages via Bhashini
- **Legal Verification Service** - Comprehensive legal background checks for individuals and entities from multiple court systems and enforcement databases

## Authentication

All RBIH APIs use JWT (JSON Web Token) based authentication with the following characteristics:
- **Sandbox Environment**: 6-hour token validity
- **Production Environment**: 12-hour token validity
- **Security**: HMAC SHA-256 digital signatures for data integrity

## Getting Started

1. **Obtain API Credentials** - Contact RBIH for sandbox and production access
2. **Generate JWT Token** - Use your credentials to obtain authentication tokens
3. **API Integration** - Implement the APIs following the OpenAPI specifications
4. **Testing** - Use sandbox environment for development and testing
5. **Production Deployment** - Move to production after thorough testing

## Support

For technical support and API access requests, please contact the RBIH team through the official channels.