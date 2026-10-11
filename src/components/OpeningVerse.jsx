import React from 'react';
import { Heart } from 'lucide-react';

export default function OpeningVerse() {
  return (
    <section className="text-center pt-8 pb-10 px-5">
      {/* Botanical Wreath Badge with Heart */}
      <div className="mx-auto w-24 h-24 mb-4 relative flex items-center justify-center animate-aura">
        <img
          src="/assets/botanical-crest.svg"
          alt="Botanical Gold Foliage Frame"
          className="w-full h-full object-contain filter drop-shadow-sm"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Heart className="w-4 h-4 text-emerald fill-emerald" />
        </div>
      </div>

      <p className="text-[11px] font-bold text-emerald tracking-[0.25em] uppercase mb-2 font-sans">
        The Wedding Celebration Of
      </p>

      <h1 className="font-headline text-4xl sm:text-5xl text-emerald-deep tracking-tight mb-2 font-normal">
        Fahrul <span className="font-headline italic font-normal text-gold">&amp;</span> Sabrina
      </h1>

      <div className="inline-flex items-center space-x-2 my-2 px-4 py-1 rounded-full bg-ivory-container/80 border border-gold/30">
        <span className="text-xs font-semibold text-emerald tracking-widest font-sans">
          17 . 07 . 2027
        </span>
      </div>

      <div className="w-12 h-0.5 bg-gold/50 mx-auto my-6 rounded-full"></div>

      {/* Holy Verse Card */}
      <div className="vellum-panel rounded-2xl p-6 sm:p-7 text-center shadow-soft">
        <div className="font-script text-3xl sm:text-4xl text-aqua mb-2">We Found Love</div>
        <p className="font-headline italic text-base sm:text-lg text-emerald-deep leading-relaxed mb-4">
          “Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.”
        </p>
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-gold-deep block font-sans">
          QS. Ar-Rum (30) : 21
        </span>
      </div>
    </section>
  );
}
