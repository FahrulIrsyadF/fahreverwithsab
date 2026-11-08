import Seam from './Seam';
import Sprig from './Sprig';
import { RoseVine } from './Roses';

/**
 * Sambungan organik di TEPI ATAS sebuah section (section harus `position: relative`
 * dan TIDAK `overflow: hidden`, karena sobekan & ranting menjorok ke section sebelumnya).
 *  - into="light": section ini terang, sebelumnya gelap → kertas sobek (torn)
 *  - into="dark" : section ini gelap, sebelumnya terang → renda (lace)
 *  - into="blue" : section biru powder (`.sec-blue`) → kertas sobek berwarna biru
 * Ranting di sisi `side` (bergantian kiri/kanan antar sambungan) tumbuh mengikuti scroll
 * (animasi di App: `.seam-sprig`). `anchor` = jangkar benang merah (opsional).
 */
export default function SectionSeam({ into = 'light', side = 'left', seed = 7, anchor, vine = true }) {
  const torn = into !== 'dark';
  const dark = torn ? '' : ' seam-on-dark';
  return (
    <>
      <Seam
        variant={torn ? 'torn' : 'lace'}
        color={into === 'blue' ? 'var(--paper-lo)' : torn ? 'var(--paper)' : 'var(--base-900)'}
        seed={seed}
        height={torn ? 44 : 40}
        className="seam-top"
      />
      {vine && <RoseVine className={`seam-vine${dark}`} w={400} h={46} seed={seed + 4} fillLeaves={torn} />}
      <div className={`seam-sprig seam-sprig-${side === 'left' ? 'l' : 'r'}${dark}`} data-anchor={anchor}>
        <Sprig length={side === 'left' ? 150 : 140} bend={side === 'left' ? 36 : -32} leafSize={side === 'left' ? 20 : 19} seed={seed + 20} fillLeaves />
      </div>
    </>
  );
}
