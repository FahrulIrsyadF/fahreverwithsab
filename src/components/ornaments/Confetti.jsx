import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { paletteColor } from '../../lib/palette';

const TOKENS = ['metal-bright', 'metal-pale', 'metal-light', 'ivory', 'accent', 'accent-soft'];

/** Confetti canvas ringan. Panggil ref.current.fire(x, y, n). Ukuran canvas diatur saat ditembakkan
 *  (bukan di window resize, yang di iOS menyala terus saat address bar berubah). */
const Confetti = forwardRef(function Confetti(_, ref) {
  const canvas = useRef(null);
  const parts = useRef([]);
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const loop = () => {
    const ctx = canvas.current?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (const p of parts.current) {
      p.vy += 0.22; p.vx *= 0.985; p.vy *= 0.985;
      p.x += p.vx + Math.sin((p.wob += 0.08)) * 0.6; p.y += p.vy; p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.scale(1, Math.cos(p.wob * 1.7)); // efek kertas berputar
      ctx.fillStyle = p.color;
      if (p.round) { ctx.beginPath(); ctx.arc(0, 0, p.s / 2, 0, 6.283); ctx.fill(); }
      else ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
      ctx.restore();
    }
    parts.current = parts.current.filter((p) => p.y < innerHeight + 40);
    if (parts.current.length) raf.current = requestAnimationFrame(loop);
    else { ctx.clearRect(0, 0, innerWidth, innerHeight); canvas.current.style.visibility = 'hidden'; }
  };

  useImperativeHandle(ref, () => ({
    fire(x = innerWidth / 2, y = innerHeight / 2, count = 150) {
      const c = canvas.current;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      if (c.width !== Math.round(innerWidth * dpr) || c.height !== Math.round(innerHeight * dpr)) {
        c.width = innerWidth * dpr; c.height = innerHeight * dpr;
        c.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      c.style.visibility = 'visible';
      const COLORS = TOKENS.map(paletteColor);
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const v = 4 + Math.random() * 9;
        parts.current.push({
          x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 6,
          s: 6 + Math.random() * 7, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
          wob: Math.random() * 6, round: Math.random() < 0.25,
          color: COLORS[(Math.random() * COLORS.length) | 0],
        });
      }
      cancelAnimationFrame(raf.current);
      loop();
    },
  }));

  return (
    <canvas
      ref={canvas}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 90, visibility: 'hidden' }}
    />
  );
});

export default Confetti;
