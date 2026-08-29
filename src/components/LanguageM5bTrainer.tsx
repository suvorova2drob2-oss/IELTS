import { useEffect, useState } from "react";
import {
  LANG_M5B_NEXT,
  LANG_M5B_STEPS,
  languageM5b,
} from "../data/languageM5b";

const data = languageM5b;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, LANG_M5B_STEPS.length - 1));
}

export function LanguageM5bTrainer({
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
  void draft;
  void setDraft;
  const [showModel, setShowModel] = useState(false);
  void showModel;
  void setShowModel;

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
  const needsCheck = step === 0 || step === 2 || step === 3 || step === 4;

  const placeWord = (id: number | string) => {
    if (checked) return;
    if (answers[id]) {
      setAnswers((m) => { const next = { ...m }; delete next[id]; return next; });
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
    if (step >= LANG_M5B_STEPS.length - 1) { onBack?.(); return; }
    setChecked(false);
    setShowModel(false);
    setAnswers({});
    setPicked(null);
    setStep((s) => s + 1);
  };

  const nextLabel = needsCheck && !checked ? "Check →" : LANG_M5B_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport lang-m3b">
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
          {LANG_M5B_STEPS.map((label, i) => (
            <button key={label} type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => { setStep(i); setChecked(false); setAnswers({}); }}>
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      <p className="write-m2a__expert">{data.grammarRef}</p>
      {step === 0 && (
        <section className="lang-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.match1a.badge}</span>{data.match1a.instruction}</p>
          <ul className="read-m3__opts">{data.match1a.options.map((o) => <li key={o.id}><strong>{o.id}</strong> {o.text}</li>)}</ul>
          <div className="read-m3__bank">{["A","B","C","D"].map((L) => (
            <button key={L} type="button" className={`pr-chip ${picked === L ? "pr-chip--picked" : ""}`} disabled={checked} onClick={() => setPicked(L)}>{L}</button>
          ))}</div>
          <ul className="read-m3__para-slots">{data.match1a.items.map((it) => {
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
      {step === 1 && (
        <section className="lang-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.articles1b.badge}</span>{data.articles1b.instruction}</p>
          <div className="read-m3__bank">{["a","the"].map((L) => (
            <button key={L} type="button" className={`pr-chip ${picked === L ? "pr-chip--picked" : ""}`} disabled={checked} onClick={() => setPicked(L)}>{L}</button>
          ))}</div>
          <ul className="read-m3__para-slots">{data.articles1b.items.map((it) => {
            const val = answers[it.id] ?? "";
            const ok = val === it.key;
            return (<li key={it.id}><span>{it.id}. {it.text}</span>
              <button type="button" className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                disabled={checked} onClick={() => placeWord(it.id)}>{val || "—"}</button>
            </li>);
          })}</ul>
        </section>
      )}
      {step === 2 && (
        <section className="lang-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.practice.match2.badge}</span>{data.practice.match2.instruction}</p>
          <ul className="read-m3__opts">{data.practice.match2.options.map((o) => <li key={o.id}><strong>{o.id}</strong> {o.text}</li>)}</ul>
          <div className="read-m3__bank">{["A","B","C","D"].map((L) => (
            <button key={L} type="button" className={`pr-chip ${picked === L ? "pr-chip--picked" : ""}`} disabled={checked} onClick={() => setPicked(L)}>{L}</button>
          ))}</div>
          <ul className="read-m3__para-slots">{data.practice.match2.items.map((it) => {
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
        <section className="lang-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.reporting5a.badge}</span>{data.reporting5a.instruction}</p>
          <div className="read-m3__bank">{data.reporting5a.bank.map((bw) => (
            <button key={bw} type="button" className={`pr-chip ${picked === bw ? "pr-chip--picked" : ""} ${used.has(bw) ? "pr-chip--used" : ""}`}
              disabled={checked || used.has(bw)} onClick={() => setPicked(bw)}>{bw}</button>
          ))}</div>
          <ul className="read-m3__para-slots">{data.reporting5a.items.map((it) => {
            const val = answers[it.id] ?? "";
            const ok = it.answers.includes(val);
            return (<li key={it.id}><span>{it.id}. {it.before}
              <button type="button" className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                disabled={checked} onClick={() => placeWord(it.id)}>{val || "—"}</button>
              {it.after}{checked && !ok && <span className="inline-gap-bad"> → {it.answers[0]}</span>}
            </span></li>);
          })}</ul>
        </section>
      )}
      {step === 4 && (
        <section className="lang-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.reporting5b.badge}</span>{data.reporting5b.instruction}</p>
          <div className="read-m3__bank">{data.reporting5b.bank.map((bw) => (
            <button key={bw} type="button" className={`pr-chip ${picked === bw ? "pr-chip--picked" : ""}`} disabled={checked} onClick={() => setPicked(bw)}>{bw}</button>
          ))}</div>
          <ul className="read-m3__para-slots">{data.reporting5b.items.map((it) => {
            const val = answers[it.id] ?? "";
            const ok = it.answers.includes(val);
            return (<li key={it.id}><span>{it.id}. {it.before}
              <button type="button" className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                disabled={checked} onClick={() => placeWord(it.id)}>{val || "—"}</button>
              {it.after}{checked && !ok && <span className="inline-gap-bad"> → {it.answers[0]}</span>}
            </span></li>);
          })}</ul>
        </section>
      )}

      <div className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}>
        <button type="button" className="flow-footer__btn" onClick={goPrev}>← Назад</button>
        <span className="flow-footer__step">{step + 1} / {LANG_M5B_STEPS.length}</span>
        <button type="button" className="flow-footer__btn flow-footer__btn--primary" onClick={goNext}>
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
