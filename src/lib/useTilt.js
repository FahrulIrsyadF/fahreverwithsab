import { useEffect } from 'react';
import { gsap } from './gsap';

const clamp = (v) => Math.max(-1, Math.min(1, v));

/**
 * Memiringkan elemen mengikuti pointer (desktop) atau giroskop (HP).
 * Jika tidak ada input selama 2 detik, elemen "bernapas" pelan sendiri.
 *
 * Performa (penting di HP):
 *  - Rotasi hanya mengubah transform → dikerjakan GPU, tanpa cat ulang.
 *  - `vars: true` juga menulis CSS var --nx/--ny untuk kilau foil. Ini MEMICU CAT ULANG
 *    elemen yang memakainya, jadi ditulis bertahap (`varStep`) dan hanya ke `varTargets()`.
 *  - `onMove(nx, ny)` untuk efek yang digerakkan lewat transform (murah, tiap frame).
 *  - `data-tilt-paused` di elemen menghentikan kemiringan (mis. saat menggosok koin / di luar layar).
 */
export function useTilt(ref, { max = 8, idle = true, vars = false, varStep = 0.05, varTargets, onMove } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { transformPerspective: 900 });
    const state = { nx: 0, ny: 0 };
    const written = { nx: 99, ny: 99 };
    let lastInput = 0;
    const setRot = gsap.quickSetter(el, 'css');
    const setVar = (k, v) => (varTargets ? varTargets() : [el]).forEach((t) => t.style.setProperty(k, v));

    const apply = () => {
      setRot({ rotationY: state.nx * max, rotationX: -state.ny * max });
      onMove?.(state.nx, state.ny);
      if (vars) {
        if (Math.abs(state.nx - written.nx) >= varStep) setVar('--nx', (written.nx = state.nx).toFixed(2));
        if (Math.abs(state.ny - written.ny) >= varStep) setVar('--ny', (written.ny = state.ny).toFixed(2));
      }
    };
    const toX = gsap.quickTo(state, 'nx', { duration: 0.6, ease: 'power3.out', onUpdate: apply });
    const toY = gsap.quickTo(state, 'ny', { duration: 0.6, ease: 'power3.out', onUpdate: apply });
    const target = (nx, ny) => {
      if (el.dataset.tiltPaused) return;
      lastInput = performance.now();
      toX(nx); toY(ny);
    };

    const onPointer = (e) => {
      if (e.pointerType === 'touch') return; // di HP pakai giroskop
      target(clamp((e.clientX / innerWidth) * 2 - 1), clamp((e.clientY / innerHeight) * 2 - 1));
    };
    const onOrient = (e) => {
      if (e.gamma == null) return;
      target(clamp(e.gamma / 25), clamp((e.beta - 45) / 25));
    };
    const onIdle = (time) => {
      if (!idle || el.dataset.tiltPaused || performance.now() - lastInput < 2000) return;
      state.nx = Math.sin(time * 0.7) * 0.55;
      state.ny = Math.cos(time * 0.5) * 0.3;
      apply();
    };

    window.addEventListener('pointermove', onPointer);
    window.addEventListener('deviceorientation', onOrient);
    gsap.ticker.add(onIdle);
    return () => {
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('deviceorientation', onOrient);
      gsap.ticker.remove(onIdle);
      gsap.killTweensOf(state);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, max, idle, vars, varStep]);
}

let gyroGranted = false;

/** iOS butuh izin eksplisit (dipanggil dari gesture user). */
export async function requestGyro() {
  const DOE = window.DeviceOrientationEvent;
  if (DOE && typeof DOE.requestPermission === 'function') {
    try { gyroGranted = (await DOE.requestPermission()) === 'granted'; } catch { return false; }
    return gyroGranted;
  }
  return (gyroGranted = true);
}

/** true bila perlu tombol izin giroskop (iOS) dan izin belum diberikan (mis. saat menekan segel). */
export const gyroNeedsPermission = () =>
  typeof window.DeviceOrientationEvent?.requestPermission === 'function' && !gyroGranted;
