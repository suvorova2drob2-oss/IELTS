import { useEffect, useState } from "react";
import {
  checkReviewM5,
  REVIEW_M5_NEXT,
  REVIEW_M5_STEPS,
  reviewM5,
} from "../data/reviewM5";

const data = reviewM5;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, REVIEW_M5_STEPS.length - 1));
}

export function ReviewM5Trainer({
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

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setPicked(null);
    setAnswers({});
  }, [restart, initialStep]);

  const used = new Set(Object.values(answers));
  const needsCheck = step !== 4;

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

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setAnswers({});
    setPicked(null);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= REVIEW_M5_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setAnswers({});
    setPicked(null);
    setStep((s) => s + 1);
  };

  const nextLabel =
    needsCheck && !checked ? "Check →" : REVIEW_M5_NEXT[step];

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
          {REVIEW_M5_STEPS.map((label, i) => (
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
        <section className="review-m2__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.vocab1a.badge}</span>
            {data.vocab1a.instruction}
          </p>
          <div className="read-m3__bank">
            {data.vocab1a.bank.map((bw) => (
              <button
                key={bw}
                type="button"
                className={`pr-chip ${picked === bw ? "pr-chip--picked" : ""} ${used.has(bw) ? "pr-chip--used" : ""}`}
                disabled={checked || used.has(bw)}
                onClick={() => setPicked(bw)}
              >
                {bw}
              </button>
            ))}
          </div>
          <ul className="read-m3__para-slots listen-m3b__grid">
            {data.vocab1a.items.map((it) => {
              const val = answers[it.id] ?? "";
              const ok = checkReviewM5(val, it.answers);
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
                      <span className="inline-gap-bad">
                        {" "}
                        → {it.answers[0]}
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}
      {step === 1 && (
        <section className="review-m2__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.strength1b.badge}</span>
            {data.strength1b.instruction}
          </p>
          <div className="read-m3__bank">
            {["S", "W"].map((L) => (
              <button
                key={L}
                type="button"
                className={`pr-chip ${picked === L ? "pr-chip--picked" : ""}`}
                disabled={checked}
                onClick={() => setPicked(L)}
              >
                {L}
              </button>
            ))}
          </div>
          <ul className="read-m3__para-slots listen-m3b__grid">
            {data.strength1b.items.map((it) => {
              const val = answers[it.id] ?? "";
              const ok = val === it.key;
              return (
                <li key={it.id}>
                  <span>
                    {it.id}. {it.text}
                  </span>
                  <button
                    type="button"
                    className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                    disabled={checked}
                    onClick={() => placeWord(it.id)}
                  >
                    {val || "—"}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}
      {step === 2 && (
        <section className="review-m2__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.phrases1c.badge}</span>
            {data.phrases1c.instruction}
          </p>
          <ul className="read-m3__para-slots">
            {data.phrases1c.items.map((it) => {
              const val = answers[it.id] ?? "";
              const ok = checkReviewM5(val, it.answers);
              return (
                <li key={it.id}>
                  <span>
                    {it.id}. {it.stem}
                  </span>
                  <input
                    className={`inline-gap-input ${checked ? (ok ? "inline-gap-input--ok" : "inline-gap-input--bad") : ""}`}
                    value={val}
                    disabled={checked}
                    onChange={(e) =>
                      setAnswers((m) => ({ ...m, [it.id]: e.target.value }))
                    }
                  />
                  {checked && !ok && (
                    <span className="inline-gap-bad"> → {it.answers[0]}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}
      {step === 3 && (
        <section className="review-m2__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.match1d.badge}</span>
            {data.match1d.instruction}
          </p>
          <div className="read-m3__bank">
            {["A", "B", "C", "D"].map((L) => (
              <button
                key={L}
                type="button"
                className={`pr-chip ${picked === L ? "pr-chip--picked" : ""}`}
                disabled={checked}
                onClick={() => setPicked(L)}
              >
                {L}
              </button>
            ))}
          </div>
          <ul className="read-m3__para-slots">
            {data.match1d.items.map((it) => {
              const val = answers[it.id] ?? "";
              const ok = val === it.key;
              return (
                <li key={it.id}>
                  <span>
                    {it.id}. {it.text}
                  </span>
                  <button
                    type="button"
                    className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                    disabled={checked}
                    onClick={() => placeWord(it.id)}
                  >
                    {val || "—"}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}
      {step === 4 && (
        <section className="review-m2__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.reported2a.badge}</span>
            {data.reported2a.instruction}
          </p>
          <ul className="read-m3__para-slots">
            {data.reported2a.items.map((it) => (
              <li key={it.id}>
                <strong>{it.id}.</strong> {it.stem}
                <p className="read-m3__tip">{it.answers[0]}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
      {step === 5 && (
        <section className="review-m2__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.structures2b.badge}</span>
            {data.structures2b.instruction}
          </p>
          <div className="read-m3__bank">
            {["A", "B"].map((L) => (
              <button
                key={L}
                type="button"
                className={`pr-chip ${picked === L ? "pr-chip--picked" : ""}`}
                disabled={checked}
                onClick={() => setPicked(L)}
              >
                {L}
              </button>
            ))}
          </div>
          <ul className="read-m3__para-slots listen-m3b__grid">
            {data.structures2b.items.map((it) => {
              const val = answers[it.id] ?? "";
              const ok = val === it.key;
              return (
                <li key={it.id}>
                  <span>{it.id}.</span>
                  <button
                    type="button"
                    className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                    disabled={checked}
                    onClick={() => placeWord(it.id)}
                  >
                    {val || "—"}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <div
        className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}
      >
        <button type="button" className="flow-footer__btn" onClick={goPrev}>
          ← Назад
        </button>
        <span className="flow-footer__step">
          {step + 1} / {REVIEW_M5_STEPS.length}
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
