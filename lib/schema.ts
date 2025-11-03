/**
 * JSON-LD Schema builders - NASA rules: pure functions, type safety
 */

interface Organization {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo?: string;
  contactPoint?: {
    '@type': string;
    telephone?: string;
    contactType: string;
    email: string;
  };
}

interface LocalBusiness extends Organization {
  '@type': 'LocalBusiness';
  address?: {
    '@type': string;
    addressCountry: string;
    addressLocality?: string;
  };
  geo?: {
    '@type': string;
    latitude?: number;
    longitude?: number;
  };
  priceRange?: string;
}

interface FAQPage {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}

/**
 * Generates Organization schema
 */
export function organizationSchema(siteUrl: string): Organization {
  console.assert(typeof siteUrl === 'string' && siteUrl.length > 0, 'organizationSchema: siteUrl required');
  console.assert(siteUrl.startsWith('http'), 'organizationSchema: siteUrl must be valid URL');
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Astraia',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Service client',
      email: 'astraia.holding@gmail.com',
    },
  };
}

/**
 * Generates LocalBusiness schema
 */
export function localBusinessSchema(siteUrl: string): LocalBusiness {
  console.assert(typeof siteUrl === 'string' && siteUrl.length > 0, 'localBusinessSchema: siteUrl required');
  console.assert(siteUrl.startsWith('http'), 'localBusinessSchema: siteUrl must be valid URL');
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Astraia',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'FR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Service client',
      email: 'astraia.holding@gmail.com',
    },
  };
}

/**
 * Generates FAQPage schema
 */
export function faqPageSchema(faqs: Array<{ question: string; answer: string }>): FAQPage {
  console.assert(Array.isArray(faqs) && faqs.length > 0, 'faqPageSchema: faqs must be non-empty array');
  console.assert(faqs.every(faq => faq.question && faq.answer), 'faqPageSchema: all FAQs must have question and answer');
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates Service schema
 */
export function serviceSchema(siteUrl: string) {
  console.assert(typeof siteUrl === 'string' && siteUrl.length > 0, 'serviceSchema: siteUrl required');
  console.assert(siteUrl.startsWith('http'), 'serviceSchema: siteUrl must be valid URL');
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Refonte de site web',
    provider: {
      '@type': 'Organization',
      name: 'Astraia',
      url: siteUrl,
    },
    description: 'Refontes orientées SEO et conversion pour entreprises locales',
    serviceType: 'Web Development',
    areaServed: 'FR',
  };
}
