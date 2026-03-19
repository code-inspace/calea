import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ResortMap from '../components/ResortMap';

export default function Contact() {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Formspree endpoint · replace YOUR_FORM_ID with your real Formspree form ID
    const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) setIsSubmitted(true);
  };

  return (
    <main className="relative w-full min-h-screen bg-paradou-cream text-paradou-green overflow-x-hidden">
      <Helmet>
        <title>Contact · Caléa Resort</title>
        <meta name="description" content="Écrivez-nous pour réserver votre bungalow, obtenir des informations ou planifier votre séjour à Caléa, sur la Côte d'Azur." />
      </Helmet>
      <Navbar />

      {/* SECTION 01: HERO CONTACT */}
      <section className="pt-48 pb-20 px-4 md:px-12 flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-tight mb-8">
          {t('contactPage.heroTitle')}
        </h1>
        <p className="font-sans text-lg md:text-xl text-paradou-green/60">
          {t('contactPage.heroSub')}
        </p>
      </section>

      {/* SECTION 02: FORMULAIRE CONTACT */}
      <section className="py-20 px-4 flex justify-center w-full">
        <div className="w-full max-w-2xl">
          {isSubmitted ? (
            <div className="bg-paradou-green/5 p-12 text-center fade-in">
              <h3 className="font-serif text-3xl md:text-4xl mb-4">
                {t('contactPage.form.successTitle')}
              </h3>
              <p className="font-sans text-lg opacity-80">
                {t('contactPage.form.successDesc')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              {/* Name */}
              <div className="relative">
                <input 
                  type="text" 
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="peer w-full bg-transparent border-b border-paradou-green/30 px-0 py-3 font-sans text-lg md:text-xl text-paradou-green placeholder-transparent focus:outline-none focus:border-paradou-green transition-colors"
                  placeholder={t('contactPage.form.nameLabel')}
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-0 -top-5 text-sm font-sans tracking-widest uppercase opacity-50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-sm peer-focus:opacity-80 cursor-text"
                >
                  {t('contactPage.form.nameLabel')}
                </label>
              </div>

              {/* Email */}
              <div className="relative">
                <input 
                  type="email" 
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="peer w-full bg-transparent border-b border-paradou-green/30 px-0 py-3 font-sans text-lg md:text-xl text-paradou-green placeholder-transparent focus:outline-none focus:border-paradou-green transition-colors"
                  placeholder={t('contactPage.form.emailLabel')}
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-0 -top-5 text-sm font-sans tracking-widest uppercase opacity-50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-sm peer-focus:opacity-80 cursor-text"
                >
                  {t('contactPage.form.emailLabel')}
                </label>
              </div>

              {/* Subject */}
              <div className="relative pt-6">
                <select 
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-paradou-green/30 px-0 py-3 font-sans text-lg md:text-xl text-paradou-green appearance-none focus:outline-none focus:border-paradou-green transition-colors cursor-pointer"
                >
                  <option value="" disabled hidden>{t('contactPage.form.subjectLabel')}</option>
                  <option value="reservation">{t('contactPage.form.subjects.reservation')}</option>
                  <option value="info">{t('contactPage.form.subjects.info')}</option>
                  <option value="other">{t('contactPage.form.subjects.other')}</option>
                </select>
                <div className="absolute right-0 top-12 pointer-events-none opacity-50">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
              </div>

              {/* Message */}
              <div className="relative">
                <textarea 
                  name="message"
                  id="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="peer w-full bg-transparent border-b border-paradou-green/30 px-0 py-3 font-sans text-lg md:text-xl text-paradou-green placeholder-transparent focus:outline-none focus:border-paradou-green transition-colors resize-none"
                  placeholder={t('contactPage.form.messageLabel')}
                />
                <label 
                  htmlFor="message" 
                  className="absolute left-0 -top-5 text-sm font-sans tracking-widest uppercase opacity-50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-sm peer-focus:opacity-80 cursor-text"
                >
                  {t('contactPage.form.messageLabel')}
                </label>
              </div>

              <div className="pt-8 w-full flex justify-center">
                <button 
                  type="submit"
                  className="px-16 py-5 bg-paradou-green text-paradou-cream font-inter tracking-widest text-sm uppercase hover:bg-paradou-green/80 transition-colors duration-300 w-full md:w-auto"
                >
                  {t('contactPage.form.submitBtn')}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* SECTION 03: INFORMATIONS PRATIQUES */}
      <section className="py-24 px-4 w-full flex justify-center">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center">
          
          {/* Address */}
          <div className="flex flex-col items-center">
            <h4 className="font-inter font-medium tracking-[0.2em] uppercase text-xs opacity-50 mb-6">
              {t('contactPage.info.addressTitle')}
            </h4>
            {t('contactPage.info.addressLines', { returnObjects: true }).map((line, i) => (
              <p key={i} className="font-inter font-light text-base md:text-lg opacity-90 leading-relaxed">
                {line}
              </p>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center">
            <h4 className="font-inter font-medium tracking-[0.2em] uppercase text-xs opacity-50 mb-6">
              {t('contactPage.info.contactTitle')}
            </h4>
            <p className="font-inter font-light text-base md:text-lg opacity-90 leading-relaxed">
              {t('contactPage.info.phone')}
            </p>
            <p className="font-inter font-light text-base md:text-lg opacity-90 leading-relaxed">
              {t('contactPage.info.email')}
            </p>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <h4 className="font-inter font-medium tracking-[0.2em] uppercase text-xs opacity-50 mb-6">
              {t('contactPage.info.hoursTitle')}
            </h4>
            {t('contactPage.info.hoursLines', { returnObjects: true }).map((line, i) => (
              <p key={i} className="font-inter font-light text-base md:text-lg opacity-90 leading-relaxed">
                {line}
              </p>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 04: CARTE */}
      <section className="w-full bg-[#1A2F23] relative flex flex-col md:flex-row overflow-hidden">

        {/* Text Content */}
        <div className="w-full md:w-[45%] z-10 flex flex-col justify-center py-24 px-8 md:px-16">
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-8 leading-tight max-w-lg">
            Caléa, un refuge exclusif niché au cœur de la <span className="italic">French Riviera</span>.
          </h2>
          <p className="font-sans text-lg md:text-xl text-white/70 max-w-md leading-relaxed">
            Situé sur les hauteurs de la presqu'île, notre domaine offre une parenthèse de calme absolu, suspendu entre le maquis provençal et l'azur infini de la Méditerranée.
          </p>
        </div>

        {/* Map */}
        <div className="w-full md:w-[55%] h-[60vw] md:h-auto md:min-h-[70vh]">
          <ResortMap />
        </div>
      </section>

      <Footer />
    </main>
  );
}
