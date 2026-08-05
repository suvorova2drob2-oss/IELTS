import { useState, type MouseEvent } from "react";
import {
  outdoorSeries,
  outdoorYears,
} from "../data/practiceWritingTest1";

type Series = (typeof outdoorSeries)[number];

function Marker({
  type,
  cx,
  cy,
  color,
  r,
  onEnter,
  onLeave,
}: {
  type: Series["marker"];
  cx: number;
  cy: number;
  color: string;
  r: number;
  onEnter: (e: MouseEvent<SVGElement>) => void;
  onLeave: () => void;
}) {
  const common = {
    fill: color,
    stroke: "rgba(8, 12, 18, 0.9)",
    strokeWidth: 1.25,
    className: "pw-graph__dot",
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
  };

  if (type === "square") {
    const s = r * 1.7;
    return (
      <rect x={cx - s / 2} y={cy - s / 2} width={s} height={s} {...common} />
    );
  }
  if (type === "diamond") {
    const s = r * 1.5;
    return (
      <polygon
        points={`${cx},${cy - s} ${cx + s},${cy} ${cx},${cy + s} ${cx - s},${cy}`}
        {...common}
      />
    );
  }
  if (type === "triangle") {
    const s = r * 1.8;
    return (
      <polygon
        points={`${cx},${cy - s} ${cx + s},${cy + s * 0.7} ${cx - s},${cy + s * 0.7}`}
        {...common}
      />
    );
  }
  return <circle cx={cx} cy={cy} r={r} {...common} />;
}

/** Interactive SVG line graph for Practice Writing Test 1. */
export function OutdoorActivitiesGraph({
  highlight,
  title = "Percentage of Australians participating in outdoor activities",
}: {
  highlight?: string[];
  title?: string;
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
  const H = 300;
  const pad = { t: 24, r: 20, b: 40, l: 44 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;
  const yMax = 80;
  const xOf = (i: number) => pad.l + (i / (outdoorYears.length - 1)) * plotW;
  const yOf = (v: number) => pad.t + (1 - v / yMax) * plotH;

  const isOn = (id: string) => {
    if (focusId) return focusId === id;
    if (highlight && highlight.length > 0) return highlight.includes(id);
    return true;
  };

  return (
    <div className="pw-graph">
      <p className="pw-graph__title">{title}</p>
      <p className="pw-graph__hint">
        Click legend to focus one line · hover points for exact values
      </p>

      <svg
        className="pw-graph__svg"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={title}
      >
        <defs>
          <clipPath id="pw-graph-clip">
            <rect
              x={pad.l}
              y={pad.t}
              width={plotW}
              height={plotH}
            />
          </clipPath>
        </defs>

        {[0, 20, 40, 60, 80].map((tick) => (
          <g key={tick}>
            <line
              x1={pad.l}
              x2={W - pad.r}
              y1={yOf(tick)}
              y2={yOf(tick)}
              className="pw-graph__grid"
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
          Percentage
        </text>
        {outdoorYears.map((year, i) => (
          <text
            key={year}
            x={xOf(i)}
            y={H - 12}
            className="pw-graph__tick pw-graph__tick--x"
          >
            {year}
          </text>
        ))}

        <g clipPath="url(#pw-graph-clip)">
          {outdoorSeries.map((s) => {
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
                strokeWidth={on ? 2.8 : 1.4}
                strokeDasharray={s.dash || undefined}
                strokeLinejoin="round"
                strokeLinecap="round"
                opacity={on ? 1 : 0.22}
              />
            );
          })}
        </g>

        {outdoorSeries.map((s) => {
          const on = isOn(s.id);
          return (
            <g key={s.id} opacity={on ? 1 : 0.22}>
              {s.values.map((v, i) => (
                <Marker
                  key={`${s.id}-${i}`}
                  type={s.marker}
                  cx={xOf(i)}
                  cy={yOf(v)}
                  color={s.color}
                  r={on ? 5 : 3}
                  onEnter={(e) => {
                    const rect = (
                      e.currentTarget.ownerSVGElement as SVGSVGElement
                    ).getBoundingClientRect();
                    setHover({
                      series: s.label,
                      year: outdoorYears[i],
                      value: v,
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top,
                    });
                  }}
                  onLeave={() => setHover(null)}
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
            {hover.year}: ~{hover.value}%
          </span>
        </div>
      )}

      <ul className="pw-graph__legend">
        {outdoorSeries.map((s) => {
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
                    strokeDasharray={s.dash || undefined}
                    strokeLinecap="round"
                  />
                </svg>
                <span>{s.label}</span>
                <em className="pw-graph__legend-val">’07 · {last}%</em>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
