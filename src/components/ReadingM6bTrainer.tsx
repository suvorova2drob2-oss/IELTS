import { useEffect, useState } from "react";
import {
  checkReadM6b,
  READ_M6B_NEXT,
  READ_M6B_STEPS,
  readingM6b,
} from "../data/readingM6b";

const data = readingM6b;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, READ_M6B_STEPS.length - 1));
}

export function ReadingM6bTrainer({
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
  const [gaps, setGaps] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setShowTip(false);
    setGaps({});
  }, [restart, initialStep]);

  const examScore = data.exam.gaps.filter((g) =>
    checkReadM6b(gaps[g.id] ?? "", g.answers),
  ).length;
  const needsCheck = step === 1;

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
    if ((step === 0 || step === 3) && !showTip) {
      setShowTip(true);
      return;
    }
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= READ_M6B_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTip(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    (step === 0 || step === 3) && !showTip
      ? "Show tip →"
      : needsCheck && !checked
        ? "Check →"
        : READ_M6B_NEXT[step];

  const passagePane = (
    <article className="read-m3__passage">
      <header className="read-m3__hero read-m3__hero--compact">
        <div>
          <h2>{data.title}</h2>
          <p className="read-m3__subtitle">{data.subtitle}</p>
        </div>
      </header>
      {data.passage.map((p) => (
        <p key={p.id}>
          <strong className="read-m3__para-id">{p.id}</strong> {p.text}
        </p>
      ))}
    </article>
  );

  return (
    <div className="app-shell reading-flow reading-flow--viewport read-m3">
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
          {READ_M6B_STEPS.map((label, i) => (
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
            <span className="write-m2a__badge">{data.beforeYouRead.badge}</span>
            {data.beforeYouRead.instruction}
          </p>
          <ol className="read-m3__qs">
            {data.beforeYouRead.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
          {showTip && <p className="read-m3__tip">{data.beforeYouRead.tip}</p>}
        </section>
      )}

      {step === 1 && (
        <section className="read-m3__split read-m3__split--exam">
          {passagePane}
          <aside className="read-m3__side read-m3__side--exam">
            <p className="write-m2a__expert">{data.exam.strategies}</p>
            <p className="read-m3__instr">
              <span className="write-m2a__badge">{data.exam.badge}</span>
              {data.exam.instruction}
            </p>
            <ul className="read-m3__para-slots">
              {data.exam.gaps.map((g) => {
                const val = gaps[g.id] ?? "";
                const ok = checkReadM6b(val, g.answers);
                return (
                  <li key={g.id}>
                    <span>
                      {g.id}. {g.before}
                      <span
                        className={`inline-gap-wrap ${checked && ok ? "inline-gap-wrap--ok" : ""} ${checked && !ok ? "inline-gap-wrap--bad" : ""}`}
                      >
                        <input
                          className={`inline-gap-input ${checked && ok ? "inline-gap-input--ok" : ""} ${checked && !ok ? "inline-gap-input--bad" : ""}`}
                          value={val}
                          disabled={checked}
                          onChange={(e) =>
                            setGaps((s) => ({ ...s, [g.id]: e.target.value }))
                          }
                        />
                        {checked && !ok && (
                          <span className="inline-gap-bad">
                            {" "}
                            → {g.answers[0]}
                          </span>
                        )}
                      </span>
                      {g.after}
                    </span>
                  </li>
                );
              })}
            </ul>
            {checked && (
              <p className="read-m3__score">
                {examScore} / {data.exam.gaps.length}
              </p>
            )}
          </aside>
        </section>
      )}

      {step === 2 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.analyse.badge}</span>
            {data.analyse.instruction}
          </p>
        </section>
      )}

      {step === 3 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.discussion.badge}</span>
            {data.discussion.instruction}
          </p>
          <ol className="read-m3__qs">
            {data.discussion.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
          {showTip && <p className="read-m3__tip">{data.discussion.tip}</p>}
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
