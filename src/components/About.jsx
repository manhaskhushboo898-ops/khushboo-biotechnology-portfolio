import React from 'react';
import { STUDENT_PROFILE } from '../data/portfolioData';
import { BookIcon } from './Icons';
import { ChromosomeWatermark } from './ScientificBackgroundMotifs';

export default function About() {
  return (
    <section 
      id="about" 
      className="section-editorial"
      style={{
        backgroundColor: '#FAF5EC',
        borderTop: '1px solid rgba(16, 41, 31, 0.12)',
        borderBottom: '1px solid rgba(16, 41, 31, 0.12)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Cytogenetic Chromosome Watermark */}
      <div 
        style={{
          position: 'absolute',
          top: '40px',
          right: '-40px',
          color: 'var(--color-sage)',
          opacity: 0.1,
          pointerEvents: 'none',
          zIndex: 0
        }}
        aria-hidden="true"
      >
        <ChromosomeWatermark width={380} height={320} />
      </div>

      <div className="container-editorial" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div className="section-header-editorial">
          <div className="section-header-top">
            <span className="section-indexer">SEC. 02 / 07 · BIOGRAPHY & ETHOS</span>
            <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              FIRST-YEAR TRAJECTORY (2026–2027)
            </span>
          </div>

          <h2 className="display-section">
            At the Threshold of Molecular Science
          </h2>
        </div>

        {/* Two-Column Editorial Narrative & Academic Manifest */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Authentic Student Narrative */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p className="lead-editorial" style={{ margin: 0, color: 'var(--color-forest)' }}>
              My scientific journey is just beginning. As a first-year undergraduate pursuing a Bachelor of Technology in Biotechnology at Lovely Professional University, I am actively building my understanding of the fundamental principles that govern living matter.
            </p>

            <p className="body-editorial" style={{ margin: 0 }}>
              Rather than claiming early specialization, I approach my undergraduate training with intellectual curiosity and dedication to foundational rigor. I spend my days working through the core sciences — cellular biology, organic and physical chemistry, and biostatistics — learning how molecular structures dictate organismal function.
            </p>

            <div 
              className="callout-quote" 
              style={{ 
                margin: '0.5rem 0',
                backgroundColor: 'rgba(255, 255, 255, 0.65)',
                padding: '1.15rem 1.35rem',
                borderLeft: '3.5px solid var(--color-terracotta)',
                borderRadius: '2px',
                boxShadow: '0 2px 10px rgba(16,41,31,0.03)'
              }}
            >
              "Biotechnology is not merely a toolset; it is an inquiry into the logic of life. My objective as an undergraduate is to master this grammar from its foundational letters."
            </div>

            <p className="body-editorial" style={{ margin: 0 }}>
              I am particularly fascinated by the convergence of three interconnected disciplines: the exquisite informational fidelity of <strong style={{ color: 'var(--color-forest)' }}>Genetics and Molecular Biology</strong>, the metabolic adaptability of <strong style={{ color: 'var(--color-forest)' }}>Microorganisms</strong>, and the analytical power of <strong style={{ color: 'var(--color-forest)' }}>Bioinformatics</strong> to interpret biological data at scale.
            </p>

            {/* Academic Honesty Disclosure Badge */}
            <div 
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(16, 41, 31, 0.14)',
                borderLeft: '3.5px solid var(--color-sage)',
                borderRadius: '3px',
                padding: '1.1rem 1.35rem',
                display: 'flex',
                gap: '0.95rem',
                boxShadow: '0 4px 14px -3px rgba(16, 41, 31, 0.05)'
              }}
            >
              <div style={{ color: 'var(--color-sage)', flexShrink: 0, marginTop: '2px' }}>
                <BookIcon size={20} />
              </div>
              <div style={{ fontSize: '0.84rem', color: 'var(--color-forest)', lineHeight: 1.55 }}>
                <strong style={{ display: 'block', marginBottom: '0.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.06em', color: 'var(--color-forest)' }}>
                  NOTE ON ACADEMIC STANDING & ETHICS
                </strong>
                This website transparently reflects my status as a first-year undergraduate student (Class of 2030). The milestones, research themes, and laboratory procedures discussed represent active coursework and prospective learning priorities rather than completed research papers or private industry roles.
              </div>
            </div>
          </div>

          {/* Right Column: Academic Dossier Manifest */}
          <div 
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(16, 41, 31, 0.16)',
              borderRadius: '4px',
              padding: 'clamp(1.5rem, 3vw, 2.25rem)',
              boxShadow: '0 12px 36px -10px rgba(16, 41, 31, 0.07)',
              position: 'relative'
            }}
          >
            {/* Archival Brass Corner Accents */}
            <div style={{ position: 'absolute', top: '5px', left: '5px', color: 'var(--color-brass)', fontSize: '0.75rem', lineHeight: 1, pointerEvents: 'none' }}>⌜</div>
            <div style={{ position: 'absolute', top: '5px', right: '5px', color: 'var(--color-brass)', fontSize: '0.75rem', lineHeight: 1, pointerEvents: 'none' }}>⌝</div>
            <div style={{ position: 'absolute', bottom: '5px', left: '5px', color: 'var(--color-brass)', fontSize: '0.75rem', lineHeight: 1, pointerEvents: 'none' }}>⌞</div>
            <div style={{ position: 'absolute', bottom: '5px', right: '5px', color: 'var(--color-brass)', fontSize: '0.75rem', lineHeight: 1, pointerEvents: 'none' }}>⌟</div>

            {/* Dossier Header */}
            <div 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(16, 41, 31, 0.12)',
                paddingBottom: '0.85rem',
                marginBottom: '1.25rem'
              }}
            >
              <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-forest)' }}>
                ACADEMIC DOSSIER · LPU
              </span>
              <span className="mono-tag" style={{ backgroundColor: 'var(--color-sage-pale)', color: 'var(--color-forest)' }}>
                ACTIVE SEMESTER · 2026–2027
              </span>
            </div>

            {/* Structured Metadata Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <span className="caption-editorial" style={{ fontSize: '0.7rem', display: 'block', textTransform: 'uppercase' }}>
                  Full Candidate Name
                </span>
                <strong style={{ fontSize: '1.15rem', color: 'var(--color-forest)', fontFamily: 'var(--font-serif)' }}>
                  {STUDENT_PROFILE.name}
                </strong>
              </div>

              <div>
                <span className="caption-editorial" style={{ fontSize: '0.7rem', display: 'block', textTransform: 'uppercase' }}>
                  Program of Study
                </span>
                <strong style={{ fontSize: '0.98rem', color: 'var(--color-forest)' }}>
                  {STUDENT_PROFILE.degree}
                </strong>
              </div>

              <div>
                <span className="caption-editorial" style={{ fontSize: '0.7rem', display: 'block', textTransform: 'uppercase' }}>
                  Institutional Affiliation
                </span>
                <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                  {STUDENT_PROFILE.university}, Punjab, India
                </span>
              </div>

              <div>
                <span className="caption-editorial" style={{ fontSize: '0.7rem', display: 'block', textTransform: 'uppercase' }}>
                  Undergraduate Cohort
                </span>
                <span className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--color-terracotta)', fontWeight: 600 }}>
                  2026 – 2030 (Class of 2030)
                </span>
              </div>

              <div style={{ borderTop: '1px dashed rgba(16, 41, 31, 0.12)', paddingTop: '1rem' }}>
                <span className="caption-editorial" style={{ fontSize: '0.7rem', display: 'block', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Core Foundational Pillars
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.85rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-terracotta)' }} />
                    <span style={{ color: 'var(--color-forest)', fontWeight: 500 }}>Genetics & Molecular Biology</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.85rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-sage)' }} />
                    <span style={{ color: 'var(--color-forest)', fontWeight: 500 }}>Microbiology & Microbial Physiology</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.85rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-forest)' }} />
                    <span style={{ color: 'var(--color-forest)', fontWeight: 500 }}>Bioinformatics & Sequence Analysis</span>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px dashed rgba(16, 41, 31, 0.12)', paddingTop: '1rem' }}>
                <span className="caption-editorial" style={{ fontSize: '0.7rem', display: 'block', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Core Academic Values
                </span>
                <p className="caption-editorial" style={{ margin: 0, fontSize: '0.82rem', lineHeight: 1.5 }}>
                  Scientific Rigor · Intellectual Humility · Collaborative Communication · Diligent Laboratory Observation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
