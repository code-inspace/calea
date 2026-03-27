import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

// Tab individuel avec underline GSAP (même logique que NavItem)
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

// Barre de navigation des bungalows — scrollable sur mobile avec arrows + mask
export default function BungalowNav({ bungalows, activeIndex, onChange }) {
  const tabsRef = useRef(null);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

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

  const maskImage = canScrollLeft && canScrollRight
    ? 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)'
    : canScrollLeft
      ? 'linear-gradient(to right, transparent 0%, black 12%)'
      : canScrollRight
        ? 'linear-gradient(to left, transparent 0%, black 12%)'
        : 'none';

  return (
    <div className="flex items-center gap-1 w-full">
      {/* Left arrow — mobile only */}
      <div className={`md:hidden flex-shrink-0 transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`}>
        <ChevronLeft size={16} strokeWidth={1.5} className="text-white/70" />
      </div>

      {/* Scrollable tabs */}
      <div
        ref={tabsRef}
        style={{ maskImage, WebkitMaskImage: maskImage }}
        className="flex gap-8 text-white/50 font-sans tracking-widest text-sm uppercase overflow-x-auto scrollbar-hide pb-1 flex-1 min-w-0"
      >
        {bungalows.map((b, idx) => (
          <BungalowTab
            key={b.id}
            label={b.name}
            isActive={activeIndex === idx}
            onClick={() => onChange(idx)}
          />
        ))}
      </div>

      {/* Right arrow — mobile only */}
      <div className={`md:hidden flex-shrink-0 transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`}>
        <ChevronRight size={16} strokeWidth={1.5} className="text-white/70 animate-scroll-hint" />
      </div>
    </div>
  );
}
