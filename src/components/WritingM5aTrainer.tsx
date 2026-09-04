import { useEffect, useState } from "react";
import {
  WRITE_M5A_NEXT,
  WRITE_M5A_STEPS,
  writingM5a,
} from "../data/writingM5a";
import { WritingComposePanel } from "./WritingComposePanel";

const data = writingM5a;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, WRITE_M5A_STEPS.length - 1));
}

export function WritingM5aTrainer({
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
  const [picked, setPicked] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number | string, string>>({});
  const [draft, setDraft] = useState("");
    const [showModel, setShowModel] = useState(false);
  
  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setPicked(null);
    setAnswers({});
    setDraft("");
    setShowModel(false);
  }, [restart, initialStep]);

  const used = new Set(Object.values(answers));
  void used;
  const needsCheck = step === 2 || step === 3;

  const placeWord = (id: number | string) => {
    if (checked) return;
    if (answers[id]) {
      setAnswers((m) => {
        const next = { ...m };
        delete next[id];
        return next;
      });
      return;
    }
    if (!picked) return;
    setAnswers((m) => ({ ...m, [id]: picked }));
    setPicked(null);
  };

  const goPrev = () => {
    if (step === 0) { onBack?.(); return; }
    setChecked(false);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (needsCheck && !checked) { setChecked(true); return; }
    if (step >= WRITE_M5A_STEPS.length - 1) { onBack?.(); return; }
    setChecked(false);
    setShowModel(false);
    setAnswers({});
    setPicked(null);
    setStep((s) => s + 1);
  };

  const nextLabel = needsCheck && !checked ? "Check →" : WRITE_M5A_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport write-m3a">
      <div className="reading-chrome">
        {onBack && (
          <button type="button" className="back-link reading-chrome__back" onClick={onBack}>
            ← Модуль
          </button>
        )}
        <span className="badge reading-chrome__badge">
          {data.sectionTitle} · {data.bookPages}
        </span>
        <div className="learn-step-tabs">
          {WRITE_M5A_STEPS.map((label, i) => (
            <button key={label} type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => { setStep(i); setChecked(false); setAnswers({}); }}>
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      <p className="write-m2a__expert">{data.expertWriting}</p>
      {step === 0 && (<section className="write-m3a__panel"><p className="read-m3__instr"><span className="write-m2a__badge">{data.leadIn.badge}</span>{data.leadIn.instruction}</p><p className="read-m3__tip">{data.leadIn.tip}</p></section>)}
      {step === 1 && (<section className="write-m3a__panel"><p className="read-m3__instr"><span className="write-m2a__badge">{data.structure2.badge}</span>{data.structure2.instruction}</p><p className="read-m3__tip">{data.structure2.tip}</p></section>)}
      {step === 2 && (
        <section className="write-m3a__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.stats3.badge}</span>{data.stats3.instruction}</p>
          <p className="read-m3__hint">{data.stats3.note}</p>
          <div className="read-m3__bank">{["Correct","Incorrect"].map((bw) => (
            <button key={bw} type="button" className={`pr-chip ${picked === bw ? "pr-chip--picked" : ""}`} disabled={checked} onClick={() => setPicked(bw)}>{bw}</button>
          ))}</div>
          <ul className="read-m3__para-slots listen-m3b__grid">{data.stats3.items.map((it) => {
            const val = answers[it.id] ?? "";
            const ok = val === it.key;
            return (<li key={it.id}><span>{it.id}. {it.text}</span>
              <button type="button" className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                disabled={checked} onClick={() => placeWord(it.id)}>{val || "—"}</button>
              {checked && !ok && <span className="inline-gap-bad"> → {it.key}</span>}
            </li>);
          })}</ul>
        </section>
      )}
      {step === 3 && (
        <section className="write-m3a__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.trends4.badge}</span>{data.trends4.instruction}</p>
          <ul className="read-m3__opts">{data.trends4.options.map((o) => <li key={o.id}><strong>{o.id}</strong> {o.text}</li>)}</ul>
          <div className="read-m3__bank">{["A","B","C"].map((L) => (
            <button key={L} type="button" className={`pr-chip ${picked === L ? "pr-chip--picked" : ""}`} disabled={checked} onClick={() => setPicked(L)}>{L}</button>
          ))}</div>
          <ul className="read-m3__para-slots">{data.trends4.items.map((it) => {
            const val = answers[it.id] ?? "";
            const ok = val === it.key;
            return (<li key={it.id}><span>{it.id}. {it.text}</span>
              <button type="button" className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                disabled={checked} onClick={() => placeWord(it.id)}>{val || "—"}</button>
              {checked && !ok && <span className="inline-gap-bad"> → {it.key}</span>}
            </li>);
          })}</ul>
        </section>
      )}
      {step === 4 && (
        <section className="write-m3a__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.write5.badge}</span>{data.write5.instruction}</p>
          <WritingComposePanel
            draft={draft}
            onDraftChange={setDraft}
            minWords={150}
            placeholder="Write at least 150 words…"
            rows={10}
            modelAnswer={data.write5.modelAnswer}
            modelTitle={data.write5.modelLabel}
            modelOpenLabel={data.write5.modelLabel}
            showModel={showModel}
            onToggleModel={() => setShowModel((v) => !v)}
          />
        </section>
      )}
      {step === 5 && (<section className="write-m3a__panel"><p className="read-m3__instr"><span className="write-m2a__badge">{data.peer6.badge}</span>{data.peer6.instruction}</p></section>)}

      <div className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}>
        <button type="button" className="flow-footer__btn" onClick={goPrev}>← Назад</button>
        <span className="flow-footer__step">{step + 1} / {WRITE_M5A_STEPS.length}</span>
        <button type="button" className="flow-footer__btn flow-footer__btn--primary" onClick={goNext}>
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
