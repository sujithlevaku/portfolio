'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Project {
  name: string;
  description: string;
  tech: string[];
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

const PROJECTS: Project[] = [
  {
    name: 'BusPatrol',
    description: 'School bus safety platform improving student transportation safety and compliance across North America.',
    tech: ['Ruby on Rails', 'Elasticsearch', 'REST APIs', 'PostgreSQL'],
    role: 'Senior Full Stack Developer (Contractor)',
    company: 'Nucleus Software Technologies',
    period: '10/2024 – Present',
    highlights: [
      'Backend services & application features',
      'REST API integrations (internal & external)',
      'Elasticsearch search optimization',
      'Code reviews, testing & deployments',
    ],
  },
  {
    name: 'Appen Data Annotation Platform',
    description: 'Large-scale platform supporting AI training and data annotation workflows for machine learning pipelines.',
    tech: ['Ruby on Rails', 'Elasticsearch', 'AWS', 'PostgreSQL'],
    role: 'Senior Full Stack Developer',
    company: 'Appen AI',
    period: '07/2023 – 09/2024',
    highlights: [
      'Large-scale data annotation features',
      'Elasticsearch search capabilities',
      'Performance improvements & bug fixes',
      'Production releases & maintenance',
    ],
  },
  {
    name: 'MetaDash',
    description: 'SaaS platform for educational institutions to manage courses, academic records, and payments.',
    tech: ['Ruby on Rails', 'PostgreSQL', 'AWS', 'Twilio', 'SendGrid', 'Razorpay'],
    role: 'Full Stack Developer',
    company: 'Techaffinity',
    period: '02/2019 – 07/2022',
    highlights: [
      'Payment gateway integrations',
      'AWS infrastructure deployment',
      'Third-party API integrations',
      'Client requirements & technical solutions',
    ],
  },
];

export default function ArchitectureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState<Project>(PROJECTS[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
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
      id="architecture"
    >
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />

      {/* Header */}
      <div className="relative z-10 pt-24 px-6 md:px-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs" style={{ color: 'var(--electric)' }}>02 /</span>
          <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'rgba(122,132,144,0.6)' }}>
            Projects & Experience
          </span>
        </div>
        <h2
          className="font-sans font-800 text-3xl md:text-4xl mb-2"
          style={{ color: 'var(--chromium-light)', letterSpacing: '-0.02em' }}
        >
          Featured Work
        </h2>
        <p className="font-mono text-sm max-w-lg" style={{ color: 'var(--chromium)' }}>
          7+ years building production systems across SaaS, AI, and enterprise platforms.
        </p>
      </div>

      {/* Project tabs + detail */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-start gap-6 px-6 md:px-16 pb-8 mt-6">
        {/* Left: Project list */}
        <div className="flex flex-col gap-2 lg:w-72 w-full shrink-0">
          {PROJECTS.map((project, i) => (
            <button
              key={project.name}
              onClick={() => { setActiveProject(project); setActiveIndex(i); }}
              className="text-left terminal-card px-4 py-4 transition-all duration-200"
              style={{
                borderColor: activeIndex === i ? 'rgba(0,229,255,0.5)' : 'rgba(255,255,255,0.06)',
                background: activeIndex === i ? 'rgba(0,229,255,0.06)' : 'rgba(30,35,40,0.6)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-16px)',
                transition: `opacity 0.5s ${i * 0.1}s ease, transform 0.5s ${i * 0.1}s ease, border-color 0.2s ease, background 0.2s ease`,
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: activeIndex === i ? 'var(--electric)' : 'rgba(122,132,144,0.4)' }}
                />
                <span
                  className="font-mono text-xs font-700"
                  style={{ color: activeIndex === i ? 'var(--electric)' : 'var(--chromium-light)' }}
                >
                  {project.name}
                </span>
              </div>
              <div className="font-mono text-xs pl-3.5" style={{ color: 'rgba(122,132,144,0.5)' }}>
                {project.company}
              </div>
              <div className="font-mono text-xs pl-3.5 mt-0.5" style={{ color: 'rgba(122,132,144,0.35)' }}>
                {project.period}
              </div>
            </button>
          ))}
        </div>

        {/* Right: Project detail */}
        <div
          className="terminal-card flex-1 min-w-0"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s 0.3s ease, transform 0.6s 0.3s ease',
          }}
        >
          <div className="terminal-header">
            <div className="terminal-dot" style={{ background: '#FF5F57' }} />
            <div className="terminal-dot" style={{ background: '#FEBC2E' }} />
            <div className="terminal-dot" style={{ background: '#28C840' }} />
            <span className="font-mono text-xs ml-2" style={{ color: 'var(--chromium)' }}>
              {activeProject.name.toLowerCase().replace(/\s+/g, '-')}.rb
            </span>
          </div>
          <div className="p-6">
            {/* Project name + role */}
            <div className="mb-4">
              <h3
                className="font-sans font-800 text-xl md:text-2xl mb-1"
                style={{ color: 'var(--chromium-light)', letterSpacing: '-0.02em' }}
              >
                {activeProject.name}
              </h3>
              <div className="font-mono text-xs" style={{ color: 'var(--electric)' }}>
                {activeProject.role} @ {activeProject.company}
              </div>
              <div className="font-mono text-xs mt-1" style={{ color: 'rgba(122,132,144,0.5)' }}>
                {activeProject.period}
              </div>
            </div>

            {/* Description */}
            <p className="font-sans text-sm leading-relaxed mb-5" style={{ color: 'var(--chromium)' }}>
              {activeProject.description}
            </p>

            {/* Highlights */}
            <div className="mb-5">
              <div className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(122,132,144,0.5)' }}>
                Key Contributions
              </div>
              <div className="space-y-2">
                {activeProject.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="font-mono text-xs mt-0.5 shrink-0" style={{ color: 'var(--electric)' }}>→</span>
                    <span className="font-sans text-sm" style={{ color: 'var(--chromium)' }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech stack */}
            <div>
              <div className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(122,132,144,0.5)' }}>
                Tech Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {activeProject.tech.map(t => (
                  <span
                    key={t}
                    className="font-mono text-xs px-3 py-1 rounded-sm border"
                    style={{
                      color: 'var(--electric)',
                      borderColor: 'rgba(0,229,255,0.25)',
                      background: 'rgba(0,229,255,0.06)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}