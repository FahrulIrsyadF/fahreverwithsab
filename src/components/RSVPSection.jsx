import React, { useState, useEffect } from 'react';
import { Check, X, Send, Loader2 } from 'lucide-react';

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
      if (Array.isArray(data)) {
        setWishes(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
    } catch (err) {
      console.warn('Gagal memuat ucapan dari Google Sheets, menggunakan cache lokal:', err);
    }
  };

  useEffect(() => {
    // 1. Muat dari localStorage jika ada untuk render awal
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setWishes(JSON.parse(saved));
      } catch {
        setWishes([]);
      }
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
      guestCount: parseInt(guestCount, 10) || 1,
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
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tulis nama lengkap Anda..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-gold/30 text-emerald-deep font-medium outline-none focus:border-aqua transition-colors text-xs font-sans"
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
            disabled={isSubmitting}
            className="gold-shimmer-btn w-full py-3 px-6 rounded-full text-emerald-deep font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-glow-gold hover:brightness-105 active:scale-95 transition-all font-sans disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 text-emerald-deep animate-spin" />
                Mengirimkan...
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 text-emerald-deep" />
                Kirim Konfirmasi &amp; Doa
              </>
            )}
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
            {wishes.length === 0 ? (
              <div className="py-6 text-center text-xs text-charcoal-muted/70 italic font-sans">
                Belum ada ucapan doa. Jadilah yang pertama memberikan doa restu!
              </div>
            ) : (
              wishes.map((w, index) => (
                <div
                  key={index}
                  className="bg-white/80 border border-gold/25 rounded-xl p-3.5 text-xs text-charcoal shadow-xs"
                >
                  <div className="mb-1">
                    <span className="font-bold text-emerald-deep text-xs font-sans">{w.name}</span>
                  </div>
                  <p className="text-charcoal-muted leading-relaxed mt-1 font-sans">{w.message}</p>
                  <div className="text-[10px] text-gray-400 mt-2 font-sans">{formatWishTime(w.time)}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
