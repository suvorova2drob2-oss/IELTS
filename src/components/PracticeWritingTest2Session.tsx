import { useEffect, useMemo, useState } from "react";
import { practiceWritingTest2 } from "../data/practiceWritingTest2";
import { WordCountMeter, countWords } from "./WordCountMeter";

type Track = "learn" | "exam";
type Phase =
  | "discuss"
  | "vocab"
  | "passiveNotice"
  | "passiveTransform"
  | "structure"
  | "plan"
  | "write"
  | "descriptors"
  | "peer";

type ScorePair = { score: number; total: number };

const LEARN_FLOW: Phase[] = [
  "discuss",
  "vocab",
  "passiveNotice",
  "passiveTransform",
  "structure",
  "plan",
  "write",
  "descriptors",
  "peer",
];
const EXAM_FLOW: Phase[] = ["write"];

function norm(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function accepts(value: string, accept: string[]): boolean {
  const n = norm(value);
  return accept.some((a) => norm(a) === n);
}

export function PracticeWritingTest2Session({
  track,
  onBackToModes,
  onComplete,
}: {
  track: Track;
  onBackToModes: () => void;
  onComplete: (scores: { training: ScorePair; write: ScorePair }) => void;
}) {
  const test = practiceWritingTest2;
  const flow = track === "exam" ? EXAM_FLOW : LEARN_FLOW;
  const [phase, setPhase] = useState<Phase>(flow[0]);
  const [trainParts, setTrainParts] = useState<ScorePair[]>([]);
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

  const addTrain = (s: ScorePair) => setTrainParts((p) => [...p, s]);

  const finish = (write: ScorePair) => {
    setWriteScore(write);
    const training =
      track === "exam"
        ? write
        : {
            score: trainParts.reduce((n, t) => n + t.score, 0),
            total: Math.max(
              1,
              trainParts.reduce((n, t) => n + t.total, 0),
            ),
          };
    onComplete({ training, write });
  };

  if (phase === "discuss") {
    return (
      <DiscussPhase data={test.leadIn} onBack={goBack} onNext={goNext} />
    );
  }
  if (phase === "vocab") {
    return (
      <VocabPhase
        data={test.vocab}
        onBack={goBack}
        onNext={(s) => {
          addTrain(s);
          goNext();
        }}
      />
    );
  }
  if (phase === "passiveNotice") {
    return (
      <PassiveNoticePhase
        data={test.passive}
        onBack={goBack}
        onNext={goNext}
      />
    );
  }
  if (phase === "passiveTransform") {
    return (
      <PassiveTransformPhase
        data={test.passive}
        onBack={goBack}
        onNext={(s) => {
          addTrain(s);
          goNext();
        }}
      />
    );
  }
  if (phase === "structure") {
    return (
      <StructurePhase
        data={test.structure}
        writeTask={test.writeTask}
        onBack={goBack}
        onNext={(s) => {
          addTrain(s);
          goNext();
        }}
      />
    );
  }
  if (phase === "plan") {
    return (
      <PlanPhase
        data={test.plan}
        writeTask={test.writeTask}
        onBack={goBack}
        onNext={goNext}
      />
    );
  }
  if (phase === "write") {
    return (
      <WriteProcessPhase
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
  if (phase === "descriptors") {
    return (
      <DescriptorsPhase
        data={test.descriptors}
        onBack={goBack}
        onNext={(s) => {
          addTrain(s);
          goNext();
        }}
      />
    );
  }

  return (
    <PeerPhase
      data={test.peer}
      onBack={goBack}
      onNext={() => finish(writeScore ?? { score: 1, total: 1 })}
    />
  );
}

function DiscussPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest2.leadIn;
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
          Vocabulary →
        </button>
      </footer>
    </div>
  );
}

function VocabPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest2.vocab;
  onBack: () => void;
  onNext: (s: ScorePair) => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const used = useMemo(
    () => new Set(Object.values(answers).filter(Boolean)),
    [answers],
  );
  const score = data.words.filter((w) => answers[w.id] === w.key).length;

  return (
    <div className="pw-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <section className="pw-panel pw-panel--fill">
        <p className="pr-leadin__instruction">
          <span>2</span>
          {data.instruction.replace(/^\d+\s*/, "")}
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
          <span className="flow-footer__step">Match</span>
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
            onClick={() => onNext({ score, total: data.words.length })}
          >
            Next →
          </button>
        )}
      </footer>
    </div>
  );
}

function PassiveNoticePhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest2.passive;
  onBack: () => void;
  onNext: () => void;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="pw-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn · Training</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <section className="pw-panel pw-panel--fill">
        <p className="pr-leadin__instruction">
          <span>3</span>
          {data.noticeInstruction.replace(/^\d+\s*/, "")}
        </p>
        <div className="pw-contrast">
          <p>
            <span className="pw-contrast__tag">Active</span>
            {data.active}
          </p>
          <p>
            <span className="pw-contrast__tag pw-contrast__tag--pass">
              Passive
            </span>
            {data.passive}
          </p>
        </div>
        {show && <p className="pw-teacher-tip">{data.teacherNote}</p>}
      </section>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">Active vs passive</span>
        {!show ? (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={() => setShow(true)}
          >
            Show note →
          </button>
        ) : (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={onNext}
          >
            Practice →
          </button>
        )}
      </footer>
    </div>
  );
}

function PassiveTransformPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest2.passive;
  onBack: () => void;
  onNext: (s: ScorePair) => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const score = data.items.filter((it) =>
    accepts(answers[it.id] ?? "", it.accept),
  ).length;

  return (
    <div className="pw-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn · Training</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <section className="pw-panel pw-panel--fill">
        <p className="pr-leadin__instruction">
          <span>4</span>
          {data.transformInstruction.replace(/^\d+\s*/, "")}
        </p>
        <ol className="pw-passive-list">
          {data.items.map((it) => {
            const val = answers[it.id] ?? "";
            const ok = accepts(val, it.accept);
            return (
              <li key={it.id}>
                <span className="pr-mc__num">{it.id}</span>
                <div>
                  <p className="pw-passive-list__active">{it.active}</p>
                  <p className="pl-gap-line">
                    {it.before}
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
                      placeholder="≤3 words"
                      onChange={(e) =>
                        setAnswers((a) => ({
                          ...a,
                          [it.id]: e.target.value,
                        }))
                      }
                    />
                    {checked && !ok && (
                      <span className="pl-blank__key"> → {it.key}</span>
                    )}
                    {it.after}
                  </p>
                </div>
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
            ✓ {score}/{data.items.length}
          </span>
        ) : (
          <span className="flow-footer__step">Passive</span>
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
            onClick={() => onNext({ score, total: data.items.length })}
          >
            Next →
          </button>
        )}
      </footer>
    </div>
  );
}

function StructurePhase({
  data,
  writeTask,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest2.structure;
  writeTask: typeof practiceWritingTest2.writeTask;
  onBack: () => void;
  onNext: (s: ScorePair) => void;
}) {
  const [order, setOrder] = useState<Record<string, number | "">>({
    A: "",
    B: "",
    C: "",
  });
  const [checked, setChecked] = useState(false);
  const score = data.stages.filter(
    (s) => order[s.id] === s.keyOrder,
  ).length;

  return (
    <div className="pw-shell pw-shell--wide">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn · Structure</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <div className="pw-process-layout">
        <figure className="pw-process-figure">
          <img src={writeTask.processImage} alt={writeTask.processAlt} />
        </figure>
        <ol className="pw-steps">
          {writeTask.processSteps.map((step, i) => (
            <li key={step}>
              <span>{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
        <section className="pw-panel">
          <p className="pr-leadin__instruction">
            <span>5</span>
            {data.instruction.replace(/^\d+\s*/, "")}
          </p>
          <p className="pw-prompt">{writeTask.prompt}</p>
          <ul className="pw-structure">
            {data.stages.map((s) => {
              const val = order[s.id];
              const ok = val === s.keyOrder;
              return (
                <li key={s.id}>
                  <strong>{s.id}</strong>
                  <span>{s.text}</span>
                  <select
                    className={
                      checked
                        ? ok
                          ? "pr-match-select pr-match-select--ok"
                          : "pr-match-select pr-match-select--bad"
                        : "pr-match-select"
                    }
                    value={val === "" ? "" : String(val)}
                    disabled={checked}
                    onChange={(e) =>
                      setOrder((o) => ({
                        ...o,
                        [s.id]: e.target.value
                          ? Number(e.target.value)
                          : "",
                      }))
                    }
                  >
                    <option value="">—</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  {checked && !ok && (
                    <span className="pl-blank__key">→ {s.keyOrder}</span>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="pw-sample">
            <p className="pw-sample__h">Correct order (example)</p>
            <p>1 C · paraphrase the diagram → 2 A · overview → 3 B · detail</p>
          </div>
        </section>
      </div>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        {checked ? (
          <span className="flow-footer__step">
            ✓ {score}/{data.stages.length}
          </span>
        ) : (
          <span className="flow-footer__step">Order 1–3</span>
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
            onClick={() => onNext({ score, total: data.stages.length })}
          >
            Plan →
          </button>
        )}
      </footer>
    </div>
  );
}

function PlanPhase({
  data,
  writeTask,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest2.plan;
  writeTask: typeof practiceWritingTest2.writeTask;
  onBack: () => void;
  onNext: () => void;
}) {
  const [notes, setNotes] = useState(
    () => data.questions.map((item, i) => `${i + 1}. ${item.sample}`).join("\n"),
  );

  return (
    <div className="pw-shell pw-shell--wide">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn · Planning</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <div className="pw-process-layout">
        <figure className="pw-process-figure">
          <img src={writeTask.processImage} alt={writeTask.processAlt} />
        </figure>
        <ol className="pw-steps">
          {writeTask.processSteps.map((step, i) => (
            <li key={step}>
              <span>{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
        <section className="pw-panel">
          <p className="pr-leadin__instruction">
            <span>6</span>
            {data.instruction.replace(/^\d+\s*/, "")}
          </p>
          <ol className="pw-plan-qa">
            {data.questions.map((item, i) => (
              <li key={item.q}>
                <p>
                  <strong>{i + 1}.</strong> {item.q}
                </p>
                <div className="pw-sample pw-sample--inline">
                  <p className="pw-sample__h">Sample</p>
                  <p>{item.sample}</p>
                </div>
              </li>
            ))}
          </ol>
          <label className="pw-field">
            <span>Your brief plan (edit the sample if you want)</span>
            <textarea
              className="pl-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
            />
          </label>
        </section>
      </div>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">Plan + diagram</span>
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={onNext}
        >
          Write →
        </button>
      </footer>
    </div>
  );
}

function WriteProcessPhase({
  data,
  exam,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest2.writeTask;
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
        <li className={done ? "pw-flow-steps__done" : ""}>2 Check</li>
        <li className={done && showSample ? "pw-flow-steps__on" : ""}>
          3 Sample
        </li>
      </ol>

      <div className="pw-process-layout">
        <figure className="pw-process-figure">
          <img src={data.processImage} alt={data.processAlt} />
        </figure>
        <ol className="pw-steps">
          {data.processSteps.map((step, i) => (
            <li key={step}>
              <span>{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>

        <div className="pw-process-body">
          <aside className="pw-write__side">
            <p className="pw-teacher-tip">{data.sequencersTip}</p>
            {!exam && <p className="pw-hint">{data.teacherTip}</p>}

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
            <p className="pw-time-label">{data.timeLabel}</p>
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
              "Write in order:\n1) intro + overview\n2) customer steps\n3) warehouse → delivery (use first / next / finally)"
            }
          />

          {done && showSample && (
            <div className="pw-after">
              <p className="pw-after__lead">
                Writing finished. Tick the checklist and compare with the sample.
              </p>
              <div className="pw-sample">
                <p className="pw-sample__h">Sample answer</p>
                <p className="pw-sample__body">{data.sampleAnswer}</p>
              </div>
            </div>
          )}
          </section>
        </div>
      </div>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">
          {!done
            ? "Write → Finish → Sample"
            : `Checklist ${checkedCount}/${data.checklist.length}`}
        </span>
        {!done ? (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={finishWriting}
          >
            Finish → see sample
          </button>
        ) : (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={() =>
              onNext({
                score: Math.max(1, checkedCount),
                total: data.checklist.length,
              })
            }
          >
            Next →
          </button>
        )}
      </footer>
    </div>
  );
}

function DescriptorsPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest2.descriptors;
  onBack: () => void;
  onNext: (s: ScorePair) => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const used = useMemo(
    () => new Set(Object.values(answers).filter(Boolean)),
    [answers],
  );
  const score = data.statements.filter((s) => answers[s.id] === s.key).length;

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
          <span>8</span>
          {data.instruction.replace(/^\d+\s*/, "")}
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
            {data.statements.map((s) => {
              const val = answers[s.id] ?? "";
              const ok = val === s.key;
              return (
                <li key={s.id}>
                  <span className="pr-mc__num">{s.id}</span>
                  <span className="pl-match-prompt pl-match-prompt--long">
                    {s.text}
                  </span>
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
                      setAnswers((a) => ({ ...a, [s.id]: e.target.value }))
                    }
                  >
                    <option value="">—</option>
                    {data.options.map((o) => (
                      <option
                        key={o.letter}
                        value={o.letter}
                        disabled={
                          used.has(o.letter) && answers[s.id] !== o.letter
                        }
                      >
                        {o.letter}
                      </option>
                    ))}
                  </select>
                  {checked && !ok && (
                    <span className="pl-blank__key">→ {s.key}</span>
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
            ✓ {score}/{data.statements.length}
          </span>
        ) : (
          <span className="flow-footer__step">Descriptors</span>
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
              onNext({ score, total: data.statements.length })
            }
          >
            Next →
          </button>
        )}
      </footer>
    </div>
  );
}

function PeerPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest2.peer;
  onBack: () => void;
  onNext: () => void;
}) {
  const [notes, setNotes] = useState("");
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
          <span>9</span>
          {data.instruction.replace(/^\d+\s*/, "")}
        </p>
        <textarea
          className="pl-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Positive points + one improvement…"
          rows={6}
        />
        <p className="pw-teacher-tip">{data.rewriteNote}</p>
      </section>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">Peer feedback</span>
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
