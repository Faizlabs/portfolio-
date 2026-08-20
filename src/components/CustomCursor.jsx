import { useEffect, useRef } from 'react';
import './CustomCursor.css';

const TRAIL_COUNT = 4;
const TRAIL_DECAY = 0.88;

export default function CustomCursor() {
  const cursorWrapperRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRefs = useRef([]);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const trailPositions = useRef(Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 })));
  const rafRef = useRef(null);
  const lastState = useRef('');

  useEffect(() => {
    // Only run on devices with fine pointer (mouse)
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    const wrapper = cursorWrapperRef.current;
    if (!wrapper) return;

    let moveThrottle = false;

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!moveThrottle) {
        moveThrottle = true;
        requestAnimationFrame(() => {
          const target = document.elementFromPoint(mousePos.current.x, mousePos.current.y);
          if (target) {
            let newState = '';
            const tag = target.tagName?.toLowerCase();
            if (tag === 'input' || tag === 'textarea') {
              newState = 'cursor--text';
            } else if (
              ['a', 'button', 'select', 'label'].includes(tag) ||
              target.getAttribute('role') === 'button' ||
              target.closest('a, button, [role="button"], .glass-hover, .btn, .projects__card, .skills__item, .navbar__link, .footer__social')
            ) {
              newState = 'cursor--hover';
            }

            if (newState !== lastState.current) {
              lastState.current = newState;
              wrapper.className = `custom-cursor ${newState}`;
            }
          }
          moveThrottle = false;
        });
      }
    };

    const handleMouseDown = () => {
      if (wrapper) {
        wrapper.classList.add('cursor--click');
      }
    };

    const handleMouseUp = () => {
      if (wrapper) {
        wrapper.classList.remove('cursor--click');
      }
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: -100, y: -100 };
    };

    // Hardware-accelerated GPU animation loop using translate3d
    const animate = () => {
      // Dot follows instantly with translate3d
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Ring follows with smooth lerp
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Trail particles with GPU transforms
      for (let i = TRAIL_COUNT - 1; i > 0; i--) {
        trailPositions.current[i].x += (trailPositions.current[i - 1].x - trailPositions.current[i].x) * (TRAIL_DECAY - i * 0.06);
        trailPositions.current[i].y += (trailPositions.current[i - 1].y - trailPositions.current[i].y) * (TRAIL_DECAY - i * 0.06);
      }
      trailPositions.current[0].x += (mousePos.current.x - trailPositions.current[0].x) * 0.35;
      trailPositions.current[0].y += (mousePos.current.y - trailPositions.current[0].y) * 0.35;

      for (let i = 0; i < TRAIL_COUNT; i++) {
        const ref = trailRefs.current[i];
        if (ref) {
          ref.style.transform = `translate3d(${trailPositions.current[i].x}px, ${trailPositions.current[i].y}px, 0) translate(-50%, -50%)`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="custom-cursor" ref={cursorWrapperRef}>
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={`trail-${i}`}
          className="cursor__trail"
          ref={(el) => { trailRefs.current[i] = el; }}
        />
      ))}
      <div className="cursor__ring" ref={ringRef} />
      <div className="cursor__dot" ref={dotRef} />
    </div>
  );
}
