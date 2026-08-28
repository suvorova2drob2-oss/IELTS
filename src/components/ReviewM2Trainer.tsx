import { useEffect, useState } from "react";
import {
  checkReviewM2Gap,
  isMarsGap,
  isReviewItalGap,
  REVIEW_M2_NEXT,
  REVIEW_M2_STEPS,
  reviewM2,
} from "../data/reviewM2";

const data = reviewM2;
const LETTERS = ["A", "B", "C"] as const;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, REVIEW_M2_STEPS.length - 1));
}

export function ReviewM2Trainer({
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
  const [mc, setMc] = useState<Record<number, number>>({});
  const [ital, setItal] = useState<Record<number, string>>({});
  const [passive, setPassive] = useState<Record<number, string>>({});
  const [picked, setPicked] = useState<string | null>(null);
  const [mars, setMars] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setMc({});
    setItal({});
    setPassive({});
    setPicked(null);
    setMars({});
  }, [restart, initialStep]);

  const italGaps = data.italics.parts.filter(isReviewItalGap);
  const mcScore = data.vocab.items.filter((it) => mc[it.id] === it.key).length;
  const italScore = italGaps.filter((g) => ital[g.gap] === g.key).length;
  const passiveScore = data.passive.items.filter((it) =>
    checkReviewM2Gap(passive[it.id] ?? "", it.answers),
  ).length;
  const marsGaps = [1, 2, 3, 4, 5];
  const marsScore = marsGaps.filter((g) =>
    checkReviewM2Gap(mars[g] ?? "", data.mars.key[g]),
  ).length;
  const usedMars = new Set(Object.values(mars));

  const score =
    step === 0
      ? mcScore
      : step === 1
        ? italScore
        : step === 2
          ? passiveScore
          : marsScore;
  const total =
    step === 0
      ? data.vocab.items.length
      : step === 1
        ? italGaps.length
        : step === 2
          ? data.passive.items.length
          : marsGaps.length;

  const placeMars = (gap: number) => {
    if (checked) return;
    if (mars[gap]) {
      setMars((m) => {
        const next = { ...m };
        delete next[gap];
        return next;
      });
      return;
    }
    if (!picked) return;
    setMars((m) => ({ ...m, [gap]: picked }));
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
    if (step >= REVIEW_M2_STEPS.length - 1) {
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
          {REVIEW_M2_STEPS.map((label, i) => (
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
            <span className="write-m2a__badge">{data.vocab.badge}</span>{" "}
            {data.vocab.instruction}
          </p>
          <ol className="review-m2__mc">
            {data.vocab.items.map((it) => {
              const chosen = mc[it.id];
              return (
                <li key={it.id}>
                  <p>
                    <strong>{it.id}.</strong> {it.stem}
                  </p>
                  <div className="review-m2__opts">
                    {it.options.map((opt, oi) => {
                      let state = "";
                      if (checked) {
                        if (oi === it.key) state = "pr-chip--ok";
                        else if (chosen === oi) state = "pr-chip--bad";
                      } else if (chosen === oi) state = "pr-chip--picked";
                      return (
                        <button
                          key={opt}
                          type="button"
                          className={`pr-chip ${state}`}
                          disabled={checked}
                          onClick={() =>
                            setMc((m) => ({ ...m, [it.id]: oi }))
                          }
                        >
                          <strong>{LETTERS[oi]}</strong> {opt}
                        </button>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {step === 1 && (
        <section className="review-m2__panel">
          <p className="language-flow__instruction">
            <span className="write-m2a__badge">{data.italics.badge}</span>{" "}
            {data.italics.instruction}
          </p>
          <article className="review-m2__passage">
            <h3>{data.italics.title}</h3>
            <p>
              {data.italics.parts.map((part, i) => {
                if (!isReviewItalGap(part)) {
                  return (
                    <span key={i}>
                      {part.text.split("\n\n").map((chunk, j, arr) => (
                        <span key={j}>
                          {chunk}
                          {j < arr.length - 1 ? (
                            <>
                              <br />
                              <br />
                            </>
                          ) : null}
                        </span>
                      ))}
                    </span>
                  );
                }
                return (
                  <span key={i} className="review-m2__gap">
                    <strong className="review-m2__n">{part.gap}</strong>
                    {part.options.map((opt) => {
                      let state = "";
                      if (checked) {
                        if (opt === part.key) state = "pr-chip--ok";
                        else if (ital[part.gap] === opt) state = "pr-chip--bad";
                      } else if (ital[part.gap] === opt) state = "pr-chip--picked";
                      return (
                        <button
                          key={opt}
                          type="button"
                          className={`pr-chip ${state}`}
                          disabled={checked}
                          onClick={() =>
                            setItal((a) => ({ ...a, [part.gap]: opt }))
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
        </section>
      )}

      {step === 2 && (
        <section className="review-m2__panel">
          <p className="language-flow__instruction">
            <span className="write-m2a__badge">{data.passive.badge}</span>{" "}
            {data.passive.instruction}
          </p>
          <ol className="review-m2__passive">
            {data.passive.items.map((it) => {
              const val = passive[it.id] ?? "";
              const ok = checkReviewM2Gap(val, it.answers);
              return (
                <li key={it.id}>
                  <p>
                    <strong>{it.id}.</strong> {it.before}
                    <span
                      className={`inline-gap-wrap ${checked && ok ? "inline-gap-wrap--ok" : ""} ${checked && !ok ? "inline-gap-wrap--bad" : ""}`}
                    >
                      <input
                        className={`inline-gap-input ${checked && ok ? "inline-gap-input--ok" : ""} ${checked && !ok ? "inline-gap-input--bad" : ""}`}
                        value={val}
                        disabled={checked}
                        placeholder={`(${it.verb})`}
                        onChange={(e) =>
                          setPassive((p) => ({ ...p, [it.id]: e.target.value }))
                        }
                      />
                      {checked && !ok && (
                        <span className="inline-gap-bad">
                          {" "}
                          → {it.answers[0]}
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
            <span className="write-m2a__badge">{data.mars.badge}</span>{" "}
            {data.mars.instruction}
          </p>
          <div className="review-m2__bank">
            {data.mars.bank.map((w) => {
              const used = usedMars.has(w);
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
            <h3>{data.mars.title}</h3>
            <p>
              {data.mars.parts.map((part, i) => {
                if (!isMarsGap(part)) {
                  return (
                    <span key={i}>
                      {part.text.split("\n\n").map((chunk, j, arr) => (
                        <span key={j}>
                          {chunk}
                          {j < arr.length - 1 ? (
                            <>
                              <br />
                              <br />
                            </>
                          ) : null}
                        </span>
                      ))}
                    </span>
                  );
                }
                const val = mars[part.gap];
                const ok = checkReviewM2Gap(val ?? "", data.mars.key[part.gap]);
                let cls = "review-m2__slot";
                if (val) cls += " review-m2__slot--filled";
                if (picked && !val) cls += " review-m2__slot--ready";
                if (checked) cls += ok ? " review-m2__slot--ok" : " review-m2__slot--bad";
                return (
                  <button
                    key={i}
                    type="button"
                    className={cls}
                    disabled={checked}
                    onClick={() => placeMars(part.gap)}
                  >
                    <strong>{part.gap}</strong>
                    {val ? ` ${val}` : " ______"}
                  </button>
                );
              })}
            </p>
            {checked && marsScore < marsGaps.length && (
              <p className="review-m2__key">
                Key: 1 {data.mars.key[1][0]} · 2 {data.mars.key[2][0]} · 3{" "}
                {data.mars.key[3][0]} · 4 {data.mars.key[4][0]} · 5{" "}
                {data.mars.key[5][0]}
              </p>
            )}
          </article>
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
            {step + 1} / {REVIEW_M2_STEPS.length}
          </span>
        )}
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={goNext}
        >
          {checked ? REVIEW_M2_NEXT[step] : "Check →"}
        </button>
      </div>
    </div>
  );
}
