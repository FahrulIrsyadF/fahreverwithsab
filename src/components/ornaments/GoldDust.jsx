import { useEffect, useRef } from 'react';
import { paletteRgb } from '../../lib/palette';

/** Debu emas melayang ke atas sambil berkelip (canvas, hemat DOM).
 *  Satu sprite bercahaya digambar sekali, lalu ditempel per butir dengan globalAlpha.
 *  Loop rAF hanya berjalan saat canvas terlihat (banyak section gelap memakai debu ini). */
function makeSprite(rgb) {
  const s = document.createElement('canvas');
  s.width = s.height = 32;
  const g = s.getContext('2d');
  const grad = g.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, `rgba(${rgb},1)`);
  grad.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, 32, 32);
  return s;
}

export default function GoldDust({ count = 55, token = 'metal-pale', className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext('2d');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, raf = 0, visible = false;
    const sprite = makeSprite(paletteRgb(token));
    const resize = () => {
      // butiran memang buram → resolusi 1x cukup (4–9x lebih sedikit piksel di HP)
      w = c.clientWidth; h = c.clientHeight;
      c.width = w; c.height = h;
    };
    const make = (init) => ({
      x: Math.random() * w, y: init ? Math.random() * h : h + 8,
      r: Math.random() * 1.5 + 0.4,
      vy: -(Math.random() * 0.22 + 0.06), vx: (Math.random() - 0.5) * 0.12,
      tw: Math.random() * 6.28, ts: Math.random() * 0.03 + 0.008,
    });
    resize();
    const parts = Array.from({ length: reduce ? Math.round(count / 3) : count }, () => make(true));
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy; p.tw += p.ts;
        if (p.y < -8) Object.assign(p, make(false));
        const a = 0.3 + Math.sin(p.tw) * 0.3;
        if (a < 0.02) continue;
        const r = p.r * 4;
        ctx.globalAlpha = a;
        ctx.drawImage(sprite, p.x - r, p.y - r, r * 2, r * 2);
      }
      ctx.globalAlpha = 1;
      raf = visible ? requestAnimationFrame(tick) : 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(c);
    const ro = new ResizeObserver(resize);
    ro.observe(c);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [count, token]);
  return <canvas ref={ref} className={`gold-dust ${className}`} aria-hidden="true" />;
}
