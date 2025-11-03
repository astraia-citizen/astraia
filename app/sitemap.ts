import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const routes = [
    '/',
    '/confidentialite',
    '/mentions-legales',
    '/google-ads',
    '/facebook',
    '/seo-local',
    '/refonte',
  ];

  const now = new Date();

  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1.0 : 0.7,
  }));
}
