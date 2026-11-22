// Renda di tepi tutup amplop (koordinat = viewBox tutup 340×140, ujung tutup di TIP).
// Semua bagian digabung ke beberapa <path> saja (ringan saat tutup diputar 3D).
const TIP = [170, 131];
const R = 14.5;      // jari-jari lengkung renda
const STEP = 28;     // jarak antar lengkung
const f = (n) => Math.round(n * 10) / 10;

const circle = ([x, y], r) => `M${f(x - r)} ${f(y)}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

function build() {
  const fills = [], strips = [], lines = [], teeth = [], dots = [], rings = [];
  const edges = [[0, 0], [340, 0]].map((P, side) => {
    const dx = TIP[0] - P[0], dy = TIP[1] - P[1], L = Math.hypot(dx, dy);
    const u = [dx / L, dy / L];
    const n = side === 0 ? [-u[1], u[0]] : [u[1], -u[0]]; // ke luar tutup (ke bawah); o < 0 = di dalam tutup
    const pt = (s, o) => [P[0] + u[0] * s + n[0] * o, P[1] + u[1] * s + n[1] * o];
    return { L, u, n, pt };
  });

  // pita dalam: garis tepi ganda + sisir halus, berhenti di garis tengah (ujung tutup)
  edges.forEach(({ L, u, n, pt }, side) => {
    const sMax = (o) => L - Math.abs(o) * 0.77;
    const sMin = (o) => Math.max(0, (n[1] * Math.abs(o)) / u[1]); // jangan melewati tepi atas amplop
    const q = [pt(sMin(17), -17), pt(sMax(17), -17), pt(L, 0), pt(0, 0)];
    if (side) q.reverse(); // arah putaran sama → tumpang tindih di ujung tidak menebal
    strips.push(`M${q.map(([x, y]) => `${f(x)} ${f(y)}`).join('L')}Z`);
    [-17, -14.5, -1.5].forEach((o) => {
      const a = pt(sMin(o), o), b = pt(sMax(o), o);
      lines.push(`M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}`);
    });
    for (let s = sMin(13) + 2; s < sMax(13); s += 2.3) {
      const a = pt(s, -13), b = pt(s, -4);
      teeth.push(`M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}`);
    }
  });

  // lengkung-lengkung renda (satu tepat di ujung, menghadap lurus ke bawah)
  const scallop = (c, u, n) => {
    const P = (a, r) => [c[0] - u[0] * Math.cos(a) * r + n[0] * Math.sin(a) * r, c[1] - u[1] * Math.cos(a) * r + n[1] * Math.sin(a) * r];
    const arc = (r) => Array.from({ length: 15 }, (_, i) => P((i / 14) * Math.PI, r));
    const poly = (pts) => `M${pts.map(([x, y]) => `${f(x)} ${f(y)}`).join('L')}`;
    fills.push(`${poly(arc(R))}Z`);
    lines.push(poly(arc(R)), poly(arc(R * 0.62)));
    for (let i = 1; i < 8; i++) dots.push(circle(P((i / 8) * Math.PI, R * 0.81), 0.75));
    for (let i = 1; i < 10; i++) rings.push(circle(P((i / 10) * Math.PI, R + 1.4), 1.25));
    rings.push(circle(P(Math.PI / 2, R * 0.3), 2));
  };
  scallop([TIP[0], TIP[1] - 1], [1, 0], [0, 1]);
  edges.forEach(({ L, u, n, pt }) => {
    for (let s = L - STEP; s >= -R; s -= STEP) scallop(pt(s, -1), u, n);
  });

  return { fill: fills.join(''), strip: strips.join(''), line: lines.join(''), teeth: teeth.join(''), dots: dots.join(''), rings: rings.join('') };
}

const LACE = build();

export default function FlapLace() {
  return (
    <g className="flap-lace" fill="none" strokeLinecap="round" strokeLinejoin="round" clipPath="url(#flap-lace-clip)">
      {/* renda penuh sampai sudut atas, dipotong rapi di tepi amplop */}
      <clipPath id="flap-lace-clip"><rect x="0" y="0" width="340" height="230" /></clipPath>
      <path d={LACE.strip} className="lace-fill" />
      <path d={LACE.fill} className="lace-fill lace-fill-sc" />
      <path d={LACE.teeth} className="lace-thread" strokeWidth=".55" />
      <path d={LACE.line} className="lace-thread" strokeWidth=".8" />
      <path d={LACE.rings} className="lace-thread" strokeWidth=".6" />
      <path d={LACE.dots} className="lace-dot" />
    </g>
  );
}
