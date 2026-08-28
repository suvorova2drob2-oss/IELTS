import { useEffect, useState } from "react";
import {
  LEARN_STEP_NEXT_L1,
  LEARN_STEPS_L1,
  listeningM1,
} from "../data/listeningM1";
import { AudioPlayer } from "./AudioPlayer";

const STEP_KEY = "ielts-listening-m1-step";
const data = listeningM1;

function loadStep(restart?: boolean, initialStep?: number): number {
  if (initialStep != null) return initialStep;
  if (restart) return 0;
  try {
    const raw = sessionStorage.getItem(STEP_KEY);
    if (raw != null) {
      const n = Number(raw);
      if (n >= 0 && n < LEARN_STEPS_L1.length) return n;
    }
  } catch {
    /* ignore */
  }
  return 0;
}

export function ListeningM1Trainer({
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
  const [underlined, setUnderlined] = useState<Record<number, boolean>>({});
  const [focusChecked, setFocusChecked] = useState(false);
  const [paraInputs, setParaInputs] = useState<Record<string, string>>({});
  const [paraRevealed, setParaRevealed] = useState(false);
  const [mcPick, setMcPick] = useState<"A" | "B" | "C" | undefined>();
  const [mcChecked, setMcChecked] = useState(false);
  const [strategyChecked, setStrategyChecked] = useState(false);
  const [q4aInput, setQ4aInput] = useState("");
  const [q4aRevealed, setQ4aRevealed] = useState(false);
  const [synInputs, setSynInputs] = useState<Record<string, string>>({});
  const [synRevealed, setSynRevealed] = useState(false);
  const [twoPicks, setTwoPicks] = useState<string[]>([]);
  const [twoChecked, setTwoChecked] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(STEP_KEY, String(learnStep));
    } catch {
      /* ignore */
    }
  }, [learnStep]);

  const goPrev = () => setLearnStep((s) => Math.max(0, s - 1));

  const toggleTwo = (id: string) => {
    if (twoChecked) return;
    setTwoPicks((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  };

  const goNext = () => {
    if (learnStep === 1 && !focusChecked) {
      setFocusChecked(true);
      return;
    }
    if (learnStep === 2 && !paraRevealed) {
      setParaRevealed(true);
      return;
    }
    if (learnStep === 3 && !mcChecked) {
      if (!mcPick) return;
      setMcChecked(true);
      return;
    }
    if (learnStep === 4 && !strategyChecked) {
      setStrategyChecked(true);
      return;
    }
    if (learnStep === 5 && !q4aRevealed) {
      setQ4aRevealed(true);
      return;
    }
    if (learnStep === 6 && !synRevealed) {
      setSynRevealed(true);
      return;
    }
    if (learnStep === 7 && !twoChecked) {
      if (twoPicks.length !== 2) return;
      setTwoChecked(true);
      return;
    }
    if (learnStep >= LEARN_STEPS_L1.length - 1) {
      onBack?.();
      return;
    }
    setLearnStep((s) => Math.min(s + 1, LEARN_STEPS_L1.length - 1));
  };

  const nextLabel = (() => {
    if (learnStep === 1 && !focusChecked) return "Check focus →";
    if (learnStep === 2 && !paraRevealed) return "Show ideas →";
    if (learnStep === 3 && !mcChecked) return "Check answer →";
    if (learnStep === 4 && !strategyChecked) return "Check →";
    if (learnStep === 5 && !q4aRevealed) return "Show ideas →";
    if (learnStep === 6 && !synRevealed) return "Show ideas →";
    if (learnStep === 7 && !twoChecked) return "Check answers →";
    return LEARN_STEP_NEXT_L1[learnStep] ?? "Дальше →";
  })();

  const nextDisabled =
    (learnStep === 3 && !mcChecked && !mcPick) ||
    (learnStep === 7 && !twoChecked && twoPicks.length !== 2);

  const focusOk = data.step3a.tokens.every((tok, i) =>
    tok.key ? underlined[i] : !underlined[i],
  );

  const twoKeys = data.stepListen.keys as readonly string[];
  const twoCorrect =
    twoChecked &&
    twoPicks.length === 2 &&
    twoPicks.every((p) => twoKeys.includes(p));

  return (
    <div className="app-shell reading-flow reading-flow--viewport listen-m1">
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
          {LEARN_STEPS_L1.map((label, i) => (
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
          <div className="lead-in-stack__photos">
            {data.beforeYouListen.photos.map((p) => (
              <figure key={p.id} className="lead-in-stack__shot">
                <img src={p.src} alt={p.label} />
                <figcaption>{p.label}</figcaption>
              </figure>
            ))}
          </div>
          <ol className="lead-in-stack__questions">
            {data.beforeYouListen.questions.map((q, i) => (
              <li key={i}>
                <span className="lead-in-stack__num">{i + 1}</span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {learnStep === 1 && (
        <section className="card flow-card listen-m1__panel">
          <h2 className="card-title">
            <span className="dot" />
            3a · Listening focus
          </h2>
          <p className="learn-screen__hint">{data.step3a.instruction}</p>
          <p className="listen-m1__q-label">Question</p>
          <p className="listen-m1__tokens">
            {data.step3a.tokens.map((tok, i) => {
              const on = Boolean(underlined[i]);
              let cls = "listen-m1__tok";
              if (on) cls += " listen-m1__tok--on";
              if (focusChecked) {
                if (tok.key && on) cls += " listen-m1__tok--ok";
                else if (tok.key && !on) cls += " listen-m1__tok--miss";
                else if (!tok.key && on) cls += " listen-m1__tok--extra";
              }
              return (
                <button
                  key={`${tok.t}-${i}`}
                  type="button"
                  className={cls}
                  disabled={focusChecked}
                  onClick={() =>
                    setUnderlined((u) => ({ ...u, [i]: !u[i] }))
                  }
                >
                  {tok.t}
                </button>
              );
            })}
          </p>
          <p className="learn-screen__hint">
            Нажмите на слова, которые показывают, что именно слушать.
          </p>
          {focusChecked && (
            <p className="pr-endings-panel__tip">
              {focusOk ? "✓ " : ""}
              {data.step3a.tip}
            </p>
          )}
        </section>
      )}

      {learnStep === 2 && (
        <section className="card flow-card listen-m1__panel">
          <h2 className="card-title">
            <span className="dot" />
            3b · Paraphrase the options
          </h2>
          <p className="learn-screen__hint">{data.step3b.instruction}</p>
          <ul className="listen-m1__para-list">
            {data.step3b.options.map((opt) => (
              <li key={opt.id}>
                <div className="listen-m1__para-head">
                  <strong>{opt.id}</strong>
                  <span>{opt.text}</span>
                </div>
                <input
                  className="pr-completion__input listen-m1__para-input"
                  placeholder="your paraphrases…"
                  value={paraInputs[opt.id] ?? ""}
                  disabled={paraRevealed}
                  onChange={(e) =>
                    setParaInputs((p) => ({ ...p, [opt.id]: e.target.value }))
                  }
                />
                {paraRevealed && (
                  <p className="listen-m1__para-key">
                    Ideas: {opt.paraphrases.join(" · ")}
                  </p>
                )}
              </li>
            ))}
          </ul>
          {paraRevealed && (
            <p className="pr-endings-panel__tip">{data.step3b.tip}</p>
          )}
        </section>
      )}

      {learnStep === 3 && (
        <section className="card flow-card listen-m1__panel">
          <h2 className="card-title">
            <span className="dot" />
            3c · Check with the script
          </h2>
          <p className="learn-screen__hint">{data.step3c.instruction}</p>
          <blockquote className="listen-m1__script">
            {data.step3c.script}
          </blockquote>
          <p className="listen-m1__q-label">{data.step3a.question}</p>
          <div className="pr-tfng__choices listen-m1__mc">
            {data.step3c.options.map((opt) => {
              let state = "";
              if (mcChecked) {
                if (opt.id === data.step3c.key) state = "pr-chip--ok";
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
            <p className="pr-endings-panel__tip">{data.step3c.tip}</p>
          )}
        </section>
      )}

      {learnStep === 4 && (
        <section className="card flow-card listen-m1__panel listen-m1__panel--split">
          <h2 className="card-title">
            <span className="dot" />
            3d · Look again at the script
          </h2>
          <p className="learn-screen__hint">{data.step3d.instruction}</p>
          <div className="listen-m1__split">
            <aside className="listen-m1__split-script">
              <p className="listen-m1__q-label">Audio script (3c)</p>
              <blockquote className="listen-m1__script listen-m1__script--side">
                {data.step3c.script}
              </blockquote>
              <p className="listen-m1__opts-ref">
                Options:{" "}
                {data.step3c.options.map((o) => `${o.id} ${o.text}`).join(" · ")}
              </p>
            </aside>
            <div className="listen-m1__split-qs">
              <ol className="listen-m1__strategy">
                {data.step3d.questions.map((q) => (
                  <li key={q.id}>
                    <p className="listen-m1__strategy-q">{q.text}</p>
                    {strategyChecked && (
                      <p className="listen-m1__strategy-a">{q.answer}</p>
                    )}
                  </li>
                ))}
              </ol>
              {strategyChecked && (
                <p className="pr-endings-panel__tip">
                  Главный вывод: не ловите только совпадение слов — слушайте
                  synonyms и смысл вокруг них.
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {learnStep === 5 && (
        <section className="card flow-card listen-m1__panel">
          <h2 className="card-title">
            <span className="dot" />
            4a · Question focus
          </h2>
          <p className="learn-screen__hint">{data.step4a.instruction}</p>
          <p className="listen-m1__exam-q">
            {data.step4a.questionLead}
            <u>{data.step4a.underlined}</u>
            {data.step4a.questionTail}
          </p>
          <label className="listen-m1__field">
            <span>Other ways to say the underlined part</span>
            <input
              className="pr-completion__input listen-m1__para-input"
              placeholder="your paraphrases…"
              value={q4aInput}
              disabled={q4aRevealed}
              onChange={(e) => setQ4aInput(e.target.value)}
            />
          </label>
          {q4aRevealed && (
            <>
              <p className="listen-m1__para-key">
                Ideas: {data.step4a.paraphrases.join(" · ")}
              </p>
              <p className="listen-m1__fixed">
                Cannot change: <strong>{data.step4a.fixedWords}</strong>
              </p>
              <p className="pr-endings-panel__tip">{data.step4a.tip}</p>
            </>
          )}
        </section>
      )}

      {learnStep === 6 && (
        <section className="card flow-card listen-m1__panel">
          <h2 className="card-title">
            <span className="dot" />
            4b · Synonyms for the options
          </h2>
          <p className="learn-screen__hint">{data.step4b.instruction}</p>
          <ul className="listen-m1__para-list listen-m1__para-list--grid">
            {data.step4b.options.map((opt) => (
              <li key={opt.id}>
                <div className="listen-m1__para-head">
                  <strong>{opt.id}</strong>
                  <span>{opt.text}</span>
                </div>
                <input
                  className="pr-completion__input listen-m1__para-input"
                  placeholder="synonyms…"
                  value={synInputs[opt.id] ?? ""}
                  disabled={synRevealed}
                  onChange={(e) =>
                    setSynInputs((p) => ({ ...p, [opt.id]: e.target.value }))
                  }
                />
                {synRevealed && (
                  <p className="listen-m1__para-key">
                    Ideas: {opt.paraphrases.join(" · ")}
                  </p>
                )}
              </li>
            ))}
          </ul>
          {synRevealed && (
            <p className="pr-endings-panel__tip">{data.step4b.tip}</p>
          )}
        </section>
      )}

      {learnStep === 7 && (
        <section className="card flow-card listen-m1__panel">
          <h2 className="card-title">
            <span className="dot" />
            {data.stepListen.header}
          </h2>
          <p className="learn-screen__hint">{data.stepListen.instruction}</p>
          <AudioPlayer
            src={data.stepListen.audioUrl}
            label={data.stepListen.audioLabel}
          />
          <p className="listen-m1__exam-q">{data.stepListen.prompt}</p>
          <p className="listen-m1__pick-hint">
            Выберите ровно 2 варианта ({twoPicks.length}/2)
          </p>
          <div className="pr-tfng__choices listen-m1__mc listen-m1__mc--list">
            {data.stepListen.options.map((opt) => {
              const picked = twoPicks.includes(opt.id);
              let state = "";
              if (twoChecked) {
                if (twoKeys.includes(opt.id)) state = "pr-chip--ok";
                else if (picked) state = "pr-chip--bad";
              } else if (picked) {
                state = "pr-chip--picked";
              }
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`pr-chip ${state}`}
                  disabled={twoChecked}
                  onClick={() => toggleTwo(opt.id)}
                >
                  <strong>{opt.id}</strong> {opt.text}
                </button>
              );
            })}
          </div>
          {twoChecked && (
            <p className="pr-endings-panel__tip">
              {twoCorrect ? "✓ " : ""}
              {data.stepListen.tip}
            </p>
          )}
        </section>
      )}

      {learnStep === 8 && (
        <section className="card flow-card listen-m1__panel">
          <h2 className="card-title">
            <span className="dot" />
            6 · Discussion
          </h2>
          <ol className="lead-in-stack__questions">
            {data.discussion.questions.map((q, i) => (
              <li key={i}>
                <span className="lead-in-stack__num">{i + 1}</span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
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
          {learnStep + 1} / {LEARN_STEPS_L1.length}
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
