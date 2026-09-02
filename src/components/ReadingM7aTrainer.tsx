import { useEffect, useState } from "react";
import {
  READ_M7A_NEXT,
  READ_M7A_STEPS,
  readingM7a,
} from "../data/readingM7a";
import { ExpertDiscussPanel } from "./ExpertDiscussPanel";

const data = readingM7a;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, READ_M7A_STEPS.length - 1));
}

export function ReadingM7aTrainer({
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

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setShowTip(false);
    setPicked(null);
    setAnswers({});
  }, [restart, initialStep]);

  const used = new Set(Object.values(answers));
  const tipSteps = new Set([0, 1]);
  const checkSteps = new Set([2, 3]);

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
    setShowTip(false);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (tipSteps.has(step) && !showTip) {
      setShowTip(true);
      return;
    }
    if (checkSteps.has(step) && !checked) {
      setChecked(true);
      return;
    }
    if (step >= READ_M7A_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTip(false);
    setPicked(null);
    setStep((s) => s + 1);
  };

  const nextLabel =
    tipSteps.has(step) && !showTip
      ? "Show tip →"
      : checkSteps.has(step) && !checked
        ? "Check →"
        : READ_M7A_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport read-m3">
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
          {READ_M7A_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setShowTip(false);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.beforeYouRead.badge}</span>
            {data.beforeYouRead.instruction}
          </p>
          {showTip && <p className="read-m3__tip">{data.beforeYouRead.tip}</p>}
        </section>
      )}

      {step === 1 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.paraphrase.badge}</span>
            {data.paraphrase.instruction}
          </p>
          <ul className="read-m3__opts">
            {data.paraphrase.options.map((o) => (
              <li key={o.id}>
                <strong>{o.id}.</strong> {o.text}
              </li>
            ))}
          </ul>
          {showTip && <p className="read-m3__tip">{data.paraphrase.tip}</p>}
        </section>
      )}

      {step === 2 && (
        <div className="read-m3__split">
          <article className="read-m3__passage">
            <header className="read-m3__hero read-m3__hero--compact">
              <div>
                <h2>{data.title}</h2>
                <p className="read-m3__subtitle">{data.subtitle}</p>
              </div>
            </header>
            {data.passage.map((p) => (
              <p key={p.id}>
                <strong className="read-m3__para-id">{p.id}</strong> {p.text}
              </p>
            ))}
          </article>
          <section className="read-m3__panel">
            <p className="read-m3__instr">
              <span className="write-m2a__badge">{data.matching.badge}</span>
              {data.matching.instruction}
            </p>
            <p className="read-m3__hint">{data.matching.strategies}</p>
            <ul className="read-m3__opts">
              {data.matching.endings.map((o) => (
                <li key={o.id}>
                  <strong>{o.id}</strong> {o.text}
                </li>
              ))}
            </ul>
            <div className="read-m3__bank">
              {data.matching.endings.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className={`pr-chip ${picked === o.id ? "pr-chip--picked" : ""} ${used.has(o.id) ? "pr-chip--used" : ""}`}
                  disabled={checked || used.has(o.id)}
                  onClick={() => setPicked(o.id)}
                >
                  {o.id}
                </button>
              ))}
            </div>
            <ul className="read-m3__para-slots listen-m3b__grid">
              {data.matching.stems.map((s) => {
                const val = answers[s.id] ?? "";
                const ok = val === s.key;
                return (
                  <li key={s.id}>
                    <span>
                      {s.id}. {s.text}{" "}
                      <button
                        type="button"
                        className={`read-m3__slot ${val ? "read-m3__slot--filled" : ""} ${checked ? (ok ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
                        disabled={checked}
                        onClick={() => place(s.id)}
                      >
                        {val || "—"}
                      </button>
                      {checked && !ok && (
                        <span className="inline-gap-bad"> → {s.key}</span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      )}

      {step === 3 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.summary.badge}</span>
            {data.summary.instruction}
          </p>
          <h3>{data.summary.title}</h3>
          <p>
            {data.summary.textBefore6}
            <button
              type="button"
              className={`read-m3__slot ${answers[6] ? "read-m3__slot--filled" : ""} ${checked ? (answers[6] === "D" ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
              disabled={checked}
              onClick={() => place(6)}
            >
              {answers[6] || "6"}
            </button>
            {data.summary.after6}
            <button
              type="button"
              className={`read-m3__slot ${answers[7] ? "read-m3__slot--filled" : ""} ${checked ? (answers[7] === "H" ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
              disabled={checked}
              onClick={() => place(7)}
            >
              {answers[7] || "7"}
            </button>
            {data.summary.after7}
            <button
              type="button"
              className={`read-m3__slot ${answers[8] ? "read-m3__slot--filled" : ""} ${checked ? (answers[8] === "G" ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
              disabled={checked}
              onClick={() => place(8)}
            >
              {answers[8] || "8"}
            </button>
            {data.summary.after8}
            <button
              type="button"
              className={`read-m3__slot ${answers[9] ? "read-m3__slot--filled" : ""} ${checked ? (answers[9] === "I" ? "read-m3__slot--ok" : "read-m3__slot--bad") : ""}`}
              disabled={checked}
              onClick={() => place(9)}
            >
              {answers[9] || "9"}
            </button>
            {data.summary.after9}
          </p>
          <div className="read-m3__bank">
            {data.summary.bank.map((b) => (
              <button
                key={b.id}
                type="button"
                className={`pr-chip ${picked === b.id ? "pr-chip--picked" : ""} ${used.has(b.id) ? "pr-chip--used" : ""}`}
                disabled={checked || used.has(b.id)}
                onClick={() => setPicked(b.id)}
              >
                {b.id} {b.text}
              </button>
            ))}
          </div>
          {checked && <p className="read-m3__tip">Keys: 6D 7H 8G 9I</p>}
        </section>
      )}

      {step === 4 && (
        <ExpertDiscussPanel
          key="discussion"
          badge={data.discussion.badge}
          instruction={data.discussion.instruction}
          questions={data.discussion.questions}
          suggestedTitle={data.discussion.suggestedTitle}
          suggestedAnswer={data.discussion.suggestedAnswer}
        />
      )}

      <div className={`flow-footer ${checked && checkSteps.has(step) ? "flow-footer--checked" : ""}`}>
        <button type="button" className="flow-footer__btn" onClick={goPrev}>
          ← Назад
        </button>
        <span className="flow-footer__step">
          {step + 1} / {READ_M7A_STEPS.length}
        </span>
        <button type="button" className="flow-footer__btn flow-footer__btn--primary" onClick={goNext}>
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
