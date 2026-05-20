/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        panini: {
          navy: '#0d1b2a',
          blue: '#1A3668',
          burgundy: '#5c162e',
          red: '#E31837',
          gold: '#D4AF37',
          lightgold: '#F2D372',
          purple: '#6B21A8',
          teal: '#0D9488',
          bg: '#f8fafc',
          paper: '#f4f1ea', // Cor de papel creme
          slot: '#e8e5df', // Cor do slot vazio
        }
      },
      boxShadow: {
        'sticker': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
        'album': '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
        'album-page': '0 1px 3px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
