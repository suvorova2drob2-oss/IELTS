import { useMemo, useRef, useState } from "react";
import { practiceListeningTest3 } from "../data/practiceListeningTest3";
import { AudioPlayer } from "./AudioPlayer";

type Track = "learn" | "exam";
type Phase =
  | "discuss"
  | "meet"
  | "part1"
  | "tips"
  | "part2"
  | "language"
  | "followup";

type ScorePair = { score: number; total: number };

const LEARN_FLOW: Phase[] = [
  "discuss",
  "meet",
  "part1",
  "tips",
  "part2",
  "language",
  "followup",
];
const EXAM_FLOW: Phase[] = ["part1", "part2"];

function norm(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "'")
    .replace(/[()]/g, "")
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

export function PracticeListeningTest3Session({
  track,
  onBackToModes,
  onComplete,
}: {
  track: Track;
  onBackToModes: () => void;
  onComplete: (scores: { part1: ScorePair; part2: ScorePair }) => void;
}) {
  const test = practiceListeningTest3;
  const flow = track === "exam" ? EXAM_FLOW : LEARN_FLOW;
  const [phase, setPhase] = useState<Phase>(flow[0]);
  const [part1Score, setPart1Score] = useState<ScorePair | null>(null);
  const [part2Score, setPart2Score] = useState<ScorePair | null>(null);
  const part1Ref = useRef<ScorePair | null>(null);

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
      <DiscussPhotoPhase data={test.leadIn} onBack={goBack} onNext={goNext} />
    );
  }
  if (phase === "meet") {
    return (
      <MeetPhase data={test.leadIn} onBack={goBack} onNext={goNext} />
    );
  }
  if (phase === "part1") {
    return (
      <Part1Phase
        data={test.part1}
        onBack={goBack}
        onNext={(s) => {
          part1Ref.current = s;
          setPart1Score(s);
          goNext();
        }}
      />
    );
  }
  if (phase === "tips") {
    return <TipsPhase data={test.tips} onBack={goBack} onNext={goNext} />;
  }
  if (phase === "part2") {
    return (
      <Part2Phase
        data={test.part2}
        onBack={goBack}
        onNext={(s) => {
          setPart2Score(s);
          if (track === "exam") {
            onComplete({
              part1:
                part1Ref.current ??
                part1Score ?? { score: 0, total: 4 },
              part2: s,
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
      <LanguagePhase data={test.language} onBack={goBack} onNext={goNext} />
    );
  }

  return (
    <FollowupPhase
      data={test.followUp}
      onBack={goBack}
      onNext={() =>
        onComplete({
          part1: part1Score ?? { score: 0, total: 4 },
          part2: part2Score ?? {
            score: 0,
            total: test.part2.questions.length,
          },
        })
      }
    />
  );
}

function DiscussPhotoPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest3.leadIn;
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
      </div>
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
          Next →
        </button>
      </footer>
    </div>
  );
}

function MeetPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest3.leadIn;
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
          {data.meetInstruction.replace(/^\d+\s*/, "")}
        </p>
        <ol className="pr-leadin__statements">
          {data.meetQuestions.map((q, i) => (
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
        <span className="flow-footer__step">Speaking</span>
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={onNext}
        >
          Listening →
        </button>
      </footer>
    </div>
  );
}

function Part1Phase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest3.part1;
  onBack: () => void;
  onNext: (s: ScorePair) => void;
}) {
  const [picked, setPicked] = useState<string[]>([]);
  const [short, setShort] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  const multiScore = data.multi.keys.filter((k) => picked.includes(k)).length;
  const shortScore = data.short.questions.filter((q) =>
    accepts(short[q.id] ?? "", q.accept),
  ).length;
  const score = multiScore + shortScore;
  const total = data.multi.keys.length + data.short.questions.length;

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
          <span>Questions 1–4</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <div className={`pl-listen ${checked ? "pl-listen--with-script" : ""}`}>
        <div className="pl-listen__main">
          <div className="pl-listen__top">
            <p className="pl-task-header pl-task-header--inline">
              Questions 1–4 · Multiple matching + short answers
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
                    const isKey = (data.multi.keys as readonly string[]).includes(
                      o.letter,
                    );
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
              <h3>{data.short.header}</h3>
              <p className="pl-task-card__note">{data.short.instruction}</p>
              <ol className="pl-short">
                {data.short.questions.map((q) => {
                  const val = short[q.id] ?? "";
                  const ok = accepts(val, q.accept);
                  return (
                    <li key={q.id}>
                      <span className="pr-mc__num">{q.id}</span>
                      <div className="pl-short__body">
                        <p>{q.prompt}</p>
                        <span
                          className={
                            checked
                              ? ok
                                ? "pl-blank pl-blank--ok"
                                : "pl-blank pl-blank--bad"
                              : "pl-blank"
                          }
                        >
                          <input
                            className="pl-gap-input"
                            value={val}
                            disabled={checked}
                            placeholder="answer…"
                            onChange={(e) =>
                              setShort((a) => ({
                                ...a,
                                [q.id]: e.target.value,
                              }))
                            }
                          />
                          {checked && !ok && (
                            <span className="pl-blank__key">→ {q.key}</span>
                          )}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          </div>
        </div>
        {checked && (
          <ScriptPanel lines={data.script} label="Tapescript 3.1" />
        )}
      </div>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        {checked ? (
          <span className="flow-footer__step">
            ✓ {score}/{total}
          </span>
        ) : (
          <span className="flow-footer__step">Part 1</span>
        )}
        {!checked ? (
          <>
            <button
              type="button"
              className="flow-footer__btn"
              onClick={() => {
                setPicked([]);
                setShort({});
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
            onClick={() => onNext({ score, total })}
          >
            Next →
          </button>
        )}
      </footer>
    </div>
  );
}

function TipsPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest3.tips;
  onBack: () => void;
  onNext: () => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [active, setActive] = useState<string | null>("1-0");

  const slots = useMemo(() => {
    const list: { tipId: number; gap: number; key: string }[] = [];
    for (const tip of data.tips) {
      tip.keys.forEach((key, gap) => {
        list.push({ tipId: tip.id, gap, key });
      });
    }
    return list;
  }, [data.tips]);

  const used = useMemo(
    () => new Set(Object.values(answers).map(norm).filter(Boolean)),
    [answers],
  );

  let score = 0;
  for (const s of slots) {
    const val = answers[`${s.tipId}-${s.gap}`] ?? "";
    if (norm(val) === norm(s.key)) score += 1;
  }

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
          {data.instruction.replace(/^\d+\s*/, "")}
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
                      slots.find(
                        (s) =>
                          `${s.tipId}-${s.gap}` !== id &&
                          !norm(next[`${s.tipId}-${s.gap}`] ?? ""),
                      ) ?? null;
                    setActive(
                      pick ? `${pick.tipId}-${pick.gap}` : null,
                    );
                    return next;
                  });
                }}
              >
                {w}
              </button>
            );
          })}
        </div>
        <p className="pl-tips-title">Tips for answering multiple choice tasks</p>
        <ol className="pl-tips-list">
          {data.tips.map((tip) => (
            <li key={tip.id}>
              <span className="pr-mc__num">{tip.id}</span>
              <p>
                {tip.before}
                {tip.keys.map((key, gi) => {
                  const slot = `${tip.id}-${gi}`;
                  const val = answers[slot] ?? "";
                  const ok = norm(val) === norm(key);
                  return (
                    <span key={slot}>
                      {gi === 1 && "mid" in tip ? tip.mid : null}
                      <button
                        type="button"
                        className={
                          checked
                            ? ok
                              ? "pl-blank-chip pl-blank-chip--ok"
                              : "pl-blank-chip pl-blank-chip--bad"
                            : active === slot
                              ? "pl-blank-chip pl-blank-chip--on"
                              : "pl-blank-chip"
                        }
                        disabled={checked}
                        onClick={() => setActive(slot)}
                      >
                        {val || "……"}
                      </button>
                      {checked && !ok && (
                        <span className="pl-blank__key"> → {key}</span>
                      )}
                    </span>
                  );
                })}
                {tip.after}
              </p>
            </li>
          ))}
        </ol>
      </section>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        {checked ? (
          <span className="flow-footer__step">
            ✓ {score}/{slots.length}
          </span>
        ) : (
          <span className="flow-footer__step">Task advice</span>
        )}
        {!checked ? (
          <>
            <button
              type="button"
              className="flow-footer__btn"
              onClick={() => {
                setAnswers({});
                setActive("1-0");
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

function Part2Phase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest3.part2;
  onBack: () => void;
  onNext: (s: ScorePair) => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const score = data.questions.filter((q) => answers[q.id] === q.key).length;

  return (
    <div className={`pl-shell ${checked ? "pl-shell--wide" : ""}`}>
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Questions 5–10</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <div className={`pl-listen ${checked ? "pl-listen--with-script" : ""}`}>
        <div className="pl-listen__main">
          <div className="pl-listen__top">
            <p className="pl-task-header pl-task-header--inline">
              Questions 5–10 · Choose the correct letter <strong>A–C</strong>
            </p>
            <AudioPlayer src={data.audioUrl} label={data.audioLabel} />
          </div>
          <ol className="pl-mcq">
            {data.questions.map((q) => {
              const sel = answers[q.id] ?? "";
              return (
                <li key={q.id}>
                  <div className="pl-mcq__head">
                    <span className="pr-mc__num">{q.id}</span>
                    <p>{q.prompt}</p>
                  </div>
                  <ul className="pl-mc-list">
                    {q.options.map((o) => {
                      let cls = "pl-mc-opt";
                      if (checked) {
                        if (o.letter === q.key) cls += " pl-mc-opt--ok";
                        else if (sel === o.letter) cls += " pl-mc-opt--bad";
                      } else if (sel === o.letter) cls += " pl-mc-opt--on";
                      return (
                        <li key={o.letter}>
                          <button
                            type="button"
                            className={cls}
                            disabled={checked}
                            onClick={() =>
                              setAnswers((a) => ({
                                ...a,
                                [q.id]: o.letter,
                              }))
                            }
                          >
                            <strong>{o.letter}</strong>
                            <span>{o.label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ol>
        </div>
        {checked && (
          <ScriptPanel lines={data.script} label="Tapescript 3.2" />
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
          <span className="flow-footer__step">Multiple choice</span>
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

function LanguagePhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest3.language;
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
  const score = data.sentences.filter((s) => {
    const val = answers[s.id] ?? "";
    const accept = "accept" in s && s.accept ? s.accept : [s.key];
    return accepts(val, accept);
  }).length;

  return (
    <div className="pl-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <section className="pl-panel pl-panel--fill">
        <p className="pr-leadin__instruction">
          <span>6</span>
          {data.instruction.replace(/^\d+\s*/, "")}
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
            const accept = "accept" in s && s.accept ? s.accept : [s.key];
            const ok = accepts(val, accept);
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
            Next →
          </button>
        )}
      </footer>
    </div>
  );
}

function FollowupPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceListeningTest3.followUp;
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
          <span>7</span>
          {data.instruction.replace(/^\d+\s*/, "")}
        </p>
        <ol className="pr-leadin__statements">
          {data.statements.map((s, i) => (
            <li key={s}>
              <strong>{i + 1}</strong>
              <span>{s}</span>
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
          Done →
        </button>
      </footer>
    </div>
  );
}
