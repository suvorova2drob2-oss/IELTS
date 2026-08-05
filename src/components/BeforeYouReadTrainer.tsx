import { useEffect, useState } from "react";
import type { BeforeYouReadData, Mode } from "../data/beforeYouReadM1";

export function BeforeYouReadTrainer({
  data,
  onBack,
  contextLabel,
}: {
  data: BeforeYouReadData;
  onBack?: () => void;
  contextLabel?: string;
}) {
  const [mode, setMode] = useState<Mode>("practice");
  const [step, setStep] = useState(0);
  const [predictions, setPredictions] = useState("");
  const [revealedHints, setRevealedHints] = useState(0);
  const [checks, setChecks] = useState<boolean[]>(() =>
    data.checkQuestions.map(() => false),
  );

  useEffect(() => {
    setStep(0);
    setPredictions("");
    setRevealedHints(0);
    setChecks(data.checkQuestions.map(() => false));
  }, [data]);

  return (
    <div className="app-shell">
      {onBack && (
        <button type="button" className="back-link" onClick={onBack}>
          ← Назад к модулю
        </button>
      )}
      {contextLabel && <p className="trainer-context">{contextLabel}</p>}

      <div className="top-bar">
        <span className="badge">
          Module {data.module} · {data.skill}
        </span>
        <div className="controls mode-toggle">
          <button
            type="button"
            className={mode === "practice" ? "active" : ""}
            onClick={() => setMode("practice")}
          >
            Practice
          </button>
          <button
            type="button"
            className={mode === "exam" ? "active" : ""}
            onClick={() => setMode("exam")}
          >
            Exam
          </button>
        </div>
      </div>

      <header className="hero">
        <h1>{data.title}</h1>
        <p>Predict → read in book → check your ideas</p>
      </header>

      <div className="step-track">
        {["Title", "Predict", "Read", "Check"].map((label, i) => (
          <button
            key={label}
            type="button"
            className={`step-pill ${i === step ? "step-pill--active" : ""} ${i < step ? "step-pill--done" : ""}`}
            onClick={() => setStep(i)}
          >
            {i + 1}. {label}
          </button>
        ))}
      </div>

      {step === 0 && (
        <section className="card article-preview">
          <p className="article-preview__label">Read the title and introduction</p>
          <h2 className="article-preview__title">{data.articleTitle}</h2>
          <p className="article-preview__intro">{data.introduction}</p>
          <button type="button" className="btn-start" onClick={() => setStep(1)}>
            Готово — перейти к predict →
          </button>
        </section>
      )}

      {step === 1 && (
        <section className="card">
          <h2 className="card-title">
            <span className="dot" />
            Step 1 — Predict
          </h2>
          <p className="question-text">
            Predict what the passage will say. Make notes before you read the full
            text in the book.
          </p>

          {mode === "practice" && (
            <>
              <div className="hint-buttons">
                {data.predictHints.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`hint-btn ${i < revealedHints ? "revealed" : ""}`}
                    disabled={i < revealedHints}
                    onClick={() =>
                      setRevealedHints((n) =>
                        Math.min(n + 1, data.predictHints.length),
                      )
                    }
                  >
                    💡 Hint {i + 1}
                  </button>
                ))}
              </div>
              {data.predictHints.slice(0, revealedHints).map((hint, i) => (
                <div key={i} className="hint-box">
                  <strong>Hint {i + 1}</strong>
                  {hint}
                </div>
              ))}
              <div className="vocab-panel">
                <h4>Key words to use</h4>
                <div className="vocab-tags">
                  {data.keyVocab.map((w) => (
                    <span key={w} className="vocab-tag">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          <ul className="predict-prompts">
            {data.predictPrompts.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>

          <div className="answer-area">
            <label htmlFor="predict">Your predictions (notes)</label>
            <textarea
              id="predict"
              value={predictions}
              onChange={(e) => setPredictions(e.target.value)}
              placeholder="I think the passage will discuss…"
              rows={8}
            />
          </div>

          <button
            type="button"
            className="btn-start"
            disabled={!predictions.trim()}
            onClick={() => setStep(2)}
          >
            Next: read the passage →
          </button>
        </section>
      )}

      {step === 2 && (
        <section className="card read-step">
          <h2 className="card-title">
            <span className="dot" />
            Step 2 — Read quickly
          </h2>
          <div className="read-step__book">
            <span>📕</span>
            <div>
              <strong>Open your coursebook</strong>
              <p>{data.bookPages}</p>
              <p>Read the passage quickly. Do not do the exercises yet.</p>
            </div>
          </div>
          {predictions && (
            <div className="hint-box">
              <strong>Your predictions</strong>
              {predictions}
            </div>
          )}
          <button type="button" className="btn-start" onClick={() => setStep(3)}>
            I have read it — check predictions →
          </button>
        </section>
      )}

      {step === 3 && (
        <section className="card">
          <h2 className="card-title">
            <span className="dot" />
            Were your predictions mentioned?
          </h2>
          <ul className="check-list">
            {data.checkQuestions.map((q, i) => (
              <li key={q}>
                <label>
                  <input
                    type="checkbox"
                    checked={checks[i]}
                    onChange={() =>
                      setChecks((prev) =>
                        prev.map((v, j) => (j === i ? !v : v)),
                      )
                    }
                  />
                  {q}
                </label>
              </li>
            ))}
          </ul>
          <p className="section-hint">
            Next in book: scan for information · note and table completion
          </p>
        </section>
      )}
    </div>
  );
}
