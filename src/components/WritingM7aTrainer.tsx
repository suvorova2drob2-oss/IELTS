import { useEffect, useState } from "react";
import {
  WRITE_M7A_NEXT,
  WRITE_M7A_STEPS,
  writingM7a,
} from "../data/writingM7a";

const data = writingM7a;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, WRITE_M7A_STEPS.length - 1));
}

export function WritingM7aTrainer({
  onBack, restart, initialStep,
}: { onBack?: () => void; restart?: boolean; initialStep?: number }) {
  const [step, setStep] = useState(() => clampStep(initialStep));
  const [checked, setChecked] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number | string, string>>({});
  const [showTip, setShowTip] = useState(false);
  const [draft, setDraft] = useState("");
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep)); setChecked(false); setPicked(null); setAnswers({});
    setShowTip(false); setDraft(""); setShowModel(false);
  }, [restart, initialStep]);

  const used = new Set(Object.values(answers));
  const needsCheck = step === 1 || step === 2 || step === 3;

  const place = (id: number | string) => {
    if (checked) return;
    if (answers[id]) { setAnswers((m) => { const n = { ...m }; delete n[id]; return n; }); return; }
    if (!picked) return;
    setAnswers((m) => ({ ...m, [id]: picked }));
    setPicked(null);
  };

  const goPrev = () => { if (step === 0) { onBack?.(); return; } setChecked(false); setShowTip(false); setStep((s) => s - 1); };
  const goNext = () => {
    if ((step === 0 || step === 3) && !showTip && step === 0) { setShowTip(true); return; }
    if (step === 4) {
      if (!showModel) { setShowModel(true); return; }
      onBack?.(); return;
    }
    if (needsCheck && !checked) { setChecked(true); return; }
    if (step >= WRITE_M7A_STEPS.length - 1) { onBack?.(); return; }
    setChecked(false); setShowTip(false); setAnswers({}); setPicked(null); setStep((s) => s + 1);
  };
  const nextLabel =
    step === 0 && !showTip ? "Show tip →" :
    step === 4 && !showModel ? "Show model →" :
    needsCheck && !checked ? "Check →" : WRITE_M7A_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport write-m3a">
      <div className="reading-chrome">
        {onBack && <button type="button" className="back-link reading-chrome__back" onClick={onBack}>← Модуль</button>}
        <span className="badge reading-chrome__badge">{data.sectionTitle} · {data.bookPages}</span>
        <div className="learn-step-tabs">
          {WRITE_M7A_STEPS.map((label, i) => (
            <button key={label} type="button" className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => { setStep(i); setChecked(false); setAnswers({}); }}>{i + 1}. {label}</button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="write-m3a__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.leadIn.badge}</span>{data.leadIn.instruction}</p>
          {showTip && <p className="read-m3__tip">{data.leadIn.tip}</p>}
        </section>
      )}

      {step === 1 && (
        <section className="write-m3a__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.chart.badge}</span>{data.chart.instruction}</p>
          <p className="read-m3__hint"><strong>{data.chart.title}</strong> — {data.chart.cities.join(" · ")} · {data.chart.categories.join(", ")}</p>
          <p className="read-m3__tip">{data.chart.note}</p>
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.intro.badge}</span>{data.intro.instruction}</p>
          <ul className="read-m3__opts">
            {data.intro.options.map((o) => (
              <li key={o.id}>
                <button type="button" className={`read-m3__opt ${answers.intro === o.id ? "pr-chip--picked" : ""} ${checked && o.id === data.intro.key ? "pr-chip--ok" : ""}`}
                  disabled={checked} onClick={() => setAnswers((m) => ({ ...m, intro: o.id }))}>
                  <strong>{o.id}.</strong> {o.text}
                </button>
              </li>
            ))}
          </ul>
          {checked && <p className="read-m3__tip">{data.intro.tip}</p>}
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.overview.badge}</span>{data.overview.instruction}</p>
          <ul className="read-m3__opts">
            {data.overview.options.map((o) => (
              <li key={o.id}>
                <button type="button" className={`read-m3__opt ${answers.overview === o.id ? "pr-chip--picked" : ""} ${checked && o.id === data.overview.key ? "pr-chip--ok" : ""}`}
                  disabled={checked} onClick={() => setAnswers((m) => ({ ...m, overview: o.id }))}>
                  <strong>{o.id}.</strong> {o.text}
                </button>
              </li>
            ))}
          </ul>
          {checked && <p className="read-m3__tip">{data.overview.tip}</p>}
        </section>
      )}

      {step === 2 && (
        <section className="write-m3a__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.figures.badge}</span>{data.figures.instruction}</p>
          <div className="read-m3__bank">
            {data.figures.bank.map((w) => (
              <button key={w} type="button" className={`pr-chip ${picked === w ? "pr-chip--picked" : ""} ${used.has(w) ? "pr-chip--used" : ""}`}
                disabled={checked || used.has(w)} onClick={() => setPicked(w)}>{w}</button>
            ))}
          </div>
          <ul className="read-m3__para-slots">
            {data.figures.items.map((it) => {
              const val = answers[it.id] ?? "";
              const ok = it.answers.includes(val);
              return (
                <li key={it.id}>
                  <span>{it.before}
                    <button type="button" className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                      disabled={checked} onClick={() => place(it.id)}>{val || "—"}</button>
                    {it.after}
                    {checked && !ok && <span className="inline-gap-bad"> → {it.answers[0]}</span>}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 3 && (
        <section className="write-m3a__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.asiaTable.badge}</span>{data.asiaTable.instruction}</p>
          <p className="read-m3__hint"><strong>{data.asiaTable.title}</strong></p>
          <table className="write-m3a__table">
            <thead>
              <tr>{data.asiaTable.headers.map((h) => <th key={h || "blank"}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {data.asiaTable.rows.map((row) => (
                <tr key={row[0]}>{row.map((c) => <td key={c}>{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
          {showTip && <p className="read-m3__tip">{data.asiaTable.tip}</p>}
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.errors.badge}</span>{data.errors.instruction}</p>
          <p className="read-m3__hint">{data.errors.types.join(" · ")}</p>
          <ul className="read-m3__qs">
            {data.errors.items.map((it) => (
              <li key={it.id}>
                {it.id}. {it.text}
                {checked && <p className="read-m3__tip">{it.tip}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {step === 4 && (
        <section className="write-m3a__panel">
          <p className="write-m2a__expert">{data.write.expert}</p>
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.write.badge}</span>{data.write.instruction}</p>
          <textarea className="write-m2a__textarea" rows={10} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Write at least 150 words…" />
          <p className="write-m2a__count">{draft.trim().split(/\s+/).filter(Boolean).length} words</p>
          {showModel && <article className="read-m3__tip" style={{ whiteSpace: "pre-wrap" }}>{data.write.model}</article>}
        </section>
      )}

      <div className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}>
        <button type="button" className="flow-footer__btn" onClick={goPrev}>← Назад</button>
        <span className="flow-footer__step">{step + 1} / {WRITE_M7A_STEPS.length}</span>
        <button type="button" className="flow-footer__btn flow-footer__btn--primary" onClick={goNext}>{nextLabel}</button>
      </div>
    </div>
  );
}
