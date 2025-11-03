import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Story from '@/components/Story';
import Proof from '@/components/Proof';
import Features from '@/components/Features';
import FAQ from '@/components/FAQ';
import FooterBare from '@/components/FooterBare';
import { generateMetadata as genMeta, getSiteUrl } from '@/lib/seo';

interface CampaignPageProps {
  params: Promise<{ slug: string }>;
}

// Campaign-specific headlines
const CAMPAIGN_HEADLINES: Record<string, string> = {
  'google-ads': 'Transformez vos clics Google Ads en clients réels',
  'facebook': 'Un site qui convertit vos publicités Facebook',
  'seo-local': 'Dominez votre zone géographique sur Google',
  'refonte': 'Refonte complète : rapide, visible, convertissant',
};

export async function generateMetadata({ params }: CampaignPageProps): Promise<Metadata> {
  const siteUrl = getSiteUrl();
  const { slug } = await params;
  const headline = CAMPAIGN_HEADLINES[slug] || 'Générez plus de demandes locales';

  return genMeta({
    title: `${headline} - Astraia`,
    description: 'Refontes orientées SEO et conversion. Sites rapides, mobile-first, avec mise en ligne sans friction.',
    url: `${siteUrl}/${slug}`,
    noindex: true, // Campaign pages not indexed
  });
}

export default function CampaignPage() {
  // Pass custom headline to Hero if needed
  // For simplicity, we use the default Hero component
  // In production, you could pass the headline as a prop

  return (
    <>
      {/* No Header navigation on campaign pages */}
      <main className="campaign-page-main flex-1">
        <Hero />
        <Story />
        <Proof />
        <Features />
        <FAQ />
      </main>

      <FooterBare />
    </>
  );
}
