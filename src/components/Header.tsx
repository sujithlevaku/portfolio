'use client';

import React, { useEffect, useState } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/5 bg-void/90 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-sm font-700 tracking-tight"
            style={{ color: 'var(--electric)' }}
          >
            sujith.dev
          </span>
          <span
            className="font-mono text-xs px-2 py-0.5 rounded-sm border hidden sm:inline"
            style={{
              color: 'var(--electric)',
              borderColor: 'rgba(0,229,255,0.3)',
              background: 'rgba(0,229,255,0.08)',
            }}
          >
            open to work
          </span>
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-4 md:gap-6">
          {[
            { label: 'Experience', href: '#architecture' },
            { label: 'Skills', href: '#stack' },
            { label: 'Contact', href: '#contact' },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-xs tracking-widest uppercase transition-colors duration-200 hidden sm:block"
              style={{ color: 'var(--chromium)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--electric)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--chromium)')}
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:sujithlevaku@gmail.com"
            className="font-mono text-xs px-4 py-2 rounded-sm border transition-all duration-200 flex items-center gap-2"
            style={{
              color: 'var(--electric)',
              borderColor: 'rgba(0,229,255,0.4)',
              background: 'rgba(0,229,255,0.05)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'rgba(0,229,255,0.12)';
              el.style.boxShadow = '0 0 16px rgba(0,229,255,0.2)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = 'rgba(0,229,255,0.05)';
              el.style.boxShadow = 'none';
            }}
          >
            Hire Me
          </a>
        </div>
      </nav>
    </header>
  );
}