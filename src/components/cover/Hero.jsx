import { useRef } from 'react';
import { gsap, useGSAP, drawable, DRAW_HIDDEN, DRAW_SHOWN } from '../../lib/gsap';
import InkText from '../ornaments/InkText';
import { RoseCorner, RoseVine, bloomIn } from '../ornaments/Roses';
import Countdown from '../Countdown';
import { WEDDING } from '../../data/wedding';
import './hero.css';

/**
 * Halaman pertama setelah amplop dibuka (hasil "menyelam" ke surat).
 * Animasi masuk disiapkan saat mount (keadaan awal tersembunyi) lalu diputar saat `play` = true.
 */
export default function Hero({ guestName, play }) {
  const root = useRef(null);
  const tl = useRef(null);

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true })
      .fromTo(drawable(root.current.querySelectorAll('.sprig-path')), DRAW_HIDDEN, { ...DRAW_SHOWN, duration: 1.6, stagger: { amount: 1 }, ease: 'power1.inOut' })
      .add(() => bloomIn(root.current), 0.5)
      .from('.eyebrow', { opacity: 0, letterSpacing: '0.7em', duration: 1.1, ease: 'power3.out' }, 0.1)
      .to('.ink-text text', { strokeDashoffset: 0, duration: 2.4, ease: 'power1.inOut' }, 0.3)
      .to('.ink-text text', { fillOpacity: 1, strokeOpacity: 0.35, duration: 0.9 }, '-=0.6')
      .from('.hero-vine', { opacity: 0, y: 6, duration: 0.8 }, '-=0.6')
      .from('.reveal', { y: 18, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out' }, '-=0.4');
  }, { scope: root });

  useGSAP(() => {
    if (play) gsap.delayedCall(0.55, () => tl.current?.play());
  }, { dependencies: [play] });

  return (
    <section className="hero" id="beranda" ref={root} aria-label="Undangan" data-bloom-manual>
      <p className="eyebrow">The Wedding of</p>
      <InkText text={WEDDING.names} fontSize={54} width={380} height={110} gradient="base" className="hero-names" />
      <RoseVine className="hero-vine" w={240} seed={7} />
      <p className="hero-date reveal">{WEDDING.dateLong}</p>
      {/* mawar mengapit nama tamu, tepat di atas hitung mundur */}
      <div className="hero-flank">
        <RoseCorner className="hero-corner hero-corner-bl" seed={4} />
        <RoseCorner className="hero-corner hero-corner-br" seed={9} />
        <p className="hero-place reveal">{WEDDING.place}</p>
        <p className="hero-to reveal">Kepada Yth. Bapak/Ibu/Saudara/i <strong>{guestName}</strong></p>
      </div>
      {/* hitung mundur digabung ke section pertama (dulu section Save the Date tersendiri) */}
      <div className="hero-cd reveal"><Countdown /></div>
    </section>
  );
}
