import React, { useState, useEffect } from 'react';
import { STUDENT_PROFILE } from '../data/portfolioData';
import { LinkedInIcon, MailIcon, DnaIcon } from './Icons';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 40);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((currentScroll / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Scientific Interests", href: "#interests" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Explorations", href: "#explorations" },
    { label: "Skills", href: "#skills" },
    { label: "Research", href: "#research" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <>
      {/* Precision Scroll Progress Hairline */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: '2.5px',
          backgroundColor: 'var(--color-terracotta)',
          zIndex: 1001,
          transition: 'width 0.1s linear'
        }}
        aria-hidden="true"
      />

      {/* Main Sticky Navigation Bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          zIndex: 1000,
          backgroundColor: scrolled ? 'rgba(246, 241, 231, 0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(16, 41, 31, 0.12)' : '1px solid transparent',
          transition: 'all var(--transition-normal)'
        }}
      >
        <div 
          className="container-editorial"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '1rem',
            paddingBottom: '1rem'
          }}
        >
          {/* Identity Monogram & Metadata */}
          <a 
            href="#" 
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
            aria-label="Khushboo Manhas — Home"
          >
            <div 
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'var(--color-forest)',
                color: 'var(--color-ivory)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '3px'
              }}
            >
              <DnaIcon size={16} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span 
                className="font-serif" 
                style={{ 
                  fontSize: '1.15rem', 
                  fontWeight: 600, 
                  letterSpacing: '-0.01em',
                  color: 'var(--color-forest)',
                  lineHeight: 1.1
                }}
              >
                {STUDENT_PROFILE.name}
              </span>
              <span 
                className="font-mono" 
                style={{ 
                  fontSize: '0.68rem', 
                  color: 'var(--text-muted)',
                  letterSpacing: '0.04em'
                }}
              >
                B.TECH BIOTECHNOLOGY · LPU '30
              </span>
            </div>
          </a>

          {/* Desktop Section Links */}
          <nav 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1.4rem'
            }}
            className="nav-desktop-links"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '0.84rem',
                  color: 'var(--color-forest)',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color var(--transition-fast)'
                }}
                className="nav-link-hover"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Quick Connect Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <a
              href={STUDENT_PROFILE.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Khushboo Manhas LinkedIn profile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '34px',
                height: '34px',
                borderRadius: '3px',
                border: '1px solid rgba(16, 41, 31, 0.2)',
                color: 'var(--color-forest)',
                transition: 'all var(--transition-fast)'
              }}
              title="LinkedIn Profile"
            >
              <LinkedInIcon size={16} />
            </a>

            <a
              href={`mailto:${STUDENT_PROFILE.email}`}
              aria-label="Send email to Khushboo Manhas"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.4rem 0.85rem',
                borderRadius: '3px',
                backgroundColor: 'var(--color-forest)',
                color: 'var(--color-ivory)',
                fontSize: '0.78rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'all var(--transition-fast)'
              }}
              className="font-mono"
            >
              <MailIcon size={14} />
              <span className="nav-connect-label">EMAIL</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="nav-mobile-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              style={{
                display: 'none',
                padding: '0.4rem 0.6rem',
                backgroundColor: 'transparent',
                border: '1px solid rgba(16, 41, 31, 0.2)',
                borderRadius: '3px',
                color: 'var(--color-forest)',
                cursor: 'pointer'
              }}
            >
              <span className="font-mono" style={{ fontSize: '0.75rem' }}>
                {mobileMenuOpen ? "CLOSE" : "MENU"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              backgroundColor: 'var(--color-ivory-light)',
              borderBottom: '1px solid rgba(16, 41, 31, 0.15)',
              padding: '1.25rem var(--container-padding)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem'
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--color-forest)',
                  fontWeight: 500,
                  padding: '0.4rem 0',
                  borderBottom: '1px dashed rgba(16, 41, 31, 0.08)'
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Media query styling for responsive navbar */}
      <style>{`
        @media (max-width: 900px) {
          .nav-desktop-links {
            display: none !important;
          }
          .nav-mobile-toggle {
            display: inline-flex !important;
          }
          .nav-connect-label {
            display: none;
          }
        }
        .nav-link-hover:hover {
          color: var(--color-terracotta) !important;
        }
      `}</style>
    </>
  );
}
