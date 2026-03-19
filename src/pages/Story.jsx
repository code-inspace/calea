import React, { useRef, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Leaf, Hourglass } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const timelineImages = [
  "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=75",
  "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=75",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=800&q=75",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=75",
  "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?auto=format&fit=crop&w=800&q=75"
];

const valueIcons = [Sparkles, Leaf, Hourglass];

export default function Story() {
  const { t } = useTranslation();
  
  const mainRef = useRef(null);
  const narrativeRef = useRef(null);
  const timelineWrapperRef = useRef(null);
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
      gsap.fromTo('.timeline-progress', 
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineWrapperRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true
          }
        }
      );

      const steps = gsap.utils.toArray('.timeline-step');
      steps.forEach((step) => {
        const text = step.querySelector('.timeline-text');
        if (text) {
          gsap.fromTo(text, 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: step, start: 'top 60%' } }
          );
        }

        const img = step.querySelector('.timeline-img');
        if (img) {
          gsap.fromTo(img, 
            { opacity: 0, y: 70 },
            { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', scrollTrigger: { trigger: step, start: 'top 70%' } }
          );
        }

        const dot = step.querySelector('.timeline-dot');
        if (dot) {
          gsap.fromTo(dot,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, ease: 'back.out(1.7)', scrollTrigger: { trigger: step, start: 'top center', end: 'center center', scrub: true } }
          );
        }
      });

      // 3. Les Valeurs (Sophisticated individual block animations)
      const valueCards = gsap.utils.toArray('.value-card');
      valueCards.forEach((card) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        });

        const bgNum = card.querySelector('.value-bg-num');
        if(bgNum) {
          tl.fromTo(bgNum, 
            { opacity: 0, y: 30 }, 
            { opacity: 0.03, y: 0, duration: 1, ease: 'power3.out' }
          );
        }
        
        const icon = card.querySelector('.value-icon');
        if(icon) {
          tl.fromTo(icon, 
            { opacity: 0, scale: 0.5 }, 
            { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
            "-=0.8"
          );
        }

        const title = card.querySelector('.value-title');
        if(title) {
          tl.fromTo(title, 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
            "-=0.6"
          );
        }

        const line = card.querySelector('.value-line');
        if(line) {
          tl.fromTo(line, 
            { scaleX: 0 }, 
            { scaleX: 1, duration: 1, ease: 'power3.out' },
            "-=0.6"
          );
        }

        const descs = card.querySelectorAll('.value-desc p');
        if(descs.length > 0) {
          tl.fromTo(descs, 
            { opacity: 0, y: 15 }, 
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
            "-=0.8"
          );
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

      // 5. Global Background Colors (AFTER ALL PINS)
      const sections = gsap.utils.toArray('section');
      sections.forEach((section) => {
        const color = section.getAttribute('data-color') || '#FDFCF8';
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => gsap.to(mainRef.current, { backgroundColor: color, duration: 1, overwrite: "auto" }),
          onEnterBack: () => gsap.to(mainRef.current, { backgroundColor: color, duration: 1, overwrite: "auto" })
        });
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="relative w-full bg-[#FDFCF8] text-calea-primary overflow-x-hidden">
      <Helmet>
        <title>L'Histoire de Caléa · Un Rêve Provençal</title>
        <meta name="description" content="Découvrez l'histoire de Caléa : un jardin secret, une famille, un héritage vivant sur la Côte d'Azur. L'authenticité d'un domaine provençal réinventé avec âme." />
      </Helmet>
      <Navbar />

      {/* SECTION 01 · HERO HISTOIRE */}
      <section data-color="#00235B" className="hero-section relative w-full h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-calea-primary">
          <img 
            src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=75"
            alt="Jardin atmo" 
            className="hero-image w-full h-[120vh] object-cover -top-[10%] relative opacity-60" 
          />
        </div>
        <h1 className="relative z-10 font-serif text-5xl md:text-8xl lg:text-9xl text-[#FDFCF8] tracking-tight text-center px-4">
          {mockStory.heroTitle}
        </h1>
      </section>

      {/* SECTION 02 · LE RÉCIT (TIMELINE) */}
      <section data-color="#00235B" ref={narrativeRef} className="relative w-full text-[#FDFCF8] py-16 overflow-hidden transition-colors duration-1000">
        
        <div ref={timelineWrapperRef} className="relative w-full max-w-7xl mx-auto flex flex-col pt-32 pb-0">
          {/* Lignes de repère limitées à ce conteneur (exact pixels on mobile to avoid subpixel rendering translation bugs) */}
          <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-[2px] md:w-px bg-white/10 z-10 md:-translate-x-1/2" />
          <div className="timeline-progress absolute left-[23px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white z-20 origin-top md:-translate-x-1/2" />

          {mockStory.narrative.paragraphs.slice(0, -1).map((p, i) => {
            const imgSrc = timelineImages[i];
            const isEven = i % 2 === 0;

            return (
              <div key={i} className={`timeline-step relative w-full min-h-0 md:min-h-[90vh] py-16 md:py-0 md:pb-32 flex flex-col items-start ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} md:items-center z-30 px-6 md:px-12`}>
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full z-30 timeline-dot box-content border-4 border-calea-primary" />
                
                {/* 14px left edge + 10px half-width = 24px center */}
                <div className="md:hidden absolute left-[14px] top-[80px] -translate-y-1/2 w-3 h-3 bg-white rounded-full z-30 timeline-dot box-content border-4 border-calea-primary" />

                <div className={`w-full md:w-1/2 pl-[60px] md:pl-0 ${isEven ? 'md:pr-24 text-left md:text-right' : 'md:pl-24 text-left'} flex flex-col justify-center pt-2 md:pt-0`}>
                  <p className="timeline-text font-sans text-xl md:text-3xl lg:text-4xl leading-relaxed text-white/90">
                    {p}
                  </p>
                </div>

                <div className={`w-full md:w-1/2 pl-[60px] md:pl-0 mt-8 md:mt-0 ${isEven ? 'md:pl-24' : 'md:pr-24 md:flex md:justify-end'} timeline-img`}>
                  <div className="relative w-full aspect-[4/5] max-w-[260px] md:max-w-md overflow-hidden rounded-[2rem] md:rounded-[3rem]">
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

          {/* Point final de la ligne */}
          <div className="timeline-step relative w-full h-0 z-30">
            <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full timeline-dot box-content border-4 border-calea-primary" />
            <div className="md:hidden absolute left-[12px] top-0 -translate-y-1/2 w-4 h-4 bg-white rounded-full timeline-dot box-content border-4 border-calea-primary" />
          </div>
        </div>

        {/* Paragraphe de conclusion hors de l'axe central vertical */}
        <div className="timeline-step relative w-full max-w-4xl mx-auto pt-24 md:pt-32 pb-24 md:pb-32 flex justify-center text-center z-30 px-8 md:px-0">
          <p className="timeline-text font-serif text-3xl md:text-6xl lg:text-7xl leading-tight text-white mix-blend-difference">
            {mockStory.narrative.paragraphs[mockStory.narrative.paragraphs.length - 1]}
          </p>
        </div>

      </section>

      {/* SECTION 03 · LES VALEURS */}
      <section data-color="#FDFCF8" ref={valuesRef} className="relative w-full text-calea-primary py-48 px-6 md:px-12 flex flex-col items-center overflow-hidden transition-colors duration-1000">
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-12 relative z-10 pt-16">
          {mockStory.values.map((v, i) => {
            const Icon = valueIcons[i];
            return (
              <div key={i} className="value-card relative flex flex-col items-center text-center p-8">
                
                {/* Grand chiffre de fond */}
                <div className="value-bg-num absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 font-serif text-[12rem] leading-none text-calea-primary opacity-5 pointer-events-none select-none z-0">
                  0{i + 1}
                </div>

                <div className="value-icon mb-10 text-calea-primary/60 relative z-10">
                  <Icon size={48} strokeWidth={1} />
                </div>
                
                <h3 className="value-title font-serif text-4xl lg:text-5xl mb-6 relative z-10">
                  {v.title}
                </h3>
                
                {/* Ligne séparatrice */}
                <div className="value-line w-12 h-px bg-calea-primary/20 mb-8 relative z-10 origin-center" />

                <div className="value-desc flex flex-col gap-2 opacity-80 relative z-10">
                  {v.lines.map((line, j) => (
                    <p key={j} className="font-sans text-lg lg:text-xl leading-relaxed text-calea-primary/90">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 04 · GALERIE HISTOIRE */}
      <section data-color="#FDFCF8" ref={galleryWrapperRef} className="relative w-full h-screen overflow-hidden transition-colors duration-1000">
        <div 
          ref={galleryRef} 
          className="absolute top-0 left-0 h-full flex items-center gap-12 md:gap-24 px-[10vw] pt-20"
          style={{ width: 'max-content' }}
        >
          {mockStory.gallery.map((img, i) => (
            <div key={i} className="w-[80vw] md:w-[60vw] lg:w-[45vw] h-[60vh] flex-shrink-0 overflow-hidden rounded-[2rem] md:rounded-[3rem] relative group">
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
