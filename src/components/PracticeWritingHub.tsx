import { useMemo, useState } from "react";
import {
  isWritingTest1,
  isWritingTest2,
  isWritingTest3,
  isWritingTest4,
  practiceWritingCatalog,
  type PracticeWritingCatalogItem,
} from "../data/practiceWritingCatalog";
import {
  savePracticeAttempt,
  type SkillKind,
} from "../data/practiceStats";
import {
  PracticeReadingResults,
  type TaskScore,
} from "./PracticeReadingResults";
import { PracticeWritingTest1Session } from "./PracticeWritingTest1Session";
import { PracticeWritingTest2Session } from "./PracticeWritingTest2Session";
import { PracticeWritingTest3Session } from "./PracticeWritingTest3Session";
import { PracticeWritingTest4Session } from "./PracticeWritingTest4Session";

type Screen = "catalog" | "modes" | "session" | "results";
type Track = "learn" | "exam";
type ScorePair = { score: number; total: number };

export function PracticeWritingHub({ onBack }: { onBack: () => void }) {
  const [screen, setScreen] = useState<Screen>("catalog");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [track, setTrack] = useState<Track | null>(null);
  const [taskScores, setTaskScores] = useState<TaskScore[]>([]);

  const selected: PracticeWritingCatalogItem | null = useMemo(
    () =>
      selectedId
        ? (practiceWritingCatalog.find((t) => t.id === selectedId) ?? null)
        : null,
    [selectedId],
  );

  const test = selected?.test ?? null;
  const nextCatalogItem = selected
    ? practiceWritingCatalog.find((t) => t.number === selected.number + 1)
    : null;

  const resetToCatalog = () => {
    setScreen("catalog");
    setSelectedId(null);
    setTrack(null);
    setTaskScores([]);
  };

  const openTest = (item: PracticeWritingCatalogItem) => {
    if (!item.ready || !item.test) return;
    setSelectedId(item.id);
    setTrack(null);
    setTaskScores([]);
    setScreen("modes");
  };

  const completeSession = (scores: {
    training: ScorePair;
    write: ScorePair;
  }) => {
    if (!selected || !track) return;
    const isTask2 = isWritingTest3(test!) || isWritingTest4(test!);
    const writeLabel = isTask2
      ? "Task 2 · self-check"
      : "Task 1 · self-check";
    const trainLabel = isWritingTest4(test!)
      ? "Problem–solution training"
      : isWritingTest3(test!)
        ? "Essay training"
        : isWritingTest2(test!)
          ? "Process training"
          : "Graph training";
    const tasks: TaskScore[] =
      track === "exam"
        ? [
            {
              label: writeLabel,
              score: scores.write.score,
              total: scores.write.total,
            },
          ]
        : [
            {
              label: trainLabel,
              score: scores.training.score,
              total: scores.training.total,
            },
            {
              label: writeLabel,
              score: scores.write.score,
              total: scores.write.total,
            },
          ];
    setTaskScores(tasks);
    const scoreSum = tasks.reduce((n, t) => n + t.score, 0);
    const totalSum = tasks.reduce((n, t) => n + t.total, 0);
    const writeKind: SkillKind = isTask2
      ? "task-2-essay"
      : selected.id === "practice-writing-2"
        ? "task-1-process"
        : "task-1-graph";
    savePracticeAttempt({
      testId: selected.id,
      testTitle: `${selected.title} · ${track === "exam" ? "Exam" : "Learn"}`,
      tasks: tasks.map((t) => {
        const kind: SkillKind =
          t.label.toLowerCase().includes("task 1") ||
          t.label.toLowerCase().includes("task 2")
            ? writeKind
            : "other";
        return {
          key: t.label.toLowerCase().replace(/\s+/g, "-"),
          label: t.label,
          kind,
          score: t.score,
          total: t.total,
        };
      }),
      score: scoreSum,
      total: totalSum,
    });
    setScreen("results");
  };

  if (screen === "results" && selected) {
    return (
      <PracticeReadingResults
        testTitle={`${selected.title} · ${track === "exam" ? "Exam" : "Learn"}`}
        tasks={taskScores}
        onBackToTests={resetToCatalog}
        footerStep={track === "exam" ? "Exam complete" : "Learn complete"}
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

  if (screen === "session" && test && track && isWritingTest1(test)) {
    return (
      <PracticeWritingTest1Session
        track={track}
        onBackToModes={() => {
          setTrack(null);
          setScreen("modes");
        }}
        onComplete={completeSession}
      />
    );
  }

  if (screen === "session" && test && track && isWritingTest2(test)) {
    return (
      <PracticeWritingTest2Session
        track={track}
        onBackToModes={() => {
          setTrack(null);
          setScreen("modes");
        }}
        onComplete={completeSession}
      />
    );
  }

  if (screen === "session" && test && track && isWritingTest3(test)) {
    return (
      <PracticeWritingTest3Session
        track={track}
        onBackToModes={() => {
          setTrack(null);
          setScreen("modes");
        }}
        onComplete={completeSession}
      />
    );
  }

  if (screen === "session" && test && track && isWritingTest4(test)) {
    return (
      <PracticeWritingTest4Session
        track={track}
        onBackToModes={() => {
          setTrack(null);
          setScreen("modes");
        }}
        onComplete={completeSession}
      />
    );
  }

  if (screen === "modes" && selected && test) {
    const learnBlurb = isWritingTest4(test)
      ? "Lead-in → recommend → softening → ideas → mini para → plan → write"
      : isWritingTest3(test)
        ? "Lead-in → prep → cause/effect → intro → plan → write essay → sample"
        : isWritingTest2(test)
          ? "Lead-in → vocab → passive → plan → write process → descriptors"
          : "Lead-in → graph skills → model language → write → follow-up";
    const examBlurb = isWritingTest4(test) || isWritingTest3(test)
      ? "Task 2 essay (~40 min) → checklist → sample → result"
      : isWritingTest2(test)
        ? "Process diagram write (~15 min) → checklist → sample → result"
        : "Task 1 write (~10 min) → checklist → sample → result";
    return (
      <div className="pr-hub pr-hub--modes">
        <header className="pr-hub__chrome">
          <button
            type="button"
            className="back-link"
            onClick={() => {
              setScreen("catalog");
              setSelectedId(null);
            }}
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
              setScreen("session");
            }}
          >
            <strong>Learn</strong>
            <span>{learnBlurb}</span>
          </button>
          <button
            type="button"
            className="pr-hub__mode"
            onClick={() => {
              setTrack("exam");
              setScreen("session");
            }}
          >
            <strong>Exam</strong>
            <span>{examBlurb}</span>
          </button>
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
          <h1>Practice Writing</h1>
          <p>Task 1 & Task 2 · open any</p>
        </div>
      </header>
      <section className="pr-hub__tasks">
        <h2>Choose a test</h2>
        <div className="pr-hub__task-grid">
          {practiceWritingCatalog.map((item) => (
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
