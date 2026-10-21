import React, { useState, useEffect } from 'react';
import { Heart, Scroll, Calendar, Gift, MailCheck } from 'lucide-react';

export default function NavbarBottom() {
  const [activeTab, setActiveTab] = useState('mempelai');

  const navItems = [
    { id: 'mempelai', label: 'MEMPELAI', icon: Heart },
    { id: 'kisah', label: 'KISAH', icon: Scroll },
    { id: 'acara', label: 'ACARA', icon: Calendar },
    { id: 'kado', label: 'KADO', icon: Gift },
    { id: 'rsvp', label: 'RSVP', icon: MailCheck },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const el = document.getElementById(item.id);
        if (el && scrollPos >= el.offsetTop) {
          setActiveTab(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setActiveTab(id);
    const target = document.getElementById(id);
    if (target) {
      const yOffset = -70; // offset navbar atas
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Navigasi Undangan"
      className="fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-sm sm:max-w-md pointer-events-auto"
    >
      <div className="bg-ivory/90 backdrop-blur-xl border border-aqua/40 shadow-xl shadow-emerald-deep/12 rounded-full px-2 py-1.5 sm:px-3 sm:py-2 flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className="flex flex-col items-center justify-center py-1 px-1 sm:px-2 flex-1 min-w-0 transition-all duration-300 active:scale-95 group"
            >
              <Icon
                strokeWidth={isActive ? 2.2 : 1.7}
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                  isActive
                    ? 'text-aqua scale-110 drop-shadow-[0_2px_8px_rgba(35,157,142,0.35)]'
                    : 'text-charcoal-muted/70 group-hover:text-emerald-deep'
                }`}
              />
              <span
                className={`text-[9px] sm:text-[10px] font-sans font-bold tracking-wider uppercase mt-1 transition-colors duration-300 truncate ${
                  isActive
                    ? 'text-aqua'
                    : 'text-charcoal-muted/70 group-hover:text-emerald-deep'
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
