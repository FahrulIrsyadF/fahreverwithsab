import React, { useState } from 'react';
import { Gift, Copy, Check, MapPin, CreditCard } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function WeddingGift() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });
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
    <section className="pt-8 pb-14 px-5 text-center relative overflow-hidden" id="kado" ref={sectionRef}>
      {/* Section Header */}
      <div
        className={`text-center mb-10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
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
        className={`max-w-md mx-auto vellum-panel paper-grain rounded-3xl p-6 sm:p-8 shadow-soft border border-gold/40 text-center relative overflow-hidden transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Subtle Ambient Light */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-aqua-glow/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

        <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-sans mb-6 max-w-sm mx-auto">
          Doa restu Anda merupakan karunia terindah bagi kami. Namun jika memberi adalah ungkapan tanda kasih Anda, kami dengan penuh ketulusan menerimanya.
        </p>

        {/* Segmented Tab Switcher with Sliding Indicator */}
        <div className="flex items-center justify-center p-1 bg-ivory-container/80 border border-gold/40 rounded-full max-w-xs mx-auto mb-6 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab('physical')}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold font-sans flex items-center justify-center gap-1.5 transition-all duration-300 ${
              activeTab === 'physical'
                ? 'bg-gradient-to-r from-emerald-deep to-aqua-teal text-ivory shadow-sm'
                : 'text-charcoal-muted hover:text-emerald-deep'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Kirim Kado</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('transfer')}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold font-sans flex items-center justify-center gap-1.5 transition-all duration-300 ${
              activeTab === 'transfer'
                ? 'bg-gradient-to-r from-emerald-deep to-aqua-teal text-ivory shadow-sm'
                : 'text-charcoal-muted hover:text-emerald-deep'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Transfer Bank</span>
          </button>
        </div>

        {/* Tab 1: Kirim Kado Fisik */}
        {activeTab === 'physical' && (
          <div className="rounded-2xl p-5 sm:p-6 text-left bg-white/85 border border-gold/40 shadow-sm animate-fadeIn">
            <div className="flex items-center gap-2 text-emerald-deep font-sans font-bold text-sm mb-3">
              <MapPin className="w-4 h-4 text-aqua-teal" />
              <span>Alamat Pengiriman Kado Fisik</span>
            </div>

            <div className="space-y-2 text-xs font-sans text-charcoal leading-relaxed mb-4">
              <div>
                <span className="text-charcoal-muted text-[11px] block">Penerima:</span>
                <span className="font-semibold text-emerald-deep">{physicalAddress.recipient}</span>
              </div>
              <div>
                <span className="text-charcoal-muted text-[11px] block">Nomor Telepon:</span>
                <span className="font-medium">{physicalAddress.phone}</span>
              </div>
              <div>
                <span className="text-charcoal-muted text-[11px] block">Alamat Lengkap:</span>
                <p className="text-charcoal-forest bg-ivory/90 p-2.5 rounded-lg border border-gold/25 mt-1 select-all font-sans leading-relaxed">
                  {physicalAddress.fullAddress}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(physicalAddress.fullAddress, 'address')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold font-sans flex items-center justify-center gap-2 border border-gold transition-all active:scale-95 bg-gold/15 text-emerald-deep hover:bg-gold hover:text-white"
            >
              {copiedId === 'address' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-aqua-teal" />
                  <span>Alamat Berhasil Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-emerald-deep" />
                  <span>Salin Alamat Lengkap</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Tab 2: Transfer Bank - Priority Jewel Cards */}
        {activeTab === 'transfer' && (
          <div className="space-y-4 animate-fadeIn">
            {bankAccounts.map((account) => (
              <div
                key={account.id}
                className="relative rounded-2xl p-5 sm:p-6 text-left bg-gradient-to-br from-[#003429] via-[#00483E] to-[#012820] text-ivory border border-gold/40 shadow-md overflow-hidden group"
              >
                {/* Subtle Sheen / Ambient Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-aqua-glow/15 rounded-full blur-2xl pointer-events-none" />

                <div className="flex justify-between items-start mb-4">
                  <span className="font-headline font-bold text-xl sm:text-2xl tracking-wide text-gold-pale">
                    {account.bankName}
                  </span>
                  <div className="w-8 h-6 rounded bg-gradient-to-tr from-gold-pale to-gold border border-gold-light/40 opacity-80" />
                </div>

                {/* Nomor Rekening */}
                <div className="mb-2">
                  <span className="text-[10px] font-sans text-ivory/60 uppercase tracking-wider block mb-0.5">
                    Nomor Rekening
                  </span>
                  <div className="font-mono text-xl sm:text-2xl font-bold tracking-widest text-gold-pale select-all tabular-nums">
                    {account.accountNumber}
                  </div>
                </div>

                {/* Atas Nama */}
                <div className="mb-5">
                  <span className="text-[10px] font-sans text-ivory/60 uppercase tracking-wider block mb-0.5">
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
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold font-sans flex items-center justify-center gap-2 border transition-all active:scale-95 bg-white/10 text-gold-pale hover:bg-gold hover:text-emerald-deep border-gold/40 shadow-xs"
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
