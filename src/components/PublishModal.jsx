import React, { useState } from 'react';
import { X, Globe, Copy, Check, Terminal, Github, ExternalLink } from 'lucide-react';

export default function PublishModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('github');

  if (!isOpen) return null;

  const deployCmd = 'npm run deploy';

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`}>
      <div className="modal-card">
        <div className="modal-header">
          <h3><Globe size={18} style={{ color: 'var(--accent-teal)', display: 'inline', verticalAlign: 'middle' }} /> Free Open-Source Publishing Guide</h3>
          <button className="btn btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="filter-btn-group" style={{ marginBottom: '16px', width: '100%' }}>
          <button
            className={`filter-btn ${selectedProvider === 'github' ? 'active' : ''}`}
            style={{ flex: 1 }}
            onClick={() => setSelectedProvider('github')}
          >
            <Github size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> GitHub Pages
          </button>
          <button
            className={`filter-btn ${selectedProvider === 'vercel' ? 'active' : ''}`}
            style={{ flex: 1 }}
            onClick={() => setSelectedProvider('vercel')}
          >
            Vercel
          </button>
          <button
            className={`filter-btn ${selectedProvider === 'cloudflare' ? 'active' : ''}`}
            style={{ flex: 1 }}
            onClick={() => setSelectedProvider('cloudflare')}
          >
            Cloudflare
          </button>
        </div>

        {selectedProvider === 'github' && (
          <div>
            <p style={{ fontSize: '13.5px', color: 'var(--ink-secondary)', marginBottom: '12px' }}>
              Host this website <strong>100% free</strong> directly from your GitHub repository using GitHub Pages.
            </p>

            <label style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)' }}>
              1-Click Deployment Command:
            </label>
            <div className="code-block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <code>{deployCmd}</code>
              <button
                className="btn"
                style={{ padding: '4px 8px', fontSize: '11px' }}
                onClick={() => handleCopy(deployCmd)}
              >
                {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <ol style={{ fontSize: '13px', color: 'var(--ink-secondary)', paddingLeft: '20px', lineHeight: '1.6', marginTop: '12px' }}>
              <li>Push your code to GitHub: <code>git push origin main</code></li>
              <li>Run <code>npm run deploy</code> to publish live to <code>gh-pages</code> branch.</li>
              <li>Or use the included <code>.github/workflows/deploy.yml</code> for automated deployments on every commit.</li>
            </ol>
          </div>
        )}

        {selectedProvider === 'vercel' && (
          <div>
            <p style={{ fontSize: '13.5px', color: 'var(--ink-secondary)', marginBottom: '12px' }}>
              Vercel provides automatic SSL, global CDN, and preview deployments for open source.
            </p>
            <div className="code-block">
              <code>npx vercel --prod</code>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--ink-secondary)' }}>
              Set <strong>Build Command</strong> to <code>npm run build</code> and <strong>Output Directory</strong> to <code>dist</code>.
            </p>
          </div>
        )}

        {selectedProvider === 'cloudflare' && (
          <div>
            <p style={{ fontSize: '13.5px', color: 'var(--ink-secondary)', marginBottom: '12px' }}>
              Cloudflare Pages provides zero-cost static hosting with unlimited bandwidth.
            </p>
            <div className="code-block">
              <code>npx wrangler pages deploy dist</code>
            </div>
          </div>
        )}

        <div style={{ marginTop: '20px', borderTop: '1px solid var(--line)', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-teal" onClick={onClose}>
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
