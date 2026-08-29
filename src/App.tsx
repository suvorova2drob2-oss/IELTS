import { useState } from "react";
import { CourseHome } from "./components/CourseHome";
import { MindsetHome } from "./components/MindsetHome";
import {
  hasMindsetTrainer,
  MindsetTrainerView,
} from "./components/MindsetTrainerRouter";
import { PracticeListeningHub } from "./components/PracticeListeningHub";
import { PracticeReadingHub } from "./components/PracticeReadingHub";
import { PracticeSpeakingHub } from "./components/PracticeSpeakingHub";
import { PracticeWritingHub } from "./components/PracticeWritingHub";
import { StatsPage } from "./components/StatsPage";
import { hasTrainer, TrainerView } from "./components/TrainerRouter";
import { ModulePage } from "./components/ModulePage";
import { useCourseData } from "./hooks/useCourseData";
import { useMindsetCourseData } from "./hooks/useMindsetCourseData";
import type { View } from "./types/module";
import {
  findBlockByTrainerId,
  getBlockNextTrainerId,
} from "./types/module";
import "./index.css";

function isMindsetView(view: View): boolean {
  return (
    view.name === "mindset-home" ||
    view.name === "mindset-module" ||
    view.name === "mindset-trainer"
  );
}

export default function App() {
  const [view, setView] = useState<View>({ name: "home" });

  const {
    course,
    updateBlock,
    updateModuleMeta,
    updateSectionSubtitle,
  } = useCourseData();

  const {
    course: mindsetCourse,
    updateBlock: updateMindsetBlock,
    updateModuleMeta: updateMindsetMeta,
    updateSectionSubtitle: updateMindsetSection,
  } = useMindsetCourseData();

  const currentModule =
    view.name === "module" || view.name === "trainer"
      ? course.modules.find((m) => m.id === view.moduleId)
      : undefined;

  const mindsetModule =
    view.name === "mindset-module" || view.name === "mindset-trainer"
      ? mindsetCourse.modules.find((m) => m.id === view.moduleId)
      : undefined;

  const brandLabel = isMindsetView(view)
    ? "Mindset L3"
    : "IELTS Expert";

  return (
    <div className={`app-frame app-frame--${view.name}`}>
      <div className="app-frame__atmosphere" aria-hidden>
        <div className="app-frame__veil" />
        <div className="app-frame__grain" />
      </div>

      <nav className="app-nav">
        <button
          type="button"
          className="nav-brand"
          onClick={() =>
            setView(
              isMindsetView(view)
                ? { name: "mindset-home" }
                : { name: "home" },
            )
          }
        >
          {brandLabel}
        </button>
      </nav>

      <div className="app-frame__stage">
        {view.name === "home" && (
          <CourseHome
            course={course}
            onOpenModule={(moduleId) => setView({ name: "module", moduleId })}
            onOpenPractice={(skill) => {
              if (skill === "reading") {
                setView({ name: "practice-reading" });
              }
              if (skill === "listening") {
                setView({ name: "practice-listening" });
              }
              if (skill === "writing") {
                setView({ name: "practice-writing" });
              }
              if (skill === "speaking") {
                setView({ name: "practice-speaking" });
              }
            }}
            onOpenStats={() => setView({ name: "stats" })}
            onOpenMindset={() => setView({ name: "mindset-home" })}
          />
        )}

        {view.name === "mindset-home" && (
          <MindsetHome
            course={mindsetCourse}
            onOpenModule={(moduleId) =>
              setView({ name: "mindset-module", moduleId })
            }
            onOpenExpert={() => setView({ name: "home" })}
          />
        )}

        {view.name === "stats" && (
          <StatsPage onBack={() => setView({ name: "home" })} />
        )}

        {view.name === "practice-reading" && (
          <PracticeReadingHub onBack={() => setView({ name: "home" })} />
        )}

        {view.name === "practice-listening" && (
          <PracticeListeningHub onBack={() => setView({ name: "home" })} />
        )}

        {view.name === "practice-writing" && (
          <PracticeWritingHub onBack={() => setView({ name: "home" })} />
        )}

        {view.name === "practice-speaking" && (
          <PracticeSpeakingHub onBack={() => setView({ name: "home" })} />
        )}

        {view.name === "module" && currentModule && (
          <ModulePage
            module={currentModule}
            editMode={false}
            onBack={() => setView({ name: "home" })}
            onEditBlock={(blockId, patch) =>
              updateBlock(currentModule.id, blockId, patch)
            }
            onOpenTrainer={(trainerId, block, initialStep) =>
              setView({
                name: "trainer",
                trainerId,
                moduleId: currentModule.id,
                blockId: block.id,
                blockLabel: `${block.skill} · ${block.pages}`,
                initialStep,
                restart: true,
                openKey: Date.now(),
              })
            }
            onUpdateMeta={(patch) => updateModuleMeta(currentModule.id, patch)}
            onUpdateSection={(sectionId, subtitle) =>
              updateSectionSubtitle(currentModule.id, sectionId, subtitle)
            }
          />
        )}

        {view.name === "mindset-module" && mindsetModule && (
          <ModulePage
            module={mindsetModule}
            editMode={false}
            onBack={() => setView({ name: "mindset-home" })}
            onEditBlock={(blockId, patch) =>
              updateMindsetBlock(mindsetModule.id, blockId, patch)
            }
            onOpenTrainer={(trainerId, block, initialStep) =>
              setView({
                name: "mindset-trainer",
                trainerId,
                moduleId: mindsetModule.id,
                blockId: block.id,
                blockLabel: `${block.skill} · ${block.pages}`,
                initialStep,
                restart: true,
                openKey: Date.now(),
              })
            }
            onUpdateMeta={(patch) =>
              updateMindsetMeta(mindsetModule.id, patch)
            }
            onUpdateSection={(sectionId, subtitle) =>
              updateMindsetSection(mindsetModule.id, sectionId, subtitle)
            }
          />
        )}

        {view.name === "trainer" && currentModule && (
          <>
            {hasTrainer(view.trainerId) ? (
              <TrainerView
                key={
                  view.openKey ??
                  `${view.trainerId}-${view.initialStep ?? "all"}`
                }
                trainerId={view.trainerId}
                restart={view.restart}
                initialStep={view.initialStep}
                onBack={() =>
                  setView({ name: "module", moduleId: view.moduleId })
                }
                contextLabel={view.blockLabel}
                onContinue={() => {
                  const nextId = getBlockNextTrainerId(
                    currentModule,
                    view.blockId,
                  );
                  if (!nextId) {
                    setView({ name: "module", moduleId: view.moduleId });
                    return;
                  }
                  const nextBlock = findBlockByTrainerId(
                    currentModule,
                    nextId,
                  );
                  setView({
                    name: "trainer",
                    trainerId: nextId,
                    moduleId: view.moduleId,
                    blockId: nextBlock?.id,
                    blockLabel: nextBlock
                      ? `${nextBlock.skill} · ${nextBlock.pages}`
                      : undefined,
                    restart: true,
                    openKey: Date.now(),
                  });
                }}
                continueLabel={
                  view.trainerId === "lead-in-intelligence"
                    ? "Reading (pp. 8–9) →"
                    : view.trainerId === "lead-in-development"
                      ? "Reading (pp. 24–25) →"
                      : view.trainerId === "lead-in-insect-empire"
                        ? "Reading (pp. 34–35) →"
                        : view.trainerId === "lead-in-teenagers"
                          ? "Reading (pp. 40–41) →"
                          : undefined
                }
              />
            ) : (
              <div className="app-shell">
                <button
                  type="button"
                  className="back-link"
                  onClick={() =>
                    setView({ name: "module", moduleId: view.moduleId })
                  }
                >
                  ← Назад
                </button>
                <div className="card">
                  <h2>Тренажёр «{view.trainerId}»</h2>
                  <p>Пока не создан. Контент можно добавить позже.</p>
                </div>
              </div>
            )}
          </>
        )}

        {view.name === "mindset-trainer" && mindsetModule && (
          <>
            {hasMindsetTrainer(view.trainerId) ? (
              <MindsetTrainerView
                key={
                  view.openKey ??
                  `${view.trainerId}-${view.initialStep ?? "all"}`
                }
                trainerId={view.trainerId}
                restart={view.restart}
                initialStep={view.initialStep}
                onBack={() =>
                  setView({
                    name: "mindset-module",
                    moduleId: view.moduleId,
                  })
                }
                contextLabel={view.blockLabel}
              />
            ) : (
              <div className="app-shell">
                <button
                  type="button"
                  className="back-link"
                  onClick={() =>
                    setView({
                      name: "mindset-module",
                      moduleId: view.moduleId,
                    })
                  }
                >
                  ← Back
                </button>
                <div className="card">
                  <h2>Trainer «{view.trainerId}»</h2>
                  <p>Not created yet.</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
