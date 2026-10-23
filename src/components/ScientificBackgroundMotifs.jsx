import React from 'react';

/**
 * ScientificBackgroundMotifs
 * Handcrafted vector linework representing botanical, cellular, and polar coordinate phenomena.
 * Rendered at restrained low opacities (0.02 - 0.08) to create rich atmospheric depth
 * without competing with text legibility.
 */

export function CelestialPolarScale({ size = 480, className = "", style = {} }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 500 500" 
      fill="none" 
      stroke="currentColor" 
      className={`scientific-motif polar-scale ${className}`}
      style={{ pointerEvents: 'none', ...style }}
      aria-hidden="true"
    >
      {/* Concentric rings */}
      <circle cx="250" cy="250" r="230" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.3" />
      <circle cx="250" cy="250" r="190" strokeWidth="1" opacity="0.4" />
      <circle cx="250" cy="250" r="140" strokeWidth="0.6" strokeDasharray="6 3" opacity="0.35" />
      <circle cx="250" cy="250" r="90" strokeWidth="1" opacity="0.45" />
      <circle cx="250" cy="250" r="40" strokeWidth="0.8" opacity="0.3" />
      <circle cx="250" cy="250" r="4" fill="currentColor" opacity="0.5" />

      {/* Axis lines */}
      <line x1="20" y1="250" x2="480" y2="250" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.4" />
      <line x1="250" y1="20" x2="250" y2="480" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.4" />
      <line x1="87" y1="87" x2="413" y2="413" strokeWidth="0.6" opacity="0.25" />
      <line x1="413" y1="87" x2="87" y2="413" strokeWidth="0.6" opacity="0.25" />

      {/* Angular degree ticks */}
      {Array.from({ length: 36 }).map((_, i) => {
        const angle = (i * 10) * (Math.PI / 180);
        const isMajor = i % 9 === 0;
        const r1 = 190;
        const r2 = isMajor ? 176 : 184;
        const x1 = 250 + r1 * Math.cos(angle);
        const y1 = 250 + r1 * Math.sin(angle);
        const x2 = 250 + r2 * Math.cos(angle);
        const y2 = 250 + r2 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={isMajor ? "1.2" : "0.7"} opacity={isMajor ? 0.6 : 0.3} />;
      })}
    </svg>
  );
}

export function BotanicalVenationMotif({ width = 360, height = 480, className = "", style = {} }) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 400 550" 
      fill="none" 
      stroke="currentColor" 
      className={`scientific-motif botanical-venation ${className}`}
      style={{ pointerEvents: 'none', ...style }}
      aria-hidden="true"
    >
      {/* Primary vascular midrib */}
      <path d="M200 530 C205 400, 195 240, 200 30" strokeWidth="1.6" strokeLinecap="round" opacity="0.45" />

      {/* Lateral secondary veins */}
      <path d="M200 460 C235 435, 290 415, 335 410" strokeWidth="1.1" strokeLinecap="round" opacity="0.35" />
      <path d="M200 460 C165 435, 110 415, 65 410" strokeWidth="1.1" strokeLinecap="round" opacity="0.35" />

      <path d="M198 390 C245 360, 310 340, 360 330" strokeWidth="1.1" strokeLinecap="round" opacity="0.38" />
      <path d="M198 390 C151 360, 86 340, 36 330" strokeWidth="1.1" strokeLinecap="round" opacity="0.38" />

      <path d="M199 315 C250 280, 320 260, 370 240" strokeWidth="1.1" strokeLinecap="round" opacity="0.38" />
      <path d="M199 315 C148 280, 78 260, 28 240" strokeWidth="1.1" strokeLinecap="round" opacity="0.38" />

      <path d="M200 240 C245 205, 305 185, 355 165" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
      <path d="M200 240 C155 205, 95 185, 45 165" strokeWidth="1" strokeLinecap="round" opacity="0.35" />

      <path d="M201 165 C240 135, 290 115, 330 95" strokeWidth="0.9" strokeLinecap="round" opacity="0.32" />
      <path d="M201 165 C162 135, 112 115, 72 95" strokeWidth="0.9" strokeLinecap="round" opacity="0.32" />

      <path d="M200 95 C230 75, 265 60, 295 45" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
      <path d="M200 95 C170 75, 135 60, 105 45" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />

      {/* Tertiary vein reticulations */}
      <path d="M245 345 C270 330, 280 310, 295 295" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.25" />
      <path d="M155 345 C130 330, 120 310, 105 295" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.25" />
      <path d="M255 265 C280 245, 295 230, 315 210" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.25" />
      <path d="M145 265 C120 245, 105 230, 85 210" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.25" />
    </svg>
  );
}

export function ChromosomeWatermark({ width = 320, height = 260, className = "", style = {} }) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 350 300" 
      fill="none" 
      stroke="currentColor" 
      className={`scientific-motif chromosome-bands ${className}`}
      style={{ pointerEvents: 'none', ...style }}
      aria-hidden="true"
    >
      {/* Chromosome 1 Chromatids */}
      <rect x="70" y="30" width="34" height="240" rx="17" strokeWidth="1" opacity="0.35" />
      <line x1="70" y1="130" x2="104" y2="130" strokeWidth="2.5" opacity="0.6" /> {/* Centromere */}
      {/* Bands */}
      <rect x="73" y="50" width="28" height="12" fill="currentColor" opacity="0.2" />
      <rect x="73" y="75" width="28" height="22" fill="currentColor" opacity="0.28" />
      <rect x="73" y="110" width="28" height="8" fill="currentColor" opacity="0.15" />
      <rect x="73" y="145" width="28" height="18" fill="currentColor" opacity="0.25" />
      <rect x="73" y="175" width="28" height="30" fill="currentColor" opacity="0.32" />
      <rect x="73" y="220" width="28" height="14" fill="currentColor" opacity="0.18" />

      {/* Chromosome 2 Chromatids */}
      <rect x="140" y="55" width="30" height="215" rx="15" strokeWidth="1" opacity="0.35" />
      <line x1="140" y1="145" x2="170" y2="145" strokeWidth="2.5" opacity="0.6" />
      {/* Bands */}
      <rect x="143" y="70" width="24" height="16" fill="currentColor" opacity="0.26" />
      <rect x="143" y="100" width="24" height="10" fill="currentColor" opacity="0.15" />
      <rect x="143" y="122" width="24" height="14" fill="currentColor" opacity="0.22" />
      <rect x="143" y="160" width="24" height="26" fill="currentColor" opacity="0.3" />
      <rect x="143" y="200" width="24" height="18" fill="currentColor" opacity="0.2" />
      <rect x="143" y="230" width="24" height="12" fill="currentColor" opacity="0.15" />

      {/* Chromosome 3 Chromatids */}
      <rect x="205" y="85" width="26" height="185" rx="13" strokeWidth="1" opacity="0.35" />
      <line x1="205" y1="165" x2="231" y2="165" strokeWidth="2.2" opacity="0.6" />
      <rect x="208" y="100" width="20" height="20" fill="currentColor" opacity="0.28" />
      <rect x="208" y="132" width="20" height="12" fill="currentColor" opacity="0.18" />
      <rect x="208" y="180" width="20" height="24" fill="currentColor" opacity="0.26" />
      <rect x="208" y="215" width="20" height="16" fill="currentColor" opacity="0.22" />

      {/* Locus markers */}
      <text x="50" y="75" fontSize="8" fontFamily="var(--font-mono)" fill="currentColor" opacity="0.45">1p36</text>
      <text x="50" y="185" fontSize="8" fontFamily="var(--font-mono)" fill="currentColor" opacity="0.45">1q24</text>
      <text x="120" y="95" fontSize="8" fontFamily="var(--font-mono)" fill="currentColor" opacity="0.45">2p21</text>
      <text x="120" y="210" fontSize="8" fontFamily="var(--font-mono)" fill="currentColor" opacity="0.45">2q31</text>
    </svg>
  );
}

export function CellularMembraneMotif({ width = 450, height = 300, className = "", style = {} }) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 500 350" 
      fill="none" 
      stroke="currentColor" 
      className={`scientific-motif cellular-membrane ${className}`}
      style={{ pointerEvents: 'none', ...style }}
      aria-hidden="true"
    >
      {/* Outer bilipid membrane contours */}
      <path d="M20 180 C 120 80, 240 260, 360 140 C 420 80, 470 120, 500 160" strokeWidth="1.2" opacity="0.3" />
      <path d="M20 200 C 120 100, 240 280, 360 160 C 420 100, 470 140, 500 180" strokeWidth="1.2" opacity="0.3" />

      {/* Phospholipid head dots */}
      {Array.from({ length: 22 }).map((_, i) => {
        const t = i / 21;
        const x = 20 + t * 470;
        const yTop = 180 - Math.sin(t * Math.PI * 2.2) * 60;
        const yBot = yTop + 20;
        return (
          <g key={i}>
            <circle cx={x} cy={yTop} r="3" fill="currentColor" opacity="0.25" />
            <circle cx={x} cy={yBot} r="3" fill="currentColor" opacity="0.25" />
            <line x1={x} y1={yTop + 3} x2={x} y2={yTop + 8} strokeWidth="0.8" opacity="0.2" />
            <line x1={x} y1={yBot - 3} x2={x} y2={yBot - 8} strokeWidth="0.8" opacity="0.2" />
          </g>
        );
      })}
    </svg>
  );
}
