import { useRef } from 'react';
import { gsap, useGSAP, SplitText } from '../../lib/gsap';
import { useFontsReady } from '../../lib/useFontsReady';
import Sprig from '../ornaments/Sprig';
import { RoseCorner, RoseVine } from '../ornaments/Roses';
import GoldDust from '../ornaments/GoldDust';
import SectionSeam from '../ornaments/SectionSeam';
import { VERSE } from '../../data/wedding';
import './verse.css';

function Roll({ className = '' }) {
  return (
    <div className={`roll ${className}`}>
      <span className="roll-rod" />
      <span className="roll-paper" />
    </div>
  );
}

/**
 * Gulungan ayat QS. Ar-Rum 21 (lab demo 03): section di-pin, pita jatuh, kertas memanjang
 * mengikuti scroll, baris ayat muncul dari blur. Section ini opak dan berada SEBELUM benang merah,
 * jadi pin tidak bertabrakan dengan benang (opsi a di §7 #4).
 */
export default function VerseScroll() {
  const root = useRef(null);
  const fontsReady = useFontsReady();

  useGSAP(() => {
    if (!fontsReady) return;
    const content = root.current.querySelector('.scroll-content');
    const split = SplitText.create(root.current.querySelector('.scroll-translation'), { type: 'lines', linesClass: 'scroll-line' });
    const lines = [...content.querySelectorAll('.reveal-block, .scroll-line')];

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '.scroll-pin', start: 'top top', end: '+=200%',
        pin: true, scrub: 1, invalidateOnRefresh: true,
      },
    });

    // 1) pita & segel kecil jatuh, gulungan berputar lurus
    tl.to('.ribbon', { y: 220, rotation: 24, duration: 0.16, ease: 'power2.in' })
      .to('.ribbon', { opacity: 0, duration: 0.04 }, '>-0.04')
      .fromTo('.scroll-wrap', { rotation: -4 }, { rotation: 0, duration: 0.14, ease: 'power1.out' }, 0)
      // 2) kertas memanjang, gulungan bawah ikut turun & berputar
      .addLabel('unroll', 0.12)
      .to('.scroll-paper', { height: () => content.offsetHeight, duration: 1 }, 'unroll')
      .to('.roll-bottom .roll-paper', { backgroundPositionY: '+=900px', duration: 1 }, 'unroll')
      .fromTo('.roll-bottom', { scaleY: 1.35 }, { scaleY: 0.9, duration: 1 }, 'unroll');

    // 3) tiap baris muncul sesaat setelah kertas melewatinya
    lines.forEach((el) => {
      const at = 0.12 + el.offsetTop / content.offsetHeight + 0.04;
      tl.fromTo(el, { opacity: 0, y: 10, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.12, ease: 'power1.out' }, at);
    });

    // 4) ornamen digambar, lalu jeda kecil sebelum lepas pin
    tl.from('.scroll-content .sprig-path', { drawSVG: 0, duration: 0.2, stagger: { amount: 0.25 } }, 1.0)
      .to({}, { duration: 0.15 });

    return () => split.revert();
  }, { scope: root, dependencies: [fontsReady] });

  return (
    <section className="sec sec-dark verse-sec" id="ayat" ref={root}>
      <SectionSeam into="dark" side="right" seed={3} />
      <GoldDust count={45} />

      {/* tanpa judul section: langsung gulungan */}
      <h2 className="sr-only">Firman Allah, QS. Ar-Rum 21</h2>

      <div className="scroll-pin">
        <div className="scroll-wrap">
          <Roll className="roll-top" />
          <div className="scroll-paper paper">
            <div className="scroll-content">
              <RoseCorner className="scroll-corner scroll-corner-tl" seed={5} />
              <RoseCorner className="scroll-corner scroll-corner-br" seed={8} />
              <div className="scroll-orn reveal-block"><Sprig length={70} bend={0} leafSize={12} seed={4} /></div>
              <p className="scroll-bismillah reveal-block" lang="ar" dir="rtl">{VERSE.bismillah}</p>
              <p className="scroll-arabic reveal-block" lang="ar" dir="rtl">{VERSE.arabic}</p>
              <RoseVine className="scroll-vine reveal-block" w={220} h={40} seed={3} />
              <p className="scroll-translation">{VERSE.translation}</p>
              <p className="scroll-ref reveal-block">{VERSE.ref}</p>
              <div className="scroll-orn scroll-orn-b reveal-block"><Sprig length={70} bend={0} leafSize={12} seed={8} /></div>
            </div>
          </div>
          <Roll className="roll-bottom" />
          <div className="ribbon" aria-hidden="true">
            <span className="ribbon-band" />
            <span className="ribbon-knot" />
          </div>
        </div>
      </div>
    </section>
  );
}
