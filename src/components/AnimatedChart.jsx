import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { BUILD_COLORS } from '../data/benchmarkData';

export default function AnimatedChart({
  title,
  subtitle,
  data,
  metric,
  unitSuffix,
  chartType = 'line',
  onHoverPoint,
  onLeavePoint
}) {
  const svgRef = useRef(null);

  // Group data by context size or build
  const uniqueContexts = [...new Set(data.map(d => d.context))].sort((a, b) => a - b);
  const builds = [...new Set(data.map(d => d.label))];

  const W = 460;
  const H = 220;
  const padL = 40;
  const padR = 20;
  const padT = 20;
  const padB = 35;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const maxVal = Math.max(...data.map(d => (d[metric] || 0)), 10) * 1.15;

  const getX = (ctxIndex) => padL + (ctxIndex / Math.max(uniqueContexts.length - 1, 1)) * plotW;
  const getY = (val) => padT + plotH - ((val || 0) / maxVal) * plotH;

  const dataKey = data.map(d => `${d.id || d.context}-${d[metric]}`).join('|');

  // GSAP path draw animation on metric or data change
  useEffect(() => {
    if (!svgRef.current) return;
    const paths = svgRef.current.querySelectorAll('.chart-series-line');
    const bars = svgRef.current.querySelectorAll('.chart-bar');
    const dots = svgRef.current.querySelectorAll('.chart-point');

    if (paths.length > 0) {
      paths.forEach(path => {
        const length = path.getTotalLength();
        gsap.fromTo(path,
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 1.2, ease: 'power2.out' }
        );
      });
    }

    if (bars.length > 0) {
      gsap.fromTo(bars,
        { scaleY: 0, transformOrigin: 'bottom' },
        { scaleY: 1, duration: 0.8, stagger: 0.05, ease: 'back.out(1.2)' }
      );
    }

    if (dots.length > 0) {
      gsap.fromTo(dots,
        { scale: 0 },
        { scale: 1, duration: 0.4, stagger: 0.03, ease: 'back.out(1.7)' }
      );
    }
  }, [dataKey, metric, chartType]);

  return (
    <div className="glass-panel chart-card">
      <div className="chart-header">
        <div>
          <h2>{title}</h2>
          <p className="chart-subtitle">{subtitle}</p>
        </div>
      </div>

      <div className="chart-svg-container">
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`}>
          {/* Y Axis Gridlines */}
          {[0, 0.5, 1].map((t, idx) => {
            const gy = padT + plotH * (1 - t);
            const valLabel = Math.round(maxVal * t);
            return (
              <g key={idx}>
                <line class="chart-gridline" x1={padL} y1={gy} x2={W - padR} y2={gy} />
                <text class="chart-axis-label" x={padL - 8} y={gy + 4} textAnchor="end">
                  {valLabel}
                </text>
              </g>
            );
          })}

          {/* X Axis Labels */}
          {uniqueContexts.map((ctx, idx) => {
            const item = data.find(d => d.context === ctx);
            const labelText = item ? item.context_label : ctx;
            const xPos = getX(idx);
            return (
              <text key={ctx} class="chart-axis-label" x={xPos} y={H - 10} textAnchor="middle">
                {labelText}
              </text>
            );
          })}

          {/* Render Line Chart */}
          {chartType === 'line' && builds.map(bLabel => {
            const rows = data.filter(d => d.label === bLabel).sort((a, b) => a.context - b.context);
            if (rows.length === 0) return null;

            const pts = rows.map(r => ({
              x: getX(uniqueContexts.indexOf(r.context)),
              y: getY(r[metric]),
              row: r
            }));

            const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
            const color = BUILD_COLORS[bLabel] || 'var(--accent-copper)';

            return (
              <g key={bLabel}>
                <path
                  className="chart-series-line"
                  d={pathD}
                  style={{ stroke: color }}
                />
                {pts.map((p, i) => (
                  <circle
                    key={i}
                    className="chart-point"
                    cx={p.x}
                    cy={p.y}
                    r={5}
                    style={{ stroke: color }}
                    onMouseEnter={(e) => onHoverPoint(e, p.row, metric, unitSuffix)}
                    onMouseMove={(e) => onHoverPoint(e, p.row, metric, unitSuffix)}
                    onMouseLeave={onLeavePoint}
                  />
                ))}
              </g>
            );
          })}

          {/* Render Bar Chart */}
          {chartType === 'bar' && uniqueContexts.map((ctx, ctxIdx) => {
            const groupRows = data.filter(d => d.context === ctx);
            const groupWidth = 24;
            const barW = groupWidth / Math.max(groupRows.length, 1);
            const startX = getX(ctxIdx) - groupWidth / 2;

            return groupRows.map((r, bIdx) => {
              const val = r[metric] || 0;
              const barH = ((val / maxVal) * plotH);
              const x = startX + bIdx * barW;
              const y = padT + plotH - barH;
              const color = BUILD_COLORS[r.label] || 'var(--accent-copper)';

              return (
                <rect
                  key={r.id || `${ctx}-${r.label}`}
                  className="chart-bar"
                  x={x}
                  y={y}
                  width={barW - 2}
                  height={barH}
                  fill={color}
                  rx={3}
                  onMouseEnter={(e) => onHoverPoint(e, r, metric, unitSuffix)}
                  onMouseMove={(e) => onHoverPoint(e, r, metric, unitSuffix)}
                  onMouseLeave={onLeavePoint}
                  style={{ cursor: 'pointer' }}
                />
              );
            });
          })}
        </svg>
      </div>

      <div className="chart-legend">
        {builds.map(b => (
          <div key={b} className="legend-item">
            <span className="legend-dot" style={{ background: BUILD_COLORS[b] || 'var(--ink-muted)' }}></span>
            <span>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
