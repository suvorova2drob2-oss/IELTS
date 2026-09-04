import { useEffect, useState } from "react";
import {
  checkSpeakM3a,
  SPEAK_M3A_NEXT,
  SPEAK_M3A_STEPS,
  speakingM3a,
} from "../data/speakingM3a";
import { ExpertDiscussPanel } from "./ExpertDiscussPanel";
import { SpeakM3aGlassesVisual } from "./SpeakM3aGlassesVisual";

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
  const [techOpen, setTechOpen] = useState<Record<string, boolean>>({});
  const [notes4, setNotes4] = useState<Record<number, { brief: string; develop: string }>>({
    0: { brief: "", develop: "" },
    1: { brief: "", develop: "" },
  });
  const [showModel4, setShowModel4] = useState(false);
  const [model5Open, setModel5Open] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setQuiz({});
    setForms({});
    setPickedWords([]);
    setShowModel2b(false);
    setTechOpen({});
    setNotes4({ 0: { brief: "", develop: "" }, 1: { brief: "", develop: "" } });
    setShowModel4(false);
    setModel5Open({});
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
    setTechOpen({});
    setShowModel4(false);
    setModel5Open({});
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
    setTechOpen({});
    setShowModel4(false);
    setModel5Open({});
    setStep((s) => s + 1);
  };

  const nextLabel =
    needsCheck && !checked
      ? "Check →"
      : step === 3 && !showModel2b
        ? "Show model →"
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
                setTechOpen({});
                setShowModel4(false);
                setModel5Open({});
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
            <SpeakM3aGlassesVisual alt={data.imageAlt} />
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
                    <span className="speak-m3a__q">
                      <strong className="speak-m3a__q-num">{i + 1}</strong>
                      <span className="speak-m3a__q-text">{item}</span>
                    </span>
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
        <ExpertDiscussPanel
          key="discuss"
          badge={data.discuss.badge}
          instruction={data.discuss.instruction}
          suggestedTitle={data.discuss.suggestedTitle}
          suggestedAnswer={data.discuss.suggestedAnswer}
        >
          <figure className="speak-m3a__hero speak-m3a__hero--sm">
            <SpeakM3aGlassesVisual alt={data.imageAlt} compact />
          </figure>
        </ExpertDiscussPanel>
      )}

      {step === 2 && (
        <section className="speak-m3a__panel speak-m3a__panel--forms">
          <div className="speak-m3a__forms-card">
            <h2 className="speak-m3a__h">{data.wordForms.heading}</h2>
            <p className="speak-m3a__instr">
              <span className="write-m2a__badge">{data.wordForms.badge}</span>
              {data.wordForms.instruction}
            </p>
            <table className="speak-m3a__table speak-m3a__table--forms">
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
          </div>
        </section>
      )}

      {step === 3 && (
        <section
          className={`speak-m3a__panel${showModel2b ? " speak-m3a__panel--split" : ""}`}
        >
          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">{data.relevant.badge}</span>
            {data.relevant.instruction}
          </p>
          <div className="speak-m3a__pick-main">
            <aside className="speak-m3a__examiner speak-m3a__examiner--lg">
              {data.relevant.examiner}
            </aside>
            <div className="speak-m3a__bank speak-m3a__bank--lg">
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
            <div className="speak-m3a__picked">
              <strong className="speak-m3a__picked-label">Selected words</strong>
              {pickedWords.length > 0 ? (
                <div className="speak-m3a__picked-chips">
                  {pickedWords.map((w) => (
                    <span key={w} className="pr-chip pr-chip--picked">
                      {w}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="speak-m3a__picked-empty">
                  Tap words from the bank that fit the examiner&apos;s question.
                </p>
              )}
            </div>
          </div>
          {showModel2b && (
            <aside className="speak-m3a__model speak-m3a__model--prominent">
              <strong>{data.relevant.modelLabel}</strong>
              <p>{data.relevant.modelAnswer}</p>
            </aside>
          )}
        </section>
      )}

      {step === 4 && (
        <section className="speak-m3a__panel speak-m3a__panel--tech">
          <p className="speak-m3a__instr speak-m3a__instr--tech">
            <span className="write-m2a__badge">{data.techniques.badge}</span>
            {data.techniques.instruction}
          </p>
          <ul className="speak-m3a__tech speak-m3a__tech--compact">
            {data.techniques.items.map((it, i) => (
              <li key={it.id} className="speak-m3a__tech-card">
                <strong className="speak-m3a__tech-title">
                  {it.id} {it.label}
                </strong>
                <button
                  type="button"
                  className={`speak-m3a__tech-toggle ${techOpen[it.id] ? "speak-m3a__tech-toggle--on" : ""}`}
                  onClick={() =>
                    setTechOpen((t) => ({ ...t, [it.id]: !t[it.id] }))
                  }
                >
                  {techOpen[it.id] ? "Hide phrases" : "Show phrases →"}
                </button>
                {techOpen[it.id] && (
                  <p className="speak-m3a__tech-phrases">{data.techniques.tips[i]}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {step === 5 && (
        <section
          className={`speak-m3a__panel${showModel4 ? " speak-m3a__panel--split" : ""}`}
        >
          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">{data.notes4.badge}</span>
            {data.notes4.instruction}
          </p>
          <div className="speak-m3a__pick-main">
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
          </div>
          {showModel4 && (
            <aside className="speak-m3a__model speak-m3a__model--prominent">
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
        <section className="speak-m3a__panel speak-m3a__panel--speak">
          <p className="speak-m3a__instr">
            <span className="write-m2a__badge">{data.notes5.badge}</span>
            {data.notes5.instruction}
          </p>
          <p className="speak-m3a__speak-cue">{data.notes5.speakCue}</p>
          <div className="speak-m3a__speak-grid">
            {data.notes5.questions.map((q, i) => (
              <article key={q} className="speak-m3a__speak-card">
                <p className="speak-m3a__speak-q">
                  <strong>{i + 1}.</strong> {q}
                </p>
                <button
                  type="button"
                  className={`speak-m3a__model-btn ${model5Open[i] ? "speak-m3a__model-btn--on" : ""}`}
                  onClick={() =>
                    setModel5Open((m) => ({ ...m, [i]: !m[i] }))
                  }
                >
                  {model5Open[i]
                    ? "Hide suggested answer"
                    : data.notes5.modelLabel}
                </button>
                {model5Open[i] && (
                  <aside className="speak-m3a__model speak-m3a__model--prominent speak-m3a__model--inline">
                    <strong>{data.notes5.modelLabel}</strong>
                    <p>{data.notes5.models[i]}</p>
                  </aside>
                )}
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
