---
id: common-errors
title: Common Errors & Solutions
description: Detailed guide to frequent RBIH API errors and their resolutions
sidebar_position: 2
---

# Common Errors & Solutions

This guide covers the most frequently encountered errors when integrating with RBIH APIs, providing specific solutions and prevention strategies.

## Authentication Errors

### Invalid JWT Token (401)

```json
{
  "error": {
    "code": "INVALID_TOKEN",
    "message": "JWT token is invalid or has expired",
    "details": "Token expired at 2024-01-15T09:30:00Z",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "success": false,
  "statusCode": 401
}
```

**Common Causes:**
- Token has expired (6h sandbox, 12h production)
- Invalid token format or signature
- System clock synchronization issues
- Incorrect secret key used for signing

**Solutions:**

```javascript
class TokenManager {
  async handleTokenError(error) {
    if (error.code === 'INVALID_TOKEN') {
      // Check if token is expired
      if (error.details.includes('expired')) {
        return await this.refreshToken();
      }
      
      // Check token format
      if (error.details.includes('malformed')) {
        throw new Error('Token generation logic error');
      }
      
      // Check system clock
      await this.verifySystemClock();
      return await this.generateNewToken();
    }
  }

  async verifySystemClock() {
    const serverTime = await this.getServerTime();
    const localTime = Date.now();
    const drift = Math.abs(serverTime - localTime);
    
    if (drift > 60000) { // 1 minute tolerance
      console.warn(`System clock drift: ${drift}ms`);
    }
  }
}
```

### Missing Headers (400)

```json
{
  "error": {
    "code": "MISSING_HEADER",
    "message": "Required header is missing",
    "details": "Header 'client-id' is required",
    "field": "client-id",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "success": false,
  "statusCode": 400
}
```

**Solution:**

```javascript
// Ensure all required headers are present
const requiredHeaders = {
  'Authorization': `Bearer ${jwtToken}`,
  'Content-Type': 'application/json',
  'client-id': clientId,
  'provider': providerId
};

function validateHeaders(headers) {
  const missing = [];
  for (const [key, value] of Object.entries(requiredHeaders)) {
    if (!headers[key]) {
      missing.push(key);
    }
  }
  
  if (missing.length > 0) {
    throw new Error(`Missing required headers: ${missing.join(', ')}`);
  }
}
```

### IP Not Whitelisted (403)

```json
{
  "error": {
    "code": "IP_NOT_WHITELISTED",
    "message": "Request from unauthorized IP address",
    "details": "IP 192.168.1.100 is not in whitelist",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "success": false,
  "statusCode": 403
}
```

**Solutions:**
1. Contact RBIH support to add your IP to whitelist
2. Use a whitelisted proxy or VPN
3. Check if your public IP has changed

## Validation Errors

### Invalid Input Data (422)

```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Input validation failed",
    "details": "Mobile number must be 10 digits",
    "field": "mobileNumber",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "success": false,
  "statusCode": 422
}
```

**Common Validation Issues:**

#### Mobile Number Validation
```javascript
function validateMobileNumber(mobile) {
  // Must be exactly 10 digits
  const mobileRegex = /^[6-9]\d{9}$/;
  
  if (!mobileRegex.test(mobile)) {
    throw new ValidationError('Mobile number must be 10 digits starting with 6-9');
  }
  
  return mobile;
}
```

#### PAN Number Validation
```javascript
function validatePAN(pan) {
  // Format: ABCDE1234F
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  
  if (!panRegex.test(pan)) {
    throw new ValidationError('PAN must be in format: ABCDE1234F');
  }
  
  return pan.toUpperCase();
}
```

#### Aadhaar Number Validation
```javascript
function validateAadhaar(aadhaar) {
  // Remove spaces and validate 12 digits
  const cleanAadhaar = aadhaar.replace(/\s/g, '');
  const aadhaarRegex = /^[0-9]{12}$/;
  
  if (!aadhaarRegex.test(cleanAadhaar)) {
    throw new ValidationError('Aadhaar must be 12 digits');
  }
  
  // Verhoeff algorithm validation
  if (!this.verifyVerhoeff(cleanAadhaar)) {
    throw new ValidationError('Invalid Aadhaar checksum');
  }
  
  return cleanAadhaar;
}
```

#### Document Image Validation
```javascript
function validateDocumentImage(base64Image) {
  // Check if valid base64
  if (!this.isValidBase64(base64Image)) {
    throw new ValidationError('Document image must be valid base64');
  }
  
  // Check file size (max 5MB)
  const sizeInBytes = (base64Image.length * 3) / 4;
  if (sizeInBytes > 5 * 1024 * 1024) {
    throw new ValidationError('Document image must be less than 5MB');
  }
  
  // Check if it's an image
  const imageHeader = base64Image.substring(0, 50);
  const validHeaders = ['/9j/', 'iVBOR', 'R0lGOD', 'UklGR']; // JPEG, PNG, GIF, WebP
  
  if (!validHeaders.some(header => imageHeader.includes(header))) {
    throw new ValidationError('Document must be a valid image (JPEG, PNG, GIF, WebP)');
  }
  
  return base64Image;
}
```

## Service-Specific Errors

### Document Processing Errors

```json
{
  "error": {
    "code": "DOCUMENT_PROCESSING_FAILED",
    "message": "Unable to process document image",
    "details": "Image quality too low for OCR processing",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "success": false,
  "statusCode": 422
}
```

**Solutions:**

```javascript
class DocumentProcessor {
  async handleDocumentError(error) {
    switch (error.details) {
      case 'Image quality too low':
        return {
          userMessage: 'Please provide a clearer image of the document',
          suggestions: [
            'Ensure good lighting',
            'Hold camera steady',
            'Keep document flat',
            'Use higher resolution'
          ]
        };
      
      case 'Document type not supported':
        return {
          userMessage: 'This document type is not supported',
          supportedTypes: ['Driving License', 'Voter ID', 'Passport']
        };
      
      case 'Text not readable':
        return {
          userMessage: 'Document text could not be read',
          suggestions: [
            'Ensure all text is visible',
            'Remove any obstructions',
            'Check document orientation'
          ]
        };
    }
  }
}
```

### External Service Errors

```json
{
  "error": {
    "code": "EXTERNAL_SERVICE_ERROR",
    "message": "External verification service temporarily unavailable",
    "details": "UIDAI service is down for maintenance",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "success": false,
  "statusCode": 503
}
```

**Handling Strategy:**

```javascript
class ExternalServiceHandler {
  async handleServiceError(error) {
    const retryableErrors = [
      'EXTERNAL_SERVICE_ERROR',
      'SERVICE_TIMEOUT',
      'UPSTREAM_UNAVAILABLE'
    ];
    
    if (retryableErrors.includes(error.code)) {
      return await this.scheduleRetry(error);
    }
    
    // Non-retryable errors
    return this.handlePermanentFailure(error);
  }

  async scheduleRetry(error) {
    const delays = [30, 120, 300]; // 30s, 2m, 5m
    
    for (const delay of delays) {
      await this.wait(delay * 1000);
      
      try {
        return await this.retryOperation();
      } catch (retryError) {
        if (!this.isRetryableError(retryError)) {
          throw retryError;
        }
      }
    }
    
    throw new Error('All retry attempts failed');
  }
}
```

## Rate Limiting Errors

### Rate Limit Exceeded (429)

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "API rate limit exceeded",
    "details": "Maximum 100 requests per minute allowed",
    "retryAfter": 60,
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "success": false,
  "statusCode": 429
}
```

**Implementation:**

```javascript
class RateLimitHandler {
  constructor() {
    this.rateLimitInfo = new Map();
  }

  async handleRateLimit(error, clientId, endpoint) {
    const retryAfter = error.retryAfter || 60;
    const key = `${clientId}:${endpoint}`;
    
    // Store rate limit info
    this.rateLimitInfo.set(key, {
      limitHit: Date.now(),
      retryAfter: retryAfter,
      resetTime: Date.now() + (retryAfter * 1000)
    });
    
    // Wait before retrying
    await this.exponentialBackoff(retryAfter);
    
    return this.retryRequest();
  }

  async exponentialBackoff(baseDelay) {
    const jitter = Math.random() * 0.1; // 10% jitter
    const delay = baseDelay * (1 + jitter);
    
    console.log(`Rate limited. Waiting ${delay}s before retry`);
    await this.wait(delay * 1000);
  }

  isRateLimited(clientId, endpoint) {
    const key = `${clientId}:${endpoint}`;
    const info = this.rateLimitInfo.get(key);
    
    if (!info) return false;
    
    return Date.now() < info.resetTime;
  }
}
```

## Business Logic Errors

### State-Specific Errors

```json
{
  "error": {
    "code": "STATE_NOT_SUPPORTED",
    "message": "Service not available for this state",
    "details": "Land records service not available for Goa",
    "supportedStates": ["MP", "MH", "TG", "AP", "OD"],
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "success": false,
  "statusCode": 422
}
```

**Handler:**

```javascript
class StateValidator {
  constructor() {
    this.serviceStates = {
      'lrs-owner-details': ['MP', 'MH', 'TG', 'AP', 'OD', 'UP', 'KA', 'RJ', 'GJ'],
      'lrs-lien-marking': ['MP', 'MH', 'TG', 'AP'],
      'farm-yield': ['MP', 'MH', 'TG', 'AP', 'OD']
    };
  }

  validateStateSupport(service, stateCode) {
    const supportedStates = this.serviceStates[service];
    
    if (!supportedStates || !supportedStates.includes(stateCode)) {
      throw new StateNotSupportedError(
        `${service} not available for state ${stateCode}`,
        supportedStates
      );
    }
  }

  getSupportedStates(service) {
    return this.serviceStates[service] || [];
  }
}
```

## Error Prevention Strategies

### Input Validation

```javascript
class InputValidator {
  static validationRules = {
    panNumber: {
      pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      message: 'PAN must be in format ABCDE1234F'
    },
    mobileNumber: {
      pattern: /^[6-9]\d{9}$/,
      message: 'Mobile must be 10 digits starting with 6-9'
    },
    ifscCode: {
      pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/,
      message: 'IFSC must be in format ABCD0123456'
    }
  };

  static validate(field, value) {
    const rule = this.validationRules[field];
    if (!rule) return true;

    if (!rule.pattern.test(value)) {
      throw new ValidationError(rule.message);
    }

    return true;
  }

  static validateAll(data) {
    for (const [field, value] of Object.entries(data)) {
      this.validate(field, value);
    }
  }
}
```

### Retry Configuration

```javascript
const retryConfig = {
  // Retryable error codes
  retryableErrors: [
    'RATE_LIMIT_EXCEEDED',
    'EXTERNAL_SERVICE_ERROR', 
    'SERVICE_TIMEOUT',
    'NETWORK_ERROR'
  ],
  
  // Non-retryable error codes
  permanentErrors: [
    'INVALID_TOKEN',
    'VALIDATION_FAILED',
    'IP_NOT_WHITELISTED',
    'SERVICE_NOT_FOUND'
  ],
  
  // Retry settings by error type
  retrySettings: {
    'RATE_LIMIT_EXCEEDED': {
      maxAttempts: 3,
      useRetryAfter: true,
      backoffFactor: 1
    },
    'EXTERNAL_SERVICE_ERROR': {
      maxAttempts: 3,
      baseDelay: 5000,
      backoffFactor: 2
    },
    'NETWORK_ERROR': {
      maxAttempts: 2,
      baseDelay: 1000,
      backoffFactor: 2
    }
  }
};
```

This comprehensive guide helps developers quickly identify, understand, and resolve common errors when integrating with RBIH APIs.