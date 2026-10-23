import React from 'react';
import BrandMonogram from './BrandMonogram';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Footer() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 });

  return (
    <footer
      ref={sectionRef}
      className="px-6 pt-14 pb-32 text-center jewel-canvas rounded-t-[44px] border-t-2 border-gold/50 mt-6 relative overflow-hidden text-ivory"
    >
      {/* Ambient Aquamarine & Gold Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-aqua-glow/15 rounded-full blur-3xl pointer-events-none" />

      {/* Botanical Corner Ornaments */}
      <img
        src="/assets/botanical-crest.svg"
        alt=""
        aria-hidden="true"
        className="absolute -top-10 -right-10 w-36 h-36 object-contain opacity-20 pointer-events-none animate-botanical-sway"
      />
      <img
        src="/assets/botanical-crest.svg"
        alt=""
        aria-hidden="true"
        className="absolute -bottom-10 -left-10 w-36 h-36 object-contain opacity-20 pointer-events-none animate-botanical-sway-bottom"
      />

      <div
        className={`relative z-10 max-w-sm mx-auto reveal-scale-bloom ${
          isVisible ? 'is-revealed' : ''
        }`}
      >
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-deep via-aqua-teal to-emerald border-2 border-gold/60 flex items-center justify-center shadow-glow-jewel">
            <BrandMonogram size="md" variant="gold" />
          </div>
        </div>

        <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-aqua-soft block mb-1 font-sans">
          Thank You
        </span>

        <div className="font-headline text-3xl sm:text-4xl text-ivory font-normal mb-3 leading-snug">
          Fahrul <span className="font-headline italic text-gold-pale font-normal">&amp;</span> Sabrina
        </div>

        <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed max-w-xs mx-auto mb-6 font-sans">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu bagi lembaran baru kehidupan kami.
        </p>

        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-5 rounded-full"></div>

        <div className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-bold text-gold-pale mb-6 font-sans">
          Keluarga Besar Maryanto &amp; Kholiqin
        </div>

        <div className="pt-5 border-t border-aqua-soft/15 text-[10px] text-ivory/55 font-sans tracking-wider">
          The Wedding of Fahrul &amp; Sabrina &bull; 17.07.2027
        </div>
      </div>
    </footer>
  );
}
