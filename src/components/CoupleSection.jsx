import React from 'react';
import { Instagram } from 'lucide-react';

export default function CoupleSection() {
  return (
    <section className="pt-6 pb-12 px-5" id="mempelai">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-[11px] font-bold text-gold uppercase tracking-[0.25em] block mb-1 font-sans">
          Dua Jiwa Bertaut
        </span>
        <h2 className="font-headline text-3xl sm:text-4xl text-emerald-deep font-normal">
          Pasangan Mempelai
        </h2>
        <div className="w-12 h-0.5 bg-gold/50 mx-auto mt-2 rounded-full"></div>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* Groom Card */}
        <div className="vellum-panel rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 pt-7 sm:pt-9 text-center shadow-soft relative transition-all duration-300">
          {/* Asymmetric Arch Photo Frame */}
          <div className="relative w-48 h-64 sm:w-52 sm:h-72 mx-auto mb-6 photo-frame-arch-left overflow-hidden shadow-lg shadow-emerald-deep/15">
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
              alt="Fahrul Irsyad Fianto"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Subtitle / Role Badge */}
          <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-gold uppercase block mb-2">
            Mempelai Pria
          </span>

          {/* Name */}
          <h3 className="font-headline text-2xl sm:text-[26px] font-bold text-emerald-deep mb-2.5 leading-snug">
            Fahrul Irsyad Fianto, S.Tr.Kom.
          </h3>

          {/* Parents Information */}
          <div className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-6 font-sans">
            <p className="text-charcoal-muted/90">Putra dari</p>
            <p className="font-medium text-charcoal-forest mt-0.5">
              Bpk. Arief Maryanto &amp; Ibu Siti Rukayah Susanti
            </p>
          </div>

          {/* Instagram Pill Button */}
          <a
            href="https://instagram.com/fahrulirsy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-2xl text-xs font-medium text-charcoal-forest bg-ivory/60 hover:bg-gold/15 border border-gold/40 hover:border-gold transition-all duration-300 font-sans shadow-sm group active:scale-95"
          >
            <Instagram className="w-3.5 h-3.5 text-gold group-hover:scale-110 transition-transform" />
            <span>@fahrulirsy</span>
          </a>
        </div>

        {/* Ampersand Knot */}
        <div className="text-center my-3 sm:my-4 flex items-center justify-center gap-3">
          <div className="w-10 h-px bg-gold/30"></div>
          <span className="font-script text-5xl sm:text-6xl text-gold select-none leading-none">&amp;</span>
          <div className="w-10 h-px bg-gold/30"></div>
        </div>

        {/* Bride Card */}
        <div className="vellum-panel rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 pt-7 sm:pt-9 text-center shadow-soft relative transition-all duration-300">
          {/* Asymmetric Arch Photo Frame */}
          <div className="relative w-48 h-64 sm:w-52 sm:h-72 mx-auto mb-6 photo-frame-arch-right overflow-hidden shadow-lg shadow-emerald-deep/15">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
              alt="Sabrina Nabila Kholiqin"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Subtitle / Role Badge */}
          <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-gold uppercase block mb-2">
            Mempelai Wanita
          </span>

          {/* Name */}
          <h3 className="font-headline text-2xl sm:text-[26px] font-bold text-emerald-deep mb-2.5 leading-snug">
            Sabrina Nabila Kholiqin, S.Pd.
          </h3>

          {/* Parents Information */}
          <div className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-6 font-sans">
            <p className="text-charcoal-muted/90">Putri dari</p>
            <p className="font-medium text-charcoal-forest mt-0.5">
              Bpk. Akhsanul Kholiqin &amp; Ibu Siti Nur Kusumawati
            </p>
          </div>

          {/* Instagram Pill Button */}
          <a
            href="https://instagram.com/sabrinnkh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-2xl text-xs font-medium text-charcoal-forest bg-ivory/60 hover:bg-gold/15 border border-gold/40 hover:border-gold transition-all duration-300 font-sans shadow-sm group active:scale-95"
          >
            <Instagram className="w-3.5 h-3.5 text-gold group-hover:scale-110 transition-transform" />
            <span>@sabrinnkh</span>
          </a>
        </div>
      </div>
    </section>
  );
}
