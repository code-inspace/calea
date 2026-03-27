/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'calea-cream': '#FDFCF8',
        'calea-mint': '#E0F2F1',
        'calea-primary': 'rgb(var(--calea-primary) / <alpha-value>)',
      },
      fontFamily: {
        // Fraunces = corps de texte (textes longs, paragraphes)
        sans: ['Fraunces', 'serif'],
        // DM Serif Display = tous les grands titres
        serif: ['"DM Serif Display"', 'serif'],
        // Inter = pour la navigation / micro-textes techniques
        inter: ['Inter', 'sans-serif'],
        // Legacy candidates (conservés pour référence)
        'playfair': ['"Playfair Display"', 'serif'],
        'dm-serif': ['"DM Serif Display"', 'serif'],
        'caslon': ['"Libre Caslon Display"', 'serif'],
        'fraunces': ['Fraunces', 'serif'],
        'lora': ['Lora', 'serif'],
        'cormorant': ['"Cormorant Garamond"', 'serif'],
      },
      animation: {
        'scroll-hint': 'scroll-hint 1.2s ease-in-out infinite',
      },
      keyframes: {
        'scroll-hint': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(4px)' },
        },
      },
    },
  },
  plugins: [],
}
