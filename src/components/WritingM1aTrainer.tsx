import { useEffect, useState } from "react";
import {
  LEARN_NEXT_W1A,
  LEARN_STEPS_W1A,
  writingM1a,
} from "../data/writingM1a";
import { EducationYearsGraph } from "./EducationYearsGraph";
import { WordCountMeter, countWords } from "./WordCountMeter";
import { WomenEmploymentGraph } from "./WomenEmploymentGraph";

const STEP_KEY = "ielts-writing-m1a-step";
const WRITE_KEY = "ielts-writing-m1a-draft";
const data = writingM1a;

const NO_CHECK_STEPS = new Set([4, 5, 6]);

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function loadStep(restart?: boolean, initialStep?: number): number {
  if (initialStep != null) return initialStep;
  if (restart) return 0;
  try {
    const raw = sessionStorage.getItem(STEP_KEY);
    if (raw != null) {
      const n = Number(raw);
      if (n >= 0 && n < LEARN_STEPS_W1A.length) return n;
    }
  } catch {
    /* ignore */
  }
  return 0;
}

function loadDraft(): string {
  try {
    return sessionStorage.getItem(WRITE_KEY) ?? "";
  } catch {
    return "";
  }
}

export function WritingM1aTrainer({
  onBack,
  restart,
  initialStep,
}: {
  onBack?: () => void;
  restart?: boolean;
  initialStep?: number;
}) {
  const [step, setStep] = useState(() => loadStep(restart, initialStep));
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [matches, setMatches] = useState<Record<number, string>>({});
  const [pickedSec, setPickedSec] = useState<number | null>(null);
  const [pickedLetter, setPickedLetter] = useState<string | null>(null);
  const [overviewPick, setOverviewPick] = useState<number | undefined>();
  const [tdPicks, setTdPicks] = useState<Record<number, "trend" | "detail">>({});
  const [plan, setPlan] = useState<Record<string, string>>({});
  const [text, setText] = useState(loadDraft);
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(data.stepWrite.timeSec);
  const [done, setDone] = useState(false);
  const [showSample, setShowSample] = useState(false);
  const [checks, setChecks] = useState<Record<number, boolean>>({});
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(STEP_KEY, String(step));
    } catch {
      /* ignore */
    }
  }, [step]);

  useEffect(() => {
    try {
      sessionStorage.setItem(WRITE_KEY, text);
    } catch {
      /* ignore */
    }
  }, [text]);

  useEffect(() => {
    if (!running || done || step !== 6) return;
    if (timeLeft <= 0) {
      setRunning(false);
      return;
    }
    const id = window.setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => window.clearTimeout(id);
  }, [running, timeLeft, done, step]);

  const usedLetters = new Set(Object.values(matches).filter(Boolean));
  const structById = Object.fromEntries(
    data.step1b.structures.map((s) => [s.id, s.text]),
  );
  const words = countWords(text);

  const place = (secId: number, letter: string) => {
    if (checked) return;
    setMatches((m) => {
      const next = { ...m };
      for (const [k, v] of Object.entries(next)) {
        if (v === letter) delete next[Number(k)];
      }
      next[secId] = letter;
      return next;
    });
    setPickedSec(null);
    setPickedLetter(null);
  };

  const onSecClick = (secId: number) => {
    if (checked) return;
    if (pickedLetter) {
      place(secId, pickedLetter);
      return;
    }
    if (matches[secId]) {
      setMatches((m) => {
        const n = { ...m };
        delete n[secId];
        return n;
      });
      return;
    }
    setPickedSec((p) => (p === secId ? null : secId));
  };

  const onStructClick = (letter: string) => {
    if (checked || usedLetters.has(letter)) return;
    if (pickedSec != null) {
      place(pickedSec, letter);
      return;
    }
    setPickedLetter((p) => (p === letter ? null : letter));
  };

  const score1a = data.step1a.questions.filter(
    (q) => picks[q.id] === q.key,
  ).length;
  const score1b = data.step1b.sections.filter(
    (s) => matches[s.id] === data.step1b.keys[s.id],
  ).length;
  const score2a = overviewPick === data.step2a.key ? 1 : 0;
  const score2b = data.step2b.items.filter(
    (it) => tdPicks[it.id] === it.key,
  ).length;

  const all1a = data.step1a.questions.every((q) => picks[q.id] != null);
  const all1b = data.step1b.sections.every((s) => matches[s.id]);
  const all2a = overviewPick != null;
  const all2b = data.step2b.items.every((it) => tdPicks[it.id]);

  const scores = [score1a, score1b, score2a, score2b, 0, 0, words];
  const totals = [
    data.step1a.questions.length,
    data.step1b.sections.length,
    1,
    data.step2b.items.length,
    0,
    0,
    data.stepWrite.minWords,
  ];
  const readyFlags = [
    all1a,
    all1b,
    all2a,
    all2b,
    true,
    true,
    done || words >= data.stepWrite.minWords,
  ];

  const clearNav = () => {
    setChecked(false);
    setPickedSec(null);
    setPickedLetter(null);
  };

  const goPrev = () => {
    clearNav();
    setStep((s) => Math.max(0, s - 1));
  };

  const goNext = () => {
    if (!NO_CHECK_STEPS.has(step) && !checked) {
      setChecked(true);
      return;
    }
    if (step === 6 && !done) {
      setDone(true);
      setRunning(false);
      setShowSample(true);
      return;
    }
    if (step >= LEARN_STEPS_W1A.length - 1) {
      onBack?.();
      return;
    }
    clearNav();
    setStep((s) => s + 1);
  };

  const insertStarters = () => {
    setText(data.stepWrite.starters.join("\n\n"));
  };

  const fillSamplePlan = () => {
    const next: Record<string, string> = {};
    for (const s of data.step3a.slots) next[s.id] = s.sample;
    setPlan(next);
  };

  const nextLabel = (() => {
    if (!NO_CHECK_STEPS.has(step) && !checked) return "Check →";
    if (step === 6 && !done) return "Finish → Sample";
    return LEARN_NEXT_W1A[step] ?? "Дальше →";
  })();

  return (
    <div className="app-shell reading-flow reading-flow--viewport writing-m1a">
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
        <div className="learn-step-tabs">
          {LEARN_STEPS_W1A.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                clearNav();
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="card flow-card writing-m1a__panel">
          <h2 className="card-title">
            <span className="dot" />
            1a · Look at the graph
          </h2>
          <p className="learn-screen__hint">{data.step1a.instruction}</p>
          <div className="writing-m1a__split">
            <div className="writing-m1a__graph">
              <WomenEmploymentGraph compact />
            </div>
            <ol className="writing-m1a__qs">
              {data.step1a.questions.map((q) => {
                const pick = picks[q.id];
                return (
                  <li key={q.id}>
                    <p className="writing-m1a__q">
                      <strong>{q.id}.</strong> {q.text}
                    </p>
                    <div className="writing-m1a__opts">
                      {q.options.map((opt, i) => {
                        let state = "";
                        if (checked) {
                          if (i === q.key) state = "writing-m1a__opt--ok";
                          else if (pick === i) state = "writing-m1a__opt--bad";
                        } else if (pick === i) {
                          state = "writing-m1a__opt--picked";
                        }
                        return (
                          <button
                            key={opt}
                            type="button"
                            className={`writing-m1a__opt ${state}`}
                            disabled={checked}
                            onClick={() =>
                              setPicks((p) => ({ ...p, [q.id]: i }))
                            }
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
          {checked && (
            <p className="pr-endings-panel__tip">
              Score: {score1a} / {data.step1a.questions.length} ·{" "}
              {data.step1a.questions
                .map((q) => `${q.id} ${q.display}`)
                .join(" · ")}
            </p>
          )}
        </section>
      )}

      {step === 1 && (
        <section className="card flow-card writing-m1a__panel">
          <h2 className="card-title">
            <span className="dot" />
            1b · Match structures
          </h2>
          <p className="learn-screen__hint">{data.step1b.instruction}</p>
          <p className="writing-m1a__hint">
            Click a section or a structure, then the other side. Click a match
            to undo.
          </p>
          <div className="writing-m1a__match">
            <ul className="writing-m1a__secs">
              {data.step1b.sections.map((sec) => {
                const letter = matches[sec.id] ?? "";
                const key = data.step1b.keys[sec.id];
                let state = "";
                if (checked) {
                  state =
                    letter === key
                      ? "writing-m1a__sec--ok"
                      : "writing-m1a__sec--bad";
                } else if (pickedSec === sec.id) {
                  state = "writing-m1a__sec--picked";
                } else if (letter) {
                  state = "writing-m1a__sec--filled";
                }
                return (
                  <li key={sec.id}>
                    <button
                      type="button"
                      className={`writing-m1a__sec ${state}`}
                      disabled={checked}
                      onClick={() => onSecClick(sec.id)}
                    >
                      <strong>{sec.id}.</strong>
                      <span className="writing-m1a__sec-text">{sec.text}</span>
                      {letter ? (
                        <span className="writing-m1a__placed">
                          <span className="writing-m1a__placed-letter">
                            {letter}
                          </span>
                          {structById[letter]}
                        </span>
                      ) : (
                        <span className="writing-m1a__drop">
                          drop structure here
                        </span>
                      )}
                    </button>
                    {checked && letter !== key && (
                      <p className="writing-m1a__fix">
                        {key} · {structById[key]}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="writing-m1a__structs">
              {data.step1b.structures.map((s) => {
                const used = usedLetters.has(s.id);
                const active = pickedLetter === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    className={`writing-m1a__struct ${used ? "writing-m1a__struct--used" : ""} ${active ? "writing-m1a__struct--picked" : ""}`}
                    disabled={checked || used}
                    onClick={() => onStructClick(s.id)}
                  >
                    <strong>{s.id}</strong>
                    <span>{s.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
          {checked && (
            <p className="pr-endings-panel__tip">
              Score: {score1b} / {data.step1b.sections.length} · 1C · 2D · 3A ·
              4B
            </p>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="card flow-card writing-m1a__panel">
          <h2 className="card-title">
            <span className="dot" />
            2a · Summarise features · Overview
          </h2>
          <p className="learn-screen__hint">{data.step2a.instruction}</p>
          <div className="writing-m1a__split">
            <div className="writing-m1a__graph">
              <EducationYearsGraph compact />
            </div>
            <ol className="writing-m1a__qs writing-m1a__qs--overview">
              {data.step2a.sentences.map((sent, i) => {
                let state = "";
                if (checked) {
                  if (i === data.step2a.key) state = "writing-m1a__opt--ok";
                  else if (overviewPick === i) state = "writing-m1a__opt--bad";
                } else if (overviewPick === i) {
                  state = "writing-m1a__opt--picked";
                }
                return (
                  <li key={i}>
                    <button
                      type="button"
                      className={`writing-m1a__opt writing-m1a__opt--block ${state}`}
                      disabled={checked}
                      onClick={() => setOverviewPick(i)}
                    >
                      <strong>{i + 1}.</strong> {sent}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
          {checked && (
            <p className="pr-endings-panel__tip">{data.step2a.tip}</p>
          )}
        </section>
      )}

      {step === 3 && (
        <section className="card flow-card writing-m1a__panel">
          <h2 className="card-title">
            <span className="dot" />
            2b · Trend or detail
          </h2>
          <p className="learn-screen__hint">{data.step2b.instruction}</p>
          <div className="writing-m1a__td-split">
            <div className="writing-m1a__graph writing-m1a__graph--side">
              <EducationYearsGraph compact />
            </div>
            <ol className="writing-m1a__td-list">
              {data.step2b.items.map((item) => {
                const pick = tdPicks[item.id];
                const ok = pick === item.key;
                return (
                  <li key={item.id}>
                    <p className="writing-m1a__q">
                      <strong>{item.id}.</strong> {item.text}
                    </p>
                    <div className="writing-m1a__td-btns">
                      {(["trend", "detail"] as const).map((label) => {
                        let state = "";
                        if (checked) {
                          if (label === item.key) state = "writing-m1a__opt--ok";
                          else if (pick === label)
                            state = "writing-m1a__opt--bad";
                        } else if (pick === label) {
                          state = "writing-m1a__opt--picked";
                        }
                        return (
                          <button
                            key={label}
                            type="button"
                            className={`writing-m1a__opt ${state}`}
                            disabled={checked}
                            onClick={() =>
                              setTdPicks((p) => ({ ...p, [item.id]: label }))
                            }
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                    {checked && !ok && (
                      <p className="writing-m1a__fix">Answer: {item.key}</p>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
          {checked && (
            <p className="pr-endings-panel__tip">
              Score: {score2b} / {data.step2b.items.length} · 1 trend · 2 detail
            </p>
          )}
        </section>
      )}

      {step === 4 && (
        <section className="card flow-card writing-m1a__panel">
          <h2 className="card-title">
            <span className="dot" />
            2c · Other trends
          </h2>
          <p className="learn-screen__hint">{data.step2c.instruction}</p>
          <div className="writing-m1a__discuss">
            <div className="writing-m1a__graph">
              <EducationYearsGraph compact />
            </div>
            <aside className="lang-m1a__discuss-advice">
              <p className="lang-m1a__discuss-advice-title">
                Trends you could write about
              </p>
              <ol>
                {data.step2c.tips.map((tip) => (
                  <li key={tip}>
                    <p className="lang-m1a__discuss-advice-para">{tip}</p>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </section>
      )}

      {step === 5 && (
        <section className="card flow-card writing-m1a__panel">
          <h2 className="card-title">
            <span className="dot" />
            Test practice · 3a Plan
          </h2>
          <p className="learn-screen__hint">{data.step3a.instruction}</p>
          <div className="writing-m1a__plan-split">
            <div className="writing-m1a__graph writing-m1a__graph--side">
              <EducationYearsGraph compact />
              <aside className="writing-m1a__suggested">
                <p className="writing-m1a__suggested-title">
                  {data.step3a.suggestedAnswer.title}
                </p>
                {data.step3a.suggestedAnswer.blocks.map((b) => (
                  <p key={b.label}>
                    <strong>{b.label}:</strong> {b.text}
                  </p>
                ))}
              </aside>
            </div>
            <div className="writing-m1a__plan">
              <div className="writing-m1a__plan-actions">
                <button
                  type="button"
                  className="btn-start"
                  onClick={fillSamplePlan}
                >
                  Fill plan from suggested answer →
                </button>
              </div>
              {data.step3a.slots.map((slot) => (
                <label key={slot.id} className="writing-m1a__plan-slot">
                  <span>{slot.label}</span>
                  <textarea
                    className="writing-m1a__plan-ta"
                    rows={2}
                    value={plan[slot.id] ?? ""}
                    onChange={(e) =>
                      setPlan((p) => ({ ...p, [slot.id]: e.target.value }))
                    }
                    placeholder="Write your notes for this paragraph…"
                  />
                </label>
              ))}
              <p className="writing-m1a__compare">{data.step3a.comparePrompt}</p>
            </div>
          </div>
        </section>
      )}

      {step === 6 && (
        <div
          className={`pw-write writing-m1a__write${done ? " writing-flow__write--done" : ""}`}
        >
          <aside className="pw-write__side">
            <EducationYearsGraph compact />
            {!done && (
              <div className="pw-model-plan">
                <ol className="pw-model-plan__list">
                  {data.step3a.slots.map((slot) => (
                    <li key={slot.id} className="pw-model-block">
                      <strong>{slot.id}</strong>
                      <p className="pw-model-row">
                        <span>
                          {(plan[slot.id] ?? "").trim() || slot.label}
                        </span>
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {done && (
              <div className="pw-plan">
                <div className="pw-plan__head">
                  <strong>Self-check</strong>
                </div>
                <ul className="pw-checklist">
                  {data.stepWrite.checklist.map((c, i) => (
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
            <p className="pw-prompt">{data.stepWrite.prompt}</p>
            <div className="pw-write__meta">
              <WordCountMeter
                words={words}
                minWords={data.stepWrite.minWords}
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
                "Write 4 paragraphs (A–D):\n1) paraphrase / intro\n2) overall trends\n3) key feature with data\n4) overview"
              }
            />
            {done && showSample && (
              <div className="pw-sample">
                <p className="pw-sample__h">Sample answer</p>
                {data.stepWrite.sampleParagraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      <div className="flow-footer">
        <button
          type="button"
          className="flow-footer__btn"
          disabled={step === 0}
          onClick={goPrev}
        >
          ← Назад
        </button>
        <span className="flow-footer__step">
          {step + 1} / {LEARN_STEPS_W1A.length}
          {!NO_CHECK_STEPS.has(step) && checked
            ? ` · ${scores[step]}/${totals[step]}`
            : step === 6
              ? ` · ${words} words`
              : ""}
        </span>
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          disabled={
            (!NO_CHECK_STEPS.has(step) && !checked && !readyFlags[step]) ||
            (step === 6 && !done && !readyFlags[6])
          }
          onClick={goNext}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
