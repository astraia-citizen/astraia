import Link from 'next/link';

export default function FooterBare() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container bg-base border-t border-white/10 py-8">
      <div className="container-custom">
        <div className="footer-content flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="footer-copyright text-white/60 text-sm">
            © {currentYear} Astraia. Tous droits réservés.
          </div>

          <nav className="footer-nav flex items-center space-x-6" aria-label="Footer navigation">
            <Link
              href="/mentions-legales"
              className="footer-link text-white/60 hover:text-gold text-sm transition-colors duration-200"
            >
              Mentions légales
            </Link>
            <Link
              href="/confidentialite"
              className="footer-link text-white/60 hover:text-gold text-sm transition-colors duration-200"
            >
              Confidentialité
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
