import React, { useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

import { bungalows } from '../data/bungalows';

export default function BungalowGrid() {
  const { t } = useTranslation();
  const intro = t('bungalowsIntro', { returnObjects: true });
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.bungalow-card');

      cards.forEach((card) => {
        const img = card.querySelector('.bungalow-img');
        const text = card.querySelector('.bungalow-text');

        // Scale image and fade text on scroll
        gsap.fromTo(img, 
          { scale: 1.2 }, 
          {
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "center center",
              scrub: 1,
            }
          }
        );

        gsap.fromTo(text,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              end: "center center",
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
        {bungalows.map((bungalow, index) => (
          <div 
            key={bungalow.id} 
            className={`bungalow-card flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
          >
            {/* Image Box */}
            <Link 
              to="/bungalows" 
              className="w-full md:w-1/2 overflow-hidden aspect-[4/5] md:aspect-auto md:h-[80vh] relative block group cursor-pointer"
            >
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none flex items-center justify-center">
                <span className="text-white font-serif italic text-2xl rotate-[-5deg] scale-90 group-hover:scale-100 transition-transform duration-700">Découvrir</span>
              </div>
              <img 
                src={bungalow.gallery[0]} 
                alt={bungalow.name}
                className="bungalow-img w-full h-full object-cover absolute inset-0 scale-[1.02] group-hover:scale-105 transition-transform duration-1000"
              />
            </Link>
            
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
              <div className="flex items-center justify-between border-t border-paradou-green/20 pt-6">
                <span className="text-paradou-green font-sans uppercase tracking-widest text-sm font-semibold">{bungalow.price}</span>
                <span className="text-paradou-green/50 font-sans tracking-widest text-xs uppercase">{bungalow.capacity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
