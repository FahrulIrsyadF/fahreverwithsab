/** @type {import('tailwindcss').Config} */

// Warna Tailwind membaca token CSS (src/styles/tokens.css) agar satu palet berlaku di mana-mana,
// dan modifier opasitas (`bg-metal/40`) tetap jalan.
const t = (name) => `rgb(var(--${name}-rgb) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Token semantik (pakai ini untuk kode baru)
        base: { 950: t('base-950'), 900: t('base-900'), 800: t('base-800'), 700: t('base-700') },
        accent: { DEFAULT: t('accent'), soft: t('accent-soft'), tint: t('accent-tint') },
        metal: {
          dark: t('metal-dark'), deep: t('metal-deep'), mid: t('metal-mid'), DEFAULT: t('metal'),
          bright: t('metal-bright'), soft: t('metal-soft'), pale: t('metal-pale'), light: t('metal-light'),
        },
        paper: { deep: t('paper-deep'), lo: t('paper-lo'), DEFAULT: t('paper'), hi: t('paper-hi') },
        ivory: { DEFAULT: t('ivory'), parchment: t('paper-hi'), container: t('paper-lo'), subtle: t('paper'), border: t('paper-lo') },
        ink: { DEFAULT: t('ink'), soft: t('ink-soft') },
        muted: t('muted'),

        // Nama lama (palet zamrud) dipetakan ke token palet aktif, untuk sisa kelas lama
        emerald: { deep: t('base-900'), DEFAULT: t('base-800'), rich: t('base-700'), light: t('base-700'), tint: t('accent-tint'), surface: t('accent-tint') },
        gold: { deep: t('metal-dark'), DEFAULT: t('metal'), metallic: t('metal-bright'), light: t('metal-soft'), pale: t('metal-pale') },
        aqua: { deep: t('base-900'), teal: t('accent'), DEFAULT: t('accent'), soft: t('accent-soft'), glow: t('accent-soft'), tint: t('accent-tint') },
        charcoal: { DEFAULT: t('ink'), forest: t('ink'), muted: t('muted') },
      },
      fontFamily: {
        headline: ['"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
        arabic: ['Amiri', 'serif'],
      },
      boxShadow: {
        soft: '0 8px 30px rgb(var(--shade-rgb) / 0.08)',
        'glow-gold': '0 0 25px rgb(var(--metal-bright-rgb) / 0.3)',
      },
    },
  },
  plugins: [],
};
