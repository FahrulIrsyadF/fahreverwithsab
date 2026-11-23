import { useRef, useEffect } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import SectionSeam from './ornaments/SectionSeam';
import GoldDust from './ornaments/GoldDust';
import BrandMonogram from './BrandMonogram';
import { WEDDING, MUSIC_PHOTO } from '../data/wedding';
import './music/music.css';

/**
 * Pemutar piringan hitam (pengganti Galeri): satu foto polaroid, piringan tegak di atas kotak kayu,
 * dan lengan jarum. Label tengah piringan = tombol play/pause untuk musik latar yang sama
 * dengan tombol di header. Piringan berputar & jarum turun selama musik menyala.
 */
export default function MusicPlayer({ isPlaying, onToggle }) {
  const root = useRef(null);
  const arm = useRef(null);

  useGSAP(() => {
    gsap.timeline({ scrollTrigger: { trigger: '.mp', start: 'top 80%' } })
      .from('.mp-photo', { y: -40, rotation: -9, opacity: 0, duration: 0.9, ease: 'power3.out', clearProps: 'opacity' })
      .from('.mp-base', { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', clearProps: 'opacity' }, 0.1)
      .from('.mp-disc', { yPercent: 62, duration: 1.1, ease: 'power3.out' }, 0.35)
      .from('.mp-arm', { x: -14, opacity: 0, duration: 0.7, ease: 'power2.out', clearProps: 'opacity' }, 0.8)
      .from('.mp-caption > *', { y: 12, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out', clearProps: 'opacity' }, 0.9);
  }, { scope: root });

  // jarum turun ke alur piringan saat musik menyala, naik lagi saat dijeda
  useEffect(() => {
    if (!arm.current) return;
    gsap.to(arm.current, { rotation: isPlaying ? 15 : 0, svgOrigin: '130 256', duration: 0.9, ease: 'power2.inOut' });
  }, [isPlaying]);

  if (!WEDDING.music) return null;
  const ring = `${WEDDING.names} · ${WEDDING.dateCompact} · `.toUpperCase();

  return (
    <section className={`sec sec-dark mp-sec${isPlaying ? ' is-playing' : ''}`} id="musik" ref={root} aria-label="Pemutar musik">
      <SectionSeam into="dark" side="left" seed={41} />
      <GoldDust count={22} />

      <div className="sec-inner mp">
        <figure className="mp-photo">
          <img src={MUSIC_PHOTO.src} alt={MUSIC_PHOTO.alt} loading="lazy" decoding="async" />
        </figure>

        <div className="mp-deck">
          <div className="mp-disc-wrap">
            <div className="mp-disc">
              <div className="mp-vinyl">
                <svg className="mp-label" viewBox="0 0 100 100" aria-hidden="true">
                  <defs><path id="mp-ring" d="M50 50 m-35 0 a35 35 0 1 1 70 0 a35 35 0 1 1 -70 0" /></defs>
                  <circle cx="50" cy="50" r="48" className="mp-label-bg" />
                  <circle cx="50" cy="50" r="43" className="mp-label-tick" />
                  <text className="mp-label-text"><textPath href="#mp-ring" textLength="216">{ring}</textPath></text>
                </svg>
              </div>
              <span className="mp-sheen" aria-hidden="true" />
              <button type="button" className="mp-btn" onClick={onToggle}
                aria-label={isPlaying ? 'Jeda musik' : 'Putar musik'} aria-pressed={isPlaying}>
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
                )}
              </button>
            </div>
          </div>

          <div className="mp-base">
            <span className="mp-slot" />
            <span className="mp-knob" /><span className="mp-knob" />
            <span className="mp-brand"><BrandMonogram height={34} decorative color="linear-gradient(135deg, var(--metal-light), var(--metal-bright) 45%, var(--metal-deep))" style={{ display: 'block' }} /></span>
          </div>

          {/* lengan jarum (koordinat = satuan dek 340×294): berporos di kotak, turun ke piringan saat musik diputar */}
          <svg className="mp-arm" viewBox="0 0 340 294" aria-hidden="true">
            <g ref={arm}>
              <path className="mp-arm-rod-sh" d="M130 256 L40 118 L26 106" />
              <path className="mp-arm-rod" d="M130 256 L40 118 L26 106" />
              <g transform="translate(24 104) rotate(-38)">
                <rect className="mp-arm-head" x="-9" y="-6" width="18" height="12" rx="2" />
                <path className="mp-arm-lift" d="M9 -2 l7 -4" />
              </g>
              <rect className="mp-arm-weight" x="135" y="262" width="16" height="20" rx="4" transform="rotate(-34 143 272)" />
            </g>
            <circle className="mp-arm-pivot" cx="130" cy="256" r="14" />
            <circle className="mp-arm-cap" cx="130" cy="256" r="5.5" />
          </svg>
        </div>

        <div className="mp-caption">
          <p className="mp-cta">{isPlaying ? 'Now Playing' : 'Tap to Play'}</p>
          <p className="mp-song">{WEDDING.musicTitle}</p>
        </div>
      </div>
    </section>
  );
}
