import { useEffect, useState } from "react";
import {
  SPEAK_M5A_NEXT,
  SPEAK_M5A_STEPS,
  speakingM5a,
} from "../data/speakingM5a";

const data = speakingM5a;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, SPEAK_M5A_STEPS.length - 1));
}

export function SpeakingM5aTrainer({
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
  const [showTip, setShowTip] = useState(false);
  void showTip;
  void setShowTip;

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setPicked(null);
    setAnswers({});
    setDraft("");
    setShowModel(false);
    setShowTip(false);
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
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTip(false);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= SPEAK_M5A_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTip(false);
    setShowModel(false);
    setAnswers({});
    setPicked(null);
    setStep((s) => s + 1);
  };

  const nextLabel = needsCheck && !checked ? "Check →" : SPEAK_M5A_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport speak-m3a">
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
          {SPEAK_M5A_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => { setStep(i); setChecked(false); setAnswers({}); }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="speak-m3a__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.discuss1.badge}</span>{data.discuss1.instruction}</p>
        </section>
      )}
      {step === 1 && (
        <section className="speak-m3a__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.match2a.badge}</span>{data.match2a.instruction}</p>
          <div className="read-m3__bank">
            {data.match2a.bank.map((w) => (
              <button key={w} type="button" className={`pr-chip ${picked === w ? "pr-chip--picked" : ""} ${used.has(w) ? "pr-chip--used" : ""}`}
                disabled={checked || used.has(w)} onClick={() => setPicked(w)}>{w}</button>
            ))}
          </div>
          <ul className="read-m3__para-slots listen-m3b__grid">
            {data.match2a.items.map((it) => {
              const val = answers[it.id] ?? "";
              const ok = val === it.key;
              return (
                <li key={it.id}>
                  <span>{it.id}. {it.text}</span>
                  <button type="button" className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                    disabled={checked} onClick={() => placeWord(it.id)}>{val || "—"}</button>
                  {checked && !ok && <span className="inline-gap-bad"> → {it.key}</span>}
                </li>
              );
            })}
          </ul>
        </section>
      )}
      {step === 2 && (
        <section className="speak-m3a__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.discuss2b.badge}</span>{data.discuss2b.instruction}</p>
          <ol className="read-m3__qs">{data.discuss2b.questions.map((q) => <li key={q}>{q}</li>)}</ol>
        </section>
      )}
      {step === 3 && (
        <section className="speak-m3a__panel">
          <p className="read-m3__tip">{data.techniques3.sampleTip}</p>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.techniques3.badge}</span>
            {data.techniques3.instruction}
          </p>
          <div className="speak-m3a__tech-split">
            <div>
              <ul className="read-m3__opts">
                {data.techniques3.techniques.map((t) => (
                  <li key={t.id}>
                    <strong>{t.id}</strong> {t.label}
                  </li>
                ))}
              </ul>
              <div className="read-m3__bank">
                {data.techniques3.techniques.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`pr-chip ${picked === t.id ? "pr-chip--picked" : ""}`}
                    disabled={checked}
                    onClick={() => setPicked(t.id)}
                  >
                    {t.id}
                  </button>
                ))}
              </div>
            </div>
            <ul className="read-m3__para-slots">
              {data.techniques3.examples.map((it) => {
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
          </div>
        </section>
      )}
      {step === 4 && (
        <section className="speak-m3a__panel">
          <p className="write-m2a__expert">{data.testStrategies}</p>
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.part2.badge}</span>{data.part2.instruction}</p>
          <div className="speak-m3a__cue">
            <p><strong>{data.part2.cue.intro}</strong></p>
            <p>{data.part2.cue.shouldSay}</p>
            <ul>{data.part2.cue.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            <p>{data.part2.cue.andWhy}</p>
          </div>
        </section>
      )}
      {step === 5 && (
        <section className="speak-m3a__panel">
          <p className="read-m3__instr"><span className="write-m2a__badge">{data.assess5.badge}</span>{data.assess5.instruction}</p>
          <ol className="read-m3__qs">{data.assess5.questions.map((q) => <li key={q}>{q}</li>)}</ol>
        </section>
      )}

      <div className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}>
        <button type="button" className="flow-footer__btn" onClick={goPrev}>← Назад</button>
        <span className="flow-footer__step">{step + 1} / {SPEAK_M5A_STEPS.length}</span>
        <button type="button" className="flow-footer__btn flow-footer__btn--primary" onClick={goNext}>
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
