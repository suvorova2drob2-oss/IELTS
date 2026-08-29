import { useCallback, useEffect, useMemo, useState } from "react";
import {
  leadInIntelligence,
  type LeadInData,
  type Mode,
  type Photo,
  type Question,
} from "../data/leadInIntelligence";
import { leadInDevelopment } from "../data/leadInDevelopment";
import { leadInInsectEmpire } from "../data/leadInInsectEmpire";
import { leadInLibrariesM1 } from "../data/leadInLibrariesM1";
import { leadInTeenagers } from "../data/leadInTeenagers";
import { leadInConsumer } from "../data/leadInConsumer";
import { leadInHomes } from "../data/leadInHomes";
import { leadInCrime } from "../data/leadInCrime";
import { leadInUrban } from "../data/leadInUrban";
import { leadInCommunity } from "../data/leadInCommunity";
import { leadInSuccess } from "../data/leadInSuccess";
import { leadInCutting } from "../data/leadInCutting";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function PhotoGrid({
  photos,
  selectedId,
  onSelect,
}: {
  photos: Photo[];
  selectedId: string | null;
  onSelect: (photo: Photo) => void;
}) {
  const selected = photos.find((p) => p.id === selectedId);

  return (
    <section className="card">
      <h2 className="card-title">
        <span className="dot" />
        {photos.length === 1 ? "Photos" : "Photos — click for hints"}
      </h2>
      <div
        className={[
          "photo-grid",
          photos.length === 1
            ? "photo-grid--single"
            : photos.length === 3
              ? "photo-grid--3"
              : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {photos.map((photo) => (
          <button
            key={photo.id}
            type="button"
            className={[
              "photo-card",
              photo.objectFit === "contain" ? "photo-card--contain" : "",
              selectedId === photo.id ? "selected" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onSelect(photo)}
          >
            <img
              src={photo.src}
              alt={photo.label}
              style={{
                ...(photo.objectPosition
                  ? { objectPosition: photo.objectPosition }
                  : {}),
                ...(photo.objectFit ? { objectFit: photo.objectFit } : {}),
              }}
            />
            <div className="caption">
              <strong>{photo.label}</strong>
              <span>{photo.intelligenceType}</span>
            </div>
          </button>
        ))}
      </div>
      {selected && (
        <div className="photo-hint-panel">
          <strong>{selected.intelligenceType}</strong>
          <p style={{ margin: "6px 0 0" }}>{selected.hint}</p>
        </div>
      )}
    </section>
  );
}

function ClassifyRow({
  items,
  exam,
}: {
  items: NonNullable<Question["classify"]>;
  exam: boolean;
}) {
  const [picked, setPicked] = useState<Record<string, 0 | 1>>({});
  const [checked, setChecked] = useState(false);

  const score = items.items.filter((it) => picked[it.id] === it.key).length;

  return (
    <div className="lead-in-classify">
      {items.items.map((it) => {
        const chosen = picked[it.id];
        const bad = checked && chosen !== it.key;
        return (
          <div key={it.id} className="lead-in-classify__row">
            <span>{it.text}</span>
            <div className="writing-flow__opts">
              {items.labels.map((label, oi) => (
                <button
                  key={label}
                  type="button"
                  className={[
                    chosen === oi ? "active" : "",
                    checked && oi === it.key ? "writing-flow__opt--ok" : "",
                    checked && chosen === oi && bad
                      ? "writing-flow__opt--bad"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  disabled={checked}
                  onClick={() =>
                    setPicked((x) => ({ ...x, [it.id]: oi as 0 | 1 }))
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        );
      })}
      {!exam && (
        <button
          type="button"
          className="nav-btn"
          onClick={() => setChecked(true)}
          disabled={checked}
        >
          {checked ? `✓ ${score}/${items.items.length}` : "Check personal / social →"}
        </button>
      )}
    </div>
  );
}

function QuestionCard({
  question,
  index,
  total,
  mode,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  question: Question;
  index: number;
  total: number;
  mode: Mode;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const [revealedHints, setRevealedHints] = useState(0);
  const [showVocab, setShowVocab] = useState(false);
  const [answer, setAnswer] = useState("");
  const [usedVocab, setUsedVocab] = useState<Set<string>>(new Set());
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(question.timeSec);
  const [timerDone, setTimerDone] = useState(false);

  useEffect(() => {
    setRevealedHints(0);
    setShowVocab(false);
    setAnswer("");
    setUsedVocab(new Set());
    setTimerRunning(false);
    setTimeLeft(question.timeSec);
    setTimerDone(false);
  }, [question]);

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

  useEffect(() => {
    const lower = answer.toLowerCase();
    const found = question.vocab.filter((word) =>
      lower.includes(word.toLowerCase()),
    );
    setUsedVocab(new Set(found));
  }, [answer, question.vocab]);

  const revealHint = () => {
    if (mode === "exam") return;
    setRevealedHints((n) => Math.min(n + 1, question.hints.length));
  };

  const timerClass = timerDone
    ? "timer done"
    : timerRunning
      ? "timer running"
      : "timer";

  return (
    <section className="card">
      <div className="question-header">
        <span className="question-number">
          Question {index + 1} of {total}
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
        </div>
      </div>

      <p className="question-text">{question.text}</p>

      {question.classify && (
        <ClassifyRow items={question.classify} exam={mode === "exam"} />
      )}

      {mode === "practice" && (
        <div className="hint-buttons">
          {question.hints.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`hint-btn ${i < revealedHints ? "revealed" : ""}`}
              disabled={i < revealedHints}
              onClick={revealHint}
            >
              💡 Hint {i + 1}
            </button>
          ))}
          <button
            type="button"
            className={`hint-btn ${showVocab ? "revealed" : ""}`}
            onClick={() => setShowVocab((v) => !v)}
          >
            📖 Useful vocabulary
          </button>
        </div>
      )}

      {mode === "practice" &&
        question.hints.slice(0, revealedHints).map((hint, i) => (
          <div key={i} className="hint-box">
            <strong>Hint {i + 1}</strong>
            {hint}
          </div>
        ))}

      {mode === "practice" && showVocab && (
        <div className="vocab-panel">
          <h4>Try to use these words</h4>
          <div className="vocab-tags">
            {question.vocab.map((word) => (
              <span
                key={word}
                className={`vocab-tag ${usedVocab.has(word) ? "used" : ""}`}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}

      {mode === "practice" && question.sentenceFrame && (
        <div className="sentence-frame">Starter: {question.sentenceFrame}</div>
      )}

      <div className="answer-area">
        <label htmlFor="answer">
          {mode === "exam"
            ? "Your notes (Speaking — say your answer aloud)"
            : "Draft your answer (or notes for speaking)"}
        </label>
        <textarea
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={
            mode === "exam"
              ? "Exam mode: no hints. Speak for the full time, then move on."
              : "Write or plan your answer here…"
          }
        />
      </div>

      <div className="nav-row">
        <button type="button" className="nav-btn" disabled={!hasPrev} onClick={onPrev}>
          ← Previous
        </button>
        <button
          type="button"
          className="nav-btn action-btn primary"
          disabled={!hasNext}
          onClick={onNext}
        >
          Next →
        </button>
      </div>
    </section>
  );
}

function StackLeadIn({
  data,
  onContinue,
  continueLabel,
}: {
  data: LeadInData;
  onContinue?: () => void;
  continueLabel?: string;
}) {
  const hero = data.photos.length === 1;
  return (
    <section
      className={`card flow-card lead-in-stack ${hero ? "lead-in-stack--hero" : ""}`}
    >
      <div className={`lead-in-stack__photos ${hero ? "lead-in-stack__photos--hero" : ""}`}>
        {data.photos.map((photo) => (
          <figure key={photo.id} className="lead-in-stack__shot">
            <img
              src={photo.src}
              alt={photo.label}
              style={
                photo.objectFit ? { objectFit: photo.objectFit } : undefined
              }
            />
            {photo.label ? <figcaption>{photo.label}</figcaption> : null}
          </figure>
        ))}
      </div>
      <div className="lead-in-stack__body">
        {data.stackInstruction && (
          <p className="lead-in-stack__instr">
            <span className="write-m2a__badge">1</span> {data.stackInstruction}
          </p>
        )}
        <ol className="lead-in-stack__questions">
          {data.questions.map((q, i) => (
            <li key={q.id}>
              <span className="lead-in-stack__num">{i + 1}</span>
              <span>{q.text}</span>
            </li>
          ))}
        </ol>
        {onContinue && (
          <div className="trainer-chain">
            <button type="button" className="btn-start" onClick={onContinue}>
              {continueLabel ?? "Дальше →"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export function LeadInTrainer({
  data,
  onBack,
  onContinue,
  continueLabel,
  contextLabel,
}: {
  data: LeadInData;
  onBack?: () => void;
  onContinue?: () => void;
  continueLabel?: string;
  contextLabel?: string;
}) {
  const [mode, setMode] = useState<Mode>("practice");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);

  const question = data.questions[questionIndex];

  const goPrev = useCallback(
    () => setQuestionIndex((i) => Math.max(0, i - 1)),
    [],
  );
  const goNext = useCallback(
    () =>
      setQuestionIndex((i) => Math.min(data.questions.length - 1, i + 1)),
    [data.questions.length],
  );

  const globalVocabCount = useMemo(
    () => data.globalVocab.length,
    [data.globalVocab],
  );

  if (data.layout === "stack") {
    return (
      <div className="app-shell lead-in-stack-shell">
        <div className="lead-in-stack__chrome">
          {onBack && (
            <button type="button" className="back-link" onClick={onBack}>
              ← Модуль
            </button>
          )}
          <span className="badge">{data.topic}</span>
        </div>
        <header className="lead-in-stack__header">
          <h1>{data.title}</h1>
        </header>
        <StackLeadIn
          data={data}
          onContinue={onContinue}
          continueLabel={continueLabel}
        />
      </div>
    );
  }

  return (
    <div className="app-shell">
      {onBack && (
        <button type="button" className="back-link" onClick={onBack}>
          ← Назад к модулю
        </button>
      )}

      {contextLabel && (
        <p className="trainer-context">{contextLabel}</p>
      )}

      <div className="top-bar">
        <span className="badge">{data.topic}</span>
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
        <h1>
          {data.title}: {data.subtitle}
        </h1>
        <p>
          Interactive lead-in with photos, hints, timers, and vocabulary support.
        </p>
      </header>

      {mode === "exam" && (
        <div className="exam-banner">
          Exam mode: no hints. Use the timer, speak aloud, then move on.
        </div>
      )}

      <PhotoGrid
        photos={data.photos}
        selectedId={selectedPhotoId}
        onSelect={(photo) =>
          setSelectedPhotoId((id) => (id === photo.id ? null : photo.id))
        }
      />

      <QuestionCard
        key={question.id}
        question={question}
        index={questionIndex}
        total={data.questions.length}
        mode={mode}
        onPrev={goPrev}
        onNext={goNext}
        hasPrev={questionIndex > 0}
        hasNext={questionIndex < data.questions.length - 1}
      />

      <div className="progress-dots">
        {data.questions.map((q, i) => (
          <button
            key={q.id}
            type="button"
            className={`progress-dot ${i === questionIndex ? "active" : ""} ${i < questionIndex ? "done" : ""}`}
            aria-label={`Go to question ${i + 1}`}
            onClick={() => setQuestionIndex(i)}
          />
        ))}
      </div>

      <section className="card" style={{ marginTop: 20 }}>
        <h2 className="card-title">
          <span className="dot" />
          Module vocabulary ({globalVocabCount} words)
        </h2>
        <div className="vocab-tags">
          {data.globalVocab.map((word) => (
            <span key={word} className="vocab-tag">
              {word}
            </span>
          ))}
        </div>
      </section>

      {onContinue && questionIndex === data.questions.length - 1 && (
        <div className="trainer-chain">
          <button type="button" className="btn-start" onClick={onContinue}>
            {continueLabel ?? "Дальше →"}
          </button>
        </div>
      )}
    </div>
  );
}

export const trainers: Record<string, LeadInData> = {
  "lead-in-intelligence": leadInIntelligence,
  "lead-in-development": leadInDevelopment,
  "lead-in-insect-empire": leadInInsectEmpire,
  "lead-in-libraries-m1": leadInLibrariesM1,
  "lead-in-teenagers": leadInTeenagers,
  "lead-in-consumer": leadInConsumer,
  "lead-in-homes": leadInHomes,
  "lead-in-crime": leadInCrime,
  "lead-in-urban": leadInUrban,
  "lead-in-community": leadInCommunity,
  "lead-in-success": leadInSuccess,
  "lead-in-cutting": leadInCutting,
};
