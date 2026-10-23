import React, { useState } from 'react';
import { LEARNING_ROADMAP } from '../data/portfolioData';

export default function LearningRoadmap() {
  const [selectedYearIndex, setSelectedYearIndex] = useState(0); // Default to Year 1
  const activeRoadmap = LEARNING_ROADMAP[selectedYearIndex];

  return (
    <section 
      id="roadmap" 
      className="section-editorial"
      style={{
        backgroundColor: 'var(--color-ivory)',
        position: 'relative',
        borderBottom: '1px solid rgba(16, 41, 31, 0.12)'
      }}
    >
      <div className="container-editorial">
        {/* Section Header */}
        <div className="section-header-editorial">
          <div className="section-header-top">
            <span className="section-indexer">SEC. 04 / 07 · CURRICULAR TRAJECTORY</span>
            <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--color-terracotta)', fontWeight: 600 }}>
              2026 — 2030 (4-YEAR MAP)
            </span>
          </div>

          <h2 className="display-section">
            Undergraduate Learning Roadmap
          </h2>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem' }}>
            <p className="lead-editorial" style={{ maxWidth: '780px', color: 'var(--color-forest)' }}>
              A structured four-year progression through the biotechnology curriculum at Lovely Professional University. Year 1 reflects current foundational coursework, while future years (2027–2030) are explicitly framed as learning priorities and aspirational goals.
            </p>

            <span className="mono-tag" style={{ backgroundColor: '#FFFFFF', color: 'var(--color-forest)', border: '1px solid rgba(16, 41, 31, 0.15)' }}>
              TRANSPARENT CURRICULAR PLANNING
            </span>
          </div>
        </div>

        {/* Continuous Horizontal Timeline Calibration Axis */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            height: '24px',
            marginBottom: '1rem',
            borderBottom: '1.5px solid var(--color-forest)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingBottom: '4px'
          }}
          className="font-mono"
        >
          <span style={{ fontSize: '0.68rem', color: 'var(--color-forest)', fontWeight: 600 }}>START · AUTUMN 2026</span>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>YEAR 1 (ACTIVE) ——— YEAR 2 (GOAL) ——— YEAR 3 (GOAL) ——— YEAR 4 (GOAL)</span>
          <span style={{ fontSize: '0.68rem', color: 'var(--color-terracotta)', fontWeight: 600 }}>GRADUATION · SPRING 2030</span>
        </div>

        {/* 4-Year Architectural Timeline Selector Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.85rem',
            marginBottom: '2rem'
          }}
          className="roadmap-year-selector-grid"
        >
          {LEARNING_ROADMAP.map((item, idx) => {
            const isSelected = selectedYearIndex === idx;
            const isCurrent = item.status === "CURRENT FOCUS";

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedYearIndex(idx)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '1.25rem 1.15rem',
                  backgroundColor: isSelected ? 'var(--color-forest)' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : 'var(--color-forest)',
                  border: isSelected ? '1.5px solid var(--color-forest-deep)' : '1px solid rgba(16, 41, 31, 0.15)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 10px 28px -6px rgba(16, 41, 31, 0.16)' : '0 2px 6px rgba(16, 41, 31, 0.03)',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '0.45rem' }}>
                  <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 700, color: isSelected ? 'var(--color-brass-light)' : 'var(--color-terracotta)' }}>
                    {item.year}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    {isCurrent && (
                      <span 
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: isSelected ? '#FFFFFF' : '#4E7259',
                          boxShadow: isCurrent ? '0 0 0 2px rgba(78,114,89,0.3)' : 'none'
                        }}
                      />
                    )}
                    <span 
                      style={{ 
                        fontSize: '0.62rem', 
                        padding: '0.15rem 0.45rem', 
                        borderRadius: '2px',
                        backgroundColor: isSelected ? 'rgba(255,255,255,0.18)' : (isCurrent ? 'var(--color-sage-pale)' : '#FAF7F2'),
                        color: isSelected ? '#FFFFFF' : (isCurrent ? 'var(--color-forest)' : 'var(--text-muted)'),
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600
                      }}
                    >
                      {isCurrent ? "CURRENT" : "INTENDED"}
                    </span>
                  </div>
                </div>

                <strong style={{ fontSize: '1.02rem', lineHeight: 1.25, margin: '0.2rem 0', fontFamily: 'var(--font-serif)' }}>
                  {item.phaseTitle.split('&')[0]}
                </strong>

                <span 
                  className="font-mono" 
                  style={{ 
                    fontSize: '0.72rem', 
                    color: isSelected ? 'rgba(255,255,255,0.75)' : 'var(--text-muted)',
                    marginTop: '0.2rem'
                  }}
                >
                  {item.academicPeriod}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed Selected Year Focus Panel (Archival Monograph Card) */}
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            border: '1.5px solid rgba(16, 41, 31, 0.16)',
            borderRadius: '4px',
            padding: 'clamp(1.75rem, 3.5vw, 3rem)',
            boxShadow: '0 16px 40px -12px rgba(16, 41, 31, 0.08)',
            position: 'relative'
          }}
        >
          {/* Corner Registration Accents */}
          <div style={{ position: 'absolute', top: '5px', left: '5px', color: 'var(--color-brass)', fontSize: '0.85rem', lineHeight: 1, pointerEvents: 'none' }}>⌜</div>
          <div style={{ position: 'absolute', top: '5px', right: '5px', color: 'var(--color-brass)', fontSize: '0.85rem', lineHeight: 1, pointerEvents: 'none' }}>⌝</div>
          <div style={{ position: 'absolute', bottom: '5px', left: '5px', color: 'var(--color-brass)', fontSize: '0.85rem', lineHeight: 1, pointerEvents: 'none' }}>⌞</div>
          <div style={{ position: 'absolute', bottom: '5px', right: '5px', color: 'var(--color-brass)', fontSize: '0.85rem', lineHeight: 1, pointerEvents: 'none' }}>⌟</div>

          {/* Panel Top Meta */}
          <div 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              flexWrap: 'wrap',
              gap: '1rem',
              borderBottom: '1px solid rgba(16, 41, 31, 0.12)',
              paddingBottom: '1.35rem',
              marginBottom: '1.75rem'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.45rem' }}>
                <span className="scientific-meta">
                  ACADEMIC STAGE {activeRoadmap.year} ({activeRoadmap.academicPeriod})
                </span>
                <span 
                  className="mono-tag" 
                  style={{ 
                    backgroundColor: activeRoadmap.status === "CURRENT FOCUS" ? 'var(--color-sage-pale)' : '#FAF7F2',
                    color: activeRoadmap.status === "CURRENT FOCUS" ? 'var(--color-forest)' : 'var(--color-terracotta)',
                    fontWeight: 600
                  }}
                >
                  {activeRoadmap.status === "CURRENT FOCUS" ? "ACTIVE SEMESTER (FOUNDATIONAL)" : "PROSPECTIVE LEARNING GOAL"}
                </span>
              </div>

              <h3 className="display-subsection" style={{ margin: 0, fontSize: '2rem', color: 'var(--color-forest)' }}>
                {activeRoadmap.phaseTitle}
              </h3>
            </div>

            <p className="caption-editorial" style={{ fontStyle: 'italic', maxWidth: '400px', margin: 0, color: 'var(--color-sage)', fontSize: '0.9rem' }}>
              "{activeRoadmap.tagline}"
            </p>
          </div>

          <p className="body-editorial" style={{ fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '2.25rem', color: 'var(--color-forest)' }}>
            {activeRoadmap.description}
          </p>

          {/* Two-Column Breakdown: Curricular Focus Areas & Milestones */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.5rem',
              borderTop: '1px dashed rgba(16, 41, 31, 0.14)',
              paddingTop: '2rem'
            }}
          >
            {/* Core Curricular Priorities */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.15rem' }}>
                <span className="font-mono" style={{ fontSize: '0.78rem', letterSpacing: '0.08em', color: 'var(--color-forest)', fontWeight: 600 }}>
                  CURRICULAR PRIORITIES & STUDY DOMAINS
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {activeRoadmap.focusAreas.map((area, aIdx) => (
                  <div key={aIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div 
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-terracotta)',
                        marginTop: '0.55rem',
                        flexShrink: 0
                      }}
                    />
                    <span style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      {area}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Targeted Academic Milestones */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.15rem' }}>
                <span className="font-mono" style={{ fontSize: '0.78rem', letterSpacing: '0.08em', color: 'var(--color-forest)', fontWeight: 600 }}>
                  ACADEMIC MILESTONES & TARGET CRITERIA
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
                {activeRoadmap.milestones.map((m, mIdx) => (
                  <div 
                    key={mIdx}
                    style={{
                      backgroundColor: '#FAF7F2',
                      border: '1px solid rgba(16, 41, 31, 0.12)',
                      borderRadius: '3px',
                      padding: '0.95rem 1.15rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '0.92rem', color: 'var(--color-forest)' }}>
                        {m.title}
                      </strong>
                      <span 
                        className="font-mono" 
                        style={{ 
                          fontSize: '0.68rem', 
                          fontWeight: 600,
                          color: m.completed ? 'var(--color-sage)' : 'var(--color-terracotta)' 
                        }}
                      >
                        {m.completed ? "[ACTIVE COURSEWORK]" : "[PROSPECTIVE GOAL]"}
                      </span>
                    </div>
                    <span className="caption-editorial" style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                      {m.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .roadmap-year-selector-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
