import { useEffect, useState } from "react";
import {
  REVIEW_M7_NEXT,
  REVIEW_M7_STEPS,
  checkReviewM7,
  reviewM7,
} from "../data/reviewM7";

const data = reviewM7;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, REVIEW_M7_STEPS.length - 1));
}

export function ReviewM7Trainer({
  onBack, restart, initialStep,
}: { onBack?: () => void; restart?: boolean; initialStep?: number }) {
  const [step, setStep] = useState(() => clampStep(initialStep));
  const [checked, setChecked] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [draft, setDraft] = useState("");
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep)); setChecked(false); setPicked(null); setAnswers({});
    setDraft(""); setShowModel(false);
  }, [restart, initialStep]);

  const used = new Set(Object.values(answers));
  const needsCheck = step === 0 || step === 1 || step === 2 || step === 4;

  const place = (id: number) => {
    if (checked) return;
    if (answers[id]) { setAnswers((m) => { const n = { ...m }; delete n[id]; return n; }); return; }
    if (!picked) return;
    setAnswers((m) => ({ ...m, [id]: picked }));
    setPicked(null);
  };

  const goPrev = () => { if (step === 0) { onBack?.(); return; } setChecked(false); setShowModel(false); setStep((s) => s - 1); };
  const goNext = () => {
    if ((step === 3 || step === 5) && !showModel) { setShowModel(true); return; }
    if (needsCheck && !checked) { setChecked(true); return; }
    if (step >= REVIEW_M7_STEPS.length - 1) { onBack?.(); return; }
    setChecked(false); setShowModel(false); setAnswers({}); setPicked(null); setDraft(""); setStep((s) => s + 1);
  };
  const nextLabel =
    (step === 3 || step === 5) && !showModel ? "Show model →" :
    needsCheck && !checked ? "Check →" : REVIEW_M7_NEXT[step];

  const bank = (words: string[]) => (
    <div className="read-m3__bank">
      {words.map((w) => (
        <button key={w} type="button" className={`pr-chip ${picked === w ? "pr-chip--picked" : ""} ${used.has(w) ? "pr-chip--used" : ""}`}
          disabled={checked || used.has(w)} onClick={() => setPicked(w)}>{w}</button>
      ))}
    </div>
  );

  return (
    <div className="app-shell reading-flow reading-flow--viewport review-m2">
      <div className="reading-chrome">
        {onBack && <button type="button" className="back-link reading-chrome__back" onClick={onBack}>← Модуль</button>}
        <span className="badge reading-chrome__badge">{data.sectionTitle} · {data.bookPages}</span>
        <div className="learn-step-tabs">
          {REVIEW_M7_STEPS.map((label, i) => (
            <button key={label} type="button" className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => { setStep(i); setChecked(false); setAnswers({}); }}>{i + 1}. {label}</button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="review-m2__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.forms1a.badge}</span>{data.forms1a.instruction}</p>
          {bank(data.forms1a.bank)}
          <ul className="read-m3__para-slots">
            {data.forms1a.items.map((it) => {
              const val = answers[it.id] ?? "";
              const ok = it.answers.includes(val);
              return (
                <li key={it.id}>
                  <span>{it.id}. {it.before}
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

      {step === 1 && (
        <section className="review-m2__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.prep1b.badge}</span>{data.prep1b.instruction}</p>
          <ul className="read-m3__para-slots">
            {data.prep1b.items.map((it) => {
              const val = answers[it.id] ?? "";
              return (
                <li key={it.id}>
                  <span>{it.id}. {it.before}
                    <span className="read-m3__bank">
                      {it.options.map((o) => (
                        <button key={o.id} type="button" className={`pr-chip ${val === o.id ? "pr-chip--picked" : ""} ${checked && o.id === it.key ? "pr-chip--ok" : ""}`}
                          disabled={checked} onClick={() => setAnswers((m) => ({ ...m, [it.id]: o.id }))}>{o.id} {o.text}</button>
                      ))}
                    </span>
                    {it.after}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 2 && (
        <section className="review-m2__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.plan1c.badge}</span>{data.plan1c.instruction}</p>
          {bank(data.plan1c.bank)}
          <ul className="read-m3__para-slots">
            {data.plan1c.items.map((it) => {
              const val = answers[it.id] ?? "";
              const ok = it.answers.includes(val);
              return (
                <li key={it.id}>
                  <span>{it.id}. {it.before}
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
        <section className="review-m2__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.punctuate2a.badge}</span>{data.punctuate2a.instruction}</p>
          <p className="read-m3__hint"><strong>{data.punctuate2a.title}</strong></p>
          <p className="read-m3__hint">{data.punctuate2a.raw}</p>
          <textarea className="write-m2a__textarea" rows={6} value={draft} onChange={(e) => setDraft(e.target.value)} />
          {showModel && <p className="read-m3__tip">{data.punctuate2a.model}</p>}
        </section>
      )}

      {step === 4 && (
        <section className="review-m2__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.errors2b.badge}</span>{data.errors2b.instruction}</p>
          <ul className="read-m3__para-slots">
            {data.errors2b.items.map((it) => {
              const val = answers[it.id] ?? "";
              const ok = checkReviewM7(val, it.answers);
              return (
                <li key={it.id}>
                  <p>{it.id}. {it.text}</p>
                  <input className="inline-gap-input" style={{ width: "100%" }} value={val} disabled={checked}
                    onChange={(e) => setAnswers((m) => ({ ...m, [it.id]: e.target.value }))} />
                  {checked && !ok && <span className="inline-gap-bad"> → {it.answers[0]}</span>}
                </li>
              );
            })}
          </ul>
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.fragments2c.badge}</span>{data.fragments2c.instruction}</p>
          <ul className="read-m3__qs">
            {data.fragments2c.items.map((it) => (
              <li key={it.id}>{it.id}. {it.text}{checked && <p className="read-m3__tip">{it.tip}</p>}</li>
            ))}
          </ul>
        </section>
      )}

      {step === 5 && (
        <section className="review-m2__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.fix2d.badge}</span>{data.fix2d.instruction}</p>
          <p className="read-m3__hint">{data.fix2d.bad}</p>
          <textarea className="write-m2a__textarea" rows={5} value={draft} onChange={(e) => setDraft(e.target.value)} />
          {showModel && <p className="read-m3__tip">{data.fix2d.model}</p>}
        </section>
      )}

      <div className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}>
        <button type="button" className="flow-footer__btn" onClick={goPrev}>← Назад</button>
        <span className="flow-footer__step">{step + 1} / {REVIEW_M7_STEPS.length}</span>
        <button type="button" className="flow-footer__btn flow-footer__btn--primary" onClick={goNext}>{nextLabel}</button>
      </div>
    </div>
  );
}
