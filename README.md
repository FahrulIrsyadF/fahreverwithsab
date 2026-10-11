# Wedding Invitation — Fahrul & Sabrina

Aplikasi website undangan pernikahan mobile-first berbasis **React + Vite + Tailwind CSS**, siap dideploy langsung ke Vercel tanpa konfigurasi rumit.

---

### Fitur Utama

- **Design System Resmi Stitch**: Tema *Botanical Emerald & Gilded Romance* (Emerald `#064E3B`, Champagne Gold `#D4AF37`, Aquamarine Glow `#80E5D7`, Parchment Ivory `#FAF9F4`).
- **Anti-AI Slop**: Zero decorative emoji. Tipografi editorial *Playfair Display* & *Plus Jakarta Sans*, aksen kaligrafi *Great Vibes*, serta Lucide Icons & Scalable SVG.
- **Validasi Tamu & Gatekeeping**: Mengunci total akses jika parameter URL `?to=` tidak ada atau nama tamu tidak terdaftar dalam whitelist `GUEST_LIST`.
- **Canvas Falling Petals**: Partikel daun dan kelopak bunga melayang perlahan (60fps hardware-accelerated) dengan osilasi 3D alami.
- **Floating Vinyl Music Controller**: Cakram musik piringan hitam di pojok kanan bawah yang berputar otomatis saat cover dibuka dan dapat di-pause/play kapan saja.
- **Komponen Lengkap**: Cover Curtain, Opening Verse, Profil Mempelai (Fahrul & Sabrina), Countdown Timer real-time, Rangkaian Acara (Akad & Resepsi) + link Google Maps, Love Story, Galeri Momen, RSVP Form + LocalStorage timeline ucapan, dan Footer Keluarga Besar.

---

### Menjalankan di Lokal

1. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
2. **Akses Pengujian di Browser**:
   - **Tamu Valid**: `http://localhost:3000/?to=Fahrul+%26+Partner` atau `http://localhost:3000/?to=Budi+Santoso`
   - **Tamu Ditolak (Gate Screen)**: `http://localhost:3000/` atau `http://localhost:3000/?to=Orang+Lain`

---

### Build & Deploy ke Vercel

1. **Test Build Lokal**:
   ```bash
   npm run build
   ```
2. **Deploy ke Vercel**:
   ```bash
   npx vercel --prod
   ```
   Atau push repository ini ke GitHub/GitLab dan import ke Vercel (Vite akan terdeteksi otomatis dengan output directory `dist`).
