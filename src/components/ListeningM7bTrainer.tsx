import { useEffect, useState } from "react";
import {
  LISTEN_M7B_NEXT,
  LISTEN_M7B_STEPS,
  listeningM7b,
} from "../data/listeningM7b";
import { ExpertDiscussPanel } from "./ExpertDiscussPanel";
import { AudioPlayer } from "./AudioPlayer";

const data = listeningM7b;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, LISTEN_M7B_STEPS.length - 1));
}

function norm(s: string) {
  return s.trim().toLowerCase().replace(/['']/g, "'").replace(/\s+/g, " ");
}

export function ListeningM7bTrainer({
  onBack, restart, initialStep,
}: { onBack?: () => void; restart?: boolean; initialStep?: number }) {
  const [step, setStep] = useState(() => clampStep(initialStep));
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<Record<number | string, string>>({});
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep)); setChecked(false); setAnswers({}); setShowTip(false);
  }, [restart, initialStep]);

  const needsCheck = step === 1 || step === 2;

  const goPrev = () => { if (step === 0) { onBack?.(); return; } setChecked(false); setStep((s) => s - 1); };
  const goNext = () => {
    if ((step === 0 || step === 3) && !showTip) {
      setShowTip(true);
      return;
    }
    if (needsCheck && !checked) { setChecked(true); return; }
    if (step >= LISTEN_M7B_STEPS.length - 1) { onBack?.(); return; }
    setChecked(false); setShowTip(false); setAnswers({}); setStep((s) => s + 1);
  };
  const nextLabel =
    (step === 0 || step === 3) && !showTip ? "Show tip →" :
    needsCheck && !checked ? "Check →" : LISTEN_M7B_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport listen-m3b">
      <div className="reading-chrome">
        {onBack && <button type="button" className="back-link reading-chrome__back" onClick={onBack}>← Модуль</button>}
        <span className="badge reading-chrome__badge">{data.sectionTitle} · {data.bookPages}</span>
        <div className="learn-step-tabs">
          {LISTEN_M7B_STEPS.map((label, i) => (
            <button key={label} type="button" className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => { setStep(i); setChecked(false); setAnswers({}); setShowTip(false); }}>{i + 1}. {label}</button>
          ))}
        </div>
      </div>
      {step === 0 && (
        <section className="listen-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.before.badge}</span>{data.before.instruction}</p>
          {showTip && <p className="read-m3__tip">{data.before.tip}</p>}
        </section>
      )}

      {step === 1 && (
        <section className="listen-m3b__panel listen-m3b__panel--posneg">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.posNeg.badge}</span>{data.posNeg.instruction}</p>
          <AudioPlayer src={data.posNeg.audio} label={data.posNeg.audioLabel} />
          {data.posNeg.items.map((it) => (
            <div key={it.id} className="listen-m3b__q">
              <button type="button" className={`pr-chip ${answers[it.id] === "A" ? "pr-chip--picked" : ""} ${checked && it.key === "A" ? "pr-chip--ok" : ""}`}
                disabled={checked} onClick={() => setAnswers((m) => ({ ...m, [it.id]: "A" }))}>A. {it.a}</button>
              <button type="button" className={`pr-chip ${answers[it.id] === "B" ? "pr-chip--picked" : ""} ${checked && it.key === "B" ? "pr-chip--ok" : ""}`}
                disabled={checked} onClick={() => setAnswers((m) => ({ ...m, [it.id]: "B" }))}>B. {it.b}</button>
            </div>
          ))}
          <p className="read-m3__instr read-m3__instr--sub">
            <span className="write-m2a__badge">{data.posNeg.partB.badge}</span>
            {data.posNeg.partB.instruction}
          </p>
          <p className="read-m3__tip listen-m7b__2b-tip">{data.posNeg.partB.tip}</p>
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.posNeg.partC.badge}</span>{data.posNeg.partC.instruction}</p>
          <AudioPlayer src={data.posNeg.partC.audio} label={data.posNeg.partC.audioLabel} />
          {data.posNeg.partC.items.map((q) => (
            <div key={q.id} className="listen-m3b__q">
              <p>{q.id}. {q.text}</p>
              <div className="read-m3__bank">{q.options.map((o) => (
                <button key={o.id} type="button" className={`pr-chip ${answers[`c${q.id}`] === o.id ? "pr-chip--picked" : ""} ${checked && o.id === q.key ? "pr-chip--ok" : ""}`}
                  disabled={checked} onClick={() => setAnswers((m) => ({ ...m, [`c${q.id}`]: o.id }))}>{o.id}. {o.text}</button>
              ))}</div>
            </div>
          ))}
        </section>
      )}

      {step === 2 && (
        <section className="listen-m3b__panel listen-m3b__panel--exam listen-m7b__panel--exam">
          <div className="listen-m3b__exam-head listen-m7b__exam-head">
            <p className="write-m2a__expert">{data.exam.strategies}</p>
            <AudioPlayer src={data.exam.audio} label={data.exam.audioLabel} />
            <p className="listen-m3b__instr">
              <span className="write-m2a__badge">{data.exam.badge}</span>
              {data.exam.instruction}
            </p>
          </div>
          <div className="listen-m3b__qgrid flow-stage__body">
            <article className="listen-m3b__box">
              <h3>Questions 1–4</h3>
              <div className="listen-m7b__mc-grid">
                {data.exam.mc.map((q) => (
                  <div key={q.id} className="listen-m7b__mc">
                    <p className="listen-m7b__mc-stem">
                      {q.id}. {q.text}
                    </p>
                    <div className="listen-m7b__mc-opts">
                      {q.options.map((o) => (
                        <button
                          key={o.id}
                          type="button"
                          className={`pr-chip listen-m3b__opt ${answers[q.id] === o.id ? "pr-chip--picked" : ""} ${checked && o.id === q.key ? "pr-chip--ok" : ""} ${checked && answers[q.id] === o.id && o.id !== q.key ? "pr-chip--bad" : ""}`}
                          disabled={checked}
                          onClick={() =>
                            setAnswers((m) => ({ ...m, [q.id]: o.id }))
                          }
                        >
                          {o.id}. {o.text}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>
            <article className="listen-m3b__box">
              <h3>{data.exam.formTitle}</h3>
              <ul className="listen-m7b__form-grid">
                {data.exam.gaps.map((g) => {
                  const val = answers[g.id] ?? "";
                  const ok = g.answers.some((a) => norm(a) === norm(val));
                  return (
                    <li key={g.id}>
                      <span>
                        {g.id}. {g.label}{" "}
                        <input
                          className={`listen-m3b__input ${checked && ok ? "listen-m3b__input--ok" : ""} ${checked && !ok ? "listen-m3b__input--bad" : ""}`}
                          value={val}
                          disabled={checked}
                          onChange={(e) =>
                            setAnswers((m) => ({ ...m, [g.id]: e.target.value }))
                          }
                        />
                        {checked && !ok && (
                          <span className="inline-gap-bad"> → {g.answers[0]}</span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </article>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="listen-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.analysis.badge}</span>{data.analysis.instruction}</p>
          {showTip && <p className="read-m3__tip">{data.analysis.tip}</p>}
        </section>
      )}

      {step === 4 && (
        <ExpertDiscussPanel
          key="discussion"
          badge={data.discussion.badge}
          instruction={data.discussion.instruction}
          questions={data.discussion.questions}
          suggestedTitle={data.discussion.suggestedTitle}
          suggestedAnswer={data.discussion.suggestedAnswer}
        />
      )}

      <div className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}>
        <button type="button" className="flow-footer__btn" onClick={goPrev}>← Назад</button>
        <span className="flow-footer__step">{step + 1} / {LISTEN_M7B_STEPS.length}</span>
        <button type="button" className="flow-footer__btn flow-footer__btn--primary" onClick={goNext}>{nextLabel}</button>
      </div>
    </div>
  );
}
