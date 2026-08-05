export type SkillKey =
  | "reading"
  | "vocabulary"
  | "speaking"
  | "listening"
  | "language"
  | "writing";

export interface SkillBlock {
  id: string;
  skill: string;
  topics: string[];
  pages: string;
  trainerId?: string;
  trainerLabel?: string;
  trainers?: { id: string; label: string }[];
  nextTrainerId?: string;
  note?: string;
}

export interface ModuleSection {
  id: string;
  label: string;
  subtitle: string;
  blocks: SkillBlock[];
}

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  startPage: string;
  sections: ModuleSection[];
  review: {
    label: string;
    pages: string;
    trainerId?: string;
  };
}

export interface CourseData {
  courseTitle: string;
  modules: CourseModule[];
}

export type View =
  | { name: "home" }
  | { name: "module"; moduleId: string }
  | { name: "practice-reading" }
  | { name: "practice-listening" }
  | { name: "practice-writing" }
  | { name: "stats" }
  | {
      name: "trainer";
      trainerId: string;
      moduleId: string;
      blockId?: string;
      blockLabel?: string;
      restart?: boolean;
      initialStep?: number;
    };

export const skillIcons: Record<string, string> = {
  "Lead-in": "💬",
  Reading: "📖",
  Vocabulary: "📝",
  Speaking: "🎤",
  Listening: "🎧",
  "Language development": "🔤",
  "Language development and vocabulary": "🔤",
  Writing: "✍️",
};

export function getSkillIcon(skill: string): string {
  return skillIcons[skill] ?? "📌";
}

export function getBlockTrainers(
  block: SkillBlock,
): { id: string; label: string }[] {
  if (block.trainers?.length) return block.trainers;
  if (block.trainerId) {
    return [
      {
        id: block.trainerId,
        label: block.trainerLabel ?? "Начать тренажёр",
      },
    ];
  }
  return [];
}

export function findBlockByTrainerId(
  module: CourseModule,
  trainerId: string,
): SkillBlock | undefined {
  for (const sec of module.sections) {
    for (const block of sec.blocks) {
      if (block.trainerId === trainerId) return block;
      if (block.trainers?.some((t) => t.id === trainerId)) return block;
    }
  }
  return undefined;
}

export function getBlockNextTrainerId(
  module: CourseModule,
  blockId?: string,
): string | undefined {
  if (!blockId) return undefined;
  for (const sec of module.sections) {
    const block = sec.blocks.find((b) => b.id === blockId);
    if (block?.nextTrainerId) return block.nextTrainerId;
  }
  return undefined;
}
