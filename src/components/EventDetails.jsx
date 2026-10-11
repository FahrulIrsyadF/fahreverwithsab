import React from 'react';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';

export default function EventDetails() {
  return (
    <section className="pt-6 pb-12 px-5" id="acara">
      <div className="text-center mb-8">
        <span className="text-[11px] font-bold text-gold uppercase tracking-[0.25em] block mb-1 font-sans">
          Rangkaian Acara
        </span>
        <h2 className="font-headline text-3xl sm:text-4xl text-emerald-deep font-normal">
          Akad &amp; Resepsi
        </h2>
        <div className="w-12 h-0.5 bg-gold/50 mx-auto mt-2 rounded-full"></div>
      </div>

      <div className="space-y-6">
        {/* Event Card 1: Akad Nikah */}
        <div className="vellum-panel rounded-2xl p-6 sm:p-7 shadow-soft relative overflow-hidden text-left">
          {/* Botanical Detail Watermark */}
          <img
            src="/assets/botanical-polygon.svg"
            alt="Botanical Detail"
            className="absolute -bottom-8 -right-8 w-32 h-32 object-contain opacity-20 pointer-events-none"
          />

          <div className="inline-block text-[10px] font-bold tracking-widest uppercase text-aqua-deep bg-aqua-tint px-3 py-1 rounded-full mb-3 border border-aqua/20 font-sans">
            Akad Nikah
          </div>

          <h3 className="font-headline text-2xl font-bold text-emerald-deep mb-4">
            Prosesi Ijab Kabul
          </h3>

          <div className="space-y-3 mb-6 relative z-10">
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-emerald-deep font-sans">Sabtu, 17 Juli 2027</div>
                <div className="text-[11px] text-charcoal-muted font-sans">Pukul 08.00 — 10.00 WIB</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-emerald-deep font-sans">Rumah Mempelai Wanita</div>
                <div className="text-[11px] text-charcoal-muted leading-relaxed font-sans">
                  Jl. Kotaanyar, RT.24/RW.7, Dusun Krajan, Sumberanyar, Kec. Paiton, Kabupaten Probolinggo, Jawa Timur
                </div>
              </div>
            </div>
          </div>

          <a
            href="https://maps.app.goo.gl/BiL6MrhrF899WbYa7"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-full border border-gold/60 text-emerald-deep hover:bg-emerald hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-2 font-sans relative z-10 bg-ivory/50"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Buka Petunjuk Lokasi
          </a>
        </div>

        {/* Event Card 2: Resepsi */}
        <div className="vellum-panel rounded-2xl p-6 sm:p-7 shadow-soft relative overflow-hidden text-left">
          <img
            src="/assets/botanical-polygon.svg"
            alt="Botanical Detail"
            className="absolute -bottom-8 -right-8 w-32 h-32 object-contain opacity-20 pointer-events-none"
          />

          <div className="inline-block text-[10px] font-bold tracking-widest uppercase text-aqua-deep bg-aqua-tint px-3 py-1 rounded-full mb-3 border border-aqua/20 font-sans">
            Resepsi
          </div>

          <h3 className="font-headline text-2xl font-bold text-emerald-deep mb-4">
            Resepsi Pernikahan
          </h3>

          <div className="space-y-3 mb-6 relative z-10">
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-emerald-deep font-sans">Sabtu, 17 Juli 2027</div>
                <div className="text-[11px] text-charcoal-muted font-sans">Pukul 13.00 — 15.00 WIB</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-emerald-deep font-sans">Aula Perumahan PT. PLN Nusantara Power Paiton</div>
                <div className="text-[11px] text-charcoal-muted leading-relaxed font-sans">
                  Dusun Kp. Baru, Sukodadi, Kec. Paiton, Kabupaten Probolinggo, Jawa Timur 67291
                </div>
              </div>
            </div>
          </div>

          <a
            href="https://maps.app.goo.gl/L3KS9tdByCaby4BC9"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-full border border-gold/60 text-emerald-deep hover:bg-emerald hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-2 font-sans relative z-10 bg-ivory/50"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Buka Petunjuk Lokasi
          </a>
        </div>
      </div>
    </section>
  );
}
