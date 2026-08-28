import {
  PEAK_STUDY_TITLE,
  peakStudyMarkers,
  peakStudyTimes,
  peakStudyValues,
} from "../data/peakStudyTimes";

/** Line graph: peak study times in a day (Language 1B · 2b). */
export function PeakStudyTimesGraph({ compact }: { compact?: boolean }) {
  const W = 640;
  const H = compact ? 200 : 240;
  const pad = { t: 22, r: 18, b: 36, l: 40 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;
  const yMin = 0;
  const yMax = 100;
  const n = peakStudyTimes.length;
  const xOf = (i: number) => pad.l + (i / (n - 1)) * plotW;
  const yOf = (v: number) =>
    pad.t + (1 - (v - yMin) / (yMax - yMin)) * plotH;

  const line = peakStudyValues
    .map((v, i) => `${i === 0 ? "M" : "L"} ${xOf(i)} ${yOf(v)}`)
    .join(" ");

  return (
    <div className="pw-graph peak-study-graph pw-graph--book">
      <p className="pw-graph__title">{PEAK_STUDY_TITLE}</p>
      <svg
        className="pw-graph__svg"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={PEAK_STUDY_TITLE}
      >
        <rect
          x={pad.l}
          y={pad.t}
          width={plotW}
          height={plotH}
          className="women-emp-graph__plot"
        />
        {[0, 20, 40, 60, 80, 100].map((tick) => (
          <g key={tick}>
            {tick > 0 && tick < 100 && (
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
              textAnchor="end"
              className="pw-graph__tick pw-graph__tick--book"
            >
              {tick}
            </text>
          </g>
        ))}
        <text
          x={14}
          y={pad.t + plotH / 2}
          className="pw-graph__axis pw-graph__axis--book"
          transform={`rotate(-90 14 ${pad.t + plotH / 2})`}
        >
          %
        </text>
        <line
          x1={pad.l}
          y1={pad.t + plotH}
          x2={W - pad.r}
          y2={pad.t + plotH}
          className="pw-graph__axis-line"
        />
        <line
          x1={pad.l}
          y1={pad.t}
          x2={pad.l}
          y2={pad.t + plotH}
          className="pw-graph__axis-line"
        />
        {peakStudyTimes.map((t, i) => (
          <text
            key={t}
            x={xOf(i)}
            y={H - 10}
            textAnchor="middle"
            className="pw-graph__tick pw-graph__tick--book pw-graph__tick--x"
          >
            {t}
          </text>
        ))}
        <text
          x={pad.l + plotW / 2}
          y={H - 1}
          textAnchor="middle"
          className="women-emp-graph__xlabel"
        >
          Time
        </text>
        <path d={line} fill="none" stroke="#2f6fed" strokeWidth={2.5} />
        {peakStudyValues.map((v, i) => (
          <circle
            key={peakStudyTimes[i]}
            cx={xOf(i)}
            cy={yOf(v)}
            r={3.2}
            fill="#2f6fed"
          />
        ))}
        {peakStudyMarkers.map((m) => {
          const mid = (m.from + m.to) / 2;
          const x = xOf(mid);
          const yVals = peakStudyValues.slice(m.from, m.to + 1);
          const yAvg =
            yVals.reduce((a, b) => a + b, 0) / Math.max(1, yVals.length);
          const y = yOf(yAvg) - 16;
          return (
            <g key={m.id}>
              <circle
                cx={x}
                cy={y}
                r={9}
                fill="#f4efe6"
                stroke="#1a222c"
                strokeWidth={1.4}
              />
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                className="peak-study-graph__mark"
              >
                {m.id}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
