import React, { useState, useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Gallery() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.12 });
  const [activeImage, setActiveImage] = useState(null);

  const photos = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      caption: 'Langkah Awal Menuju Abadi',
      tag: 'FIG. 01 — PREWEDDING',
      span: 'col-span-2',
      imgHeight: 'h-64 sm:h-72',
      revealClass: 'reveal-scale-bloom',
      delay: 120,
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=500&q=80',
      caption: 'Tatap Teduh & Ketulusan',
      tag: 'FIG. 02 — INTIMATE',
      span: 'col-span-1',
      imgHeight: 'h-44 sm:h-48',
      revealClass: 'reveal-slide-left',
      delay: 260,
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=500&q=80',
      caption: 'Dua Hati Bersatu',
      tag: 'FIG. 03 — FOREVER',
      span: 'col-span-1',
      imgHeight: 'h-44 sm:h-48',
      revealClass: 'reveal-slide-right',
      delay: 380,
    },
  ];

  // Tutup lightbox dengan tombol Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveImage(null);
    };
    if (activeImage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage]);

  return (
    <section
      className="py-12 px-5 text-center relative overflow-hidden bg-gradient-to-b from-[#002820] via-[#003A33] to-[#00251D] rounded-[40px] border-y-2 border-gold/45 shadow-2xl my-2"
      id="galeri"
      ref={sectionRef}
    >
      {/* Ambient Aquamarine & Gold Glow */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-64 bg-aqua-glow/15 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div
        className={`text-center mb-9 relative z-10 reveal-blur-up ${
          isVisible ? 'is-revealed' : ''
        }`}
      >
        <span className="text-[10px] sm:text-[11px] font-bold text-aqua-soft uppercase tracking-[0.28em] block mb-1 font-sans">
          Momen Bahagia
        </span>
        <h2 className="font-headline text-3xl sm:text-4xl text-ivory font-normal">
          Galeri Foto
        </h2>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-2.5 rounded-full"></div>
      </div>

      {/* Museum Matting Editorial Grid (Caption selalu terlihat di mobile & desktop) */}
      <div className="grid grid-cols-2 gap-3.5 max-w-md mx-auto relative z-10">
        {photos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setActiveImage(photo)}
            className={`${photo.span} ${photo.revealClass} ${
              isVisible ? 'is-revealed' : ''
            } relative rounded-2xl p-2 sm:p-2.5 pb-2.5 bg-ivory paper-grain border border-gold/50 shadow-xl cursor-pointer group overflow-hidden`}
            style={{ transitionDelay: `${photo.delay}ms` }}
          >
            <div className={`w-full ${photo.imgHeight} rounded-xl overflow-hidden relative`}>
              <img
                src={photo.src}
                alt={photo.caption}
                className={`w-full h-full object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 ${
                  isVisible ? 'scale-100' : 'scale-125'
                }`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-emerald-deep/75 backdrop-blur-sm text-gold-pale border border-gold/40 shadow-sm transition-transform duration-300 group-hover:scale-110">
                <ZoomIn className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Editorial Museum Matting Caption */}
            <div className="pt-2 px-1 flex items-center justify-between gap-1 text-left">
              <div className="min-w-0">
                <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.2em] text-aqua-teal uppercase block font-sans">
                  {photo.tag}
                </span>
                <p className="font-headline italic text-xs sm:text-sm text-emerald-deep truncate">
                  {photo.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Lightbox Modal */}
      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-[#011C15]/92 backdrop-blur-xl flex flex-col items-center justify-center p-4 animate-fadeIn"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage(null);
            }}
            aria-label="Tutup Pratinjau Foto"
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 text-ivory hover:bg-white/20 transition-colors border border-gold/40 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full bg-ivory paper-grain rounded-3xl p-3 border-2 border-gold/60 shadow-2xl overflow-hidden animate-scaleUp"
          >
            <div className="rounded-2xl overflow-hidden max-h-[72vh] bg-emerald-deep/10">
              <img
                src={activeImage.src}
                alt={activeImage.caption}
                className="w-full h-auto max-h-[70vh] object-contain mx-auto"
              />
            </div>
            <div className="pt-3 pb-1.5 px-2 text-center">
              <span className="text-[10px] font-bold text-aqua-teal tracking-[0.25em] uppercase block font-sans">
                {activeImage.tag}
              </span>
              <p className="font-headline italic text-base text-emerald-deep mt-0.5">
                {activeImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
