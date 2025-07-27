---
id: error-handling-overview
title: Error Handling Overview
description: Overview of RBIH API error handling patterns and response formats
sidebar_position: 1
---

# Error Handling Overview

RBIH APIs implement standardized error handling across all services to provide consistent, actionable feedback for developers. This guide covers common error patterns, response formats, and troubleshooting strategies.

## Error Response Format

All RBIH APIs follow a consistent error response structure:

### Standard Error Response

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error description",
    "details": "Additional error context",
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req_123456789",
    "field": "fieldName" // For validation errors
  },
  "success": false,
  "statusCode": 400
}
```

### Success Response Pattern

```json
{
  "success": true,
  "data": {
    // API-specific response data
  },
  "requestId": "req_123456789",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## HTTP Status Codes

### 2xx Success Codes

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 202 | Accepted | Request accepted for asynchronous processing |

### 4xx Client Error Codes

| Code | Status | Common Causes |
|------|--------|---------------|
| 400 | Bad Request | Invalid request format, missing required fields |
| 401 | Unauthorized | Invalid or expired JWT token |
| 403 | Forbidden | IP not whitelisted, insufficient permissions |
| 404 | Not Found | Invalid endpoint or resource not found |
| 409 | Conflict | Duplicate request, resource already exists |
| 422 | Unprocessable Entity | Valid request format but business logic error |
| 429 | Too Many Requests | Rate limit exceeded |

### 5xx Server Error Codes

| Code | Status | Description |
|------|--------|-------------|
| 500 | Internal Server Error | Unexpected server error |
| 502 | Bad Gateway | Upstream service unavailable |
| 503 | Service Unavailable | Service temporarily unavailable |
| 504 | Gateway Timeout | Request timeout |

## Quick Error Resolution

### Common Error Scenarios

#### Authentication Errors (401)
- **Cause**: Invalid or expired JWT token
- **Solution**: Generate a new JWT token with valid credentials

#### Validation Errors (422)
- **Cause**: Invalid input data format
- **Solution**: Check field formats (mobile: 10 digits, PAN: ABCDE1234F format)

#### Rate Limit Exceeded (429)
- **Cause**: Too many requests in time window
- **Solution**: Implement exponential backoff, respect retry-after header

## Error Handling Implementation

### Basic Error Handler

```javascript
class RBIHErrorHandler {
  handleAPIError(error) {
    switch (error.statusCode) {
      case 401:
        return this.handleAuthError(error);
      case 422:
        return this.handleValidationError(error);
      case 429:
        return this.handleRateLimitError(error);
      case 503:
        return this.handleServiceUnavailable(error);
      default:
        return this.handleGenericError(error);
    }
  }

  handleAuthError(error) {
    // Automatically refresh token
    this.refreshToken();
    return { retry: true, delay: 0 };
  }

  handleRateLimitError(error) {
    const retryAfter = error.retryAfter || 60;
    return { retry: true, delay: retryAfter * 1000 };
  }

  handleValidationError(error) {
    // Log validation details for debugging
    console.error('Validation failed:', error.details);
    return { retry: false, userMessage: error.message };
  }
}
```

## Next Steps

- **[Common Errors](./common-errors)** - Detailed guide to frequent error scenarios
- **[Authentication Guide](../authentication/authentication-overview)** - Security and token management
- **[Performance Optimization](../performance/performance-overview)** - Rate limiting and optimization strategies