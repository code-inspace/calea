import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Users, BedDouble, Droplets, Waves } from 'lucide-react';
import { bungalows } from '../data/bungalows';
import useButtonAnim from '../hooks/useButtonAnim';

export default function Bungalows() {
  const { t } = useTranslation();
  const ctaRef = useButtonAnim('cta');
  const [activeIndex, setActiveIndex] = useState(0);
  const activeBungalow = bungalows[activeIndex];
  const [mainImage, setMainImage] = useState(activeBungalow.gallery[0]);

  // When bungalow changes, reset main image to the first of the new gallery
  const handleBungalowChange = (index) => {
    setActiveIndex(index);
    setMainImage(bungalows[index].gallery[0]);
  };

  return (
    <main className="relative w-full min-h-screen bg-paradou-green overflow-hidden">
      <Helmet>
        <title>Bungalows · Caléa Resort</title>
        <meta name="description" content="Découvrez les bungalows privés de Caléa : General Room, Suite Royale et Villa Privée face à la Mediterranée. Chaque hébergement conjugue luxe, nature et intimité." />
      </Helmet>
      <Navbar />

      {/* Hero Full Screen Image */}
      <div className="absolute inset-0 w-full h-[100vh] z-0">
        <img 
          src={mainImage} 
          alt={activeBungalow.name} 
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-paradou-green/90 via-transparent to-paradou-green/70 mix-blend-multiply" />
      </div>

      {/* Top Sidebar / Selector -> Or a floating header like mockup */}
      <div className="relative z-10 w-full h-[100vh] pt-32 px-6 md:px-16 flex flex-col justify-between pb-8">
        
        {/* Navigation for Bungalows */}
        <div className="flex gap-8 text-white/50 font-sans tracking-widest text-sm uppercase flex-wrap">
          {bungalows.map((b, idx) => (
            <button 
              key={b.id}
              onClick={() => handleBungalowChange(idx)}
              className={`transition-colors duration-300 ${activeIndex === idx ? 'text-white border-b border-white pb-1' : 'hover:text-white/80'}`}
            >
              {b.name}
            </button>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
          
          {/* Left Side: Title & Description & CTA */}
          <div className="text-white max-w-2xl">
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mt-4 mb-6 leading-none">
              {activeBungalow.name}
            </h1>
            <p className="font-sans text-lg md:text-xl text-white/80 leading-relaxed mb-8">
              {activeBungalow.atmosphere}
            </p>
            <a
              ref={ctaRef}
              href="/#contact"
              className="inline-block px-8 py-4 bg-white text-paradou-green font-inter tracking-[0.2em] text-xs uppercase hover:bg-paradou-mint transition-colors duration-300"
            >
              {t('footer.ctaPrimary')}
            </a>
          </div>

          {/* Right Side: Modules + Miniatures (Like Mokcup) */}
          <div className="flex flex-col items-end gap-6">
            
            {/* Gallery Thumbnails */}
            <div className="flex gap-4 mb-8">
              {activeBungalow.gallery.map((img, i) => (
                <div 
                  key={i}
                  onMouseEnter={() => setMainImage(img)}
                  className={`w-24 h-16 md:w-32 md:h-20 overflow-hidden rounded-[1rem] md:rounded-[1.25rem] cursor-pointer border-2 transition-all ${mainImage === img ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Info Cards */}
            <div className="flex flex-row flex-wrap md:flex-nowrap gap-[2px] justify-end">
              <div className="bg-[#FDFCF8] text-paradou-green w-28 h-28 md:w-32 md:h-32 flex flex-col items-center justify-center p-3">
                <Users size={28} className="mb-2 opacity-80" strokeWidth={1.5} />
                <span className="font-sans text-[10px] uppercase tracking-widest text-center">
                  {activeBungalow.capacity}
                </span>
              </div>
              <div className="bg-[#FDFCF8] text-paradou-green w-28 h-28 md:w-32 md:h-32 flex flex-col items-center justify-center p-3">
                <BedDouble size={28} className="mb-2 opacity-80" strokeWidth={1.5} />
                <span className="font-sans text-[10px] uppercase tracking-widest text-center">
                  {activeBungalow.bedrooms}
                </span>
              </div>
              {activeBungalow.pool && (
                <div className="bg-[#FDFCF8] text-paradou-green w-28 h-28 md:w-32 md:h-32 flex flex-col items-center justify-center p-3">
                  <Waves size={28} className="mb-2 opacity-80" strokeWidth={1.5} />
                  <span className="font-sans text-[10px] uppercase tracking-widest text-center">
                    Piscine
                  </span>
                </div>
              )}
              {activeBungalow.jacuzzi && (
                <div className="bg-[#FDFCF8] text-paradou-green w-28 h-28 md:w-32 md:h-32 flex flex-col items-center justify-center p-3">
                  <Droplets size={28} className="mb-2 opacity-80" strokeWidth={1.5} />
                  <span className="font-sans text-[10px] uppercase tracking-widest text-center">
                    Jacuzzi
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
