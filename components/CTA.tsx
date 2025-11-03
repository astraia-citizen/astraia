'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface CaptchaChallenge {
  a: number;
  b: number;
  nonce: string;
  mac: string;
}

export default function CTA() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [captcha, setCaptcha] = useState<CaptchaChallenge | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    siteUrl: '',
    answer: '',
    website: '', // honeypot
  });

  const openModal = async () => {
    setIsModalOpen(true);
    setError('');
    
    // Load captcha challenge
    try {
      const response = await fetch('/api/captcha');
      if (!response.ok) throw new Error('Erreur lors du chargement du captcha');
      const data = await response.json();
      setCaptcha(data);
    } catch (err) {
      setError('Impossible de charger le formulaire. Veuillez réessayer.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      message: '',
      siteUrl: '',
      answer: '',
      website: '',
    });
    setCaptcha(null);
    setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Client-side message length guard for better UX
    const msgLen = formData.message.trim().length;
    if (msgLen < 10) {
      setError('Le message est trop court (minimum 10 caractères).');
      setIsLoading(false);
      return;
    }

    if (!captcha) {
      setError('Erreur de captcha. Veuillez recharger.');
      setIsLoading(false);
      return;
    }

    try {
      // Normalize optional siteUrl (prepend https:// if missing scheme)
      const normalizedSiteUrl = formData.siteUrl && formData.siteUrl.trim().length > 0
        ? (/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(formData.siteUrl.trim())
            ? formData.siteUrl.trim()
            : `https://${formData.siteUrl.trim()}`)
        : '';

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          siteUrl: normalizedSiteUrl,
          nonce: captcha.nonce,
          mac: captcha.mac,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      // Success - redirect to thank you page
      router.push('/thank-you');
    } catch (err) {
      const rawMsg = err instanceof Error ? err.message : 'Une erreur est survenue';
      // Provide friendlier messages for common validation errors
      if (rawMsg.includes('Le message doit contenir au moins')) {
        setError('Le message est trop court (minimum 10 caractères).');
      } else if (rawMsg.includes('Le nom doit contenir au moins')) {
        setError('Votre nom est trop court (minimum 2 caractères).');
      } else if (rawMsg.toLowerCase().includes('email invalide')) {
        setError('Votre email semble invalide.');
      } else {
        setError(rawMsg);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="cta-button btn-primary"
        aria-label="Demander une proposition"
      >
        Demander une proposition
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="modal-container bg-base border border-white/20 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="modal-header flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="modal-title text-2xl font-bold text-gradient-gold">
                Demander une proposition
              </h2>
              <button
                onClick={closeModal}
                className="modal-close-button text-white/60 hover:text-white transition-colors duration-200 p-2"
                aria-label="Fermer"
              >
                <svg
                  className="modal-close-icon w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form p-6 space-y-6">
              {error && (
                <div className="form-error bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="form-field">
                <label htmlFor="name" className="form-label block text-white font-semibold mb-2">
                  Nom <span className="text-gold">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="input"
                  minLength={2}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Votre nom"
                />
              </div>

              <div className="form-field">
                <label htmlFor="email" className="form-label block text-white font-semibold mb-2">
                  Email <span className="text-gold">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="votre@email.com"
                />
              </div>

              <div className="form-field">
                <label htmlFor="company" className="form-label block text-white font-semibold mb-2">
                  Entreprise
                </label>
                <input
                  type="text"
                  id="company"
                  className="input"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Nom de votre entreprise (optionnel)"
                />
              </div>

              <div className="form-field">
                <label htmlFor="siteUrl" className="form-label block text-white font-semibold mb-2">
                  Lien de votre site web <span className="text-white/50">(optionnel)</span>
                </label>
                <input
                  type="text"
                  id="siteUrl"
                  className="input"
                  value={formData.siteUrl}
                  onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
                  onBlur={(e) => {
                    const raw = e.target.value.trim();
                    if (!raw) return;
                    const hasScheme = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(raw);
                    const normalized = hasScheme ? raw : `https://${raw}`;
                    if (normalized !== formData.siteUrl) {
                      setFormData({ ...formData, siteUrl: normalized });
                    }
                  }}
                  placeholder="axelproject.fr ou https://votresite.com"
                  inputMode="url"
                />
                <p className="mt-1 text-xs text-white/60">Vous pouvez saisir un domaine simple, nous ajoutons https automatiquement.</p>
              </div>

              <div className="form-field">
                <label htmlFor="message" className="form-label block text-white font-semibold mb-2">
                  Message <span className="text-gold">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="textarea"
                  minLength={10}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Décrivez votre projet en quelques mots..."
                />
                {/* Inline helper + counter */}
                {(() => {
                  const len = formData.message.trim().length;
                  const tooShort = len > 0 && len < 10;
                  return (
                    <div className="mt-1 text-xs flex items-center justify-between">
                      <p className={tooShort ? 'text-red-400' : 'text-white/60'}>
                        {tooShort ? 'Le message est trop court (10 caractères min.)' : 'Minimum 10 caractères'}
                      </p>
                      <span className={tooShort ? 'text-red-400' : 'text-white/60'}>
                        {len}/10 min
                      </span>
                    </div>
                  );
                })()}
              </div>

              {/* Honeypot field - hidden from users */}
              <div className="form-field-honeypot" style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>

              {/* Captcha */}
              {captcha && (
                <div className="form-field captcha-field bg-white/5 p-4 rounded-lg border border-white/10">
                  <label htmlFor="answer" className="form-label block text-white font-semibold mb-2">
                    Question de sécurité: Combien font {captcha.a} + {captcha.b} ?{' '}
                    <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="answer"
                    required
                    className="input"
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    placeholder="Votre réponse"
                    pattern="[0-9]*"
                    inputMode="numeric"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !captcha}
                className="form-submit-button btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="form-submit-loading flex items-center justify-center">
                    <svg
                      className="form-submit-spinner animate-spin -ml-1 mr-3 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Envoi en cours...
                  </span>
                ) : (
                  'Envoyer ma demande'
                )}
              </button>

              <p className="form-footer-text text-center text-sm text-white/60">
                Réponse sous 24 heures · Vos données restent privées
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
