import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import TechConstellation from './components/TechConstellation';
import ArchitectureSection from './components/ArchitectureSection';
import StatsSection from './components/StatsSection';
import WaitlistSection from './components/WaitlistSection';
import CursorSystem from './components/CursorSystem';

export default function HomePage() {
  return (
    <div className="bg-void relative" style={{ background: 'var(--void)', minHeight: '100dvh' }}>
      <div className="noise-overlay" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
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
