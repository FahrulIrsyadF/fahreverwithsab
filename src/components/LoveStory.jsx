import React from 'react';
import BrandMonogram from './BrandMonogram';
import useScrollReveal from '../hooks/useScrollReveal';

export default function LoveStory() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.08 });

  const chapters = [
    {
      act: 'BABAK I',
      title: 'Pertemuan Pertama',
      location: 'Probolinggo',
      text: 'Tidak pernah saling mengenal sebelumnya, takdir mempertemukan kami melalui sebuah tempat kerja setelah salah satu dari kami memulai babak baru di Probolinggo. Tanpa disangka, sejak hari pertama, ada kesan baik yang perlahan tumbuh. Waktu yang kami habiskan bersama dalam pergantian shift membuka ruang untuk saling mengenal lebih dalam, hingga kami menemukan kecocokan yang tak pernah terduga sebelumnya.',
      iconText: '01'
    },
    {
      act: 'BABAK II',
      title: 'Menyatukan Langkah',
      location: 'Komitmen Bersama',
      text: 'Kurang dari setahun sejak pertemuan itu, kami memantapkan hati untuk melangkah lebih jauh, bukan lagi sekadar rekan kerja melainkan dua insan yang berjalan menuju tujuan yang sama. Kami belajar saling mendengarkan, bertukar pikiran, memberi dukungan, memahami sudut pandang yang berbeda, dan senantiasa menemukan jalan tengah dalam setiap langkah pendewasaan.',
      iconText: '02'
    },
    {
      act: 'BABAK III',
      title: 'Menuju Janji Suci',
      location: '17 Juli 2027',
      text: 'Seiring berjalannya waktu, keyakinan itu bermetamorfosis menjadi sebuah harapan suci: bukan hanya saling menemani hari ini, tetapi juga menghabiskan sisa usia bersama. Dengan penuh rasa syukur, kami kini bersiap mengikat janji suci, membawa kisah ini ke dalam perjalanan ibadah terpanjang seumur hidup, dengan doa semoga Allah SWT senantiasa meridai setiap langkah kami hingga ke jannah-Nya.',
      iconText: '03'
    }
  ];

  return (
    <section className="pt-8 pb-14 px-5 text-center relative overflow-hidden" id="kisah" ref={sectionRef}>
      {/* Section Header */}
      <div
        className={`text-center mb-10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
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

      {/* Quote Banner */}
      <div
        className={`max-w-md mx-auto mb-10 text-center px-4 transition-all duration-800 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <p className="font-headline italic text-base sm:text-lg text-emerald-deep/90 leading-relaxed">
          “Setiap kisah cinta itu indah, namun kisah yang kami rajut bersama adalah yang paling kami syukuri.”
        </p>
      </div>

      {/* 3-Babak Vertical Storyboard Timeline */}
      <div className="max-w-md mx-auto relative text-left">
        {/* Continuous Gradient Spine Line (Champagne Gold to Aquamarine Teal) */}
        <div className="absolute left-5 sm:left-6 top-3 bottom-6 w-0.5 bg-gradient-to-b from-gold via-aqua to-emerald-deep/60 rounded-full" />

        <div className="space-y-8 relative">
          {chapters.map((ch, index) => (
            <div
              key={index}
              className={`relative pl-12 sm:pl-16 transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + index * 140}ms` }}
            >
              {/* Timeline Node Badge */}
              <div className="absolute left-2.5 sm:left-3.5 -translate-x-1/2 top-1.5 w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-deep to-emerald text-gold-pale border border-gold/60 flex items-center justify-center shadow-md z-10">
                <span className="font-sans text-[9px] font-bold">{ch.iconText}</span>
              </div>

              {/* Story Chapter Card */}
              <div className="vellum-panel paper-grain rounded-2xl p-5 sm:p-6 shadow-soft border border-gold/40 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] sm:text-[10px] font-bold text-aqua-teal tracking-[0.2em] uppercase font-sans">
                    {ch.act}
                  </span>
                  <span className="text-[10px] font-semibold text-gold-deep bg-gold/10 px-2.5 py-0.5 rounded-full font-sans border border-gold/25">
                    {ch.location}
                  </span>
                </div>

                <h3 className="font-headline text-lg sm:text-xl font-bold text-emerald-deep mb-2.5 leading-snug">
                  {ch.title}
                </h3>

                <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed font-sans text-left">
                  {ch.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Elegant Closure Accent */}
        <div className="flex items-center justify-center gap-3 mt-10 pt-4 border-t border-gold/20 relative z-10">
          <div className="w-10 h-px bg-gradient-to-r from-transparent to-gold/40"></div>
          <BrandMonogram size="sm" variant="gold" />
          <div className="w-10 h-px bg-gradient-to-l from-transparent to-gold/40"></div>
        </div>
      </div>
    </section>
  );
}
