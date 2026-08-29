import { useEffect, useState } from "react";
import {
  SPEAK_M5B_NEXT,
  SPEAK_M5B_STEPS,
  speakingM5b,
} from "../data/speakingM5b";

const data = speakingM5b;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, SPEAK_M5B_STEPS.length - 1));
}

export function SpeakingM5bTrainer({
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
  const [answers, setAnswers] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setPicked(null);
    setAnswers({});
  }, [restart, initialStep]);

  const used = new Set(Object.values(answers));
  const needsCheck = step === 1;

  const placeWord = (id: number) => {
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
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= SPEAK_M5B_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setAnswers({});
    setPicked(null);
    setStep((s) => s + 1);
  };

  const nextLabel =
    needsCheck && !checked ? "Check →" : SPEAK_M5B_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport speak-m3a">
      <div className="reading-chrome">
        {onBack && (
          <button
            type="button"
            className="back-link reading-chrome__back"
            onClick={onBack}
          >
            ← Модуль
          </button>
        )}
        <span className="badge reading-chrome__badge">
          {data.sectionTitle} · {data.bookPages}
        </span>
        <div className="learn-step-tabs">
          {SPEAK_M5B_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="speak-m3a__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.utopian1.badge}</span>
            {data.utopian1.instruction}
          </p>
          <p className="read-m3__tip">{data.utopian1.tip}</p>
        </section>
      )}
      {step === 1 && (
        <section className="speak-m3a__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.vocab2a.badge}</span>
            {data.vocab2a.instruction}
          </p>
          <div className="read-m3__bank">
            {data.vocab2a.bank.map((bw) => (
              <button
                key={bw}
                type="button"
                className={`pr-chip ${picked === bw ? "pr-chip--picked" : ""} ${used.has(bw) ? "pr-chip--used" : ""}`}
                disabled={checked || used.has(bw)}
                onClick={() => setPicked(bw)}
              >
                {bw}
              </button>
            ))}
          </div>
          <ul className="read-m3__para-slots listen-m3b__grid">
            {data.vocab2a.items.map((it) => {
              const val = answers[it.id] ?? "";
              const ok = it.answers.includes(val);
              return (
                <li key={it.id}>
                  <span>
                    {it.id}. {it.before}
                    <button
                      type="button"
                      className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                      disabled={checked}
                      onClick={() => placeWord(it.id)}
                    >
                      {val || "—"}
                    </button>
                    {it.after}
                    {checked && !ok && (
                      <span className="inline-gap-bad">
                        {" "}
                        → {it.answers.join(" / ")}
                      </span>
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
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.discuss2b.badge}</span>
            {data.discuss2b.instruction}
          </p>
        </section>
      )}
      {step === 3 && (
        <section className="speak-m3a__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.grammar3.badge}</span>
            {data.grammar3.bands.instruction}
          </p>
          <ul className="read-m3__qs">
            {data.grammar3.bands.items.map((it) => (
              <li key={it.id}>
                {it.id}. {it.text} → <em>{it.key}</em>
              </li>
            ))}
          </ul>
          <ul className="read-m3__hint">
            {data.grammar3.forms.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </section>
      )}
      {step === 4 && (
        <section className="speak-m3a__panel">
          <p className="write-m2a__expert">{data.testStrategies}</p>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.part2.badge}</span>
            {data.part2.instruction}
          </p>
          <div className="speak-m3a__cue">
            <p>
              <strong>{data.part2.cue.intro}</strong>
            </p>
            <p>{data.part2.cue.shouldSay}</p>
            <ul>
              {data.part2.cue.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p>{data.part2.cue.andWhy}</p>
          </div>
          <p className="read-m3__tip">
            <strong>{data.part2.modelLabel}</strong> {data.part2.modelAnswer}
          </p>
        </section>
      )}
      {step === 5 && (
        <section className="speak-m3a__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.assess5.badge}</span>
            {data.assess5.instruction}
          </p>
          <ol className="read-m3__qs">
            {data.assess5.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
        </section>
      )}

      <div
        className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}
      >
        <button type="button" className="flow-footer__btn" onClick={goPrev}>
          ← Назад
        </button>
        <span className="flow-footer__step">
          {step + 1} / {SPEAK_M5B_STEPS.length}
        </span>
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={goNext}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
