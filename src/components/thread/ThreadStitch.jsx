/**
 * Celah tempat benang merah menyeberang dari tepi `from` ke tepi seberang.
 * Dua jangkar ThreadLayer (urutan DOM = urutan benang): tepi asal di atas, tepi tujuan di bawah.
 * Dipakai di antara blok (kartu acara, foto) agar benang menyusur tepi, tidak menyilang konten.
 */
export default function ThreadStitch({ from = 'right', height = 56 }) {
  const a = from === 'right' ? '96%' : '4%';
  const b = from === 'right' ? '4%' : '96%';
  return (
    <div className="thread-stitch" style={{ height }} aria-hidden="true">
      <span style={{ left: a, top: '18%' }} data-anchor="0,0" />
      <span style={{ left: b, top: '82%' }} data-anchor="0,0" />
    </div>
  );
}
