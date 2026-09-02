import { useEffect, useState } from "react";
import {
  isCohesionGap,
  WRITE_M2B_NEXT,
  WRITE_M2B_STEPS,
  writingM2b,
} from "../data/writingM2b";
import { WordCountMeter, countWords } from "./WordCountMeter";

const data = writingM2b;
const STEP_KEY = "ielts-writing-m2b-step";
const DRAFT_KEY = "ielts-writing-m2b-draft";

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, WRITE_M2B_STEPS.length - 1));
}

function loadDraft(): string {
  try {
    return sessionStorage.getItem(DRAFT_KEY) ?? "";
  } catch {
    return "";
  }
}

export function WritingM2bTrainer({
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
  const [showTips, setShowTips] = useState(false);
  const [planTicks, setPlanTicks] = useState<Record<number, boolean>>({});
  const [pickedPhrase, setPickedPhrase] = useState<string | null>(null);
  const [cohesion, setCohesion] = useState<Record<number, string>>({});
  const [ital, setItal] = useState<Record<number, string>>({});
  const [writeTicks, setWriteTicks] = useState<Record<number, boolean>>({});
  const [draft, setDraft] = useState(loadDraft);
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setShowTips(false);
    setPlanTicks({});
    setPickedPhrase(null);
    setCohesion({});
    setItal({});
    setWriteTicks({});
    setDraft("");
    setShowModel(false);
    try {
      sessionStorage.removeItem(STEP_KEY);
      sessionStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignore */
    }
  }, [restart, initialStep]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STEP_KEY, String(step));
    } catch {
      /* ignore */
    }
  }, [step]);

  useEffect(() => {
    try {
      sessionStorage.setItem(DRAFT_KEY, draft);
    } catch {
      /* ignore */
    }
  }, [draft]);

  const cohesionGaps = [1, 2, 3, 4];
  const cohesionScore = cohesionGaps.filter(
    (g) => cohesion[g] === data.cohesion.key[g],
  ).length;
  const usedPhrases = new Set(Object.values(cohesion));

  const italScore = data.language.b.items.filter(
    (it) => ital[it.id] === it.key,
  ).length;

  const needsCheck = step === 3 || step === 4;

  const placePhrase = (gap: number) => {
    if (checked) return;
    if (cohesion[gap]) {
      setCohesion((c) => {
        const next = { ...c };
        delete next[gap];
        return next;
      });
      return;
    }
    if (!pickedPhrase) return;
    setCohesion((c) => ({ ...c, [gap]: pickedPhrase }));
    setPickedPhrase(null);
  };

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTips(false);
    setShowModel(false);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (step === 1 && !showTips) {
      setShowTips(true);
      return;
    }
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step === 5 && !showModel) {
      setShowModel(true);
      return;
    }
    if (step >= WRITE_M2B_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTips(false);
    setShowModel(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    step === 1 && !showTips
      ? "Show tips →"
      : needsCheck && !checked
        ? "Check →"
        : step === 5 && !showModel
          ? "Show model →"
          : WRITE_M2B_NEXT[step];

  const score = step === 3 ? cohesionScore : step === 4 ? italScore : 0;
  const total =
    step === 3
      ? cohesionGaps.length
      : step === 4
        ? data.language.b.items.length
        : 0;

  return (
    <div className="app-shell reading-flow reading-flow--viewport write-m2a write-m2b">
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
          {WRITE_M2B_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setShowTips(false);
                setShowModel(false);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="write-m2b__lead">
          <figure className="write-m2b__hero">
            <img src={data.leadIn.image} alt={data.leadIn.imageAlt} />
          </figure>
          <div className="write-m2b__lead-copy">
            <h2 className="write-m2a__title">{data.leadIn.heading}</h2>
            <p className="write-m2a__instr">
              <span className="write-m2a__badge">{data.leadIn.badge}</span>
              {data.leadIn.instruction}
            </p>
            <p className="write-m2a__cue">Discuss with a partner</p>
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="write-m2b__understand">
          <header className="write-m2a__head">
            <h2 className="write-m2a__title">{data.understand.heading}</h2>
            <p className="write-m2a__expert">{data.understand.expert}</p>
            <p className="write-m2a__instr">
              <span className="write-m2a__badge">{data.understand.badge}</span>
              {data.understand.instruction}
            </p>
          </header>
          <div className="write-m2b__understand-grid">
            <div className="write-m2b__diagram-col">
              <aside className="write-m2b__task-box">
                {data.understand.taskBox.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </aside>
              <figure className="write-m2a__fig write-m2b__fig">
                <figcaption>{data.understand.diagramTitle}</figcaption>
                <div className="write-m2a__fig-media">
                  <img
                    src={data.understand.image}
                    alt={data.understand.imageAlt}
                  />
                </div>
              </figure>
            </div>
            <ol className="write-m2b__qs">
              {data.understand.questions.map((item, i) => (
                <li key={item.q}>
                  <p>
                    <strong>{i + 1}.</strong> {item.q}
                  </p>
                  {showTips && (
                    <p className="write-m2b__tip">→ {item.tip}</p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="write-m2b__plan">
          <h2 className="write-m2a__title">{data.plan.heading}</h2>
          <p className="write-m2a__instr">
            <span className="write-m2a__badge">{data.plan.a.badge}</span>
            {data.plan.a.instruction}
          </p>
          <p className="write-m2a__cue">Discuss bands 6 vs 7</p>
          <p className="write-m2a__instr">
            <span className="write-m2a__badge">{data.plan.b.badge}</span>
            {data.plan.b.instruction}
          </p>
          <ul className="write-m2b__checks">
            {data.plan.b.items.map((item, i) => (
              <li key={item}>
                <label className="write-m2b__check">
                  <input
                    type="checkbox"
                    checked={!!planTicks[i]}
                    onChange={() =>
                      setPlanTicks((t) => ({ ...t, [i]: !t[i] }))
                    }
                  />
                  <span>
                    <strong>{i + 1}.</strong> {item}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </section>
      )}

      {step === 3 && (
        <section className="write-m2b__cohesion">
          <p className="write-m2a__instr">
            <span className="write-m2a__badge">{data.cohesion.badge}</span>
            {data.cohesion.instruction}
          </p>
          <div className="write-m2b__bank">
            {data.cohesion.bank.map((phrase) => {
              const used = usedPhrases.has(phrase);
              return (
                <button
                  key={phrase}
                  type="button"
                  className={`pr-chip ${pickedPhrase === phrase ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPickedPhrase(phrase)}
                >
                  {phrase}
                </button>
              );
            })}
          </div>
          <article className="write-m2b__passage">
            <h3>{data.cohesion.title}</h3>
            <p>
              {data.cohesion.parts.map((part, i) => {
                if (!isCohesionGap(part)) {
                  return <span key={i}>{part.text}</span>;
                }
                const val = cohesion[part.gap];
                let state = "write-m2b__gap";
                if (val) state += " write-m2b__gap--filled";
                if (pickedPhrase && !val) state += " write-m2b__gap--ready";
                if (checked) {
                  state +=
                    val === data.cohesion.key[part.gap]
                      ? " write-m2b__gap--ok"
                      : " write-m2b__gap--bad";
                }
                return (
                  <button
                    key={i}
                    type="button"
                    className={state}
                    disabled={checked}
                    onClick={() => placePhrase(part.gap)}
                  >
                    <strong>{part.gap}</strong>
                    {val ? ` ${val}` : " ________"}
                  </button>
                );
              })}
            </p>
            {checked && cohesionScore < cohesionGaps.length && (
              <p className="write-m2b__tip">
                Key: 1 {data.cohesion.key[1]} · 2 {data.cohesion.key[2]} · 3{" "}
                {data.cohesion.key[3]} · 4 {data.cohesion.key[4]}
              </p>
            )}
          </article>
        </section>
      )}

      {step === 4 && (
        <section className="write-m2b__lang">
          <h2 className="write-m2a__title">{data.language.heading}</h2>
          <div className="write-m2b__lang-grid">
            <div className="write-m2b__verbs-panel">
              <p className="write-m2a__instr write-m2a__instr--compact">
                <span className="write-m2a__badge">{data.language.a.badge}</span>
                {data.language.a.instruction}
              </p>
              <div className="write-m2b__verbs">
                {data.language.a.verbs.map((v) => (
                  <span key={v} className="write-m2b__verb">
                    {v}
                  </span>
                ))}
              </div>
              <p className="write-m2b__tip">{data.language.a.tip}</p>
            </div>
            <div className="write-m2b__ital-panel">
              <p className="write-m2a__instr write-m2a__instr--compact">
                <span className="write-m2a__badge">{data.language.b.badge}</span>
                {data.language.b.instruction}
              </p>
              <ol className="write-m2b__ital-list">
                {data.language.b.items.map((it) => {
                  const sel = ital[it.id];
                  return (
                    <li key={it.id}>
                      <strong>{it.id}.</strong> {it.before}
                      <span className="write-m2b__ital-opts">
                        {it.options.map((opt) => {
                          let state = "";
                          if (checked) {
                            if (opt === it.key) state = "pr-chip--ok";
                            else if (sel === opt) state = "pr-chip--bad";
                          } else if (sel === opt) state = "pr-chip--picked";
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
                      {it.after}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>
      )}

      {step === 5 && (
        <section className="write-m2b__write">
          <div className="write-m2b__write-side">
            <h2 className="write-m2a__title">{data.write.heading}</h2>
            <p className="write-m2a__instr">
              <span className="write-m2a__badge">{data.write.badge}</span>
              {data.write.planInstruction}
            </p>
            <ul className="write-m2b__checks write-m2b__checks--compact">
              {data.write.checklist.map((item, i) => (
                <li key={item}>
                  <label className="write-m2b__check">
                    <input
                      type="checkbox"
                      checked={!!writeTicks[i]}
                      onChange={() =>
                        setWriteTicks((t) => ({ ...t, [i]: !t[i] }))
                      }
                    />
                    <span>{item}</span>
                  </label>
                </li>
              ))}
            </ul>
            <figure className="write-m2a__fig write-m2b__fig write-m2b__fig--mini">
              <figcaption>{data.understand.diagramTitle}</figcaption>
              <div className="write-m2a__fig-media">
                <img
                  src={data.understand.image}
                  alt={data.understand.imageAlt}
                />
              </div>
            </figure>
          </div>
          <div className="write-m2b__draft">
            <p className="write-m2a__instr write-m2a__instr--sub">
              {data.write.writeInstruction}
            </p>
            <WordCountMeter
              words={countWords(draft)}
              minWords={150}
              label="Task 1 · exam minimum"
            />
            <textarea
              className="write-m2a__ta"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write your process summary…"
              rows={12}
            />
            {showModel && (
              <aside className="write-m2b__model">
                <strong>{data.write.modelLabel}</strong>
                {data.write.modelAnswer.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </aside>
            )}
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
            {step + 1} / {WRITE_M2B_STEPS.length}
            {step === 5 ? ` · ${countWords(draft)} words` : ""}
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
