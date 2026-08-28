import { useEffect, useState } from "react";
import {
  isSpeakItalGap,
  SPEAK_M2B_NEXT,
  SPEAK_M2B_STEPS,
  speakingM2b,
} from "../data/speakingM2b";

const data = speakingM2b;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, SPEAK_M2B_STEPS.length - 1));
}

export function SpeakingM2bTrainer({
  onBack,
  restart,
  initialStep,
}: {
  onBack?: () => void;
  restart?: boolean;
  initialStep?: number;
}) {
  const [step, setStep] = useState(() => clampStep(initialStep));
  const [ital, setItal] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [topic, setTopic] = useState<number | null>(null);
  const [showModel2b, setShowModel2b] = useState(false);
  const [cueIx, setCueIx] = useState(0);
  const [showCueModel, setShowCueModel] = useState(false);

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setItal({});
    setChecked(false);
    setTopic(null);
    setShowModel2b(false);
    setCueIx(0);
    setShowCueModel(false);
  }, [restart, initialStep]);

  const italGaps = data.vocab.parts.filter(isSpeakItalGap);
  const italScore = italGaps.filter((g) => ital[g.gap] === g.key).length;

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowModel2b(false);
    setShowCueModel(false);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (step === 1 && !checked) {
      setChecked(true);
      return;
    }
    if (step === 2 && !showModel2b) {
      setShowModel2b(true);
      return;
    }
    if (step === 3 && cueIx === 0 && !showCueModel) {
      setShowCueModel(true);
      return;
    }
    if (step >= SPEAK_M2B_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowModel2b(false);
    setShowCueModel(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    step === 1 && !checked
      ? "Check →"
      : step === 2 && !showModel2b
        ? "Show model (topic 1) →"
        : step === 3 && cueIx === 0 && !showCueModel
          ? "Show model answer →"
          : SPEAK_M2B_NEXT[step];

  const cue = data.cueCards[cueIx];

  return (
    <div className="app-shell reading-flow reading-flow--viewport speak-m1b speak-m2b">
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
          {SPEAK_M2B_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setShowModel2b(false);
                setShowCueModel(false);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="speak-m2b__photos">
          <div className="speak-m2b__shots">
            {data.photos.images.map((img) => (
              <figure key={img.caption} className="speak-m2b__shot">
                <img src={img.src} alt={img.alt} />
                <figcaption>{img.caption}</figcaption>
              </figure>
            ))}
          </div>
          <div className="speak-m2b__prompt">
            <h2 className="speak-m1b__section-title">{data.photos.heading}</h2>
            <p className="speak-m1b__instr">
              <span className="speak-m1b__badge">{data.photos.badge}</span>
              {data.photos.instruction}
            </p>
            <p className="speak-m1b__cue">Discuss with a partner</p>
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="speak-m2b__vocab">
          <p className="speak-m1b__instr speak-m1b__instr--compact">
            <span className="speak-m1b__badge">{data.vocab.badge}</span>
            {data.vocab.instruction}
          </p>
          <article className="speak-m2b__passage">
            <p>
              {data.vocab.parts.map((part, i) => {
                if (!isSpeakItalGap(part)) {
                  return <span key={i}>{part.text}</span>;
                }
                const sel = ital[part.gap];
                return (
                  <span key={i} className="speak-m2b__gap">
                    <strong className="speak-m2b__n">{part.gap}</strong>
                    {part.options.map((opt) => {
                      let state = "";
                      if (checked) {
                        if (opt === part.key) state = "pr-chip--ok";
                        else if (sel === opt) state = "pr-chip--bad";
                      } else if (sel === opt) state = "pr-chip--picked";
                      return (
                        <button
                          key={opt}
                          type="button"
                          className={`pr-chip ${state}`}
                          disabled={checked}
                          onClick={() =>
                            setItal((a) => ({ ...a, [part.gap]: opt }))
                          }
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </span>
                );
              })}
            </p>
          </article>
        </section>
      )}

      {step === 2 && (
        <section className="speak-m2b__speak">
          <p className="speak-m1b__instr">
            <span className="speak-m1b__badge">{data.speak2b.badge}</span>
            {data.speak2b.instruction}
          </p>
          <ul className="speak-m2b__topics">
            {data.speak2b.topics.map((t, i) => (
              <li key={t}>
                <button
                  type="button"
                  className={`speak-m2b__topic ${topic === i ? "speak-m2b__topic--on" : ""}`}
                  onClick={() => setTopic(i)}
                >
                  <span className="speak-m2b__topic-n">{i + 1}</span>
                  <span>{t}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="speak-m1b__cue">{data.speak2b.speakCue}</p>
          {showModel2b && (
            <aside className="speak-m2b__model">
              <strong>{data.speak2b.modelLabel}</strong>
              <p>{data.speak2b.modelAnswer}</p>
            </aside>
          )}
        </section>
      )}

      {step === 3 && (
        <section className="speak-m2b__cues">
          <div className="speak-m2b__cue-tabs">
            {data.cueCards.map((c, i) => (
              <button
                key={c.id}
                type="button"
                className={`learn-step-tabs__btn ${cueIx === i ? "learn-step-tabs__btn--on" : ""}`}
                onClick={() => {
                  setCueIx(i);
                  setShowCueModel(false);
                }}
              >
                Card {i + 1}
              </button>
            ))}
          </div>
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
          <p className="speak-m1b__cue">1 minute to prepare · 1–2 minutes to speak</p>
          {showCueModel && cueIx === 0 && (
            <aside className="speak-m2b__model">
              <strong>{data.cueModel.label}</strong>
              <p>{data.cueModel.text}</p>
            </aside>
          )}
        </section>
      )}

      {step === 4 && (
        <section className="speak-m2b__models">
          <aside className="speak-m2b__model speak-m2b__model--full">
            <strong>{data.speak2b.modelLabel}</strong>
            <p>{data.speak2b.modelAnswer}</p>
          </aside>
          <aside className="speak-m2b__model speak-m2b__model--full">
            <strong>{data.cueModel.label}</strong>
            <p>{data.cueModel.text}</p>
          </aside>
        </section>
      )}

      <div
        className={`flow-footer ${checked && step === 1 ? "flow-footer--checked" : ""}`}
      >
        <button type="button" className="flow-footer__btn" onClick={goPrev}>
          ← Назад
        </button>
        {checked && step === 1 ? (
          <span className="flow-footer__result">
            <span className="flow-footer__ok">✓ {italScore}</span>
            <span className="flow-footer__bad">
              ✗ {italGaps.length - italScore}
            </span>
          </span>
        ) : (
          <span className="flow-footer__step">
            {step + 1} / {SPEAK_M2B_STEPS.length}
          </span>
        )}
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
