/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'paradou-cream': '#FDFCF8',
        'paradou-mint': '#E0F2F1',
        'paradou-green': '#1A2F23',
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
    },
  },
  plugins: [],
}
