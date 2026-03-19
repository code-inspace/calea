import React, { useLayoutEffect, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroVideo from '../assets/hero.mp4';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const archeRef = useRef(null);
  const videoRef = useRef(null);
  const wordsRef = useRef([]);
  const subtitleRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      const p = videoRef.current.play();
      if (p !== undefined) p.catch(() => {});
    }
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // 1. Open the arche
      tl.to(archeRef.current, {
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
        duration: 2,
        ease: 'power3.inOut',
      }, 0);

      // 2. After arche is fully open, reveal words one by one, very slowly
      tl.fromTo(
        wordsRef.current,
        { opacity: 0, y: 30, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.35,  // slow, deliberate reveal per word
          ease: 'power2.out',
        },
        '+=0.2' // starts just after arche finishes
      );

      // 3. Pause of 1.5s
      tl.to({}, { duration: 1.5 });

      // 4. Subtitle appears all at once
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // "Vous méritez mieux" split into words for stagger
  const titleWords = t('hero.titleLine1').split(' ');

  return (
    <section
      data-color="#FDFCF8"
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Arche Mask */}
      <div
        ref={archeRef}
        className="relative z-10 overflow-hidden flex items-center justify-center transform-gpu"
        style={{
          width: '30vw',
          height: '70vh',
          borderRadius: '50rem 50rem 0 0',
          minWidth: '300px',
        }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Hero Text Overlay */}
      <div className="absolute z-20 flex flex-col items-center text-center text-white pointer-events-none px-6">
        {/* Line 1: word by word */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-tight drop-shadow-lg flex flex-wrap justify-center gap-x-[0.3em]">
          {titleWords.map((word, i) => (
            <span
              key={i}
              ref={(el) => (wordsRef.current[i] = el)}
              className="inline-block opacity-0"
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Line 2: appears as a block, italic, slightly smaller */}
        <p
          ref={subtitleRef}
          className="font-serif italic text-3xl md:text-5xl lg:text-6xl text-white/90 mt-4 drop-shadow-lg opacity-0"
        >
          {t('hero.titleLine2')}
        </p>
      </div>
    </section>
  );
}
