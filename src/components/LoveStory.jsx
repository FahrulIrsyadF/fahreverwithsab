import React from 'react';

export default function LoveStory() {
  return (
    <section className="pt-6 pb-12 px-5 text-center" id="kisah">
      <div className="text-center mb-8">
        <span className="text-[11px] font-bold text-gold uppercase tracking-[0.25em] block mb-1 font-sans">
          Our Journey
        </span>
        <h2 className="font-headline text-3xl sm:text-4xl text-emerald-deep font-normal">
          Love Story
        </h2>
        <div className="w-12 h-0.5 bg-gold/50 mx-auto mt-2 rounded-full"></div>
      </div>

      <div className="vellum-panel rounded-2xl p-6 sm:p-8 shadow-soft border border-gold/40 text-left relative overflow-hidden foliage-watermark">
        {/* Subtle ambient light accents */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-emerald/10 rounded-full blur-2xl pointer-events-none" />

        {/* Script Quote */}
        <div className="text-center mb-6 relative z-10">
          <p className="font-script text-2xl sm:text-3xl text-emerald-deep leading-relaxed">
            “Every love story is beautiful, but ours is the one we cherish most.”
          </p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-charcoal/90 leading-relaxed text-justify font-sans relative z-10">
          <p>
            Tidak pernah saling mengenal sebelumnya, kami dipertemukan oleh sebuah tempat kerja, setelah salah satu dari kami memulai perjalanan baru di Probolinggo. Tak disangka, sejak pertemuan pertama, <span className="bg-aqua-soft/25 text-emerald-deep font-semibold px-1.5 py-0.5 rounded border-b border-aqua/35">ada kesan baik yang tumbuh di antara kami</span>. Waktu yang sering kami habiskan bersama dalam pergantian shift perlahan membuka ruang untuk saling mengenal lebih dekat, hingga kami menemukan kecocokan yang tak pernah direncanakan sebelumnya.
          </p>

          <p>
            Kurang dari setahun sejak pertemuan itu, kami memutuskan untuk melangkah lebih jauh, bukan sekadar sebagai rekan kerja, melainkan sebagai dua insan yang ingin berjalan menuju tujuan yang sama. Bagi kami, hubungan ini bukan tentang sekadar bersama, tetapi tentang kesungguhan untuk membangun masa depan. <span className="bg-aqua-soft/25 text-emerald-deep font-semibold px-1.5 py-0.5 rounded border-b border-aqua/35">Kami belajar untuk saling mendengarkan, bertukar pikiran, memberi dukungan, memahami perbedaan, memperbaiki diri, dan menemukan jalan tengah dalam setiap langkah yang kami lalui.</span>
          </p>

          <p>
            Seiring waktu, keyakinan itu tumbuh menjadi sebuah harapan: bukan hanya untuk saling menemani hari ini, tetapi juga untuk menghabiskan sisa usia bersama. <span className="bg-aqua-soft/25 text-emerald-deep font-semibold px-1.5 py-0.5 rounded border-b border-aqua/35">Dengan penuh rasa syukur, kami kini bersiap mengikat janji suci, membawa kisah ini ke dalam perjalanan ibadah seumur hidup.</span> Sebuah perjalanan untuk saling menjaga, bertumbuh, dan mencintai dalam setiap keadaan, dengan harapan semoga Allah SWT senantiasa meridai langkah kami, menyatukan kami dalam kebaikan di dunia, dan mempertemukan kami kembali di akhirat kelak.
          </p>
        </div>

        {/* Elegant Closure Accent */}
        <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gold/20 relative z-10">
          <div className="w-8 h-px bg-gold/40"></div>
          <span className="font-headline italic text-xs text-gold tracking-widest">F &amp; S</span>
          <div className="w-8 h-px bg-gold/40"></div>
        </div>
      </div>
    </section>
  );
}
