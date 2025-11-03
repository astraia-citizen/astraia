import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as genMeta, getSiteUrl } from '@/lib/seo';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  ...genMeta({
    title: 'Politique de Confidentialité - Astraia',
    description: 'Politique de confidentialité et protection des données personnelles d\'Astraia.',
    url: `${siteUrl}/confidentialite`,
    noindex: true,
  }),
};

export default function ConfidentialitePage() {
  return (
    <div className="legal-page min-h-screen bg-base py-16">
      <div className="container-custom max-w-4xl">
        <Link href="/" className="legal-back-link inline-flex items-center text-gold hover:text-lightgold mb-8 transition-colors duration-200">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour à l'accueil
        </Link>

        <article className="legal-content prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-gradient-gold mb-8">Politique de Confidentialité</h1>

          <section className="legal-section mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Collecte des données</h2>
            <p className="text-white/80 leading-relaxed">
              Nous collectons les informations que vous nous fournissez directement via le formulaire de contact :
            </p>
            <ul className="list-disc list-inside text-white/80 leading-relaxed ml-4 mt-2">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Nom de l'entreprise (optionnel)</li>
              <li>Message</li>
              <li>Adresse IP (à des fins de sécurité et anti-spam)</li>
            </ul>
          </section>

          <section className="legal-section mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">2. Utilisation des données</h2>
            <p className="text-white/80 leading-relaxed">
              Vos données personnelles sont utilisées uniquement pour :
            </p>
            <ul className="list-disc list-inside text-white/80 leading-relaxed ml-4 mt-2">
              <li>Répondre à votre demande de contact</li>
              <li>Vous envoyer une proposition commerciale si pertinent</li>
              <li>Prévenir le spam et les abus (rate limiting, honeypot)</li>
            </ul>
            <p className="text-white/80 leading-relaxed mt-4">
              Nous ne vendons, ne louons, ni ne partageons vos données avec des tiers à des fins marketing.
            </p>
          </section>

          <section className="legal-section mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">3. Conservation des données</h2>
            <p className="text-white/80 leading-relaxed">
              Vos données sont conservées pendant une durée maximum de 3 ans à compter de votre dernier contact avec nous.
              Passé ce délai, elles sont automatiquement supprimées.
            </p>
          </section>

          <section className="legal-section mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Sécurité</h2>
            <p className="text-white/80 leading-relaxed">
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données :
            </p>
            <ul className="list-disc list-inside text-white/80 leading-relaxed ml-4 mt-2">
              <li>Chiffrement des communications (HTTPS)</li>
              <li>Captcha sécurisé par HMAC côté serveur</li>
              <li>Rate limiting pour prévenir les abus</li>
              <li>Honeypot pour bloquer les bots</li>
              <li>Validation stricte de toutes les entrées utilisateur</li>
            </ul>
          </section>

          <section className="legal-section mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Vos droits (RGPD)</h2>
            <p className="text-white/80 leading-relaxed">
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside text-white/80 leading-relaxed ml-4 mt-2">
              <li><strong>Droit d'accès</strong> : obtenir une copie de vos données</li>
              <li><strong>Droit de rectification</strong> : corriger des données inexactes</li>
              <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données</li>
              <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
              <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
            </ul>
            <p className="text-white/80 leading-relaxed mt-4">
              Pour exercer ces droits, contactez-nous à : <a href="mailto:astraia.holding@gmail.com" className="text-gold hover:text-lightgold underline">astraia.holding@gmail.com</a>
            </p>
          </section>

          <section className="legal-section mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Cookies</h2>
            <p className="text-white/80 leading-relaxed">
              Ce site n'utilise pas de cookies de tracking, publicitaires ou analytiques tiers.
              Aucun consentement cookie n'est donc requis.
            </p>
          </section>

          <section className="legal-section mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">7. Modifications</h2>
            <p className="text-white/80 leading-relaxed">
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
              Les modifications entreront en vigueur dès leur publication sur cette page.
            </p>
          </section>

          <section className="legal-section mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">8. Contact</h2>
            <p className="text-white/80 leading-relaxed">
              Pour toute question concernant cette politique de confidentialité ou vos données personnelles, contactez-nous :
            </p>
            <p className="text-white/80 leading-relaxed mt-2">
              Email : <a href="mailto:astraia.holding@gmail.com" className="text-gold hover:text-lightgold underline">astraia.holding@gmail.com</a>
            </p>
          </section>

          <p className="legal-footer text-white/60 text-sm mt-12">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </article>
      </div>
    </div>
  );
}
