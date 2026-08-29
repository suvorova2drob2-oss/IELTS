import { useMemo, useState } from "react";
import {
  isSpeakingTest1,
  practiceSpeakingCatalog,
  type PracticeSpeakingCatalogItem,
} from "../data/practiceSpeakingCatalog";
import { savePracticeAttempt, type SkillKind } from "../data/practiceStats";
import {
  PracticeReadingResults,
  type TaskScore,
} from "./PracticeReadingResults";
import { PracticeSpeakingTest1Session } from "./PracticeSpeakingTest1Session";

type Screen = "catalog" | "modes" | "session" | "results";
type Track = "learn" | "exam";
type ScorePair = { score: number; total: number };

export function PracticeSpeakingHub({ onBack }: { onBack: () => void }) {
  const [screen, setScreen] = useState<Screen>("catalog");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [track, setTrack] = useState<Track | null>(null);
  const [taskScores, setTaskScores] = useState<TaskScore[]>([]);

  const selected: PracticeSpeakingCatalogItem | null = useMemo(
    () =>
      selectedId
        ? (practiceSpeakingCatalog.find((t) => t.id === selectedId) ?? null)
        : null,
    [selectedId],
  );

  const test = selected?.test ?? null;
  const nextCatalogItem = selected
    ? practiceSpeakingCatalog.find((t) => t.number === selected.number + 1)
    : null;

  const openTest = (item: PracticeSpeakingCatalogItem) => {
    if (!item.ready || !item.test) return;
    setSelectedId(item.id);
    setTrack(null);
    setTaskScores([]);
    setScreen("modes");
  };

  const completeSession = (scores: {
    training: ScorePair;
    practice: ScorePair;
  }) => {
    if (!selected || !track) return;
    const tasks: TaskScore[] =
      track === "exam"
        ? [
            {
              label: "Strategy checks",
              score: scores.training.score,
              total: Math.max(1, scores.training.total),
            },
            {
              label: "Timed practice",
              score: scores.practice.score,
              total: scores.practice.total,
            },
          ]
        : [
            {
              label: "Parts 1–3 strategy",
              score: scores.training.score,
              total: Math.max(1, scores.training.total),
            },
            {
              label: "Timed practice",
              score: scores.practice.score,
              total: scores.practice.total,
            },
          ];
    setTaskScores(tasks);
    const scoreSum = tasks.reduce((s, t) => s + t.score, 0);
    const totalSum = tasks.reduce((s, t) => s + t.total, 0);
    savePracticeAttempt({
      testId: selected.id,
      testTitle: `${selected.title} · ${track === "exam" ? "Exam" : "Learn"}`,
      tasks: tasks.map((t) => ({
        key: t.label.toLowerCase().replace(/\s+/g, "-"),
        label: t.label,
        kind: "other" as SkillKind,
        score: t.score,
        total: t.total,
      })),
      score: scoreSum,
      total: totalSum,
    });
    setScreen("results");
  };

  if (screen === "results") {
    return (
      <PracticeReadingResults
        testTitle={selected?.title ?? "Speaking"}
        tasks={taskScores}
        onBackToTests={() => {
          setScreen("catalog");
          setSelectedId(null);
          setTrack(null);
          setTaskScores([]);
        }}
        onNextTest={
          nextCatalogItem
            ? () => {
                if (nextCatalogItem.ready) openTest(nextCatalogItem);
              }
            : undefined
        }
        nextTestLabel={
          nextCatalogItem ? `${nextCatalogItem.title} →` : undefined
        }
        nextTestReady={Boolean(nextCatalogItem?.ready)}
        footerStep="Speaking complete"
      />
    );
  }

  if (screen === "session" && test && track && isSpeakingTest1(test)) {
    return (
      <PracticeSpeakingTest1Session
        test={test}
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
            <span>
              Part 1 facts → grammar → Part 2 stages & advice → Part 3 skills →
              timed practice
            </span>
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
            <span>
              Key strategy checks → Part 2/3 focus → timed practice prompts
            </span>
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
          <h1>Practice Speaking</h1>
          <p>Expert speaking · Parts 1–3</p>
        </div>
      </header>
      <section className="pr-hub__tasks">
        <h2>Choose a test</h2>
        <div className="pr-hub__task-grid">
          {practiceSpeakingCatalog.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`pr-hub__task ${item.ready ? "" : "pr-hub__task--soon"}`}
              disabled={!item.ready}
              onClick={() => openTest(item)}
            >
              <span className="pr-hub__task-num">
                {String(item.number).padStart(2, "0")}
              </span>
              <strong>{item.title}</strong>
              <span>{item.subtitle}</span>
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
