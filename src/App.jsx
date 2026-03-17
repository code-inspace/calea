import React, { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { content } from './constants/content';
import Noise from './components/Noise';
import Hero from './components/Hero';
import StoryCarousel from './components/StoryCarousel';
import BungalowGrid from './components/BungalowGrid';
import AudioToggle from './components/AudioToggle';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [lang, setLang] = useState('FR');
  const mainRef = useRef(null);
  
  const currentContent = content[lang];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Background morphing logic
      const sections = gsap.utils.toArray('section');

      sections.forEach((section) => {
        const color = section.getAttribute('data-color') || '#FDFCF8';
        // We morph colors for each section crossing the middle of the screen
        ScrollTrigger.create({
          trigger: section,
          start: "top 75%", // Trigger earlier when section enters view
          end: "bottom 25%", 
          onEnter: () => gsap.to(mainRef.current, { backgroundColor: color, duration: 1, overwrite: "auto" }),
          onEnterBack: () => gsap.to(mainRef.current, { backgroundColor: color, duration: 1, overwrite: "auto" })
        });
      });
      
    }, mainRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <main ref={mainRef} className="relative w-full overflow-x-hidden min-h-screen bg-paradou-cream">
      <Noise />
      <AudioToggle />
      
      {/* Language Toggle */}
      <div className="fixed top-6 right-6 z-50 flex gap-4 text-paradou-green/70 mix-blend-difference">
        <button 
          onClick={() => setLang('FR')}
          className={`font-sans tracking-widest text-sm hover:text-white transition-colors duration-300 ${lang === 'FR' ? 'text-white font-semibold' : ''}`}
        >
          FR
        </button>
        <button 
          onClick={() => setLang('EN')}
          className={`font-sans tracking-widest text-sm hover:text-white transition-colors duration-300 ${lang === 'EN' ? 'text-white font-semibold' : ''}`}
        >
          EN
        </button>
      </div>

      <Hero content={currentContent} />
      
      {/* Hook Section */}
      <section data-color="#FDFCF8" className="min-h-[50vh] flex items-center justify-center text-center py-32">
        <div className="w-full px-4 md:px-12 flex flex-col items-center">
          <h2 className="font-serif text-3xl md:text-5xl mb-12 text-paradou-green leading-tight">
            {currentContent.hook.line1}<br/>
            {currentContent.hook.line2}
          </h2>
          <p className="font-sans text-lg md:text-xl text-paradou-green/80 whitespace-pre-line mb-8 tracking-wide">
            {currentContent.hook.paragraph1}
          </p>
          <p className="font-sans text-lg md:text-xl text-paradou-green/80 whitespace-pre-line font-medium tracking-wide">
            {currentContent.hook.paragraph2}
          </p>
        </div>
      </section>

      <StoryCarousel content={currentContent} />

      {/* Features - simple list */}
      <section data-color="#E0F2F1" className="py-32 text-center w-full px-4 flex flex-col gap-6">
        {currentContent.features.map((feature, i) => (
          <p key={i} className="font-serif text-xl md:text-3xl text-paradou-green/90">
            {feature}
          </p>
        ))}
      </section>

      <BungalowGrid bungalows={currentContent.bungalows} intro={currentContent.bungalowsIntro} />

      {/* Experiences section */}
      <section data-color="#E0F2F1" className="py-32 w-full flex flex-col items-center text-center">
        <h2 className="font-serif text-3xl md:text-5xl text-paradou-green mb-16 px-4">
          {currentContent.experiencesIntro}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-20 w-full px-4 md:px-12 text-left">
          {currentContent.experiences.map((exp, i) => (
            <div key={i} className="flex gap-4 items-start border-t border-paradou-green/20 pt-6">
              <span className="font-sans text-sm text-paradou-green/40 mt-1">0{i + 1}</span>
              <p className="font-serif text-xl md:text-2xl text-paradou-green/90">{exp}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer / CTA */}
      <section data-color="#1A2F23" className="py-40 flex flex-col items-center justify-center text-center w-full">
        <h2 className="font-serif text-5xl md:text-7xl text-white mb-6 px-4">
          {currentContent.footer.headline}
        </h2>
        <p className="font-sans text-lg text-white/70 uppercase tracking-widest mb-16 px-4">
          {currentContent.footer.subhead}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto px-4">
          <button className="flex-1 md:flex-none px-10 py-5 bg-white text-paradou-green font-sans tracking-widest text-sm uppercase hover:bg-paradou-mint transition-colors duration-300">
            {currentContent.footer.ctaPrimary}
          </button>
          <button className="flex-1 md:flex-none px-10 py-5 border border-white/30 text-white font-sans tracking-widest text-sm uppercase hover:bg-white hover:text-paradou-green transition-colors duration-300">
            {currentContent.footer.ctaSecondary}
          </button>
        </div>

        <div className="mt-32 w-full px-4 opacity-50 font-sans text-xs tracking-widest text-white leading-loose text-center">
          {currentContent.footer.seoLinks}
        </div>
      </section>

    </main>
  );
}

export default App;
