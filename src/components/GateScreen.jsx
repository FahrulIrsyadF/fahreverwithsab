import React from 'react';
import { Lock } from 'lucide-react';

export default function GateScreen() {
  return (
    <div className="min-h-screen w-full max-w-[480px] mx-auto flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-ivory to-ivory-container">
      <div className="w-full vellum-card rounded-2xl p-8 sm:p-10 shadow-vellum text-center border border-gold/30">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-tint text-emerald flex items-center justify-center shadow-sm">
          <Lock className="w-7 h-7 text-emerald" />
        </div>

        <h1 className="font-headline text-3xl font-bold text-emerald-deep mb-3">
          Mohon Maaf
        </h1>

        <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed mb-6 font-sans">
          Nama Anda tidak terdaftar dalam daftar tamu undangan resmi.
        </p>

        <div className="text-xs text-emerald-rich bg-emerald-tint/80 border border-emerald/20 p-4 rounded-lg leading-relaxed">
          Undangan ini bersifat privat dan hanya dapat diakses oleh tamu yang terdaftar dalam daftar resmi keluarga mempelai. Silakan hubungi pihak mempelai untuk konfirmasi lebih lanjut.
        </div>
      </div>
    </div>
  );
}
