import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      // If there's a hash (like #experiences), wait a tiny bit for the page to render, then scroll to it
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    } else {
      // Otherwise, instantly scroll to the top left of the window before the browser paints the new page
      // Using 'instant' forces no animation even if global smooth scrolling is CSS applied
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
      // Fallback for browsers (Safari) that don't respect behavior: 'instant' optimally
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname, hash]);

  return null;
}
