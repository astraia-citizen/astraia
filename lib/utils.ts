/**
 * Utility functions - NASA rule: keep functions small and focused
 */

/**
 * Clamps a number between min and max values
 */
export function clamp(value: number, min: number, max: number): number {
  console.assert(min <= max, 'clamp: min must be <= max');
  console.assert(!isNaN(value), 'clamp: value must be a number');
  return Math.min(Math.max(value, min), max);
}

/**
 * Generates a random string of specified length
 */
export function randomString(length: number): string {
  console.assert(length > 0, 'randomString: length must be positive');
  console.assert(Number.isInteger(length), 'randomString: length must be an integer');
  
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i]! % chars.length];
  }
  
  return result;
}

/**
 * Formats a phone number for display
 */
export function formatPhone(phone: string): string {
  console.assert(typeof phone === 'string', 'formatPhone: phone must be a string');
  const cleaned = phone.replace(/\D/g, '');
  console.assert(cleaned.length >= 10, 'formatPhone: phone must have at least 10 digits');
  
  return cleaned;
}

/**
 * Safely gets environment variable
 */
export function getEnv(key: string): string {
  console.assert(typeof key === 'string' && key.length > 0, 'getEnv: key must be a non-empty string');
  const value = process.env[key];
  console.assert(value !== undefined, `getEnv: ${key} environment variable is missing`);
  return value as string;
}

/**
 * Checks if code is running on server
 */
export function isServer(): boolean {
  return typeof window === 'undefined';
}

/**
 * Delays execution for specified milliseconds
 */
export async function delay(ms: number): Promise<void> {
  console.assert(ms >= 0, 'delay: ms must be non-negative');
  console.assert(Number.isFinite(ms), 'delay: ms must be finite');
  return new Promise((resolve) => setTimeout(resolve, ms));
}
