import { useEffect, useRef } from 'react';
import './roses.css';

/**
 * Ornamen mawar line-art, prosedural (tanpa file gambar). Gaya sama dengan Sprig:
 * semua garis ber-class "sprig-path" → bisa "digambar" DrawSVGPlugin oleh demo.
 *  - RoseSprig  : ranting mawar (bunga mekar + kuncup + daun majemuk + duri). API = Sprig.
 *  - RoseCorner : rangkaian pojok (mekar, setengah mekar, kuncup, daun, baby's breath).
 *                 Didesain untuk pojok KIRI ATAS; pojok lain → CSS rotate(90/180/270deg).
 *  - RoseVine   : sulur mendatar untuk batas section / pembatas teks.
 * Kelopak mekar sendiri saat terlihat (IntersectionObserver → .is-bloom). Pembungkus
 * ber-atribut [data-bloom-manual] menahan mekar sampai demo memanggil bloomIn(scope).
 */

function rng(seed) {
  let s = (seed * 9301 + 49297) % 2147483647 || 1;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}
const f = (n) => Math.round(n * 100) / 100;
const RAD = Math.PI / 180;
const pol = (deg, d) => [Math.cos(deg * RAD) * d, Math.sin(deg * RAD) * d];

/** Catmull-Rom → kurva Bezier halus melewati semua titik. */
function curve(pts, closed = false) {
  const p = closed ? [pts[pts.length - 1], ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts[pts.length - 1]];
  let d = `M${f(p[1][0])} ${f(p[1][1])}`;
  for (let i = 1; i < p.length - 2; i++) {
    const [a, b, c, e] = [p[i - 1], p[i], p[i + 1], p[i + 2]];
    d += ` C${f(b[0] + (c[0] - a[0]) / 6)} ${f(b[1] + (c[1] - a[1]) / 6)} ${f(c[0] - (e[0] - b[0]) / 6)} ${f(c[1] - (e[1] - b[1]) / 6)} ${f(c[0])} ${f(c[1])}`;
  }
  return closed ? `${d}Z` : d;
}

export function bloomIn(scope) {
  scope?.querySelectorAll('.rose-bloom').forEach((e) => e.classList.add('is-bloom'));
}

function useBloom() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || el.closest('[data-bloom-manual]')) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('is-bloom'); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ---------------- bagian-bagian ---------------- */

/** Kepala mawar dilihat 3/4 dari atas: pusat spiral + cincin kelopak bertumpuk. */
export function RoseHead({ x = 0, y = 0, r = 16, rings = 4, seed = 1, fill = true }) {
  const rand = rng(seed);
  const SQ = 0.84;
  const P = (a, rad, dy = 0) => [Math.cos(a) * rad, Math.sin(a) * rad * SQ + dy];
  const sp = [];
  const a0 = rand() * 6.283;
  for (let i = 0; i <= 22; i++) {
    const t = i / 22;
    sp.push(P(a0 + t * 1.6 * 6.283, r * (0.04 + 0.24 * t)));
  }
  const ringEls = [];
  for (let k = 1; k < rings; k++) {
    const rk = r * (0.3 + 0.235 * k);
    const n = [0, 3, 4, 5, 6][k] ?? 6;
    const dy = r * 0.06 * k;
    const off = rand() * 6.283;
    const span = (6.283 / n) * 1.2;
    const paths = [];
    for (let j = 0; j < n; j++) {
      const a = off + (j * 6.283) / n + (rand() - 0.5) * 0.25;
      const m = 0.93 + rand() * 0.1;
      const pts = [];
      for (let s = 0; s <= 6; s++) {
        const t = s / 6;
        pts.push(P(a + span * t, rk * m * (0.74 + 0.26 * Math.sin(Math.PI * t)), dy));
      }
      paths.push(<path key={j} className="sprig-path" d={curve(pts)} />);
      // lipatan tepi kelopak luar
      if (k === rings - 1 && j % 2 === 0) {
        const lip = [0.28, 0.42, 0.58].map((t) => P(a + span * t, rk * m * 0.86, dy));
        paths.push(<path key={`l${j}`} className="sprig-path" d={curve(lip)} strokeOpacity=".6" />);
      }
    }
    ringEls.push(<g key={k} className="rose-ring" style={{ '--i': k }}>{paths}</g>);
  }
  const outer = r * (0.3 + 0.235 * (rings - 1));
  return (
    <g transform={`translate(${f(x)} ${f(y)})`}>
      {fill && <ellipse className="rose-fill" cx="0" cy={f(r * 0.1)} rx={f(outer)} ry={f(outer * SQ)} />}
      <g className="rose-ring" style={{ '--i': 0 }}><path className="sprig-path" d={curve(sp)} /></g>
      {ringEls}
    </g>
  );
}

const sepal = (L, s) =>
  `M0 0 Q${f(s * -0.38 * L)} ${f(-0.12 * L)} ${f(s * -0.36 * L)} ${f(-0.55 * L)} Q${f(s * -0.2 * L)} ${f(-0.25 * L)} 0 ${f(-0.05 * L)}`;

/** Kuncup: tetesan dengan satu lipatan kelopak + dua kelopak hijau (sepal). angle 0 = ke atas. */
export function RoseBud({ x = 0, y = 0, len = 14, angle = 0 }) {
  const L = len;
  return (
    <g transform={`translate(${f(x)} ${f(y)}) rotate(${f(angle)})`}>
      <g className="rose-ring" style={{ '--i': 1 }}>
        <path className="sprig-path rose-bud" d={curve([[0, -0.02 * L], [-0.3 * L, -0.34 * L], [-0.22 * L, -0.72 * L], [0, -L], [0.22 * L, -0.72 * L], [0.3 * L, -0.34 * L]], true)} />
        <path className="sprig-path" d={curve([[0.28 * L, -0.3 * L], [0.04 * L, -0.52 * L], [-0.08 * L, -0.82 * L], [0, -L]])} strokeOpacity=".7" />
      </g>
      <path className="sprig-path" d={sepal(L, 1)} />
      <path className="sprig-path" d={sepal(L, -1)} />
    </g>
  );
}

function leafletPath(k) {
  const n = 6, w = k * 0.24;
  const up = [], lo = [];
  for (let i = 0; i <= 2 * n; i++) {
    const t = i / (2 * n);
    let h = w * Math.sin(Math.PI * t ** 0.8);
    const tooth = i % 2 && i < 2 * n;
    if (tooth) h *= 1.14;
    const x = k * t + (tooth ? k * 0.025 : 0);
    up.push([x, -h]); lo.push([x, h]);
  }
  const seg = (arr) => arr.map(([a, b]) => `L${f(a)} ${f(b)}`).join(' ');
  return `M0 0 ${seg(up.slice(1))} ${seg(lo.reverse().slice(1))}Z`;
}

/** Satu helai daun mawar bergerigi + tulang daun, menghadap +x. */
export function Leaflet({ x = 0, y = 0, angle = 0, k = 14, fill = false }) {
  const veins = [0.3, 0.5, 0.7].flatMap((t) => {
    const h = k * 0.24 * Math.sin(Math.PI * t ** 0.8) * 0.75;
    return [`M${f(t * k)} 0 L${f((t + 0.13) * k)} ${f(-h)}`, `M${f(t * k)} 0 L${f((t + 0.13) * k)} ${f(h)}`];
  });
  return (
    <g transform={`translate(${f(x)} ${f(y)}) rotate(${f(angle)})`}>
      <path className="sprig-path" d={leafletPath(k)} fill={fill ? 'currentColor' : 'none'} fillOpacity={fill ? 0.12 : 0} />
      <path className="sprig-path" d={`M0 0 L${f(k * 0.9)} 0`} strokeOpacity=".6" />
      <path className="sprig-path" d={veins.join(' ')} strokeOpacity=".4" />
    </g>
  );
}

/** Daun majemuk khas mawar: satu ujung + sepasang samping. */
export function LeafCluster({ x = 0, y = 0, angle = 0, k = 14, fill }) {
  return (
    <g transform={`translate(${f(x)} ${f(y)}) rotate(${f(angle)})`}>
      <path className="sprig-path" d={`M0 0 L${f(k * 0.42)} 0`} />
      <Leaflet x={k * 0.42} k={k} fill={fill} />
      <Leaflet x={k * 0.18} angle={-50} k={k * 0.7} fill={fill} />
      <Leaflet x={k * 0.18} angle={50} k={k * 0.7} fill={fill} />
    </g>
  );
}

const Thorn = ({ x, y, angle, s = 3 }) => (
  <path
    className="sprig-path" transform={`translate(${f(x)} ${f(y)}) rotate(${f(angle)})`}
    d={`M${f(-s * 0.6)} 0 Q0 ${f(-s * 0.3)} ${f(s * 0.3)} ${f(-s * 1.1)} Q${f(s * 0.15)} ${f(-s * 0.3)} ${f(s * 0.6)} 0`}
  />
);

/** Gerombolan bunga baby's breath kecil di ujung tangkai tipis. */
function Breath({ from, to, rand }) {
  const [x, y] = to;
  const flor = Array.from({ length: 6 }, () => [x + (rand() - 0.5) * 9, y + (rand() - 0.5) * 9, 1.1 + rand() * 1]);
  return (
    <g>
      <path className="sprig-path" d={curve([from, [(from[0] + x) / 2 + 2, (from[1] + y) / 2 - 2], [x, y]])} strokeOpacity=".7" />
      {flor.map(([a, b, r], i) => (
        <g key={i}>
          <path className="sprig-path" d={`M${f(x)} ${f(y)} L${f(a)} ${f(b)}`} strokeOpacity=".45" />
          <circle className="sprig-path" cx={f(a)} cy={f(b)} r={f(r)} />
        </g>
      ))}
    </g>
  );
}

const svgProps = (width) => ({
  fill: 'none', stroke: 'currentColor', strokeWidth: width,
  strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
});

/* ---------------- 1. ranting mawar ---------------- */

export function RoseSprig({ length = 120, bend = 28, leafSize = 18, seed = 3, fillLeaves = false, width = 1.1, className = '', style }) {
  const ref = useBloom();
  const L = length;
  const rand = rng(seed);
  const R = leafSize * 0.9;
  const at = (t) => [2 * (1 - t) * t * bend, -L * t];
  const tan = (t) => Math.atan2(-L, 2 * bend * (1 - 2 * t)) / RAD;

  const parts = [<path key="stem" className="sprig-path" d={`M0 0 Q${bend} ${-L / 2} 0 ${-L}`} />];
  [[0.18, -1, 1], [0.52, -1, 0.9], [0.72, 1, 0.75]].forEach(([t, side, s], i) => {
    const [x, y] = at(t);
    parts.push(<LeafCluster key={`c${i}`} x={x} y={y} angle={tan(t) + side * (52 + rand() * 14)} k={leafSize * s} fill={fillLeaves} />);
  });
  // cabang kuncup
  {
    const t = 0.38, [x, y] = at(t);
    const dir = tan(t) + 42;
    const bl = L * 0.24;
    const [ex, ey] = [x + Math.cos(dir * RAD) * bl, y + Math.sin(dir * RAD) * bl];
    const [mx, my] = [x + Math.cos((dir + 12) * RAD) * bl * 0.5, y + Math.sin((dir + 12) * RAD) * bl * 0.5];
    parts.push(<path key="br" className="sprig-path" d={`M${f(x)} ${f(y)} Q${f(mx)} ${f(my)} ${f(ex)} ${f(ey)}`} />);
    parts.push(<RoseBud key="bud" x={ex} y={ey} len={R * 0.95} angle={dir - 8 + 90} />);
  }
  [0.1, 0.3, 0.45, 0.62, 0.86].forEach((t, i) => {
    const [x, y] = at(t);
    parts.push(<Thorn key={`t${i}`} x={x} y={y} angle={tan(t) + 90 + (i % 2 ? 70 : -70)} s={leafSize * 0.16} />);
  });
  parts.push(<path key="s1" className="sprig-path" d={sepal(R * 0.9, 1)} transform={`translate(0 ${-L}) rotate(200)`} />);
  parts.push(<path key="s2" className="sprig-path" d={sepal(R * 0.9, -1)} transform={`translate(0 ${-L}) rotate(160)`} />);
  parts.push(<RoseHead key="head" y={-L - R * 0.72} r={R} rings={4} seed={seed} />);

  const pad = leafSize * 1.5 + 6;
  const vb = `${f(Math.min(0, bend / 2) - pad)} ${f(-L - R * 1.75 - 6)} ${f(Math.abs(bend) / 2 + pad * 2)} ${f(L + R * 1.75 + 12)}`;
  return (
    // pembungkus HTML: goyang dianimasikan di sini (GPU); animasi di <svg> dikerjakan CPU
    <span className={`sprig rose-sway ${className}`} style={{ animationDelay: `${-rand() * 6}s`, ...style }}>
      <svg ref={ref} className="rose-sprig rose-bloom" viewBox={vb} {...svgProps(width)}>
        {parts}
      </svg>
    </span>
  );
}

/* ---------------- 2. rangkaian pojok ---------------- */

export function RoseCorner({ seed = 1, fillLeaves = true, width = 1, className = '', style }) {
  const ref = useBloom();
  const rand = rng(seed + 40);
  const main = pol(45, 44), half = pol(14, 70), bud = pol(77, 64);
  return (
    <span className={`rose-corner rose-sway rose-sway-slow ${className}`} style={{ animationDelay: `${-rand() * 6}s`, ...style }}>
    <svg ref={ref} className="rose-bloom" viewBox="-6 -6 112 112" {...svgProps(width)}>
      <g>
        {/* tangkai */}
        <path className="sprig-path" d={curve([[0, 0], pol(40, 16), pol(46, 31)])} />
        <path className="sprig-path" d={curve([[0, 0], pol(20, 30), pol(15, 61)])} />
        <path className="sprig-path" d={curve([[0, 0], pol(70, 30), bud])} />
        <Breath from={pol(32, 50)} to={pol(31, 88)} rand={rand} />
        <Breath from={pol(60, 52)} to={pol(59, 90)} rand={rand} />
        {/* daun */}
        <LeafCluster x={pol(22, 24)[0]} y={pol(22, 24)[1]} angle={-4} k={16} fill={fillLeaves} />
        <LeafCluster x={pol(68, 24)[0]} y={pol(68, 24)[1]} angle={94} k={16} fill={fillLeaves} />
        <Leaflet x={pol(30, 57)[0]} y={pol(30, 57)[1]} angle={18} k={13} fill={fillLeaves} />
        <Leaflet x={pol(61, 57)[0]} y={pol(61, 57)[1]} angle={72} k={13} fill={fillLeaves} />
        {/* bunga */}
        <RoseBud x={bud[0]} y={bud[1]} len={14} angle={77 + 90} />
        <RoseHead x={half[0]} y={half[1]} r={10} rings={3} seed={seed + 2} />
        <RoseHead x={main[0]} y={main[1]} r={16} rings={4} seed={seed + 1} />
      </g>
    </svg>
    </span>
  );
}

/* ---------------- 3. sulur mawar ---------------- */

export function RoseVine({ w = 320, h = 46, seed = 5, fillLeaves = false, width = 1, className = '', style }) {
  const ref = useBloom();
  const rand = rng(seed + 90);
  const mid = h / 2, A = h * 0.1, P = w / 3.6, ph = rand() * 3;
  const yAt = (x) => mid + A * Math.sin((x / P) * 6.283 + ph);
  const slope = (x) => Math.atan2(A * Math.cos((x / P) * 6.283 + ph) * (6.283 / P), 1) / RAD;
  const stem = [];
  for (let x = 0; x <= w; x += 8) stem.push([x, yAt(x)]);
  const roses = [[w * 0.5, 11, 4], [w * 0.2, 7.5, 3], [w * 0.8, 7.5, 3]];
  const buds = [[w * 0.34, -20], [w * 0.66, 200], [w * 0.06, 25], [w * 0.94, 160]];
  const leaves = [];
  let side = 1;
  for (let x = 10; x < w - 6; x += 15) {
    if (roses.some(([rx, r]) => Math.abs(x - rx) < r + 7) || buds.some(([bx]) => Math.abs(x - bx) < 6)) continue;
    side = -side;
    leaves.push(<Leaflet key={x} x={x} y={yAt(x)} angle={slope(x) + side * (48 + rand() * 14)} k={8 + rand() * 3} fill={fillLeaves} />);
  }
  return (
    <svg ref={ref} className={`rose-vine rose-bloom ${className}`} viewBox={`0 0 ${w} ${h}`} style={style} {...svgProps(width)}>
      <path className="sprig-path" d={curve(stem)} />
      {leaves}
      {buds.map(([x, a], i) => <RoseBud key={i} x={x} y={yAt(x)} len={9} angle={a} />)}
      {roses.map(([x, r, rings], i) => <RoseHead key={i} x={x} y={yAt(x) - 1} r={r} rings={rings} seed={seed + i} />)}
    </svg>
  );
}
