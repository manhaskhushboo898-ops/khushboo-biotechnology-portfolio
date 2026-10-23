import React, { useState } from 'react';


export default function PcrCycleExplainer() {
  const [activeStep, setActiveStep] = useState(0); // 0: Denaturation, 1: Annealing, 2: Extension
  const [cycles, setCycles] = useState(12);

  const steps = [
    {
      step: 1,
      name: "Denaturation",
      temp: "94°C – 98°C",
      duration: "30 – 60 seconds",
      color: "#C28251", // Terracotta
      summary: "Thermal disruption of inter-strand hydrogen bonds.",
      mechanism: "Thermal kinetic energy disrupts the weak hydrogen bonds linking complementary purines and pyrimidines, separating double-stranded template DNA (dsDNA) into two flexible single-stranded templates (ssDNA) without breaking covalent phosphodiester bonds.",
      molecularView: "Double helix unzips into two isolated single strands."
    },
    {
      step: 2,
      name: "Annealing",
      temp: "50°C – 65°C",
      duration: "20 – 40 seconds",
      color: "#B89758", // Brass
      summary: "Sequence-specific oligonucleotide primer hybridization.",
      mechanism: "Reaction temperature is lowered below the primer melting temperature (Tm ~ 5°C below Tm). Short synthetic oligonucleotide primers (typically 18–25 nt) diffuse rapidly and hybridize to complementary flanking target sequences on the single-stranded templates via Watson-Crick hydrogen bonding.",
      molecularView: "Forward and reverse primers bind flanking ends of target sequence."
    },
    {
      step: 3,
      name: "Extension (Elongation)",
      temp: "72°C",
      duration: "1 min / 1,000 bp",
      color: "#4E7259", // Sage
      summary: "Thermostable Taq DNA Polymerase 5'→3' DNA synthesis.",
      mechanism: "Thermostable DNA polymerase (historically isolated from Thermus aquaticus) binds the 3'-OH terminus of the annealed primers. Using free deoxynucleoside triphosphates (dNTPs: dATP, dCTP, dGTP, dTTP) and Mg²⁺ cofactors, it synthesizes new complementary strands with 5'→3' polymerase activity at ~1,000 nucleotides per minute.",
      molecularView: "Polymerase incorporates complementary dNTPs, yielding double-stranded amplicons."
    }
  ];

  const current = steps[activeStep];
  const ampliconCount = Math.pow(2, cycles);

  const formatNumber = (num) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)} Billion`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)} Million`;
    return num.toLocaleString();
  };

  return (
    <div
      className="pcr-cycle-exhibit"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(16, 41, 31, 0.15)',
        borderRadius: '4px',
        padding: 'clamp(1.5rem, 3vw, 2.5rem)',
        boxShadow: '0 8px 30px -10px rgba(16, 41, 31, 0.06)'
      }}
    >
      {/* Exhibit Header */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          flexWrap: 'wrap',
          gap: '1rem',
          borderBottom: '1px solid rgba(16, 41, 31, 0.1)',
          paddingBottom: '1rem',
          marginBottom: '1.75rem'
        }}
      >
        <div>
          <span className="scientific-meta">MINI EXHIBIT 04</span>
          <h3 className="display-subsection" style={{ marginTop: '0.35rem', color: 'var(--color-forest)' }}>
            Polymerase Chain Reaction (PCR) Thermal Kinetics
          </h3>
          <p className="caption-editorial" style={{ marginTop: '0.35rem', maxWidth: '640px' }}>
            Educational walkthrough of the three cyclical thermal stages that drive exponential in vitro DNA amplification: Denaturation, Annealing, and Enzymatic Extension.
          </p>
        </div>

        <span className="mono-tag" style={{ backgroundColor: 'var(--color-ivory)', color: 'var(--color-forest)' }}>
          AMPLIFICATION: 2ⁿ KINETICS
        </span>
      </div>

      {/* 3 Step Interactive Stage Tabs */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.75rem',
          marginBottom: '1.5rem'
        }}
      >
        {steps.map((st, idx) => {
          const isActive = activeStep === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveStep(idx)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '1rem',
                backgroundColor: isActive ? 'var(--color-ivory-light)' : 'var(--color-ivory)',
                border: isActive ? `2px solid ${st.color}` : '1px solid rgba(16, 41, 31, 0.12)',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '0.35rem' }}>
                <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  STAGE 0{st.step}
                </span>
                <span className="font-mono" style={{ fontSize: '0.72rem', fontWeight: 700, color: st.color }}>
                  {st.temp}
                </span>
              </div>
              <strong style={{ fontSize: '1rem', color: 'var(--color-forest)' }}>
                {st.name}
              </strong>
              <span className="caption-editorial" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                {st.duration}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Step Explainer Card */}
      <div 
        style={{
          backgroundColor: 'var(--color-ivory-light)',
          border: '1px solid rgba(16, 41, 31, 0.12)',
          borderRadius: '4px',
          padding: '1.5rem',
          marginBottom: '1.5rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span 
              className="mono-tag" 
              style={{ 
                backgroundColor: current.color, 
                color: '#FFFFFF',
                fontWeight: 600
              }}
            >
              {current.temp}
            </span>
            <h4 className="display-subsection" style={{ margin: 0, fontSize: '1.25rem' }}>
              Stage {current.step}: {current.name}
            </h4>
          </div>

          <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            CYCLE DURATION: {current.duration}
          </span>
        </div>

        <p className="body-editorial" style={{ fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '0.85rem' }}>
          {current.mechanism}
        </p>

        {/* Visual Schematics of the Active Step */}
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(16, 41, 31, 0.1)',
            borderRadius: '4px',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80px'
          }}
        >
          {activeStep === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '80%', maxWidth: '400px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="font-mono" style={{ fontSize: '0.7rem' }}>5'</span>
                <div style={{ flex: 1, height: '3px', backgroundColor: '#C28251', borderRadius: '2px' }} />
                <span className="font-mono" style={{ fontSize: '0.7rem' }}>3'</span>
              </div>
              <div style={{ textAlign: 'center', fontSize: '0.72rem', color: '#C28251' }} className="font-mono">
                [95°C: HYDROGEN BONDS DISRUPTED — STRANDS SEPARATED]
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="font-mono" style={{ fontSize: '0.7rem' }}>3'</span>
                <div style={{ flex: 1, height: '3px', backgroundColor: '#4E7259', borderRadius: '2px' }} />
                <span className="font-mono" style={{ fontSize: '0.7rem' }}>5'</span>
              </div>
            </div>
          )}

          {activeStep === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '80%', maxWidth: '400px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="font-mono" style={{ fontSize: '0.7rem' }}>5'</span>
                <div style={{ flex: 1, height: '2px', backgroundColor: '#C28251' }} />
                {/* Annealed primer */}
                <div style={{ width: '60px', height: '4px', backgroundColor: '#B89758', borderRadius: '2px' }} title="Reverse Primer" />
                <span className="font-mono" style={{ fontSize: '0.7rem' }}>3'</span>
              </div>
              <div style={{ textAlign: 'center', fontSize: '0.72rem', color: '#B89758' }} className="font-mono">
                [55°C: PRIMERS SPECIFICALLY HYBRIDIZE FLANKING SEQUENCES]
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="font-mono" style={{ fontSize: '0.7rem' }}>3'</span>
                <div style={{ width: '60px', height: '4px', backgroundColor: '#B89758', borderRadius: '2px' }} title="Forward Primer" />
                <div style={{ flex: 1, height: '2px', backgroundColor: '#4E7259' }} />
                <span className="font-mono" style={{ fontSize: '0.7rem' }}>5'</span>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '80%', maxWidth: '400px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="font-mono" style={{ fontSize: '0.7rem' }}>5'</span>
                <div style={{ flex: 1, height: '3px', backgroundColor: '#C28251' }} />
                <div style={{ width: '80px', height: '3px', backgroundColor: '#4E7259', borderStyle: 'dashed' }} />
                <span className="font-mono" style={{ fontSize: '0.7rem' }}>3'</span>
              </div>
              <div style={{ textAlign: 'center', fontSize: '0.72rem', color: '#4E7259' }} className="font-mono">
                [72°C: TAQ POLYMERASE SYNTHESIZES NASCENT STRAND 5'→3']
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="font-mono" style={{ fontSize: '0.7rem' }}>3'</span>
                <div style={{ width: '80px', height: '3px', backgroundColor: '#C28251', borderStyle: 'dashed' }} />
                <div style={{ flex: 1, height: '3px', backgroundColor: '#4E7259' }} />
                <span className="font-mono" style={{ fontSize: '0.7rem' }}>5'</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Exponential Amplification Calculator */}
      <div 
        style={{
          backgroundColor: 'var(--color-ivory)',
          border: '1px solid rgba(16, 41, 31, 0.12)',
          borderRadius: '4px',
          padding: '1.25rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <div>
            <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              EXPONENTIAL AMPLIFICATION KINETICS: Y = 2ⁿ
            </span>
            <h5 className="display-subsection" style={{ margin: '0.25rem 0 0', fontSize: '1.15rem' }}>
              Cycle Number: n = {cycles}
            </h5>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span className="caption-editorial" style={{ display: 'block' }}>Theoretical Yield</span>
            <strong className="font-mono" style={{ fontSize: '1.35rem', color: 'var(--color-terracotta)' }}>
              {formatNumber(ampliconCount)} copies
            </strong>
          </div>
        </div>

        <input
          type="range"
          min="1"
          max="32"
          value={cycles}
          onChange={(e) => setCycles(parseInt(e.target.value, 10))}
          style={{ width: '100%', accentColor: 'var(--color-forest)', cursor: 'pointer' }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.35rem' }} className="font-mono">
          <span>n = 1 (2 copies)</span>
          <span>n = 10 (1,024)</span>
          <span>n = 20 (1.05 Million)</span>
          <span>n = 30 (1.07 Billion)</span>
        </div>

        <p className="caption-editorial" style={{ marginTop: '0.75rem', borderTop: '1px dashed rgba(16,41,31,0.1)', paddingTop: '0.5rem' }}>
          Historical Scientific Note: Prior to the isolation of thermostable Taq DNA polymerase from the thermophilic bacterium Thermus aquaticus by Thomas Brock & Hudson Freeze, researchers were forced to manually replenish heat-labile E. coli DNA polymerase I Klenow fragment after every single denaturation cycle!
        </p>
      </div>
    </div>
  );
}
