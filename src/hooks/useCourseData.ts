import { useCallback, useEffect, useState } from "react";
import { defaultCourse } from "../data/defaultModules";
import type { CourseData, CourseModule, SkillBlock } from "../types/module";

const STORAGE_KEY = "ielts-expert-course-v64";
const READING_STEP_KEY = "ielts-reading-m1-step";
const READING_MODE_KEY = "ielts-reading-m1-mode";
const VOCABULARY_STEP_KEY = "ielts-vocabulary-m1-step";

function migrateCourse(data: CourseData): CourseData {
  const course = structuredClone(data);
  for (const mod of course.modules) {
    if (mod.id === "module-1") {
      mod.review.trainerId = "review-m1-flow";
    }
    if (mod.id === "module-2") {
      mod.review.trainerId = "review-m2-flow";
    }
    if (mod.id === "module-3") {
      const defaultMod = defaultCourse.modules.find((m) => m.id === "module-3");
      if (defaultMod) {
        mod.title = defaultMod.title;
        mod.startPage = defaultMod.startPage;
        mod.sections = structuredClone(defaultMod.sections);
        mod.review = structuredClone(defaultMod.review);
      }
      mod.review.trainerId = "review-m3-flow";
    }
    if (mod.id === "module-4") {
      const defaultMod = defaultCourse.modules.find((m) => m.id === "module-4");
      if (defaultMod) {
        mod.title = defaultMod.title;
        mod.startPage = defaultMod.startPage;
        mod.sections = structuredClone(defaultMod.sections);
        mod.review = structuredClone(defaultMod.review);
      }
      mod.review.trainerId = "review-m4-flow";
    }
    if (mod.id === "module-5") {
      const defaultMod = defaultCourse.modules.find((m) => m.id === "module-5");
      if (defaultMod) {
        mod.title = defaultMod.title;
        mod.startPage = defaultMod.startPage;
        mod.sections = structuredClone(defaultMod.sections);
        mod.review = structuredClone(defaultMod.review);
      }
      mod.review.trainerId = "review-m5-flow";
    }
    if (mod.id === "module-6") {
      const defaultMod = defaultCourse.modules.find((m) => m.id === "module-6");
      if (defaultMod) {
        mod.title = defaultMod.title;
        mod.startPage = defaultMod.startPage;
        mod.sections = structuredClone(defaultMod.sections);
        mod.review = structuredClone(defaultMod.review);
      }
      mod.review.trainerId = "review-m6-flow";
    }
    if (mod.id === "module-7") {
      const defaultMod = defaultCourse.modules.find((m) => m.id === "module-7");
      if (defaultMod) {
        mod.title = defaultMod.title;
        mod.startPage = defaultMod.startPage;
        mod.sections = structuredClone(defaultMod.sections);
        mod.review = structuredClone(defaultMod.review);
      }
      mod.review.trainerId = "review-m7-flow";
    }
    if (mod.id === "module-8") {
      const defaultMod = defaultCourse.modules.find((m) => m.id === "module-8");
      if (defaultMod) {
        mod.title = defaultMod.title;
        mod.startPage = defaultMod.startPage;
        mod.sections = structuredClone(defaultMod.sections);
        mod.review = structuredClone(defaultMod.review);
      }
      mod.review.trainerId = "review-m8-flow";
    }
    if (mod.id === "module-9") {
      const defaultMod = defaultCourse.modules.find((m) => m.id === "module-9");
      if (defaultMod) {
        mod.title = defaultMod.title;
        mod.startPage = defaultMod.startPage;
        mod.sections = structuredClone(defaultMod.sections);
        mod.review = structuredClone(defaultMod.review);
      }
      mod.review.trainerId = "review-m9-flow";
    }
    if (mod.id === "module-10") {
      const defaultMod = defaultCourse.modules.find((m) => m.id === "module-10");
      if (defaultMod) {
        mod.title = defaultMod.title;
        mod.startPage = defaultMod.startPage;
        mod.sections = structuredClone(defaultMod.sections);
        mod.review = structuredClone(defaultMod.review);
      }
      mod.review.trainerId = "review-m10-flow";
    }
    for (const sec of mod.sections) {
      if (sec.id === "2a") sec.subtitle = "Development";
      if (sec.id === "2b") {
        sec.blocks = sec.blocks.filter((b) => b.id !== "2b-reading-lead-in");
        const defaultMod = defaultCourse.modules.find((m) => m.id === "module-2");
        const default2b = defaultMod?.sections.find((s) => s.id === "2b");
        const defaultReading = default2b?.blocks.find((b) => b.id === "2b-reading");
        if (defaultReading) {
          const idx = sec.blocks.findIndex((b) => b.id === "2b-reading");
          if (idx >= 0) {
            sec.blocks[idx] = { ...sec.blocks[idx], ...defaultReading };
          } else {
            const speakIdx = sec.blocks.findIndex((b) => b.id === "2b-speaking");
            if (speakIdx >= 0) sec.blocks.splice(speakIdx + 1, 0, defaultReading);
            else sec.blocks.push(defaultReading);
          }
        }
      }
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
        if (block.id === "1a-listening") {
          block.trainerId = "listening-m1-flow";
          block.trainers = undefined;
          block.trainerLabel =
            "Learn: Before you listen → 3a–3d → 4a–4b → Choose TWO → Discussion.";
          block.topics = [
            "Before you listen: libraries",
            "3a Underline listening focus",
            "3b Paraphrase options A–C",
            "3c Check with the script",
            "3d Strategy questions",
            "4a Question focus",
            "4b Synonyms for options",
            "Listen: Choose TWO (B, D)",
            "Discussion",
          ];
        }
        if (block.id === "1a-language") {
          block.trainerId = "language-m1a-flow";
          block.trainers = undefined;
          block.trainerLabel =
            "Language development · synonyms, prefixes, word formation, paraphrase.";
          block.topics = [
            "1a Match synonyms",
            "1b Complete the sentences",
            "2a Prefixes",
            "2b Match meanings",
            "3a Word forms",
            "3b Word formation",
            "4a Paraphrase sentences",
            "4b Discussion",
          ];
        }
        if (block.id === "1a-writing") {
          block.trainerId = "writing-m1a-flow";
          block.trainers = undefined;
          block.trainerLabel =
            "Task 1 · women employment + education years · 1a–3a + Write.";
          block.topics = [
            "1a Look at the graph",
            "1b Match structures",
            "2a Overview",
            "2b Trend or detail",
            "2c Other trends",
            "3a Plan",
            "Write",
          ];
        }
        if (block.id === "1b-listening") {
          block.trainerId = "listening-m1b-flow";
          block.trainers = undefined;
          block.trainerLabel =
            "Section 2 · paraphrase → 01_05 → Test 01_06 (1A 2C · C+D).";
          block.topics = [
            "Before you listen",
            "2a Alternative language",
            "2c Listen",
            "2d Script",
            "3 Alt language",
            "Test practice",
            "Discussion",
          ];
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
            "p. 16 · 2a table · 2b peak study times · b verb forms · c italics.";
          block.topics = [
            "2a Describe trends",
            "2b Correct graph errors",
            "b Verb forms (1–6)",
            "c Choose the correct option",
          ];
        }
        if (block.id === "1b-speaking") {
          block.trainerId = "speaking-m1b-flow";
          block.trainers = undefined;
          block.trainerLabel =
            "Speaking Part 1 · Vocabulary + Test practice (school / IELTS) + self-check.";
          block.topics = [
            "1a Picture discussion",
            "1b Decision collocations",
            "1c Your big decision",
            "3 Test practice",
            "4a Assess and improve",
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
        if (block.id === "2a-speaking") {
          block.trainerId = "speaking-m2a-flow";
          block.trainers = undefined;
          block.trainerLabel =
            "Speaking · Lead-in + cue card + Paris mind map + your notes.";
          block.topics = [
            "Lead-in: architecture photo",
            "2a Cue card points",
            "3a Plan notes (mind map)",
            "3b Your notes + speak",
          ];
        }
        if (block.id === "2a-listening") {
          block.trainerId = "listening-m2a-flow";
          block.trainers = undefined;
          block.trainerLabel =
            "Listening Section 1 · map skills + walks + Camp Horizon label.";
          block.topics = [
            "Before you listen: bungee jump",
            "2 Map prepositions",
            "2.2 Listen: Robert & Filipo walks",
            "4 Directions (italics)",
            "5 Match direction phrases",
            "6a Camp Horizon map",
            "6b Label the map (02_03)",
          ];
        }
        if (block.id === "2a-language") {
          block.trainerId = "language-m2a-flow";
          block.trainers = undefined;
          block.trainerLabel =
            "Language · The passive (italics + forms + rewrite + discuss).";
          block.topics = [
            "b Passive italics (photos)",
            "c Passive forms (article)",
            "c Rewrite active → passive",
            "3 Discuss (festival / home)",
          ];
        }
        if (block.id === "2a-writing") {
          block.trainerId = "writing-m2a-flow";
          block.trainers = undefined;
          block.trainerLabel =
            "Writing Task 1 · process diagrams (wind turbine + edible oils).";
          block.topics = [
            "1 Lead-in",
            "2a–2d Wind turbine process",
            "3a–3c Active / passive",
            "4 Edible oils process",
          ];
        }
        if (block.id === "2b-listening") {
          block.trainerId = "listening-m2b-flow";
          block.trainers = undefined;
          block.trainerLabel =
            "Listening Section 1 · Turtle Bay Safari Camp (Track 02_04).";
          block.topics = [
            "Before you listen",
            "2a–2b Accurate answers",
            "3 Form + map (02_04)",
            "5 Discussion",
          ];
        }
        if (block.id === "2b-speaking") {
          block.trainerId = "speaking-m2b-flow";
          block.trainers = undefined;
          block.trainerLabel =
            "Speaking Part 2 · photos + vocab + 2-minute talk + cue cards.";
          block.topics = [
            "1 Photos: Catskill / Reef",
            "2a Vocabulary (italics)",
            "2b Speak 2 minutes",
            "Part 2 Cue cards",
            "Model answers",
          ];
        }
        if (block.id === "2b-writing") {
          block.trainerId = "writing-m2b-flow";
          block.trainers = undefined;
          block.trainerLabel =
            "Writing Task 1 · supervolcano process (diagram + cohesion + write).";
          block.topics = [
            "1 Lead-in: volcano photo",
            "2 Understand the diagram",
            "3 Plan (coherence)",
            "4 Cohesion: Danger in the skies",
            "5 Language 5a–5b",
            "6 Write summary",
          ];
        }
        if (block.id === "2b-reading") {
          block.trainers = [
            {
              id: "lead-in-insect-empire",
              label: "Before you read (p. 34)",
            },
            {
              id: "reading-m2b-flow",
              label: "The Insect Empire · Exam 1–9",
            },
          ];
          block.trainerId = undefined;
          block.trainerLabel =
            "The Insect Empire · Before you read → текст + TFNG 1–5 + short 6–9";
          block.nextTrainerId = "reading-m2b-flow";
          block.topics = [
            "Before you read: tiger, bee, bush baby",
            "True / False / Not Given 1–5",
            "Short answers 6–9",
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
