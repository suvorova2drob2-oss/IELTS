import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import {
  checkListenM4a,
  LISTEN_M4A_NEXT,
  LISTEN_M4A_STEPS,
  listeningM4a,
} from "../data/listeningM4a";
import { AudioPlayer } from "./AudioPlayer";
import { ExpertDiscussPanel } from "./ExpertDiscussPanel";
import { ListenTranscriptPanel } from "./ListenTranscriptPanel";

const data = listeningM4a;

function clampStep(n: number | undefined): number {
  if (n == null || Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, LISTEN_M4A_STEPS.length - 1));
}

function ListenM4aGap({
  id,
  checked,
  val,
  answerKey,
  setAnswers,
}: {
  id: number;
  checked: boolean;
  val: string;
  answerKey: string[];
  setAnswers: Dispatch<SetStateAction<Record<number, string>>>;
}) {
  const ok = checked && checkListenM4a(val, answerKey);
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
        <span className="inline-gap-bad"> → {answerKey[0]}</span>
      )}
    </span>
  );
}

function GapPreview({ id }: { id: number }) {
  return (
    <span className="listen-m4a__gap-preview" aria-label={`Question ${id}`}>
      {id}
    </span>
  );
}

function ListenM4aExamContent({
  readonly,
  checked,
  answers,
  setAnswers,
  showNotes = true,
}: {
  readonly?: boolean;
  checked: boolean;
  answers: Record<number, string>;
  setAnswers: Dispatch<SetStateAction<Record<number, string>>>;
  showNotes?: boolean;
}) {
  return (
    <div
      className={`listen-m3b__qgrid${readonly ? " listen-m4a__qgrid--preview" : " flow-stage__body"}`}
    >
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
                        {readonly ? (
                          <GapPreview id={cell.id} />
                        ) : (
                          <ListenM4aGap
                            id={cell.id}
                            checked={checked}
                            val={answers[cell.id] ?? ""}
                            answerKey={data.answerKeys[cell.id]}
                            setAnswers={setAnswers}
                          />
                        )}
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
      {showNotes && (
        <article className="listen-m3b__box">
          <h3>{data.exam.notes.title}</h3>
          <p className="listen-m3b__limit">{data.exam.notes.limit}</p>
          {data.exam.notes.items.map((it) => (
            <p key={it.id}>
              {it.before}
              {readonly ? (
                <GapPreview id={it.id} />
              ) : (
                <ListenM4aGap
                  id={it.id}
                  checked={checked}
                  val={answers[it.id] ?? ""}
                  answerKey={data.answerKeys[it.id]}
                  setAnswers={setAnswers}
                />
              )}
              {it.after}
            </p>
          ))}
        </article>
      )}
    </div>
  );
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
        <section className="listen-m3b__panel listen-m4a__panel--predict">
          <div className="listen-m4a__predict-chrome">
            <h2 className="listen-m3b__h">{data.predictTable.heading}</h2>
            <p className="listen-m3b__instr">
              <span className="write-m2a__badge">{data.predictTable.badge}</span>
              {data.predictTable.instruction}
            </p>
          </div>
          <div className="listen-m4a__predict-split">
            <ListenM4aExamContent
              readonly
              checked={false}
              answers={answers}
              setAnswers={setAnswers}
              showNotes={false}
            />
            <div className="listen-m4a__predict-side">
              <ol className="listen-m3b__preview-list listen-m3b__preview-list--num">
                {data.predictTable.items.map((it) => (
                  <li key={it.id}>
                    {it.q}
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
            </div>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="listen-m3b__panel listen-m4a__panel--predict">
          <div className="listen-m4a__predict-chrome">
            <p className="listen-m3b__instr">
              <span className="write-m2a__badge">{data.predictNotes.badge}</span>
              {data.predictNotes.instruction}
            </p>
            {showTips && (
              <p className="listen-m3b__tip">→ {data.predictNotes.tip}</p>
            )}
          </div>
          <div className="listen-m4a__predict-split">
            <ListenM4aExamContent
              readonly
              checked={false}
              answers={answers}
              setAnswers={setAnswers}
              showNotes
            />
            <div className="listen-m4a__predict-side">
              <p className="listen-m3b__instr">
                <span className="write-m2a__badge">
                  {data.predictNotes.predict3b.badge}
                </span>
                {data.predictNotes.predict3b.instruction}
              </p>
              <ol className="listen-m3b__preview-list listen-m3b__preview-list--num">
                {data.predictNotes.predict3b.items.map((it) => (
                  <li key={it.id}>
                    {it.q}
                    {showTips && (
                      <p className="listen-m3b__tip">→ {it.tip}</p>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="listen-m3b__panel listen-m3b__panel--exam">
          <div className="listen-m3b__exam-head">
            <h2 className="listen-m3b__h">{data.exam.heading}</h2>
            <p className="write-m2a__expert">{data.exam.strategies}</p>
            <p className="listen-m3b__instr">
              <span className="write-m2a__badge">{data.exam.badge}</span>
              {data.exam.instruction}
            </p>
            <AudioPlayer
              src={data.exam.audio}
              label={data.exam.audioLabel}
            />
            <ListenTranscriptPanel
              label={data.exam.scriptLabel}
              lines={data.exam.script}
            />
          </div>
          <ListenM4aExamContent
            checked={checked}
            answers={answers}
            setAnswers={setAnswers}
          />
        </section>
      )}

      {step === 4 && (
        <ExpertDiscussPanel
          key="discussion"
          heading={data.discussion.heading}
          badge={data.discussion.badge}
          instruction={data.discussion.instruction}
          questions={data.discussion.questions}
          suggestedTitle={data.discussion.suggestedTitle}
          suggestedAnswer={data.discussion.suggestedAnswer}
        />
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
