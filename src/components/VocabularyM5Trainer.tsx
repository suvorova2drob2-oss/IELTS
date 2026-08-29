import { useEffect, useState } from "react";
import {
  VOCAB_M5_NEXT,
  VOCAB_M5_STEPS,
  vocabularyM5,
} from "../data/vocabularyM5";

const data = vocabularyM5;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, VOCAB_M5_STEPS.length - 1));
}

export function VocabularyM5Trainer({
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
  const [picked, setPicked] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showTip, setShowTip] = useState(false);
  const [weak, setWeak] = useState<string[]>([]);
  const [strong, setStrong] = useState<string[]>([]);

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setPicked(null);
    setAnswers({});
    setShowTip(false);
    setWeak([]);
    setStrong([]);
  }, [restart, initialStep]);

  const used = new Set(Object.values(answers));
  const needsCheck = step === 0 || step === 1 || step === 3 || step === 4;

  const placeWord = (id: number) => {
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

  const bank = (words: string[]) => (
    <div className="read-m3__bank">
      {words.map((w) => (
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
  );

  const gapList = (
    items: {
      id: number;
      before: string;
      after: string;
      answers: string[];
    }[],
  ) => (
    <ul className="read-m3__para-slots listen-m3b__grid">
      {items.map((it) => {
        const val = answers[it.id] ?? "";
        const ok = it.answers.includes(val);
        return (
          <li key={it.id}>
            <span>
              {it.id}. {it.before}
              <button
                type="button"
                className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                disabled={checked}
                onClick={() => placeWord(it.id)}
              >
                {val || "—"}
              </button>
              {it.after}
              {checked && !ok && (
                <span className="inline-gap-bad"> → {it.answers[0]}</span>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );

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
    if (step === 2 && !showTip) {
      setShowTip(true);
      return;
    }
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= VOCAB_M5_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTip(false);
    setAnswers({});
    setPicked(null);
    setStep((s) => s + 1);
  };

  const nextLabel =
    step === 2 && !showTip
      ? "Show tip →"
      : needsCheck && !checked
        ? "Check →"
        : VOCAB_M5_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport vocab-m3">
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
          {VOCAB_M5_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setAnswers({});
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="vocab-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.forms1a.badge}</span>
            {data.forms1a.instruction}
          </p>
          {bank(data.forms1a.bank)}
          {gapList(data.forms1a.items)}
        </section>
      )}
      {step === 1 && (
        <section className="vocab-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.complete1b.badge}</span>
            {data.complete1b.instruction}
          </p>
          {bank(data.complete1b.bank)}
          {gapList(data.complete1b.items)}
        </section>
      )}
      {step === 2 && (
        <section className="vocab-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.discuss1c.badge}</span>
            {data.discuss1c.instruction}
          </p>
          <ul className="read-m3__qs">
            {data.discuss1c.topics.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          {showTip && <p className="read-m3__tip">{data.discuss1c.tip}</p>}
        </section>
      )}
      {step === 3 && (
        <section className="vocab-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.quantity2a.badge}</span>
            {data.quantity2a.instruction}
          </p>
          {bank(data.quantity2a.bank)}
          {gapList(data.quantity2a.items)}
        </section>
      )}
      {step === 4 && (
        <section className="vocab-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.adverbs3a.badge}</span>
            {data.adverbs3a.instruction}
          </p>
          <div className="read-m3__bank">
            {data.adverbs3a.bank
              .filter((w) => !weak.includes(w) && !strong.includes(w))
              .map((w) => (
                <button
                  key={w}
                  type="button"
                  className={`pr-chip ${picked === w ? "pr-chip--picked" : ""}`}
                  disabled={checked}
                  onClick={() => setPicked(w)}
                >
                  {w}
                </button>
              ))}
          </div>
          <div className="listen-m3b__grid">
            <div>
              <h3>Weak opinion</h3>
              <button
                type="button"
                className="read-m3__slot read-m3__slot--ready"
                disabled={checked || !picked}
                onClick={() => {
                  if (!picked) return;
                  setWeak((a) => [...a, picked]);
                  setPicked(null);
                }}
              >
                Place here
              </button>
              <ul>
                {weak.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Strong opinion</h3>
              <button
                type="button"
                className="read-m3__slot read-m3__slot--ready"
                disabled={checked || !picked}
                onClick={() => {
                  if (!picked) return;
                  setStrong((a) => [...a, picked]);
                  setPicked(null);
                }}
              >
                Place here
              </button>
              <ul>
                {strong.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
          </div>
          {checked && (
            <p className="read-m3__tip">
              Weak: {data.adverbs3a.weak.join(", ")}. Strong:{" "}
              {data.adverbs3a.strong.join(", ")}.
            </p>
          )}
        </section>
      )}
      {step === 5 && (
        <section className="vocab-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.opinions3b.badge}</span>
            {data.opinions3b.instruction}
          </p>
          <ol className="read-m3__qs">
            {data.opinions3b.statements.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </section>
      )}

      <div
        className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}
      >
        <button type="button" className="flow-footer__btn" onClick={goPrev}>
          ← Назад
        </button>
        <span className="flow-footer__step">
          {step + 1} / {VOCAB_M5_STEPS.length}
        </span>
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
