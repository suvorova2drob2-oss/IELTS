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
  const isLanguageFlow = trainerId === "language-m1b-flow";
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
                        if (isLanguageFlow) {
                          startAt(i === 0 ? 0 : 1);
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
