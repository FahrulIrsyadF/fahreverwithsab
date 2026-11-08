import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from '../lib/gsap';
import { Copy, Check } from 'lucide-react';
import SectionSeam from './ornaments/SectionSeam';
import { RoseVine } from './ornaments/Roses';
import { GIFT, WEDDING } from '../data/wedding';
import './gift/gift.css';

const TABS = [['transfer', 'Transfer'], ['physical', 'Kirim Kado']];

function copyText(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  return Promise.resolve();
}

function CopyButton({ text, id, copiedId, onCopy, children }) {
  const done = copiedId === id;
  return (
    <button type="button" className={`gift-copy${done ? ' is-done' : ''}`} onClick={() => onCopy(text, id)}>
      {done ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      {done ? 'Tersalin' : children}
    </button>
  );
}

/**
 * Amplop Digital — section biru powder. Satu lapis: kartu rekening berdiri sendiri seperti
 * kartu bank asli, alamat kado ditulis seperti label kiriman (tanpa kartu di dalam kartu).
 */
export default function WeddingGift() {
  const [activeTab, setActiveTab] = useState('transfer');
  const [copiedId, setCopiedId] = useState(null);

  // Ganti tab mengubah tinggi halaman → posisi trigger section di bawahnya perlu dihitung ulang
  // (aksi user, bukan saat scroll; jadi aman — lihat aturan performa §8).
  const firstTab = useRef(true);
  useEffect(() => {
    if (firstTab.current) { firstTab.current = false; return; }
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [activeTab]);

  const handleCopy = (text, id) => {
    copyText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const { accounts, address } = GIFT;

  return (
    <section className="sec sec-blue gift-sec" id="kado">
      <SectionSeam into="blue" side="right" seed={79} />

      <header className="sec-head" data-reveal>
        <p className="eyebrow">Tanda Kasih</p>
        <h2>Amplop Digital</h2>
        <p>
          Doa restu Anda adalah karunia terindah bagi kami. Namun jika memberi adalah ungkapan tanda
          kasih Anda, kami menerimanya dengan penuh ketulusan.
        </p>
        <RoseVine className="sec-rule" w={220} h={40} seed={83} />
      </header>

      <div className="sec-inner gift" data-reveal>
        <div className="gift-tabs" role="tablist">
          {TABS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={activeTab === id}
              className={activeTab === id ? 'is-on' : ''}
              onClick={() => setActiveTab(id)}
            >
              {label}
            </button>
          ))}
          <span className="gift-tabs-bar" style={{ transform: `translateX(${activeTab === 'transfer' ? 0 : 100}%)` }} />
        </div>

        {activeTab === 'transfer' && (
          <div className="gift-cards animate-fadeIn">
            {accounts.map((a) => (
              <article key={a.id} className="bank-card">
                <span className="bank-sheen" aria-hidden="true" />
                <div className="bank-top">
                  <span className="bank-name">{a.bankName}</span>
                  <span className="bank-chip" aria-hidden="true" />
                </div>
                <p className="bank-number">{a.accountNumber}</p>
                <div className="bank-bottom">
                  <div>
                    <span className="bank-small">{a.label}</span>
                    <span className="bank-holder">{a.accountHolder}</span>
                  </div>
                  <CopyButton text={a.accountNumber} id={a.id} copiedId={copiedId} onCopy={handleCopy}>Salin</CopyButton>
                </div>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'physical' && (
          <div className="gift-label animate-fadeIn">
            <span className="gift-stamp" aria-hidden="true">{WEDDING.monogram}</span>
            <span className="gift-to">Kepada</span>
            <p className="gift-recipient">{address.recipient}</p>
            <p className="gift-address">{address.fullAddress}</p>
            <p className="gift-phone">{address.phone}</p>
            <CopyButton text={address.fullAddress} id="address" copiedId={copiedId} onCopy={handleCopy}>Salin alamat</CopyButton>
          </div>
        )}
      </div>
    </section>
  );
}
