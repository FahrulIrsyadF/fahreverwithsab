import { useRef, useState } from 'react';
import { gsap, useGSAP, vibrate, reduceMotion } from '../lib/gsap';
import { useTilt, requestGyro } from '../lib/useTilt';
import WaxSeal, { CRACK_POINTS } from './ornaments/WaxSeal';
import Sprig from './ornaments/Sprig';
import GoldDust from './ornaments/GoldDust';
import { WEDDING } from '../data/wedding';
import './cover/envelope.css';

const HOLD_SECONDS = 0.9;
const RING_C = 2 * Math.PI * 52;
const POCKET_BOTTOM = 'M0 220 Q140 130 160 116 Q170 109 180 116 Q200 130 340 220 L340 218 Q340 224 334 224 L6 224 Q0 224 0 218 Z';

/** Tekstur serat kertas: noise acak digambar SEKALI ke canvas → PNG
 *  (feTurbulence terlalu berat di iPhone saat amplop memantul / segel ditahan). */
let grainUrl = null;
function paperGrain() {
  if (grainUrl) return grainUrl;
  const n = 96, c = document.createElement('canvas');
  c.width = c.height = n;
  const g = c.getContext('2d');
  const d = g.createImageData(n, n);
  for (let i = 0; i < d.data.length; i += 4) {
    const v = Math.random();
    d.data[i] = 115; d.data[i + 1] = 94; d.data[i + 2] = 56;
    d.data[i + 3] = v > 0.55 ? (v - 0.55) * 90 : 0;
  }
  g.putImageData(d, 0, 0);
  return (grainUrl = c.toDataURL('image/png'));
}

/** Definisi SVG bersama: motif liner amplop + tekstur kertas + bayangan. */
function EnvelopeDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <pattern id="env-liner" width="26" height="26" patternUnits="userSpaceOnUse">
          <rect width="26" height="26" style={{ fill: 'var(--base-800)' }} />
          <path d="M13 5 L16.5 13 L13 21 L9.5 13Z" fill="none" style={{ stroke: 'var(--metal-bright)' }} strokeOpacity=".55" strokeWidth=".8" />
          <circle cx="0" cy="0" r="1.3" style={{ fill: 'var(--metal-bright)' }} fillOpacity=".55" />
          <circle cx="26" cy="0" r="1.3" style={{ fill: 'var(--metal-bright)' }} fillOpacity=".55" />
          <circle cx="0" cy="26" r="1.3" style={{ fill: 'var(--metal-bright)' }} fillOpacity=".55" />
          <circle cx="26" cy="26" r="1.3" style={{ fill: 'var(--metal-bright)' }} fillOpacity=".55" />
        </pattern>
        <pattern id="env-grain" width="48" height="48" patternUnits="userSpaceOnUse">
          <image href={paperGrain()} width="48" height="48" />
        </pattern>
        <filter id="env-lift" x="-10%" y="-30%" width="120%" height="160%">
          <feDropShadow dx="0" dy="-1.5" stdDeviation="2.5" style={{ floodColor: 'var(--shade)' }} floodOpacity=".22" />
        </filter>
        <filter id="env-flapshadow" x="-10%" y="-10%" width="120%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" style={{ floodColor: 'var(--shade)' }} floodOpacity=".28" />
        </filter>
        <linearGradient id="env-side-l" x1="0" x2="1">
          <stop offset="0" style={{ stopColor: 'var(--paper-lo)' }} />
          <stop offset="1" style={{ stopColor: 'var(--paper)' }} />
        </linearGradient>
        <linearGradient id="env-side-r" x1="1" x2="0">
          <stop offset="0" style={{ stopColor: 'var(--paper-lo)' }} />
          <stop offset="1" style={{ stopColor: 'var(--paper)' }} />
        </linearGradient>
        <linearGradient id="env-bottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--paper-hi)' }} />
          <stop offset="1" style={{ stopColor: 'var(--paper-lo)' }} />
        </linearGradient>
        <linearGradient id="env-flap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--paper)' }} />
          <stop offset="1" style={{ stopColor: 'var(--paper-lo)' }} />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Cover undangan: amplop 3D dengan segel lilin tekan-tahan (dari lab, demo 01).
 *  - onOpen()       : dipanggil saat "menyelam" ke surat → halaman undangan mulai tampil di bawah cover
 *  - onDone()       : animasi cover selesai → cover boleh dilepas dari DOM
 *  - onStartAudio() : dipanggil dari gesture user. Di iOS, `pointerdown` TIDAK dihitung aktivasi, jadi
 *                     musik juga dicoba lagi di `pointerup` (segel sudah terbuka saat jari masih menekan).
 */
export default function CoverScreen({ guestName, onOpen, onDone, onStartAudio }) {
  const root = useRef(null);
  const tiltRef = useRef(null);
  const phase = useRef('closed');
  const progress = useRef({ v: 0 });
  const holdTween = useRef(null);
  const tremble = useRef(null);
  const floatTl = useRef(null);
  const pressedAt = useRef(0);
  const [hint, setHint] = useState('Tekan & tahan segel untuk membuka');

  useTilt(tiltRef, { max: 7 });
  const tilt = (on) => {
    const el = tiltRef.current;
    if (!el) return;
    if (on) delete el.dataset.tiltPaused; else el.dataset.tiltPaused = '1';
  };

  const { contextSafe } = useGSAP(() => {
    gsap.set('.seal-ring-fill', { strokeDasharray: RING_C, strokeDashoffset: RING_C, opacity: 0 });
    gsap.set('.env-flap', { transformPerspective: 1100, transformOrigin: '50% 0%' });

    // Amplop "dijatuhkan" ke meja: pantulan + squash & stretch.
    // Miring 3D dihentikan saat amplop bergerak sendiri (GPU iPhone tidak mengerjakan dua hal berat sekaligus).
    tilt(false);
    gsap.timeline({ onComplete: () => phase.current === 'closed' && tilt(true) })
      .from('.env-wrap', { y: -window.innerHeight * 0.75, rotation: -10, duration: 1.35, ease: 'envDrop' })
      .to('.env-wrap', { scaleY: 0.93, scaleX: 1.05, transformOrigin: '50% 100%', duration: 1.35, ease: 'envDrop-squash' }, 0)
      .from('.env-shadow', { scale: 0.2, opacity: 0, duration: 1.35, ease: 'envDrop' }, 0)
      .from('.env-to > *', { y: 16, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out' }, 0.7)
      .from('.env-hint, .cover-tag, .cover-credit', { opacity: 0, y: 10, duration: 0.6 }, 1.1);

    floatTl.current = gsap.timeline({ repeat: -1, yoyo: true, delay: 1.4 })
      .to('.env-float', { y: -9, duration: 2.4, ease: 'sine.inOut' })
      .to('.env-shadow', { scale: 0.88, opacity: 0.7, duration: 2.4, ease: 'sine.inOut' }, 0);

    gsap.to('.seal-pulse', { scale: 1.55, opacity: 0, duration: 1.9, repeat: -1, ease: 'power1.out', delay: 1.6 });
  }, { scope: root });

  // sembunyikan saat 0 agar ujung bulat (linecap) tidak tampil sebagai titik
  const setRing = () => {
    const v = progress.current.v, on = v > 0.005;
    gsap.set('.seal-ring-fill', { strokeDashoffset: RING_C * (1 - v) });
    gsap.set('.seal-ring-fill:not(.seal-ring-glow)', { opacity: on ? 1 : 0 });
    gsap.set('.seal-ring-glow', { opacity: on ? 0.22 : 0 });
  };

  const burst = () => {
    root.current.querySelectorAll('.spark').forEach((s) => {
      gsap.fromTo(s, { x: 0, y: 0, opacity: 1, scale: gsap.utils.random(0.6, 1.4) }, {
        physics2D: { velocity: gsap.utils.random(120, 300), angle: gsap.utils.random(190, 350), gravity: 520 },
        opacity: 0, duration: gsap.utils.random(0.8, 1.3), ease: 'power1.in',
      });
    });
  };

  const open = contextSafe(() => {
    if (phase.current !== 'closed') return;
    phase.current = 'opening';
    tremble.current?.kill();
    floatTl.current?.pause();
    vibrate([14, 50, 24]);
    onStartAudio?.(); // berhasil di desktop / keyboard; di iOS dicoba lagi saat jari dilepas
    setHint('');

    const seal = root.current.querySelector('.seal-wrap').getBoundingClientRect();
    const floorY = window.innerHeight - seal.bottom + seal.height * 0.15;
    const fast = reduceMotion() ? 0.25 : 1;

    gsap.timeline({ defaults: { overwrite: 'auto' }, onComplete: () => onDone?.() })
      .to('.env-hint, .seal-ring, .seal-pulse', { opacity: 0, duration: 0.2 })
      .to('.seal-crack', { opacity: 1, duration: 0.06 }, '<')
      .to('.seal-btn', { scale: 1.1, duration: 0.12, ease: 'power2.out' }, '<')
      .add(burst, '<')
      .addLabel('split', '+=0.05')
      // dua belahan segel jatuh & memantul di dasar layar
      .to('.seal-half-l', { x: -70, rotation: -42, duration: 1.3 * fast, ease: 'power1.out' }, 'split')
      .to('.seal-half-l', { y: floorY, duration: 1.3 * fast, ease: 'bounce.out' }, 'split')
      .to('.seal-half-r', { x: 84, rotation: 50, duration: 1.35 * fast, ease: 'power1.out' }, 'split+=0.05')
      .to('.seal-half-r', { y: floorY, duration: 1.35 * fast, ease: 'bounce.out' }, 'split+=0.05')
      .to('.seal-crack', { opacity: 0, duration: 0.1 }, 'split')
      .to('.seal-half', { opacity: 0, duration: 0.5 }, 'split+=1.6')
      // flap terbuka ke arah penonton, pindah ke belakang surat di titik 90°
      .to('.env-flap', { rotationX: 90, duration: 0.42 * fast, ease: 'power2.in' }, 'split+=0.2')
      .set('.env-flap', { zIndex: 1 })
      .to('.env-flap', { rotationX: 180, duration: 0.6 * fast, ease: 'back.out(1.8)' })
      // surat keluar dengan sedikit overshoot
      .to('.letter', { yPercent: -66, duration: 1.05 * fast, ease: 'back.out(1.5)' }, '-=0.35')
      .addLabel('lift', '+=0.05')
      .to('.env-drop', { y: () => window.innerHeight, rotation: 7, duration: 0.95 * fast, ease: 'power3.in' }, 'lift')
      .to('.env-shadow', { opacity: 0, duration: 0.5 }, 'lift')
      .set('.letter', { zIndex: 8 }, 'lift+=0.5')
      .to('.letter', { yPercent: -20, scale: 1.18, rotation: 0, duration: 0.85 * fast, ease: 'power2.inOut' }, 'lift+=0.35')
      // "menyelam" ke dalam surat → halaman undangan tampil di bawah cover
      .addLabel('dive')
      .add(() => onOpen?.(), 'dive')
      .to('.letter', { scale: 4.5, opacity: 0, duration: 0.9 * fast, ease: 'power2.in' }, 'dive')
      .to('.env-to, .cover-tag, .cover-credit', { opacity: 0, y: -20, duration: 0.5 }, 'dive')
      .to(root.current, { autoAlpha: 0, duration: 0.9 * fast, ease: 'power2.inOut' }, 'dive+=0.3');
  });

  const startHold = contextSafe((e) => {
    if (phase.current !== 'closed') return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    requestGyro();
    tilt(false);
    pressedAt.current = performance.now();
    holdTween.current?.kill();
    holdTween.current = gsap.to(progress.current, {
      v: 1, duration: HOLD_SECONDS * (1 - progress.current.v), ease: 'none',
      onUpdate: setRing, onComplete: open,
    });
    gsap.to('.seal-btn', { scale: 0.9, duration: 0.25, ease: 'power2.out' });
    tremble.current = gsap.to('.env-wrap', { x: 1.4, duration: 0.05, repeat: -1, yoyo: true, ease: 'none' });
    vibrate(8);
  });

  const endHold = contextSafe(() => {
    if (phase.current !== 'closed') {
      // segel sudah terbuka saat jari masih menekan → ini gesture yang diakui iOS untuk memutar audio
      onStartAudio?.();
      return;
    }
    tilt(true);
    holdTween.current?.kill();
    tremble.current?.kill();
    gsap.to('.env-wrap', { x: 0, duration: 0.2 });
    gsap.to(progress.current, { v: 0, duration: 0.35, onUpdate: setRing });
    gsap.to('.seal-btn', { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    if (performance.now() - pressedAt.current < 350) {
      setHint('Tahan sedikit lebih lama…');
      gsap.fromTo('.env-hint', { x: -6 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    }
  });

  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  };

  return (
    <div className="cover velvet" ref={root}>
      <EnvelopeDefs />
      <GoldDust count={60} />
      <p className="cover-tag">{WEDDING.hashtag}</p>

      <div className="env-scene">
        <div className="env-to">
          <p className="eyebrow">Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <h2>{guestName}</h2>
          <p className="env-note">Mohon maaf apabila ada kesalahan penulisan nama/gelar</p>
        </div>

        <div className="env-stage">
          <div className="env-float">
            <div className="env-wrap" ref={tiltRef}>
              <div className="env">
                {/* bagian dalam amplop (liner) */}
                <svg className="env-back env-drop" viewBox="0 0 340 224" preserveAspectRatio="none" aria-hidden="true">
                  <rect width="340" height="224" rx="8" fill="url(#env-liner)" />
                </svg>

                {/* surat undangan */}
                <div className="letter paper">
                  <div className="letter-frame">
                    <Sprig className="letter-sprig" length={60} bend={14} leafSize={10} seed={9} />
                    <p className="eyebrow">The Wedding of</p>
                    <p className="letter-names">{WEDDING.names}</p>
                    <p className="letter-date">{WEDDING.dateDots}</p>
                  </div>
                </div>

                {/* kantong depan */}
                <svg className="env-pocket env-drop" viewBox="0 0 340 224" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 0 L166 122 L0 224 Z" fill="url(#env-side-l)" />
                  <path d="M340 0 L174 122 L340 224 Z" fill="url(#env-side-r)" />
                  <path d="M0 0 L166 122 L0 224 Z M340 0 L174 122 L340 224 Z" fill="url(#env-grain)" />
                  <path d={POCKET_BOTTOM} fill="url(#env-bottom)" filter="url(#env-lift)" />
                  <path d={POCKET_BOTTOM} fill="url(#env-grain)" />
                </svg>

                {/* tutup amplop (flap) — dua sisi */}
                <div className="env-flap env-drop">
                  <svg className="flap-face flap-outer" viewBox="0 0 340 140" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 0 L340 0 L184 126 Q170 138 156 126 Z" fill="url(#env-flap)" filter="url(#env-flapshadow)" />
                    <path d="M0 0 L340 0 L184 126 Q170 138 156 126 Z" fill="url(#env-grain)" />
                  </svg>
                  <svg className="flap-face flap-inner" viewBox="0 0 340 140" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 140 L340 140 L184 14 Q170 2 156 14 Z" fill="url(#env-liner)" />
                    <path d="M0 140 L340 140 L184 14 Q170 2 156 14 Z" fill="none" style={{ stroke: 'var(--metal-bright)' }} strokeOpacity=".5" />
                  </svg>
                </div>

                {/* segel lilin (tombol tekan-tahan) */}
                <div className="seal-wrap">
                  <span className="seal-pulse" />
                  <svg className="seal-ring" viewBox="0 0 120 120" aria-hidden="true">
                    <circle cx="60" cy="60" r="52" className="seal-ring-track" />
                    {/* cahaya = lingkaran lebar transparan (bukan filter drop-shadow yang dicat ulang tiap frame) */}
                    <circle cx="60" cy="60" r="52" className="seal-ring-fill seal-ring-glow" />
                    <circle cx="60" cy="60" r="52" className="seal-ring-fill" />
                  </svg>
                  <button
                    type="button"
                    className="seal-btn"
                    aria-label="Tekan dan tahan untuk membuka undangan"
                    onPointerDown={startHold}
                    onPointerUp={endHold}
                    onPointerCancel={endHold}
                    onKeyDown={onKey}
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <WaxSeal monogram={WEDDING.monogram} half="left" className="seal-half seal-half-l" />
                    <WaxSeal monogram={WEDDING.monogram} half="right" className="seal-half seal-half-r" />
                    <svg className="seal-crack" viewBox="0 0 200 200" aria-hidden="true">
                      <polyline points={CRACK_POINTS} fill="none" style={{ stroke: 'var(--base-950)' }} strokeWidth="3" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {Array.from({ length: 18 }, (_, i) => <span key={i} className="spark" />)}
                </div>
              </div>
            </div>
          </div>
          <div className="env-shadow" />
        </div>

        <p className="env-hint" aria-live="polite">{hint}</p>
      </div>

      <p className="cover-credit">
        Artworks by the Bride • Handcrafted by the Groom
        <span>Made with love • From Us</span>
      </p>
    </div>
  );
}
