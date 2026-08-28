import { useState, type MouseEvent } from "react";
import {
  womenSeries,
  womenYears,
  writingM1a,
} from "../data/writingM1a";

type Series = (typeof womenSeries)[number];

/** Line graph: % women in employment by education, 1950–2010 (coursebook p. 14). */
export function WomenEmploymentGraph({
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
  const H = compact ? 260 : 300;
  const pad = { t: 14, r: 14, b: 36, l: 42 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;
  const yMin = 50;
  const yMax = 100;
  const xOf = (i: number) =>
    pad.l + (i / (womenYears.length - 1)) * plotW;
  const yOf = (v: number) =>
    pad.t + (1 - (v - yMin) / (yMax - yMin)) * plotH;

  const axisYears = [1950, 1960, 1970, 1980, 1990, 2000, 2010] as const;

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
      year: womenYears[i],
      value: s.values[i],
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="pw-graph women-emp-graph pw-graph--book">
      <p className="pw-graph__title">{writingM1a.graphTitle}</p>

      <svg
        className="pw-graph__svg women-emp-graph__svg"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={writingM1a.graphTitle}
      >
        <rect
          x={pad.l}
          y={pad.t}
          width={plotW}
          height={plotH}
          className="women-emp-graph__plot"
        />

        {[50, 60, 70, 80, 90, 100].map((tick) => (
          <g key={tick}>
            {tick > 50 && tick < 100 && (
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

        {/* Axes */}
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

        <text
          x={14}
          y={pad.t + plotH * 0.35}
          className="pw-graph__axis pw-graph__axis--book"
          transform={`rotate(-90 14 ${pad.t + plotH * 0.35})`}
        >
          %
        </text>

        {axisYears.map((year) => {
          const i = womenYears.indexOf(year);
          return (
            <text
              key={year}
              x={xOf(i)}
              y={H - 12}
              className="pw-graph__tick pw-graph__tick--x pw-graph__tick--book"
            >
              {year}
            </text>
          );
        })}

        <text
          x={pad.l + plotW / 2}
          y={H - 1}
          className="pw-graph__axis pw-graph__axis--book women-emp-graph__xlabel"
        >
          Year
        </text>

        {womenSeries.map((s) => {
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
                strokeWidth={on ? 2.6 : 1.4}
                strokeLinejoin="round"
                strokeLinecap="round"
                opacity={on ? 1 : 0.18}
              />
              {s.values.map((v, i) => (
                <circle
                  key={`${s.id}-${i}`}
                  cx={xOf(i)}
                  cy={yOf(v)}
                  r={on ? 3.2 : 2}
                  fill={s.color}
                  opacity={on ? 1 : 0.18}
                  className="pw-graph__dot"
                  onMouseEnter={(e) => placeTip(e, s, i)}
                  onMouseLeave={() => setHover(null)}
                />
              ))}
            </g>
          );
        })}

        {/* Legend inside plot (as in coursebook) */}
        <g className="women-emp-graph__legend" transform={`translate(${pad.l + plotW - 118}, ${pad.t + 10})`}>
          {womenSeries.map((s, i) => (
            <g
              key={s.id}
              transform={`translate(0, ${i * 16})`}
              className="women-emp-graph__legend-row"
              onClick={() => setFocusId((id) => (id === s.id ? null : s.id))}
              style={{ cursor: "pointer" }}
            >
              <line
                x1="0"
                y1="0"
                x2="18"
                y2="0"
                stroke={s.color}
                strokeWidth="2.4"
                strokeLinecap="round"
                opacity={focusId && focusId !== s.id ? 0.25 : 1}
              />
              <text
                x="24"
                y="4"
                className="pw-graph__tick pw-graph__tick--book"
                style={{ textAnchor: "start", fontSize: "11px" }}
                opacity={focusId && focusId !== s.id ? 0.35 : 1}
              >
                {s.label}
              </text>
            </g>
          ))}
        </g>

        {hover && (
          <g pointerEvents="none">
            <foreignObject
              x={Math.min(hover.x + 8, W - 140)}
              y={Math.max(hover.y - 36, 4)}
              width={132}
              height={40}
            >
              <div className="pw-graph__tip">
                <strong>{hover.series}</strong>
                <span>
                  {hover.year}: {hover.value}%
                </span>
              </div>
            </foreignObject>
          </g>
        )}
      </svg>
    </div>
  );
}
