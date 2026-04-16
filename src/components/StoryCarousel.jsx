import { useLayoutEffect, useRef, useState, useEffect } from 'react';
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

export default function StoryCarousel() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const mobileContainerRef = useRef(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  );

  const paragraphs = t('story.paragraphs', { returnObjects: true });
  const images = t('story.images', { returnObjects: true });

  const storyCards = [
    { title: "Chapitre I",   text: paragraphs[0] + "\n\n" + paragraphs[1], image: images[0] },
    { title: "Chapitre II",  text: paragraphs[2],                           image: images[1] },
    { title: "Chapitre III", text: paragraphs[3] + "\n\n" + paragraphs[4], image: images[2] },
    { title: "Chapitre IV",  text: paragraphs[5],                           image: images[3] },
  ];

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // GSAP horizontal scroll — desktop only
  useLayoutEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current;
      const getScrollAmount = () => -(wrapper.scrollWidth - window.innerWidth);

      gsap.to(wrapper, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${wrapper.scrollWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setCurrentCard(Math.round(self.progress * (storyCards.length - 1)));
          },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Suivi slide courant sur mobile via scroll
  useEffect(() => {
    if (!isMobile) return;
    const el = mobileContainerRef.current;
    if (!el) return;
    const onScroll = () => setCurrentCard(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  const goToCard = (index) => {
    if (isMobile) {
      mobileContainerRef.current?.scrollTo({ left: index * window.innerWidth, behavior: 'smooth' });
    } else {
      const cardScrollRange = wrapperRef.current
        ? wrapperRef.current.scrollWidth / storyCards.length
        : window.innerWidth;
      window.scrollBy({ top: (index - currentCard) * cardScrollRange, behavior: 'smooth' });
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
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                <img src={card.image} alt={card.title} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>

        {/* Flèche gauche */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 z-20">
          <ArrowBtn onClick={() => goToCard(currentCard - 1)} disabled={currentCard === 0}>
            <ArrowLeft size={16} strokeWidth={1.5} />
          </ArrowBtn>
        </div>
        {/* Flèche droite */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20">
          <ArrowBtn onClick={() => goToCard(currentCard + 1)} disabled={currentCard === storyCards.length - 1}>
            <ArrowRight size={16} strokeWidth={1.5} />
          </ArrowBtn>
        </div>
      </section>
    );
  }

  // ── Desktop ──────────────────────────────────────────────────────────────
  return (
    <section data-color="#FDFCF8" ref={containerRef} className="h-screen w-full overflow-hidden flex flex-col justify-center relative bg-transparent">
      <div ref={wrapperRef} className="flex items-center h-[70vh] px-[20vw] gap-8 md:gap-16 w-max">
        {storyCards.map((card, i) => (
          <div key={i} className="story-card relative w-[75vw] md:w-[60vw] h-full flex-shrink-0 rounded-[2rem] md:rounded-[3rem] overflow-hidden group">
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Flèche gauche */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20">
        <ArrowBtn onClick={() => goToCard(currentCard - 1)} disabled={currentCard === 0}>
          <ArrowLeft size={16} strokeWidth={1.5} />
        </ArrowBtn>
      </div>
      {/* Flèche droite */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20">
        <ArrowBtn onClick={() => goToCard(currentCard + 1)} disabled={currentCard === storyCards.length - 1}>
          <ArrowRight size={16} strokeWidth={1.5} />
        </ArrowBtn>
      </div>
    </section>
  );
}
