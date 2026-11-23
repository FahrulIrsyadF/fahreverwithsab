import { useId } from 'react';

/**
 * Batas organik antar-section. Diletakkan di TEPI ATAS section berikutnya,
 * diisi warna section berikutnya sehingga "menggigit" ke section sebelumnya.
 *  - torn:   kertas sobek (acak tapi stabil per seed)
 *  - lace:   renda lengkung lebar berlubang (motif tetap, diulang mendatar)
 *  - arch:   satu lengkung besar seperti jendela masjid / gerbang
 */
function rng(seed) {
  let s = seed % 2147483647 || 1;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

function tornPath(seed, h) {
  const r = rng(seed);
  let d = `M0 ${h}`;
  let x = 0;
  while (x < 1000) {
    // langkah pendek + amplitudo kecil = sobekan serat kertas, bukan gerigi
    x = Math.min(1000, x + 5 + r() * 9);
    const y = h * (0.5 + (r() - 0.5) * 0.22) + Math.sin(x / 70) * h * 0.18 + Math.sin(x / 23) * h * 0.06;
    d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return `${d} L1000 ${h} Z`;
}

/* Renda: motif ukuran tetap (tidak ikut di-stretch) diulang mendatar lewat <pattern>.
   Satu motif = lengkung lebar-pendek berlubang (lubang = latar section sebelumnya terlihat) + pita berlubang. */
const LW = 44, LH = 30, BAND = 18; // lebar motif, tinggi total, garis atas pita
const ring = (cx, cy, r) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const LACE_HOLES = [
  ring(22, 11.5, 2.5),
  ...[160, 128, 52, 20].map((a) => ring(+(22 + 15 * Math.cos(a * Math.PI / 180)).toFixed(1), +(BAND - 11 * Math.sin(a * Math.PI / 180)).toFixed(1), 1.15)),
  ring(11, 24, 1.6), ring(33, 24, 1.6),
].join('');
const LACE_TILE = `M0 ${LH}L0 ${BAND}A${LW / 2} 16 0 0 1 ${LW} ${BAND}L${LW} ${LH}Z${LACE_HOLES}`;
const rad = (a) => (a * Math.PI) / 180;
const onArc = (a, rx, ry) => [+(22 + rx * Math.cos(rad(a))).toFixed(2), +(BAND - ry * Math.sin(rad(a))).toFixed(2)];
// bintil kecil (picot) di sepanjang tepi lengkung
const LACE_PICOTS = Array.from({ length: 15 }, (_, i) => { const [x, y] = onArc(6 + i * 12, 22.3, 16.3); return ring(x, y, 1.25); }).join('');
// benang: lengkung dalam + garis pita
const LACE_THREAD = `M4 ${BAND}A18 12.5 0 0 1 40 ${BAND}M0 ${BAND + 1.5}H${LW}M0 ${LH - 3}H${LW}`;

function Lace({ color, gold }) {
  const id = `lace-${useId().replace(/:/g, '')}`;
  return (
    <svg width="100%" height={LH}>
      <defs>
        <pattern id={id} width={LW} height={LH} patternUnits="userSpaceOnUse">
          <path d={LACE_TILE} fillRule="evenodd" style={{ fill: color }} />
          <path d={LACE_PICOTS} style={{ fill: color }} />
          <path d={LACE_THREAD} fill="none" strokeWidth=".7" style={{ stroke: 'var(--metal-pale)' }} strokeOpacity=".35" />
          {gold && <circle cx="22" cy="11.5" r="3.7" fill="none" strokeWidth=".9" style={{ stroke: 'var(--metal-bright)' }} strokeOpacity=".85" />}
          {gold && <circle cx="22" cy="3.2" r="1" style={{ fill: 'var(--metal-bright)' }} />}
        </pattern>
      </defs>
      <rect width="100%" height={LH} fill={`url(#${id})`} />
      {/* dasar pita padat: tidak ada garis sambungan antar-motif di tepi bawah */}
      <rect y={LH - 4} width="100%" height="4" style={{ fill: color }} />
    </svg>
  );
}

export default function Seam({ variant = 'torn', color = 'var(--paper)', seed = 7, height = 46, gold = true, className = '' }) {
  if (variant === 'lace') {
    return (
      <div className={`seam seam-lace ${className}`} style={{ height: LH }} aria-hidden="true">
        <Lace color={color} gold={gold} />
      </div>
    );
  }
  let shape;
  if (variant === 'arch') shape = `M0 ${height} L0 ${height * 0.98} Q500 ${-height * 0.95} 1000 ${height * 0.98} L1000 ${height} Z`;
  else shape = tornPath(seed, height);

  return (
    <div className={`seam seam-${variant} ${className}`} style={{ height }} aria-hidden="true">
      <svg viewBox={`0 0 1000 ${height}`} preserveAspectRatio="none">
        {variant === 'torn' && (
          // serat kertas putih yang terlihat di tepi sobekan
          <path d={tornPath(seed, height)} transform="translate(0 -3)" opacity=".55" style={{ fill: 'var(--paper-hi)' }} />
        )}
        <path d={shape} style={{ fill: color }} />
      </svg>
    </div>
  );
}
