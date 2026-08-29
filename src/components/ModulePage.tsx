import { useMemo, useState } from "react";
import type { CourseModule, SkillBlock } from "../types/module";
import { getBlockTrainers, getSkillIcon } from "../types/module";
import { SkillEditor } from "./SkillEditor";

const COMPLETED_KEY = "ielts-completed-blocks-v1";

function loadCompleted(): Set<string> {
  try {
    const raw = localStorage.getItem(COMPLETED_KEY);
    if (raw) return new Set(JSON.parse(raw) as string[]);
  } catch {
    /* ignore */
  }
  return new Set();
}

function saveCompleted(set: Set<string>) {
  localStorage.setItem(COMPLETED_KEY, JSON.stringify([...set]));
}

function SkillCard({
  block,
  selected,
  completed,
  editMode,
  onSelect,
  onEdit,
}: {
  block: SkillBlock;
  selected: boolean;
  completed: boolean;
  editMode: boolean;
  onSelect: () => void;
  onEdit: () => void;
}) {
  const hasTrainer = getBlockTrainers(block).length > 0;
  const trainerCount = getBlockTrainers(block).length;

  return (
    <button
      type="button"
      className={`skill-card ${selected ? "skill-card--active" : ""} ${hasTrainer ? "skill-card--interactive" : ""} ${completed ? "skill-card--done" : ""}`}
      onClick={onSelect}
    >
      {editMode && (
        <span
          role="button"
          tabIndex={0}
          className="skill-card__edit"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          onKeyDown={(e) => e.key === "Enter" && onEdit()}
        >
          ✎
        </span>
      )}

      <div className="skill-card__top">
        <span className="skill-card__icon">{getSkillIcon(block.skill)}</span>
        {hasTrainer && (
          <span className="skill-card__live">
            {trainerCount > 1 ? `${trainerCount} тренажёра` : "тренажёр"}
          </span>
        )}
        {completed && <span className="skill-card__check">✓</span>}
      </div>

      <h3 className="skill-card__title">{block.skill}</h3>

      <div className="skill-card__pills">
        {block.topics.slice(0, 2).map((t) => (
          <span key={t} className="skill-pill">
            {t}
          </span>
        ))}
        {block.topics.length > 2 && (
          <span className="skill-pill skill-pill--more">
            +{block.topics.length - 2}
          </span>
        )}
      </div>

      <span className="skill-card__pages">{block.pages}</span>
    </button>
  );
}

function ActivityPanel({
  block,
  sectionLabel,
  sectionSubtitle,
  onStartTrainer,
  onClose,
  onMarkDone,
  completed,
}: {
  block: SkillBlock;
  sectionLabel: string;
  sectionSubtitle: string;
  onStartTrainer?: (trainerId: string, initialStep?: number) => void;
  onClose: () => void;
  onMarkDone: () => void;
  completed: boolean;
}) {
  const trainers = getBlockTrainers(block);
  const trainerId = trainers[0]?.id;
  const examTrainerId =
    trainers.find(
      (t) => t.id === "reading-m2b-flow" || t.id === "reading-m2-flow",
    )?.id ?? trainerId;
  const leadInTrainerId = trainers.find(
    (t) => t.id === "lead-in-insect-empire",
  )?.id;
  const isReadingM2bBlock =
    block.id === "2b-reading" || examTrainerId === "reading-m2b-flow";
  const isReadingM2Full = examTrainerId === "reading-m2-flow";
  const isReadingM2ExamOnly = isReadingM2bBlock;
  const isReadingFlow =
    trainerId === "reading-m1-flow" ||
    trainerId === "reading-m1b-flow" ||
    examTrainerId === "reading-m2-flow" ||
    examTrainerId === "reading-m2b-flow";
  const isWritingFlow = trainerId === "writing-m1b-flow";
  const isVocabularyFlow = trainerId === "vocabulary-m1-flow";
  const isVocabularyM2 = trainerId === "vocabulary-m2-flow";
  const isVocabularyM3 = trainerId === "vocabulary-m3-flow";
  const isLanguageFlow = trainerId === "language-m1b-flow";
  const isLanguageM1a = trainerId === "language-m1a-flow";
  const isLanguageM2a = trainerId === "language-m2a-flow";
  const isLanguageM3a = trainerId === "language-m3a-flow";
  const isLanguageM3b = trainerId === "language-m3b-flow";
  const isWritingM1a = trainerId === "writing-m1a-flow";
  const isWritingM2a = trainerId === "writing-m2a-flow";
  const isWritingM2b = trainerId === "writing-m2b-flow";
  const isWritingM3a = trainerId === "writing-m3a-flow";
  const isListeningM1 = trainerId === "listening-m1-flow";
  const isListeningM1b = trainerId === "listening-m1b-flow";
  const isListeningM2a = trainerId === "listening-m2a-flow";
  const isListeningM2b = trainerId === "listening-m2b-flow";
  const isListeningM3a = trainerId === "listening-m3a-flow";
  const isListeningM3b = trainerId === "listening-m3b-flow";
  const isSpeakingM1b = trainerId === "speaking-m1b-flow";
  const isSpeakingM2a = trainerId === "speaking-m2a-flow";
  const isSpeakingM2b = trainerId === "speaking-m2b-flow";
  const isSpeakingM3a = trainerId === "speaking-m3a-flow";
  const isSpeakingM3b = trainerId === "speaking-m3b-flow";
  const isSpeakingM4a = trainerId === "speaking-m4a-flow";
  const isSpeakingM4b = trainerId === "speaking-m4b-flow";
  const isSpeakingM5a = trainerId === "speaking-m5a-flow";
  const isSpeakingM5b = trainerId === "speaking-m5b-flow";
  const isSpeakingM6a = trainerId === "speaking-m6a-flow";
  const isSpeakingM6b = trainerId === "speaking-m6b-flow";
  const isSpeakingM7a = trainerId === "speaking-m7a-flow";
  const isSpeakingM7b = trainerId === "speaking-m7b-flow";
  const isSpeakingM8a = trainerId === "speaking-m8a-flow";
  const isSpeakingM8b = trainerId === "speaking-m8b-flow";
  const isSpeakingM9a = trainerId === "speaking-m9a-flow";
  const isSpeakingM9b = trainerId === "speaking-m9b-flow";
  const isSpeakingM10a = trainerId === "speaking-m10a-flow";
  const isSpeakingM10b = trainerId === "speaking-m10b-flow";
  const isReadingM3Flow = trainerId === "reading-m3-flow";
  const isReadingM3bFlow = trainerId === "reading-m3b-flow";
  const isReadingM4aFlow = trainerId === "reading-m4a-flow";
  const isReadingM4bFlow = trainerId === "reading-m4b-flow";
  const isReadingM5aFlow = trainerId === "reading-m5a-flow";
  const isReadingM5bFlow = trainerId === "reading-m5b-flow";
  const isReadingM6aFlow = trainerId === "reading-m6a-flow";
  const isReadingM6bFlow = trainerId === "reading-m6b-flow";
  const isReadingM7aFlow = trainerId === "reading-m7a-flow";
  const isReadingM7bFlow = trainerId === "reading-m7b-flow";
  const isReadingM8aFlow = trainerId === "reading-m8a-flow";
  const isReadingM8bFlow = trainerId === "reading-m8b-flow";
  const isReadingM9aFlow = trainerId === "reading-m9a-flow";
  const isReadingM9bFlow = trainerId === "reading-m9b-flow";
  const isReadingM10aFlow = trainerId === "reading-m10a-flow";
  const isReadingM10bFlow = trainerId === "reading-m10b-flow";
  const isWritingM3b = trainerId === "writing-m3b-flow";
  const isWritingM4a = trainerId === "writing-m4a-flow";
  const isWritingM4b = trainerId === "writing-m4b-flow";
  const isWritingM5a = trainerId === "writing-m5a-flow";
  const isWritingM5b = trainerId === "writing-m5b-flow";
  const isWritingM6a = trainerId === "writing-m6a-flow";
  const isWritingM6b = trainerId === "writing-m6b-flow";
  const isWritingM7a = trainerId === "writing-m7a-flow";
  const isWritingM7b = trainerId === "writing-m7b-flow";
  const isWritingM8a = trainerId === "writing-m8a-flow";
  const isWritingM8b = trainerId === "writing-m8b-flow";
  const isWritingM9a = trainerId === "writing-m9a-flow";
  const isWritingM9b = trainerId === "writing-m9b-flow";
  const isWritingM10a = trainerId === "writing-m10a-flow";
  const isWritingM10b = trainerId === "writing-m10b-flow";
  const isVocabularyM4 = trainerId === "vocabulary-m4-flow";
  const isVocabularyM5 = trainerId === "vocabulary-m5-flow";
  const isVocabularyM6 = trainerId === "vocabulary-m6-flow";
  const isVocabularyM7 = trainerId === "vocabulary-m7-flow";
  const isVocabularyM8 = trainerId === "vocabulary-m8-flow";
  const isVocabularyM9 = trainerId === "vocabulary-m9-flow";
  const isVocabularyM10 = trainerId === "vocabulary-m10-flow";
  const isListeningM4a = trainerId === "listening-m4a-flow";
  const isListeningM4b = trainerId === "listening-m4b-flow";
  const isListeningM5a = trainerId === "listening-m5a-flow";
  const isListeningM5b = trainerId === "listening-m5b-flow";
  const isListeningM6a = trainerId === "listening-m6a-flow";
  const isListeningM6b = trainerId === "listening-m6b-flow";
  const isListeningM7a = trainerId === "listening-m7a-flow";
  const isListeningM7b = trainerId === "listening-m7b-flow";
  const isListeningM8a = trainerId === "listening-m8a-flow";
  const isListeningM8b = trainerId === "listening-m8b-flow";
  const isListeningM9a = trainerId === "listening-m9a-flow";
  const isListeningM9b = trainerId === "listening-m9b-flow";
  const isListeningM10a = trainerId === "listening-m10a-flow";
  const isListeningM10b = trainerId === "listening-m10b-flow";
  const isLanguageM4a = trainerId === "language-m4a-flow";
  const isLanguageM4b = trainerId === "language-m4b-flow";
  const isLanguageM5a = trainerId === "language-m5a-flow";
  const isLanguageM5b = trainerId === "language-m5b-flow";
  const isLanguageM6a = trainerId === "language-m6a-flow";
  const isLanguageM6b = trainerId === "language-m6b-flow";
  const isLanguageM7a = trainerId === "language-m7a-flow";
  const isLanguageM7b = trainerId === "language-m7b-flow";
  const isLanguageM8a = trainerId === "language-m8a-flow";
  const isLanguageM8b = trainerId === "language-m8b-flow";
  const isLanguageM9a = trainerId === "language-m9a-flow";
  const isLanguageM9b = trainerId === "language-m9b-flow";
  const isLanguageM10a = trainerId === "language-m10a-flow";
  const isLanguageM10b = trainerId === "language-m10b-flow";
  const isReviewM5 = trainerId === "review-m5-flow";
  const isReviewM6 = trainerId === "review-m6-flow";
  const isReviewM7 = trainerId === "review-m7-flow";
  const isReviewM8 = trainerId === "review-m8-flow";
  const isReviewM9 = trainerId === "review-m9-flow";
  const isReviewM10 = trainerId === "review-m10-flow";
  const isExamLearn =
    (isReadingFlow || isWritingFlow) && !isReadingM2ExamOnly;

  const startAt = (step?: number, overrideTrainerId?: string) => {
    const id = overrideTrainerId ?? examTrainerId ?? trainerId;
    if (id && onStartTrainer) onStartTrainer(id, step);
  };

  const writingLearnSteps = [
    { label: "Understand the graph", step: 0 },
    { label: "Main features", step: 1 },
    { label: "Overview + language", step: 2 },
    { label: "Write 150 words", step: 3 },
  ] as const;

  const readingLearnSteps = isReadingM2Full
    ? ([
        { label: "Before you read", step: 0 },
        { label: "Topic sentences", step: 1 },
        { label: "Exam task 1–10", step: 2 },
        { label: "Discussion", step: 3 },
      ] as const)
    : isReadingM2ExamOnly
      ? ([
          { label: "Before you read", step: 0, trainerId: leadInTrainerId },
          { label: "Exam task 1–9", step: 0, trainerId: examTrainerId },
        ] as const)
      : ([
          { label: "Warm-up: predict", step: 0 },
          { label: "Scan focus", step: 1 },
          { label: "Exam task 1–9", step: 2 },
          { label: "Discussion", step: 3 },
        ] as const);

  const learnSteps = isWritingFlow ? writingLearnSteps : readingLearnSteps;

  return (
    <aside
      className={`activity-panel ${isExamLearn ? "activity-panel--compact" : ""}`}
    >
      <button type="button" className="activity-panel__close" onClick={onClose}>
        ✕
      </button>

      <div className="activity-panel__scroll">
        <div className="activity-panel__badge">
          {sectionLabel} · {sectionSubtitle}
        </div>

        <div className="activity-panel__hero">
          <span className="activity-panel__icon">{getSkillIcon(block.skill)}</span>
          <div>
            <h2>{block.skill}</h2>
            <p className="activity-panel__book">Учебник: {block.pages}</p>
          </div>
        </div>

        {isReadingFlow ? (
          <p className="activity-panel__intro">
            {isReadingM2ExamOnly
              ? "The Insect Empire · Текст и вопросы 1–9 рядом (Testing skills)."
              : isReadingM2Full
                ? "Текст и вопросы 1–10 рядом. Learn — discuss, topic sentences, задание, discussion."
                : "Текст и вопросы 1–9 рядом. Learn — с разминкой и discussion."}
          </p>
        ) : isListeningM1 ? (
          <p className="activity-panel__intro">
            Learn: Before you listen → 3a–3d (paraphrase strategy).
          </p>
        ) : isListeningM1b ? (
          <p className="activity-panel__intro">
            Before you listen → paraphrase → 01_05 → Test 01_06 → Discussion.
          </p>
        ) : isListeningM2a ? (
          <p className="activity-panel__intro">
            Before you listen → map → walks → directions (italics).
          </p>
        ) : isWritingFlow ? (
          <p className="activity-panel__intro">
            График и письмо рядом. Learn — оси, features, overview, потом 150 слов.
          </p>
        ) : (
          block.trainerLabel && (
            <p className="activity-panel__intro">{block.trainerLabel}</p>
          )
        )}

        {isReadingM2ExamOnly && onStartTrainer && examTrainerId && (
          <div className="activity-panel__mode-entry">
            {leadInTrainerId && (
              <button
                type="button"
                className="btn-start btn-start--secondary"
                onClick={() => onStartTrainer(leadInTrainerId)}
              >
                Before you read (p. 34) →
              </button>
            )}
            <button
              type="button"
              className="btn-start"
              onClick={() => onStartTrainer(examTrainerId)}
            >
              Экзамен · The Insect Empire 1–9 →
            </button>
          </div>
        )}

        {isExamLearn && onStartTrainer && trainerId && (
          <div className="activity-panel__mode-entry">
            <button
              type="button"
              className="btn-start"
              onClick={() => onStartTrainer(trainerId)}
            >
              {isWritingFlow
                ? "Экзамен (график + письмо) →"
                : isReadingM2Full
                  ? "Экзамен (текст + 1–10) →"
                  : "Экзамен (текст + 1–9) →"}
            </button>
            <button
              type="button"
              className="btn-start btn-start--secondary"
              onClick={() => onStartTrainer(trainerId, 0)}
            >
              Учебный трек (Learn) →
            </button>
          </div>
        )}

        <div className="activity-panel__topics">
          <h4>
            {isExamLearn ? "Этапы Learn" : "Что делаем — нажмите этап"}
          </h4>
          <ul className="topic-entry-list">
            {isExamLearn
              ? learnSteps.map((item, i) => (
                  <li key={item.label} className="topic-entry">
                    <button
                      type="button"
                      className="topic-entry__main"
                      disabled={!onStartTrainer || !trainerId}
                      onClick={() => startAt(item.step)}
                    >
                      <span className="topic-num">{i + 1}</span>
                      <span>{item.label}</span>
                      <span className="topic-entry__arrow">→</span>
                    </button>
                  </li>
                ))
              : block.topics.map((topic, i) => (
                  <li key={topic} className="topic-entry">
                    <button
                      type="button"
                      className="topic-entry__main"
                      disabled={
                        !onStartTrainer ||
                        !(isReadingM2ExamOnly
                          ? i === 0
                            ? leadInTrainerId
                            : examTrainerId
                          : trainerId)
                      }
                      onClick={() => {
                        if (isVocabularyFlow) {
                          if (i === 0) startAt(0);
                          else if (i === 1) startAt(4);
                          else if (i === 2) startAt(7);
                          return;
                        }
                        if (isVocabularyM2) {
                          if (i === 0) startAt(0);
                          else if (i === 1) startAt(2);
                          else startAt(4);
                          return;
                        }
                        if (isVocabularyM3) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isLanguageFlow) {
                          startAt(Math.min(i, 3));
                          return;
                        }
                        if (isLanguageM1a) {
                          startAt(Math.min(i, 7));
                          return;
                        }
                        if (isLanguageM2a) {
                          startAt(Math.min(i, 3));
                          return;
                        }
                        if (isLanguageM3a) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isLanguageM3b) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isWritingM1a) {
                          startAt(Math.min(i, 6));
                          return;
                        }
                        if (isWritingM2a) {
                          startAt(Math.min(i, 8));
                          return;
                        }
                        if (isWritingM2b) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isWritingM3a) {
                          startAt(Math.min(i, 7));
                          return;
                        }
                        if (isListeningM1) {
                          startAt(Math.min(i, 8));
                          return;
                        }
                        if (isListeningM1b) {
                          startAt(Math.min(i, 6));
                          return;
                        }
                        if (isListeningM2a) {
                          startAt(Math.min(i, 6));
                          return;
                        }
                        if (isListeningM2b) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isListeningM3a) {
                          startAt(Math.min(i, 6));
                          return;
                        }
                        if (isListeningM3b) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isSpeakingM1b) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isSpeakingM2a) {
                          startAt(Math.min(i, 3));
                          return;
                        }
                        if (isSpeakingM2b) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isSpeakingM3a) {
                          startAt(Math.min(i, 6));
                          return;
                        }
                        if (isSpeakingM3b) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isSpeakingM4a) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isSpeakingM4b) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isReadingM3Flow) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isReadingM3bFlow) {
                          startAt(Math.min(i, 3));
                          return;
                        }
                        if (isReadingM4aFlow) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isReadingM4bFlow) {
                          startAt(Math.min(i, 3));
                          return;
                        }
                        if (isWritingM3b) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isWritingM4a) {
                          startAt(Math.min(i, 3));
                          return;
                        }
                        if (isWritingM4b) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isVocabularyM4) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isListeningM4a) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isListeningM4b) {
                          startAt(Math.min(i, 3));
                          return;
                        }
                        if (isLanguageM4a) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isLanguageM4b) {
                          startAt(Math.min(i, 3));
                          return;
                        }
                        if (isSpeakingM5a) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isSpeakingM5b) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isReadingM5aFlow) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isReadingM5bFlow) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isWritingM5a) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isWritingM5b) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isVocabularyM5) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isListeningM5a) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isListeningM5b) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isLanguageM5a) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isLanguageM5b) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isReviewM5) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isReadingM6aFlow) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isReadingM6bFlow) {
                          startAt(Math.min(i, 3));
                          return;
                        }
                        if (isWritingM6a) {
                          startAt(Math.min(i, 3));
                          return;
                        }
                        if (isWritingM6b) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isVocabularyM6) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isListeningM6a) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isListeningM6b) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isLanguageM6a) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isLanguageM6b) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isSpeakingM6a) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isSpeakingM6b) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isReviewM6) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isReadingM7aFlow) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isReadingM7bFlow) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isWritingM7a) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isWritingM7b) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isVocabularyM7) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isListeningM7a) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isListeningM7b) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isLanguageM7a) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isLanguageM7b) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isSpeakingM7a) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isSpeakingM7b) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isReviewM7) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isReadingM8aFlow) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isReadingM8bFlow) {
                          startAt(Math.min(i, 3));
                          return;
                        }
                        if (isWritingM8a) {
                          startAt(Math.min(i, 3));
                          return;
                        }
                        if (isWritingM8b) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isVocabularyM8) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isListeningM8a) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isListeningM8b) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isLanguageM8a) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isLanguageM8b) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isSpeakingM8a) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isSpeakingM8b) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isReviewM8) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isReadingM9aFlow) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isReadingM9bFlow) {
                          startAt(Math.min(i, 3));
                          return;
                        }
                        if (isWritingM9a) {
                          startAt(Math.min(i, 3));
                          return;
                        }
                        if (isWritingM9b) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isVocabularyM9) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isListeningM9a) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isListeningM9b) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isLanguageM9a) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isLanguageM9b) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isSpeakingM9a) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isSpeakingM9b) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isReviewM9) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isReadingM10aFlow) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isReadingM10bFlow) {
                          startAt(Math.min(i, 3));
                          return;
                        }
                        if (isWritingM10a) {
                          startAt(Math.min(i, 3));
                          return;
                        }
                        if (isWritingM10b) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isVocabularyM10) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isListeningM10a) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isListeningM10b) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isLanguageM10a) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isLanguageM10b) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isSpeakingM10a) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isSpeakingM10b) {
                          startAt(Math.min(i, 4));
                          return;
                        }
                        if (isReviewM10) {
                          startAt(Math.min(i, 5));
                          return;
                        }
                        if (isReadingM2ExamOnly && leadInTrainerId) {
                          startAt(
                            undefined,
                            i === 0 ? leadInTrainerId : examTrainerId,
                          );
                          return;
                        }
                        startAt();
                      }}
                    >
                      <span className="topic-num">{i + 1}</span>
                      <span>{topic}</span>
                      <span className="topic-entry__arrow">→</span>
                    </button>
                    {isVocabularyFlow && i === 1 && (
                      <div className="topic-entry__subs">
                        <button type="button" onClick={() => startAt(4)}>
                          2 Collocations
                        </button>
                        <button type="button" onClick={() => startAt(5)}>
                          3a Find collocations
                        </button>
                        <button type="button" onClick={() => startAt(6)}>
                          3b Trend categories
                        </button>
                      </div>
                    )}
                    {isVocabularyFlow && i === 0 && (
                      <div className="topic-entry__subs">
                        <button type="button" onClick={() => startAt(1)}>
                          1a Word types
                        </button>
                        <button type="button" onClick={() => startAt(2)}>
                          1b Match definitions
                        </button>
                        <button type="button" onClick={() => startAt(3)}>
                          1c Choose option
                        </button>
                      </div>
                    )}
                    {isVocabularyM2 && i === 0 && (
                      <div className="topic-entry__subs">
                        <button type="button" onClick={() => startAt(0)}>
                          1a Match
                        </button>
                        <button type="button" onClick={() => startAt(1)}>
                          1b Verb forms
                        </button>
                      </div>
                    )}
                    {isVocabularyM2 && i === 1 && (
                      <div className="topic-entry__subs">
                        <button type="button" onClick={() => startAt(2)}>
                          2a Spoken / written
                        </button>
                        <button type="button" onClick={() => startAt(3)}>
                          2b–2c Phrasal
                        </button>
                      </div>
                    )}
                    {isVocabularyM2 && i === 2 && (
                      <div className="topic-entry__subs">
                        <button type="button" onClick={() => startAt(4)}>
                          3a Process verbs
                        </button>
                        <button type="button" onClick={() => startAt(5)}>
                          3b Word forms
                        </button>
                      </div>
                    )}
                  </li>
                ))}
          </ul>
        </div>

        {block.note && <p className="activity-panel__note">{block.note}</p>}
      </div>

      <div className="activity-panel__actions">
        {!isExamLearn &&
          (trainers.length > 0 && onStartTrainer ? (
            trainers.length === 1 ? (
              <button
                type="button"
                className="btn-start"
                onClick={() => onStartTrainer(trainers[0].id)}
              >
                С начала (весь поток) →
              </button>
            ) : (
              trainers.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className="btn-start"
                  onClick={() => onStartTrainer(t.id)}
                >
                  {t.label} →
                </button>
              ))
            )
          ) : (
            <div className="activity-panel__soon">
              <p>Тренажёр скоро</p>
              <span>Пока работайте по учебнику: {block.pages}</span>
            </div>
          ))}

        <button
          type="button"
          className={`btn-done ${completed ? "btn-done--active" : ""}`}
          onClick={onMarkDone}
        >
          {completed ? "✓ Пройдено" : "Отметить пройденным"}
        </button>
      </div>
    </aside>
  );
}

export function ModulePage({
  module,
  editMode,
  onBack,
  onEditBlock,
  onOpenTrainer,
  onUpdateMeta,
  onUpdateSection,
}: {
  module: CourseModule;
  editMode: boolean;
  onBack: () => void;
  onEditBlock: (blockId: string, patch: Partial<SkillBlock>) => void;
  onOpenTrainer: (trainerId: string, block: SkillBlock, initialStep?: number) => void;
  onUpdateMeta: (
    patch: Partial<Pick<CourseModule, "title" | "startPage">> & {
      reviewLabel?: string;
      reviewPages?: string;
    },
  ) => void;
  onUpdateSection: (sectionId: string, subtitle: string) => void;
}) {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [editingBlock, setEditingBlock] = useState<SkillBlock | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(loadCompleted);

  const section = module.sections[activeSection];
  const selectedBlock = section?.blocks.find((b) => b.id === selectedBlockId);

  const allBlocks = module.sections.flatMap((s) => s.blocks);
  const doneCount = allBlocks.filter((b) => completed.has(b.id)).length;
  const progress = Math.round((doneCount / allBlocks.length) * 100);

  const trainerCount = useMemo(
    () => allBlocks.reduce((n, b) => n + getBlockTrainers(b).length, 0),
    [allBlocks],
  );

  const toggleDone = (blockId: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(blockId)) next.delete(blockId);
      else next.add(blockId);
      saveCompleted(next);
      return next;
    });
  };

  return (
    <div
      className={`module-layout module-layout--viewport ${selectedBlock ? "module-layout--panel" : ""}`}
    >
      <div className="module-main">
        <header className="module-toolbar">
          <button type="button" className="back-link module-toolbar__back" onClick={onBack}>
            ← Модули
          </button>
          <div className="module-toolbar__title">
            <span className="module-toolbar__num">Module {module.number}</span>
            {editMode ? (
              <div className="module-hero__edits">
                <input
                  className="inline-edit hero-edit"
                  value={module.title}
                  onChange={(e) => onUpdateMeta({ title: e.target.value })}
                />
              </div>
            ) : (
              <h1>{module.title}</h1>
            )}
            <p>
              {module.startPage} · {trainerCount} тренажёров · {progress}%
            </p>
          </div>
          <div
            className="progress-ring progress-ring--sm"
            style={{ "--p": progress } as React.CSSProperties}
          >
            <span>{progress}%</span>
          </div>
        </header>

        <div className="section-tabs">
          {module.sections.map((sec, i) => (
            <button
              key={sec.id}
              type="button"
              className={`section-tab ${i === activeSection ? "section-tab--active" : ""}`}
              onClick={() => {
                setActiveSection(i);
                setSelectedBlockId(null);
              }}
            >
              <strong>{sec.label}</strong>
              {editMode ? (
                <input
                  className="inline-edit tab-edit"
                  value={sec.subtitle}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => onUpdateSection(sec.id, e.target.value)}
                />
              ) : (
                <span>{sec.subtitle}</span>
              )}
            </button>
          ))}
        </div>

        <div className="skill-cards-grid">
          {section.blocks.map((block) => (
            <SkillCard
              key={block.id}
              block={block}
              selected={selectedBlockId === block.id}
              completed={completed.has(block.id)}
              editMode={editMode}
              onSelect={() =>
                setSelectedBlockId((id) => (id === block.id ? null : block.id))
              }
              onEdit={() => setEditingBlock(block)}
            />
          ))}
        </div>

        <button
          type="button"
          className="review-card review-card--slim"
          onClick={() =>
            module.review.trainerId
              ? onOpenTrainer(module.review.trainerId!, {
                  id: "review",
                  skill: module.review.label,
                  topics: ["Повторение модуля"],
                  pages: module.review.pages,
                })
              : undefined
          }
        >
          <div>
            {editMode ? (
              <>
                <input
                  className="inline-edit"
                  value={module.review.label}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => onUpdateMeta({ reviewLabel: e.target.value })}
                />
                <input
                  className="inline-edit page-edit"
                  value={module.review.pages}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => onUpdateMeta({ reviewPages: e.target.value })}
                />
              </>
            ) : (
              <>
                <strong>{module.review.label}</strong>
                <span>{module.review.pages}</span>
              </>
            )}
          </div>
          {!editMode && <span className="review-card__arrow">→</span>}
        </button>
      </div>

      {selectedBlock && (
        <ActivityPanel
          block={selectedBlock}
          sectionLabel={section.label}
          sectionSubtitle={section.subtitle}
          completed={completed.has(selectedBlock.id)}
          onClose={() => setSelectedBlockId(null)}
          onMarkDone={() => toggleDone(selectedBlock.id)}
          onStartTrainer={(trainerId, initialStep) =>
            onOpenTrainer(trainerId, selectedBlock, initialStep)
          }
        />
      )}

      {editingBlock && (
        <SkillEditor
          block={editingBlock}
          onSave={(patch) => onEditBlock(editingBlock.id, patch)}
          onClose={() => setEditingBlock(null)}
        />
      )}
    </div>
  );
}
