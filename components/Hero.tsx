import CTA from '@/components/CTA';

export default function Hero() {
  return (
    <section className="hero-section section pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
      <div className="hero-background absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="hero-content grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="hero-text-wrapper space-y-8 animate-slide-up">
            <h1 className="hero-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="hero-heading-main text-white">
                Générez plus de demandes locales avec un site{' '}
              </span>
              <span className="hero-heading-highlight text-gradient-gold">
                plus rapide et mieux référencé
              </span>
            </h1>

            <p className="hero-subtitle text-lg md:text-xl text-white/80 max-w-2xl">
              Refontes orientées SEO et conversion. Mobile-first. Mise en ligne sans friction.
            </p>

            {/* Micro-preuves masquées temporairement */}
            {false && (
              <div className="hero-proof-list grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                <div className="hero-proof-item flex items-start space-x-2">
                  <svg
                    className="hero-proof-icon w-6 h-6 text-gold flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="hero-proof-text text-sm text-white/90">
                    <strong className="hero-proof-number text-gold">+38%</strong> formulaires en médiane
                  </span>
                </div>

                <div className="hero-proof-item flex items-start space-x-2">
                  <svg
                    className="hero-proof-icon w-6 h-6 text-gold flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span className="hero-proof-text text-sm text-white/90">
                    <strong className="hero-proof-number text-gold">LCP &lt; 2s</strong> mobile
                  </span>
                </div>

                <div className="hero-proof-item flex items-start space-x-2">
                  <svg
                    className="hero-proof-icon w-6 h-6 text-gold flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span className="hero-proof-text text-sm text-white/90">
                    Schéma <strong className="hero-proof-number text-gold">LocalBusiness & FAQ</strong>
                  </span>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="hero-cta-wrapper space-y-3">
              <CTA />
              <p className="hero-cta-microcopy text-sm text-white/60">
                Réponse sous 24 h · Pas de CB
              </p>
            </div>
          </div>

          {/* Visual */}
          <div className="hero-visual-wrapper relative">
            <div className="hero-visual-image-wrapper relative flex items-center justify-center">
              <img
                src="/images/statue.png"
                alt="Exemple de refonte de site réalisée par Astraia"
                className="hero-visual-image mx-auto h-auto w-auto object-contain max-h-[42vh] md:max-h-[50vh] lg:max-h-[55vh]"
              />
            </div>

            {/* Decorative elements */}
            <div className="hero-decoration-blur absolute -top-10 -right-10 w-64 h-64 bg-gold/20 rounded-full blur-3xl pointer-events-none" />
            <div className="hero-decoration-blur-secondary absolute -bottom-10 -left-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
