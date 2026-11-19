import { Volume2, VolumeX } from 'lucide-react';
import BrandMonogram from './BrandMonogram';
import { WEDDING } from '../data/wedding';

export default function NavbarTop({ isPlaying, onToggleMusic }) {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-paper-hi/95 border-b border-metal/30 shadow-sm">
      <div className="relative flex justify-between items-center w-full px-5 max-w-lg mx-auto h-14">
        <span className="text-[9px] font-bold tracking-[0.2em] text-accent">{WEDDING.dateCompact}</span>

        {/* monogram di tengah (nanti diganti logo) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <BrandMonogram size="md" variant="emerald" />
        </div>

        {onToggleMusic && (
        <button
          type="button"
          onClick={onToggleMusic}
          aria-label={isPlaying ? 'Hentikan musik' : 'Putar musik'}
          title={isPlaying ? 'Hentikan Musik' : 'Putar Musik'}
          className="flex items-center justify-center p-2 rounded-full cursor-pointer bg-paper border border-metal/40 hover:border-accent/50 transition-colors active:scale-90"
        >
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-base-800 animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-muted" />
          )}
        </button>
        )}
        {!onToggleMusic && <span className="w-8" aria-hidden="true" />}
      </div>
    </header>
  );
}
