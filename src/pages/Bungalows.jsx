import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Users, BedDouble } from 'lucide-react';

export default function Bungalows() {
  const { t } = useTranslation();
  
  const mockBungalows = t('bungalowsPage', { returnObjects: true });

  const [activeIndex, setActiveIndex] = useState(0);
  const activeBungalow = mockBungalows[activeIndex];
  const [mainImage, setMainImage] = useState(activeBungalow.gallery[0]);

  // When bungalow changes, reset main image to the first of the new gallery
  const handleBungalowChange = (index) => {
    setActiveIndex(index);
    setMainImage(mockBungalows[index].gallery[0]);
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
        <div className="flex gap-8 text-white/50 font-sans tracking-widest text-sm uppercase">
          {mockBungalows.map((b, idx) => (
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
              {activeBungalow.description}
            </p>
            <a 
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
                  className={`w-24 h-16 md:w-32 md:h-20 overflow-hidden cursor-pointer border-2 transition-all ${mainImage === img ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Info Cards */}
            <div className="flex flex-col gap-[2px]">
              <div className="bg-[#FDFCF8] text-paradou-green w-32 h-32 md:w-40 md:h-40 flex flex-col items-center justify-center p-4">
                <Users size={40} className="mb-4" strokeWidth={1.5} />
                <span className="font-sans text-xs uppercase tracking-widest text-center">
                  {activeBungalow.capacity}
                </span>
              </div>
              <div className="bg-[#FDFCF8] text-paradou-green w-32 h-32 md:w-40 md:h-40 flex flex-col items-center justify-center p-4">
                <BedDouble size={40} className="mb-4" strokeWidth={1.5} />
                <span className="font-sans text-xs uppercase tracking-widest text-center">
                  {activeBungalow.bedSize}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
