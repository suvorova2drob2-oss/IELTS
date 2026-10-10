import { useState } from "react";

export type ListenScriptLine = {
  speaker: string;
  text: string;
};

export function ListenTranscriptPanel({
  label,
  lines,
}: {
  label: string;
  lines: readonly ListenScriptLine[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <aside
      className={`pl-script listen-m3a__script-panel ${open ? "pl-script--open" : ""}`}
    >
      <div className="pl-script__toggle">
        <span>{label}</span>
        <button
          type="button"
          className="pl-script__chev"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          {open ? "▾ Hide transcript" : "▸ Transcript"}
        </button>
      </div>
      {open && (
        <div className="pl-script__body listen-m3a__script-body">
          {lines.map((line, i) => (
            <p key={`${line.speaker}-${i}`}>
              {line.speaker === "Narrator" ? (
                <>
                  <strong>Narrator: </strong>
                  {line.text}
                </>
              ) : (
                <>
                  <strong>{line.speaker}: </strong>
                  {line.text}
                </>
              )}
            </p>
          ))}
        </div>
      )}
    </aside>
  );
}
