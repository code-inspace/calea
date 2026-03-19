import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function useTextRoll() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const top    = el.querySelector('.roll-top');
    const bottom = el.querySelector('.roll-bottom');
    if (!top || !bottom) return;

    gsap.set(bottom, { yPercent: 110 });

    const onEnter = () => {
      gsap.to(top,    { yPercent: -110, duration: 0.48, ease: 'power3.inOut', overwrite: true });
      gsap.to(bottom, { yPercent: 0,    duration: 0.48, ease: 'power3.inOut', overwrite: true });
    };

    const onLeave = () => {
      gsap.to(top,    { yPercent: 0,   duration: 0.48, ease: 'power3.inOut', overwrite: true });
      gsap.to(bottom, { yPercent: 110, duration: 0.48, ease: 'power3.inOut', overwrite: true });
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf([top, bottom]);
    };
  }, []);

  return ref;
}
