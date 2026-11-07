import { Calendar, MapPin, ExternalLink, Clock } from 'lucide-react';
import SectionSeam from './ornaments/SectionSeam';
import GoldDust from './ornaments/GoldDust';
import { RoseCorner, RoseVine } from './ornaments/Roses';
import { EVENTS } from '../data/wedding';

/** Akad & Resepsi — belum ada demo lab: ikut sistem Seam + ranting + reveal GSAP (data-reveal). */
export default function EventDetails() {
  return (
    <section className="sec sec-dark pt-20 pb-20 px-5" id="acara">
      <SectionSeam into="dark" side="right" seed={53} />
      <GoldDust count={30} />

      <header className="sec-head" data-reveal>
        <p className="eyebrow">Rangkaian Acara</p>
        <h2>Akad &amp; Resepsi</h2>
        <RoseVine className="sec-rule" w={220} h={40} seed={57} />
      </header>

      <div className="sec-inner space-y-7 max-w-md mx-auto">
        {EVENTS.map((ev, i) => (
          <article
            key={ev.id}
            data-reveal={i % 2 ? 'right' : 'left'}
            className="card-paper rounded-3xl p-6 sm:p-8 text-left overflow-hidden"
          >
            <RoseCorner className="card-corner card-corner-br" seed={60 + i * 7} />

            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-base-800 bg-accent-tint px-3.5 py-1 rounded-full mb-3.5 border border-accent/30">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>{ev.badge}</span>
            </div>

            <h3 className="font-headline text-2xl font-bold text-base-800 mb-4 leading-snug">{ev.title}</h3>

            <div className="space-y-3.5 mb-6 relative">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-accent-tint border border-accent/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <div className="text-xs font-bold text-base-800">{ev.date}</div>
                  <div className="text-[11px] text-muted flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3 h-3 text-metal-deep" />
                    <span>{ev.time}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-accent-tint border border-accent/30 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <div className="pr-10">
                  <div className="text-xs font-bold text-base-800">{ev.venue}</div>
                  <div className="text-[11px] text-muted leading-relaxed mt-0.5">{ev.address}</div>
                </div>
              </div>
            </div>

            <a
              href={ev.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full py-3 px-4 rounded-xl border border-metal/60 text-ivory bg-gradient-to-r from-base-900 via-base-700 to-base-900 hover:brightness-110 transition-[filter] duration-300 text-xs font-semibold flex items-center justify-center gap-2 shadow-md active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5 text-metal-pale" />
              <span>Buka Petunjuk Lokasi (Google Maps)</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
