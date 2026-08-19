import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2, active: false };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const auroras = [
      { baseX: 0.2, baseY: 0.25, radius: Math.min(width, height) * 0.5, color: '168, 85, 247', speed: 0.0007, amplitude: 150, phase: 0, alpha: 0.16 },
      { baseX: 0.78, baseY: 0.6, radius: Math.min(width, height) * 0.55, color: '139, 92, 246', speed: 0.0005, amplitude: 170, phase: 2.1, alpha: 0.13 },
      { baseX: 0.5, baseY: 0.88, radius: Math.min(width, height) * 0.42, color: '99, 102, 241', speed: 0.0008, amplitude: 120, phase: 4.2, alpha: 0.11 },
      { baseX: 0.88, baseY: 0.18, radius: Math.min(width, height) * 0.38, color: '56, 189, 248', speed: 0.0006, amplitude: 130, phase: 1.3, alpha: 0.08 },
      { baseX: 0.35, baseY: 0.55, radius: Math.min(width, height) * 0.3, color: '217, 70, 239', speed: 0.0009, amplitude: 90, phase: 3.5, alpha: 0.06 },
    ];

    const starCount = Math.min(Math.floor((width * height) / 18000), 70);
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.3,
      speedY: Math.random() * 0.2 + 0.05,
      speedX: (Math.random() - 0.5) * 0.1,
      baseAlpha: Math.random() * 0.45 + 0.12,
      pulseSpeed: Math.random() * 0.018 + 0.004,
      pulsePhase: Math.random() * Math.PI * 2,
      color: ['192, 132, 252', '237, 233, 254', '168, 85, 247', '56, 189, 248'][Math.floor(Math.random() * 4)],
    }));

    // Shooting stars
    const shootingStars = [];
    const spawnShootingStar = () => {
      if (shootingStars.length >= 5) return;
      shootingStars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.5,
        length: Math.random() * 120 + 50,
        speed: Math.random() * 5 + 3.5,
        angle: (Math.PI / 7) + Math.random() * (Math.PI / 5),
        alpha: 1,
        life: 0,
        maxLife: Math.random() * 50 + 30,
      });
    };

    let time = 0;
    let shootingTimer = 0;

    const render = () => {
      time += 1;
      shootingTimer += 1;
      ctx.clearRect(0, 0, width, height);

      mouse.x += (mouse.targetX - mouse.x) * 0.035;
      mouse.y += (mouse.targetY - mouse.y) * 0.035;

      // Aurora light fields
      auroras.forEach((aurora) => {
        const cx = aurora.baseX * width + Math.sin(time * aurora.speed + aurora.phase) * aurora.amplitude;
        const cy = aurora.baseY * height + Math.cos(time * aurora.speed * 0.7 + aurora.phase) * aurora.amplitude;
        const finalX = cx + (mouse.x - width / 2) * 0.06;
        const finalY = cy + (mouse.y - height / 2) * 0.06;

        const gradient = ctx.createRadialGradient(finalX, finalY, 0, finalX, finalY, aurora.radius);
        gradient.addColorStop(0, `rgba(${aurora.color}, ${aurora.alpha})`);
        gradient.addColorStop(0.4, `rgba(${aurora.color}, ${aurora.alpha * 0.35})`);
        gradient.addColorStop(1, `rgba(${aurora.color}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      // Cursor halo
      if (mouse.active) {
        const cursorGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 300);
        cursorGlow.addColorStop(0, 'rgba(168, 85, 247, 0.14)');
        cursorGlow.addColorStop(0.4, 'rgba(139, 92, 246, 0.05)');
        cursorGlow.addColorStop(1, 'rgba(168, 85, 247, 0)');
        ctx.fillStyle = cursorGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // Stardust
      stars.forEach((star) => {
        star.y -= star.speedY;
        star.x += star.speedX;
        if (star.y < -10) star.y = height + 10;
        if (star.x < -10) star.x = width + 10;
        if (star.x > width + 10) star.x = -10;

        const alpha = star.baseAlpha + Math.sin(time * star.pulseSpeed + star.pulsePhase) * 0.22;
        const finalAlpha = Math.max(0.06, Math.min(0.9, alpha));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${finalAlpha})`;
        ctx.fill();

        if (star.size > 1.1) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${star.color}, ${finalAlpha * 0.15})`;
          ctx.fill();
        }
      });

      // Shooting stars
      if (shootingTimer > 60 + Math.random() * 100) {
        spawnShootingStar();
        shootingTimer = 0;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life += 1;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha = 1 - (s.life / s.maxLife);

        if (s.life >= s.maxLife) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, `rgba(192, 132, 252, 0)`);
        grad.addColorStop(0.7, `rgba(192, 132, 252, ${s.alpha * 0.4})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${s.alpha * 0.9})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha * 0.8})`;
        ctx.fill();
      }

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

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      if (touch) {
        mouse.targetX = touch.clientX;
        mouse.targetY = touch.clientY;
        mouse.active = true;
      }
    };

    const handleTouchEnd = () => {
      setTimeout(() => {
        mouse.active = false;
        mouse.targetX = width / 2;
        mouse.targetY = height / 2;
      }, 1500);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
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
