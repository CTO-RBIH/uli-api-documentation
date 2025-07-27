---
id: jwt-tokens
title: JWT Token Implementation
description: Complete guide to implementing JWT tokens for RBIH API authentication
sidebar_position: 2
---

# JWT Token Implementation

This guide covers the complete implementation of JWT (JSON Web Token) authentication for RBIH APIs, including token generation, validation, and refresh strategies.

## Token Structure

JWT tokens contain the following claims:

```json
{
  "iss": "your_client_id",
  "sub": "api_access",
  "provider": "provider_code",
  "iat": 1642345678,
  "exp": 1642367278
}
```

### Claim Descriptions

- **iss (Issuer)**: Your RBIH client identifier
- **sub (Subject)**: Always set to "api_access" for API operations
- **provider**: Service provider code (varies by API)
- **iat (Issued At)**: Token creation timestamp
- **exp (Expiration)**: Token expiration timestamp

## Implementation Examples

### Node.js Implementation

```javascript
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class RBIHAuth {
  constructor(clientId, clientSecret) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.tokenCache = new Map();
  }

  generateToken(providerId, environment = 'sandbox') {
    const validity = environment === 'production' ? 12 * 60 * 60 : 6 * 60 * 60;
    
    const payload = {
      iss: this.clientId,
      sub: 'api_access',
      provider: providerId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + validity
    };
    
    const token = jwt.sign(payload, this.clientSecret, { 
      algorithm: 'HS256',
      header: {
        typ: 'JWT',
        alg: 'HS256'
      }
    });
    
    // Cache token for reuse
    this.cacheToken(providerId, token, payload.exp);
    
    return token;
  }

  cacheToken(providerId, token, expiry) {
    this.tokenCache.set(providerId, {
      token,
      expiry: expiry * 1000 // Convert to milliseconds
    });
  }

  getValidToken(providerId, environment = 'sandbox') {
    const cached = this.tokenCache.get(providerId);
    
    // Check if cached token is still valid (with 5-minute buffer)
    if (cached && Date.now() < (cached.expiry - 5 * 60 * 1000)) {
      return cached.token;
    }
    
    // Generate new token if cache miss or expired
    return this.generateToken(providerId, environment);
  }

  validateToken(token) {
    try {
      const decoded = jwt.verify(token, this.clientSecret);
      return { valid: true, decoded };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }
}

// Usage
const auth = new RBIHAuth('your_client_id', 'your_client_secret');
const token = auth.getValidToken('101', 'sandbox');
```

### Python Implementation

```python
import jwt
import time
from datetime import datetime, timedelta
from typing import Dict, Optional

class RBIHAuth:
    def __init__(self, client_id: str, client_secret: str):
        self.client_id = client_id
        self.client_secret = client_secret
        self.token_cache: Dict[str, Dict] = {}
    
    def generate_token(self, provider_id: str, environment: str = 'sandbox') -> str:
        validity_hours = 12 if environment == 'production' else 6
        
        now = int(time.time())
        payload = {
            'iss': self.client_id,
            'sub': 'api_access',
            'provider': provider_id,
            'iat': now,
            'exp': now + (validity_hours * 3600)
        }
        
        token = jwt.encode(
            payload, 
            self.client_secret, 
            algorithm='HS256',
            headers={'typ': 'JWT', 'alg': 'HS256'}
        )
        
        # Cache token for reuse
        self._cache_token(provider_id, token, payload['exp'])
        
        return token
    
    def _cache_token(self, provider_id: str, token: str, expiry: int):
        self.token_cache[provider_id] = {
            'token': token,
            'expiry': expiry * 1000  # Convert to milliseconds
        }
    
    def get_valid_token(self, provider_id: str, environment: str = 'sandbox') -> str:
        cached = self.token_cache.get(provider_id)
        
        # Check if cached token is still valid (with 5-minute buffer)
        if cached and time.time() * 1000 < (cached['expiry'] - 5 * 60 * 1000):
            return cached['token']
        
        # Generate new token if cache miss or expired
        return self.generate_token(provider_id, environment)
    
    def validate_token(self, token: str) -> Dict:
        try:
            decoded = jwt.decode(token, self.client_secret, algorithms=['HS256'])
            return {'valid': True, 'decoded': decoded}
        except jwt.InvalidTokenError as e:
            return {'valid': False, 'error': str(e)}

# Usage
auth = RBIHAuth('your_client_id', 'your_client_secret')
token = auth.get_valid_token('101', 'sandbox')
```

## Token Refresh Strategy

### Automatic Token Refresh

```javascript
class TokenManager {
  constructor(auth, providerId, environment) {
    this.auth = auth;
    this.providerId = providerId;
    this.environment = environment;
    this.refreshBuffer = 5 * 60 * 1000; // 5 minutes
  }

  async getToken() {
    const cached = this.auth.tokenCache.get(this.providerId);
    
    if (!cached || this.isTokenExpiringSoon(cached)) {
      await this.refreshToken();
    }
    
    return this.auth.tokenCache.get(this.providerId).token;
  }

  isTokenExpiringSoon(cached) {
    return Date.now() > (cached.expiry - this.refreshBuffer);
  }

  async refreshToken() {
    console.log(`Refreshing token for provider ${this.providerId}`);
    const newToken = this.auth.generateToken(this.providerId, this.environment);
    
    // Notify application of token refresh
    this.onTokenRefresh?.(newToken);
    
    return newToken;
  }

  onTokenRefresh(callback) {
    this.onTokenRefresh = callback;
  }
}
```

## Environment-Specific Configuration

### Sandbox Configuration

```javascript
const sandboxConfig = {
  tokenValidity: 6 * 60 * 60, // 6 hours
  baseUrl: 'https://sandbox.rbihapis.com',
  refreshBuffer: 5 * 60, // 5 minutes
  algorithm: 'HS256'
};
```

### Production Configuration

```javascript
const productionConfig = {
  tokenValidity: 12 * 60 * 60, // 12 hours
  baseUrl: 'https://api.rbihapis.com',
  refreshBuffer: 30 * 60, // 30 minutes
  algorithm: 'HS256'
};
```

## Error Handling

### Common JWT Errors

```javascript
function handleJWTError(error) {
  switch (error.name) {
    case 'TokenExpiredError':
      return {
        code: 'TOKEN_EXPIRED',
        message: 'JWT token has expired',
        action: 'Generate new token'
      };
    
    case 'JsonWebTokenError':
      return {
        code: 'INVALID_TOKEN',
        message: 'JWT token is malformed',
        action: 'Check token generation logic'
      };
    
    case 'NotBeforeError':
      return {
        code: 'TOKEN_NOT_ACTIVE',
        message: 'JWT token is not active yet',
        action: 'Check system clock synchronization'
      };
    
    default:
      return {
        code: 'JWT_ERROR',
        message: 'Unknown JWT error',
        action: 'Contact support'
      };
  }
}
```

## Security Considerations

### Token Storage

```javascript
// ✅ Good: Secure token storage
class SecureTokenStorage {
  constructor() {
    this.tokens = new Map();
  }

  store(providerId, token) {
    // In production, use encrypted storage
    this.tokens.set(providerId, this.encrypt(token));
  }

  retrieve(providerId) {
    const encrypted = this.tokens.get(providerId);
    return encrypted ? this.decrypt(encrypted) : null;
  }

  encrypt(data) {
    // Implement encryption logic
    return data; // Simplified for example
  }

  decrypt(data) {
    // Implement decryption logic
    return data; // Simplified for example
  }
}

// ❌ Bad: Insecure token storage
localStorage.setItem('jwt_token', token); // Never do this
```

### Clock Synchronization

```javascript
// Verify system clock synchronization
async function verifyClockSync() {
  try {
    const response = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC');
    const { unixtime } = await response.json();
    const serverTime = unixtime * 1000;
    const localTime = Date.now();
    const drift = Math.abs(serverTime - localTime);
    
    if (drift > 60000) { // 1 minute tolerance
      console.warn(`Clock drift detected: ${drift}ms`);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Failed to verify clock sync:', error);
    return false;
  }
}
```

## Testing JWT Implementation

### Unit Tests

```javascript
const assert = require('assert');

describe('JWT Token Generation', () => {
  const auth = new RBIHAuth('test_client', 'test_secret');
  
  it('should generate valid JWT token', () => {
    const token = auth.generateToken('101', 'sandbox');
    const validation = auth.validateToken(token);
    
    assert.strictEqual(validation.valid, true);
    assert.strictEqual(validation.decoded.iss, 'test_client');
    assert.strictEqual(validation.decoded.provider, '101');
  });
  
  it('should cache tokens correctly', () => {
    const token1 = auth.getValidToken('101', 'sandbox');
    const token2 = auth.getValidToken('101', 'sandbox');
    
    assert.strictEqual(token1, token2);
  });
  
  it('should handle expired tokens', () => {
    // Mock expired token
    const expiredPayload = {
      iss: 'test_client',
      sub: 'api_access',
      provider: '101',
      iat: Math.floor(Date.now() / 1000) - 7200,
      exp: Math.floor(Date.now() / 1000) - 3600
    };
    
    const expiredToken = jwt.sign(expiredPayload, 'test_secret');
    const validation = auth.validateToken(expiredToken);
    
    assert.strictEqual(validation.valid, false);
    assert(validation.error.includes('expired'));
  });
});
```

This JWT implementation provides a robust foundation for RBIH API authentication with proper caching, automatic refresh, and comprehensive error handling.