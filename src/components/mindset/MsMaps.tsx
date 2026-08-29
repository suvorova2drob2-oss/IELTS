/** Schematics for Mindset Listening/Writing map tasks (book-faithful layouts). */

import type { ReactNode } from "react";

function MapShell({
  title,
  children,
  viewBox = "0 0 640 360",
}: {
  title: string;
  children: ReactNode;
  viewBox?: string;
}) {
  return (
    <div className="pw-graph ms-map">
      <p className="pw-graph__title">{title}</p>
      <svg
        className="pw-graph__svg"
        viewBox={viewBox}
        role="img"
        aria-label={title}
      >
        <rect x={0} y={0} width={640} height={360} fill="#f7f1e6" />
        {children}
      </svg>
    </div>
  );
}

function Label({
  x,
  y,
  text,
  letter,
}: {
  x: number;
  y: number;
  text: string;
  letter?: string;
}) {
  return (
    <g>
      {letter && (
        <g>
          <circle cx={x - 2} cy={y - 10} r={10} fill="#1a2430" />
          <text
            x={x - 2}
            y={y - 6}
            textAnchor="middle"
            fill="#f7f1e6"
            fontSize={11}
            fontWeight={700}
          >
            {letter}
          </text>
        </g>
      )}
      <text
        x={x}
        y={y + 8}
        textAnchor="middle"
        fill="#1a2430"
        fontSize={11}
        fontWeight={600}
      >
        {text}
      </text>
    </g>
  );
}

/** Writing U3 Exam — Fosbury outskirts 1980 vs 2015 (from sample answer features). */
export function MsFosburyMaps() {
  return (
    <div className="ms-map-pair">
      <MapShell title="Outskirts of Fosbury in 1980">
        {/* roads */}
        <line x1={40} y1={180} x2={600} y2={180} stroke="#8a7a62" strokeWidth={10} />
        <line x1={320} y1={40} x2={320} y2={320} stroke="#8a7a62" strokeWidth={8} />
        {/* flats + grocer centre */}
        <rect x={270} y={145} width={50} height={30} fill="#c9b8a0" stroke="#1a2430" />
        <Label x={295} y={155} text="flats" />
        <rect x={330} y={145} width={44} height={30} fill="#c9b8a0" stroke="#1a2430" />
        <Label x={352} y={155} text="grocer" />
        {/* terraces right */}
        <rect x={480} y={120} width={100} height={50} fill="#b7a894" stroke="#1a2430" />
        <Label x={530} y={140} text="terraced houses" />
        {/* housing left */}
        <rect x={60} y={100} width={90} height={50} fill="#b7a894" stroke="#1a2430" />
        <Label x={105} y={120} text="housing" />
        {/* park */}
        <rect x={360} y={210} width={90} height={60} fill="#9cba8a" stroke="#1a2430" />
        <Label x={405} y={235} text="park" />
        {/* fields */}
        <rect x={60} y={220} width={140} height={70} fill="#a8c49a" stroke="#1a2430" />
        <Label x={130} y={250} text="fields" />
        {/* tennis */}
        <rect x={480} y={240} width={100} height={50} fill="#8fb89a" stroke="#1a2430" />
        <Label x={530} y={260} text="tennis courts" />
      </MapShell>

      <MapShell title="Outskirts of Fosbury in 2015">
        <line x1={40} y1={180} x2={600} y2={180} stroke="#8a7a62" strokeWidth={10} />
        <line x1={320} y1={40} x2={320} y2={320} stroke="#8a7a62" strokeWidth={8} />
        {/* roundabout */}
        <circle cx={320} cy={180} r={28} fill="#d9cfc0" stroke="#1a2430" strokeWidth={3} />
        <Label x={320} y={180} text="roundabout" />
        {/* extra housing left */}
        <rect x={50} y={90} width={120} height={70} fill="#b7a894" stroke="#1a2430" />
        <Label x={110} y={120} text="new housing" />
        {/* supermarket right */}
        <rect x={460} y={110} width={120} height={55} fill="#c9b8a0" stroke="#1a2430" />
        <Label x={520} y={130} text="supermarket" />
        <rect x={480} y={165} width={80} height={28} fill="#d9cfc0" stroke="#1a2430" />
        <Label x={520} y={175} text="car park" />
        {/* park relocated smaller */}
        <rect x={80} y={210} width={70} height={45} fill="#9cba8a" stroke="#1a2430" />
        <Label x={115} y={228} text="park" />
        {/* warehouses */}
        <rect x={200} y={230} width={130} height={60} fill="#a89888" stroke="#1a2430" />
        <Label x={265} y={255} text="warehouses" />
        {/* sports centre */}
        <rect x={460} y={240} width={120} height={55} fill="#8fb89a" stroke="#1a2430" />
        <Label x={520} y={262} text="sports centre" />
      </MapShell>
    </div>
  );
}

/** Listening U3 practice — ground-floor plan with Places A–C. */
export function MsStatelyHomePlan() {
  return (
    <MapShell title="Ground floor · Places A–C" viewBox="0 0 640 340">
      <rect x={40} y={40} width={560} height={260} fill="#efe6d8" stroke="#1a2430" strokeWidth={2} />
      {/* Main entrance */}
      <rect x={280} y={280} width={80} height={20} fill="#1a2430" />
      <text x={320} y={320} textAnchor="middle" fill="#1a2430" fontSize={12} fontWeight={700}>
        Main entrance
      </text>
      {/* Library right of entrance path */}
      <rect x={400} y={200} width={100} height={80} fill="#d9cfc0" stroke="#1a2430" />
      <Label x={450} y={235} text="Library" />
      {/* Grand Hall left */}
      <rect x={60} y={60} width={180} height={160} fill="#d9cfc0" stroke="#1a2430" />
      <Label x={150} y={100} text="Grand Hall" />
      {/* Place A — corner of Grand Hall */}
      <circle cx={100} cy={180} r={18} fill="#1a2430" />
      <text x={100} y={185} textAnchor="middle" fill="#f7f1e6" fontSize={14} fontWeight={700}>
        A
      </text>
      {/* Exhibition Room centre */}
      <rect x={260} y={60} width={160} height={120} fill="#cfc4b2" stroke="#1a2430" />
      <Label x={340} y={100} text="Exhibition Room" />
      {/* Place C — right turn from Exhibition */}
      <circle cx={400} cy={90} r={18} fill="#1a2430" />
      <text x={400} y={95} textAnchor="middle" fill="#f7f1e6" fontSize={14} fontWeight={700}>
        C
      </text>
      {/* Small room + Place B left of Exhibition turret */}
      <rect x={260} y={60} width={50} height={50} fill="#b7a894" stroke="#1a2430" />
      <circle cx={285} cy={85} r={16} fill="#1a2430" />
      <text x={285} y={90} textAnchor="middle" fill="#f7f1e6" fontSize={13} fontWeight={700}>
        B
      </text>
      <text x={340} y={200} textAnchor="middle" fill="#1a2430" fontSize={11}>
        (turn left through small room → B)
      </text>
    </MapShell>
  );
}

/** Listening U3 exam — Holloway Estate map letters A–I. */
export function MsHollowayEstateMap() {
  return (
    <MapShell title="Holloway Estate" viewBox="0 0 640 380">
      <rect x={30} y={30} width={580} height={320} fill="#efe6d8" stroke="#1a2430" strokeWidth={2} />
      {/* Road */}
      <path
        d="M60 200 H580"
        stroke="#8a7a62"
        strokeWidth={14}
        fill="none"
      />
      <text x={320} y={195} textAnchor="middle" fill="#1a2430" fontSize={11} fontWeight={700}>
        main drive
      </text>
      {/* A holiday cottages — NW */}
      <rect x={50} y={50} width={110} height={70} fill="#b7a894" stroke="#1a2430" />
      <Label x={105} y={80} text="holiday cottages" letter="A" />
      {/* B museum — N */}
      <rect x={200} y={45} width={100} height={75} fill="#c9b8a0" stroke="#1a2430" />
      <Label x={250} y={78} text="museum" letter="B" />
      {/* C dairy — NE */}
      <rect x={360} y={50} width={90} height={70} fill="#d9cfc0" stroke="#1a2430" />
      <Label x={405} y={80} text="dairy" letter="C" />
      {/* D (unused feature) */}
      <rect x={480} y={55} width={90} height={60} fill="#cfc4b2" stroke="#1a2430" />
      <Label x={525} y={80} text="orchard" letter="D" />
      {/* E gift shop — mid left of drive */}
      <rect x={80} y={220} width={100} height={60} fill="#c9b8a0" stroke="#1a2430" />
      <Label x={130} y={245} text="gift shop" letter="E" />
      {/* F */}
      <rect x={220} y={230} width={90} height={55} fill="#d9cfc0" stroke="#1a2430" />
      <Label x={265} y={252} text="café" letter="F" />
      {/* G beehives — SE */}
      <rect x={360} y={240} width={100} height={70} fill="#9cba8a" stroke="#1a2430" />
      <Label x={410} y={270} text="beehives" letter="G" />
      {/* H */}
      <rect x={490} y={230} width={90} height={55} fill="#b7a894" stroke="#1a2430" />
      <Label x={535} y={252} text="car park" letter="H" />
      {/* I estate office — SW near entrance */}
      <rect x={50} y={300} width={120} height={40} fill="#a89888" stroke="#1a2430" />
      <Label x={110} y={315} text="estate office" letter="I" />
    </MapShell>
  );
}
