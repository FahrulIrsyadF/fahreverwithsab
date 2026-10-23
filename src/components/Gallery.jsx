import React, { useState, useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Gallery() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });
  const [activeImage, setActiveImage] = useState(null);

  const photos = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      caption: 'Langkah Awal Menuju Abadi',
      tag: 'FIG. 01 — PREWEDDING',
      span: 'col-span-2 h-72 sm:h-80'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=500&q=80',
      caption: 'Tatap Teduh & Ketulusan',
      tag: 'FIG. 02 — CEREMONY',
      span: 'col-span-1 h-48 sm:h-52'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=500&q=80',
      caption: 'Dua Hati Bersatu',
      tag: 'FIG. 03 — TOGETHER',
      span: 'col-span-1 h-48 sm:h-52'
    }
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
    <section className="pt-8 pb-14 px-5 text-center relative overflow-hidden" id="galeri" ref={sectionRef}>
      {/* Section Header */}
      <div
        className={`text-center mb-10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <span className="text-[10px] sm:text-[11px] font-bold text-aqua-teal uppercase tracking-[0.28em] block mb-1 font-sans">
          Momen Bahagia
        </span>
        <h2 className="font-headline text-3xl sm:text-4xl text-emerald-deep font-normal">
          Galeri Foto
        </h2>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-2.5 rounded-full"></div>
      </div>

      {/* Museum Matting Editorial Grid */}
      <div className="grid grid-cols-2 gap-3.5 max-w-md mx-auto">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => setActiveImage(photo)}
            className={`${photo.span} relative rounded-2xl p-2 bg-ivory/90 border border-gold/40 shadow-soft cursor-pointer group overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${150 + index * 120}ms` }}
          >
            <div className="w-full h-full rounded-xl overflow-hidden relative">
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-left">
                <span className="text-[9px] font-bold tracking-widest text-gold-pale uppercase font-sans">
                  {photo.tag}
                </span>
                <span className="text-xs text-ivory font-medium font-sans">
                  {photo.caption}
                </span>
              </div>
              <div className="absolute top-2 right-2 p-1.5 rounded-full bg-emerald-deep/50 text-gold-pale opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="w-3.5 h-3.5" />
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
          className="fixed inset-0 z-50 bg-[#011C15]/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 transition-all duration-300 animate-fadeIn"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage(null);
            }}
            aria-label="Tutup Pratinjau Foto"
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-ivory hover:bg-white/20 transition-colors border border-white/20 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full bg-ivory rounded-3xl p-3 border border-gold/50 shadow-2xl overflow-hidden animate-scaleUp"
          >
            <div className="rounded-2xl overflow-hidden max-h-[75vh]">
              <img
                src={activeImage.src}
                alt={activeImage.caption}
                className="w-full h-auto max-h-[70vh] object-contain mx-auto"
              />
            </div>
            <div className="pt-3 pb-1 px-2 text-center">
              <span className="text-[10px] font-bold text-aqua-teal tracking-widest uppercase block font-sans">
                {activeImage.tag}
              </span>
              <p className="font-headline italic text-sm text-emerald-deep mt-0.5">
                {activeImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
