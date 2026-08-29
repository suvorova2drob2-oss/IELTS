import { useEffect, useState } from "react";
import {
  LANG_M7A_NEXT,
  LANG_M7A_STEPS,
  languageM7a,
} from "../data/languageM7a";

const data = languageM7a;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, LANG_M7A_STEPS.length - 1));
}

export function LanguageM7aTrainer({
  onBack, restart, initialStep,
}: { onBack?: () => void; restart?: boolean; initialStep?: number }) {
  const [step, setStep] = useState(() => clampStep(initialStep));
  const [checked, setChecked] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [correctFlags, setCorrectFlags] = useState<Record<number, boolean>>({});
  const [draft, setDraft] = useState("");
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep)); setChecked(false); setPicked(null); setAnswers({});
    setCorrectFlags({}); setDraft(""); setShowModel(false);
  }, [restart, initialStep]);

  const needsCheck = step === 0 || step === 2 || step === 3;

  const place = (id: number) => {
    if (checked) return;
    if (answers[id]) { setAnswers((m) => { const n = { ...m }; delete n[id]; return n; }); return; }
    if (!picked) return;
    setAnswers((m) => ({ ...m, [id]: picked }));
    setPicked(null);
  };

  const goPrev = () => { if (step === 0) { onBack?.(); return; } setChecked(false); setShowModel(false); setStep((s) => s - 1); };
  const goNext = () => {
    if (step === 1 || step === 4) {
      if (!showModel) { setShowModel(true); return; }
    }
    if (needsCheck && !checked) { setChecked(true); return; }
    if (step >= LANG_M7A_STEPS.length - 1) { onBack?.(); return; }
    setChecked(false); setShowModel(false); setAnswers({}); setPicked(null); setDraft(""); setCorrectFlags({}); setStep((s) => s + 1);
  };
  const nextLabel =
    (step === 1 || step === 4) && !showModel ? "Show model →" :
    needsCheck && !checked ? "Check →" : LANG_M7A_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport lang-m3b">
      <div className="reading-chrome">
        {onBack && <button type="button" className="back-link reading-chrome__back" onClick={onBack}>← Модуль</button>}
        <span className="badge reading-chrome__badge">{data.sectionTitle} · {data.bookPages}</span>
        <div className="learn-step-tabs">
          {LANG_M7A_STEPS.map((label, i) => (
            <button key={label} type="button" className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => { setStep(i); setChecked(false); setAnswers({}); }}>{i + 1}. {label}</button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="lang-m3b__panel">
          <p className="write-m2a__expert">{data.fragments1.expert}</p>
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.fragments1.badge}</span>{data.fragments1.instruction}</p>
          <ol className="read-m3__qs">{data.fragments1.sentences.map((s) => <li key={s}>{s}</li>)}</ol>
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.fragments1.match.badge}</span>{data.fragments1.match.instruction}</p>
          <div className="read-m3__bank">{data.fragments1.match.problems.map((p) => (
            <button key={p.id} type="button" className={`pr-chip ${picked === p.id ? "pr-chip--picked" : ""}`} disabled={checked} onClick={() => setPicked(p.id)}>{p.id}</button>
          ))}</div>
          <ul className="pr-endings__bank">{data.fragments1.match.problems.map((p) => <li key={p.id}><strong>{p.id}</strong> {p.text}</li>)}</ul>
          <ul className="read-m3__para-slots listen-m3b__grid">
            {data.fragments1.match.keys.map((k) => {
              const val = answers[k.id] ?? ""; const ok = val === k.key;
              return (
                <li key={k.id}><span>{k.id}. {data.fragments1.sentences[k.id - 1]}</span>
                  <button type="button" className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                    disabled={checked} onClick={() => place(k.id)}>{val || "—"}</button>
                  {checked && !ok && <span className="inline-gap-bad"> → {k.key}</span>}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 1 && (
        <section className="lang-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.fragments1.rewrite.badge}</span>{data.fragments1.rewrite.instruction}</p>
          {showModel && (
            <ul className="read-m3__qs">{data.fragments1.rewrite.tips.map((t) => <li key={t}>{t}</li>)}</ul>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="lang-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.taiChi.badge}</span>{data.taiChi.instruction}</p>
          <ul className="read-m3__para-slots">
            {data.taiChi.items.map((it) => {
              const marked = correctFlags[it.id];
              return (
                <li key={it.id}>
                  <span>{it.id}. {it.text}</span>
                  <div className="read-m3__bank">
                    <button type="button" className={`pr-chip ${marked === true ? "pr-chip--picked" : ""} ${checked && it.ok ? "pr-chip--ok" : ""}`}
                      disabled={checked} onClick={() => setCorrectFlags((m) => ({ ...m, [it.id]: true }))}>Correct</button>
                    <button type="button" className={`pr-chip ${marked === false ? "pr-chip--picked" : ""} ${checked && !it.ok ? "pr-chip--ok" : ""}`}
                      disabled={checked} onClick={() => setCorrectFlags((m) => ({ ...m, [it.id]: false }))}>Incorrect</button>
                  </div>
                  {checked && !it.ok && <p className="read-m3__tip">{it.fix}</p>}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 3 && (
        <section className="lang-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.punctMatch.badge}</span>{data.punctMatch.instruction}</p>
          <div className="read-m3__bank">{data.punctMatch.uses.map((u) => (
            <button key={u.id} type="button" className={`pr-chip ${picked === u.id ? "pr-chip--picked" : ""} ${Object.values(answers).includes(u.id) ? "pr-chip--used" : ""}`}
              disabled={checked || Object.values(answers).includes(u.id)} onClick={() => setPicked(u.id)}>{u.id}</button>
          ))}</div>
          <ul className="pr-endings__bank">{data.punctMatch.uses.map((u) => <li key={u.id}><strong>{u.id}</strong> {u.text}</li>)}</ul>
          <ul className="read-m3__para-slots listen-m3b__grid">
            {data.punctMatch.marks.map((m) => {
              const val = answers[m.id] ?? ""; const ok = val === m.key;
              return (
                <li key={m.id}><span>{m.id}. {m.text}</span>
                  <button type="button" className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                    disabled={checked} onClick={() => place(m.id)}>{val || "—"}</button>
                  {checked && !ok && <span className="inline-gap-bad"> → {m.key}</span>}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 4 && (
        <section className="lang-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.punctuate.badge}</span>{data.punctuate.instruction}</p>
          <p className="read-m3__hint">{data.punctuate.raw}</p>
          <textarea className="write-m2a__textarea" rows={6} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Punctuate here…" />
          {showModel && <p className="read-m3__tip">{data.punctuate.model}</p>}
        </section>
      )}

      <div className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}>
        <button type="button" className="flow-footer__btn" onClick={goPrev}>← Назад</button>
        <span className="flow-footer__step">{step + 1} / {LANG_M7A_STEPS.length}</span>
        <button type="button" className="flow-footer__btn flow-footer__btn--primary" onClick={goNext}>{nextLabel}</button>
      </div>
    </div>
  );
}
