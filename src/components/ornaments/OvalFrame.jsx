import { RoseHead, RoseBud, Leaflet } from './Roses';

// Ukuran acuan = .arch-wrap (aspect-ratio 0.72). Foto = elips penuh; ornamen digambar DI LUAR (overflow visible).
const W = 288, H = 400, A = W / 2, B = H / 2;
const f = (n) => Math.round(n * 10) / 10;

/** Titik di kurva sejajar elips (digeser sejauh d mengikuti normal), t = sudut parameter. */
function at(t, d) {
  const c = Math.cos(t), s = Math.sin(t);
  const nx = B * c, ny = A * s, nl = Math.hypot(nx, ny);
  return [A + A * c + (d * nx) / nl, B + B * s + (d * ny) / nl];
}

/** n titik berjarak sama (menurut panjang busur) di sepanjang kurva sejajar d. */
function evenPoints(d, n, phase = 0) {
  const M = 720, pts = [], len = [0];
  for (let i = 0; i <= M; i++) pts.push(at((i / M) * Math.PI * 2 - Math.PI / 2, d));
  for (let i = 1; i <= M; i++) len.push(len[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = len[M], out = [];
  let j = 0;
  for (let k = 0; k < n; k++) {
    const target = ((k + phase) / n) * total;
    while (len[j + 1] < target) j++;
    const u = (target - len[j]) / (len[j + 1] - len[j] || 1);
    const t = ((j + u) / M) * Math.PI * 2 - Math.PI / 2;
    out.push(t);
  }
  return out;
}

const ring = (d) => {
  const p = [];
  for (let i = 0; i < 160; i++) p.push(at((i / 160) * Math.PI * 2 - Math.PI / 2, d));
  return `M${p.map(([x, y]) => `${f(x)} ${f(y)}`).join(' L')}Z`;
};

const PEARLS = evenPoints(6, 92).map((t) => at(t, 6));
// renda: lengkung-lengkung kecil (scallop) di sisi luar + lubang renda di tiap lengkung
const SC = evenPoints(23, 46);
const LACE = (() => {
  let d = '';
  const holes = [], tips = [];
  SC.forEach((t, i) => {
    const t2 = SC[(i + 1) % SC.length] + (i === SC.length - 1 ? Math.PI * 2 : 0);
    const a = at(t, 23), b = at(t2, 23), m = (t + t2) / 2;
    const c1 = at(m - (t2 - t) * 0.42, 37), c2 = at(m + (t2 - t) * 0.42, 37);
    d += `${i ? '' : `M${f(a[0])} ${f(a[1])}`} C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(b[0])} ${f(b[1])}`;
    holes.push(at(m, 29.5));
    tips.push(at(t, 27));
  });
  return { d: `${d}Z`, holes, tips };
})();

/** Kipas kerang barok di puncak bingkai, diapit dua ukiran ulir. */
function Crest({ id }) {
  const petals = [-3, -2, -1, 0, 1, 2, 3];
  return (
    <g fill={`url(#${id})`} stroke="var(--metal-dark)" strokeWidth=".7">
      {[-1, 1].map((s) => (
        <path key={s} transform={`scale(${s} 1)`}
          d="M6 4 C22 8 40 4 46 -6 C51 -15 44 -24 36 -20 C30 -17 32 -9 38 -10 C36 -3 24 0 6 -2 Z" />
      ))}
      {petals.map((i) => (
        <path key={i} transform={`rotate(${i * 21})`} d="M0 2 C-6 -8 -6 -22 0 -31 C6 -22 6 -8 0 2 Z" />
      ))}
      <ellipse cx="0" cy="2" rx="9" ry="6" />
      <circle cx="0" cy="-34" r="3" />
    </g>
  );
}

/** Rangkaian mawar menjuntai di sudut bawah bingkai. */
function Bouquet({ seed }) {
  return (
    <g className="oval-bq">
      <g className="oval-bq-leaf">
        <Leaflet x={-4} y={8} angle={112} k={34} fill />
        <Leaflet x={6} y={10} angle={74} k={30} fill />
        <Leaflet x={-10} y={0} angle={170} k={26} fill />
        <Leaflet x={14} y={-2} angle={8} k={24} fill />
        <Leaflet x={0} y={30} angle={96} k={28} fill />
        <Leaflet x={2} y={50} angle={70} k={22} fill />
        <Leaflet x={-2} y={56} angle={118} k={20} fill />
        <path className="sprig-path" d="M0 4 C-2 28 4 52 0 78" fill="none" />
      </g>
      <g className="oval-bq-bud">
        <RoseBud x={-3} y={64} len={14} angle={190} />
        <RoseBud x={4} y={78} len={12} angle={170} />
        <RoseBud x={-6} y={40} len={12} angle={215} />
      </g>
      <g className="oval-bq-rose">
        <RoseHead x={14} y={18} r={14} rings={4} seed={seed + 2} />
        <RoseHead x={-14} y={16} r={15} rings={4} seed={seed + 5} />
        <RoseHead x={0} y={0} r={19} rings={4} seed={seed} />
      </g>
    </g>
  );
}

/**
 * Bingkai oval barok untuk foto mempelai: renda berlubang di sisi luar, pita emas berukir,
 * untaian mutiara, kipas kerang di puncak, dan rangkaian mawar di sudut bawah.
 * Nama kelas lama (arch-orn-line / arch-pearl / arch-orn-lace / arch-orn-crown) dipakai
 * oleh animasi di CoupleSection.
 */
export default function OvalFrame({ seed = 1, side = 'left', className = '' }) {
  const id = `oval-gold-${seed}`;
  const bx = side === 'left' ? 46 : W - 46;
  return (
    <svg className={`arch-orn oval-orn ${className}`} viewBox={`0 0 ${W} ${H}`} overflow="visible" aria-hidden="true"
      fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--metal-deep)" />
          <stop offset=".28" stopColor="var(--metal-light)" />
          <stop offset=".5" stopColor="var(--metal-mid)" />
          <stop offset=".72" stopColor="var(--metal-soft)" />
          <stop offset="1" stopColor="var(--metal-dark)" />
        </linearGradient>
      </defs>

      {/* renda di sisi luar */}
      <g className="arch-orn-lace">
        <path d={`${LACE.d} ${ring(14)}`} fillRule="evenodd" fill="var(--paper-hi)" fillOpacity=".9" stroke="none" />
        <path d={LACE.d} stroke="var(--metal)" strokeWidth="1" />
        {LACE.holes.map(([x, y], i) => <circle key={i} cx={f(x)} cy={f(y)} r="2.4" stroke="var(--metal)" strokeWidth=".8" />)}
        {LACE.tips.map(([x, y], i) => <circle key={`t${i}`} cx={f(x)} cy={f(y)} r=".9" fill="var(--metal)" stroke="none" />)}
      </g>

      {/* pita emas berukir */}
      <path d={ring(16)} stroke={`url(#${id})`} strokeWidth="11" />
      <path d={ring(16)} stroke="var(--metal-dark)" strokeWidth="9" strokeDasharray="1.2 4.2" strokeLinecap="butt" opacity=".45" />
      <path className="arch-orn-line" d={ring(22)} stroke="var(--metal-dark)" strokeWidth="1" />
      <path className="arch-orn-line" d={ring(10.5)} stroke="var(--metal-dark)" strokeWidth="1" />

      <g className="arch-orn-pearls">
        {PEARLS.map(([x, y], i) => <circle key={i} className="arch-pearl" cx={f(x)} cy={f(y)} r="2.3" />)}
      </g>
      <path className="arch-orn-line" d={ring(1)} stroke="var(--metal)" strokeWidth="1.4" />

      <g className="arch-orn-crown" transform={`translate(${A} -16)`}><Crest id={id} /></g>
      <g className="arch-orn-crown arch-orn-foot" transform={`translate(${A} ${H + 16}) scale(.6 -.6)`}><Crest id={id} /></g>

      <g className="arch-orn-bouquet" transform={`translate(${bx} ${H - 40}) rotate(${side === 'left' ? 12 : -12}) scale(1.3)`}>
        <Bouquet seed={seed} />
      </g>
    </svg>
  );
}
