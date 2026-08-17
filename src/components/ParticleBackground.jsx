import { useEffect, useRef } from 'react';

/**
 * Award-Winning Dark Luxury Ethereal Aurora & Fluid Light Canvas
 * Features:
 * - Organic drifting deep-violet, amethyst & cyan ambient light fields
 * - Interactive velvet-smooth cursor illumination aura
 * - Microscopic glowing stardust motes with spatial depth & soft twinkle
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Target and smoothed mouse coordinates for liquid inertia
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2, active: false };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 1. Fluid Aurora Light Nodes
    const auroras = [
      {
        baseX: 0.25,
        baseY: 0.3,
        radius: Math.min(width, height) * 0.45,
        color: '168, 85, 247', // Neon Amethyst
        speed: 0.0008,
        amplitude: 140,
        phase: 0,
        alpha: 0.14,
      },
      {
        baseX: 0.75,
        baseY: 0.65,
        radius: Math.min(width, height) * 0.5,
        color: '139, 92, 246', // Electric Violet
        speed: 0.0006,
        amplitude: 160,
        phase: 2.1,
        alpha: 0.12,
      },
      {
        baseX: 0.5,
        baseY: 0.85,
        radius: Math.min(width, height) * 0.4,
        color: '99, 102, 241', // Deep Indigo
        speed: 0.0009,
        amplitude: 110,
        phase: 4.2,
        alpha: 0.1,
      },
      {
        baseX: 0.85,
        baseY: 0.2,
        radius: Math.min(width, height) * 0.35,
        color: '56, 189, 248', // Ethereal Cyan Accent
        speed: 0.0007,
        amplitude: 120,
        phase: 1.3,
        alpha: 0.07,
      },
    ];

    // 2. Microscopic Ambient Stardust Motes
    const starCount = Math.min(Math.floor((width * height) / 22000), 55);
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.4,
      speedY: Math.random() * 0.18 + 0.06,
      speedX: (Math.random() - 0.5) * 0.08,
      baseAlpha: Math.random() * 0.4 + 0.15,
      pulseSpeed: Math.random() * 0.015 + 0.005,
      pulsePhase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.4 ? '192, 132, 252' : '237, 233, 254',
    }));

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation for velvet fluidity
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Draw Ethereal Aurora Light Fields
      auroras.forEach((aurora) => {
        const cx =
          aurora.baseX * width + Math.sin(time * aurora.speed + aurora.phase) * aurora.amplitude;
        const cy =
          aurora.baseY * height + Math.cos(time * aurora.speed * 0.8 + aurora.phase) * aurora.amplitude;
        
        // Gentle parallax bias towards cursor
        const finalX = cx + (mouse.x - width / 2) * 0.05;
        const finalY = cy + (mouse.y - height / 2) * 0.05;

        const gradient = ctx.createRadialGradient(
          finalX,
          finalY,
          0,
          finalX,
          finalY,
          aurora.radius
        );

        gradient.addColorStop(0, `rgba(${aurora.color}, ${aurora.alpha})`);
        gradient.addColorStop(0.5, `rgba(${aurora.color}, ${aurora.alpha * 0.4})`);
        gradient.addColorStop(1, `rgba(${aurora.color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      // Interactive Cursor Velvet Glow Halo
      if (mouse.active) {
        const cursorGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          260
        );
        cursorGlow.addColorStop(0, 'rgba(168, 85, 247, 0.12)');
        cursorGlow.addColorStop(0.5, 'rgba(139, 92, 246, 0.04)');
        cursorGlow.addColorStop(1, 'rgba(168, 85, 247, 0)');

        ctx.fillStyle = cursorGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw Soft Twinkling Micro Stardust
      stars.forEach((star) => {
        // Slow float upwards
        star.y -= star.speedY;
        star.x += star.speedX;

        // Wrap edges seamlessly
        if (star.y < -10) star.y = height + 10;
        if (star.x < -10) star.x = width + 10;
        if (star.x > width + 10) star.x = -10;

        // Ethereal subtle twinkle
        const alpha =
          star.baseAlpha + Math.sin(time * star.pulseSpeed + star.pulsePhase) * 0.2;
        const finalAlpha = Math.max(0.08, Math.min(0.85, alpha));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${finalAlpha})`;
        ctx.fill();

        // Soft halo on brighter stars
        if (star.size > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${star.color}, ${finalAlpha * 0.18})`;
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
