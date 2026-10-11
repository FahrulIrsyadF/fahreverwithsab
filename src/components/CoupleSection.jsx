import React from 'react';
import { Instagram } from 'lucide-react';

export default function CoupleSection() {
  return (
    <section className="pt-6 pb-12 px-5" id="mempelai">
      <div className="text-center mb-8">
        <span className="text-[11px] font-bold text-gold uppercase tracking-[0.25em] block mb-1 font-sans">
          Dua Jiwa Bertaut
        </span>
        <h2 className="font-headline text-3xl sm:text-4xl text-emerald-deep font-normal">
          Pasangan Mempelai
        </h2>
        <div className="w-12 h-0.5 bg-gold/50 mx-auto mt-2 rounded-full"></div>
      </div>

      <div className="space-y-8">
        {/* Groom Card */}
        <div className="vellum-panel rounded-2xl p-6 sm:p-7 text-center shadow-soft relative">
          {/* Offset Gold Shadow Line Photo Frame */}
          <div className="relative w-48 h-64 sm:w-52 sm:h-72 mx-auto mb-7">
            {/* Noticeable Offset Gold Frame */}
            <div 
              className="absolute inset-0 rounded-3xl border-2 border-gold-metallic transform translate-x-3 translate-y-3 sm:translate-x-3.5 sm:translate-y-3.5 pointer-events-none"
              aria-hidden="true"
            />
            {/* Main Photo with Rich Shadow */}
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
              alt="Fahrul Irsyad Fianto"
              className="w-full h-full object-cover rounded-3xl relative z-10 shadow-xl shadow-emerald-deep/20"
              loading="lazy"
            />
          </div>

          <h3 className="font-headline text-2xl font-bold text-emerald-deep mb-1">
            Fahrul Irsyad Fianto, S.Tr.Kom.
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-4 font-sans">
            Putra dari Bapak Arief Maryanto<br />
            &amp; Ibu Siti Rukayah Susanti
          </p>

          <a
            href="https://instagram.com/fahrulirsy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-aqua-deep bg-aqua-tint hover:bg-aqua hover:text-white transition-all border border-aqua/30 font-sans"
          >
            <Instagram className="w-3.5 h-3.5" />
            @fahrulirsy
          </a>
        </div>

        {/* Ampersand Knot */}
        <div className="text-center">
          <span className="font-script text-5xl text-gold select-none">&amp;</span>
        </div>

        {/* Bride Card */}
        <div className="vellum-panel rounded-2xl p-6 sm:p-7 text-center shadow-soft relative">
          {/* Offset Gold Shadow Line Photo Frame */}
          <div className="relative w-48 h-64 sm:w-52 sm:h-72 mx-auto mb-7">
            {/* Noticeable Offset Gold Frame */}
            <div 
              className="absolute inset-0 rounded-3xl border-2 border-gold-metallic transform translate-x-3 translate-y-3 sm:translate-x-3.5 sm:translate-y-3.5 pointer-events-none"
              aria-hidden="true"
            />
            {/* Main Photo with Rich Shadow */}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
              alt="Sabrina Nabila Kholiqin"
              className="w-full h-full object-cover rounded-3xl relative z-10 shadow-xl shadow-emerald-deep/20"
              loading="lazy"
            />
          </div>

          <h3 className="font-headline text-2xl font-bold text-emerald-deep mb-1">
            Sabrina Nabila Kholiqin, S.Pd.
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-4 font-sans">
            Putri dari Bapak Akhsanul Kholiqin<br />
            &amp; Ibu Siti Nur Kusumawati
          </p>

          <a
            href="https://instagram.com/sabrinnkh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-aqua-deep bg-aqua-tint hover:bg-aqua hover:text-white transition-all border border-aqua/30 font-sans"
          >
            <Instagram className="w-3.5 h-3.5" />
            @sabrinnkh
          </a>
        </div>
      </div>
    </section>
  );
}
