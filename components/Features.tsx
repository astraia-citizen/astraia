export default function Features() {
  return (
    <section className="features-section section bg-white/5">
      <div className="container-custom">
        <div className="features-header text-center mb-16">
          <h2 className="features-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Voir la <span className="text-gradient-gold">différence</span>
          </h2>
          <p className="features-subheading text-white/70 max-w-2xl mx-auto">
            Résultats mesurables, impact visible
          </p>
        </div>

        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Avant/Après */}
          <div className="feature-card card hover-lift space-y-4">
            <div className="feature-card-header">
              <h3 className="feature-card-heading text-xl font-semibold text-gold mb-2">
                Avant / Après
              </h3>
              <p className="feature-card-description text-white/70 text-sm">
                Transformation visuelle et technique
              </p>
            </div>

            <div className="feature-card-content space-y-4">
              <div className="feature-image-wrapper relative aspect-video overflow-hidden rounded-lg border border-white/10">
                <div className="feature-image-before absolute inset-0 w-1/2 z-10">
                  <img
                    src="/screens/before.svg"
                    alt="Site avant refonte"
                    className="feature-image object-cover w-full h-full"
                  />
                  <div className="feature-image-label absolute bottom-2 left-2 bg-red-500/90 text-white text-xs px-2 py-1 rounded">
                    Avant
                  </div>
                </div>
                <div className="feature-image-after absolute inset-0">
                  <img
                    src="/screens/after.svg"
                    alt="Site après refonte"
                    className="feature-image object-cover w-full h-full"
                  />
                  <div className="feature-image-label absolute bottom-2 right-2 bg-green-500/90 text-white text-xs px-2 py-1 rounded">
                    Après
                  </div>
                </div>
              </div>

              <ul className="feature-list space-y-2 text-sm text-white/80">
                <li className="feature-list-item flex items-start space-x-2">
                  <svg
                    className="feature-list-icon w-5 h-5 text-gold flex-shrink-0 mt-0.5"
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
                  <span className="feature-list-text">Design moderne et professionnel</span>
                </li>
                <li className="feature-list-item flex items-start space-x-2">
                  <svg
                    className="feature-list-icon w-5 h-5 text-gold flex-shrink-0 mt-0.5"
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
                  <span className="feature-list-text">Navigation intuitive</span>
                </li>
                <li className="feature-list-item flex items-start space-x-2">
                  <svg
                    className="feature-list-icon w-5 h-5 text-gold flex-shrink-0 mt-0.5"
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
                  <span className="feature-list-text">CTA bien placés</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Performance réelle */}
          <div className="feature-card card hover-lift space-y-4">
            <div className="feature-card-header">
              <h3 className="feature-card-heading text-xl font-semibold text-gold mb-2">
                Performance réelle
              </h3>
              <p className="feature-card-description text-white/70 text-sm">
                Scores mesurés sur mobile
              </p>
            </div>

            <div className="feature-card-content space-y-4">
              <div className="feature-image-wrapper relative aspect-video overflow-hidden rounded-lg border border-white/10">
                <img
                  src="/screens/pagespeed.svg"
                  alt="Screenshot PageSpeed Insights"
                  className="feature-image object-cover w-full h-full"
                />
              </div>

              <div className="feature-metrics-grid grid grid-cols-2 gap-4">
                <div className="feature-metric-item bg-white/5 rounded-lg p-3 text-center">
                  <div className="feature-metric-value text-2xl font-bold text-green-400">
                    94
                  </div>
                  <div className="feature-metric-label text-xs text-white/60">
                    Performance
                  </div>
                </div>
                <div className="feature-metric-item bg-white/5 rounded-lg p-3 text-center">
                  <div className="feature-metric-value text-2xl font-bold text-green-400">
                    100
                  </div>
                  <div className="feature-metric-label text-xs text-white/60">
                    Accessibilité
                  </div>
                </div>
                <div className="feature-metric-item bg-white/5 rounded-lg p-3 text-center">
                  <div className="feature-metric-value text-2xl font-bold text-green-400">
                    100
                  </div>
                  <div className="feature-metric-label text-xs text-white/60">
                    Best Practices
                  </div>
                </div>
                <div className="feature-metric-item bg-white/5 rounded-lg p-3 text-center">
                  <div className="feature-metric-value text-2xl font-bold text-green-400">
                    100
                  </div>
                  <div className="feature-metric-label text-xs text-white/60">
                    SEO
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Démonstration */}
          <div className="feature-card card hover-lift space-y-4">
            <div className="feature-card-header">
              <h3 className="feature-card-heading text-xl font-semibold text-gold mb-2">
                Démonstration
              </h3>
              <p className="feature-card-description text-white/70 text-sm">
                Parcours utilisateur fluide
              </p>
            </div>

            <div className="feature-card-content space-y-4">
              <div className="feature-video-wrapper relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-base/50">
                <img
                  src="/images/statue.png"
                  alt="Démonstration du parcours utilisateur"
                  className="feature-video w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-2 text-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    <p className="text-sm text-white/80">Vidéo démo à venir</p>
                  </div>
                </div>
              </div>

              <ul className="feature-list space-y-2 text-sm text-white/80">
                <li className="feature-list-item flex items-start space-x-2">
                  <svg
                    className="feature-list-icon w-5 h-5 text-gold flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="feature-list-text">Optimisé mobile-first</span>
                </li>
                <li className="feature-list-item flex items-start space-x-2">
                  <svg
                    className="feature-list-icon w-5 h-5 text-gold flex-shrink-0 mt-0.5"
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
                  <span className="feature-list-text">Chargement instantané</span>
                </li>
                <li className="feature-list-item flex items-start space-x-2">
                  <svg
                    className="feature-list-icon w-5 h-5 text-gold flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  <span className="feature-list-text">Conversion optimisée</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
