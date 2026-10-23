import React from 'react';
import { Instagram } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function CoupleSection() {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.15 });
  const [groomRef, groomVisible] = useScrollReveal({ threshold: 0.18 });
  const [knotRef, knotVisible] = useScrollReveal({ threshold: 0.3 });
  const [brideRef, brideVisible] = useScrollReveal({ threshold: 0.18 });

  return (
    <section className="pt-10 pb-16 px-5 relative overflow-hidden" id="mempelai">
      {/* Section Header */}
      <div
        ref={headerRef}
        className={`text-center mb-10 reveal-blur-up ${
          headerVisible ? 'is-revealed' : ''
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

      <div className="space-y-8 sm:space-y-10 max-w-md mx-auto">
        {/* Groom Card - Editorial Asymmetric Left Slide + Image Zoom-Out Unveil */}
        <div
          ref={groomRef}
          className={`vellum-panel rounded-[32px] p-6 sm:p-8 pt-8 sm:pt-10 text-center relative overflow-hidden reveal-slide-left ${
            groomVisible ? 'is-revealed' : ''
          }`}
        >
          {/* Subtle Ambient Accent */}
          <div className="absolute -top-8 -left-8 w-36 h-36 bg-aqua-glow/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-aqua via-gold to-transparent" />

          {/* Asymmetric Arch Frame with Vertical Magazine Label & Offset Aquamarine Shadow */}
          <div className="relative w-52 h-68 sm:w-56 sm:h-72 mx-auto mb-7 flex items-center justify-center">
            {/* Vertical Editorial Side Label */}
            <span className="absolute -left-7 sm:-left-8 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] font-sans font-bold tracking-[0.3em] uppercase text-aqua-teal/80 whitespace-nowrap select-none">
              THE GROOM &mdash; 01
            </span>

            <div className="w-48 h-64 sm:w-52 sm:h-72 photo-frame-arch-left overflow-hidden arch-offset-shadow-left border-2 border-gold/50 relative group">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80"
                alt="Fahrul Irsyad Fianto"
                className={`w-full h-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 ${
                  groomVisible ? 'scale-100' : 'scale-125'
                }`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/35 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Editorial Corner Pill */}
            <span className="absolute -bottom-2.5 right-1 bg-gradient-to-r from-emerald-deep to-aqua-teal text-gold-pale text-[9px] font-sans font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-gold/50 shadow-md">
              Mempelai Pria
            </span>
          </div>

          {/* Name */}
          <h3 className="font-headline text-2xl sm:text-[26px] font-bold text-emerald-deep mb-2.5 leading-snug">
            Fahrul Irsyad Fianto, S.Tr.Kom.
          </h3>

          {/* Parents Information */}
          <div className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-6 font-sans">
            <p className="text-charcoal-muted/80">Putra dari</p>
            <p className="font-semibold text-charcoal-forest mt-0.5">
              Bpk. Arief Maryanto &amp; Ibu Siti Rukayah Susanti
            </p>
          </div>

          {/* Instagram Pill Button */}
          <a
            href="https://instagram.com/fahrulirsy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold text-emerald-deep bg-ivory/90 hover:bg-aqua-tint border border-gold/45 hover:border-aqua transition-all duration-300 font-sans shadow-sm group active:scale-95"
          >
            <Instagram className="w-3.5 h-3.5 text-aqua-teal group-hover:scale-110 transition-transform" />
            <span>@fahrulirsy</span>
          </a>
        </div>

        {/* Ampersand Knot with Scale-Bloom Animation */}
        <div
          ref={knotRef}
          className={`text-center my-2 flex items-center justify-center gap-4 reveal-scale-bloom ${
            knotVisible ? 'is-revealed' : ''
          }`}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/60 to-aqua/50"></div>
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-deep via-aqua-teal to-emerald border-2 border-gold/60 flex items-center justify-center shadow-glow-jewel">
            <span className="font-headline italic text-2xl text-gold-pale font-normal leading-none">&amp;</span>
          </div>
          <div className="w-16 h-px bg-gradient-to-l from-transparent via-gold/60 to-aqua/50"></div>
        </div>

        {/* Bride Card - Editorial Asymmetric Right Slide + Image Zoom-Out Unveil */}
        <div
          ref={brideRef}
          className={`vellum-panel rounded-[32px] p-6 sm:p-8 pt-8 sm:pt-10 text-center relative overflow-hidden reveal-slide-right ${
            brideVisible ? 'is-revealed' : ''
          }`}
        >
          {/* Subtle Ambient Accent */}
          <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-gold/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-l from-aqua via-gold to-transparent" />

          {/* Asymmetric Arch Frame with Vertical Magazine Label & Offset Aquamarine Shadow */}
          <div className="relative w-52 h-68 sm:w-56 sm:h-72 mx-auto mb-7 flex items-center justify-center">
            <div className="w-48 h-64 sm:w-52 sm:h-72 photo-frame-arch-right overflow-hidden arch-offset-shadow-right border-2 border-gold/50 relative group">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
                alt="Sabrina Nabila Kholiqin"
                className={`w-full h-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 ${
                  brideVisible ? 'scale-100' : 'scale-125'
                }`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/35 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Vertical Editorial Side Label */}
            <span className="absolute -right-7 sm:-right-8 top-1/2 -translate-y-1/2 rotate-90 text-[9px] font-sans font-bold tracking-[0.3em] uppercase text-aqua-teal/80 whitespace-nowrap select-none">
              THE BRIDE &mdash; 02
            </span>

            {/* Editorial Corner Pill */}
            <span className="absolute -bottom-2.5 left-1 bg-gradient-to-r from-emerald-deep to-aqua-teal text-gold-pale text-[9px] font-sans font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-gold/50 shadow-md">
              Mempelai Wanita
            </span>
          </div>

          {/* Name */}
          <h3 className="font-headline text-2xl sm:text-[26px] font-bold text-emerald-deep mb-2.5 leading-snug">
            Sabrina Nabila Kholiqin, S.Pd.
          </h3>

          {/* Parents Information */}
          <div className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-6 font-sans">
            <p className="text-charcoal-muted/80">Putri dari</p>
            <p className="font-semibold text-charcoal-forest mt-0.5">
              Bpk. Akhsanul Kholiqin &amp; Ibu Siti Nur Kusumawati
            </p>
          </div>

          {/* Instagram Pill Button */}
          <a
            href="https://instagram.com/sabrinnkh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold text-emerald-deep bg-ivory/90 hover:bg-aqua-tint border border-gold/45 hover:border-aqua transition-all duration-300 font-sans shadow-sm group active:scale-95"
          >
            <Instagram className="w-3.5 h-3.5 text-aqua-teal group-hover:scale-110 transition-transform" />
            <span>@sabrinnkh</span>
          </a>
        </div>
      </div>
    </section>
  );
}
