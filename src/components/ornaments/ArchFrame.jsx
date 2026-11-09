import { RoseHead, Leaflet } from './Roses';

// Ukuran acuan = .arch-wrap (aspect-ratio 0.72). Ornamen digambar DI LUAR batas ini (overflow visible).
const W = 288, H = 400, R = W / 2;

/** Jalur lengkung (setengah lingkaran di atas, sisi tegak, dasar datar) yang digeser keluar sejauh d. */
const archPath = (d) =>
  `M ${-d} ${H + d} L ${-d} ${R} A ${R + d} ${R + d} 0 0 1 ${W + d} ${R} L ${W + d} ${H + d} Z`;

/** Titik-titik berjarak sama di sepanjang lengkung (tanpa dasar), untuk mutiara & renda. */
function archPoints(d, step) {
  const pts = [];
  const r = R + d;
  const side = H + d - R;
  const arc = Math.PI * r;
  const total = side * 2 + arc;
  const n = Math.round(total / step);
  for (let i = 0; i <= n; i++) {
    const s = (i / n) * total;
    let x, y, a;
    if (s < side) { x = -d; y = H + d - s; a = Math.PI; }
    else if (s < side + arc) {
      a = Math.PI + (s - side) / r;
      x = R + Math.cos(a) * r; y = R + Math.sin(a) * r;
    } else { x = W + d; y = R + (s - side - arc); a = 0; }
    pts.push([x, y, a]);
  }
  return pts;
}

const PEARLS = archPoints(14, 11);
const LACE = archPoints(25, 9);

/**
 * Bingkai hias untuk foto mempelai: renda lingkaran di luar, garis emas ganda,
 * untaian mutiara di antaranya, dan mawar kecil di puncak lengkung.
 */
export default function ArchFrame({ seed = 1, className = '' }) {
  return (
    <svg className={`arch-orn ${className}`} viewBox={`0 0 ${W} ${H}`} overflow="visible" aria-hidden="true"
      fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {/* renda: lingkaran kecil bersambung di sisi luar */}
      <g className="arch-orn-lace" strokeWidth=".9" opacity=".55">
        {LACE.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" />)}
      </g>
      <path className="arch-orn-line arch-orn-outer" d={archPath(20)} strokeWidth="1.8" />
      <g className="arch-orn-pearls">
        {PEARLS.map(([x, y], i) => <circle key={i} className="arch-pearl" cx={x} cy={y} r="2.7" />)}
      </g>
      <path className="arch-orn-line" d={archPath(7)} strokeWidth="1" opacity=".75" />

      {/* mawar di puncak, diapit dua daun */}
      <g className="arch-orn-crown" transform={`translate(${R} ${-20})`}>
        <ellipse rx="44" ry="20" className="arch-crown-bg" stroke="none" />
        <Leaflet x={-16} y={3} angle={192} k={24} fill />
        <Leaflet x={16} y={3} angle={-12} k={24} fill />
        <Leaflet x={-12} y={8} angle={150} k={16} fill />
        <Leaflet x={12} y={8} angle={30} k={16} fill />
        <RoseHead r={19} rings={4} seed={seed} />
      </g>
    </svg>
  );
}
