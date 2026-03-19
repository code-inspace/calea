import React, { useLayoutEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Noise from '../components/Noise';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ScrollExperience from '../components/ScrollExperience';
import StoryCarousel from '../components/StoryCarousel';
import BungalowGrid from '../components/BungalowGrid';
import ActivitiesRoulette from '../components/ActivitiesRoulette';
import Footer from '../components/Footer';
import { getPrimaryHex } from '../config/colors';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { t } = useTranslation();
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('section');
      sections.forEach((section) => {
        const raw = section.getAttribute('data-color') || '#FDFCF8';
        const color = raw === 'primary' ? getPrimaryHex() : raw;
        ScrollTrigger.create({
          trigger: section,
          start: "top 75%",
          end: "bottom 25%",
          onEnter: () => gsap.to(mainRef.current, { backgroundColor: color, duration: 1, overwrite: "auto" }),
          onEnterBack: () => gsap.to(mainRef.current, { backgroundColor: color, duration: 1, overwrite: "auto" })
        });
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <main id="top" ref={mainRef} className="relative w-full overflow-x-hidden min-h-screen bg-calea-cream">
      <Helmet>
        <title>Caléa · Resort Provençal · Luxe & Nature sur la Côte d'Azur</title>
        <meta name="description" content="Caléa, le resort provençal secret sur la Côte d'Azur. Bungalows privatifs face à la mer, spa, cuisine locale et expériences uniques. Réservez votre escapade." />
      </Helmet>
      <Noise />
      <Navbar />

      <Hero />

      {/* <ScrollExperience /> */}

      {/* Hook Section */}
      <section id="story" data-color="#FDFCF8" className="min-h-[50vh] flex items-center justify-center text-center py-32">
        <div className="w-full px-4 md:px-12 flex flex-col items-center">
          <h2 className="font-serif text-3xl md:text-5xl mb-12 text-calea-primary leading-tight">
            {t('hook.line1')}<br />
            {t('hook.line2')}
          </h2>
          <p className="font-sans text-lg md:text-xl text-calea-primary/80 whitespace-pre-line mb-8 tracking-wide">
            {t('hook.paragraph1')}
          </p>
          <p className="font-sans text-lg md:text-xl text-calea-primary/80 whitespace-pre-line font-medium tracking-wide">
            {t('hook.paragraph2')}
          </p>
        </div>
      </section>

      <StoryCarousel />

      {/* Features */}
      <section data-color="#E0F2F1" className="py-32 text-center w-full px-4 flex flex-col gap-6">
        {t('features', { returnObjects: true }).map((feature, i) => (
          <p key={i} className="font-serif text-xl md:text-3xl text-calea-primary/90">
            {feature}
          </p>
        ))}
      </section>

      <section id="bungalows">
        <BungalowGrid />
      </section>

      {/* Activities Roulette replaces the old slider */}
      {/* <ActivitiesRoulette /> */}

      <Footer />
    </main>
  );
}
