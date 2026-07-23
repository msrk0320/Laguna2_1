import React from 'react';
import { Filter, Download, LineChart, BarChart2, Search } from 'lucide-react';

export default function ControlBar({
  selectedContext,
  setSelectedContext,
  selectedBuild,
  setSelectedBuild,
  chartType,
  setChartType,
  searchQuery,
  setSearchQuery,
  onExportCSV,
  onExportJSON
}) {
  const contextOptions = ['ALL', '128K', '256K', '512K', '1M'];
  const buildOptions = ['ALL', 'mainline', 'poolside-fork'];

  return (
    <div className="glass-panel controls-panel">
      <div className="control-group">
        <span className="control-label"><Filter size={12} /> Context:</span>
        <div className="filter-btn-group">
          {contextOptions.map(ctx => (
            <button
              key={ctx}
              className={`filter-btn ${selectedContext === ctx ? 'active' : ''}`}
              onClick={() => setSelectedContext(ctx)}
            >
              {ctx}
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <span className="control-label">Build:</span>
        <div className="filter-btn-group">
          {buildOptions.map(b => (
            <button
              key={b}
              className={`filter-btn ${selectedBuild === b ? 'active' : ''}`}
              onClick={() => setSelectedBuild(b)}
            >
              {b === 'poolside-fork' ? 'poolside' : b}
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <span className="control-label">View:</span>
        <div className="filter-btn-group">
          <button
            className={`filter-btn ${chartType === 'line' ? 'active' : ''}`}
            onClick={() => setChartType('line')}
            title="Line chart view"
          >
            <LineChart size={14} /> Line
          </button>
          <button
            className={`filter-btn ${chartType === 'bar' ? 'active' : ''}`}
            onClick={() => setChartType('bar')}
            title="Bar chart view"
          >
            <BarChart2 size={14} /> Bar
          </button>
        </div>
      </div>

      <div className="control-group" style={{ flexGrow: 1, maxWidth: '200px' }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-muted)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '30px', padding: '6px 12px 6px 32px', fontSize: '12px' }}
            placeholder="Search run..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="control-group">
        <button className="btn" onClick={onExportCSV} title="Export current view to CSV">
          <Download size={14} /> CSV
        </button>
        <button className="btn" onClick={onExportJSON} title="Export current view to JSON">
          <Download size={14} /> JSON
        </button>
      </div>
    </div>
  );
}
