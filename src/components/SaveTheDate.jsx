import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, vibrate } from '../lib/gsap';
import { useTilt, requestGyro, gyroNeedsPermission } from '../lib/useTilt';
import { paletteColor, paletteRgb } from '../lib/palette';
import Confetti from './ornaments/Confetti';
import SectionSeam from './ornaments/SectionSeam';
import { RoseCorner, RoseVine } from './ornaments/Roses';
import Countdown from './Countdown';
import { WEDDING } from '../data/wedding';
import './date/foil.css';

/** Lapisan foil emas yang bisa digosok (canvas, destination-out). */
function ScratchCoin({ value, label, onReveal }) {
  const canvas = useRef(null);
  const wrap = useRef(null);
  const done = useRef(false);
  const moves = useRef(0);
  const lastBuzz = useRef(0);
  const last = useRef(null);

  useEffect(() => {
    const c = canvas.current;
    const size = c.clientWidth;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    c.width = c.height = size * dpr;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.scale(dpr, dpr);
    // foil emas: gradien + serat sikat + bintik kilau
    const g = ctx.createLinearGradient(0, 0, size, size);
    [[0, 'metal-deep'], [0.3, 'metal-soft'], [0.5, 'metal-mid'], [0.7, 'metal-light'], [1, 'metal-dark']].forEach(([o, k]) => g.addColorStop(o, paletteColor(k)));
    const shade = paletteRgb('shade');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(size / 2, size / 2, size / 2, 0, 6.283); ctx.fill();
    ctx.save();
    ctx.clip();
    for (let i = 0; i < 70; i++) {
      ctx.strokeStyle = `rgba(${Math.random() < 0.5 ? '255,250,225' : shade},${Math.random() * 0.18})`;
      ctx.lineWidth = Math.random() * 1.2;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, Math.random() * size * 0.5, 0, 6.283);
      ctx.stroke();
    }
    for (let i = 0; i < 90; i++) {
      ctx.fillStyle = `rgba(255,255,240,${Math.random() * 0.5})`;
      ctx.fillRect(Math.random() * size, Math.random() * size, 1, 1);
    }
    ctx.restore();
    ctx.fillStyle = `rgba(${shade},.55)`;
    ctx.font = `600 ${Math.round(size * 0.11)}px "Plus Jakarta Sans", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '2px';
    ctx.fillText('GOSOK', size / 2, size / 2);
  }, []);

  const pos = (e) => {
    const r = canvas.current.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };

  const checkCleared = () => {
    const c = canvas.current;
    const { data } = c.getContext('2d').getImageData(0, 0, c.width, c.height);
    const n = c.width, r = n / 2, r2 = (r - 2) * (r - 2);
    let clear = 0, total = 0;
    // hanya hitung piksel di dalam lingkaran koin (sudut luar sudah transparan)
    for (let y = 0; y < n; y += 3) {
      for (let x = 0; x < n; x += 3) {
        if ((x - r) ** 2 + (y - r) ** 2 > r2) continue;
        total++;
        if (data[(y * n + x) * 4 + 3] < 100) clear++;
      }
    }
    return clear / total;
  };

  // saat menggosok, kartu berhenti miring: koin tidak bergeser di bawah jari & GPU lebih ringan
  const pauseTilt = (on) => {
    const cardEl = wrap.current?.closest('.foil-card');
    if (!cardEl) return;
    if (on) cardEl.dataset.scratching = '1'; else delete cardEl.dataset.scratching;
    cardEl.dispatchEvent(new Event('tiltstate'));
  };

  const flake = (x, y) => {
    if (wrap.current.querySelectorAll('.flake').length > 8) return;
    const f = document.createElement('span');
    f.className = 'flake';
    f.style.left = `${x}px`; f.style.top = `${y}px`;
    wrap.current.appendChild(f);
    gsap.to(f, {
      physics2D: { velocity: gsap.utils.random(40, 110), angle: gsap.utils.random(200, 340), gravity: 600 },
      rotation: gsap.utils.random(-360, 360), opacity: 0, duration: 0.9, onComplete: () => f.remove(),
    });
  };

  const scratch = (e) => {
    // mulai juga saat mouse ditekan dari luar koin lalu masuk ke koin
    if (!last.current && e.buttons & 1 && e.pointerType === 'mouse') last.current = pos(e);
    if (done.current || !last.current) return;
    const ctx = canvas.current.getContext('2d');
    const [x, y] = pos(e);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = canvas.current.clientWidth * 0.26;
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(...last.current); ctx.lineTo(x, y); ctx.stroke();
    last.current = [x, y];
    if (++moves.current % 4 === 0) flake(x, y);
    const now = performance.now();
    if (now - lastBuzz.current > 140) { vibrate(4); lastBuzz.current = now; }
    if (moves.current % 6 === 0 && checkCleared() > 0.5) {
      done.current = true;
      gsap.to(canvas.current, { opacity: 0, scale: 1.25, duration: 0.5, ease: 'power2.out' });
      gsap.fromTo(wrap.current.querySelector('.coin-value'), { scale: 0.6 }, { scale: 1, duration: 0.9, ease: 'elastic.out(1, 0.4)' });
      onReveal(wrap.current);
    }
  };

  return (
    <div className="coin" ref={wrap}>
      <div className="coin-face">
        <span className={`coin-value${value.length > 2 ? ' coin-value-sm' : ''}`}>{value}</span>
        <span className="coin-label">{label}</span>
      </div>
      <canvas
        ref={canvas}
        className="coin-foil"
        role="img"
        aria-label={`Gosok untuk membuka ${label}: ${value}`}
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); pauseTilt(true); last.current = pos(e); scratch(e); }}
        onPointerMove={scratch}
        onPointerUp={() => { last.current = null; pauseTilt(false); }}
        onPointerCancel={() => { last.current = null; pauseTilt(false); }}
      />
    </div>
  );
}

/**
 * Save the Date (lab demo 04): kartu foil emas yang berkilau mengikuti giroskop/pointer,
 * 3 koin gosok (tanggal · bulan · tahun) + confetti, lalu hitung mundur & tombol kalender.
 */
export default function SaveTheDate() {
  const root = useRef(null);
  const card = useRef(null);
  const confetti = useRef(null);
  const revealed = useRef(0);
  const [needGyro, setNeedGyro] = useState(gyroNeedsPermission);
  const [allDone, setAllDone] = useState(false);

  // kilau: lapisan cahaya digeser lewat transform (GPU, tiap frame);
  // CSS var untuk teks foil ditulis bertahap saja (memicu cat ulang)
  const sheen = useRef(null);
  const moveSheen = useRef(null);
  const foilTexts = useRef(null);
  useTilt(card, {
    max: 12, vars: true, varStep: 0.06,
    varTargets: () => (foilTexts.current ??= [...card.current.querySelectorAll('.foil-text')]),
    onMove: (nx, ny) => {
      moveSheen.current ??= gsap.quickSetter(sheen.current, 'css');
      moveSheen.current({ xPercent: nx * 22, yPercent: ny * 22 });
    },
  });

  // Kemiringan hanya berjalan saat kartu terlihat, sudah selesai masuk, dan tidak sedang digosok
  // (idle "bernapas" memakai ticker tiap frame — jangan jalan saat kartu di luar layar).
  useEffect(() => {
    const el = card.current;
    let visible = false;
    const sync = () => {
      if (visible && el.dataset.entered && !el.dataset.scratching) delete el.dataset.tiltPaused;
      else el.dataset.tiltPaused = '1';
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); });
    io.observe(el);
    el.addEventListener('tiltstate', sync);
    sync();
    return () => { io.disconnect(); el.removeEventListener('tiltstate', sync); };
  }, []);

  useGSAP(() => {
    const st = { trigger: '.foil-card', start: 'top 78%' };
    const entered = () => { card.current.dataset.entered = '1'; card.current.dispatchEvent(new Event('tiltstate')); };
    gsap.from('.foil-card', { y: 80, rotationX: 50, opacity: 0, duration: 1.4, ease: 'power4.out', scrollTrigger: st, onComplete: entered });
    gsap.from('.foil-card .stagger', { y: 20, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out', delay: 0.5, scrollTrigger: st });
    gsap.from('.coin', { scale: 0, rotation: -180, stagger: 0.12, duration: 1, ease: 'back.out(1.8)', delay: 0.9, scrollTrigger: st });
    gsap.from('.foil-card .sprig-path', { drawSVG: 0, duration: 1.8, stagger: { amount: 0.9 }, ease: 'power1.inOut', delay: 0.6, scrollTrigger: st });
    gsap.from('.cd .eyebrow, .cd-unit, .cd-cta', {
      y: 22, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.cd', start: 'top 85%' },
    });
  }, { scope: root });

  const onReveal = (coinEl) => {
    const r = coinEl.getBoundingClientRect();
    confetti.current?.fire(r.left + r.width / 2, r.top + r.height / 2, 40);
    vibrate(20);
    revealed.current += 1;
    if (revealed.current === 3) {
      setAllDone(true);
      setTimeout(() => {
        const c = card.current.getBoundingClientRect();
        confetti.current?.fire(c.left + c.width / 2, c.top + c.height * 0.4, 180);
        vibrate([30, 60, 30]);
        gsap.fromTo(root.current.querySelectorAll('.foil-after > *'), { y: 24, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 1, ease: 'elastic.out(1, 0.55)' });
        gsap.to(root.current.querySelector('.foil-hint'), { opacity: 0, height: 0, margin: 0, duration: 0.4 });
        // tombol kalender memantul mengajak disimpan
        gsap.fromTo(root.current.querySelector('.cd-cta'), { scale: 1 }, { scale: 1.08, duration: 0.35, yoyo: true, repeat: 3, ease: 'power2.inOut', delay: 0.6 });
      }, 350);
    }
  };

  return (
    <section className="sec sec-blue date-sec" id="tanggal" ref={root}>
      <SectionSeam into="blue" side="left" seed={41} />
      <Confetti ref={confetti} />

      <div className="foil-stage">
        <div className="foil-card" ref={card} data-tilt-paused="1">
          <div className="foil-border" />
          <div className="foil-sheen"><div className="foil-sheen-glow" ref={sheen} /></div>
          <RoseCorner className="foil-corner foil-corner-tr" seed={2} width={1.1} />
          <RoseCorner className="foil-corner foil-corner-bl" seed={7} width={1.1} />

          <p className="eyebrow foil-text stagger">Save the Date</p>
          <h2 className="foil-names foil-text stagger">Fahrul<span>&amp;</span>Sabrina</h2>
          <RoseVine className="foil-vine stagger" w={240} h={40} seed={4} />
          <p className="foil-hint stagger">Gosok ketiga koin emas di bawah</p>

          <div className="coins">
            <ScratchCoin value={WEDDING.day} label="Tanggal" onReveal={onReveal} />
            <ScratchCoin value={WEDDING.month} label="Bulan" onReveal={onReveal} />
            <ScratchCoin value={WEDDING.year} label="Tahun" onReveal={onReveal} />
          </div>

          <div className="foil-after" aria-hidden={!allDone}>
            <p className="foil-day">{WEDDING.dateLong}</p>
            <p className="foil-place">{WEDDING.place}</p>
          </div>
        </div>

        {needGyro && (
          <button type="button" className="btn-ghost foil-gyro" onClick={async () => { await requestGyro(); setNeedGyro(false); }}>
            Aktifkan efek kemiringan
          </button>
        )}
        <p className="foil-tip">Miringkan HP untuk melihat kilau foil</p>
      </div>

      <Countdown />
    </section>
  );
}
