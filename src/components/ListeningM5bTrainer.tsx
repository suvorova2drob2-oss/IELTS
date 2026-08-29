import { useEffect, useState } from "react";
import {
  checkListenM5b,
  LISTEN_M5B_NEXT,
  LISTEN_M5B_STEPS,
  listeningM5b,
} from "../data/listeningM5b";

const data = listeningM5b;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, LISTEN_M5B_STEPS.length - 1));
}

export function ListeningM5bTrainer({
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
  const needsCheck = step === 1 || step === 3;

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
    if (step >= LISTEN_M5B_STEPS.length - 1) { onBack?.(); return; }
    setChecked(false);
    setShowModel(false);
    setAnswers({});
    setPicked(null);
    setStep((s) => s + 1);
  };

  const nextLabel = needsCheck && !checked ? "Check →" : LISTEN_M5B_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport listen-m3b">
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
          {LISTEN_M5B_STEPS.map((label, i) => (
            <button key={label} type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => { setStep(i); setChecked(false); setAnswers({}); }}>
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {data.noAudioNote && <p className="listen-m3b__note">{data.noAudioNote}</p>}
      {step === 0 && (<section className="listen-m3b__panel"><p className="read-m3__instr"><span className="write-m2a__badge">{data.before.badge}</span>{data.before.instruction}</p></section>)}
      {step === 1 && (
        <section className="listen-m3b__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.diagram.badge}</span>{data.diagram.instruction}</p>
          <p className="read-m3__tip">{data.diagram.tip}</p>
          <ul className="read-m3__para-slots">{data.diagram.gaps.map((g) => {
            const val = answers[g.id] ?? "";
            const ok = checkListenM5b(val, g.answers);
            return (<li key={g.id}><span>{g.id}. {g.before}
              <input className={`inline-gap-input ${checked ? (ok ? "inline-gap-input--ok" : "inline-gap-input--bad") : ""}`}
                value={val} disabled={checked} onChange={(e) => setAnswers((m) => ({ ...m, [g.id]: e.target.value }))} />
              {g.after}{checked && !ok && <span className="inline-gap-bad"> → {g.answers[0]}</span>}
            </span></li>);
          })}</ul>
        </section>
      )}
      {step === 2 && (<section className="listen-m3b__panel"><p className="read-m3__instr"><span className="write-m2a__badge">{data.language2c.badge}</span>{data.language2c.instruction}</p></section>)}
      {step === 3 && (
        <section className="listen-m3b__panel">
          <p className="write-m2a__expert">{data.exam.strategies}</p>
          <div className="listen-m3b__qgrid">
            <article className="listen-m3b__box">
              <p className="read-m3__instr">{data.exam.matching.instruction}</p>
              <ul className="read-m3__opts">
                {data.exam.matching.options.map((o) => (
                  <li key={o.id}>
                    <strong>{o.id}</strong> {o.text}
                  </li>
                ))}
              </ul>
              <div className="read-m3__bank">
                {["A", "B", "C", "D"].map((L) => (
                  <button
                    key={L}
                    type="button"
                    className={`pr-chip ${picked === L ? "pr-chip--picked" : ""}`}
                    disabled={checked}
                    onClick={() => setPicked(L)}
                  >
                    {L}
                  </button>
                ))}
              </div>
              <ul className="read-m3__para-slots">
                {data.exam.matching.items.map((it) => {
                  const val = answers[it.id] ?? "";
                  const ok = val === it.key;
                  return (
                    <li key={it.id}>
                      <span>
                        {it.id}. {it.text}
                      </span>
                      <button
                        type="button"
                        className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                        disabled={checked}
                        onClick={() => placeWord(it.id)}
                      >
                        {val || "—"}
                      </button>
                      {checked && !ok && (
                        <span className="inline-gap-bad"> → {it.key}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </article>
            <article className="listen-m3b__box">
              <p className="read-m3__instr">{data.exam.notes.instruction}</p>
              <ul className="read-m3__para-slots">
                {data.exam.notes.gaps.map((g) => {
                  const val = answers[g.id] ?? "";
                  const ok = checkListenM5b(val, g.answers);
                  return (
                    <li key={g.id}>
                      <span>
                        {g.id}. {g.before}
                        <input
                          className={`inline-gap-input ${checked ? (ok ? "inline-gap-input--ok" : "inline-gap-input--bad") : ""}`}
                          value={val}
                          disabled={checked}
                          onChange={(e) =>
                            setAnswers((m) => ({
                              ...m,
                              [g.id]: e.target.value,
                            }))
                          }
                        />
                        {g.after}
                        {checked && !ok && (
                          <span className="inline-gap-bad">
                            {" "}
                            → {g.answers[0]}
                          </span>
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
      {step === 4 && (<section className="listen-m3b__panel"><p className="read-m3__instr"><span className="write-m2a__badge">{data.analysis.badge}</span>{data.analysis.instruction}</p></section>)}

      <div className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}>
        <button type="button" className="flow-footer__btn" onClick={goPrev}>← Назад</button>
        <span className="flow-footer__step">{step + 1} / {LISTEN_M5B_STEPS.length}</span>
        <button type="button" className="flow-footer__btn flow-footer__btn--primary" onClick={goNext}>
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
