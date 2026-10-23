import React from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import BrandMonogram from './BrandMonogram';

export default function OpeningVerse({ isOpened = true }) {
  return (
    <section className="text-center pt-6 pb-12 px-5 relative overflow-hidden bg-gradient-to-b from-aqua-tint/55 via-ivory/90 to-ivory">
      {/* Subtle Top Aquamarine & Gold Aurora */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-80 h-48 bg-aqua-glow/20 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Editorial Hero Portrait & Welcome Arch (Langsung menyambut tamu saat Cover terbuka) */}
      <div className="max-w-sm mx-auto relative mb-8">
        {/* Decorative Botanical Foliage Corners */}
        <img
          src="/assets/botanical-crest.svg"
          alt=""
          aria-hidden="true"
          className="absolute -top-6 -right-6 w-28 h-28 object-contain opacity-65 pointer-events-none z-20 animate-botanical-sway"
        />
        <img
          src="/assets/botanical-crest.svg"
          alt=""
          aria-hidden="true"
          className="absolute -bottom-4 -left-6 w-28 h-28 object-contain opacity-65 pointer-events-none z-20 animate-botanical-sway-bottom"
        />

        {/* Double-Layered Cathedral Arch Frame */}
        <div className="relative mx-auto w-64 sm:w-72 h-80 sm:h-96">
          {/* Outer Decorative Gold & Aquamarine Offset Halo */}
          <div
            className={`absolute -inset-2 photo-frame-cathedral border border-gold/45 bg-gradient-to-b from-aqua-glow/15 to-gold/10 transition-all duration-1000 delay-200 ${
              isOpened ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          />

          {/* Main Photo Arch with Curtain Unveil & Ken Burns Slow Zoom-Out */}
          <div
            className={`relative w-full h-full photo-frame-cathedral overflow-hidden border-2 border-gold/60 shadow-2xl reveal-arch-curtain ${
              isOpened ? 'is-revealed' : ''
            }`}
          >
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85"
              alt="Fahrul & Sabrina"
              className={`w-full h-full object-cover transition-transform duration-[2200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpened ? 'scale-100' : 'scale-125'
              }`}
            />
            {/* Editorial Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#00261F]/80 via-[#00261F]/15 to-transparent pointer-events-none" />

            {/* Caption Inside Bottom of Arch */}
            <div className="absolute inset-x-0 bottom-5 px-4 text-center z-10">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-bold tracking-[0.28em] uppercase text-aqua-soft font-sans mb-1">
                <Sparkles className="w-2.5 h-2.5 text-gold-pale" />
                <span>The Beginning of Forever</span>
                <Sparkles className="w-2.5 h-2.5 text-gold-pale" />
              </span>
              <h1 className="font-headline text-3xl sm:text-4xl text-ivory tracking-tight font-normal drop-shadow-sm">
                Fahrul <span className="font-headline italic text-gold-pale font-normal">&amp;</span> Sabrina
              </h1>
            </div>
          </div>

          {/* Floating Jewel Date Badge Overlapping Bottom of Arch */}
          <div
            className={`absolute -bottom-4 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full bg-gradient-to-r from-emerald-deep via-aqua-teal to-emerald-deep text-gold-pale border border-gold/60 shadow-lg whitespace-nowrap transition-all duration-900 delay-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isOpened ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'
            }`}
          >
            <BrandMonogram size="sm" variant="gold" showAmpersand={false} />
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span className="text-[11px] font-bold tracking-[0.22em] text-ivory font-sans">
              17 . 07 . 2027
            </span>
          </div>
        </div>
      </div>

      {/* 2. Personal Editorial Welcome Greeting */}
      <div
        className={`max-w-sm mx-auto mt-10 mb-7 px-2 reveal-blur-up ${
          isOpened ? 'is-revealed' : ''
        }`}
        style={{ transitionDelay: '380ms' }}
      >
        <p className="text-[10px] sm:text-[11px] font-bold text-aqua-teal tracking-[0.26em] uppercase mb-2 font-sans">
          Assalamu’alaikum Warahmatullahi Wabarakatuh
        </p>
        <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-sans">
          Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk berbagi kebahagiaan dan doa restu pada hari pernikahan kami.
        </p>
      </div>

      {/* 3. Holy Verse Card — Emerald-Aquamarine Velvet Sanctuary (Sesuai Plan Bagian 1.3) */}
      <div
        className={`max-w-md mx-auto jewel-card-dark rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden reveal-scale-bloom ${
          isOpened ? 'is-revealed' : ''
        }`}
        style={{ transitionDelay: '520ms' }}
      >
        {/* Ambient Aquamarine & Gold Glow inside Dark Velvet Card */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-aqua-glow/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-gold/15 rounded-full blur-2xl pointer-events-none" />

        {/* Inner Gold Hairline Frame */}
        <div className="absolute inset-2.5 rounded-2xl border border-gold/25 pointer-events-none" />

        {/* Bismillah Calligraphy */}
        <div className="font-serif text-xl sm:text-2xl text-gold-pale mb-3.5 tracking-widest select-none relative z-10">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>

        <p className="font-headline italic text-sm sm:text-base text-ivory/95 leading-relaxed mb-5 relative z-10 font-normal px-1">
          “Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.”
        </p>

        <div className="inline-flex items-center gap-2.5 pt-2 border-t border-gold/30 relative z-10">
          <div className="w-6 h-px bg-gold/50"></div>
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-aqua-soft font-sans">
            QS. Ar-Rum : 21
          </span>
          <div className="w-6 h-px bg-gold/50"></div>
        </div>
      </div>

      {/* 4. Subtle Scroll Prompt Indicator */}
      <div
        className={`mt-7 flex flex-col items-center justify-center gap-1 transition-all duration-1000 delay-700 ${
          isOpened ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-charcoal-muted font-semibold font-sans">
          Gulir ke Bawah
        </span>
        <ChevronDown className="w-4 h-4 text-gold animate-scroll-indicator" />
      </div>
    </section>
  );
}
