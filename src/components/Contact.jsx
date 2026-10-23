import React, { useState } from 'react';
import { STUDENT_PROFILE } from '../data/portfolioData';
import { MailIcon, LinkedInIcon, CopyIcon, CheckIcon, ExternalLinkIcon } from './Icons';
import { CelestialPolarScale } from './ScientificBackgroundMotifs';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(STUDENT_PROFILE.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  return (
    <section id="contact" className="section-editorial" style={{ backgroundColor: 'var(--color-ivory)' }}>
      <div className="container-editorial">
        <div 
          style={{
            backgroundColor: '#0E241B',
            backgroundImage: 'radial-gradient(circle at 85% 20%, rgba(194, 130, 81, 0.12) 0%, rgba(16, 41, 31, 0) 55%), radial-gradient(circle at 15% 85%, rgba(78, 114, 89, 0.18) 0%, rgba(16, 41, 31, 0) 60%)',
            color: 'var(--color-ivory)',
            borderRadius: '6px',
            padding: 'clamp(2.5rem, 6vw, 4.5rem)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 24px 56px -12px rgba(10, 26, 19, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          {/* Subtle Decorative Polar Scale in Darkroom Backing */}
          <div 
            style={{
              position: 'absolute',
              right: '-80px',
              bottom: '-80px',
              color: '#FFFFFF',
              opacity: 0.05,
              pointerEvents: 'none'
            }}
            aria-hidden="true"
          >
            <CelestialPolarScale size={520} />
          </div>

          <div style={{ maxWidth: '800px', position: 'relative', zIndex: 1 }}>
            {/* Header Stamp */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <span className="scientific-meta" style={{ color: 'var(--color-brass-light)' }}>
                COMMUNICATION & SCIENTIFIC COLLABORATION
              </span>
              <span 
                className="mono-tag" 
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.08)', 
                  color: 'var(--color-ivory)', 
                  borderColor: 'rgba(255, 255, 255, 0.15)' 
                }}
              >
                OPEN ACADEMIC DIALOGUE
              </span>
            </div>

            {/* Closing Heading */}
            <h2 
              className="display-section" 
              style={{ 
                color: '#FFFFFF', 
                marginBottom: '1.15rem',
                fontSize: 'clamp(2.4rem, 5.2vw, 3.85rem)',
                lineHeight: 1.08
              }}
            >
              Let’s Discuss Science, Molecular Systems & Research.
            </h2>

            <p 
              className="lead-editorial" 
              style={{ 
                color: 'var(--color-sage-pale)', 
                marginBottom: '2.5rem',
                maxWidth: '680px',
                lineHeight: 1.65
              }}
            >
              Whether you are an undergraduate peer, an academic researcher, or a mentor in the life sciences, I welcome discussions regarding molecular genetics, microbial biology, student research opportunities, or foundational coursework.
            </p>

            {/* Direct Communication Channels */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '2.5rem' }}>
              {/* Primary Email CTA */}
              <a
                href={`mailto:${STUDENT_PROFILE.email}`}
                className="btn-accent-editorial"
                style={{ fontSize: '0.95rem', padding: '0.85rem 1.85rem' }}
              >
                <MailIcon size={18} />
                <span>Compose Direct Email</span>
              </a>

              {/* Copy Email Button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.85rem 1.45rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '0.88rem',
                  transition: 'all 0.15s ease'
                }}
                className="font-mono"
              >
                {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
                <span>{copied ? "COPIED TO CLIPBOARD" : STUDENT_PROFILE.email}</span>
              </button>

              {/* LinkedIn Profile CTA */}
              <a
                href={STUDENT_PROFILE.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '0.85rem 1.45rem',
                  backgroundColor: 'transparent',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  borderRadius: '3px',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  transition: 'all 0.15s ease'
                }}
                className="font-mono"
              >
                <LinkedInIcon size={16} />
                <span>LINKEDIN PROFILE</span>
                <ExternalLinkIcon size={14} />
              </a>
            </div>

            {/* Institutional Coordinates Card */}
            <div 
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                paddingTop: '1.65rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.25rem',
                fontSize: '0.85rem'
              }}
              className="font-mono"
            >
              <div>
                <span style={{ color: 'var(--color-sage-light)', display: 'block', fontSize: '0.7rem' }}>
                  INSTITUTION
                </span>
                <strong style={{ color: '#FFFFFF' }}>{STUDENT_PROFILE.university}</strong>
              </div>

              <div>
                <span style={{ color: 'var(--color-sage-light)', display: 'block', fontSize: '0.7rem' }}>
                  LOCATION
                </span>
                <strong style={{ color: '#FFFFFF' }}>Phagwara, Punjab, India</strong>
              </div>

              <div>
                <span style={{ color: 'var(--color-sage-light)', display: 'block', fontSize: '0.7rem' }}>
                  COORDINATES
                </span>
                <strong style={{ color: '#FFFFFF' }}>{STUDENT_PROFILE.campusCoordinates}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
