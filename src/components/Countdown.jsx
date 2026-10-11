import React, { useState, useEffect } from 'react';

export default function Countdown() {
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

  return (
    <section className="py-6 px-5 text-center">
      <div className="p-6 sm:p-8 rounded-2xl bg-emerald text-white border border-gold/40 shadow-xl relative overflow-hidden">
        {/* Botanical Corner Ornaments from Stitch */}
        <img
          src="/assets/botanical-crest.svg"
          alt="Botanical Corner"
          className="absolute -top-12 -right-12 w-36 h-36 object-contain opacity-20 pointer-events-none"
        />
        <img
          src="/assets/botanical-crest.svg"
          alt="Botanical Corner"
          className="absolute -bottom-12 -left-12 w-36 h-36 object-contain opacity-20 pointer-events-none"
        />

        <div className="relative z-10">
          <span className="text-[11px] font-bold text-gold-pale uppercase tracking-[0.25em] block mb-1 font-sans">
            Menghitung Hari Bahagia
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl text-white font-normal mb-2">
            Save The Date
          </h2>
          <div className="w-10 h-0.5 bg-gold-pale/50 mx-auto mb-6 rounded-full"></div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm mx-auto">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <span className="font-headline text-2xl sm:text-3xl font-bold text-gold-pale block leading-none mb-1">
                {timeLeft.days}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-white/80 font-medium font-sans">
                Hari
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <span className="font-headline text-2xl sm:text-3xl font-bold text-gold-pale block leading-none mb-1">
                {timeLeft.hours}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-white/80 font-medium font-sans">
                Jam
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <span className="font-headline text-2xl sm:text-3xl font-bold text-gold-pale block leading-none mb-1">
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-white/80 font-medium font-sans">
                Menit
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
              <span className="font-headline text-2xl sm:text-3xl font-bold text-gold-pale block leading-none mb-1">
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-white/80 font-medium font-sans">
                Detik
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
