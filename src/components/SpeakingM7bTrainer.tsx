import { useEffect, useState } from "react";
import {
  SPEAK_M7B_NEXT,
  SPEAK_M7B_STEPS,
  speakingM7b,
} from "../data/speakingM7b";

const data = speakingM7b;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, SPEAK_M7B_STEPS.length - 1));
}

export function SpeakingM7bTrainer({
  onBack, restart, initialStep,
}: { onBack?: () => void; restart?: boolean; initialStep?: number }) {
  const [step, setStep] = useState(() => clampStep(initialStep));
  const [checked, setChecked] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep)); setChecked(false); setPicked(null); setAnswers({});
  }, [restart, initialStep]);

  const used = new Set(Object.values(answers));
  const needsCheck = step === 1;

  const place = (id: string) => {
    if (checked) return;
    if (answers[id]) { setAnswers((m) => { const n = { ...m }; delete n[id]; return n; }); return; }
    if (!picked) return;
    setAnswers((m) => ({ ...m, [id]: picked }));
    setPicked(null);
  };

  const goPrev = () => { if (step === 0) { onBack?.(); return; } setChecked(false); setStep((s) => s - 1); };
  const goNext = () => {
    if (needsCheck && !checked) { setChecked(true); return; }
    if (step >= SPEAK_M7B_STEPS.length - 1) { onBack?.(); return; }
    setChecked(false); setAnswers({}); setPicked(null); setStep((s) => s + 1);
  };
  const nextLabel = needsCheck && !checked ? "Check →" : SPEAK_M7B_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport speak-m3a">
      <div className="reading-chrome">
        {onBack && <button type="button" className="back-link reading-chrome__back" onClick={onBack}>← Модуль</button>}
        <span className="badge reading-chrome__badge">{data.sectionTitle} · {data.bookPages}</span>
        <div className="learn-step-tabs">
          {SPEAK_M7B_STEPS.map((label, i) => (
            <button key={label} type="button" className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => { setStep(i); setChecked(false); setAnswers({}); }}>{i + 1}. {label}</button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="speak-m3a__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.leadIn.badge}</span>{data.leadIn.instruction}</p>
        </section>
      )}

      {step === 1 && (
        <section className="speak-m3a__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.vocab.badge}</span>{data.vocab.instruction}</p>
          <div className="read-m3__bank">
            {data.vocab.bank.map((w) => (
              <button key={w} type="button" className={`pr-chip ${picked === w ? "pr-chip--picked" : ""} ${used.has(w) ? "pr-chip--used" : ""}`}
                disabled={checked || used.has(w)} onClick={() => setPicked(w)}>{w}</button>
            ))}
          </div>
          <ul className="read-m3__para-slots">
            {data.vocab.items.map((it) => {
              const v1 = answers[`${it.id}a`] ?? "";
              const v2 = answers[`${it.id}b`] ?? "";
              const ok1 = it.answers.includes(v1);
              const ok2 = it.gap2.answers.includes(v2);
              return (
                <li key={it.id}>
                  <span>{it.id}. {it.before}
                    <button type="button" className={`read-m3__slot ${v1 ? "read-m3__slot--filled" : ""} ${checked ? (ok1 ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                      disabled={checked} onClick={() => place(`${it.id}a`)}>{v1 || "—"}</button>
                    {it.after}
                    <button type="button" className={`read-m3__slot ${v2 ? "read-m3__slot--filled" : ""} ${checked ? (ok2 ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                      disabled={checked} onClick={() => place(`${it.id}b`)}>{v2 || "—"}</button>
                    {it.gap2.after}
                    {checked && (!ok1 || !ok2) && (
                      <span className="inline-gap-bad"> → {it.answers[0]} / {it.gap2.answers[0]}</span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 2 && (
        <section className="speak-m3a__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.practiceQ.badge}</span>{data.practiceQ.instruction}</p>
          <ol className="read-m3__qs">{data.practiceQ.questions.map((q) => <li key={q}>{q}</li>)}</ol>
          <p className="read-m3__tip">Suggested question forms: {data.practiceQ.suggestedFromBank.join(" · ")}</p>
        </section>
      )}

      {step === 3 && (
        <section className="speak-m3a__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.checklist.badge}</span>{data.checklist.instruction}</p>
          <ul className="read-m3__qs">{data.checklist.items.map((t) => <li key={t}>{t}</li>)}</ul>
        </section>
      )}

      {step === 4 && (
        <section className="speak-m3a__panel">
          <p className="write-m2a__expert">{data.part1.strategies}</p>
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.part1.badge}</span>{data.part1.instruction}</p>
          <ol className="read-m3__qs">{data.part1.questions.map((q) => <li key={q}>{q}</li>)}</ol>
        </section>
      )}

      {step === 5 && (
        <section className="speak-m3a__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.assess.badge}</span>{data.assess.instruction}</p>
        </section>
      )}

      <div className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}>
        <button type="button" className="flow-footer__btn" onClick={goPrev}>← Назад</button>
        <span className="flow-footer__step">{step + 1} / {SPEAK_M7B_STEPS.length}</span>
        <button type="button" className="flow-footer__btn flow-footer__btn--primary" onClick={goNext}>{nextLabel}</button>
      </div>
    </div>
  );
}
