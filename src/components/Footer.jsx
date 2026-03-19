import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logoLight from '../assets/logo-calea-light.png';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <section id="contact" data-color="#1A2F23" className="py-40 flex flex-col items-center justify-center text-center w-full">
      <img src={logoLight} alt="Caléa" className="h-12 md:h-16 mb-16 opacity-80" />
      <h2 className="font-serif text-5xl md:text-7xl text-white mb-6 px-4">
        {t('footer.headline')}
      </h2>
      <p className="font-sans text-lg text-white/70 uppercase tracking-widest mb-16 px-4">
        {t('footer.subhead')}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto px-4">
        <Link 
          to="/contact"
          className="flex-1 md:flex-none px-10 py-5 bg-white text-paradou-green font-sans tracking-widest text-sm uppercase hover:bg-paradou-mint transition-colors duration-300"
        >
          {t('footer.ctaPrimary')}
        </Link>
        <Link 
          to="/contact"
          className="flex-1 md:flex-none px-10 py-5 border border-white/30 text-white font-sans tracking-widest text-sm uppercase hover:bg-white hover:text-paradou-green transition-colors duration-300"
        >
          {t('footer.ctaSecondary')}
        </Link>
      </div>
      <div className="mt-32 w-full px-4 opacity-50 font-sans text-xs tracking-widest text-white leading-loose text-center">
        {t('footer.seoLinks')}
      </div>
      <div className="mt-12 flex flex-col items-center gap-4 font-inter font-light text-xs text-white/40 tracking-widest">
        <Link to="/mentions-legales" className="uppercase hover:text-white transition-colors">Mentions Légales</Link>
        <div className="flex items-center gap-2">
          <span>© 2026 Caléa</span>
          <span>—</span>
          <span>
            Réalisé par <a href="https://axelcoudair.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Axel Coudair</a>
          </span>
        </div>
      </div>
    </section>
  );
}
