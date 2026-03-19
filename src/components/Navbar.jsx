import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import logoDark from '../assets/logo-calea.png';
import logoLight from '../assets/logo-calea-light.png';

export default function Navbar() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isLight, setIsLight] = useState(true);
  const navRef = useRef(null);

  // Fade in AFTER the entire Hero text animation sequence ends (only on home)
  useEffect(() => {
    const isHome = location.pathname === '/';
    gsap.fromTo(navRef.current,
      { opacity: 0, y: -20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: 'power2.out', 
        delay: isHome ? 7.2 : 0 
      }
    );
  }, [location.pathname]);


  useEffect(() => {
    let observer;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 60);

      const main = document.querySelector('main');
      let shouldBeLight = true; // default on Hero pages

      if (main) {
        // If we scroll past the initial hero (typically 100vh)
        // Wait, on some pages (like Contact) the Hero is shorter and cream.
        if (scrollY > window.innerHeight - 80 || location.pathname !== '/') {
          const bg = main.style.backgroundColor || window.getComputedStyle(main).backgroundColor;
          const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (match) {
            const r = parseInt(match[1]);
            const g = parseInt(match[2]);
            const b = parseInt(match[3]);
            // Calcul de la luminance perceptive
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            shouldBeLight = luminance < 0.5; // Si très sombre, texte clair
          } else {
            shouldBeLight = false;
          }
        } else {
          // If on home hero (video) it's strictly light
          shouldBeLight = true;
        }
      }

      setIsLight(shouldBeLight);
    };

    // Run once on mount
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Observer pour capter les animations GSAP du background meme quand on ne scroll plus
    const main = document.querySelector('main');
    if (main) {
      observer = new MutationObserver(() => handleScroll());
      observer.observe(main, { attributes: true, attributeFilter: ['style'] });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observer) observer.disconnect();
    };
  }, [location.pathname]);

  const changeLanguage = (lang) => i18n.changeLanguage(lang);

  const navLinks = {
    left: [
      { label: 'Bungalows', href: '/bungalows', isRouterLink: true },
      { label: 'Expériences', href: '/#experiences', isRouterLink: false },
    ],
    right: [
      { label: "L'histoire", href: '/histoire', isRouterLink: true },
      { label: 'Réserver', href: '/contact', isRouterLink: true },
    ],
  };

  const textClass = isLight ? 'text-white' : 'text-paradou-green';
  const textHover = isLight ? 'hover:text-white/60' : 'hover:text-paradou-green/60';

  return (
    <header
      ref={navRef}
      style={{ opacity: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-[padding,backdrop-filter,background-color] duration-500 ${
        scrolled ? 'py-5 backdrop-blur-md bg-black/10' : 'py-8 bg-transparent'
      }`}
    >
      <nav className="w-full flex items-center justify-between px-6 md:px-16">

        {/* Left Anchors */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.left.map((link) => (
            <li key={link.label}>
              {link.isRouterLink ? (
                <Link
                  to={link.href}
                  className={`font-inter text-xs tracking-[0.2em] uppercase transition-colors duration-500 ${textClass} ${textHover}`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  className={`font-inter text-xs tracking-[0.2em] uppercase transition-colors duration-500 ${textClass} ${textHover}`}
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Center: Logo — always light version on video/dark, dark on mint */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link to="/">
            <img
              src={isLight ? logoLight : logoDark}
              alt="Caléa"
              className="h-10 md:h-14 object-contain transition-all duration-500"
            />
          </Link>
        </div>

        {/* Right Anchors + Language Toggle */}
        <div className="flex items-center gap-10 ml-auto">
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.right.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`font-inter text-xs tracking-[0.2em] uppercase transition-colors duration-500 ${textClass} ${textHover}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Language toggle */}
          <div className={`flex gap-3 font-inter text-xs tracking-widest transition-colors duration-500 ${textClass}`}>
            <button
              onClick={() => changeLanguage('fr')}
              className={`transition-all duration-300 ${i18n.language === 'fr' ? 'font-semibold' : 'opacity-50 hover:opacity-100'}`}
            >
              FR
            </button>
            <span className="opacity-30">|</span>
            <button
              onClick={() => changeLanguage('en')}
              className={`transition-all duration-300 ${i18n.language === 'en' ? 'font-semibold' : 'opacity-50 hover:opacity-100'}`}
            >
              EN
            </button>
          </div>
        </div>

      </nav>
    </header>
  );
}
