import React, { useRef, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const timelineImages = [
  "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?auto=format&fit=crop&w=1000&q=80"
];

export default function Story() {
  const { t } = useTranslation();
  
  const mainRef = useRef(null);
  const narrativeRef = useRef(null);
  const valuesRef = useRef(null);
  const galleryWrapperRef = useRef(null);
  const galleryRef = useRef(null);

  const mockStory = t('storyPage', { returnObjects: true });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Hero Parallax
      gsap.to('.hero-image', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // 2. Timeline Verticale
      // Animer la hauteur de la ligne de progression centrale
      gsap.fromTo('.timeline-progress', 
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: narrativeRef.current,
            start: 'top center',
            end: 'bottom 80%',
            scrub: true
          }
        }
      );

      // Animer chaque étape de la timeline
      const steps = gsap.utils.toArray('.timeline-step');
      steps.forEach((step) => {
        // Apparition text
        const text = step.querySelector('.timeline-text');
        if (text) {
          gsap.fromTo(text, 
            { opacity: 0, y: 50 },
            {
              opacity: 1, 
              y: 0, 
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 60%',
              }
            }
          );
        }

        // Apparition image
        const img = step.querySelector('.timeline-img');
        if (img) {
          gsap.fromTo(img, 
            { opacity: 0, y: 70 },
            {
              opacity: 1, 
              y: 0, 
              duration: 1.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 70%',
              }
            }
          );
        }

        // Apparition du point sur la ligne centrale
        const dot = step.querySelector('.timeline-dot');
        if (dot) {
          gsap.fromTo(dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: step,
                start: 'top center',
                end: 'center center',
                scrub: true
              }
            }
          );
        }
      });

      // 3. Les Valeurs
      gsap.from('.value-card', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: valuesRef.current,
          start: 'top 75%',
        }
      });

      // 4. Galerie Histoire
      const getScrollAmount = () => {
        let galleryWidth = galleryRef.current.scrollWidth;
        return -(galleryWidth - window.innerWidth);
      };

      const tween = gsap.to(galleryRef.current, {
        x: getScrollAmount,
        ease: 'none'
      });

      ScrollTrigger.create({
        trigger: galleryWrapperRef.current,
        start: 'top top',
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1.5,
        invalidateOnRefresh: true
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="relative w-full bg-[#FDFCF8] text-paradou-green overflow-x-hidden">
      <Navbar />

      {/* SECTION 01 — HERO HISTOIRE */}
      <section className="hero-section relative w-full h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-[#1A2F23]">
          <img 
            src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=2000" 
            alt="Jardin atmo" 
            className="hero-image w-full h-[120vh] object-cover -top-[10%] relative opacity-60" 
          />
        </div>
        <h1 className="relative z-10 font-serif text-5xl md:text-8xl lg:text-9xl text-[#FDFCF8] tracking-tight text-center px-4">
          {mockStory.heroTitle}
        </h1>
      </section>

      {/* SECTION 02 — LE RÉCIT (TIMELINE) */}
      <section ref={narrativeRef} className="relative w-full bg-[#1A2F23] text-[#FDFCF8] py-32 overflow-hidden">
        
        {/* Lignes de repère */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 z-10 md:-translate-x-1/2" />
        <div className="timeline-progress absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-white z-20 origin-top md:-translate-x-1/2" />

        <div className="w-full max-w-7xl mx-auto flex flex-col pt-24 pb-48">
          {mockStory.narrative.paragraphs.map((p, i) => {
            // Le dernier paragraphe est affiché au centre sans image pour conclure
            const isLast = i === mockStory.narrative.paragraphs.length - 1;
            const imgSrc = timelineImages[i];
            const isEven = i % 2 === 0;

            if (isLast) {
              return (
                <div key={i} className="timeline-step relative w-full pt-48 pb-20 flex justify-center text-center z-30">
                  <div className="absolute left-6 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full z-30 timeline-dot" />
                  <p className="timeline-text font-serif text-4xl md:text-6xl lg:text-7xl leading-tight text-white max-w-4xl px-6 md:px-0 bg-[#1A2F23] py-8">
                    {p}
                  </p>
                </div>
              );
            }

            return (
              <div key={i} className={`timeline-step relative w-full min-h-[90vh] py-24 flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center z-30 px-6 md:px-12`}>
                
                {/* Point d'étape */}
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full z-30 timeline-dot box-content border-4 border-[#1A2F23]" />
                
                {/* Mobile Dot (aligné à gauche) */}
                <div className="md:hidden absolute left-6 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full z-30 timeline-dot box-content border-4 border-[#1A2F23]" />

                {/* Bloc Texte */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-24 text-left md:text-right' : 'md:pl-24 text-left'} flex flex-col justify-center`}>
                  <p className="timeline-text font-sans text-2xl md:text-3xl lg:text-4xl leading-relaxed text-white/90">
                    {p}
                  </p>
                </div>

                {/* Bloc Image */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 mt-16 md:mt-0 ${isEven ? 'md:pl-24' : 'md:pr-24 flex justify-end'} timeline-img`}>
                  <div className="relative w-full aspect-[4/5] max-w-sm md:max-w-md overflow-hidden">
                    <img 
                      src={imgSrc} 
                      alt={`Histoire étape ${i+1}`} 
                      className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                    />
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 03 — LES VALEURS */}
      <section ref={valuesRef} className="w-full text-[#1A2F23] py-40 px-6 md:px-12 flex flex-col items-center">
        <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between gap-24 md:gap-8">
          {mockStory.values.map((v, i) => (
            <div key={i} className="value-card flex-1 flex flex-col items-start md:items-center text-left md:text-center">
              <h3 className="font-serif text-5xl md:text-6xl mb-8">
                {v.title}
              </h3>
              <div className="flex flex-col gap-2 opacity-80">
                {v.lines.map((line, j) => (
                  <p key={j} className="font-sans text-lg lg:text-xl leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 04 — GALERIE HISTOIRE */}
      <section ref={galleryWrapperRef} className="relative w-full h-screen overflow-hidden">
        <div 
          ref={galleryRef} 
          className="absolute top-0 left-0 h-full flex items-center gap-12 md:gap-24 px-[10vw] pt-20"
          style={{ width: 'max-content' }}
        >
          {mockStory.gallery.map((img, i) => (
            <div key={i} className="w-[80vw] md:w-[60vw] lg:w-[45vw] h-[60vh] flex-shrink-0 overflow-hidden relative group">
              <div className="absolute inset-0 bg-[#FDFCF8]/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
              <img 
                src={img} 
                alt={`Archive ${i}`}
                className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-[0.3] transition-all duration-1000 scale-100 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
