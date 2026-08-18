import { useEffect, useMemo, useState } from "react";
import { practiceWritingTest1 } from "../data/practiceWritingTest1";
import { OutdoorActivitiesGraph } from "./OutdoorActivitiesGraph";
import { WordCountMeter, countWords } from "./WordCountMeter";

type Track = "learn" | "exam";
type Phase =
  | "discuss"
  | "rank"
  | "graphExplore"
  | "trueFalse"
  | "modelFill"
  | "write"
  | "followup";

type ScorePair = { score: number; total: number };

const LEARN_FLOW: Phase[] = [
  "discuss",
  "rank",
  "graphExplore",
  "trueFalse",
  "modelFill",
  "write",
  "followup",
];
const EXAM_FLOW: Phase[] = ["write"];

function norm(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

export function PracticeWritingTest1Session({
  track,
  onBackToModes,
  onComplete,
}: {
  track: Track;
  onBackToModes: () => void;
  onComplete: (scores: {
    training: ScorePair;
    write: ScorePair;
  }) => void;
}) {
  const test = practiceWritingTest1;
  const flow = track === "exam" ? EXAM_FLOW : LEARN_FLOW;
  const [phase, setPhase] = useState<Phase>(flow[0]);
  const [tfScore, setTfScore] = useState<ScorePair | null>(null);
  const [fillScore, setFillScore] = useState<ScorePair | null>(null);
  const [writeScore, setWriteScore] = useState<ScorePair | null>(null);

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

  const finish = (write: ScorePair) => {
    setWriteScore(write);
    const trainTotal =
      (tfScore?.total ?? test.trueFalse.items.length) +
      (fillScore?.total ?? test.modelFill.keys.length);
    const trainScore =
      (tfScore?.score ?? 0) + (fillScore?.score ?? 0);
    onComplete({
      training:
        track === "exam"
          ? { score: write.score, total: write.total }
          : { score: trainScore, total: trainTotal || 1 },
      write,
    });
  };

  if (phase === "discuss") {
    return (
      <DiscussPhotoPhase data={test.leadIn} onBack={goBack} onNext={goNext} />
    );
  }
  if (phase === "rank") {
    return <RankPhase data={test.leadIn} onBack={goBack} onNext={goNext} />;
  }
  if (phase === "graphExplore") {
    return (
      <GraphExplorePhase
        data={test.graphTraining}
        onBack={goBack}
        onNext={goNext}
      />
    );
  }
  if (phase === "trueFalse") {
    return (
      <TrueFalsePhase
        data={test.trueFalse}
        onBack={goBack}
        onNext={(s) => {
          setTfScore(s);
          goNext();
        }}
      />
    );
  }
  if (phase === "modelFill") {
    return (
      <ModelFillPhase
        data={test.modelFill}
        onBack={goBack}
        onNext={(s) => {
          setFillScore(s);
          goNext();
        }}
      />
    );
  }
  if (phase === "write") {
    return (
      <WritePhase
        data={test.writeTask}
        exam={track === "exam"}
        onBack={goBack}
        onNext={(s) => {
          if (track === "exam") finish(s);
          else {
            setWriteScore(s);
            goNext();
          }
        }}
      />
    );
  }

  return (
    <FollowupPhase
      data={test.followUp}
      onBack={goBack}
      onNext={() =>
        finish(writeScore ?? { score: 1, total: 1 })
      }
    />
  );
}

function DiscussPhotoPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest1.leadIn;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="pw-shell pw-shell--wide">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Modes
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn · Lead-in</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <div className="pw-leadin">
        <figure className="pw-hero">
          <img src={data.image} alt={data.imageAlt} />
        </figure>
        <section className="pw-panel">
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
        <span className="flow-footer__step">Discuss</span>
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

function RankPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest1.leadIn;
  onBack: () => void;
  onNext: () => void;
}) {
  const [order, setOrder] = useState([...data.activities]);

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= order.length) return;
    setOrder((o) => {
      const next = [...o];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  return (
    <div className="pw-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn · Lead-in</span>
          <strong>Popularity ranking</strong>
        </div>
      </header>
      <section className="pw-panel pw-panel--fill">
        <p className="pr-leadin__instruction">
          <span>2</span>
          {data.rankInstruction.replace(/^\d+\s*/, "")}
        </p>
        <ol className="pw-rank">
          {order.map((a, i) => (
            <li key={a}>
              <span className="pw-rank__n">{i + 1}</span>
              <strong>{a}</strong>
              <span className="pw-rank__btns">
                <button
                  type="button"
                  disabled={i === 0}
                  onClick={() => move(i, -1)}
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={i === order.length - 1}
                  onClick={() => move(i, 1)}
                >
                  ↓
                </button>
              </span>
            </li>
          ))}
        </ol>
        <p className="pw-hint">
          Most popular at the top · your opinion — no “correct” order
        </p>
      </section>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">Rank activities</span>
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={onNext}
        >
          Graph →
        </button>
      </footer>
    </div>
  );
}

function GraphExplorePhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest1.graphTraining;
  onBack: () => void;
  onNext: () => void;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="pw-shell pw-shell--wide">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn · Training</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <div className="pw-split">
        <OutdoorActivitiesGraph title={data.graphTitle} />
        <section className="pw-panel">
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
          <p className="pw-teacher-tip">{data.teacherTip}</p>
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
      </div>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">Read the graph</span>
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
            Next →
          </button>
        )}
      </footer>
    </div>
  );
}

function TrueFalsePhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest1.trueFalse;
  onBack: () => void;
  onNext: (s: ScorePair) => void;
}) {
  const [answers, setAnswers] = useState<Record<number, "T" | "F" | "">>({});
  const [checked, setChecked] = useState(false);
  const score = data.items.filter((it) => answers[it.id] === it.key).length;

  return (
    <div className="pw-shell pw-shell--wide">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn · Training</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <div className="pw-split">
        <OutdoorActivitiesGraph />
        <section className="pw-panel">
          <p className="pr-leadin__instruction">
            <span>4</span>
            {data.instruction.replace(/^\d+\s*/, "")}
          </p>
          <ol className="pw-tf">
            {data.items.map((it) => {
              const sel = answers[it.id] ?? "";
              const ok = sel === it.key;
              return (
                <li key={it.id}>
                  <span className="pr-mc__num">{it.id}</span>
                  <div>
                    <p>{it.statement}</p>
                    <div className="pw-tf__chips">
                      {(["T", "F"] as const).map((opt) => {
                        let cls = "pr-chip pr-chip--tfng";
                        if (checked) {
                          if (opt === it.key) cls += " pr-chip--ok";
                          else if (sel === opt) cls += " pr-chip--bad";
                        } else if (sel === opt) cls += " pr-chip--picked";
                        return (
                          <button
                            key={opt}
                            type="button"
                            className={cls}
                            disabled={checked}
                            onClick={() =>
                              setAnswers((a) => ({ ...a, [it.id]: opt }))
                            }
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {checked && !ok && it.correction && (
                      <p className="pw-correction">→ {it.correction}</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      </div>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        {checked ? (
          <span className="flow-footer__step">
            ✓ {score}/{data.items.length}
          </span>
        ) : (
          <span className="flow-footer__step">True / False</span>
        )}
        {!checked ? (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={() => setChecked(true)}
          >
            Check →
          </button>
        ) : (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={() =>
              onNext({ score, total: data.items.length })
            }
          >
            Next →
          </button>
        )}
      </footer>
    </div>
  );
}

function ModelFillPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest1.modelFill;
  onBack: () => void;
  onNext: (s: ScorePair) => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [active, setActive] = useState<number | null>(1);
  const used = useMemo(
    () => new Set(Object.values(answers).map(norm).filter(Boolean)),
    [answers],
  );
  const score = data.keys.filter(
    (k, i) => norm(answers[i + 1] ?? "") === norm(k),
  ).length;

  return (
    <div className="pw-shell pw-shell--wide">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn · Model language</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <div className="pw-split pw-split--fill">
        <OutdoorActivitiesGraph
          highlight={["picnicking", "walking", "water"]}
        />
        <section className="pw-panel">
          <p className="pr-leadin__instruction">
            <span>5</span>
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
                      const idx = data.keys.findIndex(
                        (_, i) => !norm(next[i + 1] ?? ""),
                      );
                      setActive(idx < 0 ? null : idx + 1);
                      return next;
                    });
                  }}
                >
                  {w}
                </button>
              );
            })}
          </div>
          <p className="pw-model">
            {data.parts.map((part, i) => {
              if (typeof part === "string") {
                return <span key={i}>{part}</span>;
              }
              const id = part.gap;
              const val = answers[id] ?? "";
              const ok = norm(val) === norm(data.keys[id - 1]);
              return (
                <span key={i} className="pl-gap-slot">
                  <button
                    type="button"
                    className={
                      checked
                        ? ok
                          ? "pl-blank-chip pl-blank-chip--ok"
                          : "pl-blank-chip pl-blank-chip--bad"
                        : active === id
                          ? "pl-blank-chip pl-blank-chip--on"
                          : "pl-blank-chip"
                    }
                    disabled={checked}
                    onClick={() => setActive(id)}
                  >
                    {val || `${id} ……`}
                  </button>
                  {checked && !ok && (
                    <span className="pl-blank__key">
                      {" "}
                      → {data.keys[id - 1]}
                    </span>
                  )}
                </span>
              );
            })}
          </p>
        </section>
      </div>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        {checked ? (
          <span className="flow-footer__step">
            ✓ {score}/{data.keys.length}
          </span>
        ) : (
          <span className="flow-footer__step">Model paragraph</span>
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
            onClick={() =>
              onNext({ score, total: data.keys.length })
            }
          >
            Write →
          </button>
        )}
      </footer>
    </div>
  );
}

function WritePhase({
  data,
  exam,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest1.writeTask;
  exam: boolean;
  onBack: () => void;
  onNext: (s: ScorePair) => void;
}) {
  const [text, setText] = useState(() =>
    exam ? "" : data.structure.map((b) => b.starter).join("\n\n"),
  );
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(data.timeSec);
  const [done, setDone] = useState(false);
  const [checks, setChecks] = useState<Record<number, boolean>>({});
  const [showSample, setShowSample] = useState(false);
  const [showModel, setShowModel] = useState(!exam);
  const words = countWords(text);

  useEffect(() => {
    if (!running || timeLeft <= 0) return;
    const id = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setRunning(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, timeLeft]);

  const m = Math.floor(timeLeft / 60);
  const s = (timeLeft % 60).toString().padStart(2, "0");
  const checkedCount = Object.values(checks).filter(Boolean).length;

  const insertTemplate = () => {
    setText(data.structure.map((b) => b.starter).join("\n\n"));
  };

  const finishWriting = () => {
    setRunning(false);
    setDone(true);
    setShowSample(true);
    setShowModel(false);
  };

  return (
    <div className="pw-shell pw-shell--wide">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>{exam ? "Exam" : "Learn"} · Task 1</span>
          <strong>{data.title}</strong>
        </div>
      </header>

      <ol className="pw-flow-steps" aria-label="Writing steps">
        <li className={done ? "pw-flow-steps__done" : "pw-flow-steps__on"}>
          1 Write
        </li>
        <li
          className={
            done && !showSample
              ? "pw-flow-steps__on"
              : done
                ? "pw-flow-steps__done"
                : ""
          }
        >
          2 Check
        </li>
        <li className={done && showSample ? "pw-flow-steps__on" : ""}>
          3 Sample
        </li>
      </ol>

      <div className="pw-write">
        <aside className="pw-write__side">
          <OutdoorActivitiesGraph
            highlight={["camping", "cycling", "horse"]}
          />
          <p className="pw-teacher-tip">{data.focusNote}</p>

          {!done && (
            <div className="pw-plan">
              <div className="pw-plan__head">
                <strong>How to write (3 parts)</strong>
              </div>
              <ol className="pw-plan__list">
                {data.structure.map((block) => (
                  <li key={block.label}>
                    <strong>{block.label}</strong>
                    <span>{block.tip}</span>
                  </li>
                ))}
              </ol>
              <button
                type="button"
                className="btn-start pw-plan__insert"
                onClick={insertTemplate}
              >
                Reset to starter template →
              </button>
              <button
                type="button"
                className="pw-plan__toggle"
                onClick={() => setShowModel((v) => !v)}
              >
                {showModel ? "Hide full sample" : "Show full sample →"}
              </button>
            </div>
          )}

          {done && (
            <div className="pw-plan">
              <div className="pw-plan__head">
                <strong>Self-check</strong>
              </div>
              <ul className="pw-checklist">
                {data.checklist.map((c, i) => (
                  <li key={c}>
                    <label>
                      <input
                        type="checkbox"
                        checked={Boolean(checks[i])}
                        onChange={(e) =>
                          setChecks((x) => ({
                            ...x,
                            [i]: e.target.checked,
                          }))
                        }
                      />
                      <span>{c}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
        <section className="pw-write__main">
          <p className="pw-prompt">{data.prompt}</p>
          <div className="pw-write__meta">
            <WordCountMeter
              words={words}
              minWords={data.minWords}
              label="IELTS Task 1 minimum · at least 150 words"
            />
            <span
              className={
                timeLeft === 0
                  ? "pw-timer pw-timer--done"
                  : running
                    ? "pw-timer pw-timer--run"
                    : "pw-timer"
              }
            >
              ⏱ {m}:{s}
            </span>
            {!running && !done && (
              <button
                type="button"
                className="btn-start"
                onClick={() => setRunning(true)}
              >
                Start timer →
              </button>
            )}
            {running && (
              <button
                type="button"
                className="nav-btn"
                onClick={() => setRunning(false)}
              >
                Pause
              </button>
            )}
          </div>

          {!done && (
            <div className="pw-scaffold">
              {data.structure.map((block) => (
                <div key={block.label} className="pw-scaffold__block">
                  <p className="pw-scaffold__label">{block.label}</p>
                  <p className="pw-scaffold__tip">{block.tip}</p>
                  <p className="pw-scaffold__ex">{block.starter}</p>
                </div>
              ))}
            </div>
          )}

          {!done && showModel && (
            <div className="pw-sample">
              <p className="pw-sample__h">Full sample answer (write from this)</p>
              <p className="pw-sample__body">{data.sampleAnswer}</p>
            </div>
          )}

          <textarea
            className="pw-textarea"
            value={text}
            disabled={done}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              "Write 3 short paragraphs:\n1) paraphrase the graph\n2) overview (main trend)\n3) compare camping, cycling, horse riding"
            }
          />

          {done && showSample && (
            <div className="pw-after">
              <p className="pw-after__lead">
                Writing finished. Tick the checklist on the left and compare
                with the sample.
              </p>
              <div className="pw-sample">
                <p className="pw-sample__h">Sample answer</p>
                <p className="pw-sample__body">{data.sampleAnswer}</p>
              </div>
            </div>
          )}
        </section>
      </div>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">
          {!done
            ? "Write → Finish → Sample"
            : showSample
              ? `Checklist ${checkedCount}/${data.checklist.length}`
              : "Open sample answer"}
        </span>
        {!done ? (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={finishWriting}
            title="Finish and open the sample answer"
          >
            Finish → see sample
          </button>
        ) : (
          <>
            {!showSample && (
              <button
                type="button"
                className="flow-footer__btn flow-footer__btn--primary"
                onClick={() => setShowSample(true)}
              >
                Show sample →
              </button>
            )}
            <button
              type="button"
              className={`flow-footer__btn ${showSample ? "flow-footer__btn--primary" : ""}`}
              onClick={() =>
                onNext({
                  score: Math.max(1, checkedCount),
                  total: data.checklist.length,
                })
              }
            >
              Next →
            </button>
          </>
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
  data: typeof practiceWritingTest1.followUp;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="pw-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Follow-up</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <section className="pw-panel pw-panel--fill">
        <p className="pr-leadin__instruction">
          <span>7</span>
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
