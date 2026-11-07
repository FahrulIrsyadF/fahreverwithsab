/**
 * Batas organik antar-section. Diletakkan di TEPI ATAS section berikutnya,
 * diisi warna section berikutnya sehingga "menggigit" ke section sebelumnya.
 *  - torn:   kertas sobek (acak tapi stabil per seed)
 *  - lace:   renda lengkung (scallop) dengan titik emas
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

function lacePath(h, count) {
  const w = 1000 / count;
  let d = `M0 ${h}`;
  for (let i = 0; i < count; i++) {
    d += ` L${i * w} ${h * 0.55} A${w / 2} ${h * 0.5} 0 0 1 ${(i + 1) * w} ${h * 0.55}`;
  }
  return `${d} L1000 ${h} Z`;
}

export default function Seam({ variant = 'torn', color = 'var(--paper)', seed = 7, height = 46, gold = true, className = '' }) {
  const count = 14;
  let shape;
  if (variant === 'lace') shape = lacePath(height, count);
  else if (variant === 'arch') shape = `M0 ${height} L0 ${height * 0.98} Q500 ${-height * 0.95} 1000 ${height * 0.98} L1000 ${height} Z`;
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
      {variant === 'lace' && gold && (
        // titik emas di HTML agar tetap bulat (SVG di atas di-stretch)
        <div className="seam-dots" style={{ top: height * 0.32 }}>
          {Array.from({ length: count }, (_, i) => <span key={i} />)}
        </div>
      )}
    </div>
  );
}
