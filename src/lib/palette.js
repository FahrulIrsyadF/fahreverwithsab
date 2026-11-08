/**
 * Palet final: "Zamrud & Powder Blue" (Deep Emerald #014224 + Powder Blue #C1DFE9, dari lab).
 * CSS memakai token di src/styles/tokens.css (`var(--base-900)`, `rgb(var(--metal-pale-rgb) / .4)`).
 * File ini hanya untuk canvas (GoldDust, Confetti, koin gosok, rasterisasi segel) yang tidak bisa membaca CSS var.
 * Jika nilai warna diubah, ubah JUGA di tokens.css (jalankan `node scripts/gen-tokens.mjs`).
 */
export const PALETTE = {
  // Deep Emerald #014224 = base-900 (warna utama, latar gelap)
  'base-950': '#002916', 'base-900': '#014224', 'base-800': '#0a5533', 'base-700': '#176a44',
  // Powder Blue #C1DFE9 = accent-soft (teks/garis di latar gelap) + kertas bernuansa biru
  accent: '#4a8199', 'accent-soft': '#c1dfe9', 'accent-tint': '#e3f1f6',
  'metal-dark': '#6b5530', 'metal-deep': '#8c7244', 'metal-mid': '#c5a86c', metal: '#ccb27e',
  'metal-bright': '#d9bf86', 'metal-soft': '#e7d3a3', 'metal-pale': '#f3e4c0', 'metal-light': '#fcf5e4',
  'paper-deep': '#9cc3d2', 'paper-lo': '#c1dfe9', paper: '#d8ebf2', 'paper-hi': '#edf6f9', ivory: '#eaf5f9',
  ink: '#012e19', 'ink-soft': '#24433a', muted: '#557069', shade: '#1c3a3f',
  'wax-hi': '#2c8059', wax: '#0b5533', 'wax-lo': '#013019', 'wax-rim': '#13643f', 'wax-core': '#023a20', 'wax-light': '#e9f6fa',
  // benang merah (eksklusif untuk benang), sama dengan default lab
  thread: '#b0122c', 'thread-twist': '#ff8f9c', 'thread-glow': '#ff3b55', 'thread-tip': '#ffd9de',
};

const hexRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

/** Warna untuk canvas: `paletteColor('metal-pale')` → '#f5e3bf', `paletteRgb(...)` → '245,227,191'. */
export const paletteColor = (k) => PALETTE[k];
export const paletteRgb = (k) => hexRgb(PALETTE[k]).join(',');
export const tokensCss = () =>
  Object.entries(PALETTE).flatMap(([k, v]) => [`  --${k}: ${v};`, `  --${k}-rgb: ${hexRgb(v).join(' ')};`]).join('\n');
