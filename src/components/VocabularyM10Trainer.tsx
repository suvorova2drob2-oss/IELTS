import { useEffect, useState } from "react";
import {
  VOCAB_M10_NEXT,
  VOCAB_M10_STEPS,
  vocabularyM10,
} from "../data/vocabularyM10";

const data = vocabularyM10;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, VOCAB_M10_STEPS.length - 1));
}

export function VocabularyM10Trainer({
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
  const [showTip, setShowTip] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [mcq, setMcq] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setShowTip(false);
    setPicked(null);
    setAnswers({});
    setMcq({});
  }, [restart, initialStep]);

  const used = new Set(Object.values(answers));
  const needsCheck =
    step === 0 || step === 1 || step === 2 || step === 4 || step === 5;

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

  const bank = (words: string[]) => (
    <div className="read-m3__bank">
      {words.map((w) => (
        <button
          key={w}
          type="button"
          className={`pr-chip ${picked === w ? "pr-chip--picked" : ""} ${used.has(w) ? "pr-chip--used" : ""}`}
          disabled={checked || used.has(w)}
          onClick={() => setPicked(w)}
        >
          {w}
        </button>
      ))}
    </div>
  );

  const matchList = (
    items: { id: number; text: string; key: string }[],
  ) => (
    <ul className="read-m3__para-slots listen-m3b__grid">
      {items.map((it) => {
        const val = answers[it.id] ?? "";
        const ok = val === it.key;
        return (
          <li key={it.id}>
            <span>
              {it.id}. {it.text}{" "}
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
            </span>
          </li>
        );
      })}
    </ul>
  );

  const gapList = (
    items: { id: number; before: string; after: string; answers: string[] }[],
  ) => (
    <ul className="read-m3__para-slots listen-m3b__grid">
      {items.map((it) => {
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
                <span className="inline-gap-bad"> → {it.answers[0]}</span>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTip(false);
    setAnswers({});
    setPicked(null);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if ((step === 3 || step === 5) && !showTip) {
      setShowTip(true);
      return;
    }
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= VOCAB_M10_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTip(false);
    setAnswers({});
    setPicked(null);
    setMcq({});
    setStep((s) => s + 1);
  };

  const nextLabel =
    (step === 3 || step === 5) && !showTip
      ? "Show tip →"
      : needsCheck && !checked
        ? "Check →"
        : VOCAB_M10_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport vocab-m3">
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
          {VOCAB_M10_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setAnswers({});
                setShowTip(false);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="vocab-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.match1a.badge}</span>
            {data.match1a.heading}. {data.match1a.instruction}
          </p>
          {bank(data.match1a.bank)}
          {matchList(data.match1a.items)}
        </section>
      )}

      {step === 1 && (
        <section className="vocab-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.forms1b.badge}</span>
            {data.forms1b.instruction}
          </p>
          {bank(data.forms1b.bank)}
          {gapList(data.forms1b.items)}
        </section>
      )}

      {step === 2 && (
        <section className="vocab-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.collocations2a.badge}</span>
            {data.collocations2a.instruction}
          </p>
          {bank(data.collocations2a.bank)}
          {gapList(data.collocations2a.items)}
        </section>
      )}

      {step === 3 && (
        <section className="vocab-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.speaking2b.badge}</span>
            {data.speaking2b.instruction}
          </p>
          {showTip && <p className="read-m3__tip">{data.speaking2b.tip}</p>}
        </section>
      )}

      {step === 4 && (
        <section className="vocab-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.mcq3a.badge}</span>
            {data.mcq3a.instruction}
          </p>
          <ul className="read-m3__para-slots listen-m3b__grid">
            {data.mcq3a.items.map((it) => (
              <li key={it.id}>
                <p>
                  {it.id}. {it.stem}
                </p>
                <div className="read-m3__bank">
                  {it.options.map((opt) => {
                    const on = mcq[it.id] === opt.id;
                    const ok = opt.id === it.key;
                    let cls = "";
                    if (checked) {
                      if (ok) cls = "pr-chip--ok";
                      else if (on) cls = "pr-chip--bad";
                    } else if (on) cls = "pr-chip--picked";
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        className={`pr-chip ${cls}`}
                        disabled={checked}
                        onClick={() =>
                          setMcq((m) => ({ ...m, [it.id]: opt.id }))
                        }
                      >
                        {opt.id}. {opt.text}
                      </button>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {step === 5 && (
        <section className="vocab-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.practice3b.badge}</span>
            {data.practice3b.instruction}
          </p>
          {bank(data.practice3b.bank)}
          {gapList(data.practice3b.items)}
          <p className="read-m3__instr" style={{ marginTop: 12 }}>
            <span className="write-m2a__badge">{data.discuss3c.badge}</span>
            {data.discuss3c.instruction}
          </p>
          {showTip && <p className="read-m3__tip">{data.discuss3c.tip}</p>}
        </section>
      )}

      <footer className="flow-footer">
        <button type="button" className="btn-secondary" onClick={goPrev}>
          ← Back
        </button>
        <button type="button" className="btn-start" onClick={goNext}>
          {nextLabel}
        </button>
      </footer>
    </div>
  );
}
