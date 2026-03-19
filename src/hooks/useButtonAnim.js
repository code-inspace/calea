import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * GSAP micro-animation pour les boutons Caléa.
 *
 * variant 'cta'  → lift (y) + scale léger, retour élastique
 * variant 'icon' → scale seul, retour élastique + légère rotation
 */
export default function useButtonAnim(variant = 'cta') {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { transformOrigin: 'center center' });

    const isCta = variant === 'cta';

    const onEnter = () =>
      gsap.to(el, {
        scale: isCta ? 1.04 : 1.18,
        y: isCta ? -4 : 0,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: true,
      });

    const onLeave = () =>
      gsap.to(el, {
        scale: 1,
        y: 0,
        duration: 0.55,
        ease: 'elastic.out(1.1, 0.5)',
        overwrite: true,
      });

    const onDown = () =>
      gsap.to(el, {
        scale: isCta ? 0.97 : 0.88,
        y: 0,
        duration: 0.08,
        ease: 'power3.in',
        overwrite: true,
      });

    const onUp = () =>
      gsap.to(el, {
        scale: isCta ? 1.04 : 1.18,
        y: isCta ? -4 : 0,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: true,
      });

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mousedown', onDown);
    el.addEventListener('mouseup', onUp);

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('mouseup', onUp);
      gsap.killTweensOf(el);
    };
  }, [variant]);

  return ref;
}
