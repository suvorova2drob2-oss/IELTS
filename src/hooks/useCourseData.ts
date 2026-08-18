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
    if (mod.id === "module-1") {
      mod.review.trainerId = "review-m1-flow";
    }
    for (const sec of mod.sections) {
      if (sec.id === "2a") sec.subtitle = "Development";
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
        if (block.id === "1b-reading") {
          block.trainerId = "reading-m1b-flow";
          block.trainers = undefined;
          block.trainerLabel =
            "Untapped resources · The learning brain. Exam: текст + вопросы 1–9 рядом. Learn: warm-up → scan → задание → discussion.";
          block.topics = [
            "Before you read: True/False",
            "Scan the first paragraph",
            "Table and note completion",
            "Discussion",
          ];
        }
        if (block.id === "1b-language") {
          block.trainerId = "language-m1b-flow";
          block.trainers = undefined;
          block.trainerLabel =
            "p. 16 Describe trends · 2a table, then b verb forms.";
          block.topics = [
            "2a Go up / Go down / No movement",
            "b Verb forms",
          ];
        }
        if (block.id === "2a-lead-in") {
          block.trainerId = "lead-in-development";
          block.trainerLabel =
            "Обсуждение перед модулем — 3 фото: здоровье, энергия, медицина";
          block.nextTrainerId = "reading-m2-flow";
          block.topics = [
            "Living standards around the world",
            "What development means",
            "Personal vs social development",
          ];
        }
        if (block.id === "2a-reading") {
          block.trainerId = "reading-m2-flow";
          block.trainers = undefined;
          block.trainerLabel =
            "A better life? · Agricultural Revolution. Exam: текст + TFNG 1–5 и short answers 6–10. Learn: discuss → topic sentences → задание → discussion.";
          block.topics = [
            "Before you read: discuss",
            "Topic sentences and supporting details",
            "True / False / Not Given 1–5",
            "Short-answer questions 6–10",
          ];
        }
        if (block.id === "2a-vocabulary") {
          block.trainerId = "vocabulary-m2-flow";
          block.trainers = undefined;
          block.trainerLabel =
            "p. 26 Academic verbs, spoken forms, process word forms.";
          block.topics = [
            "Academic verbs 1a–1b",
            "Written and spoken 2a–2c",
            "Process verbs 3a–3b",
          ];
        }
        if (block.id === "1b-writing") {
          block.trainerId = "writing-m1b-flow";
          block.trainers = undefined;
          block.trainerLabel =
            "Task 1 line graph · UK employment by education. Exam: график + письмо. Learn: оси → features → overview → 150 слов.";
          block.topics = [
            "Understand the graph",
            "Main features",
            "Overview + language",
            "Write 150 words",
          ];
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
