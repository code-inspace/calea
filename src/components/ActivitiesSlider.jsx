import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Sailboat, ChefHat, Sun, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import useButtonAnim from '../hooks/useButtonAnim';

const iconMap = {
  Sparkles,
  Sailboat,
  ChefHat,
  Sun
};

export default function ActivitiesSlider() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const ctaRef = useButtonAnim('cta');
  const prevRef = useButtonAnim('icon');
  const nextRef = useButtonAnim('icon');
  
  const sliderData = t('activitiesSlider', { returnObjects: true });
  const items = sliderData.items || [];
  
  useEffect(() => {
    if (contentRef.current && imageRef.current) {
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
      gsap.fromTo(imageRef.current, 
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }
      );
    }
  }, [currentIndex]);

  if (!items.length) return null;

  const currentItem = items[currentIndex];
  // Default to Sparkles if string icon name doesn't match
  const IconComponent = iconMap[currentItem.icon] || Sparkles;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="experiences" data-color="#FDFCF8" className="w-full py-24 md:py-32 bg-[#FDFCF8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left Content */}
        <div className="w-full md:w-5/12 flex flex-col">
          <div ref={contentRef} className="flex flex-col items-start">
            <IconComponent size={64} strokeWidth={1} className="text-[#D4C3B3] mb-8" />
            
            <h2 className="font-serif text-4xl lg:text-5xl text-[#1A2F23] mb-6 leading-tight">
              {currentItem.title}
            </h2>
            
            <p className="font-sans text-lg text-[#1A2F23]/70 leading-relaxed mb-10">
              {currentItem.description}
            </p>
            
            <button ref={ctaRef} className="flex items-center gap-4 px-8 py-3 border border-[#1A2F23]/20 rounded-full font-sans text-sm tracking-widest text-[#1A2F23] hover:bg-[#1A2F23] hover:text-[#FDFCF8] transition-colors duration-300">
              {sliderData.cta}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Right Image & Controls */}
        <div className="w-full md:w-7/12 relative flex flex-col items-center md:items-end">
          {/* Background decorative shape (beige) */}
          <div className="absolute top-[-10%] right-[-5%] w-full md:w-4/5 h-[120%] bg-[#F4F1EA] rounded-[40px] z-0 hidden md:block" />
          
          {/* Image Frame */}
          <div className="relative z-10 w-full h-[50vh] md:h-[60vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-xl">
            <img 
              ref={imageRef}
              src={currentItem.image} 
              alt={currentItem.imageOverlayTitle} 
              className="w-full h-full object-cover"
            />
            
            {/* Gradient Overlay for Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Overlay Text */}
            <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
              <h3 className="font-serif text-3xl text-white mb-2">
                {currentItem.imageOverlayTitle}
              </h3>
              <p className="font-sans text-white/80 text-sm md:text-base">
                {currentItem.imageOverlaySub}
              </p>
            </div>
          </div>

          {/* Controls Below Image */}
          <div className="flex gap-4 mt-8 relative z-10 w-full md:w-auto md:mr-auto md:ml-0 justify-start">
            <button
              ref={prevRef}
              onClick={handlePrev}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-[#1A2F23]/20 text-[#1A2F23] hover:bg-[#1A2F23] hover:text-[#FDFCF8] transition-colors duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              ref={nextRef}
              onClick={handleNext}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1A2F23] text-[#FDFCF8] hover:bg-black transition-colors duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
