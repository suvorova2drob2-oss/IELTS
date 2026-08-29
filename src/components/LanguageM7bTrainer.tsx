import { useEffect, useState } from "react";
import {
  LANG_M7B_NEXT,
  LANG_M7B_STEPS,
  languageM7b,
} from "../data/languageM7b";

const data = languageM7b;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, LANG_M7B_STEPS.length - 1));
}

function norm(s: string) {
  return s.trim().toLowerCase().replace(/['']/g, "'").replace(/\s+/g, " ");
}

export function LanguageM7bTrainer({
  onBack, restart, initialStep,
}: { onBack?: () => void; restart?: boolean; initialStep?: number }) {
  const [step, setStep] = useState(() => clampStep(initialStep));
  const [checked, setChecked] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number | string, string>>({});
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep)); setChecked(false); setPicked(null); setAnswers({}); setShowTip(false);
  }, [restart, initialStep]);

  const used = new Set(Object.values(answers));
  const needsCheck = step === 0 || step === 1 || step === 2 || step === 3;

  const place = (id: number | string) => {
    if (checked) return;
    if (answers[id]) { setAnswers((m) => { const n = { ...m }; delete n[id]; return n; }); return; }
    if (!picked) return;
    setAnswers((m) => ({ ...m, [id]: picked }));
    setPicked(null);
  };

  const goPrev = () => { if (step === 0) { onBack?.(); return; } setChecked(false); setShowTip(false); setStep((s) => s - 1); };
  const goNext = () => {
    if (step === 4 && !showTip) { setShowTip(true); return; }
    if (needsCheck && !checked) { setChecked(true); return; }
    if (step >= LANG_M7B_STEPS.length - 1) { onBack?.(); return; }
    setChecked(false); setShowTip(false); setAnswers({}); setPicked(null); setStep((s) => s + 1);
  };
  const nextLabel =
    step === 4 && !showTip ? "Show tips →" :
    needsCheck && !checked ? "Check →" : LANG_M7B_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport lang-m3b">
      <div className="reading-chrome">
        {onBack && <button type="button" className="back-link reading-chrome__back" onClick={onBack}>← Модуль</button>}
        <span className="badge reading-chrome__badge">{data.sectionTitle} · {data.bookPages}</span>
        <div className="learn-step-tabs">
          {LANG_M7B_STEPS.map((label, i) => (
            <button key={label} type="button" className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => { setStep(i); setChecked(false); setAnswers({}); }}>{i + 1}. {label}</button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="lang-m3b__panel">
          <p className="write-m2a__expert">{data.choose1a.expert}</p>
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.choose1a.badge}</span>{data.choose1a.instruction}</p>
          <p className="read-m3__hint"><strong>{data.choose1a.title}</strong></p>
          <ul className="read-m3__para-slots">
            {data.choose1a.items.map((it) => {
              const val = answers[it.id] ?? "";
              return (
                <li key={it.id}>
                  <span>{it.id}. {it.before}
                    <span className="read-m3__bank">
                      {it.options.map((o) => (
                        <button key={o} type="button" className={`pr-chip ${val === o ? "pr-chip--picked" : ""} ${checked && o === it.key ? "pr-chip--ok" : ""}`}
                          disabled={checked} onClick={() => setAnswers((m) => ({ ...m, [it.id]: o }))}>{o}</button>
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

      {step === 1 && (
        <section className="lang-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.correct2.badge}</span>{data.correct2.instruction}</p>
          <ul className="read-m3__para-slots">
            {data.correct2.items.map((it) => {
              const val = answers[it.id] ?? "";
              const ok = it.answers.some((a) => norm(a) === norm(val));
              return (
                <li key={it.id}>
                  <p>{it.id}. {it.text}</p>
                  <input className="inline-gap-input" style={{ width: "100%" }} value={val} disabled={checked}
                    onChange={(e) => setAnswers((m) => ({ ...m, [it.id]: e.target.value }))} placeholder="Corrected sentence…" />
                  {checked && !ok && <span className="inline-gap-bad"> → {it.answers[0]}</span>}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 2 && (
        <section className="lang-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.byTo.badge}</span>{data.byTo.instruction}</p>
          <ol className="read-m3__qs">{data.byTo.pairs.map((p) => <li key={p}>{p}</li>)}</ol>
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.byTo.match.badge}</span>{data.byTo.match.instruction}</p>
          <div className="read-m3__bank">{data.byTo.match.options.map((o) => (
            <button key={o.id} type="button" className={`pr-chip ${picked === o.id ? "pr-chip--picked" : ""}`} disabled={checked} onClick={() => setPicked(o.id)}>{o.id}</button>
          ))}</div>
          <ul className="pr-endings__bank">{data.byTo.match.options.map((o) => <li key={o.id}><strong>{o.id}</strong> {o.text}</li>)}</ul>
          <ul className="read-m3__para-slots">
            {data.byTo.match.items.map((it) => {
              const val = answers[it.id] ?? ""; const ok = val === it.key;
              return (
                <li key={it.id}><span>{it.id}. {it.text}</span>
                  <button type="button" className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                    disabled={checked} onClick={() => place(it.id)}>{val || "—"}</button>
                  {checked && !ok && <span className="inline-gap-bad"> → {it.key}</span>}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 3 && (
        <section className="lang-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.prepositions4.badge}</span>{data.prepositions4.instruction}</p>
          <p className="read-m3__hint"><strong>{data.prepositions4.title}</strong></p>
          <div className="read-m3__bank">
            {data.prepositions4.bank.map((w, i) => (
              <button key={`${w}-${i}`} type="button" className={`pr-chip ${picked === w ? "pr-chip--picked" : ""} ${[...used].filter((u) => u === w).length >= data.prepositions4.bank.filter((b) => b === w).length ? "pr-chip--used" : ""}`}
                disabled={checked} onClick={() => setPicked(w)}>{w}</button>
            ))}
          </div>
          <ul className="read-m3__para-slots">
            {data.prepositions4.items.map((it) => {
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

      {step === 4 && (
        <section className="lang-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.meaning5.badge}</span>{data.meaning5.instruction}</p>
          <ul className="read-m3__qs">
            {data.meaning5.items.map((it) => (
              <li key={it.id}>
                {it.id}. {it.text}
                {showTip && <p className="read-m3__tip">{it.tip}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}>
        <button type="button" className="flow-footer__btn" onClick={goPrev}>← Назад</button>
        <span className="flow-footer__step">{step + 1} / {LANG_M7B_STEPS.length}</span>
        <button type="button" className="flow-footer__btn flow-footer__btn--primary" onClick={goNext}>{nextLabel}</button>
      </div>
    </div>
  );
}
