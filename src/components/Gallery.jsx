import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn } from 'lucide-react';
import SectionSeam from './ornaments/SectionSeam';
import { RoseVine } from './ornaments/Roses';
import { GALLERY } from '../data/wedding';

/**
 * Galeri — sengaja TIDAK memakai demo polaroid (belum cocok); grid + lightbox lama dipertahankan,
 * hanya diselaraskan dengan palet, Seam, dan reveal GSAP.
 */
export default function Gallery() {
  const [activeImage, setActiveImage] = useState(null);

  // Tutup lightbox dengan tombol Escape
  useEffect(() => {
    if (!activeImage) return;
    const onKey = (e) => e.key === 'Escape' && setActiveImage(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeImage]);

  return (
    <section className="sec sec-light pt-20 pb-20 px-5" id="galeri">
      <SectionSeam into="light" side="left" seed={67} />

      <header className="sec-head" data-reveal>
        <p className="eyebrow">Momen Bahagia</p>
        <h2>Galeri Foto</h2>
        <RoseVine className="sec-rule" w={220} h={40} seed={71} />
      </header>

      <div className="sec-inner grid grid-cols-2 gap-3.5 max-w-md mx-auto">
        {GALLERY.map((photo, i) => (
          <button
            type="button"
            key={photo.id}
            onClick={() => setActiveImage(photo)}
            data-reveal={photo.wide ? 'up' : i % 2 ? 'left' : 'right'}
            className={`${photo.wide ? 'col-span-2' : 'col-span-1'} text-left rounded-2xl p-2 sm:p-2.5 pb-2.5 bg-paper-hi paper-grain border border-metal/50 shadow-xl cursor-pointer group overflow-hidden`}
          >
            <div className={`w-full ${photo.wide ? 'aspect-[4/3]' : 'aspect-[3/4]'} rounded-xl overflow-hidden relative`}>
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base-900/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-base-900/75 text-metal-pale border border-metal/40 shadow-sm transition-transform duration-300 group-hover:scale-110">
                <ZoomIn className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="pt-2 px-1 min-w-0">
              <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.2em] text-accent uppercase block">{photo.tag}</span>
              <p className="font-headline italic text-xs sm:text-sm text-base-800 truncate">{photo.caption}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox (portal ke body agar di atas navbar) */}
      {activeImage && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-base-950/95 flex flex-col items-center justify-center p-4 animate-fadeIn"
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setActiveImage(null); }}
            aria-label="Tutup Pratinjau Foto"
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 text-ivory hover:bg-white/20 transition-colors border border-metal/40 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full bg-paper-hi paper-grain rounded-3xl p-3 border-2 border-metal/60 shadow-2xl overflow-hidden animate-scaleUp"
          >
            <div className="rounded-2xl overflow-hidden max-h-[72vh] bg-base-900/10">
              <img src={activeImage.src} alt={activeImage.caption} className="w-full h-auto max-h-[70vh] object-contain mx-auto" />
            </div>
            <div className="pt-3 pb-1.5 px-2 text-center">
              <span className="text-[10px] font-bold text-accent tracking-[0.25em] uppercase block">{activeImage.tag}</span>
              <p className="font-headline italic text-base text-base-800 mt-0.5">{activeImage.caption}</p>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </section>
  );
}
