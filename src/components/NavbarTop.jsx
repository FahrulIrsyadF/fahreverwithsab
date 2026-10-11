import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function NavbarTop({ isPlaying, onToggleMusic }) {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-ivory/85 backdrop-blur-md border-b border-gold/20 shadow-xs">
      <div className="flex justify-between items-center w-full px-5 max-w-lg mx-auto h-14">
        {/* Left Leaf / Botanical Icon */}
        <div className="text-emerald flex items-center justify-center">
          <svg
            className="w-5 h-5"
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

        {/* Center Monogram F & S */}
        <div className="font-headline text-lg sm:text-xl text-emerald-deep tracking-widest font-semibold select-none">
          F <span className="font-headline italic text-gold font-normal">&amp;</span> S
        </div>

        {/* Right Audio Controller Button */}
        <button
          type="button"
          onClick={onToggleMusic}
          aria-label="Toggle Audio"
          className="text-emerald hover:text-gold transition-colors duration-200 active:scale-90 flex items-center justify-center p-1 rounded-full cursor-pointer"
          title={isPlaying ? 'Hentikan Musik' : 'Putar Musik'}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-emerald animate-pulse" />
          ) : (
            <VolumeX className="w-5 h-5 text-charcoal-muted" />
          )}
        </button>
      </div>
    </header>
  );
}
