import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { generateMetadata as genMeta, getSiteUrl } from '@/lib/seo';
import SecretInteractions from '@/components/SecretInteractions';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  ...genMeta({
    title: 'Astraia - Refontes Web qui Génèrent des Clients Locaux',
    description: 'Refontes orientées SEO et conversion. Sites rapides, mobile-first, avec mise en ligne sans friction. +38% de formulaires en médiane.',
    url: siteUrl,
    image: `${siteUrl}/og-image.jpg`,
  }),
  icons: {
    icon: [{ url: '/logos/astraia-icon.ico', type: 'image/x-icon' }],
    shortcut: [{ url: '/logos/astraia-icon.ico', type: 'image/x-icon' }],
    apple: '/logos/astraia-icon.ico',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0D1624',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <SecretInteractions />
        {children}
      </body>
    </html>
  );
}
