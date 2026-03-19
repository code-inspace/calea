import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useTextRoll from '../hooks/useTextRoll';

export default function NotFound() {
  const { t } = useTranslation();
  const btnRef = useTextRoll();

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
          className="relative inline-flex justify-center items-center w-48 h-12 bg-[#1A2F23] text-[#FDFCF8] font-inter text-xs tracking-widest uppercase overflow-hidden hover:shadow-xl hover:shadow-[#1A2F23]/20 transition-shadow duration-300"
        >
          <span className="roll-top flex items-center justify-center w-full">{t('notFound.btn')}</span>
          <span className="roll-bottom absolute inset-0 flex items-center justify-center">{t('notFound.btn')}</span>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
