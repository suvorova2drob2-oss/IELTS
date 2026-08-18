import { useEffect, useState } from "react";
import {
  LANG_M1B_STEPS,
  checkTrendForm,
  languageM1b,
  type TrendCol,
} from "../data/languageM1b";

export function LanguageFlowTrainer({
  onBack,
  initialStep,
}: {
  onBack?: () => void;
  restart?: boolean;
  initialStep?: number;
}) {
  const data = languageM1b;
  const [step, setStep] = useState(() =>
    initialStep === 1 ? 1 : 0,
  );
  const [checked, setChecked] = useState(false);
  const [values, setValues] = useState<Record<number, string>>({});
  const [placed, setPlaced] = useState<Record<string, TrendCol | "">>({});
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    if (initialStep === 0 || initialStep === 1) {
      setStep(initialStep);
      setChecked(false);
    }
  }, [initialStep]);

  const tableScore = data.table.words.filter(
    (w) => placed[w.id] === w.key,
  ).length;
  const formScore = data.items.filter((item) =>
    checkTrendForm(values[item.id] ?? "", item.answers),
  ).length;
  const score = step === 0 ? tableScore : formScore;
  const total = step === 0 ? data.table.words.length : data.items.length;

  const unplaced = data.table.words.filter((w) => !placed[w.id]);

  const place = (col: TrendCol) => {
    if (checked || !picked) return;
    setPlaced((x) => ({ ...x, [picked]: col }));
    setPicked(null);
  };

  const goNext = () => {
    if (!checked) {
      setChecked(true);
      return;
    }
    if (step >= 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setPicked(null);
    setStep(1);
  };

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
        Step {step + 1}/2: <strong>{LANG_M1B_STEPS[step]}</strong>
      </p>

      {step === 0 && (
        <div className="trend-table">
          <p className="language-flow__instruction">
            {data.table.instruction}
          </p>
          <p className="trend-table__hint">
            Click a word, then click a column.
          </p>
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
          </div>
          <div className="trend-table__cols">
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
        <>
          <div className="language-flow__cues">
            {data.tenseCues.map((c) => (
              <p key={c.marker}>
                <strong>{c.marker}</strong>
                <span>{c.tense}</span>
              </p>
            ))}
          </div>
          <p className="language-flow__instruction">{data.instruction}</p>
          <ol className="language-flow__list">
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
        </>
      )}

      <footer
        className={`flow-footer ${checked ? "flow-footer--checked" : ""}`}
      >
        <button
          type="button"
          className="flow-footer__btn"
          onClick={() => {
            if (step === 0) {
              onBack?.();
              return;
            }
            setChecked(false);
            setStep(0);
          }}
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
          {!checked
            ? "Check answers →"
            : step >= 1
              ? "← К модулю"
              : "Continue → b Verb forms"}
        </button>
      </footer>
    </div>
  );
}
