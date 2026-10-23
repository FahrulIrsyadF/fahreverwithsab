import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import BrandMonogram from './BrandMonogram';

export default function NavbarTop({ isPlaying, onToggleMusic }) {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-ivory/90 backdrop-blur-md border-b border-aqua/20 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center w-full px-5 max-w-lg mx-auto h-14">
        {/* Left Leaf / Botanical Icon */}
        <div className="text-aqua-teal flex items-center justify-center p-1 rounded-full bg-aqua-tint/60 border border-aqua/30">
          <svg
            className="w-4 h-4 text-aqua-teal"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Daun tengah (vertikal) */}
            <path d="M12 3.5c-3.2 3.5-3.2 7 0 10.5 3.2-3.5 3.2-7 0-10.5z" />
            {/* Kelopak kiri & kanan bagian dalam serta batang tengah */}
            <path d="M4 10.5c2.8-1.5 6-.3 8 3.5v6" />
            <path d="M20 10.5c-2.8-1.5-6-.3-8 3.5" />
            {/* Lengkungan kelopak bawah (mangkuk luar) */}
            <path d="M4 10.5C4.8 16 8 20 12 20s7.2-4 8-9.5" />
          </svg>
        </div>

        {/* Center Monogram F & S / Logo */}
        <BrandMonogram size="md" variant="emerald" />

        {/* Right Audio Controller Button */}
        <button
          type="button"
          onClick={onToggleMusic}
          aria-label="Toggle Audio"
          className="text-emerald hover:text-aqua transition-all duration-200 active:scale-90 flex items-center justify-center p-2 rounded-full cursor-pointer bg-white/60 border border-gold/30 hover:border-aqua/50"
          title={isPlaying ? 'Hentikan Musik' : 'Putar Musik'}
        >
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-emerald animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-charcoal-muted" />
          )}
        </button>
      </div>
    </header>
  );
}
