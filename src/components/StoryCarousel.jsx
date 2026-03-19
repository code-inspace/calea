import React, { useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function StoryCarousel() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  const paragraphs = t('story.paragraphs', { returnObjects: true });
  const images = t('story.images', { returnObjects: true });

  const storyCards = [
    { 
      title: "Chapitre I", 
      text: paragraphs[0] + "\n\n" + paragraphs[1],
      image: images[0]
    },
    { 
      title: "Chapitre II", 
      text: paragraphs[2],
      image: images[1]
    },
    { 
      title: "Chapitre III", 
      text: paragraphs[3] + "\n\n" + paragraphs[4],
      image: images[2]
    },
    { 
      title: "Chapitre IV", 
      text: paragraphs[5],
      image: images[3]
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current;
      const getScrollAmount = () => -(wrapper.scrollWidth - window.innerWidth);

      gsap.to(wrapper, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${wrapper.scrollWidth}`,
          invalidateOnRefresh: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Use the window object to scroll when arrows are clicked since it's driven by window scroll
  const handleScroll = (direction) => {
    // A simple approximate jump
    window.scrollBy({ top: direction * window.innerHeight * 0.8, behavior: 'smooth' });
  };

  return (
    <section data-color="#FDFCF8" ref={containerRef} className="h-screen w-full overflow-hidden flex flex-col justify-center relative bg-transparent">
      
      {/* Container for the cards */}
      <div 
        ref={wrapperRef} 
        className="flex items-center h-[70vh] px-[20vw] gap-8 md:gap-16 w-max"
      >
        {storyCards.map((card, i) => (
          <div 
            key={i} 
            className="story-card relative w-[75vw] md:w-[60vw] h-full flex-shrink-0 rounded-[2rem] md:rounded-[3rem] overflow-hidden group"
          >
            {/* Background Image */}
            <img 
              src={card.image} 
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            
            {/* Decorative arrow buttons like in the mockup */}
            {i > 0 && (
              <button 
                onClick={() => handleScroll(-1)}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#4A3B32]/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:bg-[#3A2D26]"
              >
                <ArrowLeft size={24} />
              </button>
            )}
            
            {i < storyCards.length - 1 && (
              <button 
                onClick={() => handleScroll(1)}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#4A3B32]/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:bg-[#3A2D26]"
              >
                <ArrowRight size={24} />
              </button>
            )}

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col justify-end">
              <span className="font-sans text-xs uppercase tracking-widest text-white/70 mb-4">
                {card.title}
              </span>
              <p className="font-serif text-xl md:text-3xl leading-relaxed text-white max-w-3xl whitespace-pre-line">
                {card.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
