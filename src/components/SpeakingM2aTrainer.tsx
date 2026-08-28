import { useEffect, useState } from "react";
import {
  SPEAK_M2A_NEXT,
  SPEAK_M2A_STEPS,
  speakingM2a,
} from "../data/speakingM2a";

const data = speakingM2a;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, SPEAK_M2A_STEPS.length - 1));
}

function CueCard({
  cue,
}: {
  cue: {
    intro: string;
    shouldSay: string;
    bullets: string[];
    andWhy: string;
  };
}) {
  return (
    <article className="speak-m2a__cue-card" aria-label="IELTS cue card">
      <p className="speak-m2a__cue-intro">{cue.intro}</p>
      <p className="speak-m2a__cue-should">{cue.shouldSay}</p>
      <ul className="speak-m2a__cue-bullets">
        {cue.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <p className="speak-m2a__cue-why">{cue.andWhy}</p>
    </article>
  );
}

function ChoicePanel({
  options,
  choice,
  checked,
  keyId,
  tip,
  onPick,
}: {
  options: { id: string; label: string }[];
  choice: string | null;
  checked: boolean;
  keyId: string;
  tip: string;
  onPick: (id: string) => void;
}) {
  const ok = choice === keyId;
  return (
    <div className="speak-m2a__answer">
      <p className="speak-m2a__answer-label">Your answer</p>
      <ul className="speak-m2a__opts">
        {options.map((opt) => {
          let state = "";
          if (checked) {
            if (opt.id === keyId) state = "speak-m2a__opt--ok";
            else if (choice === opt.id) state = "speak-m2a__opt--bad";
          } else if (choice === opt.id) {
            state = "speak-m2a__opt--picked";
          }
          return (
            <li key={opt.id}>
              <button
                type="button"
                className={`speak-m2a__opt ${state}`}
                disabled={checked}
                onClick={() => onPick(opt.id)}
              >
                <span className="speak-m2a__opt-letter">
                  {opt.id.toUpperCase()}
                </span>
                <span>{opt.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {checked && (
        <p
          className={`pr-endings-panel__tip speak-m1b__tip ${ok ? "" : "speak-m2a__tip--bad"}`}
        >
          {ok ? "✓ " : "→ "}
          {tip}
        </p>
      )}
    </div>
  );
}

export function SpeakingM2aTrainer({
  onBack,
  restart,
  initialStep,
}: {
  onBack?: () => void;
  restart?: boolean;
  initialStep?: number;
}) {
  const [step, setStep] = useState(() => clampStep(initialStep));
  const [choice2a, setChoice2a] = useState<string | null>(null);
  const [choice3a, setChoice3a] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChoice2a(null);
    setChoice3a(null);
    setChecked(false);
    setNotes({});
  }, [restart, initialStep]);

  const checkStep = step === 1 || step === 2;
  const choice = step === 1 ? choice2a : step === 2 ? choice3a : null;
  const ok =
    step === 1
      ? choice2a === data.step2a.key
      : step === 2
        ? choice3a === data.step3a.key
        : false;

  const setNote = (id: string, value: string) => {
    setNotes((n) => ({ ...n, [id]: value }));
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
    if (checkStep && !checked) {
      setChecked(true);
      return;
    }
    if (step >= SPEAK_M2A_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    checkStep && !checked ? "Check →" : SPEAK_M2A_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport speak-m1b speak-m2a">
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
          {SPEAK_M2A_STEPS.map((label, i) => (
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
              <span>Lead-in</span>
            </figcaption>
          </figure>
          <div className="speak-m1b__prompt">
            <p className="speak-m1b__instr">
              <span className="speak-m1b__badge">{data.leadIn.badge}</span>
              {data.leadIn.instruction}
            </p>
            <p className="speak-m1b__cue">Discuss with a partner</p>
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="speak-m2a__task">
          <header className="speak-m2a__head">
            <h2 className="speak-m1b__section-title">{data.step2a.heading}</h2>
            <p className="speak-m1b__instr speak-m1b__instr--compact">
              <span className="speak-m1b__badge">{data.step2a.badge}</span>
              {data.step2a.instruction}
            </p>
          </header>
          <div className="speak-m2a__split">
            <CueCard cue={data.step2a.cue} />
            <ChoicePanel
              options={data.step2a.options}
              choice={choice2a}
              checked={checked}
              keyId={data.step2a.key}
              tip={data.step2a.tip}
              onPick={setChoice2a}
            />
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="speak-m2a__task speak-m2a__task--plan">
          <header className="speak-m2a__head">
            <h2 className="speak-m1b__section-title">{data.step3a.heading}</h2>
            <p className="speak-m1b__instr speak-m1b__instr--compact">
              <span className="speak-m1b__badge">{data.step3a.badge}</span>
              {data.step3a.instruction}
            </p>
          </header>

          <div className="speak-m2a__plan">
            <CueCard cue={data.step3a.cue} />

            <div className="speak-m2a__mind" aria-label="Student notes mind map">
              <span className="speak-m2a__mind-line speak-m2a__mind-line--tl" />
              <span className="speak-m2a__mind-line speak-m2a__mind-line--tr" />
              <span className="speak-m2a__mind-line speak-m2a__mind-line--bl" />
              <span className="speak-m2a__mind-line speak-m2a__mind-line--br" />
              <div className="speak-m2a__mind-centre">
                {data.step3a.mindMap.centre}
              </div>
              {data.step3a.mindMap.bubbles.map((b) => (
                <div
                  key={b.id}
                  className={`speak-m2a__bubble speak-m2a__bubble--${b.place}`}
                >
                  <strong>{b.heading}</strong>
                  <span>{b.notes}</span>
                </div>
              ))}
            </div>

            <ChoicePanel
              options={data.step3a.options}
              choice={choice3a}
              checked={checked}
              keyId={data.step3a.key}
              tip={data.step3a.tip}
              onPick={setChoice3a}
            />
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="speak-m2a__task speak-m2a__task--yours">
          <header className="speak-m2a__head">
            <h2 className="speak-m1b__section-title">{data.step3b.heading}</h2>
            <p className="speak-m1b__instr speak-m1b__instr--compact">
              <span className="speak-m1b__badge">{data.step3b.badge}</span>
              {data.step3b.instruction}
            </p>
          </header>

          <div className="speak-m2a__yours">
            <CueCard cue={data.step3b.cue} />

            <div
              className="speak-m2a__mind speak-m2a__mind--edit"
              aria-label="Your notes mind map"
            >
              <span className="speak-m2a__mind-line speak-m2a__mind-line--tl" />
              <span className="speak-m2a__mind-line speak-m2a__mind-line--tr" />
              <span className="speak-m2a__mind-line speak-m2a__mind-line--bl" />
              <span className="speak-m2a__mind-line speak-m2a__mind-line--br" />
              <div className="speak-m2a__mind-centre speak-m2a__mind-centre--edit">
                <input
                  type="text"
                  value={notes.centre ?? ""}
                  placeholder={data.step3b.mindMap.centrePlaceholder}
                  aria-label="Central place"
                  onChange={(e) => setNote("centre", e.target.value)}
                />
              </div>
              {data.step3b.mindMap.bubbles.map((b) => (
                <label
                  key={b.id}
                  className={`speak-m2a__bubble speak-m2a__bubble--edit speak-m2a__bubble--${b.place}`}
                >
                  <strong>{b.heading}</strong>
                  <textarea
                    rows={2}
                    value={notes[b.id] ?? ""}
                    placeholder={b.placeholder}
                    onChange={(e) => setNote(b.id, e.target.value)}
                  />
                </label>
              ))}
            </div>
          </div>

          <p className="speak-m1b__cue speak-m1b__cue--footer">
            {data.step3b.speakCue}
          </p>
        </section>
      )}

      <div className={`flow-footer ${checked ? "flow-footer--checked" : ""}`}>
        <button type="button" className="flow-footer__btn" onClick={goPrev}>
          ← Назад
        </button>
        {checked && checkStep ? (
          <span className="flow-footer__result">
            <span className="flow-footer__ok">✓ {ok ? 1 : 0}</span>
            <span className="flow-footer__bad">✗ {ok ? 0 : 1}</span>
          </span>
        ) : (
          <span className="flow-footer__step">
            {step + 1} / {SPEAK_M2A_STEPS.length}
          </span>
        )}
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={goNext}
          disabled={checkStep && !checked && !choice}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
