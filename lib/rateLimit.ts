/**
 * Simple in-memory rate limiting - NASA rules: minimal scope, assertions
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Cleans up expired rate limit entries
 */
function cleanup(): void {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Checks if request should be rate limited
 * @param identifier - Unique identifier (e.g., IP address)
 * @param maxRequests - Maximum requests allowed in window
 * @param windowMs - Time window in milliseconds
 * @returns true if rate limit exceeded
 */
export function isRateLimited(
  identifier: string,
  maxRequests: number = 5,
  windowMs: number = 60000
): boolean {
  console.assert(typeof identifier === 'string' && identifier.length > 0, 'isRateLimited: identifier must be non-empty');
  console.assert(maxRequests > 0, 'isRateLimited: maxRequests must be positive');
  console.assert(windowMs > 0, 'isRateLimited: windowMs must be positive');
  
  // Cleanup every 100 requests to avoid memory bloat
  if (rateLimitStore.size > 100) {
    cleanup();
  }
  
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);
  
  if (!entry || now > entry.resetAt) {
    // New window
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    });
    return false;
  }
  
  // Within window
  entry.count++;
  const limited = entry.count > maxRequests;
  
  console.assert(entry.count >= 1, 'isRateLimited: count must be positive');
  
  return limited;
}

/**
 * Gets client IP from request headers
 */
export function getClientIp(headers: Headers): string {
  console.assert(headers instanceof Headers, 'getClientIp: headers must be Headers instance');
  
  const forwarded = headers.get('x-forwarded-for');
  const realIp = headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';
  
  console.assert(ip.length > 0, 'getClientIp: ip must not be empty');
  
  return ip.trim();
}
