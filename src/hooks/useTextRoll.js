import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function useTextRoll() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const top    = el.querySelector('.roll-top');
    const bottom = el.querySelector('.roll-bottom');
    if (!top || !bottom) return;

    // roll-bottom starts below via CSS (top-full), no GSAP init needed
    const h = el.offsetHeight;

    const onEnter = () => {
      gsap.to(top,    { y: -h, duration: 0.48, ease: 'power3.inOut', overwrite: true });
      gsap.to(bottom, { y: -h, duration: 0.48, ease: 'power3.inOut', overwrite: true });
    };

    const onLeave = () => {
      gsap.to(top,    { y: 0, duration: 0.48, ease: 'power3.inOut', overwrite: true });
      gsap.to(bottom, { y: 0, duration: 0.48, ease: 'power3.inOut', overwrite: true });
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
