import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function ArrowBtn({ onClick, disabled, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
        disabled
          ? 'bg-calea-primary/20 text-white cursor-default'
          : 'bg-calea-primary text-white hover:bg-calea-primary/80'
      }`}
    >
      {children}
    </button>
  );
}

const CARD_GAP = 0.64; // fraction of innerWidth entre les centres de cartes (> card width 55vw)

export default function StoryCarousel({ images: imagesProp = null, grayscale = false }) {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const mobileContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const mobileCardRefs = useRef([]);
  const containerTopRef = useRef(0);
  const currentCardRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  );

  const paragraphs = t('story.paragraphs', { returnObjects: true });
  const translationImages = t('story.images', { returnObjects: true });
  const resolvedImages = imagesProp ?? translationImages;

  const storyCards = resolvedImages.map((img, i) => ({
    title: `Chapitre ${['I','II','III','IV','V'][i] ?? i + 1}`,
    image: img,
  }));

  const imgClass = `absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105${grayscale ? ' grayscale' : ''}`;

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const applyMobileCoverflow = (virtualPos) => {
    storyCards.forEach((_, i) => {
      const el = mobileCardRefs.current[i];
      if (!el) return;
      const absOffset = Math.abs(i - virtualPos);
      gsap.set(el, {
        scale: Math.max(1 - absOffset * 0.12, 0.76),
        opacity: Math.max(1 - absOffset * 0.45, 0.15),
      });
    });
  };

  const applyCoverflow = (virtualPos) => {
    const gap = window.innerWidth * CARD_GAP;
    storyCards.forEach((_, i) => {
      const el = cardRefs.current[i];
      if (!el) return;
      const offset = i - virtualPos;
      const absOffset = Math.abs(offset);
      gsap.set(el, {
        x: offset * gap,
        scale: Math.max(1 - absOffset * 0.12, 0.76),
        opacity: Math.max(1 - absOffset * 0.45, 0.15),
        zIndex: Math.round(10 - absOffset * 2),
      });
    });
  };

  // Setup initial + ScrollTrigger desktop
  useLayoutEffect(() => {
    if (isMobile) return;

    // Capturer offsetTop AVANT que ScrollTrigger ne pin l'élément
    containerTopRef.current = containerRef.current?.offsetTop ?? 0;

    applyCoverflow(0);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${(storyCards.length - 1) * window.innerHeight}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const pos = self.progress * (storyCards.length - 1);
          setCurrentCard(Math.round(pos));
          applyCoverflow(pos);
        },
      });
    }, containerRef);

    // Wheel handler : 1 scroll = 1 carte
    const handleWheel = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect || Math.abs(rect.top) > 5) return;

      // Aux extrémités, laisser le scroll naturel
      if (e.deltaY > 0 && currentCardRef.current === storyCards.length - 1) return;
      if (e.deltaY < 0 && currentCardRef.current === 0) return;

      e.preventDefault();
      if (isTransitioningRef.current) return;

      const next = currentCardRef.current + (e.deltaY > 0 ? 1 : -1);
      isTransitioningRef.current = true;
      currentCardRef.current = next;
      setCurrentCard(next);

      window.scrollTo({ top: containerTopRef.current + next * window.innerHeight, behavior: 'smooth' });
      setTimeout(() => { isTransitioningRef.current = false; }, 700);
    };

    document.addEventListener('wheel', handleWheel, { passive: false, capture: true });

    return () => {
      ctx.revert();
      document.removeEventListener('wheel', handleWheel, { capture: true });
    };
  }, [isMobile]);

  // Suivi slide courant + coverflow sur mobile
  useEffect(() => {
    if (!isMobile) return;
    const el = mobileContainerRef.current;
    if (!el) return;
    applyMobileCoverflow(0);
    const onScroll = () => {
      const virtualPos = el.scrollLeft / el.clientWidth;
      setCurrentCard(Math.round(virtualPos));
      applyMobileCoverflow(virtualPos);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  const goToCard = (index) => {
    if (isMobile) {
      mobileContainerRef.current?.scrollTo({ left: index * window.innerWidth, behavior: 'smooth' });
    } else {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;
      currentCardRef.current = index;
      setCurrentCard(index);
      window.scrollTo({ top: containerTopRef.current + index * window.innerHeight, behavior: 'smooth' });
      setTimeout(() => { isTransitioningRef.current = false; }, 700);
    }
  };

  // ── Mobile ───────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section data-color="#FDFCF8" className="relative w-full h-screen flex items-center">
        <div
          ref={mobileContainerRef}
          className="w-full overflow-x-auto overflow-y-hidden flex snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {storyCards.map((card, i) => (
            <div key={i} className="relative flex-none w-screen h-[70vh] snap-center px-6">
              <div
                ref={el => mobileCardRefs.current[i] = el}
                className="relative w-full h-full rounded-[2rem] overflow-hidden"
                style={{ willChange: 'transform, opacity' }}
              >
                <img src={card.image} alt={card.title} className={`absolute inset-0 w-full h-full object-cover${grayscale ? ' grayscale' : ''}`} />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute left-2 top-1/2 -translate-y-1/2 z-20">
          <ArrowBtn onClick={() => goToCard(currentCard - 1)} disabled={currentCard === 0}>
            <ArrowLeft size={16} strokeWidth={1.5} />
          </ArrowBtn>
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20">
          <ArrowBtn onClick={() => goToCard(currentCard + 1)} disabled={currentCard === storyCards.length - 1}>
            <ArrowRight size={16} strokeWidth={1.5} />
          </ArrowBtn>
        </div>
      </section>
    );
  }

  // ── Desktop coverflow + scroll vertical ──────────────────────────────────
  return (
    <section
      data-color="#FDFCF8"
      ref={containerRef}
      className="h-screen w-full overflow-hidden flex items-center justify-center relative bg-transparent"
    >
      <div className="relative w-full h-[70vh] flex items-center justify-center">
        {storyCards.map((card, i) => (
          <div
            key={i}
            ref={el => cardRefs.current[i] = el}
            className="absolute w-[55vw] h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden group"
            style={{ willChange: 'transform, opacity' }}
          >
            <img
              src={card.image}
              alt={card.title}
              className={imgClass}
            />
          </div>
        ))}
      </div>

      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20">
        <ArrowBtn onClick={() => goToCard(currentCard - 1)} disabled={currentCard === 0}>
          <ArrowLeft size={16} strokeWidth={1.5} />
        </ArrowBtn>
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20">
        <ArrowBtn onClick={() => goToCard(currentCard + 1)} disabled={currentCard === storyCards.length - 1}>
          <ArrowRight size={16} strokeWidth={1.5} />
        </ArrowBtn>
      </div>
    </section>
  );
}
