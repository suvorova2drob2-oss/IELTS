import { useEffect, useState } from "react";
import {
  SPEAK_M7A_NEXT,
  SPEAK_M7A_STEPS,
  speakingM7a,
} from "../data/speakingM7a";
import { ExpertDiscussPanel } from "./ExpertDiscussPanel";

const data = speakingM7a;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, SPEAK_M7A_STEPS.length - 1));
}

export function SpeakingM7aTrainer({
  onBack, restart, initialStep,
}: { onBack?: () => void; restart?: boolean; initialStep?: number }) {
  const [step, setStep] = useState(() => clampStep(initialStep));
  const [checked, setChecked] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep)); setChecked(false); setPicked(null); setAnswers({}); setShowTip(false);
  }, [restart, initialStep]);

  const used = new Set(Object.values(answers));
  const needsCheck = step === 1 || step === 3;

  const place = (id: number) => {
    if (checked) return;
    if (answers[id]) { setAnswers((m) => { const n = { ...m }; delete n[id]; return n; }); return; }
    if (!picked) return;
    setAnswers((m) => ({ ...m, [id]: picked }));
    setPicked(null);
  };

  const goPrev = () => { if (step === 0) { onBack?.(); return; } setChecked(false); setShowTip(false); setStep((s) => s - 1); };
  const goNext = () => {
    if (step === 0 && !showTip) { setShowTip(true); return; }
    if (needsCheck && !checked) { setChecked(true); return; }
    if (step >= SPEAK_M7A_STEPS.length - 1) { onBack?.(); return; }
    setChecked(false); setShowTip(false); setAnswers({}); setPicked(null); setStep((s) => s + 1);
  };
  const nextLabel =
    step === 0 && !showTip ? "Show tip →" :
    needsCheck && !checked ? "Check →" : SPEAK_M7A_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport speak-m3a">
      <div className="reading-chrome">
        {onBack && <button type="button" className="back-link reading-chrome__back" onClick={onBack}>← Модуль</button>}
        <span className="badge reading-chrome__badge">{data.sectionTitle} · {data.bookPages}</span>
        <div className="learn-step-tabs">
          {SPEAK_M7A_STEPS.map((label, i) => (
            <button key={label} type="button" className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => { setStep(i); setChecked(false); setAnswers({}); }}>{i + 1}. {label}</button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="speak-m3a__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.leadIn.badge}</span>{data.leadIn.instruction}</p>
          {showTip && <p className="read-m3__tip">{data.leadIn.tip}</p>}
        </section>
      )}

      {step === 1 && (
        <section className="speak-m3a__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.idioms.badge}</span>{data.idioms.instruction}</p>
          <div className="read-m3__bank">
            {data.idioms.bank.map((w) => (
              <button key={w} type="button" className={`pr-chip ${picked === w ? "pr-chip--picked" : ""} ${used.has(w) ? "pr-chip--used" : ""}`}
                disabled={checked || used.has(w)} onClick={() => setPicked(w)}>{w}</button>
            ))}
          </div>
          <ul className="read-m3__para-slots">
            {data.idioms.items.map((it) => {
              const val = answers[it.id] ?? "";
              const ok = it.answers.includes(val);
              return (
                <li key={it.id}>
                  <span style={{ whiteSpace: "pre-wrap" }}>{it.before}
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

      {step === 2 && (
        <ExpertDiscussPanel
          key="discuss"
          badge={data.discuss.badge}
          instruction={data.discuss.instruction}
          topics={data.discuss.topics}
          suggestedTitle={data.discuss.suggestedTitle}
          suggestedAnswer={data.discuss.suggestedAnswer}
        />
      )}

      {step === 3 && (
        <section className="speak-m3a__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.accuracy.badge}</span>{data.accuracy.instruction}</p>
          <div className="read-m3__bank">
            {data.accuracy.mistakes.map((m) => (
              <button key={m.id} type="button" className={`pr-chip ${picked === m.id ? "pr-chip--picked" : ""} ${Object.values(answers).includes(m.id) ? "pr-chip--used" : ""}`}
                disabled={checked || Object.values(answers).includes(m.id)} onClick={() => setPicked(m.id)}>{m.id}</button>
            ))}
          </div>
          <ul className="pr-endings__bank">{data.accuracy.mistakes.map((m) => <li key={m.id}><strong>{m.id}</strong> {m.text}</li>)}</ul>
          <ul className="read-m3__para-slots listen-m3b__grid">
            {data.accuracy.speakers.map((s) => {
              const val = answers[s.id] ?? ""; const ok = val === s.key;
              return (
                <li key={s.id}><span>Speaker {s.id}</span>
                  <button type="button" className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                    disabled={checked} onClick={() => place(s.id)}>{val || "—"}</button>
                  {checked && !ok && <span className="inline-gap-bad"> → {s.key}</span>}
                </li>
              );
            })}
          </ul>
          {checked && <p className="read-m3__tip">{data.accuracy.tip}</p>}
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
          <ol className="read-m3__qs">{data.assess.questions.map((q) => <li key={q}>{q}</li>)}</ol>
        </section>
      )}

      <div className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}>
        <button type="button" className="flow-footer__btn" onClick={goPrev}>← Назад</button>
        <span className="flow-footer__step">{step + 1} / {SPEAK_M7A_STEPS.length}</span>
        <button type="button" className="flow-footer__btn flow-footer__btn--primary" onClick={goNext}>{nextLabel}</button>
      </div>
    </div>
  );
}
