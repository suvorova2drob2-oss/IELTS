/** Simple multi-series line chart for Mindset Writing Task 1 (cream plot, dark ink). */
export type MsLineSeries = {
  id: string;
  label: string;
  color: string;
  values: number[];
};

export function MsLineGraph({
  title,
  years,
  series,
  yMax,
  yUnit = "",
}: {
  title: string;
  years: string[];
  series: MsLineSeries[];
  yMax: number;
  yUnit?: string;
}) {
  const W = 560;
  const H = 260;
  const pad = { t: 16, r: 16, b: 36, l: 48 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;
  const yMin = 0;
  const xOf = (i: number) =>
    pad.l + (i / Math.max(1, years.length - 1)) * plotW;
  const yOf = (v: number) =>
    pad.t + (1 - (v - yMin) / (yMax - yMin)) * plotH;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(yMin + t * (yMax - yMin)));

  return (
    <div className="pw-graph ms-line-graph">
      <p className="pw-graph__title">{title}</p>
      <svg
        className="pw-graph__svg"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={title}
      >
        <rect
          x={pad.l}
          y={pad.t}
          width={plotW}
          height={plotH}
          fill="#f7f1e6"
          stroke="#1a2430"
          strokeWidth={1.2}
        />
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              className="pw-graph__grid"
              x1={pad.l}
              x2={pad.l + plotW}
              y1={yOf(tick)}
              y2={yOf(tick)}
              stroke="#c5b8a4"
              strokeWidth={0.8}
            />
            <text
              className="pw-graph__tick pw-graph__tick--book"
              x={pad.l - 6}
              y={yOf(tick) + 3}
              textAnchor="end"
              fill="#1a2430"
              fontSize={11}
              fontWeight={700}
            >
              {tick}
              {yUnit}
            </text>
          </g>
        ))}
        {years.map((yr, i) => (
          <text
            key={yr}
            className="pw-graph__tick pw-graph__tick--x pw-graph__tick--book"
            x={xOf(i)}
            y={H - 10}
            textAnchor="middle"
            fill="#1a2430"
            fontSize={11}
            fontWeight={700}
          >
            {yr}
          </text>
        ))}
        {series.map((s) => {
          const pts = s.values
            .map((v, i) => `${xOf(i)},${yOf(v)}`)
            .join(" ");
          return (
            <g key={s.id}>
              <polyline
                fill="none"
                stroke={s.color}
                strokeWidth={2.4}
                points={pts}
              />
              {s.values.map((v, i) => (
                <circle
                  key={`${s.id}-${i}`}
                  cx={xOf(i)}
                  cy={yOf(v)}
                  r={3.5}
                  fill={s.color}
                  stroke="#fff8ee"
                  strokeWidth={1}
                />
              ))}
            </g>
          );
        })}
      </svg>
      <ul className="pw-graph__legend">
        {series.map((s) => (
          <li key={s.id}>
            <span
              className="pw-graph__swatch-svg"
              style={{ background: s.color }}
            />
            {s.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Countryside relocation reasons — reconstructed from Mindset U1 Writing sample/key figures. */
export const MS_U1_COUNTRY_GRAPH = {
  title: "Reasons for moving from a capital city to the countryside (thousands)",
  years: ["1990", "2000", "2010"],
  yMax: 100,
  series: [
    {
      id: "cost",
      label: "Rising cost of living",
      color: "#c62828",
      values: [65, 85, 80],
    },
    {
      id: "traffic",
      label: "Traffic",
      color: "#1565c0",
      values: [20, 38, 72],
    },
    {
      id: "life",
      label: "Lifestyle",
      color: "#2e7d32",
      values: [20, 30, 42],
    },
  ] as MsLineSeries[],
};

/** Capital-city inbound reasons — from Mindset U1 Writing exam sample. */
export const MS_U1_CAPITAL_GRAPH = {
  title: "Reasons for moving to the capital city (thousands)",
  years: ["2000", "2005", "2010", "2015"],
  yMax: 100,
  series: [
    {
      id: "work",
      label: "Employment",
      color: "#c62828",
      values: [61, 78, 92, 87],
    },
    {
      id: "study",
      label: "Study",
      color: "#1565c0",
      values: [25, 47, 54, 87],
    },
    {
      id: "family",
      label: "Family / friends",
      color: "#6a1b9a",
      values: [12, 14, 22, 23],
    },
    {
      id: "adventure",
      label: "Adventure",
      color: "#2e7d32",
      values: [11, 12, 14, 15],
    },
  ] as MsLineSeries[],
};
