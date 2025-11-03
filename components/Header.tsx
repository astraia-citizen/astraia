'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface HeaderProps {
  showNav?: boolean;
  showPhone?: boolean;
}

export default function Header({ showNav = true, showPhone = true }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE || '';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`header-container fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-base/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="header-content flex items-center justify-between h-16 md:h-20">
            <div className="header-logo-wrapper">
              <Link href="/" className="header-logo-link flex items-center space-x-3 group">
                {/* Logo image with circular frame */}
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full ring-2 ring-gold/80 bg-base overflow-hidden shadow-sm group-hover:ring-lightgold/90 transition-all duration-300">
                  <img
                    src="/logos/astraia-logo.png"
                    alt="Logo Astraia"
                    className="w-full h-full object-cover"
                  />
                </span>
                <span className="header-logo-text text-2xl font-bold text-gradient-gold transition-transform duration-300 group-hover:scale-105">
                  Astraia
                </span>
              </Link>
            </div>

            {showNav && (
              <nav className="header-nav hidden md:flex items-center space-x-8">
                {phoneNumber && showPhone && (
                  <a
                    href={`tel:${phoneNumber}`}
                    className="header-phone-link btn-secondary"
                    aria-label="Appeler Astraia"
                  >
                    <svg
                      className="header-phone-icon w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Appeler
                  </a>
                )}
              </nav>
            )}
          </div>
        </div>
      </header>

      {/* Mobile sticky phone button */}
      {phoneNumber && showPhone && (
        <div className="mobile-phone-sticky-container fixed bottom-4 right-4 z-50 md:hidden">
          <a
            href={`tel:${phoneNumber}`}
            className="mobile-phone-sticky-button flex items-center justify-center w-14 h-14 bg-gold hover:bg-lightgold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Appeler Astraia"
          >
            <svg
              className="mobile-phone-icon w-6 h-6 text-base"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </a>
        </div>
      )}
    </>
  );
}
