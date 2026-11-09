import { MapPin } from 'lucide-react';
import SectionSeam from './ornaments/SectionSeam';
import GoldDust from './ornaments/GoldDust';
import { RoseVine } from './ornaments/Roses';
import ThreadStitch from './thread/ThreadStitch';
import { EVENTS } from '../data/wedding';
import './event/event.css';

/** "Sabtu, 17 Juli 2027" → ['Sabtu', '17', 'Juli 2027'] */
function splitDate(s) {
  const [day, rest = ''] = s.split(', ');
  const [num, ...tail] = rest.split(' ');
  return [day, num, tail.join(' ')];
}

/**
 * Rangkaian Acara — satu kartu undangan cetak (bingkai lengkung emas bergaris ganda) berisi
 * Akad di kiri dan Resepsi di kanan, dipisah garis emas. Tanggal yang sama ditulis sekali di atas.
 * Benang merah menyusur tepi kanan kartu, menyeberang di bawahnya (ThreadStitch), lalu turun
 * di tepi kiri menuju Galeri.
 */
export default function EventDetails() {
  const sameDate = EVENTS.every((ev) => ev.date === EVENTS[0].date);
  const [day, num, monthYear] = splitDate(EVENTS[0].date);

  return (
    <section className="sec sec-dark ev-sec" id="acara">
      <SectionSeam into="dark" side="right" seed={53} anchor="0.3,0.5" />
      <GoldDust count={30} />

      <header className="sec-head" data-reveal data-anchor="1.04,0.7">
        <p className="eyebrow">Rangkaian Acara</p>
        <h2>Akad &amp; Resepsi</h2>
        <RoseVine className="sec-rule" w={220} h={40} seed={57} />
      </header>

      <article className="ev" data-reveal>
        {sameDate && (
          <div className="ev-date" aria-label={EVENTS[0].date}>
            <span>{day}</span>
            <b>{num}</b>
            <span>{monthYear}</span>
          </div>
        )}
        {sameDate && <RoseVine className="ev-vine" w={180} h={34} seed={61} />}

        <div className="ev-cols">
          {EVENTS.map((ev, i) => {
            const [label] = ev.badge.split(' • ');
            return (
              <div key={ev.id} className="ev-col">
                <p className="ev-no">{String(i + 1).padStart(2, '0')}</p>
                <p className="eyebrow ev-label">{label}</p>
                {!sameDate && <p className="ev-col-date">{ev.date}</p>}
                <p className="ev-time">{ev.time.replace(/^Pukul\s*/, '')}</p>
                <p className="ev-venue">{ev.venue}</p>
                <p className="ev-addr">{ev.address}</p>
                <a className="btn-ghost ev-map" href={ev.maps} target="_blank" rel="noopener noreferrer" aria-label={`Petunjuk lokasi ${label}`}>
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  Lokasi
                </a>
              </div>
            );
          })}
        </div>
      </article>

      {/* benang menyeberang di bawah kartu, lalu turun di tepi kiri menuju ranting sambungan Galeri */}
      <ThreadStitch from="right" height={48} />
      <div className="ev-tail" data-anchor="0.04,0.5" aria-hidden="true" />
    </section>
  );
}
