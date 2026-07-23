import React, { useState } from 'react';
import { BUILD_COLORS } from '../data/benchmarkData';
import { ArrowUpDown, Table } from 'lucide-react';

export default function DataTable({ data }) {
  const [sortField, setSortField] = useState('context');
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const sortedData = [...data].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];
    if (valA == null) return 1;
    if (valB == null) return -1;
    if (typeof valA === 'string') {
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return sortAsc ? valA - valB : valB - valA;
  });

  return (
    <section className="table-section">
      <h2 className="section-title">
        <Table size={20} style={{ color: 'var(--accent-teal)' }} /> Full Benchmark Sweep Results
      </h2>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('label')}>
                Build <ArrowUpDown size={12} />
              </th>
              <th onClick={() => handleSort('context')}>
                Context Ceiling <ArrowUpDown size={12} />
              </th>
              <th onClick={() => handleSort('prefill_tok_s')}>
                Prefill (tok/s) <ArrowUpDown size={12} />
              </th>
              <th onClick={() => handleSort('gen_tok_s')}>
                Gen (tok/s) <ArrowUpDown size={12} />
              </th>
              <th onClick={() => handleSort('peak_vram_gb')}>
                Peak VRAM <ArrowUpDown size={12} />
              </th>
              <th onClick={() => handleSort('peak_ram_gb')}>
                Peak RAM <ArrowUpDown size={12} />
              </th>
              <th onClick={() => handleSort('date')}>
                Date <ArrowUpDown size={12} />
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map(row => (
              <tr key={row.id || `${row.label}-${row.context}`}>
                <td>
                  <span
                    className="badge-pill"
                    style={{
                      borderColor: BUILD_COLORS[row.label],
                      color: BUILD_COLORS[row.label]
                    }}
                  >
                    {row.label}
                  </span>
                </td>
                <td>{row.context_label} ({row.context.toLocaleString()})</td>
                <td className={row.prefill_tok_s > 80 ? 'cell-highlight' : ''}>
                  {row.prefill_tok_s ? row.prefill_tok_s.toFixed(1) : '—'}
                </td>
                <td className={row.gen_tok_s > 11 ? 'cell-teal' : ''}>
                  {row.gen_tok_s ? row.gen_tok_s.toFixed(2) : '—'}
                </td>
                <td>{row.peak_vram_gb != null ? `${row.peak_vram_gb} GB` : '—'}</td>
                <td>{row.peak_ram_gb != null ? `${row.peak_ram_gb} GB` : '—'}</td>
                <td style={{ color: 'var(--ink-muted)' }}>{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
