import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Images, Mail } from 'lucide-react';

export default function NavbarBottom() {
  const [activeTab, setActiveTab] = useState('mempelai');

  const navItems = [
    { id: 'mempelai', label: 'Mempelai', icon: Heart, fillOnActive: true },
    { id: 'acara', label: 'Acara', icon: Calendar, fillOnActive: false },
    { id: 'galeri', label: 'Galeri', icon: Images, fillOnActive: false },
    { id: 'rsvp', label: 'RSVP', icon: Mail, fillOnActive: false },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      navItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(item.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setActiveTab(id);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-ivory/85 backdrop-blur-lg border-t border-gold/25 shadow-lg">
      <div className="w-full max-w-lg mx-auto flex justify-around items-center px-2 py-1.5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className={`flex flex-col items-center justify-center p-1 w-20 transition-all duration-200 active:scale-95 relative ${
                isActive
                  ? 'text-emerald font-bold'
                  : 'text-charcoal-muted font-medium hover:text-emerald'
              }`}
            >
              <Icon
                strokeWidth={isActive ? 2.2 : 1.8}
                className={`w-5 h-5 transition-transform ${
                  isActive
                    ? `${item.fillOnActive ? 'fill-emerald' : 'fill-none'} text-emerald scale-105`
                    : 'fill-none text-charcoal-muted'
                }`}
              />
              <span className="text-[11px] font-sans tracking-wide mt-1">
                {item.label}
              </span>

              {/* Active Gold Underline Bar */}
              {isActive && (
                <div className="absolute -bottom-1.5 w-10 h-0.5 bg-gold-metallic rounded-full"></div>
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
