import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroVideo from '../assets/hero.mp4';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ content }) {
  const containerRef = useRef(null);
  const archeRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Scale the arche to full screen on mount (preloader style)
      const tl = gsap.timeline({
        delay: 0.5, // Small delay so the user sees the initial arche state
      });

      tl.to(archeRef.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
        duration: 2,
        ease: "power3.inOut"
      }, 0);

      // Fade IN the floating text as the video scales up
      tl.fromTo(textRef.current, 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out"
        }, "-=1"); // Starts 1 second before the arche animation finishes

      // Once animation is done, we can optionally allow scrolling or unpin things if needed.
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section data-color="#FDFCF8" ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Arche Mask */}
      <div 
        ref={archeRef}
        className="relative z-10 overflow-hidden flex items-center justify-center transform-gpu"
        style={{
          width: "30vw",
          height: "70vh",
          borderRadius: "50rem 50rem 0 0",
          minWidth: "300px",
        }}
      >
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          muted 
          autoPlay 
          loop 
          playsInline
          src={heroVideo}
        ></video>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Floating Text */}
      <div ref={textRef} className="absolute z-20 flex flex-col items-center text-center text-white pointer-events-none px-4 opacity-0">
        <p className="font-sans text-sm md:text-base tracking-widest uppercase mb-4 opacity-90">
          {content.hero.line1}
        </p>
        <p className="font-sans text-sm md:text-base tracking-widest uppercase mb-8 opacity-90">
          {content.hero.line2}
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mt-4">
          {content.hero.brand}
        </h1>
      </div>
    </section>
  );
}
