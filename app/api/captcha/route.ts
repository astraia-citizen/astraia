import { NextResponse } from 'next/server';
import { generateChallenge, makeMac } from '@/lib/captcha';
import { getEnv } from '@/lib/utils';

/**
 * GET /api/captcha
 * Generates a simple math captcha challenge
 * NASA rules: assertions on domain invariants
 */
export async function GET() {
  try {
    const secret = getEnv('CAPTCHA_SECRET');
    console.assert(secret.length >= 32, 'GET /api/captcha: CAPTCHA_SECRET too short');

    const { a, b, nonce } = generateChallenge();
    const sum = a + b;

    console.assert(sum >= 2 && sum <= 18, 'GET /api/captcha: sum out of valid range');

    const mac = makeMac(secret, nonce, sum);

    console.assert(mac.length === 64, 'GET /api/captcha: mac has invalid length');

    return NextResponse.json({
      a,
      b,
      nonce,
      mac,
    });
  } catch (error) {
    console.error('Captcha generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate captcha' },
      { status: 500 }
    );
  }
}
