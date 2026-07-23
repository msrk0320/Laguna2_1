import React from 'react';
import { Cpu, HardDrive, Zap, Sun, Moon } from 'lucide-react';
import { SYSTEM_SPECS } from '../data/benchmarkData';

export default function Header({ theme, toggleTheme }) {
  return (
    <header className="header-bar">
      <div className="header-title-group">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge-pill copper">
            <Zap size={13} /> {SYSTEM_SPECS.model} Benchmarks
          </span>
          <span className="badge-pill teal">
            <HardDrive size={13} /> {SYSTEM_SPECS.quant}
          </span>
        </div>
        <h1>Laguna-S-2.1 — Local Inference Leaderboard</h1>
        <div className="header-subtitle">
          <span><Cpu size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> {SYSTEM_SPECS.gpu}</span>
          <span>•</span>
          <span>{SYSTEM_SPECS.cpu}</span>
          <span>•</span>
          <span>{SYSTEM_SPECS.ram}</span>
        </div>
      </div>

      <div className="header-actions">
        <button 
          className="btn btn-icon" 
          onClick={toggleTheme} 
          aria-label="Toggle theme"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}

