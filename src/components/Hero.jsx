import React from 'react';
import { STUDENT_PROFILE } from '../data/portfolioData';
import DnaCanvas from './DnaCanvas';
import { CelestialPolarScale, BotanicalVenationMotif } from './ScientificBackgroundMotifs';
import { ArrowDownIcon, LinkedInIcon, LocationIcon } from './Icons';

export default function Hero() {
  return (
    <section 
      id="hero" 
      style={{
        position: 'relative',
        paddingTop: 'clamp(2.5rem, 6vw, 4.5rem)',
        paddingBottom: 'clamp(4rem, 8vw, 7rem)',
        borderBottom: '1px solid rgba(16, 41, 31, 0.14)',
        background: 'radial-gradient(circle at 68% 40%, rgba(194, 130, 81, 0.07) 0%, rgba(78, 114, 89, 0.04) 42%, transparent 72%)',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Botanical Venation Watermark (Left Margin) */}
      <div 
        style={{
          position: 'absolute',
          top: '-30px',
          left: '-80px',
          color: 'var(--color-sage)',
          opacity: 0.12,
          pointerEvents: 'none',
          zIndex: 0
        }}
        aria-hidden="true"
      >
        <BotanicalVenationMotif width={420} height={560} />
      </div>

      {/* Decorative Celestial Polar Coordinate Grid (Backdrop behind DNA canvas) */}
      <div 
        style={{
          position: 'absolute',
          top: '30px',
          right: '-60px',
          color: 'var(--color-forest)',
          opacity: 0.1,
          pointerEvents: 'none',
          zIndex: 0
        }}
        aria-hidden="true"
      >
        <CelestialPolarScale size={580} />
      </div>

      <div className="container-editorial" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Archival Folio Header Bar */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.85rem',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid rgba(16, 41, 31, 0.12)',
            marginBottom: 'clamp(2rem, 4vw, 3.5rem)'
          }}
          className="font-mono"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span 
              className="mono-tag" 
              style={{ 
                backgroundColor: 'var(--color-sage-pale)', 
                color: 'var(--color-forest)',
                fontWeight: 600
              }}
            >
              PLATE I · ACADEMIC MONOGRAPH
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              FOLIO REF: BIO-2026/30 · LPU
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <LocationIcon size={13} />
              <span>PUNJAB, INDIA ({STUDENT_PROFILE.campusCoordinates})</span>
            </div>
            <span>·</span>
            <span style={{ color: 'var(--color-terracotta)', fontWeight: 600 }}>COHORT 2026–2030</span>
          </div>
        </div>

        {/* Hero Main Editorial Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(2rem, 5vw, 4.5rem)',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Editorial Introduction & Student Profile */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Status & Credential Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.25rem 0.65rem',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(16, 41, 31, 0.16)',
                  borderRadius: '2px',
                  boxShadow: '0 1px 4px rgba(16,41,31,0.04)'
                }}
              >
                <span 
                  style={{ 
                    width: '7px', 
                    height: '7px', 
                    borderRadius: '50%', 
                    backgroundColor: 'var(--color-sage)',
                    boxShadow: '0 0 0 3px rgba(78, 114, 89, 0.2)' 
                  }} 
                />
                <span className="font-mono" style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-forest)' }}>
                  ACTIVE FIRST YEAR · 2026–2027
                </span>
              </div>

              <span className="scientific-meta">
                UNDERGRADUATE IN BIOTECHNOLOGY
              </span>
            </div>

            {/* Main Name Heading with Architectural Typographic Scale */}
            <div>
              <h1 
                className="display-hero" 
                style={{ 
                  margin: 0,
                  textShadow: '0 2px 14px rgba(16, 41, 31, 0.05)'
                }}
              >
                {STUDENT_PROFILE.name}
              </h1>

              {/* Decorative Linework Accent */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.6rem', 
                  margin: '0.65rem 0 0.4rem',
                  maxWidth: '380px'
                }}
              >
                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-terracotta)', opacity: 0.6 }} />
                <span style={{ fontSize: '0.65rem', color: 'var(--color-terracotta)' }}>⌖</span>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-terracotta)', opacity: 0.6 }} />
              </div>

              <p 
                className="font-serif" 
                style={{
                  fontSize: 'clamp(1.3rem, 2.2vw, 1.75rem)',
                  fontStyle: 'italic',
                  color: 'var(--color-sage)',
                  margin: 0,
                  lineHeight: 1.25
                }}
              >
                B.Tech Biotechnology (2026–2030) · Lovely Professional University
              </p>
            </div>

            {/* Concise Biotechnology-Focused Tagline */}
            <p className="lead-editorial" style={{ margin: 0, maxWidth: '580px', color: 'var(--color-forest)' }}>
              {STUDENT_PROFILE.tagline}
            </p>

            {/* Academic Ethos Statement Card */}
            <div 
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                border: '1px solid rgba(16, 41, 31, 0.12)',
                borderLeft: '3.5px solid var(--color-terracotta)',
                padding: '1rem 1.35rem',
                borderRadius: '3px',
                boxShadow: '0 4px 16px -4px rgba(16, 41, 31, 0.05)',
                backdropFilter: 'blur(6px)'
              }}
            >
              <p className="caption-editorial" style={{ color: 'var(--color-forest)', margin: 0, fontSize: '0.88rem', lineHeight: 1.6 }}>
                "{STUDENT_PROFILE.heroSummary}"
              </p>
            </div>

            {/* Primary Calls to Action */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap', paddingTop: '0.25rem' }}>
              <a 
                href="#roadmap" 
                className="btn-primary-editorial"
              >
                <span>Curricular Roadmap</span>
                <ArrowDownIcon size={14} />
              </a>

              <a 
                href="#explorations" 
                className="btn-secondary-editorial"
              >
                <span>Interactive Exhibits</span>
              </a>

              <a
                href={STUDENT_PROFILE.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-editorial"
                style={{ padding: '0.8rem 1.15rem' }}
                title="View LinkedIn Profile"
              >
                <LinkedInIcon size={16} />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Academic Credentials Folio */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                borderTop: '1px solid rgba(16, 41, 31, 0.12)',
                paddingTop: '1.35rem',
                marginTop: '0.5rem'
              }}
              className="font-mono"
            >
              <div 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.45)',
                  border: '1px solid rgba(16, 41, 31, 0.08)',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '3px'
                }}
              >
                <span className="caption-editorial" style={{ fontSize: '0.65rem', display: 'block', textTransform: 'uppercase' }}>PROGRAM</span>
                <strong style={{ fontSize: '0.84rem', color: 'var(--color-forest)' }}>B.Tech Biotech</strong>
              </div>

              <div 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.45)',
                  border: '1px solid rgba(16, 41, 31, 0.08)',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '3px'
                }}
              >
                <span className="caption-editorial" style={{ fontSize: '0.65rem', display: 'block', textTransform: 'uppercase' }}>CAMPUS</span>
                <strong style={{ fontSize: '0.84rem', color: 'var(--color-forest)' }}>LPU Punjab</strong>
              </div>

              <div 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.45)',
                  border: '1px solid rgba(16, 41, 31, 0.08)',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '3px'
                }}
              >
                <span className="caption-editorial" style={{ fontSize: '0.65rem', display: 'block', textTransform: 'uppercase' }}>COMPLETION</span>
                <strong style={{ fontSize: '0.84rem', color: 'var(--color-terracotta)' }}>Class of 2030</strong>
              </div>
            </div>

          </div>

          {/* Right Column: Signature Interactive DNA Double-Helix Visual */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <DnaCanvas />
          </div>

        </div>
      </div>
    </section>
  );
}
