import React, { useState } from 'react';
import { X, Plus, FileCode } from 'lucide-react';

export default function AddRunModal({ isOpen, onClose, onAddRun }) {
  const [label, setLabel] = useState('custom-build');
  const [contextLabel, setContextLabel] = useState('256K');
  const [prefill, setPrefill] = useState('');
  const [gen, setGen] = useState('');
  const [vram, setVram] = useState('');
  const [ram, setRam] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [activeTab, setActiveTab] = useState('form');

  if (!isOpen) return null;

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const contextMap = { '128K': 131072, '256K': 262144, '512K': 524288, '1M': 1048576 };
    const newRun = {
      id: Date.now(),
      label: label.trim() || 'custom-build',
      context: contextMap[contextLabel] || 262144,
      context_label: contextLabel,
      prefill_tok_s: parseFloat(prefill) || 100,
      gen_tok_s: parseFloat(gen) || 10,
      peak_vram_gb: vram ? parseFloat(vram) : null,
      peak_ram_gb: ram ? parseFloat(ram) : null,
      date: new Date().toISOString().split('T')[0]
    };
    onAddRun(newRun);
    onClose();
  };

  const handleImportJSON = (e) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(jsonInput);
      const items = Array.isArray(parsed) ? parsed : [parsed];
      items.forEach((item, idx) => {
        onAddRun({
          id: Date.now() + idx,
          label: item.label || 'imported-run',
          context: item.context || 262144,
          context_label: item.context_label || `${Math.round((item.context || 262144) / 1024)}K`,
          prefill_tok_s: parseFloat(item.prefill_tok_s) || 0,
          gen_tok_s: parseFloat(item.gen_tok_s) || 0,
          peak_vram_gb: item.peak_vram_gb != null ? parseFloat(item.peak_vram_gb) : null,
          peak_ram_gb: item.peak_ram_gb != null ? parseFloat(item.peak_ram_gb) : null,
          date: item.date || new Date().toISOString().split('T')[0]
        });
      });
      onClose();
    } catch (err) {
      alert('Invalid JSON format. Please check your benchmark JSON snippet.');
    }
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`}>
      <div className="modal-card">
        <div className="modal-header">
          <h3>Add / Import Benchmark Run</h3>
          <button className="btn btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="filter-btn-group" style={{ marginBottom: '20px', width: '100%' }}>
          <button
            className={`filter-btn ${activeTab === 'form' ? 'active' : ''}`}
            style={{ flex: 1 }}
            onClick={() => setActiveTab('form')}
          >
            Manual Form
          </button>
          <button
            className={`filter-btn ${activeTab === 'json' ? 'active' : ''}`}
            style={{ flex: 1 }}
            onClick={() => setActiveTab('json')}
          >
            <FileCode size={13} style={{ display: 'inline', verticalAlign: 'middle' }} /> JSON Paste
          </button>
        </div>

        {activeTab === 'form' ? (
          <form onSubmit={handleSubmitForm}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label>Build Label</label>
                <input
                  type="text"
                  className="form-input"
                  value={label}
                  onChange={e => setLabel(e.target.value)}
                  placeholder="e.g. mainline-v2"
                  required
                />
              </div>

              <div className="form-group">
                <label>Context Window</label>
                <select
                  className="form-input"
                  value={contextLabel}
                  onChange={e => setContextLabel(e.target.value)}
                >
                  <option value="128K">128K (131072)</option>
                  <option value="256K">256K (262144)</option>
                  <option value="512K">512K (524288)</option>
                  <option value="1M">1M (1048576)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label>Prefill Speed (tok/s)</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-input"
                  value={prefill}
                  onChange={e => setPrefill(e.target.value)}
                  placeholder="e.g. 98.5"
                  required
                />
              </div>

              <div className="form-group">
                <label>Generation Speed (tok/s)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-input"
                  value={gen}
                  onChange={e => setGen(e.target.value)}
                  placeholder="e.g. 11.2"
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label>Peak VRAM (GB)</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-input"
                  value={vram}
                  onChange={e => setVram(e.target.value)}
                  placeholder="e.g. 10.4"
                />
              </div>

              <div className="form-group">
                <label>Peak RAM (GB)</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-input"
                  value={ram}
                  onChange={e => setRam(e.target.value)}
                  placeholder="e.g. 58.2"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '12px' }}>
              <Plus size={15} /> Add Sweep Result
            </button>
          </form>
        ) : (
          <form onSubmit={handleImportJSON}>
            <div className="form-group">
              <label>Paste JSON or Sweep Output Array</label>
              <textarea
                className="form-textarea"
                value={jsonInput}
                onChange={e => setJsonInput(e.target.value)}
                placeholder={`[
  { "label": "custom-fork", "context": 262144, "context_label": "256K", "prefill_tok_s": 104.2, "gen_tok_s": 11.8, "peak_vram_gb": 9.9, "peak_ram_gb": 57.1, "date": "2026-07-24" }
]`}
                required
              />
            </div>
            <button type="submit" className="btn btn-teal" style={{ width: '100%', marginTop: '8px' }}>
              Import JSON Results
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
