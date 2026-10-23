import React from 'react';
import { FOUNDATIONAL_SKILLS } from '../data/portfolioData';

export default function SkillsSection() {
  return (
    <section 
      id="skills" 
      className="section-editorial"
      style={{
        backgroundColor: '#FAF6EF',
        borderBottom: '1px solid rgba(16, 41, 31, 0.12)'
      }}
    >
      <div className="container-editorial">
        {/* Section Header */}
        <div className="section-header-editorial">
          <div className="section-header-top">
            <span className="section-indexer">SEC. 06 / 07 · FOUNDATIONAL COMPETENCIES</span>
            <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--color-terracotta)', fontWeight: 600 }}>
              NO FABRICATED PROFICIENCY PERCENTAGES
            </span>
          </div>

          <h2 className="display-section">
            Foundational Skills & Academic Tools
          </h2>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem' }}>
            <p className="lead-editorial" style={{ maxWidth: '780px', color: 'var(--color-forest)' }}>
              An authentic accounting of my current capabilities as a first-year student. Rather than arbitrary percentage bars, these competencies reflect active practice in scientific communication, collegiate teamwork, digital productivity, and foundational biotechnology coursework.
            </p>

            <span className="mono-tag" style={{ backgroundColor: '#FFFFFF', color: 'var(--color-forest)', border: '1px solid rgba(16, 41, 31, 0.15)' }}>
              HONEST ACADEMIC APPRAISAL
            </span>
          </div>
        </div>

        {/* 3 Categories Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.85rem'
          }}
        >
          {FOUNDATIONAL_SKILLS.map((group, gIdx) => (
            <div 
              key={gIdx}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1.5px solid rgba(16, 41, 31, 0.15)',
                borderRadius: '4px',
                padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.35rem',
                boxShadow: '0 8px 24px -6px rgba(16, 41, 31, 0.05)',
                position: 'relative'
              }}
            >
              {/* Corner Accents */}
              <div style={{ position: 'absolute', top: '5px', left: '5px', color: 'var(--color-brass)', fontSize: '0.75rem', lineHeight: 1, pointerEvents: 'none' }}>⌜</div>
              <div style={{ position: 'absolute', top: '5px', right: '5px', color: 'var(--color-brass)', fontSize: '0.75rem', lineHeight: 1, pointerEvents: 'none' }}>⌝</div>

              {/* Group Title */}
              <div 
                style={{
                  borderBottom: '1px solid rgba(16, 41, 31, 0.12)',
                  paddingBottom: '0.85rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--color-terracotta)', fontWeight: 600, display: 'block' }}>
                    CATEGORY 0{gIdx + 1}
                  </span>
                  <h3 className="display-subsection" style={{ fontSize: '1.35rem', margin: '0.15rem 0 0', color: 'var(--color-forest)' }}>
                    {group.group}
                  </h3>
                </div>

                <span className="mono-tag" style={{ backgroundColor: '#FAF7F2', color: 'var(--color-forest)', fontSize: '0.68rem' }}>
                  YEAR 1
                </span>
              </div>

              {/* Skills List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {group.skills.map((skill, sIdx) => (
                  <div 
                    key={sIdx} 
                    style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '0.35rem',
                      backgroundColor: '#FAF7F2',
                      padding: '0.85rem 1rem',
                      borderRadius: '3px',
                      border: '1px solid rgba(16, 41, 31, 0.08)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '0.94rem', color: 'var(--color-forest)' }}>
                        {skill.name}
                      </strong>
                      <span 
                        className="mono-tag" 
                        style={{ 
                          fontSize: '0.65rem',
                          backgroundColor: '#FFFFFF',
                          color: 'var(--color-sage)',
                          fontWeight: 600,
                          border: '1px solid rgba(16, 41, 31, 0.12)'
                        }}
                      >
                        {skill.status}
                      </span>
                    </div>

                    <p className="caption-editorial" style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
