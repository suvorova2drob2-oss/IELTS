import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  checkAnswer,
  getGapParagraphIndex,
  LEARN_STEP_NEXT,
  LEARN_STEPS,
  migrateLegacyReadingStep,
  readingFlowM1,
  type GapMeta,
  type ReadingFlowData,
  type Segment,
} from "../data/readingFlowM1";
import { READING_MODE_KEY, READING_STEP_KEY } from "../hooks/useCourseData";

type TrackMode = "exam" | "learn";
type PracticeMode = "practice" | "exam";
type SplitBias = "balanced" | "passage" | "tasks";

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

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function DiscussionPanel({
  data,
}: {
  data: ReadingFlowData["discussion"];
}) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(data.timeSecPerQuestion);
  const [timerDone, setTimerDone] = useState(false);

  const question = data.questions[questionIndex];

  useEffect(() => {
    setTimerRunning(false);
    setTimeLeft(data.timeSecPerQuestion);
    setTimerDone(false);
  }, [questionIndex, data.timeSecPerQuestion]);

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
      <p className="article-preview__label">After reading · pp. 8–9</p>
      <p className="question-text">{data.instruction}</p>
      <OralBanner>
        Обсуждайте в парах или группе. Писать не нужно — включите таймер и говорите.
      </OralBanner>

      <div className="question-header">
        <span className="question-number">
          Question {questionIndex + 1} of {data.questions.length}
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
                setTimeLeft(data.timeSecPerQuestion);
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
          disabled={questionIndex >= data.questions.length - 1}
          onClick={() => setQuestionIndex((i) => i + 1)}
        >
          Next →
        </button>
      </div>

      <div className="progress-dots">
        {data.questions.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`progress-dot ${i === questionIndex ? "active" : ""} ${i < questionIndex ? "done" : ""}`}
            aria-label={`Question ${i + 1}`}
            onClick={() => setQuestionIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}

function loadTrackMode(
  restart?: boolean,
  initialStep?: number,
): TrackMode {
  if (initialStep != null) return "learn";
  if (restart) return "exam";
  try {
    const raw = sessionStorage.getItem(READING_MODE_KEY);
    if (raw === "learn" || raw === "exam") return raw;
  } catch {
    /* ignore */
  }
  return "exam";
}

function loadLearnStep(restart?: boolean, initialStep?: number): number {
  if (initialStep != null) {
    return migrateLegacyReadingStep(initialStep);
  }
  if (restart) return 0;
  try {
    const raw = sessionStorage.getItem(READING_STEP_KEY);
    if (raw != null) {
      const n = Number(raw);
      if (!Number.isNaN(n) && n >= 0) {
        return migrateLegacyReadingStep(n);
      }
    }
  } catch {
    /* ignore */
  }
  return 0;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function PassageReader({
  title,
  paragraphs,
  highlightTerms,
  showHighlights,
  evidenceTerms,
  showEvidence,
  largeText,
  compact,
  singleColumn,
  paragraphRefs,
  activeParagraphIndex,
  anchorParagraphIndices,
  evidenceRefs,
}: {
  title: string;
  paragraphs: string[];
  highlightTerms: string[];
  showHighlights: boolean;
  evidenceTerms?: string[];
  showEvidence?: boolean;
  largeText?: boolean;
  compact?: boolean;
  singleColumn?: boolean;
  paragraphRefs?: React.MutableRefObject<(HTMLParagraphElement | null)[]>;
  activeParagraphIndex?: number;
  anchorParagraphIndices?: number[];
  evidenceRefs?: React.MutableRefObject<(HTMLElement | null)[]>;
}) {
  let evidenceMarkIndex = 0;
  const oneCol = singleColumn || Boolean(paragraphRefs);

  return (
    <article
      className={[
        "passage-reader",
        largeText ? "passage-reader--lg" : "",
        compact ? "passage-reader--compact" : "",
        oneCol ? "passage-reader--single-col" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <header className="passage-reader__header">
        <h2>{title}</h2>
      </header>
      <div className="passage-reader__body">
        {paragraphs.map((p, i) => {
          const isAnchor = anchorParagraphIndices?.includes(i);
          const isActive = activeParagraphIndex === i;
          const terms = showEvidence && evidenceTerms?.length
            ? evidenceTerms
            : highlightTerms;
          const useEvidence = Boolean(showEvidence && evidenceTerms?.length);
          const markClass = useEvidence ? "passage-evidence" : "passage-highlight";

          let content: ReactNode = p;
          if (useEvidence || showHighlights) {
            const sorted = [...terms].sort((a, b) => b.length - a.length);
            if (sorted.length > 0) {
              const pattern = sorted.map(escapeRegex).join("|");
              const regex = new RegExp(`(${pattern})`, "gi");
              const parts = p.split(regex);
              content = parts.map((part, pi) => {
                const isHit = sorted.some(
                  (t) => part.toLowerCase() === t.toLowerCase(),
                );
                if (!isHit) return <span key={pi}>{part}</span>;
                const idx = evidenceMarkIndex++;
                return (
                  <mark
                    key={pi}
                    className={markClass}
                    ref={(el) => {
                      if (evidenceRefs && useEvidence) {
                        evidenceRefs.current[idx] = el;
                      }
                    }}
                    data-evidence-index={useEvidence ? idx : undefined}
                  >
                    {part}
                  </mark>
                );
              });
            }
          }

          return (
            <p
              key={i}
              ref={(el) => {
                if (paragraphRefs) paragraphRefs.current[i] = el;
              }}
              data-paragraph={i}
              className={[
                i === 0
                  ? "passage-reader__p passage-reader__p--drop"
                  : "passage-reader__p",
                isAnchor ? "passage-reader__p--anchor" : "",
                isActive ? "passage-reader__p--active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {content}
            </p>
          );
        })}
      </div>
      {showEvidence && evidenceTerms && evidenceTerms.length > 0 && (
        <p className="passage-reader__legend">
          <mark className="passage-evidence" /> = где искать ответ в тексте
        </p>
      )}
      {!showEvidence && showHighlights && (
        <p className="passage-reader__legend">
          <mark className="passage-highlight" /> = key words for scanning
        </p>
      )}
    </article>
  );
}

function GapPlaceholder({ id }: { id: number }) {
  return (
    <span className="gap-placeholder">
      <span className="gap-num">{id}</span>
      <span className="gap-placeholder__blank">_______</span>
    </span>
  );
}

function InlineLine({
  segments,
  values,
  onChange,
  showResult,
  gapMeta,
  mode,
  onGapFocus,
  onGapHover,
}: {
  segments: Segment[];
  values: Record<number, string>;
  onChange: (id: number, v: string) => void;
  showResult: boolean;
  gapMeta?: GapMeta;
  mode: PracticeMode;
  onGapFocus?: (id: number) => void;
  onGapHover?: (id: number | null) => void;
}) {
  return (
    <li className="inline-line">
      {segments.map((seg, i) => {
        if (seg.type === "text") return <span key={i}>{seg.text}</span>;
        const ok =
          showResult && gapMeta
            ? checkAnswer(values[seg.id] ?? "", gapMeta.answers)
            : null;
        return (
          <span
            key={i}
            className={`inline-gap-wrap ${ok === true ? "inline-gap-wrap--ok" : ""} ${ok === false ? "inline-gap-wrap--bad" : ""}`}
            data-gap-id={seg.id}
            onMouseEnter={() => onGapHover?.(seg.id)}
            onMouseLeave={() => onGapHover?.(null)}
          >
            <span className="gap-num">{seg.id}</span>
            <input
              className={`inline-gap-input ${ok === true ? "inline-gap-input--ok" : ""} ${ok === false ? "inline-gap-input--bad" : ""}`}
              type="text"
              value={values[seg.id] ?? ""}
              onChange={(e) => onChange(seg.id, e.target.value)}
              onFocus={() => onGapFocus?.(seg.id)}
              aria-label={`Gap ${seg.id}`}
              placeholder="…"
            />
            {showResult && gapMeta && (
              <span className={ok ? "inline-gap-ok" : "inline-gap-bad"}>
                {ok ? " ✓ верно" : ` → ${gapMeta.answers[0]}`}
              </span>
            )}
          </span>
        );
      })}
      {mode === "practice" && !showResult && gapMeta && (
        <span className="line-hint"> 💡 {gapMeta.hint}</span>
      )}
    </li>
  );
}

function SegmentContent({
  segments,
  mode,
  values,
  onChange,
  showResult,
  gaps,
  onGapFocus,
  onGapHover,
}: {
  segments: Segment[];
  mode: "preview" | "fill";
  values: Record<number, string>;
  onChange: (id: number, v: string) => void;
  showResult: boolean;
  gaps: Record<number, GapMeta>;
  onGapFocus?: (id: number) => void;
  onGapHover?: (id: number | null) => void;
}) {
  if (mode === "fill") {
    return (
      <span className="segment-fill">
        {segments.map((seg, i) => {
          if (seg.type === "text") return <span key={i}>{seg.text}</span>;
          const meta = gaps[seg.id];
          const ok =
            showResult && meta
              ? checkAnswer(values[seg.id] ?? "", meta.answers)
              : null;
          return (
            <span
              key={i}
              className={`inline-gap-wrap ${ok === true ? "inline-gap-wrap--ok" : ""} ${ok === false ? "inline-gap-wrap--bad" : ""}`}
              data-gap-id={seg.id}
              onMouseEnter={() => onGapHover?.(seg.id)}
              onMouseLeave={() => onGapHover?.(null)}
            >
              <span className="gap-num">{seg.id}</span>
              <input
                className={`inline-gap-input ${ok === true ? "inline-gap-input--ok" : ""} ${ok === false ? "inline-gap-input--bad" : ""}`}
                type="text"
                value={values[seg.id] ?? ""}
                onChange={(e) => onChange(seg.id, e.target.value)}
                onFocus={() => onGapFocus?.(seg.id)}
                aria-label={`Gap ${seg.id}`}
                placeholder="…"
              />
              {showResult && meta && (
                <span className={ok ? "inline-gap-ok" : "inline-gap-bad"}>
                  {ok ? " ✓ верно" : ` → ${meta.answers[0]}`}
                </span>
              )}
            </span>
          );
        })}
      </span>
    );
  }

  return (
    <span className="segment-preview">
      {segments.map((seg, i) =>
        seg.type === "text" ? (
          <span key={i}>{seg.text}</span>
        ) : (
          <GapPlaceholder key={i} id={seg.id} />
        ),
      )}
    </span>
  );
}

function CompletionTablePanel({
  data,
  mode,
  values,
  onChange,
  showResult,
  practiceMode,
  highlightRowIndex,
  rowRefs,
  onGapFocus,
  onGapHover,
}: {
  data: ReadingFlowData;
  mode: "preview" | "fill";
  values: Record<number, string>;
  onChange: (id: number, v: string) => void;
  showResult: boolean;
  practiceMode: PracticeMode;
  highlightRowIndex?: number;
  rowRefs?: React.MutableRefObject<(HTMLDivElement | null)[]>;
  onGapFocus?: (id: number) => void;
  onGapHover?: (id: number | null) => void;
}) {
  return (
    <div className="completion-table completion-table--full completion-table--exam">
      <div className="completion-table__titlebar">
        <span className="task-title-box__q">Questions 5–9</span>
        <h3>{data.taskOverview.tableTitle}</h3>
        <p>{data.taskOverview.tableInstruction}</p>
      </div>
      <div className="completion-table__head">
        <span />
        <span>ADVICE</span>
        <span>BENEFITS</span>
      </div>
      {data.table.rows.map((row, rowIndex) => (
        <div
          key={row.category}
          ref={(el) => {
            if (rowRefs) rowRefs.current[rowIndex] = el;
          }}
          className={`completion-table__row ${highlightRowIndex === rowIndex ? "completion-table__row--active" : ""}`}
        >
          <span className="completion-table__cat">{row.category}</span>
          <ul className="completion-table__cell">
            {row.advice.map((line, i) => (
              <li key={i} className="inline-line">
                <SegmentContent
                  segments={line.segments}
                  mode={mode}
                  values={values}
                  onChange={onChange}
                  showResult={showResult}
                  gaps={data.gaps}
                  onGapFocus={onGapFocus}
                  onGapHover={onGapHover}
                />
                {mode === "fill" &&
                  practiceMode === "practice" &&
                  !showResult &&
                  line.gap && (
                    <span className="line-hint"> 💡 {line.gap.hint}</span>
                  )}
              </li>
            ))}
          </ul>
          <ul className="completion-table__cell">
            {row.benefits.map((line, i) => (
              <li key={i} className="inline-line">
                <SegmentContent
                  segments={line.segments}
                  mode={mode}
                  values={values}
                  onChange={onChange}
                  showResult={showResult}
                  gaps={data.gaps}
                  onGapFocus={onGapFocus}
                  onGapHover={onGapHover}
                />
                {mode === "fill" &&
                  practiceMode === "practice" &&
                  !showResult &&
                  line.gap && (
                    <span className="line-hint"> 💡 {line.gap.hint}</span>
                  )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function NotesPanel({
  data,
  mode,
  values,
  onChange,
  showResult,
  practiceMode,
  highlightGapId,
  noteRefs,
  onGapFocus,
  onGapHover,
}: {
  data: ReadingFlowData;
  mode: "preview" | "fill";
  values: Record<number, string>;
  onChange: (id: number, v: string) => void;
  showResult: boolean;
  practiceMode: PracticeMode;
  highlightGapId?: number;
  noteRefs?: React.MutableRefObject<(HTMLLIElement | null)[]>;
  onGapFocus?: (id: number) => void;
  onGapHover?: (id: number | null) => void;
}) {
  return (
    <div className="notes-task-panel notes-task-panel--exam">
      <div className="notes-task-panel__header">
        <span className="task-title-box__q">Questions 1–4</span>
        <h3 className="notes-title">{data.taskOverview.notesTitle}</h3>
        <p className="section-hint">{data.taskOverview.notesInstruction}</p>
      </div>
      <ul className="notes-list">
        {data.notes.map((item, i) => (
          <li
            key={item.gap.id}
            ref={(el) => {
              if (noteRefs) noteRefs.current[i] = el;
            }}
            className={
              highlightGapId === item.gap.id ? "notes-list__item--active" : ""
            }
          >
            {mode === "fill" ? (
              <InlineLine
                segments={item.segments}
                values={values}
                onChange={onChange}
                showResult={showResult}
                gapMeta={data.gaps[item.gap.id]}
                mode={practiceMode}
                onGapFocus={onGapFocus}
                onGapHover={onGapHover}
              />
            ) : (
              <span className="inline-line">
                <SegmentContent
                  segments={item.segments}
                  mode="preview"
                  values={values}
                  onChange={onChange}
                  showResult={showResult}
                  gaps={data.gaps}
                />
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExamSplit({
  data,
  values,
  onChange,
  showResult,
  practiceMode,
  largeText,
  splitBias,
  externalGapId,
  onJumpRequest,
}: {
  data: ReadingFlowData;
  values: Record<number, string>;
  onChange: (id: number, v: string) => void;
  showResult: boolean;
  practiceMode: PracticeMode;
  largeText: boolean;
  splitBias: SplitBias;
  externalGapId?: number | null;
  onJumpRequest?: (fn: (gapId: number) => void) => void;
}) {
  const passageScrollRef = useRef<HTMLDivElement>(null);
  const taskScrollRef = useRef<HTMLDivElement>(null);
  const paraRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const noteRefs = useRef<(HTMLLIElement | null)[]>([]);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeGapId, setActiveGapId] = useState<number | undefined>(1);
  const [hoverGapId, setHoverGapId] = useState<number | null>(null);
  const [mobilePane, setMobilePane] = useState<"passage" | "tasks">("tasks");

  const allAnchors = [
    ...data.notes.map((n) => n.relatedParagraphIndex),
    ...data.table.rows.map((r) => r.relatedParagraphIndex),
  ];

  const focusGapId =
    externalGapId ?? hoverGapId ?? activeGapId ?? undefined;

  const activeParagraphIndex =
    focusGapId != null ? getGapParagraphIndex(data, focusGapId) : undefined;

  const evidenceTerms =
    showResult && focusGapId != null
      ? (data.gaps[focusGapId]?.evidence ?? [])
      : [];

  const jumpToGap = useCallback(
    (gapId: number) => {
      setActiveGapId(gapId);
      const paraIdx = getGapParagraphIndex(data, gapId);
      if (paraIdx != null) {
        paraRefs.current[paraIdx]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

      const noteIdx = data.notes.findIndex((n) => n.gap.id === gapId);
      if (noteIdx >= 0) {
        noteRefs.current[noteIdx]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
        return;
      }

      data.table.rows.forEach((row, i) => {
        const hit = [...row.advice, ...row.benefits].some(
          (l) => l.gap?.id === gapId,
        );
        if (hit) {
          rowRefs.current[i]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      });
    },
    [data],
  );

  useEffect(() => {
    onJumpRequest?.(jumpToGap);
  }, [jumpToGap, onJumpRequest]);

  useEffect(() => {
    if (externalGapId != null) jumpToGap(externalGapId);
  }, [externalGapId, jumpToGap]);

  const biasClass =
    splitBias === "passage"
      ? "exam-split__layout--passage"
      : splitBias === "tasks"
        ? "exam-split__layout--tasks"
        : "";

  const handleHover = (id: number | null) => {
    setHoverGapId(id);
    if (id != null && showResult) {
      const paraIdx = getGapParagraphIndex(data, id);
      if (paraIdx != null) {
        paraRefs.current[paraIdx]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  return (
    <div className="exam-split">
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
          Задания 1–9
        </button>
      </div>

      <div className={`exam-split__layout ${biasClass}`}>
        <div
          className={`exam-split__passage ${mobilePane === "passage" ? "exam-split__pane--show" : ""}`}
          ref={passageScrollRef}
        >
          <p className="exam-split__col-label">
            Passage
            {showResult && focusGapId != null && (
              <span className="exam-split__active-q">
                {" "}
                · ответ Q{focusGapId} в тексте
              </span>
            )}
          </p>
          <PassageReader
            title={data.article.title}
            paragraphs={data.passage}
            highlightTerms={data.scan.highlightTerms}
            showHighlights={false}
            evidenceTerms={evidenceTerms}
            showEvidence={showResult && evidenceTerms.length > 0}
            largeText={largeText}
            compact
            singleColumn
            paragraphRefs={paraRefs}
            activeParagraphIndex={activeParagraphIndex}
            anchorParagraphIndices={allAnchors}
          />
        </div>

        <aside
          className={`exam-split__tasks ${mobilePane === "tasks" ? "exam-split__pane--show" : ""}`}
          ref={taskScrollRef}
        >
          <p className="exam-split__col-label sticky">
            Questions 1–9
            {showResult && (
              <span className="exam-split__hover-hint">
                {" "}
                · наведите на ответ → место в тексте
              </span>
            )}
          </p>

          <NotesPanel
            data={data}
            mode="fill"
            values={values}
            onChange={onChange}
            showResult={showResult}
            practiceMode={practiceMode}
            highlightGapId={focusGapId}
            noteRefs={noteRefs}
            onGapFocus={jumpToGap}
            onGapHover={handleHover}
          />

          <CompletionTablePanel
            data={data}
            mode="fill"
            values={values}
            onChange={onChange}
            showResult={showResult}
            practiceMode={practiceMode}
            highlightRowIndex={
              focusGapId != null
                ? data.table.rows.findIndex((row) =>
                    [...row.advice, ...row.benefits].some(
                      (l) => l.gap?.id === focusGapId,
                    ),
                  )
                : undefined
            }
            rowRefs={rowRefs}
            onGapFocus={jumpToGap}
            onGapHover={handleHover}
          />

          {showResult && (
            <div className="exam-review exam-review--compact">
              <h4>На что обратить внимание</h4>
              <ul>
                {data.examTips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export function ReadingFlowTrainer({
  data,
  onBack,
  restart,
  initialStep,
}: {
  data: ReadingFlowData;
  onBack?: () => void;
  contextLabel?: string;
  restart?: boolean;
  initialStep?: number;
}) {
  const [trackMode, setTrackMode] = useState<TrackMode>(() =>
    loadTrackMode(restart, initialStep),
  );
  const [learnStep, setLearnStep] = useState(() =>
    loadLearnStep(restart, initialStep),
  );
  const [practiceMode, setPracticeMode] = useState<PracticeMode>("practice");
  const [revealedHints, setRevealedHints] = useState(0);
  const [checks, setChecks] = useState<boolean[]>(() =>
    data.article.checkQuestions.map(() => false),
  );
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [splitBias, setSplitBias] = useState<SplitBias>("balanced");
  const [footerGapId, setFooterGapId] = useState<number | null>(null);
  const jumpRef = useRef<(gapId: number) => void>(() => {});

  useEffect(() => {
    setRevealedHints(0);
  }, [learnStep, trackMode]);

  useEffect(() => {
    if (restart) {
      setTrackMode(initialStep != null ? "learn" : "exam");
      setLearnStep(initialStep != null ? migrateLegacyReadingStep(initialStep) : 0);
      setChecked(false);
      try {
        sessionStorage.removeItem(READING_STEP_KEY);
      } catch {
        /* ignore */
      }
    }
  }, [restart, initialStep]);

  useEffect(() => {
    if (initialStep != null) {
      setTrackMode("learn");
      setLearnStep(migrateLegacyReadingStep(initialStep));
    }
  }, [initialStep]);

  useEffect(() => {
    try {
      sessionStorage.setItem(READING_MODE_KEY, trackMode);
      if (trackMode === "learn") {
        sessionStorage.setItem(READING_STEP_KEY, String(learnStep));
      }
    } catch {
      /* ignore */
    }
  }, [trackMode, learnStep]);

  const gapIds = Object.keys(data.gaps).map(Number);
  const score = gapIds.filter((id) =>
    checkAnswer(answers[id] ?? "", data.gaps[id].answers),
  ).length;
  const wrongCount = gapIds.length - score;

  const showExamTask =
    trackMode === "exam" || (trackMode === "learn" && learnStep === 2);

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
    if (learnStep >= LEARN_STEPS.length - 1) {
      onBack?.();
      return;
    }
    setLearnStep((s) => Math.min(s + 1, LEARN_STEPS.length - 1));
  };

  const learnNextLabel =
    learnStep === 2 && !checked
      ? "Check answers →"
      : (LEARN_STEP_NEXT[learnStep] ?? "Дальше →");

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
        <div className="controls mode-toggle">
          <button
            type="button"
            className={practiceMode === "practice" ? "active" : ""}
            onClick={() => {
              setPracticeMode("practice");
              setChecked(false);
            }}
          >
            Hints
          </button>
          <button
            type="button"
            className={practiceMode === "exam" ? "active" : ""}
            onClick={() => {
              setPracticeMode("exam");
              setChecked(false);
            }}
          >
            No hints
          </button>
        </div>
        {trackMode === "learn" && (
          <div className="learn-step-tabs">
            {LEARN_STEPS.map((label, i) => (
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

      {trackMode === "learn" && learnStep === 0 && (
        <section className="card flow-card learn-screen predict-split-card">
          <div className="predict-split predict-split--viewport">
            <aside className="predict-split__passage">
              <p className="article-preview__label">Warm-up</p>
              <article className="article-preview">
                <h2 className="article-preview__title">{data.article.title}</h2>
                <p className="article-preview__intro">{data.article.introduction}</p>
              </article>
              {practiceMode === "practice" && (
                <div className="vocab-panel vocab-panel--compact">
                  <h4>Key words</h4>
                  <div className="vocab-tags">
                    {data.article.keyVocab.map((w) => (
                      <span key={w} className="vocab-tag">
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </aside>

            <div className="predict-split__task">
              <h2 className="card-title">
                <span className="dot" />
                Predict aloud
              </h2>
              <p className="learn-screen__hint">Говорите вслух — писать не нужно.</p>
              <ul className="predict-prompts">
                {data.article.predictPrompts.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              {practiceMode === "practice" && (
                <>
                  <div className="hint-buttons">
                    {data.article.predictHints.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`hint-btn ${i < revealedHints ? "revealed" : ""}`}
                        disabled={i < revealedHints}
                        onClick={() =>
                          setRevealedHints((n) =>
                            Math.min(n + 1, data.article.predictHints.length),
                          )
                        }
                      >
                        Hint {i + 1}
                      </button>
                    ))}
                  </div>
                  {data.article.predictHints
                    .slice(0, revealedHints)
                    .map((hint, i) => (
                      <div key={i} className="hint-box">
                        {hint}
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {trackMode === "learn" && learnStep === 1 && (
        <section className="card flow-card learn-screen learn-scan">
          <div className="learn-scan__layout">
            <div className="learn-scan__passage">
              <PassageReader
                title={data.article.title}
                paragraphs={data.passage}
                highlightTerms={data.scan.highlightTerms}
                showHighlights={practiceMode === "practice"}
                compact
                singleColumn
              />
            </div>
            <aside className="learn-scan__sidebar">
              <h2 className="card-title">
                <span className="dot" />
                Scan focus
              </h2>
              <p className="learn-screen__hint">{data.scan.instruction}</p>
              <ol className="scan-box__steps scan-box__steps--compact">
                {data.scan.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <h3 className="learn-scan__sub">Predictions?</h3>
              <ul className="check-list check-list--compact">
                {data.article.checkQuestions.map((q, i) => (
                  <li key={q}>
                    <label>
                      <input
                        type="checkbox"
                        checked={checks[i]}
                        onChange={() =>
                          setChecks((p) => p.map((v, j) => (j === i ? !v : v)))
                        }
                      />
                      {q}
                    </label>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>
      )}

      {showExamTask && (
        <section className="card flow-card flow-card--exam-split learn-screen">
          <div className="exam-split__toolbar">
            <h2 className="card-title" style={{ margin: 0 }}>
              <span className="dot" />
              {trackMode === "exam" ? "Exam task 1–9" : "Task 1–9"}
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

          <ExamSplit
            data={data}
            values={answers}
            onChange={(id, v) => setAnswers((p) => ({ ...p, [id]: v }))}
            showResult={checked}
            practiceMode={practiceMode}
            largeText={false}
            splitBias={splitBias}
            externalGapId={footerGapId}
            onJumpRequest={(fn) => {
              jumpRef.current = fn;
            }}
          />
        </section>
      )}

      {trackMode === "learn" && learnStep === 3 && (
        <div className="learn-screen learn-discussion">
          <DiscussionPanel data={data.discussion} />
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
              {learnStep + 1} / {LEARN_STEPS.length}
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
              onClick={
                trackMode === "learn"
                  ? goPrev
                  : () => onBack?.()
              }
            >
              {trackMode === "learn" ? "← Назад" : "← К модулю"}
            </button>

            {checked ? (
              <div className="flow-footer__result">
                <span className="flow-footer__ok">✓ {score} верно</span>
                <span className="flow-footer__bad">✗ {wrongCount} неверно</span>
                <div className="flow-footer__palette">
                  {gapIds.map((id) => {
                    const ok = checkAnswer(
                      answers[id] ?? "",
                      data.gaps[id].answers,
                    );
                    return (
                      <button
                        key={id}
                        type="button"
                        className={`exam-review__q ${ok ? "exam-review__q--ok" : "exam-review__q--bad"} ${footerGapId === id ? "exam-review__q--on" : ""}`}
                        title={
                          ok
                            ? `Q${id}: верно`
                            : `Q${id}: → ${data.gaps[id].answers[0]}`
                        }
                        onMouseEnter={() => setFooterGapId(id)}
                        onMouseLeave={() => setFooterGapId(null)}
                        onClick={() => {
                          setFooterGapId(id);
                          jumpRef.current(id);
                        }}
                      >
                        {id}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <span className="flow-footer__step">Вопросы 1–9</span>
            )}

            <button
              type="button"
              className="flow-footer__btn"
              onClick={() => {
                setChecked(false);
                setAnswers({});
                setFooterGapId(null);
              }}
            >
              Заново
            </button>
            <button
              type="button"
              className="flow-footer__btn flow-footer__btn--primary"
              onClick={() => {
                setChecked(true);
                if (trackMode === "learn" && learnStep === 2) {
                  /* stay on task with results */
                }
              }}
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

export { readingFlowM1 };
