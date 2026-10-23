import React, { useState } from 'react';
import DnaBasePairingExplorer from './DnaBasePairingExplorer';
import CodonTranslator from './CodonTranslator';
import BacterialGrowthExplorer from './BacterialGrowthExplorer';
import PcrCycleExplainer from './PcrCycleExplainer';
import { DnaIcon, RibosomeIcon, MicrobeIcon, PcrIcon } from '../Icons';

export default function ExplorationsSection() {
  const [activeTab, setActiveTab] = useState("dna-pairing");

  const tabs = [
    {
      id: "dna-pairing",
      title: "DNA Base-Pairing",
      subtitle: "Watson-Crick H-Bonds & GC%",
      code: "EXHB-01",
      icon: DnaIcon
    },
    {
      id: "codon-translator",
      title: "Codon Translator",
      subtitle: "Transcription & Translation",
      code: "EXHB-02",
      icon: RibosomeIcon
    },
    {
      id: "bacterial-growth",
      title: "Bacterial Growth",
      subtitle: "Batch Kinetic Dynamics",
      code: "EXHB-03",
      icon: MicrobeIcon
    },
    {
      id: "pcr-thermal",
      title: "PCR Thermal Cycle",
      subtitle: "In Vitro DNA Amplification",
      code: "EXHB-04",
      icon: PcrIcon
    }
  ];

  return (
    <section 
      id="explorations" 
      className="section-editorial" 
      style={{ 
        backgroundColor: '#F4ECE0',
        borderBottom: '1px solid rgba(16, 41, 31, 0.14)',
        position: 'relative'
      }}
    >
      <div className="container-editorial">
        {/* Section Header */}
        <div className="section-header-editorial">
          <div className="section-header-top">
            <span className="section-indexer">SEC. 05 / 07 · INTERACTIVE PEDAGOGY</span>
            <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--color-terracotta)', fontWeight: 600 }}>
              CURATED LABORATORY BENCH IN SILICO
            </span>
          </div>

          <h2 className="display-section">
            Scientific Explorations & Educational Models
          </h2>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem' }}>
            <p className="lead-editorial" style={{ maxWidth: '780px', color: 'var(--color-forest)' }}>
              Interactive digital exhibits built to explore fundamental biotechnological mechanisms. These interactive models are designed as learning tools and conceptual explainers, reflecting core academic coursework rather than original empirical research.
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span className="mono-tag" style={{ backgroundColor: '#FFFFFF', color: 'var(--color-forest)', border: '1px solid rgba(16, 41, 31, 0.15)' }}>
                [4 FUNCTIONAL EXHIBITS]
              </span>
            </div>
          </div>
        </div>

        {/* Tab Selection Navigation (Laboratory Instrument Switcher) */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '0.85rem',
            marginBottom: '2rem'
          }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.95rem',
                  padding: '1.15rem 1.25rem',
                  backgroundColor: isActive ? 'var(--color-forest)' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : 'var(--color-forest)',
                  border: isActive ? '1.5px solid var(--color-forest-deep)' : '1px solid rgba(16, 41, 31, 0.15)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isActive ? '0 10px 24px -4px rgba(16, 41, 31, 0.16)' : '0 2px 6px rgba(16, 41, 31, 0.03)',
                  position: 'relative'
                }}
              >
                <div 
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '4px',
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.15)' : '#FAF7F2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isActive ? '#FFFFFF' : 'var(--color-terracotta)',
                    flexShrink: 0,
                    border: '1px solid rgba(16, 41, 31, 0.08)'
                  }}
                >
                  <Icon size={20} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span 
                      className="font-mono" 
                      style={{ 
                        fontSize: '0.65rem', 
                        fontWeight: 600,
                        color: isActive ? 'var(--color-brass-light)' : 'var(--color-terracotta)' 
                      }}
                    >
                      {tab.code}
                    </span>
                    {isActive && (
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-brass-light)' }} />
                    )}
                  </div>

                  <strong style={{ display: 'block', fontSize: '0.95rem', lineHeight: 1.25, marginTop: '0.2rem' }}>
                    {tab.title}
                  </strong>
                  <span 
                    className="font-mono" 
                    style={{ 
                      fontSize: '0.7rem', 
                      color: isActive ? 'rgba(255, 255, 255, 0.8)' : 'var(--text-muted)' 
                    }}
                  >
                    {tab.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Exhibit Render */}
        <div className="reveal-init reveal-visible">
          {activeTab === "dna-pairing" && <DnaBasePairingExplorer />}
          {activeTab === "codon-translator" && <CodonTranslator />}
          {activeTab === "bacterial-growth" && <BacterialGrowthExplorer />}
          {activeTab === "pcr-thermal" && <PcrCycleExplainer />}
        </div>
      </div>
    </section>
  );
}
