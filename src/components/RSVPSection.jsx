import React, { useState, useEffect } from 'react';
import { Check, X, Send, Loader2 } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyn4MeYgGU1Z4cYzOnsVJKcvHX_HSLzjLiZvow12paTs0ebaPTlR_GFhWqVECn0pa6n/exec';
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

// Helper untuk format waktu ke jam & menit
const formatWishTime = (timeStr) => {
  if (!timeStr) return '';
  if (timeStr === 'Baru saja' || timeStr.includes('yang lalu')) return timeStr;

  const date = new Date(timeStr);
  if (!isNaN(date.getTime()) && timeStr.includes('T')) {
    return (
      new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
        .format(date)
        .replace('.', ':') + ' WIB'
    );
  }

  return timeStr;
};

export default function RSVPSection({ guestName }) {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.08 });
  const [name, setName] = useState(guestName || '');
  const [attendance, setAttendance] = useState('Hadir');
  const [guestCount, setGuestCount] = useState('1');
  const [message, setMessage] = useState('');
  const [wishes, setWishes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Sinkronisasi jika nama tamu dari prop URL berubah
  useEffect(() => {
    if (guestName) {
      setName(guestName);
    }
  }, [guestName]);

  // Fetch data terbaru dari Google Sheets
  const fetchWishes = async () => {
    try {
      const res = await fetch(SCRIPT_URL);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setWishes(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
    } catch (err) {
      console.warn('Gagal memuat ucapan dari Google Sheets, menggunakan cache lokal:', err);
    }
  };

  useEffect(() => {
    // 1. Muat dari localStorage jika ada untuk render awal, fallback ke DEFAULT_WISHES
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setWishes(Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_WISHES);
      } catch {
        setWishes(DEFAULT_WISHES);
      }
    } else {
      setWishes(DEFAULT_WISHES);
    }

    // 2. Tarik data riil dari Google Sheets
    fetchWishes();

    // 3. Polling tiap 30 detik agar ucapan tamu lain otomatis masuk
    const interval = setInterval(fetchWishes, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const now = new Date();
    const formattedNow =
      new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
        .format(now)
        .replace('.', ':') + ' WIB';

    const newWish = {
      name: name.trim(),
      attendance: attendance,
      guestCount: attendance === 'Hadir' ? (parseInt(guestCount, 10) || 1) : 0,
      message: message.trim(),
      time: formattedNow
    };

    // Optimistic UI update: langsung muncul seketika di layar tanpa menunggu respons jaringan
    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setMessage('');
    setShowToast(true);

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(newWish)
      });
    } catch (err) {
      console.error('Gagal mengirim ke Google Sheets:', err);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    }
  };

  return (
    <section className="pt-8 pb-14 px-5 text-center relative overflow-hidden" id="rsvp" ref={sectionRef}>
      {/* Section Header */}
      <div
        className={`text-center mb-10 reveal-blur-up ${
          isVisible ? 'is-revealed' : ''
        }`}
      >
        <span className="text-[10px] sm:text-[11px] font-bold text-aqua-teal uppercase tracking-[0.28em] block mb-1 font-sans">
          Kehadiran &amp; Doa
        </span>
        <h2 className="font-headline text-3xl sm:text-4xl text-emerald-deep font-normal">
          Konfirmasi Kehadiran
        </h2>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-2.5 rounded-full"></div>
      </div>

      <div
        className={`max-w-md mx-auto vellum-panel rounded-3xl p-6 sm:p-8 shadow-soft border border-gold/40 text-left relative overflow-hidden reveal-scale-bloom ${
          isVisible ? 'is-revealed' : ''
        }`}
        style={{ transitionDelay: '140ms' }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-emerald uppercase mb-1.5 tracking-wider font-sans">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tulis nama lengkap Anda..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold/30 text-emerald-deep font-medium outline-none focus:border-aqua transition-colors text-xs font-sans shadow-sm"
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
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all font-sans cursor-pointer ${
                  attendance === 'Hadir'
                    ? 'bg-aqua-tint border-aqua text-aqua-deep shadow-sm'
                    : 'bg-white/60 border-gold/30 text-charcoal-muted hover:border-gold'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>Hadir</span>
              </button>

              <button
                type="button"
                onClick={() => setAttendance('Tidak Hadir')}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all font-sans cursor-pointer ${
                  attendance === 'Tidak Hadir'
                    ? 'bg-red-50 border-red-300 text-red-700 shadow-sm'
                    : 'bg-white/60 border-gold/30 text-charcoal-muted hover:border-gold'
                }`}
              >
                <X className="w-3.5 h-3.5" />
                <span>Berhalangan</span>
              </button>
            </div>
          </div>

          {attendance === 'Hadir' && (
            <div className="animate-fadeIn">
              <label className="block text-[11px] font-bold text-emerald uppercase mb-1.5 tracking-wider font-sans">
                Jumlah Tamu
              </label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold/30 text-emerald-deep outline-none focus:border-aqua text-xs font-sans shadow-sm"
              >
                <option value="1">1 Orang</option>
                <option value="2">2 Orang</option>
              </select>
            </div>
          )}

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
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gold/30 text-emerald-deep outline-none focus:border-aqua transition-colors resize-none text-xs font-sans shadow-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="gold-shimmer-btn w-full py-3.5 px-6 rounded-full text-emerald-deep font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-glow-gold hover:brightness-105 active:scale-95 transition-all font-sans disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 text-emerald-deep animate-spin" />
                <span>Mengirimkan Doa...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 text-emerald-deep" />
                <span>Kirim Konfirmasi &amp; Doa</span>
              </>
            )}
          </button>

          {showToast && (
            <div className="p-3 bg-emerald-tint border border-emerald text-emerald-rich text-xs font-semibold rounded-xl text-center animate-pulse font-sans">
              Terima kasih atas konfirmasi kehadiran dan doa restu Anda.
            </div>
          )}
        </form>

        {/* Wishes Stream */}
        <div className="mt-8 pt-6 border-t border-gold/25">
          <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-aqua-teal mb-4 text-center font-sans">
            Doa &amp; Ucapan Tamu
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {wishes.length === 0 ? (
              <div className="py-6 text-center text-xs text-charcoal-muted/70 italic font-sans">
                Belum ada ucapan doa. Jadilah yang pertama memberikan doa restu!
              </div>
            ) : (
              wishes.map((w, index) => {
                const initial = (w.name || 'T').trim().charAt(0).toUpperCase();
                const isPresent = w.attendance === 'Hadir';

                return (
                  <div
                    key={index}
                    className="bg-white/90 border border-gold/30 rounded-2xl p-4 text-xs text-charcoal shadow-sm flex items-start gap-3"
                  >
                    {/* User Initial Avatar in Emerald-Aqua Jewel Gradient */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-deep via-[#00483E] to-aqua text-gold-pale flex items-center justify-center font-headline font-bold text-xs shrink-0 shadow-sm border border-gold/40">
                      {initial}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-emerald-deep text-xs font-sans truncate">{w.name}</span>
                        <span
                          className={`text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border font-sans shrink-0 ${
                            isPresent
                              ? 'bg-aqua-tint text-aqua-deep border-aqua/30'
                              : 'bg-gray-100 text-charcoal-muted border-gray-200'
                          }`}
                        >
                          {isPresent ? 'Hadir' : 'Berhalangan'}
                        </span>
                      </div>
                      <p className="text-charcoal-muted leading-relaxed font-sans text-xs">{w.message}</p>
                      <div className="text-[10px] text-charcoal-muted/60 mt-1.5 font-sans">{formatWishTime(w.time)}</div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
