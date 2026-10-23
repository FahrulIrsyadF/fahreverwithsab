import React from 'react';
import { Mail, Calendar, Volume2 } from 'lucide-react';

export default function CoverScreen({ guestName, isOpened, onOpen }) {
  return (
    <div
      className={`fixed inset-0 w-full max-w-lg mx-auto h-screen z-50 flex flex-col justify-between px-5 py-6 transition-all duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] foliage-watermark overflow-hidden ${
        isOpened
          ? '-translate-y-full opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100 bg-ivory'
      }`}
    >
      {/* Atmospheric Background Blobs & Geometric Circles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex justify-center">
        <div className="w-full max-w-lg h-full relative">
          <div className="absolute -top-16 -left-20 w-80 h-96 bg-emerald/20 rounded-full blur-3xl mix-blend-multiply opacity-60"></div>
          <div className="absolute top-1/4 -right-24 w-80 h-96 bg-aqua-glow/25 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-light/20 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute inset-8 border border-gold/15 rounded-full pointer-events-none"></div>
        </div>
      </div>

      {/* Top Header Bar */}
      <header className="w-full flex items-center justify-between pt-1 px-1 relative z-10">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-bold text-emerald tracking-[0.2em] uppercase font-sans">
            Fahrul &amp; Sabrina
          </span>
        </div>

        <div className="flex items-center space-x-1.5 bg-ivory-subtle/90 backdrop-blur-md px-3 py-1 rounded-full border border-gold/30 shadow-xs">
          <Volume2 className="w-3.5 h-3.5 text-gold-deep animate-pulse" />
          <span className="text-[10px] tracking-wider text-charcoal-muted font-semibold uppercase font-sans">
            Musik Latar
          </span>
        </div>
      </header>

      {/* Center Envelope Hero Card (Vellum Panel) */}
      <div className="my-auto py-2 relative z-10">
        <div className="vellum-panel rounded-3xl p-6 sm:p-7 relative text-center overflow-hidden">
          
          {/* Crest With Botanical Gold Frame */}
          <div className="flex justify-center mb-3">
            <div className="relative w-40 h-40 flex items-center justify-center my-1 animate-aura">
              <img
                src="/assets/botanical-crest.svg"
                alt="Botanical Gold Frame"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-sm select-none"
              />
              <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-emerald to-emerald-deep flex flex-col items-center justify-center shadow-lg border-2 border-gold-light/60">
                <div className="absolute inset-1 rounded-full border border-dashed border-gold-light/40 pointer-events-none"></div>
                <span className="font-headline text-lg text-gold-light tracking-wider font-semibold z-10">
                  F &amp; S
                </span>
              </div>
            </div>
          </div>

          {/* Over-title Section */}
          <div className="space-y-1 mb-1.5">
            <p className="text-[11px] font-bold text-emerald tracking-[0.25em] uppercase font-sans">
              THE WEDDING OF
            </p>
            <div className="h-0.5 w-12 bg-gold/50 mx-auto rounded-full"></div>
          </div>

          {/* Main Names Editorial Script Pairing */}
          <h1 className="font-headline text-4xl sm:text-5xl text-emerald-deep tracking-tight leading-tight my-1 font-normal">
            Fahrul <span className="font-headline italic font-normal text-gold">&amp;</span> Sabrina
          </h1>

          {/* Ceremonial Date Tag */}
          <div className="inline-flex items-center space-x-2 my-2.5 px-4 py-1.5 rounded-full bg-ivory-container/80 border border-gold/30">
            <Calendar className="w-3.5 h-3.5 text-emerald" />
            <p className="text-xs text-charcoal font-semibold tracking-wide font-sans">
              Sabtu, 17 Juli 2027
            </p>
          </div>

          {/* Soft Divider with Diamond */}
          <div className="flex items-center justify-center space-x-3 my-4 opacity-70">
            <div className="h-[1px] w-12 bg-gold/30"></div>
            <div className="w-1.5 h-1.5 bg-gold rotate-45"></div>
            <div className="h-[1px] w-12 bg-gold/30"></div>
          </div>

          {/* Guest Validation Section (Kepada Yth) */}
          <div className="bg-ivory/95 border border-gold/40 rounded-2xl p-4 shadow-xs relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
            <p className="text-[10px] text-charcoal-muted uppercase tracking-widest mb-1.5 font-medium font-sans">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>

            <div className="my-1.5 py-1.5 px-3 bg-ivory-subtle rounded-xl border border-gold/40 inline-block max-w-full">
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
              onClick={onOpen}
              type="button"
              className="gold-shimmer-btn w-full py-3.5 px-6 rounded-full text-emerald-deep flex items-center justify-center space-x-2.5 active:scale-95 transition-all duration-200 cursor-pointer shadow-glow-gold hover:brightness-105"
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
        <p className="text-[10px] text-charcoal-muted tracking-wider font-sans">
          Artworks by the Bride &bull; Handcrafted by the Groom
        </p>
        <p className="text-[9px] text-charcoal-muted/60 tracking-widest uppercase mt-0.5 font-sans">
          Made with love &bull; From Us
        </p>
      </footer>
    </div>
  );
}
