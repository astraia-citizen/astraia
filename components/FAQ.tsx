'use client';

import { useState } from 'react';
import { FAQ_DATA } from '@/lib/faq-data';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section section" id="faq">
      <div className="container-custom">
        <div className="faq-content max-w-3xl mx-auto">
          <div className="faq-header text-center mb-12">
            <h2 className="faq-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Questions <span className="text-gradient-gold">fréquentes</span>
            </h2>
            <p className="faq-subheading text-white/70">
              Tout ce que vous devez savoir
            </p>
          </div>

          <div className="faq-list space-y-4">
            {FAQ_DATA.map((item, index) => (
              <div
                key={index}
                className="faq-item card hover:border-gold/50 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="faq-question-button w-full flex items-center justify-between text-left p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="faq-question-text text-lg font-semibold text-white pr-4">
                    {item.question}
                  </span>
                  <svg
                    className={`faq-question-icon w-6 h-6 text-gold flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={`faq-answer-wrapper overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  <div className="faq-answer-content px-6 pb-6 text-white/80 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-footer text-center mt-12">
            <p className="faq-footer-text text-white/60">
              Une autre question ?{' '}
              <a
                href="mailto:astraia.holding@gmail.com"
                className="faq-footer-link text-gold hover:text-lightgold transition-colors duration-200 underline"
              >
                Contactez-nous
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
