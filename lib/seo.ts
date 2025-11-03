import type { Metadata } from 'next';

/**
 * SEO utilities - NASA rules: pure functions, minimal complexity
 */

export interface SeoConfig {
  title: string;
  description: string;
  url: string;
  image?: string;
  noindex?: boolean;
}

/**
 * Generates Next.js metadata object
 */
export function generateMetadata(config: SeoConfig): Metadata {
  console.assert(typeof config.title === 'string' && config.title.length > 0, 'generateMetadata: title required');
  console.assert(typeof config.description === 'string' && config.description.length > 0, 'generateMetadata: description required');
  console.assert(typeof config.url === 'string' && config.url.length > 0, 'generateMetadata: url required');
  
  const metadata: Metadata = {
    title: config.title,
    description: config.description,
    metadataBase: new URL(config.url),
    alternates: {
      canonical: config.url,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: config.url,
      siteName: 'Astraia',
      locale: 'fr_FR',
      type: 'website',
      images: config.image ? [{ url: config.image, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: config.image ? [config.image] : [],
    },
    robots: config.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
  
  return metadata;
}

/**
 * Gets base site URL from environment
 */
export function getSiteUrl(): string {
  const url = process.env.SITE_URL || process.env.VERCEL_URL || 'http://localhost:3000';
  console.assert(typeof url === 'string' && url.length > 0, 'getSiteUrl: url must be non-empty');
  console.assert(url.startsWith('http'), 'getSiteUrl: url must start with http');
  return url;
}

/**
 * Generates canonical URL
 */
export function getCanonicalUrl(path: string = ''): string {
  console.assert(typeof path === 'string', 'getCanonicalUrl: path must be a string');
  const baseUrl = getSiteUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}
