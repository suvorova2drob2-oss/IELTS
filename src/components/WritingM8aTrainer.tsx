import { useEffect, useState } from "react";
import {
  WRITE_M8A_NEXT,
  WRITE_M8A_STEPS,
  writingM8a,
} from "../data/writingM8a";
import { WritingComposePanel } from "./WritingComposePanel";

const data = writingM8a;
const DRAFT_KEY = "ielts-writing-m8a-draft";
const PLAN_KEY = "ielts-writing-m8a-plan";

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, WRITE_M8A_STEPS.length - 1));
}

function load(key: string): string {
  try {
    return sessionStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

export function WritingM8aTrainer({
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
  const [stageOrder, setStageOrder] = useState<string[]>([]);
  const [linking, setLinking] = useState<Record<number, string>>({});
  const [plan, setPlan] = useState(() => load(PLAN_KEY));
  const [draft, setDraft] = useState(() => load(DRAFT_KEY));

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setShowTip(false);
    setShowModel(false);
    setStageOrder([]);
    setLinking({});
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

  const needsCheck = step === 1 || step === 2;

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
    if ((step === 0 || step === 1) && !showTip && step === 0) {
      setShowTip(true);
      return;
    }
    if (step === 1 && !showTip) {
      setShowTip(true);
      return;
    }
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= WRITE_M8A_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTip(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    (step === 0 || step === 1) && !showTip
      ? "Show tip →"
      : needsCheck && !checked
        ? "Check →"
        : WRITE_M8A_NEXT[step];

  const toggleStage = (id: string) => {
    if (checked) return;
    setStageOrder((prev) => [...prev, id]);
  };

  const stageOk =
    stageOrder.length === data.arguments2.stages2c.key.length &&
    data.arguments2.stages2c.key.every((k, i) => stageOrder[i] === k);

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
          {WRITE_M8A_STEPS.map((label, i) => (
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
            <span className="write-m2a__badge">{data.quote1.badge}</span>
            {data.quote1.instruction}
          </p>
          {showTip && <p className="read-m3__tip">{data.quote1.tip}</p>}
        </section>
      )}

      {step === 1 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.arguments2.badge}</span>
            {data.arguments2.instruction}
          </p>
          {showTip &&
            data.arguments2.tips.map((t) => (
              <p key={t} className="read-m3__tip">
                {t}
              </p>
            ))}
          <p className="read-m3__instr">
            <span className="write-m2a__badge">
              {data.arguments2.text2b.badge}
            </span>
            {data.arguments2.text2b.instruction}
          </p>
          {showTip && (
            <p className="read-m3__tip">{data.arguments2.text2b.tip}</p>
          )}
          <p className="read-m3__instr">
            <span className="write-m2a__badge">
              {data.arguments2.stages2c.badge}
            </span>
            {data.arguments2.stages2c.instruction}
          </p>
          <div className="read-m3__bank">
            {data.arguments2.stages2c.stages.map((s) => (
              <button
                key={s.id}
                type="button"
                className="pr-chip"
                disabled={checked}
                onClick={() => toggleStage(s.id)}
              >
                {s.id}. {s.label}
              </button>
            ))}
          </div>
          <p>
            Order: {stageOrder.join(" → ") || "—"}
            {checked && (
              <span className={stageOk ? "inline-gap-bad" : "inline-gap-bad"}>
                {" "}
                → key: {data.arguments2.stages2c.key.join(" → ")}
              </span>
            )}
          </p>
          <button
            type="button"
            className="btn-secondary"
            disabled={checked}
            onClick={() => setStageOrder([])}
          >
            Clear order
          </button>
        </section>
      )}

      {step === 2 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.linking3.badge}</span>
            {data.linking3.instruction}
          </p>
          <ul className="read-m3__para-slots">
            {data.linking3.items.map((it) => {
              const val = linking[it.id] ?? "";
              const ok = val === it.verdict;
              return (
                <li key={it.id}>
                  <p>
                    {it.id}. {it.text}
                  </p>
                  {(["Correct", "Incorrect"] as const).map((v) => {
                    const on = val === v;
                    let cls = "";
                    if (checked) {
                      if (v === it.verdict) cls = "pr-chip--ok";
                      else if (on) cls = "pr-chip--bad";
                    } else if (on) cls = "pr-chip--picked";
                    return (
                      <button
                        key={v}
                        type="button"
                        className={`pr-chip ${cls}`}
                        disabled={checked}
                        onClick={() =>
                          setLinking((m) => ({ ...m, [it.id]: v }))
                        }
                      >
                        {v}
                      </button>
                    );
                  })}
                  {checked && (
                    <p className="read-m3__tip">
                      {ok ? "✓ " : ""}
                      {it.tip}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 3 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.write4.badge}</span>
            {data.write4.analyse4a.instruction}
          </p>
          <p className="read-m3__tip">{data.write4.analyse4a.tip}</p>
          <p className="read-m3__instr">
            <strong>Essay title:</strong> {data.write4.title}
          </p>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.write4.plan4b.badge}</span>
            {data.write4.plan4b.instruction}
          </p>
          <p className="read-m3__tip">{data.write4.plan4b.tip}</p>
          <textarea
            className="write-m2a__draft"
            rows={4}
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            placeholder="Your plan…"
          />
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.write4.write4c.badge}</span>
            {data.write4.write4c.instruction}
          </p>
          <WritingComposePanel
            draft={draft}
            onDraftChange={setDraft}
            minWords={250}
            placeholder="Write at least 250 words…"
            rows={12}
            modelAnswer={data.write4.modelAnswer}
            modelTitle={data.write4.modelLabel}
            modelOpenLabel={data.write4.modelLabel}
            showModel={showModel}
            onToggleModel={() => setShowModel((v) => !v)}
          />
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
