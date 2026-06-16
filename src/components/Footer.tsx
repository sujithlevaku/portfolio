'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs" style={{ color: 'rgba(122,132,144,0.5)' }}>
          © 2026 Sujith Reddy. Senior Full Stack Developer · Toronto, ON
        </p>
        <div className="flex items-center gap-6">
          {[
            { label: 'GitHub', href: 'https://github.com/sujithlevaku' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/sujith-kumar-reddy-levaku' },
            { label: 'Email', href: 'mailto:sujithlevaku@gmail.com' },
          ]?.map((link) => (
            <a
              key={link?.label}
              href={link?.href}
              target={link?.href?.startsWith('http') ? '_blank' : undefined}
              rel={link?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="font-mono text-xs transition-colors duration-200"
              style={{ color: 'rgba(122,132,144,0.5)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--electric)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(122,132,144,0.5)')}
            >
              {link?.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
