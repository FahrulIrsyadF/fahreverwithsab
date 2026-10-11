# Project Specification: React + Vite Wedding Invitation

Dokumen arsitektur dan spesifikasi teknis untuk website undangan pernikahan mobile-first berbasis **React + Vite + Tailwind CSS** yang siap dideploy langsung ke Vercel.

---

## 1. Stack Teknologi & Deployment

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS dengan custom design tokens dari Stitch
- **Icons**: Lucide React
- **Typography**: Google Fonts (*Playfair Display*, *Plus Jakarta Sans*, *Great Vibes*)
- **Target Deployment**: Vercel (Auto-detected via `vite build`, static output folder `dist/`)

---

## 2. Filosofi Desain & Anti-AI Slop (Mandatory)

Website ini dirancang dengan standar editorial dan estetika mewah-minimalis.

- **Strict Emoji Restriction**: DILARANG memasang emoji dekoratif acak. Seluruh visual menggunakan inline SVG dan Lucide Icons yang bersih dan presisi.
- **Palet Warna (Stitch: Botanical Emerald & Gilded Romance)**:
  - **Emerald Green (Dominant)**:
    - Deep: `#003527`
    - Main: `#064E3B`
    - Rich: `#0F5132`
    - Surface/Tint: `#EAF5EF`
  - **Champagne Gold (Secondary / Metallic)**:
    - Main: `#C5A059`
    - Metallic: `#D4AF37`
    - Pale/Light: `#FFE088` & `#FED65B`
  - **Aquamarine & Sage (Tertiary / Ambient)**:
    - Main: `#239D8E`
    - Soft/Glow: `#80E5D7` & `#72D7CA`
    - Tint: `#E8F8F6`
  - **Parchment / Ivory Canvas**:
    - Foundation: `#FAF9F4` & `#FDFCF7`
    - Container Vellum: `#EFEEE9` (Frosted Glassmorphism `backdrop-blur-md`)
  - **Teks**: Deep Forest Charcoal `#09261E` & `#1B1C19`

---

## 3. Data Mempelai

- **Mempelai Pria**:
  - Nama Lengkap: **Fahrul Irsyad Fianto, S.Tr.Kom.**
  - Orang Tua: Putra dari Bapak Arief Maryanto & Ibu Siti Rukayah Susanti
  - Instagram: `@fahrulirsy` (`https://instagram.com/fahrulirsy`)
- **Mempelai Wanita**:
  - Nama Lengkap: **Sabrina Nabila Kholiqin, S.Pd.**
  - Orang Tua: Putri dari Bapak Akhsanul Kholiqin & Ibu Siti Nur Kusumawati
  - Instagram: `@sabrinnkh` (`https://instagram.com/sabrinnkh`)
- **Tanggal Acara**: Sabtu, 17 Juli 2027

---

## 4. Sistem Interaksi & Navigasi

1. **Fixed Header Atas (`NavbarTop`)**:
   - Monogram botani daun di sebelah kiri.
   - Monogram pasangan `F & S` di tengah berestetika Playfair Display serif.
   - Tombol toggle audio speaker di sebelah kanan (indikator play/pause dengan ikon volume wave aktif).
   - Glassmorphism backdrop blur `h-14` fixed di bagian atas saat undangan dibuka.

2. **Floating Bottom Navigation Bar (`NavbarBottom`)**:
   - 4 Menu navigasi: **Mempelai** (Heart), **Acara** (Calendar), **Galeri** (Image), dan **RSVP** (Mail).
   - Garis bawah emas (`border-b-2 border-gold`) dan fill ikon aktif pada seksi yang sedang dilihat.
   - Auto-highlight aktif saat pengunjung melakukan scroll (`Intersection/Scroll Spy`).
   - Smooth auto-scroll saat tab diklik menuju `#mempelai`, `#acara`, `#galeri`, `#rsvp`.

3. **Gatekeeping Validasi Tamu**:
   - Mengekstrak parameter `?to=...` dari URL (handling case-insensitive & URI decode).
   - Tamu valid: Cover ditampilkan dengan nama tamu, tombol *Buka Undangan* aktif.
   - Tamu tidak valid / kosong: Render `GateScreen` dengan pesan sopan dan kunci total akses.
2. **Falling Petals (Canvas 60fps)**:
   - Partikel daun dan kelopak bunga melayang perlahan dengan osilasi horizontal alami dalam palet Emerald, Aquamarine, dan Gold.
3. **Rotating Vinyl Music Player**:
   - Floating circular disc controller di pojok kanan bawah.
   - Otomatis mulai diputar saat tamu mengklik tombol *Buka Undangan*.
   - Dapat di-pause / di-play secara interaktif kapan saja.
4. **Curtain Reveal Cover Transition**:
   - Tirai cover slide-up mulus (`-translate-y-full opacity-0`) saat undangan dibuka.
5. **RSVP & Realtime LocalStorage Timeline**:
   - Form konfirmasi kehadiran (Hadir/Berhalangan), jumlah tamu, ucapan & doa.
   - Tersimpan di `localStorage` (`wedding_wishes_fahrul_sabrina`) dan langsung ter-update di timeline doa tanpa reload.
