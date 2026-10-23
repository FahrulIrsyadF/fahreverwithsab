import React, { useEffect, useRef } from 'react';

export default function FallingPetals() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;

    const handleResize = () => {
      canvas.width = Math.min(window.innerWidth, 512);
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Palet warna perhiasan Aquamarine, Champagne Gold, dan Botanical Emerald lembut
    const petalColors = [
      '#72D7CA', // aqua soft
      '#80E5D7', // aqua glow
      '#239D8E', // aqua teal
      '#D4AF37', // metallic gold
      '#FED65B', // gold pale
      '#2B6954', // emerald light
    ];

    const petals = Array.from({ length: 22 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 6 + 5,
      speedY: Math.random() * 0.7 + 0.45,
      speedX: Math.random() * 0.6 - 0.3,
      angle: Math.random() * 360,
      spin: Math.random() * 1.2 - 0.6,
      flipAngle: Math.random() * 360,
      flipSpeed: Math.random() * 2.5 + 1.2,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      opacity: Math.random() * 0.3 + 0.25,
      isDust: Math.random() > 0.65 // sebagian partikel adalah golden/aqua shimmer dust
    }));

    const drawParticle = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.angle * Math.PI) / 180);

      // Simulasi rotasi 3D tumbling di udara dengan proyeksi cosine
      const scaleX = Math.cos((p.flipAngle * Math.PI) / 180);
      ctx.scale(scaleX, 1);

      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;

      if (p.isDust) {
        // Lingkaran debu emas/aqua berpendar lembut
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Kelopak bunga / daun organik melengkung
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.quadraticCurveTo(p.size * 0.7, 0, 0, p.size);
        ctx.quadraticCurveTo(-p.size * 0.7, 0, 0, -p.size);
        ctx.fill();
      }

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.012) * 0.6 + p.speedX;
        p.angle += p.spin;
        p.flipAngle += p.flipSpeed;

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.x < -20) p.x = canvas.width + 20;

        drawParticle(p);
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-full pointer-events-none z-20"
    />
  );
}
