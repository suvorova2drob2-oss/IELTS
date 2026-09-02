import { useEffect, useState } from "react";
import {
  checkReadM9a,
  READ_M9A_NEXT,
  READ_M9A_STEPS,
  readingM9a,
} from "../data/readingM9a";
import { ExpertDiscussPanel } from "./ExpertDiscussPanel";

const data = readingM9a;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, READ_M9A_STEPS.length - 1));
}

export function ReadingM9aTrainer({
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
  const [words, setWords] = useState<Record<number, string>>({});
  const [gaps, setGaps] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setShowTip(false);
    setPicked(null);
    setWords({});
    setGaps({});
  }, [restart, initialStep]);

  const usedWords = new Set(Object.values(words));
  const allExamGaps = [...data.exam.flowGaps, ...data.exam.sentenceGaps];
  const wordsScore = data.words.items.filter(
    (it) => words[it.id] === it.key,
  ).length;
  const examScore = allExamGaps.filter((g) =>
    checkReadM9a(gaps[g.id] ?? "", g.answers),
  ).length;

  const needsCheck = step === 2 || step === 3;
  const score = step === 2 ? wordsScore : examScore;
  const total =
    step === 2 ? data.words.items.length : allExamGaps.length;

  const placeWord = (id: number) => {
    if (checked) return;
    if (words[id]) {
      setWords((m) => {
        const next = { ...m };
        delete next[id];
        return next;
      });
      return;
    }
    if (!picked) return;
    setWords((m) => ({ ...m, [id]: picked }));
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
    if ((step === 0 || step === 1) && !showTip) {
      setShowTip(true);
      return;
    }
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= READ_M9A_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTip(false);
    setPicked(null);
    setStep((s) => s + 1);
  };

  const nextLabel =
    (step === 0 || step === 1) && !showTip
      ? "Show tip →"
      : needsCheck && !checked
        ? "Check →"
        : READ_M9A_NEXT[step];

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

  const gapRow = (
    g: { id: number; before: string; after: string; answers: string[] },
  ) => {
    const val = gaps[g.id] ?? "";
    const ok = checkReadM9a(val, g.answers);
    return (
      <li key={g.id}>
        <span>
          {g.id}. {g.before}
          <span
            className={`inline-gap-wrap ${checked && ok ? "inline-gap-wrap--ok" : ""} ${checked && !ok ? "inline-gap-wrap--bad" : ""}`}
          >
            <input
              className={`inline-gap-input ${checked && ok ? "inline-gap-input--ok" : ""} ${checked && !ok ? "inline-gap-input--bad" : ""}`}
              value={val}
              disabled={checked}
              onChange={(e) =>
                setGaps((s) => ({ ...s, [g.id]: e.target.value }))
              }
            />
            {checked && !ok && (
              <span className="inline-gap-bad"> → {g.answers[0]}</span>
            )}
          </span>
          {g.after}
        </span>
      </li>
    );
  };

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
          {READ_M9A_STEPS.map((label, i) => (
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
          <ol className="read-m3__qs">
            {data.beforeYouRead.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
          {showTip && <p className="read-m3__tip">{data.beforeYouRead.tip}</p>}
        </section>
      )}

      {step === 1 && (
        <section className="read-m3__split">
          {passagePane}
          <aside className="read-m3__side">
            <p className="read-m3__instr">
              <span className="write-m2a__badge">{data.skim.badge}</span>
              {data.skim.instruction}
            </p>
            {showTip && <p className="read-m3__tip">{data.skim.tip}</p>}
          </aside>
        </section>
      )}

      {step === 2 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.words.badge}</span>
            {data.words.instruction}
          </p>
          <div className="read-m3__bank">
            {data.words.bank.map((w) => (
              <button
                key={w}
                type="button"
                className={`pr-chip ${picked === w ? "pr-chip--picked" : ""} ${usedWords.has(w) ? "pr-chip--used" : ""}`}
                disabled={checked || usedWords.has(w)}
                onClick={() => setPicked(w)}
              >
                {w}
              </button>
            ))}
          </div>
          <ul className="read-m3__para-slots listen-m3b__grid">
            {data.words.items.map((it) => {
              const val = words[it.id] ?? "";
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
          {checked && (
            <p className="read-m3__score">
              {score} / {total}
            </p>
          )}
        </section>
      )}

      {step === 3 && (
        <section className="read-m3__split read-m3__split--exam">
          {passagePane}
          <aside className="read-m3__side read-m3__side--exam">
            <p className="write-m2a__expert">{data.exam.strategies}</p>
            <p className="read-m3__instr">
              <span className="write-m2a__badge">{data.exam.badge}</span>
              {data.exam.instruction}
            </p>
            <h3 className="read-m3__hint">{data.exam.flowTitle}</h3>
            <ul className="read-m3__para-slots">{data.exam.flowGaps.map(gapRow)}</ul>
            <h3 className="read-m3__hint">Sentences</h3>
            <ul className="read-m3__para-slots">
              {data.exam.sentenceGaps.map(gapRow)}
            </ul>
            {checked && (
              <p className="read-m3__score">
                {score} / {total}
              </p>
            )}
          </aside>
        </section>
      )}

      {step === 4 && (
        <section className="read-m3__panel">
          <p className="read-m3__instr">
            <span className="write-m2a__badge">{data.wrongAnswers.badge}</span>
            {data.wrongAnswers.instruction}
          </p>
          <ul className="read-m3__qs">
            {data.wrongAnswers.items.map((it) => (
              <li key={it.id}>
                <strong>Q{it.id}:</strong> {it.wrong}
                <p className="read-m3__tip">{it.tip}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {step === 5 && (
        <ExpertDiscussPanel
          key="discussion"
          badge={data.discussion.badge}
          instruction={data.discussion.instruction}
          questions={data.discussion.questions}
          suggestedTitle={data.discussion.suggestedTitle}
          suggestedAnswer={data.discussion.suggestedAnswer}
        />
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
