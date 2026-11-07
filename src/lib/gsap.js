import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import { CustomEase } from 'gsap/CustomEase';
import { CustomBounce } from 'gsap/CustomBounce';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin, Physics2DPlugin, CustomEase, CustomBounce);

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

export { gsap, useGSAP, ScrollTrigger, SplitText };
