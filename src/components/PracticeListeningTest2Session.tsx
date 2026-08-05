import { useMemo, useRef, useState } from "react";
import { practiceListeningTest2 } from "../data/practiceListeningTest2";
import { AudioPlayer } from "./AudioPlayer";

type Track = "learn" | "exam";
type Phase =
  | "discuss"
  | "vocab"
  | "predict"
  | "map"
  | "match"
  | "language"
  | "gap"
  | "notes";

type ScorePair = { score: number; total: number };

const LEARN_FLOW: Phase[] = [
  "discuss",
  "vocab",
  "predict",
  "map",
  "match",
  "language",
  "gap",
  "notes",
];
const EXAM_FLOW: Phase[] = ["map", "match"];

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
  label = "Tapescript",
  side = false,
}: {
  lines: { speaker: string; text: string }[];
  label?: string;
  side?: boolean;
}) {
  const [open, setOpen] = useState(true);
  const showBody = side || open;
  return (
    <aside
      className={`pl-script ${side ? "pl-script--side" : ""} ${showBody ? "pl-script--open" : ""}`}
    >
      <div className="pl-script__toggle">
        <span>{label}</span>
        {!side && (
          <button
            type="button"
            className="pl-script__chev"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "▾ Hide" : "▸ Show"}
          </button>
        )}
      </div>
      {showBody && (
        <div className="pl-script__body">
          {lines.map((l, i) => (
            <p key={`${l.speaker}-${i}`}>
              <strong>{l.speaker}:</strong> {l.text}
            </p>
          ))}
        </div>
      )}
    </aside>
  );
}

export function PracticeListeningTest2Session({
  track,
  onBackToModes,
  onComplete,
}: {
  track: Track;
  onBackToModes: () => void;
  onComplete: (scores: {
    map: ScorePair;
    match: ScorePair;
  }) => void;
}) {
  const test = practiceListeningTest2;
  const flow = track === "exam" ? EXAM_FLOW : LEARN_FLOW;
  const [phase, setPhase] = useState<Phase>(flow[0]);
  const [mapScore, setMapScore] = useState<ScorePair | null>(null);
  const [matchScore, setMatchScore] = useState<ScorePair | null>(null);
  const mapScoreRef = useRef<ScorePair | null>(null);

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

  if (phase === "discuss") {
    return (
      <DiscussPhase data={test.leadIn} onBack={goBack} onNext={goNext} />
    );
  }
  if (phase === "vocab") {
    return (
      <WordFillPhase
        title={test.leadIn.title}
        instruction={test.leadIn.vocabInstruction}
        wordBox={test.leadIn.wordBox}
        sentences={test.leadIn.sentences}
        onBack={goBack}
        onNext={goNext}
      />
    );
  }
  if (phase === "predict") {
    return (
      <PredictDiscussPhase
        data={test.predict}
        onBack={goBack}
        onNext={goNext}
      />
    );
  }
  if (phase === "map") {
    return (
      <MapPhase
        data={test.mapTask}
        onBack={goBack}
        onNext={(s) => {
          mapScoreRef.current = s;
          setMapScore(s);
          goNext();
        }}
      />
    );
  }
  if (phase === "match") {
    return (
      <MatchPhase
        data={test.matchTask}
        onBack={goBack}
        onNext={(s) => {
          setMatchScore(s);
          if (track === "exam") {
            onComplete({
              map:
                mapScoreRef.current ??
                mapScore ?? {
                  score: 0,
                  total: test.mapTask.questions.length,
                },
              match: s,
            });
            return;
          }
          goNext();
        }}
      />
    );
  }
  if (phase === "language") {
    return (
      <WordFillPhase
        title={test.language.title}
        instruction={test.language.instruction}
        wordBox={test.language.wordBox}
        sentences={test.language.sentences}
        showMap
        mapImage={test.mapTask.mapImage}
        mapAlt={test.mapTask.mapAlt}
        onBack={goBack}
        onNext={goNext}
      />
    );
  }
  if (phase === "gap") {
    return (
      <GapFollowupPhase
        data={test.gapFollowUp}
        script={test.mapTask.script}
        onBack={goBack}
        onNext={goNext}
      />
    );
  }

  return (
    <NotesPhase
      data={test.notes}
      onBack={goBack}
      onNext={() =>
        onComplete({
          map: mapScore ?? { score: 0, total: test.mapTask.questions.length },
          match: matchScore ?? {
            score: 0,
            total: test.matchTask.questions.length,
          },
        })
      }
    />
  );
}

function DiscussPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest2.leadIn;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="pl-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Modes
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn · Lead-in</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <section className="pl-panel pl-panel--discuss pl-panel--fill">
        <p className="pr-leadin__instruction">
          <span>1</span>
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
        <span className="flow-footer__step">Discuss in pairs</span>
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={onNext}
        >
          Vocabulary →
        </button>
      </footer>
    </div>
  );
}

function WordFillPhase({
  title,
  instruction,
  wordBox,
  sentences,
  showMap,
  mapImage,
  mapAlt,
  onBack,
  onNext,
}: {
  title: string;
  instruction: string;
  wordBox: string[];
  sentences: { id: number; before: string; after: string; key: string }[];
  showMap?: boolean;
  mapImage?: string;
  mapAlt?: string;
  onBack: () => void;
  onNext: () => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [active, setActive] = useState<number | null>(sentences[0]?.id ?? null);
  const used = useMemo(
    () => new Set(Object.values(answers).map(norm).filter(Boolean)),
    [answers],
  );
  const score = sentences.filter(
    (s) => norm(answers[s.id] ?? "") === norm(s.key),
  ).length;

  const wordFillBody = (
    <>
      <p className="pr-leadin__instruction">
        <span>{instruction.match(/^\d+/)?.[0] ?? ""}</span>
        {instruction.replace(/^\d+\s*/, "")}
      </p>
      <div className="pr-advice__box">
        {wordBox.map((w) => {
          const taken = used.has(norm(w));
          return (
            <button
              key={w}
              type="button"
              className={`pr-chip ${taken ? "pr-chip--used" : ""} ${!checked && active != null && !taken ? "pr-chip--pick" : ""}`}
              disabled={checked || taken || active == null}
              onClick={() => {
                if (active == null) return;
                const id = active;
                setAnswers((a) => {
                  const next = { ...a, [id]: w };
                  const pick =
                    sentences.find(
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
        {sentences.map((s) => {
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
    </>
  );

  return (
    <div className="pl-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn</span>
          <strong>{title}</strong>
        </div>
      </header>
      {showMap && mapImage ? (
        <div className="pl-split pl-split--maplang">
          <figure className="pl-map-figure">
            <img src={mapImage} alt={mapAlt ?? "Museum map"} />
          </figure>
          <section className="pl-panel">{wordFillBody}</section>
        </div>
      ) : (
        <section className="pl-panel pl-panel--fill">{wordFillBody}</section>
      )}
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        {checked ? (
          <span className="flow-footer__step">
            ✓ {score}/{sentences.length}
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
                setActive(sentences[0]?.id ?? null);
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
            Next →
          </button>
        )}
      </footer>
    </div>
  );
}

function PredictDiscussPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest2.predict;
  onBack: () => void;
  onNext: () => void;
}) {
  const [show, setShow] = useState(false);
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
          {data.instruction.replace(/^\d+\s*/, "")}
        </p>
        <ol className="pr-leadin__statements">
          {data.questions.map((q, i) => (
            <li key={q}>
              <strong>{i + 1}</strong>
              <span>{q}</span>
            </li>
          ))}
        </ol>
        {show && (
          <div className="pl-suggest">
            <p className="pl-suggest__h">Suggested answers</p>
            <ol>
              {data.suggested.map((s, i) => (
                <li key={s}>
                  <strong>{i + 1}.</strong> {s}
                </li>
              ))}
            </ol>
          </div>
        )}
      </section>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">Predicting</span>
        {!show ? (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={() => setShow(true)}
          >
            Show ideas →
          </button>
        ) : (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={onNext}
          >
            Map task →
          </button>
        )}
      </footer>
    </div>
  );
}

function MapPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest2.mapTask;
  onBack: () => void;
  onNext: (s: ScorePair) => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const used = useMemo(
    () => new Set(Object.values(answers).filter(Boolean)),
    [answers],
  );
  const score = data.questions.filter((q) => answers[q.id] === q.key).length;

  return (
    <div className={`pl-shell ${checked ? "pl-shell--wide" : ""}`}>
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Questions 1–6</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <div
        className={`pl-listen pl-listen--map ${checked ? "pl-listen--with-script" : ""}`}
      >
        <div className="pl-listen__main">
          <div className="pl-listen__top">
            <p className="pl-task-header pl-task-header--inline">
              Questions 1–6 · Label the map · letters <strong>A–I</strong>
            </p>
            <AudioPlayer src={data.audioUrl} label={data.audioLabel} />
          </div>
          <div className="pl-map-layout">
            <figure className="pl-map-figure">
              <img src={data.mapImage} alt={data.mapAlt} />
            </figure>
            <div className="pl-map-answers">
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
                {data.questions.map((q) => {
                  const val = answers[q.id] ?? "";
                  const ok = val === q.key;
                  return (
                    <li key={q.id}>
                      <span className="pr-mc__num">{q.id}</span>
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
                          setAnswers((a) => ({
                            ...a,
                            [q.id]: e.target.value,
                          }))
                        }
                      >
                        <option value="">—</option>
                        {data.options.map((o) => (
                          <option
                            key={o.letter}
                            value={o.letter}
                            disabled={
                              used.has(o.letter) && answers[q.id] !== o.letter
                            }
                          >
                            {o.letter}
                          </option>
                        ))}
                      </select>
                      {checked && !ok && (
                        <span className="pl-blank__key">→ {q.key}</span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
        {checked && (
          <ScriptPanel side lines={data.script} label="Tapescript 2.1" />
        )}
      </div>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        {checked ? (
          <span className="flow-footer__step">
            ✓ {score}/{data.questions.length}
          </span>
        ) : (
          <span className="flow-footer__step">Map labelling</span>
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
            onClick={() =>
              onNext({ score, total: data.questions.length })
            }
          >
            Next →
          </button>
        )}
      </footer>
    </div>
  );
}

function MatchPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest2.matchTask;
  onBack: () => void;
  onNext: (s: ScorePair) => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const used = useMemo(
    () => new Set(Object.values(answers).filter(Boolean)),
    [answers],
  );
  const score = data.questions.filter((q) => answers[q.id] === q.key).length;

  return (
    <div className={`pl-shell ${checked ? "pl-shell--wide" : ""}`}>
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Questions 7–10</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <div
        className={`pl-listen ${checked ? "pl-listen--with-script" : ""}`}
      >
        <div className="pl-listen__main">
          <div className="pl-listen__top">
            <p className="pl-task-header pl-task-header--inline">
              Questions 7–10 · Choose <strong>FOUR</strong> letters A–F
            </p>
            <AudioPlayer src={data.audioUrl} label={data.audioLabel} />
          </div>
          <ul className="pl-letter-bank pl-letter-bank--purpose">
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
            {data.questions.map((q) => {
              const val = answers[q.id] ?? "";
              const ok = val === q.key;
              return (
                <li key={q.id}>
                  <span className="pr-mc__num">{q.id}</span>
                  <span className="pl-match-prompt">{q.prompt}</span>
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
                      setAnswers((a) => ({ ...a, [q.id]: e.target.value }))
                    }
                  >
                    <option value="">—</option>
                    {data.options.map((o) => (
                      <option
                        key={o.letter}
                        value={o.letter}
                        disabled={
                          used.has(o.letter) && answers[q.id] !== o.letter
                        }
                      >
                        {o.letter}
                      </option>
                    ))}
                  </select>
                  {checked && !ok && (
                    <span className="pl-blank__key">→ {q.key}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
        {checked && (
          <ScriptPanel side lines={data.script} label="Tapescript 2.2" />
        )}
      </div>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        {checked ? (
          <span className="flow-footer__step">
            ✓ {score}/{data.questions.length}
          </span>
        ) : (
          <span className="flow-footer__step">Matching</span>
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
            onClick={() =>
              onNext({ score, total: data.questions.length })
            }
          >
            Next →
          </button>
        )}
      </footer>
    </div>
  );
}

function GapFollowupPhase({
  data,
  script,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest2.gapFollowUp;
  script: typeof practiceListeningTest2.mapTask.script;
  onBack: () => void;
  onNext: () => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  let gapTotal = 0;
  let gapScore = 0;
  for (const item of data.items) {
    item.keys.forEach((_, gi) => {
      gapTotal += 1;
      const key = `${item.id}-${gi}`;
      if (accepts(answers[key] ?? "", item.accept[gi])) gapScore += 1;
    });
  }

  return (
    <div className={`pl-shell ${checked ? "pl-shell--wide" : ""}`}>
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Follow-up</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <div
        className={`pl-listen ${checked ? "pl-listen--with-script" : ""}`}
      >
        <div className="pl-listen__main">
          <div className="pl-listen__top">
            <p className="pl-task-header pl-task-header--inline">
              Listen again · <strong>NO MORE THAN THREE WORDS</strong>
            </p>
            <AudioPlayer src={data.audioUrl} label={data.audioLabel} />
          </div>
          <ol className="pl-gap-list">
            {data.items.map((item) => (
              <li key={item.id}>
                <span className="pr-mc__num">{item.id}</span>
                <p className="pl-gap-line">
                  {item.parts.map((part, i) => {
                    if (typeof part === "string") {
                      return <span key={i}>{part}</span>;
                    }
                    const gi = part.gap;
                    const key = `${item.id}-${gi}`;
                    const val = answers[key] ?? "";
                    const ok = accepts(val, item.accept[gi]);
                    return (
                      <span key={i} className="pl-gap-slot">
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
                          placeholder="answer…"
                          onChange={(e) =>
                            setAnswers((a) => ({
                              ...a,
                              [key]: e.target.value,
                            }))
                          }
                        />
                        {checked && !ok && (
                          <span className="pl-blank__key">→ {item.keys[gi]}</span>
                        )}
                      </span>
                    );
                  })}
                </p>
              </li>
            ))}
          </ol>
        </div>
        {checked && (
          <ScriptPanel
            side
            lines={script}
            label={data.scriptLabel}
          />
        )}
      </div>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        {checked ? (
          <span className="flow-footer__step">
            ✓ {gapScore}/{gapTotal}
          </span>
        ) : (
          <span className="flow-footer__step">Directions</span>
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

function NotesPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest2.notes;
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
          <span>8</span>
          {data.instruction.replace(/^\d+\s*/, "")}
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
        <span className="flow-footer__step">Discuss in pairs</span>
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
