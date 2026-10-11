import React, { useState, useEffect } from 'react';
import { Check, X, Send } from 'lucide-react';

const STORAGE_KEY = 'wedding_wishes_fahrul_sabrina';

const DEFAULT_WISHES = [
  {
    name: "Ahmad Fauzi",
    attendance: "Hadir",
    message: "Barakallahu lakum wa baraka alaikum wa jama'a bainakuma fii khoir. Selamat menempuh hidup baru Fahrul & Sabrina!",
    time: "1 hari yang lalu"
  },
  {
    name: "Siti Aminah",
    attendance: "Hadir",
    message: "Selamat atas pernikahannya. Semoga senantiasa menjadi keluarga yang sakinah, mawaddah, warahmah.",
    time: "2 hari yang lalu"
  }
];

export default function RSVPSection({ guestName }) {
  const [attendance, setAttendance] = useState('Hadir');
  const [guestCount, setGuestCount] = useState('1');
  const [message, setMessage] = useState('');
  const [wishes, setWishes] = useState([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_WISHES));
      setWishes(DEFAULT_WISHES);
    } else {
      try {
        setWishes(JSON.parse(saved));
      } catch {
        setWishes(DEFAULT_WISHES);
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newWish = {
      name: guestName || 'Tamu Undangan',
      attendance: attendance,
      message: message.trim(),
      time: 'Baru saja'
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setMessage('');
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <section className="pt-6 pb-12 px-5 text-center" id="rsvp">
      <div className="text-center mb-8">
        <span className="text-[11px] font-bold text-gold uppercase tracking-[0.25em] block mb-1 font-sans">
          Kehadiran &amp; Doa
        </span>
        <h2 className="font-headline text-3xl sm:text-4xl text-emerald-deep font-normal">
          Konfirmasi Kehadiran
        </h2>
        <div className="w-12 h-0.5 bg-gold/50 mx-auto mt-2 rounded-full"></div>
      </div>

      <div className="vellum-panel rounded-2xl p-6 sm:p-7 shadow-soft border border-gold/40 text-left">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-emerald uppercase mb-1.5 tracking-wider font-sans">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={guestName}
              readOnly
              className="w-full px-3.5 py-2.5 rounded-lg bg-ivory-container/50 border border-gold/30 text-emerald-deep font-medium cursor-not-allowed outline-none text-xs font-sans"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-emerald uppercase mb-1.5 tracking-wider font-sans">
              Konfirmasi Kehadiran
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAttendance('Hadir')}
                className={`py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border transition-all font-sans ${
                  attendance === 'Hadir'
                    ? 'bg-aqua-tint border-aqua text-aqua-deep shadow-xs'
                    : 'bg-white/60 border-gold/30 text-charcoal-muted hover:border-gold'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                Hadir
              </button>

              <button
                type="button"
                onClick={() => setAttendance('Tidak Hadir')}
                className={`py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border transition-all font-sans ${
                  attendance === 'Tidak Hadir'
                    ? 'bg-red-50 border-red-300 text-red-700 shadow-xs'
                    : 'bg-white/60 border-gold/30 text-charcoal-muted hover:border-gold'
                }`}
              >
                <X className="w-3.5 h-3.5" />
                Berhalangan
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-emerald uppercase mb-1.5 tracking-wider font-sans">
              Jumlah Tamu
            </label>
            <select
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-gold/30 text-emerald-deep outline-none focus:border-aqua text-xs font-sans"
            >
              <option value="1">1 Orang</option>
              <option value="2">2 Orang</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-emerald uppercase mb-1.5 tracking-wider font-sans">
              Doa &amp; Ucapan
            </label>
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan doa restu untuk Fahrul & Sabrina..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-gold/30 text-emerald-deep outline-none focus:border-aqua transition-colors resize-none text-xs font-sans"
            />
          </div>

          <button
            type="submit"
            className="gold-shimmer-btn w-full py-3 px-6 rounded-full text-emerald-deep font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-glow-gold hover:brightness-105 active:scale-95 transition-all font-sans"
          >
            <Send className="w-3.5 h-3.5 text-emerald-deep" />
            Kirim Konfirmasi &amp; Doa
          </button>

          {showToast && (
            <div className="p-3 bg-emerald-tint border border-emerald text-emerald-rich text-xs font-semibold rounded-lg text-center animate-pulse font-sans">
              Terima kasih atas konfirmasi kehadiran dan doa restu Anda.
            </div>
          )}
        </form>

        {/* Wishes Stream */}
        <div className="mt-8 pt-6 border-t border-gold/25">
          <div className="text-[11px] font-bold tracking-widest uppercase text-gold mb-4 text-center font-sans">
            Doa &amp; Ucapan Tamu
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {wishes.map((w, index) => (
              <div
                key={index}
                className="bg-white/80 border border-gold/25 rounded-xl p-3.5 text-xs text-charcoal shadow-xs"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-emerald-deep text-xs font-sans">{w.name}</span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full font-sans ${
                      w.attendance === 'Tidak Hadir'
                        ? 'bg-gray-200 text-gray-600'
                        : 'bg-aqua-tint text-aqua-deep'
                    }`}
                  >
                    {w.attendance}
                  </span>
                </div>
                <p className="text-charcoal-muted leading-relaxed mt-1 font-sans">{w.message}</p>
                <div className="text-[10px] text-gray-400 mt-2 font-sans">{w.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
