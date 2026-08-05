import { useEffect, useMemo, useState } from "react";
import { practiceReadingLeadIn1 } from "../data/practiceReadingLeadIn1";

export type LeadInData = {
  title: string;
  image: string;
  imageAlt: string;
  instruction: string;
  statements: string[];
  answers?: string[];
  wordBank?: string[];
  discussInstruction?: string;
  discussQuestions?: string[];
  speakSec: number;
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function normWord(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

export function PracticeReadingLeadIn({
  data = practiceReadingLeadIn1,
  testLabel = "Practice Test 1 · Learn",
  onBack,
  onContinue,
}: {
  data?: LeadInData;
  testLabel?: string;
  onBack: () => void;
  onContinue: () => void;
}) {
  const hasAnswers = Boolean(data.answers?.length);
  const hasDiscuss = Boolean(data.discussQuestions?.length);
  const [phase, setPhase] = useState<"fill" | "discuss">(
    hasAnswers ? "fill" : "discuss",
  );
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(data.speakSec);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [active, setActive] = useState<number | null>(0);

  useEffect(() => {
    setRunning(false);
    setDone(false);
    setTimeLeft(data.speakSec);
    setAnswers({});
    setChecked(false);
    setPhase(hasAnswers ? "fill" : "discuss");
    setActive(0);
  }, [data, hasAnswers]);

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

  const score = useMemo(() => {
    if (!data.answers) return 0;
    return data.answers.filter(
      (key, i) => normWord(answers[i] ?? "") === normWord(key),
    ).length;
  }, [answers, data.answers]);

  const used = useMemo(
    () => new Set(Object.values(answers).map(normWord).filter(Boolean)),
    [answers],
  );

  const timerClass = done
    ? "pr-leadin__timer pr-leadin__timer--done"
    : running
      ? "pr-leadin__timer pr-leadin__timer--run"
      : "pr-leadin__timer";

  const placeWord = (word: string) => {
    if (checked || active == null) return;
    setAnswers((a) => ({ ...a, [active]: word }));
    const next = data.statements.findIndex((_, i) => {
      const n = { ...answers, [active]: word };
      return !n[i];
    });
    setActive(next >= 0 ? next : active);
  };

  if (phase === "discuss" && (hasDiscuss || !hasAnswers)) {
    return (
      <div className="pr-leadin">
        <header className="pr-leadin__chrome">
          <button
            type="button"
            className="back-link"
            onClick={() => {
              if (hasAnswers) setPhase("fill");
              else onBack();
            }}
          >
            ← {hasAnswers ? "Definitions" : "Modes"}
          </button>
          <div className="pr-leadin__chrome-title">
            <span>{testLabel}</span>
            <strong>{data.title}</strong>
          </div>
        </header>

        <div className="pr-leadin__discuss">
          <p className="pr-leadin__instruction">
            <span>2</span>
            {data.discussInstruction?.replace(/^\d+\s*/, "") ??
              data.instruction.replace(/^\d+\s*/, "")}
          </p>
          <ol className="pr-leadin__statements">
            {(data.discussQuestions ?? data.statements).map((s, i) => (
              <li key={`${i}-${s.slice(0, 20)}`}>
                <strong>{i + 1}</strong>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          <div className="pr-leadin__speak">
            <div className={timerClass}>
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
                    setTimeLeft(data.speakSec);
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
            onClick={() => {
              if (hasAnswers) setPhase("fill");
              else onBack();
            }}
          >
            ← Back
          </button>
          <span className="flow-footer__step">Lead-in · discuss</span>
          <button
            type="button"
            className="flow-footer__btn flow-footer__btn--primary"
            onClick={onContinue}
          >
            Continue to passages →
          </button>
        </footer>
      </div>
    );
  }

  return (
    <div className="pr-leadin">
      <header className="pr-leadin__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Modes
        </button>
        <div className="pr-leadin__chrome-title">
          <span>{testLabel}</span>
          <strong>{data.title}</strong>
        </div>
      </header>

      <div
        className={
          data.wordBank?.length
            ? "pr-leadin__split pr-leadin__split--words"
            : "pr-leadin__split"
        }
      >
        {data.wordBank?.length ? (
          <section className="pr-leadin__cloud">
            <p className="pr-exam__col-label">Word picture</p>
            <div className="pr-leadin__chips">
              {data.wordBank.map((w) => (
                <button
                  key={w}
                  type="button"
                  className={`pr-leadin__chip ${used.has(normWord(w)) ? "pr-leadin__chip--used" : ""}`}
                  disabled={checked || used.has(normWord(w))}
                  onClick={() => placeWord(w)}
                >
                  {w}
                </button>
              ))}
            </div>
          </section>
        ) : data.image ? (
          <figure className="pr-leadin__photo">
            <img src={data.image} alt={data.imageAlt} />
          </figure>
        ) : null}

        <section className="pr-leadin__panel">
          <p className="pr-leadin__instruction">
            <span>1</span>
            {data.instruction.replace(/^\d+\s*/, "")}
          </p>

          <ol className="pr-leadin__statements pr-leadin__statements--fill">
            {data.statements.map((s, i) => {
              const key = data.answers?.[i];
              const val = answers[i] ?? "";
              const isOk = key ? normWord(val) === normWord(key) : false;
              return (
                <li
                  key={`${i}-${s.slice(0, 24)}`}
                  className={active === i ? "pr-leadin__row--on" : undefined}
                >
                  <strong>{i + 1}</strong>
                  <div className="pr-leadin__def">
                    <span>{s}</span>
                    {hasAnswers && key && (
                      <span className="pr-leadin__ans-row">
                        <input
                          className={
                            checked
                              ? isOk
                                ? "pr-completion__input pr-completion__input--ok"
                                : "pr-completion__input pr-completion__input--bad"
                              : active === i
                                ? "pr-completion__input pr-completion__input--focus"
                                : "pr-completion__input"
                          }
                          value={val}
                          disabled={checked}
                          placeholder="word…"
                          onFocus={() => setActive(i)}
                          onChange={(e) =>
                            setAnswers((a) => ({ ...a, [i]: e.target.value }))
                          }
                        />
                        {checked && !isOk && (
                          <span className="pr-leadin__suggested">→ {key}</span>
                        )}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      </div>

      <footer className="flow-footer">
        <button type="button" className="flow-footer__btn" onClick={onBack}>
          ← Back
        </button>
        {checked ? (
          <span className="flow-footer__step">
            ✓ {score}/{data.answers!.length}
          </span>
        ) : (
          <span className="flow-footer__step">
            Tap a word, or type it
          </span>
        )}
        <button
          type="button"
          className="flow-footer__btn"
          onClick={() => {
            setChecked(false);
            setAnswers({});
            setActive(0);
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
            onClick={() => {
              if (hasDiscuss) {
                setRunning(false);
                setDone(false);
                setTimeLeft(data.speakSec);
                setPhase("discuss");
              } else onContinue();
            }}
          >
            {hasDiscuss ? "Discuss →" : "Continue to passages →"}
          </button>
        )}
      </footer>
    </div>
  );
}
