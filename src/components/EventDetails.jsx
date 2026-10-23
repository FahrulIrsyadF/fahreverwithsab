import React from 'react';
import { Calendar, MapPin, ExternalLink, Clock } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function EventDetails() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="pt-8 pb-14 px-5 relative overflow-hidden" id="acara" ref={sectionRef}>
      {/* Section Header */}
      <div
        className={`text-center mb-10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <span className="text-[10px] sm:text-[11px] font-bold text-aqua-teal uppercase tracking-[0.28em] block mb-1 font-sans">
          Rangkaian Acara
        </span>
        <h2 className="font-headline text-3xl sm:text-4xl text-emerald-deep font-normal">
          Akad &amp; Resepsi
        </h2>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-2.5 rounded-full"></div>
      </div>

      <div className="space-y-7 max-w-md mx-auto">
        {/* Event Card 1: Akad Nikah */}
        <div
          className={`vellum-panel paper-grain rounded-3xl p-6 sm:p-8 shadow-soft relative overflow-hidden text-left border border-gold/40 transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Botanical Detail Watermark */}
          <img
            src="/assets/botanical-polygon.svg"
            alt="Botanical Detail"
            className="absolute -bottom-8 -right-8 w-32 h-32 object-contain opacity-20 pointer-events-none"
          />

          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-aqua-deep bg-aqua-tint px-3 py-1 rounded-full mb-3.5 border border-aqua/30 font-sans shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-aqua" />
            <span>Akad Nikah</span>
          </div>

          <h3 className="font-headline text-2xl font-bold text-emerald-deep mb-4 leading-snug">
            Prosesi Ijab Kabul
          </h3>

          <div className="space-y-3 mb-6 relative z-10">
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-aqua-teal shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-emerald-deep font-sans">Sabtu, 17 Juli 2027</div>
                <div className="text-[11px] text-charcoal-muted font-sans flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-gold" />
                  <span>Pukul 08.00 — 10.00 WIB</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-aqua-teal shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-emerald-deep font-sans">Kediaman Mempelai Wanita</div>
                <div className="text-[11px] text-charcoal-muted leading-relaxed font-sans mt-0.5">
                  Jl. Kotaanyar, RT.24/RW.7, Dusun Krajan, Sumberanyar, Kec. Paiton, Kabupaten Probolinggo, Jawa Timur
                </div>
              </div>
            </div>
          </div>

          <a
            href="https://maps.app.goo.gl/BiL6MrhrF899WbYa7"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl border border-gold/60 text-emerald-deep hover:bg-emerald-deep hover:text-gold-pale hover:border-gold transition-all duration-300 text-xs font-semibold flex items-center justify-center gap-2 font-sans relative z-10 bg-ivory/80 shadow-xs active:scale-95"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Buka Petunjuk Lokasi (Google Maps)</span>
          </a>
        </div>

        {/* Event Card 2: Resepsi */}
        <div
          className={`vellum-panel paper-grain rounded-3xl p-6 sm:p-8 shadow-soft relative overflow-hidden text-left border border-gold/40 transition-all duration-900 delay-150 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <img
            src="/assets/botanical-polygon.svg"
            alt="Botanical Detail"
            className="absolute -bottom-8 -right-8 w-32 h-32 object-contain opacity-20 pointer-events-none"
          />

          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-emerald-deep bg-emerald-tint px-3 py-1 rounded-full mb-3.5 border border-emerald/25 font-sans shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
            <span>Resepsi</span>
          </div>

          <h3 className="font-headline text-2xl font-bold text-emerald-deep mb-4 leading-snug">
            Resepsi Pernikahan
          </h3>

          <div className="space-y-3 mb-6 relative z-10">
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-aqua-teal shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-emerald-deep font-sans">Sabtu, 17 Juli 2027</div>
                <div className="text-[11px] text-charcoal-muted font-sans flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-gold" />
                  <span>Pukul 13.00 — 15.00 WIB</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-aqua-teal shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-emerald-deep font-sans">Aula Perumahan PT. PLN Nusantara Power Paiton</div>
                <div className="text-[11px] text-charcoal-muted leading-relaxed font-sans mt-0.5">
                  Dusun Kp. Baru, Sukodadi, Kec. Paiton, Kabupaten Probolinggo, Jawa Timur 67291
                </div>
              </div>
            </div>
          </div>

          <a
            href="https://maps.app.goo.gl/L3KS9tdByCaby4BC9"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl border border-gold/60 text-emerald-deep hover:bg-emerald-deep hover:text-gold-pale hover:border-gold transition-all duration-300 text-xs font-semibold flex items-center justify-center gap-2 font-sans relative z-10 bg-ivory/80 shadow-xs active:scale-95"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Buka Petunjuk Lokasi (Google Maps)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
