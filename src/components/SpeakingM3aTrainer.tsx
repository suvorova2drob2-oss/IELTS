import { useEffect, useState } from "react";
import {
  checkSpeakM3a,
  SPEAK_M3A_NEXT,
  SPEAK_M3A_STEPS,
  speakingM3a,
} from "../data/speakingM3a";

const data = speakingM3a;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, SPEAK_M3A_STEPS.length - 1));
}

export function SpeakingM3aTrainer({
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
  const [quiz, setQuiz] = useState<Record<number, "yes" | "no">>({});
  const [forms, setForms] = useState<Record<number, string>>({});
  const [pickedWords, setPickedWords] = useState<string[]>([]);
  const [showModel2b, setShowModel2b] = useState(false);
  const [techNotes, setTechNotes] = useState<Record<string, string>>({});
  const [showTips, setShowTips] = useState(false);
  const [notes4, setNotes4] = useState<Record<number, { brief: string; develop: string }>>({
    0: { brief: "", develop: "" },
    1: { brief: "", develop: "" },
  });
  const [showModel4, setShowModel4] = useState(false);
  const [notes5, setNotes5] = useState<Record<number, string>>({
    0: "",
    1: "",
    2: "",
  });

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setQuiz({});
    setForms({});
    setPickedWords([]);
    setShowModel2b(false);
    setTechNotes({});
    setShowTips(false);
    setNotes4({ 0: { brief: "", develop: "" }, 1: { brief: "", develop: "" } });
    setShowModel4(false);
    setNotes5({ 0: "", 1: "", 2: "" });
  }, [restart, initialStep]);

  const formScore = data.wordForms.rows.filter((row) => {
    if (row.nounBlank) return checkSpeakM3a(forms[row.id] ?? "", row.nounAnswers);
    if (row.adjectiveBlank)
      return checkSpeakM3a(forms[row.id] ?? "", row.adjectiveAnswers!);
    return false;
  }).length;

  const needsCheck = step === 2;
  const yesCount = Object.values(quiz).filter((v) => v === "yes").length;

  const toggleWord = (w: string) => {
    setPickedWords((prev) =>
      prev.includes(w) ? prev.filter((x) => x !== w) : [...prev, w],
    );
  };

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowModel2b(false);
    setShowTips(false);
    setShowModel4(false);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step === 3 && !showModel2b) {
      setShowModel2b(true);
      return;
    }
    if (step === 4 && !showTips) {
      setShowTips(true);
      return;
    }
    if (step === 5 && !showModel4) {
      setShowModel4(true);
      return;
    }
    if (step >= SPEAK_M3A_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowModel2b(false);
    setShowTips(false);
    setShowModel4(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    needsCheck && !checked
      ? "Check →"
      : step === 3 && !showModel2b
        ? "Show model →"
        : step === 4 && !showTips
          ? "Show language tips →"
          : step === 5 && !showModel4
            ? "Show models →"
            : SPEAK_M3A_NEXT[step];

  return (
    <div className="app-shell reading-flow reading-flow--viewport speak-m3a">
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
          {SPEAK_M3A_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setShowModel2b(false);
                setShowTips(false);
                setShowModel4(false);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="speak-m3a__lead">
          <figure className="speak-m3a__hero">
            <img src={data.image} alt={data.imageAlt} />
          </figure>
          <div className="speak-m3a__quiz">
            <h2 className="speak-m3a__h">{data.quiz.heading}</h2>
            <p className="speak-m3a__instr">
              <span className="write-m2a__badge">{data.quiz.badge}</span>
              {data.quiz.instruction}
            </p>
            <div className="speak-m3a__quiz-card">
              <h3>{data.quiz.title}</h3>
              <ol>
                {data.quiz.items.map((item, i) => (
                  <li key={item}>
                    <span>{item}</span>
                    <div className="speak-m3a__yn">
                      {(["yes", "no"] as const).map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className={`pr-chip ${quiz[i] === opt ? "pr-chip--picked" : ""}`}
                          onClick={() =>
                            setQuiz((q) => ({ ...q, [i]: opt }))
                          }
                        >
                          {opt === "yes" ? "Yes" : "No"}
                        </button>
                      ))}
                    </div>
                  </li>
                ))}
              </ol>
              {Object.keys(quiz).length === 5 && (
                <p className="speak-m3a__score">
                  Yes answers: {yesCount}/5 — more Yes → more positive outlook
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="speak-m3a__panel">
          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">{data.discuss.badge}</span>
            {data.discuss.instruction}
          </p>
          <figure className="speak-m3a__hero speak-m3a__hero--sm">
            <img src={data.image} alt={data.imageAlt} />
          </figure>
          <p className="write-m2a__cue">Discuss with a partner</p>
        </section>
      )}

      {step === 2 && (
        <section className="speak-m3a__panel">
          <h2 className="speak-m3a__h">{data.wordForms.heading}</h2>
          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">{data.wordForms.badge}</span>
            {data.wordForms.instruction}
          </p>
          <table className="speak-m3a__table">
            <thead>
              <tr>
                <th>Noun</th>
                <th>Adjective</th>
              </tr>
            </thead>
            <tbody>
              {data.wordForms.rows.map((row) => {
                const val = forms[row.id] ?? "";
                const answers = row.nounBlank
                  ? row.nounAnswers
                  : row.adjectiveAnswers!;
                const ok = checkSpeakM3a(val, answers);
                return (
                  <tr key={row.id}>
                    <td>
                      {row.nounBlank ? (
                        <span
                          className={`inline-gap-wrap ${checked && ok ? "inline-gap-wrap--ok" : ""} ${checked && !ok ? "inline-gap-wrap--bad" : ""}`}
                        >
                          <strong className="speak-m3a__n">{row.id}</strong>
                          <input
                            className={`inline-gap-input ${checked && ok ? "inline-gap-input--ok" : ""} ${checked && !ok ? "inline-gap-input--bad" : ""}`}
                            value={val}
                            disabled={checked}
                            onChange={(e) =>
                              setForms((f) => ({
                                ...f,
                                [row.id]: e.target.value,
                              }))
                            }
                          />
                          {checked && !ok && (
                            <span className="inline-gap-bad">
                              {" "}
                              → {answers[0]}
                            </span>
                          )}
                        </span>
                      ) : (
                        row.noun
                      )}
                    </td>
                    <td>
                      {row.adjectiveBlank ? (
                        <span
                          className={`inline-gap-wrap ${checked && ok ? "inline-gap-wrap--ok" : ""} ${checked && !ok ? "inline-gap-wrap--bad" : ""}`}
                        >
                          <strong className="speak-m3a__n">{row.id}</strong>
                          <input
                            className={`inline-gap-input ${checked && ok ? "inline-gap-input--ok" : ""} ${checked && !ok ? "inline-gap-input--bad" : ""}`}
                            value={val}
                            disabled={checked}
                            onChange={(e) =>
                              setForms((f) => ({
                                ...f,
                                [row.id]: e.target.value,
                              }))
                            }
                          />
                          {checked && !ok && (
                            <span className="inline-gap-bad">
                              {" "}
                              → {answers[0]}
                            </span>
                          )}
                        </span>
                      ) : (
                        row.adjective
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      )}

      {step === 3 && (
        <section className="speak-m3a__panel">
          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">{data.relevant.badge}</span>
            {data.relevant.instruction}
          </p>
          <aside className="speak-m3a__examiner">{data.relevant.examiner}</aside>
          <div className="speak-m3a__bank">
            {data.relevant.bank.map((w) => (
              <button
                key={w}
                type="button"
                className={`pr-chip ${pickedWords.includes(w) ? "pr-chip--picked" : ""}`}
                onClick={() => toggleWord(w)}
              >
                {w}
              </button>
            ))}
          </div>
          {showModel2b && (
            <aside className="speak-m3a__model">
              <strong>{data.relevant.modelLabel}</strong>
              <p>{data.relevant.modelAnswer}</p>
            </aside>
          )}
        </section>
      )}

      {step === 4 && (
        <section className="speak-m3a__panel">
          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">{data.techniques.badge}</span>
            {data.techniques.instruction}
          </p>
          <ul className="speak-m3a__tech">
            {data.techniques.items.map((it, i) => (
              <li key={it.id}>
                <label>
                  <strong>
                    {it.id} {it.label}
                  </strong>
                  <input
                    className="speak-m3a__tech-input"
                    value={techNotes[it.id] ?? ""}
                    placeholder="e.g. language phrases…"
                    onChange={(e) =>
                      setTechNotes((t) => ({ ...t, [it.id]: e.target.value }))
                    }
                  />
                </label>
                {showTips && (
                  <p className="speak-m3a__tip">→ {data.techniques.tips[i]}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {step === 5 && (
        <section className="speak-m3a__panel">
          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">{data.notes4.badge}</span>
            {data.notes4.instruction}
          </p>
          <div className="speak-m3a__notes-grid">
            {data.notes4.questions.map((q, i) => (
              <article key={q} className="speak-m3a__note-card">
                <p>
                  <strong>{i + 1}.</strong> {q}
                </p>
                <label>
                  Brief note
                  <textarea
                    rows={2}
                    value={notes4[i]?.brief ?? ""}
                    onChange={(e) =>
                      setNotes4((n) => ({
                        ...n,
                        [i]: { ...n[i], brief: e.target.value },
                      }))
                    }
                  />
                </label>
                <label>
                  Develop (3b techniques)
                  <textarea
                    rows={3}
                    value={notes4[i]?.develop ?? ""}
                    onChange={(e) =>
                      setNotes4((n) => ({
                        ...n,
                        [i]: { ...n[i], develop: e.target.value },
                      }))
                    }
                  />
                </label>
              </article>
            ))}
          </div>
          {showModel4 && (
            <aside className="speak-m3a__model">
              <strong>{data.notes4.modelLabel}</strong>
              {data.notes4.models.map((m, i) => (
                <p key={i}>
                  <strong>{i + 1}.</strong> {m}
                </p>
              ))}
            </aside>
          )}
        </section>
      )}

      {step === 6 && (
        <section className="speak-m3a__panel">
          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">{data.notes5.badge}</span>
            {data.notes5.instruction}
          </p>
          <div className="speak-m3a__notes-grid speak-m3a__notes-grid--3">
            {data.notes5.questions.map((q, i) => (
              <article key={q} className="speak-m3a__note-card">
                <p>
                  <strong>{i + 1}.</strong> {q}
                </p>
                <textarea
                  rows={4}
                  placeholder="Develop your answer…"
                  value={notes5[i] ?? ""}
                  onChange={(e) =>
                    setNotes5((n) => ({ ...n, [i]: e.target.value }))
                  }
                />
              </article>
            ))}
          </div>
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
            <span className="flow-footer__ok">✓ {formScore}</span>
            <span className="flow-footer__bad">
              ✗ {data.wordForms.rows.length - formScore}
            </span>
          </span>
        ) : (
          <span className="flow-footer__step">
            {step + 1} / {SPEAK_M3A_STEPS.length}
          </span>
        )}
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
