'use client';

import React, { useState, useRef, useEffect } from 'react';

const EXPERIENCE = [
  {
    company: 'Speriti Solutions',
    role: 'Senior Full Stack Developer (Contractor)',
    period: '10/2024 – Present',
    location: 'Toronto, ON',
    current: true,
  },
  {
    company: 'Appen AI',
    role: 'Senior Full Stack Developer',
    period: '07/2023 – 09/2024',
    location: 'Hyderabad',
    current: false,
  },
  {
    company: 'Techigai',
    role: 'Senior Full Stack Developer',
    period: '08/2022 – 06/2023',
    location: 'Hyderabad',
    current: false,
  },
  {
    company: 'Techaffinity',
    role: 'Full Stack Developer',
    period: '02/2019 – 07/2022',
    location: 'Chennai',
    current: false,
  },
  {
    company: 'Tesark Technologies',
    role: 'Full Stack Developer',
    period: '05/2018 – 02/2019',
    location: 'Chennai',
    current: false,
  },
];

const CONTACT_LINKS = [
  {
    label: 'Email',
    value: 'sujithlevaku@gmail.com',
    href: 'mailto:sujithlevaku@gmail.com',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/sujith-kumar-reddy-levaku',
    href: 'https://linkedin.com/in/sujith-kumar-reddy-levaku',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/sujithlevaku',
    href: 'https://github.com/sujithlevaku',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '+1 (416) 994-3257',
    href: 'tel:+14169943257',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
];

export default function WaitlistSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [typedLines, setTypedLines] = useState<string[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const lines = [
      '$ whoami',
      '> Sujith Reddy — Senior Full Stack Developer',
      '> 7+ years · Ruby on Rails · React · AWS',
      '> Location: Toronto, ON · Open to opportunities',
      '$ contact --reach-out',
    ];
    lines.forEach((line, i) => {
      setTimeout(() => {
        setTypedLines((prev) => [...prev, line]);
      }, i * 400);
    });
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="snap-section relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: '100dvh', background: 'var(--void)' }}
      id="contact"
    >
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[200px] md:h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,229,255,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-6 py-16">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <span className="font-mono text-xs" style={{ color: 'var(--electric)' }}>
            04 /
          </span>
          <span
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: 'rgba(122,132,144,0.6)' }}
          >
            Contact & Experience
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left: Terminal + contact links */}
          <div>
            <div className="terminal-card mb-6">
              <div className="terminal-header">
                <div className="terminal-dot" style={{ background: '#FF5F57' }} />
                <div className="terminal-dot" style={{ background: '#FEBC2E' }} />
                <div className="terminal-dot" style={{ background: '#28C840' }} />
                <span className="font-mono text-xs ml-2" style={{ color: 'var(--chromium)' }}>
                  bash — 80×24
                </span>
              </div>
              <div className="p-4 md:p-5 min-h-[140px] md:min-h-[160px]">
                {typedLines.map((line, i) => (
                  <div
                    key={i}
                    className="font-mono text-xs leading-6"
                    style={{
                      color: line.startsWith('$')
                        ? 'var(--electric)'
                        : line.startsWith('>')
                          ? 'var(--chromium-light)'
                          : 'var(--chromium)',
                    }}
                  >
                    {line || '\u00A0'}
                  </div>
                ))}
                {typedLines.length < 5 && (
                  <span
                    className="font-mono text-xs animate-blink"
                    style={{ color: 'var(--electric)' }}
                  >
                    ▋
                  </span>
                )}
              </div>
            </div>

            <h2
              className="font-sans text-2xl md:text-4xl font-800 mb-4"
              style={{ color: 'var(--chromium-light)', letterSpacing: '-0.02em' }}
            >
              Let&apos;s build something
              <br />
              <span style={{ color: 'var(--electric)' }}>great together.</span>
            </h2>
            <p
              className="font-sans text-sm md:text-base leading-relaxed mb-6"
              style={{ color: 'var(--chromium)' }}
            >
              Senior Full Stack Developer based in Toronto, ON. Available for full-time roles,
              contracts, and consulting. Reach out via any channel below.
            </p>

            {/* Contact links */}
            <div className="flex flex-col gap-3">
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-3 font-mono text-sm px-4 py-3 rounded-sm border transition-all duration-200"
                  style={{
                    color: 'var(--chromium-light)',
                    borderColor: 'rgba(122,132,144,0.2)',
                    background: 'rgba(122,132,144,0.04)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(0,229,255,0.4)';
                    el.style.color = 'var(--electric)';
                    el.style.background = 'rgba(0,229,255,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = 'rgba(122,132,144,0.2)';
                    el.style.color = 'var(--chromium-light)';
                    el.style.background = 'rgba(122,132,144,0.04)';
                  }}
                >
                  <span style={{ color: 'var(--electric)' }}>{link.icon}</span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs" style={{ color: 'rgba(122,132,144,0.5)' }}>
                      {link.label}
                    </span>
                    <span className="text-xs truncate">{link.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Experience timeline */}
          <div>
            <div className="terminal-card">
              <div className="terminal-header">
                <div className="terminal-dot" style={{ background: '#FF5F57' }} />
                <div className="terminal-dot" style={{ background: '#FEBC2E' }} />
                <div className="terminal-dot" style={{ background: '#28C840' }} />
                <span className="font-mono text-xs ml-2" style={{ color: 'var(--chromium)' }}>
                  experience.log
                </span>
              </div>
              <div className="p-5 space-y-0">
                {EXPERIENCE.map((exp, i) => (
                  <div
                    key={exp.company}
                    className="relative flex gap-4"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0)' : 'translateX(12px)',
                      transition: `opacity 0.5s ${i * 0.1}s ease, transform 0.5s ${i * 0.1}s ease`,
                    }}
                  >
                    {/* Timeline line */}
                    <div className="flex flex-col items-center">
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0 mt-1"
                        style={{
                          background: exp.current ? 'var(--electric)' : 'rgba(122,132,144,0.3)',
                          boxShadow: exp.current ? '0 0 8px rgba(0,229,255,0.5)' : 'none',
                        }}
                      />
                      {i < EXPERIENCE.length - 1 && (
                        <div
                          className="w-px flex-1 my-1"
                          style={{ background: 'rgba(122,132,144,0.15)', minHeight: '24px' }}
                        />
                      )}
                    </div>
                    {/* Content */}
                    <div className="pb-5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="font-mono text-xs font-700"
                          style={{
                            color: exp.current ? 'var(--electric)' : 'var(--chromium-light)',
                          }}
                        >
                          {exp.company}
                        </span>
                        {exp.current && (
                          <span
                            className="font-mono text-xs px-1.5 py-0.5 rounded-sm"
                            style={{
                              background: 'rgba(0,229,255,0.1)',
                              color: 'var(--electric)',
                              border: '1px solid rgba(0,229,255,0.25)',
                            }}
                          >
                            current
                          </span>
                        )}
                      </div>
                      <div
                        className="font-sans text-xs mt-0.5"
                        style={{ color: 'var(--chromium)' }}
                      >
                        {exp.role}
                      </div>
                      <div
                        className="font-mono text-xs mt-0.5"
                        style={{ color: 'rgba(122,132,144,0.4)' }}
                      >
                        {exp.period} · {exp.location}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Education */}
                <div className="pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <div
                    className="font-mono text-xs uppercase tracking-widest mb-3"
                    style={{ color: 'rgba(122,132,144,0.4)' }}
                  >
                    Education
                  </div>
                  <div
                    className="font-mono text-xs font-700"
                    style={{ color: 'var(--chromium-light)' }}
                  >
                    Sathyabama University
                  </div>
                  <div className="font-sans text-xs mt-0.5" style={{ color: 'var(--chromium)' }}>
                    B.E. Computer Science Engineering
                  </div>
                  <div
                    className="font-mono text-xs mt-2 px-2 py-1 rounded-sm inline-block"
                    style={{
                      background: 'rgba(0,229,255,0.06)',
                      border: '1px solid rgba(0,229,255,0.2)',
                      color: 'var(--electric)',
                    }}
                  >
                    Certified: Ruby on Rails Development
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
