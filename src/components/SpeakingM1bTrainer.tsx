import { useEffect, useState } from "react";
import {
  SPEAK_M1B_NEXT,
  SPEAK_M1B_STEPS,
  speakingM1b,
} from "../data/speakingM1b";

const data = speakingM1b;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, SPEAK_M1B_STEPS.length - 1));
}

export function SpeakingM1bTrainer({
  onBack,
  restart,
  initialStep,
}: {
  onBack?: () => void;
  restart?: boolean;
  initialStep?: number;
}) {
  const [step, setStep] = useState(() => clampStep(initialStep));
  const [picked, setPicked] = useState<string | null>(null);
  const [placed, setPlaced] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
  const [activeQ, setActiveQ] = useState(0);

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setPicked(null);
    setPlaced({});
    setChecked(false);
    setChecklist({});
    setActiveQ(0);
  }, [restart, initialStep]);

  const used = new Set(Object.values(placed));
  const score = data.step1b.items.filter(
    (it) => placed[it.id] === it.key,
  ).length;

  const place = (id: number) => {
    if (checked || !picked) return;
    setPlaced((p) => {
      const next = { ...p };
      const prev = next[id];
      if (prev === picked) {
        delete next[id];
        return next;
      }
      next[id] = picked;
      return next;
    });
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
    if (step === 1 && !checked) {
      setChecked(true);
      return;
    }
    if (step >= SPEAK_M1B_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    step === 1 && !checked ? "Check answers →" : SPEAK_M1B_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport speak-m1b">
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
          Speaking · {data.bookPages}
        </span>
        <div className="learn-step-tabs">
          {SPEAK_M1B_STEPS.map((label, i) => (
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
        <section className="speak-m1b__lead">
          <figure className="speak-m1b__hero">
            <img src={data.image} alt={data.imageAlt} />
            <figcaption className="speak-m1b__hero-cap">
              <strong>{data.sectionTitle}</strong>
              <span>{data.vocabTitle}</span>
            </figcaption>
          </figure>
          <div className="speak-m1b__prompt">
            <p className="speak-m1b__instr">
              <span className="speak-m1b__badge">1a</span>
              {data.step1a.instruction.replace(/^1a\s*/, "")}
            </p>
            <p className="speak-m1b__cue">Discuss with a partner</p>
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="speak-m1b__colo">
          <p className="speak-m1b__instr speak-m1b__instr--compact">
            <span className="speak-m1b__badge">b</span>
            {data.step1b.instruction}
          </p>
          <p className="speak-m1b__hint">
            Click a verb, then click a gap. Click a filled gap to undo.
          </p>
          <div className="speak-m1b__bank">
            {data.step1b.bank.map((v) => {
              const on = used.has(v);
              return (
                <button
                  key={v}
                  type="button"
                  className={`pr-chip ${picked === v ? "pr-chip--picked" : ""} ${on ? "pr-chip--used" : ""}`}
                  disabled={checked || on}
                  onClick={() => setPicked((p) => (p === v ? null : v))}
                >
                  {v}
                </button>
              );
            })}
          </div>
          <ol className="speak-m1b__gaps">
            {data.step1b.items.map((it) => {
              const val = placed[it.id];
              let state = "";
              if (checked) {
                if (val === it.key) state = "speak-m1b__gap--ok";
                else state = "speak-m1b__gap--bad";
              } else if (val) {
                state = "speak-m1b__gap--filled";
              } else if (picked) {
                state = "speak-m1b__gap--ready";
              }
              return (
                <li key={it.id}>
                  <span className="speak-m1b__n">{it.id}</span>
                  <button
                    type="button"
                    className={`speak-m1b__gap ${state}`}
                    disabled={checked}
                    onClick={() => {
                      if (val && !picked) {
                        setPlaced((p) => {
                          const n = { ...p };
                          delete n[it.id];
                          return n;
                        });
                        return;
                      }
                      place(it.id);
                    }}
                  >
                    {val ?? "······"}
                  </button>
                  <span>{it.gap}</span>
                </li>
              );
            })}
          </ol>
          {checked && (
            <p className="pr-endings-panel__tip speak-m1b__tip">
              Score: {score}/{data.step1b.items.length} · {data.step1b.tip}
            </p>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="speak-m1b__discuss">
          <div className="speak-m1b__discuss-card">
            <span className="speak-m1b__discuss-num" aria-hidden>
              c
            </span>
            <p className="speak-m1b__discuss-q">{data.step1c.instruction}</p>
            <p className="speak-m1b__cue">Discuss with a partner</p>
            <ul className="speak-m1b__vocab-ref">
              {data.step1b.items.map((it) => (
                <li key={it.id}>
                  <strong>{it.key}</strong> {it.gap}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="speak-m1b__test">
          <header className="speak-m1b__test-head">
            <h2 className="speak-m1b__section-title">
              {data.stepTest.heading}
            </h2>
            <p className="speak-m1b__strategies">
              ➤ {data.stepTest.strategies}
            </p>
            <p className="speak-m1b__instr speak-m1b__instr--compact">
              <span className="speak-m1b__badge">3</span>
              {data.stepTest.instruction}
            </p>
          </header>
          <ol className="speak-m1b__qs">
            {data.stepTest.questions.map((q, i) => (
              <li key={q}>
                <button
                  type="button"
                  className={`speak-m1b__q ${activeQ === i ? "speak-m1b__q--on" : ""}`}
                  onClick={() => setActiveQ(i)}
                >
                  <span className="speak-m1b__q-n">{i + 1}</span>
                  <span>{q}</span>
                </button>
              </li>
            ))}
          </ol>
          <p className="speak-m1b__cue speak-m1b__cue--footer">
            Take turns · examiner & candidate · record if possible
          </p>
        </section>
      )}

      {step === 4 && (
        <section className="speak-m1b__assess">
          <header className="speak-m1b__test-head">
            <h2 className="speak-m1b__section-title">
              {data.stepAssess.heading}
            </h2>
            <p className="speak-m1b__instr speak-m1b__instr--compact">
              <span className="speak-m1b__badge">4a</span>
              {data.stepAssess.instruction}
            </p>
          </header>
          <ul className="speak-m1b__checks">
            {data.stepAssess.items.map((item, i) => {
              const on = Boolean(checklist[i]);
              return (
                <li key={item}>
                  <button
                    type="button"
                    className={`speak-m1b__check ${on ? "speak-m1b__check--on" : ""}`}
                    onClick={() =>
                      setChecklist((c) => ({ ...c, [i]: !c[i] }))
                    }
                  >
                    <span className="speak-m1b__check-box" aria-hidden>
                      {on ? "✓" : ""}
                    </span>
                    <span>{item}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="speak-m1b__cue speak-m1b__cue--footer">
            Tick what you did well · note what to improve next time
          </p>
        </section>
      )}

      <div className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={goPrev}>
          ← Back
        </button>
        <span className="flow-footer__step">
          {step + 1} / {SPEAK_M1B_STEPS.length}
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
