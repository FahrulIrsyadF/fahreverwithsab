import { Fragment } from 'react';
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
 * Rangkaian Acara — gaya kartu undangan cetak: bingkai lengkung emas bergaris ganda di atas
 * beludru hijau (satu lapis, tanpa kartu di dalam kartu). Benang merah menyusur tepi kanan,
 * menyeberang di antara dua acara (ThreadStitch), lalu turun di tepi kiri menuju Galeri.
 */
export default function EventDetails() {
  return (
    <section className="sec sec-dark ev-sec" id="acara">
      <SectionSeam into="dark" side="right" seed={53} anchor="0.3,0.5" />
      <GoldDust count={30} />

      <header className="sec-head" data-reveal data-anchor="1.04,0.7">
        <p className="eyebrow">Rangkaian Acara</p>
        <h2>Akad &amp; Resepsi</h2>
        <RoseVine className="sec-rule" w={220} h={40} seed={57} />
      </header>

      <div className="sec-inner ev-list">
        {EVENTS.map((ev, i) => {
          const [day, num, monthYear] = splitDate(ev.date);
          const [label] = ev.badge.split(' • ');
          return (
            <Fragment key={ev.id}>
              {i > 0 && <ThreadStitch from="right" />}
              <article className="ev" data-reveal>
                <p className="ev-no">{String(i + 1).padStart(2, '0')}</p>
                <p className="eyebrow ev-label">{label}</p>
                <h3 className="ev-title">{ev.title}</h3>

                <div className="ev-date" aria-label={ev.date}>
                  <span>{day}</span>
                  <b>{num}</b>
                  <span>{monthYear}</span>
                </div>
                <p className="ev-time">{ev.time}</p>

                <RoseVine className="ev-vine" w={180} h={34} seed={61 + i * 5} />

                <p className="ev-venue">{ev.venue}</p>
                <p className="ev-addr">{ev.address}</p>

                <a className="btn-ghost ev-map" href={ev.maps} target="_blank" rel="noopener noreferrer">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  Petunjuk Lokasi
                </a>
              </article>
            </Fragment>
          );
        })}
      </div>
      {/* benang turun di tepi kiri menuju ranting sambungan Galeri */}
      <div className="ev-tail" data-anchor="0.04,0.5" aria-hidden="true" />
    </section>
  );
}
