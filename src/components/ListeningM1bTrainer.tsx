import { useEffect, useState } from "react";
import {
  LEARN_STEP_NEXT_L1B,
  LEARN_STEPS_L1B,
  listeningM1b,
} from "../data/listeningM1b";
import { AudioPlayer } from "./AudioPlayer";

const STEP_KEY = "ielts-listening-m1b-step";
const data = listeningM1b;

function loadStep(restart?: boolean, initialStep?: number): number {
  if (initialStep != null) return initialStep;
  if (restart) return 0;
  try {
    const raw = sessionStorage.getItem(STEP_KEY);
    if (raw != null) {
      const n = Number(raw);
      if (n >= 0 && n < LEARN_STEPS_L1B.length) return n;
    }
  } catch {
    /* ignore */
  }
  return 0;
}

function clearPersistedStep() {
  try {
    sessionStorage.removeItem(STEP_KEY);
  } catch {
    /* ignore */
  }
}

export function ListeningM1bTrainer({
  onBack,
  restart,
  initialStep,
}: {
  onBack?: () => void;
  restart?: boolean;
  initialStep?: number;
}) {
  const [learnStep, setLearnStep] = useState(() =>
    loadStep(restart, initialStep),
  );
  const [paraInputs, setParaInputs] = useState<Record<string, string>>({});
  const [paraRevealed, setParaRevealed] = useState(false);
  const [mcPick, setMcPick] = useState<"A" | "B" | "C" | undefined>();
  const [mcChecked, setMcChecked] = useState(false);
  const [strategyChecked, setStrategyChecked] = useState(false);
  const [altRevealed, setAltRevealed] = useState(false);
  const [testMc, setTestMc] = useState<Record<number, "A" | "B" | "C">>({});
  const [twoPicks, setTwoPicks] = useState<string[]>([]);
  const [testChecked, setTestChecked] = useState(false);

  useEffect(() => {
    if (!restart) return;
    clearPersistedStep();
    setLearnStep(initialStep ?? 0);
    setParaInputs({});
    setParaRevealed(false);
    setMcPick(undefined);
    setMcChecked(false);
    setStrategyChecked(false);
    setAltRevealed(false);
    setTestMc({});
    setTwoPicks([]);
    setTestChecked(false);
  }, [restart, initialStep]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STEP_KEY, String(learnStep));
    } catch {
      /* ignore */
    }
  }, [learnStep]);

  const twoKeys = data.stepTest.two.keys as readonly string[];
  const testMcReady = data.stepTest.mc.every((q) => testMc[q.id] != null);
  const twoReady = twoPicks.length === 2;
  const testReady = testMcReady && twoReady;

  const toggleTwo = (id: string) => {
    if (testChecked) return;
    setTwoPicks((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  };

  const goPrev = () => setLearnStep((s) => Math.max(0, s - 1));

  const goNext = () => {
    if (learnStep === 1 && !paraRevealed) {
      setParaRevealed(true);
      return;
    }
    if (learnStep === 2 && !mcChecked) {
      if (!mcPick) return;
      setMcChecked(true);
      return;
    }
    if (learnStep === 3 && !strategyChecked) {
      setStrategyChecked(true);
      return;
    }
    if (learnStep === 4 && !altRevealed) {
      setAltRevealed(true);
      return;
    }
    if (learnStep === 5 && !testChecked) {
      if (!testReady) return;
      setTestChecked(true);
      return;
    }
    if (learnStep >= LEARN_STEPS_L1B.length - 1) {
      onBack?.();
      return;
    }
    setLearnStep((s) => Math.min(s + 1, LEARN_STEPS_L1B.length - 1));
  };

  const nextLabel = (() => {
    if (learnStep === 1 && !paraRevealed) return "Show ideas →";
    if (learnStep === 2 && !mcChecked) return "Check answer →";
    if (learnStep === 3 && !strategyChecked) return "Check →";
    if (learnStep === 4 && !altRevealed) return "Show ideas →";
    if (learnStep === 5 && !testChecked) return "Check answers →";
    return LEARN_STEP_NEXT_L1B[learnStep] ?? "Дальше →";
  })();

  const nextDisabled =
    (learnStep === 2 && !mcChecked && !mcPick) ||
    (learnStep === 5 && !testChecked && !testReady);

  const paraRows = [
    {
      id: data.step2a.focus.id,
      label: data.step2a.focus.label,
      text: data.step2a.question,
      paraphrases: data.step2a.focus.paraphrases,
    },
    ...data.step2a.options.map((opt) => ({
      id: opt.id,
      label: opt.id,
      text: opt.text,
      paraphrases: opt.paraphrases,
    })),
  ];

  const scoreMc = data.stepTest.mc.filter(
    (q) => testMc[q.id] === q.key,
  ).length;
  const twoOk =
    twoPicks.length === 2 && twoPicks.every((p) => twoKeys.includes(p));

  return (
    <div className="app-shell reading-flow reading-flow--viewport listen-m1 listen-m1b">
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
          Listening · {data.bookPages}
        </span>
        <div className="learn-step-tabs">
          {LEARN_STEPS_L1B.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === learnStep ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => setLearnStep(i)}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {learnStep === 0 && (
        <section className="card flow-card lead-in-stack listen-m1__panel">
          <h2 className="card-title">
            <span className="dot" />
            Before you listen
          </h2>
          <p className="lead-in-stack__instr">
            {data.beforeYouListen.instruction}
          </p>
          <div className="listen-m1b__apps">
            {data.beforeYouListen.apps.map((app) => (
              <article key={app.id} className="listen-m1b__app">
                <header className="listen-m1b__app-head">
                  <span className="listen-m1b__price">{app.price}</span>
                  <strong>{app.name}</strong>
                </header>
                <p className="listen-m1b__app-text">{app.text}</p>
              </article>
            ))}
          </div>
          <ol className="lead-in-stack__questions">
            <li>
              <span className="lead-in-stack__num">1</span>
              <span>{data.beforeYouListen.question}</span>
            </li>
          </ol>
        </section>
      )}

      {learnStep === 1 && (
        <section className="card flow-card listen-m1__panel listen-m1b__para-step">
          <div className="listen-m1b__para-head">
            <h2 className="card-title">
              <span className="dot" />
              2a · {data.step2a.heading}
            </h2>
            <p className="listen-m1b__para-instr">{data.step2a.instruction}</p>
            <p className="listen-m1b__para-compare">{data.step2a.compareNote}</p>
            <p className="listen-m1__q-label">{data.step2a.question}</p>
          </div>
          <ul className="listen-m1__para-list listen-m1__para-list--grid listen-m1b__para-grid">
            {paraRows.map((row) => (
              <li key={row.id}>
                <div className="listen-m1__para-head">
                  <strong>{row.label}</strong>
                  <span>{row.text}</span>
                </div>
                <input
                  className="pr-completion__input listen-m1__para-input"
                  placeholder="your paraphrases…"
                  value={paraInputs[row.id] ?? ""}
                  disabled={paraRevealed}
                  onChange={(e) =>
                    setParaInputs((p) => ({ ...p, [row.id]: e.target.value }))
                  }
                />
                {paraRevealed && (
                  <p className="listen-m1__para-key">
                    Ideas: {row.paraphrases.join(" · ")}
                  </p>
                )}
              </li>
            ))}
          </ul>
          {paraRevealed && (
            <p className="pr-endings-panel__tip listen-m1b__tip">
              {data.step2a.tip}
            </p>
          )}
        </section>
      )}

      {learnStep === 2 && (
        <section className="card flow-card listen-m1__panel">
          <h2 className="card-title">
            <span className="dot" />
            2c · Listen and answer
          </h2>
          <p className="learn-screen__hint">{data.step2c.instruction}</p>
          <AudioPlayer
            src={data.step2c.audioSrc}
            label={data.step2c.audioLabel}
          />
          <p className="listen-m1__q-label">{data.step2c.question}</p>
          <div className="pr-tfng__choices listen-m1__mc">
            {data.step2c.options.map((opt) => {
              let state = "";
              if (mcChecked) {
                if (opt.id === data.step2c.key) state = "pr-chip--ok";
                else if (mcPick === opt.id) state = "pr-chip--bad";
              } else if (mcPick === opt.id) {
                state = "pr-chip--picked";
              }
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`pr-chip ${state}`}
                  disabled={mcChecked}
                  onClick={() => setMcPick(opt.id)}
                >
                  <strong>{opt.id}</strong> {opt.text}
                </button>
              );
            })}
          </div>
          {mcChecked && (
            <p className="pr-endings-panel__tip listen-m1b__tip">
              {data.step2c.tip}
            </p>
          )}
        </section>
      )}

      {learnStep === 3 && (
        <section className="card flow-card listen-m1__panel listen-m1__panel--split">
          <h2 className="card-title">
            <span className="dot" />
            2d · Strategy
          </h2>
          <p className="learn-screen__hint">{data.step2d.instruction}</p>
          <div className="listen-m1__split">
            <blockquote className="listen-m1__script listen-m1__script--side">
              {data.step2d.before}
              <mark className="listen-m1b__mark">{data.step2d.highlight}</mark>
              {data.step2d.after}
            </blockquote>
            <div className="listen-m1__split-qs">
              {data.step2d.questions.map((q) => (
                <div key={q.id} className="listen-m1__strategy-q">
                  <p>
                    <strong>{q.id}.</strong> {q.text}
                  </p>
                  {strategyChecked && (
                    <p className="listen-m1__strategy-a">{q.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          {strategyChecked && (
            <p className="pr-endings-panel__tip listen-m1b__tip">
              {data.step2d.tip}
            </p>
          )}
        </section>
      )}

      {learnStep === 4 && (
        <section className="card flow-card listen-m1__panel">
          <h2 className="card-title">
            <span className="dot" />
            3 · Alternative language
          </h2>
          <p className="learn-screen__hint">{data.step3Alt.instruction}</p>
          <div className="listen-m1b__alt-groups">
            {data.step3Alt.groups.map((g) => (
              <div key={g.id} className="listen-m1b__alt-group">
                <p className="listen-m1__q-label">Q{g.id}</p>
                <p className="listen-m1b__mc-q">{g.stem}</p>
                {altRevealed && (
                  <p className="listen-m1__para-key">Alt: {g.stemAlt}</p>
                )}
                <ul className="listen-m1__para-list">
                  {g.options.map((opt) => (
                    <li key={opt.id}>
                      <div className="listen-m1__para-head">
                        <strong>{opt.id}</strong>
                        <span>{opt.text}</span>
                      </div>
                      {altRevealed && (
                        <p className="listen-m1__para-key">Alt: {opt.alt}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {learnStep === 5 && (
        <section className="card flow-card listen-m1__panel listen-m1b__test">
          <div className="listen-m1b__test-head">
            <h2 className="card-title">
              <span className="dot" />
              Test practice · 1.6
            </h2>
            <p className="listen-m1b__test-instr">{data.stepTest.instruction}</p>
            <AudioPlayer
              src={data.stepTest.audioSrc}
              label={data.stepTest.audioLabel}
            />
          </div>
          <div className="listen-m1b__test-grid">
            <div className="listen-m1b__test-col">
              <p className="listen-m1__q-label">Questions 1 and 2</p>
              <p className="listen-m1b__test-sub">
                Choose the correct letter, A, B or C.
              </p>
              {data.stepTest.mc.map((q) => {
                const pick = testMc[q.id];
                return (
                  <div key={q.id} className="listen-m1b__mc-block">
                    <p className="listen-m1b__mc-q">
                      <strong>{q.id}.</strong> {q.text}
                    </p>
                    <div className="listen-m1b__mc-opts listen-m1b__mc-opts--stack">
                      {q.options.map((opt) => {
                        let state = "";
                        if (testChecked) {
                          if (opt.id === q.key) state = "pr-chip--ok";
                          else if (pick === opt.id) state = "pr-chip--bad";
                        } else if (pick === opt.id) {
                          state = "pr-chip--picked";
                        }
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            className={`pr-chip listen-m1b__chip ${state}`}
                            disabled={testChecked}
                            onClick={() =>
                              setTestMc((m) => ({ ...m, [q.id]: opt.id }))
                            }
                          >
                            <strong>{opt.id}</strong> {opt.text}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="listen-m1b__test-col">
              <p className="listen-m1__q-label">Questions 3 and 4</p>
              <p className="listen-m1b__test-sub">
                Choose TWO letters, A–E. ({twoPicks.length}/2)
              </p>
              <p className="listen-m1b__mc-q">{data.stepTest.two.prompt}</p>
              <div className="listen-m1b__mc-opts listen-m1b__mc-opts--stack">
                {data.stepTest.two.options.map((opt) => {
                  const picked = twoPicks.includes(opt.id);
                  let state = "";
                  if (testChecked) {
                    if (twoKeys.includes(opt.id)) state = "pr-chip--ok";
                    else if (picked) state = "pr-chip--bad";
                  } else if (picked) {
                    state = "pr-chip--picked";
                  }
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={`pr-chip listen-m1b__chip ${state}`}
                      disabled={testChecked}
                      onClick={() => toggleTwo(opt.id)}
                    >
                      <strong>{opt.id}</strong> {opt.text}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          {testChecked && (
            <p className="pr-endings-panel__tip listen-m1b__tip">
              Score: {scoreMc}/2 MC · TWO {twoOk ? "✓" : "✗"} ·{" "}
              {data.stepTest.tip}
            </p>
          )}
        </section>
      )}

      {learnStep === 6 && (
        <section className="card flow-card listen-m1__panel listen-m1b__discuss">
          <h2 className="card-title">
            <span className="dot" />
            5 · Discussion
          </h2>
          <div className="listen-m1b__discuss-stage">
            <article className="listen-m1b__discuss-card">
              <span className="listen-m1b__discuss-num" aria-hidden>
                5
              </span>
              <p className="listen-m1b__discuss-q">
                {data.discussion.question}
              </p>
              <p className="listen-m1b__discuss-cue">Discuss with a partner</p>
            </article>
          </div>
        </section>
      )}

      <div className="flow-footer">
        <button
          type="button"
          className="flow-footer__btn"
          disabled={learnStep === 0}
          onClick={goPrev}
        >
          ← Назад
        </button>
        <span className="flow-footer__step">
          {learnStep + 1} / {LEARN_STEPS_L1B.length}
        </span>
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          disabled={nextDisabled}
          onClick={goNext}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
