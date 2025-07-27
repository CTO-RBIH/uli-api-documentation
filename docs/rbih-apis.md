---
id: rbih-apis
title: RBIH APIs
description: Reserve Bank Innovation Hub (RBIH) API collection for digital banking and financial services
---

# RBIH APIs

Welcome to the Reserve Bank Innovation Hub (RBIH) API documentation. RBIH provides a comprehensive suite of APIs designed to enhance digital banking and financial services across India.

## API Categories

### Identity & Verification Services
- **Aadhaar Redact Service** - Secure redaction of Aadhaar numbers from document images
- **Document Verification Service** - Comprehensive identity document verification including driving license, PAN, passport verification
- **Facematch Service** - Biometric identity verification through facial comparison
- **Voter ID Verification** - Electoral identity verification service

### Land Records Services
- **Property Records APIs** - Access to land and property ownership records
- **Survey Settlement APIs** - Land survey and settlement information

### Financial Services
- **Credit Bureau APIs** - Credit score and history verification
- **Bank Account Verification** - Real-time account validation services
- **GSTIN Verification** - GST identification number validation

### Agricultural Services
- **Crop Insurance APIs** - Agricultural insurance verification and processing
- **Farmer Database APIs** - Farmer identity and land ownership verification

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