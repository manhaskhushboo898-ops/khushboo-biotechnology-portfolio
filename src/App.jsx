import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ScientificInterests from './components/ScientificInterests';
import LearningRoadmap from './components/LearningRoadmap';
import ExplorationsSection from './components/Explorations/ExplorationsSection';
import SkillsSection from './components/SkillsSection';
import ResearchInterests from './components/ResearchInterests';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  // IntersectionObserver for scroll-triggered reveals
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const revealElements = document.querySelectorAll('.section-editorial, .section-header-editorial');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => {
      el.classList.add('reveal-init');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="portfolio-shell">
      {/* Sticky Top Navigation */}
      <Navbar />

      <main>
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: About (Biography & Academic Ethos) */}
        <About />

        {/* Section 3: Scientific Interests (3 Core Pillars) */}
        <ScientificInterests />

        {/* Section 4: Learning Roadmap (2026–27 through 2029–30) */}
        <LearningRoadmap />

        {/* Section 5: Scientific Explorations (DNA Pairing, Codon Translator, Bacterial Growth, PCR) */}
        <ExplorationsSection />

        {/* Section 6: Foundational Skills & Academic Tools */}
        <SkillsSection />

        {/* Section 7: Prospective Research Inquiries */}
        <ResearchInterests />

        {/* Section 8: Direct Contact & Communication Channels */}
        <Contact />
      </main>

      {/* Monograph Colophon & Footer */}
      <Footer />
    </div>
  );
}
