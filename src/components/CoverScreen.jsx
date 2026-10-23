import React, { useState } from 'react';
import { Mail, Calendar, Volume2 } from 'lucide-react';
import BrandMonogram from './BrandMonogram';

export default function CoverScreen({ guestName, isOpened, onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 280);
  };

  return (
    <div
      className={`fixed inset-0 w-full max-w-lg mx-auto h-screen z-50 flex flex-col justify-between px-5 py-6 transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] overflow-hidden ${
        isOpened
          ? '-translate-y-full opacity-0 pointer-events-none scale-105 blur-sm'
          : 'translate-y-0 opacity-100 bg-gradient-to-b from-[#01251C] via-[#003A32] to-[#002319]'
      }`}
    >
      {/* Atmospheric Background Blobs & Aquamarine Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex justify-center">
        <div className="w-full max-w-lg h-full relative">
          <div className="absolute -top-16 -left-20 w-80 h-96 bg-emerald-rich/30 rounded-full blur-3xl mix-blend-screen opacity-70"></div>
          <div className="absolute top-1/3 -right-20 w-80 h-96 bg-aqua-glow/20 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-96 h-80 bg-gold/15 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute inset-6 border border-gold/15 rounded-full pointer-events-none"></div>
        </div>
      </div>

      {/* Top Header Bar */}
      <header className="w-full flex items-center justify-between pt-1 px-1 relative z-10">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-bold text-aqua-soft tracking-[0.25em] uppercase font-sans drop-shadow-sm">
            Fahrul &amp; Sabrina
          </span>
        </div>

        <div className="flex items-center space-x-1.5 bg-[#012b23]/80 backdrop-blur-md px-3 py-1 rounded-full border border-aqua/30 shadow-sm">
          <Volume2 className="w-3.5 h-3.5 text-gold animate-pulse" />
          <span className="text-[10px] tracking-wider text-ivory/80 font-semibold uppercase font-sans">
            Musik Latar
          </span>
        </div>
      </header>

      {/* Center Envelope Hero Card (Vellum Panel on Jewel Canvas) */}
      <div className="my-auto py-2 relative z-10">
        <div className="vellum-panel paper-grain rounded-3xl p-6 sm:p-7 relative text-center overflow-hidden border border-gold/40 shadow-2xl">
          
          {/* Crest With Botanical Gold Frame & Aquamarine Ambient Glow */}
          <div className="flex justify-center mb-2">
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center my-1 animate-aura">
              <img
                src="/assets/botanical-crest.svg"
                alt="Botanical Gold Frame"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-sm select-none"
              />
              <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-deep via-[#00483E] to-emerald flex flex-col items-center justify-center shadow-lg border-2 border-gold-light/70">
                <div className="absolute inset-1 rounded-full border border-dashed border-gold-light/40 pointer-events-none"></div>
                <div className={`z-10 transition-transform duration-300 ${isOpening ? 'scale-110' : 'scale-100'}`}>
                  <BrandMonogram size="md" variant="gold" />
                </div>
              </div>
            </div>
          </div>

          {/* Over-title Section */}
          <div className="space-y-1 mb-1">
            <p className="text-[10px] sm:text-[11px] font-bold text-emerald tracking-[0.25em] uppercase font-sans">
              THE WEDDING CELEBRATION OF
            </p>
            <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto rounded-full"></div>
          </div>

          {/* Main Names Editorial Script Pairing */}
          <h1 className="font-headline text-4xl sm:text-5xl text-emerald-deep tracking-tight leading-tight my-1 font-normal">
            Fahrul <span className="font-headline italic font-normal text-gold">&amp;</span> Sabrina
          </h1>

          {/* Ceremonial Date Tag */}
          <div className="inline-flex items-center space-x-2 my-2 px-4 py-1.5 rounded-full bg-ivory-container/90 border border-gold/35 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-aqua-teal" />
            <p className="text-xs text-charcoal font-semibold tracking-wide font-sans">
              Sabtu, 17 Juli 2027
            </p>
          </div>

          {/* Soft Divider with Diamond */}
          <div className="flex items-center justify-center space-x-3 my-3 opacity-70">
            <div className="h-[1px] w-12 bg-gold/30"></div>
            <div className="w-1.5 h-1.5 bg-gold rotate-45"></div>
            <div className="h-[1px] w-12 bg-gold/30"></div>
          </div>

          {/* Guest Validation Section (Kepada Yth) */}
          <div className="bg-ivory/95 border border-gold/40 rounded-2xl p-4 shadow-sm relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-aqua/60 to-transparent"></div>
            <p className="text-[10px] text-charcoal-muted uppercase tracking-widest mb-1.5 font-medium font-sans">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>

            <div className="my-1.5 py-1.5 px-3 bg-ivory-subtle rounded-xl border border-gold/40 inline-block max-w-full shadow-xs">
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
              <Mail className="w-4 h-4 text-emerald-deep" />
              <span className="tracking-widest uppercase font-bold text-xs text-emerald-deep font-sans">
                Buka Undangan
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Botanical Footer Signature */}
      <footer className="w-full text-center pb-3 pt-1 relative z-10">
        <p className="text-[10px] text-ivory/70 tracking-wider font-sans">
          Artworks by the Bride &bull; Handcrafted by the Groom
        </p>
        <p className="text-[9px] text-gold-pale/60 tracking-widest uppercase mt-0.5 font-sans">
          Made with love &bull; From Us
        </p>
      </footer>
    </div>
  );
}
