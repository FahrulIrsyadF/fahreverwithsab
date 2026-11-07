/**
 * Palet final: "Marun & Mawar" (dipilih bersama calon istri, dari lab).
 * CSS memakai token di src/styles/tokens.css (`var(--base-900)`, `rgb(var(--metal-pale-rgb) / .4)`).
 * File ini hanya untuk canvas (GoldDust, Confetti, koin gosok, rasterisasi segel) yang tidak bisa membaca CSS var.
 * Jika nilai warna diubah, ubah JUGA di tokens.css (jalankan `node scripts/gen-tokens.mjs`).
 */
export const PALETTE = {
  'base-950': '#1e070c', 'base-900': '#2d0b13', 'base-800': '#4a1221', 'base-700': '#65192d',
  accent: '#d0566e', 'accent-soft': '#f0aebb', 'accent-tint': '#fbe9ec',
  'metal-dark': '#6e5130', 'metal-deep': '#8f6e43', 'metal-mid': '#c9a76e', metal: '#cfb07f',
  'metal-bright': '#dcbd85', 'metal-soft': '#e9d2a2', 'metal-pale': '#f5e3bf', 'metal-light': '#fdf4e3',
  'paper-deep': '#cdbbb7', 'paper-lo': '#ebe1de', paper: '#f8f4f2', 'paper-hi': '#fffdfc', ivory: '#fdf9f8',
  ink: '#2d0b13', 'ink-soft': '#4d2a31', muted: '#7d6065', shade: '#4a1a20',
  'wax-hi': '#a8384e', wax: '#721b2e', 'wax-lo': '#45101b', 'wax-rim': '#87253c', 'wax-core': '#581526', 'wax-light': '#fff0f2',
  // benang merah: palet marun menimpa default agar benang tetap terlihat di latar marun
  thread: '#d72844', 'thread-twist': '#ffc2cb', 'thread-glow': '#ff6a80', 'thread-tip': '#fff0f2',
};

const hexRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

/** Warna untuk canvas: `paletteColor('metal-pale')` → '#f5e3bf', `paletteRgb(...)` → '245,227,191'. */
export const paletteColor = (k) => PALETTE[k];
export const paletteRgb = (k) => hexRgb(PALETTE[k]).join(',');
export const tokensCss = () =>
  Object.entries(PALETTE).flatMap(([k, v]) => [`  --${k}: ${v};`, `  --${k}-rgb: ${hexRgb(v).join(' ')};`]).join('\n');
