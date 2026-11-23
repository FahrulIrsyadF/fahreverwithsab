import { useEffect, useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '../lib/gsap';
import BrandMonogram from './BrandMonogram';
import SectionSeam from './ornaments/SectionSeam';
import GoldDust from './ornaments/GoldDust';
import { RoseVine } from './ornaments/Roses';
import { THREAD_END, THREAD_BACK } from './thread/ThreadLayer';
import { STORY } from '../data/wedding';
import './story/story.css';

// garis "pemicu" sama dengan ujung benang merah (62% tinggi layar), jadi spine
// baru berjalan tepat setelah benang tiba di badge 01
const LINE = '62%';

/**
 * Kisah Cinta — setelah Acara. Benang merah (dari Mempelai, lewat Acara) berakhir di badge "01"
 * (badge menyala + berdenyut saat benang tiba), lalu spine timeline melanjutkan 01 → 02 → 03.
 * Spine digerakkan GSAP (transform scaleY, scrub) — tanpa setState per frame.
 */
export default function LoveStory() {
  const root = useRef(null);

  // badge 01 dinyalakan oleh benang merah
  useEffect(() => {
    const first = () => root.current?.querySelector('.story-ch');
    const onEnd = () => {
      const el = first();
      if (!el) return;
      el.classList.add('is-active', 'is-pulse');
    };
    const onBack = () => first()?.classList.remove('is-active', 'is-pulse');
    window.addEventListener(THREAD_END, onEnd);
    window.addEventListener(THREAD_BACK, onBack);
    return () => {
      window.removeEventListener(THREAD_END, onEnd);
      window.removeEventListener(THREAD_BACK, onBack);
    };
  }, []);

  useGSAP(() => {
    gsap.from('.sec-head > *, .story-quote', {
      y: 24, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '.sec-head', start: 'top 80%' },
    });

    // spine: mulai dari badge 01 (pusatnya 32px dari atas timeline), berakhir di badge 03
    // fromTo: titik awal eksplisit 0 (Safari bisa membaca scaleY(0) dari CSS sebagai 1 → garis tidak mundur)
    gsap.fromTo('.story-spine-fill', { scaleY: 0 }, {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: '.story-timeline', start: `top+=32 ${LINE}`, end: `bottom-=64 ${LINE}`, scrub: 0.6 },
    });

    gsap.utils.toArray('.story-ch').forEach((ch, i) => {
      // kertas "ditempel": melayang turun miring → mendarat, lalu selotip direntangkan & ditekan
      const card = ch.querySelector('.story-card');
      const tape = ch.querySelector('.story-tape');
      const tilt = i % 2 ? -1 : 1;
      gsap.timeline({ scrollTrigger: { trigger: ch, start: 'top 85%' } })
        .from(card, { y: -46, x: 18 * tilt, rotation: 7 * tilt, scale: 1.06, opacity: 0, duration: 0.75, ease: 'power3.out', clearProps: 'opacity' })
        .from(tape, { scaleX: 0, opacity: 0, duration: 0.38, ease: 'power2.out' }, '-=0.12')
        .fromTo(tape, { scaleY: 1.35 }, { scaleY: 1, duration: 0.22, ease: 'power2.out' }, '>-0.05')
        // kertas sedikit tertekan saat selotip ditekan
        .to(card, { y: 2, duration: 0.1, ease: 'power1.out' }, '<')
        .to(card, { y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      // badge 02 & 03 aktif saat spine mencapainya (badge 01 oleh benang merah)
      if (i > 0) {
        ScrollTrigger.create({
          trigger: ch.querySelector('.story-badge'), start: `center ${LINE}`,
          onEnter: () => ch.classList.add('is-active'),
          onLeaveBack: () => ch.classList.remove('is-active'),
        });
      }
    });

    gsap.from('.story-close', {
      opacity: 0, y: 16, duration: 0.8,
      scrollTrigger: { trigger: '.story-close', start: 'top 92%' },
    });
  }, { scope: root });

  return (
    <section className="sec sec-dark story-sec" id="kisah" ref={root}>
      <SectionSeam into="dark" side="right" seed={23} anchor="0.3,0.5" plain />
      <GoldDust count={16} />

      <header className="sec-head" data-anchor="0.97,0.6">
        <p className="eyebrow">Our Journey</p>
        <h2>Kisah Cinta</h2>
        <RoseVine className="sec-rule" w={220} h={40} seed={31} />
      </header>

      <p className="story-quote" data-anchor="1.08,0.85">{STORY.quote}</p>

      <div className="story-timeline">
        <span className="story-lead" data-anchor="0,0" aria-hidden="true" />
        <div className="story-spine" aria-hidden="true"><div className="story-spine-fill" /></div>

        {STORY.chapters.map((ch, i) => (
          <div key={ch.act} className="story-ch">
            {/* badge 01 = ujung benang merah */}
            <div className="story-badge" {...(i === 0 ? { 'data-anchor': '0.5,0.5' } : {})}>{ch.iconText}</div>
            {/* teks langsung di atas beludru (tanpa kartu): tempat/waktu, judul, paragraf serif */}
            <div className="story-card">
              <span className="story-tape" aria-hidden="true" />
              <p className="story-meta">{ch.location}</p>
              <h3>{ch.title}</h3>
              <p className="story-text">{ch.text}</p>
            </div>
          </div>
        ))}

        <div className="story-close">
          <i />
          <BrandMonogram height={34} color="var(--metal)" decorative />
          <i />
        </div>
      </div>
    </section>
  );
}
