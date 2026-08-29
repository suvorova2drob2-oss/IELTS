/** Compact bar + pie charts for Mindset Writing Task 1 exams. */

export type MsBarSeries = {
  id: string;
  label: string;
  color: string;
  values: number[]; // one per year/group
};

/** Side-by-side grouped bars (e.g. UK workforce 1841 vs 2011). */
export function MsBarPairGraph({
  title,
  groups,
  series,
  yMax = 100,
  yUnit = "%",
}: {
  title: string;
  groups: string[];
  series: MsBarSeries[];
  yMax?: number;
  yUnit?: string;
}) {
  const W = 560;
  const H = 260;
  const pad = { t: 16, r: 16, b: 48, l: 44 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;
  const groupW = plotW / groups.length;
  const barGap = 4;
  const barW = (groupW - barGap * (series.length + 1)) / series.length;
  const yOf = (v: number) => pad.t + (1 - v / yMax) * plotH;
  const ticks = [0, 25, 50, 75, 100].filter((t) => t <= yMax);

  return (
    <div className="pw-graph ms-bar-graph">
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
              x1={pad.l}
              x2={pad.l + plotW}
              y1={yOf(tick)}
              y2={yOf(tick)}
              stroke="#c5b8a4"
              strokeWidth={0.8}
            />
            <text
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
        {groups.map((g, gi) => {
          const gx = pad.l + gi * groupW;
          return (
            <g key={g}>
              {series.map((s, si) => {
                const v = s.values[gi] ?? 0;
                const x = gx + barGap + si * (barW + barGap);
                const y = yOf(v);
                const h = pad.t + plotH - y;
                return (
                  <g key={s.id}>
                    <rect
                      x={x}
                      y={y}
                      width={barW}
                      height={Math.max(0, h)}
                      fill={s.color}
                    />
                    <text
                      x={x + barW / 2}
                      y={y - 4}
                      textAnchor="middle"
                      fill="#1a2430"
                      fontSize={10}
                      fontWeight={700}
                    >
                      {v}
                      {yUnit}
                    </text>
                  </g>
                );
              })}
              <text
                x={gx + groupW / 2}
                y={H - 12}
                textAnchor="middle"
                fill="#1a2430"
                fontSize={11}
                fontWeight={700}
              >
                {g}
              </text>
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

function pieSlices(
  cx: number,
  cy: number,
  r: number,
  parts: { value: number; color: string; label: string }[],
) {
  const total = parts.reduce((a, p) => a + p.value, 0) || 1;
  let angle = -Math.PI / 2;
  return parts.map((p) => {
    const sweep = (p.value / total) * Math.PI * 2;
    const x1 = cx + r * Math.cos(angle);
    const y1 = cy + r * Math.sin(angle);
    angle += sweep;
    const x2 = cx + r * Math.cos(angle);
    const y2 = cy + r * Math.sin(angle);
    const large = sweep > Math.PI ? 1 : 0;
    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
    return { ...p, d };
  });
}

/** Two labelled pies side by side (UK vs Brazil news sources). */
export function MsPiePairGraph({
  title,
  left,
  right,
}: {
  title: string;
  left: { title: string; parts: { label: string; value: number; color: string }[] };
  right: { title: string; parts: { label: string; value: number; color: string }[] };
}) {
  const W = 560;
  const H = 240;
  const r = 72;
  const leftSlices = pieSlices(140, 120, r, left.parts);
  const rightSlices = pieSlices(420, 120, r, right.parts);

  return (
    <div className="pw-graph ms-pie-graph">
      <p className="pw-graph__title">{title}</p>
      <svg
        className="pw-graph__svg pw-graph__svg--pie"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={title}
      >
        <rect width={W} height={H} fill="#f7f1e6" />
        {leftSlices.map((s) => (
          <path key={`L-${s.label}`} d={s.d} fill={s.color} stroke="#fff8ee" strokeWidth={1} />
        ))}
        {rightSlices.map((s) => (
          <path key={`R-${s.label}`} d={s.d} fill={s.color} stroke="#fff8ee" strokeWidth={1} />
        ))}
        <text x={140} y={28} textAnchor="middle" fill="#1a2430" fontSize={13} fontWeight={700}>
          {left.title}
        </text>
        <text x={420} y={28} textAnchor="middle" fill="#1a2430" fontSize={13} fontWeight={700}>
          {right.title}
        </text>
      </svg>
      <ul className="pw-graph__legend">
        {left.parts.map((p) => (
          <li key={p.label}>
            <span
              className="pw-graph__swatch-svg"
              style={{ background: p.color }}
            />
            {p.label} ({p.value}%)
          </li>
        ))}
      </ul>
    </div>
  );
}

/** UK workforce industry share — reconstructed from Mindset U5 Writing sample. */
export const MS_U5_WORKFORCE_BARS = {
  title: "UK workforce by industry (%), 1841 and 2011",
  groups: ["1841", "2011"],
  series: [
    {
      id: "agri",
      label: "Agriculture & fishing",
      color: "#2e7d32",
      values: [22, 1],
    },
    {
      id: "energy",
      label: "Energy & water",
      color: "#1565c0",
      values: [3, 1],
    },
    {
      id: "manu",
      label: "Manufacturing",
      color: "#c62828",
      values: [36, 9],
    },
    {
      id: "const",
      label: "Construction",
      color: "#ef6c00",
      values: [5, 8],
    },
    {
      id: "serv",
      label: "Services",
      color: "#6a1b9a",
      values: [33, 81],
    },
  ] as MsBarSeries[],
};

/** News sources UK vs Brazil — reconstructed from Mindset U7 Writing sample. */
export const MS_U7_NEWS_PIES = {
  title: "Principal ways of finding out the news",
  left: {
    title: "UK",
    parts: [
      { label: "Online", value: 36, color: "#1565c0" },
      { label: "Television", value: 32, color: "#c62828" },
      { label: "Print", value: 22, color: "#2e7d32" },
      { label: "Radio", value: 10, color: "#ef6c00" },
    ],
  },
  right: {
    title: "Brazil",
    parts: [
      { label: "Online", value: 53, color: "#1565c0" },
      { label: "Television", value: 34, color: "#c62828" },
      { label: "Print", value: 10, color: "#2e7d32" },
      { label: "Radio", value: 3, color: "#ef6c00" },
    ],
  },
};
