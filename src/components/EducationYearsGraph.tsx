import { useState, type MouseEvent } from "react";
import {
  educationSeries,
  educationYears,
  writingM1a,
} from "../data/writingM1a";

type Series = (typeof educationSeries)[number];

/** Line graph: average years of education, NZ & Korea, 1950–2010. */
export function EducationYearsGraph({
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

  const W = 640;
  const H = compact ? 280 : 320;
  const pad = { t: 16, r: 16, b: 38, l: 40 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;
  const yMin = 0;
  const yMax = 12;
  const xOf = (i: number) =>
    pad.l + (i / (educationYears.length - 1)) * plotW;
  const yOf = (v: number) =>
    pad.t + (1 - (v - yMin) / (yMax - yMin)) * plotH;

  const isOn = (id: string) => {
    if (focusId) return focusId === id;
    if (highlight && highlight.length > 0) return highlight.includes(id);
    return true;
  };

  const placeTip = (e: MouseEvent<SVGElement>, s: Series, i: number) => {
    const rect = (
      e.currentTarget.ownerSVGElement as SVGSVGElement
    ).getBoundingClientRect();
    setHover({
      series: s.label,
      year: educationYears[i],
      value: s.values[i],
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const title = writingM1a.step2a.graphTitle;

  return (
    <div className="pw-graph edu-years-graph pw-graph--book">
      <p className="pw-graph__title">{title}</p>

      <svg
        className="pw-graph__svg"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={title}
      >
        <rect x={0} y={0} width={W} height={H} fill="#f7f1e6" />
        <rect
          x={pad.l}
          y={pad.t}
          width={plotW}
          height={plotH}
          className="women-emp-graph__plot"
        />

        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((tick) => (
          <g key={tick}>
            {tick > 0 && tick < 12 && (
              <line
                x1={pad.l}
                x2={W - pad.r}
                y1={yOf(tick)}
                y2={yOf(tick)}
                className="pw-graph__grid pw-graph__grid--book"
              />
            )}
            <text
              x={pad.l - 8}
              y={yOf(tick) + 4}
              className="pw-graph__tick pw-graph__tick--book"
            >
              {tick}
            </text>
          </g>
        ))}

        <line
          x1={pad.l}
          y1={pad.t}
          x2={pad.l}
          y2={pad.t + plotH}
          className="pw-graph__axis-line"
        />
        <line
          x1={pad.l}
          y1={pad.t + plotH}
          x2={pad.l + plotW}
          y2={pad.t + plotH}
          className="pw-graph__axis-line"
        />

        {educationYears.map((year, i) => (
          <text
            key={year}
            x={xOf(i)}
            y={H - 10}
            className="pw-graph__tick pw-graph__tick--x pw-graph__tick--book"
          >
            {year}
          </text>
        ))}

        <text
          x={pad.l + plotW / 2}
          y={H - 1}
          className="pw-graph__axis pw-graph__axis--book women-emp-graph__xlabel"
        >
          Year
        </text>

        {educationSeries.map((s) => {
          const on = isOn(s.id);
          const d = s.values
            .map((v, i) => `${i === 0 ? "M" : "L"} ${xOf(i)} ${yOf(v)}`)
            .join(" ");
          return (
            <g key={s.id}>
              <path
                d={d}
                fill="none"
                stroke={s.color}
                strokeWidth={on ? 3.2 : 1.5}
                strokeLinejoin="round"
                strokeLinecap="round"
                opacity={on ? 1 : 0.2}
              />
              {s.values.map((v, i) => (
                <circle
                  key={`${s.id}-${i}`}
                  cx={xOf(i)}
                  cy={yOf(v)}
                  r={on ? 3.8 : 2.2}
                  fill={s.color}
                  stroke="rgba(20, 24, 30, 0.85)"
                  strokeWidth={1}
                  opacity={on ? 1 : 0.2}
                  className="pw-graph__dot"
                  onMouseEnter={(e) => placeTip(e, s, i)}
                  onMouseLeave={() => setHover(null)}
                />
              ))}
            </g>
          );
        })}

        {hover && (
          <foreignObject
            x={Math.min(hover.x + 8, W - 150)}
            y={Math.max(hover.y - 36, 4)}
            width={142}
            height={40}
          >
            <div className="pw-graph__tip">
              <strong>{hover.series}</strong>
              <span>
                {hover.year}: {hover.value} yrs
              </span>
            </div>
          </foreignObject>
        )}
      </svg>

      <ul className="pw-graph__legend">
        {educationSeries.map((s) => {
          const on = isOn(s.id);
          return (
            <li key={s.id}>
              <button
                type="button"
                className={`pw-graph__legend-btn ${on && focusId ? "pw-graph__legend-btn--on" : ""} ${focusId && !on ? "pw-graph__legend-btn--dim" : ""}`}
                onClick={() =>
                  setFocusId((id) => (id === s.id ? null : s.id))
                }
              >
                <svg className="pw-graph__swatch-svg" viewBox="0 0 28 10" aria-hidden>
                  <line
                    x1="2"
                    y1="5"
                    x2="26"
                    y2="5"
                    stroke={s.color}
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                <span>{s.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
