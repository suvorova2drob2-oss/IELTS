import { useEffect, useState } from "react";
import {
  LISTEN_M7A_NEXT,
  LISTEN_M7A_STEPS,
  listeningM7a,
} from "../data/listeningM7a";

const data = listeningM7a;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, LISTEN_M7A_STEPS.length - 1));
}

function norm(s: string) {
  return s.trim().toLowerCase().replace(/['']/g, "'").replace(/\s+/g, " ");
}

export function ListeningM7aTrainer({
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

  const needsCheck = step === 1 || step === 2 || step === 3;

  const place = (id: number | string) => {
    if (checked) return;
    if (answers[id]) { setAnswers((m) => { const n = { ...m }; delete n[id]; return n; }); return; }
    if (!picked) return;
    setAnswers((m) => ({ ...m, [id]: picked }));
    setPicked(null);
  };

  const goPrev = () => { if (step === 0) { onBack?.(); return; } setChecked(false); setStep((s) => s - 1); };
  const goNext = () => {
    if (step === 0 && !showTip) { setShowTip(true); return; }
    if (needsCheck && !checked) { setChecked(true); return; }
    if (step >= LISTEN_M7A_STEPS.length - 1) { onBack?.(); return; }
    setChecked(false); setShowTip(false); setAnswers({}); setPicked(null); setStep((s) => s + 1);
  };
  const nextLabel = step === 0 && !showTip ? "Show tip →" : needsCheck && !checked ? "Check →" : LISTEN_M7A_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport listen-m3b">
      <div className="reading-chrome">
        {onBack && <button type="button" className="back-link reading-chrome__back" onClick={onBack}>← Модуль</button>}
        <span className="badge reading-chrome__badge">{data.sectionTitle} · {data.bookPages}</span>
        <div className="learn-step-tabs">
          {LISTEN_M7A_STEPS.map((label, i) => (
            <button key={label} type="button" className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => { setStep(i); setChecked(false); setAnswers({}); }}>{i + 1}. {label}</button>
          ))}
        </div>
      </div>
      {data.noAudioNote && <p className="listen-m3b__note">{data.noAudioNote}</p>}

      {step === 0 && (
        <section className="listen-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.before.badge}</span>{data.before.instruction}</p>
          {showTip && <p className="read-m3__tip">{data.before.tip}</p>}
        </section>
      )}

      {step === 1 && (
        <section className="listen-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.distractors.badge}</span>{data.distractors.instruction}</p>
          <p className="read-m3__hint">{data.distractors.question}</p>
          <ul className="read-m3__opts">{data.distractors.options.map((o) => <li key={o.id}><strong>{o.id}</strong> {o.text}</li>)}</ul>
          <div className="read-m3__bank">{["A","B","C"].map((L) => (
            <button key={L} type="button" className={`pr-chip ${picked === L ? "pr-chip--picked" : ""}`} disabled={checked} onClick={() => setPicked(L)}>{L}</button>
          ))}</div>
          <ul className="read-m3__para-slots listen-m3b__grid">
            {data.distractors.phrases.map((p) => {
              const val = answers[p.id] ?? ""; const ok = val === p.key;
              return (
                <li key={p.id}><span>{p.id}. {p.text}</span>
                  <button type="button" className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                    disabled={checked} onClick={() => place(p.id)}>{val || "—"}</button>
                  {checked && !ok && <span className="inline-gap-bad"> → {p.key}</span>}
                </li>
              );
            })}
          </ul>
          {checked && <p className="read-m3__tip">{data.distractors.tip}. {data.distractors.partB.tip}</p>}
        </section>
      )}

      {step === 2 && (
        <section className="listen-m3b__panel">
          <p className="listen-m3b__note">{data.practice.audioNote}</p>
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.practice.badge}</span>{data.practice.instruction}</p>
          {data.practice.mc.map((q) => (
            <div key={q.id} className="listen-m3b__q">
              <p>{q.id}. {q.text}</p>
              <div className="read-m3__bank">{q.options.map((o) => (
                <button key={o.id} type="button" className={`pr-chip ${answers[q.id] === o.id ? "pr-chip--picked" : ""} ${checked && o.id === q.key ? "pr-chip--ok" : ""} ${checked && answers[q.id] === o.id && o.id !== q.key ? "pr-chip--bad" : ""}`}
                  disabled={checked} onClick={() => setAnswers((m) => ({ ...m, [q.id]: o.id }))}>{o.id}. {o.text}</button>
              ))}</div>
            </div>
          ))}
          <p className="read-m3__instr">3. Membership cost €
            <input className="inline-gap-input" value={answers[3] ?? ""} disabled={checked}
              onChange={(e) => setAnswers((m) => ({ ...m, 3: e.target.value }))} />
            {checked && !data.practice.form.answers.some((a) => norm(a) === norm(answers[3] ?? "")) && (
              <span className="inline-gap-bad"> → 45</span>
            )}
          </p>
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.practice.distractorTypes.badge}</span>{data.practice.distractorTypes.instruction}</p>
          <div className="read-m3__bank">{["A","B","C"].map((L) => (
            <button key={L} type="button" className={`pr-chip ${picked === L ? "pr-chip--picked" : ""}`} disabled={checked} onClick={() => setPicked(L)}>{L}</button>
          ))}</div>
          <ul className="read-m3__para-slots">
            {data.practice.distractorTypes.items.map((it) => {
              const val = answers[`d${it.id}`] ?? ""; const ok = val === it.key;
              return (
                <li key={it.id}><span>{it.id}. {it.text}</span>
                  <button type="button" className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                    disabled={checked} onClick={() => place(`d${it.id}`)}>{val || "—"}</button>
                  {checked && !ok && <span className="inline-gap-bad"> → {it.key}</span>}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 3 && (
        <section className="listen-m3b__panel">
          <p className="write-m2a__expert">{data.exam.strategies}</p>
          <p className="listen-m3b__note">{data.exam.audioNote}</p>
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.exam.badge}</span>{data.exam.instruction}</p>
          <p className="read-m3__hint"><strong>{data.exam.formTitle}</strong></p>
          <ul className="read-m3__para-slots">
            {data.exam.gaps.map((g) => {
              const val = answers[g.id] ?? "";
              const ok = g.answers.some((a) => norm(a) === norm(val));
              return (
                <li key={g.id}>
                  <span>{g.id}. {g.label}{"before" in g && g.before ? ` ${g.before}` : ""}
                    <input className="inline-gap-input" value={val} disabled={checked}
                      onChange={(e) => setAnswers((m) => ({ ...m, [g.id]: e.target.value }))} />
                    {"after" in g && g.after ? g.after : ""}
                    {checked && !ok && <span className="inline-gap-bad"> → {g.answers[0]}</span>}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="read-m3__instr">5. {data.exam.mc.text}</p>
          <div className="read-m3__bank">{data.exam.mc.options.map((o) => (
            <button key={o.id} type="button" className={`pr-chip ${answers[5] === o.id ? "pr-chip--picked" : ""} ${checked && o.id === data.exam.mc.key ? "pr-chip--ok" : ""}`}
              disabled={checked} onClick={() => setAnswers((m) => ({ ...m, 5: o.id }))}>{o.id}. {o.text}</button>
          ))}</div>
        </section>
      )}

      {step === 4 && (
        <section className="listen-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.discussion.badge}</span>{data.discussion.instruction}</p>
          <ol className="read-m3__qs">{data.discussion.questions.map((q) => <li key={q}>{q}</li>)}</ol>
        </section>
      )}

      <div className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}>
        <button type="button" className="flow-footer__btn" onClick={goPrev}>← Назад</button>
        <span className="flow-footer__step">{step + 1} / {LISTEN_M7A_STEPS.length}</span>
        <button type="button" className="flow-footer__btn flow-footer__btn--primary" onClick={goNext}>{nextLabel}</button>
      </div>
    </div>
  );
}
