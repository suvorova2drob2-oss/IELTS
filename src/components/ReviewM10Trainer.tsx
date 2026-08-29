import { useEffect, useState } from "react";
import {
  REVIEW_M10_NEXT,
  REVIEW_M10_STEPS,
  reviewM10,
} from "../data/reviewM10";

const data = reviewM10;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, REVIEW_M10_STEPS.length - 1));
}

export function ReviewM10Trainer({
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
  const [showModel, setShowModel] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setShowModel(false);
    setPicked(null);
    setAnswers({});
  }, [restart, initialStep]);

  const used = new Set(Object.values(answers));
  const needsCheck = step === 0 || step === 1 || step === 2 || step === 3;

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

  const gapBlock = (
    bank: string[],
    items: { id: number; before: string; after: string; answers: string[] }[],
  ) => (
    <>
      <div className="read-m3__bank">
        {bank.map((w, i) => (
          <button
            key={`${w}-${i}`}
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
        {items.map((it) => {
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
    </>
  );

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowModel(false);
    setAnswers({});
    setPicked(null);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if ((step === 4 || step === 5) && !showModel) {
      setShowModel(true);
      return;
    }
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= REVIEW_M10_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowModel(false);
    setAnswers({});
    setPicked(null);
    setStep((s) => s + 1);
  };

  const nextLabel =
    (step === 4 || step === 5) && !showModel
      ? "Show models →"
      : needsCheck && !checked
        ? "Check →"
        : REVIEW_M10_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport review-m2">
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
          {REVIEW_M10_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setAnswers({});
                setShowModel(false);
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
            <span className="write-m2a__badge">{data.vocab1a.badge}</span>
            {data.vocab1a.instruction}
          </p>
          {gapBlock(data.vocab1a.bank, data.vocab1a.items)}
        </section>
      )}

      {step === 1 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.thereIt1b.badge}</span>
            {data.thereIt1b.instruction}
          </p>
          {gapBlock(data.thereIt1b.bank, data.thereIt1b.items)}
        </section>
      )}

      {step === 2 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.match1c.badge}</span>
            {data.match1c.instruction}
          </p>
          <div className="read-m3__bank">
            {data.match1c.bank.map((b) => (
              <button
                key={b.id}
                type="button"
                className={`pr-chip ${picked === b.id ? "pr-chip--picked" : ""} ${used.has(b.id) ? "pr-chip--used" : ""}`}
                disabled={checked || used.has(b.id)}
                onClick={() => setPicked(b.id)}
              >
                {b.id}
              </button>
            ))}
          </div>
          <ul className="read-m3__para-slots listen-m3b__grid">
            {data.match1c.items.map((it) => {
              const val = answers[it.id] ?? "";
              const ok = val === it.key;
              return (
                <li key={it.id}>
                  {it.id}. {it.text}{" "}
                  <button
                    type="button"
                    className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                    disabled={checked}
                    onClick={() => place(it.id)}
                  >
                    {val || "—"}
                  </button>
                  {checked && !ok && (
                    <span className="inline-gap-bad"> → {it.key}</span>
                  )}
                </li>
              );
            })}
          </ul>
          {checked && <p className="read-m3__tip">{data.match1c.tip}</p>}
        </section>
      )}

      {step === 3 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.linking2a.badge}</span>
            {data.linking2a.instruction}
          </p>
          {gapBlock(data.linking2a.bank, data.linking2a.items)}
        </section>
      )}

      {step === 4 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.cleft2b.badge}</span>
            {data.cleft2b.instruction}
          </p>
          <ul className="read-m3__qs">
            {data.cleft2b.items.map((it) => (
              <li key={it.id}>
                <strong>{it.id}.</strong> {it.stem}
                {showModel && <p className="read-m3__tip">{it.model}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {step === 5 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.cleft2c.badge}</span>
            {data.cleft2c.instruction}
          </p>
          <ul className="read-m3__qs">
            {data.cleft2c.items.map((it) => (
              <li key={it.id}>
                <strong>{it.id}.</strong> {it.stem}
                {showModel && <p className="read-m3__tip">{it.model}</p>}
              </li>
            ))}
          </ul>
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
