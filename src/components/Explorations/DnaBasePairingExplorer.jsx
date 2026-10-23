import React, { useState } from 'react';
import { DNA_BASE_INFO, DNA_SEQUENCE_PRESETS } from '../../data/portfolioData';
import { RotateIcon } from '../Icons';

export default function DnaBasePairingExplorer() {
  const [sequence, setSequence] = useState("TATAAAGG");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mismatchMode, setMismatchMode] = useState(false);

  // Watson-Crick complementary logic
  const getComplement = (base, isMismatched = false) => {
    if (isMismatched) {
      // Force non-Watson Crick pairing
      if (base === 'A') return 'C';
      if (base === 'T') return 'G';
      if (base === 'G') return 'T';
      if (base === 'C') return 'A';
    }
    return DNA_BASE_INFO[base]?.complement || 'N';
  };

  const handleAddBase = (base) => {
    if (sequence.length >= 18) return; // Prevent excessive horizontal overflow
    setSequence((prev) => prev + base);
    setSelectedIndex(sequence.length);
  };

  const handleBackspace = () => {
    if (sequence.length <= 1) return;
    setSequence((prev) => prev.slice(0, -1));
    setSelectedIndex((prev) => Math.min(prev, sequence.length - 2));
  };

  const handleReset = (presetSeq = "TATAAAGG") => {
    setSequence(presetSeq);
    setSelectedIndex(0);
    setMismatchMode(false);
  };

  // Metrics calculation
  const totalBases = sequence.length;
  const countA = (sequence.match(/A/g) || []).length;
  const countT = (sequence.match(/T/g) || []).length;
  const countG = (sequence.match(/G/g) || []).length;
  const countC = (sequence.match(/C/g) || []).length;

  const gcContent = totalBases > 0 ? (((countG + countC) / totalBases) * 100).toFixed(1) : 0;
  // Wallace rule for Tm: 2*(A+T) + 4*(G+C)
  const tmEstimate = 2 * (countA + countT) + 4 * (countG + countC);
  const purines = countA + countG;
  const pyrimidines = countT + countC;

  const activeBase = sequence[selectedIndex] || 'A';
  const activeBaseInfo = DNA_BASE_INFO[activeBase];
  const activeComplement = getComplement(activeBase, mismatchMode && selectedIndex === 2);
  const isSelectedMismatched = mismatchMode && selectedIndex === 2;

  return (
    <div 
      className="dna-pairing-exhibit"
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
          <span className="scientific-meta">MINI EXHIBIT 01</span>
          <h3 className="display-subsection" style={{ marginTop: '0.35rem', color: 'var(--color-forest)' }}>
            Watson-Crick DNA Base-Pairing Explorer
          </h3>
          <p className="caption-editorial" style={{ marginTop: '0.35rem', maxWidth: '640px' }}>
            Investigate complementary hydrogen bonding between purines and pyrimidines across antiparallel strands (5'→3' and 3'→5').
          </p>
        </div>

        {/* Preset Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PRESETS:</span>
          {DNA_SEQUENCE_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleReset(preset.seq)}
              style={{
                fontSize: '0.72rem',
                padding: '0.25rem 0.55rem',
                backgroundColor: sequence === preset.seq ? 'var(--color-forest)' : 'var(--color-ivory)',
                color: sequence === preset.seq ? '#FFF' : 'var(--color-forest)',
                border: '1px solid rgba(16, 41, 31, 0.2)',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
              className="font-mono"
            >
              {preset.label.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Strand Pairing Diagram */}
      <div 
        style={{
          backgroundColor: 'var(--color-ivory-light)',
          border: '1px solid rgba(16, 41, 31, 0.12)',
          borderRadius: '4px',
          padding: '1.5rem',
          overflowX: 'auto',
          marginBottom: '1.75rem'
        }}
      >
        <div style={{ minWidth: '580px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          
          {/* Top Strand: 5' to 3' */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span 
              className="font-mono" 
              style={{ 
                width: '65px', 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                color: 'var(--color-terracotta)' 
              }}
            >
              5' SENSE →
            </span>

            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'nowrap' }}>
              {sequence.split('').map((base, idx) => {
                const info = DNA_BASE_INFO[base];
                const isSelected = selectedIndex === idx;

                return (
                  <button
                    key={`top-${idx}`}
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    title={`Click to inspect base ${base} at position ${idx + 1}`}
                    style={{
                      width: '38px',
                      height: '42px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: isSelected ? 'var(--color-forest)' : '#FFFFFF',
                      color: isSelected ? '#FFFFFF' : info?.color || '#000',
                      border: isSelected ? '2px solid var(--color-forest)' : `1px solid ${info?.color || 'rgba(16,41,31,0.2)'}`,
                      borderRadius: '3px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      position: 'relative'
                    }}
                    className="font-mono"
                  >
                    <span style={{ fontSize: '1.05rem', fontWeight: 700 }}>{base}</span>
                    <span style={{ fontSize: '0.58rem', opacity: isSelected ? 0.9 : 0.65 }}>
                      {idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-terracotta)' }}>3'</span>
          </div>

          {/* Hydrogen Bonding Connectors (Rungs) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '65px', fontSize: '0.68rem', color: 'var(--text-muted)' }} className="font-mono">
              H-BONDS
            </span>

            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'nowrap' }}>
              {sequence.split('').map((base, idx) => {
                const isMismatched = mismatchMode && idx === 2;
                const bondCount = isMismatched ? 0 : DNA_BASE_INFO[base]?.bonds || 2;
                const isSelected = selectedIndex === idx;

                return (
                  <div
                    key={`bond-${idx}`}
                    style={{
                      width: '38px',
                      height: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '2px'
                    }}
                  >
                    {isMismatched ? (
                      <span style={{ color: '#D9534F', fontSize: '0.65rem', fontWeight: 700 }} className="font-mono">
                        MIS!
                      </span>
                    ) : (
                      Array.from({ length: bondCount }).map((_, bIdx) => (
                        <div
                          key={bIdx}
                          style={{
                            width: '18px',
                            height: '2px',
                            backgroundColor: isSelected ? 'var(--color-forest)' : 'rgba(16, 41, 31, 0.35)',
                            borderRadius: '1px'
                          }}
                        />
                      ))
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Strand: 3' to 5' (Complementary & Antiparallel) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span 
              className="font-mono" 
              style={{ 
                width: '65px', 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                color: 'var(--color-sage)' 
              }}
            >
              3' ANTI ←
            </span>

            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'nowrap' }}>
              {sequence.split('').map((base, idx) => {
                const isMismatched = mismatchMode && idx === 2;
                const comp = getComplement(base, isMismatched);
                const info = DNA_BASE_INFO[comp];
                const isSelected = selectedIndex === idx;

                return (
                  <button
                    key={`bot-${idx}`}
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    title={`Complementary base ${comp} at position ${idx + 1}`}
                    style={{
                      width: '38px',
                      height: '42px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: isSelected ? 'var(--color-sage)' : '#FFFFFF',
                      color: isSelected ? '#FFFFFF' : (isMismatched ? '#D9534F' : info?.color || '#000'),
                      border: isMismatched 
                        ? '2px dashed #D9534F' 
                        : (isSelected ? '2px solid var(--color-sage)' : `1px solid ${info?.color || 'rgba(16,41,31,0.2)'}`),
                      borderRadius: '3px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    className="font-mono"
                  >
                    <span style={{ fontSize: '1.05rem', fontWeight: 700 }}>{comp}</span>
                    <span style={{ fontSize: '0.58rem', opacity: isSelected ? 0.9 : 0.65 }}>
                      {idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-sage)' }}>5'</span>
          </div>

        </div>
      </div>

      {/* Sequence Builder Controls */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.75rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--color-ivory)',
          border: '1px solid rgba(16, 41, 31, 0.1)',
          borderRadius: '4px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-forest)' }}>
            APPEND NUCLEOTIDE:
          </span>
          {['A', 'T', 'G', 'C'].map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => handleAddBase(b)}
              disabled={sequence.length >= 18}
              style={{
                width: '32px',
                height: '32px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFFFFF',
                color: DNA_BASE_INFO[b]?.color,
                border: '1px solid rgba(16, 41, 31, 0.2)',
                borderRadius: '3px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: sequence.length >= 18 ? 'not-allowed' : 'pointer',
                opacity: sequence.length >= 18 ? 0.5 : 1
              }}
              className="font-mono"
            >
              {b}
            </button>
          ))}

          <button
            type="button"
            onClick={handleBackspace}
            disabled={sequence.length <= 1}
            style={{
              padding: '0.3rem 0.65rem',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(16, 41, 31, 0.2)',
              borderRadius: '3px',
              fontSize: '0.75rem',
              color: 'var(--color-forest)',
              cursor: sequence.length <= 1 ? 'not-allowed' : 'pointer'
            }}
            className="font-mono"
          >
            ← BACKSPACE
          </button>

          <button
            type="button"
            onClick={() => handleReset("TATAAAGG")}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.3rem 0.65rem',
              backgroundColor: 'transparent',
              border: '1px solid rgba(16, 41, 31, 0.2)',
              borderRadius: '3px',
              fontSize: '0.75rem',
              color: 'var(--color-forest)',
              cursor: 'pointer'
            }}
            className="font-mono"
          >
            <RotateIcon size={12} />
            RESET
          </button>
        </div>

        {/* Mutation Mismatch Experiment Toggle */}
        <div>
          <button
            type="button"
            onClick={() => setMismatchMode(!mismatchMode)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.75rem',
              backgroundColor: mismatchMode ? '#D9534F' : 'transparent',
              color: mismatchMode ? '#FFFFFF' : '#8A3B39',
              border: '1px solid #D9534F',
              borderRadius: '3px',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            className="font-mono"
          >
            {mismatchMode ? "MISMATCH INDUCED (ACTIVE)" : "INDUCING POINT MISMATCH"}
          </button>
        </div>
      </div>

      {/* Two Column Inspector & Thermodynamic Metrics */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          borderTop: '1px solid rgba(16, 41, 31, 0.1)',
          paddingTop: '1.5rem'
        }}
      >
        {/* Selected Base Pair Chemical Profile */}
        <div 
          style={{
            backgroundColor: 'var(--color-ivory)',
            border: '1px solid rgba(16, 41, 31, 0.12)',
            borderRadius: '4px',
            padding: '1.25rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              BASE INSPECTOR · POSITION #{selectedIndex + 1}
            </span>
            <span 
              className="mono-tag" 
              style={{ 
                backgroundColor: isSelectedMismatched ? '#FBEAE9' : '#FFFFFF',
                color: isSelectedMismatched ? '#D9534F' : activeBaseInfo?.color 
              }}
            >
              {isSelectedMismatched ? "MISPAIRING CLASH" : `${activeBase} — ${activeComplement}`}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <h4 className="display-subsection" style={{ fontSize: '1.35rem', margin: 0 }}>
              {activeBaseInfo?.name}
            </h4>
            <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              ({activeBaseInfo?.formula})
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Class:</span>
              <strong style={{ color: 'var(--color-forest)' }}>{activeBaseInfo?.type}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Ring Structure:</span>
              <span>{activeBaseInfo?.rings}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Standard Hydrogen Bonds:</span>
              <strong>{activeBaseInfo?.bonds} Bonds</strong>
            </div>
          </div>

          <p className="caption-editorial" style={{ marginTop: '0.75rem', borderTop: '1px dashed rgba(16,41,31,0.1)', paddingTop: '0.65rem' }}>
            {isSelectedMismatched 
              ? "Warning: A purine-pyrimidine or purine-purine mismatch distorts the 2.0 nm helical diameter, triggering bacterial DNA Polymerase III 3'→5' proofreading exonuclease activity."
              : activeBaseInfo?.desc}
          </p>
        </div>

        {/* Thermodynamic & Sequence Metrics */}
        <div 
          style={{
            backgroundColor: 'var(--color-ivory)',
            border: '1px solid rgba(16, 41, 31, 0.12)',
            borderRadius: '4px',
            padding: '1.25rem'
          }}
        >
          <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            SEQUENCE THERMODYNAMICS & COMPOSITION
          </span>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              marginTop: '0.85rem'
            }}
          >
            <div>
              <span className="caption-editorial" style={{ display: 'block' }}>Length</span>
              <strong className="font-mono" style={{ fontSize: '1.25rem', color: 'var(--color-forest)' }}>
                {totalBases} bp
              </strong>
            </div>

            <div>
              <span className="caption-editorial" style={{ display: 'block' }}>GC Content</span>
              <strong className="font-mono" style={{ fontSize: '1.25rem', color: 'var(--color-sage)' }}>
                {gcContent}%
              </strong>
            </div>

            <div>
              <span className="caption-editorial" style={{ display: 'block' }}>Estimated Tm (Wallace)</span>
              <strong className="font-mono" style={{ fontSize: '1.25rem', color: 'var(--color-terracotta)' }}>
                {tmEstimate}°C
              </strong>
            </div>

            <div>
              <span className="caption-editorial" style={{ display: 'block' }}>Purine / Pyrimidine</span>
              <strong className="font-mono" style={{ fontSize: '1.25rem', color: 'var(--color-forest)' }}>
                {purines} : {pyrimidines}
              </strong>
            </div>
          </div>

          <div style={{ marginTop: '0.85rem', borderTop: '1px dashed rgba(16,41,31,0.1)', paddingTop: '0.65rem' }}>
            <span className="caption-editorial" style={{ fontSize: '0.78rem' }}>
              Educational Note: G≡C pairs require 3 hydrogen bonds compared to 2 for A=T pairs. Higher GC content directly increases oligonucleotide melting temperature (Tm) due to greater base stacking energy.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
