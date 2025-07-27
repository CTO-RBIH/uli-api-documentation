---
id: best-practices
title: Security Best Practices
description: Comprehensive security guidelines and best practices for RBIH API integration
sidebar_position: 5
---

# Security Best Practices

This guide outlines essential security practices for integrating with RBIH APIs, covering credential management, secure implementation patterns, and compliance requirements.

## Credential Management

### Secure Storage

```javascript
// ✅ Good: Environment variables
const config = {
  clientId: process.env.RBIH_CLIENT_ID,
  clientSecret: process.env.RBIH_CLIENT_SECRET,
  signingSecret: process.env.RBIH_SIGNING_SECRET
};

// ✅ Good: Secure key management service
const AWS = require('aws-sdk');
const secretsManager = new AWS.SecretsManager();

async function getCredentials() {
  const secret = await secretsManager.getSecretValue({
    SecretId: 'rbih-api-credentials'
  }).promise();
  
  return JSON.parse(secret.SecretString);
}

// ❌ Bad: Hardcoded credentials
const config = {
  clientId: 'your-client-id', // Never do this
  clientSecret: 'your-secret-key' // Extremely insecure
};
```

### Credential Rotation

```javascript
class CredentialManager {
  constructor() {
    this.rotationSchedule = 90 * 24 * 60 * 60 * 1000; // 90 days
    this.credentials = new Map();
  }

  async rotateCredentials(serviceId) {
    try {
      // Get new credentials from RBIH
      const newCredentials = await this.requestNewCredentials(serviceId);
      
      // Test new credentials
      await this.validateCredentials(newCredentials);
      
      // Update active credentials
      this.credentials.set(serviceId, {
        ...newCredentials,
        rotatedAt: Date.now(),
        expiresAt: Date.now() + this.rotationSchedule
      });
      
      // Notify applications of credential update
      await this.notifyCredentialUpdate(serviceId, newCredentials);
      
      console.log(`Credentials rotated successfully for ${serviceId}`);
    } catch (error) {
      console.error(`Credential rotation failed for ${serviceId}:`, error);
      // Implement alerting for failed rotations
      await this.alertRotationFailure(serviceId, error);
    }
  }

  async scheduleRotation() {
    setInterval(async () => {
      for (const [serviceId, creds] of this.credentials) {
        if (this.shouldRotate(creds)) {
          await this.rotateCredentials(serviceId);
        }
      }
    }, 24 * 60 * 60 * 1000); // Check daily
  }

  shouldRotate(credentials) {
    const rotationBuffer = 7 * 24 * 60 * 60 * 1000; // 7 days before expiry
    return Date.now() > (credentials.expiresAt - rotationBuffer);
  }
}
```

## Network Security

### TLS Configuration

```javascript
const https = require('https');
const tls = require('tls');

// Configure strict TLS settings
const secureAgent = new https.Agent({
  // Enforce TLS 1.3
  secureProtocol: 'TLSv1_3_method',
  
  // Require certificate validation
  rejectUnauthorized: true,
  
  // Check hostname
  checkServerIdentity: tls.checkServerIdentity,
  
  // Cipher suites (TLS 1.3)
  ciphers: [
    'TLS_AES_256_GCM_SHA384',
    'TLS_CHACHA20_POLY1305_SHA256',
    'TLS_AES_128_GCM_SHA256'
  ].join(':'),
  
  // Certificate pinning
  ca: fs.readFileSync('./certs/rbih-ca.pem'),
  
  // Keep-alive settings
  keepAlive: true,
  keepAliveMsecs: 30000,
  maxSockets: 50
});

class SecureHTTPClient {
  constructor() {
    this.agent = secureAgent;
  }

  async makeRequest(url, options) {
    return fetch(url, {
      ...options,
      agent: this.agent,
      headers: {
        ...options.headers,
        'User-Agent': 'RBIH-Client/1.0.0',
        'X-Client-Version': '1.0.0'
      }
    });
  }
}
```

### Certificate Pinning

```javascript
class CertificatePinner {
  constructor() {
    this.pinnedCertificates = new Map([
      ['api.rbihapis.com', 'sha256/AbCdEf1234567890...'],
      ['sandbox.rbihapis.com', 'sha256/XyZ123AbC4567890...']
    ]);
  }

  validateCertificate(hostname, cert) {
    const expectedFingerprint = this.pinnedCertificates.get(hostname);
    if (!expectedFingerprint) {
      throw new Error(`No pinned certificate for ${hostname}`);
    }

    const actualFingerprint = this.calculateFingerprint(cert);
    if (actualFingerprint !== expectedFingerprint) {
      throw new Error(`Certificate fingerprint mismatch for ${hostname}`);
    }

    return true;
  }

  calculateFingerprint(cert) {
    const crypto = require('crypto');
    return 'sha256/' + crypto
      .createHash('sha256')
      .update(cert.raw)
      .digest('base64');
  }
}
```

## Input Validation & Sanitization

### Request Validation

```javascript
const Joi = require('joi');

class RequestValidator {
  constructor() {
    this.schemas = {
      panVerification: Joi.object({
        panNumber: Joi.string()
          .pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
          .required()
          .messages({
            'string.pattern.base': 'Invalid PAN format'
          }),
        nameToMatch: Joi.string()
          .min(2)
          .max(100)
          .pattern(/^[a-zA-Z\s.]+$/)
          .required()
      }),
      
      aadhaarRedact: Joi.object({
        documentImage: Joi.string()
          .base64()
          .max(5 * 1024 * 1024) // 5MB limit
          .required(),
        redactionLevel: Joi.string()
          .valid('partial', 'full')
          .default('partial')
      }),
      
      bankVerification: Joi.object({
        accountNumber: Joi.string()
          .pattern(/^[0-9]{9,18}$/)
          .required(),
        ifsc: Joi.string()
          .pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)
          .required(),
        holderName: Joi.string()
          .min(2)
          .max(100)
          .required()
      })
    };
  }

  validate(service, data) {
    const schema = this.schemas[service];
    if (!schema) {
      throw new Error(`No validation schema for service: ${service}`);
    }

    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      throw new ValidationError('Input validation failed', error.details);
    }

    return value;
  }

  sanitizeInput(data) {
    // Remove potentially harmful characters
    const sanitized = {};
    
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        sanitized[key] = value
          .replace(/[<>]/g, '') // Remove HTML-like tags
          .replace(/['"]/g, '') // Remove quotes
          .trim();
      } else {
        sanitized[key] = value;
      }
    }
    
    return sanitized;
  }
}

class ValidationError extends Error {
  constructor(message, details) {
    super(message);
    this.name = 'ValidationError';
    this.details = details;
  }
}
```

### Data Sanitization

```javascript
class DataSanitizer {
  constructor() {
    this.sensitivePatterns = [
      /\b\d{4}\s?\d{4}\s?\d{4}\b/g, // Aadhaar-like patterns
      /\b[A-Z]{5}\d{4}[A-Z]\b/g,    // PAN patterns
      /\b\d{10,18}\b/g,             // Account number patterns
      /\b[A-Z]{4}0[A-Z0-9]{6}\b/g   // IFSC patterns
    ];
  }

  sanitizeForLogging(data) {
    let sanitized = JSON.stringify(data);
    
    // Replace sensitive patterns
    this.sensitivePatterns.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '[REDACTED]');
    });
    
    // Additional field-specific sanitization
    const parsed = JSON.parse(sanitized);
    
    const sensitiveFields = [
      'aadhaarNumber', 'panNumber', 'mobileNumber',
      'accountNumber', 'ifsc', 'documentImage',
      'biometricData', 'otp', 'pin'
    ];
    
    sensitiveFields.forEach(field => {
      if (parsed[field]) {
        parsed[field] = '[REDACTED]';
      }
    });
    
    return parsed;
  }

  maskSensitiveData(data, type) {
    switch (type) {
      case 'aadhaar':
        return data.replace(/(\d{4})(\d{4})(\d{4})/, 'XXXX-XXXX-$3');
      
      case 'pan':
        return data.replace(/([A-Z]{3})([A-Z]{2})(\d{4})([A-Z])/, '$1XX$3$4');
      
      case 'mobile':
        return data.replace(/(\d{2})(\d{6})(\d{2})/, '$1XXXXXX$3');
      
      case 'account':
        return data.replace(/(\d{2})(\d+)(\d{4})/, '$1XXX$3');
      
      default:
        return '[MASKED]';
    }
  }
}
```

## Error Handling Security

### Secure Error Responses

```javascript
class SecureErrorHandler {
  constructor(environment = 'production') {
    this.environment = environment;
    this.sensitiveErrors = [
      'database connection',
      'internal server',
      'credential',
      'secret',
      'key'
    ];
  }

  handleError(error, context) {
    // Log full error details internally
    this.logError(error, context);
    
    // Return sanitized error to client
    return this.sanitizeError(error);
  }

  logError(error, context) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      error: {
        message: error.message,
        stack: error.stack,
        code: error.code
      },
      context: this.sanitizeContext(context),
      environment: this.environment
    };
    
    // Send to secure logging service
    console.error('Application Error:', logEntry);
  }

  sanitizeError(error) {
    // Check if error contains sensitive information
    const isSensitive = this.sensitiveErrors.some(keyword =>
      error.message.toLowerCase().includes(keyword)
    );
    
    if (isSensitive || this.environment === 'production') {
      return {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An internal error occurred',
          timestamp: new Date().toISOString()
        },
        success: false
      };
    }
    
    // Return detailed error only in development
    return {
      error: {
        code: error.code || 'UNKNOWN_ERROR',
        message: error.message,
        timestamp: new Date().toISOString()
      },
      success: false
    };
  }

  sanitizeContext(context) {
    const sanitizer = new DataSanitizer();
    return sanitizer.sanitizeForLogging(context);
  }
}
```

## Rate Limiting & Abuse Prevention

### Intelligent Rate Limiting

```javascript
class IntelligentRateLimiter {
  constructor() {
    this.windows = new Map();
    this.suspiciousPatterns = new Map();
  }

  checkRateLimit(clientId, endpoint) {
    const key = `${clientId}:${endpoint}`;
    const now = Date.now();
    const windowSize = 60 * 1000; // 1 minute
    
    // Get or create window
    if (!this.windows.has(key)) {
      this.windows.set(key, []);
    }
    
    const window = this.windows.get(key);
    
    // Remove old requests outside window
    const validRequests = window.filter(time => now - time < windowSize);
    this.windows.set(key, validRequests);
    
    // Check patterns for abuse
    this.detectSuspiciousPatterns(clientId, validRequests.length);
    
    // Add current request
    validRequests.push(now);
    
    // Check if rate limit exceeded
    const limit = this.getRateLimit(endpoint);
    if (validRequests.length > limit) {
      throw new RateLimitError(`Rate limit exceeded: ${validRequests.length}/${limit}`);
    }
    
    return {
      allowed: true,
      remaining: limit - validRequests.length,
      resetTime: now + windowSize
    };
  }

  detectSuspiciousPatterns(clientId, requestCount) {
    // Detect burst patterns
    if (requestCount > 50) { // Burst detection
      this.flagSuspiciousActivity(clientId, 'burst_pattern');
    }
    
    // Detect sustained high volume
    const hourlyKey = `${clientId}:hourly`;
    const hourlyRequests = this.getHourlyRequestCount(clientId);
    
    if (hourlyRequests > 1000) {
      this.flagSuspiciousActivity(clientId, 'high_volume');
    }
  }

  flagSuspiciousActivity(clientId, pattern) {
    const key = `${clientId}:${pattern}`;
    const count = (this.suspiciousPatterns.get(key) || 0) + 1;
    this.suspiciousPatterns.set(key, count);
    
    if (count > 3) {
      this.triggerSecurityAlert(clientId, pattern);
    }
  }

  triggerSecurityAlert(clientId, pattern) {
    console.warn(`Security alert: ${pattern} detected for client ${clientId}`);
    // Implement alerting mechanism
  }
}

class RateLimitError extends Error {
  constructor(message, retryAfter = 60) {
    super(message);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}
```

## Audit Logging

### Comprehensive Audit Trail

```javascript
class AuditLogger {
  constructor() {
    this.sanitizer = new DataSanitizer();
  }

  async logAPIAccess(context) {
    const auditEntry = {
      timestamp: new Date().toISOString(),
      eventType: 'API_ACCESS',
      
      // Request information
      request: {
        id: context.requestId,
        method: context.method,
        endpoint: context.endpoint,
        clientId: context.clientId,
        ipAddress: this.hashIP(context.ipAddress),
        userAgent: context.userAgent
      },
      
      // Response information
      response: {
        statusCode: context.statusCode,
        responseTime: context.responseTime,
        dataCategory: this.categorizeData(context.endpoint)
      },
      
      // Security information
      security: {
        authMethod: 'JWT',
        tokenValid: context.tokenValid,
        signatureValid: context.signatureValid,
        tlsVersion: context.tlsVersion
      },
      
      // Compliance flags
      compliance: {
        rbiCompliant: true,
        dataProtection: true,
        retentionApplied: true
      }
    };
    
    // Store in secure audit database
    await this.storeAuditEntry(auditEntry);
    
    // Real-time security monitoring
    await this.analyzeForThreats(auditEntry);
  }

  hashIP(ipAddress) {
    const crypto = require('crypto');
    return crypto.createHash('sha256')
      .update(ipAddress + process.env.IP_SALT)
      .digest('hex')
      .substring(0, 16); // Partial hash for privacy
  }

  categorizeData(endpoint) {
    const categories = {
      '/pan/': 'financial_identity',
      '/aadhaar/': 'government_identity',
      '/bank/': 'financial_account',
      '/land/': 'property_records',
      '/farm/': 'agricultural_data'
    };
    
    for (const [pattern, category] of Object.entries(categories)) {
      if (endpoint.includes(pattern)) {
        return category;
      }
    }
    
    return 'general';
  }

  async analyzeForThreats(auditEntry) {
    // Implement threat detection logic
    const threats = [];
    
    // Check for unusual patterns
    if (auditEntry.response.responseTime > 10000) {
      threats.push('slow_response');
    }
    
    if (auditEntry.response.statusCode >= 400) {
      threats.push('error_response');
    }
    
    if (threats.length > 0) {
      await this.triggerThreatAlert(auditEntry, threats);
    }
  }
}
```

## Monitoring & Alerting

### Security Monitoring

```javascript
class SecurityMonitor {
  constructor() {
    this.alertThresholds = {
      failedAuthAttempts: 5,
      errorRate: 0.05, // 5%
      responseTime: 10000, // 10 seconds
      suspiciousPatterns: 3
    };
  }

  async monitorSecurityMetrics() {
    const metrics = await this.collectMetrics();
    
    // Check each metric against thresholds
    for (const [metric, value] of Object.entries(metrics)) {
      if (this.exceedsThreshold(metric, value)) {
        await this.triggerAlert(metric, value);
      }
    }
  }

  async collectMetrics() {
    // Collect from various sources
    return {
      failedAuthAttempts: await this.getFailedAuthCount(),
      errorRate: await this.getErrorRate(),
      averageResponseTime: await this.getAverageResponseTime(),
      suspiciousActivity: await this.getSuspiciousActivityCount()
    };
  }

  exceedsThreshold(metric, value) {
    const threshold = this.alertThresholds[metric];
    return threshold && value > threshold;
  }

  async triggerAlert(metric, value) {
    const alert = {
      timestamp: new Date().toISOString(),
      severity: this.getSeverity(metric, value),
      metric: metric,
      value: value,
      threshold: this.alertThresholds[metric],
      recommendedAction: this.getRecommendedAction(metric)
    };
    
    // Send alert through multiple channels
    await this.sendAlert(alert);
  }

  getSeverity(metric, value) {
    const threshold = this.alertThresholds[metric];
    const ratio = value / threshold;
    
    if (ratio > 3) return 'critical';
    if (ratio > 2) return 'high';
    if (ratio > 1.5) return 'medium';
    return 'low';
  }

  getRecommendedAction(metric) {
    const actions = {
      failedAuthAttempts: 'Review authentication logs and consider IP blocking',
      errorRate: 'Check application health and error patterns',
      responseTime: 'Investigate performance bottlenecks',
      suspiciousActivity: 'Review security logs and user behavior'
    };
    
    return actions[metric] || 'Investigate the alert';
  }
}
```

## Implementation Checklist

### Security Checklist

```javascript
const securityChecklist = {
  authentication: [
    'JWT tokens implemented correctly',
    'Token expiration handled properly',
    'Credentials stored securely',
    'Regular credential rotation scheduled'
  ],
  
  communication: [
    'TLS 1.3 enforced',
    'Certificate pinning implemented',
    'All requests over HTTPS',
    'Proper certificate validation'
  ],
  
  dataProtection: [
    'Input validation implemented',
    'Output sanitization applied',
    'Sensitive data masked in logs',
    'Proper error handling'
  ],
  
  monitoring: [
    'Comprehensive audit logging',
    'Security monitoring active',
    'Alerting configured',
    'Regular security reviews'
  ],
  
  compliance: [
    'RBI guidelines followed',
    'Data retention policies implemented',
    'Privacy controls in place',
    'Regular compliance audits'
  ]
};

class SecurityValidator {
  async validateSecurity() {
    const results = {};
    
    for (const [category, checks] of Object.entries(securityChecklist)) {
      results[category] = await this.validateCategory(category, checks);
    }
    
    return this.generateSecurityReport(results);
  }

  generateSecurityReport(results) {
    const allPassed = Object.values(results)
      .every(category => category.passed);
    
    return {
      securityCompliant: allPassed,
      categories: results,
      recommendations: this.getSecurityRecommendations(results)
    };
  }
}
```

Following these security best practices ensures robust, compliant, and secure integration with RBIH APIs while protecting sensitive data and maintaining regulatory compliance.