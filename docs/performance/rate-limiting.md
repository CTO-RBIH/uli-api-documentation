---
id: rate-limiting
title: Rate Limiting Strategies
description: Advanced rate limiting management and optimization techniques
sidebar_position: 2
---

# Rate Limiting Strategies

This guide covers advanced strategies for managing RBIH API rate limits, including intelligent throttling, backoff algorithms, and quota optimization.

## Service-Specific Rate Limits

### Identity & Verification Services

| Service | Sandbox (req/min) | Production (req/min) | Notes |
|---------|-------------------|---------------------|-------|
| Aadhaar Redact | 30 | 200 | Image processing intensive |
| Document Verification | 20 | 150 | OCR processing required |
| Facematch | 25 | 180 | Biometric comparison |
| Identity Verification | 40 | 300 | Multiple sub-services |
| PAN Verification | 50 | 400 | External NSDL dependency |
| Voter Verification | 35 | 250 | State database queries |

### Financial Services

| Service | Sandbox (req/min) | Production (req/min) | Notes |
|---------|-------------------|---------------------|-------|
| Bank Account Verification | 20 | 100 | Banking network dependency |
| GSTN Service | 15 | 80 | GSTN API limitations |
| Account Aggregator | 10 | 50 | Complex data aggregation |

## Rate Limit Exceeded Response

When rate limits are exceeded, APIs return a `429 Too Many Requests` response:

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "API rate limit exceeded",
    "details": "Maximum 100 requests per minute allowed",
    "retryAfter": 60,
    "limit": 100,
    "window": "per-minute",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "success": false,
  "statusCode": 429
}
```

## Advanced Rate Limiting Implementation

### Intelligent Rate Limiter

```javascript
class IntelligentRateLimiter {
  constructor() {
    this.windows = new Map();
    this.serviceLimits = {
      'pan-verification': { limit: 50, window: 60000 },
      'aadhaar-redact': { limit: 30, window: 60000 },
      'bank-verification': { limit: 20, window: 60000 }
    };
  }

  async checkRateLimit(service, clientId) {
    const key = `${clientId}:${service}`;
    const config = this.serviceLimits[service];
    
    if (!config) {
      throw new Error(`Unknown service: ${service}`);
    }

    const now = Date.now();
    const window = this.getOrCreateWindow(key, now, config.window);
    
    // Clean old requests
    this.cleanWindow(window, now, config.window);
    
    // Check if limit exceeded
    if (window.requests.length >= config.limit) {
      const oldestRequest = Math.min(...window.requests);
      const resetTime = oldestRequest + config.window;
      const retryAfter = Math.ceil((resetTime - now) / 1000);
      
      throw new RateLimitError(
        `Rate limit exceeded for ${service}`,
        config.limit,
        retryAfter
      );
    }
    
    // Add current request
    window.requests.push(now);
    
    return {
      allowed: true,
      remaining: config.limit - window.requests.length,
      resetTime: now + config.window,
      service: service
    };
  }

  getOrCreateWindow(key, now, windowSize) {
    if (!this.windows.has(key)) {
      this.windows.set(key, { requests: [], created: now });
    }
    return this.windows.get(key);
  }

  cleanWindow(window, now, windowSize) {
    window.requests = window.requests.filter(
      time => now - time < windowSize
    );
  }
}

class RateLimitError extends Error {
  constructor(message, limit, retryAfter) {
    super(message);
    this.name = 'RateLimitError';
    this.limit = limit;
    this.retryAfter = retryAfter;
  }
}
```

### Adaptive Rate Limiting

```javascript
class AdaptiveRateLimiter {
  constructor() {
    this.baseRateLimiter = new IntelligentRateLimiter();
    this.adaptiveFactors = new Map();
    this.performanceHistory = new Map();
  }

  async checkAdaptiveRateLimit(service, clientId, context = {}) {
    // Get base rate limit check
    const baseResult = await this.baseRateLimiter.checkRateLimit(service, clientId);
    
    // Apply adaptive factors
    const adaptiveFactor = this.calculateAdaptiveFactor(service, context);
    const adjustedLimit = Math.floor(baseResult.remaining * adaptiveFactor);
    
    if (adjustedLimit <= 0) {
      throw new RateLimitError(
        `Adaptive rate limit exceeded for ${service}`,
        baseResult.limit,
        this.calculateAdaptiveDelay(service)
      );
    }
    
    return {
      ...baseResult,
      adaptiveFactor,
      adjustedRemaining: adjustedLimit
    };
  }

  calculateAdaptiveFactor(service, context) {
    let factor = 1.0;
    
    // Reduce factor based on recent errors
    const errorRate = this.getRecentErrorRate(service);
    if (errorRate > 0.1) factor *= 0.7; // 30% reduction for high error rate
    
    // Reduce factor based on response time
    const avgResponseTime = this.getAverageResponseTime(service);
    if (avgResponseTime > 5000) factor *= 0.8; // 20% reduction for slow responses
    
    // Increase factor for high-priority clients
    if (context.priority === 'high') factor *= 1.2;
    
    return Math.max(0.1, Math.min(1.0, factor)); // Clamp between 0.1 and 1.0
  }

  updatePerformanceMetrics(service, responseTime, success) {
    const key = service;
    if (!this.performanceHistory.has(key)) {
      this.performanceHistory.set(key, {
        responses: [],
        errors: [],
        totalRequests: 0
      });
    }
    
    const history = this.performanceHistory.get(key);
    const now = Date.now();
    
    history.totalRequests++;
    history.responses.push({ time: now, responseTime });
    
    if (!success) {
      history.errors.push(now);
    }
    
    // Keep only last hour of data
    const oneHourAgo = now - 60 * 60 * 1000;
    history.responses = history.responses.filter(r => r.time > oneHourAgo);
    history.errors = history.errors.filter(e => e > oneHourAgo);
  }
}
```

## Retry Strategies

### Exponential Backoff with Jitter

```javascript
class RetryManager {
  constructor(options = {}) {
    this.maxRetries = options.maxRetries || 3;
    this.baseDelay = options.baseDelay || 1000;
    this.maxDelay = options.maxDelay || 30000;
    this.jitterFactor = options.jitterFactor || 0.1;
  }

  async executeWithRetry(operation, context = {}) {
    let lastError;
    
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        
        if (!this.shouldRetry(error, attempt)) {
          throw error;
        }
        
        if (attempt < this.maxRetries) {
          const delay = this.calculateDelay(attempt, error);
          console.log(`Retry attempt ${attempt + 1} after ${delay}ms`);
          await this.sleep(delay);
        }
      }
    }
    
    throw lastError;
  }

  shouldRetry(error, attempt) {
    if (attempt >= this.maxRetries) return false;
    
    const retryableCodes = [
      'RATE_LIMIT_EXCEEDED',
      'EXTERNAL_SERVICE_ERROR',
      'NETWORK_ERROR',
      'SERVICE_TIMEOUT'
    ];
    
    const retryableStatus = [429, 500, 502, 503, 504];
    
    return retryableCodes.includes(error.code) || 
           retryableStatus.includes(error.statusCode);
  }

  calculateDelay(attempt, error) {
    let delay;
    
    // Use retry-after header if available (for rate limiting)
    if (error.code === 'RATE_LIMIT_EXCEEDED' && error.retryAfter) {
      delay = error.retryAfter * 1000;
    } else {
      // Exponential backoff
      delay = Math.min(
        this.baseDelay * Math.pow(2, attempt),
        this.maxDelay
      );
    }
    
    // Add jitter to prevent thundering herd
    const jitter = delay * this.jitterFactor * Math.random();
    return delay + jitter;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### Smart Retry with Circuit Breaker

```javascript
class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.timeout = options.timeout || 60000; // 1 minute
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.failureCount = 0;
    this.lastFailureTime = null;
  }

  async execute(operation) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime < this.timeout) {
        throw new Error('Circuit breaker is OPEN');
      } else {
        this.state = 'HALF_OPEN';
      }
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.failureThreshold) {
      this.state = 'OPEN';
    }
  }
}

class SmartRetryManager extends RetryManager {
  constructor(options = {}) {
    super(options);
    this.circuitBreakers = new Map();
  }

  async executeWithSmartRetry(operation, service) {
    const circuitBreaker = this.getCircuitBreaker(service);
    
    return this.executeWithRetry(async () => {
      return circuitBreaker.execute(operation);
    });
  }

  getCircuitBreaker(service) {
    if (!this.circuitBreakers.has(service)) {
      this.circuitBreakers.set(service, new CircuitBreaker({
        failureThreshold: 3,
        timeout: 30000 // 30 seconds
      }));
    }
    
    return this.circuitBreakers.get(service);
  }
}
```

## Rate Limit Monitoring

### Real-time Rate Limit Tracking

```javascript
class RateLimitMonitor {
  constructor() {
    this.rateLimitData = new Map();
    this.alertThresholds = {
      warningPercent: 80,  // Warn at 80% of limit
      criticalPercent: 95  // Critical at 95% of limit
    };
  }

  updateFromHeaders(service, headers) {
    const data = {
      limit: parseInt(headers['x-ratelimit-limit']) || 0,
      remaining: parseInt(headers['x-ratelimit-remaining']) || 0,
      reset: parseInt(headers['x-ratelimit-reset']) || 0,
      window: headers['x-ratelimit-window'] || 'unknown',
      type: headers['x-ratelimit-type'] || 'unknown',
      timestamp: Date.now()
    };

    this.rateLimitData.set(service, data);
    
    // Check for alerts
    this.checkAlerts(service, data);
    
    return data;
  }

  checkAlerts(service, data) {
    if (data.limit === 0) return; // No limit data
    
    const usagePercent = ((data.limit - data.remaining) / data.limit) * 100;
    
    if (usagePercent >= this.alertThresholds.criticalPercent) {
      this.triggerAlert(service, 'critical', usagePercent, data);
    } else if (usagePercent >= this.alertThresholds.warningPercent) {
      this.triggerAlert(service, 'warning', usagePercent, data);
    }
  }

  triggerAlert(service, level, usagePercent, data) {
    const alert = {
      service,
      level,
      usagePercent: Math.round(usagePercent),
      remaining: data.remaining,
      limit: data.limit,
      resetTime: new Date(data.reset * 1000),
      message: `Rate limit ${level}: ${service} at ${Math.round(usagePercent)}% usage`
    };

    console.warn('Rate Limit Alert:', alert);
    
    // Trigger alerting system
    this.sendAlert(alert);
  }

  sendAlert(alert) {
    // Implement your alerting mechanism here
    // Examples: email, Slack, monitoring system
  }

  getRateLimitStatus(service) {
    const data = this.rateLimitData.get(service);
    if (!data) return null;

    const usagePercent = data.limit > 0 
      ? ((data.limit - data.remaining) / data.limit) * 100 
      : 0;

    return {
      ...data,
      usagePercent: Math.round(usagePercent),
      status: this.getStatus(usagePercent),
      timeToReset: Math.max(0, data.reset * 1000 - Date.now())
    };
  }

  getStatus(usagePercent) {
    if (usagePercent >= 95) return 'critical';
    if (usagePercent >= 80) return 'warning';
    if (usagePercent >= 60) return 'moderate';
    return 'normal';
  }

  getAllStatuses() {
    const statuses = {};
    
    for (const [service, data] of this.rateLimitData) {
      statuses[service] = this.getRateLimitStatus(service);
    }
    
    return statuses;
  }
}
```

## Rate Limit Optimization

### Request Queuing

```javascript
class RequestQueue {
  constructor(options = {}) {
    this.concurrency = options.concurrency || 5;
    this.rateLimiter = new IntelligentRateLimiter();
    this.queue = [];
    this.running = 0;
  }

  async add(service, operation, priority = 'normal') {
    return new Promise((resolve, reject) => {
      this.queue.push({
        service,
        operation,
        priority,
        resolve,
        reject,
        timestamp: Date.now()
      });
      
      this.process();
    });
  }

  async process() {
    if (this.running >= this.concurrency || this.queue.length === 0) {
      return;
    }

    // Sort queue by priority
    this.queue.sort((a, b) => {
      const priorityOrder = { high: 3, normal: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    const task = this.queue.shift();
    this.running++;

    try {
      // Check rate limit before execution
      await this.rateLimiter.checkRateLimit(task.service, 'default');
      
      const result = await task.operation();
      task.resolve(result);
    } catch (error) {
      if (error instanceof RateLimitError) {
        // Re-queue the task for later
        this.queue.unshift(task);
        await this.sleep(error.retryAfter * 1000);
      } else {
        task.reject(error);
      }
    } finally {
      this.running--;
      
      // Process next task
      setImmediate(() => this.process());
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getQueueStatus() {
    return {
      queueLength: this.queue.length,
      running: this.running,
      concurrency: this.concurrency
    };
  }
}
```

This comprehensive rate limiting strategy ensures optimal API usage while maintaining compliance with RBIH rate limits and providing excellent performance.