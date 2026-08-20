import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationId;
    let isVisible = true;

    // Detect mobile vs desktop - cap DPR at 1.5 for crisp retina display with low fill-rate load
    const isMobile = window.innerWidth <= 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.2 : 1.5);

    let width = window.innerWidth;
    let height = window.innerHeight;

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setSize, 120);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    let lastTime = 0;

    // Handle tab visibility to pause when inactive and reset clock smoothly
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Mouse tracking with smooth exponential decay
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2, active: false };

    // Sparkling stardust particles
    const starCount = isMobile ? 22 : 48;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.4 + 0.35,
      speedY: Math.random() * 0.15 + 0.04,
      speedX: (Math.random() - 0.5) * 0.05,
      baseAlpha: Math.random() * 0.35 + 0.15,
      pulseSpeed: Math.random() * 0.015 + 0.005,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    // Meteors / Shooting Stars
    const shootingStars = [];
    const maxShootingStars = isMobile ? 3 : 5;

    const spawnShootingStar = () => {
      if (shootingStars.length >= maxShootingStars) return;

      const startX = Math.random() * (width * 1.2) - (width * 0.1);
      const startY = Math.random() * (height * 0.35);
      const angle = (Math.PI / 6) + (Math.random() * 0.35);
      const speed = isMobile ? (Math.random() * 5 + 4) : (Math.random() * 7 + 5);
      const length = Math.random() * 130 + 70;

      shootingStars.push({
        x: startX,
        y: startY,
        length,
        speed,
        angle,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        alpha: 1,
        life: 0,
        maxLife: Math.random() * 45 + 35,
        thickness: Math.random() * 1.4 + 1.2,
      });
    };

    let shootingTimer = 0;
    let time = 0;
    const spawnThreshold = isMobile ? 70 : 42;

    const render = (now) => {
      if (!isVisible) {
        animationId = requestAnimationFrame(render);
        return;
      }

      if (!lastTime) lastTime = now;
      const dt = Math.min((now - lastTime) / 16.667, 2);
      lastTime = now;
      time += dt;
      shootingTimer += dt;

      ctx.clearRect(0, 0, width, height);

      // Smooth frame-rate independent mouse interpolation
      if (!isMobile && mouse.active) {
        const factor = 1 - Math.exp(-0.06 * dt);
        mouse.x += (mouse.targetX - mouse.x) * factor;
        mouse.y += (mouse.targetY - mouse.y) * factor;

        // Ambient cursor highlight
        const cursorGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
        cursorGlow.addColorStop(0, 'rgba(255, 255, 255, 0.035)');
        cursorGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = cursorGlow;
        ctx.fillRect(mouse.x - 220, mouse.y - 220, 440, 440);
      }

      // 1. Stardust Particles (High-throughput render)
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.y -= star.speedY * dt;
        star.x += star.speedX * dt;

        if (star.y < -10) star.y = height + 10;
        if (star.x < -10) star.x = width + 10;
        if (star.x > width + 10) star.x = -10;

        const pulse = Math.sin(time * star.pulseSpeed + star.pulsePhase) * 0.18;
        const alpha = Math.max(0.08, Math.min(0.85, star.baseAlpha + pulse));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 240, 240, ${alpha})`;
        ctx.fill();
      }

      // 2. Meteors / Shooting Stars
      if (shootingTimer > spawnThreshold + Math.random() * 80) {
        spawnShootingStar();
        shootingTimer = 0;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life += dt;
        s.x += s.dx * dt;
        s.y += s.dy * dt;
        s.alpha = Math.max(0, 1 - (s.life / s.maxLife));

        if (s.life >= s.maxLife || s.x > width + 150 || s.y > height + 150) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        // Meteor Trail Gradient
        const trailGrad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        trailGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        trailGrad.addColorStop(0.6, `rgba(210, 210, 210, ${s.alpha * 0.3})`);
        trailGrad.addColorStop(0.9, `rgba(245, 245, 245, ${s.alpha * 0.75})`);
        trailGrad.addColorStop(1, `rgba(255, 255, 255, ${s.alpha * 0.95})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = s.thickness;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Glowing Meteor Head
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.thickness * 1.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha * 0.95})`;
        ctx.fill();

        // Luminous Head Glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.thickness * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha * 0.2})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

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

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
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
        transform: 'translateZ(0)',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
      }}
    />
  );
}
