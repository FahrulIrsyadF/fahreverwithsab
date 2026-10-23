# Audit Teknis, Re-Arsitektur Tema (Aquamarine & Emerald), & Blueprint Enhancement
**Project:** Wedding Invitation — Fahrul & Sabrina  
**Tanggal Pembaruan:** 23 Oktober 2026  
**Status:** Blueprint & Rencana Perubahan Kode (Belum Mengubah Kode Sumber)

---

## Ringkasan Eksekutif

Berdasarkan visi awal bahwa undangan ini seharusnya mengusung **Aquamarine & Emerald sebagai warna utama** dengan **sentuhan mewah Gold dan Ivory**, terdapat **ketimpangan visual yang besar** pada implementasi kode saat ini:
1. **Salah Dominasi Warna:** Saat ini ~90% permukaan website didominasi warna putih/krem (`bg-ivory` & `bg-white/80`), sementara **Aquamarine** hanya muncul sebagai aksen kecil yang tanggung (seperti stabilo teks di `LoveStory` atau teks `"We Found Love"`), dan **Emerald** hanya menjadi warna teks atau satu kotak `Countdown`.
2. **Sindrom "AI Slop" Layout:** Semua seksi ditumpuk menggunakan komponen kotak `.vellum-panel` yang seragam (*card-in-a-box*), tanpa ritme kontras antar-seksi dan tanpa animasi *scroll choreography*.
3. **Bug Fungsional:** Ditemukan bug fatal pada *scroll-spy* `NavbarBottom`, kebocoran scroll saat `CoverScreen` masih menutup layar, penggunaan class Tailwind v4 (`shadow-xs`) di proyek Tailwind v3, elemen HTML kosong yang tertinggal, serta bug perhitungan jumlah tamu saat memilih *"Berhalangan"* di form RSVP.

Dokumen ini memetakan **re-arsitektur tema warna**, **kesiapan integrasi logo masa depan**, **sistem animasi non-basic**, serta **daftar spesifik kode yang harus DIHAPUS, DIPERBAIKI, dan DITAMBAH**.

---

## 1. Re-Arsitektur Tema: Aquamarine & Emerald (Primary) + Gold & Ivory (Luxury Accent)

### 1.1. Mengapa Implementasi Warna Saat Ini Kurang "Mahal"?
Warna permata (*jewel tones*) seperti **Aquamarine (`#239D8E` / `#72D7CA`)** dan **Emerald (`#064E3B` / `#003527`)** memiliki karakter optik yang unik:
- Jika Aquamarine ditaruh mentah-mentah sebagai warna teks atau *stabilo* di atas background krem/putih (`bg-ivory`), warnanya akan terlihat seperti brosur klinik/medis dan kehilangan kesan mewahnya.
- Sebaliknya, ketika **Emerald Deep (`#003527`)** dan **Aquamarine Teal (`#004D46` $\rightarrow$ `#239D8E`)** dipadukan sebagai **kanvas gradasi utama (Duotone Jewel Canvas)**, lalu disandingkan dengan kilau **Champagne Gold (`#D4AF37` / `#FFE088`)** dan ruang bernapas **Ivory Silk (`#FAF9F4`)**, maka karakter *Royal Botanical & Gilded Aquamarine* akan langsung keluar secara dramatis.

### 1.2. Proporsi Palet Baru (60-30-10 Jewel Architecture)
- **60% Primary (Emerald & Aquamarine Jewel Tones):**
  - Digunakan sebagai atmosfer utama pada `CoverScreen`, `Countdown`, `EventDetails`, `Gallery`, dan `Footer`, serta gradasi *deep teal-emerald* (`#003527` $\leftrightarrow$ `#004D46` $\leftrightarrow$ `#136F63`) dengan pendaran cahaya (*ambient aurora*) **Aquamarine Glow (`#72D7CA` / `#80E5D7`)**.
- **30% Secondary Surface & Contrast (Warm Ivory & Translucent Vellum):**
  - Digunakan sebagai kartu konten utama (`vellum-panel`) dan kanvas bersih pada seksi potret (`CoupleSection`, `LoveStory`, `RSVPSection`) agar warna kulit pada foto mempelai tetap natural dan teks panjang tetap nyaman dibaca.
- **10% Luxury Accent (Champagne & Metallic Gold):**
  - Digunakan secara presisi untuk *hairline border*, *wax seal*, garis timeline, *shimmer CTA button*, dan tipografi aksen.

### 1.3. Peta Atmosfer Warna Per Seksi (Visual Rhythm)

| Urutan Seksi | Kanvas Background Seksi | Gaya Kartu / Kontainer | Sentuhan Aquamarine & Gold |
| :--- | :--- | :--- | :--- |
| **0. `CoverScreen`** | **Deep Emerald-Aquamarine Jewel** (`from-[#01261F] via-[#004D46] to-[#003527]`) | Kartu tengah **Ivory Vellum** berbingkai ganda Gold & Aquamarine | Cahaya radial `aqua-glow` di belakang crest + tombol *Gold Shimmer* |
| **1. `OpeningVerse`** | Transisi lembut dari **Aqua-Emerald Tint** (`#E8F8F6`) ke **Ivory** | Kartu **Emerald-Teal Velvet** (`#003B34`) dengan teks Ivory & Gold | Border ganda tipis kombinasi `gold/40` & `aqua-soft/30` |
| **2. `CoupleSection`** | **Warm Ivory Silk** (`#FAF9F4`) agar warna kulit foto mempelai tidak terdistorsi | Layout asimetris editorial dengan *offset arch shadow* berwarna **Aquamarine Teal** | Frame foto arch memiliki layer bayangan geser `bg-aqua-teal` + border `gold` |
| **3. `Countdown` & `EventDetails`** | **Full-Bleed Sanctuary: Emerald to Aquamarine** (`from-emerald-deep via-aqua-teal to-[#032E29]`) | **Frosted Glass Gelap** (`bg-white/10 backdrop-blur-md border-gold/35`) & kartu Ivory untuk detail lokasi | Badge acara memakai gradasi `aqua` & `gold-pale`, angka countdown berwarna `gold-pale` |
| **4. `LoveStory`** | **Ivory -> Aqua-Tint Soft Gradient** | **3 Babak Vertical Storyboard** (menggantikan esai 1 kotak) | Garis vertikal timeline menggunakan gradasi **Gold ke Aquamarine (`#D4AF37` $\rightarrow$ `#239D8E`)** |
| **5. `Gallery`** | **Deep Aquamarine-Forest** (`#00342F`) | Bingkai foto ala galeri seni (*Ivory Museum Matting*) | Label nomor foto `FIG. 01` dalam warna `aqua-soft` & `gold` |
| **6. `WeddingGift` & `RSVPSection`** | **Ivory Parchment** (`#FAF9F4`) | Panel Vellum dengan kartu ATM bergradasi **Aquamarine-Emerald Priority Banking** | Indikator tab aktif menggunakan gradasi `emerald` ke `aqua`, badge hadir berwarna `aqua-teal` |
| **7. `Footer`** | **Deep Emerald-Aquamarine Finale** (`from-[#00342F] to-[#021C15]`) | Tipografi terbuka tanpa kotak dengan ornamen penutup Gold | Teks utama Ivory, nama keluarga besar dalam `gold-light` & aksen `aqua-soft` |

---

## 2. Kesiapan Integrasi Logo Custom (Single Source of Truth)

Saat ini teks monogram `F & S` dan ikon daun tersebar secara *hardcode* di banyak file. Karena logo resmi sedang dalam proses pembuatan (dan saat ini **tidak perlu diganti dengan ikon dummy**), pendekatannya adalah menyiapkan **komponen modular `<BrandMonogram />`** atau konstanta terpusat.

Selama logo belum dimasukkan, komponen tersebut tetap me-render tipografi `F & S` yang elegan. Begitu file logo selesai dibuat (misalnya disimpan di `public/assets/logo.svg` dan `public/assets/og-image.jpg`), kamu cukup mengganti **1 file konfigurasi** dan `index.html`.

**Daftar Titik yang Akan Terhubung ke Logo Nantinya:**
1. **`index.html`**:
   - Tab Icon / Favicon (`<link rel="icon" type="image/svg+xml" href="/assets/logo.svg" />`)
   - Apple Touch Icon (`<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />`)
   - Link Share Thumbnail WhatsApp/Sosmed (`<meta property="og:image" content="/assets/og-share.jpg" />`)
2. **`src/components/CoverScreen.jsx` (Baris 52–59)**: Lingkaran tengah di dalam *Botanical Crest* (saat ini tertulis `F & S`).
3. **`src/components/NavbarTop.jsx` (Baris 9–32)**: Ikon daun di sebelah kiri dan teks `F & S` di tengah header atas.
4. **`src/components/OpeningVerse.jsx` (Baris 8–17)**: Bagian tengah *Botanical Wreath* (saat ini berisi ikon `<Heart />`).
5. **`src/components/LoveStory.jsx` (Baris 43–47)**: Aksen penutup cerita di bagian bawah kartu (saat ini tertulis `F & S`).
6. **`src/components/Footer.jsx` (Baris 6–8)**: Bagian atas nama mempelai pada penutup undangan.

---

## 3. Desain Animasi: Smooth, Menawan, & Tidak "Basic"

Untuk menghilangkan kesan kaku tanpa membuat web terasa berlebihan/norak:
1. **Cover Unveil Berchoreografi (`CoverScreen.jsx`):**
   - Klik *Buka Undangan* memicu *gold-aqua ripple* pada monogram tengah, diikuti efek *zoom-through curtain* (`scale(1) -> scale(1.05)`, `filter: blur(0px -> 8px)`, `-translate-y-full`) dengan kurva `cubic-bezier(0.76, 0, 0.24, 1)`.
2. **Staggered Masked Reveal (Seluruh Section):**
   - Custom hook `useScrollReveal` berbasis `IntersectionObserver` (0 KB tambahan library). Elemen masuk ke viewport dengan kombinasi `translateY(24px -> 0)`, `opacity(0 -> 1)`, dan `blur(4px -> 0)` secara berurutan (*stagger delay* `100ms` antar anak elemen).
3. **Arch Curtain Photo Reveal (`CoupleSection.jsx` & `Gallery.jsx`):**
   - Foto mempelai tidak sekadar muncul, melainkan terbuka dengan *clip-path arch* sembari gambar melakukan *slow scale-down* dari `1.14` ke `1.0` selama `1.3s` dengan bayangan offset Aquamarine-Gold yang bergeser lembut.
4. **Scroll-Linked Timeline Spine (`LoveStory.jsx`):**
   - Garis vertikal bergradasi Gold-Aquamarine pada `LoveStory` menggambar dirinya sendiri dari atas ke bawah mengikuti persentase scroll pengunjung.
5. **Vertical Rolling Digits (`Countdown.jsx`):**
   - Angka detik/menit berganti dengan animasi *vertical slide* (`-translate-y-full` keluar, `translate-y-full -> 0` masuk) dan properti CSS `tabular-nums` agar lebar angka stabil.
6. **3D Perspective Petals & Aqua-Gold Bokeh (`FallingPetals.jsx`):**
   - Mengganti kelopak 2D kaku dengan simulasi rotasi 3D (`Math.cos` pada lebar kelopak sehingga tampak membalik anggun di udara) dipadukan dengan partikel *Aquamarine & Gold shimmer dust* lembut di layer atmosferik.

---

## 4. Rincian Spesifik Kode yang Perlu DIHAPUS, DIPERBAIKI, dan DITAMBAH

Bagian ini merinci perubahan kode secara eksak per file sebelum dieksekusi.

---

### A. KODE YANG PERLU DIHAPUS (Code to Remove)

1. **`src/components/CoverScreen.jsx` (Baris 57–58) — Elemen Badge Kosong Tanpa Isi**
   ```jsx
   // HAPUS: Div kosong di bawah monogram F & S yang tertinggal dan tidak punya konten
   <div className="absolute -bottom-1.5 bg-ivory px-1.5 py-0.5 rounded-full border border-gold/50 flex items-center shadow-xs">
   </div>
   ```

2. **`src/App.jsx` (Baris 82–83) & `src/components/CoverScreen.jsx` (Baris 19–20) — Lingkaran `rotate-45` Redundan**
   ```jsx
   // HAPUS: Merotasi rounded-full (lingkaran) sebesar 45 derajat tidak menghasilkan efek geometri yang benar
   // dan menduplikasi layer di App.jsx serta CoverScreen.jsx
   <div className="absolute inset-8 border border-gold/15 rounded-full pointer-events-none"></div>
   <div className="absolute inset-14 border border-gold/10 rounded-full pointer-events-none rotate-45"></div>
   ```

3. **`src/components/LoveStory.jsx` (Baris 30, 34, 38) — Span "Stabilo" `bg-aqua-soft/25` di Dalam Paragraf `text-justify`**
   ```jsx
   // HAPUS pola highlight stabilo seperti ini di tengah paragraf panjang:
   <span className="bg-aqua-soft/25 text-emerald-deep font-semibold px-1.5 py-0.5 rounded border-b border-aqua/35">
     ada kesan baik yang tumbuh di antara kami
   </span>
   ```

4. **`src/components/OpeningVerse.jsx` (Baris 37) — Subjudul Script `"We Found Love"` di Atas Ayat Suci**
   ```jsx
   // HAPUS (atau ganti dengan lafadz Bismillah / ornamen garis emas-aqua):
   // Teks bahasa Inggris bergaya script warna toska terang di tepat atas kutipan QS. Ar-Rum: 21 terasa kurang serasi secara editorial
   <div className="font-script text-3xl sm:text-4xl text-aqua mb-2">We Found Love</div>
   ```

5. **Unused Imports & Dead CSS di Beberapa File:**
   - **`src/components/CoverScreen.jsx` (Baris 2):** Hapus `Sparkles, Heart` dari `import { Mail, Calendar, Volume2, Sparkles, Heart } from 'lucide-react';`.
   - **`src/components/NavbarTop.jsx` (Baris 2):** Hapus `Sparkles` dari `import { Volume2, VolumeX, Sparkles } from 'lucide-react';`.
   - **`src/components/EventDetails.jsx` (Baris 2):** Hapus `Clock` dari `import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';`.
   - **`src/ index.css` (Baris 77–80 & 94–96):** Hapus `@keyframes discRotate` dan `.animate-disc-rotate` karena fitur piringan hitam sudah tidak digunakan.

---

### B. KODE YANG PERLU DIPERBAIKI (Code to Fix)

1. **`src/components/NavbarBottom.jsx` (Baris 7–30) — Perbaikan Bug Scroll-Spy & Sinkronisasi Urutan Section**
   - **Masalah:** Urutan `navItems` (`mempelai`, `kisah`, `acara`, `kado`, `rsvp`) tidak sesuai dengan urutan render di `App.jsx` (`mempelai`, `acara`, `kisah`, `galeri`, `kado`, `rsvp`), menyebabkan tab `KISAH` tidak pernah aktif saat di-scroll.
   - **Perbaikan:**
     ```jsx
     // SEBELUM:
     const navItems = [
       { id: 'mempelai', label: 'MEMPELAI', icon: Heart },
       { id: 'kisah', label: 'KISAH', icon: Scroll },
       { id: 'acara', label: 'ACARA', icon: Calendar },
       { id: 'kado', label: 'KADO', icon: Gift },
       { id: 'rsvp', label: 'RSVP', icon: MailCheck },
     ];

     // SESUDAH (Urutan disamakan dengan DOM di App.jsx + perbaikan kalkulasi posisi absolut):
     const navItems = [
       { id: 'mempelai', label: 'MEMPELAI', icon: Heart },
       { id: 'acara', label: 'ACARA', icon: Calendar },
       { id: 'kisah', label: 'KISAH', icon: Scroll },
       { id: 'kado', label: 'KADO', icon: Gift },
       { id: 'rsvp', label: 'RSVP', icon: MailCheck },
     ];
     ```

2. **`src/App.jsx` (Baris 19–65 & 103–107) — Kunci Scroll Saat `CoverScreen` Belum Dibuka & Auto-Pause Audio Saat Pindah Tab**
   - **Perbaikan:**
     ```jsx
     // PERBAIKAN 1: Kunci body scroll selama CoverScreen belum dibuka
     useEffect(() => {
       document.body.style.overflow = isOpened ? 'unset' : 'hidden';
       return () => { document.body.style.overflow = 'unset'; };
     }, [isOpened]);

     // PERBAIKAN 2: Pause musik otomatis saat tamu pindah ke Google Maps / WhatsApp / m-Banking
     useEffect(() => {
       const handleVisibilityChange = () => {
         if (!audioRef.current || !isOpened) return;
         if (document.hidden && isPlaying) {
           audioRef.current.pause();
         } else if (!document.hidden && isPlaying) {
           audioRef.current.play().catch(() => {});
         }
       };
       document.addEventListener('visibilitychange', handleVisibilityChange);
       return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
     }, [isOpened, isPlaying]);
     ```

3. **`src/components/RSVPSection.jsx` (Baris 75–85, 112–118, & 206–218) — Perbaikan Logika `guestCount` & Fallback `DEFAULT_WISHES`**
   - **Perbaikan:**
     ```jsx
     // PERBAIKAN 1: Gunakan DEFAULT_WISHES jika localStorage kosong saat inisialisasi awal
     setWishes(saved ? JSON.parse(saved) : DEFAULT_WISHES);

     // PERBAIKAN 2: Kirim guestCount = 0 jika tamu memilih 'Tidak Hadir'
     const newWish = {
       name: name.trim(),
       attendance: attendance,
       guestCount: attendance === 'Hadir' ? (parseInt(guestCount, 10) || 1) : 0,
       message: message.trim(),
       time: formattedNow
     };

     // PERBAIKAN 3: Sembunyikan dropdown Jumlah Tamu jika attendance === 'Tidak Hadir'
     {attendance === 'Hadir' && (
       <div>
         <label className="block text-[11px] font-bold text-emerald uppercase mb-1.5 tracking-wider font-sans">
           Jumlah Tamu
         </label>
         ...
       </div>
     )}
     ```

4. **`src/components/GateScreen.jsx` (Baris 7) & Seluruh Komponen yang Memakai `shadow-xs` — Perbaikan Class Tailwind v3**
   - **Perbaikan:**
     - Di `GateScreen.jsx`: Ubah `vellum-card` menjadi `vellum-panel` dan sesuaikan background layar menggunakan tema **Emerald-Aquamarine Jewel** agar selaras dengan `CoverScreen`.
     - Di `CoverScreen.jsx`, `NavbarTop.jsx`, `WeddingGift.jsx`, dan `RSVPSection.jsx`: Ganti seluruh class `shadow-xs` menjadi `shadow-sm` (atau tambahkan definisi `'xs': '0 1px 2px 0 rgba(0, 53, 39, 0.05)'` di `tailwind.config.js`).

5. **`src/components/FallingPetals.jsx` (Baris 14, 20, 33–46, 78) — Perbaikan Lebar Canvas, Z-Index, & Palet Partikel**
   - **Perbaikan:**
     - Ubah `Math.min(window.innerWidth, 480)` menjadi `Math.min(window.innerWidth, 512)` dan `max-w-[480px]` menjadi `max-w-lg` agar sinkron dengan lebar kontainer utama.
     - Turunkan `z-40` menjadi `z-20` (di bawah `NavbarTop`/`NavbarBottom` dan tidak menutupi keterbacaan teks utama).
     - Ganti warna hijau tua pekat `#0E4E30` dengan palet **Aquamarine Soft (`#72D7CA`), Champagne Gold (`#D4AF37`, `#FFE088`), dan Translucent Emerald (`#239D8E`)** dengan gerakan membalik 3D.

6. **`index.html` (Baris 5) — Perbaikan Meta Viewport untuk Aksesibilitas**
   - **Perbaikan:**
     ```html
     <!-- SEBELUM: Mematikan kemampuan pinch-to-zoom bagi tamu lansia -->
     <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
     <!-- SESUDAH: -->
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     ```

---

### C. KODE YANG PERLU DITAMBAH (Code to Add)

1. **`tailwind.config.js` & `src/index.css` — Token Gradasi Aquamarine-Emerald, Tekstur Kertas, & Utilitas Animasi**
   - Tambahkan utility class di `src/index.css`:
     - `.jewel-canvas`: Gradasi utama **Emerald Deep $\rightarrow$ Aquamarine Teal** (`linear-gradient(160deg, #003527 0%, #004D46 52%, #083D38 100%)`).
     - `.aqua-gold-border`: Border halus dengan kilau Aquamarine & Gold.
     - `.paper-grain`: Overlay tekstur kertas *fine-art* berbasis inline SVG `<feTurbulence>` (`opacity: 0.035`).
     - `.tabular-nums`: `font-variant-numeric: tabular-nums` untuk menjaga kestabilan angka `Countdown`.

2. **Komponen Modular `<BrandMonogram />` (`src/components/BrandMonogram.jsx`) — Persiapan Logo Masa Depan**
   - Menyediakan 1 pintu pengaturan untuk teks `F & S` saat ini dan gambar logo nantinya:
     ```jsx
     // Jika nanti file logo sudah siap, cukup ubah LOGO_SRC menjadi '/assets/logo.svg'
     export const BRAND_CONFIG = {
       logoSrc: null, // sementara null -> otomatis tampilkan teks F & S
       monogramText: { first: 'F', second: 'S' }
     };
     ```

3. **Custom Hook `src/hooks/useScrollReveal.js` — Sistem Animasi Scroll Tanpa Library Tambahan**
   - Hook ringan berbasis `IntersectionObserver` untuk memberikan efek *staggered blur-fade reveal* dan *arch image unveil* di setiap komponen ketika masuk ke layar.

4. **Fitur "Simpan ke Kalender" di `src/components/Countdown.jsx`**
   - Tambahkan fungsi pembuat URL Google Calendar otomatis (Tanggal: `20270717T080000/20270717T150000`, Judul: `The Wedding of Fahrul & Sabrina`, Lokasi: `Paiton, Probolinggo`) lengkap dengan tombol beraksen *Aquamarine-Gold*.

5. **Interactive Lightbox Modal di `src/components/Gallery.jsx`**
   - State `selectedImage` untuk menampilkan foto secara *full-screen* dengan latar belakang *blurred deep-aqua* ketika salah satu foto galeri diketuk.

6. **Avatar Inisial & Badge Status Kehadiran di `src/components/RSVPSection.jsx` (Baris 270–281)**
   - Menampilkan badge `Hadir` (berwarna `bg-aqua-tint text-aqua-deep border-aqua/30`) atau `Berhalangan` di sebelah nama pengirim ucapan, beserta lingkaran inisial nama bergradasi Emerald-Aquamarine.

7. **Meta Tags Open Graph & Slot Favicon di `index.html`**
   - Menambahkan tag `<meta property="og:title">`, `<meta property="og:description">`, `<meta property="og:image">`, dan `<link rel="icon">` agar siap dihubungkan begitu aset logo dan gambar thumbnail selesai dibuat.
