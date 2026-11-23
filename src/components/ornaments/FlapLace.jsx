// Bentuk tutup amplop + renda di tepinya (koordinat = viewBox tutup 340×140).
// Ujung tutup tidak runcing: lengkung besar (jari-jari TIP_R) yang bagian bawahnya tertutup segel.
// Semua bagian renda digabung ke beberapa <path> saja (ringan saat tutup diputar 3D).
const W = 340;
const TIP_R = 64;       // jari-jari lengkung ujung tutup
const TIP_BOTTOM = 133; // titik terbawah lengkung (≈ pusat segel)
export const CORNER_R = 12; // sudut amplop membulat
const R = 14.5;      // jari-jari lengkung renda
const STEP = 28;     // jarak antar lengkung
const f = (n) => Math.round(n * 10) / 10;
const circle = ([x, y], r) => `M${f(x - r)} ${f(y)}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

/** Geometri tepi bawah tutup: garis lurus dari sudut, lengkung bulat di tengah. */
function geometry() {
  // cari titik sudut semu V (perpotongan sisi dari (0,0) & (340,0)) agar dasar lengkung tepat di TIP_BOTTOM
  let vy = TIP_BOTTOM + 20;
  for (let i = 0; i < 40; i++) {
    const s = (W / 2) / Math.hypot(W / 2, vy); // sin setengah sudut ujung
    vy = TIP_BOTTOM - TIP_R + TIP_R / s;
  }
  const L = Math.hypot(W / 2, vy), sinT = (W / 2) / L, tanT = (W / 2) / vy;
  const d = TIP_R / tanT; // jarak titik singgung dari V
  const ux = (W / 2) / L, uy = vy / L; // arah sisi kiri (dari sudut ke V)
  const tl = [W / 2 - ux * d, vy - uy * d], tr = [W / 2 + ux * d, vy - uy * d];
  const cy = vy - TIP_R / sinT;
  return { ux, uy, tl, tr, cy, a0: Math.atan2(tl[1] - cy, tl[0] - W / 2), lenLine: L - d };
}
const G = geometry();

/** Path tutup amplop (sisi luar). */
export const FLAP_PATH = `M0 0 L${W} 0 L${f(G.tr[0])} ${f(G.tr[1])} A${TIP_R} ${TIP_R} 0 0 1 ${f(G.tl[0])} ${f(G.tl[1])} Z`;
/** Path sisi dalam tutup (dicerminkan vertikal, terlihat setelah tutup terbuka 180°). */
export const FLAP_INNER_PATH = `M0 140 L${W} 140 L${f(G.tr[0])} ${f(140 - G.tr[1])} A${TIP_R} ${TIP_R} 0 0 0 ${f(G.tl[0])} ${f(140 - G.tl[1])} Z`;

/** Titik rapat di sepanjang tepi kiri→kanan (diperpanjang melewati sudut, nanti dipotong clip). */
function outline() {
  const pts = [];
  const ext = 40;
  for (let s = -ext; s <= G.lenLine; s += 1) pts.push([G.ux * s, G.uy * s]);
  const a1 = Math.PI - G.a0; // sudut titik singgung kanan
  for (let i = 1; i < 60; i++) {
    const a = G.a0 + ((a1 - G.a0) * i) / 60;
    pts.push([W / 2 + TIP_R * Math.cos(a), G.cy + TIP_R * Math.sin(a)]);
  }
  for (let s = G.lenLine; s >= -ext; s -= 1) pts.push([W - G.ux * s, G.uy * s]);
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
