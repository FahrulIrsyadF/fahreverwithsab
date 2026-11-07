import { useRef } from 'react';
import { Instagram } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';
import InkText from './ornaments/InkText';
import SectionSeam from './ornaments/SectionSeam';
import { RoseCorner } from './ornaments/Roses';
import { COUPLE } from '../data/wedding';
import './couple/couple.css';

function Person({ p }) {
  const left = p.side === 'left';
  return (
    <article className={`person person-${p.side}`}>
      {/* jangkar benang: kanan foto pria → (simpul "&") → kiri foto wanita */}
      <div className="arch-wrap" data-anchor={left ? '1.04,0.4' : '-0.04,0.55'}>
        <div className="arch-frame" />
        <RoseCorner className={`arch-corner arch-corner-${p.side}`} seed={left ? 6 : 13} />
        <div className="arch">
          {/* ukuran bingkai tetap (aspect-ratio) → tidak perlu refresh ScrollTrigger saat foto dimuat */}
          <img src={p.photo} alt={p.full} loading="lazy" decoding="async" />
        </div>
      </div>
      <div className="person-text">
        <InkText
          text={p.nick} fontSize={78} width={300} height={112} gradient="base"
          className="person-nick" align={left ? 'end' : 'start'}
        />
        <p className="eyebrow person-line">{p.role}</p>
        <p className="person-full person-line">{p.full}</p>
        <p className="person-parents person-line">
          {p.parents.map((l, i) => <span key={i}>{l}</span>)}
        </p>
        <a className="person-ig person-line" href={`https://instagram.com/${p.ig}`} target="_blank" rel="noopener noreferrer">
          <Instagram aria-hidden="true" />@{p.ig}
        </a>
      </div>
    </article>
  );
}

/**
 * Mempelai (lab demo 02): pintu lengkung terbuka mengikuti scroll, bingkai emas bergeser,
 * nama ditulis tinta, simpul "&". Benang merah (ThreadLayer) DIMULAI di ranting sambungan atas
 * section ini dan melingkari "&" (data-knot).
 */
export default function CoupleSection() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.from('.cp-head > *', {
      y: 24, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '.cp-head', start: 'top 80%' },
    });

    gsap.utils.toArray('.person').forEach((el) => {
      const left = el.classList.contains('person-left');
      const arch = el.querySelector('.arch');
      // pintu lengkung terbuka dari bawah, foto zoom-out pelan
      gsap.fromTo(arch, { clipPath: 'inset(100% 0% 0% 0% round 999px 999px 0px 0px)' }, {
        clipPath: 'inset(0% 0% 0% 0% round 999px 999px 0px 0px)', ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 88%', end: 'top 30%', scrub: 1 },
      });
      gsap.fromTo(arch.querySelector('img'), { scale: 1.4, yPercent: -6 }, {
        scale: 1, yPercent: 6, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      });
      // bingkai emas bergeser keluar dari belakang foto (kedalaman)
      gsap.fromTo(el.querySelector('.arch-frame'), { x: 0, y: 0, opacity: 0 }, {
        x: left ? 14 : -14, y: 14, opacity: 1, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 75%', end: 'top 25%', scrub: 1 },
      });
      // nama ditulis tinta, lalu detail muncul berurutan
      gsap.timeline({ scrollTrigger: { trigger: el.querySelector('.person-text'), start: 'top 78%' } })
        .from(el.querySelector('.eyebrow'), { opacity: 0, x: left ? 20 : -20, duration: 0.6 })
        .to(el.querySelectorAll('.ink-text text'), { strokeDashoffset: 0, duration: 1.8, ease: 'power1.inOut' }, 0.1)
        .to(el.querySelectorAll('.ink-text text'), { fillOpacity: 1, strokeOpacity: 0.3, duration: 0.7 }, '-=0.5')
        .from(el.querySelectorAll('.person-full, .person-parents span, .person-ig'), {
          y: 14, opacity: 0, filter: 'blur(5px)', stagger: 0.08, duration: 0.7, ease: 'power2.out', clearProps: 'filter',
        }, '-=0.9');
    });

    // "&" memantul masuk, cincin emas berdenyut
    gsap.timeline({ scrollTrigger: { trigger: '.cp-amp', start: 'top 75%' } })
      .from('.cp-amp-glyph', { scale: 0.3, rotation: -25, opacity: 0, duration: 1.3, ease: 'elastic.out(1, 0.45)' })
      .from('.cp-amp-ring', { scale: 0.4, opacity: 0, stagger: 0.15, duration: 1, ease: 'back.out(2)' }, 0.1);
  }, { scope: root });

  return (
    <section className="sec sec-light cp-couple" id="mempelai" ref={root}>
      {/* awal benang merah: ranting di sambungan kiri */}
      <SectionSeam into="light" side="left" seed={12} anchor="0.7,0.55" />

      <header className="cp-head" data-anchor="0.92,0.6">
        <p className="eyebrow">Dua Jiwa Bertaut</p>
        <h2>Assalamu’alaikum Wr. Wb.</h2>
        <p>Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami:</p>
      </header>

      <Person p={COUPLE[0]} />

      <div className="cp-amp" data-anchor="0.5,0.5" data-knot>
        <span className="cp-amp-ring" />
        <span className="cp-amp-ring cp-amp-ring-2" />
        <span className="cp-amp-glyph foil-text">&amp;</span>
      </div>

      <Person p={COUPLE[1]} />
      <div className="cp-tail" data-anchor="0.78,0.6" />
    </section>
  );
}
