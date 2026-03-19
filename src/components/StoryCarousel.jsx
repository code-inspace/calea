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
            
            {/* Decorative arrow buttons like in the mockup */}
          </div>
        ))}
      </div>
    </section>
  );
}
