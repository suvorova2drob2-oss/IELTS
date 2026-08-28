import { useEffect, useState } from "react";
import {
  LANG_M1B_STEPS,
  checkTrendForm,
  isLangM1bChoiceGap,
  languageM1b,
  sameLangChoice,
  type TrendCol,
} from "../data/languageM1b";
import { PeakStudyTimesGraph } from "./PeakStudyTimesGraph";

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, LANG_M1B_STEPS.length - 1));
}

export function LanguageFlowTrainer({
  onBack,
  restart,
  initialStep,
}: {
  onBack?: () => void;
  restart?: boolean;
  initialStep?: number;
}) {
  const data = languageM1b;
  const [step, setStep] = useState(() => clampStep(initialStep));
  const [checked, setChecked] = useState(false);
  const [values, setValues] = useState<Record<number, string>>({});
  const [placed, setPlaced] = useState<Record<string, TrendCol | "">>({});
  const [picked, setPicked] = useState<string | null>(null);
  const [choices, setChoices] = useState<Record<number, string>>({});
  const [fixes, setFixes] = useState<Record<number, string>>({});

  const resetAll = (nextStep: number) => {
    setChecked(false);
    setValues({});
    setPlaced({});
    setPicked(null);
    setChoices({});
    setFixes({});
    setStep(nextStep);
  };

  useEffect(() => {
    if (restart) {
      resetAll(clampStep(initialStep));
      return;
    }
    if (initialStep != null) {
      resetAll(clampStep(initialStep));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restart, initialStep]);

  const choiceGaps = data.stepC.parts.filter(isLangM1bChoiceGap);
  const tableScore = data.table.words.filter(
    (w) => placed[w.id] === w.key,
  ).length;
  const fixScore = data.step2b.items.filter((item) =>
    checkTrendForm(fixes[item.id] ?? "", item.answers),
  ).length;
  const formScore = data.items.filter((item) =>
    checkTrendForm(values[item.id] ?? "", item.answers),
  ).length;
  const choiceScore = choiceGaps.filter((g) =>
    sameLangChoice(choices[g.gap] ?? "", g.key),
  ).length;

  const score =
    step === 0
      ? tableScore
      : step === 1
        ? fixScore
        : step === 2
          ? formScore
          : choiceScore;
  const total =
    step === 0
      ? data.table.words.length
      : step === 1
        ? data.step2b.items.length
        : step === 2
          ? data.items.length
          : choiceGaps.length;

  const unplaced = data.table.words.filter((w) => !placed[w.id]);

  const place = (col: TrendCol) => {
    if (checked || !picked) return;
    setPlaced((x) => ({ ...x, [picked]: col }));
    setPicked(null);
  };

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (!checked) {
      setChecked(true);
      return;
    }
    if (step >= LANG_M1B_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((s) => s + 1);
  };

  const nextLabel = !checked
    ? "Check answers →"
    : step >= LANG_M1B_STEPS.length - 1
      ? "← К модулю"
      : `Continue → ${LANG_M1B_STEPS[step + 1]}`;

  return (
    <div className="app-shell reading-flow reading-flow--viewport language-flow">
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
          Language · {data.bookPages}
        </span>
      </div>

      <p className="flow-progress__label writing-flow__step">
        Step {step + 1}/{LANG_M1B_STEPS.length}:{" "}
        <strong>{LANG_M1B_STEPS[step]}</strong>
      </p>

      {step === 0 && (
        <div className="trend-table">
          <header className="trend-table__top">
            <h2 className="trend-table__title">{data.table.heading}</h2>
            <p className="language-flow__instruction trend-table__instr">
              {data.table.instruction}
            </p>
            <p className="trend-table__hint">
              Click a word, then click a column heading.
            </p>
          </header>
          <div className="trend-table__bank">
            {unplaced.map((w) => (
              <button
                key={w.id}
                type="button"
                className={picked === w.id ? "active" : ""}
                disabled={checked}
                onClick={() =>
                  setPicked((p) => (p === w.id ? null : w.id))
                }
              >
                {w.id}
              </button>
            ))}
            {unplaced.length === 0 && (
              <span className="trend-table__bank-empty">All words placed</span>
            )}
          </div>
          <div
            className={`trend-table__cols ${picked ? "trend-table__cols--ready" : ""}`}
          >
            {data.table.columns.map((col) => (
              <section key={col.id}>
                <button
                  type="button"
                  className="trend-table__head"
                  disabled={checked || !picked}
                  onClick={() => place(col.id)}
                >
                  {col.label}
                </button>
                <div className="trend-table__cells">
                  {data.table.words
                    .filter((w) => placed[w.id] === col.id)
                    .map((w) => {
                      const ok = checked && w.key === col.id;
                      const bad = checked && w.key !== col.id;
                      return (
                        <button
                          key={w.id}
                          type="button"
                          className={[
                            ok ? "writing-flow__opt--ok" : "",
                            bad ? "writing-flow__opt--bad" : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          disabled={checked}
                          onClick={() =>
                            setPlaced((x) => ({ ...x, [w.id]: "" }))
                          }
                        >
                          {w.id}
                        </button>
                      );
                    })}
                </div>
              </section>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <section className="language-flow__errors">
          <p className="language-flow__instruction">
            {data.step2b.instruction}
          </p>
          <div className="language-flow__errors-split">
            <div className="language-flow__errors-graph">
              <PeakStudyTimesGraph compact />
            </div>
            <ol className="language-flow__errors-list">
              {data.step2b.items.map((item) => {
                const sel = fixes[item.id];
                const ok =
                  checked && checkTrendForm(sel ?? "", item.answers);
                const bad = checked && !ok;
                return (
                  <li key={item.id} className="language-flow__errors-item">
                    <span className="language-flow__num">{item.id}</span>
                    <div>
                      <p>
                        {item.before}
                        <span
                          className={`language-flow__err ${sel ? "language-flow__err--fixed" : ""} ${ok ? "language-flow__err--ok" : ""} ${bad ? "language-flow__err--bad" : ""}`}
                        >
                          {sel ?? item.error}
                        </span>
                        {item.after}
                      </p>
                      <div className="language-flow__fix-opts">
                        {item.options.map((opt) => {
                          let state = "";
                          if (checked) {
                            if (item.answers.includes(opt) && sel === opt)
                              state = "pr-chip--ok";
                            else if (sel === opt) state = "pr-chip--bad";
                            else if (item.answers.includes(opt))
                              state = "pr-chip--ok";
                          } else if (sel === opt) {
                            state = "pr-chip--picked";
                          }
                          return (
                            <button
                              key={opt}
                              type="button"
                              className={`pr-chip ${state}`}
                              disabled={checked}
                              onClick={() =>
                                setFixes((f) => ({ ...f, [item.id]: opt }))
                              }
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
          {checked && (
            <p className="pr-endings-panel__tip language-flow__tip">
              {data.step2b.tip}
            </p>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="language-flow__forms">
          <p className="language-flow__instruction">{data.instruction}</p>
          <ol className="language-flow__list language-flow__list--grid">
            {data.items.map((item) => {
              const val = values[item.id] ?? "";
              const ok = checked && checkTrendForm(val, item.answers);
              const bad = checked && !ok;
              return (
                <li key={item.id} className="language-flow__item">
                  <span className="language-flow__num">{item.id}</span>
                  <div>
                    <p>
                      {item.before}
                      <span
                        className={`inline-gap-wrap ${ok ? "inline-gap-wrap--ok" : ""} ${bad ? "inline-gap-wrap--bad" : ""}`}
                      >
                        <input
                          className={`inline-gap-input ${ok ? "inline-gap-input--ok" : ""} ${bad ? "inline-gap-input--bad" : ""}`}
                          value={val}
                          disabled={checked}
                          placeholder={item.verb}
                          onChange={(e) =>
                            setValues((x) => ({
                              ...x,
                              [item.id]: e.target.value,
                            }))
                          }
                        />
                      </span>
                      {item.after}
                      <em className="language-flow__verb"> ({item.verb})</em>
                    </p>
                    {checked && (
                      <p className="line-hint">
                        {ok ? "✓ " : `→ ${item.answers[0]} · `}
                        {item.tip}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {step === 3 && (
        <section className="language-flow__choice">
          <p className="language-flow__instruction">
            {data.stepC.instruction}
          </p>
          <article className="language-flow__passage">
            <p>
              {data.stepC.parts.map((part, i) => {
                if (!isLangM1bChoiceGap(part)) {
                  return <span key={i}>{part.text}</span>;
                }
                const sel = choices[part.gap];
                return (
                  <span key={i} className="language-flow__italics">
                    <strong className="language-flow__gap-n">{part.gap}</strong>
                    {part.options.map((opt) => {
                      let state = "";
                      if (checked) {
                        if (sameLangChoice(opt, part.key))
                          state = "pr-chip--ok";
                        else if (sel && sameLangChoice(sel, opt))
                          state = "pr-chip--bad";
                      } else if (sel && sameLangChoice(sel, opt)) {
                        state = "pr-chip--picked";
                      }
                      return (
                        <button
                          key={opt}
                          type="button"
                          className={`pr-chip ${state}`}
                          disabled={checked}
                          onClick={() =>
                            setChoices((c) => ({ ...c, [part.gap]: opt }))
                          }
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </span>
                );
              })}
            </p>
          </article>
          {checked && (
            <p className="pr-endings-panel__tip language-flow__tip">
              {data.stepC.tip}
            </p>
          )}
        </section>
      )}

      <footer
        className={`flow-footer ${checked ? "flow-footer--checked" : ""}`}
      >
        <button
          type="button"
          className="flow-footer__btn"
          onClick={goPrev}
        >
          ← Back
        </button>
        <span className="flow-footer__step">{LANG_M1B_STEPS[step]}</span>
        {checked && (
          <span className="flow-footer__result">
            <span className="flow-footer__ok">{score}</span>
            {" / "}
            {total}
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
