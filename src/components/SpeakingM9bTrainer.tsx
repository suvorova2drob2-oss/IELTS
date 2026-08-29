import { useEffect, useState } from "react";
import {
  SPEAK_M9B_NEXT,
  SPEAK_M9B_STEPS,
  speakingM9b,
} from "../data/speakingM9b";

const data = speakingM9b;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, SPEAK_M9B_STEPS.length - 1));
}

export function SpeakingM9bTrainer({
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
  const [showTip, setShowTip] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [tf, setTf] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setShowTip(false);
    setPicked(null);
    setAnswers({});
    setTf({});
  }, [restart, initialStep]);

  const used = new Set(Object.values(answers));
  const needsCheck = step === 0 || step === 1;

  const place = (id: number) => {
    if (checked) return;
    if (answers[id]) {
      setAnswers((m) => {
        const next = { ...m };
        delete next[id];
        return next;
      });
      return;
    }
    if (!picked) return;
    setAnswers((m) => ({ ...m, [id]: picked }));
    setPicked(null);
  };

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTip(false);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if ((step === 2 || step === 3) && !showTip) {
      setShowTip(true);
      return;
    }
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= SPEAK_M9B_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTip(false);
    setPicked(null);
    setAnswers({});
    setTf({});
    setStep((s) => s + 1);
  };

  const nextLabel =
    (step === 2 || step === 3) && !showTip
      ? "Show tip →"
      : needsCheck && !checked
        ? "Check →"
        : SPEAK_M9B_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport speak-m3a">
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
          {SPEAK_M9B_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setShowTip(false);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.vocab1.badge}</span>
            {data.vocab1.instruction}
          </p>
          <div className="read-m3__bank">
            {data.vocab1.bank.map((w) => (
              <button
                key={w}
                type="button"
                className={`pr-chip ${picked === w ? "pr-chip--picked" : ""} ${used.has(w) ? "pr-chip--used" : ""}`}
                disabled={checked || used.has(w)}
                onClick={() => setPicked(w)}
              >
                {w}
              </button>
            ))}
          </div>
          <ul className="read-m3__para-slots listen-m3b__grid">
            {data.vocab1.items.map((it) => {
              const val = answers[it.id] ?? "";
              const ok = it.answers.includes(val);
              return (
                <li key={it.id}>
                  {it.id}. {it.before}
                  <button
                    type="button"
                    className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                    disabled={checked}
                    onClick={() => place(it.id)}
                  >
                    {val || "—"}
                  </button>
                  {it.after}
                  {checked && !ok && (
                    <span className="inline-gap-bad"> → {it.answers[0]}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 1 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.fluency2.badge}</span>
            {data.fluency2.instruction}
          </p>
          <ul className="read-m3__para-slots">
            {data.fluency2.items.map((it) => {
              const val = tf[it.id] ?? "";
              return (
                <li key={it.id}>
                  <p>
                    {it.id}. {it.text}
                  </p>
                  {(["True", "False"] as const).map((v) => {
                    const on = val === v;
                    const ok = v === it.key;
                    let cls = "";
                    if (checked) {
                      if (ok) cls = "pr-chip--ok";
                      else if (on) cls = "pr-chip--bad";
                    } else if (on) cls = "pr-chip--picked";
                    return (
                      <button
                        key={v}
                        type="button"
                        className={`pr-chip ${cls}`}
                        disabled={checked}
                        onClick={() => setTf((m) => ({ ...m, [it.id]: v }))}
                      >
                        {v}
                      </button>
                    );
                  })}
                  {checked && <p className="read-m3__tip">{it.tip}</p>}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 2 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.improve3.badge}</span>
            {data.improve3.instruction}
          </p>
          {showTip && <p className="read-m3__tip">{data.improve3.tip}</p>}
        </section>
      )}

      {step === 3 && (
        <section className="read-m3__panel">
          <p className="write-m2a__expert">{data.testStrategies}</p>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.part3.badge}</span>
            {data.part3.instruction}
          </p>
          <ol className="read-m3__qs">
            {data.part3.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
          {showTip &&
            data.part3.tips.map((t) => (
              <p key={t} className="read-m3__tip">
                {t}
              </p>
            ))}
        </section>
      )}

      {step === 4 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.assess5.badge}</span>
            {data.assess5.instruction}
          </p>
        </section>
      )}

      <footer className="flow-footer">
        <button type="button" className="btn-secondary" onClick={goPrev}>
          ← Back
        </button>
        <button type="button" className="btn-start" onClick={goNext}>
          {nextLabel}
        </button>
      </footer>
    </div>
  );
}
