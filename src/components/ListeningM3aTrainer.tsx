import { useEffect, useState } from "react";
import {
  LISTEN_M3A_NEXT,
  LISTEN_M3A_STEPS,
  listeningM3a,
} from "../data/listeningM3a";

const data = listeningM3a;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, LISTEN_M3A_STEPS.length - 1));
}

export function ListeningM3aTrainer({
  onBack,
  restart,
  initialStep,
}: {
  onBack?: () => void;
  restart?: boolean;
  initialStep?: number;
}) {
  const [step, setStep] = useState(() => clampStep(initialStep));
  const [checked, setChecked] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [match, setMatch] = useState<Record<string, string>>({});
  const [answers, setAnswers] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setShowTips(false);
    setPicked(null);
    setMatch({});
    setAnswers({});
  }, [restart, initialStep]);

  const matchScore = data.match.targets.filter((t) => {
    const val = match[t.id];
    return val === t.key || t.also.includes(val);
  }).length;
  const used = new Set(Object.values(match));
  const needsCheck = step === 3;

  const place = (id: string) => {
    if (checked) return;
    if (match[id]) {
      setMatch((m) => {
        const n = { ...m };
        delete n[id];
        return n;
      });
      return;
    }
    if (!picked) return;
    setMatch((m) => ({ ...m, [id]: picked }));
    setPicked(null);
  };

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTips(false);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (step === 2 && !showTips) {
      setShowTips(true);
      return;
    }
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= LISTEN_M3A_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTips(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    step === 2 && !showTips
      ? "Show tips →"
      : needsCheck && !checked
        ? "Check →"
        : LISTEN_M3A_NEXT[step];

  const Gap = ({ id }: { id: number }) => (
    <input
      className="listen-m3a__input"
      value={answers[id] ?? ""}
      placeholder={`${id}`}
      aria-label={`Answer ${id}`}
      onChange={(e) =>
        setAnswers((a) => ({ ...a, [id]: e.target.value }))
      }
    />
  );

  return (
    <div className="app-shell reading-flow reading-flow--viewport listen-m3a">
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
          {data.sectionTitle} · {data.bookPages}
        </span>
        <div className="learn-step-tabs">
          {LISTEN_M3A_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setShowTips(false);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      <p className="listen-m3a__banner">{data.noAudioNote}</p>

      {step === 0 && (
        <section className="listen-m3a__panel">
          <h2 className="listen-m3a__h">{data.quotes.heading}</h2>
          <p className="listen-m3a__instr">
            <span className="write-m2a__badge">{data.quotes.badge}</span>
            {data.quotes.instruction}
          </p>
          <div className="listen-m3a__quotes">
            {data.quotes.items.map((q) => (
              <blockquote
                key={q.id}
                className={`listen-m3a__quote listen-m3a__quote--${q.color}`}
              >
                <p>{q.text}</p>
                <footer>{q.attribution}</footer>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="listen-m3a__panel">
          <h2 className="listen-m3a__h">{data.preview.heading}</h2>
          <p className="listen-m3a__instr">
            <span className="write-m2a__badge">{data.preview.badge}</span>
            {data.preview.instruction}
          </p>
          <p className="listen-m3a__predict">{data.preview.predictCue}</p>
          <div className="listen-m3a__qgrid">
            <article className="listen-m3a__box">
              <h3>Questions 1–2</h3>
              <p className="listen-m3a__limit">
                Complete the sentences below. Write{" "}
                <strong>NO MORE THAN TWO WORDS AND/OR A NUMBER</strong> for
                each answer.
              </p>
              <p>
                <strong>1</strong> There are <u>few</u> ________ on the{" "}
                <u>benefits</u> of meditation.
              </p>
              <p>
                <strong>2</strong> There is <u>some indication</u> that
                meditation <u>may be able to</u> <u>increase our</u> ________.
              </p>
            </article>
            <article className="listen-m3a__box">
              <h3>Questions 3–4</h3>
              <p className="listen-m3a__limit">
                Answer the questions below. Write{" "}
                <strong>NO MORE THAN THREE WORDS AND/OR A NUMBER</strong> for
                each answer.
              </p>
              <p>
                <u>In what ways</u> can meditation help us <u>physically</u>?
              </p>
              <p>
                <strong>3</strong> ________
              </p>
              <p>
                <strong>4</strong> ________
              </p>
            </article>
            <article className="listen-m3a__box">
              <h3>Questions 5–6</h3>
              <p className="listen-m3a__limit">
                Write <strong>NO MORE THAN THREE WORDS AND/OR A NUMBER</strong>{" "}
                for each answer.
              </p>
              <p>What are two indirect benefits of meditation?</p>
              <p>
                <strong>5</strong> ________
              </p>
              <p>
                <strong>6</strong> ________
              </p>
            </article>
            <article className="listen-m3a__box">
              <h3>Questions 7–9</h3>
              <p className="listen-m3a__limit">
                Complete the sentences below. Write{" "}
                <strong>NO MORE THAN TWO WORDS AND/OR A NUMBER</strong> for
                each answer.
              </p>
              <p>
                <strong>7</strong> A lot of research has been done in the area
                of meditation and ________.
              </p>
              <p>
                <strong>8</strong> ________ of daily meditation can improve a
                person’s mental well-being.
              </p>
              <p>
                <strong>9</strong> In most cases, meditation should not be a
                replacement for ________.
              </p>
            </article>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="listen-m3a__panel">
          <p className="listen-m3a__instr">
            <span className="write-m2a__badge">{data.analyse.badge}</span>
            {data.analyse.instruction}
          </p>
          <ol className="listen-m3a__analyse">
            {data.analyse.items.map((item, i) => (
              <li key={item}>
                <p>{item}</p>
                {showTips && (
                  <p className="listen-m3a__tip">→ {data.analyse.tips[i]}</p>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      {step === 3 && (
        <section className="listen-m3a__panel">
          <p className="listen-m3a__instr">
            <span className="write-m2a__badge">{data.match.badge}</span>
            {data.match.instruction}
          </p>
          <div className="listen-m3a__bank">
            {data.match.bank.map((w) => {
              const isUsed = used.has(w);
              return (
                <button
                  key={w}
                  type="button"
                  className={`pr-chip ${picked === w ? "pr-chip--picked" : ""} ${isUsed ? "pr-chip--used" : ""}`}
                  disabled={checked || isUsed}
                  onClick={() => setPicked(w)}
                >
                  {w}
                </button>
              );
            })}
          </div>
          <ul className="listen-m3a__targets">
            {data.match.targets.map((t) => {
              const val = match[t.id];
              const ok = val === t.key || t.also.includes(val);
              let cls = "listen-m3a__slot";
              if (val) cls += " listen-m3a__slot--filled";
              if (picked && !val) cls += " listen-m3a__slot--ready";
              if (checked) cls += ok ? " listen-m3a__slot--ok" : " listen-m3a__slot--bad";
              return (
                <li key={t.id}>
                  <u>{t.label}</u>
                  <button
                    type="button"
                    className={cls}
                    disabled={checked}
                    onClick={() => place(t.id)}
                  >
                    {val ?? "________"}
                  </button>
                  {checked && !ok && (
                    <span className="inline-gap-bad"> → {t.key}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 4 && (
        <section className="listen-m3a__panel">
          <h2 className="listen-m3a__h">{data.exam.heading}</h2>
          <p className="write-m2a__expert">{data.exam.strategies}</p>
          <p className="listen-m3a__instr">
            <span className="write-m2a__badge">{data.exam.badge}</span>
            {data.exam.instruction}
          </p>
          <p className="listen-m3a__audio-note">{data.exam.audioNote}</p>
          <div className="listen-m3a__exam">
            <article className="listen-m3a__box">
              <h3>Questions 1–2</h3>
              <p>
                <strong>1</strong> There are <u>few</u> <Gap id={1} /> on the{" "}
                <u>benefits</u> of meditation.
              </p>
              <p>
                <strong>2</strong> There is <u>some indication</u> that
                meditation <u>may be able to</u> <u>increase our</u>{" "}
                <Gap id={2} />.
              </p>
            </article>
            <article className="listen-m3a__box">
              <h3>Questions 3–4</h3>
              <p>
                <u>In what ways</u> can meditation help us <u>physically</u>?
              </p>
              <p>
                <strong>3</strong> <Gap id={3} />
              </p>
              <p>
                <strong>4</strong> <Gap id={4} />
              </p>
            </article>
            <article className="listen-m3a__box">
              <h3>Questions 5–6</h3>
              <p>What are two indirect benefits of meditation?</p>
              <p>
                <strong>5</strong> <Gap id={5} />
              </p>
              <p>
                <strong>6</strong> <Gap id={6} />
              </p>
            </article>
            <article className="listen-m3a__box">
              <h3>Questions 7–9</h3>
              <p>
                <strong>7</strong> A lot of research has been done in the area
                of meditation and <Gap id={7} />.
              </p>
              <p>
                <strong>8</strong> <Gap id={8} /> of daily meditation can
                improve a person’s mental well-being.
              </p>
              <p>
                <strong>9</strong> In most cases, meditation should not be a
                replacement for <Gap id={9} />.
              </p>
            </article>
          </div>
        </section>
      )}

      {step === 5 && (
        <section className="listen-m3a__panel">
          <h2 className="listen-m3a__h">{data.analysis.heading}</h2>
          <p className="listen-m3a__instr">
            <span className="write-m2a__badge">{data.analysis.badge}</span>
            {data.analysis.a}
          </p>
          <p className="listen-m3a__instr">
            <span className="write-m2a__badge">{data.analysis.b.badge}</span>
            {data.analysis.b.instruction}
          </p>
          <ol className="listen-m3a__analyse">
            {data.analysis.b.items.map((item) => (
              <li key={item}>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {step === 6 && (
        <section className="listen-m3a__panel">
          <h2 className="listen-m3a__h">{data.discussion.heading}</h2>
          <p className="listen-m3a__instr">
            <span className="write-m2a__badge">{data.discussion.badge}</span>
            {data.discussion.instruction}
          </p>
          <p className="write-m2a__cue">Discuss with a partner</p>
        </section>
      )}

      <div
        className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}
      >
        <button type="button" className="flow-footer__btn" onClick={goPrev}>
          ← Назад
        </button>
        {checked && needsCheck ? (
          <span className="flow-footer__result">
            <span className="flow-footer__ok">✓ {matchScore}</span>
            <span className="flow-footer__bad">
              ✗ {data.match.targets.length - matchScore}
            </span>
          </span>
        ) : (
          <span className="flow-footer__step">
            {step + 1} / {LISTEN_M3A_STEPS.length}
          </span>
        )}
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={goNext}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
