import React from 'react';
import BrandMonogram from './BrandMonogram';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Footer() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <footer
      ref={sectionRef}
      className="px-6 pt-14 pb-32 text-center bg-gradient-to-b from-[#FAF9F4] via-[#012A22] to-[#001D17] border-t border-gold/30 mt-12 relative overflow-hidden text-ivory"
    >
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-aqua-glow/10 rounded-full blur-3xl pointer-events-none" />

      <div
        className={`relative z-10 max-w-sm mx-auto transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="mb-4 flex justify-center">
          <div className="p-3.5 rounded-full bg-emerald-deep/80 border border-gold/40 shadow-lg shadow-emerald-deep/40">
            <BrandMonogram size="lg" variant="gold" />
          </div>
        </div>

        <div className="font-headline text-3xl sm:text-4xl text-ivory font-normal mb-3 leading-snug">
          Fahrul <span className="font-headline italic text-gold font-normal">&amp;</span> Sabrina
        </div>

        <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed max-w-xs mx-auto mb-6 font-sans">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu bagi lembaran baru kehidupan kami.
        </p>

        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-5 rounded-full"></div>

        <div className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-bold text-gold-pale mb-6 font-sans">
          Keluarga Besar Maryanto &amp; Kholiqin
        </div>

        <div className="pt-6 border-t border-white/10 text-[10px] text-ivory/50 font-sans tracking-wider">
          The Wedding of Fahrul &amp; Sabrina &bull; 2027
        </div>
      </div>
    </footer>
  );
}
