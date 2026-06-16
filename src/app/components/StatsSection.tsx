'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Stat {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  decimals?: number;
  description: string;
}

const STATS: Stat[] = [
  {
    label: 'Years Experience',
    value: 7,
    suffix: '+',
    description: 'Full-stack web development across startups and enterprise environments',
  },
  {
    label: 'Companies',
    value: 5,
    suffix: '',
    description: 'Nucleus, Appen AI, Techigai, Techaffinity, Tesark Technologies',
  },
  {
    label: 'Projects Shipped',
    value: 10,
    suffix: '+',
    description: 'Production SaaS, AI, and enterprise platforms delivered end-to-end',
  },
  {
    label: 'Tech Stack',
    value: 20,
    suffix: '+',
    description: 'Languages, frameworks, databases, cloud tools, and integrations',
  },
];

const SKILL_GROUPS = [
  {
    label: 'Languages',
    skills: ['Ruby', 'JavaScript', 'Python', 'HTML5', 'CSS3'],
  },
  {
    label: 'Frameworks',
    skills: ['Ruby on Rails', 'React', 'Bootstrap', 'jQuery', 'AJAX'],
  },
  {
    label: 'Databases',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Elasticsearch'],
  },
  {
    label: 'Cloud & DevOps',
    skills: ['AWS EC2', 'AWS S3', 'CloudFront', 'Docker', 'GitHub Actions'],
  },
  {
    label: 'Integrations',
    skills: ['Razorpay', 'SendGrid', 'Twilio', 'Jira API', 'Google Sheets API'],
  },
  {
    label: 'Tools',
    skills: ['Git', 'Figma', 'Bitbucket', 'Balsamiq', 'GitHub'],
  },
];

function useCountUp(target: number, duration: number, decimals = 0, active: boolean) {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    startRef.current = performance.now();
    const step = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target, duration, decimals]);

  return current;
}

function StatCard({ stat, active, index }: { stat: Stat; active: boolean; index: number }) {
  const value = useCountUp(stat.value, 2000 + index * 300, stat.decimals || 0, active);

  return (
    <div
      className="terminal-card p-6 flex flex-col gap-3"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.6s ${index * 0.1}s ease, transform 0.6s ${index * 0.1}s cubic-bezier(0.22,1,0.36,1)`,
      }}
    >
      <div
        className="font-mono text-xs uppercase tracking-widest"
        style={{ color: 'rgba(122,132,144,0.5)' }}
      >
        {stat.label}
      </div>
      <div
        className="font-mono counter-num"
        style={{
          color: 'var(--electric)',
          fontSize: '2.5rem',
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: '-0.04em',
        }}
      >
        {stat.prefix || ''}
        {value.toLocaleString('en-US', {
          minimumFractionDigits: stat.decimals || 0,
          maximumFractionDigits: stat.decimals || 0,
        })}
        {stat.suffix}
      </div>
      <div className="font-sans text-xs leading-relaxed" style={{ color: 'var(--chromium)' }}>
        {stat.description}
      </div>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      ref={sectionRef}
      className="snap-section relative flex flex-col overflow-hidden"
      style={{ minHeight: '100dvh', background: 'var(--void)' }}
      id="stack"
    >
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />

      {/* Header */}
      <div className="relative z-10 pt-24 px-6 md:px-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs" style={{ color: 'var(--electric)' }}>
            03 /
          </span>
          <span
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: 'rgba(122,132,144,0.6)' }}
          >
            Skills & Stats
          </span>
        </div>
        <h2
          className="font-sans font-800 text-3xl md:text-4xl mb-2"
          style={{ color: 'var(--chromium-light)', letterSpacing: '-0.02em' }}
        >
          Technical Stack
        </h2>
        <p className="font-mono text-sm max-w-lg" style={{ color: 'var(--chromium)' }}>
          7 years of hands-on experience across the full stack — from Rails APIs to React UIs to AWS
          deployments.
        </p>
      </div>

      {/* Stats grid */}
      <div className="relative z-10 px-6 md:px-16 mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} active={isVisible} index={i} />
        ))}
      </div>

      {/* Skills grid */}
      <div className="relative z-10 px-6 md:px-16 mt-6 pb-8">
        <div className="terminal-card">
          <div className="terminal-header">
            <div className="terminal-dot" style={{ background: '#FF5F57' }} />
            <div className="terminal-dot" style={{ background: '#FEBC2E' }} />
            <div className="terminal-dot" style={{ background: '#28C840' }} />
            <span className="font-mono text-xs ml-2" style={{ color: 'var(--chromium)' }}>
              skills.json
            </span>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SKILL_GROUPS.map((group, gi) => (
                <div
                  key={group.label}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
                    transition: `opacity 0.5s ${gi * 0.08}s ease, transform 0.5s ${gi * 0.08}s ease`,
                  }}
                >
                  <div
                    className="font-mono text-xs uppercase tracking-widest mb-3"
                    style={{ color: 'var(--electric)' }}
                  >
                    {group.label}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-xs px-2.5 py-1 rounded-sm border"
                        style={{
                          color: 'var(--chromium-light)',
                          borderColor: 'rgba(122,132,144,0.2)',
                          background: 'rgba(122,132,144,0.05)',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
