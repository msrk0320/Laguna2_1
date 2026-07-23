import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatCards from './components/StatCards';
import ControlBar from './components/ControlBar';
import AnimatedChart from './components/AnimatedChart';
import FindingsSection from './components/FindingsSection';
import DataTable from './components/DataTable';
import { INITIAL_DATA } from './data/benchmarkData';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [data] = useState(() => {
    const saved = localStorage.getItem('bench_data');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  const [selectedContext, setSelectedContext] = useState('ALL');
  const [selectedBuild, setSelectedBuild] = useState('ALL');
  const [chartType, setChartType] = useState('line');
  const [searchQuery, setSearchQuery] = useState('');

  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, html: '' });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Filtered dataset for charts and table
  const filteredData = data.filter(item => {
    const matchContext = selectedContext === 'ALL' || item.context_label === selectedContext;
    const matchBuild = selectedBuild === 'ALL' || item.label === selectedBuild;
    const matchSearch = !searchQuery || 
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.context_label.toLowerCase().includes(searchQuery.toLowerCase());
    return matchContext && matchBuild && matchSearch;
  });

  const handleHoverPoint = (e, row, metric, unitSuffix) => {
    const metricName = metric === 'prefill_tok_s' ? 'Prefill' : 'Gen';
    const val = row[metric];
    const html = `<strong>${row.label} · ${row.context_label}</strong><br/>${metricName}: ${val}${unitSuffix}`;
    setTooltip({
      visible: true,
      x: e.clientX + 14,
      y: e.clientY - 10,
      html
    });
  };

  const handleLeavePoint = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  // Export functions
  const handleExportCSV = () => {
    const headers = ['Build', 'Context', 'Prefill_tok_s', 'Gen_tok_s', 'Peak_VRAM_GB', 'Peak_RAM_GB', 'Date'];
    const rows = filteredData.map(r => [
      r.label,
      r.context_label,
      r.prefill_tok_s,
      r.gen_tok_s,
      r.peak_vram_gb || '',
      r.peak_ram_gb || '',
      r.date
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `laguna_s2.1_benchmarks_${selectedContext}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredData, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `laguna_s2.1_benchmarks_${selectedContext}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app-container">
      {/* Background ambient glowing mesh blobs */}
      <div className="ambient-bg">
        <div className="ambient-blob-1"></div>
        <div className="ambient-blob-2"></div>
      </div>

      <Header
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <StatCards filteredData={filteredData} />

      <ControlBar
        selectedContext={selectedContext}
        setSelectedContext={setSelectedContext}
        selectedBuild={selectedBuild}
        setSelectedBuild={setSelectedBuild}
        chartType={chartType}
        setChartType={setChartType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onExportCSV={handleExportCSV}
        onExportJSON={handleExportJSON}
      />

      <section className="charts-grid">
        <AnimatedChart
          title="Prefill Processing Speed"
          subtitle="Cold prefill of fixed 2,472-token prompt at each context ceiling"
          data={filteredData}
          metric="prefill_tok_s"
          unitSuffix=" tok/s"
          chartType={chartType}
          onHoverPoint={handleHoverPoint}
          onLeavePoint={handleLeavePoint}
        />

        <AnimatedChart
          title="Generation Decode Speed"
          subtitle="Decode speed after prompt prefix is cached (tokens/second)"
          data={filteredData}
          metric="gen_tok_s"
          unitSuffix=" tok/s"
          chartType={chartType}
          onHoverPoint={handleHoverPoint}
          onLeavePoint={handleLeavePoint}
        />
      </section>

      <FindingsSection />

      <DataTable data={filteredData} />

      <footer className="footer">
        <div>
          <span>Laguna-S-2.1 Leaderboard • Open Source Local Inference Benchmarks</span>
        </div>
        <div>
          <span>Hosted on GitHub Pages</span>
        </div>
      </footer>

      {/* Tooltip */}
      <div
        className={`custom-tooltip ${tooltip.visible ? 'visible' : ''}`}
        style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
        dangerouslySetInnerHTML={{ __html: tooltip.html }}
      />
    </div>
  );
}
