import React, { useRef, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Sailboat, ChefHat, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useTextRoll from '../hooks/useTextRoll';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  Sparkles,
  Sailboat,
  ChefHat,
  Sun
};

export default function ActivitiesRoulette() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const ctaRef = useTextRoll();

  const sliderData = t('activitiesSlider', { returnObjects: true });
  const items = sliderData.items || [];

  useLayoutEffect(() => {
    if (!items.length) return;

    const ctx = gsap.context(() => {
      // Intro Text Animation
      gsap.fromTo('.roulette-intro',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.roulette-intro',
            start: 'top 80%',
          }
        }
      );

      // Carousel Items Stagger Animation
      gsap.fromTo(itemsRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 65%',
          }
        }
      );

      // Lines animate down
      gsap.fromTo('.roulette-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          }
        }
      );

      // CTA Button
      gsap.fromTo('.roulette-cta',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.roulette-cta',
            start: 'top 90%',
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, [items.length]);

  if (items.length !== 4) return null;

  return (
    <section ref={containerRef} className="w-full py-24 md:py-40 bg-white overflow-hidden relative z-0">

      {/* Background Inverted Arch Layer */}
      <div className="absolute top-0 left-0 w-full h-[65%] md:h-[75%] bg-[#FDFCF8] rounded-b-[100vw] md:rounded-b-[50%] -z-10" />

      {/* Intro Text */}
      <div className="roulette-intro max-w-3xl mx-auto text-center px-6 mb-20 md:mb-32 relative z-10">
        <p className="font-sans text-base md:text-lg text-[#1A2F23]/80 leading-relaxed font-medium">
          {sliderData.headline} — Nous prenons fierté à vous offrir des expériences mémorables,
          qui apportent une diversité de sensations à votre séjour. Permettez-nous de vous
          présenter nos activités sélectionnées pour vous.
        </p>
      </div>

      {/* Layout Container */}
      <div className="relative w-full h-auto md:h-[600px] px-6 md:px-10 lg:px-16">

        <div className="flex flex-col md:block w-full h-full gap-16 relative">

          {items.map((item, i) => {
            const IconComp = iconMap[item.icon] || Sparkles;

            // Positioning logic for desktop
            let desktopClasses = "";
            let imageAspect = "aspect-[4/5]";

            if (i === 0) {
              desktopClasses = "md:absolute md:left-[2%] md:top-[5%] md:w-[22%]";
            } else if (i === 1) {
              desktopClasses = "md:absolute md:left-[27%] md:top-[40%] md:w-[22%]";
            } else if (i === 2) {
              desktopClasses = "md:absolute md:right-[27%] md:top-[40%] md:w-[22%]";
            } else if (i === 3) {
              desktopClasses = "md:absolute md:right-[2%] md:top-[5%] md:w-[22%]";
            }

            return (
              <div
                key={i}
                ref={el => itemsRef.current[i] = el}
                className={`w-full flex flex-col items-center group relative z-10 opacity-0 ${desktopClasses}`}
              >

                {/* Vertical hanging line for outer cards (0 and 3) */}
                {(i === 0 || i === 3) && (
                  <div className="roulette-line hidden md:block absolute bottom-full left-1/2 w-px h-[300px] bg-[#1A2F23]/15 origin-top" />
                )}

                {/* The Image */}
                <div className={`relative w-full ${imageAspect} overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-sm group-hover:shadow-xl transition-all duration-700`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[30%] group-hover:grayscale-0"
                  />
                </div>

                {/* The Text Label */}
                <div className="mt-8 flex flex-col items-center text-center">
                  <h3 className="font-serif text-xl md:text-2xl text-[#1A2F23] mb-2">{item.title}</h3>
                  <p className="font-sans text-xs md:text-sm text-[#1A2F23]/60 px-4 md:px-0 max-w-[250px] mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#1A2F23] font-medium cursor-pointer hover:opacity-60 transition-opacity">
                    <span className="w-8 h-8 rounded-full border border-[#1A2F23]/20 flex items-center justify-center">
                      <IconComp size={14} />
                    </span>
                    Découvrir
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      </div>

      {/* Global CTA Button */}
      <div className="roulette-cta mt-24 md:mt-48 w-full flex justify-center relative z-20 px-6 opacity-0">
        <Link
          ref={ctaRef}
          to="/contact"
          className="bg-[#1A2F23] text-[#FDFCF8] px-10 md:px-14 py-4 md:py-5 rounded-full font-inter text-xs md:text-sm tracking-widest uppercase hover:bg-black transition-colors duration-500 shadow-xl shadow-[#1A2F23]/20 overflow-hidden relative"
        >
          <span className="roll-top flex items-center justify-center">VOIR NOS ACTIVITÉS</span>
          <span className="roll-bottom absolute inset-0 flex items-center justify-center">VOIR NOS ACTIVITÉS</span>
        </Link>
      </div>

    </section>
  );
}
