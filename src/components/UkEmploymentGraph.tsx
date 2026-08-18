import { useState, type MouseEvent } from "react";
import {
  ukEmploymentSeries,
  ukEmploymentYears,
  writingM1b,
} from "../data/writingM1b";

type Series = (typeof ukEmploymentSeries)[number];

function fmtPct(v: number): string {
  if (v > 0) return `+${v}%`;
  return `${v}%`;
}

/** Line graph: UK employment % change by education, 1990–2025. */
export function UkEmploymentGraph({
  highlight,
  compact,
}: {
  highlight?: string[];
  compact?: boolean;
}) {
  const [hover, setHover] = useState<{
    series: string;
    year: number;
    value: number;
    x: number;
    y: number;
  } | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);

  const W = 560;
  const H = compact ? 248 : 280;
  const pad = { t: 18, r: 18, b: 36, l: 42 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;
  const yMin = -20;
  const yMax = 40;
  const xOf = (i: number) =>
    pad.l + (i / (ukEmploymentYears.length - 1)) * plotW;
  const yOf = (v: number) =>
    pad.t + (1 - (v - yMin) / (yMax - yMin)) * plotH;
  const predictIndex = ukEmploymentYears.indexOf(
    writingM1b.predictFromYear as (typeof ukEmploymentYears)[number],
  );

  const isOn = (id: string) => {
    if (focusId) return focusId === id;
    if (highlight && highlight.length > 0) return highlight.includes(id);
    return true;
  };

  const placeTip = (e: MouseEvent<SVGElement>, s: Series, i: number) => {
    const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
    setHover({
      series: s.label,
      year: ukEmploymentYears[i],
      value: s.values[i],
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="pw-graph uk-emp-graph">
      <p className="pw-graph__title">{writingM1b.graphTitle}</p>
      <p className="pw-graph__hint">
        Click legend to focus one line · dashed line = predicted from{" "}
        {writingM1b.predictFromYear}
      </p>

      <svg
        className="pw-graph__svg"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={writingM1b.graphTitle}
      >
        {[-20, -10, 0, 10, 20, 30, 40].map((tick) => (
          <g key={tick}>
            <line
              x1={pad.l}
              x2={W - pad.r}
              y1={yOf(tick)}
              y2={yOf(tick)}
              className={
                tick === 0 ? "pw-graph__grid pw-graph__grid--zero" : "pw-graph__grid"
              }
            />
            <text x={pad.l - 8} y={yOf(tick) + 4} className="pw-graph__tick">
              {tick}
            </text>
          </g>
        ))}
        <text
          x={12}
          y={H / 2}
          className="pw-graph__axis"
          transform={`rotate(-90 12 ${H / 2})`}
        >
          %
        </text>
        {ukEmploymentYears.map((year, i) => (
          <text
            key={year}
            x={xOf(i)}
            y={H - 10}
            className="pw-graph__tick pw-graph__tick--x"
          >
            {year}
          </text>
        ))}

        {predictIndex > 0 && (
          <g>
            <line
              x1={xOf(predictIndex)}
              x2={xOf(predictIndex)}
              y1={pad.t}
              y2={pad.t + plotH}
              className="pw-graph__predict"
            />
            <text
              x={xOf(predictIndex) + 6}
              y={pad.t + 12}
              className="pw-graph__predict-label"
            >
              predicted →
            </text>
          </g>
        )}

        {ukEmploymentSeries.map((s) => {
          const on = isOn(s.id);
          const d = s.values
            .map((v, i) => `${i === 0 ? "M" : "L"} ${xOf(i)} ${yOf(v)}`)
            .join(" ");
          return (
            <path
              key={`${s.id}-line`}
              d={d}
              fill="none"
              stroke={s.color}
              strokeWidth={on ? 3.2 : 1.6}
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity={on ? 1 : 0.22}
            />
          );
        })}

        {ukEmploymentSeries.map((s) => {
          const on = isOn(s.id);
          return (
            <g key={s.id} opacity={on ? 1 : 0.22}>
              {s.values.map((v, i) => (
                <circle
                  key={`${s.id}-${i}`}
                  cx={xOf(i)}
                  cy={yOf(v)}
                  r={on ? 5 : 3.2}
                  fill={s.color}
                  stroke="rgba(8, 12, 18, 0.9)"
                  strokeWidth={1.2}
                  className="pw-graph__dot"
                  onMouseEnter={(e) => placeTip(e, s, i)}
                  onMouseLeave={() => setHover(null)}
                />
              ))}
            </g>
          );
        })}
      </svg>

      {hover && (
        <div
          className="pw-graph__tip"
          style={{ left: hover.x + 10, top: hover.y - 10 }}
        >
          <strong>{hover.series}</strong>
          <span>
            {hover.year}: {fmtPct(hover.value)}
          </span>
        </div>
      )}

      <ul className="pw-graph__legend">
        {ukEmploymentSeries.map((s) => {
          const on = isOn(s.id);
          const selected = focusId === s.id;
          const last = s.values[s.values.length - 1];
          return (
            <li key={s.id}>
              <button
                type="button"
                className={[
                  "pw-graph__legend-btn",
                  on ? "" : "pw-graph__legend-btn--dim",
                  selected ? "pw-graph__legend-btn--on" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() =>
                  setFocusId((prev) => (prev === s.id ? null : s.id))
                }
                aria-pressed={selected}
              >
                <svg
                  className="pw-graph__swatch-svg"
                  viewBox="0 0 36 12"
                  aria-hidden
                >
                  <line
                    x1="2"
                    y1="6"
                    x2="34"
                    y2="6"
                    stroke={s.color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span>{s.label}</span>
                <em className="pw-graph__legend-val">’25 · {fmtPct(last)}</em>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
