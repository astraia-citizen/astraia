'use client';

import Image from 'next/image';
import { useState } from 'react';

const CLIENT_LOGOS = [
  { id: 1, name: 'Client 1', src: '/logos/client-1.svg' },
  { id: 2, name: 'Client 2', src: '/logos/client-2.svg' },
  { id: 3, name: 'Client 3', src: '/logos/client-3.svg' },
];

export default function Proof() {
  const [showMetric, setShowMetric] = useState(false);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const timer = setTimeout(() => {
      setShowMetric(true);
    }, 800);
    setHoverTimer(timer);
  };

  const handleMouseLeave = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
    }
    setShowMetric(false);
  };

  return (
    <section className="proof-section section">
      <div className="container-custom">
        <div className="proof-content space-y-16">
          {/* Client Logos */}
          <div className="proof-logos-wrapper">
            <h2 className="proof-logos-heading text-center text-sm uppercase tracking-wider text-white/60 mb-8">
              Ils nous font confiance
            </h2>
            <div className="proof-logos-grid grid grid-cols-3 gap-8 items-center max-w-3xl mx-auto">
              {CLIENT_LOGOS.map((logo) => (
                <div
                  key={logo.id}
                  className="proof-logo-item flex items-center justify-center p-4 opacity-60 hover:opacity-100 transition-opacity duration-300"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={120}
                    height={40}
                    className="proof-logo-image w-auto h-8 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial with secret hover interaction */}
          <div className="proof-testimonial-wrapper max-w-3xl mx-auto">
            <div
              className="proof-testimonial-card card relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="proof-testimonial-quote-icon absolute top-4 left-4 text-6xl text-gold/20 leading-none">
                "
              </div>
              <div className="proof-testimonial-content relative pl-8 pt-8">
                <blockquote className="proof-testimonial-quote text-lg text-white/90 mb-6">
                  Notre nouveau site a généré 42% de demandes en plus dès le premier mois. 
                  Le temps de chargement divisé par 3, et enfin visible sur Google Maps.
                </blockquote>
                <footer className="proof-testimonial-footer flex items-center space-x-4">
                  <div className="proof-testimonial-avatar w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                    <span className="proof-testimonial-avatar-text text-gold font-semibold">
                      MC
                    </span>
                  </div>
                  <div className="proof-testimonial-author-info">
                    <cite className="proof-testimonial-author-name block text-white font-semibold not-italic">
                      Marie Clément
                    </cite>
                    <span className="proof-testimonial-author-title text-white/60 text-sm">
                      Gérante, Artisan Menuiserie
                    </span>
                  </div>
                </footer>

                {/* Secret metric tooltip */}
                {showMetric && (
                  <div className="proof-metric-tooltip absolute -top-12 right-4 bg-gold text-base px-4 py-2 rounded-lg shadow-lg animate-scale-in z-10">
                    <span className="proof-metric-tooltip-text text-sm font-semibold">
                      Score PageSpeed : 32 → 94
                    </span>
                    <div className="proof-metric-tooltip-arrow absolute -bottom-1 right-4 w-2 h-2 bg-gold transform rotate-45" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="proof-badges-wrapper">
            <div className="proof-badges-list flex flex-wrap items-center justify-center gap-6 text-white/70">
              <div className="proof-badge-item flex items-center space-x-2">
                <svg
                  className="proof-badge-icon w-5 h-5 text-gold"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="proof-badge-text text-sm">Note Google 4,9/5</span>
              </div>
              <span className="proof-badge-separator text-white/30">•</span>
              <div className="proof-badge-item flex items-center space-x-2">
                <span className="proof-badge-text text-sm">34 avis</span>
              </div>
              <span className="proof-badge-separator text-white/30">•</span>
              <div className="proof-badge-item flex items-center space-x-2">
                <span className="proof-badge-text text-sm">2 prix industrie</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
