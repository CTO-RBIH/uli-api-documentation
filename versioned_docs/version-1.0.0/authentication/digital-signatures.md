---
id: digital-signatures
title: Digital Signatures & Security
description: Implementation guide for HMAC SHA-256 and PKI certificates in RBIH APIs
sidebar_position: 3
---

# Digital Signatures & Security

Many RBIH APIs implement additional security through digital signatures to ensure data integrity and prevent tampering. This guide covers HMAC SHA-256 signatures and PKI certificate implementation.

## HMAC SHA-256 Signatures

### Overview

HMAC (Hash-based Message Authentication Code) with SHA-256 provides cryptographic authentication for API requests and webhook callbacks.

### Signature Generation

```javascript
const crypto = require('crypto');

class HMACSignature {
  constructor(secret) {
    this.secret = secret;
  }

  generateSignature(data) {
    const message = typeof data === 'string' ? data : JSON.stringify(data);
    return crypto
      .createHmac('sha256', this.secret)
      .update(message, 'utf8')
      .digest('hex');
  }

  verifySignature(data, signature) {
    const expectedSignature = this.generateSignature(data);
    
    // Use timing-safe comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'hex'),
      Buffer.from(signature.replace('sha256=', ''), 'hex')
    );
  }

  signRequest(requestData) {
    const signature = this.generateSignature(requestData);
    return `sha256=${signature}`;
  }
}

// Usage
const hmac = new HMACSignature('your_webhook_secret');
const signature = hmac.signRequest(requestData);

// Add to request headers
headers['X-Signature'] = signature;
```

### API Request Signing

```javascript
async function makeSignedRequest(endpoint, data, credentials) {
  const timestamp = Date.now().toString();
  const nonce = crypto.randomBytes(16).toString('hex');
  
  // Create signature payload
  const signaturePayload = {
    method: 'POST',
    url: endpoint,
    timestamp: timestamp,
    nonce: nonce,
    body: JSON.stringify(data)
  };
  
  const hmac = new HMACSignature(credentials.clientSecret);
  const signature = hmac.generateSignature(signaturePayload);
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${credentials.jwtToken}`,
      'Content-Type': 'application/json',
      'X-Signature': `sha256=${signature}`,
      'X-Timestamp': timestamp,
      'X-Nonce': nonce,
      'client-id': credentials.clientId
    },
    body: JSON.stringify(data)
  });
  
  return response;
}
```

### Webhook Signature Verification

```javascript
class WebhookVerifier {
  constructor(secret) {
    this.hmac = new HMACSignature(secret);
  }

  verifyWebhook(payload, signature, tolerance = 300) {
    // Verify timestamp to prevent replay attacks
    const timestamp = parseInt(payload.timestamp);
    const currentTime = Math.floor(Date.now() / 1000);
    
    if (Math.abs(currentTime - timestamp) > tolerance) {
      throw new Error('Webhook timestamp outside tolerance window');
    }
    
    // Verify signature
    if (!this.hmac.verifySignature(payload, signature)) {
      throw new Error('Invalid webhook signature');
    }
    
    return true;
  }

  handleWebhook(req, res) {
    try {
      const signature = req.headers['x-signature'];
      const rawBody = req.body;
      
      if (!signature) {
        return res.status(401).json({ error: 'Missing signature' });
      }
      
      this.verifyWebhook(rawBody, signature);
      
      // Process webhook data
      const webhookData = JSON.parse(rawBody);
      this.processWebhookData(webhookData);
      
      res.status(200).json({ status: 'success' });
    } catch (error) {
      console.error('Webhook verification failed:', error);
      res.status(401).json({ error: 'Webhook verification failed' });
    }
  }
}
```

## PKI Certificates

### Certificate-Based Authentication

Some RBIH APIs require PKI (Public Key Infrastructure) certificates for enhanced security:

```javascript
const fs = require('fs');
const https = require('https');

class PKIClient {
  constructor(certPath, keyPath, caPath) {
    this.cert = fs.readFileSync(certPath);
    this.key = fs.readFileSync(keyPath);
    this.ca = caPath ? fs.readFileSync(caPath) : null;
  }

  createHTTPSAgent() {
    return new https.Agent({
      cert: this.cert,
      key: this.key,
      ca: this.ca,
      rejectUnauthorized: true,
      keepAlive: true
    });
  }

  async makeRequest(url, data) {
    const agent = this.createHTTPSAgent();
    
    const response = await fetch(url, {
      method: 'POST',
      agent: agent,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    return response;
  }
}

// Usage
const pkiClient = new PKIClient(
  './certs/client.crt',
  './certs/client.key',
  './certs/ca.crt'
);
```

### JWS (JSON Web Signature)

For APIs requiring JWS signatures:

```javascript
const jose = require('node-jose');

class JWSSigner {
  constructor(privateKey) {
    this.privateKey = privateKey;
  }

  async signPayload(payload) {
    const keystore = jose.JWK.createKeyStore();
    await keystore.add(this.privateKey, 'pem');
    
    const key = keystore.all()[0];
    
    const signature = await jose.JWS.createSign({
      format: 'flattened',
      fields: {
        alg: 'RS256',
        typ: 'JWS'
      }
    }, key)
    .update(JSON.stringify(payload))
    .final();
    
    return signature;
  }

  async verifySignature(jws, publicKey) {
    const keystore = jose.JWK.createKeyStore();
    await keystore.add(publicKey, 'pem');
    
    const result = await jose.JWS.createVerify(keystore)
      .verify(jws);
    
    return JSON.parse(result.payload.toString());
  }
}

// Usage
const jwsSigner = new JWSSigner(privateKeyPEM);
const signedPayload = await jwsSigner.signPayload(requestData);
```

## Implementation Examples

### Complete Signed Request Flow

```javascript
class SecureRBIHClient {
  constructor(config) {
    this.config = config;
    this.auth = new RBIHAuth(config.clientId, config.clientSecret);
    this.hmac = new HMACSignature(config.signingSecret);
  }

  async makeSecureRequest(endpoint, data, providerId) {
    // Generate JWT token
    const jwtToken = this.auth.getValidToken(providerId);
    
    // Prepare request data
    const timestamp = Date.now().toString();
    const nonce = crypto.randomBytes(16).toString('hex');
    const requestBody = JSON.stringify(data);
    
    // Create signature
    const signatureData = `${endpoint}${timestamp}${nonce}${requestBody}`;
    const signature = this.hmac.generateSignature(signatureData);
    
    // Make request
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
        'X-Signature': `sha256=${signature}`,
        'X-Timestamp': timestamp,
        'X-Nonce': nonce,
        'client-id': this.config.clientId,
        'provider': providerId
      },
      body: requestBody
    });
    
    // Verify response signature if present
    if (response.headers.get('X-Signature')) {
      await this.verifyResponseSignature(response);
    }
    
    return response.json();
  }

  async verifyResponseSignature(response) {
    const signature = response.headers.get('X-Signature');
    const responseBody = await response.text();
    
    if (!this.hmac.verifySignature(responseBody, signature)) {
      throw new Error('Response signature verification failed');
    }
  }
}
```

### Python Implementation

```python
import hmac
import hashlib
import json
import time
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import rsa, padding

class HMACSignature:
    def __init__(self, secret: str):
        self.secret = secret.encode('utf-8')
    
    def generate_signature(self, data: str) -> str:
        if isinstance(data, dict):
            data = json.dumps(data, separators=(',', ':'))
        
        return hmac.new(
            self.secret,
            data.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()
    
    def verify_signature(self, data: str, signature: str) -> bool:
        expected = self.generate_signature(data)
        signature_clean = signature.replace('sha256=', '')
        
        return hmac.compare_digest(expected, signature_clean)

class PKISigner:
    def __init__(self, private_key_path: str):
        with open(private_key_path, 'rb') as key_file:
            self.private_key = serialization.load_pem_private_key(
                key_file.read(),
                password=None
            )
    
    def sign_data(self, data: bytes) -> bytes:
        signature = self.private_key.sign(
            data,
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH
            ),
            hashes.SHA256()
        )
        return signature
    
    def verify_signature(self, data: bytes, signature: bytes, public_key) -> bool:
        try:
            public_key.verify(
                signature,
                data,
                padding.PSS(
                    mgf=padding.MGF1(hashes.SHA256()),
                    salt_length=padding.PSS.MAX_LENGTH
                ),
                hashes.SHA256()
            )
            return True
        except Exception:
            return False
```

## Security Best Practices

### Secret Management

```javascript
// ✅ Good: Use environment variables or secure key management
const signingSecret = process.env.RBIH_SIGNING_SECRET;

// ❌ Bad: Hardcoded secrets
const signingSecret = 'my-secret-key'; // Never do this
```

### Timestamp Validation

```javascript
function validateTimestamp(timestamp, tolerance = 300) {
  const requestTime = parseInt(timestamp);
  const currentTime = Math.floor(Date.now() / 1000);
  const timeDiff = Math.abs(currentTime - requestTime);
  
  if (timeDiff > tolerance) {
    throw new Error(`Request timestamp outside tolerance: ${timeDiff}s`);
  }
}
```

### Nonce Tracking

```javascript
class NonceValidator {
  constructor(ttl = 300) {
    this.usedNonces = new Map();
    this.ttl = ttl * 1000; // Convert to milliseconds
  }

  validateNonce(nonce) {
    const now = Date.now();
    
    // Clean expired nonces
    this.cleanExpiredNonces(now);
    
    // Check if nonce already used
    if (this.usedNonces.has(nonce)) {
      throw new Error('Nonce already used');
    }
    
    // Add nonce to used set
    this.usedNonces.set(nonce, now);
  }

  cleanExpiredNonces(now) {
    for (const [nonce, timestamp] of this.usedNonces) {
      if (now - timestamp > this.ttl) {
        this.usedNonces.delete(nonce);
      }
    }
  }
}
```

## Error Handling

### Signature Verification Errors

```javascript
function handleSignatureError(error) {
  switch (error.message) {
    case 'Invalid webhook signature':
      return {
        code: 'SIGNATURE_INVALID',
        message: 'Signature verification failed',
        action: 'Check signing secret and payload'
      };
    
    case 'Missing signature':
      return {
        code: 'SIGNATURE_MISSING',
        message: 'Required signature header missing',
        action: 'Include X-Signature header'
      };
    
    case 'Webhook timestamp outside tolerance window':
      return {
        code: 'TIMESTAMP_INVALID',
        message: 'Request timestamp is too old or too new',
        action: 'Check system clock synchronization'
      };
    
    default:
      return {
        code: 'SIGNATURE_ERROR',
        message: 'Unknown signature error',
        action: 'Contact support'
      };
  }
}
```

This comprehensive guide provides the foundation for implementing secure digital signatures with RBIH APIs, ensuring data integrity and preventing unauthorized access.