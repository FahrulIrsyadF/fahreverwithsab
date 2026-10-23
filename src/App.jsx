import React, { useState, useMemo, useRef } from 'react';
import { validateGuest } from './data/guests';
import GateScreen from './components/GateScreen';
import CoverScreen from './components/CoverScreen';
import FallingPetals from './components/FallingPetals';
import NavbarTop from './components/NavbarTop';
import NavbarBottom from './components/NavbarBottom';
import OpeningVerse from './components/OpeningVerse';
import CoupleSection from './components/CoupleSection';
import Countdown from './components/Countdown';
import EventDetails from './components/EventDetails';
import LoveStory from './components/LoveStory';
import Gallery from './components/Gallery';
import WeddingGift from './components/WeddingGift';
import RSVPSection from './components/RSVPSection';
import Footer from './components/Footer';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Ambil dan validasi param ?to=
  const validatedGuest = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to');
    return validateGuest(toParam);
  }, []);

  // Handle Play Audio
  const handleOpenInvitation = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.log('Autoplay dicegah browser:', err);
          setIsPlaying(false);
        });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle Audio Play/Pause
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  // Jika nama tidak ada di whitelist / query param kosong: Kunci akses total
  if (!validatedGuest) {
    return <GateScreen />;
  }

  return (
    <div className="w-full min-h-screen bg-[#051C13] flex justify-center selection:bg-gold-light selection:text-emerald-deep">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="https://inv.leafitation.com/wp-content/uploads/2025/09/Marry-Your-Daughter-Brian-McKnight-animation.mp3"
      />

      {/* Container Mobile-First Max 512px Centered */}
      <div className="w-full max-w-lg min-h-screen bg-ivory relative shadow-2xl overflow-x-hidden foliage-watermark">
        {/* Atmospheric Background Canvas dari Stitch */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex justify-center">
          <div className="w-full max-w-lg h-full relative">
            <div className="absolute -top-16 -left-20 w-80 h-96 bg-emerald/20 rounded-full blur-3xl mix-blend-multiply opacity-60"></div>
            <div className="absolute top-1/4 -right-24 w-80 h-96 bg-aqua-glow/20 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-light/20 rounded-full blur-3xl opacity-70"></div>
            <div className="absolute inset-8 border border-gold/15 rounded-full pointer-events-none"></div>
          </div>
        </div>

        {/* Canvas Falling Petals (60fps Emerald, Aqua & Gold) */}
        <FallingPetals />

        {/* Top Header Bar (Fixed at top saat dibuka, dengan Monogram F & S dan Audio Speaker) */}
        {isOpened && (
          <NavbarTop isPlaying={isPlaying} onToggleMusic={toggleAudio} />
        )}

        {/* Cover Screen (Curtain Reveal + Crest dari Stitch) */}
        <CoverScreen
          guestName={validatedGuest}
          isOpened={isOpened}
          onOpen={handleOpenInvitation}
        />

        {/* Konten Utama Undangan (dengan padding top untuk NavbarTop & padding bottom untuk floating NavbarBottom) */}
        <main
          className={`relative z-10 transition-opacity duration-700 ${
            isOpened ? 'opacity-100 pt-14 pb-28' : 'opacity-0'
          }`}
        >
          <OpeningVerse />
          <CoupleSection />
          <Countdown />
          <EventDetails />
          <LoveStory />
          <Gallery />
          <WeddingGift />
          <RSVPSection guestName={validatedGuest} />
          <Footer />
        </main>

        {/* Bottom Floating Navigation Bar (Mempelai, Acara, Galeri, RSVP) */}
        {isOpened && <NavbarBottom />}
      </div>
    </div>
  );
}
