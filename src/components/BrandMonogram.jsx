import React from 'react';

/**
 * Single Source of Truth untuk Monogram / Logo Mempelai.
 * Saat ini me-render tipografi Playfair Display F & S.
 * Ketika file logo resmi sudah selesai dibuat, cukup ubah `logoSrc` di bawah ini
 * (misal: '/assets/logo.svg' atau '/assets/logo.png').
 */
export const BRAND_CONFIG = {
  logoSrc: null, // Ubah ke path file logo jika sudah ada (contoh: '/assets/logo.svg')
  monogramText: {
    first: 'F',
    ampersand: '&',
    second: 'S',
  },
  title: 'Fahrul & Sabrina'
};

export default function BrandMonogram({
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  variant = 'gold', // 'gold' | 'emerald' | 'ivory'
  className = '',
  showAmpersand = true
}) {
  if (BRAND_CONFIG.logoSrc) {
    const sizeClasses = {
      sm: 'h-6 w-auto',
      md: 'h-9 w-auto',
      lg: 'h-14 w-auto',
      xl: 'h-20 w-auto',
    };
    return (
      <img
        src={BRAND_CONFIG.logoSrc}
        alt={BRAND_CONFIG.title}
        className={`object-contain select-none pointer-events-none ${sizeClasses[size] || sizeClasses.md} ${className}`}
      />
    );
  }

  // Render Typography Monogram F & S
  const sizeMap = {
    sm: {
      container: 'text-sm tracking-wider',
      ampersand: 'text-xs mx-0.5',
    },
    md: {
      container: 'text-lg sm:text-xl tracking-widest',
      ampersand: 'text-sm sm:text-base mx-1',
    },
    lg: {
      container: 'text-2xl sm:text-3xl tracking-widest',
      ampersand: 'text-lg sm:text-xl mx-1.5',
    },
    xl: {
      container: 'text-4xl sm:text-5xl tracking-widest',
      ampersand: 'text-2xl sm:text-3xl mx-2',
    },
  };

  const variantMap = {
    gold: {
      letters: 'text-gold-light',
      ampersand: 'text-gold italic',
    },
    emerald: {
      letters: 'text-emerald-deep',
      ampersand: 'text-gold italic',
    },
    ivory: {
      letters: 'text-ivory',
      ampersand: 'text-aqua-soft italic',
    },
  };

  const selectedSize = sizeMap[size] || sizeMap.md;
  const selectedVariant = variantMap[variant] || variantMap.gold;

  return (
    <div
      className={`font-headline font-semibold inline-flex items-center justify-center select-none ${selectedSize.container} ${selectedVariant.letters} ${className}`}
      aria-label={BRAND_CONFIG.title}
    >
      <span>{BRAND_CONFIG.monogramText.first}</span>
      {showAmpersand && (
        <span className={`font-headline font-normal ${selectedSize.ampersand} ${selectedVariant.ampersand}`}>
          {BRAND_CONFIG.monogramText.ampersand}
        </span>
      )}
      <span>{BRAND_CONFIG.monogramText.second}</span>
    </div>
  );
}
