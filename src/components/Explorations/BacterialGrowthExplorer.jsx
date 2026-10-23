import React, { useState, useMemo } from 'react';


export default function BacterialGrowthExplorer() {
  const [timeHours, setTimeHours] = useState(7.5); // Current elapsed time (0 - 24h)
  const [inoculumLevel, setInoculumLevel] = useState("medium"); // low, medium, high
  const [growthCondition, setGrowthCondition] = useState("optimal"); // optimal (37C rich), suboptimal (25C minimal)

  // Growth parameters based on selection
  const parameters = useMemo(() => {
    const baseN0 = inoculumLevel === "low" ? 3.0 : (inoculumLevel === "medium" ? 5.0 : 6.8); // log10 CFU/mL
    const maxCapacity = inoculumLevel === "high" ? 9.6 : 9.2;
    const isOptimal = growthCondition === "optimal";

    // Timing boundaries (in hours)
    const lagEnd = isOptimal ? (inoculumLevel === "high" ? 2.5 : 3.8) : 5.5;
    const logEnd = isOptimal ? 12.0 : 15.0;
    const statEnd = isOptimal ? 18.0 : 19.5;
    const doublingTime = isOptimal ? "22 minutes" : "58 minutes";
    const specificGrowthRate = isOptimal ? "1.89 h⁻¹" : "0.72 h⁻¹";

    return {
      baseN0,
      maxCapacity,
      lagEnd,
      logEnd,
      statEnd,
      doublingTime,
      specificGrowthRate
    };
  }, [inoculumLevel, growthCondition]);

  // Calculate current log10 cell density based on piecewise kinetic model
  const currentDensity = useMemo(() => {
    const t = timeHours;
    const { baseN0, maxCapacity, lagEnd, logEnd, statEnd } = parameters;

    if (t <= lagEnd) {
      // Lag phase: negligible division, slight metabolic swelling
      return baseN0 + (t / lagEnd) * 0.15;
    } else if (t <= logEnd) {
      // Exponential log phase: rapid linear increase on log scale
      const progress = (t - lagEnd) / (logEnd - lagEnd);
      return baseN0 + 0.15 + progress * (maxCapacity - (baseN0 + 0.15));
    } else if (t <= statEnd) {
      // Stationary phase: plateau at maximum carrying capacity
      const statProgress = (t - logEnd) / (statEnd - logEnd);
      return maxCapacity - Math.sin(statProgress * Math.PI) * 0.05;
    } else {
      // Death / Decline phase: logarithmic drop
      const deathProgress = (t - statEnd) / (24 - statEnd);
      return maxCapacity - deathProgress * 2.8;
    }
  }, [timeHours, parameters]);

  // Identify active phase
  const currentPhase = useMemo(() => {
    const t = timeHours;
    const { lagEnd, logEnd, statEnd } = parameters;

    if (t <= lagEnd) {
      return {
        key: "lag",
        name: "Phase I: Lag Phase",
        description: "Physiological adaptation and macromolecular synthesis. Cells replenish depleted ATP, coenzymes, and ribosomal subunits without active division.",
        cellularState: "Sparse, elongated cells synthesizing metabolic enzymes.",
        equation: "dN / dt ≈ 0",
        hallmarks: "High metabolic RNA synthesis · No net population increase · Acclimatization"
      };
    } else if (t <= logEnd) {
      return {
        key: "log",
        name: "Phase II: Exponential (Log) Phase",
        description: "Maximal balanced binary fission. Generation time remains constant and cells exhibit uniform physical and biochemical characteristics.",
        cellularState: "Actively dividing cells with visible median septum formation.",
        equation: "N(t) = N₀ · 2^(t / g)",
        hallmarks: "Constant generation time (g) · Maximal biochemical activity · Balanced growth"
      };
    } else if (t <= statEnd) {
      return {
        key: "stationary",
        name: "Phase III: Stationary Phase",
        description: "Carrying capacity attained. Essential carbon/nitrogen sources exhausted; toxic metabolic end products (acids/alcohols) accumulate. Rate of division equals rate of cell death.",
        cellularState: "High cell density, crowded field; secondary metabolite excretion.",
        equation: "Rate of cell division = Rate of cell death (dN / dt = 0)",
        hallmarks: "Nutrient limitation · Secondary metabolite synthesis (antibiotics) · Morphological compaction"
      };
    } else {
      return {
        key: "death",
        name: "Phase IV: Death (Decline) Phase",
        description: "Irreversible cellular damage. Environmental toxicity and energy starvation overcome repair capacity. Viable count drops logarithmically accompanied by autolysis.",
        cellularState: "Lysis debris, cell ghosting, and involution forms.",
        equation: "N(t) = N_stat · e^(-k_d · t)",
        hallmarks: "Exponential loss of viability · Autolysin activation · Morphological distortion"
      };
    }
  }, [timeHours, parameters]);

  // SVG dimensions for growth curve
  const svgWidth = 620;
  const svgHeight = 220;
  const paddingLeft = 55;
  const paddingRight = 30;
  const paddingTop = 25;
  const paddingBottom = 40;

  const plotWidth = svgWidth - paddingLeft - paddingRight;
  const plotHeight = svgHeight - paddingTop - paddingBottom;

  // Convert time (0-24h) and log density (2-10) to SVG coordinates
  const timeToX = (t) => paddingLeft + (t / 24) * plotWidth;
  const densityToY = (d) => paddingTop + plotHeight - ((d - 2) / 8.5) * plotHeight;

  // Generate curve path points
  const curvePoints = useMemo(() => {
    const points = [];
    const { baseN0, maxCapacity, lagEnd, logEnd, statEnd } = parameters;
    for (let t = 0; t <= 24; t += 0.25) {
      let d = 0;
      if (t <= lagEnd) {
        d = baseN0 + (t / lagEnd) * 0.15;
      } else if (t <= logEnd) {
        const progress = (t - lagEnd) / (logEnd - lagEnd);
        d = baseN0 + 0.15 + progress * (maxCapacity - (baseN0 + 0.15));
      } else if (t <= statEnd) {
        const statProgress = (t - logEnd) / (statEnd - logEnd);
        d = maxCapacity - Math.sin(statProgress * Math.PI) * 0.05;
      } else {
        const deathProgress = (t - statEnd) / (24 - statEnd);
        d = maxCapacity - deathProgress * 2.8;
      }
      const x = paddingLeft + (t / 24) * plotWidth;
      const y = paddingTop + plotHeight - ((d - 2) / 8.5) * plotHeight;
      points.push({ x, y });
    }
    return points;
  }, [parameters, plotHeight, plotWidth]);

  const curvePathD = useMemo(() => {
    return curvePoints.reduce((acc, pt, idx) => {
      return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
    }, "");
  }, [curvePoints]);

  // Current reticle coordinates
  const curX = timeToX(timeHours);
  const curY = densityToY(currentDensity);

  return (
    <div
      className="bacterial-growth-exhibit"
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
          <span className="scientific-meta">MINI EXHIBIT 03</span>
          <h3 className="display-subsection" style={{ marginTop: '0.35rem', color: 'var(--color-forest)' }}>
            Bacterial Closed-Batch Growth Kinetics
          </h3>
          <p className="caption-editorial" style={{ marginTop: '0.35rem', maxWidth: '640px' }}>
            Interactive educational simulator modeling closed-system bacterial population dynamics through lag, exponential, stationary, and decline phases.
          </p>
        </div>

        {/* Phase Quick-Jump Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>JUMP TO:</span>
          {[
            { label: "Lag", time: 1.8 },
            { label: "Log", time: 7.5 },
            { label: "Stationary", time: 15.0 },
            { label: "Decline", time: 21.0 }
          ].map((phase, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setTimeHours(phase.time)}
              style={{
                fontSize: '0.72rem',
                padding: '0.25rem 0.55rem',
                backgroundColor: 'var(--color-ivory)',
                color: 'var(--color-forest)',
                border: '1px solid rgba(16, 41, 31, 0.2)',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
              className="font-mono"
            >
              {phase.label}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Growth Curve Diagram */}
      <div 
        style={{
          backgroundColor: 'var(--color-ivory-light)',
          border: '1px solid rgba(16, 41, 31, 0.12)',
          borderRadius: '4px',
          padding: '1.25rem 0.75rem 0.5rem',
          position: 'relative',
          marginBottom: '1.5rem',
          overflowX: 'auto'
        }}
      >
        <svg 
          viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
          style={{ width: '100%', minWidth: '520px', height: 'auto', display: 'block' }}
          role="img"
          aria-label="Sigmoidal bacterial growth curve plotted against 24 hours"
        >
          {/* Phase Background Zone Shading */}
          <rect 
            x={paddingLeft} 
            y={paddingTop} 
            width={timeToX(parameters.lagEnd) - paddingLeft} 
            height={plotHeight} 
            fill="rgba(194, 130, 81, 0.05)" 
          />
          <rect 
            x={timeToX(parameters.lagEnd)} 
            y={paddingTop} 
            width={timeToX(parameters.logEnd) - timeToX(parameters.lagEnd)} 
            height={plotHeight} 
            fill="rgba(78, 114, 89, 0.08)" 
          />
          <rect 
            x={timeToX(parameters.logEnd)} 
            y={paddingTop} 
            width={timeToX(parameters.statEnd) - timeToX(parameters.logEnd)} 
            height={plotHeight} 
            fill="rgba(184, 151, 88, 0.07)" 
          />
          <rect 
            x={timeToX(parameters.statEnd)} 
            y={paddingTop} 
            width={timeToX(24) - timeToX(parameters.statEnd)} 
            height={plotHeight} 
            fill="rgba(16, 41, 31, 0.04)" 
          />

          {/* Phase Divider Vertical Lines */}
          {[parameters.lagEnd, parameters.logEnd, parameters.statEnd].map((boundary, bIdx) => (
            <line
              key={bIdx}
              x1={timeToX(boundary)}
              y1={paddingTop}
              x2={timeToX(boundary)}
              y2={paddingTop + plotHeight}
              stroke="rgba(16, 41, 31, 0.15)"
              strokeDasharray="3 3"
              strokeWidth="1"
            />
          ))}

          {/* Phase Labels at Top */}
          <text x={(paddingLeft + timeToX(parameters.lagEnd)) / 2} y={paddingTop - 8} textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="#A5623B" fontWeight="600">
            LAG
          </text>
          <text x={(timeToX(parameters.lagEnd) + timeToX(parameters.logEnd)) / 2} y={paddingTop - 8} textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="#33503D" fontWeight="600">
            EXPONENTIAL (LOG)
          </text>
          <text x={(timeToX(parameters.logEnd) + timeToX(parameters.statEnd)) / 2} y={paddingTop - 8} textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="#8A6B29" fontWeight="600">
            STATIONARY
          </text>
          <text x={(timeToX(parameters.statEnd) + timeToX(24)) / 2} y={paddingTop - 8} textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="#10291F" fontWeight="600">
            DECLINE
          </text>

          {/* Grid Horizontal Guidelines */}
          {[4, 6, 8].map((level) => (
            <g key={level}>
              <line
                x1={paddingLeft}
                y1={densityToY(level)}
                x2={paddingLeft + plotWidth}
                y2={densityToY(level)}
                stroke="rgba(16, 41, 31, 0.08)"
                strokeWidth="1"
              />
              <text
                x={paddingLeft - 8}
                y={densityToY(level) + 3}
                textAnchor="end"
                fontSize="9"
                fontFamily="var(--font-mono)"
                fill="rgba(16, 41, 31, 0.55)"
              >
                10^{level}
              </text>
            </g>
          ))}

          {/* X-Axis Ticks (Hours) */}
          {[0, 6, 12, 18, 24].map((hr) => (
            <g key={hr}>
              <line
                x1={timeToX(hr)}
                y1={paddingTop + plotHeight}
                x2={timeToX(hr)}
                y2={paddingTop + plotHeight + 5}
                stroke="rgba(16, 41, 31, 0.3)"
                strokeWidth="1"
              />
              <text
                x={timeToX(hr)}
                y={paddingTop + plotHeight + 18}
                textAnchor="middle"
                fontSize="9"
                fontFamily="var(--font-mono)"
                fill="rgba(16, 41, 31, 0.65)"
              >
                {hr}h
              </text>
            </g>
          ))}

          {/* Primary Growth Curve */}
          <path
            d={curvePathD}
            fill="none"
            stroke="var(--color-forest)"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Tracking Crosshair Reticle */}
          <line
            x1={curX}
            y1={paddingTop}
            x2={curX}
            y2={paddingTop + plotHeight}
            stroke="var(--color-terracotta)"
            strokeWidth="1.2"
            strokeDasharray="2 2"
          />
          <line
            x1={paddingLeft}
            y1={curY}
            x2={paddingLeft + plotWidth}
            y2={curY}
            stroke="var(--color-terracotta)"
            strokeWidth="1"
            strokeDasharray="2 2"
          />

          {/* Reticle Focus Circle */}
          <circle
            cx={curX}
            cy={curY}
            r="5"
            fill="var(--color-terracotta)"
            stroke="#FFFFFF"
            strokeWidth="2"
          />

          {/* Axis Labels */}
          <text
            x={paddingLeft - 38}
            y={(paddingTop + plotHeight) / 2}
            textAnchor="middle"
            transform={`rotate(-90 ${paddingLeft - 38} ${(paddingTop + plotHeight) / 2})`}
            fontSize="9"
            fontFamily="var(--font-mono)"
            fill="var(--color-forest)"
            fontWeight="600"
          >
            LOG₁₀ CFU / mL
          </text>
          <text
            x={paddingLeft + plotWidth / 2}
            y={paddingTop + plotHeight + 34}
            textAnchor="middle"
            fontSize="9"
            fontFamily="var(--font-mono)"
            fill="var(--color-forest)"
            fontWeight="600"
          >
            INCUBATION TIME (HOURS)
          </text>
        </svg>
      </div>

      {/* Interactive Time Scrubber Slider */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.45rem',
          marginBottom: '1.75rem',
          padding: '1rem',
          backgroundColor: 'var(--color-ivory)',
          border: '1px solid rgba(16, 41, 31, 0.1)',
          borderRadius: '4px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label 
            htmlFor="time-scrubber" 
            className="font-mono" 
            style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-forest)' }}
          >
            TIME SCRUBBER: {timeHours.toFixed(1)} HOURS
          </label>
          <span className="mono-tag" style={{ backgroundColor: '#FFFFFF', color: 'var(--color-terracotta)' }}>
            CURRENT DENSITY: 10^{currentDensity.toFixed(2)} CFU/mL
          </span>
        </div>

        <input
          id="time-scrubber"
          type="range"
          min="0"
          max="24"
          step="0.1"
          value={timeHours}
          onChange={(e) => setTimeHours(parseFloat(e.target.value))}
          style={{
            width: '100%',
            cursor: 'pointer',
            accentColor: 'var(--color-forest)'
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)' }} className="font-mono">
          <span>0h (Inoculation)</span>
          <span>4h (Lag Exit)</span>
          <span>12h (Log Transition)</span>
          <span>18h (Stationary Depletion)</span>
          <span>24h (Decline)</span>
        </div>
      </div>

      {/* Two Column Layout: Microscopic Viewport + Phase Biological Profile */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          borderTop: '1px solid rgba(16, 41, 31, 0.1)',
          paddingTop: '1.5rem',
          marginBottom: '1.5rem'
        }}
      >
        {/* Illustrative Microscopic Field Viewport */}
        <div 
          style={{
            backgroundColor: 'var(--color-ivory)',
            border: '1px solid rgba(16, 41, 31, 0.12)',
            borderRadius: '4px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              SIMULATED MICROSCOPIC FIELD
            </span>
            <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--color-forest)' }}>
              1000× OIL IMMERSION
            </span>
          </div>

          {/* Circular Petri / Microscope View */}
          <div 
            style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              backgroundColor: '#FAF7F2',
              border: '3px solid var(--color-forest)',
              boxShadow: 'inset 0 0 16px rgba(16, 41, 31, 0.15)',
              position: 'relative',
              overflow: 'hidden',
              margin: '0.5rem 0 1rem'
            }}
          >
            {/* Fine Reticle Grid */}
            <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '1px', backgroundColor: 'rgba(16,41,31,0.1)' }} />
            <div style={{ position: 'absolute', left: '50%', top: 0, width: '1px', height: '100%', backgroundColor: 'rgba(16,41,31,0.1)' }} />

            {/* Simulated Bacilli Cells rendered based on phase */}
            {Array.from({ 
              length: currentPhase.key === 'lag' ? 6 : (currentPhase.key === 'log' ? 24 : (currentPhase.key === 'stationary' ? 42 : 16)) 
            }).map((_, cIdx) => {
              // Deterministic pseudo-random placement
              const angle = (cIdx * 137.5) * (Math.PI / 180);
              const r = Math.sqrt(cIdx / (currentPhase.key === 'stationary' ? 45 : 26)) * 72;
              const cx = 90 + r * Math.cos(angle);
              const cy = 90 + r * Math.sin(angle);
              const rotation = (cIdx * 43) % 180;
              const isDecline = currentPhase.key === 'death';

              return (
                <div
                  key={cIdx}
                  style={{
                    position: 'absolute',
                    left: `${cx}px`,
                    top: `${cy}px`,
                    width: isDecline ? '7px' : '11px',
                    height: '4px',
                    borderRadius: '2px',
                    backgroundColor: isDecline ? 'rgba(16, 41, 31, 0.3)' : 'var(--color-forest)',
                    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                    border: isDecline ? '1px dashed #D9534F' : 'none'
                  }}
                />
              );
            })}
          </div>

          <p className="caption-editorial" style={{ fontStyle: 'italic' }}>
            {currentPhase.cellularState}
          </p>
        </div>

        {/* Phase Kinetics & Bioenergetic Profile */}
        <div 
          style={{
            backgroundColor: 'var(--color-ivory)',
            border: '1px solid rgba(16, 41, 31, 0.12)',
            borderRadius: '4px',
            padding: '1.25rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
            <span className="mono-tag" style={{ backgroundColor: 'var(--color-sage-pale)', color: 'var(--color-forest)' }}>
              {currentPhase.name}
            </span>
            <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--color-terracotta)' }}>
              t = {timeHours.toFixed(1)} h
            </span>
          </div>

          <h4 className="display-subsection" style={{ fontSize: '1.35rem', margin: '0.5rem 0' }}>
            {currentPhase.equation}
          </h4>

          <p className="caption-editorial" style={{ marginBottom: '0.85rem' }}>
            {currentPhase.description}
          </p>

          <div style={{ borderTop: '1px dashed rgba(16, 41, 31, 0.1)', paddingTop: '0.75rem', fontSize: '0.82rem' }}>
            <div style={{ marginBottom: '0.4rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Doubling Time (g): </span>
              <strong className="font-mono">{parameters.doublingTime}</strong>
            </div>
            <div style={{ marginBottom: '0.4rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Specific Growth Rate (μ): </span>
              <strong className="font-mono">{parameters.specificGrowthRate}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Key Hallmarks: </span>
              <span style={{ color: 'var(--color-forest)' }}>{currentPhase.hallmarks}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Parameter Adjustment Controls */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--color-ivory-light)',
          border: '1px solid rgba(16, 41, 31, 0.1)',
          borderRadius: '4px'
        }}
      >
        {/* Inoculum Size */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-forest)', fontWeight: 600 }}>
            INOCULUM (N₀):
          </span>
          {['low', 'medium', 'high'].map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => setInoculumLevel(lvl)}
              style={{
                fontSize: '0.72rem',
                padding: '0.2rem 0.5rem',
                backgroundColor: inoculumLevel === lvl ? 'var(--color-forest)' : '#FFFFFF',
                color: inoculumLevel === lvl ? '#FFFFFF' : 'var(--color-forest)',
                border: '1px solid rgba(16, 41, 31, 0.2)',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
              className="font-mono"
            >
              {lvl.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Temperature / Growth Condition */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-forest)', fontWeight: 600 }}>
            CONDITIONS:
          </span>
          <button
            type="button"
            onClick={() => setGrowthCondition("optimal")}
            style={{
              fontSize: '0.72rem',
              padding: '0.2rem 0.5rem',
              backgroundColor: growthCondition === "optimal" ? 'var(--color-forest)' : '#FFFFFF',
              color: growthCondition === "optimal" ? '#FFFFFF' : 'var(--color-forest)',
              border: '1px solid rgba(16, 41, 31, 0.2)',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
            className="font-mono"
          >
            OPTIMAL (37°C BROTH)
          </button>
          <button
            type="button"
            onClick={() => setGrowthCondition("suboptimal")}
            style={{
              fontSize: '0.72rem',
              padding: '0.2rem 0.5rem',
              backgroundColor: growthCondition === "suboptimal" ? 'var(--color-forest)' : '#FFFFFF',
              color: growthCondition === "suboptimal" ? '#FFFFFF' : 'var(--color-forest)',
              border: '1px solid rgba(16, 41, 31, 0.2)',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
            className="font-mono"
          >
            SUBOPTIMAL (25°C MINIMAL)
          </button>
        </div>
      </div>

      {/* Mandatory Scientific Disclaimer */}
      <div 
        style={{
          marginTop: '1.25rem',
          padding: '0.65rem 0.85rem',
          backgroundColor: 'var(--color-brass-pale)',
          borderLeft: '3px solid var(--color-brass)',
          borderRadius: '2px',
          fontSize: '0.78rem',
          color: 'var(--color-forest)',
          lineHeight: 1.5
        }}
      >
        <strong>Educational Model Disclaimer:</strong> This interactive model represents idealized closed-batch bacterial growth kinetics based on standard Monod population equations. It is designed solely for conceptual instructional demonstration of lag, logarithmic, stationary, and decline phases, and is not derived from empirical laboratory measurements.
      </div>
    </div>
  );
}
