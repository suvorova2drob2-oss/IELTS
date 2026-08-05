import { useState } from "react";
import {
  checkAnswer,
  readingCompletionM1,
  type GapItem,
  type ReadingCompletionData,
} from "../data/readingCompletionM1";

function GapInput({
  item,
  value,
  onChange,
  showResult,
  mode,
}: {
  item: GapItem;
  value: string;
  onChange: (v: string) => void;
  showResult: boolean;
  mode: "practice" | "exam";
}) {
  const correct = showResult && checkAnswer(value, item.answers);
  const wrong = showResult && value.trim() && !correct;

  return (
    <div className={`gap-item ${correct ? "gap-item--ok" : ""} ${wrong ? "gap-item--bad" : ""}`}>
      <label>
        <span className="gap-num">{item.id}</span>
        {item.label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`max ${item.maxWords} word(s)`}
        disabled={showResult && correct}
      />
      {mode === "practice" && !showResult && (
        <p className="gap-hint">💡 {item.hint}</p>
      )}
      {showResult && (
        <p className="gap-feedback">
          {correct ? "✓ Correct" : `Answer: ${item.answers[0]}`}
        </p>
      )}
    </div>
  );
}

export function ReadingCompletionTrainer({
  data,
  onBack,
  contextLabel,
}: {
  data: ReadingCompletionData;
  onBack?: () => void;
  contextLabel?: string;
}) {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<"practice" | "exam">("practice");
  const [predictAnswers, setPredictAnswers] = useState<string[]>(() =>
    data.predictSection.questions.map(() => ""),
  );
  const [noteAnswers, setNoteAnswers] = useState<string[]>(() =>
    data.notes.items.map(() => ""),
  );
  const [tableAnswers, setTableAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  const allGaps: GapItem[] = [
    ...data.notes.items,
    ...data.table.rows.flatMap((r) => [...r.advice, ...r.benefits]),
  ];

  const setTable = (id: number, v: string) =>
    setTableAnswers((prev) => ({ ...prev, [id]: v }));

  const scoreGaps = () =>
    allGaps.filter((g) => checkAnswer(getGapValue(g), g.answers)).length;

  const getGapValue = (item: GapItem) => {
    if (item.id <= 4) return noteAnswers[item.id - 1] ?? "";
    return tableAnswers[item.id] ?? "";
  };

  const setGapValue = (item: GapItem, v: string) => {
    if (item.id <= 4) {
      setNoteAnswers((prev) => {
        const next = [...prev];
        next[item.id - 1] = v;
        return next;
      });
    } else {
      setTable(item.id, v);
    }
  };

  return (
    <div className="app-shell">
      {onBack && (
        <button type="button" className="back-link" onClick={onBack}>
          ← Назад к модулю
        </button>
      )}
      {contextLabel && <p className="trainer-context">{contextLabel}</p>}

      <div className="top-bar">
        <span className="badge">Module {data.module} · Reading</span>
        <div className="controls mode-toggle">
          <button
            type="button"
            className={mode === "practice" ? "active" : ""}
            onClick={() => { setMode("practice"); setChecked(false); }}
          >
            Practice
          </button>
          <button
            type="button"
            className={mode === "exam" ? "active" : ""}
            onClick={() => { setMode("exam"); setChecked(false); }}
          >
            Exam
          </button>
        </div>
      </div>

      <header className="hero">
        <h1>{data.subtitle}</h1>
        <p>Predict language → note completion → table completion</p>
      </header>

      <div className="step-track">
        {["Predict", "Notes 1–4", "Table 5–9", "Result"].map((label, i) => (
          <button
            key={label}
            type="button"
            className={`step-pill ${i === step ? "step-pill--active" : ""}`}
            onClick={() => { setStep(i); setChecked(false); }}
          >
            {label}
          </button>
        ))}
      </div>

      {step === 0 && (
        <section className="card">
          <h2 className="card-title">
            <span className="dot" />
            2a — Predict language
          </h2>
          <p className="article-preview__label">Predict language · Scan for information</p>
          <p className="question-text">{data.predictSection.context}</p>

          {data.predictSection.questions.map((q, i) => (
            <div key={q.text} className="predict-q">
              <p><strong>{i + 1}.</strong> {q.text}</p>
              {mode === "practice" && (
                <p className="gap-hint">💡 {q.hint}</p>
              )}
              <input
                type="text"
                value={predictAnswers[i]}
                onChange={(e) => {
                  const next = [...predictAnswers];
                  next[i] = e.target.value;
                  setPredictAnswers(next);
                }}
                placeholder="Your answer"
              />
              {checked && (
                <p className="gap-feedback">
                  {checkAnswer(predictAnswers[i], q.answers)
                    ? "✓ Good"
                    : `Suggested: ${q.answers.join(" / ")}`}
                </p>
              )}
            </div>
          ))}

          <button type="button" className="btn-start" onClick={() => setStep(1)}>
            Continue → Notes
          </button>
        </section>
      )}

      {step === 1 && (
        <section className="card">
          <h2 className="card-title">
            <span className="dot" />
            Questions 1–4 · Note completion
          </h2>
          <p className="section-hint">{data.notes.instruction}</p>
          <h3 className="notes-title">{data.notes.title}</h3>

          {data.notes.items.map((item) => (
            <GapInput
              key={item.id}
              item={item}
              value={getGapValue(item)}
              onChange={(v) => setGapValue(item, v)}
              showResult={checked}
              mode={mode}
            />
          ))}

          <button type="button" className="btn-start" onClick={() => setStep(2)}>
            Continue → Table
          </button>
        </section>
      )}

      {step === 2 && (
        <section className="card">
          <h2 className="card-title">
            <span className="dot" />
            Questions 5–9 · Table completion
          </h2>
          <p className="section-hint">{data.table.instruction}</p>
          <h3 className="notes-title">{data.table.title}</h3>

          <div className="completion-table">
            <div className="completion-table__head">
              <span />
              <span>ADVICE</span>
              <span>BENEFITS</span>
            </div>
            {data.table.rows.map((row) => (
              <div key={row.category} className="completion-table__row">
                <span className="completion-table__cat">{row.category}</span>
                <div className="completion-table__cell">
                  {row.advice.map((item) => (
                    <GapInput
                      key={item.id}
                      item={item}
                      value={getGapValue(item)}
                      onChange={(v) => setGapValue(item, v)}
                      showResult={checked}
                      mode={mode}
                    />
                  ))}
                </div>
                <div className="completion-table__cell">
                  {row.benefits.map((item) => (
                    <GapInput
                      key={item.id}
                      item={item}
                      value={getGapValue(item)}
                      onChange={(v) => setGapValue(item, v)}
                      showResult={checked}
                      mode={mode}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="btn-start"
            onClick={() => { setChecked(true); setStep(3); }}
          >
            Check answers →
          </button>
        </section>
      )}

      {step === 3 && (
        <section className="card">
          <h2 className="card-title">
            <span className="dot" />
            Your score
          </h2>
          <p className="score-display">
            {scoreGaps()} / {allGaps.length} gaps correct
          </p>
          <p className="section-hint">
            Compare with your coursebook {data.bookPages}. In exam mode, no hints next time.
          </p>
          <button type="button" className="nav-btn" onClick={() => { setStep(0); setChecked(false); }}>
            Try again
          </button>
        </section>
      )}
    </div>
  );
}

export { readingCompletionM1 };
