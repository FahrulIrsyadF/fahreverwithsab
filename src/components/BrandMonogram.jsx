/**
 * Logo mempelai (kaligrafi S & F) — satu sumber untuk semua tempat monogram.
 * File logo = tinta putih transparan (public/assets/logo.webp) dipakai sebagai MASK,
 * jadi warnanya bebas diatur lewat `color` (default: warna teks / currentColor).
 */
export const LOGO_SRC = '/assets/logo.webp';
export const LOGO_RATIO = 512 / 450; // lebar / tinggi
export const BRAND_TITLE = 'Sabrina & Fahrul';

export default function BrandMonogram({ height = 36, color = 'currentColor', className = '', style, decorative = false }) {
  const mask = `url(${LOGO_SRC}) center / contain no-repeat`;
  return (
    <span
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : BRAND_TITLE}
      aria-hidden={decorative || undefined}
      className={`brand-logo ${className}`}
      style={{
        display: 'inline-block', height, aspectRatio: LOGO_RATIO, background: color,
        WebkitMask: mask, mask, flexShrink: 0, ...style,
      }}
    />
  );
}
