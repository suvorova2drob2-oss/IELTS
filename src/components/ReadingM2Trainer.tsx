import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  checkM2Short,
  collectM2Evidence,
  LEARN_STEP_NEXT_M2,
  LEARN_STEPS_M2,
  readingM2,
  type ReadingM2Data,
} from "../data/readingM2";
import type { TfngValue } from "../data/practiceReadingTest1";
import { READING_MODE_KEY, READING_STEP_KEY } from "../hooks/useCourseData";

type TrackMode = "exam" | "learn";
type SplitBias = "balanced" | "passage" | "tasks";

const TFNG_OPTIONS: TfngValue[] = ["TRUE", "FALSE", "NOT GIVEN"];

function questionIds(data: ReadingM2Data): number[] {
  return [...data.tfng.map((q) => q.id), ...data.short.map((q) => q.id)];
}

function learnStepsFor(data: ReadingM2Data): readonly string[] {
  return data.learnSteps ?? LEARN_STEPS_M2;
}

function learnStepNextFor(data: ReadingM2Data): Record<number, string> {
  return data.learnStepNext ?? LEARN_STEP_NEXT_M2;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function OralBanner({ children }: { children: ReactNode }) {
  return (
    <div className="oral-banner">
      <span className="oral-banner__icon" aria-hidden>
        🎤
      </span>
      <p>{children}</p>
    </div>
  );
}

function modeStorageKey(id: string) {
  return `${READING_MODE_KEY}:${id}`;
}
function stepStorageKey(id: string) {
  return `${READING_STEP_KEY}:${id}`;
}

function loadTrackMode(
  flowId: string,
  examOnly: boolean,
  restart?: boolean,
  initialStep?: number,
): TrackMode {
  if (examOnly) return "exam";
  if (initialStep != null) return "learn";
  if (restart) return "exam";
  try {
    const raw = sessionStorage.getItem(modeStorageKey(flowId));
    if (raw === "learn" || raw === "exam") return raw;
  } catch {
    /* ignore */
  }
  return "exam";
}

function loadLearnStep(
  flowId: string,
  stepCount: number,
  restart?: boolean,
  initialStep?: number,
): number {
  if (initialStep != null) return initialStep;
  if (restart) return 0;
  try {
    const raw = sessionStorage.getItem(stepStorageKey(flowId));
    if (raw != null) {
      const n = Number(raw);
      if (!Number.isNaN(n) && n >= 0 && n < stepCount) return n;
    }
  } catch {
    /* ignore */
  }
  return 0;
}

function highlightText(
  text: string,
  terms: string[],
  markClass: string,
  onMark?: (el: HTMLElement | null, index: number) => void,
): ReactNode {
  if (terms.length === 0) return text;
  const sorted = [...terms].sort((a, b) => b.length - a.length);
  const regex = new RegExp(`(${sorted.map(escapeRegex).join("|")})`, "gi");
  const parts = text.split(regex);
  let markIndex = 0;
  return parts.map((part, i) => {
    const isHit = sorted.some((t) => part.toLowerCase() === t.toLowerCase());
    if (!isHit) return <span key={i}>{part}</span>;
    const idx = markIndex++;
    return (
      <mark
        key={i}
        className={markClass}
        ref={(el) => onMark?.(el, idx)}
      >
        {part}
      </mark>
    );
  });
}

function PassagePane({
  data,
  evidenceTerms,
  showEvidence,
  highlightTopic,
  highlightedParagraphs,
  activeParagraphIndex,
  paragraphRefs,
}: {
  data: ReadingM2Data;
  evidenceTerms: string[];
  showEvidence: boolean;
  highlightTopic?: boolean;
  /** Paragraph indices whose topic sentence should be marked (ex 3a). */
  highlightedParagraphs?: number[];
  activeParagraphIndex?: number;
  paragraphRefs?: React.MutableRefObject<(HTMLParagraphElement | null)[]>;
}) {
  const topicSentence = data.topicSentences?.topicSentence ?? "";
  const later = data.topicSentences?.laterTopics ?? [];
  const marked = new Set(highlightedParagraphs ?? []);

  return (
    <article className="passage-reader passage-reader--compact passage-reader--single-col">
      <header className="passage-reader__header">
        <h2>{data.title}</h2>
      </header>
      <p className="rm2-intro">{data.introduction}</p>
      <div className="passage-reader__body">
        {data.passage.map((p, i) => {
          let lead: ReactNode = null;
          let body = p;
          if (highlightTopic && i === 0 && topicSentence && p.startsWith(topicSentence)) {
            lead = <mark className="rm2-topic-sent">{topicSentence}</mark>;
            body = p.slice(topicSentence.length);
          } else if (marked.has(i)) {
            const match = later.find((t) => t.paragraphIndex === i);
            const full = data.passage[i];
            // Highlight first sentence (up to first . ! ?)
            const m = full.match(/^[\s\S]*?[.!?](?=\s|$)/);
            const first = m?.[0] ?? match?.topicSentence ?? "";
            if (first && full.startsWith(first)) {
              lead = <mark className="rm2-topic-sent rm2-topic-sent--pick">{first}</mark>;
              body = full.slice(first.length);
            }
          }
          const rest =
            showEvidence && evidenceTerms.length > 0
              ? highlightText(body, evidenceTerms, "passage-evidence")
              : body;
          return (
            <p
              key={i}
              ref={(el) => {
                if (paragraphRefs) paragraphRefs.current[i] = el;
              }}
              className={[
                i === 0
                  ? "passage-reader__p passage-reader__p--drop"
                  : "passage-reader__p",
                activeParagraphIndex === i ? "passage-reader__p--active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {lead}
              {rest}
            </p>
          );
        })}
      </div>
    </article>
  );
}

function DiscussionBlock({ data }: { data: ReadingM2Data }) {
  const discussion = data.discussion;
  if (!discussion) return null;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(discussion.timeSecPerQuestion);
  const [timerDone, setTimerDone] = useState(false);
  const question = discussion.questions[questionIndex];

  useEffect(() => {
    setTimerRunning(false);
    setTimeLeft(discussion.timeSecPerQuestion);
    setTimerDone(false);
  }, [questionIndex, discussion.timeSecPerQuestion]);

  useEffect(() => {
    if (!timerRunning || timeLeft <= 0) return;
    const id = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setTimerRunning(false);
          setTimerDone(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [timerRunning, timeLeft]);

  const timerClass = timerDone
    ? "timer done"
    : timerRunning
      ? "timer running"
      : "timer";

  return (
    <section className="card flow-card discussion-panel">
      <h2 className="card-title">
        <span className="dot" />
        Discussion
      </h2>
      <p className="article-preview__label">After reading · {data.bookPages}</p>
      <p className="question-text">{discussion.instruction}</p>
      <OralBanner>
        Обсуждайте в парах. Писать не нужно — включите таймер и говорите.
      </OralBanner>
      <div className="question-header">
        <span className="question-number">
          Question {questionIndex + 1} of {discussion.questions.length}
        </span>
        <div className={timerClass}>
          ⏱ {formatTime(timeLeft)}
          {!timerRunning && !timerDone && (
            <button
              type="button"
              className="action-btn"
              style={{ padding: "4px 10px", marginLeft: 8 }}
              onClick={() => setTimerRunning(true)}
            >
              Start
            </button>
          )}
          {timerDone && (
            <button
              type="button"
              className="action-btn"
              style={{ padding: "4px 10px", marginLeft: 8 }}
              onClick={() => {
                setTimeLeft(discussion.timeSecPerQuestion);
                setTimerDone(false);
              }}
            >
              Reset
            </button>
          )}
        </div>
      </div>
      <p className="discussion-question">{question}</p>
      <div className="nav-row">
        <button
          type="button"
          className="nav-btn"
          disabled={questionIndex === 0}
          onClick={() => setQuestionIndex((i) => i - 1)}
        >
          ← Previous
        </button>
        <button
          type="button"
          className="nav-btn action-btn primary"
          disabled={questionIndex >= discussion.questions.length - 1}
          onClick={() => setQuestionIndex((i) => i + 1)}
        >
          Next →
        </button>
      </div>
    </section>
  );
}

export function ReadingM2Trainer({
  data = readingM2,
  onBack,
  restart,
  initialStep,
}: {
  data?: ReadingM2Data;
  onBack?: () => void;
  restart?: boolean;
  initialStep?: number;
}) {
  const learnSteps = learnStepsFor(data);
  const learnStepNext = learnStepNextFor(data);
  const allIds = questionIds(data);
  const totalQuestions = allIds.length;
  const tfngCount = data.tfng.length;
  const hasShort = data.short.length > 0;
  const examOnly = Boolean(data.examOnly);
  const examTaskLabel = hasShort
    ? `Exam task 1–${totalQuestions}`
    : `Exam task 1–${tfngCount}`;

  const [trackMode, setTrackMode] = useState<TrackMode>(() =>
    loadTrackMode(data.id, examOnly, restart, initialStep),
  );
  const [learnStep, setLearnStep] = useState(() =>
    loadLearnStep(data.id, learnSteps.length, restart, initialStep),
  );
  const [tfngAnswers, setTfngAnswers] = useState<
    Record<number, TfngValue | undefined>
  >({});
  const [shortAnswers, setShortAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [activeQ, setActiveQ] = useState<number | null>(null);
  const [splitBias, setSplitBias] = useState<SplitBias>("balanced");
  const [mobilePane, setMobilePane] = useState<"passage" | "tasks">("passage");
  const [ticks, setTicks] = useState<Record<string, boolean>>({});
  const [ticksChecked, setTicksChecked] = useState(false);
  const [markedParas, setMarkedParas] = useState<number[]>([]);
  const [ex3Checked, setEx3Checked] = useState(false);
  const [agree, setAgree] = useState<Record<number, "agree" | "disagree" | undefined>>(
    {},
  );
  const [discussQ, setDiscussQ] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(
    data.beforeYouRead?.timeSec ?? 90,
  );
  const paraRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (restart) {
      setTrackMode(initialStep != null && !examOnly ? "learn" : "exam");
      setLearnStep(initialStep ?? 0);
      setChecked(false);
      setTicks({});
      setTicksChecked(false);
      setMarkedParas([]);
      setEx3Checked(false);
    }
  }, [restart, initialStep, examOnly]);

  useEffect(() => {
    if (initialStep != null) {
      setTrackMode("learn");
      setLearnStep(initialStep);
    }
  }, [initialStep]);

  useEffect(() => {
    try {
      sessionStorage.setItem(modeStorageKey(data.id), trackMode);
      if (trackMode === "learn") {
        sessionStorage.setItem(stepStorageKey(data.id), String(learnStep));
      }
    } catch {
      /* ignore */
    }
  }, [trackMode, learnStep, data.id]);

  useEffect(() => {
    setTimerRunning(false);
    setTimeLeft(data.beforeYouRead?.timeSec ?? 90);
  }, [discussQ, data.beforeYouRead?.timeSec]);

  useEffect(() => {
    if (!timerRunning || timeLeft <= 0) return;
    const id = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [timerRunning, timeLeft]);

  const tfngScore = data.tfng.filter((q) => tfngAnswers[q.id] === q.key).length;
  const shortScore = data.short.filter((q) =>
    checkM2Short(shortAnswers[q.id] ?? "", q.answers),
  ).length;
  const score = tfngScore + shortScore;
  const total = allIds.length;

  const showExamTask =
    trackMode === "exam" || (trackMode === "learn" && learnStep === 2);

  const evidence = collectM2Evidence(
    data,
    activeQ != null ? [activeQ] : [],
  );

  useEffect(() => {
    if (!checked || evidence.paragraphIndex == null) return;
    paraRefs.current[evidence.paragraphIndex]?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [checked, activeQ, evidence.paragraphIndex]);

  const biasClass =
    splitBias === "passage"
      ? "exam-split__layout--passage"
      : splitBias === "tasks"
        ? "exam-split__layout--tasks"
        : "";

  const activeTip =
    checked && activeQ != null
      ? (data.tfng.find((q) => q.id === activeQ)?.tip ??
        data.short.find((q) => q.id === activeQ)?.tip)
      : undefined;

  const isTfngOk = (id: number) =>
    tfngAnswers[id] === data.tfng.find((q) => q.id === id)?.key;
  const isShortOk = (id: number) => {
    const q = data.short.find((s) => s.id === id);
    return q ? checkM2Short(shortAnswers[id] ?? "", q.answers) : false;
  };
  const isOk = (id: number) =>
    data.tfng.some((t) => t.id === id) ? isTfngOk(id) : isShortOk(id);

  const switchTrack = (mode: TrackMode) => {
    setTrackMode(mode);
    setChecked(false);
    if (mode === "learn") setLearnStep(0);
  };

  const goPrev = () => {
    if (trackMode !== "learn") return;
    setLearnStep((s) => Math.max(0, s - 1));
  };

  const goNext = () => {
    if (trackMode !== "learn") return;
    if (learnStep === 2 && !checked) {
      setChecked(true);
      return;
    }
    if (learnStep >= learnSteps.length - 1) {
      onBack?.();
      return;
    }
    setLearnStep((s) => Math.min(s + 1, learnSteps.length - 1));
  };

  const learnNextLabel =
    learnStep === 2 && !checked
      ? "Check answers →"
      : (learnStepNext[learnStep] ?? "Дальше →");

  return (
    <div
      className={`app-shell reading-flow reading-flow--${trackMode} reading-flow--viewport`}
    >
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
          Reading · {data.bookPages}
        </span>
        {!examOnly && (
          <div className="controls mode-toggle track-toggle">
            <button
              type="button"
              className={trackMode === "exam" ? "active" : ""}
              onClick={() => switchTrack("exam")}
            >
              Exam
            </button>
            <button
              type="button"
              className={trackMode === "learn" ? "active" : ""}
              onClick={() => switchTrack("learn")}
            >
              Learn
            </button>
          </div>
        )}
        {trackMode === "learn" && !examOnly && (
          <div className="learn-step-tabs">
            {learnSteps.map((label, i) => (
              <button
                key={label}
                type="button"
                className={`learn-step-tabs__btn ${i === learnStep ? "learn-step-tabs__btn--on" : ""}`}
                onClick={() => {
                  setLearnStep(i);
                  if (i !== 2) setChecked(false);
                }}
              >
                {i + 1}. {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {trackMode === "learn" && learnStep === 0 && data.beforeYouRead && (
        <section className="card flow-card learn-screen">
          <h2 className="card-title">
            <span className="dot" />
            Before you read
          </h2>
          <p className="question-text">{data.beforeYouRead.instruction}</p>
          <OralBanner>
            Говорите вслух в группах. Писать не нужно.
          </OralBanner>
          <div className="question-header">
            <span className="question-number">
              Question {discussQ + 1} of {data.beforeYouRead.questions.length}
            </span>
            <div className={timerRunning ? "timer running" : "timer"}>
              ⏱ {formatTime(timeLeft)}
              {!timerRunning && timeLeft > 0 && (
                <button
                  type="button"
                  className="action-btn"
                  style={{ padding: "4px 10px", marginLeft: 8 }}
                  onClick={() => setTimerRunning(true)}
                >
                  Start
                </button>
              )}
            </div>
          </div>
          <p className="discussion-question">
            {data.beforeYouRead.questions[discussQ]}
          </p>
          <div className="nav-row">
            <button
              type="button"
              className="nav-btn"
              disabled={discussQ === 0}
              onClick={() => setDiscussQ((i) => i - 1)}
            >
              ← Previous
            </button>
            <button
              type="button"
              className="nav-btn action-btn primary"
              disabled={discussQ >= data.beforeYouRead.questions.length - 1}
              onClick={() => setDiscussQ((i) => i + 1)}
            >
              Next →
            </button>
          </div>
        </section>
      )}

      {trackMode === "learn" && learnStep === 1 && data.topicSentences && (
        <section className="card flow-card learn-screen learn-scan">
          <div className="learn-scan__layout">
            <div className="learn-scan__passage">
              <PassagePane
                data={data}
                evidenceTerms={[]}
                showEvidence={false}
                highlightTopic
                highlightedParagraphs={markedParas}
              />
            </div>
            <aside className="learn-scan__sidebar rm2-strategy">
              <h2 className="card-title">
                <span className="dot" />
                {data.topicSentences.heading}
              </h2>

              <div className="rm2-strategy__block">
                <p className="rm2-strategy__ex">
                  <span>2</span>
                  {data.topicSentences.instruction}
                </p>
                <p className="learn-screen__hint">
                  <strong>1</strong> {data.topicSentences.predictPrompt}
                </p>
                <ul className="rm2-ticks">
                  {data.topicSentences.details.map((d) => {
                    const on = Boolean(ticks[d.id]);
                    let mark = "";
                    if (ticksChecked) {
                      mark =
                        on === d.mentioned
                          ? "rm2-ticks__item--ok"
                          : "rm2-ticks__item--bad";
                    } else if (on) {
                      mark = "rm2-ticks__item--on";
                    }
                    return (
                      <li key={d.id} className={mark}>
                        <label>
                          <input
                            type="checkbox"
                            checked={on}
                            disabled={ticksChecked}
                            onChange={() =>
                              setTicks((p) => ({ ...p, [d.id]: !p[d.id] }))
                            }
                          />
                          {d.label}
                        </label>
                        {ticksChecked && (
                          <p className="rm2-ticks__note">{d.note}</p>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <p className="learn-screen__hint">
                  <strong>2</strong> {data.topicSentences.skimPrompt}
                </p>
                {!ticksChecked && (
                  <button
                    type="button"
                    className="nav-btn action-btn primary"
                    onClick={() => setTicksChecked(true)}
                  >
                    Check supporting details →
                  </button>
                )}
              </div>

              {ticksChecked && (
                <div className="rm2-strategy__block">
                  <p className="rm2-strategy__ex">
                    <span>3a</span>
                    {data.topicSentences.ex3a}
                  </p>
                  <p className="learn-screen__hint">
                    Click a paragraph number to highlight its topic sentence in
                    the text.
                  </p>
                  <ol className="rm2-strategy__later">
                    {data.topicSentences.laterTopics.map((t) => {
                      const on = markedParas.includes(t.paragraphIndex);
                      return (
                        <li key={t.paragraphIndex}>
                          <button
                            type="button"
                            className={`rm2-strategy__later-btn ${on ? "rm2-strategy__later-btn--on" : ""}`}
                            disabled={ex3Checked}
                            onClick={() =>
                              setMarkedParas((prev) =>
                                prev.includes(t.paragraphIndex)
                                  ? prev.filter((x) => x !== t.paragraphIndex)
                                  : [...prev, t.paragraphIndex],
                              )
                            }
                          >
                            <strong>Para {t.paragraphIndex + 1}</strong>
                            <span>{t.topicSentence}</span>
                          </button>
                          {ex3Checked && (
                            <p className="rm2-ticks__note">
                              Supporting details: {t.summary}
                            </p>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                  <p className="rm2-strategy__ex">
                    <span>3b</span>
                    {data.topicSentences.ex3b}
                  </p>
                  {!ex3Checked ? (
                    <button
                      type="button"
                      className="nav-btn action-btn primary"
                      onClick={() => setEx3Checked(true)}
                    >
                      Check topic sentences →
                    </button>
                  ) : (
                    <p className="pr-endings-panel__tip rm2-strategy__tip">
                      TB: Para 2 surplus · 3 settle / epidemics · 4 height · 5
                      bone strength · 6 intensive farming · 7 life expectancy ·
                      8 diet · 9 short-term negatives
                    </p>
                  )}
                </div>
              )}
            </aside>
          </div>
        </section>
      )}

      {showExamTask && (
        <section className="card flow-card flow-card--exam-split learn-screen">
          <div className="exam-split__toolbar">
            <h2 className="card-title" style={{ margin: 0 }}>
              <span className="dot" />
              {trackMode === "exam" ? examTaskLabel : examTaskLabel.replace("Exam ", "Task ")}
            </h2>
            <div className="exam-split__toolbar-actions">
              <button
                type="button"
                className={`nav-btn ${splitBias === "passage" ? "nav-btn--on" : ""}`}
                onClick={() =>
                  setSplitBias((b) => (b === "passage" ? "balanced" : "passage"))
                }
              >
                Wider text
              </button>
              <button
                type="button"
                className={`nav-btn ${splitBias === "tasks" ? "nav-btn--on" : ""}`}
                onClick={() =>
                  setSplitBias((b) => (b === "tasks" ? "balanced" : "tasks"))
                }
              >
                Wider tasks
              </button>
            </div>
          </div>

          <div className="exam-split exam-split--m2">
            <div className="exam-split__mobile-toggle">
              <button
                type="button"
                className={mobilePane === "passage" ? "active" : ""}
                onClick={() => setMobilePane("passage")}
              >
                Текст
              </button>
              <button
                type="button"
                className={mobilePane === "tasks" ? "active" : ""}
                onClick={() => setMobilePane("tasks")}
              >
                Задания 1–{totalQuestions}
              </button>
            </div>
            <div className={`exam-split__layout ${biasClass}`}>
              <div
                className={`exam-split__passage ${mobilePane === "passage" ? "exam-split__pane--show" : ""}`}
              >
                <p className="exam-split__col-label">Passage</p>
                <PassagePane
                  data={data}
                  evidenceTerms={checked ? evidence.terms : []}
                  showEvidence={checked && evidence.terms.length > 0}
                  activeParagraphIndex={
                    checked ? evidence.paragraphIndex : undefined
                  }
                  paragraphRefs={paraRefs}
                />
              </div>
              <aside
                className={`exam-split__tasks ${mobilePane === "tasks" ? "exam-split__pane--show" : ""}`}
              >
                <p className="exam-split__col-label">
                  Questions 1–{tfngCount}
                </p>
                <p className="rm2-q-instr">{data.tfngInstruction}</p>
                <p className="pr-tfng__legend-line">
                  {data.tfngLegend.map((l, i) => (
                    <span key={l.value}>
                      {i > 0 ? " · " : ""}
                      <strong>{l.value}</strong>
                    </span>
                  ))}
                </p>
                <ol className="pr-tfng rm2-tfng">
                  {data.tfng.map((q) => {
                    const selected = tfngAnswers[q.id];
                    const ok = selected === q.key;
                    return (
                      <li
                        key={q.id}
                        className={activeQ === q.id ? "pr-tfng__item--on" : undefined}
                        onMouseEnter={() => checked && setActiveQ(q.id)}
                      >
                        <span className="pr-mc__num">{q.id}</span>
                        <p className="pr-tfng__prompt">
                          {q.statement}
                          {checked && (
                            <span className="pr-tfng__mark">
                              {ok ? (
                                <span className="inline-gap-ok"> ✓</span>
                              ) : (
                                <span className="inline-gap-bad"> → {q.key}</span>
                              )}
                            </span>
                          )}
                        </p>
                        <div className="pr-tfng__choices">
                          {TFNG_OPTIONS.map((opt) => {
                            let state = "";
                            if (checked) {
                              if (opt === q.key) state = "pr-chip--ok";
                              else if (selected === opt) state = "pr-chip--bad";
                            } else if (selected === opt) {
                              state = "pr-chip--picked";
                            }
                            return (
                              <button
                                key={opt}
                                type="button"
                                className={`pr-chip pr-chip--tfng ${state}`}
                                onClick={() => {
                                  setActiveQ(q.id);
                                  if (checked) return;
                                  setTfngAnswers((a) => ({ ...a, [q.id]: opt }));
                                }}
                              >
                                {opt === "NOT GIVEN" ? "NG" : opt}
                              </button>
                            );
                          })}
                        </div>
                      </li>
                    );
                  })}
                </ol>

                {hasShort && (
                  <>
                    <p className="exam-split__col-label">
                      Questions {tfngCount + 1}–{totalQuestions}
                    </p>
                    <p className="rm2-q-instr">{data.shortInstruction}</p>
                    <ol className="rm2-sa">
                      {data.short.map((q) => {
                        const val = shortAnswers[q.id] ?? "";
                        const ok = checkM2Short(val, q.answers);
                        return (
                          <li
                            key={q.id}
                            className={
                              activeQ === q.id ? "rm2-sa__item--on" : undefined
                            }
                            onMouseEnter={() => checked && setActiveQ(q.id)}
                          >
                            <span className="pr-mc__num">{q.id}</span>
                            <p>
                              {q.question}{" "}
                              <input
                                className={
                                  checked
                                    ? ok
                                      ? "pr-completion__input pr-completion__input--ok"
                                      : "pr-completion__input pr-completion__input--bad"
                                    : "pr-completion__input"
                                }
                                value={val}
                                disabled={checked}
                                placeholder="…"
                                onFocus={() => setActiveQ(q.id)}
                                onChange={(e) => {
                                  setActiveQ(q.id);
                                  setShortAnswers((a) => ({
                                    ...a,
                                    [q.id]: e.target.value,
                                  }));
                                }}
                              />
                              {checked && !ok && (
                                <span className="inline-gap-bad">
                                  {" "}
                                  → {q.answers[0]}
                                </span>
                              )}
                            </p>
                          </li>
                        );
                      })}
                    </ol>
                  </>
                )}
                {checked && activeTip && (
                  <p className="pr-endings-panel__tip">{activeTip}</p>
                )}
              </aside>
            </div>
          </div>
        </section>
      )}

      {trackMode === "learn" && learnStep === 3 && data.taskAnalysis && (
        <div className="learn-screen learn-discussion rm2-discuss">
          <section className="card flow-card">
            <h2 className="card-title">
              <span className="dot" />
              Task analysis
            </h2>
            <p className="learn-screen__hint">
              How useful were the test strategies? Agree or disagree.
            </p>
            <ul className="rm2-agree">
              {data.taskAnalysis.map((s, i) => (
                <li key={s}>
                  <p>{s}</p>
                  <div className="pr-tfng__choices">
                    {(["agree", "disagree"] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className={`pr-chip ${agree[i] === opt ? "pr-chip--picked" : ""}`}
                        onClick={() =>
                          setAgree((a) => ({ ...a, [i]: opt }))
                        }
                      >
                        {opt === "agree" ? "Agree" : "Disagree"}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <DiscussionBlock data={data} />
        </div>
      )}

      <div className={`flow-footer ${checked && showExamTask ? "flow-footer--checked" : ""}`}>
        {trackMode === "learn" && learnStep !== 2 ? (
          <>
            <button
              type="button"
              className="flow-footer__btn"
              disabled={learnStep === 0}
              onClick={goPrev}
            >
              ← Назад
            </button>
            <span className="flow-footer__step">
              {learnStep + 1} / {learnSteps.length}
            </span>
            <button
              type="button"
              className="flow-footer__btn flow-footer__btn--primary"
              onClick={goNext}
            >
              {learnNextLabel}
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="flow-footer__btn"
              onClick={trackMode === "learn" ? goPrev : () => onBack?.()}
            >
              {trackMode === "learn" ? "← Назад" : "← К модулю"}
            </button>
            {checked ? (
              <div className="flow-footer__result">
                <span className="flow-footer__ok">✓ {score} верно</span>
                <span className="flow-footer__bad">✗ {total - score} неверно</span>
                <div className="flow-footer__palette">
                  {allIds.map((id) => (
                    <button
                      key={id}
                      type="button"
                      className={`exam-review__q ${isOk(id) ? "exam-review__q--ok" : "exam-review__q--bad"} ${activeQ === id ? "exam-review__q--on" : ""}`}
                      onMouseEnter={() => setActiveQ(id)}
                      onClick={() => setActiveQ(id)}
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <span className="flow-footer__step">
                Вопросы 1–{totalQuestions}
              </span>
            )}
            <button
              type="button"
              className="flow-footer__btn"
              onClick={() => {
                setChecked(false);
                setTfngAnswers({});
                setShortAnswers({});
                setActiveQ(null);
              }}
            >
              Заново
            </button>
            <button
              type="button"
              className="flow-footer__btn flow-footer__btn--primary"
              onClick={() => setChecked(true)}
            >
              Check answers →
            </button>
            {trackMode === "learn" && learnStep === 2 && checked && (
              <button
                type="button"
                className="flow-footer__btn flow-footer__btn--primary"
                onClick={() => setLearnStep(3)}
              >
                Discussion →
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
