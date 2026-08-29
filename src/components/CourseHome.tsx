import { useMemo } from "react";
import { computeSmartStats } from "../data/practiceStats";
import type { CourseData, CourseModule } from "../types/module";

const COMPLETED_KEY = "ielts-completed-blocks-v1";

const PRACTICE_SKILLS = [
  { id: "reading", label: "Reading", hint: "3 practice tests", ready: true },
  { id: "listening", label: "Listening", hint: "3 practice tests", ready: true },
  { id: "speaking", label: "Speaking", hint: "Expert speaking · Parts 1–3", ready: true },
  { id: "writing", label: "Writing", hint: "4 practice tests · Task 1–2", ready: true },
] as const;

export type PracticeSkillId = (typeof PRACTICE_SKILLS)[number]["id"];

function loadCompleted(): Set<string> {
  try {
    const raw = localStorage.getItem(COMPLETED_KEY);
    if (raw) return new Set(JSON.parse(raw) as string[]);
  } catch {
    /* ignore */
  }
  return new Set();
}

function ModuleCard({
  mod,
  onOpen,
  index,
  completed,
}: {
  mod: CourseModule;
  onOpen: () => void;
  index: number;
  completed: Set<string>;
}) {
  const blocks = mod.sections.flatMap((s) => s.blocks);
  const trainerCount = blocks.filter((b) => b.trainerId).length;
  const doneCount = blocks.filter((b) => completed.has(b.id)).length;
  const progress = blocks.length
    ? Math.round((doneCount / blocks.length) * 100)
    : 0;

  const training = mod.sections[0];
  const testing = mod.sections[1];
  const trainDone =
    training?.blocks.filter((b) => completed.has(b.id)).length ?? 0;
  const trainTotal = training?.blocks.length ?? 0;
  const testDone =
    testing?.blocks.filter((b) => completed.has(b.id)).length ?? 0;
  const testTotal = testing?.blocks.length ?? 0;

  return (
    <button
      type="button"
      className="home-module-card"
      style={{ "--card-delay": `${index * 35}ms` } as React.CSSProperties}
      onClick={onOpen}
    >
      <span className="home-module-card__watermark" aria-hidden>
        {String(mod.number).padStart(2, "0")}
      </span>

      <div className="home-module-card__header">
        <span className="home-module-card__num">M{mod.number}</span>
        {trainerCount > 0 ? (
          <span className="home-module-card__badge">{trainerCount} tests</span>
        ) : (
          <span className="home-module-card__badge home-module-card__badge--muted">
            soon
          </span>
        )}
      </div>

      <h3>{mod.title}</h3>
      <p className="home-module-card__page">{mod.startPage}</p>

      <div className="home-module-card__tests">
        <span
          className={`home-module-card__chip ${trainTotal > 0 && trainDone === trainTotal ? "home-module-card__chip--done" : ""}`}
        >
          A {trainDone}/{trainTotal}
        </span>
        <span
          className={`home-module-card__chip ${testTotal > 0 && testDone === testTotal ? "home-module-card__chip--done" : ""}`}
        >
          B {testDone}/{testTotal}
        </span>
      </div>

      <div
        className="home-module-card__bar"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="home-module-card__footer">
        <span>{progress}%</span>
        <span className="home-module-card__go">Open</span>
      </div>
    </button>
  );
}

export function CourseHome({
  course,
  onOpenModule,
  onOpenPractice,
  onOpenStats,
  onOpenMindset,
}: {
  course: CourseData;
  onOpenModule: (moduleId: string) => void;
  onOpenPractice?: (skill: PracticeSkillId) => void;
  onOpenStats?: () => void;
  onOpenMindset?: () => void;
}) {
  const completed = useMemo(() => loadCompleted(), []);
  const practice = useMemo(() => computeSmartStats(), []);

  const overall = useMemo(() => {
    const blocks = course.modules.flatMap((m) =>
      m.sections.flatMap((s) => s.blocks),
    );
    const done = blocks.filter((b) => completed.has(b.id)).length;
    const modulePct = blocks.length
      ? Math.round((done / blocks.length) * 100)
      : 0;
    // Blend course modules (70%) + practice coverage (30%)
    const blended = Math.round(modulePct * 0.7 + practice.progressPct * 0.3);
    return {
      done,
      total: blocks.length,
      modulePct,
      blended,
      practicePct: practice.overallPct,
      practiceAttempts: practice.attempts.length,
      testsTouched: practice.testsTouched,
      testsReady: practice.testsReady,
    };
  }, [course.modules, completed, practice]);

  return (
    <div className="home-page">
      <button
        type="button"
        className="course-edge-tab"
        onClick={() => onOpenMindset?.()}
        title="Open Mindset for IELTS Level 3"
      >
        Mindset L3
      </button>

      <div className="home-page__content">
        <header className="home-hero home-hero--compact">
          <div className="home-hero__row">
            <div>
              <p className="home-hero__brand">IELTS Expert</p>
              <h1>{course.courseTitle}</h1>
            </div>
            <button
              type="button"
              className="home-hero__overall home-hero__overall--btn"
              onClick={() => onOpenStats?.()}
            >
              <span className="home-hero__overall-top">
                <span>Statistics</span>
                <span className="home-hero__overall-go">Open →</span>
              </span>
              <div
                className="home-hero__overall-bar"
                role="progressbar"
                aria-valuenow={overall.blended}
              >
                <span style={{ width: `${overall.blended}%` }} />
              </div>
              <span className="home-hero__overall-foot">
                <strong>{overall.blended}%</strong>
                <span>
                  Practice {overall.testsTouched}/{overall.testsReady}
                  {overall.practiceAttempts > 0
                    ? ` · ${overall.practicePct}% acc`
                    : ""}
                </span>
              </span>
            </button>
          </div>
        </header>

        <div className="modules-grid">
          {course.modules.map((mod, i) => (
            <ModuleCard
              key={mod.id}
              mod={mod}
              index={i}
              completed={completed}
              onOpen={() => onOpenModule(mod.id)}
            />
          ))}
        </div>

        <section className="practice-tests">
          <div className="practice-tests__head">
            <h2>Practice Tests</h2>
            <span>Full exam skills</span>
          </div>
          <div className="practice-tests__grid">
            {PRACTICE_SKILLS.map((skill) => (
              <button
                key={skill.id}
                type="button"
                className={`practice-tests__card ${skill.ready ? "" : "practice-tests__card--soon"}`}
                disabled={!skill.ready}
                onClick={() => onOpenPractice?.(skill.id)}
              >
                <span className="practice-tests__label">{skill.label}</span>
                <span className="practice-tests__hint">{skill.hint}</span>
                <span className="practice-tests__go">
                  {skill.ready ? "Open" : "Soon"}
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
