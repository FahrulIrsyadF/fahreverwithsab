// Bentuk tutup amplop + renda di tepinya (koordinat = viewBox tutup 340×140).
// Ujung tutup tetap runcing (sedikit membulat di bawah segel); yang dibuat lembut adalah
// SUDUT tutup di tepi kiri/kanan amplop: tepi tutup turun sebentar di sisi amplop lalu
// melengkung masuk ke garis miring (seperti amplop kertas asli).
// Semua bagian renda digabung ke beberapa <path> saja (ringan saat tutup diputar 3D).
const W = 340;
const APEX = [W / 2, 139];  // titik ujung semu (dibulatkan sedikit)
const SIDE_Y = 26;          // titik semu tempat garis miring bertemu sisi amplop
const SIDE_R = 36;          // jari-jari lengkung di sisi amplop
const TIP_K = 16;           // panjang pembulatan ujung
export const CORNER_R = 6;  // sudut amplop sedikit membulat
const R = 14.5;      // jari-jari lengkung renda
const STEP = 28;     // jarak antar lengkung
const f = (n) => Math.round(n * 10) / 10;
const circle = ([x, y], r) => `M${f(x - r)} ${f(y)}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

/** Tepi bawah tutup kiri→kanan sebagai segmen: ['L', p] | ['Q', c, p], mulai dari `start`. */
function edge() {
  const dx = APEX[0], dy = APEX[1] - SIDE_Y, L = Math.hypot(dx, dy);
  const u = [dx / L, dy / L];
  const t = SIDE_R * Math.tan(Math.acos(u[1]) / 2); // jarak titik singgung dari sudut semu
  const V = [0, SIDE_Y];
  const a = [0, SIDE_Y - t], b = [u[0] * t, SIDE_Y + u[1] * t];
  const c = [APEX[0] - u[0] * TIP_K, APEX[1] - u[1] * TIP_K];
  const m = (p) => [W - p[0], p[1]];
  return {
    start: [0, -30],
    segs: [['L', a], ['Q', V, b], ['L', c], ['Q', APEX, m(c)], ['L', m(b)], ['Q', m(V), m(a)], ['L', [W, -30]]],
  };
}
const E = edge();
const pathOf = (mapY = (y) => y) => {
  const P = ([x, y]) => `${f(x)} ${f(mapY(y))}`;
  // path tutup: mulai dari sudut atas kiri, sisi atas, lalu tepi bawah dari kanan ke kiri
  const segs = E.segs.slice(0, -1); // tanpa perpanjangan ke atas
  let d = `M0 ${f(mapY(0))}L${W} ${f(mapY(0))}`;
  // telusuri terbalik (kanan → kiri)
  const pts = [E.start, ...segs.map((s) => s[s.length - 1])];
  d += `L${P(pts[segs.length])}`;
  for (let i = segs.length - 1; i >= 1; i--) {
    const s = segs[i], to = pts[i];
    d += s[0] === 'L' ? `L${P(to)}` : `Q${P(s[1])} ${P(to)}`;
  }
  return `${d}Z`;
};
/** Path tutup amplop (sisi luar). */
export const FLAP_PATH = pathOf();
/** Path sisi dalam tutup (dicerminkan vertikal, terlihat setelah tutup terbuka 180°). */
export const FLAP_INNER_PATH = pathOf((y) => 140 - y);

/** Titik rapat di sepanjang tepi kiri→kanan (diperpanjang ke atas, nanti dipotong clip). */
function outline() {
  const pts = [E.start];
  let cur = E.start;
  for (const s of E.segs) {
    const to = s[s.length - 1];
    if (s[0] === 'L') {
      const n = Math.max(1, Math.ceil(Math.hypot(to[0] - cur[0], to[1] - cur[1])));
      for (let i = 1; i <= n; i++) pts.push([cur[0] + ((to[0] - cur[0]) * i) / n, cur[1] + ((to[1] - cur[1]) * i) / n]);
    } else {
      const c = s[1];
      for (let i = 1; i <= 40; i++) {
        const k = i / 40, q = 1 - k;
        pts.push([q * q * cur[0] + 2 * q * k * c[0] + k * k * to[0], q * q * cur[1] + 2 * q * k * c[1] + k * k * to[1]]);
      }
    }
    cur = to;
  }
  return pts;
}

/** Titik + arah garis + normal ke luar tutup tiap `step` satuan (symmetric: mulai dari ujung tengah). */
function samples(pts, step, symmetric = false) {
  const len = [0];
  for (let i = 1; i < pts.length; i++) len.push(len[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = len[len.length - 1];
  let j = 1;
  const at = (t) => {
    if (len[j - 1] > t) j = 1;
    while (j < len.length - 1 && len[j] < t) j++;
    const [x0, y0] = pts[j - 1], [x1, y1] = pts[j];
    const k = (t - len[j - 1]) / (len[j] - len[j - 1] || 1);
    const l = Math.hypot(x1 - x0, y1 - y0) || 1;
    const u = [(x1 - x0) / l, (y1 - y0) / l];
    return { p: [x0 + (x1 - x0) * k, y0 + (y1 - y0) * k], u, n: [-u[1], u[0]] };
  };
  const out = [];
  if (symmetric) {
    const mid = total / 2;
    out.push(at(mid));
    for (let t = step; mid - t >= 0; t += step) out.push(at(mid - t), at(mid + t));
  } else for (let t = 0; t <= total; t += step) out.push(at(t));
  return out;
}

function build() {
  const base = outline();
  const off = ({ p, n }, o) => [p[0] + n[0] * o, p[1] + n[1] * o];
  const poly = (arr) => `M${arr.map(([x, y]) => `${f(x)} ${f(y)}`).join('L')}`;
  const dense = samples(base, 2);

  // pita dalam: garis tepi ganda + sisir halus
  const strip = `${poly(dense.map((s) => off(s, 0)))}L${poly(dense.map((s) => off(s, -17)).reverse()).slice(1)}Z`;
  const lines = [-17, -14.5, -1.5].map((o) => poly(dense.map((s) => off(s, o))));
  const teeth = samples(base, 2.3).map((s) => { const a = off(s, -13), b = off(s, -4); return `M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}`; });

  // lengkung-lengkung renda (satu tepat di ujung tengah, menghadap lurus ke bawah)
  const fills = [], dots = [], rings = [];
  samples(base, STEP, true).forEach((s) => {
    const c = off(s, -1), { u, n } = s;
    const P = (a, r) => [c[0] - u[0] * Math.cos(a) * r + n[0] * Math.sin(a) * r, c[1] - u[1] * Math.cos(a) * r + n[1] * Math.sin(a) * r];
    const arc = (r) => Array.from({ length: 15 }, (_, i) => P((i / 14) * Math.PI, r));
    fills.push(`${poly(arc(R))}Z`);
    lines.push(poly(arc(R)), poly(arc(R * 0.62)));
    for (let i = 1; i < 8; i++) dots.push(circle(P((i / 8) * Math.PI, R * 0.81), 0.75));
    for (let i = 1; i < 10; i++) rings.push(circle(P((i / 10) * Math.PI, R + 1.4), 1.25));
    rings.push(circle(P(Math.PI / 2, R * 0.3), 2));
  });

  return { fill: fills.join(''), strip, line: lines.join(''), teeth: teeth.join(''), dots: dots.join(''), rings: rings.join('') };
}

const LACE = build();

/** clipPath persegi bersudut bulat: sudut atas amplop tidak lancip. */
export function FlapClip({ id, inner = false }) {
  return (
    <clipPath id={id}>
      <rect x="0" y={inner ? -90 : 0} width={W} height="230" rx={CORNER_R} />
    </clipPath>
  );
}

export default function FlapLace({ clip }) {
  return (
    <g className="flap-lace" fill="none" strokeLinecap="round" strokeLinejoin="round" clipPath={`url(#${clip})`}>
      <path d={LACE.strip} className="lace-fill" />
      <path d={LACE.fill} className="lace-fill lace-fill-sc" />
      <path d={LACE.teeth} className="lace-thread" strokeWidth=".55" />
      <path d={LACE.line} className="lace-thread" strokeWidth=".8" />
      <path d={LACE.rings} className="lace-thread" strokeWidth=".6" />
      <path d={LACE.dots} className="lace-dot" />
    </g>
  );
}
