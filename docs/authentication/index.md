---
id: authentication-overview
title: Authentication Overview
description: Overview of RBIH API authentication and security framework
sidebar_position: 1
---

# Authentication Overview

RBIH APIs use a comprehensive security framework based on JWT (JSON Web Token) authentication with additional security measures including digital signatures, IP whitelisting, and state-of-the-art encryption protocols.

## Security Framework

All RBIH APIs require proper authentication and follow industry-standard security practices to ensure data protection and regulatory compliance. The authentication system is designed to support both sandbox and production environments with different token validity periods.

## JWT Token Authentication

### Token Validity

- **Sandbox Environment**: 6 hours
- **Production Environment**: 6 hours

### Required Headers

All API requests must include these authentication headers:

```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
client-id: <your_client_id>
provider: <provider_code>
```

## Prerequisites

Before integrating with RBIH APIs, ensure you have:

1. **API Credentials** - Obtained from RBIH onboarding process
2. **IP Whitelisting** - Your server IPs registered with RBIH
3. **URL Whitelisting** - Your callback URLs registered for webhook services
4. **Environment Access** - Sandbox for testing, Production for live operations

## Quick Start

### 1. Generate JWT Token

```javascript
const jwt = require('jsonwebtoken');

function generateJWTToken(clientId, clientSecret, providerId) {
  const payload = {
    iss: clientId,
    sub: 'api_access',
    provider: providerId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (6 * 60 * 60) // 6 hours for sandbox
  };
  
  return jwt.sign(payload, clientSecret, { algorithm: 'HS256' });
}
```

### 2. Make API Request

```javascript
const response = await fetch('https://api.rbihapis.com/pan/verify', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${jwtToken}`,
    'Content-Type': 'application/json',
    'client-id': clientId,
    'provider': '101'
  },
  body: JSON.stringify({
    panNumber: 'ABCDE1234F',
    nameToMatch: 'John Doe'
  })
});
```

## Next Steps

- **[JWT Token Setup](./jwt-tokens)** - Detailed JWT implementation guide
- **[Digital Signatures](./digital-signatures)** - HMAC and PKI certificate setup  
- **[Environment Configuration](./environments)** - Sandbox vs Production setup
- **[Security Best Practices](./best-practices)** - Security guidelines and recommendations