---
id: environments
title: Environment Configuration
description: Sandbox vs Production environment setup and configuration guide
sidebar_position: 4
---

# Environment Configuration

RBIH provides separate sandbox and production environments to support development, testing, and live operations. This guide covers the configuration differences and best practices for each environment.

## Environment Overview

| Aspect | Sandbox | Production |
|--------|---------|------------|
| **Purpose** | Development & Testing | Live Operations |
| **Token Validity** | 6 hours | 6 hours |
| **Rate Limits** | Lower limits for testing | Higher limits for operations |
| **Data** | Mock/Test data | Real/Live data |
| **Monitoring** | Basic logging | Comprehensive monitoring |
| **SLA** | No SLA guarantees | 99.9% uptime SLA |

## Sandbox Environment

### Configuration

```javascript
const sandboxConfig = {
  baseUrl: 'https://sandbox.rbihapis.com',
  authUrl: 'https://auth.nonprod.rbihub.io',
  devPortal: 'https://am.nonprod.rbihub.io/devportal',
  
  // Token settings
  tokenValidity: 6 * 60 * 60, // 6 hours
  refreshBuffer: 5 * 60, // 5 minutes before expiry
  
  // Rate limits (requests per minute)
  rateLimits: {
    global: 100,
    identity: 50,
    financial: 30,
    landRecords: 25,
    agricultural: 5
  },
  
  // Security settings
  security: {
    tlsVersion: '1.3',
    certificateValidation: 'strict',
    ipWhitelisting: true
  },
  
  // Retry settings
  retry: {
    maxAttempts: 3,
    baseDelay: 1000,
    maxDelay: 10000
  },
  
  // Logging
  logging: {
    level: 'debug',
    includeHeaders: true,
    includePayload: true // Only in sandbox
  }
};
```

### Sandbox-Specific Features

#### Test Data Support

```javascript
const sandboxTestData = {
  // Valid test PAN numbers
  validPANs: [
    'ABCDE1234F',
    'XYZAB5678C',
    'TESTPAN123'
  ],
  
  // Valid test Aadhaar numbers (masked)
  validAadhaar: [
    'XXXX-XXXX-1234',
    'XXXX-XXXX-5678'
  ],
  
  // Test mobile numbers
  validMobile: [
    '9876543210',
    '8765432109'
  ],
  
  // Test bank accounts
  validAccounts: [
    {
      accountNumber: '1234567890',
      ifsc: 'HDFC0000001',
      holderName: 'Test User'
    }
  ]
};
```

#### Mock Responses

```javascript
class SandboxClient {
  constructor(config) {
    this.config = config;
    this.mockMode = config.enableMocks || false;
  }

  async verifyPAN(panNumber) {
    if (this.mockMode && this.isTestPAN(panNumber)) {
      return this.getMockPANResponse(panNumber);
    }
    
    return this.makeRealRequest('/pan/verify', { panNumber });
  }

  isTestPAN(panNumber) {
    return sandboxTestData.validPANs.includes(panNumber);
  }

  getMockPANResponse(panNumber) {
    return {
      success: true,
      data: {
        panNumber: panNumber,
        name: 'Test User Name',
        isValid: true,
        category: 'Individual',
        lastUpdated: new Date().toISOString()
      },
      mockResponse: true
    };
  }
}
```

## Production Environment

### Configuration

```javascript
const productionConfig = {
  baseUrl: 'https://api.rbihapis.com',
  authUrl: 'https://auth.api.rbihub.io',
  devPortal: 'https://am.api.rbihub.io/devportal',
  
  // Token settings
  tokenValidity: 12 * 60 * 60, // 6 hours
  refreshBuffer: 30 * 60, // 30 minutes before expiry
  
  // Rate limits (requests per minute)
  rateLimits: {
    global: 1000,
    identity: 500,
    financial: 300,
    landRecords: 150,
    agricultural: 25
  },
  
  // Security settings
  security: {
    tlsVersion: '1.3',
    certificateValidation: 'strict',
    ipWhitelisting: true,
    additionalHeaders: {
      'X-Environment': 'production',
      'X-Client-Version': '1.0.0'
    }
  },
  
  // Retry settings
  retry: {
    maxAttempts: 1, // Conservative in production
    baseDelay: 2000,
    maxDelay: 30000
  },
  
  // Logging
  logging: {
    level: 'error',
    includeHeaders: false,
    includePayload: false, // Never log sensitive data
    auditOnly: true
  },
  
  // Monitoring
  monitoring: {
    healthCheck: true,
    metrics: true,
    alerting: true
  }
};
```

### Production-Specific Features

#### Enhanced Security

```javascript
class ProductionSecurityManager {
  constructor() {
    this.sensitiveFields = [
      'aadhaarNumber', 'panNumber', 'mobileNumber',
      'accountNumber', 'ifsc', 'documentImage'
    ];
  }

  sanitizeForLogging(data) {
    const sanitized = { ...data };
    
    this.sensitiveFields.forEach(field => {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';
      }
    });
    
    return sanitized;
  }

  validateProductionRequest(request) {
    // Additional validation for production
    if (!request.headers['X-Client-Version']) {
      throw new Error('Client version header required in production');
    }
    
    if (!this.isValidClientVersion(request.headers['X-Client-Version'])) {
      throw new Error('Unsupported client version');
    }
  }

  isValidClientVersion(version) {
    const supportedVersions = ['1.0.0', '1.1.0', '1.2.0'];
    return supportedVersions.includes(version);
  }
}
```

## Environment-Aware Client

### Configuration Management

```javascript
class RBIHEnvironmentClient {
  constructor(environment = 'sandbox') {
    this.environment = environment;
    this.config = this.getEnvironmentConfig(environment);
    this.securityManager = new ProductionSecurityManager();
  }

  getEnvironmentConfig(env) {
    const configs = {
      sandbox: sandboxConfig,
      production: productionConfig
    };
    
    if (!configs[env]) {
      throw new Error(`Unknown environment: ${env}`);
    }
    
    return configs[env];
  }

  async makeRequest(endpoint, data, options = {}) {
    // Environment-specific pre-processing
    if (this.environment === 'production') {
      this.securityManager.validateProductionRequest({
        headers: options.headers || {}
      });
    }
    
    // Add environment-specific headers
    const headers = {
      ...options.headers,
      'X-Environment': this.environment,
      ...this.config.security.additionalHeaders
    };
    
    // Make request with environment-specific settings
    const response = await this.executeRequest(endpoint, data, {
      ...options,
      headers,
      timeout: this.config.timeout || 30000,
      retries: this.config.retry
    });
    
    // Environment-specific post-processing
    return this.processResponse(response);
  }

  async executeRequest(endpoint, data, options) {
    const url = `${this.config.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: options.headers,
        body: JSON.stringify(data),
        timeout: options.timeout
      });
      
      return response;
    } catch (error) {
      if (options.retries && options.retries.maxAttempts > 1) {
        return this.retryRequest(endpoint, data, options);
      }
      throw error;
    }
  }

  processResponse(response) {
    // Environment-specific response processing
    if (this.environment === 'sandbox') {
      // Add debug information in sandbox
      response.debugInfo = {
        environment: 'sandbox',
        timestamp: new Date().toISOString(),
        rateLimitRemaining: response.headers.get('X-RateLimit-Remaining')
      };
    }
    
    return response;
  }
}
```

### Environment Switching

```javascript
class EnvironmentManager {
  constructor() {
    this.clients = new Map();
  }

  getClient(environment) {
    if (!this.clients.has(environment)) {
      this.clients.set(environment, new RBIHEnvironmentClient(environment));
    }
    
    return this.clients.get(environment);
  }

  async promoteToProduction(testResults) {
    // Validate test results before promotion
    if (!this.validateTestResults(testResults)) {
      throw new Error('Test validation failed');
    }
    
    // Switch to production client
    const prodClient = this.getClient('production');
    
    // Perform production readiness checks
    await this.performProductionChecks(prodClient);
    
    return prodClient;
  }

  validateTestResults(results) {
    const requiredTests = [
      'authentication',
      'apiEndpoints',
      'errorHandling',
      'rateLimit'
    ];
    
    return requiredTests.every(test => 
      results[test] && results[test].passed
    );
  }

  async performProductionChecks(client) {
    // Health check
    await client.healthCheck();
    
    // Credentials validation
    await client.validateCredentials();
    
    // Rate limit verification
    await client.verifyRateLimits();
    
    console.log('Production readiness checks passed');
  }
}
```

## Migration Strategy

### Sandbox to Production

```javascript
const migrationChecklist = {
  credentials: {
    description: 'Update credentials for production',
    items: [
      'Replace sandbox client ID and secret',
      'Update provider codes if different',
      'Configure production signing secrets',
      'Update IP whitelisting for production IPs'
    ]
  },
  
  configuration: {
    description: 'Update configuration settings',
    items: [
      'Change base URLs to production endpoints',
      'Update token validity expectations',
      'Adjust rate limiting parameters',
      'Configure production logging levels'
    ]
  },
  
  testing: {
    description: 'Production validation testing',
    items: [
      'Verify authentication with production credentials',
      'Test critical API endpoints',
      'Validate error handling',
      'Confirm webhook endpoints'
    ]
  },
  
  monitoring: {
    description: 'Set up production monitoring',
    items: [
      'Configure health checks',
      'Set up alerting for failures',
      'Implement performance monitoring',
      'Enable audit logging'
    ]
  }
};

class MigrationValidator {
  constructor() {
    this.checklist = migrationChecklist;
  }

  async validateMigration() {
    const results = {};
    
    for (const [section, config] of Object.entries(this.checklist)) {
      results[section] = await this.validateSection(section, config);
    }
    
    return this.generateMigrationReport(results);
  }

  async validateSection(section, config) {
    console.log(`Validating ${section}: ${config.description}`);
    
    // Implementation would validate each item
    const validation = {
      passed: true,
      items: config.items.map(item => ({
        description: item,
        status: 'pending' // Would be 'passed' or 'failed'
      }))
    };
    
    return validation;
  }

  generateMigrationReport(results) {
    const allPassed = Object.values(results)
      .every(section => section.passed);
    
    return {
      readyForProduction: allPassed,
      sections: results,
      recommendations: this.getRecommendations(results)
    };
  }

  getRecommendations(results) {
    const recommendations = [];
    
    if (!results.monitoring?.passed) {
      recommendations.push('Set up comprehensive monitoring before going live');
    }
    
    if (!results.testing?.passed) {
      recommendations.push('Complete all production validation tests');
    }
    
    return recommendations;
  }
}
```

This environment configuration guide ensures smooth development, testing, and production deployment while maintaining security and compliance standards across all environments.