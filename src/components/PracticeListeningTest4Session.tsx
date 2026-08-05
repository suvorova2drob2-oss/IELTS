import { useMemo, useState } from "react";
import { practiceListeningTest4 } from "../data/practiceListeningTest4";
import { AudioPlayer } from "./AudioPlayer";

type Track = "learn" | "exam";
type Phase =
  | "photo"
  | "discuss"
  | "synMatch"
  | "synFill"
  | "exam"
  | "followup"
  | "cities";

type ScorePair = { score: number; total: number };

const LEARN_FLOW: Phase[] = [
  "photo",
  "discuss",
  "synMatch",
  "synFill",
  "exam",
  "followup",
  "cities",
];
const EXAM_FLOW: Phase[] = ["exam"];

function norm(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "'")
    .replace(/\s+/g, " ");
}

function accepts(value: string, accept: string[]): boolean {
  const n = norm(value);
  return accept.some((a) => norm(a) === n);
}

function ScriptPanel({
  lines,
  label,
}: {
  lines: { speaker: string; text: string }[];
  label: string;
}) {
  return (
    <aside className="pl-script pl-script--side pl-script--open">
      <div className="pl-script__toggle">
        <span>{label}</span>
      </div>
      <div className="pl-script__body">
        {lines.map((l, i) => (
          <p key={`${l.speaker}-${i}`}>
            <strong>{l.speaker}:</strong> {l.text}
          </p>
        ))}
      </div>
    </aside>
  );
}

export function PracticeListeningTest4Session({
  track,
  onBackToModes,
  onComplete,
}: {
  track: Track;
  onBackToModes: () => void;
  onComplete: (scores: {
    flowMatch: ScorePair;
    summary: ScorePair;
  }) => void;
}) {
  const test = practiceListeningTest4;
  const flow = track === "exam" ? EXAM_FLOW : LEARN_FLOW;
  const [phase, setPhase] = useState<Phase>(flow[0]);
  const [examScores, setExamScores] = useState<{
    flowMatch: ScorePair;
    summary: ScorePair;
  } | null>(null);

  const goNext = () => {
    const i = flow.indexOf(phase);
    if (i < 0 || i >= flow.length - 1) {
      onBackToModes();
      return;
    }
    setPhase(flow[i + 1]);
  };

  const goBack = () => {
    const i = flow.indexOf(phase);
    if (i <= 0) onBackToModes();
    else setPhase(flow[i - 1]);
  };

  if (phase === "photo") {
    return (
      <PhotoPhase data={test.leadIn} onBack={goBack} onNext={goNext} />
    );
  }
  if (phase === "discuss") {
    return (
      <DiscussPhase data={test.leadIn} onBack={goBack} onNext={goNext} />
    );
  }
  if (phase === "synMatch") {
    return (
      <SynMatchPhase data={test.synonyms} onBack={goBack} onNext={goNext} />
    );
  }
  if (phase === "synFill") {
    return (
      <SynFillPhase data={test.synonyms} onBack={goBack} onNext={goNext} />
    );
  }
  if (phase === "exam") {
    return (
      <ExamPhase
        data={test.examTask}
        onBack={goBack}
        onNext={(scores) => {
          setExamScores(scores);
          if (track === "exam") {
            onComplete(scores);
            return;
          }
          goNext();
        }}
      />
    );
  }
  if (phase === "followup") {
    return (
      <FollowReflectPhase
        data={test.followUp}
        onBack={goBack}
        onNext={goNext}
      />
    );
  }

  return (
    <CitiesPhase
      data={test.followUp}
      onBack={goBack}
      onNext={() =>
        onComplete(
          examScores ?? {
            flowMatch: { score: 0, total: 6 },
            summary: { score: 0, total: 4 },
          },
        )
      }
    />
  );
}

function PhotoPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest4.leadIn;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="pl-shell pl-shell--wide">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Modes
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn · Lead-in</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <div className="pl-leadin-discuss">
        <figure className="pl-hero pl-hero--photo">
          <img src={data.image} alt={data.imageAlt} />
        </figure>
        <section className="pl-panel pl-panel--discuss">
          <p className="pr-leadin__instruction">
            <span>1</span>
            {data.photoInstruction.replace(/^\d+\s*/, "")}
          </p>
        </section>
      </div>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">Look & discuss</span>
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={onNext}
        >
          Next →
        </button>
      </footer>
    </div>
  );
}

function DiscussPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest4.leadIn;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="pl-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn · Lead-in</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <section className="pl-panel pl-panel--fill">
        <p className="pr-leadin__instruction">
          <span>2</span>
          {data.discussInstruction.replace(/^\d+\s*/, "")}
        </p>
        <ol className="pr-leadin__statements">
          {data.discussQuestions.map((q, i) => (
            <li key={q}>
              <strong>{i + 1}</strong>
              <span>{q}</span>
            </li>
          ))}
        </ol>
      </section>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">Discuss</span>
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={onNext}
        >
          Synonyms →
        </button>
      </footer>
    </div>
  );
}

function SynMatchPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest4.synonyms;
  onBack: () => void;
  onNext: () => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const used = useMemo(
    () => new Set(Object.values(answers).filter(Boolean)),
    [answers],
  );
  const score = data.words.filter((w) => answers[w.id] === w.key).length;

  return (
    <div className="pl-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn · Training</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <section className="pl-panel pl-panel--fill">
        <p className="pr-leadin__instruction">
          <span>3</span>
          {data.matchInstruction.replace(/^\d+\s*/, "")}
        </p>
        <div className="pl-syn-grid">
          <ul className="pl-letter-bank">
            {data.options.map((o) => (
              <li
                key={o.letter}
                className={used.has(o.letter) ? "pl-letter-bank__used" : ""}
              >
                <strong>{o.letter}</strong> {o.label}
              </li>
            ))}
          </ul>
          <ol className="pl-map-qs">
            {data.words.map((w) => {
              const val = answers[w.id] ?? "";
              const ok = val === w.key;
              return (
                <li key={w.id}>
                  <span className="pr-mc__num">{w.id}</span>
                  <span className="pl-match-prompt">{w.word}</span>
                  <select
                    className={
                      checked
                        ? ok
                          ? "pr-match-select pr-match-select--ok"
                          : "pr-match-select pr-match-select--bad"
                        : "pr-match-select"
                    }
                    value={val}
                    disabled={checked}
                    onChange={(e) =>
                      setAnswers((a) => ({ ...a, [w.id]: e.target.value }))
                    }
                  >
                    <option value="">—</option>
                    {data.options.map((o) => (
                      <option
                        key={o.letter}
                        value={o.letter}
                        disabled={
                          used.has(o.letter) && answers[w.id] !== o.letter
                        }
                      >
                        {o.letter}
                      </option>
                    ))}
                  </select>
                  {checked && !ok && (
                    <span className="pl-blank__key">→ {w.key}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        {checked ? (
          <span className="flow-footer__step">
            ✓ {score}/{data.words.length}
          </span>
        ) : (
          <span className="flow-footer__step">Synonyms</span>
        )}
        {!checked ? (
          <>
            <button
              type="button"
              className="flow-footer__btn"
              onClick={() => setAnswers({})}
            >
              Заново
            </button>
            <button
              type="button"
              className="flow-footer__btn flow-footer__btn--primary"
              onClick={() => setChecked(true)}
            >
              Check →
            </button>
          </>
        ) : (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={onNext}
          >
            Next →
          </button>
        )}
      </footer>
    </div>
  );
}

function SynFillPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest4.synonyms;
  onBack: () => void;
  onNext: () => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [active, setActive] = useState<number | null>(1);
  const used = useMemo(
    () => new Set(Object.values(answers).map(norm).filter(Boolean)),
    [answers],
  );
  const score = data.sentences.filter(
    (s) => norm(answers[s.id] ?? "") === norm(s.key),
  ).length;

  return (
    <div className="pl-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn · Training</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <section className="pl-panel pl-panel--fill">
        <p className="pr-leadin__instruction">
          <span>4</span>
          {data.fillInstruction.replace(/^\d+\s*/, "")}
        </p>
        <div className="pr-advice__box">
          {data.wordBox.map((w) => {
            const taken = used.has(norm(w));
            return (
              <button
                key={w}
                type="button"
                className={`pr-chip ${taken ? "pr-chip--used" : ""}`}
                disabled={checked || taken || active == null}
                onClick={() => {
                  if (active == null) return;
                  const id = active;
                  setAnswers((a) => {
                    const next = { ...a, [id]: w };
                    const pick =
                      data.sentences.find(
                        (s) => s.id !== id && !norm(next[s.id] ?? ""),
                      ) ?? null;
                    setActive(pick?.id ?? null);
                    return next;
                  });
                }}
              >
                {w}
              </button>
            );
          })}
        </div>
        <ol className="pl-vocab-list">
          {data.sentences.map((s) => {
            const val = answers[s.id] ?? "";
            const ok = norm(val) === norm(s.key);
            return (
              <li key={s.id}>
                <span className="pr-mc__num">{s.id}</span>
                <p>
                  {s.before}
                  <button
                    type="button"
                    className={
                      checked
                        ? ok
                          ? "pl-blank-chip pl-blank-chip--ok"
                          : "pl-blank-chip pl-blank-chip--bad"
                        : active === s.id
                          ? "pl-blank-chip pl-blank-chip--on"
                          : "pl-blank-chip"
                    }
                    disabled={checked}
                    onClick={() => setActive(s.id)}
                  >
                    {val || "……"}
                  </button>
                  {checked && !ok && (
                    <span className="pl-blank__key"> → {s.key}</span>
                  )}
                  {s.after}
                </p>
              </li>
            );
          })}
        </ol>
      </section>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        {checked ? (
          <span className="flow-footer__step">
            ✓ {score}/{data.sentences.length}
          </span>
        ) : (
          <span className="flow-footer__step">Word box</span>
        )}
        {!checked ? (
          <>
            <button
              type="button"
              className="flow-footer__btn"
              onClick={() => {
                setAnswers({});
                setActive(1);
              }}
            >
              Заново
            </button>
            <button
              type="button"
              className="flow-footer__btn flow-footer__btn--primary"
              onClick={() => setChecked(true)}
            >
              Check →
            </button>
          </>
        ) : (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={onNext}
          >
            Listening →
          </button>
        )}
      </footer>
    </div>
  );
}

function ExamPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest4.examTask;
  onBack: () => void;
  onNext: (scores: { flowMatch: ScorePair; summary: ScorePair }) => void;
}) {
  const [picked, setPicked] = useState<string[]>([]);
  const [flowAns, setFlowAns] = useState<Record<number, string>>({});
  const [sumAns, setSumAns] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  const flowBlanks = data.flow.steps.filter(
    (s): s is Extract<(typeof data.flow.steps)[number], { key: string }> =>
      typeof s.id === "number",
  );

  const multiScore = data.multi.keys.filter((k) => picked.includes(k)).length;
  const flowScore = flowBlanks.filter((b) =>
    accepts(flowAns[b.id] ?? "", b.accept),
  ).length;
  const summaryScore = ([7, 8, 9, 10] as const).filter((id) =>
    accepts(sumAns[id] ?? "", data.summary.keys[id].accept),
  ).length;

  const flowMatch: ScorePair = {
    score: multiScore + flowScore,
    total: data.multi.keys.length + flowBlanks.length,
  };
  const summary: ScorePair = { score: summaryScore, total: 4 };

  const toggle = (letter: string) => {
    if (checked) return;
    setPicked((prev) => {
      if (prev.includes(letter)) return prev.filter((x) => x !== letter);
      if (prev.length >= 2) return prev;
      return [...prev, letter];
    });
  };

  return (
    <div className={`pl-shell ${checked ? "pl-shell--wide" : ""}`}>
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Questions 1–10</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <div className={`pl-listen ${checked ? "pl-listen--with-script" : ""}`}>
        <div className="pl-listen__main">
          <div className="pl-listen__top">
            <p className="pl-task-header pl-task-header--inline">
              Questions 1–10 · Matching · Flow chart · Summary
            </p>
            <AudioPlayer src={data.audioUrl} label={data.audioLabel} />
          </div>
          <div className="pl-part1">
            <section className="pl-task-card">
              <h3>{data.multi.header}</h3>
              <p className="pl-task-card__note">{data.multi.instruction}</p>
              <p className="pl-task-card__prompt">{data.multi.prompt}</p>
              <ul className="pl-mc-list">
                {data.multi.options.map((o) => {
                  const on = picked.includes(o.letter);
                  let cls = "pl-mc-opt";
                  if (checked) {
                    const isKey = (
                      data.multi.keys as readonly string[]
                    ).includes(o.letter);
                    if (isKey) cls += " pl-mc-opt--ok";
                    else if (on) cls += " pl-mc-opt--bad";
                  } else if (on) cls += " pl-mc-opt--on";
                  return (
                    <li key={o.letter}>
                      <button
                        type="button"
                        className={cls}
                        disabled={checked}
                        onClick={() => toggle(o.letter)}
                      >
                        <strong>{o.letter}</strong>
                        <span>{o.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {checked && multiScore < 2 && (
                <p className="pl-blank__key">
                  → {data.multi.keys.join(" & ")}
                </p>
              )}
            </section>

            <section className="pl-task-card">
              <h3>{data.flow.header}</h3>
              <p className="pl-task-card__note">
                {data.flow.instruction.split("\n")[0]} ·{" "}
                <strong>NO MORE THAN THREE WORDS</strong>
              </p>
              <p className="pl-flow__title">{data.flow.title}</p>
              <ol className="pl-flow">
                {data.flow.steps.map((step, i) => {
                  if (typeof step.id !== "number") {
                    return (
                      <li key={step.id} className="pl-flow__fixed">
                        <span className="pl-flow__arrow" aria-hidden>
                          {i > 0 ? "↓" : ""}
                        </span>
                        <p>{step.text}</p>
                      </li>
                    );
                  }
                  const blank = step as (typeof flowBlanks)[number];
                  const val = flowAns[blank.id] ?? "";
                  const ok = accepts(val, blank.accept);
                  return (
                    <li key={blank.id}>
                      {i > 0 && (
                        <span className="pl-flow__arrow" aria-hidden>
                          ↓
                        </span>
                      )}
                      <div className="pl-flow__box">
                        <span className="pr-mc__num">{blank.id}</span>
                        <p>
                          {blank.before}
                          <input
                            className={
                              checked
                                ? ok
                                  ? "pl-gap-input pl-gap-input--ok"
                                  : "pl-gap-input pl-gap-input--bad"
                                : "pl-gap-input"
                            }
                            value={val}
                            disabled={checked}
                            placeholder="…"
                            onChange={(e) =>
                              setFlowAns((a) => ({
                                ...a,
                                [blank.id]: e.target.value,
                              }))
                            }
                          />
                          {checked && !ok && (
                            <span className="pl-blank__key">
                              {" "}
                              → {blank.key}
                            </span>
                          )}
                          {blank.after}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>

            <section className="pl-task-card">
              <h3>{data.summary.header}</h3>
              <p className="pl-task-card__note">
                Complete the summary · <strong>NO MORE THAN ONE WORD</strong>
              </p>
              <p className="pl-gap-line">
                {data.summary.parts.map((part, i) => {
                  if (typeof part === "string") {
                    return <span key={i}>{part}</span>;
                  }
                  const id = part.gap;
                  const meta = data.summary.keys[id as 7 | 8 | 9 | 10];
                  const val = sumAns[id] ?? "";
                  const ok = accepts(val, meta.accept);
                  return (
                    <span key={i} className="pl-gap-slot">
                      <span className="pr-mc__num pr-mc__num--inline">
                        {id}
                      </span>
                      <input
                        className={
                          checked
                            ? ok
                              ? "pl-gap-input pl-gap-input--ok"
                              : "pl-gap-input pl-gap-input--bad"
                            : "pl-gap-input"
                        }
                        value={val}
                        disabled={checked}
                        placeholder="…"
                        onChange={(e) =>
                          setSumAns((a) => ({
                            ...a,
                            [id]: e.target.value,
                          }))
                        }
                      />
                      {checked && !ok && (
                        <span className="pl-blank__key">→ {meta.key}</span>
                      )}
                    </span>
                  );
                })}
              </p>
            </section>
          </div>
        </div>
        {checked && (
          <ScriptPanel lines={data.script} label="Tapescript 4.1" />
        )}
      </div>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        {checked ? (
          <span className="flow-footer__step">
            ✓ {flowMatch.score + summary.score}/10
          </span>
        ) : (
          <span className="flow-footer__step">Urban planning</span>
        )}
        {!checked ? (
          <>
            <button
              type="button"
              className="flow-footer__btn"
              onClick={() => {
                setPicked([]);
                setFlowAns({});
                setSumAns({});
              }}
            >
              Заново
            </button>
            <button
              type="button"
              className="flow-footer__btn flow-footer__btn--primary"
              onClick={() => setChecked(true)}
            >
              Check →
            </button>
          </>
        ) : (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={() => onNext({ flowMatch, summary })}
          >
            Next →
          </button>
        )}
      </footer>
    </div>
  );
}

function FollowReflectPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest4.followUp;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="pl-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Follow-up</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <section className="pl-panel pl-panel--fill">
        <p className="pr-leadin__instruction">
          <span>6</span>
          {data.reflectionInstruction.replace(/^\d+\s*/, "")}
        </p>
        <ol className="pr-leadin__statements">
          {data.reflectionQuestions.map((q, i) => (
            <li key={q}>
              <strong>{i + 1}</strong>
              <span>{q}</span>
            </li>
          ))}
        </ol>
      </section>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">Reflection</span>
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={onNext}
        >
          Next →
        </button>
      </footer>
    </div>
  );
}

function CitiesPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest4.followUp;
  onBack: () => void;
  onNext: () => void;
}) {
  const [notes, setNotes] = useState("");
  return (
    <div className="pl-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Follow-up</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <section className="pl-panel pl-panel--fill">
        <p className="pr-leadin__instruction">
          <span>7</span>
          {data.citiesInstruction.replace(/^\d+\s*/, "")}
        </p>
        <textarea
          className="pl-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes…"
          rows={8}
        />
      </section>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">Discuss</span>
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={onNext}
        >
          Done →
        </button>
      </footer>
    </div>
  );
}
