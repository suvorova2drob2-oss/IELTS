import { useEffect, useState } from "react";
import {
  WRITE_M7B_NEXT,
  WRITE_M7B_STEPS,
  writingM7b,
} from "../data/writingM7b";
import { WritingComposePanel } from "./WritingComposePanel";

const data = writingM7b;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, WRITE_M7B_STEPS.length - 1));
}

export function WritingM7bTrainer({
  onBack, restart, initialStep,
}: { onBack?: () => void; restart?: boolean; initialStep?: number }) {
  const [step, setStep] = useState(() => clampStep(initialStep));
  const [checked, setChecked] = useState(false);
  const [flags, setFlags] = useState<Record<number, boolean>>({});
  const [showTip, setShowTip] = useState(false);
  const [draft, setDraft] = useState("");
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep)); setChecked(false); setFlags({});
    setShowTip(false); setDraft(""); setShowModel(false);
  }, [restart, initialStep]);

  const needsCheck = step === 3;

  const goPrev = () => { if (step === 0) { onBack?.(); return; } setChecked(false); setShowTip(false); setStep((s) => s - 1); };
  const goNext = () => {
    if ((step === 1 || step === 2) && !showTip) { setShowTip(true); return; }
    if (step === 4) {
      onBack?.();
      return;
    }
    if (needsCheck && !checked) { setChecked(true); return; }
    if (step >= WRITE_M7B_STEPS.length - 1) { onBack?.(); return; }
    setChecked(false); setShowTip(false); setFlags({}); setStep((s) => s + 1);
  };
  const nextLabel =
    (step === 1 || step === 2) && !showTip ? "Show tip →" :
    needsCheck && !checked ? "Check →" : WRITE_M7B_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport write-m3a">
      <div className="reading-chrome">
        {onBack && <button type="button" className="back-link reading-chrome__back" onClick={onBack}>← Модуль</button>}
        <span className="badge reading-chrome__badge">{data.sectionTitle} · {data.bookPages}</span>
        <div className="learn-step-tabs">
          {WRITE_M7B_STEPS.map((label, i) => (
            <button key={label} type="button" className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => { setStep(i); setChecked(false); }}>{i + 1}. {label}</button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="write-m3a__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.leadIn.badge}</span>{data.leadIn.instruction}</p>
        </section>
      )}

      {step === 1 && (
        <section className="write-m3a__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.chart.badge}</span>{data.chart.instruction}</p>
          <p className="read-m3__hint"><strong>{data.chart.title}</strong></p>
          <p className="read-m3__hint">Countries: {data.chart.countries.join(", ")} · Years: {data.chart.years.join(", ")}</p>
          {showTip && <p className="read-m3__tip">{data.chart.tip}</p>}
          <ol className="read-m3__qs">
            {data.chart.questions.map((q) => (
              <li key={q.id}>
                {q.text}
                {showTip && <p className="read-m3__tip">{q.tip}</p>}
              </li>
            ))}
          </ol>
          {showTip && <p className="read-m3__tip">Overview: {data.chart.overviewTip}</p>}
        </section>
      )}

      {step === 2 && (
        <section className="write-m3a__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.plan.badge}</span>{data.plan.instruction}</p>
          <ul className="read-m3__qs">{data.plan.prompts.map((p) => <li key={p}>{p}</li>)}</ul>
        </section>
      )}

      {step === 3 && (
        <section className="write-m3a__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.futureLang.badge}</span>{data.futureLang.instruction}</p>
          <p className="read-m3__hint">Mark each sentence Accurate or Inaccurate for the chart.</p>
          <ul className="read-m3__para-slots">
            {data.futureLang.items.map((it) => {
              const marked = flags[it.id];
              return (
                <li key={it.id}>
                  <span>{it.id}. {it.text} <em>({it.phrase})</em></span>
                  <div className="read-m3__bank">
                    <button type="button" className={`pr-chip ${marked === true ? "pr-chip--picked" : ""} ${checked && it.accurate ? "pr-chip--ok" : ""}`}
                      disabled={checked} onClick={() => setFlags((m) => ({ ...m, [it.id]: true }))}>Accurate</button>
                    <button type="button" className={`pr-chip ${marked === false ? "pr-chip--picked" : ""} ${checked && !it.accurate ? "pr-chip--ok" : ""}`}
                      disabled={checked} onClick={() => setFlags((m) => ({ ...m, [it.id]: false }))}>Inaccurate</button>
                  </div>
                  {checked && !it.accurate && <p className="read-m3__tip">{it.fix}</p>}
                </li>
              );
            })}
          </ul>
          {checked && <p className="read-m3__tip">{data.futureLang.tip}</p>}
        </section>
      )}

      {step === 4 && (
        <section className="write-m3a__panel">
          <p className="write-m2a__expert">{data.write.expert}</p>
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.write.badge}</span>{data.write.instruction}</p>
          <WritingComposePanel
            draft={draft}
            onDraftChange={setDraft}
            minWords={150}
            placeholder="Write at least 150 words…"
            rows={10}
            modelAnswer={data.write.model}
            modelTitle="Suggested answer"
            modelOpenLabel="Suggested answer"
            showModel={showModel}
            onToggleModel={() => setShowModel((v) => !v)}
          />
        </section>
      )}

      <div className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}>
        <button type="button" className="flow-footer__btn" onClick={goPrev}>← Назад</button>
        <span className="flow-footer__step">{step + 1} / {WRITE_M7B_STEPS.length}</span>
        <button type="button" className="flow-footer__btn flow-footer__btn--primary" onClick={goNext}>{nextLabel}</button>
      </div>
    </div>
  );
}
