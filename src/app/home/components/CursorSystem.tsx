'use client';

import React, { useEffect, useRef } from 'react';

export default function CursorSystem() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const TRAIL_COUNT = 8;
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9997;';
    document.body.appendChild(container);

    // Create trail dots
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const trail = document.createElement('div');
      const size = 3 - (i / TRAIL_COUNT) * 2;
      const opacity = 0.5 - (i / TRAIL_COUNT) * 0.45;
      trail.style.cssText = `
        position:fixed;top:0;left:0;
        width:${size}px;height:${size}px;
        border-radius:50%;
        background:var(--electric);
        pointer-events:none;
        transform:translate(-50%,-50%);
        opacity:${opacity};
        transition:transform ${0.04 + i * 0.015}s ease;
      `;
      container.appendChild(trail);
      trailsRef.current.push(trail);
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        dotRef.current.style.left = '0';
        dotRef.current.style.top = '0';
      }
      trailsRef.current.forEach((trail, i) => {
        setTimeout(() => {
          trail.style.transform = `translate(${e.clientX - 50}%, ${e.clientY - 50}%)`;
          trail.style.left = `${e.clientX}px`;
          trail.style.top = `${e.clientY}px`;
        }, i * 20);
      });
    };

    const animate = () => {
      // Smooth ring follow
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onMouseEnterInteractive = () => ringRef.current?.classList.add('hovering');
    const onMouseLeaveInteractive = () => ringRef.current?.classList.remove('hovering');

    document.addEventListener('mousemove', onMouseMove);
    document.querySelectorAll('a, button, [role="button"], input, select').forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
      document.body.removeChild(container);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0 }} />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0 }} />
    </>
  );
}