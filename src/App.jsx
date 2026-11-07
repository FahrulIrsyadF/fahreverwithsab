import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { gsap, useGSAP, ScrollTrigger } from './lib/gsap';
import { validateGuest } from './data/guests';
import { WEDDING } from './data/wedding';
import GateScreen from './components/GateScreen';
import CoverScreen from './components/CoverScreen';
import Hero from './components/cover/Hero';
import NavbarTop from './components/NavbarTop';
import NavbarBottom from './components/NavbarBottom';
import VerseScroll from './components/verse/VerseScroll';
import CoupleSection from './components/CoupleSection';
import LoveStory from './components/LoveStory';
import SaveTheDate from './components/SaveTheDate';
import EventDetails from './components/EventDetails';
import Gallery from './components/Gallery';
import WeddingGift from './components/WeddingGift';
import RSVPSection from './components/RSVPSection';
import Footer from './components/Footer';
import ThreadLayer from './components/thread/ThreadLayer';

// arah masuk untuk elemen ber-atribut data-reveal ("up" | "left" | "right")
const REVEAL_FROM = { up: { y: 28 }, left: { x: -32, y: 10 }, right: { x: 32, y: 10 } };

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [coverDone, setCoverDone] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const mainRef = useRef(null);

  // Ambil dan validasi param ?to=
  const validatedGuest = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return validateGuest(params.get('to'));
  }, []);

  // Selalu mulai dari atas (cover menutupi layar; posisi scroll lama membuat trigger salah hitung)
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  // Musik: dipanggil dari gesture user di cover (lihat CoverScreen). Aman dipanggil berulang.
  const startAudio = useCallback(() => {
    const a = audioRef.current;
    if (!a || !a.paused) return;
    a.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, []);

  const toggleAudio = () => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) {
      a.pause();
      setIsPlaying(false);
    } else {
      a.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  // Saat "menyelam" ke surat: halaman undangan tampil di bawah cover (scroll instan, bukan smooth)
  const handleOpen = useCallback(() => {
    window.scrollTo(0, 0);
    setIsOpened(true);
  }, []);

  // Kunci scroll selama cover; setelah dilepas, ukuran viewport/scrollbar berubah → refresh sekali
  useEffect(() => {
    document.body.style.overflow = isOpened ? '' : 'hidden';
    let raf = 0;
    if (isOpened) raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = '';
    };
  }, [isOpened]);

  // Auto-pause audio saat tab ditinggalkan
  useEffect(() => {
    const onVisibility = () => {
      if (!audioRef.current || !isOpened) return;
      if (document.hidden && isPlaying) audioRef.current.pause();
      else if (!document.hidden && isPlaying) audioRef.current.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [isOpened, isPlaying]);

  // Animasi bersama lintas section: ranting di sambungan + reveal untuk section tanpa demo lab
  useGSAP(() => {
    if (!mainRef.current) return;

    // Ranting di sambungan: tumbuh mengikuti scroll + parallax (lab demo 02)
    gsap.utils.toArray('.seam-sprig').forEach((s) => {
      gsap.from(s.querySelectorAll('.sprig-path'), {
        drawSVG: 0, stagger: { amount: 0.4 }, ease: 'none',
        scrollTrigger: { trigger: s, start: 'top 95%', end: 'top 40%', scrub: 1 },
      });
      gsap.fromTo(s, { yPercent: 18 }, {
        yPercent: -18, ease: 'none',
        scrollTrigger: { trigger: s, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });

    // Reveal: elemen [data-reveal] muncul bergiliran saat masuk layar
    const els = gsap.utils.toArray('[data-reveal]');
    els.forEach((el) => gsap.set(el, { opacity: 0, ...(REVEAL_FROM[el.dataset.reveal] || REVEAL_FROM.up) }));
    ScrollTrigger.batch(els, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => gsap.to(batch, { opacity: 1, x: 0, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out', overwrite: true }),
    });
  }, { scope: mainRef, dependencies: [validatedGuest] });

  // Jika nama tidak ada di whitelist / query param kosong: kunci akses total
  if (!validatedGuest) {
    return <GateScreen />;
  }

  return (
    <div className="w-full min-h-screen bg-base-950 flex justify-center">
      {WEDDING.music && <audio ref={audioRef} loop preload="auto" src={WEDDING.music} />}

      {/* Kontainer mobile-first maks 512px. overflow-x: clip (bukan hidden) agar tidak jadi scroll container. */}
      <div className="w-full max-w-lg min-h-screen bg-paper relative shadow-2xl overflow-x-clip-safe">
        {isOpened && <NavbarTop isPlaying={isPlaying} onToggleMusic={WEDDING.music ? toggleAudio : null} />}

        {!coverDone && (
          <CoverScreen
            guestName={validatedGuest}
            onOpen={handleOpen}
            onDone={() => setCoverDone(true)}
            onStartAudio={startAudio}
          />
        )}

        {/* Halaman undangan. TIDAK boleh ada transform/filter di sini (merusak pin ScrollTrigger). */}
        <main
          ref={mainRef}
          aria-hidden={!isOpened}
          className={`relative z-10 pt-14 transition-opacity duration-700 ${isOpened ? 'opacity-100' : 'opacity-0'}`}
        >
          <ThreadLayer pageRef={mainRef} active={isOpened} />
          <Hero guestName={validatedGuest} play={isOpened} />
          <VerseScroll />
          <CoupleSection />
          <LoveStory />
          <SaveTheDate />
          <EventDetails />
          <Gallery />
          <WeddingGift />
          <RSVPSection guestName={validatedGuest} />
          <Footer />
        </main>

        {isOpened && <NavbarBottom />}
      </div>
    </div>
  );
}
