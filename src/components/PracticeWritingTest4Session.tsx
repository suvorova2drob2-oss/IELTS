import { useEffect, useMemo, useState } from "react";
import { practiceWritingTest4 } from "../data/practiceWritingTest4";
import { WordCountMeter, countWords } from "./WordCountMeter";

type Track = "learn" | "exam";
type Phase =
  | "discuss"
  | "taskPreview"
  | "recommend"
  | "softening"
  | "ideaTable"
  | "miniParagraph"
  | "plan"
  | "write";

type ScorePair = { score: number; total: number };

const LEARN_FLOW: Phase[] = [
  "discuss",
  "taskPreview",
  "recommend",
  "softening",
  "ideaTable",
  "miniParagraph",
  "plan",
  "write",
];
const EXAM_FLOW: Phase[] = ["write"];

function norm(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

export function PracticeWritingTest4Session({
  track,
  onBackToModes,
  onComplete,
}: {
  track: Track;
  onBackToModes: () => void;
  onComplete: (scores: { training: ScorePair; write: ScorePair }) => void;
}) {
  const test = practiceWritingTest4;
  const flow = track === "exam" ? EXAM_FLOW : LEARN_FLOW;
  const [phase, setPhase] = useState<Phase>(flow[0]);
  const [trainParts, setTrainParts] = useState<ScorePair[]>([]);

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
  if (phase === "taskPreview") {
    return (
      <TaskPreviewPhase
        data={test.taskPreview}
        onBack={goBack}
        onNext={goNext}
      />
    );
  }
  if (phase === "recommend") {
    return (
      <RecommendPhase data={test.recommend} onBack={goBack} onNext={goNext} />
    );
  }
  if (phase === "softening") {
    return (
      <SofteningPhase
        data={test.softening}
        onBack={goBack}
        onNext={(s) => {
          addTrain(s);
          goNext();
        }}
      />
    );
  }
  if (phase === "ideaTable") {
    return (
      <IdeaTablePhase
        data={test.ideaTable}
        onBack={goBack}
        onNext={(s) => {
          addTrain(s);
          goNext();
        }}
      />
    );
  }
  if (phase === "miniParagraph") {
    return (
      <MiniParagraphPhase
        data={test.miniParagraph}
        onBack={goBack}
        onNext={goNext}
      />
    );
  }
  if (phase === "plan") {
    return <PlanPhase data={test.plan} onBack={goBack} onNext={goNext} />;
  }

  return (
    <WriteEssayPhase
      data={test.writeTask}
      exam={track === "exam"}
      onBack={goBack}
      onNext={finish}
    />
  );
}

function DiscussPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest4.leadIn;
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
          Task →
        </button>
      </footer>
    </div>
  );
}

function TaskPreviewPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest4.taskPreview;
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
          <span>Learn</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <section className="pw-panel pw-panel--fill">
        <p className="pw-time-label">{data.timeLabel}</p>
        <p className="pw-prompt">{data.prompt}</p>
        <p className="pw-hint">Keywords to notice:</p>
        <ul className="pw-keyword-row">
          {data.keywords.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>
      </section>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">Problem–solution</span>
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={onNext}
        >
          Recommendation language →
        </button>
      </footer>
    </div>
  );
}

function RecommendPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest4.recommend;
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
          <span>Learn · Training</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <section className="pw-panel pw-panel--fill">
        <p className="pr-leadin__instruction">
          <span>2</span>
          {data.instruction.replace(/^\d+\s*/, "")}
        </p>
        <ol className="pw-stem-list">
          {data.stems.map((s) => (
            <li key={s.stem}>
              <strong>{s.stem}</strong>
              <span>{s.tip}</span>
            </li>
          ))}
        </ol>
      </section>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">Stems</span>
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={onNext}
        >
          Softening →
        </button>
      </footer>
    </div>
  );
}

function SofteningPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest4.softening;
  onBack: () => void;
  onNext: (s: ScorePair) => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const gapIds = Object.keys(data.keys).map(Number);
  const used = useMemo(
    () => new Set(Object.values(answers).filter(Boolean)),
    [answers],
  );
  const score = gapIds.filter(
    (id) => norm(answers[id] ?? "") === norm(data.keys[id]),
  ).length;

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
          <span>4</span>
          {data.instruction.replace(/^\d+\s*/, "")}
        </p>
        <ul className="pw-phrase-bank">
          {data.bank.map((p) => (
            <li
              key={p}
              className={used.has(p) ? "pw-phrase-bank__used" : ""}
            >
              {p}
            </li>
          ))}
        </ul>
        <p className="pw-prep-para">
          {data.parts.map((part, i) => {
            if (typeof part === "string") {
              return <span key={i}>{part}</span>;
            }
            const val = answers[part.gap] ?? "";
            const ok = norm(val) === norm(data.keys[part.gap]);
            return (
              <span key={i} className="pw-prep-gap pw-prep-gap--wide">
                <strong>{part.gap}</strong>
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
                    setAnswers((a) => ({ ...a, [part.gap]: e.target.value }))
                  }
                >
                  <option value="">—</option>
                  {data.bank.map((p) => (
                    <option
                      key={p}
                      value={p}
                      disabled={used.has(p) && answers[part.gap] !== p}
                    >
                      {p}
                    </option>
                  ))}
                </select>
                {checked && !ok && (
                  <span className="pl-blank__key">→ {data.keys[part.gap]}</span>
                )}
              </span>
            );
          })}
        </p>
      </section>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">
          {checked ? `✓ ${score}/3` : "Softening"}
        </span>
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
            onClick={() => onNext({ score, total: 3 })}
          >
            Next →
          </button>
        )}
      </footer>
    </div>
  );
}

function IdeaTablePhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest4.ideaTable;
  onBack: () => void;
  onNext: (s: ScorePair) => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const score = data.items.filter((it) => answers[it.id] === it.key).length;

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
          <span>5</span>
          {data.instruction.replace(/^\d+\s*/, "")}
        </p>
        <p className="pw-hint">
          Sort each idea: Problem · Solution · Advantage · Disadvantage
        </p>
        <ol className="pl-map-qs">
          {data.items.map((it) => {
            const val = answers[it.id] ?? "";
            const ok = val === it.key;
            return (
              <li key={it.id}>
                <span className="pr-mc__num">{it.id}</span>
                <span className="pl-match-prompt pl-match-prompt--long">
                  {it.text}
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
                    setAnswers((a) => ({ ...a, [it.id]: e.target.value }))
                  }
                >
                  <option value="">—</option>
                  {data.categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
                {checked && !ok && (
                  <span className="pl-blank__key">
                    → {data.categories.find((c) => c.id === it.key)?.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
        {checked && (
          <div className="pw-chain-tip">
            <p className="pw-sample__h">Useful chains (teacher book)</p>
            {data.chains.map((c, i) => (
              <p key={i}>
                Problem {c.problem} → Solution {c.solution} → Advantage{" "}
                {c.advantage} → Disadvantage {c.disadvantage}
              </p>
            ))}
          </div>
        )}
      </section>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">
          {checked ? `✓ ${score}/8` : "Sort ideas"}
        </span>
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
            onClick={() => onNext({ score, total: 8 })}
          >
            Next →
          </button>
        )}
      </footer>
    </div>
  );
}

function MiniParagraphPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest4.miniParagraph;
  onBack: () => void;
  onNext: () => void;
}) {
  const [text, setText] = useState(data.sampleAnswer);
  const words = countWords(text);

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
          <span>7</span>
          {data.instruction.replace(/^\d+\s*/, "")}
        </p>
        <p className="pw-hint">
          Template: Problem → Solution → Advantage → Disadvantage
        </p>
        <div className="pw-sample">
          <p className="pw-sample__h">{data.sampleLabel}</p>
          <p>{data.sampleAnswer}</p>
        </div>
        <div className="pw-write__meta">
          <WordCountMeter
            words={words}
            minWords={data.minWords}
            label={`Mini paragraph · aim ~${data.minWords}–${data.maxWordsHint} words`}
          />
        </div>
        <textarea
          className="pw-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Edit the sample or write your own 50–70 words…"
        />
      </section>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">Mini paragraph</span>
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={onNext}
        >
          Plan essay →
        </button>
      </footer>
    </div>
  );
}

function PlanPhase({
  data,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest4.plan;
  onBack: () => void;
  onNext: () => void;
}) {
  const [rows, setRows] = useState(() => [...data.sampleRows]);

  return (
    <div className="pw-shell">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Back
        </button>
        <div className="pr-exam__chrome-title">
          <span>Learn · Plan</span>
          <strong>{data.title}</strong>
        </div>
      </header>
      <section className="pw-panel pw-panel--fill">
        <p className="pr-leadin__instruction">
          <span>8</span>
          {data.instruction.replace(/^\d+\s*/, "")}
        </p>
        <div className="pw-sample">
          <p className="pw-sample__h">Sample plan (teacher book chains)</p>
          <p>
            Edit the table if you want — it already shows two complete
            Problem → Solution → Advantage → Disadvantage rows.
          </p>
        </div>
        <div className="pw-plan-scroll">
          <table className="pw-ce-table pw-ce-table--4">
            <thead>
              <tr>
                {data.columns.map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  {(
                    [
                      "problem",
                      "solution",
                      "advantage",
                      "disadvantage",
                    ] as const
                  ).map((key) => (
                    <td key={key}>
                      <input
                        value={r[key]}
                        onChange={(e) =>
                          setRows((all) =>
                            all.map((row, j) =>
                              j === i
                                ? { ...row, [key]: e.target.value }
                                : row,
                            ),
                          )
                        }
                        placeholder="…"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        <span className="flow-footer__step">Plan + sample</span>
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={onNext}
        >
          Write essay →
        </button>
      </footer>
    </div>
  );
}

function WriteEssayPhase({
  data,
  exam,
  onBack,
  onNext,
}: {
  data: typeof practiceWritingTest4.writeTask;
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
          <span>{exam ? "Exam" : "Learn"} · Task 2</span>
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

      <div className="pw-write pw-write--essay">
        <aside className="pw-write__side">
          {!done && (
            <div className="pw-plan">
              <div className="pw-plan__head">
                <strong>Essay template (4 parts)</strong>
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
              label="IELTS Task 2 minimum · at least 250 words"
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
            className="pw-textarea pw-textarea--essay"
            value={text}
            disabled={done}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              "Write 4 paragraphs:\n1) intro\n2) problems\n3) solutions (recommendation language)\n4) softened conclusion"
            }
          />

          {done && showSample && (
            <div className="pw-after">
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
            Results →
          </button>
        )}
      </footer>
    </div>
  );
}
