'use client';

import React, { useEffect, useRef, useState } from 'react';

interface TechNode {
  id: string;
  label: string;
  category: 'language' | 'framework' | 'infra' | 'db';
  angle: number;
  orbitRadius: number;
  speed: number;
  icon: string;
}

const TECH_NODES: TechNode[] = [
  { id: 'ts', label: 'TypeScript', category: 'language', angle: 0, orbitRadius: 200, speed: 0.4, icon: 'TS' },
  { id: 'ruby', label: 'Ruby', category: 'language', angle: 60, orbitRadius: 290, speed: 0.25, icon: '💎' },
  { id: 'python', label: 'Python', category: 'language', angle: 120, orbitRadius: 180, speed: 0.5, icon: '🐍' },
  { id: 'react', label: 'React', category: 'framework', angle: 180, orbitRadius: 260, speed: 0.35, icon: '⚛' },
  { id: 'rails', label: 'Ruby on Rails', category: 'framework', angle: 240, orbitRadius: 210, speed: 0.3, icon: '🛤' },
  { id: 'k8s', label: 'Kubernetes', category: 'infra', angle: 30, orbitRadius: 340, speed: 0.2, icon: '☸' },
  { id: 'docker', label: 'Docker', category: 'infra', angle: 150, orbitRadius: 310, speed: 0.28, icon: '🐳' },
  { id: 'pg', label: 'PostgreSQL', category: 'db', angle: 270, orbitRadius: 240, speed: 0.32, icon: '🐘' },
  { id: 'redis', label: 'Redis', category: 'db', angle: 315, orbitRadius: 320, speed: 0.22, icon: '⚡' },
  { id: 'gql', label: 'GraphQL', category: 'framework', angle: 90, orbitRadius: 370, speed: 0.18, icon: '◈' },
  { id: 'aws', label: 'AWS', category: 'infra', angle: 200, orbitRadius: 390, speed: 0.15, icon: '☁' },
  { id: 'grpc', label: 'gRPC', category: 'framework', angle: 330, orbitRadius: 230, speed: 0.38, icon: '⇄' },
];

const CATEGORY_COLORS: Record<string, string> = {
  language: 'rgba(0,229,255,1)',
  framework: 'rgba(0,229,255,0.7)',
  infra: 'rgba(0,229,255,0.5)',
  db: 'rgba(0,229,255,0.6)',
};

export default function TechConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const nodesRef = useRef(TECH_NODES.map(n => ({ ...n })));
  const hoveredNodeRef = useRef<string | null>(null);
  const isMobileRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      isMobileRef.current = window.innerWidth < 768;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const getScale = () => {
      const W = canvas.offsetWidth;
      // Scale orbit radii to fit within canvas width on mobile
      // Base design assumes ~800px wide canvas; scale down proportionally
      return Math.min(1, W / 820);
    };

    const draw = (timestamp: number) => {
      const dt = (timestamp - timeRef.current) / 1000;
      timeRef.current = timestamp;

      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      const cx = W / 2;
      const cy = H / 2;
      const scale = getScale();

      ctx.clearRect(0, 0, W, H);

      // Update node positions
      nodesRef.current.forEach(node => {
        node.angle += node.speed * dt * 15;
      });

      const positions: Record<string, { x: number; y: number }> = {};
      nodesRef.current.forEach(node => {
        const rad = (node.angle * Math.PI) / 180;
        positions[node.id] = {
          x: cx + Math.cos(rad) * node.orbitRadius * scale,
          y: cy + Math.sin(rad) * node.orbitRadius * scale * 0.55,
        };
      });

      // Draw orbit rings
      [180, 260, 320, 370, 400].forEach((r, i) => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, r * scale, r * scale * 0.55, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,229,255,${0.04 - i * 0.005})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Draw connection lines between related nodes
      const connections = [
        ['ts', 'react'], ['ts', 'rails'], ['react', 'rails'],
        ['ruby', 'grpc'], ['ruby', 'k8s'], ['k8s', 'docker'],
        ['pg', 'redis'], ['gql', 'react'], ['aws', 'k8s'],
        ['python', 'grpc'],
      ];
      connections.forEach(([a, b]) => {
        const pa = positions[a];
        const pb = positions[b];
        if (!pa || !pb) return;
        const dist = Math.hypot(pa.x - pb.x, pa.y - pb.y);
        const alpha = Math.max(0, 0.12 - dist / 800);
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = `rgba(0,229,255,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Center node — scale radius too
      const centerR = Math.max(20, 36 * scale);
      ctx.beginPath();
      ctx.arc(cx, cy, centerR, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,229,255,0.08)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,229,255,0.6)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = 'rgba(0,229,255,0.9)';
      ctx.font = `bold ${Math.max(12, 20 * scale)}px JetBrains Mono`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('SB', cx, cy);

      // Draw tech nodes
      const nodeR = isMobileRef.current ? 14 : 20;
      const nodeRHovered = isMobileRef.current ? 18 : 28;

      nodesRef.current.forEach(node => {
        const pos = positions[node.id];
        const isHovered = hoveredNodeRef.current === node.id;
        const color = CATEGORY_COLORS[node.category];
        const r = isHovered ? nodeRHovered : nodeR;

        // Glow
        if (isHovered) {
          const glowR = r * 2;
          const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, glowR);
          gradient.addColorStop(0, 'rgba(0,229,255,0.2)');
          gradient.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? 'rgba(0,229,255,0.15)' : 'rgba(11,13,15,0.9)';
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.stroke();

        // Icon
        ctx.fillStyle = color;
        const iconSize = isMobileRef.current ? (isHovered ? 11 : 10) : (isHovered ? 16 : 14);
        ctx.font = `${iconSize}px JetBrains Mono`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.icon, pos.x, pos.y);

        // Label — hide on mobile unless hovered to reduce clutter
        if (!isMobileRef.current || isHovered) {
          ctx.fillStyle = isHovered ? 'rgba(0,229,255,0.9)' : 'rgba(122,132,144,0.7)';
          const labelSize = isMobileRef.current ? 9 : (isHovered ? 14 : 11);
          ctx.font = `${labelSize}px Manrope`;
          ctx.textAlign = 'center';
          ctx.fillText(node.label, pos.x, pos.y + r + (isMobileRef.current ? 10 : 14));
        }
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [isVisible]);

  const getNodeAtPoint = (mx: number, my: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const scale = Math.min(1, canvas.offsetWidth / 820);
    const cx = canvas.offsetWidth / 2;
    const cy = canvas.offsetHeight / 2;
    const hitRadius = isMobileRef.current ? 28 : 24;

    let found: string | null = null;
    nodesRef.current.forEach(node => {
      const rad = (node.angle * Math.PI) / 180;
      const nx = cx + Math.cos(rad) * node.orbitRadius * scale;
      const ny = cy + Math.sin(rad) * node.orbitRadius * scale * 0.55;
      if (Math.hypot(mx - nx, my - ny) < hitRadius) found = node.id;
    });
    return found;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    let found = getNodeAtPoint(mx, my);
    hoveredNodeRef.current = found;
    setHoveredNode(found);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const mx = touch.clientX - rect.left;
    const my = touch.clientY - rect.top;
    let found = getNodeAtPoint(mx, my);
    hoveredNodeRef.current = found;
    setHoveredNode(found);
  };

  const handleTouchEnd = () => {
    // Keep tooltip visible briefly then clear
    setTimeout(() => {
      hoveredNodeRef.current = null;
      setHoveredNode(null);
    }, 1500);
  };

  return (
    <section
      ref={sectionRef}
      className="snap-section relative flex flex-col overflow-hidden"
      style={{ minHeight: '100dvh', background: 'var(--void)' }}
      id="stack"
    >
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />

      {/* Section label */}
      <div className="relative z-10 pt-20 md:pt-24 px-4 md:px-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs" style={{ color: 'var(--electric)' }}>
            01 /
          </span>
          <span
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: 'rgba(122,132,144,0.6)' }}
          >
            Tech Stack
          </span>
        </div>
        <h2
          className="font-sans font-800 text-2xl md:text-4xl mb-2"
          style={{ color: 'var(--chromium-light)', letterSpacing: '-0.02em' }}
        >
          The Constellation
        </h2>
        <p className="font-mono text-xs md:text-sm max-w-md" style={{ color: 'var(--chromium)' }}>
          Languages, frameworks, and infrastructure that form the operating surface. Each node is a tool used in production.
        </p>
      </div>

      {/* Canvas */}
      <div className="relative flex-1 flex items-center justify-center min-h-0">
        <canvas
          ref={canvasRef}
          className="w-full"
          style={{ height: 'clamp(400px, 80vw, 840px)', maxHeight: '80vh', touchAction: 'none' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { hoveredNodeRef.current = null; setHoveredNode(null); }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-label="Interactive tech stack constellation diagram"
        />
      </div>

      {/* Legend */}
      <div className="relative z-10 px-4 md:px-16 pb-8 md:pb-16 flex flex-wrap gap-4 md:gap-6">
        {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: color }}
            />
            <span
              className="font-mono text-xs capitalize"
              style={{ color: 'rgba(122,132,144,0.6)' }}
            >
              {cat}
            </span>
          </div>
        ))}
      </div>

      {/* Hover tooltip */}
      {hoveredNode && (
        <div
          className="absolute top-20 right-4 md:top-24 md:right-8 terminal-card p-4 font-mono text-xs pointer-events-none z-20"
          style={{ minWidth: '140px', maxWidth: '180px' }}
        >
          <div className="terminal-header" style={{ padding: '6px 10px' }}>
            <div className="terminal-dot" style={{ background: '#FF5F57' }} />
            <div className="terminal-dot" style={{ background: '#FEBC2E' }} />
            <div className="terminal-dot" style={{ background: '#28C840' }} />
          </div>
          <div className="p-3">
            <div style={{ color: 'var(--electric)' }}>
              {TECH_NODES.find(n => n.id === hoveredNode)?.label}
            </div>
            <div style={{ color: 'var(--chromium)' }} className="mt-1">
              category: {TECH_NODES.find(n => n.id === hoveredNode)?.category}
            </div>
            <div style={{ color: 'rgba(122,132,144,0.5)' }} className="mt-1">
              status: production
            </div>
          </div>
        </div>
      )}
    </section>
  );
}