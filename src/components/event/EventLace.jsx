import { useEffect, useRef, useState } from 'react';

// Renda mengelilingi kartu acara (bentuk = border-radius .ev: puncak setengah elips setinggi TOP,
// sisi tegak, sudut bawah membulat). Digambar di LUAR tepi kartu, ukuran mengikuti kartu (ResizeObserver).
const TOP = 110, CORNER = 14;
const R = 8.5;      // jari-jari lengkung renda
const STEP = 19;    // jarak antar lengkung
const BAND = 6;     // lebar pita sisir di tepi kartu
const f = (n) => Math.round(n * 10) / 10;
const circle = ([x, y], r) => `M${f(x - r)} ${f(y)}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

/** Garis tepi kartu searah jarum jam (titik rapat), mulai kiri-bawah lengkung puncak. */
function outline(w, h) {
  const pts = [], a = w / 2;
  for (let i = 0; i <= 90; i++) { const t = Math.PI + (i / 90) * Math.PI; pts.push([a + a * Math.cos(t), TOP + TOP * Math.sin(t)]); }
  for (let y = TOP + 4; y < h - CORNER; y += 4) pts.push([w, y]);
  for (let i = 0; i <= 12; i++) { const t = (i / 12) * Math.PI / 2; pts.push([w - CORNER + CORNER * Math.cos(t), h - CORNER + CORNER * Math.sin(t)]); }
  for (let i = 0; i <= 12; i++) { const t = Math.PI / 2 + (i / 12) * Math.PI / 2; pts.push([CORNER + CORNER * Math.cos(t), h - CORNER + CORNER * Math.sin(t)]); }
  for (let y = h - CORNER - 4; y > TOP; y -= 4) pts.push([0, y]);
  pts.push(pts[0]);
  return pts;
}

/** Ambil titik berjarak sama di sepanjang garis: [x, y, tx, ty] (tx,ty = arah garis). */
function resample(pts, step) {
  const out = [];
  let carry = 0;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
    const L = Math.hypot(x1 - x0, y1 - y0);
    if (!L) continue;
    const tx = (x1 - x0) / L, ty = (y1 - y0) / L;
    let s = carry;
    while (s < L) { out.push([x0 + tx * s, y0 + ty * s, tx, ty]); s += step; }
    carry = s - L;
  }
  return out;
}

function build(w, h) {
  const base = outline(w, h);
  // normal keluar untuk arah searah jarum jam (sumbu y ke bawah) = (ty, -tx)
  const off = (p, o) => [p[0] + p[3] * o, p[1] - p[2] * o];
  const poly = (arr) => `M${arr.map(([x, y]) => `${f(x)} ${f(y)}`).join('L')}`;

  const dense = resample(base, 3);
  const band = `${poly(dense.map((p) => off(p, BAND)))}Z${poly(dense.map((p) => off(p, 0.5)).reverse())}Z`;
  const lines = [poly(dense.map((p) => off(p, 0.5))), poly(dense.map((p) => off(p, BAND)))];
  const teeth = resample(base, 2.2).map((p) => { const a = off(p, 1.6), b = off(p, BAND - 1.4); return `M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}`; });

  const fills = [], dots = [], rings = [];
  resample(base, STEP).forEach((p) => {
    const c = off(p, BAND);
    const P = (a, r) => [c[0] - p[2] * Math.cos(a) * r + p[3] * Math.sin(a) * r, c[1] - p[3] * Math.cos(a) * r - p[2] * Math.sin(a) * r];
    const arc = (r) => Array.from({ length: 13 }, (_, i) => P((i / 12) * Math.PI, r));
    fills.push(`${poly(arc(R))}Z`);
    lines.push(poly(arc(R)), poly(arc(R * 0.6)));
    for (let i = 1; i < 6; i++) dots.push(circle(P((i / 6) * Math.PI, R * 0.8), 0.6));
    for (let i = 1; i < 8; i++) rings.push(circle(P((i / 8) * Math.PI, R + 1.2), 1));
    rings.push(circle(P(Math.PI / 2, R * 0.28), 1.4));
  });
  return { band, fill: fills.join(''), line: lines.join(''), teeth: teeth.join(''), dots: dots.join(''), rings: rings.join('') };
}

export default function EventLace() {
  const ref = useRef(null);
  const [size, setSize] = useState(null);

  useEffect(() => {
    const card = ref.current?.parentElement;
    if (!card) return;
    const ro = new ResizeObserver(() => {
      const w = Math.round(card.offsetWidth), h = Math.round(card.offsetHeight);
      setSize((s) => (s && s.w === w && s.h === h ? s : { w, h }));
    });
    ro.observe(card);
    return () => ro.disconnect();
  }, []);

  const L = size ? build(size.w, size.h) : null;
  return (
    <svg ref={ref} className="ev-lace" aria-hidden="true" overflow="visible"
      viewBox={size ? `0 0 ${size.w} ${size.h}` : undefined} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {L && (
        <>
          <path d={L.band} className="ev-lace-fill" fillRule="evenodd" />
          <path d={L.fill} className="ev-lace-fill ev-lace-sc" />
          <path d={L.teeth} className="ev-lace-thread" strokeWidth=".5" />
          <path d={L.line} className="ev-lace-thread" strokeWidth=".75" />
          <path d={L.rings} className="ev-lace-thread" strokeWidth=".55" />
          <path d={L.dots} className="ev-lace-dot" />
        </>
      )}
    </svg>
  );
}
