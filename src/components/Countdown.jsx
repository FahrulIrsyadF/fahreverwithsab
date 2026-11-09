import { useEffect, useState } from 'react';
import { CalendarPlus } from 'lucide-react';
import { WEDDING } from '../data/wedding';
import './date/foil.css';

const pad = (n) => String(n).padStart(2, '0');

function calc(target) {
  const diff = target - Date.now();
  if (diff <= 0) return { days: '00', hours: '00', minutes: '00', seconds: '00' };
  return {
    days: pad(Math.floor(diff / 86400000)),
    hours: pad(Math.floor((diff % 86400000) / 3600000)),
    minutes: pad(Math.floor((diff % 3600000) / 60000)),
    seconds: pad(Math.floor((diff % 60000) / 1000)),
  };
}

function Unit({ value, label }) {
  return (
    <div className="cd-unit">
      <span className="cd-num">
        {/* key berubah → angka "bergulir" masuk */}
        <span key={value} className="animate-ticker">{value}</span>
      </span>
      <span className="cd-label">{label}</span>
    </div>
  );
}

/** Hitung mundur ke hari H + tombol simpan ke Google Calendar (dipakai di section Save the Date). */
export default function Countdown() {
  const target = new Date(WEDDING.dateISO).getTime();
  const [t, setT] = useState(() => calc(target));

  useEffect(() => {
    const id = setInterval(() => setT(calc(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="cd">
      <p className="eyebrow">Menghitung Hari Bahagia</p>
      <div className="cd-grid">
        <Unit value={t.days} label="Hari" />
        <Unit value={t.hours} label="Jam" />
        <Unit value={t.minutes} label="Menit" />
        <Unit value={t.seconds} label="Detik" />
      </div>
      <a className="btn-gold cd-cta" href={WEDDING.calendarUrl} target="_blank" rel="noopener noreferrer">
        <CalendarPlus className="w-4 h-4" aria-hidden="true" />
        Simpan ke Kalender
      </a>
    </div>
  );
}
