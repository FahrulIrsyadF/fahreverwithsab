import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import SectionSeam from './ornaments/SectionSeam';
import GoldDust from './ornaments/GoldDust';
import InkText from './ornaments/InkText';
import WaxSeal from './ornaments/WaxSeal';
import { RoseVine } from './ornaments/Roses';
import { WEDDING } from '../data/wedding';

/** Penutup — section gelap; nama ditulis tinta emas, segel lilin sebagai cap penutup. */
export default function Footer() {
  const root = useRef(null);

  useGSAP(() => {
    gsap.timeline({ scrollTrigger: { trigger: '.foot-inner', start: 'top 80%' } })
      .from('.foot-seal', { scale: 0.4, rotation: -30, opacity: 0, duration: 1.1, ease: 'back.out(1.8)' })
      .to('.foot-inner .ink-text text', { strokeDashoffset: 0, duration: 2, ease: 'power1.inOut' }, 0.3)
      .to('.foot-inner .ink-text text', { fillOpacity: 1, strokeOpacity: 0.3, duration: 0.8 }, '-=0.5')
      .from('.foot-inner .reveal', { y: 16, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out' }, '-=0.9');
  }, { scope: root });

  return (
    <footer ref={root} className="sec sec-dark px-6 pt-20 pb-32 text-center text-ivory">
      <SectionSeam into="dark" side="right" seed={101} />
      <GoldDust count={40} />

      <div className="foot-inner sec-inner max-w-sm mx-auto">
        <WaxSeal monogram={WEDDING.monogram} className="foot-seal w-20 mx-auto mb-4" />

        <InkText text={WEDDING.names} fontSize={52} width={360} height={100} gradient="pale" className="w-full h-auto overflow-visible my-1" />
        <RoseVine className="sec-rule reveal" w={220} h={40} seed={113} />

        <p className="reveal text-xs sm:text-sm text-ivory/80 leading-relaxed max-w-xs mx-auto mt-3 mb-6">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu bagi lembaran baru kehidupan kami.
        </p>

        <p className="reveal text-[10px] sm:text-[11px] tracking-[0.25em] font-bold text-metal-pale mb-6">{WEDDING.hashtag}</p>

        <div className="reveal pt-5 border-t border-accent-soft/15 text-[10px] text-ivory/55 tracking-wider">
          <p className="text-ivory/75">Artworks by the Bride &bull; Handcrafted by the Groom</p>
          <p>The Wedding of {WEDDING.names}</p>
          <p>{WEDDING.dateCompact}</p>
        </div>
      </div>
    </footer>
  );
}
