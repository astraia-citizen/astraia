import { createHmac, randomBytes } from 'crypto';

/**
 * CAPTCHA utilities - NASA rules: pure functions, assertions, no side effects
 */

/**
 * Generates random number between min and max (inclusive)
 */
function randomInt(min: number, max: number): number {
  console.assert(Number.isInteger(min) && Number.isInteger(max), 'randomInt: min and max must be integers');
  console.assert(min <= max, 'randomInt: min must be <= max');
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Creates HMAC signature for captcha verification
 */
export function makeMac(secret: string, nonce: string, sum: number): string {
  console.assert(typeof secret === 'string' && secret.length >= 32, 'makeMac: secret must be at least 32 chars');
  console.assert(typeof nonce === 'string' && nonce.length > 0, 'makeMac: nonce must be non-empty');
  console.assert(Number.isInteger(sum), 'makeMac: sum must be an integer');
  console.assert(sum >= 2 && sum <= 18, 'makeMac: sum must be between 2 and 18');
  
  const payload = `${nonce}:${sum}`;
  const hmac = createHmac('sha256', secret);
  hmac.update(payload);
  return hmac.digest('hex');
}

/**
 * Verifies HMAC signature for captcha
 */
export function verifyMac(secret: string, nonce: string, sum: number, mac: string): boolean {
  console.assert(typeof secret === 'string' && secret.length >= 32, 'verifyMac: secret must be at least 32 chars');
  console.assert(typeof mac === 'string' && mac.length === 64, 'verifyMac: mac must be 64 hex chars');
  console.assert(Number.isInteger(sum), 'verifyMac: sum must be an integer');
  console.assert(sum >= 2 && sum <= 18, 'verifyMac: sum must be between 2 and 18');
  
  const expectedMac = makeMac(secret, nonce, sum);
  return mac === expectedMac;
}

/**
 * Generates captcha challenge
 */
export function generateChallenge(): { a: number; b: number; nonce: string } {
  const a = randomInt(1, 9);
  const b = randomInt(1, 9);
  const nonce = randomBytes(16).toString('hex');
  
  console.assert(a >= 1 && a <= 9, 'generateChallenge: a out of range');
  console.assert(b >= 1 && b <= 9, 'generateChallenge: b out of range');
  console.assert(nonce.length === 32, 'generateChallenge: nonce invalid length');
  
  return { a, b, nonce };
}

/**
 * Validates captcha answer
 */
export function validateAnswer(a: number, b: number, answer: string): boolean {
  console.assert(Number.isInteger(a) && Number.isInteger(b), 'validateAnswer: a and b must be integers');
  console.assert(typeof answer === 'string', 'validateAnswer: answer must be a string');
  
  const parsedAnswer = parseInt(answer, 10);
  const isValid = parsedAnswer === a + b;
  
  console.assert(!isNaN(parsedAnswer), 'validateAnswer: answer must be numeric');
  
  return isValid;
}
