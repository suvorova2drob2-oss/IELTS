import { useEffect, useState } from "react";
import {
  LANG_M10B_NEXT,
  LANG_M10B_STEPS,
  languageM10b,
} from "../data/languageM10b";

const data = languageM10b;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, LANG_M10B_STEPS.length - 1));
}

export function LanguageM10bTrainer({
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
  const [showModel, setShowModel] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [verdicts, setVerdicts] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setShowModel(false);
    setPicked(null);
    setAnswers({});
    setVerdicts({});
  }, [restart, initialStep]);

  const used = new Set(Object.values(answers));
  const needsCheck = step === 2 || step === 3 || step === 4;

  const place = (id: number) => {
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

  const gapBlock = (
    bank: string[],
    items: { id: number; before: string; after: string; answers: string[] }[],
  ) => (
    <>
      <div className="read-m3__bank">
        {bank.map((w, i) => (
          <button
            key={`${w}-${i}`}
            type="button"
            className={`pr-chip ${picked === w ? "pr-chip--picked" : ""} ${used.has(w) ? "pr-chip--used" : ""}`}
            disabled={checked || used.has(w)}
            onClick={() => setPicked(w)}
          >
            {w}
          </button>
        ))}
      </div>
      <ul className="read-m3__para-slots listen-m3b__grid">
        {items.map((it) => {
          const val = answers[it.id] ?? "";
          const ok = it.answers.includes(val);
          return (
            <li key={it.id}>
              {it.id}. {it.before}
              <button
                type="button"
                className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                disabled={checked}
                onClick={() => place(it.id)}
              >
                {val || "—"}
              </button>
              {it.after}
              {checked && !ok && (
                <span className="inline-gap-bad"> → {it.answers[0]}</span>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowModel(false);
    setAnswers({});
    setPicked(null);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (step === 0 && !showModel) {
      setShowModel(true);
      return;
    }
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= LANG_M10B_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowModel(false);
    setAnswers({});
    setPicked(null);
    setVerdicts({});
    setStep((s) => s + 1);
  };

  const nextLabel =
    step === 0 && !showModel
      ? "Show models →"
      : needsCheck && !checked
        ? "Check →"
        : LANG_M10B_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport lang-m3b">
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
          {LANG_M10B_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setAnswers({});
                setShowModel(false);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>
      <p className="write-m2a__expert">{data.grammarRef}</p>

      {step === 0 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.cleft1a.badge}</span>
            {data.cleft1a.instruction}
          </p>
          <ul className="read-m3__qs">
            {data.cleft1a.items.map((it) => (
              <li key={it.id}>
                <strong>{it.id}.</strong> {it.text}
                <p className="read-m3__tip">{it.tip}</p>
              </li>
            ))}
          </ul>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.rewrite1b.badge}</span>
            {data.rewrite1b.instruction}
          </p>
          <ul className="read-m3__qs">
            {data.rewrite1b.items.map((it) => (
              <li key={it.id}>
                <strong>{it.id}.</strong> {it.stem}
                {showModel && <p className="read-m3__tip">{it.model}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {step === 1 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.speak1c.badge}</span>
            {data.speak1c.instruction}
          </p>
        </section>
      )}

      {step === 2 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.thereIt2a.badge}</span>
            {data.thereIt2a.instruction}
          </p>
          {gapBlock(data.thereIt2a.bank, data.thereIt2a.items)}
        </section>
      )}

      {step === 3 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.incorrect2b.badge}</span>
            {data.incorrect2b.instruction}
          </p>
          <ul className="read-m3__para-slots">
            {data.incorrect2b.items.map((it) => {
              const val = verdicts[it.id] ?? "";
              const ok = val === it.verdict;
              return (
                <li key={it.id}>
                  <p>
                    {it.id}. {it.text}
                  </p>
                  {(["Correct", "Incorrect"] as const).map((v) => {
                    const on = val === v;
                    let cls = "";
                    if (checked) {
                      if (v === it.verdict) cls = "pr-chip--ok";
                      else if (on) cls = "pr-chip--bad";
                    } else if (on) cls = "pr-chip--picked";
                    return (
                      <button
                        key={v}
                        type="button"
                        className={`pr-chip ${cls}`}
                        disabled={checked}
                        onClick={() =>
                          setVerdicts((m) => ({ ...m, [it.id]: v }))
                        }
                      >
                        {v}
                      </button>
                    );
                  })}
                  {checked && (
                    <p className="read-m3__tip">
                      {ok ? "✓ " : ""}
                      {it.tip}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 4 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.practice2c.badge}</span>
            {data.practice2c.instruction}
          </p>
          {gapBlock(
            [...new Set(data.practice2c.bank)],
            data.practice2c.items,
          )}
          <p className="read-m3__instr" style={{ marginTop: 10 }}>
            <span className="write-m2a__badge">{data.practice2d.badge}</span>
            {data.practice2d.instruction}
          </p>
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
