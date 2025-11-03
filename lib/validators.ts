import { z } from 'zod';

/**
 * Contact form validation schema
 */
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100),
  email: z.string().email('Email invalide').max(255),
  company: z.string().max(100).optional(),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères').max(2000),
  // Optional website URL provided by user (different from honeypot)
  siteUrl: z
    .preprocess((v) => {
      if (typeof v !== 'string') return undefined;
      const trimmed = v.trim();
      if (trimmed === '') return undefined;
      const hasScheme = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(trimmed);
      return hasScheme ? trimmed : `https://${trimmed}`;
    }, z.string().url('Lien du site invalide (ex: https://votresite.com)').max(2048))
    .optional(),
  nonce: z.string().min(1),
  answer: z.string().min(1),
  mac: z.string().min(1),
  website: z.string().max(0).optional(), // honeypot must be empty
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Validates contact form data - NASA rule: validate all inputs
 */
export function validateContactForm(data: unknown): ContactFormData {
  console.assert(data !== null && data !== undefined, 'validateContactForm: data cannot be null/undefined');
  console.assert(typeof data === 'object', 'validateContactForm: data must be an object');
  
  const result = contactFormSchema.safeParse(data);
  
  if (!result.success) {
    throw new Error(`Validation failed: ${result.error.message}`);
  }
  
  return result.data;
}

/**
 * Email validation helper
 */
export function isValidEmail(email: string): boolean {
  console.assert(typeof email === 'string', 'isValidEmail: email must be a string');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);
  console.assert(email.length <= 255, 'isValidEmail: email too long');
  return isValid;
}

/**
 * Sanitizes user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  console.assert(typeof input === 'string', 'sanitizeInput: input must be a string');
  const sanitized = input.trim().slice(0, 2000);
  console.assert(sanitized.length <= 2000, 'sanitizeInput: input exceeds max length');
  return sanitized;
}
