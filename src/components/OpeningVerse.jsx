import React from 'react';
import BrandMonogram from './BrandMonogram';
import useScrollReveal from '../hooks/useScrollReveal';

export default function OpeningVerse() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className="text-center pt-10 pb-12 px-5 relative overflow-hidden">
      {/* Botanical Wreath Badge with Monogram */}
      <div
        className={`mx-auto w-24 h-24 mb-4 relative flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <img
          src="/assets/botanical-crest.svg"
          alt="Botanical Gold Foliage Frame"
          className="w-full h-full object-contain filter drop-shadow-sm select-none pointer-events-none"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <BrandMonogram size="sm" variant="emerald" showAmpersand={false} />
        </div>
      </div>

      {/* Subtitle */}
      <p
        className={`text-[10px] sm:text-[11px] font-bold text-emerald tracking-[0.25em] uppercase mb-2 font-sans transition-all duration-700 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        The Wedding Celebration Of
      </p>

      {/* Couple Names */}
      <h1
        className={`font-headline text-4xl sm:text-5xl text-emerald-deep tracking-tight mb-2 font-normal transition-all duration-700 delay-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        Fahrul <span className="font-headline italic font-normal text-gold">&amp;</span> Sabrina
      </h1>

      {/* Date Pill */}
      <div
        className={`inline-flex items-center space-x-2 my-2 px-4 py-1 rounded-full bg-ivory-container/90 border border-gold/30 shadow-xs transition-all duration-700 delay-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <span className="text-xs font-semibold text-aqua-teal tracking-widest font-sans">
          17 &bull; 07 &bull; 2027
        </span>
      </div>

      <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-6 rounded-full"></div>

      {/* Holy Verse Card (Ar-Rum 21) */}
      <div
        className={`vellum-panel paper-grain rounded-3xl p-6 sm:p-8 text-center shadow-soft border border-gold/40 relative overflow-hidden transition-all duration-900 delay-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-7 blur-xs'
        }`}
      >
        {/* Subtle Ambient Light */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-aqua-glow/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

        {/* Bismillah Calligraphy */}
        <div className="font-serif text-lg sm:text-xl text-emerald-deep/80 mb-3 tracking-widest select-none">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>

        <p className="font-headline italic text-sm sm:text-base text-emerald-deep leading-relaxed mb-4 relative z-10 font-normal">
          “Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.”
        </p>

        <div className="inline-flex items-center gap-2 pt-2 border-t border-gold/25 relative z-10">
          <div className="w-6 h-px bg-gold/40"></div>
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gold-deep font-sans">
            QS. Ar-Rum : 21
          </span>
          <div className="w-6 h-px bg-gold/40"></div>
        </div>
      </div>
    </section>
  );
}
