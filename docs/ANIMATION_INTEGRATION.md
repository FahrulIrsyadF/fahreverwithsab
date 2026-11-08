# Rencana Integrasi Animasi Lab → Project `inv`

> **Status (2026-11-08): DIIMPLEMENTASIKAN di branch `main`** — palet **Marun & Mawar**, ornamen
> **mawar**, semua demo lab kecuali **05 Polaroid** (galeri lama dipertahankan, hanya diselaraskan).
> Keputusan yang diambil saat implementasi:
> - Pin gulungan vs benang → **opsi (a)**: gulungan (`#ayat`) opak & sebelum benang; benang mulai di
>   ranting sambungan atas Mempelai dan berakhir di badge `01` Love Story (event `thread:end`/`thread:back`).
> - Urutan: Cover amplop → Hero → Gulungan → Mempelai → Kisah → Save the Date (foil + countdown) →
>   Acara → Galeri → Kado → RSVP → Penutup. Terang/gelap bergantian; `torn` gelap→terang, `lace` terang→gelap
>   (`components/ornaments/SectionSeam.jsx`), ranting kiri/kanan bergantian.
> - Komponen baru memakai CSS per komponen (seperti lab); Tailwind tetap untuk section lama, warnanya
>   kini membaca token CSS (`tailwind.config.js`), jadi kelas lama (`emerald-*`, `gold-*`, `aqua-*`) ikut marun.
> - Section tanpa demo (Acara, Galeri, Kado, RSVP) → Seam + ranting + reveal GSAP `data-reveal` (di `App.jsx`).
> - Dihapus: `scroll-behavior: smooth`, overlay grain fixed + blend, `backdrop-blur` vellum, `FallingPetals`,
>   `OpeningVerse`, `useScrollReveal`. Data terpusat di `src/data/wedding.js`.
> - **Masih terbuka:** lagu bebas royalti (§2 #5, `WEDDING.music`), foto asli, verifikasi teks Arab (§2 #7),
>   logo (favicon, `og:image` 1200×630 absolut, cap segel — §4b), cek manual di iPhone (§9).
>
> Dibuat: 2026-11-06 · Penulis: Claude (bersama Fahrul) · Project: `D:/Pribadi/inv`

---

## 0. TL;DR untuk sesi berikutnya

- **Bisa diimplementasikan.** Stack lab = stack `inv` (React 18 + Vite). Animasi dipindah sebagai
  komponen React, bukan ditulis ulang. Dependensi baru hanya `gsap` + `@gsap/react` (gratis, termasuk
  semua plugin premium sejak GSAP 3.13).
- **Sumber referensi:** lab di `C:/Users/Fahrul/orca/workspaces/e-invitation/taimen/lab`
  (baca `lab/README.md`). Kode lab sudah dites di viewport HP (Playwright) dan **disetujui user**.
- **Kerjakan bertahap per section** (lihat §6), satu PR/commit per fase, cek di iPhone tiap fase.
- **Jangan langgar keputusan di §2** (sudah disepakati user) dan **aturan performa di §8**
  (didapat dari bug nyata).
- **Urutan section baru:** Mempelai → **Love Story** (`LoveStory.jsx` yang sudah ada; benang merah berakhir di badge "01", spine lama lanjut ke 02→03), lalu
  Save the Date & Acara (§4a). **Logo** buatan calon istri dipakai untuk favicon, preview share link,
  dan cap segel amplop (§4b).
- **Perhatikan konflik di §7** — beberapa kode `inv` yang sekarang akan merusak animasi scroll
  bila dibiarkan (mis. `scroll-behavior: smooth`).

- **Lab sekarang punya palet warna & ornamen mawar** (§1a) — tanyakan user palet & ornamen mana
  yang final (§10 #9–#10) sebelum menyalin token warna.
- **Lab online:** https://fahrul-lab.vercel.app (Vercel CLI dari folder `lab/`, `npx vercel --prod`).
  User sudah mencoba di iPhone 13 & Redmi Note 10 Pro: lancar setelah perbaikan performa (§8).

> 📦 **Lokasi lab yang aman:** commit terbaru `1c5a25f` (2026-11-08; awal `38ca319`) di repo
> **`D:/Pribadi/e-invitation`**, branch **`online-invitation-website-rebuild`** (folder `lab/`).
> Folder `…/orca/workspaces/e-invitation/taimen` hanyalah *worktree* (salinan kerja) dari branch itu;
> kalau worktree dihapus, ambil lagi dengan
> `git -C D:/Pribadi/e-invitation worktree add <folder> online-invitation-website-rebuild`
> atau `git checkout online-invitation-website-rebuild` di repo tersebut.
> Belum ada remote (GitHub dsb.) — commit hanya tersimpan di laptop ini.

---

## 1. Isi lab (yang akan dipindahkan)

| # | Demo (route lab) | File sumber | Inti teknik |
|---|---|---|---|
| 01 | Amplop & Segel Lilin (`#/amplop`) | `src/demos/Envelope.jsx`, `envelope.css` | Amplop SVG 3D (flap `rotationX` + pindah `z-index` di 90°), segel tekan-tahan 0.9 dtk + cincin progres, segel pecah 2 (clip zig-zag) jatuh `bounce.out`, percikan `physics2D`, surat keluar `back.out`, "menyelam" ke surat → halaman hero, nama ditulis tinta |
| 02 | Benang Merah / Mempelai (`#/mempelai`) | `src/demos/Couple.jsx`, `couple.css`, `components/Seam.jsx` | Benang merah dijahit mengikuti scroll (ujung ~62% layar), simpul melingkari "&", foto pintu lengkung (`clip-path inset … round`), bingkai emas bergeser, batas section organik (sobek / renda), ranting tumbuh di sambungan |
| 03 | Gulungan Ayat (`#/gulungan`) | `src/demos/ScrollUnroll.jsx`, `scroll.css` | Section di-*pin*, pita jatuh, kertas memanjang `scrub`, gulungan bawah bergulir, baris ayat muncul dari blur (`SplitText` lines) |
| 04 | Foil Emas & Gosok Tanggal (`#/foil`) | `src/demos/FoilScratch.jsx`, `foil.css`, `components/Confetti.jsx` | Kilau foil mengikuti giroskop/pointer (`useTilt` → CSS var `--nx/--ny`), 3 koin gosok (canvas `destination-out`, cek % hanya di dalam lingkaran), serpihan emas, confetti, tombol kalender memantul |
| 05 | Polaroid Berjatuhan (`#/polaroid`) | `src/demos/Polaroids.jsx`, `polaroid.css` | Jatuh `CustomBounce` + squash, `Draggable` + `inertia`, miring mengikuti seret, ketuk = flip 3D ke catatan tulisan tangan |

Komponen/aset bersama (semua dibuat dari kode, tanpa file gambar):

| File lab | Fungsi |
|---|---|
| `src/lib/gsap.js` | Registrasi plugin GSAP, ease `softDrop`/`envDrop`, `vibrate()` aman, `reduceMotion()` |
| `src/lib/useTilt.js` | Tilt pointer/giroskop + idle "bernapas", `requestGyro()` untuk izin iOS. Opsi performa: `vars`, `varStep`, `varTargets`, `onMove`, jeda via `data-tilt-paused` |
| `src/lib/useFontsReady.js` | Tunggu web font sebelum SplitText/pengukuran |
| `src/components/WaxSeal.jsx` | Segel lilin ber-pencahayaan 3D, bisa dibelah dua. Badan segel **dirasterisasi sekali ke PNG** (filter berat di iPhone); monogram tetap SVG hidup |
| `src/components/Sprig.jsx` | Ranting daun line-art prosedural (seed → variasi tak terbatas), siap `drawSVG` |
| `src/components/InkText.jsx` | Teks script "ditulis tinta" (stroke-dash → fill), `align` start/middle/end |
| `src/components/Seam.jsx` | Batas section: `torn`, `lace`, `arch` |
| `src/components/GoldDust.jsx` | Debu emas canvas |
| `src/components/Confetti.jsx` | Confetti canvas (`ref.fire(x, y, n)`) |
| `src/global.css` | Token font, tekstur `--grain`, `--metal-foil`, default warna benang |
| `src/lib/palettes.js` | **6 palet** → aturan CSS `:root[data-palette]` + varian `-rgb`. Token semantik (`--base-*`, `--accent`, `--metal-*`, `--paper-*`, `--ink`, `--wax-*`); `paletteColor()` untuk canvas |
| `src/components/Roses.jsx` | Ornamen mawar line-art: `RoseSprig`, `RoseCorner`, `RoseVine`; mekar saat terlihat, goyang angin |
| `src/lib/ornament.js`, `PaletteSwitcher.jsx` | Khusus lab (tombol palet & sakelar Daun/Mawar) — **tidak dipindah ke inv** |

### 1a. Palet & ornamen (ditambahkan 2026-11-07/08)

- Palet: Zamrud & Emas (asli), Sage & Champagne, Mocha & Blush, Midnight & Champagne, Arang &
  Mutiara, **Marun & Mawar** (diminta user; calon istri menilai palet emerald kurang menarik).
  Saat porting: salin nilai SATU palet terpilih ke `:root` di inv; nama token (`--base-*` dst.)
  menggantikan nama lama `--emerald-*`/`--aqua`/`--gold*`. "Spine love story tetap emas/aqua" (§4a)
  artinya `--metal`/`--accent` palet terpilih.
- Benang merah tidak ikut palet, kecuali palet berlatar merah (marun) menimpa `--thread*` agar
  tetap terlihat.
- Ornamen: `Sprig` otomatis jadi ranting mawar di mode Mawar. Rangkaian pojok & sulur dipasang di
  hero amplop, foto mempelai, sobekan kertas, gulungan, kartu foil, menu (lihat CSS `*-corner`, `*-vine`).

---

## 2. Keputusan yang SUDAH disepakati user (jangan diubah tanpa tanya)

1. **Benang = benang merah** ("benang merah takdir"), bukan emas. Gaya: merah `#b0122c` + serat pilinan
   putus-putus `#ff8f9c` + cahaya tipis + manik di ujung. **Merah eksklusif untuk benang** — semua
   ornamen lain tetap emas agar maknanya tidak luntur.
2. **Rute benang = rute AWAL** (lewat sisi kanan salam → kanan foto pria → simpul di "&" → kiri foto
   wanita → ranting kanan). Rute alternatif "menyelinap di belakang foto" sudah dicoba dan **ditolak**.
3. Simpul melingkari "&" dipertahankan (makna "ikatan").
4. Batas section: kontras boleh, tapi dihubungkan oleh benang + ranting di sambungan (kiri/kanan
   bergantian) + tepi organik (`torn` gelap→terang, `lace` terang→gelap). Maks 2–3 jenis tepi.
5. **Musik:** ganti mp3 leafitation (hotlink & berhak cipta) dengan lagu bebas royalti
   (Pixabay Music / YouTube Audio Library). User yang memilih lagunya.
6. Foto masih placeholder Unsplash → nanti foto prewedding sendiri. Foto lengkung mempelai paling
   bagus **potret 3:4, wajah di sepertiga atas**.
7. Teks Arab QS. Ar-Rum 21 di lab diketik manual → **wajib diverifikasi ke mushaf** sebelum rilis.
8. User suka semua 5 demo ("sangat puas"). Mana yang dipakai tetap ditanyakan saat implementasi.
9. **Urutan section: Mempelai → Love Story** (bukan Mempelai → Acara). **Ujung akhir benang merah
   berada di badge "01"** pada love story yang sudah ada (bab 01–03) — benang "memulai" kisah,
   lalu spine timeline lama melanjutkan ke 02 → 03. **Tidak perlu prototipe lab.** Detail di §4a.
10. **Logo** gabungan inisial dibuat oleh calon istri (aset asli, bukan dari kode). Dipakai untuk:
    ikon tab (favicon), gambar preview saat share link (WA/sosmed), dan **cap pada segel lilin**
    amplop. Detail di §4b.

---

## 3. Kecocokan stack

| Aspek | Lab | `inv` | Catatan |
|---|---|---|---|
| Framework | React 18.3 + Vite 5 | React 18.3 + Vite 5 | sama |
| Styling | CSS biasa per demo | Tailwind 3 | bisa berdampingan: impor `*.css` per komponen, atau konversi bertahap ke Tailwind. Token warna sama. |
| Animasi | GSAP 3.15 + `@gsap/react` | CSS transition + `useScrollReveal` (IntersectionObserver) | tambah `gsap`, `@gsap/react` |
| Ikon | – | lucide-react | tetap |
| StrictMode | tidak | **ya** (`main.jsx`) | aman: `useGSAP` membersihkan & menjalankan ulang dengan benar. Semua efek non-GSAP (listener, ResizeObserver, rAF) harus punya cleanup. |
| Deploy | – | Vercel static | tidak berubah |

---

## 4. Pemetaan section `inv` → demo lab

| Komponen `inv` | Ganti / tambah dengan | Yang DIPERTAHANKAN dari `inv` |
|---|---|---|
| `CoverScreen.jsx` | **01 Amplop** (scene amplop). Saat fase "dive" selesai → panggil `onOpen()` | `guestName`, gate tamu (`GateScreen`, `validateGuest`) |
| `OpeningVerse.jsx` (hero + kartu ayat) | Hero = halaman hasil "dive" amplop (nama ditulis tinta). Kartu ayat → **03 Gulungan** | isi teks |
| `CoupleSection.jsx` (`#mempelai`) | **02 Mempelai** (pintu lengkung, InkText nama, simpul "&") | data mempelai, Instagram |
| *(seluruh halaman)* | **02 Benang Merah** sebagai lapisan global `ThreadLayer` + `Seam` + ranting di tiap sambungan | – |
| `Countdown.jsx` | **04 Foil & Gosok** sebagai "Save the Date" di atas countdown | logika countdown, link Google Calendar |
| `EventDetails.jsx` (`#acara`) | belum ada demo — cukup ikut sistem Seam + benang + reveal GSAP | semua konten & link Maps |
| `LoveStory.jsx` (`#kisah`) | **dipakai apa adanya + penyesuaian kecil**, dipindah tepat setelah mempelai; benang merah berakhir di badge `01`, spine lama melanjutkan ke 02 → 03 (§4a). Tidak perlu prototipe lab. | struktur, 3 bab, konten, spine |
| `Gallery.jsx` (`#galeri`) | **05 Polaroid** (lightbox lama bisa dibuang / jadi fallback) | daftar foto |
| `WeddingGift.jsx`, `RSVPSection.jsx`, `Footer.jsx` | belum ada demo — ikut sistem Seam + reveal | **semua logika** (salin rekening, Apps Script RSVP, ucapan) |
| `FallingPetals.jsx` | bisa diganti `GoldDust` (lebih ringan) atau dipertahankan | – |
| `useScrollReveal` | bisa hidup berdampingan; ganti bertahap ke GSAP per section | – |

Ide lanjutan yang sudah ditawarkan ke user (belum diputuskan): di section penutup kedua ujung
benang bertemu dan terikat jadi pita kecil. *(Catatan: dengan keputusan §2 #9 benang berakhir di
love story, jadi ide pita di penutup perlu ditanyakan ulang — mungkin tidak dipakai.)*

### 4a. Urutan section (keputusan user) & alasannya

> **Diperbarui 2026-11-08 (usulan calon istri, sudah diterapkan):**
> ```
> Cover (amplop) → Hero (isi amplop + tanggal) → Save the Date (foil + countdown) → Gulungan ayat
> → Mempelai → Acara → Galeri → Kisah (benang berakhir di "01") → Kehadiran & Doa → Amplop Digital → Penutup
> ```
> Benang merah kini melewati Acara & Galeri: menyusur tepi layar dan menyeberang hanya di celah
> antar-blok lewat `thread/ThreadStitch.jsx` (dua jangkar: tepi asal → tepi seberang). Latar memakai
> tiga nada: terang (`sec-light`), gelap (`sec-dark`), biru powder (`sec-blue`, `SectionSeam into="blue"`)
> — Save the Date & Amplop Digital biru. Acara/Galeri/RSVP/Amplop Digital/countdown didesain ulang
> tanpa "kartu di dalam kartu". Teks di bawah ini adalah urutan lama, disimpan sebagai riwayat.

Urutan baru (bandingkan dengan `App.jsx` sekarang: Verse → Couple → Countdown → Event → LoveStory → …):

```
Cover (amplop) → Hero + Gulungan ayat → Mempelai → LOVE STORY (benang berakhir di "1")
→ Save the Date (foil + countdown) → Acara (akad/resepsi + maps) → Galeri (polaroid)
→ Kado → RSVP & ucapan → Penutup
```

- **Tidak ada aturan baku** urutan section undangan. Kebiasaan umum (termasuk referensi
  leafitation) menaruh tanggal/lokasi tepat setelah mempelai karena alasan **praktis**: banyak tamu
  (terutama orang tua) hanya mencari "kapan & di mana" lalu berhenti menggulir.
- Dipilih Mempelai → Love Story karena alurnya bercerita (siapa kami → bagaimana bertemu → kapan
  menikah) dan memberi benang ujung yang bermakna. **Mitigasi risiko praktis (wajib dibuat):**
  1. tanggal tampil di cover amplop + halaman hero (sudah ada di lab),
  2. satu baris ringkas di hero, mis. "Sabtu, 17 Juli 2027 · Paiton",
  3. tombol "Acara" di `NavbarBottom` tetap ada (urutan tab disesuaikan: Mempelai, Kisah, Acara, …).
- **Bonus:** gulungan ayat berada *sebelum* mempelai, jadi benang mulai setelah gulungan → konflik
  pin di §7 #4 kemungkinan besar selesai dengan opsi (a) (konfirmasi saat implementasi).

**Akhir benang di Love Story — pakai `LoveStory.jsx` yang SUDAH ADA (keputusan user, tanpa prototipe lab):**

Struktur yang ada sekarang (`src/components/LoveStory.jsx`): header "Kisah Cinta" → pull-quote →
timeline vertikal dengan *spine* (garis `left-4 sm:left-5`) dan 3 badge bulat `01/02/03`
(`iconText`, posisi `absolute left-4 … top-4` di tiap bab) → kartu `vellum-panel` → monogram penutup.

Konsep: **benang merah berakhir di badge `01`, lalu spine lama melanjutkan 01 → 02 → 03** (benang
"menyerahkan" cerita ke timeline). Penyesuaian yang dibutuhkan:

1. **Jangkar terakhir benang** = badge `01`: tambahkan `data-anchor="0.5,0.5"` (atau ref) pada div
   badge bab pertama. Sebelum itu, rute benang melewati header & pull-quote lewat **margin kanan**
   lalu menyeberang ke kiri menuju badge (badge ada di kiri, ±16 px dari tepi) — teks di section ini
   rata tengah, jadi jangkar perlu diatur agar tidak memotong judul.
2. **Badge 01 menyala saat benang tiba**, bukan dari `scrollProgress >= 0.05`. `ThreadLayer`
   mengirim sinyal saat `prog.l` mencapai `total` (mis. `window.dispatchEvent(new CustomEvent('thread:end'))`
   atau state di context) → badge 01 aktif dengan sedikit "denyut" (scale + ring).
3. **Spine mulai dari badge 01 dan baru berjalan setelah benang tiba.** Badge 02 & 03 tetap aktif
   saat spine mencapainya (logika `threshold` lama boleh dipertahankan, dihitung ulang dari titik 01).
4. **Performa (wajib):** `updateSpineProgress` sekarang memanggil `setScrollProgress` tiap frame
   scroll → seluruh section + 3 kartu `backdrop-blur` di-render ulang terus. Ganti ke update via ref
   (`spineRef.current.style.transform = scaleY(p)`, `transform-origin: top`) atau GSAP ScrollTrigger
   `scrub`; status aktif badge cukup di-toggle saat melewati threshold (bukan tiap frame). Hapus
   listener `window.resize` (lihat §8).
5. **Warna spine tetap emas/aqua** seperti sekarang (keputusan user 2026-11-07; merah eksklusif untuk
   benang, §2 #1).
6. `section` punya `overflow-hidden` — tidak masalah karena `ThreadLayer` berada di luar section.

Section setelah love story (Save the Date dst.) **tanpa benang**; penghubung antar section di sana
cukup Seam + ranting.

### 4b. Logo (aset dari calon istri)

| Pemakaian | Format yang dibutuhkan | Catatan |
|---|---|---|
| Ikon tab (favicon) | SVG + PNG 32×32, 180×180 (apple-touch-icon), 512×512 | Di ukuran 16–32 px detail halus hilang → mungkin perlu versi logo yang disederhanakan |
| Preview share link (WA, IG, FB, X) | **JPG/PNG 1200×630**, < 300 KB, **URL absolut https** | `index.html` sekarang memakai `og:image` = `/assets/botanical-crest.svg` → **SVG tidak didukung WhatsApp/Facebook** dan path relatif tidak terbaca crawler. Ganti ke URL absolut domain Vercel. Tambah `og:image:width/height`, `og:url`. Logo di tengah kanvas emerald/ivory + nama & tanggal. |
| Cap segel lilin (amplop) | **SVG vektor satu warna** (path, tanpa teks font) | `WaxSeal.jsx` sekarang menggambar teks "F&S"; ganti dengan `<path>` logo diberi filter emboss yang sama (`feSpecularLighting`) agar terlihat *dicap* di lilin. Logo harus diletakkan di dalam lingkaran r≈49 (viewBox 200), dan path harus ikut terbelah oleh `clipPath` retakan. Kalau hanya ada PNG: pakai sebagai `<image>`/mask (hasil emboss kurang bagus) atau di-trace ke SVG (potrace/Inkscape). |
| Tempat lain (opsional) | sama dengan SVG di atas | `inv` sudah punya `BrandMonogram.jsx` sebagai satu sumber logo (`/assets/logo.svg`) — pakai itu untuk NavbarTop, Footer, dll. |

Yang perlu diminta dari user: file logo **SVG** (ideal), atau PNG transparan resolusi tinggi
(≥ 2000 px) bila belum ada SVG; dan apakah ada versi sederhana untuk favicon.

---

## 5. Arsitektur target di `inv`

```
src/
  lib/
    gsap.js            ← salin dari lab (registrasi plugin + helper)
    useTilt.js         ← salin dari lab
    useFontsReady.js   ← salin dari lab
  data/
    guests.js          (sudah ada)
    wedding.js         ← BARU: satu sumber data (nama, ortu, IG, tanggal, lokasi, rekening, foto)
  components/
    ornaments/         ← BARU: WaxSeal, Sprig, InkText, Seam, GoldDust, Confetti (salin dari lab)
    thread/
      ThreadLayer.jsx  ← BARU: benang merah global (generalisasi dari Couple.jsx)
    CoverScreen.jsx    ← isi diganti scene amplop
    ...section lain
```

**Kenapa `data/wedding.js`:** nama/tanggal saat ini di-hardcode di ≥6 komponen
(`Countdown`, `CoupleSection`, `CoverScreen`, `EventDetails`, `LoveStory`, `WeddingGift`).
Satukan dulu sebelum memindah animasi supaya tidak mengedit teks di banyak tempat.

**ThreadLayer (benang global) — konvensi:**
- Section mana pun cukup menaruh `data-anchor="ax,ay"` (pecahan lebar/tinggi elemen) pada elemen
  yang dilewati benang; urutan = urutan DOM. Elemen dengan class khusus (mis. `data-knot`) memicu
  simpul. Logika lengkapnya ada di `lab/src/demos/Couple.jsx` (fungsi `build`, `lengthAtY`, `render`).
- `ThreadLayer` diletakkan di dalam kontainer utama `max-w-lg` di `App.jsx`, `position:absolute`,
  `z-index` di bawah konten section (`.person` dkk. `z-index: 2`) agar benang lewat di belakang foto.
- Mulai menggambar **setelah** cover terbuka (`isOpened`), lalu `rebuild()` sekali.

---

## 6. Rencana implementasi bertahap

Tiap fase: kerjakan → `npm run build` → screenshot Playwright → **cek di iPhone** → commit.

| Fase | Isi | Selesai bila |
|---|---|---|
| 0. Persiapan | `npm i gsap @gsap/react`; salin `lib/*` & `components/ornaments/*`; tambah font (Cormorant Garamond, Amiri, Caveat) di `index.html`; buat `data/wedding.js`; perbaiki konflik §7 (#1, #2) | build lolos, tampilan lama tidak berubah |
| 1. Cover amplop | Ganti isi `CoverScreen` dengan scene amplop; sambungkan `onOpen`, audio (§7 #6), scroll lock | buka-tutup berulang aman, musik bunyi di iPhone |
| 2. Mempelai + benang | `CoupleSection` → versi lab; `ThreadLayer` global; `Seam` + ranting di sambungan sekitar mempelai | tes regresi benang lolos (§9) |
| 2b. Love story + akhir benang | Pindahkan `LoveStory` tepat setelah mempelai; jangkar akhir benang di badge `01`; spine dimulai setelah benang tiba; spine tanpa `setState` per frame (§4a); ubah urutan di `App.jsx` & `NavbarBottom` | benang selesai tepat di badge 01, spine 01→02→03 mulus di iPhone |
| 3. Gulungan ayat | Kartu ayat di `OpeningVerse` → gulungan ter-pin (lihat §7 #4 soal pin + benang) | tidak ada lompatan saat masuk/keluar pin |
| 4. Save the date | Foil & gosok di atas `Countdown` | gosok jalan di iPhone, kalender terbuka |
| 5. Galeri | `Gallery` → polaroid | drag tidak mengganggu scroll halaman |
| 6. Sisa section | Seam + benang + reveal GSAP untuk Acara, Kisah, Kado, RSVP, Footer | rute benang utuh sampai akhir |
| 7. Musik & aset | Lagu bebas royalti, foto asli, verifikasi teks Arab, **logo** (favicon, `og:image` 1200×630 absolut, cap segel) — §4b | preview link di WA tampil benar (cek ulang cache WA dengan URL baru / `?v=2`) |

---

## 7. Konflik & jebakan spesifik di `inv` (WAJIB dibaca)

1. **`scroll-behavior: smooth` global** — `src/index.css:7`. Mengganggu ScrollTrigger (pin, refresh,
   scroll programatik) → loncatan. Hapus, atau set `auto` saat animasi scroll aktif. Smooth scroll
   untuk navigasi cukup lewat `window.scrollTo({behavior:'smooth'})` di `NavbarBottom`.
2. **`window.scrollTo({ top: 0, behavior: 'smooth' })` saat buka undangan** — `src/App.jsx:42`.
   Ganti ke scroll instan (cover menutupi layar), lalu `ScrollTrigger.refresh()` sekali setelah
   `isOpened` & scroll lock dilepas.
3. **Scroll lock lewat `document.body.style.overflow`** — `src/App.jsx:61`. Boleh dipertahankan,
   tapi semua ScrollTrigger harus di-refresh setelah lock dilepas (ukuran viewport/scrollbar berubah).
4. **Pin gulungan + benang global.** Saat section di-pin, kontennya diam sementara halaman tetap
   bergulir → benang (absolut terhadap halaman) akan terlihat "lewat" di belakang gulungan.
   Pilihan: (a) beri section gulungan latar opaque & z-index di atas benang, benang mulai setelah
   gulungan; atau (b) gulungan tanpa pin (scrub saat lewat). **Tanyakan user.**
5. **Kontainer `max-w-lg … overflow-x-hidden`** — `src/App.jsx:97`. Pin ScrollTrigger memakai
   `position: fixed`; pastikan tidak ada `transform`/`filter` pada ancestor section yang di-pin
   (akan merusak pin). Tes pin di dalam kontainer ini.
6. **Audio + tekan-tahan segel di iOS.** `audio.play()` butuh *user activation*. Di layar sentuh,
   `pointerdown` TIDAK dihitung aktivasi; yang dihitung `pointerup`/`touchend`. Segel terbuka saat
   jari masih menekan → panggil `audio.play()` di handler **lepas jari** (`onPointerUp`) bila segel
   sudah terbuka, atau mulai `play()` dengan volume 0 di `pointerup` pertama lalu fade-in.
7. **Lapisan berat yang sudah ada:** overlay `paper-grain mix-blend-multiply` **fixed** menutupi
   seluruh layar (`src/App.jsx:100`) dan 14 pemakaian `backdrop-blur`/`vellum-panel`. Di iPhone,
   blend-mode fixed + backdrop-filter + animasi scroll = rawan patah-patah. Ukur; bila berat,
   ganti grain ke `background-image` biasa (seperti `--grain` lab) dan kurangi backdrop-blur.
8. **`NavbarBottom` scroll-spy pakai `offsetTop`** — tetap benar dengan pin-spacer, tapi navbar
   melayang menutupi konten (temuan evaluasi). Pertimbangkan sembunyi saat scroll turun.
9. **Tailwind preflight** membuat `svg { display:block }` dan `img { display:block }` — sudah sesuai
   asumsi lab, tapi cek `InkText`/`Sprig` yang dipakai inline.
10. **Hotlink mp3 leafitation** — `src/App.jsx:93`. Ganti (lihat §2 #5).
11. **`navigator.vibrate`** diblokir sebelum user menyentuh halaman → selalu pakai `vibrate()` dari
    `lib/gsap.js` (sudah mengecek `userActivation`). Safari iOS tidak mendukung getaran sama sekali.

---

## 8. Aturan performa (dari bug nyata di lab — jangan diulang)

| Jangan | Kenapa (kejadian) | Lakukan |
|---|---|---|
| `ScrollTrigger.refresh()` di `onLoad` gambar | Foto baru dimuat tepat saat mulai scroll → refresh berat → loncat & debu emas berhenti | Kunci ukuran media dengan `aspect-ratio`; refresh hanya saat layout benar-benar berubah |
| Hitung ulang jalur di `window.resize` | iOS menembak resize terus saat address bar menyusut di awal scroll → lag | `ResizeObserver` pada elemen halaman (ukurannya tidak berubah karena address bar) |
| Ukur jangkar dengan `getBoundingClientRect()` | Ikut terkena transform parallax → jalur berbeda tiap posisi scroll → benang nyasar menembus judul | Ukur layout: jumlahkan `offsetLeft/offsetTop` sampai elemen halaman |
| `<mask>` untuk membuka benang | Mask lebar membocorkan potongan di persilangan simpul + berat di-repaint | Buka langsung dengan `stroke-dashoffset`; serat pilinan pakai `stroke-dasharray` yang dipotong di ujung |
| `filter: blur()` pada path SVG setinggi halaman | Di-repaint tiap frame | Glow = stroke lebar transparan tanpa filter |
| Petakan scroll→panjang dengan "y maksimum" | Bagian loop yang naik terisi seketika → lompat | Kunci per jangkar, titik di dalam simpul dibagi rata menurut panjang |
| Filter SVG berat (`feSpecularLighting`, `feTurbulence`) pada elemen yang dianimasikan | **Amplop lag di iPhone** (Safari & Chrome iOS = WebKit): filter dihitung ulang saat amplop memantul / segel ditahan | Gambar sekali ke PNG (segel: `WaxSeal` me-rasterisasi badannya; tekstur kertas: noise canvas → `<pattern>`) |
| Tulis CSS var tiap frame di elemen induk (`--nx/--ny` efek miring) | Semua turunan (ratusan garis ornamen) dihitung ulang → **foil lag di Android** | Var hanya ke elemen yang memakainya (`varTargets`), bertahap (`varStep`); kilau digeser via `transform` |
| Animasi `transform`/`rotate` pada `<svg>` atau di dalam SVG | Tidak dikerjakan GPU → SVG + induknya dicat ulang tiap frame | Animasikan pembungkus HTML (`.rose-sway`); matikan goyang di dalam kartu yang sudah miring |
| `filter: drop-shadow/blur` pada elemen yang berubah tiap frame (cincin progres, bayangan amplop) | Dicat ulang tiap frame | Glow = stroke lebar transparan; bayangan = radial-gradient |
| `createRadialGradient` per partikel per frame (debu emas) | Alokasi berat | Satu sprite canvas + `drawImage` + `globalAlpha`; canvas dekoratif cukup DPR 1 |
| `will-change` pada muka tutup amplop (`backface-visibility`) | WebKit menampilkan sisi dalam | Jangan beri layer terpisah pada elemen `preserve-3d`/backface |

Ukur dengan `lab/tests/perf.mjs` (`chromium` = CPU 4x lebih lambat ≈ Android menengah; `webkit` di
Windows memakai render software sehingga angka absolutnya tidak mewakili iPhone, hanya perbandingan).

Jika di iPhone benang masih berat pada halaman penuh `inv` (lebih tinggi dari lab), rencana
cadangan: gambar benang di **`<canvas>` fixed seukuran viewport** (Path2D + `setLineDash`), hanya
bagian yang terlihat, alih-alih SVG setinggi halaman.

---

## 9. Testing

- Skrip Playwright ada di lab: `lab/tests/shoot-couple.mjs` (screenshot scroll bertahap) dan
  `lab/tests/repro-thread.mjs` (9 pengecekan: mentok bawah→atas→bawah + perubahan tinggi viewport,
  simpul tanpa lompatan/mundur, tanpa long task > 50 ms di awal scroll). Salin & sesuaikan selector
  untuk `inv`.
- Viewport tes: 390×844 (dan 390×664 / 390×744 untuk simulasi address bar), DPR 2, `isMobile`.
- Chromium ≠ Safari. **Checklist manual iPhone tiap fase:** awal scroll mulus? debu emas tidak
  berhenti? segel tekan-tahan + musik bunyi? giroskop minta izin? gosok koin tidak ikut menggulir
  halaman? drag polaroid tidak menggulir halaman? rotasi layar → benang tetap pas?

---

## 10. Pertanyaan terbuka untuk user (tanyakan saat mulai)

1. Demo mana saja yang dipakai, dan urutan section final?
2. Pin gulungan vs benang global — pilih opsi (a) atau (b) di §7 #4.
3. Lagu bebas royalti yang dipilih.
4. Section tanpa demo (Acara, Kado, RSVP, Footer): cukup Seam + reveal, atau dibuatkan
   prototipe lab dulu (mis. tiket sobek untuk Acara)?
5. ~~Pita di ujung benang pada penutup~~ → benang kini berakhir di love story; masih mau ada
   pita/ikatan di angka 1, atau ujung benang "masuk" ke lingkaran angka?
6. Pertahankan Tailwind untuk komponen baru, atau CSS per komponen seperti lab?
7. File logo: sudah ada SVG? Ada versi sederhana untuk favicon? Warna logo di segel: emas (seperti
   monogram sekarang) atau mengikuti warna lilin?
8. ~~Warna spine love story~~ → sudah diputuskan: tetap emas/aqua.
9. **Palet final** yang dipilih bersama calon istri (lihat §1a; terakhir dicoba: Marun & Mawar).
10. **Ornamen final:** Daun, Mawar, atau campuran? Rangkaian pojok di kartu foil terlalu ramai atau pas?
