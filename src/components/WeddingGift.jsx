import React, { useState } from 'react';
import { Gift, Copy, Check, MapPin, CreditCard } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function WeddingGift() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.12 });
  const [activeTab, setActiveTab] = useState('physical'); // 'physical' | 'transfer'
  const [copiedId, setCopiedId] = useState(null);

  const bankAccounts = [
    {
      id: 'groom',
      bankName: 'Bank BCA',
      accountNumber: '1234567890',
      accountHolder: 'Fahrul Irsyad Fianto',
      label: 'Rekening Mempelai Pria',
    },
    {
      id: 'bride',
      bankName: 'Bank Mandiri',
      accountNumber: '0987654321000',
      accountHolder: 'Sabrina Nabila Kholiqin',
      label: 'Rekening Mempelai Wanita',
    },
  ];

  const physicalAddress = {
    recipient: 'Sabrina Nabila & Fahrul Irsyad',
    phone: '0812-3456-7890',
    fullAddress: 'Jl. Kotaanyar, RT.24/RW.7, Dusun Krajan, Sumberanyar, Kec. Paiton, Kabupaten Probolinggo, Jawa Timur 67291',
  };

  const handleCopy = (text, id) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <section className="pt-12 pb-14 px-5 text-center relative overflow-hidden" id="kado" ref={sectionRef}>
      {/* Section Header */}
      <div
        className={`text-center mb-9 reveal-blur-up ${
          isVisible ? 'is-revealed' : ''
        }`}
      >
        <span className="text-[10px] sm:text-[11px] font-bold text-aqua-teal uppercase tracking-[0.28em] block mb-1 font-sans">
          Tanda Kasih
        </span>
        <h2 className="font-headline text-3xl sm:text-4xl text-emerald-deep font-normal">
          Amplop Digital
        </h2>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-2.5 rounded-full"></div>
      </div>

      <div
        className={`max-w-md mx-auto vellum-panel rounded-3xl p-6 sm:p-8 shadow-soft border border-gold/40 text-center relative overflow-hidden reveal-scale-bloom ${
          isVisible ? 'is-revealed' : ''
        }`}
        style={{ transitionDelay: '140ms' }}
      >
        {/* Subtle Ambient Light */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-aqua-glow/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

        <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-sans mb-6 max-w-sm mx-auto">
          Doa restu Anda merupakan karunia terindah bagi kami. Namun jika memberi adalah ungkapan tanda kasih Anda, kami dengan penuh ketulusan menerimanya.
        </p>

        {/* Segmented Tab Switcher with Animated Sliding Pill Indicator */}
        <div className="relative grid grid-cols-2 p-1 bg-ivory-container/90 border border-gold/40 rounded-full max-w-xs mx-auto mb-6 shadow-inner">
          {/* Sliding Background Pill */}
          <div
            className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-emerald-deep via-aqua-teal to-emerald shadow-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none"
            style={{
              transform: activeTab === 'physical' ? 'translateX(0%)' : 'translateX(100%)',
            }}
          />

          <button
            type="button"
            onClick={() => setActiveTab('physical')}
            className={`relative z-10 py-2 px-3 rounded-full text-xs font-semibold font-sans flex items-center justify-center gap-1.5 transition-colors duration-300 cursor-pointer ${
              activeTab === 'physical'
                ? 'text-ivory'
                : 'text-charcoal-muted hover:text-emerald-deep'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Kirim Kado</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('transfer')}
            className={`relative z-10 py-2 px-3 rounded-full text-xs font-semibold font-sans flex items-center justify-center gap-1.5 transition-colors duration-300 cursor-pointer ${
              activeTab === 'transfer'
                ? 'text-ivory'
                : 'text-charcoal-muted hover:text-emerald-deep'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Transfer Bank</span>
          </button>
        </div>

        {/* Tab 1: Kirim Kado Fisik */}
        {activeTab === 'physical' && (
          <div className="rounded-2xl p-5 sm:p-6 text-left bg-ivory/95 paper-grain border border-gold/40 shadow-sm animate-fadeIn">
            <div className="flex items-center gap-2 text-emerald-deep font-sans font-bold text-sm mb-3">
              <MapPin className="w-4 h-4 text-aqua-teal" />
              <span>Alamat Pengiriman Kado Fisik</span>
            </div>

            <div className="space-y-2.5 text-xs font-sans text-charcoal leading-relaxed mb-4">
              <div>
                <span className="text-charcoal-muted text-[11px] block">Penerima:</span>
                <span className="font-semibold text-emerald-deep">{physicalAddress.recipient}</span>
              </div>
              <div>
                <span className="text-charcoal-muted text-[11px] block">Nomor Telepon:</span>
                <span className="font-medium tabular-nums">{physicalAddress.phone}</span>
              </div>
              <div>
                <span className="text-charcoal-muted text-[11px] block">Alamat Lengkap:</span>
                <p className="text-charcoal-forest bg-ivory-subtle p-3 rounded-xl border border-gold/30 mt-1 select-all font-sans leading-relaxed">
                  {physicalAddress.fullAddress}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(physicalAddress.fullAddress, 'address')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold font-sans flex items-center justify-center gap-2 border border-gold/60 transition-all active:scale-95 bg-gradient-to-r from-emerald-deep to-aqua-teal text-gold-pale hover:brightness-110 shadow-sm cursor-pointer"
            >
              {copiedId === 'address' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-aqua-soft" />
                  <span>Alamat Berhasil Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-gold-pale" />
                  <span>Salin Alamat Lengkap</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Tab 2: Transfer Bank - Priority Jewel Cards with Metallic Sheen */}
        {activeTab === 'transfer' && (
          <div className="space-y-4 animate-fadeIn">
            {bankAccounts.map((account) => (
              <div
                key={account.id}
                className="relative rounded-2xl p-5 sm:p-6 text-left bg-gradient-to-br from-[#003429] via-[#004A40] to-[#01241D] text-ivory border border-gold/50 shadow-xl overflow-hidden group"
              >
                {/* Periodic Metallic Diagonal Sheen Sweep */}
                <div
                  className="absolute -top-1/2 -left-3/4 w-1/3 h-[200%] bg-gradient-to-r from-transparent via-white/15 to-transparent rotate-[25deg] pointer-events-none"
                  style={{ animation: 'sheenSweep 5.5s ease-in-out infinite' }}
                />

                {/* Subtle Sheen / Ambient Glow */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-aqua-glow/20 rounded-full blur-2xl pointer-events-none" />

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-aqua-soft block mb-0.5">
                      {account.label}
                    </span>
                    <span className="font-headline font-bold text-xl sm:text-2xl tracking-wide text-gold-pale">
                      {account.bankName}
                    </span>
                  </div>
                  {/* Priority Banking EMV Gold Chip */}
                  <div className="w-9 h-7 rounded-md bg-gradient-to-tr from-gold via-gold-pale to-gold-metallic border border-gold-light/60 shadow-sm flex items-center justify-center opacity-90">
                    <div className="w-6 h-4 border border-emerald-deep/30 rounded-xs" />
                  </div>
                </div>

                {/* Nomor Rekening */}
                <div className="mb-2.5 relative z-10">
                  <span className="text-[10px] font-sans text-ivory/65 uppercase tracking-wider block mb-0.5">
                    Nomor Rekening
                  </span>
                  <div className="font-mono text-xl sm:text-2xl font-bold tracking-widest text-gold-pale select-all tabular-nums">
                    {account.accountNumber}
                  </div>
                </div>

                {/* Atas Nama */}
                <div className="mb-5 relative z-10">
                  <span className="text-[10px] font-sans text-ivory/65 uppercase tracking-wider block mb-0.5">
                    Atas Nama
                  </span>
                  <span className="text-sm font-sans font-semibold text-ivory block">
                    {account.accountHolder}
                  </span>
                </div>

                {/* Tombol Salin */}
                <button
                  type="button"
                  onClick={() => handleCopy(account.accountNumber, account.id)}
                  className="relative z-10 w-full py-2.5 px-4 rounded-xl text-xs font-bold font-sans flex items-center justify-center gap-2 border transition-all active:scale-95 bg-white/10 text-gold-pale hover:bg-gold hover:text-emerald-deep border-gold/45 shadow-sm cursor-pointer"
                >
                  {copiedId === account.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-aqua-soft" />
                      <span>Nomor Rekening Berhasil Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Nomor Rekening</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
