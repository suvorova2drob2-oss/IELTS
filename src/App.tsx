import { useState } from "react";
import { CourseHome } from "./components/CourseHome";
import { PracticeListeningHub } from "./components/PracticeListeningHub";
import { PracticeReadingHub } from "./components/PracticeReadingHub";
import { PracticeWritingHub } from "./components/PracticeWritingHub";
import { StatsPage } from "./components/StatsPage";
import { hasTrainer, TrainerView } from "./components/TrainerRouter";
import { ModulePage } from "./components/ModulePage";
import { useCourseData } from "./hooks/useCourseData";
import type { View } from "./types/module";
import {
  findBlockByTrainerId,
  getBlockNextTrainerId,
} from "./types/module";
import "./index.css";

export default function App() {
  const [view, setView] = useState<View>({ name: "home" });

  const {
    course,
    updateBlock,
    updateModuleMeta,
    updateSectionSubtitle,
  } = useCourseData();

  const currentModule =
    view.name === "module" || view.name === "trainer"
      ? course.modules.find((m) => m.id === view.moduleId)
      : undefined;

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
          onClick={() => setView({ name: "home" })}
        >
          IELTS Expert
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
            }}
            onOpenStats={() => setView({ name: "stats" })}
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
                restart: initialStep == null,
              })
            }
            onUpdateMeta={(patch) => updateModuleMeta(currentModule.id, patch)}
            onUpdateSection={(sectionId, subtitle) =>
              updateSectionSubtitle(currentModule.id, sectionId, subtitle)
            }
          />
        )}

        {view.name === "trainer" && currentModule && (
          <>
            {hasTrainer(view.trainerId) ? (
              <TrainerView
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
                  const nextBlock = findBlockByTrainerId(currentModule, nextId);
                  setView({
                    name: "trainer",
                    trainerId: nextId,
                    moduleId: view.moduleId,
                    blockId: nextBlock?.id,
                    blockLabel: nextBlock
                      ? `${nextBlock.skill} · ${nextBlock.pages}`
                      : undefined,
                    restart: true,
                  });
                }}
                continueLabel={
                  view.trainerId === "lead-in-intelligence"
                    ? "Reading (pp. 8–9) →"
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
      </div>
    </div>
  );
}
