---
sidebar_position: 1
tags:
  - rbi
  - api
  - documentation
---

# RBI API Documentation

Welcome to the **Reserve Bank Innovation Hub (RBIH) API Documentation**.

## Overview

The RBIH platform provides a comprehensive suite of financial and verification APIs designed to enable seamless integration for lending institutions and financial service providers.

## Featured API Services

### Document Verification Services
- **[Driving License Verification](/docs/document-verification/verify-driving-license)** - Real-time verification of driving license details
- Aadhaar Verification
- PAN Validation  
- Voter ID Verification
- Registration Certificate Verification

### Financial Services
- **Account Aggregator Services** - Secure financial data aggregation
- **GSTN Services** - GST Network integration for tax verification
- **BBPS Services** - Bharat Bill Payment System integration

### Property & Land Services
- **Land Records Services** - Owner details, lien marking, and property verification
- **Property Search Reports** - Comprehensive property verification from multiple providers

### Identity & KYC Services
- **Facematch Services** - Biometric identity verification
- **Digilocker Integration** - Digital document verification
- **e-Sign & e-Stamp Services** - Digital signature and stamping

## Quick Start

### Prerequisites
Before integrating with any RBIH API, ensure you have:

1. **IP Whitelisting** - Both lender and platform IPs must be whitelisted
2. **Platform Credentials** - Client ID, Secret, and Public Keys
3. **Service Subscription** - Subscribe to required services via Dev Portal
4. **JWT Authentication** - Valid tokens for API access

### Authentication
All APIs use JWT token authentication. Tokens are valid for:
- **Sandbox**: 6 hours
- **Production**: 12 hours

### API Specifications

#### Current Version: 1.0.0
- **[Document Verification API](/docs/document-verification/verify-driving-license)** - Driving License verification and other document services
- **[API Reference](/examples/document-verification-dl-v1.0.yaml)** (OpenAPI Specification)
- **[Petstore Example](/examples/petstore.yaml)** (Reference implementation)

## Environment URLs

### Sandbox (Non-Production)
- **Authentication**: `https://auth.nonprod.rbihub.io/`
- **Dev Portal**: `https://am.nonprod.rbihub.io/devportal`
- **API Gateway**: `https://extgw.nonprod.rbihub.io/`

### Production
- **Authentication**: `https://auth.api.rbihub.io/`
- **Dev Portal**: `https://am.api.rbihub.io/devportal`
- **API Gateway**: `https://extgw.api.rbihub.io/`

## Support

For technical support and assistance:
- **Email**: support@rbihub.io
- **Response Time**: Within 2 hours during business hours (8 AM to 8 PM IST)

When contacting support, please include:
- Service name and version
- Environment (Sandbox/Production)
- Request headers and payload
- Error codes and messages
- Prerequisites status (IP whitelisting, service subscription, etc.)

## Getting Started

1. **Review API Specifications** - Start with the OpenAPI specs for your required services
2. **Set Up Prerequisites** - Complete IP whitelisting and credential setup
3. **Subscribe to Services** - Use the Dev Portal to subscribe to required APIs
4. **Generate Authentication Tokens** - Set up JWT token generation
5. **Test in Sandbox** - Verify integration in the sandbox environment
6. **Deploy to Production** - Move to production after successful testing
