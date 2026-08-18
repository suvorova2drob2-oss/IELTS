import type { Task1Model } from "../data/practiceWritingTask1Models";

const coal = "#c4a574";
const gas = "#6eb5c0";
const nuclear = "#e0c08a";
const renew = "#7dce82";

const housing = "#e0c08a";
const food = "#7dce82";
const transport = "#6eb5c0";
const leisure = "#ce93d8";
const other = "#8a9aaa";

const pie2000 = [
  { label: "Food", value: 30, color: food },
  { label: "Housing", value: 25, color: housing },
  { label: "Other", value: 20, color: other },
  { label: "Transport", value: 15, color: transport },
  { label: "Leisure", value: 10, color: leisure },
];

const pie2020 = [
  { label: "Housing", value: 35, color: housing },
  { label: "Leisure", value: 20, color: leisure },
  { label: "Food", value: 18, color: food },
  { label: "Transport", value: 15, color: transport },
  { label: "Other", value: 12, color: other },
];

function piePath(
  cx: number,
  cy: number,
  r: number,
  start: number,
  sweep: number,
) {
  const a1 = start;
  const a2 = start + sweep;
  const x1 = cx + r * Math.cos(a1);
  const y1 = cy + r * Math.sin(a1);
  const x2 = cx + r * Math.cos(a2);
  const y2 = cy + r * Math.sin(a2);
  const large = sweep > Math.PI ? 1 : 0;
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
}

function Pie({
  parts,
  cx,
  cy,
  r,
  caption,
}: {
  parts: { label: string; value: number; color: string }[];
  cx: number;
  cy: number;
  r: number;
  caption: string;
}) {
  let angle = -Math.PI / 2;
  return (
    <g>
      {parts.map((p) => {
        const sweep = (p.value / 100) * 2 * Math.PI;
        const d = piePath(cx, cy, r, angle, sweep);
        const mid = angle + sweep / 2;
        const lx = cx + (r + 18) * Math.cos(mid);
        const ly = cy + (r + 18) * Math.sin(mid);
        angle += sweep;
        return (
          <g key={`${caption}-${p.label}`}>
            <path d={d} fill={p.color} stroke="#0a1016" strokeWidth="1.5" />
            <text
              x={lx}
              y={ly}
              className="pw-t1-label"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {p.value}%
            </text>
          </g>
        );
      })}
      <text x={cx} y={cy + r + 28} className="pw-t1-caption" textAnchor="middle">
        {caption}
      </text>
    </g>
  );
}

function BarChart() {
  const sources = [
    { key: "coal", label: "Coal", color: coal },
    { key: "gas", label: "Gas", color: gas },
    { key: "nuclear", label: "Nuclear", color: nuclear },
    { key: "renew", label: "Renewables", color: renew },
  ];
  const countries = [
    { name: "UK", values: [35, 40, 15, 10] },
    { name: "France", values: [8, 10, 70, 12] },
    { name: "Australia", values: [60, 22, 0, 18] },
  ];
  const W = 560;
  const H = 200;
  const pad = { l: 38, r: 12, t: 10, b: 28 };
  const max = 80;
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;
  const groupW = plotW / countries.length;
  const barW = 16;
  const gap = 5;
  const cluster = sources.length * barW + (sources.length - 1) * gap;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="pw-graph__svg" role="img">
      <title>Electricity generation by source, 2010 (%)</title>
      {[0, 20, 40, 60, 80].map((n) => {
        const y = pad.t + plotH - (n / max) * plotH;
        return (
          <g key={n}>
            <line
              x1={pad.l}
              x2={W - pad.r}
              y1={y}
              y2={y}
              className="pw-graph__grid"
            />
            <text x={pad.l - 8} y={y + 4} className="pw-graph__tick">
              {n}
            </text>
          </g>
        );
      })}
      {countries.map((c, i) => {
        const gx = pad.l + i * groupW + (groupW - cluster) / 2;
        return (
          <g key={c.name}>
            {c.values.map((v, j) => {
              const h = (v / max) * plotH;
              const x = gx + j * (barW + gap);
              const y = pad.t + plotH - h;
              return (
                <rect
                  key={sources[j].key}
                  x={x}
                  y={v === 0 ? pad.t + plotH - 2 : y}
                  width={barW}
                  height={v === 0 ? 2 : h}
                  fill={sources[j].color}
                  rx="2"
                />
              );
            })}
            <text
              x={gx + cluster / 2}
              y={H - 8}
              className="pw-graph__tick pw-graph__tick--x"
            >
              {c.name}
            </text>
          </g>
        );
      })}
      <text
        x={18}
        y={H / 2}
        className="pw-graph__axis"
        transform={`rotate(-90 18 ${H / 2})`}
      >
        % of electricity
      </text>
    </svg>
  );
}

function Island({
  year,
  developed,
  x,
}: {
  year: string;
  developed: boolean;
  x: number;
}) {
  return (
    <g transform={`translate(${x}, 8)`}>
      <ellipse cx="130" cy="118" rx="108" ry="78" fill="#1a2834" stroke="#8a9aaa" strokeWidth="2" />
      <path
        d="M 28 118 Q 40 158 70 168 Q 100 176 130 172"
        fill="none"
        stroke="#e0c08a"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <text x="52" y="196" className="pw-t1-map-txt">
        beach
      </text>
      <circle cx="210" cy="90" r="5" fill="#f4efe6" />
      <rect x="208" y="72" width="4" height="18" fill="#c4a574" />
      <text x="186" y="64" className="pw-t1-map-txt">
        lighthouse
      </text>
      {!developed && (
        <>
          <circle cx="120" cy="100" r="11" fill="#3d6b48" />
          <circle cx="138" cy="112" r="13" fill="#4a7d56" />
          <circle cx="108" cy="118" r="10" fill="#3d6b48" />
          <circle cx="148" cy="96" r="9" fill="#4a7d56" />
          <text x="108" y="86" className="pw-t1-map-txt">
            trees
          </text>
        </>
      )}
      {developed && (
        <>
          <circle cx="150" cy="88" r="8" fill="#3d6b48" />
          <circle cx="168" cy="98" r="7" fill="#4a7d56" />
          <rect x="108" y="92" width="36" height="22" rx="2" fill="#e0c08a" />
          <text x="110" y="86" className="pw-t1-map-txt">
            hotel
          </text>
          <rect x="118" y="122" width="28" height="16" rx="2" fill="#6eb5c0" />
          <text x="112" y="154" className="pw-t1-map-txt">
            restaurant
          </text>
          <rect x="48" y="128" width="22" height="12" rx="2" fill="#ce93d8" />
          <rect x="58" y="138" width="22" height="12" rx="2" fill="#ce93d8" />
          <text x="36" y="124" className="pw-t1-map-txt">
            huts
          </text>
          <path
            d="M 126 138 L 130 198"
            stroke="#c4a574"
            strokeWidth="3"
            fill="none"
          />
          <rect x="118" y="198" width="24" height="8" fill="#8a9aaa" />
          <line x1="130" y1="206" x2="130" y2="222" stroke="#8a9aaa" strokeWidth="3" />
          <text x="138" y="218" className="pw-t1-map-txt">
            pier
          </text>
        </>
      )}
      <text x="130" y="248" className="pw-t1-caption" textAnchor="middle">
        {year}
      </text>
    </g>
  );
}

function MapPair() {
  return (
    <svg viewBox="0 0 560 256" className="pw-graph__svg pw-graph__svg--map" role="img">
      <title>Island 1990 and 2020</title>
      <Island year="1990" developed={false} x={8} />
      <Island year="2020" developed x={286} />
    </svg>
  );
}

function PiePair() {
  return (
    <div className="pw-t1-pies">
      <svg viewBox="0 0 560 200" className="pw-graph__svg pw-graph__svg--pie" role="img">
        <title>Household spending 2000 and 2020</title>
        <Pie parts={pie2000} cx={140} cy={92} r={62} caption="2000" />
        <Pie parts={pie2020} cx={420} cy={92} r={62} caption="2020" />
      </svg>
      <ul className="pw-graph__legend">
        {[
          { label: "Housing", color: housing },
          { label: "Food", color: food },
          { label: "Transport", color: transport },
          { label: "Leisure", color: leisure },
          { label: "Other", color: other },
        ].map((s) => (
          <li key={s.label}>
            <span className="pw-graph__legend-btn" style={{ cursor: "default" }}>
              <span
                className="pw-t1-swatch"
                style={{ background: s.color }}
              />
              {s.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AirportTable() {
  const rows = [
    ["Heathrow", "80", "78"],
    ["Dubai", "88", "87"],
    ["Istanbul", "68", "80"],
    ["Singapore", "65", "59"],
    ["Doha", "35", "46"],
  ];
  return (
    <div className="pw-t1-table">
      <p className="pw-graph__title">Passengers at five airports (millions)</p>
      <table>
        <thead>
          <tr>
            <th>Airport</th>
            <th>2018</th>
            <th>2023</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((c) => (
                <td key={c}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MixedVisual() {
  const years = ["2018", "2019", "2020", "2021", "2022"];
  const nums = ["12,000", "14,000", "13,000", "18,000", "21,000"];
  const mix = [
    { label: "Website", value: 40, color: housing },
    { label: "Friends", value: 30, color: food },
    { label: "Ads", value: 20, color: transport },
    { label: "Other", value: 10, color: other },
  ];
  return (
    <div className="pw-t1-mixed">
      <div className="pw-t1-table">
        <p className="pw-graph__title">Museum visitors</p>
        <table>
          <thead>
            <tr>
              {years.map((y) => (
                <th key={y}>{y}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {nums.map((n) => (
                <td key={n}>{n}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="pw-t1-pies">
        <p className="pw-graph__title">How visitors heard (2022)</p>
        <svg viewBox="0 0 280 170" className="pw-graph__svg pw-graph__svg--pie" role="img">
          <Pie parts={mix} cx={140} cy={78} r={58} caption="" />
        </svg>
        <ul className="pw-graph__legend">
          {mix.map((s) => (
            <li key={s.label}>
              <span className="pw-graph__legend-btn" style={{ cursor: "default" }}>
                <span className="pw-t1-swatch" style={{ background: s.color }} />
                {s.label} {s.value}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Task1ModelChart({ model }: { model: Task1Model }) {
  return (
    <div className="pw-graph pw-t1-visual">
      {model.kind === "bar" && (
        <>
          <p className="pw-graph__title">
            Electricity generation by source, 2010 (%)
          </p>
          <BarChart />
          <ul className="pw-graph__legend">
            {[
              { label: "Coal", color: coal },
              { label: "Gas", color: gas },
              { label: "Nuclear", color: nuclear },
              { label: "Renewables", color: renew },
            ].map((s) => (
              <li key={s.label}>
                <span className="pw-graph__legend-btn" style={{ cursor: "default" }}>
                  <span className="pw-t1-swatch" style={{ background: s.color }} />
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
      {model.kind === "pie" && (
        <>
          <p className="pw-graph__title">Household spending (%)</p>
          <PiePair />
        </>
      )}
      {model.kind === "table" && <AirportTable />}
      {model.kind === "map" && (
        <>
          <p className="pw-graph__title">An island, 1990 and 2020</p>
          <p className="pw-graph__hint">N ↑ · west beach · east lighthouse</p>
          <MapPair />
        </>
      )}
      {model.kind === "mixed" && <MixedVisual />}
    </div>
  );
}
