import { useEffect, useState } from "react";
import {
  checkReviewM4,
  isReviewM4Gap,
  REVIEW_M4_NEXT,
  REVIEW_M4_STEPS,
  reviewM4,
} from "../data/reviewM4";

const data = reviewM4;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, REVIEW_M4_STEPS.length - 1));
}

export function ReviewM4Trainer({
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
  const [match, setMatch] = useState<Record<number, string>>({});
  const [pickedLetter, setPickedLetter] = useState<string | null>(null);
  const [signGaps, setSignGaps] = useState<Record<number, string>>({});
  const [punct, setPunct] = useState<Record<number, string>>({});
  const [pronouns, setPronouns] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setVocab({});
    setPicked(null);
    setMatch({});
    setPickedLetter(null);
    setSignGaps({});
    setPunct({});
    setPronouns({});
  }, [restart, initialStep]);

  const signBits = data.signpost1c.parts.filter(isReviewM4Gap);
  const usedVocab = new Set(Object.values(vocab));
  const usedMatch = new Set(Object.values(match));
  const usedSign = new Set(Object.values(signGaps));
  const usedPron = new Set(Object.values(pronouns));

  const vocabScore = data.vocab1a.items.filter((it) =>
    checkReviewM4(vocab[it.id] ?? "", it.answers),
  ).length;
  const matchScore = data.match1b.left.filter(
    (it) => match[it.id] === data.match1b.keys[it.id],
  ).length;
  const signScore = signBits.filter((g) =>
    checkReviewM4(signGaps[g.gap] ?? "", [g.key]),
  ).length;
  const punctScore = data.punctuate2a.items.filter((it) =>
    checkReviewM4(punct[it.id] ?? "", it.answers),
  ).length;
  const pronScore = data.pronouns2b.items.filter((it) =>
    checkReviewM4(pronouns[it.id] ?? "", it.answers),
  ).length;

  const score =
    step === 0
      ? vocabScore
      : step === 1
        ? matchScore
        : step === 2
          ? signScore
          : step === 3
            ? punctScore
            : pronScore;
  const total =
    step === 0
      ? data.vocab1a.items.length
      : step === 1
        ? data.match1b.left.length
        : step === 2
          ? signBits.length
          : step === 3
            ? data.punctuate2a.items.length
            : data.pronouns2b.items.length;

  const placeVocab = (id: number) => {
    if (checked) return;
    if (vocab[id]) {
      setVocab((m) => {
        const n = { ...m };
        delete n[id];
        return n;
      });
      return;
    }
    if (!picked) return;
    setVocab((m) => ({ ...m, [id]: picked }));
    setPicked(null);
  };

  const placeMatch = (id: number) => {
    if (checked) return;
    if (match[id]) {
      setMatch((m) => {
        const n = { ...m };
        delete n[id];
        return n;
      });
      return;
    }
    if (!pickedLetter) return;
    setMatch((m) => ({ ...m, [id]: pickedLetter }));
    setPickedLetter(null);
  };

  const placeSign = (gap: number) => {
    if (checked) return;
    if (signGaps[gap]) {
      setSignGaps((m) => {
        const n = { ...m };
        delete n[gap];
        return n;
      });
      return;
    }
    if (!picked) return;
    setSignGaps((m) => ({ ...m, [gap]: picked }));
    setPicked(null);
  };

  const placePron = (id: number) => {
    if (checked) return;
    if (pronouns[id]) {
      setPronouns((m) => {
        const n = { ...m };
        delete n[id];
        return n;
      });
      return;
    }
    if (!picked) return;
    setPronouns((m) => ({ ...m, [id]: picked }));
    setPicked(null);
  };

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setPicked(null);
    setPickedLetter(null);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (!checked) {
      setChecked(true);
      return;
    }
    if (step >= REVIEW_M4_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setPicked(null);
    setPickedLetter(null);
    setStep((s) => s + 1);
  };

  const slotCls = (val: string | undefined, ready: boolean, ok: boolean) => {
    let cls = "review-m2__slot";
    if (val) cls += " review-m2__slot--filled";
    if (ready && !val) cls += " review-m2__slot--ready";
    if (checked) cls += ok ? " review-m2__slot--ok" : " review-m2__slot--bad";
    return cls;
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
          {REVIEW_M4_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setPicked(null);
                setPickedLetter(null);
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
          <div className="review-m2__bank">
            {data.vocab1a.bank.map((w) => {
              const used = usedVocab.has(w);
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
          <ol className="review-m2__passive">
            {data.vocab1a.items.map((it) => {
              const val = vocab[it.id];
              const ok = checkReviewM4(val ?? "", it.answers);
              return (
                <li key={it.id}>
                  <p>
                    <strong>{it.id}.</strong> {it.before}
                    <button
                      type="button"
                      className={slotCls(val, !!picked, ok)}
                      disabled={checked}
                      onClick={() => placeVocab(it.id)}
                    >
                      {val ?? "________"}
                    </button>
                    {it.after}
                    {checked && !ok && (
                      <span className="inline-gap-bad">
                        {" "}
                        → {it.answers[0]}
                      </span>
                    )}
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
            <span className="write-m2a__badge">{data.match1b.badge}</span>{" "}
            {data.match1b.instruction}
          </p>
          <div className="review-m2__bank">
            {data.match1b.right.map((r) => {
              const used = usedMatch.has(r.id);
              return (
                <button
                  key={r.id}
                  type="button"
                  className={`pr-chip ${pickedLetter === r.id ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPickedLetter(r.id)}
                >
                  {r.id}. {r.text}
                </button>
              );
            })}
          </div>
          <ol className="review-m2__passive">
            {data.match1b.left.map((it) => {
              const val = match[it.id];
              const ok = val === data.match1b.keys[it.id];
              return (
                <li key={it.id}>
                  <strong>{it.id}.</strong> {it.text}{" "}
                  <button
                    type="button"
                    className={slotCls(val, !!pickedLetter, ok)}
                    disabled={checked}
                    onClick={() => placeMatch(it.id)}
                  >
                    {val ?? "—"}
                  </button>
                  {checked && !ok && (
                    <span className="inline-gap-bad">
                      {" "}
                      → {data.match1b.keys[it.id]}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {step === 2 && (
        <section className="review-m2__panel">
          <p className="language-flow__instruction">
            <span className="write-m2a__badge">{data.signpost1c.badge}</span>{" "}
            {data.signpost1c.instruction}
          </p>
          <div className="review-m2__bank">
            {data.signpost1c.bank.map((w) => {
              const used = usedSign.has(w);
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
              {data.signpost1c.parts.map((part, i) => {
                if (!isReviewM4Gap(part)) {
                  return <span key={i}>{part.text}</span>;
                }
                const val = signGaps[part.gap];
                const ok = checkReviewM4(val ?? "", [part.key]);
                return (
                  <button
                    key={i}
                    type="button"
                    className={slotCls(val, !!picked, ok)}
                    disabled={checked}
                    onClick={() => placeSign(part.gap)}
                  >
                    <strong>{part.gap}</strong>
                    {val ? ` ${val}` : " ______"}
                  </button>
                );
              })}
            </p>
          </article>
        </section>
      )}

      {step === 3 && (
        <section className="review-m2__panel">
          <p className="language-flow__instruction">
            <span className="write-m2a__badge">{data.punctuate2a.badge}</span>{" "}
            {data.punctuate2a.instruction}
          </p>
          <ol className="review-m2__passive">
            {data.punctuate2a.items.map((it) => {
              const val = punct[it.id] ?? "";
              const ok = checkReviewM4(val, it.answers);
              return (
                <li key={it.id}>
                  <p>
                    <strong>{it.id}.</strong> {it.broken}
                  </p>
                  <span
                    className={`inline-gap-wrap ${checked && ok ? "inline-gap-wrap--ok" : ""} ${checked && !ok ? "inline-gap-wrap--bad" : ""}`}
                  >
                    <input
                      className={`inline-gap-input ${checked && ok ? "inline-gap-input--ok" : ""} ${checked && !ok ? "inline-gap-input--bad" : ""}`}
                      value={val}
                      disabled={checked}
                      placeholder="Corrected sentence…"
                      onChange={(e) =>
                        setPunct((p) => ({ ...p, [it.id]: e.target.value }))
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
        </section>
      )}

      {step === 4 && (
        <section className="review-m2__panel">
          <p className="language-flow__instruction">
            <span className="write-m2a__badge">{data.pronouns2b.badge}</span>{" "}
            {data.pronouns2b.instruction}
          </p>
          <div className="review-m2__bank">
            {data.pronouns2b.bank.map((w) => {
              const used = usedPron.has(w);
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
          <ol className="review-m2__passive">
            {data.pronouns2b.items.map((it) => {
              const val = pronouns[it.id];
              const ok = checkReviewM4(val ?? "", it.answers);
              return (
                <li key={it.id}>
                  <p>
                    <strong>{it.id}.</strong> {it.before}
                    <button
                      type="button"
                      className={slotCls(val, !!picked, ok)}
                      disabled={checked}
                      onClick={() => placePron(it.id)}
                    >
                      {val ?? "________"}
                    </button>
                    {it.after}
                    {checked && !ok && (
                      <span className="inline-gap-bad">
                        {" "}
                        → {it.answers[0]}
                      </span>
                    )}
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
            {step + 1} / {REVIEW_M4_STEPS.length}
          </span>
        )}
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={goNext}
        >
          {checked ? REVIEW_M4_NEXT[step] : "Check →"}
        </button>
      </div>
    </div>
  );
}
