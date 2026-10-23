import React, { useState } from 'react';
import { Mail, Calendar, Volume2, Sparkles } from 'lucide-react';
import BrandMonogram from './BrandMonogram';

export default function CoverScreen({ guestName, isOpened, onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    // Beri waktu 520ms agar animasi Wax Seal Ripple & Card Lift terlihat menawan sebelum tirai terangkat
    setTimeout(() => {
      onOpen();
    }, 520);
  };

  return (
    <div
      className={`fixed inset-0 w-full max-w-lg mx-auto h-screen z-50 flex flex-col justify-between px-5 py-6 transition-all duration-[1250ms] ease-[cubic-bezier(0.76,0,0.24,1)] overflow-hidden ${
        isOpened
          ? '-translate-y-full opacity-0 pointer-events-none scale-110 blur-md'
          : 'translate-y-0 opacity-100 scale-100 blur-0 jewel-canvas'
      }`}
    >
      {/* Atmospheric Background Blobs & Aquamarine Aurora */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex justify-center">
        <div className="w-full max-w-lg h-full relative paper-grain">
          <div className="absolute -top-16 -left-20 w-80 h-96 bg-emerald-rich/35 rounded-full blur-3xl mix-blend-screen opacity-75"></div>
          <div className="absolute top-1/3 -right-20 w-80 h-96 bg-aqua-glow/25 rounded-full blur-3xl opacity-65"></div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-96 h-80 bg-gold/15 rounded-full blur-3xl opacity-65"></div>
          <div className="absolute inset-5 border border-gold/20 rounded-[36px] pointer-events-none"></div>
          <div className="absolute inset-7 border border-aqua-soft/10 rounded-[30px] pointer-events-none"></div>
        </div>
      </div>

      {/* Top Header Bar */}
      <header className="w-full flex items-center justify-between pt-2 px-8 relative z-10">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-bold text-aqua-soft tracking-[0.25em] font-sans drop-shadow-sm">
            #FAHreverWithSAB
          </span>
        </div>
      </header>

      {/* Center Envelope Hero Card (Vellum Panel on Jewel Canvas) */}
      <div className="my-auto py-1 relative z-10">
        <div
          className={`vellum-panel rounded-[32px] p-6 sm:p-7 relative text-center overflow-hidden border border-gold/45 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isOpening ? 'scale-[1.02] -translate-y-1.5 shadow-glow-jewel' : 'scale-100 translate-y-0'
          }`}
        >
          {/* Ambient Top Gold-Aqua Bar */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald via-aqua to-gold" />

          {/* Crest With Botanical Gold Frame & Wax Seal Ripple */}
          <div className="flex justify-center mb-2">
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center my-1 animate-aura">
              <img
                src="/assets/botanical-crest.svg"
                alt="Botanical Gold Frame"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-sm select-none animate-botanical-sway"
              />

              {/* Concentric Wax Seal Ripples saat tombol Buka Undangan ditekan */}
              {isOpening && (
                <>
                  <span className="absolute w-20 h-20 rounded-full border-2 border-gold animate-wax-ripple pointer-events-none" />
                  <span
                    className="absolute w-20 h-20 rounded-full border border-aqua-glow animate-wax-ripple pointer-events-none"
                    style={{ animationDelay: '140ms' }}
                  />
                </>
              )}

              <div
                className={`relative z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-deep via-[#00483E] to-aqua-teal flex flex-col items-center justify-center shadow-lg border-2 border-gold-light/80 transition-all duration-500 ${
                  isOpening ? 'scale-110 rotate-6 shadow-glow-jewel' : 'scale-100 rotate-0'
                }`}
              >
                <div className="absolute inset-1 rounded-full border border-dashed border-gold-light/45 pointer-events-none"></div>
                <div className="z-10">
                  <BrandMonogram size="md" variant="gold" />
                </div>
              </div>
            </div>
          </div>

          {/* Over-title Section */}
          <div className="space-y-1 mb-1">
            <p className="text-[10px] sm:text-[11px] font-bold text-aqua-teal tracking-[0.28em] uppercase font-sans">
              THE WEDDING CELEBRATION OF
            </p>
            <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto rounded-full"></div>
          </div>

          {/* Main Names Editorial Script Pairing */}
          <h1 className="font-headline text-4xl sm:text-5xl text-emerald-deep tracking-tight leading-tight my-1.5 font-normal">
            Fahrul <span className="font-headline italic font-normal text-gold">&amp;</span> Sabrina
          </h1>

          {/* Ceremonial Date Tag */}
          <div className="inline-flex items-center space-x-2 my-2 px-4 py-1.5 rounded-full bg-aqua-tint/70 border border-aqua/30 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-aqua-teal" />
            <p className="text-xs text-emerald-deep font-semibold tracking-wide font-sans">
              Sabtu, 17 Juli 2027
            </p>
          </div>

          {/* Soft Divider with Diamond */}
          <div className="flex items-center justify-center space-x-3 my-3 opacity-75">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold/50"></div>
            <div className="w-1.5 h-1.5 bg-gold rotate-45"></div>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold/50"></div>
          </div>

          {/* Guest Validation Section (Kepada Yth) */}
          <div className="bg-ivory/95 border border-gold/40 rounded-2xl p-4 shadow-sm relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-aqua/60 to-transparent"></div>
            <p className="text-[10px] text-charcoal-muted uppercase tracking-widest mb-1.5 font-medium font-sans">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>

            <div className="my-1.5 py-1.5 px-3.5 bg-ivory-subtle rounded-xl border border-gold/40 inline-block max-w-full shadow-sm">
              <h2 className="font-headline text-lg sm:text-xl text-emerald-deep tracking-tight font-semibold truncate px-2">
                {guestName}
              </h2>
            </div>
            <p className="text-[11px] text-charcoal-muted italic mt-1 leading-snug font-sans">
              Mohon maaf apabila ada kesalahan penulisan nama/gelar
            </p>
          </div>

          {/* Call To Action Button (Buka Undangan) */}
          <div className="mt-5 pt-1">
            <button
              onClick={handleOpenClick}
              disabled={isOpening}
              type="button"
              className={`gold-shimmer-btn w-full py-3.5 px-6 rounded-full text-emerald-deep flex items-center justify-center space-x-2.5 transition-all duration-300 cursor-pointer shadow-glow-gold hover:brightness-105 active:scale-95 ${
                isOpening ? 'scale-95 brightness-110' : ''
              }`}
            >
              {isOpening ? (
                <>
                  <span className="tracking-widest uppercase font-bold text-xs text-emerald-deep font-sans">
                    Membuka Undangan...
                  </span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 text-emerald-deep" />
                  <span className="tracking-widest uppercase font-bold text-xs text-emerald-deep font-sans">
                    Buka Undangan
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Botanical Footer Signature */}
      <footer className="w-full text-center pb-3 pt-1 relative z-10">
        <p className="text-[10px] text-ivory/75 tracking-wider font-sans">
          Artworks by the Bride &bull; Handcrafted by the Groom
        </p>
        <p className="text-[9px] text-gold-pale/65 tracking-widest uppercase mt-0.5 font-sans">
          Made with love &bull; From Us
        </p>
      </footer>
    </div>
  );
}
