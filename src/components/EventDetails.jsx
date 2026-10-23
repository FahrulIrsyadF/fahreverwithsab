import React from 'react';
import { Calendar, MapPin, ExternalLink, Clock } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function EventDetails() {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.15 });
  const [akadRef, akadVisible] = useScrollReveal({ threshold: 0.15 });
  const [resepsiRef, resepsiVisible] = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      className="-mt-px pt-6 pb-16 px-5 relative overflow-hidden bg-gradient-to-b from-[#00443B] via-[#003830] to-[#00261E] rounded-b-[44px] border-b-2 border-gold/45"
      id="acara"
    >
      {/* Ambient Aquamarine & Gold Glow (Di tengah-bawah agar tidak memotong sambungan atas dengan Countdown) */}
      <div className="absolute top-1/2 -right-24 w-60 h-60 bg-aqua-glow/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-4 -left-24 w-60 h-60 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header on Dark Jewel Canvas */}
      <div
        ref={headerRef}
        className={`text-center mb-10 relative z-10 reveal-blur-up ${
          headerVisible ? 'is-revealed' : ''
        }`}
      >
        <span className="text-[10px] sm:text-[11px] font-bold text-aqua-soft uppercase tracking-[0.28em] block mb-1 font-sans">
          Rangkaian Acara
        </span>
        <h2 className="font-headline text-3xl sm:text-4xl text-ivory font-normal">
          Akad &amp; Resepsi
        </h2>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-2.5 rounded-full"></div>
      </div>

      <div className="space-y-7 max-w-md mx-auto relative z-10">
        {/* Event Card 1: Akad Nikah */}
        <div
          ref={akadRef}
          className={`vellum-panel rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-left border border-gold/50 reveal-slide-left ${
            akadVisible ? 'is-revealed' : ''
          }`}
        >
          {/* Top Accent Line */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-aqua-teal via-aqua to-gold" />

          {/* Botanical Detail Watermark */}
          <img
            src="/assets/botanical-polygon.svg"
            alt=""
            aria-hidden="true"
            className="absolute -bottom-8 -right-8 w-36 h-36 object-contain opacity-25 pointer-events-none animate-botanical-sway"
          />

          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-aqua-deep bg-aqua-tint px-3.5 py-1 rounded-full mb-3.5 border border-aqua/35 font-sans shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-aqua animate-pulse" />
            <span>Akad Nikah &bull; 01</span>
          </div>

          <h3 className="font-headline text-2xl font-bold text-emerald-deep mb-4 leading-snug">
            Prosesi Ijab Kabul
          </h3>

          <div className="space-y-3.5 mb-6 relative z-10">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-aqua-tint/80 border border-aqua/30 flex items-center justify-center shrink-0 mt-0.5">
                <Calendar className="w-4 h-4 text-aqua-teal" />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-deep font-sans">Sabtu, 17 Juli 2027</div>
                <div className="text-[11px] text-charcoal-muted font-sans flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3 h-3 text-gold-deep" />
                  <span>Pukul 08.00 — 10.00 WIB</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-aqua-tint/80 border border-aqua/30 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-aqua-teal" />
              </div>
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
            className="w-full py-3 px-4 rounded-xl border border-gold/60 text-ivory bg-gradient-to-r from-emerald-deep via-aqua-teal to-emerald-deep hover:brightness-110 transition-all duration-300 text-xs font-semibold flex items-center justify-center gap-2 font-sans relative z-10 shadow-md active:scale-95"
          >
            <ExternalLink className="w-3.5 h-3.5 text-gold-pale" />
            <span>Buka Petunjuk Lokasi (Google Maps)</span>
          </a>
        </div>

        {/* Event Card 2: Resepsi */}
        <div
          ref={resepsiRef}
          className={`vellum-panel rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-left border border-gold/50 reveal-slide-right ${
            resepsiVisible ? 'is-revealed' : ''
          }`}
        >
          {/* Top Accent Line */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold via-aqua to-emerald-deep" />

          <img
            src="/assets/botanical-polygon.svg"
            alt=""
            aria-hidden="true"
            className="absolute -bottom-8 -right-8 w-36 h-36 object-contain opacity-25 pointer-events-none animate-botanical-sway-bottom"
          />

          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-emerald-deep bg-emerald-tint px-3.5 py-1 rounded-full mb-3.5 border border-emerald/30 font-sans shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
            <span>Resepsi &bull; 02</span>
          </div>

          <h3 className="font-headline text-2xl font-bold text-emerald-deep mb-4 leading-snug">
            Resepsi Pernikahan
          </h3>

          <div className="space-y-3.5 mb-6 relative z-10">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-aqua-tint/80 border border-aqua/30 flex items-center justify-center shrink-0 mt-0.5">
                <Calendar className="w-4 h-4 text-aqua-teal" />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-deep font-sans">Sabtu, 17 Juli 2027</div>
                <div className="text-[11px] text-charcoal-muted font-sans flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3 h-3 text-gold-deep" />
                  <span>Pukul 13.00 — 15.00 WIB</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-aqua-tint/80 border border-aqua/30 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-aqua-teal" />
              </div>
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
            className="w-full py-3 px-4 rounded-xl border border-gold/60 text-ivory bg-gradient-to-r from-emerald-deep via-aqua-teal to-emerald-deep hover:brightness-110 transition-all duration-300 text-xs font-semibold flex items-center justify-center gap-2 font-sans relative z-10 shadow-md active:scale-95"
          >
            <ExternalLink className="w-3.5 h-3.5 text-gold-pale" />
            <span>Buka Petunjuk Lokasi (Google Maps)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
