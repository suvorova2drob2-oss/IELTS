type Props = {
  alt: string;
  compact?: boolean;
};

export function SpeakM3aGlassesVisual({ alt, compact }: Props) {
  return (
    <svg
      className={`speak-m3a__glasses-visual${compact ? " speak-m3a__glasses-visual--compact" : ""}`}
      viewBox="0 0 640 340"
      role="img"
      aria-label={alt}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="speak-m3a-bg" cx="50%" cy="38%" r="72%">
          <stop offset="0%" stopColor="#1a2530" />
          <stop offset="100%" stopColor="#0a0e12" />
        </radialGradient>
        <linearGradient id="speak-m3a-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="speak-m3a-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7ec8e3" />
          <stop offset="100%" stopColor="#2a7fa8" />
        </linearGradient>
        <linearGradient id="speak-m3a-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.22)" />
        </linearGradient>
        <filter id="speak-m3a-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000" floodOpacity="0.45" />
        </filter>
        <filter id="speak-m3a-note-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>

      <rect width="640" height="340" fill="url(#speak-m3a-bg)" />
      <ellipse cx="320" cy="292" rx="250" ry="28" fill="url(#speak-m3a-floor)" />

      <g filter="url(#speak-m3a-shadow)">
        <Glass x={168} />
        <Glass x={392} />
      </g>

      <StickyNote x={118} y={52} rotate={-8} label="half empty" />
      <StickyNote x={462} y={48} rotate={7} label="half full" />
    </svg>
  );
}

function Glass({ x }: { x: number }) {
  const y = 88;
  const w = 84;
  const h = 168;
  const waterTop = y + h * 0.5;

  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d={`M8 0 H${w - 8} Q${w} 0 ${w} 8 V${h - 14} Q${w - 4} ${h} ${w / 2} ${h} Q4 ${h} 0 ${h - 14} V8 Q0 0 8 0 Z`}
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="2"
      />
      <path
        d={`M10 ${waterTop} H${w - 10} V${h - 14} Q${w - 4} ${h - 2} ${w / 2} ${h - 2} Q4 ${h - 2} 10 ${h - 14} Z`}
        fill="url(#speak-m3a-water)"
        opacity="0.92"
      />
      <rect
        x={14}
        y={waterTop + 6}
        width={w - 28}
        height={h - waterTop - 20}
        rx={4}
        fill="url(#speak-m3a-water)"
        opacity="0.55"
      />
      <path
        d={`M12 4 H${w - 16} Q${w - 6} 4 ${w - 8} 16 V${h - 16}`}
        fill="none"
        stroke="url(#speak-m3a-glass)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <ellipse cx={w / 2} cy={h + 10} rx={w * 0.42} ry={8} fill="rgba(120,190,230,0.22)" />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={22 + i * 18}
          cy={waterTop - 10 - i * 8}
          r={2.5 - i * 0.4}
          fill="rgba(255,255,255,0.55)"
        />
      ))}
    </g>
  );
}

function StickyNote({
  x,
  y,
  rotate,
  label,
}: {
  x: number;
  y: number;
  rotate: number;
  label: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate} 72 36)`} filter="url(#speak-m3a-note-shadow)">
      <rect width="144" height="72" rx="4" fill="#f2d04b" stroke="#c9a826" strokeWidth="1.5" />
      <rect x="118" y="4" width="22" height="18" rx="2" fill="#e8c040" opacity="0.65" />
      <text
        x="72"
        y="46"
        textAnchor="middle"
        fill="#1a1a1a"
        fontFamily="'Segoe Print', 'Comic Sans MS', cursive"
        fontSize="22"
        fontWeight="700"
      >
        {label}
      </text>
    </g>
  );
}
