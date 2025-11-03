import Link from 'next/link';
import type { Metadata } from 'next';
import { generateMetadata as genMeta, getSiteUrl } from '@/lib/seo';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  ...genMeta({
    title: 'Merci pour votre demande - Astraia',
    description: 'Nous avons bien reçu votre demande et vous répondrons sous 24 heures.',
    url: `${siteUrl}/thank-you`,
    noindex: true,
  }),
};

export default function ThankYouPage() {
  return (
    <div className="thank-you-page min-h-screen flex items-center justify-center bg-base px-4">
      <div className="thank-you-container max-w-2xl w-full text-center space-y-8">
        <div className="thank-you-icon-wrapper flex justify-center">
          <div className="thank-you-icon w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
            <svg
              className="thank-you-icon-svg w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="thank-you-heading text-4xl md:text-5xl font-bold text-gradient-gold">
          Merci pour votre demande !
        </h1>

        <div className="thank-you-content space-y-4">
          <p className="thank-you-text text-lg text-white/90">
            Nous avons bien reçu votre message et l'étudions avec attention.
          </p>
          <p className="thank-you-text text-white/70">
            Notre équipe vous répondra sous <strong className="text-gold">24 heures</strong> avec une proposition personnalisée.
          </p>
        </div>

        <div className="thank-you-next-steps card inline-block text-left max-w-md mx-auto">
          <h2 className="thank-you-next-heading text-xl font-semibold text-white mb-4">
            Prochaines étapes
          </h2>
          <ul className="thank-you-steps-list space-y-3">
            <li className="thank-you-step-item flex items-start space-x-3">
              <span className="thank-you-step-number flex-shrink-0 w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center text-gold text-sm font-semibold">
                1
              </span>
              <span className="thank-you-step-text text-white/80">
                Vérifiez votre boîte email (et les spams)
              </span>
            </li>
            <li className="thank-you-step-item flex items-start space-x-3">
              <span className="thank-you-step-number flex-shrink-0 w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center text-gold text-sm font-semibold">
                2
              </span>
              <span className="thank-you-step-text text-white/80">
                Réponse détaillée sous 24 heures
              </span>
            </li>
            <li className="thank-you-step-item flex items-start space-x-3">
              <span className="thank-you-step-number flex-shrink-0 w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center text-gold text-sm font-semibold">
                3
              </span>
              <span className="thank-you-step-text text-white/80">
                Planification d'un appel découverte (optionnel)
              </span>
            </li>
          </ul>
        </div>

        <div className="thank-you-actions space-x-4">
          <Link href="/" className="thank-you-home-button btn-primary inline-flex">
            Retour à l'accueil
          </Link>
        </div>

        <p className="thank-you-footer-text text-sm text-white/60">
          Une question urgente ?{' '}
          <a
            href="mailto:astraia.holding@gmail.com"
            className="thank-you-email-link text-gold hover:text-lightgold transition-colors duration-200"
          >
            astraia.holding@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
