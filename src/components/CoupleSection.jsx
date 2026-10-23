import React from 'react';
import { Instagram } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function CoupleSection() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.08 });

  return (
    <section className="pt-8 pb-14 px-5 relative overflow-hidden" id="mempelai" ref={sectionRef}>
      {/* Section Header */}
      <div
        className={`text-center mb-10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <span className="text-[10px] sm:text-[11px] font-bold text-aqua-teal uppercase tracking-[0.28em] block mb-1 font-sans">
          Dua Jiwa Bertaut
        </span>
        <h2 className="font-headline text-3xl sm:text-4xl text-emerald-deep font-normal">
          Pasangan Mempelai
        </h2>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-2.5 rounded-full"></div>
      </div>

      <div className="space-y-10 sm:space-y-12 max-w-md mx-auto">
        {/* Groom Card - Editorial Asymmetric Left */}
        <div
          className={`vellum-panel paper-grain rounded-[32px] p-6 sm:p-8 pt-8 sm:pt-10 text-center shadow-soft relative border border-gold/40 transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Subtle Ambient Accent */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-aqua-glow/10 rounded-full blur-2xl pointer-events-none" />

          {/* Asymmetric Arch Frame with Offset Aquamarine Shadow */}
          <div className="relative w-48 h-64 sm:w-52 sm:h-72 mx-auto mb-6">
            <div className="w-full h-full photo-frame-arch-left overflow-hidden arch-offset-shadow-left border-2 border-gold/40 relative group">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
                alt="Fahrul Irsyad Fianto"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/30 via-transparent to-transparent pointer-events-none" />
            </div>
            {/* Editorial Tag */}
            <span className="absolute -bottom-2 -left-2 bg-emerald-deep text-gold-pale text-[9px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-gold/40 shadow-sm">
              Groom &bull; 01
            </span>
          </div>

          {/* Subtitle / Role Badge */}
          <span className="font-sans text-[11px] font-semibold tracking-[0.25em] text-aqua-teal uppercase block mb-1.5">
            Mempelai Pria
          </span>

          {/* Name */}
          <h3 className="font-headline text-2xl sm:text-[26px] font-bold text-emerald-deep mb-2.5 leading-snug">
            Fahrul Irsyad Fianto, S.Tr.Kom.
          </h3>

          {/* Parents Information */}
          <div className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-6 font-sans">
            <p className="text-charcoal-muted/80">Putra pertama dari</p>
            <p className="font-medium text-charcoal-forest mt-0.5">
              Bpk. Arief Maryanto &amp; Ibu Siti Rukayah Susanti
            </p>
          </div>

          {/* Instagram Pill Button */}
          <a
            href="https://instagram.com/fahrulirsy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-2xl text-xs font-semibold text-emerald-deep bg-ivory/80 hover:bg-aqua-tint border border-gold/40 hover:border-aqua transition-all duration-300 font-sans shadow-sm group active:scale-95"
          >
            <Instagram className="w-3.5 h-3.5 text-aqua-teal group-hover:scale-110 transition-transform" />
            <span>@fahrulirsy</span>
          </a>
        </div>

        {/* Ampersand Knot with Gold Flourish */}
        <div className="text-center my-2 flex items-center justify-center gap-4">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/40"></div>
          <div className="w-12 h-12 rounded-full bg-ivory-container/80 border border-gold/40 flex items-center justify-center shadow-xs">
            <span className="font-headline italic text-2xl text-gold font-normal leading-none">&amp;</span>
          </div>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/40"></div>
        </div>

        {/* Bride Card - Editorial Asymmetric Right */}
        <div
          className={`vellum-panel paper-grain rounded-[32px] p-6 sm:p-8 pt-8 sm:pt-10 text-center shadow-soft relative border border-gold/40 transition-all duration-900 delay-150 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Subtle Ambient Accent */}
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

          {/* Asymmetric Arch Frame with Offset Aquamarine Shadow */}
          <div className="relative w-48 h-64 sm:w-52 sm:h-72 mx-auto mb-6">
            <div className="w-full h-full photo-frame-arch-right overflow-hidden arch-offset-shadow-right border-2 border-gold/40 relative group">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt="Sabrina Nabila Kholiqin"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/30 via-transparent to-transparent pointer-events-none" />
            </div>
            {/* Editorial Tag */}
            <span className="absolute -bottom-2 -right-2 bg-emerald-deep text-gold-pale text-[9px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-gold/40 shadow-sm">
              Bride &bull; 02
            </span>
          </div>

          {/* Subtitle / Role Badge */}
          <span className="font-sans text-[11px] font-semibold tracking-[0.25em] text-aqua-teal uppercase block mb-1.5">
            Mempelai Wanita
          </span>

          {/* Name */}
          <h3 className="font-headline text-2xl sm:text-[26px] font-bold text-emerald-deep mb-2.5 leading-snug">
            Sabrina Nabila Kholiqin, S.Pd.
          </h3>

          {/* Parents Information */}
          <div className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-6 font-sans">
            <p className="text-charcoal-muted/80">Putri dari</p>
            <p className="font-medium text-charcoal-forest mt-0.5">
              Bpk. Akhsanul Kholiqin &amp; Ibu Siti Nur Kusumawati
            </p>
          </div>

          {/* Instagram Pill Button */}
          <a
            href="https://instagram.com/sabrinnkh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-2xl text-xs font-semibold text-emerald-deep bg-ivory/80 hover:bg-aqua-tint border border-gold/40 hover:border-aqua transition-all duration-300 font-sans shadow-sm group active:scale-95"
          >
            <Instagram className="w-3.5 h-3.5 text-aqua-teal group-hover:scale-110 transition-transform" />
            <span>@sabrinnkh</span>
          </a>
        </div>
      </div>
    </section>
  );
}
