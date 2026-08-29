import { useEffect, useState } from "react";
import {
  WRITE_M5B_NEXT,
  WRITE_M5B_STEPS,
  writingM5b,
} from "../data/writingM5b";

const data = writingM5b;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, WRITE_M5B_STEPS.length - 1));
}

export function WritingM5bTrainer({
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
  const [draft, setDraft] = useState("");
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setPicked(null);
    setAnswers({});
    setDraft("");
    setShowModel(false);
  }, [restart, initialStep]);

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
    if (step >= WRITE_M5B_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowModel(false);
    setAnswers({});
    setPicked(null);
    setStep((s) => s + 1);
  };

  const nextLabel =
    needsCheck && !checked ? "Check →" : WRITE_M5B_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport write-m3a">
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
          {WRITE_M5B_STEPS.map((label, i) => (
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

      <p className="write-m2a__expert">{data.expertWriting}</p>

      {step === 0 && (
        <section className="write-m3a__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.quote1.badge}</span>
            {data.quote1.instruction}
          </p>
          <p className="read-m3__tip">{data.quote1.tip}</p>
        </section>
      )}
      {step === 1 && (
        <section className="write-m3a__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.charts2.badge}</span>
            {data.charts2.instruction}
          </p>
          <p className="read-m3__tip">{data.charts2.tip}</p>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">
              {data.charts2.choose2b.badge}
            </span>
            {data.charts2.choose2b.instruction}
          </p>
          <div className="read-m3__bank">
            {["A", "B", "C"].map((L) => (
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
          <ul className="read-m3__para-slots">
            {data.charts2.choose2b.items.map((it) => {
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
                    onClick={() => placeWord(it.id)}
                  >
                    {val || "—"}
                  </button>
                </li>
              );
            })}
          </ul>
          <ul className="read-m3__tip">
            {data.charts2.ideas2c.tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      )}
      {step === 2 && (
        <section className="write-m3a__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.vocab3.badge}</span>
            {data.vocab3.instruction}
          </p>
          <ul className="listen-m3b__grid">
            {data.vocab3.pairs.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>
      )}
      {step === 3 && (
        <section className="write-m3a__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.plan4.badge}</span>
            {data.plan4.instruction}
          </p>
          <textarea
            className="write-m3a__draft"
            rows={4}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Plan…"
          />
        </section>
      )}
      {step === 4 && (
        <section className="write-m3a__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.write5.badge}</span>
            {data.write5.instruction}
          </p>
          <p className="read-m3__hint">{data.write5.task}</p>
          <textarea
            className="write-m3a__draft"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write at least 150 words…"
          />
          <button
            type="button"
            className="pr-chip"
            onClick={() => setShowModel((v) => !v)}
          >
            {showModel ? "Hide model" : "Show model"}
          </button>
          {showModel && (
            <article className="write-m3a__model-scroll">
              <h3>{data.write5.modelLabel}</h3>
              <p style={{ whiteSpace: "pre-wrap" }}>{data.write5.modelAnswer}</p>
            </article>
          )}
        </section>
      )}
      {step === 5 && (
        <section className="write-m3a__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.peer6.badge}</span>
            {data.peer6.instruction}
          </p>
        </section>
      )}

      <div
        className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}
      >
        <button type="button" className="flow-footer__btn" onClick={goPrev}>
          ← Назад
        </button>
        <span className="flow-footer__step">
          {step + 1} / {WRITE_M5B_STEPS.length}
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
