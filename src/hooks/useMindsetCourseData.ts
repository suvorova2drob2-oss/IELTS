import { useCallback, useEffect, useState } from "react";
import { defaultMindsetCourse } from "../data/mindset/defaultUnits";
import type { CourseData, CourseModule, SkillBlock } from "../types/module";

const STORAGE_KEY = "mindset-course-v2";

function migrateCourse(data: CourseData): CourseData {
  const course = structuredClone(data);
  const defaults = defaultMindsetCourse.modules;

  for (const mod of course.modules) {
    const def = defaults.find((m) => m.id === mod.id);
    if (!def) continue;
    mod.title = def.title;
    mod.startPage = def.startPage;
    mod.sections = structuredClone(def.sections);
    mod.review = structuredClone(def.review);
  }

  // Ensure all default units exist
  for (const def of defaults) {
    if (!course.modules.some((m) => m.id === def.id)) {
      course.modules.push(structuredClone(def));
    }
  }
  course.modules.sort((a, b) => a.number - b.number);
  course.courseTitle = defaultMindsetCourse.courseTitle;
  return course;
}

function loadCourse(): CourseData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return migrateCourse(JSON.parse(raw) as CourseData);
  } catch {
    /* use defaults */
  }
  return structuredClone(defaultMindsetCourse);
}

export function useMindsetCourseData() {
  const [course, setCourse] = useState<CourseData>(loadCourse);

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
        "Reset Mindset course to the default unit list?",
      )
    ) {
      setCourse(structuredClone(defaultMindsetCourse));
    }
  }, []);

  return {
    course,
    updateBlock,
    updateModuleMeta,
    updateSectionSubtitle,
    resetCourse,
  };
}
