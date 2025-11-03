export default function Story() {
  return (
    <section className="story-section section bg-white/5">
      <div className="container-custom">
        <div className="story-content max-w-4xl mx-auto space-y-8">
          <div className="story-header text-center mb-12">
            <h2 className="story-heading text-3xl md:text-4xl font-bold text-gradient-gold mb-4">
              Un site qui ne convertit pas coûte cher
            </h2>
          </div>

          <div className="story-grid grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Problème (PAS) */}
            <div className="story-problem-card card space-y-4">
              <div className="story-problem-icon-wrapper w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                <svg
                  className="story-problem-icon w-6 h-6 text-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="story-problem-heading text-xl font-semibold text-white">
                Le problème
              </h3>
              <p className="story-problem-text text-white/80 leading-relaxed">
                Votre site charge lentement, Google ne le trouve pas, et les visiteurs partent avant même de voir votre offre. 
                Vous payez pour du trafic qui ne se transforme jamais en clients.
              </p>
            </div>

            {/* Solution (BAB) */}
            <div className="story-solution-card card space-y-4">
              <div className="story-solution-icon-wrapper w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                <svg
                  className="story-solution-icon w-6 h-6 text-accent"
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
              </div>
              <h3 className="story-solution-heading text-xl font-semibold text-white">
                Notre approche
              </h3>
              <p className="story-solution-text text-white/80 leading-relaxed">
                Nous reconstruisons votre site sur des bases techniques solides : performance mobile, SEO local intégré, 
                parcours de conversion optimisés. Résultat : plus de visibilité, plus de demandes, meilleur ROI.
              </p>
            </div>
          </div>

          {/* Additional context */}
          <div className="story-footer text-center pt-8">
            <p className="story-footer-text text-white/70 italic">
              Pas de refonte pour la refonte. Chaque projet démarre par un audit conversion et performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
