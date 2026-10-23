import React from 'react';
import { STUDENT_PROFILE } from '../data/portfolioData';
import { ArrowDownIcon, DnaIcon } from './Icons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      style={{
        backgroundColor: 'var(--color-ivory)',
        borderTop: '1px solid rgba(16, 41, 31, 0.14)',
        paddingTop: '3.5rem',
        paddingBottom: '3.5rem',
        marginTop: 'auto'
      }}
    >
      <div className="container-editorial">
        {/* Footer Top Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(16, 41, 31, 0.1)'
          }}
        >
          {/* Colophon Column 1: Identity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div 
                style={{
                  width: '28px',
                  height: '28px',
                  backgroundColor: 'var(--color-forest)',
                  color: 'var(--color-ivory)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '3px'
                }}
              >
                <DnaIcon size={14} />
              </div>
              <span className="font-serif" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-forest)' }}>
                {STUDENT_PROFILE.name}
              </span>
            </div>

            <p className="caption-editorial" style={{ margin: 0, maxWidth: '320px' }}>
              First-year undergraduate portfolio presenting learning priorities, foundational sciences, and educational exhibits in biotechnology.
            </p>

            <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--color-terracotta)' }}>
              LOVELY PROFESSIONAL UNIVERSITY · CLASS OF 2030
            </span>
          </div>

          {/* Colophon Column 2: Typography & Art Direction */}
          <div>
            <span className="font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.08em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.65rem' }}>
              COLOPHON & TYPOGRAPHY
            </span>
            <p className="caption-editorial" style={{ margin: 0, lineHeight: 1.6 }}>
              Set in <strong>Cormorant Garamond</strong> & <strong>Fraunces</strong> for editorial headings, paired with <strong>DM Sans</strong> for technical readability and <strong>JetBrains Mono</strong> for biological sequences and mathematical metrics.
            </p>
          </div>

          {/* Colophon Column 3: Academic Ethics & Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="font-mono" style={{ fontSize: '0.72rem', letterSpacing: '0.08em', color: 'var(--text-muted)', display: 'block', marginBottom: '0.65rem' }}>
                ACADEMIC INTEGRITY
              </span>
              <p className="caption-editorial" style={{ margin: 0, fontSize: '0.78rem' }}>
                All credentials, curriculum notes, and prospective directions are stated truthfully without fabrication of publications, laboratory positions, or senior certifications.
              </p>
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              <button
                type="button"
                onClick={scrollToTop}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.4rem 0.85rem',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(16, 41, 31, 0.2)',
                  borderRadius: '3px',
                  color: 'var(--color-forest)',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
                className="font-mono"
              >
                <span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}>
                  <ArrowDownIcon size={12} />
                </span>
                BACK TO TOP
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingTop: '1.5rem',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}
          className="font-mono"
        >
          <div>
            © 2026 {STUDENT_PROFILE.name}. All rights reserved.
          </div>

          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <a 
              href={STUDENT_PROFILE.linkedIn} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'var(--color-forest)', textDecoration: 'none' }}
            >
              LinkedIn
            </a>
            <a 
              href={`mailto:${STUDENT_PROFILE.email}`} 
              style={{ color: 'var(--color-forest)', textDecoration: 'none' }}
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
