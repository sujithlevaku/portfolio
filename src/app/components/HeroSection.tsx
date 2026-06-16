'use client';

import React, { useEffect, useRef, useState } from 'react';

const HEADLINE = 'Senior Full Stack Developer with 7+ years building web applications.';
const SUBLINE = 'Ruby on Rails · React · PostgreSQL · AWS · Toronto, ON';

export default function HeroSection() {
  const [typedHeadline, setTypedHeadline] = useState('');
  const [typedSub, setTypedSub] = useState('');
  const [assembleStep, setAssembleStep] = useState(0);
  const headlineRef = useRef(0);
  const subRef = useRef(0);

  useEffect(() => {
    const steps = [400, 800, 1200, 1600, 2000, 2400, 2800, 3200];
    steps.forEach((delay, i) => {
      setTimeout(() => setAssembleStep(i + 1), delay);
    });

    const headlineTimer = setTimeout(() => {
      const interval = setInterval(() => {
        headlineRef.current += 1;
        setTypedHeadline(HEADLINE.slice(0, headlineRef.current));
        if (headlineRef.current >= HEADLINE.length) {
          clearInterval(interval);
          const subInterval = setInterval(() => {
            subRef.current += 1;
            setTypedSub(SUBLINE.slice(0, subRef.current));
            if (subRef.current >= SUBLINE.length) clearInterval(subInterval);
          }, 22);
        }
      }, 40);
    }, 3400);

    return () => clearTimeout(headlineTimer);
  }, []);

  return (
    <section
      className="snap-section relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: '100dvh', background: 'var(--void)' }}
      id="hero"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-100" aria-hidden="true" />

      {/* Isometric workspace illustration */}
      <IsometricWorkspace assembleStep={assembleStep} />

      {/* Text content */}
      <div className="relative z-10 text-center px-4 md:px-6 max-w-4xl mx-auto mt-4 md:mt-8 w-full">
        {/* Name badge */}
        <div
          className="inline-flex items-center gap-2 mb-6 md:mb-8 px-3 md:px-4 py-2 rounded-sm border font-mono text-xs"
          style={{
            background: 'rgba(0,229,255,0.06)',
            borderColor: 'rgba(0,229,255,0.2)',
            color: 'var(--electric)',
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-electric-pulse shrink-0"
            style={{ background: 'var(--electric)' }}
          />
          SUJITH REDDY · OPEN TO OPPORTUNITIES
          <span className="opacity-50 ml-1 md:ml-2">[ Toronto, ON ]</span>
        </div>

        {/* Headline */}
        <h1
          className="font-sans font-800 text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight mb-4 md:mb-6"
          style={{ color: 'var(--chromium-light)', letterSpacing: '-0.02em' }}
        >
          {typedHeadline || '\u00A0'}
          {typedHeadline.length < HEADLINE.length && (
            <span className="animate-blink text-electric">▋</span>
          )}
          {typedHeadline.length >= HEADLINE.length && typedSub.length < SUBLINE.length && (
            <span className="animate-blink text-electric" style={{ fontSize: '0.5em' }}>
              ▋
            </span>
          )}
        </h1>

        {/* Sub */}
        <p
          className="font-mono text-xs sm:text-sm md:text-base mb-8 md:mb-10 min-h-[1.5em] px-2 md:px-0"
          style={{ color: 'var(--chromium)' }}
        >
          {typedSub}
          {typedSub.length > 0 && typedSub.length < SUBLINE.length && (
            <span className="animate-blink text-electric">_</span>
          )}
        </p>

        {/* CTAs */}
        {typedSub.length >= SUBLINE.length && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 animate-fade-up px-2 md:px-0">
            <a
              href="#contact"
              className="btn-shimmer font-mono text-xs md:text-sm px-6 md:px-8 py-3 rounded-sm tracking-wider uppercase w-full sm:w-auto text-center"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Get In Touch
            </a>
            <a
              href="https://linkedin.com/in/sujith-kumar-reddy-levaku"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs md:text-sm px-6 md:px-8 py-3 rounded-sm border flex items-center justify-center gap-2 transition-all duration-200 w-full sm:w-auto"
              style={{
                color: 'var(--chromium-light)',
                borderColor: 'rgba(122,132,144,0.3)',
                background: 'transparent',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(0,229,255,0.4)';
                el.style.color = 'var(--electric)';
                el.style.background = 'rgba(0,229,255,0.05)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(122,132,144,0.3)';
                el.style.color = 'var(--chromium-light)';
                el.style.background = 'transparent';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              View LinkedIn
            </a>
          </div>
        )}

        {/* Scroll hint */}
        <div
          className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-xs"
          style={{ color: 'rgba(122,132,144,0.4)', zIndex: 10 }}
        >
          <span>scroll to explore</span>
          <div
            className="w-px h-6 md:h-8"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,229,255,0.4), transparent)',
            }}
          />
        </div>
      </div>
    </section>
  );
}

function IsometricWorkspace({ assembleStep }: { assembleStep: number }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      <svg
        width="900"
        height="520"
        viewBox="0 0 900 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-10 md:opacity-20 w-full max-w-full h-auto"
        style={{ filter: 'blur(0.5px)', maxHeight: '60vw' }}
      >
        {assembleStep >= 1 && (
          <g style={{ animation: 'assemble-piece 0.6s cubic-bezier(0.22,1,0.36,1) forwards' }}>
            <rect
              x="300"
              y="120"
              width="300"
              height="200"
              rx="4"
              stroke="#00E5FF"
              strokeWidth="1.5"
              fill="rgba(0,229,255,0.03)"
            />
            <rect
              x="312"
              y="132"
              width="276"
              height="176"
              rx="2"
              stroke="#00E5FF"
              strokeWidth="0.8"
              fill="rgba(0,229,255,0.02)"
            />
            <line x1="450" y1="320" x2="450" y2="355" stroke="#00E5FF" strokeWidth="1.5" />
            <line x1="410" y1="355" x2="490" y2="355" stroke="#00E5FF" strokeWidth="1.5" />
          </g>
        )}
        {assembleStep >= 2 && (
          <g>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <g
                key={i}
                style={{
                  animation: `assemble-piece 0.4s ${i * 0.08}s cubic-bezier(0.22,1,0.36,1) forwards`,
                  opacity: 0,
                }}
              >
                <rect
                  x={322}
                  y={145 + i * 20}
                  width={40 + (i % 3) * 30 + (i % 2) * 20}
                  height="3"
                  rx="1.5"
                  fill={i % 4 === 0 ? '#00E5FF' : 'rgba(0,229,255,0.3)'}
                  opacity={0.6 + (i % 3) * 0.1}
                />
                {i % 2 === 0 && (
                  <rect
                    x={322 + 50 + (i % 3) * 30}
                    y={145 + i * 20}
                    width={20 + (i % 2) * 15}
                    height="3"
                    rx="1.5"
                    fill="rgba(0,229,255,0.2)"
                  />
                )}
              </g>
            ))}
          </g>
        )}
        {assembleStep >= 3 && (
          <g>
            <line
              x1="150"
              y1="200"
              x2="280"
              y2="200"
              stroke="rgba(0,229,255,0.4)"
              strokeWidth="1"
              strokeDasharray="200"
              style={{ animation: 'commit-connect 0.8s ease forwards' }}
            />
            {[150, 190, 230, 270].map((x, i) => (
              <g
                key={x}
                style={{ animation: `assemble-piece 0.3s ${i * 0.1}s forwards`, opacity: 0 }}
              >
                <circle
                  cx={x}
                  cy="200"
                  r="5"
                  fill="var(--void)"
                  stroke="#00E5FF"
                  strokeWidth="1.5"
                />
                <circle cx={x} cy="200" r="2" fill="#00E5FF" />
              </g>
            ))}
            <path
              d="M190 200 Q190 170 220 160 L260 160"
              stroke="rgba(0,229,255,0.3)"
              strokeWidth="1"
              strokeDasharray="100"
              style={{ animation: 'commit-connect 0.6s 0.4s ease forwards', opacity: 0 }}
            />
            <circle
              cx="260"
              cy="160"
              r="4"
              fill="var(--void)"
              stroke="rgba(0,229,255,0.6)"
              strokeWidth="1.5"
              style={{ animation: 'assemble-piece 0.3s 0.5s forwards', opacity: 0 }}
            />
            <text
              x="148"
              y="220"
              fontFamily="JetBrains Mono"
              fontSize="8"
              fill="rgba(0,229,255,0.4)"
            >
              init
            </text>
            <text
              x="255"
              y="220"
              fontFamily="JetBrains Mono"
              fontSize="8"
              fill="rgba(0,229,255,0.4)"
            >
              HEAD
            </text>
          </g>
        )}
        {assembleStep >= 4 && (
          <g style={{ animation: 'assemble-piece 0.5s 0.1s forwards', opacity: 0 }}>
            <rect
              x="360"
              y="375"
              width="180"
              height="60"
              rx="4"
              stroke="rgba(0,229,255,0.3)"
              strokeWidth="1"
              fill="rgba(0,229,255,0.02)"
            />
            {[0, 1, 2, 3].map((row) =>
              [0, 1, 2, 3, 4, 5, 6].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={368 + col * 24}
                  y={381 + row * 12}
                  width="20"
                  height="9"
                  rx="2"
                  stroke="rgba(0,229,255,0.15)"
                  strokeWidth="0.5"
                  fill="rgba(0,229,255,0.02)"
                />
              ))
            )}
          </g>
        )}
        {assembleStep >= 5 && (
          <g>
            {[
              { x: 680, y: 140, label: 'Rails API' },
              { x: 750, y: 200, label: 'PostgreSQL' },
              { x: 680, y: 260, label: 'React' },
            ].map((item, i) => (
              <g
                key={item.label}
                style={{ animation: `assemble-piece 0.4s ${i * 0.15}s forwards`, opacity: 0 }}
              >
                <rect
                  x={item.x - 35}
                  y={item.y - 14}
                  width="70"
                  height="28"
                  rx="3"
                  stroke="rgba(0,229,255,0.3)"
                  strokeWidth="1"
                  fill="rgba(0,229,255,0.04)"
                />
                <text
                  x={item.x}
                  y={item.y + 4}
                  textAnchor="middle"
                  fontFamily="JetBrains Mono"
                  fontSize="8"
                  fill="rgba(0,229,255,0.6)"
                >
                  {item.label}
                </text>
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
