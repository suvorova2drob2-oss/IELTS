import { useCallback, useEffect, useState } from "react";
import { defaultCourse } from "../data/defaultModules";
import type { CourseData, CourseModule, SkillBlock } from "../types/module";

const STORAGE_KEY = "ielts-expert-course-v10";
const READING_STEP_KEY = "ielts-reading-m1-step";
const READING_MODE_KEY = "ielts-reading-m1-mode";
const VOCABULARY_STEP_KEY = "ielts-vocabulary-m1-step";

function migrateCourse(data: CourseData): CourseData {
  const course = structuredClone(data);
  for (const mod of course.modules) {
    for (const sec of mod.sections) {
      for (const block of sec.blocks) {
        if (block.id === "1a-reading") {
          block.trainerId = "reading-m1-flow";
          block.trainers = undefined;
          block.trainerLabel =
            "Exam: текст + вопросы 1–9 рядом. Learn: warm-up → scan → задание → discussion.";
        }
        if (block.id === "1a-lead-in" && !block.nextTrainerId) {
          block.nextTrainerId = "reading-m1-flow";
        }
        if (block.id === "1a-vocabulary") {
          block.trainerId = "vocabulary-m1-flow";
          block.trainerLabel =
            "Vocabulary p. 10 — 1a–1c, Collocations, 3a–3b, Dictionary";
        }
      }
    }
  }
  return course;
}

function loadCourse(): CourseData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return migrateCourse(JSON.parse(raw) as CourseData);
  } catch {
    /* use defaults */
  }
  return structuredClone(defaultCourse);
}

export { READING_STEP_KEY, READING_MODE_KEY, VOCABULARY_STEP_KEY };

export function useCourseData() {
  const [course, setCourse] = useState<CourseData>(loadCourse);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(course));
  }, [course]);

  const updateModule = useCallback(
    (moduleId: string, updater: (mod: CourseModule) => CourseModule) => {
      setCourse((prev) => ({
        ...prev,
        modules: prev.modules.map((m) =>
          m.id === moduleId ? updater(m) : m,
        ),
      }));
    },
    [],
  );

  const updateBlock = useCallback(
    (moduleId: string, blockId: string, patch: Partial<SkillBlock>) => {
      updateModule(moduleId, (mod) => ({
        ...mod,
        sections: mod.sections.map((sec) => ({
          ...sec,
          blocks: sec.blocks.map((b) =>
            b.id === blockId ? { ...b, ...patch } : b,
          ),
        })),
      }));
    },
    [updateModule],
  );

  const updateModuleMeta = useCallback(
    (
      moduleId: string,
      patch: Partial<Pick<CourseModule, "title" | "startPage">> & {
        reviewLabel?: string;
        reviewPages?: string;
      },
    ) => {
      updateModule(moduleId, (mod) => ({
        ...mod,
        title: patch.title ?? mod.title,
        startPage: patch.startPage ?? mod.startPage,
        review: {
          ...mod.review,
          label: patch.reviewLabel ?? mod.review.label,
          pages: patch.reviewPages ?? mod.review.pages,
        },
      }));
    },
    [updateModule],
  );

  const updateSectionSubtitle = useCallback(
    (moduleId: string, sectionId: string, subtitle: string) => {
      updateModule(moduleId, (mod) => ({
        ...mod,
        sections: mod.sections.map((s) =>
          s.id === sectionId ? { ...s, subtitle } : s,
        ),
      }));
    },
    [updateModule],
  );

  const resetCourse = useCallback(() => {
    if (
      window.confirm(
        "Сбросить все изменения и вернуть стандартное содержание?",
      )
    ) {
      setCourse(structuredClone(defaultCourse));
    }
  }, []);

  const exportCourse = useCallback(() => {
    const blob = new Blob([JSON.stringify(course, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ielts-course.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [course]);

  const importCourse = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string) as CourseData;
        if (data.modules?.length) setCourse(migrateCourse(data));
      } catch {
        window.alert("Не удалось прочитать файл. Проверьте формат JSON.");
      }
    };
    reader.readAsText(file);
  }, []);

  return {
    course,
    editMode,
    setEditMode,
    updateBlock,
    updateModuleMeta,
    updateSectionSubtitle,
    resetCourse,
    exportCourse,
    importCourse,
  };
}
