import { useEffect, useState } from "react";
import {
  checkReviewM3,
  isReviewM3Gap,
  REVIEW_M3_NEXT,
  REVIEW_M3_STEPS,
  reviewM3,
} from "../data/reviewM3";

const data = reviewM3;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, REVIEW_M3_STEPS.length - 1));
}

export function ReviewM3Trainer({
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
  const [vocab, setVocab] = useState<Record<number, string>>({});
  const [picked, setPicked] = useState<string | null>(null);
  const [bankGaps, setBankGaps] = useState<Record<number, string>>({});
  const [ital, setItal] = useState<Record<number, string>>({});
  const [cond, setCond] = useState<Record<number, [string, string]>>({});
  const [passive, setPassive] = useState<Record<number, string>>({});
  const [modals, setModals] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setVocab({});
    setPicked(null);
    setBankGaps({});
    setItal({});
    setCond({});
    setPassive({});
    setModals({});
  }, [restart, initialStep]);

  const bankGapBits = data.vocab1b.parts.filter(isReviewM3Gap);
  const vocabScore = data.vocab1a.items.filter((it) =>
    checkReviewM3(vocab[it.id] ?? "", it.answers),
  ).length;
  const bankScore = bankGapBits.filter((g) =>
    checkReviewM3(bankGaps[g.gap] ?? "", g.options),
  ).length;
  const italScore = data.vocab1c.items.filter(
    (it) => ital[it.id] === it.key,
  ).length;
  const condScore = data.conditionals.items.filter((it) => {
    const pair = cond[it.id] ?? ["", ""];
    return (
      checkReviewM3(pair[0], [it.answers[0]]) &&
      checkReviewM3(pair[1], [it.answers[1]])
    );
  }).length;
  const passiveScore = data.passive.items.filter((it) =>
    checkReviewM3(passive[it.id] ?? "", it.answers),
  ).length;
  const modalScore = data.modals.items.filter(
    (it) => modals[it.id] === it.key,
  ).length;

  const usedBank = new Set(Object.values(bankGaps));

  const score =
    step === 0
      ? vocabScore
      : step === 1
        ? bankScore + italScore
        : step === 2
          ? condScore
          : passiveScore + modalScore;
  const total =
    step === 0
      ? data.vocab1a.items.length
      : step === 1
        ? bankGapBits.length + data.vocab1c.items.length
        : step === 2
          ? data.conditionals.items.length
          : data.passive.items.length + data.modals.items.length;

  const placeBank = (gap: number) => {
    if (checked) return;
    if (bankGaps[gap]) {
      setBankGaps((m) => {
        const next = { ...m };
        delete next[gap];
        return next;
      });
      return;
    }
    if (!picked) return;
    setBankGaps((m) => ({ ...m, [gap]: picked }));
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
    if (step >= REVIEW_M3_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((s) => s + 1);
  };

  return (
    <div className="app-shell reading-flow reading-flow--viewport review-flow review-m2">
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
          {REVIEW_M3_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="review-m2__panel">
          <p className="language-flow__instruction">
            <span className="write-m2a__badge">{data.vocab1a.badge}</span>{" "}
            {data.vocab1a.instruction}
          </p>
          <ol className="review-m2__passive">
            {data.vocab1a.items.map((it) => {
              const val = vocab[it.id] ?? "";
              const ok = checkReviewM3(val, it.answers);
              return (
                <li key={it.id}>
                  <p>
                    <strong>{it.id}.</strong>{" "}
                    {it.stem.split("______")[0]}
                    <span
                      className={`inline-gap-wrap ${checked && ok ? "inline-gap-wrap--ok" : ""} ${checked && !ok ? "inline-gap-wrap--bad" : ""}`}
                    >
                      <input
                        className={`inline-gap-input ${checked && ok ? "inline-gap-input--ok" : ""} ${checked && !ok ? "inline-gap-input--bad" : ""}`}
                        value={val}
                        disabled={checked}
                        onChange={(e) =>
                          setVocab((v) => ({ ...v, [it.id]: e.target.value }))
                        }
                      />
                      {checked && !ok && (
                        <span className="inline-gap-bad">
                          {" "}
                          → {it.answers[0]}
                        </span>
                      )}
                    </span>
                    {it.stem.split("______")[1] ?? ""}
                  </p>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {step === 1 && (
        <section className="review-m2__panel">
          <p className="language-flow__instruction">
            <span className="write-m2a__badge">{data.vocab1b.badge}</span>{" "}
            {data.vocab1b.instruction}
          </p>
          <div className="review-m2__bank">
            {data.vocab1b.bank.map((w) => {
              const used = usedBank.has(w);
              return (
                <button
                  key={w}
                  type="button"
                  className={`pr-chip ${picked === w ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPicked(w)}
                >
                  {w}
                </button>
              );
            })}
          </div>
          <article className="review-m2__passage">
            <p>
              {data.vocab1b.parts.map((part, i) => {
                if (!isReviewM3Gap(part)) {
                  return <span key={i}>{part.text}</span>;
                }
                const val = bankGaps[part.gap];
                const ok = checkReviewM3(val ?? "", part.options);
                let cls = "review-m2__slot";
                if (val) cls += " review-m2__slot--filled";
                if (picked && !val) cls += " review-m2__slot--ready";
                if (checked)
                  cls += ok ? " review-m2__slot--ok" : " review-m2__slot--bad";
                return (
                  <button
                    key={i}
                    type="button"
                    className={cls}
                    disabled={checked}
                    onClick={() => placeBank(part.gap)}
                  >
                    <strong>{part.gap}</strong>
                    {val ? ` ${val}` : " ______"}
                  </button>
                );
              })}
            </p>
          </article>

          <p className="language-flow__instruction">
            <span className="write-m2a__badge">{data.vocab1c.badge}</span>{" "}
            {data.vocab1c.instruction}
          </p>
          <ol className="review-m2__mc">
            {data.vocab1c.items.map((it) => {
              const chosen = ital[it.id];
              const [before, after] = it.stem.split("______");
              return (
                <li key={it.id}>
                  <p>
                    <strong>{it.id}.</strong> {before}
                    <span className="review-m2__gap">
                      {it.options.map((opt) => {
                        let state = "";
                        if (checked) {
                          if (opt === it.key) state = "pr-chip--ok";
                          else if (chosen === opt) state = "pr-chip--bad";
                        } else if (chosen === opt) state = "pr-chip--picked";
                        return (
                          <button
                            key={opt}
                            type="button"
                            className={`pr-chip ${state}`}
                            disabled={checked}
                            onClick={() =>
                              setItal((a) => ({ ...a, [it.id]: opt }))
                            }
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </span>
                    {after}
                  </p>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {step === 2 && (
        <section className="review-m2__panel">
          <p className="language-flow__instruction">
            <span className="write-m2a__badge">{data.conditionals.badge}</span>{" "}
            {data.conditionals.instruction}
          </p>
          <ol className="review-m2__passive">
            {data.conditionals.items.map((it) => {
              const pair = cond[it.id] ?? ["", ""];
              const ok0 = checkReviewM3(pair[0], [it.answers[0]]);
              const ok1 = checkReviewM3(pair[1], [it.answers[1]]);
              return (
                <li key={it.id}>
                  <p>
                    <strong>{it.id}.</strong> {it.before}
                    <span
                      className={`inline-gap-wrap ${checked && ok0 ? "inline-gap-wrap--ok" : ""} ${checked && !ok0 ? "inline-gap-wrap--bad" : ""}`}
                    >
                      <input
                        className={`inline-gap-input ${checked && ok0 ? "inline-gap-input--ok" : ""} ${checked && !ok0 ? "inline-gap-input--bad" : ""}`}
                        value={pair[0]}
                        disabled={checked}
                        onChange={(e) =>
                          setCond((c) => ({
                            ...c,
                            [it.id]: [e.target.value, pair[1]],
                          }))
                        }
                      />
                      {checked && !ok0 && (
                        <span className="inline-gap-bad">
                          {" "}
                          → {it.answers[0]}
                        </span>
                      )}
                    </span>
                    {it.mid}
                    <span
                      className={`inline-gap-wrap ${checked && ok1 ? "inline-gap-wrap--ok" : ""} ${checked && !ok1 ? "inline-gap-wrap--bad" : ""}`}
                    >
                      <input
                        className={`inline-gap-input ${checked && ok1 ? "inline-gap-input--ok" : ""} ${checked && !ok1 ? "inline-gap-input--bad" : ""}`}
                        value={pair[1]}
                        disabled={checked}
                        onChange={(e) =>
                          setCond((c) => ({
                            ...c,
                            [it.id]: [pair[0], e.target.value],
                          }))
                        }
                      />
                      {checked && !ok1 && (
                        <span className="inline-gap-bad">
                          {" "}
                          → {it.answers[1]}
                        </span>
                      )}
                    </span>
                    {it.after}
                  </p>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {step === 3 && (
        <section className="review-m2__panel">
          <p className="language-flow__instruction">
            <span className="write-m2a__badge">{data.passive.badge}</span>{" "}
            {data.passive.instruction}
          </p>
          <ol className="review-m2__passive">
            {data.passive.items.map((it) => {
              const val = passive[it.id] ?? "";
              const ok = checkReviewM3(val, it.answers);
              return (
                <li key={it.id}>
                  <p>
                    <strong>{it.id}.</strong> {it.stem}
                  </p>
                  <span
                    className={`inline-gap-wrap ${checked && ok ? "inline-gap-wrap--ok" : ""} ${checked && !ok ? "inline-gap-wrap--bad" : ""}`}
                  >
                    <input
                      className={`inline-gap-input ${checked && ok ? "inline-gap-input--ok" : ""} ${checked && !ok ? "inline-gap-input--bad" : ""}`}
                      value={val}
                      disabled={checked}
                      placeholder="modal passive…"
                      onChange={(e) =>
                        setPassive((p) => ({
                          ...p,
                          [it.id]: e.target.value,
                        }))
                      }
                    />
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
          </ol>

          <p className="language-flow__instruction">
            <span className="write-m2a__badge">{data.modals.badge}</span>{" "}
            {data.modals.instruction}
          </p>
          <ol className="review-m2__mc">
            {data.modals.items.map((it) => {
              const chosen = modals[it.id];
              return (
                <li key={it.id}>
                  <p>
                    <strong>{it.id}.</strong>{" "}
                    {it.parts.map((part, i) => {
                      if (!("gap" in part) || !part.gap) {
                        return <span key={i}>{part.text}</span>;
                      }
                      return (
                        <span key={i} className="review-m2__gap">
                          {it.options.map((opt) => {
                            let state = "";
                            if (checked) {
                              if (opt === it.key) state = "pr-chip--ok";
                              else if (chosen === opt) state = "pr-chip--bad";
                            } else if (chosen === opt)
                              state = "pr-chip--picked";
                            return (
                              <button
                                key={opt}
                                type="button"
                                className={`pr-chip ${state}`}
                                disabled={checked}
                                onClick={() =>
                                  setModals((m) => ({
                                    ...m,
                                    [it.id]: opt,
                                  }))
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
                </li>
              );
            })}
          </ol>
        </section>
      )}

      <div className={`flow-footer ${checked ? "flow-footer--checked" : ""}`}>
        <button type="button" className="flow-footer__btn" onClick={goPrev}>
          ← Назад
        </button>
        {checked ? (
          <span className="flow-footer__result">
            <span className="flow-footer__ok">✓ {score}</span>
            <span className="flow-footer__bad">✗ {total - score}</span>
          </span>
        ) : (
          <span className="flow-footer__step">
            {step + 1} / {REVIEW_M3_STEPS.length}
          </span>
        )}
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={goNext}
        >
          {checked ? REVIEW_M3_NEXT[step] : "Check →"}
        </button>
      </div>
    </div>
  );
}
