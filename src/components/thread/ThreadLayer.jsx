import { gsap, useGSAP, ScrollTrigger } from '../../lib/gsap';
import { useFontsReady } from '../../lib/useFontsReady';

/* Catmull-Rom → kurva Bezier halus melewati semua titik */
function smoothSegments(pts) {
  const segs = [`M${pts[0][0]} ${pts[0][1]}`];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    segs.push(`C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`);
  }
  return segs;
}

/** Ujung benang tiba di jangkar terakhir (badge "01" love story) / mundur lagi. */
export const THREAD_END = 'thread:end';
export const THREAD_BACK = 'thread:back';

/**
 * Benang merah takdir global (generalisasi dari lab `Couple.jsx`).
 *
 * Konvensi untuk section:
 *  - `data-anchor="ax,ay"` (pecahan lebar/tinggi elemen) pada elemen yang dilewati benang.
 *    Urutan jangkar = urutan DOM. Jangkar terakhir = ujung benang.
 *  - `data-knot` pada elemen jangkar → benang melingkarinya satu kali (simpul "&").
 *
 * Aturan performa (dari bug nyata di lab — lihat docs/ANIMATION_INTEGRATION.md §8):
 *  - posisi diukur dari LAYOUT (offsetTop/Left), bukan getBoundingClientRect (kena transform parallax);
 *  - benang dibuka dengan stroke-dashoffset (tanpa mask, tanpa filter blur);
 *  - hitung ulang hanya via ResizeObserver halaman + fonts.loadingdone + ScrollTrigger refresh,
 *    TANPA window 'resize' dan TANPA refresh di onLoad gambar.
 *
 * `pageRef` = elemen halaman (position: relative) yang memuat semua section; komponen ini
 * dirender di dalamnya. Mulai bekerja hanya saat `active` (undangan sudah dibuka).
 */
export default function ThreadLayer({ pageRef, active }) {
  const fontsReady = useFontsReady();

  useGSAP(() => {
    if (!active || !fontsReady) return;
    const page = pageRef.current;
    const svg = page.querySelector(':scope > .thread');
    const paths = svg.querySelectorAll('path');
    const line = svg.querySelector('.thread-line');
    const drawn = svg.querySelectorAll('.thread-line, .thread-glow'); // dibuka via dashoffset
    const twist = svg.querySelector('.thread-twist');                 // serat pilinan
    const tip = page.querySelector(':scope > .thread-tip');
    const TW = [2.5, 3.5]; // pola serat: garis 2.5, celah 3.5
    let total = 0, keys = [], lastTwist = -1, arrived = false;
    const prog = { l: 0 };

    const at = (el, ax, ay) => {
      let x = 0, y = 0, n = el;
      while (n && n !== page) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
      return [x + el.offsetWidth * ax, y + el.offsetHeight * ay];
    };
    const pageTop = () => {
      let y = 0, n = page;
      while (n) { y += n.offsetTop; n = n.offsetParent; }
      return y;
    };

    const build = () => {
      const pts = [];    // [x, y]
      const inKnot = []; // true = titik di dalam lingkaran simpul
      page.querySelectorAll('[data-anchor]').forEach((el) => {
        if (el.offsetParent === null) return; // tersembunyi
        if (!el.hasAttribute('data-knot')) {
          const [ax, ay] = el.dataset.anchor.split(',').map(Number);
          pts.push(at(el, ax, ay)); inKnot.push(false);
        } else {
          // simpul: benang melingkari elemen satu kali
          const [cx, cy] = at(el, 0.5, 0.5);
          const r = el.offsetWidth * 0.62;
          const knot = [[cx + r * 0.2, cy - r * 1.3], [cx - r, cy], [cx, cy + r], [cx + r, cy], [cx, cy - r * 0.95], [cx - r * 0.75, cy + r * 0.2], [cx - r * 0.2, cy + r * 1.5]];
          knot.forEach((k, i) => { pts.push(k); inKnot.push(i > 0 && i < knot.length - 1); });
        }
      });
      if (pts.length < 2) return;
      svg.setAttribute('viewBox', `0 0 ${page.offsetWidth} ${page.offsetHeight}`);
      svg.style.height = `${page.offsetHeight}px`;

      // panjang benang di tiap titik jangkar (potong dari segmen path penuh agar panjangnya persis sama)
      const segs = smoothSegments(pts);
      const lens = [0];
      for (let i = 1; i < pts.length; i++) {
        line.setAttribute('d', segs.slice(0, i + 1).join(' '));
        lens.push(line.getTotalLength());
      }
      const d = segs.join(' ');
      paths.forEach((p) => p.setAttribute('d', d));
      total = line.getTotalLength();

      // Kunci (y layar → panjang benang), selalu naik. Titik di dalam simpul
      // y-nya dibagi rata menurut panjang, jadi loop tergambar bertahap.
      keys = pts.map(([, y], i) => ({ y, l: lens[i], knot: inKnot[i] }));
      for (let i = 0; i < keys.length; i++) {
        if (!keys[i].knot) continue;
        const a = i - 1;
        let b = i;
        while (keys[b].knot) b++;
        const k0 = keys[a], k1 = keys[b];
        for (let j = i; j < b; j++) keys[j].y = k0.y + ((keys[j].l - k0.l) / (k1.l - k0.l)) * (k1.y - k0.y);
        i = b;
      }
      for (let i = 1; i < keys.length; i++) keys[i].y = Math.max(keys[i].y, keys[i - 1].y + 0.5);

      drawn.forEach((p) => { p.style.strokeDasharray = `${total} ${total + 10}`; });
      lastTwist = -1;
    };

    const lengthAtY = (y) => {
      if (!keys.length || y <= keys[0].y) return 0;
      for (let i = 1; i < keys.length; i++) {
        if (y < keys[i].y) {
          const a = keys[i - 1], b = keys[i];
          return a.l + ((y - a.y) / (b.y - a.y)) * (b.l - a.l);
        }
      }
      return total;
    };

    // pola serat dipotong tepat di ujung benang (diperbarui tiap ~3px saja)
    const setTwist = (l) => {
      if (Math.abs(l - lastTwist) < 3) return;
      lastTwist = l;
      const period = TW[0] + TW[1];
      const n = Math.floor(l / period);
      const rest = Math.min(TW[0], l - n * period);
      twist.style.strokeDasharray = `${`${TW[0]} ${TW[1]} `.repeat(n)}${rest.toFixed(2)} ${total + 10}`;
    };

    const render = () => {
      if (!total) return;
      drawn.forEach((p) => { p.style.strokeDashoffset = total - prog.l; });
      setTwist(prog.l);
      const pt = line.getPointAtLength(Math.max(0.1, prog.l));
      gsap.set(tip, { x: pt.x, y: pt.y, opacity: prog.l > 4 && prog.l < total - 4 ? 1 : 0 });
      // sinyal ke love story: benang tiba di badge "01" / mundur lagi
      const isEnd = prog.l >= total - 2;
      if (isEnd !== arrived) {
        arrived = isEnd;
        window.dispatchEvent(new CustomEvent(isEnd ? THREAD_END : THREAD_BACK));
      }
    };
    const follow = gsap.quickTo(prog, 'l', { duration: 0.6, ease: 'power3.out', onUpdate: render });
    let top = 0;
    const target = () => lengthAtY(window.scrollY - top + window.innerHeight * 0.62);
    const update = () => follow(target());
    // setelah jalur dihitung ulang, langsung loncat ke posisi benar (tanpa tween dari nilai basi)
    const rebuild = () => { top = pageTop(); build(); prog.l = target(); follow(prog.l, prog.l); render(); };

    ScrollTrigger.create({ trigger: page, start: 'top top', end: 'bottom bottom', onUpdate: update, onRefresh: rebuild });

    // Hitung ulang hanya saat UKURAN HALAMAN berubah (rotasi, font/foto dimuat, tab Kado berganti).
    let raf = 0;
    const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(rebuild); };
    const ro = new ResizeObserver(schedule);
    ro.observe(page);
    document.fonts?.addEventListener('loadingdone', schedule);
    rebuild();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      document.fonts?.removeEventListener('loadingdone', schedule);
    };
  }, { dependencies: [active, fontsReady] });

  return (
    <>
      {/* benang merah takdir: Mempelai → Acara → Galeri → Love Story */}
      <svg className="thread" aria-hidden="true" preserveAspectRatio="none">
        <path className="thread-glow" />
        <path className="thread-line" />
        {/* serat pilinan: garis putus-putus terang di atas benang */}
        <path className="thread-twist" />
      </svg>
      <span className="thread-tip" aria-hidden="true" />
    </>
  );
}
