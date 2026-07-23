import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { FINDINGS } from '../data/benchmarkData';
import { Sparkles } from 'lucide-react';

export default function FindingsSection() {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.finding-card');

    gsap.fromTo(cards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out' }
    );
  }, []);

  return (
    <section className="findings-section">
      <h2 className="section-title">
        <Sparkles size={20} style={{ color: 'var(--accent-copper)' }} /> Key Benchmark Findings & Analysis
      </h2>
      <div className="findings-grid" ref={gridRef}>
        {FINDINGS.map(item => (
          <div key={item.id} className={`glass-panel finding-card ${item.type}`}>
            <span className="finding-tag">{item.tag}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
