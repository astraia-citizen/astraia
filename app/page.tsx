import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Story from '@/components/Story';
// import Proof from '@/components/Proof';
// import Features from '@/components/Features';
import FAQ from '@/components/FAQ';
import FooterBare from '@/components/FooterBare';
import { getSiteUrl } from '@/lib/seo';
import { localBusinessSchema, serviceSchema, faqPageSchema } from '@/lib/schema';
import { FAQ_DATA } from '@/lib/faq-data';

export default function HomePage() {
  const siteUrl = getSiteUrl();
  const localBusiness = localBusinessSchema(siteUrl);
  const service = serviceSchema(siteUrl);
  const faqSchema = faqPageSchema(
    FAQ_DATA.map((item) => ({ question: item.question, answer: item.answer }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />
      
      <main className="main-content flex-1">
        <Hero />
        <Story />
        {/* <Proof /> */}
        {/* <Features /> */}
        {/* FAQ masquée temporairement */}
        {false && <FAQ />}
      </main>

      <FooterBare />
    </>
  );
}
