import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sparkles } from 'lucide-react';
import skyviewVideo from '../assets/skyview.mp4';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ScrollExperience() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    // Ultimate fix for mobile Safari/Chrome strict autoplay
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn("ScrollExperience video autoplay prevented:", error);
        });
      }
    }
  }, []);

  const slides = [
    {
      text: "When Motion and Stillness Collide in Layers",
      images: [
        { src: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80", class: "top-[10%] left-[5%] w-[30vh] md:w-[25vw] aspect-[3/4]" },
        { src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80", class: "bottom-[15%] right-[10%] w-[35vh] md:w-[30vw] aspect-square" }
      ]
    },
    {
      text: "What Follows Is Not Stillness but Reverberation",
      images: [
        { src: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80", class: "top-[20%] right-[15%] w-[40vh] md:w-[35vw] aspect-video" },
        { src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80", class: "bottom-[10%] left-[10%] w-[25vh] md:w-[20vw] aspect-[4/5]" }
      ]
    },
    {
      text: "The Future Begins Where This Moment Ends",
      images: [
        { src: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?auto=format&fit=crop&q=80", class: "top-[15%] left-[20%] w-[35vh] md:w-[25vw] aspect-[4/3]" },
        { src: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80", class: "bottom-[20%] right-[5%] w-[28vh] md:w-[22vw] aspect-[3/4]" }
      ]
    }
  ];

  useGSAP(() => {
    const slideElements = gsap.utils.toArray('.anim-slide');
    
    // Master Timeline for the pinned container
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${slideElements.length * 100}%`, // Gives plenty of scroll space for the animations
        pin: true,
        scrub: 1,
        preventOverlaps: true,
      }
    });

    slideElements.forEach((slide, index) => {
      const text = slide.querySelector('.anim-text');
      const images = slide.querySelectorAll('.anim-image');
      const icon = slide.querySelector('.anim-icon'); // The integrated Lucide icon

      // 1. Entrance (except for the first slide which starts on screen)
      if (index > 0) {
        tl.fromTo(text, 
          { opacity: 0, y: 100 }, 
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
        );
        if (icon) {
           tl.fromTo(icon, 
             { opacity: 0, scale: 0, rotation: -45 }, 
             { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' },
             "<" // Sync with text
           );
        }
      }

      // Parallax & floating entrance for images
      tl.fromTo(images,
        { opacity: 0, y: 150, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5, stagger: 0.2, ease: 'power3.out' },
        "-=0.5"
      );

      // 2. Lingering time (keeps the slide active while scrolling slightly)
      tl.to({}, { duration: 1 }); 

      // 3. Exit (only if it's not the very last slide)
      if (index < slideElements.length - 1) {
        tl.to(images, {
          opacity: 0,
          scale: 1.2, // Blows up towards the user
          y: -100,
          duration: 1.5,
          stagger: 0.1,
          ease: 'power2.in'
        });
        
        const exitTl = tl.to(text, {
          opacity: 0,
          y: -100,
          duration: 1,
          ease: 'power2.in'
        }, "<+=0.5"); // Starts fading text out right after images start to blow up
        
        if (icon) {
          tl.to(icon, { opacity: 0, scale: 0, duration: 0.5 }, "<");
        }
      }

    });
  }, { scope: containerRef }); // Automatically cleans up GSAP context!

  if (isMobile) {
    return (
      <section data-color="#1A2E23" className="w-full h-screen overflow-x-auto overflow-y-hidden flex snap-x snap-mandatory scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative flex-none w-screen h-screen snap-center overflow-hidden"
          >
            <img
              src={slide.images[0].src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center gap-6">
              {index === 1 && (
                <div className="text-calea-mint">
                  <Sparkles size={36} strokeWidth={1} />
                </div>
              )}
              <h2 className="font-serif text-4xl leading-tight text-white drop-shadow-lg">
                {slide.text}
              </h2>
            </div>
            {/* Dots indicator */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`block w-1.5 h-1.5 rounded-full transition-all ${i === index ? 'bg-white w-4' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section data-color="#1A2E23" ref={containerRef} className="h-screen w-full relative overflow-hidden bg-calea-primary text-calea-cream flex items-center justify-center">

      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={skyviewVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {slides.map((slide, index) => (
        <div key={index} className="anim-slide absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center">

          {slide.images.map((img, i) => (
            <div key={i} className={`anim-image absolute overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl ${img.class} pointer-events-auto`}>
              <img src={img.src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}

          <div className="anim-text absolute z-10 w-full max-w-4xl px-4 text-center flex flex-col items-center">
             {index === 1 && (
               <div className="anim-icon mb-6 text-calea-mint">
                 <Sparkles size={48} strokeWidth={1} />
               </div>
             )}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-tight text-white drop-shadow-lg">
              {slide.text}
            </h2>
          </div>

        </div>
      ))}

    </section>
  );
}
