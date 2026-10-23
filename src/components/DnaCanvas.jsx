import React, { useRef, useEffect, useState, useCallback } from 'react';
import { PlayIcon, PauseIcon } from './Icons';

// Base pair definition sequence for the helix
const BASE_SEQUENCE = [
  { left: "A", right: "T", name: "Adenine — Thymine (2 H-Bonds)", colorL: "#C28251", colorR: "#B89758" },
  { left: "G", right: "C", name: "Guanine — Cytosine (3 H-Bonds)", colorL: "#4E7259", colorR: "#153327" },
  { left: "T", right: "A", name: "Thymine — Adenine (2 H-Bonds)", colorL: "#B89758", colorR: "#C28251" },
  { left: "C", right: "G", name: "Cytosine — Guanine (3 H-Bonds)", colorL: "#153327", colorR: "#4E7259" },
  { left: "A", right: "T", name: "Adenine — Thymine (2 H-Bonds)", colorL: "#C28251", colorR: "#B89758" },
  { left: "C", right: "G", name: "Cytosine — Guanine (3 H-Bonds)", colorL: "#153327", colorR: "#4E7259" },
  { left: "G", right: "C", name: "Guanine — Cytosine (3 H-Bonds)", colorL: "#4E7259", colorR: "#153327" },
  { left: "T", right: "A", name: "Thymine — Adenine (2 H-Bonds)", colorL: "#B89758", colorR: "#C28251" },
  { left: "G", right: "C", name: "Guanine — Cytosine (3 H-Bonds)", colorL: "#4E7259", colorR: "#153327" },
  { left: "A", right: "T", name: "Adenine — Thymine (2 H-Bonds)", colorL: "#C28251", colorR: "#B89758" },
  { left: "C", right: "G", name: "Cytosine — Guanine (3 H-Bonds)", colorL: "#153327", colorR: "#4E7259" },
  { left: "T", right: "A", name: "Thymine — Adenine (2 H-Bonds)", colorL: "#B89758", colorR: "#C28251" },
  { left: "A", right: "T", name: "Adenine — Thymine (2 H-Bonds)", colorL: "#C28251", colorR: "#B89758" },
  { left: "G", right: "C", name: "Guanine — Cytosine (3 H-Bonds)", colorL: "#4E7259", colorR: "#153327" }
];

export default function DnaCanvas({ className = "" }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [showLabels, setShowLabels] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(() => 
    typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );
  const [canvasSupported, setCanvasSupported] = useState(true);

  // Animation state refs (to avoid re-renders during 60fps loop)
  const animStateRef = useRef({
    angle: 0,
    targetTiltX: 0,
    currentTiltX: 0,
    targetTiltY: 0,
    currentTiltY: 0,
    isVisible: true,
    animationFrameId: null,
    lastTimestamp: 0
  });

  // Check prefers-reduced-motion
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleMotionChange = (e) => {
      setIsReducedMotion(e.matches);
      if (e.matches) {
        setIsPlaying(false);
      }
    };

    try {
      motionQuery.addEventListener('change', handleMotionChange);
      return () => motionQuery.removeEventListener('change', handleMotionChange);
    } catch {
      // Fallback for older browsers
      motionQuery.addListener(handleMotionChange);
      return () => motionQuery.removeListener(handleMotionChange);
    }
  }, []);

  // IntersectionObserver to pause rendering when offscreen
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        animStateRef.current.isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Pointer interactions (mouse and touch)
  const handlePointerMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const relativeX = (clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const relativeY = (clientY - rect.top) / rect.height - 0.5;

    // Subtle tilt ranges
    animStateRef.current.targetTiltX = relativeX * 0.45; // ~25 deg tilt
    animStateRef.current.targetTiltY = relativeY * 0.25;
  }, []);

  const handlePointerLeave = useCallback(() => {
    animStateRef.current.targetTiltX = 0;
    animStateRef.current.targetTiltY = 0;
  }, []);

  // Main canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setCanvasSupported(false);
      return;
    }

    let isMounted = true;

    const resizeCanvas = () => {
      if (!canvas || !canvas.parentElement) return;
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = canvas.parentElement.clientWidth;
      const displayHeight = Math.min(Math.max(displayWidth * 1.15, 420), 620);

      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = (timestamp) => {
      if (!isMounted) return;

      const state = animStateRef.current;
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      if (state.lastTimestamp === 0) state.lastTimestamp = timestamp;
      const delta = Math.min((timestamp - state.lastTimestamp) / 1000, 0.1);
      state.lastTimestamp = timestamp;

      // Smooth tilt interpolation
      state.currentTiltX += (state.targetTiltX - state.currentTiltX) * 0.08;
      state.currentTiltY += (state.targetTiltY - state.currentTiltY) * 0.08;

      // Update rotation angle if playing and visible
      if (isPlaying && state.isVisible && !isReducedMotion) {
        state.angle += delta * 1.1 * speedMultiplier;
      }

      // Clear with clean transparency
      ctx.clearRect(0, 0, width, height);

      // Helix parameters
      const centerX = width * 0.5;
      const topY = 40;
      const bottomY = height - 40;
      const helixHeight = bottomY - topY;
      const numRungs = BASE_SEQUENCE.length;
      const rungSpacing = helixHeight / (numRungs - 1);
      
      // Radius of the double helix
      const amplitude = Math.min(width * 0.28, 110);
      const turns = 1.35; // ~1.35 full turns visible
      const frequency = (turns * Math.PI * 2) / helixHeight;

      // Calculate 3D points for all rungs
      const rungs = [];

      for (let i = 0; i < numRungs; i++) {
        const y = topY + i * rungSpacing;
        const currentAngle = state.angle + (y - topY) * frequency;
        
        // Depth projection with sinusoidal geometry
        const cosAngle = Math.cos(currentAngle);
        const sinAngle = Math.sin(currentAngle);

        // Apply slight horizontal tilt
        const tiltOffsetX = (y - height * 0.5) * state.currentTiltX;

        // Strand 1 (Leading)
        const x1 = centerX + amplitude * cosAngle + tiltOffsetX;
        const z1 = sinAngle; // -1 to 1

        // Strand 2 (Complementary / Antiparallel)
        const x2 = centerX - amplitude * cosAngle + tiltOffsetX;
        const z2 = -sinAngle;

        const base = BASE_SEQUENCE[i % BASE_SEQUENCE.length];

        rungs.push({
          index: i,
          y,
          x1,
          z1,
          x2,
          z2,
          base,
          avgZ: (z1 + z2) / 2
        });
      }

      // Draw background elements first (z < 0), then foreground (z > 0)
      // Sort rungs by front-to-back perspective for base pairs
      const sortedRungs = [...rungs].sort((a, b) => a.z1 - b.z1);

      // Draw subtle guideline axis
      ctx.save();
      ctx.strokeStyle = "rgba(16, 41, 31, 0.06)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(centerX + (topY - height * 0.5) * state.currentTiltX, topY - 15);
      ctx.lineTo(centerX + (bottomY - height * 0.5) * state.currentTiltX, bottomY + 15);
      ctx.stroke();
      ctx.restore();

      // Render base pair rungs
      sortedRungs.forEach((rung) => {
        const { x1, y, z1, x2, base } = rung;

        // Depth perspective scale: 0.55 (far) to 1.15 (near)
        const depthFactor = (z1 + 1) / 2; // 0 to 1
        const alpha = 0.25 + depthFactor * 0.72;
        const lineWidth = 1.2 + depthFactor * 1.8;

        const midX = (x1 + x2) / 2;
        const midY = y;

        // Draw Left Base half-rung
        ctx.save();
        ctx.strokeStyle = base.colorL;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(midX - 2, midY);
        ctx.stroke();
        ctx.restore();

        // Draw Right Base half-rung
        ctx.save();
        ctx.strokeStyle = base.colorR;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(midX + 2, midY);
        ctx.lineTo(x2, y);
        ctx.stroke();
        ctx.restore();

        // Central Hydrogen Bond junction
        ctx.save();
        ctx.fillStyle = depthFactor > 0.5 ? "rgba(194, 130, 81, 0.95)" : "rgba(16, 41, 31, 0.4)";
        ctx.beginPath();
        ctx.arc(midX, midY, depthFactor > 0.5 ? 2.2 : 1.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Base pair text labels if enabled
        if (showLabels && depthFactor > 0.6) {
          ctx.save();
          ctx.font = "500 9px 'JetBrains Mono', monospace";
          ctx.fillStyle = "rgba(16, 41, 31, 0.85)";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          
          // Left base label
          ctx.fillText(base.left, x1 + (midX - x1) * 0.35, y - 7);
          // Right base label
          ctx.fillText(base.right, x2 + (midX - x2) * 0.35, y - 7);
          ctx.restore();
        }
      });

      // Render Continuous Helical Backbone Strands with smooth bezier curves
      const drawStrand = (isStrandOne) => {
        ctx.save();
        ctx.beginPath();

        for (let i = 0; i < rungs.length; i++) {
          const pt = rungs[i];
          const px = isStrandOne ? pt.x1 : pt.x2;
          const py = pt.y;

          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            const prev = rungs[i - 1];
            const prevX = isStrandOne ? prev.x1 : prev.x2;
            const prevY = prev.y;
            const cpx = (prevX + px) / 2;
            const cpy = (prevY + py) / 2;
            ctx.quadraticCurveTo(prevX, prevY, cpx, cpy);
          }
        }

        // Draw tail point
        const last = rungs[rungs.length - 1];
        ctx.lineTo(isStrandOne ? last.x1 : last.x2, last.y);

        ctx.strokeStyle = isStrandOne ? "rgba(16, 41, 31, 0.85)" : "rgba(78, 114, 89, 0.85)";
        ctx.lineWidth = 2.4;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
        ctx.restore();

        // Draw phosphate-sugar nodes on backbone
        rungs.forEach((pt) => {
          const px = isStrandOne ? pt.x1 : pt.x2;
          const pz = isStrandOne ? pt.z1 : pt.z2;
          const depth = (pz + 1) / 2; // 0 to 1
          const radius = 2.8 + depth * 2.2;

          ctx.save();
          ctx.fillStyle = isStrandOne ? (depth > 0.5 ? "#C28251" : "#10291F") : (depth > 0.5 ? "#789981" : "#33503D");
          ctx.strokeStyle = "#F6F1E7";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(px, pt.y, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        });
      };

      // Draw strands
      drawStrand(false);
      drawStrand(true);

      // Top & Bottom 5' and 3' Strand Orientation Badges
      ctx.save();
      ctx.font = "600 10px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(194, 130, 81, 0.9)";
      ctx.fillText("5' (LEADING)", rungs[0].x1 - 28, topY - 14);
      ctx.fillStyle = "rgba(78, 114, 89, 0.9)";
      ctx.fillText("3' (COMPLEMENTARY)", rungs[0].x2 - 32, topY - 14);

      ctx.fillStyle = "rgba(78, 114, 89, 0.9)";
      ctx.fillText("3'", rungs[rungs.length - 1].x1 - 10, bottomY + 22);
      ctx.fillStyle = "rgba(194, 130, 81, 0.9)";
      ctx.fillText("5'", rungs[rungs.length - 1].x2 - 10, bottomY + 22);
      ctx.restore();

      // Request next frame
      state.animationFrameId = requestAnimationFrame(render);
    };

    const animState = animStateRef.current;
    animState.animationFrameId = requestAnimationFrame(render);

    return () => {
      isMounted = false;
      window.removeEventListener('resize', resizeCanvas);
      if (animState.animationFrameId) {
        cancelAnimationFrame(animState.animationFrameId);
      }
    };
  }, [isPlaying, speedMultiplier, showLabels, isReducedMotion]);

  return (
    <div 
      ref={containerRef} 
      className={`dna-canvas-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '520px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* Decorative Editorial Museum Specimen Frame */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#FAF7F2',
          backgroundImage: 'radial-gradient(circle at 50% 45%, rgba(255, 255, 255, 0.95) 0%, rgba(246, 241, 231, 0.7) 100%)',
          border: '1px solid rgba(16, 41, 31, 0.16)',
          borderRadius: '4px',
          padding: '1.25rem 1rem 1rem',
          boxShadow: '0 16px 40px -12px rgba(16, 41, 31, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.8)'
        }}
      >
        {/* Archival Brass Corner Brackets */}
        <div style={{ position: 'absolute', top: '4px', left: '4px', color: 'var(--color-brass)', fontSize: '0.85rem', lineHeight: 1, pointerEvents: 'none' }}>⌜</div>
        <div style={{ position: 'absolute', top: '4px', right: '4px', color: 'var(--color-brass)', fontSize: '0.85rem', lineHeight: 1, pointerEvents: 'none' }}>⌝</div>
        <div style={{ position: 'absolute', bottom: '4px', left: '4px', color: 'var(--color-brass)', fontSize: '0.85rem', lineHeight: 1, pointerEvents: 'none' }}>⌞</div>
        <div style={{ position: 'absolute', bottom: '4px', right: '4px', color: 'var(--color-brass)', fontSize: '0.85rem', lineHeight: 1, pointerEvents: 'none' }}>⌟</div>

        {/* Frame Top Header */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(16, 41, 31, 0.1)',
            paddingBottom: '0.65rem',
            marginBottom: '0.75rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ 
              width: '7px', 
              height: '7px', 
              borderRadius: '50%', 
              backgroundColor: isPlaying ? '#4E7259' : '#C28251',
              boxShadow: isPlaying ? '0 0 0 2px rgba(78, 114, 89, 0.25)' : 'none',
              display: 'inline-block'
            }} />
            <span className="font-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.08em', color: 'var(--color-forest)', fontWeight: 600 }}>
              FIG. 01 — B-DNA TOPOLOGY
            </span>
          </div>

          <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            3.4 nm / TURN · 10.5 BP
          </span>
        </div>

        {/* Canvas or SVG Graceful Fallback */}
        {canvasSupported ? (
          <div style={{ position: 'relative' }}>
            {/* Ångström Measurement Scale on left */}
            <div 
              style={{
                position: 'absolute',
                left: '2px',
                top: '40px',
                bottom: '40px',
                width: '18px',
                borderRight: '1px dashed rgba(16, 41, 31, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                fontSize: '0.55rem',
                color: 'var(--text-muted)',
                pointerEvents: 'none',
                paddingRight: '3px',
                textAlign: 'right'
              }}
              className="font-mono"
            >
              <span>34Å</span>
              <span>20Å</span>
              <span>10Å</span>
              <span>0Å</span>
            </div>

            <canvas
              ref={canvasRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              onTouchMove={handlePointerMove}
              aria-label="Interactive 3D mathematical projection of the B-DNA double-helix structure with Watson-Crick base pairing"
              role="img"
              style={{
                display: 'block',
                width: '100%',
                cursor: 'grab',
                touchAction: 'pan-y'
              }}
            />
          </div>
        ) : (
          <div 
            style={{ 
              padding: '3rem 1.5rem', 
              textAlign: 'center',
              backgroundColor: 'var(--color-ivory-warm)'
            }}
          >
            <svg viewBox="0 0 200 300" style={{ width: '100%', maxHeight: '300px' }} fill="none" stroke="currentColor">
              <path d="M50 20 C 100 80, 100 120, 50 180 C 0 240, 100 280, 150 280" stroke="#10291F" strokeWidth="2" />
              <path d="M150 20 C 100 80, 100 120, 150 180 C 200 240, 100 280, 50 280" stroke="#4E7259" strokeWidth="2" />
              <line x1="50" y1="40" x2="150" y2="40" stroke="#C28251" strokeWidth="2" />
              <line x1="65" y1="100" x2="135" y2="100" stroke="#B89758" strokeWidth="2" />
              <line x1="50" y1="160" x2="150" y2="160" stroke="#4E7259" strokeWidth="2" />
              <line x1="75" y1="220" x2="125" y2="220" stroke="#153327" strokeWidth="2" />
            </svg>
            <p className="caption-editorial" style={{ marginTop: '1rem' }}>
              B-DNA double helix topological diagram with antiparallel strands.
            </p>
          </div>
        )}

        {/* Base Pair Color Legend */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.85rem',
            paddingTop: '0.85rem',
            borderTop: '1px solid rgba(16, 41, 31, 0.08)',
            fontSize: '0.72rem'
          }}
          className="font-mono"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '2px', backgroundColor: '#C28251' }} />
            <span>Adenine (A)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '2px', backgroundColor: '#B89758' }} />
            <span>Thymine (T)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '2px', backgroundColor: '#4E7259' }} />
            <span>Guanine (G)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '2px', backgroundColor: '#153327' }} />
            <span>Cytosine (C)</span>
          </div>
        </div>

        {/* Minimal Interactive Controls */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '0.75rem',
            paddingTop: '0.65rem',
            borderTop: '1px dashed rgba(16, 41, 31, 0.12)'
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? "Pause Rotation" : "Resume Rotation"}
              aria-label={isPlaying ? "Pause Rotation" : "Resume Rotation"}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.25rem 0.55rem',
                backgroundColor: 'transparent',
                border: '1px solid rgba(16, 41, 31, 0.2)',
                borderRadius: '3px',
                color: 'var(--color-forest)',
                fontSize: '0.72rem',
                cursor: 'pointer'
              }}
              className="font-mono"
            >
              {isPlaying ? <PauseIcon size={12} /> : <PlayIcon size={12} />}
              <span>{isPlaying ? "PAUSE" : "PLAY"}</span>
            </button>

            <button
              type="button"
              onClick={() => setSpeedMultiplier(s => s === 1 ? 1.75 : (s === 1.75 ? 0.5 : 1))}
              title="Toggle Rotation Speed"
              style={{
                padding: '0.25rem 0.55rem',
                backgroundColor: 'transparent',
                border: '1px solid rgba(16, 41, 31, 0.2)',
                borderRadius: '3px',
                color: 'var(--color-forest)',
                fontSize: '0.72rem',
                cursor: 'pointer'
              }}
              className="font-mono"
            >
              SPEED: {speedMultiplier}x
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowLabels(!showLabels)}
            title="Toggle Base Labels"
            style={{
              padding: '0.25rem 0.55rem',
              backgroundColor: showLabels ? 'var(--color-forest)' : 'transparent',
              color: showLabels ? '#FFF' : 'var(--color-forest)',
              border: '1px solid rgba(16, 41, 31, 0.2)',
              borderRadius: '3px',
              fontSize: '0.72rem',
              cursor: 'pointer'
            }}
            className="font-mono"
          >
            LABELS {showLabels ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      <div 
        style={{
          marginTop: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'var(--text-muted)',
          fontSize: '0.72rem'
        }}
        className="font-mono"
      >
        <span>[POINTER TILT ACTIVE]</span>
        <span>·</span>
        <span>TOUCH/DRAG TO PERSPECTIVE SHIFT</span>
      </div>
    </div>
  );
}
