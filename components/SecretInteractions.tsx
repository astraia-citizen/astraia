'use client';

import { useEffect, useState } from 'react';

/**
 * Secret Interactions - Easter eggs discrets
 * - Konami code → confettis
 * - Triple tap sur logo mobile → lien rendez-vous
 * - Hover prolongé sur témoignage → métrique détaillée
 */

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export default function SecretInteractions() {
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSecretLink, setShowSecretLink] = useState(false);

  // Konami code handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      if (key === KONAMI_CODE[konamiIndex]) {
        const newIndex = konamiIndex + 1;
        
        if (newIndex === KONAMI_CODE.length) {
          // Konami code completed!
          setShowConfetti(true);
          setKonamiIndex(0);
          
          // Hide confetti after 2 seconds
          setTimeout(() => setShowConfetti(false), 2000);
        } else {
          setKonamiIndex(newIndex);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIndex]);

  // Triple tap on logo handler
  useEffect(() => {
    let tapCount = 0;
    let tapTimer: NodeJS.Timeout;

    const handleLogoTap = () => {
      tapCount++;

      if (tapCount === 1) {
        tapTimer = setTimeout(() => {
          tapCount = 0;
        }, 500);
      }

      if (tapCount === 3) {
        clearTimeout(tapTimer);
        tapCount = 0;
        setShowSecretLink(true);
      }
    };

    const logoElement = document.querySelector('.header-logo-link');
    if (logoElement) {
      logoElement.addEventListener('click', handleLogoTap as EventListener);
    }

    return () => {
      if (logoElement) {
        logoElement.removeEventListener('click', handleLogoTap as EventListener);
      }
      clearTimeout(tapTimer);
    };
  }, []);

  return (
    <>
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="confetti-container fixed inset-0 pointer-events-none z-[9999]" aria-hidden="true">
          <div className="confetti-animation">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="confetti-piece absolute w-2 h-2 bg-gold rounded-full animate-fade-in"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  opacity: Math.random(),
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Secret appointment link */}
      {showSecretLink && (
        <div className="secret-link-container fixed bottom-20 right-4 z-50 animate-scale-in">
          <a
            href="https://calendly.com/astraia"
            target="_blank"
            rel="noopener noreferrer"
            className="secret-link-button inline-flex items-center px-4 py-2 bg-gold/90 backdrop-blur-sm text-base text-sm font-semibold rounded-lg shadow-lg hover:bg-lightgold transition-all duration-300"
          >
            <svg
              className="secret-link-icon w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Prendre RDV
          </a>
        </div>
      )}
    </>
  );
}
