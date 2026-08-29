import { useEffect, useState } from "react";
import {
  LANG_M10A_NEXT,
  LANG_M10A_STEPS,
  languageM10a,
} from "../data/languageM10a";

const data = languageM10a;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, LANG_M10A_STEPS.length - 1));
}

export function LanguageM10aTrainer({
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
  const [contrast, setContrast] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setShowModel(false);
    setPicked(null);
    setAnswers({});
    setContrast({});
  }, [restart, initialStep]);

  const used = new Set(Object.values(answers));
  const needsCheck = step === 0 || step === 1 || step === 2 || step === 4;

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
        {bank.map((w) => (
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
    if (step === 5 && !showModel) {
      setShowModel(true);
      return;
    }
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= LANG_M10A_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowModel(false);
    setAnswers({});
    setPicked(null);
    setContrast({});
    setStep((s) => s + 1);
  };

  const nextLabel =
    step === 5 && !showModel
      ? "Show models →"
      : needsCheck && !checked
        ? "Check →"
        : LANG_M10A_NEXT[step];

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
          {LANG_M10A_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setAnswers({});
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
            <span className="write-m2a__badge">{data.contrast1a.badge}</span>
            {data.contrast1a.instruction}
          </p>
          <ul className="read-m3__para-slots">
            {data.contrast1a.items.map((it) => (
              <li key={it.id}>
                {it.id}. {it.text}{" "}
                {data.contrast1a.options.map((opt) => {
                  const on = contrast[it.id] === opt;
                  const ok = opt === it.key;
                  let cls = "";
                  if (checked) {
                    if (ok) cls = "pr-chip--ok";
                    else if (on) cls = "pr-chip--bad";
                  } else if (on) cls = "pr-chip--picked";
                  return (
                    <button
                      key={opt}
                      type="button"
                      className={`pr-chip ${cls}`}
                      disabled={checked}
                      onClick={() =>
                        setContrast((m) => ({ ...m, [it.id]: opt }))
                      }
                    >
                      {opt}
                    </button>
                  );
                })}
              </li>
            ))}
          </ul>
        </section>
      )}

      {step === 1 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.link1b.badge}</span>
            {data.link1b.instruction}
          </p>
          {gapBlock(data.link1b.bank, data.link1b.items)}
        </section>
      )}

      {step === 2 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.complete2.badge}</span>
            {data.complete2.instruction}
          </p>
          {gapBlock(data.complete2.bank, data.complete2.items)}
        </section>
      )}

      {step === 3 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.open3.badge}</span>
            {data.open3.instruction}
          </p>
        </section>
      )}

      {step === 4 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.both4a.badge}</span>
            {data.both4a.instruction}
          </p>
          {gapBlock(data.both4a.bank, data.both4a.items)}
          <p className="read-m3__instr" style={{ marginTop: 10 }}>
            <span className="write-m2a__badge">{data.both4b.badge}</span>
            {data.both4b.instruction}
          </p>
          {gapBlock(
            data.both4b.bank,
            data.both4b.items.map((it) => ({
              ...it,
              id: it.id + 10,
            })),
          )}
        </section>
      )}

      {step === 5 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.rewrite4c.badge}</span>
            {data.rewrite4c.instruction}
          </p>
          <ul className="read-m3__qs">
            {data.rewrite4c.items.map((it) => (
              <li key={it.id}>
                <strong>{it.id}.</strong> {it.stem}
                {showModel && <p className="read-m3__tip">{it.model}</p>}
              </li>
            ))}
          </ul>
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
