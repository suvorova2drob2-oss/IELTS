import { useMemo } from "react";
import type { CourseData, CourseModule } from "../types/module";

const COMPLETED_KEY = "mindset-completed-blocks-v1";

function loadCompleted(): Set<string> {
  try {
    const raw = localStorage.getItem(COMPLETED_KEY);
    if (raw) return new Set(JSON.parse(raw) as string[]);
  } catch {
    /* ignore */
  }
  return new Set();
}

function UnitCard({
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
  const trainerCount = blocks.filter(
    (b) => b.trainerId || (b.trainers?.length ?? 0) > 0,
  ).length;
  const doneCount = blocks.filter((b) => completed.has(b.id)).length;
  const progress = blocks.length
    ? Math.round((doneCount / blocks.length) * 100)
    : 0;

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
        <span className="home-module-card__num">U{mod.number}</span>
        {trainerCount > 0 ? (
          <span className="home-module-card__badge">{trainerCount} live</span>
        ) : (
          <span className="home-module-card__badge home-module-card__badge--muted">
            soon
          </span>
        )}
      </div>

      <h3>{mod.title}</h3>
      <p className="home-module-card__page">{mod.startPage}</p>

      <div className="home-module-card__tests">
        {blocks.map((b) => (
          <span
            key={b.id}
            className={`home-module-card__chip ${completed.has(b.id) ? "home-module-card__chip--done" : ""}`}
            title={b.skill}
          >
            {b.skill.slice(0, 1)}
          </span>
        ))}
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

export function MindsetHome({
  course,
  onOpenModule,
  onOpenExpert,
}: {
  course: CourseData;
  onOpenModule: (moduleId: string) => void;
  onOpenExpert?: () => void;
}) {
  const completed = useMemo(() => loadCompleted(), []);

  const overall = useMemo(() => {
    const blocks = course.modules.flatMap((m) =>
      m.sections.flatMap((s) => s.blocks),
    );
    const done = blocks.filter((b) => completed.has(b.id)).length;
    const pct = blocks.length ? Math.round((done / blocks.length) * 100) : 0;
    return { done, total: blocks.length, pct };
  }, [course.modules, completed]);

  return (
    <div className="home-page home-page--mindset">
      <button
        type="button"
        className="course-edge-tab course-edge-tab--left"
        onClick={() => onOpenExpert?.()}
        title="Open Expert IELTS 7.5"
      >
        Expert 7.5
      </button>

      <div className="home-page__content">
        <header className="home-hero home-hero--compact">
          <div className="home-hero__row">
            <div>
              <p className="home-hero__brand">
                Mindset for IELTS · Level 3 · Band 7.5
              </p>
              <h1>{course.courseTitle}</h1>
            </div>
            <div className="home-hero__overall">
              <span className="home-hero__overall-top">
                <span>Course progress</span>
              </span>
              <div
                className="home-hero__overall-bar"
                role="progressbar"
                aria-valuenow={overall.pct}
              >
                <span style={{ width: `${overall.pct}%` }} />
              </div>
              <span className="home-hero__overall-foot">
                <strong>{overall.pct}%</strong>
                <span>
                  {overall.done}/{overall.total} blocks
                </span>
              </span>
            </div>
          </div>
        </header>

        <div className="modules-grid">
          {course.modules.map((mod, i) => (
            <UnitCard
              key={mod.id}
              mod={mod}
              index={i}
              completed={completed}
              onOpen={() => onOpenModule(mod.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
