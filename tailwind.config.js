/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Stitch Design Tokens: Botanical Emerald & Gilded Romance
        emerald: {
          deep: '#003527',
          DEFAULT: '#064E3B',
          rich: '#0F5132',
          light: '#2B6954',
          tint: '#EAF5EF',
          surface: '#E8F3EE'
        },
        gold: {
          deep: '#574500',
          DEFAULT: '#C5A059',
          metallic: '#D4AF37',
          light: '#FED65B',
          pale: '#FFE088'
        },
        aqua: {
          deep: '#00342F',
          teal: '#004D46',
          DEFAULT: '#239D8E',
          soft: '#72D7CA',
          glow: '#80E5D7',
          tint: '#E8F8F6'
        },
        ivory: {
          DEFAULT: '#FAF9F4',
          parchment: '#FDFCF7',
          container: '#EFEEE9',
          subtle: '#F5F4EF',
          border: '#E1EBE5'
        },
        charcoal: {
          DEFAULT: '#1B1C19',
          forest: '#09261E',
          muted: '#5C6E66'
        }
      },
      fontFamily: {
        headline: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive']
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(6, 78, 59, 0.07)',
        'glow-gold': '0 0 25px rgba(212, 175, 55, 0.25)',
        'glow-aqua': '0 0 25px rgba(128, 229, 215, 0.3)',
        'glow-jewel': '0 0 35px rgba(35, 157, 142, 0.25), 0 0 15px rgba(212, 175, 55, 0.2)',
        'vellum': '0 12px 32px -4px rgba(6, 78, 59, 0.08), 0 4px 12px -2px rgba(212, 175, 55, 0.1)',
        'dark-vellum': '0 16px 40px -8px rgba(0, 20, 15, 0.35), 0 0 0 1px rgba(114, 215, 202, 0.15) inset'
      }
    },
  },
  plugins: [],
}
