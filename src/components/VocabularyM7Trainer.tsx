import { useEffect, useState } from "react";
import {
  VOCAB_M7_NEXT,
  VOCAB_M7_STEPS,
  vocabularyM7,
} from "../data/vocabularyM7";

const data = vocabularyM7;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, VOCAB_M7_STEPS.length - 1));
}

export function VocabularyM7Trainer({
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
  const needsCheck = true;

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

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setAnswers({});
    setPicked(null);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= VOCAB_M7_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setAnswers({});
    setPicked(null);
    setStep((s) => s + 1);
  };

  const nextLabel = needsCheck && !checked ? "Check →" : VOCAB_M7_NEXT[step];

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

  return (
    <div className="app-shell reading-flow reading-flow--viewport vocab-m3">
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
          {VOCAB_M7_STEPS.map((label, i) => (
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

      {step === 0 && (
        <section className="vocab-m3__panel vocab-m3__panel--fill">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.meanings1a.badge}</span>
            {data.meanings1a.instruction}
          </p>
          <div className="read-m3__bank">
            {["A", "B"].map((L) => (
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
          <ul className="read-m3__para-slots listen-m3b__grid">
            {data.meanings1a.items.map((it) => {
              const val = answers[it.id] ?? "";
              const ok = val === it.key;
              return (
                <li key={it.id}>
                  <span>
                    <strong>
                      {it.id}. {it.word}
                    </strong>
                    <br />A {it.a}
                    <br />B {it.b}
                  </span>
                  <button
                    type="button"
                    className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                    disabled={checked}
                    onClick={() => place(it.id)}
                  >
                    {val || "—"}
                  </button>
                  {checked && !ok && <span className="inline-gap-bad"> → {it.key}</span>}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 1 && (
        <section className="vocab-m3__panel vocab-m3__panel--fill">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.complete1b.badge}</span>
            {data.complete1b.instruction}
          </p>
          {bank(data.complete1b.bank)}
          <ul className="read-m3__para-slots">
            {data.complete1b.items.map((it) => {
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
                      onClick={() => place(it.id)}
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
        </section>
      )}

      {step === 2 && (
        <section className="vocab-m3__panel vocab-m3__panel--fill">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.families2.badge}</span>
            {data.families2.instruction}
          </p>
          {bank(data.families2.items.map((i) => i.answers[0]))}
          <ul className="read-m3__para-slots listen-m3b__grid">
            {data.families2.items.map((it) => {
              const val = answers[it.id] ?? "";
              const ok = it.answers.includes(val);
              return (
                <li key={it.id}>
                  <span>
                    {it.id}. {it.noun} →{" "}
                    <button
                      type="button"
                      className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                      disabled={checked}
                      onClick={() => place(it.id)}
                    >
                      {val || "verb"}
                    </button>
                    {checked && !ok && (
                      <span className="inline-gap-bad"> → {it.answers[0]}</span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 3 && (
        <section className="vocab-m3__panel vocab-m3__panel--fill">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.collocations3.badge}</span>
            {data.collocations3.instruction}
          </p>
          {bank(data.collocations3.bank)}
          <ul className="read-m3__para-slots">
            {data.collocations3.items.map((it) => {
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
                      onClick={() => place(it.id)}
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
        </section>
      )}

      {step === 4 && (
        <section className="vocab-m3__panel vocab-m3__panel--fill">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.match4.badge}</span>
            {data.match4.instruction}
          </p>
          <div className="read-m3__bank">
            {data.match4.meanings.map((m) => {
              const u = Object.values(answers).includes(m.id);
              return (
                <button
                  key={m.id}
                  type="button"
                  className={`pr-chip ${picked === m.id ? "pr-chip--picked" : ""} ${u ? "pr-chip--used" : ""}`}
                  disabled={checked || u}
                  onClick={() => setPicked(m.id)}
                >
                  {m.id}
                </button>
              );
            })}
          </div>
          <ul className="pr-endings__bank">
            {data.match4.meanings.map((m) => (
              <li key={m.id}>
                <strong>{m.id}</strong> {m.text}
              </li>
            ))}
          </ul>
          <ul className="read-m3__para-slots listen-m3b__grid">
            {data.match4.items.map((it) => {
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
                    onClick={() => place(it.id)}
                  >
                    {val || "—"}
                  </button>
                  {checked && !ok && <span className="inline-gap-bad"> → {it.key}</span>}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <div className={`flow-footer ${checked ? "flow-footer--checked" : ""}`}>
        <button type="button" className="flow-footer__btn" onClick={goPrev}>
          ← Назад
        </button>
        <span className="flow-footer__step">
          {step + 1} / {VOCAB_M7_STEPS.length}
        </span>
        <button type="button" className="flow-footer__btn flow-footer__btn--primary" onClick={goNext}>
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
