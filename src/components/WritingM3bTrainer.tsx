import { useEffect, useState } from "react";
import {
  WRITE_M3B_NEXT,
  WRITE_M3B_STEPS,
  writingM3b,
} from "../data/writingM3b";
import { ExpertDiscussPanel } from "./ExpertDiscussPanel";
import { WritingComposePanel } from "./WritingComposePanel";

const data = writingM3b;
const MIN_WORDS = 250;
const DRAFT_KEY = "ielts-writing-m3b-draft";
const PLAN_KEY = "ielts-writing-m3b-plan";
const FIX_KEY = "ielts-writing-m3b-fix";

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, WRITE_M3B_STEPS.length - 1));
}

function load(key: string): string {
  try {
    return sessionStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/\s+/g, " ");
}

function checkAns(input: string, answers: string[]): boolean {
  const n = normalize(input);
  if (!n) return false;
  return answers.some((a) => normalize(a) === n);
}

export function WritingM3bTrainer({
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
  const [solPick, setSolPick] = useState<string[]>([]);
  const [plan, setPlan] = useState(() => load(PLAN_KEY));
  const [fix, setFix] = useState(() => load(FIX_KEY));
  const [structPick, setStructPick] = useState<number | null>(null);
  const [rewrites, setRewrites] = useState<Record<number, string>>({});
  const [draft, setDraft] = useState(() => load(DRAFT_KEY));
  const [assess, setAssess] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setSolPick([]);
    setPlan("");
    setFix("");
    setStructPick(null);
    setRewrites({});
    setDraft("");
    setAssess({});
    try {
      sessionStorage.removeItem(DRAFT_KEY);
      sessionStorage.removeItem(PLAN_KEY);
      sessionStorage.removeItem(FIX_KEY);
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

  useEffect(() => {
    try {
      sessionStorage.setItem(FIX_KEY, fix);
    } catch {
      /* ignore */
    }
  }, [fix]);

  const trueIds = data.understand.solutions
    .filter((s) => s.key)
    .map((s) => s.id);
  const solOk =
    solPick.length === trueIds.length &&
    trueIds.every((id) => solPick.includes(id));

  const rewriteItems = data.modalPassive.items.filter((it) => it.id >= 2);
  const structOk = structPick === data.modalPassive.structureKey;
  const rewriteScore = rewriteItems.filter((it) =>
    checkAns(rewrites[it.id] ?? "", it.answers ?? []),
  ).length;
  const modalScore = (structOk ? 1 : 0) + rewriteScore;
  const modalTotal = 1 + rewriteItems.length;

  const needsCheck = step === 1 || step === 4;
  const score = step === 1 ? (solOk ? 1 : 0) : modalScore;
  const total = step === 1 ? 1 : modalTotal;

  const toggleSol = (id: string) => {
    if (checked) return;
    setSolPick((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
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
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= WRITE_M3B_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    needsCheck && !checked ? "Check →" : WRITE_M3B_NEXT[step];

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
          {WRITE_M3B_STEPS.map((label, i) => (
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
        <ExpertDiscussPanel
          key="lead-in"
          badge={data.leadIn.badge}
          instruction={data.leadIn.instruction}
          suggestedTitle={data.leadIn.suggestedTitle}
          suggestedAnswer={data.leadIn.suggestedAnswer}
          languageFocus={data.leadIn.languageFocus}
        >
          <blockquote className="ex-discuss__quote">{data.quote}</blockquote>
        </ExpertDiscussPanel>
      )}

      {step === 1 && (
        <section className="write-m3a__panel write-m3a__panel--stage">
          <p className="write-m3a__expert">{data.expertWriting}</p>
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.understand.badge}</span>
            <strong>{data.understand.heading}</strong> —{" "}
            {data.understand.instruction}
          </p>
          <blockquote className="write-m3a__title-box">
            {data.understand.title}
          </blockquote>
          <p className="write-m3a__hint">
            <strong>Problem:</strong> {data.understand.problem}
          </p>
          <p className="write-m3a__hint">
            Select every appropriate solution, then Check.
          </p>
          <div className="write-m3a__structs flow-stage__body">
            {data.understand.solutions.map((opt) => {
              const on = solPick.includes(opt.id);
              let cls = "write-m3a__struct write-m3a__struct--blue";
              if (on) cls += " write-m3a__struct--on";
              if (checked) {
                if (opt.key) cls += " write-m3a__struct--ok";
                else if (on) cls += " write-m3a__struct--bad";
              }
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={cls}
                  disabled={checked}
                  onClick={() => toggleSol(opt.id)}
                >
                  <strong>{opt.id}</strong>
                  <ul>
                    <li>{opt.text}</li>
                  </ul>
                </button>
              );
            })}
          </div>
          {checked && (
            <p className="write-m3a__tip">
              Appropriate: {trueIds.join(", ")}
            </p>
          )}
          <p className="write-m3a__instr write-m3a__instr--sub">
            <span className="write-m3a__badge">2b</span>
            {data.understand.note2b}
          </p>
        </section>
      )}

      {step === 2 && (
        <section className="write-m3a__panel write-m3a__panel--notes">
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.plan.badge}</span>
            {data.plan.instruction}
          </p>
          <p className="write-m3a__tip write-m3a__tip--block">
            {data.plan.rangeTip}
          </p>
          <textarea
            className="write-m3a__textarea"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            placeholder="Problems · solutions · grammar forms…"
            rows={10}
          />
        </section>
      )}

      {step === 3 && (
        <section className="write-m3a__panel write-m3a__panel--notes">
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.errors.badge}</span>
            {data.errors.instruction}
          </p>
          <blockquote className="write-m3a__title-box">
            {data.errors.flawed}
          </blockquote>
          <textarea
            className="write-m3a__textarea"
            value={fix}
            onChange={(e) => setFix(e.target.value)}
            placeholder="Write the corrected paragraph…"
            rows={8}
          />
          {fix.trim().length > 40 && (
            <aside className="write-m3a__tip write-m3a__tip--block">
              <strong>Model:</strong> {data.errors.model}
            </aside>
          )}
        </section>
      )}

      {step === 4 && (
        <section className="write-m3a__panel">
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">
              {data.modalPassive.badge5a}
            </span>
            Look at this extract from the paragraph in Exercise 4. What
            structure is it an example of?
          </p>
          <blockquote className="write-m3a__title-box">
            {data.modalPassive.extract}
          </blockquote>
          <div className="write-m3a__struct-mini">
            {data.modalPassive.structureOptions.map((opt, i) => {
              let state = "";
              if (checked) {
                if (i === data.modalPassive.structureKey) state = "pr-chip--ok";
                else if (structPick === i) state = "pr-chip--bad";
              } else if (structPick === i) state = "pr-chip--picked";
              return (
                <button
                  key={opt}
                  type="button"
                  className={`pr-chip ${state}`}
                  disabled={checked}
                  onClick={() => setStructPick(i)}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          <p className="write-m3a__hint">{data.modalPassive.rule}</p>
          <p className="write-m3a__instr write-m3a__instr--sub">
            Rewrite the sentences using a modal passive form. The first one
            has been done for you.
          </p>
          <ol className="write-m3a__sent-grid">
            {data.modalPassive.items.map((it) => {
              if (it.id === 1) {
                return (
                  <li key={it.id}>
                    <p>
                      <strong>{it.id}.</strong> {it.prompt}
                    </p>
                    <p className="write-m3a__tip">→ {it.done}</p>
                  </li>
                );
              }
              const val = rewrites[it.id] ?? "";
              const ok = checkAns(val, it.answers ?? []);
              return (
                <li key={it.id}>
                  <p>
                    <strong>{it.id}.</strong> {it.prompt}
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
                        setRewrites((r) => ({
                          ...r,
                          [it.id]: e.target.value,
                        }))
                      }
                    />
                    {checked && !ok && (
                      <span className="inline-gap-bad">
                        {" "}
                        → {it.answers?.[0]}
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {step === 5 && (
        <section className="write-m3a__panel write-m3a__panel--write">
          <p className="write-m3a__expert">{data.testStrategies}</p>
          <h2 className="write-m3a__title">{data.write.heading}</h2>
          <p className="write-m3a__instr">
            <span className="write-m3a__badge">{data.write.badge}</span>
            {data.write.instruction}
          </p>
          <blockquote className="write-m3a__title-box">
            {data.understand.title}
          </blockquote>
          <div className="write-m3a__write-grid">
            <div className="write-m3a__essay-col">
              <WritingComposePanel
                draft={draft}
                onDraftChange={setDraft}
                minWords={MIN_WORDS}
                placeholder="Write your essay here…"
                rows={12}
                showModel={false}
                onToggleModel={() => {}}
                textareaClassName="write-m3a__textarea write-m3a__textarea--essay write-compose__ta"
              />
            </div>
            <div className="write-m3a__plan-col">
              <p className="write-m3a__instr write-m3a__instr--sub">
                <span className="write-m3a__badge">
                  {data.write.assess.badge}
                </span>
                {data.write.assess.instruction}
              </p>
              <ul className="write-m2b__checks write-m2b__checks--compact">
                {data.write.assess.questions.map((q, i) => (
                  <li key={q}>
                    <label className="write-m2b__check">
                      <input
                        type="checkbox"
                        checked={!!assess[i]}
                        onChange={() =>
                          setAssess((a) => ({ ...a, [i]: !a[i] }))
                        }
                      />
                      <span>{q}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <p className="write-m3a__hint">{data.write.assess.improve}</p>
            </div>
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
          <span className="flow-footer__hint" />
        )}
        <button type="button" className="flow-footer__btn" onClick={goNext}>
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
