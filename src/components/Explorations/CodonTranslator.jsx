import React, { useState, useMemo } from 'react';
import { CODON_TABLE, CODON_PRESETS } from '../../data/portfolioData';


export default function CodonTranslator() {
  const [dnaInput, setDnaInput] = useState(CODON_PRESETS[0].sequence);
  const [selectedCodonIndex, setSelectedCodonIndex] = useState(0);

  // Clean and sanitize input
  const sanitizedInput = useMemo(() => {
    return dnaInput.toUpperCase().replace(/\s+/g, '');
  }, [dnaInput]);

  // Validate characters (only A, C, G, T allowed)
  const validationError = useMemo(() => {
    const invalidChars = sanitizedInput.match(/[^ACGT]/g);
    if (invalidChars) {
      const unique = [...new Set(invalidChars)];
      return `Invalid nucleotide character(s) detected: [${unique.join(', ')}]. DNA coding strand accepts only A, C, G, and T.`;
    }
    return null;
  }, [sanitizedInput]);

  // Transcribe to mRNA (T -> U)
  const mrnaSequence = useMemo(() => {
    return sanitizedInput.replace(/T/g, 'U');
  }, [sanitizedInput]);

  // Parse codons into triplets and translate
  const translationResult = useMemo(() => {
    if (validationError || !sanitizedInput) {
      return {
        codons: [],
        polypeptide: [],
        stopCodonHit: false,
        stopCodonIndex: -1,
        incompleteTrailer: ""
      };
    }

    const codons = [];
    const polypeptide = [];
    let stopCodonHit = false;
    let stopCodonIndex = -1;

    const fullCodonLength = Math.floor(mrnaSequence.length / 3) * 3;
    const incompleteTrailer = mrnaSequence.slice(fullCodonLength);

    for (let i = 0; i < fullCodonLength; i += 3) {
      const triplet = mrnaSequence.slice(i, i + 3);
      const dnaTriplet = sanitizedInput.slice(i, i + 3);
      const codonInfo = CODON_TABLE[triplet] || { aa: "???", name: "Unknown", letter: "?", type: "Unknown" };

      const codonItem = {
        index: i / 3,
        triplet,
        dnaTriplet,
        info: codonInfo,
        isStop: codonInfo.aa === "STOP",
        isPostStop: stopCodonHit,
        isStart: triplet === "AUG"
      };

      codons.push(codonItem);

      if (!stopCodonHit) {
        if (codonInfo.aa === "STOP") {
          stopCodonHit = true;
          stopCodonIndex = i / 3;
        } else {
          polypeptide.push({
            ...codonItem,
            chainIndex: polypeptide.length + 1
          });
        }
      }
    }

    return {
      codons,
      polypeptide,
      stopCodonHit,
      stopCodonIndex,
      incompleteTrailer
    };
  }, [mrnaSequence, sanitizedInput, validationError]);

  const activeCodon = translationResult.codons[selectedCodonIndex] || translationResult.codons[0];

  const getBadgeColor = (type = "") => {
    if (type.includes("Hydrophobic")) return { bg: "#F4EADA", text: "#A5623B" };
    if (type.includes("Basic") || type.includes("Positively")) return { bg: "#EBF1EC", text: "#10291F" };
    if (type.includes("Acidic") || type.includes("Negatively")) return { bg: "#FBEAE9", text: "#A33B39" };
    if (type.includes("Polar")) return { bg: "#E3ECE4", text: "#33503D" };
    if (type.includes("Termination")) return { bg: "#FBEAE9", text: "#A33B39" };
    return { bg: "#FAF7F2", text: "#4E7259" };
  };

  return (
    <div
      className="codon-translator-exhibit"
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
          <span className="scientific-meta">MINI EXHIBIT 02</span>
          <h3 className="display-subsection" style={{ marginTop: '0.35rem', color: 'var(--color-forest)' }}>
            Central Dogma Codon Translator
          </h3>
          <p className="caption-editorial" style={{ marginTop: '0.35rem', maxWidth: '640px' }}>
            Simulate transcription of a 5'→3' DNA coding strand to messenger RNA (U instead of T), followed by standard ribosome triplet translation into a polypeptide chain.
          </p>
        </div>

        {/* Preset Sequences */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PRESETS:</span>
          {CODON_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setDnaInput(preset.sequence);
                setSelectedCodonIndex(0);
              }}
              style={{
                fontSize: '0.72rem',
                padding: '0.25rem 0.55rem',
                backgroundColor: dnaInput === preset.sequence ? 'var(--color-forest)' : 'var(--color-ivory)',
                color: dnaInput === preset.sequence ? '#FFF' : 'var(--color-forest)',
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

      {/* Input Section */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
          <label 
            htmlFor="dna-coding-input" 
            className="font-mono" 
            style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-forest)' }}
          >
            DNA CODING STRAND (5' → 3')
          </label>
          <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            {sanitizedInput.length} NUCLEOTIDES · {Math.floor(sanitizedInput.length / 3)} FULL CODONS
          </span>
        </div>

        <textarea
          id="dna-coding-input"
          value={dnaInput}
          onChange={(e) => {
            setDnaInput(e.target.value);
            setSelectedCodonIndex(0);
          }}
          rows={3}
          placeholder="Enter 5' to 3' DNA sequence (e.g. ATGAGTAAA...)"
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--color-ivory-light)',
            border: validationError ? '1.5px solid #D9534F' : '1px solid rgba(16, 41, 31, 0.2)',
            borderRadius: '4px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.88rem',
            color: 'var(--color-forest)',
            lineHeight: 1.5,
            letterSpacing: '0.08em',
            resize: 'vertical'
          }}
        />

        {validationError && (
          <div 
            style={{ 
              marginTop: '0.5rem', 
              padding: '0.5rem 0.75rem', 
              backgroundColor: '#FBEAE9', 
              border: '1px solid #D9534F',
              borderRadius: '3px',
              color: '#8A3B39',
              fontSize: '0.78rem'
            }}
            className="font-mono"
          >
            {validationError}
          </div>
        )}
      </div>

      {/* Stage 1: Transcription (mRNA Transcript) */}
      <div 
        style={{
          backgroundColor: 'var(--color-ivory)',
          border: '1px solid rgba(16, 41, 31, 0.12)',
          borderRadius: '4px',
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="mono-tag" style={{ backgroundColor: 'var(--color-sage-pale)', color: 'var(--color-forest)' }}>
              STAGE 1: TRANSCRIPTION
            </span>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              mRNA TRANSCRIPT (5' → 3')
            </span>
          </div>

          <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--color-terracotta)' }}>
            [THYMINE → URACIL SUBSTITUTION]
          </span>
        </div>

        {/* Grouped mRNA Triplet Badges */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.45rem',
            padding: '0.5rem 0',
            maxHeight: '130px',
            overflowY: 'auto'
          }}
        >
          {translationResult.codons.map((codon, idx) => {
            const isSelected = selectedCodonIndex === idx;
            const isStop = codon.isStop;
            const isPostStop = codon.isPostStop;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedCodonIndex(idx)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                  padding: '0.25rem 0.45rem',
                  backgroundColor: isSelected ? 'var(--color-forest)' : (isStop ? '#FBEAE9' : (isPostStop ? 'rgba(16,41,31,0.04)' : '#FFFFFF')),
                  color: isSelected ? '#FFFFFF' : (isStop ? '#D9534F' : (isPostStop ? 'var(--text-faint)' : 'var(--color-forest)')),
                  border: isSelected ? '1px solid var(--color-forest)' : '1px solid rgba(16,41,31,0.15)',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  opacity: isPostStop ? 0.6 : 1,
                  fontSize: '0.78rem'
                }}
                className="font-mono"
                title={`Codon ${idx + 1}: ${codon.triplet} codes for ${codon.info.name}`}
              >
                <strong>{codon.triplet}</strong>
                <span style={{ fontSize: '0.62rem', opacity: 0.8 }}>
                  ({codon.info.aa})
                </span>
              </button>
            );
          })}

          {/* Incomplete trailer warning */}
          {translationResult.incompleteTrailer && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.25rem 0.55rem',
                backgroundColor: '#FFF2DE',
                border: '1px dashed #C28251',
                borderRadius: '3px',
                color: '#8A5826',
                fontSize: '0.78rem'
              }}
              className="font-mono"
              title="Incomplete codon remaining at 3' end"
            >
              <span>+{translationResult.incompleteTrailer} (Incomplete)</span>
            </div>
          )}
        </div>

        {translationResult.incompleteTrailer && (
          <p className="caption-editorial" style={{ marginTop: '0.5rem', color: '#8A5826' }}>
            Note on reading frame: {translationResult.incompleteTrailer.length} nucleotide(s) remaining at the 3' terminus cannot form a triplet codon. Ribosomes require a full 3-base anticodon pairing to recruit an aminoacyl-tRNA.
          </p>
        )}
      </div>

      {/* Stage 2: Ribosomal Translation (Polypeptide Chain) */}
      <div 
        style={{
          backgroundColor: 'var(--color-ivory)',
          border: '1px solid rgba(16, 41, 31, 0.12)',
          borderRadius: '4px',
          padding: '1.25rem',
          marginBottom: '1.5rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="mono-tag" style={{ backgroundColor: 'var(--color-brass-pale)', color: 'var(--color-forest)' }}>
              STAGE 2: TRANSLATION
            </span>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              SYNTHESIZED POLYPEPTIDE CHAIN (N-Terminus → C-Terminus)
            </span>
          </div>

          <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            {translationResult.polypeptide.length} RESIDUES SYNTHESIZED
          </span>
        </div>

        {/* Polypeptide Bead Chain */}
        {translationResult.polypeptide.length > 0 ? (
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              overflowX: 'auto',
              padding: '0.75rem 0.25rem'
            }}
          >
            <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-terracotta)' }}>
              H₂N—
            </span>

            {translationResult.polypeptide.map((pep, pIdx) => {
              const badgeStyle = getBadgeColor(pep.info.type);
              const isSelected = selectedCodonIndex === pep.index;

              return (
                <React.Fragment key={pIdx}>
                  <button
                    type="button"
                    onClick={() => setSelectedCodonIndex(pep.index)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '44px',
                      height: '48px',
                      padding: '0.2rem 0.35rem',
                      backgroundColor: isSelected ? 'var(--color-forest)' : badgeStyle.bg,
                      color: isSelected ? '#FFFFFF' : badgeStyle.text,
                      border: isSelected ? '2px solid var(--color-forest)' : '1px solid rgba(16,41,31,0.15)',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      flexShrink: 0
                    }}
                    className="font-mono"
                    title={`Residue ${pep.chainIndex}: ${pep.info.name} (${pep.info.type})`}
                  >
                    <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>{pep.info.letter}</span>
                    <span style={{ fontSize: '0.62rem', opacity: 0.85 }}>{pep.info.aa}</span>
                  </button>

                  {pIdx < translationResult.polypeptide.length - 1 && (
                    <span style={{ color: 'rgba(16,41,31,0.3)', fontWeight: 300 }}>—</span>
                  )}
                </React.Fragment>
              );
            })}

            {translationResult.stopCodonHit ? (
              <span className="font-mono" style={{ fontSize: '0.72rem', color: '#D9534F', fontWeight: 600, paddingLeft: '0.35rem' }}>
                —[STOP: {translationResult.codons[translationResult.stopCodonIndex]?.triplet}]—COOH
              </span>
            ) : (
              <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', paddingLeft: '0.35rem' }}>
                —COOH
              </span>
            )}
          </div>
        ) : (
          <p className="caption-editorial" style={{ padding: '0.5rem 0' }}>
            No polypeptide synthesized. Enter a valid DNA coding sequence to begin translation.
          </p>
        )}
      </div>

      {/* Active Codon Inspector Panel */}
      {activeCodon && (
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
            borderTop: '1px solid rgba(16, 41, 31, 0.1)',
            paddingTop: '1.25rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.45rem' }}>
              <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                INSPECTED CODON #{activeCodon.index + 1}
              </span>
              {activeCodon.isStart && (
                <span className="mono-tag" style={{ backgroundColor: 'var(--color-sage-pale)', color: 'var(--color-forest)' }}>
                  INITIATOR (START)
                </span>
              )}
              {activeCodon.isStop && (
                <span className="mono-tag" style={{ backgroundColor: '#FBEAE9', color: '#D9534F' }}>
                  TERMINATOR (STOP)
                </span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.45rem' }}>
              <h4 className="display-subsection" style={{ margin: 0, fontSize: '1.4rem' }}>
                {activeCodon.info.name}
              </h4>
              <span className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--color-forest)' }}>
                [{activeCodon.info.letter} / {activeCodon.info.aa}]
              </span>
            </div>

            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.82rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>DNA Coding: </span>
                <strong className="font-mono">{activeCodon.dnaTriplet}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>mRNA Codon: </span>
                <strong className="font-mono">{activeCodon.triplet}</strong>
              </div>
            </div>
          </div>

          <div>
            <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              BIOCHEMICAL CLASSIFICATION
            </span>
            <div style={{ marginTop: '0.35rem' }}>
              <strong style={{ fontSize: '0.92rem', color: 'var(--color-forest)' }}>
                {activeCodon.info.type}
              </strong>
              <p className="caption-editorial" style={{ marginTop: '0.35rem' }}>
                {activeCodon.isStop
                  ? "Stop codons bind peptide release factors (RF1/RF2 in prokaryotes, eRF1 in eukaryotes), hydrolyzing the peptidyl-tRNA bond and releasing the nascent chain."
                  : activeCodon.isStart
                  ? "AUG serves as the universal initiator codon, recruiting formylmethionine-tRNA (fMet) in prokaryotes or initiator methionine-tRNA in eukaryotes."
                  : "Amino acid side-chain properties govern secondary alpha-helices, beta-pleated sheets, and tertiary thermodynamic folding stability."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
