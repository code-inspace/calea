import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Users, BedDouble, Droplets, Waves, ChevronRight, ChevronLeft } from 'lucide-react';
import { bungalows } from '../data/bungalows';
import useTextRoll from '../hooks/useTextRoll';
import gsap from 'gsap';

// Tab avec underline progressif GSAP (même logique que NavItem)
function BungalowTab({ label, isActive, onClick }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const line = el.querySelector('.tab-line');
    if (!line) return;

    gsap.set(line, { scaleX: isActive ? 1 : 0, transformOrigin: 'left center' });

    const onEnter = () => gsap.to(line, { scaleX: 1, duration: 0.4, ease: 'power2.out', overwrite: true });
    const onLeave = () => {
      if (isActive) return;
      gsap.to(line, { scaleX: 0, duration: 0.32, ease: 'power2.in', overwrite: true });
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf(line);
    };
  }, [isActive]);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`whitespace-nowrap shrink-0 flex flex-col transition-colors duration-300 ${
        isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
      }`}
    >
      {label}
      <span className="tab-line block h-px w-full bg-white mt-[3px]" />
    </button>
  );
}

export default function Bungalows() {
  const { t } = useTranslation();
  const location = useLocation();
  const ctaRef = useTextRoll();
  const bungalowsText = t('bungalows', { returnObjects: true });
  const mergedBungalows = bungalows.map((b, i) => ({ ...b, ...bungalowsText[i] }));
  const initialIndex = location.state?.index ?? 0;
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const activeBungalow = mergedBungalows[activeIndex];
  const [mainImage, setMainImage] = useState(activeBungalow.gallery[0]);
  const tabsRef = useRef(null);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  // Check if tabs container is scrollable
  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    const check = () => {
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
      setCanScrollLeft(el.scrollLeft > 2);
    };
    check();
    el.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      el.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  // When bungalow changes, reset main image to the first of the new gallery
  const handleBungalowChange = (index) => {
    setActiveIndex(index);
    setMainImage(mergedBungalows[index].gallery[0]);
  };

  return (
    <main className="relative w-full min-h-screen bg-calea-primary overflow-x-hidden">
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
        {/* Bottom gradient — mobile only, strong for readability */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-t from-calea-primary via-calea-primary/50 to-transparent" />
        {/* Bottom gradient — desktop, lighter */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-calea-primary/90 via-transparent to-transparent" />
        {/* Top gradient — navbar contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-calea-primary/60 via-transparent to-transparent" />
      </div>

      {/* Top Sidebar / Selector -> Or a floating header like mockup */}
      <div className="relative z-10 w-full h-[100vh] pt-24 md:pt-32 px-6 md:px-16 flex flex-col justify-between pb-6 md:pb-8 overflow-hidden">

        {/* Navigation for Bungalows */}
        <div className="flex items-center gap-1 w-full">
          {/* Left arrow — mobile only */}
          <div className={`md:hidden flex-shrink-0 transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`}>
            <ChevronLeft size={16} strokeWidth={1.5} className="text-white/70" />
          </div>

          {/* Scrollable tabs */}
          <div
            ref={tabsRef}
            style={{
              maskImage: canScrollLeft && canScrollRight
                ? 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)'
                : canScrollLeft
                  ? 'linear-gradient(to right, transparent 0%, black 12%)'
                  : canScrollRight
                    ? 'linear-gradient(to left, transparent 0%, black 12%)'
                    : 'none',
              WebkitMaskImage: canScrollLeft && canScrollRight
                ? 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)'
                : canScrollLeft
                  ? 'linear-gradient(to right, transparent 0%, black 12%)'
                  : canScrollRight
                    ? 'linear-gradient(to left, transparent 0%, black 12%)'
                    : 'none',
            }}
            className="flex gap-8 text-white/50 font-sans tracking-widest text-sm uppercase overflow-x-auto scrollbar-hide pb-1 flex-1 min-w-0"
          >
            {mergedBungalows.map((b, idx) => (
              <BungalowTab
                key={b.id}
                label={b.name}
                isActive={activeIndex === idx}
                onClick={() => handleBungalowChange(idx)}
              />
            ))}
          </div>

          {/* Right arrow — mobile only */}
          <div className={`md:hidden flex-shrink-0 transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`}>
            <ChevronRight size={16} strokeWidth={1.5} className="text-white/70 animate-scroll-hint" />
          </div>
        </div>

        {/* Content Overlay */}
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end gap-3 md:gap-12">

          {/* Left Side: Title & Description & CTA */}
          <div className="text-white max-w-2xl">
            <h1 className="font-serif text-4xl md:text-8xl lg:text-9xl mt-0 md:mt-4 mb-3 md:mb-6 leading-none">
              {activeBungalow.name}
            </h1>
            <p className="font-sans text-lg md:text-xl text-white/80 leading-relaxed mb-8">
              {activeBungalow.atmosphere}
            </p>
            <a
              ref={ctaRef}
              href="/#contact"
              className="inline-block px-8 py-4 bg-white text-calea-primary font-inter tracking-[0.2em] text-xs uppercase hover:bg-calea-mint transition-colors duration-300 overflow-hidden relative"
            >
              <span className="roll-top flex items-center justify-center">{t('footer.ctaPrimary')}</span>
              <span className="roll-bottom absolute top-full left-0 right-0 h-full flex items-center justify-center">{t('footer.ctaPrimary')}</span>
            </a>
          </div>

          {/* Right Side: Modules + Miniatures (Like Mokcup) */}
          <div className="flex flex-col items-start md:items-end gap-4 md:gap-6">

            {/* Gallery Thumbnails — desktop only */}
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
            <div className="flex flex-row flex-wrap md:flex-nowrap gap-[2px] justify-start md:justify-end">
              <div className="bg-[#FDFCF8] text-calea-primary w-20 h-20 md:w-32 md:h-32 flex flex-col items-center justify-center p-2 md:p-3">
                <Users size={22} className="mb-1 md:mb-2 opacity-80" strokeWidth={1.5} />
                <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-widest text-center">
                  {activeBungalow.capacity}
                </span>
              </div>
              <div className="bg-[#FDFCF8] text-calea-primary w-20 h-20 md:w-32 md:h-32 flex flex-col items-center justify-center p-2 md:p-3">
                <BedDouble size={22} className="mb-1 md:mb-2 opacity-80" strokeWidth={1.5} />
                <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-widest text-center">
                  {activeBungalow.bedrooms}
                </span>
              </div>
              {activeBungalow.pool && (
                <div className="bg-[#FDFCF8] text-calea-primary w-20 h-20 md:w-32 md:h-32 flex flex-col items-center justify-center p-2 md:p-3">
                  <Waves size={22} className="mb-1 md:mb-2 opacity-80" strokeWidth={1.5} />
                  <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-widest text-center">
                    {t('bungalowFeatures.pool')}
                  </span>
                </div>
              )}
              {activeBungalow.jacuzzi && (
                <div className="bg-[#FDFCF8] text-calea-primary w-20 h-20 md:w-32 md:h-32 flex flex-col items-center justify-center p-2 md:p-3">
                  <Droplets size={22} className="mb-1 md:mb-2 opacity-80" strokeWidth={1.5} />
                  <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-widest text-center">
                    {t('bungalowFeatures.jacuzzi')}
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
