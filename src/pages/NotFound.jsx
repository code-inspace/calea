import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useButtonAnim from '../hooks/useButtonAnim';

export default function NotFound() {
  const { t } = useTranslation();
  const btnRef = useButtonAnim('cta');

  return (
    <main className="relative w-full min-h-screen bg-paradou-cream text-paradou-green overflow-x-hidden flex flex-col">
      <Helmet>
        <title>404 — Caléa Resort</title>
        <meta name="description" content="Page introuvable." />
      </Helmet>

      <Navbar />

      <section className="flex-grow flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center min-h-[calc(100vh-10rem)]">
        <h1 className="font-serif text-[8rem] md:text-[12rem] leading-none mb-4 text-paradou-green/10 select-none">
          {t('notFound.title')}
        </h1>
        <h2 className="font-serif text-4xl md:text-5xl mb-6">
          {t('notFound.subtitle')}
        </h2>
        <p className="font-sans text-lg md:text-xl text-paradou-green/60 mb-12">
          {t('notFound.desc')}
        </p>

        <Link
          ref={btnRef}
          to="/"
          className="group relative inline-flex justify-center items-center w-48 h-12 bg-[#1A2F23] text-[#FDFCF8] font-inter text-xs tracking-widest uppercase overflow-hidden transition-shadow duration-500 hover:shadow-xl hover:shadow-[#1A2F23]/20"
        >
          <span className="relative z-10 transition-colors duration-500 group-hover:text-[#1A2F23] mix-blend-difference">{t('notFound.btn')}</span>
          <div className="absolute inset-0 bg-white translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:translate-y-0" />
        </Link>
      </section>

      <Footer />
    </main>
  );
}
