import { useEffect, useState } from "react";
import {
  WRITE_M9B_NEXT,
  WRITE_M9B_STEPS,
  writingM9b,
} from "../data/writingM9b";
import { WritingComposePanel } from "./WritingComposePanel";

const data = writingM9b;
const DRAFT_KEY = "ielts-writing-M9b-draft";
const PLAN_KEY = "ielts-writing-M9b-plan";

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, WRITE_M9B_STEPS.length - 1));
}

function load(key: string): string {
  try {
    return sessionStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

export function WritingM9bTrainer({
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
  const [showTip, setShowTip] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [forAgainst, setForAgainst] = useState<Record<number, string>>({});
  const [conclusion, setConclusion] = useState<string | null>(null);
  const [plan, setPlan] = useState(() => load(PLAN_KEY));
  const [draft, setDraft] = useState(() => load(DRAFT_KEY));

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setShowTip(false);
    setShowModel(false);
    setForAgainst({});
    setConclusion(null);
    setPlan("");
    setDraft("");
    try {
      sessionStorage.removeItem(DRAFT_KEY);
      sessionStorage.removeItem(PLAN_KEY);
    } catch {
      /* ignore */
    }
  }, [restart, initialStep]);

  useEffect(() => {
    try {
      sessionStorage.setItem(DRAFT_KEY, draft);
    } catch {
      /* ignore */
    }
  }, [draft]);

  useEffect(() => {
    try {
      sessionStorage.setItem(PLAN_KEY, plan);
    } catch {
      /* ignore */
    }
  }, [plan]);

  const needsCheck = step === 1 || step === 3;

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
    if ((step === 0 || step === 2) && !showTip) {
      setShowTip(true);
      return;
    }
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= WRITE_M9B_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTip(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    (step === 0 || step === 2) && !showTip
      ? "Show tip →"
      : needsCheck && !checked
        ? "Check →"
        : WRITE_M9B_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport write-m3a">
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
          {WRITE_M9B_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setShowTip(false);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>
      <p className="write-m2a__expert">{data.expertWriting}</p>

      {step === 0 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.cartoon1.badge}</span>
            {data.cartoon1.instruction}
          </p>
          {showTip && <p className="read-m3__tip">{data.cartoon1.tip}</p>}
        </section>
      )}

      {step === 1 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.forAgainst2a.badge}</span>
            {data.forAgainst2a.instruction}
          </p>
          <p className="read-m3__hint">{data.forAgainst2a.title}</p>
          <ul className="read-m3__para-slots listen-m3b__grid">
            {data.forAgainst2a.items.map((it) => {
              const val = forAgainst[it.id] ?? "";
              const ok = val === it.key;
              return (
                <li key={it.id}>
                  <p>
                    {it.id}. {it.text}
                  </p>
                  {(["for", "against"] as const).map((v) => {
                    const on = val === v;
                    let cls = "";
                    if (checked) {
                      if (v === it.key) cls = "pr-chip--ok";
                      else if (on) cls = "pr-chip--bad";
                    } else if (on) cls = "pr-chip--picked";
                    return (
                      <button
                        key={v}
                        type="button"
                        className={`pr-chip ${cls}`}
                        disabled={checked}
                        onClick={() =>
                          setForAgainst((m) => ({ ...m, [it.id]: v }))
                        }
                      >
                        {v}
                      </button>
                    );
                  })}
                  {checked && !ok && (
                    <span className="inline-gap-bad"> → {it.key}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 2 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.structure3.badge}</span>
            {data.structure3.instruction}
          </p>
          {showTip && (
            <p className="read-m3__tip">{data.structure3.structureTip}</p>
          )}
          <p className="read-m3__hint">
            Better structure: {data.structure3.betterStructure}
          </p>
        </section>
      )}

      {step === 3 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.conclusions4.badge}</span>
            {data.conclusions4.instruction}
          </p>
          <p className="read-m3__tip">{data.conclusions4.important}</p>
          <div className="read-m3__bank">
            {data.conclusions4.options.map((opt) => {
              const on = conclusion === opt.id;
              const ok = opt.id === data.conclusions4.best;
              let cls = "";
              if (checked) {
                if (ok) cls = "pr-chip--ok";
                else if (on) cls = "pr-chip--bad";
              } else if (on) cls = "pr-chip--picked";
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`pr-chip ${cls}`}
                  disabled={checked}
                  onClick={() => setConclusion(opt.id)}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>
          {checked && <p className="read-m3__tip">{data.conclusions4.tip}</p>}
        </section>
      )}

      {step === 4 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.write5.plan.badge}</span>
            {data.write5.plan.instruction}
          </p>
          <p className="read-m3__tip">{data.write5.plan.tip}</p>
          <textarea
            className="write-m2a__draft"
            rows={4}
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            placeholder="Your plan…"
          />
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.write5.write.badge}</span>
            {data.write5.write.instruction}
          </p>
          <p className="read-m3__hint">{data.forAgainst2a.title}</p>
          <WritingComposePanel
            draft={draft}
            onDraftChange={setDraft}
            minWords={150}
            placeholder="Write at least 250 words…"
            rows={12}
            modelAnswer={data.write5.modelAnswer}
            modelTitle={data.write5.modelLabel}
            modelOpenLabel={data.write5.modelLabel}
            showModel={showModel}
            onToggleModel={() => setShowModel((v) => !v)}
          />
        </section>
      )}

      {step === 5 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.peer6.badge}</span>
            {data.peer6.instruction}
          </p>
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
