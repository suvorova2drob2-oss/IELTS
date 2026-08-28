import { useEffect, useState } from "react";
import {
  checkLangM2a,
  isItalGap,
  LANG_M2A_NEXT,
  LANG_M2A_STEPS,
  languageM2a,
} from "../data/languageM2a";

const data = languageM2a;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, LANG_M2A_STEPS.length - 1));
}

export function LanguageM2aTrainer({
  onBack,
  restart,
  initialStep,
}: {
  onBack?: () => void;
  restart?: boolean;
  initialStep?: number;
}) {
  const [step, setStep] = useState(() => clampStep(initialStep));
  const [ital, setItal] = useState<Record<number, string>>({});
  const [forms, setForms] = useState<Record<number, string>>({});
  const [split2, setSplit2] = useState({ a: "", b: "" });
  const [rewrite, setRewrite] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setItal({});
    setForms({});
    setSplit2({ a: "", b: "" });
    setRewrite({});
    setChecked(false);
  }, [restart, initialStep]);

  const italGaps = data.italics.parts.filter(isItalGap);
  const italScore = italGaps.filter((g) => ital[g.gap] === g.key).length;

  const formGapMeta = data.forms.gaps;
  const formOk = (id: number): boolean => {
    const meta = formGapMeta.find((g) => g.id === id);
    if (!meta) return false;
    if (id === 2 && meta.splitAnswers) {
      return (
        checkLangM2a(split2.a, [meta.splitAnswers[0]]) &&
        checkLangM2a(split2.b, [meta.splitAnswers[1]])
      );
    }
    return checkLangM2a(forms[id] ?? "", meta.answers);
  };
  const formScore = formGapMeta.filter((g) => formOk(g.id)).length;

  const rewriteScore = data.rewrite.items.filter((it) =>
    checkLangM2a(rewrite[it.id] ?? "", it.answers),
  ).length;

  const score =
    step === 0 ? italScore : step === 1 ? formScore : rewriteScore;
  const total =
    step === 0
      ? italGaps.length
      : step === 1
        ? formGapMeta.length
        : data.rewrite.items.length;

  const needsCheck = step < 3;

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= LANG_M2A_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    needsCheck && !checked ? "Check →" : LANG_M2A_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport lang-m2a">
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
          {LANG_M2A_STEPS.map((label, i) => (
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
        <section className="lang-m2a__panel">
          <p className="lang-m2a__instr">
            <span className="lang-m2a__badge">{data.italics.badge}</span>
            {data.italics.instruction}
          </p>
          <article className="lang-m2a__passage">
            <p>
              {data.italics.parts.map((part, i) => {
                if (!isItalGap(part)) {
                  return <span key={i}>{part.text}</span>;
                }
                const sel = ital[part.gap];
                return (
                  <span key={i} className="lang-m2a__gap">
                    <strong className="lang-m2a__n">{part.gap}</strong>
                    {part.options.map((opt) => {
                      let state = "";
                      if (checked) {
                        if (opt === part.key) state = "pr-chip--ok";
                        else if (sel === opt) state = "pr-chip--bad";
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

      {step === 1 && (
        <section className="lang-m2a__panel">
          <p className="lang-m2a__instr">
            <span className="lang-m2a__badge">{data.forms.badge}</span>
            {data.forms.instruction}
          </p>
          <article className="lang-m2a__passage">
            <p>
              {data.forms.template.map((part, i) => {
                if ("text" in part) {
                  return <span key={i}>{part.text}</span>;
                }
                const meta = formGapMeta.find((g) => g.id === part.gap)!;
                const ok = formOk(part.gap);
                if (part.gap === 2 && meta.splitAnswers) {
                  return (
                    <span key={i} className="lang-m2a__form-gap">
                      <strong className="lang-m2a__n">{part.gap}</strong>
                      <input
                        className={`lang-m2a__input lang-m2a__input--sm ${checked ? (checkLangM2a(split2.a, [meta.splitAnswers[0]]) ? "lang-m2a__input--ok" : "lang-m2a__input--bad") : ""}`}
                        value={split2.a}
                        disabled={checked}
                        placeholder="____"
                        aria-label={`Gap ${part.gap}a`}
                        onChange={(e) =>
                          setSplit2((s) => ({ ...s, a: e.target.value }))
                        }
                      />
                      <span>{meta.mid}</span>
                      <input
                        className={`lang-m2a__input lang-m2a__input--sm ${checked ? (checkLangM2a(split2.b, [meta.splitAnswers[1]]) ? "lang-m2a__input--ok" : "lang-m2a__input--bad") : ""}`}
                        value={split2.b}
                        disabled={checked}
                        placeholder="____"
                        aria-label={`Gap ${part.gap}b`}
                        onChange={(e) =>
                          setSplit2((s) => ({ ...s, b: e.target.value }))
                        }
                      />
                      <em className="lang-m2a__hint">({meta.hint})</em>
                      {checked && !ok && (
                        <span className="lang-m2a__tip">
                          → are now stored
                        </span>
                      )}
                    </span>
                  );
                }
                return (
                  <span key={i} className="lang-m2a__form-gap">
                    <strong className="lang-m2a__n">{part.gap}</strong>
                    <input
                      className={`lang-m2a__input ${checked ? (ok ? "lang-m2a__input--ok" : "lang-m2a__input--bad") : ""}`}
                      value={forms[part.gap] ?? ""}
                      disabled={checked}
                      placeholder="________"
                      aria-label={`Gap ${part.gap}`}
                      onChange={(e) =>
                        setForms((f) => ({
                          ...f,
                          [part.gap]: e.target.value,
                        }))
                      }
                    />
                    <em className="lang-m2a__hint">({meta.hint})</em>
                    {checked && !ok && (
                      <span className="lang-m2a__tip">
                        → {meta.answers[0]}
                      </span>
                    )}
                  </span>
                );
              })}
            </p>
          </article>
        </section>
      )}

      {step === 2 && (
        <section className="lang-m2a__panel lang-m2a__panel--rewrite">
          <p className="lang-m2a__instr">
            <span className="lang-m2a__badge">{data.rewrite.badge}</span>
            {data.rewrite.instruction}
          </p>
          <ol className="lang-m2a__rewrite">
            {data.rewrite.items.map((it) => {
              const ok = checkLangM2a(rewrite[it.id] ?? "", it.answers);
              return (
                <li key={it.id}>
                  <p className="lang-m2a__active">
                    <strong>{it.id}.</strong> {it.active}
                  </p>
                  <input
                    className={`lang-m2a__input lang-m2a__input--wide ${checked ? (ok ? "lang-m2a__input--ok" : "lang-m2a__input--bad") : ""}`}
                    value={rewrite[it.id] ?? ""}
                    disabled={checked}
                    placeholder="Passive sentence…"
                    aria-label={`Passive ${it.id}`}
                    onChange={(e) =>
                      setRewrite((r) => ({
                        ...r,
                        [it.id]: e.target.value,
                      }))
                    }
                  />
                  {checked && !ok && (
                    <p className="lang-m2a__tip">→ {it.answers[0]}</p>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {step === 3 && (
        <section className="lang-m2a__discuss">
          <figure className="lang-m2a__discuss-hero">
            <img src={data.discuss.image} alt={data.discuss.imageAlt} />
          </figure>
          <div className="lang-m2a__discuss-prompt">
            <p className="lang-m2a__instr">
              <span className="lang-m2a__badge">{data.discuss.badge}</span>
              {data.discuss.instruction}
            </p>
            <ol className="lang-m2a__discuss-topics">
              {data.discuss.topics.map((t, i) => (
                <li key={i}>
                  <span className="lang-m2a__discuss-n">{i + 1}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
            <p className="lang-m2a__discuss-cue">
              Use the passive where appropriate
            </p>
          </div>
        </section>
      )}

      <div
        className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}
      >
        <button type="button" className="flow-footer__btn" onClick={goPrev}>
          ← Назад
        </button>
        {checked && needsCheck ? (
          <span className="flow-footer__result">
            <span className="flow-footer__ok">✓ {score}</span>
            <span className="flow-footer__bad">✗ {total - score}</span>
          </span>
        ) : (
          <span className="flow-footer__step">
            {step + 1} / {LANG_M2A_STEPS.length}
          </span>
        )}
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
