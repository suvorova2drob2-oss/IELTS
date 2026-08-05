import { useMemo, useState } from "react";
import {
  practiceReadingCatalog,
  type PracticeReadingCatalogItem,
} from "../data/practiceReadingCatalog";
import { practiceReadingLeadIn1 } from "../data/practiceReadingLeadIn1";
import { practiceReadingLeadIn2 } from "../data/practiceReadingLeadIn2";
import { practiceReadingLeadIn3 } from "../data/practiceReadingLeadIn3";
import type {
  PracticeReadingTask,
  PracticeReadingTest,
} from "../data/practiceReadingTest1";
import {
  inferSkillKind,
  savePracticeAttempt,
} from "../data/practiceStats";
import { PracticeReadingAdvice } from "./PracticeReadingAdvice";
import { PracticeReadingExam } from "./PracticeReadingExam";
import { PracticeReadingLeadIn } from "./PracticeReadingLeadIn";
import { PracticeReadingLearnPack } from "./PracticeReadingLearnPack";
import {
  PracticeReadingResults,
  type TaskScore,
} from "./PracticeReadingResults";
import { PracticeReadingSuggestedFill } from "./PracticeReadingSuggestedFill";
import { PracticeReadingVocabFollowup } from "./PracticeReadingVocabFollowup";

type Track = "learn" | "exam";
type LearnPhase = "lead-in" | "tasks";
type TaskPhase = "advice" | "exam";
type Screen = "catalog" | "modes" | "session" | "results";

const EXAM_TASK_TYPES = new Set([
  "matching-headings",
  "tfng",
  "sentence-endings",
  "sentence-completion",
  "matching-information",
  "summary-completion",
]);

function leadInFor(testId: string) {
  if (testId === "practice-reading-2") return practiceReadingLeadIn2;
  if (testId === "practice-reading-3") return practiceReadingLeadIn3;
  return practiceReadingLeadIn1;
}

function taskQuestionTotal(t: PracticeReadingTask): number {
  if (
    t.type === "matching-headings" ||
    t.type === "tfng" ||
    t.type === "sentence-endings" ||
    t.type === "sentence-completion" ||
    t.type === "matching-information"
  ) {
    return t.questions.length;
  }
  if (t.type === "summary-completion") return t.blanks.length;
  return 0;
}

function taskScoreLabel(t: PracticeReadingTask): string {
  if (t.type === "matching-headings") return "Matching headings (1–6)";
  if (t.type === "tfng") return "True/False/Not given (7–12)";
  if (t.type === "sentence-endings") return "Matching sentence endings (1–6)";
  if (t.type === "sentence-completion") return "Sentence completion (7–12)";
  if (t.type === "matching-information") return "Matching information (1–6)";
  if (t.type === "summary-completion") return "Summary completion (7–12)";
  return t.title;
}

function taskHasAdvice(
  t: PracticeReadingTask,
): t is PracticeReadingTask & {
  advice: {
    title: string;
    instruction: string;
    wordBox: string[];
    gaps: import("../data/practiceReadingTest1").AdviceGap[];
  };
} {
  return (
    (t.type === "matching-headings" ||
      t.type === "tfng" ||
      t.type === "sentence-endings" ||
      t.type === "sentence-completion") &&
    "advice" in t &&
    Boolean(t.advice)
  );
}

function taskHasTraining(
  t: PracticeReadingTask,
): t is Extract<PracticeReadingTask, { type: "matching-information" }> & {
  training: NonNullable<
    Extract<PracticeReadingTask, { type: "matching-information" }>["training"]
  >;
} {
  return t.type === "matching-information" && Boolean(t.training);
}

function taskNeedsPrep(t: PracticeReadingTask): boolean {
  return taskHasAdvice(t) || taskHasTraining(t);
}

function learnTaskMeta(t: PracticeReadingTask): string {
  if (t.type === "matching-headings")
    return "Questions 1–6 · Matching headings";
  if (t.type === "tfng") return "Questions 7–12 · True/False/Not given";
  if (t.type === "sentence-endings")
    return "Questions 1–6 · Matching sentence endings";
  if (t.type === "sentence-completion")
    return "Questions 7–12 · Sentence completion";
  if (t.type === "matching-information")
    return "Questions 1–6 · Matching information";
  if (t.type === "summary-completion")
    return "Questions 7–12 · Summary completion";
  if (t.type === "learn-pack") return "Language · Follow-up";
  return "Vocabulary + Follow-up";
}

function nextTaskLabel(t: PracticeReadingTask): string {
  if (t.type === "tfng") return "Next: True/False/Not given →";
  if (t.type === "sentence-completion" || t.type === "summary-completion")
    return "Next: Completion →";
  if (t.type === "vocab-followup") return "Next: Vocabulary →";
  if (t.type === "learn-pack") return "Next: Language →";
  return "Next task →";
}

export function PracticeReadingHub({ onBack }: { onBack: () => void }) {
  const [screen, setScreen] = useState<Screen>("catalog");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [track, setTrack] = useState<Track | null>(null);
  const [learnPhase, setLearnPhase] = useState<LearnPhase>("lead-in");
  const [taskIndex, setTaskIndex] = useState<number | null>(null);
  const [taskPhase, setTaskPhase] = useState<TaskPhase>("exam");
  const [examScores, setExamScores] = useState<Record<string, TaskScore>>({});

  const selected: PracticeReadingCatalogItem | null = useMemo(
    () =>
      selectedId
        ? (practiceReadingCatalog.find((t) => t.id === selectedId) ?? null)
        : null,
    [selectedId],
  );

  const test: PracticeReadingTest | null = selected?.test ?? null;

  const examTasks = test
    ? test.tasks.filter((t) => EXAM_TASK_TYPES.has(t.type))
    : [];
  const learnTasks = test
    ? test.tasks.filter((t) => t.type !== "coming")
    : [];

  const task =
    test && taskIndex != null
      ? (test.tasks.find((t) => t.index === taskIndex) ?? null)
      : null;

  const sequenceTasks =
    track === "exam"
      ? examTasks
      : learnTasks.filter(
          (t) =>
            EXAM_TASK_TYPES.has(t.type) ||
            t.type === "vocab-followup" ||
            t.type === "learn-pack",
        );

  const sequencePos =
    task && track
      ? sequenceTasks.findIndex((t) => t.index === task.index)
      : -1;
  const nextSequenceTask =
    sequencePos >= 0 && sequencePos < sequenceTasks.length - 1
      ? sequenceTasks[sequencePos + 1]
      : null;

  const examPos =
    task && track === "exam"
      ? examTasks.findIndex((t) => t.index === task.index)
      : -1;

  const nextCatalogItem = selected
    ? practiceReadingCatalog.find((t) => t.number === selected.number + 1)
    : undefined;

  const openTest = (item: PracticeReadingCatalogItem) => {
    if (!item.ready || !item.test) return;
    setSelectedId(item.id);
    setTrack(null);
    setLearnPhase("lead-in");
    setTaskIndex(null);
    setTaskPhase("exam");
    setExamScores({});
    setScreen("modes");
  };

  const resetToCatalog = () => {
    setScreen("catalog");
    setSelectedId(null);
    setTrack(null);
    setLearnPhase("lead-in");
    setTaskIndex(null);
    setExamScores({});
  };

  if (screen === "results" && selected) {
    const ordered = examTasks.map((t) => {
      const saved = examScores[t.id];
      return (
        saved ?? {
          label: taskScoreLabel(t),
          score: 0,
          total: taskQuestionTotal(t),
        }
      );
    });

    return (
      <PracticeReadingResults
        testTitle={selected.title}
        tasks={ordered}
        onBackToTests={resetToCatalog}
        onNextTest={
          nextCatalogItem
            ? () => {
                if (nextCatalogItem.ready) openTest(nextCatalogItem);
                else resetToCatalog();
              }
            : undefined
        }
        nextTestLabel={
          nextCatalogItem ? `${nextCatalogItem.title} →` : undefined
        }
        nextTestReady={Boolean(nextCatalogItem?.ready)}
      />
    );
  }

  if (
    screen === "session" &&
    test &&
    selected &&
    track === "learn" &&
    learnPhase === "lead-in" &&
    taskIndex == null
  ) {
    return (
      <PracticeReadingLeadIn
        data={leadInFor(selected.id)}
        testLabel={`${selected.title} · Learn`}
        onBack={() => {
          setTrack(null);
          setScreen("modes");
        }}
        onContinue={() => setLearnPhase("tasks")}
      />
    );
  }

  if (
    screen === "session" &&
    test &&
    task &&
    track === "learn" &&
    taskPhase === "advice" &&
    taskHasTraining(task)
  ) {
    return (
      <PracticeReadingSuggestedFill
        title={task.training.title}
        instruction={task.training.instruction}
        items={task.training.items}
        onBack={() => setTaskIndex(null)}
        onContinue={() => setTaskPhase("exam")}
      />
    );
  }

  if (
    screen === "session" &&
    test &&
    task &&
    track === "learn" &&
    taskPhase === "advice" &&
    taskHasAdvice(task)
  ) {
    return (
      <PracticeReadingAdvice
        title={task.advice.title}
        instruction={task.advice.instruction}
        wordBox={task.advice.wordBox}
        gaps={task.advice.gaps}
        onBack={() => setTaskIndex(null)}
        onContinue={() => setTaskPhase("exam")}
      />
    );
  }

  if (
    screen === "session" &&
    test &&
    task &&
    task.type === "vocab-followup" &&
    track === "learn"
  ) {
    return (
      <PracticeReadingVocabFollowup
        test={test}
        task={task}
        onBack={() => setTaskIndex(null)}
      />
    );
  }

  if (
    screen === "session" &&
    test &&
    task &&
    task.type === "learn-pack" &&
    track === "learn"
  ) {
    return (
      <PracticeReadingLearnPack
        test={test}
        task={task}
        onBack={() => setTaskIndex(null)}
      />
    );
  }

  if (
    screen === "session" &&
    test &&
    task &&
    track &&
    EXAM_TASK_TYPES.has(task.type)
  ) {
    return (
      <PracticeReadingExam
        test={test}
        task={task}
        taskLabel={
          track === "exam"
            ? `Task ${examPos + 1} of ${examTasks.length}`
            : `Task ${sequencePos + 1} of ${sequenceTasks.length}`
        }
        onBack={() => {
          if (track === "exam") {
            setTaskIndex(null);
            setTrack(null);
            setScreen("modes");
            return;
          }
          setTaskIndex(null);
        }}
        onNext={
          nextSequenceTask
            ? () => {
                setTaskIndex(nextSequenceTask.index);
                if (track === "learn" && taskNeedsPrep(nextSequenceTask)) {
                  setTaskPhase("advice");
                } else {
                  setTaskPhase("exam");
                }
              }
            : undefined
        }
        nextLabel={
          nextSequenceTask ? nextTaskLabel(nextSequenceTask) : undefined
        }
        onFinish={(result) => {
          const entry: TaskScore | null = EXAM_TASK_TYPES.has(task.type)
            ? {
                label: taskScoreLabel(task),
                score: result.score,
                total: result.total,
              }
            : null;

          const merged = entry
            ? { ...examScores, [task.id]: entry }
            : examScores;
          if (entry) setExamScores(merged);

          if (!nextSequenceTask) {
            if (track === "exam" && selected) {
              const tasks = examTasks.map((t) => {
                const s = merged[t.id];
                const score = s?.score ?? 0;
                const total = s?.total ?? taskQuestionTotal(t);
                const label = s?.label ?? taskScoreLabel(t);
                return {
                  key: t.id,
                  label,
                  kind: inferSkillKind(label),
                  score,
                  total,
                };
              });
              const scoreSum = tasks.reduce((n, t) => n + t.score, 0);
              const totalSum = tasks.reduce((n, t) => n + t.total, 0);
              savePracticeAttempt({
                testId: selected.id,
                testTitle: selected.title,
                tasks,
                score: scoreSum,
                total: totalSum,
              });
              setTaskIndex(null);
              setScreen("results");
            } else {
              setTaskIndex(null);
            }
          }
        }}
      />
    );
  }

  if (screen === "modes" && selected && test) {
    return (
      <div className="pr-hub pr-hub--modes">
        <header className="pr-hub__chrome">
          <button
            type="button"
            className="back-link"
            onClick={resetToCatalog}
          >
            ← All tests
          </button>
          <div>
            <h1>{selected.title}</h1>
            <p>{selected.subtitle}</p>
          </div>
        </header>

        <section className="pr-hub__modes">
          <button
            type="button"
            className="pr-hub__mode"
            onClick={() => {
              setTrack("learn");
              setLearnPhase("lead-in");
              setTaskIndex(null);
              setScreen("session");
            }}
          >
            <strong>Learn</strong>
            <span>Lead-in → training → tasks → vocab</span>
          </button>
          <button
            type="button"
            className="pr-hub__mode"
            onClick={() => {
              setTrack("exam");
              setTaskPhase("exam");
              setExamScores({});
              const first = examTasks[0];
              if (first) setTaskIndex(first.index);
              setScreen("session");
            }}
          >
            <strong>Exam</strong>
            <span>2 tasks подряд → общий результат</span>
          </button>
        </section>
      </div>
    );
  }

  if (screen === "session" && track === "learn" && test) {
    return (
      <div className="pr-hub pr-hub--fill">
        <header className="pr-hub__chrome">
          <button
            type="button"
            className="back-link"
            onClick={() => {
              if (learnPhase === "tasks") {
                setLearnPhase("lead-in");
                return;
              }
              setTrack(null);
              setScreen("modes");
            }}
          >
            ← {learnPhase === "tasks" ? "Lead-in" : "Modes"}
          </button>
          <div>
            <h1>{selected?.title}</h1>
            <p>Learn mode · choose a task</p>
          </div>
        </header>

        <section className="pr-hub__tasks">
          <h2>Learn mode · choose a task</h2>
          <div className="pr-hub__task-grid">
            {learnTasks.map((t) => (
              <button
                key={t.id}
                type="button"
                className="pr-hub__task"
                onClick={() => {
                  setTaskIndex(t.index);
                  if (taskNeedsPrep(t)) setTaskPhase("advice");
                  else setTaskPhase("exam");
                }}
              >
                <span className="pr-hub__task-num">Task {t.index}</span>
                <strong>{t.title}</strong>
                <span className="pr-hub__task-meta">{learnTaskMeta(t)}</span>
                <span className="pr-hub__task-go">Open</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pr-hub pr-hub--fill">
      <header className="pr-hub__chrome">
        <button type="button" className="back-link" onClick={onBack}>
          ← Home
        </button>
        <div>
          <h1>Practice Reading</h1>
          <p>3 tests · open any</p>
        </div>
      </header>

      <section className="pr-hub__tasks">
        <h2>Choose a test</h2>
        <div className="pr-hub__task-grid">
          {practiceReadingCatalog.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`pr-hub__task ${item.ready ? "" : "pr-hub__task--soon"}`}
              disabled={!item.ready}
              onClick={() => openTest(item)}
            >
              <span className="pr-hub__task-num">Test {item.number}</span>
              <strong>{item.title}</strong>
              <span className="pr-hub__task-meta">{item.subtitle}</span>
              <span className="pr-hub__task-go">
                {item.ready ? "Open" : "Soon"}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
