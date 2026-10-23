import React, { useState, useEffect, useRef } from 'react';
import BrandMonogram from './BrandMonogram';
import useScrollReveal from '../hooks/useScrollReveal';

export default function LoveStory() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.08 });
  const timelineRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const chapters = [
    {
      act: 'BABAK I',
      title: 'Pertemuan Pertama',
      location: 'Probolinggo',
      text: 'Tidak pernah saling mengenal sebelumnya, takdir mempertemukan kami melalui sebuah tempat kerja setelah salah satu dari kami memulai babak baru di Probolinggo. Tanpa disangka, sejak hari pertama, ada kesan baik yang perlahan tumbuh. Waktu yang kami habiskan bersama dalam pergantian shift membuka ruang untuk saling mengenal lebih dalam, hingga kami menemukan kecocokan yang tak pernah terduga sebelumnya.',
      iconText: '01',
      threshold: 0.05,
    },
    {
      act: 'BABAK II',
      title: 'Menyatukan Langkah',
      location: 'Komitmen Bersama',
      text: 'Kurang dari setahun sejak pertemuan itu, kami memantapkan hati untuk melangkah lebih jauh, bukan lagi sekadar rekan kerja melainkan dua insan yang berjalan menuju tujuan yang sama. Kami belajar saling mendengarkan, bertukar pikiran, memberi dukungan, memahami sudut pandang yang berbeda, dan senantiasa menemukan jalan tengah dalam setiap langkah pendewasaan.',
      iconText: '02',
      threshold: 0.45,
    },
    {
      act: 'BABAK III',
      title: 'Menuju Janji Suci',
      location: '17 Juli 2027',
      text: 'Seiring berjalannya waktu, keyakinan itu bermetamorfosis menjadi sebuah harapan suci: bukan hanya saling menemani hari ini, tetapi juga menghabiskan sisa usia bersama. Dengan penuh rasa syukur, kami kini bersiap mengikat janji suci, membawa kisah ini ke dalam perjalanan ibadah terpanjang seumur hidup, dengan doa semoga Allah SWT senantiasa meridai setiap langkah kami hingga ke jannah-Nya.',
      iconText: '03',
      threshold: 0.82,
    },
  ];

  // Scroll-Linked Drawing Spine Calculation
  useEffect(() => {
    let ticking = false;

    const updateSpineProgress = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const viewportTrigger = window.innerHeight * 0.68;
      const distance = viewportTrigger - rect.top;
      const rawProgress = distance / rect.height;
      const clamped = Math.min(1, Math.max(0, rawProgress));
      setScrollProgress(clamped);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateSpineProgress);
        ticking = true;
      }
    };

    updateSpineProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateSpineProgress);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateSpineProgress);
    };
  }, []);

  return (
    <section
      className="pt-12 pb-16 px-5 text-center relative overflow-hidden bg-gradient-to-b from-ivory via-aqua-tint/35 to-ivory"
      id="kisah"
      ref={sectionRef}
    >
      {/* Section Header */}
      <div
        className={`text-center mb-8 reveal-blur-up ${
          isVisible ? 'is-revealed' : ''
        }`}
      >
        <span className="text-[10px] sm:text-[11px] font-bold text-aqua-teal uppercase tracking-[0.28em] block mb-1 font-sans">
          Our Journey
        </span>
        <h2 className="font-headline text-3xl sm:text-4xl text-emerald-deep font-normal">
          Kisah Cinta
        </h2>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-2.5 rounded-full"></div>
      </div>

      {/* Editorial Pull-Quote Banner */}
      <div
        className={`max-w-md mx-auto mb-10 text-center px-4 reveal-scale-bloom ${
          isVisible ? 'is-revealed' : ''
        }`}
        style={{ transitionDelay: '120ms' }}
      >
        <p className="font-headline italic text-base sm:text-lg text-emerald-deep/90 leading-relaxed">
          “Setiap kisah cinta itu indah, namun kisah yang kami rajut bersama adalah yang paling kami syukuri.”
        </p>
      </div>

      {/* 3-Babak Vertical Storyboard Timeline */}
      <div className="max-w-md mx-auto relative text-left" ref={timelineRef}>
        {/* Base Track Line & Scroll-Linked Active Spine Line (Keduanya presisi di left-4 sm:left-5 -translate-x-1/2) */}
        <div className="absolute left-4 sm:left-5 -translate-x-1/2 top-4 bottom-16 w-[2px] bg-gold/25 rounded-full overflow-hidden">
          <div
            className="w-full bg-gradient-to-b from-gold via-aqua to-emerald-deep transition-all duration-150 ease-out rounded-full shadow-[0_0_10px_rgba(35,157,142,0.6)]"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>

        <div className="space-y-8 relative">
          {chapters.map((ch, index) => {
            const isNodeActive = scrollProgress >= ch.threshold;

            return (
              <div
                key={ch.act}
                className={`relative pl-11 sm:pl-14 reveal-slide-right ${
                  isVisible ? 'is-revealed' : ''
                }`}
                style={{ transitionDelay: `${200 + index * 160}ms` }}
              >
                {/* Timeline Node Badge — Presisi 100% satu sumbu tengah (left-4 sm:left-5 -translate-x-1/2) dengan garis vertikal */}
                <div
                  className={`absolute left-4 sm:left-5 -translate-x-1/2 top-4 w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${
                    isNodeActive
                      ? 'bg-gradient-to-tr from-emerald-deep via-aqua-teal to-emerald text-gold-pale border-2 border-gold shadow-glow-aqua scale-105 ring-4 ring-aqua-glow/20'
                      : 'bg-ivory text-charcoal-muted border-2 border-gold/40 shadow-sm scale-95'
                  }`}
                >
                  <span className="font-headline text-[11px] font-bold tracking-tight tabular-nums leading-none">
                    {ch.iconText}
                  </span>
                </div>

                {/* Story Chapter Card */}
                <div
                  className={`vellum-panel rounded-2xl p-5 sm:p-6 transition-all duration-500 relative overflow-hidden ${
                    isNodeActive
                      ? 'border-gold/55 shadow-vellum'
                      : 'border-gold/30 shadow-soft opacity-90'
                  }`}
                >
                  {/* Subtle Top Jewel Accent Bar */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-gold/60 via-aqua/50 to-transparent" />

                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold text-aqua-teal tracking-[0.22em] uppercase font-sans">
                      {ch.act}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-deep bg-aqua-tint/80 px-2.5 py-0.5 rounded-full font-sans border border-aqua/30">
                      {ch.location}
                    </span>
                  </div>

                  <h3 className="font-headline text-xl sm:text-2xl font-bold text-emerald-deep mb-3 leading-snug">
                    {ch.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-charcoal/90 leading-relaxed font-sans text-left editorial-dropcap">
                    {ch.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Elegant Closure Accent */}
        <div className="flex items-center justify-center gap-3 mt-10 pt-4 border-t border-gold/25 relative z-10">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/50"></div>
          <BrandMonogram size="sm" variant="emerald" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/50"></div>
        </div>
      </div>
    </section>
  );
}
