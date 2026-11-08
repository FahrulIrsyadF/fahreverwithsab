import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import SectionSeam from './ornaments/SectionSeam';
import { RoseVine } from './ornaments/Roses';
import ThreadStitch from './thread/ThreadStitch';
import { GALLERY } from '../data/wedding';
import './gallery/gallery.css';

/**
 * Galeri — tata letak editorial: satu foto besar berpuncak lengkung + dua foto berselang,
 * keterangan di bawah foto (tanpa bingkai kartu). Ukuran bingkai tetap (aspect-ratio) supaya
 * benang merah tidak bergeser saat foto dimuat. Benang menyusur tepi kiri lalu menyeberang ke kanan.
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

  const [hero, ...rest] = GALLERY;
  return (
    <section className="sec sec-light gal-sec" id="galeri">
      <SectionSeam into="light" side="left" seed={67} anchor="0.7,0.55" />

      <header className="sec-head" data-reveal data-anchor="-0.04,0.9">
        <p className="eyebrow">Momen Bahagia</p>
        <h2>Galeri Foto</h2>
        <RoseVine className="sec-rule" w={220} h={40} seed={71} />
      </header>

      <div className="sec-inner gal">
        {[hero, ...rest].map((photo, i) => (
          <figure key={photo.id} className={`gal-item ${i === 0 ? 'gal-hero' : `gal-small gal-small-${i}`}`} data-reveal={i === 0 ? 'up' : i % 2 ? 'left' : 'right'}>
            <button type="button" className="gal-photo" onClick={() => setActiveImage(photo)} aria-label={`Perbesar foto: ${photo.caption}`}>
              <img src={photo.src} alt={photo.caption} loading="lazy" decoding="async" />
            </button>
            <figcaption>
              <span className="gal-tag">{photo.tag}</span>
              <span className="gal-cap">{photo.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      {/* benang menyeberang ke kanan, menuju ranting sambungan Kisah */}
      <ThreadStitch from="left" height={120} />

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
