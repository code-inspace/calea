import React, { useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { bungalows } from '../data/bungalows';
import useTextRoll from '../hooks/useTextRoll';

gsap.registerPlugin(ScrollTrigger);

function BungalowCard({ bungalow, index }) {
  const { t } = useTranslation();
  const btnRef = useTextRoll();
  const isEven = index % 2 === 0;

  // Remove outer-edge border radius (the side touching the page border)
  const imgRadius = isEven
    ? 'rounded-[2rem] md:rounded-l-none md:rounded-r-[3rem]'
    : 'rounded-[2rem] md:rounded-r-none md:rounded-l-[3rem]';

  return (
    <div className={`bungalow-card flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

      {/* Image — pas de lien, juste visuel */}
      <div className={`w-full md:w-1/2 overflow-hidden ${imgRadius} aspect-[4/5] md:aspect-auto md:h-[80vh] relative`}>
        <img
          src={bungalow.gallery[0]}
          alt={bungalow.name}
          className="bungalow-img w-full h-full object-cover absolute inset-0"
        />
      </div>

      {/* Text Box */}
      <div className="bungalow-text w-full md:w-1/2 flex flex-col justify-center px-8 py-16 md:px-24">
        <span className="font-sans text-paradou-green/50 text-sm tracking-widest mb-4">
          {bungalow.id}
        </span>
        <h3 className="font-serif text-3xl md:text-5xl text-paradou-green mb-6">
          {bungalow.name}
        </h3>
        <p className="font-sans text-lg md:text-xl text-paradou-green/80 leading-relaxed mb-8">
          {bungalow.atmosphere}
        </p>
        <div className="flex items-center justify-between border-t border-paradou-green/20 pt-6 mb-10">
          <span className="text-paradou-green font-sans uppercase tracking-widest text-sm font-semibold">{bungalow.price}</span>
          <span className="text-paradou-green/50 font-sans tracking-widest text-xs uppercase">{bungalow.capacity}</span>
        </div>

        <Link
          ref={btnRef}
          to="/bungalows"
          state={{ index }}
          className="self-start px-10 py-4 bg-paradou-green text-paradou-cream font-inter text-xs tracking-widest uppercase overflow-hidden relative"
        >
          <span className="roll-top flex items-center justify-center">{t('bungalowsIntro.cta', 'Consulter')}</span>
          <span className="roll-bottom absolute top-full left-0 right-0 h-full flex items-center justify-center">{t('bungalowsIntro.cta', 'Consulter')}</span>
        </Link>
      </div>
    </div>
  );
}

export default function BungalowGrid() {
  const { t } = useTranslation();
  const intro = t('bungalowsIntro', { returnObjects: true });
  const bungalowsText = t('bungalows', { returnObjects: true });
  const mergedBungalows = bungalows.map((b, i) => ({ ...b, ...bungalowsText[i] }));
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.bungalow-card');

      cards.forEach((card) => {
        const img = card.querySelector('.bungalow-img');
        const text = card.querySelector('.bungalow-text');

        gsap.fromTo(img,
          { scale: 1.2 },
          {
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'center center',
              scrub: 1,
            }
          }
        );

        gsap.fromTo(text,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              end: 'center center',
              scrub: 1,
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section data-color="#FDFCF8" ref={containerRef} className="py-24">
      <div className="w-full text-center mb-20 px-4">
        <h2 className="font-serif text-4xl md:text-6xl text-paradou-green mb-6">{intro.title}</h2>
        <p className="font-sans text-lg text-paradou-green/70 uppercase tracking-widest">{intro.subtitle}</p>
      </div>

      <div className="flex flex-col w-full">
        {mergedBungalows.map((bungalow, index) => (
          <BungalowCard key={bungalow.id} bungalow={bungalow} index={index} />
        ))}
      </div>
    </section>
  );
}
