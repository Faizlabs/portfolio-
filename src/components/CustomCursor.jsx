import { useEffect, useRef, useState, useCallback } from 'react';
import './CustomCursor.css';

const TRAIL_COUNT = 6;
const TRAIL_DECAY = 0.92;

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRefs = useRef([]);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const trailPositions = useRef(Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 })));
  const rafRef = useRef(null);
  const [cursorState, setCursorState] = useState('');

  const isInteractive = useCallback((el) => {
    if (!el) return false;
    const tag = el.tagName?.toLowerCase();
    if (['a', 'button', 'select', 'label'].includes(tag)) return true;
    if (el.getAttribute('role') === 'button') return true;
    if (el.closest('a, button, [role="button"]')) return true;
    if (el.classList?.contains('glass-hover')) return true;
    if (el.classList?.contains('btn')) return true;
    if (el.classList?.contains('projects__card')) return true;
    if (el.classList?.contains('skills__item')) return true;
    if (el.classList?.contains('navbar__link')) return true;
    if (el.classList?.contains('footer__social')) return true;
    return false;
  }, []);

  const isTextInput = useCallback((el) => {
    if (!el) return false;
    const tag = el.tagName?.toLowerCase();
    return tag === 'input' || tag === 'textarea';
  }, []);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';
    document.querySelectorAll('a, button, input, textarea, select, [role="button"]').forEach(el => {
      el.style.cursor = 'none';
    });

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      const target = e.target;
      if (isTextInput(target)) {
        setCursorState('cursor--text');
      } else if (isInteractive(target)) {
        setCursorState('cursor--hover');
      } else {
        setCursorState('');
      }
    };

    const handleMouseDown = () => {
      setCursorState(prev => prev + ' cursor--click');
    };

    const handleMouseUp = () => {
      setCursorState(prev => prev.replace(' cursor--click', ''));
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: -100, y: -100 };
    };

    // Animation loop for smooth trailing
    const animate = () => {
      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.left = `${mousePos.current.x}px`;
        dotRef.current.style.top = `${mousePos.current.y}px`;
      }

      // Ring follows with smooth lerp
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }

      // Trail particles with staggered delay
      for (let i = TRAIL_COUNT - 1; i > 0; i--) {
        trailPositions.current[i].x += (trailPositions.current[i - 1].x - trailPositions.current[i].x) * (TRAIL_DECAY - i * 0.05);
        trailPositions.current[i].y += (trailPositions.current[i - 1].y - trailPositions.current[i].y) * (TRAIL_DECAY - i * 0.05);
      }
      trailPositions.current[0].x += (mousePos.current.x - trailPositions.current[0].x) * 0.3;
      trailPositions.current[0].y += (mousePos.current.y - trailPositions.current[0].y) * 0.3;

      trailRefs.current.forEach((ref, i) => {
        if (ref) {
          ref.style.left = `${trailPositions.current[i].x}px`;
          ref.style.top = `${trailPositions.current[i].y}px`;
          ref.style.opacity = `${0.4 - i * 0.06}`;
          ref.style.width = `${4 - i * 0.5}px`;
          ref.style.height = `${4 - i * 0.5}px`;
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    rafRef.current = requestAnimationFrame(animate);

    // Add cursor:none to dynamically added elements via MutationObserver
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, input, textarea, select, [role="button"]').forEach(el => {
        el.style.cursor = 'none';
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [isInteractive, isTextInput]);

  return (
    <div className={`custom-cursor ${cursorState}`}>
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
