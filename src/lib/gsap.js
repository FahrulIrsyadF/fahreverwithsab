import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import { CustomEase } from 'gsap/CustomEase';
import { CustomBounce } from 'gsap/CustomBounce';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, Physics2DPlugin, CustomEase, CustomBounce);

// Pantulan lembut + squash & stretch (membuat ease "envDrop" dan "envDrop-squash")
CustomBounce.create('envDrop', { strength: 0.28, squash: 1.4 });

// iOS menyusutkan address bar saat awal scroll → jangan refresh semua trigger karenanya
ScrollTrigger.config({ ignoreMobileResize: true });

export const reduceMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const vibrate = (pattern) => {
  // browser memblokir getaran sebelum user pernah menyentuh halaman; Safari iOS tidak mendukung
  if (navigator.userActivation && !navigator.userActivation.hasBeenActive) return;
  try { navigator.vibrate?.(pattern); } catch { /* tidak didukung */ }
};

/**
 * "Garis tergambar" (pengganti DrawSVGPlugin) TANPA mengukur panjang path.
 * DrawSVG memanggil getTotalLength() untuk tiap path saat tween dibuat — ratusan ranting/mawar
 * sekaligus = ±2 detik macet di HP Android menengah. Dengan pathLength="1" panjang tiap path
 * dianggap 1, jadi dash cukup "1 2" dan offset 1.01 (tersembunyi) → 0 (utuh).
 * Dianimasikan sebagai ATRIBUT (bukan CSS): CSSPlugin membaca getComputedStyle tiap path
 * → hitung ulang style ratusan kali saat start.
 * Pakai: gsap.fromTo(drawable(els), DRAW_HIDDEN, { ...DRAW_SHOWN, duration })
 */
export function drawable(targets) {
  const els = gsap.utils.toArray(targets);
  for (const el of els) {
    el.setAttribute('pathLength', '1');
    el.setAttribute('stroke-dasharray', '1 2');
  }
  return els;
}
export const DRAW_HIDDEN = { attr: { 'stroke-dashoffset': 1.01 } };
export const DRAW_SHOWN = { attr: { 'stroke-dashoffset': 0 } };

export { gsap, useGSAP, ScrollTrigger, SplitText };
