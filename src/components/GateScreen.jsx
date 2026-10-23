import React from 'react';
import { Lock } from 'lucide-react';

export default function GateScreen() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#051C13] selection:bg-gold-light selection:text-emerald-deep">
      <div className="w-full max-w-md vellum-panel rounded-3xl p-8 sm:p-10 shadow-vellum text-center border border-gold/40 relative overflow-hidden">
        {/* Ambient Jewel Glow */}
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-aqua-glow/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-emerald/30 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-tr from-emerald-deep to-emerald text-gold-pale flex items-center justify-center shadow-md border border-gold/40">
          <Lock className="w-7 h-7 text-gold-pale" />
        </div>

        <h1 className="font-headline text-3xl font-bold text-emerald-deep mb-3">
          Mohon Maaf
        </h1>

        <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed mb-6 font-sans">
          Nama Anda tidak terdaftar dalam daftar tamu undangan resmi.
        </p>

        <div className="text-xs text-emerald-deep bg-emerald-tint/90 border border-emerald/25 p-4 rounded-xl leading-relaxed font-sans shadow-sm">
          Undangan ini bersifat privat dan hanya dapat diakses oleh tamu yang terdaftar dalam daftar resmi keluarga mempelai. Silakan hubungi pihak mempelai untuk konfirmasi lebih lanjut.
        </div>
      </div>
    </div>
  );
}
