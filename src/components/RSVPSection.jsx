import { useState, useEffect } from 'react';
import { Check, X, Send, Loader2 } from 'lucide-react';
import SectionSeam from './ornaments/SectionSeam';
import { RoseVine } from './ornaments/Roses';
import './rsvp/rsvp.css';

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
    <section className="sec sec-light rsvp-sec" id="rsvp">
      <SectionSeam into="light" side="left" seed={91} />

      <header className="sec-head" data-reveal>
        <p className="eyebrow">Kehadiran &amp; Doa</p>
        <h2>Konfirmasi Kehadiran</h2>
        <p>Kehadiran dan doa Anda adalah hadiah paling berarti bagi kami.</p>
        <RoseVine className="sec-rule" w={220} h={40} seed={95} />
      </header>

      {/* Formulir langsung di atas kertas: garis tulis, bukan kotak di dalam kartu */}
      <form onSubmit={handleSubmit} className="sec-inner rsvp-form" data-reveal>
        <label className="rsvp-field">
          <span className="rsvp-label">Nama</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tulis nama lengkap Anda"
          />
        </label>

        <fieldset className="rsvp-field">
          <legend className="rsvp-label">Kehadiran</legend>
          <div className="rsvp-choice" role="radiogroup">
            {[['Hadir', 'Insya Allah hadir', Check], ['Tidak Hadir', 'Berhalangan', X]].map(([val, text, Icon]) => (
              <button
                key={val}
                type="button"
                role="radio"
                aria-checked={attendance === val}
                onClick={() => setAttendance(val)}
                className={attendance === val ? 'is-on' : ''}
              >
                <Icon aria-hidden="true" />
                {text}
              </button>
            ))}
          </div>
        </fieldset>

        {attendance === 'Hadir' && (
          <fieldset className="rsvp-field animate-fadeIn">
            <legend className="rsvp-label">Jumlah tamu</legend>
            <div className="rsvp-count" role="radiogroup">
              {['1', '2'].map((n) => (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={guestCount === n}
                  onClick={() => setGuestCount(n)}
                  className={guestCount === n ? 'is-on' : ''}
                >
                  {n} orang
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <label className="rsvp-field">
          <span className="rsvp-label">Doa &amp; ucapan</span>
          <textarea
            rows={3}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tuliskan doa restu untuk kami"
          />
        </label>

        <button type="submit" disabled={isSubmitting} className="btn-gold rsvp-submit">
          {isSubmitting
            ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            : <Send className="w-4 h-4" aria-hidden="true" />}
          {isSubmitting ? 'Mengirimkan…' : 'Kirim Doa & Konfirmasi'}
        </button>

        {showToast && (
          <p className="rsvp-toast animate-fadeIn" role="status">
            Terima kasih atas konfirmasi kehadiran dan doa restu Anda.
          </p>
        )}
      </form>

      {/* Buku tamu: daftar ucapan dengan garis pemisah, tanpa kartu */}
      <div className="sec-inner rsvp-wishes" data-reveal>
        <div className="rsvp-wishes-head">
          <i /><span>Doa &amp; Ucapan Tamu</span><i />
        </div>
        <ol className="rsvp-list">
          {wishes.length === 0 ? (
            <li className="rsvp-empty">Belum ada ucapan. Jadilah yang pertama memberikan doa restu.</li>
          ) : (
            wishes.map((w, index) => (
              <li key={index}>
                <div className="rsvp-who">
                  <b>{w.name}</b>
                  <span className={w.attendance === 'Hadir' ? 'is-yes' : ''}>
                    {w.attendance === 'Hadir' ? 'Hadir' : 'Berhalangan'}
                  </span>
                </div>
                <p>{w.message}</p>
                <time>{formatWishTime(w.time)}</time>
              </li>
            ))
          )}
        </ol>
      </div>
    </section>
  );
}
