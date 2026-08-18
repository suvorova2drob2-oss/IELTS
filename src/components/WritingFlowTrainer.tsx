import { useEffect, useState } from "react";
import { UkEmploymentGraph } from "./UkEmploymentGraph";
import { WordCountMeter, countWords } from "./WordCountMeter";
import {
  LEARN_NEXT_W1B,
  LEARN_STEPS_W1B,
  ukEmploymentSeries,
  writingM1b,
  type UkEmploymentId,
} from "../data/writingM1b";

type TrackMode = "exam" | "learn";

const MODE_KEY = "ielts-writing-m1b-mode";
const STEP_KEY = "ielts-writing-m1b-step";

function MarkedText({ text }: { text: string }) {
  const parts = text.split(/(==[^=]+==)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("==") && part.endsWith("==") ? (
          <span key={i} className="pw-keep">
            {part.slice(2, -2)}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function loadTrackMode(restart?: boolean, initialStep?: number): TrackMode {
  if (initialStep != null) return "learn";
  if (restart) return "exam";
  try {
    const raw = sessionStorage.getItem(MODE_KEY);
    if (raw === "learn" || raw === "exam") return raw;
  } catch {
    /* ignore */
  }
  return "exam";
}

function loadLearnStep(restart?: boolean, initialStep?: number): number {
  if (initialStep != null) return initialStep;
  if (restart) return 0;
  try {
    const raw = sessionStorage.getItem(STEP_KEY);
    if (raw != null) {
      const n = Number(raw);
      if (!Number.isNaN(n) && n >= 0 && n < LEARN_STEPS_W1B.length) return n;
    }
  } catch {
    /* ignore */
  }
  return 0;
}

function PlanList({ compact }: { compact?: boolean }) {
  return (
    <div className="pw-model-plan">
      {!compact && (
        <p className="pw-sample__h">Фразы · нужно · нельзя · пример</p>
      )}
      <ol className="pw-model-plan__list">
        {writingM1b.plan.map((block) => (
          <li key={block.label} className="pw-model-block">
            <strong>{block.label}</strong>
            {compact ? (
              <p className="pw-model-row">
                <span className="pw-model-row__k">Нужно</span>
                <span>{block.must}</span>
              </p>
            ) : (
              <>
                <p className="pw-model-row">
                  <span className="pw-model-row__k">Фразы</span>
                  <span>{block.phrases.join("  ·  ")}</span>
                </p>
                <p className="pw-model-row">
                  <span className="pw-model-row__k">Нужно</span>
                  <span>{block.must}</span>
                </p>
                <p className="pw-model-row pw-model-row--no">
                  <span className="pw-model-row__k">Нельзя</span>
                  <span>{block.avoid}</span>
                </p>
                <p className="pw-model-row pw-model-row--ex">
                  <span className="pw-model-row__k">Пример</span>
                  <span>{block.example}</span>
                </p>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function WritingFlowTrainer({
  onBack,
  restart,
  initialStep,
}: {
  onBack?: () => void;
  restart?: boolean;
  initialStep?: number;
}) {
  const data = writingM1b;
  const [trackMode, setTrackMode] = useState<TrackMode>(() =>
    loadTrackMode(restart, initialStep),
  );
  const [learnStep, setLearnStep] = useState(() =>
    loadLearnStep(restart, initialStep),
  );
  const [checked, setChecked] = useState(false);
  const [understand, setUnderstand] = useState<Record<number, number>>({});
  const [features, setFeatures] = useState<Record<number, "T" | "F">>({});
  const [trends, setTrends] = useState<Record<number, UkEmploymentId | "">>(
    {},
  );
  const [text, setText] = useState("");
  const [showSample, setShowSample] = useState(false);
  const [done, setDone] = useState(false);
  const [checks, setChecks] = useState<Record<number, boolean>>({});
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(data.timeSec);

  useEffect(() => {
    try {
      sessionStorage.setItem(MODE_KEY, trackMode);
      if (trackMode === "learn") {
        sessionStorage.setItem(STEP_KEY, String(learnStep));
      }
    } catch {
      /* ignore */
    }
  }, [trackMode, learnStep]);

  useEffect(() => {
    if (initialStep != null) {
      setTrackMode("learn");
      setLearnStep(initialStep);
      setChecked(false);
    }
  }, [initialStep]);

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

  const words = countWords(text);
  const showWrite = trackMode === "exam" || learnStep === 3;

  const understandScore = data.understand.filter(
    (item, i) => understand[i] === item.key,
  ).length;
  const featuresScore = data.features.filter(
    (item, i) => features[i] === item.key,
  ).length;
  const trendsScore = data.trends.filter(
    (item, i) => trends[i] === item.id,
  ).length;

  const switchTrack = (mode: TrackMode) => {
    setTrackMode(mode);
    setChecked(false);
    setDone(false);
    setShowSample(false);
    if (mode === "learn") setLearnStep(0);
  };

  const goPrev = () => {
    if (trackMode !== "learn") return;
    setChecked(false);
    setLearnStep((s) => Math.max(0, s - 1));
  };

  const goNext = () => {
    if (trackMode === "exam") {
      if (!done) {
        setDone(true);
        setShowSample(true);
        setRunning(false);
        return;
      }
      onBack?.();
      return;
    }
    if (learnStep < 2 && !checked) {
      setChecked(true);
      return;
    }
    if (learnStep === 3 && !done) {
      setDone(true);
      setShowSample(true);
      setRunning(false);
      return;
    }
    if (learnStep >= LEARN_STEPS_W1B.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setLearnStep((s) => Math.min(s + 1, LEARN_STEPS_W1B.length - 1));
  };

  const nextLabel =
    trackMode === "exam"
      ? done
        ? "← К модулю"
        : "Finish → sample"
      : learnStep < 2 && !checked
        ? "Check answers →"
        : learnStep === 3 && !done
          ? "Finish → sample"
          : (LEARN_NEXT_W1B[learnStep] ?? "Дальше →");

  const insertStarters = () => {
    setText(data.starters.join("\n\n"));
  };

  return (
    <div className="app-shell reading-flow reading-flow--viewport writing-flow">
      <div className="reading-chrome">
        {onBack && (
          <button
            type="button"
            className="back-link reading-chrome__back"
            onClick={onBack}
          >
            ← Модуль
          </button>
        )}
        <span className="badge reading-chrome__badge">
          Writing · {data.bookPages}
        </span>
        <div className="controls mode-toggle track-toggle">
          <button
            type="button"
            className={trackMode === "exam" ? "active" : ""}
            onClick={() => switchTrack("exam")}
          >
            Exam
          </button>
          <button
            type="button"
            className={trackMode === "learn" ? "active" : ""}
            onClick={() => switchTrack("learn")}
          >
            Learn
          </button>
        </div>
      </div>

      {trackMode === "learn" && (
        <p className="flow-progress__label writing-flow__step">
          Step {learnStep + 1}/{LEARN_STEPS_W1B.length}:{" "}
          <strong>{LEARN_STEPS_W1B[learnStep]}</strong>
        </p>
      )}

      {showWrite ? (
        <div className={`pw-write writing-flow__write${done ? " writing-flow__write--done" : ""}`}>
          <aside className="pw-write__side">
            <UkEmploymentGraph compact />
            {!done && <PlanList compact />}
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
                            setChecks((x) => ({ ...x, [i]: e.target.checked }))
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
                ⏱ {formatTime(timeLeft)}
              </span>
              {!running && !done && (
                <button
                  type="button"
                  className="btn-start"
                  onClick={() => setRunning(true)}
                >
                  Start 20 min →
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
              {!done && (
                <button
                  type="button"
                  className="pw-plan__toggle"
                  onClick={insertStarters}
                >
                  Reset to starter template →
                </button>
              )}
            </div>
            <textarea
              className="pw-textarea"
              value={text}
              disabled={done}
              onChange={(e) => setText(e.target.value)}
              placeholder={
                "Write 4 short paragraphs:\n1) paraphrase\n2) overview (degrees ↑, lower education ↓)\n3) master’s + bachelor’s\n4) no certificate + high school"
              }
            />
            {done && showSample && (
              <div className="pw-sample">
                <p className="pw-sample__h">
                  Sample · underlined = constructions to keep
                </p>
                <div className="pw-sample__body">
                  {data.sampleParagraphs.map((p) => (
                    <p key={p.slice(0, 40)}>
                      <MarkedText text={p} />
                    </p>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      ) : (
        <div className="pw-write writing-flow__learn">
          <aside className="pw-write__side">
            <UkEmploymentGraph
              highlight={
                learnStep === 1
                  ? ["master", "none"]
                  : learnStep === 2
                    ? undefined
                    : undefined
              }
            />
            <p className="pw-prompt">{data.prompt}</p>
          </aside>
          <section className="pw-write__main">
            {learnStep === 0 && (
              <div className="writing-flow__quiz">
                <h3>Read the title, axes and legend first.</h3>
                {data.understand.map((item, i) => {
                  const chosen = understand[i];
                  const ok = chosen === item.key;
                  return (
                    <div key={item.q} className="writing-flow__q">
                      <p>
                        {i + 1}. {item.q}
                      </p>
                      <div className="writing-flow__opts">
                        {item.options.map((opt, oi) => (
                          <button
                            key={opt}
                            type="button"
                            className={[
                              chosen === oi ? "active" : "",
                              checked && oi === item.key
                                ? "writing-flow__opt--ok"
                                : "",
                              checked && chosen === oi && !ok
                                ? "writing-flow__opt--bad"
                                : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            onClick={() =>
                              setUnderstand((x) => ({ ...x, [i]: oi }))
                            }
                            disabled={checked}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      {checked && <p className="line-hint">{item.tip}</p>}
                    </div>
                  );
                })}
              </div>
            )}

            {learnStep === 1 && (
              <div className="writing-flow__quiz">
                <h3>True or False — main features only.</h3>
                {data.features.map((item, i) => {
                  const chosen = features[i];
                  const ok = chosen === item.key;
                  return (
                    <div key={item.statement} className="writing-flow__q">
                      <p>
                        {i + 1}. {item.statement}
                      </p>
                      <div className="writing-flow__opts">
                        {(["T", "F"] as const).map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            className={[
                              chosen === opt ? "active" : "",
                              checked && opt === item.key
                                ? "writing-flow__opt--ok"
                                : "",
                              checked && chosen === opt && !ok
                                ? "writing-flow__opt--bad"
                                : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            onClick={() =>
                              setFeatures((x) => ({ ...x, [i]: opt }))
                            }
                            disabled={checked}
                          >
                            {opt === "T" ? "True" : "False"}
                          </button>
                        ))}
                      </div>
                      {checked && item.key === "F" && item.correction && (
                        <p className="line-hint">{item.correction}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {learnStep === 2 && (
              <div className="writing-flow__quiz">
                <h3>Match the trend language to the line.</h3>
                {data.trends.map((item, i) => {
                  const chosen = trends[i];
                  const ok = chosen === item.id;
                  return (
                    <div key={item.phrase} className="writing-flow__q">
                      <p>
                        {i + 1}. {item.phrase}
                      </p>
                      <div className="writing-flow__opts">
                        {ukEmploymentSeries.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            className={[
                              chosen === s.id ? "active" : "",
                              checked && s.id === item.id
                                ? "writing-flow__opt--ok"
                                : "",
                              checked && chosen === s.id && !ok
                                ? "writing-flow__opt--bad"
                                : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            onClick={() =>
                              setTrends((x) => ({ ...x, [i]: s.id }))
                            }
                            disabled={checked}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
                <PlanList />
              </div>
            )}
          </section>
        </div>
      )}

      <footer
        className={`flow-footer ${checked ? "flow-footer--checked" : ""}`}
      >
        <button
          type="button"
          className="flow-footer__btn"
          onClick={goPrev}
          disabled={trackMode !== "learn" || learnStep === 0}
        >
          ← Back
        </button>
        <span className="flow-footer__step">
          {trackMode === "exam"
            ? done
              ? "Checklist + sample"
              : "Write · ~20 min · 150 words"
            : LEARN_STEPS_W1B[learnStep]}
        </span>
        {checked && learnStep === 0 && (
          <span className="flow-footer__result">
            <span className="flow-footer__ok">{understandScore}</span>
            {" / "}
            {data.understand.length}
          </span>
        )}
        {checked && learnStep === 1 && (
          <span className="flow-footer__result">
            <span className="flow-footer__ok">{featuresScore}</span>
            {" / "}
            {data.features.length}
            {featuresScore < data.features.length && (
              <>
                {" · "}
                <span className="flow-footer__bad">
                  {data.features.length - featuresScore} wrong
                </span>
              </>
            )}
          </span>
        )}
        {checked && learnStep === 2 && (
          <span className="flow-footer__result">
            <span className="flow-footer__ok">{trendsScore}</span>
            {" / "}
            {data.trends.length}
          </span>
        )}
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={goNext}
        >
          {nextLabel}
        </button>
      </footer>
    </div>
  );
}
