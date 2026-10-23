import React, { useState, useEffect } from 'react';
import { CalendarPlus } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

function RollingUnit({ value, label, delay = 0, isVisible }) {
  return (
    <div
      className={`p-3 sm:p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-aqua-soft/30 shadow-inner reveal-scale-bloom ${
        isVisible ? 'is-revealed' : ''
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="h-8 sm:h-9 overflow-hidden flex items-center justify-center mb-1">
        <span
          key={value}
          className="font-headline text-2xl sm:text-3xl font-bold text-gold-pale block leading-none tabular-nums animate-ticker"
        >
          {value}
        </span>
      </div>
      <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-aqua-soft font-semibold font-sans block">
        {label}
      </span>
    </div>
  );
}

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
    <section
      ref={sectionRef}
      className="pt-12 pb-8 px-5 text-center relative overflow-hidden bg-gradient-to-b from-[#00281F] via-[#003830] to-[#00443B] rounded-t-[44px] border-t-2 border-gold/45"
    >
      {/* Ambient Aquamarine Radiance (Hanya di bagian atas tengah agar sambungan bawah ke EventDetails 100% mulus) */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-48 bg-aqua-glow/15 rounded-full blur-3xl pointer-events-none" />

      {/* Botanical Corner Ornament (Hanya di sudut kanan atas) */}
      <img
        src="/assets/botanical-crest.svg"
        alt=""
        aria-hidden="true"
        className="absolute -top-10 -right-10 w-36 h-36 object-contain opacity-25 pointer-events-none animate-botanical-sway"
      />
      <img
        src="/assets/botanical-crest.svg"
        alt=""
        aria-hidden="true"
        className="absolute -top-10 -left-10 w-36 h-36 object-contain opacity-20 pointer-events-none animate-botanical-sway"
      />

      <div className="relative z-10 max-w-md mx-auto">
        <div className={`reveal-blur-up ${isVisible ? 'is-revealed' : ''}`}>
          <span className="text-[10px] sm:text-[11px] font-bold text-aqua-soft uppercase tracking-[0.28em] block mb-1 font-sans">
            Menghitung Hari Bahagia
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl text-ivory font-normal mb-2">
            Save The Date
          </h2>
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-7 rounded-full"></div>
        </div>

        {/* 4 Rolling Digits with Vertical Ticker Animation & Tabular Nums */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 max-w-sm mx-auto mb-7">
          <RollingUnit value={timeLeft.days} label="Hari" delay={100} isVisible={isVisible} />
          <RollingUnit value={timeLeft.hours} label="Jam" delay={180} isVisible={isVisible} />
          <RollingUnit value={timeLeft.minutes} label="Menit" delay={260} isVisible={isVisible} />
          <RollingUnit value={timeLeft.seconds} label="Detik" delay={340} isVisible={isVisible} />
        </div>

        {/* Add to Google Calendar CTA */}
        <div
          className={`flex justify-center reveal-blur-up ${isVisible ? 'is-revealed' : ''}`}
          style={{ transitionDelay: '420ms' }}
        >
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-shimmer-btn inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-deep hover:brightness-105 active:scale-95 transition-all shadow-glow-gold font-sans"
          >
            <CalendarPlus className="w-4 h-4 text-emerald-deep" />
            <span>Simpan ke Google Calendar</span>
          </a>
        </div>
      </div>
    </section>
  );
}
