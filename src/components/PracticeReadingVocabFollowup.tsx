import { useEffect, useMemo, useState } from "react";
import {
  checkVocabAnswer,
  type PracticeReadingTask,
  type PracticeReadingTest,
} from "../data/practiceReadingTest1";
import { PracticeReadingPassage } from "./PracticeReadingPassage";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function PracticeReadingVocabFollowup({
  test,
  task,
  onBack,
}: {
  test: PracticeReadingTest;
  task: Extract<PracticeReadingTask, { type: "vocab-followup" }>;
  onBack: () => void;
}) {
  const [phase, setPhase] = useState<"vocab" | "followup">("vocab");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(task.speakSec);

  useEffect(() => {
    if (!running || timeLeft <= 0) return;
    const id = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setRunning(false);
          setDone(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, timeLeft]);

  const score = useMemo(
    () =>
      task.vocabulary.filter((v) => checkVocabAnswer(answers[v.id] ?? "", v.key))
        .length,
    [answers, task.vocabulary],
  );

  if (phase === "followup") {
    return (
      <div className="pr-exam">
        <header className="pr-exam__chrome">
          <button
            type="button"
            className="back-link"
            onClick={() => setPhase("vocab")}
          >
            ← Vocabulary
          </button>
          <div className="pr-exam__chrome-title">
            <span>Task 3 · Follow-up</span>
            <strong>Discuss</strong>
          </div>
        </header>

        <div className="pr-followup">
          <p className="pr-advice__instruction">{task.followUpInstruction}</p>
          <ol className="pr-followup__q">
            {task.followUpQuestions.map((q, i) => (
              <li key={q}>
                <strong>{i + 1}</strong>
                <span>{q}</span>
              </li>
            ))}
          </ol>
          <div className="pr-leadin__speak">
            <div
              className={
                done
                  ? "pr-leadin__timer pr-leadin__timer--done"
                  : running
                    ? "pr-leadin__timer pr-leadin__timer--run"
                    : "pr-leadin__timer"
              }
            >
              <span className="pr-leadin__clock">⏱ {formatTime(timeLeft)}</span>
              {!running && !done && (
                <button
                  type="button"
                  className="btn-start"
                  onClick={() => setRunning(true)}
                >
                  Start →
                </button>
              )}
              {running && (
                <button
                  type="button"
                  className="nav-btn"
                  onClick={() => {
                    setRunning(false);
                    setDone(true);
                  }}
                >
                  Stop
                </button>
              )}
              {done && (
                <button
                  type="button"
                  className="nav-btn"
                  onClick={() => {
                    setDone(false);
                    setRunning(false);
                    setTimeLeft(task.speakSec);
                  }}
                >
                  Заново
                </button>
              )}
            </div>
            <p className="pr-leadin__hint">Speak aloud · ~2 minutes</p>
          </div>
        </div>

        <footer className="flow-footer">
          <button
            type="button"
            className="flow-footer__btn"
            onClick={() => setPhase("vocab")}
          >
            ← Vocabulary
          </button>
          <span className="flow-footer__step">Follow-up</span>
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={onBack}
          >
            Done →
          </button>
        </footer>
      </div>
    );
  }

  return (
    <div className="pr-exam">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Tasks
        </button>
        <div className="pr-exam__chrome-title">
          <span>Task 3 of 3</span>
          <strong>Vocabulary</strong>
        </div>
      </header>

      <div className="pr-exam__split pr-exam__split--vocab">
        <PracticeReadingPassage
          readingLabel={test.readingLabel}
          passageTitle={test.passageTitle}
          paragraphs={test.paragraphs}
        />
        <aside className="pr-exam__questions pr-exam__questions--fit">
          <p className="pr-exam__col-label">Vocabulary</p>
          <p className="pr-exam__instruction">{task.vocabInstruction}</p>
          <ol className="pr-vocab">
            {task.vocabulary.map((v) => {
              const val = answers[v.id] ?? "";
              const ok = checked && checkVocabAnswer(val, v.key);
              const bad = checked && !ok;
              return (
                <li key={v.id}>
                  <span className="pr-vocab__clue">
                    <strong>{v.id}</strong> {v.clue}{" "}
                    <em>({v.paragraphId})</em>
                  </span>
                  <input
                    type="text"
                    value={val}
                    disabled={checked}
                    onChange={(e) =>
                      setAnswers((a) => ({ ...a, [v.id]: e.target.value }))
                    }
                    className={
                      ok
                        ? "pr-vocab__input pr-vocab__input--ok"
                        : bad
                          ? "pr-vocab__input pr-vocab__input--bad"
                          : "pr-vocab__input"
                    }
                    aria-label={`Vocabulary ${v.id}`}
                  />
                  {checked && !ok ? (
                    <span className="pr-vocab__key">→ {v.key}</span>
                  ) : (
                    <span className="pr-vocab__key pr-vocab__key--spacer" />
                  )}
                </li>
              );
            })}
          </ol>
        </aside>
      </div>

      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        {checked ? (
          <span className="flow-footer__step">
            ✓ {score}/{task.vocabulary.length}
          </span>
        ) : (
          <span className="flow-footer__step">Type words from the text</span>
        )}
        <button
          type="button"
          className="flow-footer__btn"
          onClick={() => {
            setChecked(false);
            setAnswers({});
          }}
        >
          Заново
        </button>
        {!checked ? (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={() => setChecked(true)}
          >
            Check →
          </button>
        ) : (
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={() => setPhase("followup")}
          >
            Follow-up →
          </button>
        )}
      </footer>
    </div>
  );
}
