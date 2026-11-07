/**
 * Teks script yang "ditulis tinta": outline digambar dulu (stroke-dashoffset)
 * lalu isinya mengisi. Animasi dijalankan parent lewat selector `.ink-text text`.
 */
export default function InkText({ text, fontSize = 64, width = 360, height = 100, className = '', gradient = 'gold' /* gold | base | pale */, align = 'middle' }) {
  const gid = `ink-${gradient}`;
  const x = align === 'start' ? '2%' : align === 'end' ? '98%' : '50%';
  return (
    <svg className={`ink-text ${className}`} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={text}>
      <defs>
        <linearGradient id="ink-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--metal-deep)' }} />
          <stop offset=".5" style={{ stopColor: 'var(--metal-dark)' }} />
          <stop offset="1" style={{ stopColor: 'var(--metal-mid)' }} />
        </linearGradient>
        <linearGradient id="ink-pale" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--metal-light)' }} />
          <stop offset=".5" style={{ stopColor: 'var(--metal-soft)' }} />
          <stop offset="1" style={{ stopColor: 'var(--metal-pale)' }} />
        </linearGradient>
        <linearGradient id="ink-base" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: 'var(--base-800)' }} />
          <stop offset="1" style={{ stopColor: 'var(--base-700)' }} />
        </linearGradient>
      </defs>
      <text
        x={x} y="62%" textAnchor={align} dominantBaseline="middle"
        fontFamily="'Great Vibes', cursive" fontSize={fontSize}
        fill={`url(#${gid})`} stroke={`url(#${gid})`} strokeWidth="0.9"
        strokeDasharray="1400" strokeDashoffset="1400" fillOpacity="0"
      >
        {text}
      </text>
    </svg>
  );
}
