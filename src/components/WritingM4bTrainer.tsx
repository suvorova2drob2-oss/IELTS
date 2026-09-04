import { useEffect, useState } from "react";
import {
  WRITE_M4B_NEXT,
  WRITE_M4B_STEPS,
  writingM4b,
} from "../data/writingM4b";
import { WritingComposePanel } from "./WritingComposePanel";

const data = writingM4b;
const DRAFT_KEY = "ielts-writing-m4b-draft";
const PLAN_KEY = "ielts-writing-m4b-plan";

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, WRITE_M4B_STEPS.length - 1));
}

function load(key: string): string {
  try {
    return sessionStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

export function WritingM4bTrainer({
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
  const [suitable, setSuitable] = useState<number[]>([]);
  const [planRows, setPlanRows] = useState<
    Record<number, { idea: string; support: string }>
  >({});
  const [showPlanTips, setShowPlanTips] = useState(false);
  const [introTicks, setIntroTicks] = useState<number[]>([]);
  const [introAnalyse, setIntroAnalyse] = useState<Record<number, string>>({});
  const [plan, setPlan] = useState(() => load(PLAN_KEY));
  const [draft, setDraft] = useState(() => load(DRAFT_KEY));
  const [showModel, setShowModel] = useState(false);
  const [assess, setAssess] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setSuitable([]);
    setPlanRows({});
    setShowPlanTips(false);
    setIntroTicks([]);
    setIntroAnalyse({});
    setPlan("");
    setDraft("");
    setShowModel(false);
    setAssess({});
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

  const suitableOk =
    suitable.length === data.opinions2a.suitableKeys.length &&
    data.opinions2a.suitableKeys.every((k) => suitable.includes(k)) &&
    suitable.every((k) => data.opinions2a.suitableKeys.includes(k));

  const introTickOk =
    introTicks.length === data.intro4.tick4b.keys.length &&
    data.intro4.tick4b.keys.every((k) => introTicks.includes(k)) &&
    introTicks.every((k) => data.intro4.tick4b.keys.includes(k));

  const analyseScore = data.intro4.analyse5a.items.filter(
    (it) => introAnalyse[it.id] === it.key,
  ).length;

  const needsCheck = step === 1 || step === 3;
  const score =
    step === 1
      ? suitableOk
        ? 1
        : 0
      : (introTickOk ? 1 : 0) + analyseScore;
  const total =
    step === 1 ? 1 : 1 + data.intro4.analyse5a.items.length;

  const toggleSuitable = (id: number) => {
    if (checked) return;
    setSuitable((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleIntro = (id: number) => {
    if (checked) return;
    setIntroTicks((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowPlanTips(false);
    setShowModel(false);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step === 2 && !showPlanTips) {
      setShowPlanTips(true);
      return;
    }
    if (step >= WRITE_M4B_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowPlanTips(false);
    setShowModel(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    needsCheck && !checked
      ? "Check →"
      : step === 2 && !showPlanTips
        ? "Show suggested plan →"
        : WRITE_M4B_NEXT[step];

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
          {WRITE_M4B_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setShowPlanTips(false);
                setShowModel(false);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="write-m3a__panel">
          <h2 className="write-m3a__h">{data.leadIn.heading}</h2>
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.leadIn.badge}</span>
            {data.leadIn.instruction}
          </p>
          <ol className="write-m3a__qs">
            {data.leadIn.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
        </section>
      )}

      {step === 1 && (
        <section className="write-m3a__panel">
          <h2 className="write-m3a__h">{data.opinions2a.heading}</h2>
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.opinions2a.badge}</span>
            {data.opinions2a.instruction}
          </p>
          <p className="write-m3a__task-title">{data.opinions2a.title}</p>
          <ul className="write-m3a__sent-list">
            {data.opinions2a.items.map((it) => {
              const on = suitable.includes(it.id);
              const isKey = data.opinions2a.suitableKeys.includes(it.id);
              let state = "";
              if (checked) {
                if (isKey) state = "pr-chip--ok";
                else if (on) state = "pr-chip--bad";
              } else if (on) state = "pr-chip--picked";
              return (
                <li key={it.id}>
                  <button
                    type="button"
                    className={`pr-chip write-m3a__letter ${state}`}
                    disabled={checked}
                    onClick={() => toggleSuitable(it.id)}
                  >
                    {it.id}
                  </button>
                  <span>{it.text}</span>
                  {checked && !isKey && it.why && (
                    <span className="write-m3a__tip"> — {it.why}</span>
                  )}
                </li>
              );
            })}
          </ul>
          {checked && (
            <p className="write-m3a__tip write-m3a__tip--block">
              {data.opinions2a.tip2b}
            </p>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="write-m3a__panel">
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.plan3.badge}</span>
            {data.plan3.instruction}
          </p>
          <div className="write-m3a__plan-table">
            <div className="write-m3a__plan-head">
              {data.plan3.columns.map((c) => (
                <strong key={c}>{c}</strong>
              ))}
            </div>
            {[0, 1, 2].map((i) => (
              <div key={i} className="write-m3a__plan-row">
                <textarea
                  rows={2}
                  placeholder="Idea…"
                  value={planRows[i]?.idea ?? ""}
                  onChange={(e) =>
                    setPlanRows((r) => ({
                      ...r,
                      [i]: {
                        idea: e.target.value,
                        support: r[i]?.support ?? "",
                      },
                    }))
                  }
                />
                <textarea
                  rows={2}
                  placeholder="Supporting arguments…"
                  value={planRows[i]?.support ?? ""}
                  onChange={(e) =>
                    setPlanRows((r) => ({
                      ...r,
                      [i]: {
                        idea: r[i]?.idea ?? "",
                        support: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            ))}
          </div>
          {showPlanTips && (
            <ul className="write-m3a__sent-list write-m3a__sent-list--ref">
              {data.plan3.suggestedRows.map((row) => (
                <li key={row.idea}>
                  <strong>{row.idea}</strong>
                  <span>{row.support}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {step === 3 && (
        <section className="write-m3a__panel">
          <h2 className="write-m3a__h">{data.intro4.heading}</h2>
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">
              {data.intro4.descriptors4a.badge}
            </span>
            {data.intro4.descriptors4a.instruction}
          </p>
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">
              {data.intro4.tick4b.badge}
            </span>
            {data.intro4.tick4b.instruction}
          </p>
          <ul className="write-m3a__sent-list">
            {data.intro4.tick4b.items.map((it) => {
              const on = introTicks.includes(it.id);
              let state = "";
              if (checked) {
                if (it.key) state = "pr-chip--ok";
                else if (on) state = "pr-chip--bad";
              } else if (on) state = "pr-chip--picked";
              return (
                <li key={it.id}>
                  <button
                    type="button"
                    className={`pr-chip write-m3a__letter ${state}`}
                    disabled={checked}
                    onClick={() => toggleIntro(it.id)}
                  >
                    {it.id}
                  </button>
                  <span>{it.text}</span>
                </li>
              );
            })}
          </ul>

          <p className="write-m3a__instr">
            <span className="write-m3a__badge">
              {data.intro4.analyse5a.badge}
            </span>
            {data.intro4.analyse5a.instruction}
          </p>
          <ul className="write-m3a__sent-list">
            {data.intro4.analyse5a.items.map((it) => {
              const chosen = introAnalyse[it.id];
              return (
                <li key={it.id}>
                  <p>
                    <strong>{it.id}.</strong> {it.text}
                  </p>
                  <div className="write-m3a__bank">
                    {(
                      [
                        "Answers the question",
                        "Describes the essay structure",
                      ] as const
                    ).map((opt) => {
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
                            setIntroAnalyse((a) => ({ ...a, [it.id]: opt }))
                          }
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">
              {data.intro4.phrases5b.badge}
            </span>
            {data.intro4.phrases5b.instruction}
          </p>
          <p className="write-m3a__hint">
            Opinion: {data.intro4.phrases5b.opinion}
            <br />
            Structure: {data.intro4.phrases5b.structure}
          </p>
        </section>
      )}

      {step === 4 && (
        <section className="write-m3a__panel write-m3a__panel--write">
          <h2 className="write-m3a__h">{data.write6.heading}</h2>
          <p className="write-m2a__expert">{data.expertWriting}</p>
          <p className="write-m2a__expert">{data.testStrategies}</p>
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.write6.planA.badge}</span>
            {data.write6.planA.instruction}
          </p>
          <details>
            <summary>Suggested plan</summary>
            <p>
              <strong>{data.write6.planA.suggested.answer}</strong>
            </p>
            <ul>
              {data.write6.planA.suggested.reasons.map((r) => (
                <li key={r.reason}>
                  {r.reason} — {r.support}
                </li>
              ))}
            </ul>
          </details>
          <textarea
            rows={3}
            value={plan}
            placeholder="Your plan…"
            onChange={(e) => setPlan(e.target.value)}
          />
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.write6.writeB.badge}</span>
            {data.write6.writeB.instruction}
          </p>
          <p className="write-m3a__task-title">{data.write6.writeB.title}</p>
          <WritingComposePanel
            draft={draft}
            onDraftChange={setDraft}
            minWords={250}
            placeholder="Write your essay…"
            rows={10}
            modelAnswer={data.write6.modelAnswer}
            modelTitle={data.write6.modelLabel}
            modelOpenLabel={data.write6.modelLabel}
            showModel={showModel}
            onToggleModel={() => setShowModel((v) => !v)}
          />
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.assess.badge}</span>
            {data.assess.instruction}
          </p>
          <ul className="write-m2b__checks">
            {data.assess.items.map((item, i) => (
              <li key={item}>
                <label className="write-m2b__check">
                  <input
                    type="checkbox"
                    checked={!!assess[i]}
                    onChange={() =>
                      setAssess((a) => ({ ...a, [i]: !a[i] }))
                    }
                  />
                  <span>{item}</span>
                </label>
              </li>
            ))}
          </ul>
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
            {step + 1} / {WRITE_M4B_STEPS.length}
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
