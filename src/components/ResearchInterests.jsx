import React from 'react';
import { RESEARCH_INTERESTS } from '../data/portfolioData';
import { CellularMembraneMotif } from './ScientificBackgroundMotifs';

export default function ResearchInterests() {
  return (
    <section 
      id="research" 
      className="section-editorial" 
      style={{ 
        backgroundColor: '#F7F3EB',
        borderBottom: '1px solid rgba(16, 41, 31, 0.12)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Cellular Membrane Watermark in Background */}
      <div 
        style={{
          position: 'absolute',
          bottom: '-40px',
          right: '-60px',
          color: 'var(--color-sage)',
          opacity: 0.1,
          pointerEvents: 'none',
          zIndex: 0
        }}
        aria-hidden="true"
      >
        <CellularMembraneMotif width={480} height={320} />
      </div>

      <div className="container-editorial" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div className="section-header-editorial">
          <div className="section-header-top">
            <span className="section-indexer">SEC. 07 / 07 · PROSPECTIVE INQUIRIES</span>
            <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--color-terracotta)', fontWeight: 600 }}>
              FUTURE RESEARCH TRAJECTORIES (2027–2030)
            </span>
          </div>

          <h2 className="display-section">
            Prospective Research Inquiries
          </h2>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem' }}>
            <p className="lead-editorial" style={{ maxWidth: '780px', color: 'var(--color-forest)' }}>
              Emerging questions and research themes I hope to investigate during upper-year undergraduate electives, laboratory internships, and future capstone investigations. Framed as open curiosities to guide my academic development.
            </p>

            <span className="mono-tag" style={{ backgroundColor: '#FFFFFF', color: 'var(--color-terracotta)', border: '1px solid rgba(16, 41, 31, 0.15)' }}>
              [ASPIRATIONAL INQUIRY]
            </span>
          </div>
        </div>

        {/* 2x2 Research Themes Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.85rem'
          }}
        >
          {RESEARCH_INTERESTS.map((item, idx) => (
            <div 
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid rgba(16, 41, 31, 0.15)',
                borderRadius: '4px',
                padding: 'clamp(1.5rem, 3vw, 2.35rem)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.15rem',
                boxShadow: '0 8px 24px -6px rgba(16, 41, 31, 0.05)',
                position: 'relative',
                transition: 'all 0.25s ease'
              }}
            >
              {/* Corner Accents */}
              <div style={{ position: 'absolute', top: '5px', left: '5px', color: 'var(--color-brass)', fontSize: '0.75rem', lineHeight: 1, pointerEvents: 'none' }}>⌜</div>
              <div style={{ position: 'absolute', top: '5px', right: '5px', color: 'var(--color-brass)', fontSize: '0.75rem', lineHeight: 1, pointerEvents: 'none' }}>⌝</div>

              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(16, 41, 31, 0.1)',
                  paddingBottom: '0.75rem'
                }}
              >
                <span className="mono-tag" style={{ backgroundColor: 'var(--color-sage-pale)', color: 'var(--color-forest)', fontWeight: 600 }}>
                  {item.field}
                </span>
                <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--color-terracotta)', fontWeight: 600 }}>
                  THEME 0{idx + 1}
                </span>
              </div>

              <h3 className="display-subsection" style={{ fontSize: '1.45rem', margin: 0, color: 'var(--color-forest)' }}>
                {item.title}
              </h3>

              <p className="body-editorial" style={{ fontSize: '0.94rem', margin: 0, color: 'var(--text-secondary)' }}>
                {item.description}
              </p>

              <div 
                style={{
                  marginTop: 'auto',
                  backgroundColor: '#FAF7F2',
                  borderLeft: '3px solid var(--color-terracotta)',
                  padding: '0.85rem 1rem',
                  borderRadius: '2px',
                  borderTop: '1px solid rgba(16, 41, 31, 0.06)',
                  borderRight: '1px solid rgba(16, 41, 31, 0.06)',
                  borderBottom: '1px solid rgba(16, 41, 31, 0.06)'
                }}
              >
                <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--color-terracotta)', display: 'block', marginBottom: '0.25rem', fontWeight: 600 }}>
                  CENTRAL SCIENTIFIC INQUIRY
                </span>
                <p className="caption-editorial" style={{ fontStyle: 'italic', margin: 0, color: 'var(--color-forest)', fontSize: '0.86rem' }}>
                  "{item.inquiry}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
