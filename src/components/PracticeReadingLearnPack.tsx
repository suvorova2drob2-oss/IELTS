import { useEffect, useMemo, useState } from "react";
import type {
  LanguageGap,
  PracticeReadingTask,
  PracticeReadingTest,
} from "../data/practiceReadingTest1";
import { PracticeReadingPassage } from "./PracticeReadingPassage";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function norm(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function langOk(value: string, g: LanguageGap): boolean {
  const accept = g.accept ?? [g.key];
  const n = norm(value);
  return accept.some((a) => norm(a) === n);
}

function renderPrompt(prompt: string) {
  const parts = prompt.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return <strong key={i}>{p.slice(2, -2)}</strong>;
    }
    return <span key={i}>{p}</span>;
  });
}

type Phase = "language" | "vocab" | "followup";

export function PracticeReadingLearnPack({
  test,
  task,
  onBack,
}: {
  test: PracticeReadingTest;
  task: Extract<PracticeReadingTask, { type: "learn-pack" }>;
  onBack: () => void;
}) {
  const hasVocab = Boolean(task.vocabItems?.length);
  const withPassage = task.languageItems.some((g) => Boolean(g.prompt));
  const [phase, setPhase] = useState<Phase>("language");
  const [langAns, setLangAns] = useState<Record<number, string>>({});
  const [vocabAns, setVocabAns] = useState<Record<number, string>>({});
  const [langChecked, setLangChecked] = useState(false);
  const [vocabChecked, setVocabChecked] = useState(false);
  const [activeLang, setActiveLang] = useState<number | null>(
    task.languageItems[0]?.id ?? null,
  );
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(task.speakSec);

  const activeItem = task.languageItems.find((g) => g.id === activeLang);

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

  const langScore = useMemo(
    () =>
      task.languageItems.filter((g) => langOk(langAns[g.id] ?? "", g)).length,
    [langAns, task.languageItems],
  );

  const vocabScore = useMemo(
    () =>
      (task.vocabItems ?? []).filter((v) => vocabAns[v.id] === v.key).length,
    [vocabAns, task.vocabItems],
  );

  const goFollowup = () => {
    setDone(false);
    setRunning(false);
    setTimeLeft(task.speakSec);
    setPhase("followup");
  };

  if (phase === "followup") {
    return (
      <div className="pr-exam">
        <header className="pr-exam__chrome">
          <button
            type="button"
            className="back-link"
            onClick={() => setPhase(hasVocab ? "vocab" : "language")}
          >
            ← {hasVocab ? "Vocabulary" : "Language"}
          </button>
          <div className="pr-exam__chrome-title">
            <span>Follow-up</span>
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
          </div>
        </div>

        <footer className="flow-footer">
          <button
            type="button"
            className="flow-footer__btn"
            onClick={() => setPhase(hasVocab ? "vocab" : "language")}
          >
            ← Back
          </button>
          <span className="flow-footer__step">Follow-up · discuss</span>
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

  if (phase === "vocab" && hasVocab && task.vocabItems) {
    return (
      <div className="pr-exam">
        <header className="pr-exam__chrome">
          <button
            type="button"
            className="back-link"
            onClick={() => setPhase("language")}
          >
            ← Language
          </button>
          <div className="pr-exam__chrome-title">
            <span>Vocabulary</span>
            <strong>Choose the correct word</strong>
          </div>
        </header>

        <div className="pr-learn-pack">
          <p className="pr-advice__instruction">{task.vocabInstruction}</p>
          <ol className="pr-learn-pack__list">
            {task.vocabItems.map((v) => {
              const selected = vocabAns[v.id];
              const isOk = selected === v.key;
              return (
                <li key={v.id}>
                  <span className="pr-mc__num">{v.id}</span>
                  <span className="pr-learn-pack__line">
                    {v.before}
                    <span className="pr-learn-pack__choices">
                      {v.choices.map((c) => {
                        let state = "";
                        if (vocabChecked) {
                          if (c === v.key) state = "pr-chip--ok";
                          else if (selected === c) state = "pr-chip--bad";
                        } else if (selected === c) {
                          state = "pr-chip--picked";
                        }
                        return (
                          <button
                            key={c}
                            type="button"
                            className={`pr-chip ${state}`}
                            onClick={() => {
                              if (vocabChecked) return;
                              setVocabAns((a) => ({ ...a, [v.id]: c }));
                            }}
                          >
                            {c}
                          </button>
                        );
                      })}
                    </span>
                    {v.after}
                    {vocabChecked && !isOk && (
                      <span className="inline-gap-bad"> → {v.key}</span>
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <footer className="flow-footer">
          <button
            type="button"
            className="flow-footer__btn"
            onClick={() => setPhase("language")}
          >
            ← Back
          </button>
          {vocabChecked ? (
            <span className="flow-footer__step">
              ✓ {vocabScore}/{task.vocabItems.length}
            </span>
          ) : (
            <span className="flow-footer__step">Choose a / b</span>
          )}
          <button
            type="button"
            className="flow-footer__btn"
            onClick={() => {
              setVocabChecked(false);
              setVocabAns({});
            }}
          >
            Заново
          </button>
          {!vocabChecked ? (
            <button
              type="button"
              className="flow-footer__btn flow-footer__btn--primary"
              onClick={() => setVocabChecked(true)}
            >
              Check →
            </button>
          ) : (
            <button
              type="button"
              className="flow-footer__btn flow-footer__btn--primary"
              onClick={goFollowup}
            >
              Follow-up →
            </button>
          )}
        </footer>
      </div>
    );
  }

  const langList = (
    <ol
      className={
        withPassage
          ? "pr-learn-pack__list pr-learn-pack__list--ref"
          : "pr-learn-pack__list"
      }
    >
      {task.languageItems.map((g) => {
        const val = langAns[g.id] ?? "";
        const isOk = langOk(val, g);
        return (
          <li
            key={g.id}
            className={activeLang === g.id ? "pr-learn-pack__item--on" : undefined}
            onMouseEnter={() => setActiveLang(g.id)}
          >
            <span className="pr-mc__num">{g.id}</span>
            <span className="pr-learn-pack__line">
              {g.prompt ? (
                <>
                  <span className="pr-learn-pack__prompt">
                    {renderPrompt(g.prompt)}
                  </span>
                  <input
                    className={
                      langChecked
                        ? isOk
                          ? "pr-completion__input pr-completion__input--ok"
                          : "pr-completion__input pr-completion__input--bad"
                        : "pr-completion__input"
                    }
                    value={val}
                    disabled={langChecked}
                    placeholder="refers to…"
                    onFocus={() => setActiveLang(g.id)}
                    onChange={(e) =>
                      setLangAns((a) => ({ ...a, [g.id]: e.target.value }))
                    }
                  />
                </>
              ) : (
                <>
                  {g.before}
                  <input
                    className={
                      langChecked
                        ? isOk
                          ? "pr-completion__input pr-completion__input--ok"
                          : "pr-completion__input pr-completion__input--bad"
                        : "pr-completion__input"
                    }
                    value={val}
                    disabled={langChecked}
                    placeholder="…"
                    onChange={(e) =>
                      setLangAns((a) => ({ ...a, [g.id]: e.target.value }))
                    }
                  />
                  {g.after}
                </>
              )}
              {langChecked && !isOk && (
                <span className="inline-gap-bad"> → {g.key}</span>
              )}
            </span>
          </li>
        );
      })}
    </ol>
  );

  const langFooter = (
    <footer className="flow-footer">
      <button type="button" className="flow-footer__btn" onClick={onBack}>
        ← Back
      </button>
      {langChecked ? (
        <span className="flow-footer__step">
          ✓ {langScore}/{task.languageItems.length}
        </span>
      ) : (
        <span className="flow-footer__step">
          {withPassage
            ? "Find the referent in the passage"
            : "Write the noun / idea"}
        </span>
      )}
      <button
        type="button"
        className="flow-footer__btn"
        onClick={() => {
          setLangChecked(false);
          setLangAns({});
        }}
      >
        Заново
      </button>
      {!langChecked ? (
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={() => setLangChecked(true)}
        >
          Check →
        </button>
      ) : (
        <button
          type="button"
          className="flow-footer__btn flow-footer__btn--primary"
          onClick={() => {
            if (hasVocab) setPhase("vocab");
            else goFollowup();
          }}
        >
          {hasVocab ? "Vocabulary →" : "Follow-up →"}
        </button>
      )}
    </footer>
  );

  return (
    <div className="pr-exam">
      <header className="pr-exam__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Tasks
        </button>
        <div className="pr-exam__chrome-title">
          <span>Language</span>
          <strong>
            {withPassage ? "Pronoun reference" : "although / because / so"}
          </strong>
        </div>
      </header>

      {withPassage ? (
        <div className="pr-exam__split">
          <PracticeReadingPassage
            readingLabel={test.readingLabel}
            passageTitle={test.passageTitle}
            paragraphs={test.paragraphs}
            focusParagraphId={activeItem?.paragraphId ?? null}
            showParagraphIds={test.showParagraphIds !== false}
          />
          <aside className="pr-exam__questions pr-exam__questions--fit pr-ref-panel">
            <p className="pr-exam__col-label">Language development</p>
            <p className="pr-exam__instruction pr-endings-panel__hint">
              {task.languageInstruction.replace(/^\d+\s*/, "")}
            </p>
            <div className="pr-task-box pr-task-box--ref">{langList}</div>
          </aside>
        </div>
      ) : (
        <div className="pr-learn-pack">
          <p className="pr-advice__instruction">{task.languageInstruction}</p>
          {langList}
        </div>
      )}

      {langFooter}
    </div>
  );
}
