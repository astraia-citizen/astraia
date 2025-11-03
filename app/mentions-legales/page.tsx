import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata as genMeta, getSiteUrl } from '@/lib/seo';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  ...genMeta({
    title: 'Mentions Légales - Astraia',
    description: 'Mentions légales et informations juridiques d\'Astraia.',
    url: `${siteUrl}/mentions-legales`,
    noindex: true,
  }),
};

export default function MentionsLegalesPage() {
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
          <h1 className="text-4xl font-bold text-gradient-gold mb-8">Mentions Légales</h1>

          <section className="legal-section mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Éditeur du site</h2>
            <p className="text-white/80 leading-relaxed">
              Le site Astraia est édité par :<br />
              <strong>Astraia</strong><br />
              Email : astraia.holding@gmail.com
            </p>
          </section>

          <section className="legal-section mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">2. Hébergement</h2>
            <p className="text-white/80 leading-relaxed">
              Ce site est hébergé par :<br />
              [À compléter avec les informations de votre hébergeur]
            </p>
          </section>

          <section className="legal-section mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">3. Propriété intellectuelle</h2>
            <p className="text-white/80 leading-relaxed">
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
              Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
          </section>

          <section className="legal-section mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Données personnelles</h2>
            <p className="text-white/80 leading-relaxed">
              Les informations recueillies via le formulaire de contact font l'objet d'un traitement informatique destiné à traiter votre demande.
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant.
              Pour exercer ce droit, contactez-nous à : astraia.holding@gmail.com
            </p>
            <p className="text-white/80 leading-relaxed mt-4">
              Pour plus d'informations, consultez notre{' '}
              <Link href="/confidentialite" className="text-gold hover:text-lightgold underline">
                politique de confidentialité
              </Link>.
            </p>
          </section>

          <section className="legal-section mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Cookies</h2>
            <p className="text-white/80 leading-relaxed">
              Ce site n'utilise pas de cookies de tracking ou publicitaires.
              Seuls des cookies techniques essentiels au fonctionnement du site peuvent être utilisés.
            </p>
          </section>

          <section className="legal-section mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Limitation de responsabilité</h2>
            <p className="text-white/80 leading-relaxed">
              Astraia ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l'utilisateur,
              lors de l'accès au site, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications indiquées,
              soit de l'apparition d'un bug ou d'une incompatibilité.
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
