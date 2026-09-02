import { useEffect, useState } from "react";
import {
  SPEAK_M4B_NEXT,
  SPEAK_M4B_STEPS,
  speakingM4b,
} from "../data/speakingM4b";
import { ExpertDiscussPanel } from "./ExpertDiscussPanel";

const data = speakingM4b;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, SPEAK_M4B_STEPS.length - 1));
}

export function SpeakingM4bTrainer({
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
  const [showWorth, setShowWorth] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [vocab, setVocab] = useState<Record<number, string>>({});
  const [pronMatch, setPronMatch] = useState<Record<number, string>>({});
  const [pickedLabel, setPickedLabel] = useState<string | null>(null);
  const [assess, setAssess] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setShowWorth(false);
    setShowTips(false);
    setPicked(null);
    setVocab({});
    setPronMatch({});
    setPickedLabel(null);
    setAssess({});
  }, [restart, initialStep]);

  const usedVocab = new Set(Object.values(vocab));
  const usedLabels = new Set(Object.values(pronMatch));

  const vocabScore = data.vocab2.items.filter(
    (it) => vocab[it.id] === it.key,
  ).length;
  const pronScore = data.pronunciation4.features.filter(
    (f) => pronMatch[f.id] === data.pronunciation4.keys[f.id],
  ).length;

  const needsCheck = step === 1 || step === 3;
  const score = step === 1 ? vocabScore : pronScore;
  const total =
    step === 1
      ? data.vocab2.items.length
      : data.pronunciation4.features.length;

  const placeVocab = (id: number) => {
    if (checked) return;
    if (vocab[id]) {
      setVocab((m) => {
        const n = { ...m };
        delete n[id];
        return n;
      });
      return;
    }
    if (!picked) return;
    setVocab((m) => ({ ...m, [id]: picked }));
    setPicked(null);
  };

  const placePron = (id: number) => {
    if (checked) return;
    if (pronMatch[id]) {
      setPronMatch((m) => {
        const n = { ...m };
        delete n[id];
        return n;
      });
      return;
    }
    if (!pickedLabel) return;
    setPronMatch((m) => ({ ...m, [id]: pickedLabel }));
    setPickedLabel(null);
  };

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowWorth(false);
    setShowTips(false);
    setPicked(null);
    setPickedLabel(null);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (step === 0 && !showWorth) {
      setShowWorth(true);
      return;
    }
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step === 3 && checked && !showTips) {
      setShowTips(true);
      return;
    }
    if (step >= SPEAK_M4B_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowWorth(false);
    setShowTips(false);
    setPicked(null);
    setPickedLabel(null);
    setStep((s) => s + 1);
  };

  const nextLabel =
    step === 0 && !showWorth
      ? "Reveal values →"
      : needsCheck && !checked
        ? "Check →"
        : step === 3 && checked && !showTips
          ? "Show 4b–4c tips →"
          : SPEAK_M4B_NEXT[step];

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
          {SPEAK_M4B_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setShowWorth(false);
                setShowTips(false);
                setPicked(null);
                setPickedLabel(null);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="speak-m3a__panel">
          <h2 className="speak-m3a__h">{data.leadIn.heading}</h2>
          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">{data.leadIn.badge}</span>
            {data.leadIn.instruction}
          </p>
          <div className="speak-m3a__notes-grid">
            {data.leadIn.items.map((it) => (
              <article key={it.id} className="speak-m3a__note-card">
                <p>
                  <strong>{it.id}.</strong> {it.label}
                </p>
                {showWorth && (
                  <p className="speak-m3a__tip">{it.worth}</p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="speak-m3a__panel">
          <h2 className="speak-m3a__h">{data.vocab2.heading}</h2>
          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">{data.vocab2.badge}</span>
            {data.vocab2.instruction}
          </p>
          <div className="speak-m3a__bank">
            {data.vocab2.bank.map((w) => {
              const used = usedVocab.has(w);
              return (
                <button
                  key={w}
                  type="button"
                  className={`pr-chip ${picked === w ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPicked(w)}
                >
                  {w}
                </button>
              );
            })}
          </div>
          <ol className="speak-m3a__tech">
            {data.vocab2.items.map((it) => {
              const val = vocab[it.id];
              const ok = val === it.key;
              let cls = "review-m2__slot";
              if (val) cls += " review-m2__slot--filled";
              if (picked && !val) cls += " review-m2__slot--ready";
              if (checked)
                cls += ok ? " review-m2__slot--ok" : " review-m2__slot--bad";
              return (
                <li key={it.id}>
                  <strong>{it.id}.</strong> {it.before}
                  <button
                    type="button"
                    className={cls}
                    disabled={checked}
                    onClick={() => placeVocab(it.id)}
                  >
                    {val ?? "________"}
                  </button>
                  {it.after}
                  {checked && !ok && (
                    <span className="inline-gap-bad"> → {it.key}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {step === 2 && (
        <ExpertDiscussPanel
          key="discuss3"
          badge={data.discuss3.badge}
          instruction={data.discuss3.instruction}
          questions={data.discuss3.questions}
          suggestedTitle={data.discuss3.suggestedTitle}
          suggestedAnswer={data.discuss3.suggestedAnswer}
        />
      )}

      {step === 3 && (
        <section className="speak-m3a__panel">
          <h2 className="speak-m3a__h">{data.pronunciation4.heading}</h2>
          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">
              {data.pronunciation4.badge}
            </span>
            {data.pronunciation4.instruction}
          </p>
          <div className="speak-m3a__bank">
            {data.pronunciation4.labels.map((l) => {
              const used = usedLabels.has(l.id);
              return (
                <button
                  key={l.id}
                  type="button"
                  className={`pr-chip ${pickedLabel === l.id ? "pr-chip--picked" : ""} ${used ? "pr-chip--used" : ""}`}
                  disabled={checked || used}
                  onClick={() => setPickedLabel(l.id)}
                >
                  {l.id}. {l.text}
                </button>
              );
            })}
          </div>
          <ol className="speak-m3a__tech">
            {data.pronunciation4.features.map((f) => {
              const val = pronMatch[f.id];
              const ok = val === data.pronunciation4.keys[f.id];
              let cls = "review-m2__slot";
              if (val) cls += " review-m2__slot--filled";
              if (pickedLabel && !val) cls += " review-m2__slot--ready";
              if (checked)
                cls += ok ? " review-m2__slot--ok" : " review-m2__slot--bad";
              return (
                <li key={f.id}>
                  <strong>{f.id}.</strong> {f.text}{" "}
                  <button
                    type="button"
                    className={cls}
                    disabled={checked}
                    onClick={() => placePron(f.id)}
                  >
                    {val ?? "—"}
                  </button>
                  {checked && !ok && (
                    <span className="inline-gap-bad">
                      {" "}
                      → {data.pronunciation4.keys[f.id]}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
          {showTips && (
            <>
              <p className="speak-m3a__instr">
                <span className="write-m2a__badge">
                  {data.pronunciation4.listen4b.badge}
                </span>
                {data.pronunciation4.listen4b.instruction}
              </p>
              <p className="speak-m3a__tip">
                {data.pronunciation4.listen4b.tip}
              </p>
              <p className="speak-m3a__instr">
                <span className="write-m2a__badge">
                  {data.pronunciation4.analyse4c.badge}
                </span>
                {data.pronunciation4.analyse4c.instruction}
              </p>
              <p className="speak-m3a__tip">
                {data.pronunciation4.analyse4c.tip}
              </p>
            </>
          )}
        </section>
      )}

      {step === 4 && (
        <section className="speak-m3a__panel">
          <h2 className="speak-m3a__h">{data.part3.heading}</h2>
          <p className="write-m2a__expert">{data.part3.strategies}</p>
          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">{data.part3.badge}</span>
            {data.part3.instruction}
          </p>
          <div className="speak-m3a__notes-grid">
            {data.part3.questions.map((q, i) => (
              <article key={q} className="speak-m3a__note-card">
                <p>
                  <strong>{i + 1}.</strong> {q}
                </p>
                <details>
                  <summary>Suggested answer</summary>
                  <p>{data.part3.suggestedAnswers[i]}</p>
                </details>
              </article>
            ))}
          </div>
        </section>
      )}

      {step === 5 && (
        <section className="speak-m3a__panel">
          <h2 className="speak-m3a__h">{data.assess.heading}</h2>
          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">{data.assess.badge}</span>
            {data.assess.instruction}
          </p>
          <ul className="write-m2b__checks">
            {data.assess.items.map((item, i) => (
              <li key={item}>
                <label className="write-m2b__check">
                  <input
                    type="checkbox"
                    checked={!!assess[i]}
                    onChange={() =>
                      setAssess((a) => ({ ...a, [i]: !a[i] }))
                    }
                  />
                  <span>{item}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div
        className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}
      >
        <button type="button" className="flow-footer__btn" onClick={goPrev}>
          ← Назад
        </button>
        {checked && needsCheck ? (
          <span className="flow-footer__result">
            <span className="flow-footer__ok">✓ {score}</span>
            <span className="flow-footer__bad">✗ {total - score}</span>
          </span>
        ) : (
          <span className="flow-footer__step">
            {step + 1} / {SPEAK_M4B_STEPS.length}
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
