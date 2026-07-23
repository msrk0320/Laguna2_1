import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Zap, Gauge, AlertTriangle } from 'lucide-react';

export default function StatCards({ filteredData }) {
  const containerRef = useRef(null);

  // Calculate dynamic summary stats based on active data
  const poolside512K = filteredData.find(d => d.label === 'poolside-fork' && d.context_label === '512K');
  const mainline512K = filteredData.find(d => d.label === 'mainline' && d.context_label === '512K');
  
  const prefillVal = poolside512K ? poolside512K.prefill_tok_s : 87.7;
  const mainlineVal = mainline512K ? mainline512K.prefill_tok_s : 39.3;

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.stat-card');
    
    gsap.fromTo(cards, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    );
  }, []);

  return (
    <div className="stat-cards-grid" ref={containerRef}>
      <div className="glass-panel stat-card teal">
        <div className="stat-card-label">
          <Zap size={14} /> Prefill Crossover @ 512K
        </div>
        <div className="stat-card-value">
          {prefillVal} <small>vs {mainlineVal} tok/s</small>
        </div>
        <p className="stat-card-desc">
          Poolside fork avoids mainline's 3x crater at 512K — but mainline edges ahead at 1M.
        </p>
      </div>

      <div className="glass-panel stat-card">
        <div className="stat-card-label">
          <Gauge size={14} /> Decode Generation Speed
        </div>
        <div className="stat-card-value">
          7–12.3 <small>tok/s across builds</small>
        </div>
        <p className="stat-card-desc">
          Both builds degrade equally once 64GB system memory limit is approached at 1M context.
        </p>
      </div>

      <div className="glass-panel stat-card good">
        <div className="stat-card-label">
          <AlertTriangle size={14} /> Peak Memory Ceiling
        </div>
        <div className="stat-card-value">
          63.4 <small>GB / 64GB RAM</small>
        </div>
        <p className="stat-card-desc">
          System RAM is the true bottleneck at 1M context, while VRAM stays steady around ~11.4GB.
        </p>
      </div>
    </div>
  );
}
