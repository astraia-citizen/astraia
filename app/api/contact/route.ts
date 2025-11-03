import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { validateContactForm } from '@/lib/validators';
import { verifyMac } from '@/lib/captcha';
import { isRateLimited, getClientIp } from '@/lib/rateLimit';
import { getEnv } from '@/lib/utils';

/**
 * POST /api/contact
 * Handles contact form submissions with captcha and rate limiting
 * NASA rules: validate all inputs, min 2 assertions per function
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = getClientIp(request.headers);
    console.assert(clientIp.length > 0, 'POST /api/contact: clientIp is empty');

    if (isRateLimited(clientIp, 5, 60000)) {
      return NextResponse.json(
        { error: 'Trop de tentatives. Veuillez réessayer dans quelques minutes.' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    console.assert(body !== null, 'POST /api/contact: request body is null');
    console.assert(typeof body === 'object', 'POST /api/contact: request body is not an object');

    const data = validateContactForm(body);

    // Check honeypot
    if (data.website && data.website.length > 0) {
      // Bot detected - silent fail
      console.error('Honeypot triggered:', clientIp);
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      );
    }

    // Verify captcha MAC
    const secret = getEnv('CAPTCHA_SECRET');
    console.assert(secret.length >= 32, 'POST /api/contact: CAPTCHA_SECRET too short');

    const answer = parseInt(data.answer, 10);
    console.assert(!isNaN(answer), 'POST /api/contact: answer is not a number');
    console.assert(answer >= 2 && answer <= 18, 'POST /api/contact: answer out of valid range');

    const isValidMac = verifyMac(secret, data.nonce, answer, data.mac);
    console.assert(typeof isValidMac === 'boolean', 'POST /api/contact: verifyMac did not return boolean');

    if (!isValidMac) {
      return NextResponse.json(
        { error: 'Captcha invalide' },
        { status: 400 }
      );
    }

    // Send email via Resend
    const resendApiKey = getEnv('RESEND_API_KEY');
    const leadsTo = getEnv('LEADS_TO');

    console.assert(resendApiKey.startsWith('re_'), 'POST /api/contact: RESEND_API_KEY has invalid format');
    console.assert(leadsTo.includes('@'), 'POST /api/contact: LEADS_TO is not a valid email');

    const resend = new Resend(resendApiKey);

    const emailHtml = `
      <h2>Nouvelle demande de proposition</h2>
      <p><strong>Nom:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      ${data.company ? `<p><strong>Entreprise:</strong> ${escapeHtml(data.company)}</p>` : ''}
      ${data.siteUrl ? `<p><strong>Site Web:</strong> <a href="${escapeHtml(data.siteUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(data.siteUrl)}</a></p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
      <hr>
      <p style="color: #666; font-size: 12px;">IP: ${clientIp}</p>
    `;

    const emailResult = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: leadsTo,
      replyTo: data.email,
      subject: `Demande de proposition - ${data.name}`,
      html: emailHtml,
    });

    console.assert(emailResult !== null, 'POST /api/contact: email send returned null');

    if (emailResult.error) {
      console.error('Email send error:', emailResult.error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi. Veuillez réessayer.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: 'Votre demande a été envoyée avec succès',
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
}

/**
 * Escapes HTML special characters to prevent XSS
 * NASA rules: pure function, assertions
 */
function escapeHtml(text: string): string {
  console.assert(typeof text === 'string', 'escapeHtml: text must be a string');
  console.assert(text.length <= 10000, 'escapeHtml: text exceeds max length');

  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return text.replace(/[&<>"']/g, (char) => map[char] || char);
}
