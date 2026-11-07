import { useState, useEffect, useRef } from 'react';
import { Heart, Scroll, Calendar, Gift, MailCheck } from 'lucide-react';

// Urutan mengikuti urutan section: Mempelai → Kisah → (Save the Date) → Acara → Kado → RSVP
const NAV_ITEMS = [
  { id: 'mempelai', label: 'MEMPELAI', icon: Heart },
  { id: 'kisah', label: 'KISAH', icon: Scroll },
  { id: 'acara', label: 'ACARA', icon: Calendar },
  { id: 'kado', label: 'KADO', icon: Gift },
  { id: 'rsvp', label: 'RSVP', icon: MailCheck },
];

const docTop = (el) => el.getBoundingClientRect().top + window.scrollY;

export default function NavbarBottom() {
  const [activeTab, setActiveTab] = useState('mempelai');
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        // sembunyi saat menggulir turun (tidak menutupi konten), muncul lagi saat naik / di akhir halaman
        const atEnd = y + window.innerHeight >= document.documentElement.scrollHeight - 80;
        if (Math.abs(y - lastY.current) > 8) {
          setHidden(y > lastY.current && y > 200 && !atEnd);
          lastY.current = y;
        }
        const pos = y + 220;
        for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
          const el = document.getElementById(NAV_ITEMS[i].id);
          if (el && pos >= docTop(el)) { setActiveTab(NAV_ITEMS[i].id); break; }
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setActiveTab(id);
    const target = document.getElementById(id);
    if (target) window.scrollTo({ top: docTop(target) - 70, behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Navigasi Undangan"
      className={`fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-sm sm:max-w-md transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        hidden ? 'translate-y-[140%] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="bg-paper-hi/95 border border-metal/40 shadow-xl shadow-base-950/20 rounded-full px-2 py-1.5 sm:px-3 sm:py-2 flex items-center justify-between">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              aria-current={isActive ? 'true' : undefined}
              className="flex flex-col items-center justify-center py-1 px-1 sm:px-2 flex-1 min-w-0 transition-transform duration-300 active:scale-95 group"
            >
              <Icon
                strokeWidth={isActive ? 2.2 : 1.7}
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                  isActive ? 'text-accent scale-110' : 'text-muted/70 group-hover:text-base-800'
                }`}
              />
              <span
                className={`text-[9px] sm:text-[10px] font-bold tracking-wider uppercase mt-1 transition-colors duration-300 truncate ${
                  isActive ? 'text-accent' : 'text-muted/70 group-hover:text-base-800'
                }`}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
