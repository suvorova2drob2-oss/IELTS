import { useEffect, useState } from "react";
import {
  checkListenM4a,
  LISTEN_M4A_NEXT,
  LISTEN_M4A_STEPS,
  listeningM4a,
} from "../data/listeningM4a";

const data = listeningM4a;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, LISTEN_M4A_STEPS.length - 1));
}

export function ListeningM4aTrainer({
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
  const [showTips, setShowTips] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!restart && initialStep == null) return;
    setStep(clampStep(initialStep));
    setChecked(false);
    setShowTips(false);
    setAnswers({});
  }, [restart, initialStep]);

  const examIds = [1, 2, 3, 4, 5, 6, 7] as const;
  const examScore = examIds.filter((id) =>
    checkListenM4a(answers[id] ?? "", data.answerKeys[id]),
  ).length;
  const needsCheck = step === 3;
  const score = examScore;
  const total = examIds.length;

  const goPrev = () => {
    if (step === 0) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTips(false);
    setStep((s) => s - 1);
  };

  const goNext = () => {
    if ((step === 1 || step === 2) && !showTips) {
      setShowTips(true);
      return;
    }
    if (needsCheck && !checked) {
      setChecked(true);
      return;
    }
    if (step >= LISTEN_M4A_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setChecked(false);
    setShowTips(false);
    setStep((s) => s + 1);
  };

  const nextLabel =
    (step === 1 || step === 2) && !showTips
      ? "Show tips →"
      : needsCheck && !checked
        ? "Check →"
        : LISTEN_M4A_NEXT[step];

  const Gap = ({ id }: { id: number }) => {
    const val = answers[id] ?? "";
    const ok = checked && checkListenM4a(val, data.answerKeys[id]);
    const bad = checked && !!val && !ok;
    return (
      <span
        className={`inline-gap-wrap ${ok ? "inline-gap-wrap--ok" : ""} ${bad || (checked && !ok) ? "inline-gap-wrap--bad" : ""}`}
      >
        <input
          className={`listen-m3b__input${ok ? " listen-m3b__input--ok" : ""}${bad || (checked && !ok) ? " listen-m3b__input--bad" : ""}`}
          value={val}
          placeholder={`${id}`}
          aria-label={`Answer ${id}`}
          disabled={checked}
          onChange={(e) =>
            setAnswers((a) => ({ ...a, [id]: e.target.value }))
          }
        />
        {checked && !ok && (
          <span className="inline-gap-bad"> → {data.answerKeys[id][0]}</span>
        )}
      </span>
    );
  };

  return (
    <div className="app-shell reading-flow reading-flow--viewport listen-m3b">
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
          {LISTEN_M4A_STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={`learn-step-tabs__btn ${i === step ? "learn-step-tabs__btn--on" : ""}`}
              onClick={() => {
                setStep(i);
                setChecked(false);
                setShowTips(false);
              }}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      <p className="listen-m3b__banner">{data.noAudioNote}</p>

      {step === 0 && (
        <section className="listen-m3b__panel listen-m3b__panel--lead">
          <div className="listen-m3b__lead-main">
            <h2 className="listen-m3b__h">{data.before.heading}</h2>
            <p className="listen-m3b__instr">
              <span className="write-m2a__badge">{data.before.badge}</span>
              {data.before.instruction}
            </p>
            <ol className="listen-m3b__preview-list">
              {data.before.questions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ol>
            <p className="listen-m3b__cue">Discuss with a partner</p>
            <details>
              <summary>Tip</summary>
              <p className="listen-m3b__tip">{data.before.tip}</p>
            </details>
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="listen-m3b__panel">
          <h2 className="listen-m3b__h">{data.predictTable.heading}</h2>
          <p className="listen-m3b__instr">
            <span className="write-m2a__badge">{data.predictTable.badge}</span>
            {data.predictTable.instruction}
          </p>
          <ol className="listen-m3b__preview-list">
            {data.predictTable.items.map((it) => (
              <li key={it.id}>
                <strong>{it.id}.</strong> {it.q}
                {showTips && (
                  <p className="listen-m3b__tip">→ {it.tip}</p>
                )}
              </li>
            ))}
          </ol>
          <p className="listen-m3b__instr">
            <span className="write-m2a__badge">
              {data.predictTable.predict2b.badge}
            </span>
            {data.predictTable.predict2b.instruction}
          </p>
          {showTips && (
            <p className="listen-m3b__tip">
              → {data.predictTable.predict2b.tip}
            </p>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="listen-m3b__panel">
          <p className="listen-m3b__instr">
            <span className="write-m2a__badge">{data.predictNotes.badge}</span>
            {data.predictNotes.instruction}
          </p>
          {showTips && (
            <p className="listen-m3b__tip">→ {data.predictNotes.tip}</p>
          )}
          <p className="listen-m3b__instr">
            <span className="write-m2a__badge">
              {data.predictNotes.predict3b.badge}
            </span>
            {data.predictNotes.predict3b.instruction}
          </p>
          <ol className="listen-m3b__preview-list">
            {data.predictNotes.predict3b.items.map((it) => (
              <li key={it.id}>
                <strong>{it.id}.</strong> {it.q}
                {showTips && (
                  <p className="listen-m3b__tip">→ {it.tip}</p>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      {step === 3 && (
        <section className="listen-m3b__panel">
          <h2 className="listen-m3b__h">{data.exam.heading}</h2>
          <p className="write-m2a__expert">{data.exam.strategies}</p>
          <p className="listen-m3b__instr">
            <span className="write-m2a__badge">{data.exam.badge}</span>
            {data.exam.instruction}
          </p>
          <p className="listen-m3b__audio-note">{data.exam.audioNote}</p>
          <div className="listen-m3b__qgrid">
            <article className="listen-m3b__box">
              <h3>{data.exam.table.title}</h3>
              <p className="listen-m3b__limit">{data.exam.table.limit}</p>
              <table className="listen-m3b__table">
                <thead>
                  <tr>
                    {data.exam.table.headers.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.exam.table.rows.map((row) => (
                    <tr key={row.workshop}>
                      <td>{row.workshop}</td>
                      {row.cells.map((cell, i) => (
                        <td key={i}>
                          {"given" in cell && cell.given ? (
                            cell.given
                          ) : "id" in cell && cell.id != null ? (
                            <>
                              {cell.before}
                              <Gap id={cell.id} />
                              {cell.after}
                            </>
                          ) : null}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
            <article className="listen-m3b__box">
              <h3>{data.exam.notes.title}</h3>
              <p className="listen-m3b__limit">{data.exam.notes.limit}</p>
              {data.exam.notes.items.map((it) => (
                <p key={it.id}>
                  {it.before}
                  <Gap id={it.id} />
                  {it.after}
                </p>
              ))}
            </article>
          </div>
        </section>
      )}

      {step === 4 && (
        <section className="listen-m3b__panel">
          <h2 className="listen-m3b__h">{data.discussion.heading}</h2>
          <p className="listen-m3b__instr">
            <span className="write-m2a__badge">{data.discussion.badge}</span>
            {data.discussion.instruction}
          </p>
          <ol className="listen-m3b__preview-list">
            {data.discussion.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
          <details>
            <summary>Tip</summary>
            <p className="listen-m3b__tip">{data.discussion.tip}</p>
          </details>
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
