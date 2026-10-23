import React, { useState } from 'react';
import { Gift, Copy, Check, MapPin } from 'lucide-react';

export default function WeddingGift() {
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
    <section className="pt-6 pb-12 px-5 text-center" id="kado">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-[11px] font-bold text-gold uppercase tracking-[0.25em] block mb-1 font-sans">
          Tanda Kasih
        </span>
        <h2 className="font-headline text-3xl sm:text-4xl text-emerald-deep font-normal">
          Amplop Digital
        </h2>
        <div className="w-12 h-0.5 bg-gold/50 mx-auto mt-2 rounded-full"></div>
      </div>

      <div className="vellum-panel rounded-2xl p-6 sm:p-7 shadow-soft border border-gold/40 text-center relative overflow-hidden">
        {/* Subtle Ambient Light */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-emerald/10 rounded-full blur-2xl pointer-events-none" />

        <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-sans mb-6 max-w-sm mx-auto">
          Doa restu Anda merupakan karunia terindah bagi kami. Namun jika memberi adalah ungkapan tanda kasih Anda, kami dengan penuh ketulusan menerimanya.
        </p>

        {/* Segmented Tab Switcher */}
        <div className="flex items-center justify-center p-1 bg-white/70 border border-gold/30 rounded-full max-w-xs mx-auto mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('physical')}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold font-sans flex items-center justify-center gap-1.5 transition-all duration-300 ${
              activeTab === 'physical'
                ? 'bg-emerald-deep text-ivory shadow-sm'
                : 'text-charcoal-muted hover:text-emerald-deep'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            Kirim Kado
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('transfer')}
            className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold font-sans flex items-center justify-center gap-1.5 transition-all duration-300 ${
              activeTab === 'transfer'
                ? 'bg-emerald-deep text-ivory shadow-sm'
                : 'text-charcoal-muted hover:text-emerald-deep'
            }`}
          >
            Transfer Bank
          </button>
        </div>

        {/* Tab 1: Kirim Kado Fisik (Tampil Awal) */}
        {activeTab === 'physical' && (
          <div className="rounded-2xl p-5 sm:p-6 text-left bg-white/80 border border-gold/40 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-deep font-sans font-bold text-sm mb-3">
              <MapPin className="w-4 h-4 text-emerald" />
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
                <p className="text-charcoal-forest bg-ivory/80 p-2.5 rounded-lg border border-gold/25 mt-1 select-all">
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
                  <Check className="w-3.5 h-3.5 text-emerald" />
                  <span>Alamat Berhasil Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-emerald" />
                  <span>Salin Alamat Lengkap</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Tab 2: Transfer Bank Cards */}
        {activeTab === 'transfer' && (
          <div className="space-y-4">
            {bankAccounts.map((account) => (
              <div
                key={account.id}
                className="relative rounded-2xl p-5 sm:p-6 text-left bg-gradient-to-br from-emerald-deep via-[#064232] to-[#03261C] text-ivory border border-gold/40 shadow-md overflow-hidden"
              >
                {/* Langsung Nama Bank di Bagian Atas */}
                <div className="mb-4">
                  <span className="font-headline font-bold text-xl sm:text-2xl tracking-wide text-gold-pale block">
                    {account.bankName}
                  </span>
                </div>

                {/* Nomor Rekening */}
                <div className="mb-2">
                  <span className="text-[10px] font-sans text-ivory/60 uppercase tracking-wider block mb-0.5">
                    Nomor Rekening
                  </span>
                  <div className="font-mono text-xl sm:text-2xl font-bold tracking-widest text-gold-pale select-all">
                    {account.accountNumber}
                  </div>
                </div>

                {/* Atas Nama Tepat di Bawah Nomor Rekening */}
                <div className="mb-5">
                  <span className="text-[10px] font-sans text-ivory/60 uppercase tracking-wider block mb-0.5">
                    Atas Nama
                  </span>
                  <span className="text-sm font-sans font-semibold text-ivory block">
                    {account.accountHolder}
                  </span>
                </div>

                {/* Bagian Bawah: Full Tombol Salin No Rek */}
                <button
                  type="button"
                  onClick={() => handleCopy(account.accountNumber, account.id)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold font-sans flex items-center justify-center gap-2 border transition-all active:scale-95 bg-gold/15 text-gold-pale hover:bg-gold hover:text-emerald-deep border-gold/40 shadow-sm"
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
