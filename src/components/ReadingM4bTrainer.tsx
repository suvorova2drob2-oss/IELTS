import { useEffect, useState } from "react";
import {
  checkReadM4b,
  READ_M4B_NEXT,
  READ_M4B_STEPS,
  readingM4b,
} from "../data/readingM4b";

const data = readingM4b;
const LETTERS = ["A", "B", "C", "D", "E", "F"] as const;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, READ_M4B_STEPS.length - 1));
}

export function ReadingM4bTrainer({
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
  const [match, setMatch] = useState<Record<number, string>>({});
  const [pickedLetter, setPickedLetter] = useState<string | null>(null);
  const [summary, setSummary] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setMatch({});
    setPickedLetter(null);
    setSummary({});
  }, [restart, initialStep]);

  const matchScore = data.exam.matching.filter(
    (it) => match[it.id] === it.key,
  ).length;
  const summaryScore = data.exam.summaryGaps.filter((g) =>
    checkReadM4b(summary[g.id] ?? "", g.answers),
  ).length;

  const needsCheck = step === 1;
  const score = matchScore + summaryScore;
  const total = data.exam.matching.length + data.exam.summaryGaps.length;

  const placeMatch = (id: number) => {
    if (checked) return;
    if (match[id]) {
      setMatch((m) => {
        const next = { ...m };
        delete next[id];
        return next;
      });
      return;
    }
    if (!pickedLetter) return;
    setMatch((m) => ({ ...m, [id]: pickedLetter }));
    setPickedLetter(null);
  };

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setPickedLetter(null);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= READ_M4B_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setPickedLetter(null);
    setStep((s) => s + 1);
  };

  const nextLabel =
    needsCheck && !checked ? "Check →" : READ_M4B_NEXT[step];

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
          {READ_M4B_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setPickedLetter(null);
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
          <p className="write-m2a__cue">Discuss in groups</p>
        </section>
      )}

      {step === 1 && (
        <section className="read-m3__split">
          <article className="read-m3__passage">
            <header className="read-m3__hero read-m3__hero--compact">
              <div>
                <h2>{data.title}</h2>
                <p>{data.subtitle}</p>
              </div>
            </header>
            {data.passage.map((p) => (
              <p key={p.id}>
                <strong className="read-m3__para-id">{p.id}</strong> {p.text}
              </p>
            ))}
          </article>

          <div className="read-m3__tasks">
            <p className="write-m2a__expert">{data.exam.strategies}</p>
            <p className="read-m3__instr">
              <span className="write-m2a__badge">{data.exam.badge}</span>
              {data.exam.matchingInstr}
            </p>
            <div className="read-m3__bank">
              {LETTERS.map((L) => (
                <button
                  key={L}
                  type="button"
                  className={`pr-chip ${pickedLetter === L ? "pr-chip--picked" : ""}`}
                  disabled={checked}
                  onClick={() => setPickedLetter(L)}
                >
                  {L}
                </button>
              ))}
            </div>
            <ol className="read-m3__match-list">
              {data.exam.matching.map((it) => {
                const val = match[it.id];
                const ok = val === it.key;
                let cls = "read-m3__slot";
                if (val) cls += " read-m3__slot--filled";
                if (pickedLetter && !val) cls += " read-m3__slot--ready";
                if (checked)
                  cls += ok ? " read-m3__slot--ok" : " read-m3__slot--bad";
                return (
                  <li key={it.id}>
                    <button
                      type="button"
                      className={cls}
                      disabled={checked}
                      onClick={() => placeMatch(it.id)}
                    >
                      <strong>{it.id}</strong> {it.text}
                      {val ? ` → ${val}` : " → __"}
                    </button>
                    {checked && !ok && (
                      <span className="read-m3__tip">→ {it.key}</span>
                    )}
                  </li>
                );
              })}
            </ol>

            <p className="read-m3__instr">{data.exam.summaryInstr}</p>
            <h3 className="read-m3__h">{data.exam.summaryTitle}</h3>
            <p className="read-m3__summary">
              {data.exam.summaryIntro}
              {data.exam.summaryGaps.map((g) => {
                const val = summary[g.id] ?? "";
                const ok = checked && checkReadM4b(val, g.answers);
                const bad = checked && val && !ok;
                return (
                  <span key={g.id}>
                    {" "}
                    <strong>{g.id}</strong>{" "}
                    <input
                      className={`listen-m3b__input${ok ? " listen-m3b__input--ok" : ""}${bad ? " listen-m3b__input--bad" : ""}`}
                      value={val}
                      disabled={checked}
                      onChange={(e) =>
                        setSummary((s) => ({ ...s, [g.id]: e.target.value }))
                      }
                    />
                    {checked && !ok && (
                      <span className="read-m3__tip"> → {g.answers[0]}</span>
                    )}{" "}
                    {g.after}
                  </span>
                );
              })}
            </p>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="read-m3__panel">
          <h2 className="read-m3__h">{data.analysis.heading}</h2>
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.analysis.badge}</span>
            {data.analysis.instruction}
          </p>
          <ol className="read-m3__qs">
            {data.analysis.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
        </section>
      )}

      {step === 3 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.discussion.badge}</span>
            {data.discussion.instruction}
          </p>
          <ol className="read-m3__qs">
            {data.discussion.statements.map((s) => (
              <li key={s}>{s}</li>
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
        {checked && needsCheck ? (
          <span className="flow-footer__result">
            <span className="flow-footer__ok">✓ {score}</span>
            <span className="flow-footer__bad">✗ {total - score}</span>
          </span>
        ) : (
          <span className="flow-footer__hint" />
        )}
        <button type="button" className="flow-footer__btn" onClick={goNext}>
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
