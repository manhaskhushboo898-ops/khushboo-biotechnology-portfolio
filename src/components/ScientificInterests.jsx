import React, { useState } from 'react';
import { SCIENTIFIC_INTERESTS } from '../data/portfolioData';
import { DnaIcon, MicrobeIcon, TerminalIcon } from './Icons';

export default function ScientificInterests() {
  const [activePillar, setActivePillar] = useState(0);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'dna':
        return <DnaIcon size={24} />;
      case 'microbe':
        return <MicrobeIcon size={24} />;
      case 'terminal':
        return <TerminalIcon size={24} />;
      default:
        return <DnaIcon size={24} />;
    }
  };

  return (
    <section 
      id="interests" 
      className="section-editorial" 
      style={{ 
        backgroundColor: '#F7F3EB',
        borderBottom: '1px solid rgba(16, 41, 31, 0.12)',
        position: 'relative'
      }}
    >
      <div className="container-editorial">
        {/* Section Header */}
        <div className="section-header-editorial">
          <div className="section-header-top">
            <span className="section-indexer">SEC. 03 / 07 · SCIENTIFIC INTERESTS</span>
            <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              TRIAD OF BIOLOGICAL INQUIRY · LPU FOUNDATIONS
            </span>
          </div>

          <h2 className="display-section">
            Core Scientific Pillars
          </h2>

          <p className="lead-editorial" style={{ maxWidth: '780px', color: 'var(--color-forest)' }}>
            My undergraduate curiosities center on three foundational branches of biotechnology. Each field provides a distinct conceptual lens through which biological organization can be investigated.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.85rem',
            marginBottom: '1rem'
          }}
        >
          {SCIENTIFIC_INTERESTS.map((pillar, idx) => {
            const isHovered = activePillar === idx;

            return (
              <div
                key={pillar.id}
                onClick={() => setActivePillar(idx)}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: isHovered ? '1.5px solid var(--color-forest)' : '1px solid rgba(16, 41, 31, 0.15)',
                  borderRadius: '4px',
                  padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isHovered 
                    ? '0 16px 36px -10px rgba(16, 41, 31, 0.12), 0 0 0 1px rgba(16, 41, 31, 0.05)' 
                    : '0 4px 16px -4px rgba(16, 41, 31, 0.04)',
                  cursor: 'pointer',
                  position: 'relative',
                  transform: isHovered ? 'translateY(-3px)' : 'none'
                }}
              >
                {/* Archival Plate Stamp Header */}
                <div 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(16, 41, 31, 0.1)',
                    paddingBottom: '0.85rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div 
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '3px',
                        backgroundColor: isHovered ? 'var(--color-forest)' : '#FAF7F2',
                        color: isHovered ? '#FFFFFF' : 'var(--color-terracotta)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                        border: '1px solid rgba(16, 41, 31, 0.1)'
                      }}
                    >
                      {getIcon(pillar.lineworkIcon)}
                    </div>

                    <div>
                      <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--color-terracotta)', fontWeight: 600, display: 'block' }}>
                        PLT. 0{idx + 1} / III
                      </span>
                      <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {pillar.category}
                      </span>
                    </div>
                  </div>

                  <span 
                    className="mono-tag" 
                    style={{ 
                      backgroundColor: isHovered ? 'var(--color-sage-pale)' : '#FAF7F2', 
                      color: 'var(--color-forest)',
                      fontSize: '0.68rem'
                    }}
                  >
                    FOUNDATION
                  </span>
                </div>

                {/* Pillar Title & Subtitle */}
                <div>
                  <h3 className="display-subsection" style={{ fontSize: '1.45rem', margin: 0, color: 'var(--color-forest)' }}>
                    {pillar.title}
                  </h3>
                  <p className="caption-editorial" style={{ fontStyle: 'italic', marginTop: '0.35rem', color: 'var(--color-sage)', fontSize: '0.85rem' }}>
                    {pillar.subtitle}
                  </p>
                </div>

                <p className="body-editorial" style={{ fontSize: '0.92rem', margin: 0, color: 'var(--text-secondary)' }}>
                  {pillar.overview}
                </p>

                {/* Key Concepts Linework List formatted as indexed clauses */}
                <div 
                  style={{
                    borderTop: '1px dashed rgba(16, 41, 31, 0.14)',
                    paddingTop: '1.15rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem'
                  }}
                >
                  <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    KEY CURRICULAR CLAUSES
                  </span>

                  {pillar.keyConcepts.map((concept, cIdx) => (
                    <div key={cIdx} style={{ fontSize: '0.84rem' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.45rem' }}>
                        <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-terracotta)', fontWeight: 600 }}>
                          § {idx + 1}.{cIdx + 1}
                        </span>
                        <strong style={{ color: 'var(--color-forest)', fontSize: '0.88rem' }}>
                          {concept.name}
                        </strong>
                      </div>
                      <p className="caption-editorial" style={{ fontSize: '0.82rem', margin: '0.15rem 0 0 1.25rem', lineHeight: 1.5 }}>
                        {concept.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Guiding Curiosity Inscription */}
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
                    GUIDING SCIENTIFIC QUESTION
                  </span>
                  <p className="caption-editorial" style={{ fontStyle: 'italic', margin: 0, color: 'var(--color-forest)', fontSize: '0.84rem' }}>
                    "{pillar.curiosityQuestion}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
