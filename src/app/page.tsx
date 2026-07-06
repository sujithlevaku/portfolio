import React from 'react';
import { Metadata } from 'next'; // 1. Import Metadata type
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import TechConstellation from './components/TechConstellation';
import ArchitectureSection from './components/ArchitectureSection';
import StatsSection from './components/StatsSection';
import WaitlistSection from './components/WaitlistSection';
import CursorSystem from './components/CursorSystem';

// 2. Export the Metadata configuration (Next.js automatically injects this into the HTML head)
export const metadata: Metadata = {
  title: 'Sujith Kumar Reddy Levaku | Senior Full Stack & DevOps Engineer',
  description: 'Senior Full Stack & DevOps Engineer with 7+ years of experience building scalable production systems across SaaS, AI, and enterprise architectures.',
  alternates: {
    canonical: 'https://sujithreddy.com',
  },
  openGraph: {
    title: 'Sujith Kumar Reddy Levaku | Senior Full Stack & DevOps Engineer',
    description: 'Senior Full Stack & DevOps Engineer specializing in Ruby on Rails, React, Next.js, and Cloud Infrastructure.',
    url: 'https://sujithreddy.com',
    siteName: 'Sujith Reddy Portfolio',
    locale: 'en_US',
    type: 'profile',
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sujith Kumar Reddy Levaku',
    jobTitle: 'Senior Full Stack & DevOps Engineer',
    url: 'https://sujithreddy.com',
    sameAs: ['https://github.com/sujithlevaku', 'https://linkedin.com/in/sujith-kumar-reddy-levaku'],
    worksFor: {
      '@type': 'Organization',
      name: 'Nucleus Software Technologies',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Sathyabama University',
    },
    knowsAbout: ['Ruby on Rails', 'React', 'Next.js', 'DevOps', 'AWS', 'Docker'],
  };

  return (
    <div className="bg-void relative" style={{ background: 'var(--void)', minHeight: '100dvh' }}>
      <div className="noise-overlay" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CursorSystem />
      <Header />
      <main className="snap-container" style={{ paddingTop: 0 }}>
        <HeroSection />
        <TechConstellation />
        <ArchitectureSection />
        <StatsSection />
        <WaitlistSection />
        <Footer />
      </main>
    </div>
  );
}
