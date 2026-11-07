/**
 * SATU sumber data undangan. Ubah nama, tanggal, lokasi, rekening, dan foto di sini saja.
 * Foto masih placeholder Unsplash → ganti dengan foto prewedding sendiri.
 * Foto lengkung mempelai paling bagus potret 3:4 dengan wajah di sepertiga atas.
 */
const u = (id, w = 700) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const WEDDING = {
  names: 'Fahrul & Sabrina',
  monogram: 'F&S',
  hashtag: '#FAHreverWithSAB',
  dateISO: '2027-07-17T08:00:00+07:00',
  dateLong: 'Sabtu, 17 Juli 2027',
  dateDots: '17 · 07 · 2027',
  dateCompact: '17.07.2027',
  day: '17',
  month: '07',
  year: '2027',
  city: 'Paiton',
  place: 'Paiton · Probolinggo',
  calendarUrl:
    'https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+Wedding+of+Fahrul+%26+Sabrina&dates=20270717T010000Z/20270717T080000Z&details=Pernikahan+Fahrul+Irsyad+Fianto+%26+Sabrina+Nabila+Kholiqin.+Sabtu,+17+Juli+2027.&location=Paiton,+Kabupaten+Probolinggo,+Jawa+Timur',
  // TODO(§2 #5): isi dengan lagu bebas royalti pilihan sendiri (Pixabay Music / YouTube Audio Library),
  // simpan di /public/music/ lalu tulis path-nya, mis. '/music/lagu.mp3'. null = tanpa musik (tombol musik disembunyikan).
  music: null,
};

export const COUPLE = [
  {
    side: 'left',
    role: 'Mempelai Pria',
    nick: 'Fahrul',
    full: 'Fahrul Irsyad Fianto, S.Tr.Kom.',
    parents: ['Putra dari', 'Bapak Arief Maryanto', '& Ibu Siti Rukayah Susanti'],
    ig: 'fahrulirsy',
    photo: u('1506794778202-cad84cf45f1d'),
  },
  {
    side: 'right',
    role: 'Mempelai Wanita',
    nick: 'Sabrina',
    full: 'Sabrina Nabila Kholiqin, S.Pd.',
    parents: ['Putri dari', 'Bapak Akhsanul Kholiqin', '& Ibu Siti Nur Kusumawati'],
    ig: 'sabrinnkh',
    photo: u('1534528741775-53994a69daeb'),
  },
];

// Teks Arab diketik manual → WAJIB diverifikasi ke mushaf sebelum rilis (§2 #7).
export const VERSE = {
  bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  arabic:
    'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
  translation:
    '“Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.”',
  ref: 'QS. Ar-Rum · 21',
};

export const STORY = {
  quote: '“Setiap kisah cinta itu indah, namun kisah yang kami rajut bersama adalah yang paling kami syukuri.”',
  chapters: [
    {
      act: 'BABAK I',
      title: 'Pertemuan Pertama',
      location: 'Probolinggo',
      text: 'Tidak pernah saling mengenal sebelumnya, takdir mempertemukan kami melalui sebuah tempat kerja setelah salah satu dari kami memulai babak baru di Probolinggo. Tanpa disangka, sejak hari pertama, ada kesan baik yang perlahan tumbuh. Waktu yang kami habiskan bersama dalam pergantian shift membuka ruang untuk saling mengenal lebih dalam, hingga kami menemukan kecocokan yang tak pernah terduga sebelumnya.',
      iconText: '01',
    },
    {
      act: 'BABAK II',
      title: 'Menyatukan Langkah',
      location: 'Komitmen Bersama',
      text: 'Kurang dari setahun sejak pertemuan itu, kami memantapkan hati untuk melangkah lebih jauh, bukan lagi sekadar rekan kerja melainkan dua insan yang berjalan menuju tujuan yang sama. Kami belajar saling mendengarkan, bertukar pikiran, memberi dukungan, memahami sudut pandang yang berbeda, dan senantiasa menemukan jalan tengah dalam setiap langkah pendewasaan.',
      iconText: '02',
    },
    {
      act: 'BABAK III',
      title: 'Menuju Janji Suci',
      location: '17 Juli 2027',
      text: 'Seiring berjalannya waktu, keyakinan itu bermetamorfosis menjadi sebuah harapan suci: bukan hanya saling menemani hari ini, tetapi juga menghabiskan sisa usia bersama. Dengan penuh rasa syukur, kami kini bersiap mengikat janji suci, membawa kisah ini ke dalam perjalanan ibadah terpanjang seumur hidup, dengan doa semoga Allah SWT senantiasa meridai setiap langkah kami hingga ke jannah-Nya.',
      iconText: '03',
    },
  ],
};

export const EVENTS = [
  {
    id: 'akad',
    badge: 'Akad Nikah • 01',
    title: 'Prosesi Ijab Kabul',
    date: 'Sabtu, 17 Juli 2027',
    time: 'Pukul 08.00 — 10.00 WIB',
    venue: 'Kediaman Mempelai Wanita',
    address: 'Jl. Kotaanyar, RT.24/RW.7, Dusun Krajan, Sumberanyar, Kec. Paiton, Kabupaten Probolinggo, Jawa Timur',
    maps: 'https://maps.app.goo.gl/BiL6MrhrF899WbYa7',
  },
  {
    id: 'resepsi',
    badge: 'Resepsi • 02',
    title: 'Resepsi Pernikahan',
    date: 'Sabtu, 17 Juli 2027',
    time: 'Pukul 13.00 — 15.00 WIB',
    venue: 'Aula Perumahan PT. PLN Nusantara Power Paiton',
    address: 'Dusun Kp. Baru, Sukodadi, Kec. Paiton, Kabupaten Probolinggo, Jawa Timur 67291',
    maps: 'https://maps.app.goo.gl/L3KS9tdByCaby4BC9',
  },
];

export const GALLERY = [
  { id: 1, src: u('1519741497674-611481863552', 800), caption: 'Langkah Awal Menuju Abadi', tag: 'FIG. 01 — PREWEDDING', wide: true },
  { id: 2, src: u('1511285560929-80b456fea0bc', 500), caption: 'Tatap Teduh & Ketulusan', tag: 'FIG. 02 — INTIMATE' },
  { id: 3, src: u('1583939003579-730e3918a45a', 500), caption: 'Dua Hati Bersatu', tag: 'FIG. 03 — FOREVER' },
];

export const GIFT = {
  accounts: [
    { id: 'groom', bankName: 'Bank BCA', accountNumber: '1234567890', accountHolder: 'Fahrul Irsyad Fianto', label: 'Rekening Mempelai Pria' },
    { id: 'bride', bankName: 'Bank Mandiri', accountNumber: '0987654321000', accountHolder: 'Sabrina Nabila Kholiqin', label: 'Rekening Mempelai Wanita' },
  ],
  address: {
    recipient: 'Sabrina Nabila & Fahrul Irsyad',
    phone: '0812-3456-7890',
    fullAddress: 'Jl. Kotaanyar, RT.24/RW.7, Dusun Krajan, Sumberanyar, Kec. Paiton, Kabupaten Probolinggo, Jawa Timur 67291',
  },
};
