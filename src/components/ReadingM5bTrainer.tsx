import { useEffect, useState } from "react";
import {
  checkReadM5b,
  READ_M5B_NEXT,
  READ_M5B_STEPS,
  readingM5b,
} from "../data/readingM5b";

const data = readingM5b;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, READ_M5B_STEPS.length - 1));
}

export function ReadingM5bTrainer({
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

  const needsCheck = step === 2;

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
    if (step >= READ_M5B_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    needsCheck && !checked ? "Check →" : READ_M5B_NEXT[step];

  const passagePane = (
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
  );

  return (
    <div className="app-shell reading-flow reading-flow--viewport read-m3">
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
          {READ_M5B_STEPS.map((label, i) => (
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
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.beforeYouRead.badge}</span>
            {data.beforeYouRead.instruction}
          </p>
          <ol className="read-m3__qs">
            {data.beforeYouRead.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
        </section>
      )}
      {step === 1 && (
        <section className="read-m3__panel">
          <p className="write-m2a__expert">{data.strategies2a.strategies}</p>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.strategies2a.badge}</span>
            {data.strategies2a.instruction}
          </p>
          <ol className="read-m3__qs">
            {data.strategies2a.items.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
        </section>
      )}
      {step === 2 && (
        <section className="read-m3__split read-m3__split--exam">
          {passagePane}
          <aside className="read-m3__side read-m3__side--exam">
            <p className="read-m3__instr">
              <span className="write-m2a__badge">{data.exam.badge}</span>
              {data.exam.diagram.instruction}
            </p>
            <ul className="read-m3__para-slots">
              {data.exam.diagram.gaps.map((g) => {
                const val = answers[g.id] ?? "";
                const ok = checkReadM5b(val, g.answers);
                return (
                  <li key={g.id}>
                    <span>
                      {g.id}. {g.before}
                      <input
                        className={`inline-gap-input ${checked ? (ok ? "inline-gap-input--ok" : "inline-gap-input--bad") : ""}`}
                        value={val}
                        disabled={checked}
                        onChange={(e) =>
                          setAnswers((m) => ({
                            ...m,
                            [g.id]: e.target.value,
                          }))
                        }
                      />
                      {g.after}
                      {checked && !ok && (
                        <span className="inline-gap-bad">
                          {" "}
                          → {g.answers[0]}
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="read-m3__instr">{data.exam.tfng.instruction}</p>
            <div className="read-m3__bank">
              {["True", "False", "Not given"].map((L) => (
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
              {data.exam.tfng.items.map((it) => {
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
                    {checked && !ok && (
                      <span className="inline-gap-bad"> → {it.key}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </aside>
        </section>
      )}
      {step === 3 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.analysis.badge}</span>
            {data.analysis.instruction}
          </p>
        </section>
      )}
      {step === 4 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.discussion.badge}</span>
            {data.discussion.instruction}
          </p>
          <ol className="read-m3__qs">
            {data.discussion.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
        </section>
      )}

      <div
        className={`flow-footer ${checked && needsCheck ? "flow-footer--checked" : ""}`}
      >
        <button type="button" className="flow-footer__btn" onClick={goPrev}>
          ← Назад
        </button>
        <span className="flow-footer__step">
          {step + 1} / {READ_M5B_STEPS.length}
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
