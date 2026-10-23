import React, { useState, useEffect } from 'react';
import { CalendarPlus } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Countdown() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 });

  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const targetDate = new Date('2027-07-17T08:00:00+07:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, []);

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+Wedding+of+Fahrul+%26+Sabrina&dates=20270717T010000Z/20270717T080000Z&details=Pernikahan+Fahrul+Irsyad+Fianto+%26+Sabrina+Nabila+Kholiqin.+Sabtu,+17+Juli+2027.&location=Paiton,+Kabupaten+Probolinggo,+Jawa+Timur`;

  return (
    <section className="py-8 px-5 text-center relative overflow-hidden" ref={sectionRef}>
      <div
        className={`p-6 sm:p-9 rounded-3xl bg-gradient-to-br from-[#003429] via-[#004B40] to-[#01261F] text-ivory border border-gold/40 shadow-2xl relative overflow-hidden transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
        }`}
      >
        {/* Ambient Aquamarine & Gold Radiance */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-aqua-glow/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gold-light/15 rounded-full blur-3xl pointer-events-none" />

        {/* Botanical Corner Ornaments with Organic Wind Sway */}
        <img
          src="/assets/botanical-crest.svg"
          alt="Botanical Corner"
          className="absolute -top-12 -right-12 w-36 h-36 object-contain opacity-25 pointer-events-none animate-botanical-sway"
        />
        <img
          src="/assets/botanical-crest.svg"
          alt="Botanical Corner"
          className="absolute -bottom-12 -left-12 w-36 h-36 object-contain opacity-25 pointer-events-none animate-botanical-sway-bottom"
        />

        <div className="relative z-10">
          <span className="text-[10px] sm:text-[11px] font-bold text-aqua-soft uppercase tracking-[0.28em] block mb-1 font-sans">
            Menghitung Hari Bahagia
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl text-ivory font-normal mb-2">
            Save The Date
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-7 rounded-full"></div>

          {/* 4 Rolling Digits with Tabular Nums */}
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 max-w-sm mx-auto mb-7">
            <div className="p-3 sm:p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
              <span className="font-headline text-2xl sm:text-3xl font-bold text-gold-pale block leading-none mb-1 tabular-nums">
                {timeLeft.days}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-ivory/80 font-semibold font-sans">
                Hari
              </span>
            </div>

            <div className="p-3 sm:p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
              <span className="font-headline text-2xl sm:text-3xl font-bold text-gold-pale block leading-none mb-1 tabular-nums">
                {timeLeft.hours}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-ivory/80 font-semibold font-sans">
                Jam
              </span>
            </div>

            <div className="p-3 sm:p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
              <span className="font-headline text-2xl sm:text-3xl font-bold text-gold-pale block leading-none mb-1 tabular-nums">
                {timeLeft.minutes}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-ivory/80 font-semibold font-sans">
                Menit
              </span>
            </div>

            <div className="p-3 sm:p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
              <span className="font-headline text-2xl sm:text-3xl font-bold text-gold-pale block leading-none mb-1 tabular-nums">
                {timeLeft.seconds}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-ivory/80 font-semibold font-sans">
                Detik
              </span>
            </div>
          </div>

          {/* Add to Google Calendar CTA */}
          <div className="flex justify-center">
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-emerald-deep bg-gradient-to-r from-gold-pale via-gold to-gold-light hover:brightness-105 active:scale-95 transition-all shadow-md font-sans"
            >
              <CalendarPlus className="w-4 h-4 text-emerald-deep" />
              <span>Simpan ke Google Calendar</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
