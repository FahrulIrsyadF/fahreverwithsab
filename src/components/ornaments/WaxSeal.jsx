import { useId, useLayoutEffect, useRef, useState } from 'react';
import { paletteColor } from '../../lib/palette';
import './wax-seal.css';

/**
 * Segel lilin dengan efek timbul 3D (feSpecularLighting). Prop `half` memotong segel
 * sepanjang retakan zig-zag agar dua belahannya bisa dianimasikan terpisah.
 *
 * PERFORMA: filter pencahayaan SVG sangat berat di WebKit (iPhone) dan dihitung ulang
 * setiap kali segel di-skala / di sekitarnya ada yang berubah. Karena itu badan segel
 * (lilin + emboss + bayangan) DIGAMBAR SEKALI ke PNG lalu ditampilkan sebagai <img>.
 * Monogram tetap SVG hidup (font web tidak bisa dipakai di SVG-sebagai-gambar) dengan
 * emboss murah: tiga lapis teks bergeser, tanpa filter.
 */
const CRACK = [[104, 0], [96, 30], [107, 58], [93, 86], [106, 112], [95, 140], [104, 170], [98, 200]];
export const CRACK_POINTS = CRACK.map((p) => p.join(',')).join(' ');

function blobPath() {
  const pts = [];
  for (let i = 0; i < 96; i++) {
    const a = (i / 96) * Math.PI * 2;
    const r = 86 + 4.5 * Math.sin(5 * a + 1.3) + 2.6 * Math.sin(11 * a + 0.4) + 1.6 * Math.sin(19 * a + 2.1);
    pts.push(`${(100 + Math.cos(a) * r).toFixed(1)} ${(100 + Math.sin(a) * r).toFixed(1)}`);
  }
  return `M${pts.join(' L')}Z`;
}
const BLOB = blobPath();
const sc = (v) => ({ stopColor: `var(--${v})` });

// cache PNG per (belahan, ukuran) — dipakai ulang saat replay / pindah halaman
const cache = new Map();
async function rasterize(svg, size) {
  const clone = svg.cloneNode(true);
  clone.removeAttribute('style'); // sumbernya disembunyikan (visibility) — gambarnya jangan ikut
  clone.setAttribute('width', size); clone.setAttribute('height', size);
  const xml = new XMLSerializer().serializeToString(clone).replace(/var\(--([\w-]+)\)/g, (_, k) => paletteColor(k) || '#000');
  const img = new Image();
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)}`;
  await img.decode();
  const c = document.createElement('canvas');
  c.width = c.height = size;
  c.getContext('2d').drawImage(img, 0, 0, size, size);
  const blob = await new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error('toBlob'))), 'image/png'));
  return URL.createObjectURL(blob);
}

export default function WaxSeal({ monogram = 'F&S', half, className = '', style }) {
  const id = useId().replace(/:/g, '');
  const wrap = useRef(null);
  const body = useRef(null);
  const [img, setImg] = useState(null); // url PNG | 'svg' (gagal → pakai SVG hidup)
  const clip =
    half === 'left' ? `0,0 ${CRACK_POINTS} 0,200` :
    half === 'right' ? `200,0 ${CRACK_POINTS} 200,200` : null;

  useLayoutEffect(() => {
    let alive = true;
    const w = wrap.current.offsetWidth || 120;
    const size = Math.min(1024, Math.ceil((w * Math.min(devicePixelRatio || 1, 3)) / 64) * 64);
    const key = `${half || 'full'}|${size}`;
    if (cache.has(key)) { setImg(cache.get(key)); return; }
    setImg(null);
    rasterize(body.current, size)
      .then((url) => { cache.set(key, url); if (alive) setImg(url); })
      .catch(() => alive && setImg('svg'));
    return () => { alive = false; };
  }, [half]);

  const clipAttr = clip ? `url(#clip${id})` : undefined;
  const ready = img && img !== 'svg';
  return (
    <span ref={wrap} className={`wax-seal ${className}`} style={style} aria-hidden="true">
      {ready ? (
        <img src={img} alt="" draggable="false" />
      ) : (
        // sumber gambar; disembunyikan sampai PNG siap agar filter beratnya tidak dicat
        <svg ref={body} viewBox="0 0 200 200" style={{ visibility: img === 'svg' ? 'visible' : 'hidden' }}>
          <defs>
            <radialGradient id={`wax${id}`} cx="38%" cy="32%" r="75%">
              <stop offset="0" style={sc('wax-hi')} />
              <stop offset=".5" style={sc('wax')} />
              <stop offset="1" style={sc('wax-lo')} />
            </radialGradient>
            <linearGradient id={`gold${id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" style={sc('metal-light')} />
              <stop offset=".45" style={sc('metal-bright')} />
              <stop offset="1" style={sc('metal-dark')} />
            </linearGradient>
            <filter id={`emboss${id}`} x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2.6" result="blur" />
              <feSpecularLighting in="blur" surfaceScale="4" specularConstant=".7" specularExponent="34" style={{ lightingColor: 'var(--wax-light)' }} result="spec">
                <fePointLight x="40" y="20" z="160" />
              </feSpecularLighting>
              <feComposite in="spec" in2="SourceAlpha" operator="in" result="specIn" />
              <feComposite in="SourceGraphic" in2="specIn" operator="arithmetic" k1="0" k2="1" k3=".42" k4="0" />
            </filter>
            <filter id={`shadow${id}`} x="-20%" y="-20%" width="140%" height="150%">
              <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000" floodOpacity=".4" />
            </filter>
            {clip && <clipPath id={`clip${id}`}><polygon points={clip} /></clipPath>}
          </defs>
          <g clipPath={clipAttr} filter={`url(#shadow${id})`}>
            <g filter={`url(#emboss${id})`}>
              <path d={BLOB} fill={`url(#wax${id})`} />
              <circle cx="100" cy="100" r="60" fill="none" style={{ stroke: 'var(--wax-rim)' }} strokeWidth="7" />
              <circle cx="100" cy="100" r="54" style={{ fill: 'var(--wax-core)' }} />
            </g>
            <circle cx="100" cy="100" r="49" fill="none" stroke={`url(#gold${id})`} strokeWidth="1.2" strokeDasharray="2 3.2" opacity=".85" />
          </g>
        </svg>
      )}
      {/* monogram: emboss murah tanpa filter (bayangan gelap + kilap terang + emas) */}
      <svg viewBox="0 0 200 200" className="wax-seal-mono">
        <defs>
          <linearGradient id={`mono${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={sc('metal-light')} />
            <stop offset=".45" style={sc('metal-bright')} />
            <stop offset="1" style={sc('metal-dark')} />
          </linearGradient>
          {clip && <clipPath id={`mclip${id}`}><polygon points={clip} /></clipPath>}
        </defs>
        <g clipPath={clip ? `url(#mclip${id})` : undefined} fontFamily="'Playfair Display', serif" fontSize="40" fontStyle="italic" textAnchor="middle">
          <text x="100" y="114.6" style={{ fill: 'var(--wax-lo)' }} opacity=".85">{monogram}</text>
          <text x="100" y="112.2" style={{ fill: 'var(--wax-light)' }} opacity=".35">{monogram}</text>
          <text x="100" y="113" fill={`url(#mono${id})`}>{monogram}</text>
        </g>
      </svg>
    </span>
  );
}
