import React from 'react';

export default function Gallery() {
  return (
    <section className="pt-6 pb-12 px-5 text-center" id="galeri">
      <div className="text-center mb-8">
        <span className="text-[11px] font-bold text-gold uppercase tracking-[0.25em] block mb-1 font-sans">
          Momen Bahagia
        </span>
        <h2 className="font-headline text-3xl sm:text-4xl text-emerald-deep font-normal">
          Galeri Foto
        </h2>
        <div className="w-12 h-0.5 bg-gold/50 mx-auto mt-2 rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        {/* Main Tall Image */}
        <div className="col-span-2 relative h-64 rounded-xl overflow-hidden border border-gold/40 shadow-sm group">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
            alt="Momen Bahagia"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Square Image 1 */}
        <div className="relative h-40 rounded-xl overflow-hidden border border-gold/40 shadow-sm group">
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80"
            alt="Momen Bahagia"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Square Image 2 */}
        <div className="relative h-40 rounded-xl overflow-hidden border border-gold/40 shadow-sm group">
          <img
            src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80"
            alt="Momen Bahagia"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
